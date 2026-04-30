#!/usr/bin/env node
/**
 * Wire Founding Partner system into routers.ts and App.tsx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Wire into routers.ts
const routersFile = path.join(ROOT, "server/routers.ts");
let routersContent = fs.readFileSync(routersFile, "utf8");

if (!routersContent.includes("foundingPartnerRouter")) {
  routersContent = routersContent.replace(
    `import { brainTrustRouter } from "./routers/brainTrust";`,
    `import { brainTrustRouter } from "./routers/brainTrust";
import { foundingPartnerRouter } from "./routers/foundingPartner";`
  );
  routersContent = routersContent.replace(
    `  brainTrust: brainTrustRouter,`,
    `  brainTrust: brainTrustRouter,
  foundingPartner: foundingPartnerRouter,`
  );
  fs.writeFileSync(routersFile, routersContent, "utf8");
  console.log("✅ Wired foundingPartner router");
}

// Wire into App.tsx
const appFile = path.join(ROOT, "client/src/App.tsx");
let appContent = fs.readFileSync(appFile, "utf8");

if (!appContent.includes("FoundingPartnerPage")) {
  appContent = appContent.replace(
    `import BrainTrustDashboard from "@/pages/admin/BrainTrustDashboard";`,
    `import BrainTrustDashboard from "@/pages/admin/BrainTrustDashboard";
import FoundingPartnerPage from "@/pages/FoundingPartnerPage";`
  );
  appContent = appContent.replace(
    `        <Route path="/admin/brain-trust" component={BrainTrustDashboard} />`,
    `        <Route path="/admin/brain-trust" component={BrainTrustDashboard} />
        <Route path="/founding-partner" component={FoundingPartnerPage} />`
  );
  fs.writeFileSync(appFile, appContent, "utf8");
  console.log("✅ Wired /founding-partner route");
}

// Add DB migration note
console.log("\n📋 Run the new migration:");
console.log("  node scripts/run-migration.mjs");
console.log("  (Applies drizzle/0005_founding_partners.sql)");
console.log("\n✅ Founding Partner system wired and ready.");
