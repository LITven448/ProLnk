#!/usr/bin/env node
/**
 * Wire all final new routes and routers from Session 3
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_FILE = path.join(ROOT, "client/src/App.tsx");
const ROUTERS_FILE = path.join(ROOT, "server/routers.ts");

// ── App.tsx new routes ────────────────────────────────────────────────────────
let appContent = fs.readFileSync(APP_FILE, "utf8");

const appImportAnchor = `import AdminScoutDashboard from "@/pages/admin/ScoutDashboard";`;
const newAppImports = `import AdminScoutDashboard from "@/pages/admin/ScoutDashboard";
import MaintenanceSchedulePage from "@/pages/homeowner/MaintenanceSchedulePage";
import CommissionDisputeCenter from "@/pages/admin/CommissionDisputeCenter";
import WaitlistManagerNew from "@/pages/admin/WaitlistManagerNew";
import AnalyticsReal from "@/pages/admin/AnalyticsReal";`;

if (!appContent.includes("MaintenanceSchedulePage")) {
  appContent = appContent.replace(appImportAnchor, newAppImports);

  // Add routes
  const routeAnchor = `        <Route path="/admin/scouts" component={AdminScoutDashboard} />`;
  const newRoutes = `        <Route path="/admin/scouts" component={AdminScoutDashboard} />
        <Route path="/admin/disputes" component={CommissionDisputeCenter} />
        <Route path="/admin/waitlist-new" component={WaitlistManagerNew} />
        <Route path="/admin/analytics-real" component={AnalyticsReal} />
        <Route path="/my-home/maintenance" component={MaintenanceSchedulePage} />`;

  appContent = appContent.replace(routeAnchor, newRoutes);
  fs.writeFileSync(APP_FILE, appContent, "utf8");
  console.log("✅ Wired Session 3 React routes");
} else {
  console.log("⏭  Session 3 routes already wired");
}

// ── server/routers.ts — add adminNotifications and checkr ────────────────────
let routersContent = fs.readFileSync(ROUTERS_FILE, "utf8");

if (!routersContent.includes("adminNotificationsRouter")) {
  const importAnchor = `import { facilityRouter } from "./routers/facility";`;
  const newImports = `import { facilityRouter } from "./routers/facility";
import { checkrRouter } from "./routers/checkr";
import { adminNotificationsRouter } from "./routers/adminNotifications";`;

  routersContent = routersContent.replace(importAnchor, newImports);

  const routeAnchor = `  facility: facilityRouter,`;
  const newRoutes = `  facility: facilityRouter,
  checkr: checkrRouter,`;

  // Add admin notifications to existing admin router object if it exists
  if (routersContent.includes("admin.getNotifications")) {
    console.log("⏭  Admin notifications already wired");
  } else {
    // Add as standalone router
    routersContent = routersContent.replace(routeAnchor, newRoutes);
  }

  fs.writeFileSync(ROUTERS_FILE, routersContent, "utf8");
  console.log("✅ Wired Checkr router");
} else {
  console.log("⏭  Session 3 routers already wired");
}

// ── Add admin.resolveCommissionDispute procedure note ────────────────────────
const disputeNote = `
// server/routers.ts needs admin.resolveCommissionDispute and admin.getCommissionDisputes procedures.
// These query the commissions table where disputeStatus = 'open' and allow admin to update it.
// The schema already has full dispute tracking fields on the commissions table.
`.trim();

fs.writeFileSync(path.join(ROOT, "patches-bugs/admin-dispute-procedure-note.txt"), disputeNote, "utf8");

console.log("\n✅ Final route wiring complete");
