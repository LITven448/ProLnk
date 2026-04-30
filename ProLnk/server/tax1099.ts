/**
 * Tax1099 Integration — W-9 Collection & 1099-NEC Filing
 *
 * Any partner earning $600+ in a calendar year from ProLnk referral
 * commissions requires a 1099-NEC by January 31st.
 *
 * This module:
 *   1. Sends W-9 invitation to newly approved partners
 *   2. Tracks W-9 completion status
 *   3. At year-end, generates 1099-NEC for all qualifying partners
 *
 * API: tax1099.com (REST, no official npm package)
 */

const TAX1099_API_KEY = process.env.TAX1099_API_KEY ?? "";
const TAX1099_BASE = "https://api.tax1099.com/v1";

function tax1099Headers() {
  return {
    Authorization: `Bearer ${TAX1099_API_KEY}`,
    "Content-Type": "application/json",
  };
}

// ─── W-9 Collection ───────────────────────────────────────────────────────────

export async function sendW9Invitation(opts: {
  partnerEmail: string;
  partnerName: string;
  businessName: string;
  daysUntilDue?: number;
}): Promise<{ requestId: string | null; success: boolean }> {
  if (!TAX1099_API_KEY) {
    console.log(`[Tax1099] No API key — W-9 invitation would be sent to ${opts.partnerEmail}`);
    return { requestId: null, success: false };
  }

  try {
    const dueDate = new Date(Date.now() + (opts.daysUntilDue ?? 14) * 24 * 60 * 60 * 1000);
    const res = await fetch(`${TAX1099_BASE}/w9requests`, {
      method: "POST",
      headers: tax1099Headers(),
      body: JSON.stringify({
        email: opts.partnerEmail,
        name: opts.partnerName,
        business_name: opts.businessName,
        due_date: dueDate.toISOString().split("T")[0],
        reminder_enabled: true,
      }),
    });

    if (!res.ok) {
      console.error(`[Tax1099] W-9 invitation failed: ${res.status}`);
      return { requestId: null, success: false };
    }

    const data = await res.json() as any;
    return { requestId: data.id, success: true };
  } catch (err) {
    console.error("[Tax1099] W-9 invitation error:", err);
    return { requestId: null, success: false };
  }
}

// ─── W-9 Webhook Handler ──────────────────────────────────────────────────────

export async function handleW9Completed(payload: any): Promise<void> {
  const { getDb } = await import("./db");
  const { sql } = await import("drizzle-orm");
  const db = await getDb();
  if (!db) return;

  const email = payload.email || payload.recipient_email;
  const tinVerified = payload.tin_verified === true;

  if (!email) return;

  await (db as any).execute(sql`
    UPDATE partners
    SET w9CompletedAt = NOW(),
        w9FileUrl = ${payload.w9_url ?? null}
    WHERE contactEmail = ${email}
  `);

  console.log(`[Tax1099] W-9 completed for ${email} (TIN verified: ${tinVerified})`);
}

// ─── Year-End 1099-NEC Filing ─────────────────────────────────────────────────

export async function file1099NEC(opts: {
  recipientName: string;
  recipientEmail: string;
  recipientTin: string; // SSN or EIN
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  nonemployeeCompensation: number; // Box 1
  taxYear: number;
}): Promise<{ formId: string | null; success: boolean }> {
  if (!TAX1099_API_KEY) {
    console.log(`[Tax1099] Would file 1099-NEC for ${opts.recipientEmail}: $${opts.nonemployeeCompensation}`);
    return { formId: null, success: false };
  }

  try {
    const res = await fetch(`${TAX1099_BASE}/forms/1099nec`, {
      method: "POST",
      headers: tax1099Headers(),
      body: JSON.stringify({
        tax_year: opts.taxYear,
        recipient: {
          name: opts.recipientName,
          email: opts.recipientEmail,
          tin: opts.recipientTin,
          address: {
            line1: opts.recipientAddress,
            city: opts.recipientCity,
            state: opts.recipientState,
            zip: opts.recipientZip,
          },
        },
        payer: {
          name: "ProLnk LLC",
          tin: process.env.PROLNK_EIN ?? "",
          address: {
            line1: "1234 Main St",
            city: "Dallas",
            state: "TX",
            zip: "75201",
          },
        },
        amounts: {
          box1_nonemployee_compensation: opts.nonemployeeCompensation,
        },
        delivery: {
          email: true,
          postal: false,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[Tax1099] 1099-NEC filing failed: ${res.status} ${err}`);
      return { formId: null, success: false };
    }

    const data = await res.json() as any;
    return { formId: data.id, success: true };
  } catch (err) {
    console.error("[Tax1099] 1099-NEC filing error:", err);
    return { formId: null, success: false };
  }
}

// ─── Annual filing sweep ──────────────────────────────────────────────────────

export async function runAnnual1099Filing(taxYear: number): Promise<{
  filed: number;
  skipped: number;
  errors: string[];
}> {
  const { getDb } = await import("./db");
  const { sql } = await import("drizzle-orm");
  const db = await getDb();
  if (!db) return { filed: 0, skipped: 0, errors: ["Database unavailable"] };

  const result = { filed: 0, skipped: 0, errors: [] as string[] };

  // Find all partners who earned $600+ in commissions during taxYear
  const rows = await (db as any).execute(sql`
    SELECT
      p.id, p.businessName, p.contactEmail, p.contactName,
      p.w9CompletedAt, p.w9FileUrl,
      SUM(c.amount) as totalEarned
    FROM commissions c
    JOIN partners p ON c.receivingPartnerId = p.id
    WHERE c.paid = 1
      AND YEAR(c.paidAt) = ${taxYear}
    GROUP BY p.id
    HAVING totalEarned >= 600
    ORDER BY totalEarned DESC
  `);
  const partners = rows.rows || rows;

  for (const partner of partners) {
    if (!partner.w9CompletedAt) {
      result.skipped++;
      result.errors.push(`${partner.businessName} (${partner.contactEmail}): No W-9 on file — cannot file 1099`);
      continue;
    }

    const { success, formId } = await file1099NEC({
      recipientName: partner.contactName || partner.businessName,
      recipientEmail: partner.contactEmail,
      recipientTin: "", // Retrieved from Tax1099's W-9 record
      recipientAddress: "",
      recipientCity: "",
      recipientState: "TX",
      recipientZip: "",
      nonemployeeCompensation: parseFloat(partner.totalEarned),
      taxYear,
    });

    if (success) {
      result.filed++;
      console.log(`[Tax1099] Filed 1099-NEC for ${partner.businessName}: $${parseFloat(partner.totalEarned).toFixed(2)}`);
    } else {
      result.skipped++;
      result.errors.push(`Failed to file for ${partner.businessName}`);
    }

    await new Promise(r => setTimeout(r, 200)); // Rate limiting
  }

  console.log(`[Tax1099] Annual filing complete: ${result.filed} filed, ${result.skipped} skipped`);
  return result;
}
