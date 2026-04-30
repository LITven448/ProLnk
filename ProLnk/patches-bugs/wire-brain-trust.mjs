#!/usr/bin/env node
/**
 * Wire Brain Trust router + dashboard into the app
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Wire brainTrust router into server/routers.ts
const routersFile = path.join(ROOT, "server/routers.ts");
let routersContent = fs.readFileSync(routersFile, "utf8");

if (!routersContent.includes("brainTrustRouter")) {
  routersContent = routersContent.replace(
    `import { facilityRouter } from "./routers/facility";`,
    `import { facilityRouter } from "./routers/facility";
import { brainTrustRouter } from "./routers/brainTrust";
import { adminDisputesRouter } from "./routers/adminDisputes";
import { smartRouteRouter } from "./routers/smartRoute";`
  );
  routersContent = routersContent.replace(
    `  facility: facilityRouter,`,
    `  facility: facilityRouter,
  brainTrust: brainTrustRouter,
  adminDisputes: adminDisputesRouter,
  smartRoute: smartRouteRouter,`
  );
  fs.writeFileSync(routersFile, routersContent, "utf8");
  console.log("✅ Wired brainTrust, adminDisputes, smartRoute routers");
} else {
  console.log("⏭  Brain Trust already wired");
}

// Wire BrainTrustDashboard into App.tsx
const appFile = path.join(ROOT, "client/src/App.tsx");
let appContent = fs.readFileSync(appFile, "utf8");

if (!appContent.includes("BrainTrustDashboard")) {
  appContent = appContent.replace(
    `import AnalyticsReal from "@/pages/admin/AnalyticsReal";`,
    `import AnalyticsReal from "@/pages/admin/AnalyticsReal";
import BrainTrustDashboard from "@/pages/admin/BrainTrustDashboard";
import CommissionDisputeCenter from "@/pages/admin/CommissionDisputeCenter";`
  );
  appContent = appContent.replace(
    `        <Route path="/admin/analytics-real" component={AnalyticsReal} />`,
    `        <Route path="/admin/analytics-real" component={AnalyticsReal} />
        <Route path="/admin/brain-trust" component={BrainTrustDashboard} />
        <Route path="/admin/disputes" component={CommissionDisputeCenter} />`
  );
  fs.writeFileSync(appFile, appContent, "utf8");
  console.log("✅ Wired BrainTrustDashboard to /admin/brain-trust");
} else {
  console.log("⏭  BrainTrustDashboard already wired");
}

console.log("\n✅ Brain Trust complete. Visit /admin/brain-trust in the app.");
