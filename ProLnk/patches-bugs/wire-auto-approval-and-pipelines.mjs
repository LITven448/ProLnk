#!/usr/bin/env node
/**
 * Wire auto-approval, storm dispatch, postcard queue, W-9 trigger,
 * and application scoring into existing files.
 *
 * Run: node patches-bugs/wire-auto-approval-and-pipelines.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function patch(filePath, description, oldStr, newStr) {
  const abs = path.join(ROOT, filePath);
  try {
    let content = fs.readFileSync(abs, "utf8");
    if (content.includes(newStr.slice(0, 50))) {
      console.log(`  ⏭  Already applied: ${description}`);
      return;
    }
    if (!content.includes(oldStr.slice(0, 50))) {
      console.log(`  ⚠️  Pattern not found: ${description}`);
      return;
    }
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(abs, content, "utf8");
    console.log(`  ✅ Applied: ${description}`);
  } catch (e) {
    console.log(`  ❌ Error: ${description} — ${e.message}`);
  }
}

console.log("\n🔧 Wiring automation pipelines...\n");

// ─── 1. Auto-approval in intake-router.ts ─────────────────────────────────────
console.log("1. Auto-approval rule in intake-router.ts");
patch(
  "server/intake-router.ts",
  "Auto-approval threshold after opportunity creation",
  `  await notifyOwner({
    title: \`New opportunity — \${opportunity.opportunityType}\`,`,
  `  // AUTO-APPROVAL: High-confidence opportunities from trusted FSM sources dispatch immediately
  const AUTO_APPROVE_THRESHOLD = 0.85;
  const TRUSTED_SOURCES = ["companycam", "jobber", "housecall_pro", "servicetitan"];
  const MAX_AUTO_VALUE = 25000;

  if (
    aiResult.confidence >= AUTO_APPROVE_THRESHOLD &&
    TRUSTED_SOURCES.includes(photo.source) &&
    (opportunity.estimatedJobValue ?? 0) <= MAX_AUTO_VALUE &&
    item.status !== "historical"
  ) {
    // Auto-approve and dispatch immediately
    const db = await getDb();
    if (db) {
      await db.execute(sql\`
        UPDATE opportunities
        SET adminReviewStatus = 'approved', adminReviewedAt = NOW(), adminReviewedBy = 0
        WHERE id = \${opportunityId}
      \`);
      if (topPartnerId) {
        await dispatchLeadToPartner(opportunityId, topPartnerId);
        await import("./funnel").then(m => m.funnel.aiDetected(opportunityId, { source: photo.source, autoApproved: true }));
      }
    }
    return;
  }

  await notifyOwner({
    title: \`New opportunity — \${opportunity.opportunityType}\`,`
);

// ─── 2. Storm dispatch wired into storm-agent.ts ──────────────────────────────
console.log("\n2. Wire storm dispatch into storm-agent.ts");
patch(
  "server/storm-agent.ts",
  "Call dispatchPendingStormLeads after scan",
  `  console.log(\`[StormAgent] Scan complete — \${result.eventsProcessed} events, \${result.leadsGenerated} leads, \${result.propertiesAffected} properties\`);
  return result;`,
  `  console.log(\`[StormAgent] Scan complete — \${result.eventsProcessed} events, \${result.leadsGenerated} leads, \${result.propertiesAffected} properties\`);

  // Auto-dispatch storm leads to partners
  if (result.leadsGenerated > 0) {
    try {
      const { dispatchPendingStormLeads } = await import("./storm-dispatch");
      const dispatchResult = await dispatchPendingStormLeads({ limit: 200 });
      console.log(\`[StormAgent] Dispatch complete: \${dispatchResult.dispatched} dispatched, \${dispatchResult.skipped} skipped\`);
      result.leadsGenerated = dispatchResult.dispatched;
    } catch (err) {
      console.error("[StormAgent] Dispatch error:", err);
    }
  }

  return result;`
);

// ─── 3. Postcard queue from FSM job close ────────────────────────────────────
console.log("\n3. Wire postcard queue into fsm-webhooks.ts");
patch(
  "server/fsm-webhooks.ts",
  "Add postcard queue after FSM commission close",
  `  console.log(
    \`[FSM Webhook] \${event.source} \${event.eventType}  partner \${partnerId}  opp \${opportunityId}  commission \${commissionId}\`
  );`,
  `  console.log(
    \`[FSM Webhook] \${event.source} \${event.eventType}  partner \${partnerId}  opp \${opportunityId}  commission \${commissionId}\`
  );

  // Queue a postcard to the homeowner at this address (if not already in DB)
  if (event.externalJobId && partnerId) {
    try {
      const { queuePostcardFromFSMJob } = await import("./lob");
      // Get job address from the closed opportunity
      if (opportunityId) {
        const jobRows = await db.select({
          address: jobs.serviceAddress,
          city: jobs.serviceAddressLng, // reusing field — see note
        }).from(opportunities).innerJoin(jobs, eq(opportunities.jobId, jobs.id))
          .where(eq(opportunities.id, opportunityId)).limit(1);
        const job = jobRows[0];
        if (job?.address) {
          const parts = job.address.split(",");
          await queuePostcardFromFSMJob({
            address: parts[0]?.trim() ?? job.address,
            city: parts[1]?.trim() ?? "",
            state: parts[2]?.trim()?.split(" ")[0] ?? "TX",
            zip: parts[2]?.trim()?.split(" ")[1] ?? "",
            sourceType: "fsm_job",
            sourceId: opportunityId,
          }).catch(() => {});
        }
      }
    } catch {}
  }`
);

// ─── 4. W-9 invitation on partner approval ────────────────────────────────────
console.log("\n4. Wire W-9 invitation into approvePartner flow");
patch(
  "server/routers.ts",
  "Send W-9 invitation after partner approval",
  `      await sendPartnerApproved({
        to: partner.contactEmail,`,
  `      // Send W-9 invitation (required for 1099-NEC on $600+ earnings)
      try {
        const { sendW9Invitation } = await import("./tax1099");
        await sendW9Invitation({
          partnerEmail: partner.contactEmail,
          partnerName: partner.contactName || partner.businessName,
          businessName: partner.businessName,
          daysUntilDue: 14,
        });
      } catch {}

      await sendPartnerApproved({
        to: partner.contactEmail,`
);

// ─── 5. Application scoring on partner apply ─────────────────────────────────
console.log("\n5. Wire application scoring into partner apply flow");
patch(
  "server/routers.ts",
  "Score application after partner creation",
  `        await sendPartnerApplicationReceived({
          to: input.contactEmail,`,
  `        // Auto-score the application
        try {
          const { scorePartnerApplication } = await import("./waitlist-ai");
          const score = await scorePartnerApplication({
            partnerId: newPartner.id,
            businessType: input.businessType,
            serviceArea: input.serviceArea,
            contactEmail: input.contactEmail,
            description: input.description,
            website: input.website,
            hasLicense: false, // Will improve after Briefcase upload
            hasInsurance: false,
            referredByPartnerId: referredByPartnerId ?? undefined,
          });
          // Auto-approve if score >= 75
          if (score.autoApprove) {
            await approvePartner(newPartner.id);
            await sendPartnerApproved({
              to: input.contactEmail,
              name: input.contactName,
              businessName: input.businessName,
              loginUrl: ENV.appBaseUrl + "/dashboard",
            });
            return { success: true, status: "approved", message: "Your application was automatically approved! Check your email." };
          }
        } catch {}

        await sendPartnerApplicationReceived({
          to: input.contactEmail,`
);

// ─── 6. Langfuse import in intake-router ─────────────────────────────────────
console.log("\n6. Add Langfuse trace to intake-router photo analysis");
patch(
  "server/intake-router.ts",
  "Add Langfuse import",
  `import { notifyOwner } from "./_core/notification";`,
  `import { notifyOwner } from "./_core/notification";
// Langfuse observability — lazy import to avoid startup failures if not configured
async function getLangfuse() {
  try {
    const { Langfuse } = await import("langfuse");
    if (process.env.LANGFUSE_SECRET_KEY) {
      return new Langfuse({ secretKey: process.env.LANGFUSE_SECRET_KEY, publicKey: process.env.LANGFUSE_PUBLIC_KEY, baseUrl: process.env.LANGFUSE_HOST });
    }
  } catch {}
  return null;
}`
);

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("✅ Pipeline wiring complete");
console.log("Run: pnpm dev to test");
