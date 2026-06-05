/**
 * Roster Router — Trust Model Phase 1
 *
 * A company (Briefcase owner) builds a roster of employees. Each employee starts
 * at Tier 0 ("Listed" — on the roster, nothing verified). The owner sends each a
 * self-service "invite to credential" link; the employee opens it on their phone
 * and runs their OWN background check (candidate-initiated Checkr), which raises
 * their portable ProPass tier to 1 ("Home-Ready"). The platform chases the
 * employee with the link — the owner doesn't have to herd 30 people.
 *
 * Mirrors the patterns in proPass.ts / briefcase.ts:
 *   - resolves the caller's partner via ctx.user.id
 *   - uses dbRows helpers (asRows/firstRow) for raw db.execute() reads
 *   - assigns ids explicitly (MAX+1) since prod raw-SQL tables have no AUTO_INCREMENT
 *   - self-healing DDL via ensureClearanceInfra()
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { asRows, firstRow } from "../_core/dbRows";
import { getDb } from "../db";
import { notifyOwner } from "../_core/notification";
import { sendEmail, FROM_PROLNK } from "../email";
import { sendSms } from "../notifications";
import { initiateBackgroundCheck } from "./checkr";
import { ensureClearanceInfra, computeTier, cacheEmployeeTier, nextId } from "../clearance";

const BASE_URL = process.env.APP_BASE_URL ?? "https://prolnk.xyz";

async function resolveCallerPartner(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await (db as any).execute(
    sql`SELECT id, businessName, contactEmail FROM partners WHERE userId = ${userId} LIMIT 1`,
  );
  return firstRow(rows) ?? null;
}

export const rosterRouter = router({

  // ── List the caller's roster (each with current ProPass tier) ───────────────
  listRoster: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { employees: [] };
    await ensureClearanceInfra();

    const partner = await resolveCallerPartner(ctx.user.id);
    if (!partner) return { employees: [] };

    const rows = await (db as any).execute(sql`
      SELECT pe.id, pe.firstName, pe.lastName, pe.email, pe.phone, pe.role,
             pe.employmentType, pe.isActive, pe.rosterStatus, pe.inviteToken,
             pe.inviteSentAt, pe.proPassId, pe.computedTier,
             pp.passCode, pp.backgroundCheckStatus, pp.backgroundCheckExpiresAt
      FROM partnerEmployees pe
      LEFT JOIN proPassCards pp ON pe.proPassId = pp.id
      WHERE pe.partnerId = ${partner.id}
        AND (pe.rosterStatus IS NULL OR pe.rosterStatus <> 'removed')
      ORDER BY pe.firstName, pe.lastName
    `);
    const employees = asRows(rows);

    // Compute the live tier for each (and refresh the cache).
    for (const e of employees) {
      const tier = await computeTier({ passId: e.proPassId ?? null, employeeId: e.id });
      e.tier = tier;
      e.tierLabel = tier >= 1 ? "Home-Ready" : "Listed";
      if (e.computedTier !== tier) await cacheEmployeeTier(e.id, tier);
    }

    return { employees };
  }),

  // ── Add an employee to the roster (Tier 0) ──────────────────────────────────
  addEmployee: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1).max(100),
      lastName: z.string().min(1).max(100),
      email: z.string().email().optional(),
      phone: z.string().max(30).optional(),
      role: z.string().max(100).optional(),
      employmentType: z.enum(["employee", "contractor", "owner"]).default("employee"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await ensureClearanceInfra();

      const partner = await resolveCallerPartner(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "No partner profile for this account." });

      const id = await nextId("partnerEmployees");
      await (db as any).execute(sql`
        INSERT INTO partnerEmployees (
          id, partnerId, firstName, lastName, email, phone, role,
          employmentType, isActive, rosterStatus, computedTier, createdAt, updatedAt
        ) VALUES (
          ${id}, ${partner.id}, ${input.firstName}, ${input.lastName},
          ${input.email ?? null}, ${input.phone ?? null}, ${input.role ?? null},
          ${input.employmentType}, 1, 'active', 0, NOW(), NOW()
        )
      `);

      return {
        employeeId: id,
        tier: 0,
        tierLabel: "Listed",
        message: `${input.firstName} ${input.lastName} added to your roster. Invite them to credential to raise their clearance.`,
      };
    }),

  // ── Send a self-service credential invite link ──────────────────────────────
  inviteToCredential: protectedProcedure
    .input(z.object({ employeeId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await ensureClearanceInfra();

      const partner = await resolveCallerPartner(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "FORBIDDEN" });

      const empRows = await (db as any).execute(sql`
        SELECT * FROM partnerEmployees WHERE id = ${input.employeeId} AND partnerId = ${partner.id} LIMIT 1
      `);
      const emp = firstRow(empRows);
      if (!emp) throw new TRPCError({ code: "NOT_FOUND", message: "Employee not on your roster." });

      const token = emp.inviteToken || nanoid(32);
      await (db as any).execute(sql`
        UPDATE partnerEmployees
        SET inviteToken = ${token}, inviteSentAt = NOW(), rosterStatus = 'invited', updatedAt = NOW()
        WHERE id = ${input.employeeId}
      `);

      const link = `${BASE_URL}/credential/${token}`;

      // Email the employee their self-service link (best-effort).
      if (emp.email) {
        sendEmail({
          to: emp.email,
          from: FROM_PROLNK,
          subject: `${partner.businessName} invited you to get ProLnk-credentialed`,
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0f172a">
              <h2 style="color:#0f172a;margin:0 0 12px">You're on ${partner.businessName}'s ProLnk roster</h2>
              <p style="color:#475569;line-height:1.6">Hi ${emp.firstName}, complete your own background check to unlock jobs. It takes a few minutes on your phone — your clearance follows you wherever you work.</p>
              <p style="margin:24px 0">
                <a href="${link}" style="background:#0d9488;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;display:inline-block">Start my credential →</a>
              </p>
              <p style="color:#94a3b8;font-size:12px">Or paste this link: ${link}</p>
            </div>`,
        }).catch(() => {});
      }

      // Text the employee too (best-effort).
      if (emp.phone) {
        sendSms(
          emp.phone,
          `${partner.businessName} added you to their ProLnk crew. Get credentialed: ${link}`,
        ).catch(() => {});
      }

      return { success: true, inviteUrl: link, message: "Invite sent. We'll chase them with reminders." };
    }),

  // ── Remove an employee from the roster (soft) ───────────────────────────────
  removeEmployee: protectedProcedure
    .input(z.object({ employeeId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await ensureClearanceInfra();

      const partner = await resolveCallerPartner(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "FORBIDDEN" });

      await (db as any).execute(sql`
        UPDATE partnerEmployees
        SET isActive = 0, rosterStatus = 'removed', updatedAt = NOW()
        WHERE id = ${input.employeeId} AND partnerId = ${partner.id}
      `);

      return { success: true };
    }),

  // ── PUBLIC: employee opens their invite link ────────────────────────────────
  publicResume: publicProcedure
    .input(z.object({ token: z.string().min(8) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      await ensureClearanceInfra();

      const rows = await (db as any).execute(sql`
        SELECT pe.id, pe.firstName, pe.lastName, pe.email, pe.phone, pe.proPassId,
               pe.rosterStatus, p.businessName,
               pp.passCode, pp.backgroundCheckStatus, pp.backgroundCheckExpiresAt
        FROM partnerEmployees pe
        JOIN partners p ON pe.partnerId = p.id
        LEFT JOIN proPassCards pp ON pe.proPassId = pp.id
        WHERE pe.inviteToken = ${input.token} LIMIT 1
      `);
      const emp = firstRow(rows);
      if (!emp) return { valid: false as const };

      const tier = await computeTier({ passId: emp.proPassId ?? null, employeeId: emp.id });

      return {
        valid: true as const,
        firstName: emp.firstName,
        lastName: emp.lastName,
        companyName: emp.businessName,
        backgroundCheckStatus: emp.backgroundCheckStatus ?? "not_submitted",
        tier,
        tierLabel: tier >= 1 ? "Home-Ready" : "Listed",
      };
    }),

  // ── PUBLIC: employee starts their own (candidate-initiated) background check ──
  startSelfBackgroundCheck: publicProcedure
    .input(z.object({ token: z.string().min(8) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await ensureClearanceInfra();

      const rows = await (db as any).execute(sql`
        SELECT pe.*, p.businessName FROM partnerEmployees pe
        JOIN partners p ON pe.partnerId = p.id
        WHERE pe.inviteToken = ${input.token} LIMIT 1
      `);
      const emp = firstRow(rows);
      if (!emp) throw new TRPCError({ code: "NOT_FOUND", message: "Invite link not found." });
      if (!emp.email) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "No email on file — ask your company to add one." });
      }

      // Ensure the employee has a ProPass to own the (portable) check result.
      let passId: number | null = emp.proPassId ?? null;
      if (!passId) {
        passId = await nextId("proPassCards");
        const passCode = nanoid(16);
        await (db as any).execute(sql`
          INSERT INTO proPassCards (
            id, partnerId, employeeId, passCode, firstName, lastName, email, phone,
            status, passScore, backgroundCheckStatus
          ) VALUES (
            ${passId}, ${emp.partnerId}, ${emp.id}, ${passCode},
            ${emp.firstName}, ${emp.lastName}, ${emp.email}, ${emp.phone ?? null},
            'pending', 0, 'not_submitted'
          )
        `);
        await (db as any).execute(sql`
          UPDATE partnerEmployees SET proPassId = ${passId}, updatedAt = NOW() WHERE id = ${emp.id}
        `);
      }

      // Candidate-initiated check via Checkr (report owned by the person → portable).
      const result = await initiateBackgroundCheck({
        partnerEmail: emp.email,
        firstName: emp.firstName,
        lastName: emp.lastName,
        phone: emp.phone ?? undefined,
        partnerId: emp.partnerId,
        passId: passId ?? undefined,
      });

      await (db as any).execute(sql`
        UPDATE partnerEmployees SET rosterStatus = 'in_progress', updatedAt = NOW() WHERE id = ${emp.id}
      `);

      notifyOwner({
        title: `Self-service background check started`,
        content: `${emp.firstName} ${emp.lastName} (${emp.businessName}) started their candidate-initiated background check.`,
      }).catch(() => {});

      if (!result.invitationUrl) {
        // Checkr not configured / failed — surface a soft error the UI can show.
        return {
          success: false,
          invitationUrl: null,
          message: "We couldn't start the background check right now. Please try again shortly.",
        };
      }

      return {
        success: true,
        invitationUrl: result.invitationUrl,
        message: "Background check started. Follow the link to complete it.",
      };
    }),
});
