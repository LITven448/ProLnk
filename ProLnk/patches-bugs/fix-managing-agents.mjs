#!/usr/bin/env node
/**
 * Fix sendEmail re-declaration in managingTierAgents.ts
 * and add weekly brain trust + subscription commission Inngest jobs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Fix 1: managingTierAgents.ts sendEmail redeclaration
const managingFile = path.join(ROOT, "server/agents/managingTierAgents.ts");
let content = fs.readFileSync(managingFile, "utf8");

if (content.includes("import { sendEmail } from \"../email\";") && content.includes("async function sendEmail(")) {
  // Remove the import (keep the local definition)
  content = content.replace(`import { sendEmail } from "../email";\n`, "");
  // Remove the export statement at end if it exists
  content = content.replace(`export { sendEmail };\n`, "");
  fs.writeFileSync(managingFile, content, "utf8");
  console.log("✅ Fixed sendEmail redeclaration in managingTierAgents.ts");
} else if (content.includes("Re-export from email module")) {
  // Fix the comment and consolidate
  content = content.replace(
    `// Re-export from email module\nasync function sendEmail(opts: { to: string; subject: string; html: string }) {`,
    `async function sendEmailInternal(opts: { to: string; subject: string; html: string }) {`
  );
  content = content.replace(/sendEmail\(/g, (match, offset) => {
    // Only replace the function calls, not definitions
    return "sendEmailInternal(";
  });
  fs.writeFileSync(managingFile, content, "utf8");
  console.log("✅ Fixed sendEmail by renaming to sendEmailInternal");
} else {
  console.log("⏭  managingTierAgents.ts sendEmail issue not found (may already be fixed)");
}

// Fix 2: Add weekly brain trust + monthly subscription commissions to inngest.ts
const inngestFile = path.join(ROOT, "server/inngest.ts");
let inngestContent = fs.readFileSync(inngestFile, "utf8");

if (!inngestContent.includes("weeklyBrainTrust")) {
  // Add new jobs before the export
  inngestContent = inngestContent.replace(
    `// ─── Export all functions ─────────────────────────────────────────────────────`,
    `// ─── Weekly Brain Trust Council ───────────────────────────────────────────────
export const weeklyBrainTrust = inngest.createFunction(
  { id: "weekly-brain-trust", name: "Weekly Brain Trust Council", retries: 1 },
  { cron: "0 7 * * 1" }, // Monday 7 AM
  async ({ step, logger }) => {
    return step.run("run-council", async () => {
      const { runBrainTrustCouncil } = await import("./agents/executiveTier");
      const result = await runBrainTrustCouncil();
      logger.info(\`Brain Trust: health=\${result.confidenceScore}, priorities=\${result.weeklyPriorityList?.length}\`);
      return result;
    });
  }
);

// ─── Monthly Subscription Commission Processing ────────────────────────────────
export const monthlySubscriptionCommissions = inngest.createFunction(
  { id: "monthly-subscription-commissions", name: "Monthly Subscription Commissions", retries: 2 },
  { cron: "0 6 1 * *" }, // 1st of each month at 6 AM
  async ({ step, logger }) => {
    const billingPeriod = new Date().toISOString().slice(0, 7); // "2026-04"
    return step.run("process-sub-commissions", async () => {
      const { processSubscriptionNetworkCommissions } = await import("./foundingPartner");
      const result = await processSubscriptionNetworkCommissions(billingPeriod);
      logger.info(\`Subscription commissions: \${result.processed} records, $\${result.totalCommissions.toFixed(2)}\`);
      return result;
    });
  }
);

// ─── Weekly Commission Audit ───────────────────────────────────────────────────
export const weeklyCommissionAudit = inngest.createFunction(
  { id: "weekly-commission-audit", name: "Weekly Commission Audit", retries: 1 },
  { cron: "0 6 * * 0" }, // Sunday 6 AM
  async ({ step }) => {
    return step.run("audit", async () => {
      const { runCommissionAudit } = await import("./agents/commissionAuditAgent");
      return runCommissionAudit();
    });
  }
);

// ─── Weekly Data Integrity ─────────────────────────────────────────────────────
export const weeklyDataIntegrity = inngest.createFunction(
  { id: "weekly-data-integrity", name: "Weekly Data Integrity", retries: 1 },
  { cron: "0 5 * * 0" }, // Sunday 5 AM
  async ({ step }) => {
    return step.run("integrity", async () => {
      const { runDataIntegrityCheck } = await import("./agents/dataIntegrityAgent");
      return runDataIntegrityCheck();
    });
  }
);

// ─── Monthly Advertiser Reports ────────────────────────────────────────────────
export const monthlyAdvertiserReports = inngest.createFunction(
  { id: "monthly-advertiser-reports", name: "Monthly Advertiser Reports", retries: 1 },
  { cron: "0 9 2 * *" }, // 2nd of each month at 9 AM
  async ({ step, logger }) => {
    return step.run("send-reports", async () => {
      const { getDb } = await import("./db");
      const { sql } = await import("drizzle-orm");
      const { generateAdvertiserReport } = await import("./agents/mediaAgents");
      const db = await getDb();
      if (!db) return { sent: 0 };
      const rows = await (db as any).execute(sql\`SELECT id FROM featuredAdvertisers WHERE status = 'active'\`);
      const advertisers = rows.rows || rows;
      let sent = 0;
      for (const adv of advertisers) {
        const report = await generateAdvertiserReport(adv.id).catch(() => null);
        if (report) sent++;
      }
      logger.info(\`Monthly advertiser reports: \${sent} sent\`);
      return { sent };
    });
  }
);

// ─── Export all functions ─────────────────────────────────────────────────────`
  );

  // Add new functions to the export array
  inngestContent = inngestContent.replace(
    `  dailyMarketingAutomation,\n];`,
    `  dailyMarketingAutomation,
  weeklyBrainTrust,
  monthlySubscriptionCommissions,
  weeklyCommissionAudit,
  weeklyDataIntegrity,
  monthlyAdvertiserReports,
];`
  );

  fs.writeFileSync(inngestFile, inngestContent, "utf8");
  console.log("✅ Added weekly/monthly Inngest jobs to inngest.ts");
} else {
  console.log("⏭  Weekly jobs already in inngest.ts");
}

console.log("\n✅ Agent fixes applied");
