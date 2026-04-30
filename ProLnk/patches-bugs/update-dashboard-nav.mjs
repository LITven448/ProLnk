#!/usr/bin/env node
/**
 * Updates DashboardLayout nav to include all new pages:
 * Briefcase, Pro Passes, Scout, Bid Board, Integrations
 *
 * Run: node patches-bugs/update-dashboard-nav.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Update partner dashboard layout
const dashFile = path.join(ROOT, "client/src/components/DashboardLayout.tsx");
if (fs.existsSync(dashFile)) {
  let content = fs.readFileSync(dashFile, "utf8");

  // Add new nav items after "Job History" if they don't already exist
  if (!content.includes("/dashboard/briefcase") && !content.includes("Briefcase")) {
    // Find a good insertion point and add the new items
    content = content.replace(
      `{ path: "/dashboard/jobs"`,
      `{ path: "/dashboard/bid-board", icon: null, label: "Bid Board" },
      { path: "/dashboard/scout", icon: null, label: "Scout Assessment" },
      { path: "/dashboard/briefcase", icon: null, label: "Briefcase" },
      { path: "/dashboard/pro-passes", icon: null, label: "Pro Passes" },
      { path: "/dashboard/integrations", icon: null, label: "Integrations" },
      { path: "/dashboard/jobs"`
    );
    fs.writeFileSync(dashFile, content, "utf8");
    console.log("✅ Updated DashboardLayout with new nav items");
  } else {
    console.log("⏭  DashboardLayout already has new nav items");
  }
} else {
  // Create a patch note
  const patchNote = `
// DashboardLayout.tsx needs these nav items added to the sidebar:
// - /dashboard/bid-board → "Bid Board"
// - /dashboard/scout → "Scout Assessment"
// - /dashboard/briefcase → "Briefcase"
// - /dashboard/pro-passes → "Pro Passes"
// - /dashboard/integrations → "Integrations"
// Add these to the existing nav items array.
  `.trim();
  fs.writeFileSync(path.join(ROOT, "patches-bugs/dashboard-nav-note.txt"), patchNote, "utf8");
  console.log("⚠️  DashboardLayout.tsx not found — see patches-bugs/dashboard-nav-note.txt");
}

// Update AdminLayout nav
const adminFile = path.join(ROOT, "client/src/components/AdminLayout.tsx");
if (fs.existsSync(adminFile)) {
  let content = fs.readFileSync(adminFile, "utf8");

  if (!content.includes("/admin/notifications") && !content.includes("Notifications")) {
    const adminNavNote = `
// AdminLayout.tsx needs these nav items added:
// - /admin/notifications → "Notification Center" (daily check)
// - /admin/platform-health-new → "Platform Health" (real-time)
// - /admin/briefcases → "Briefcase Review"
// - /admin/scouts → "Scout Assessments"
// - /admin/bid-board → "Bid Board"
    `.trim();
    fs.writeFileSync(path.join(ROOT, "patches-bugs/admin-nav-note.txt"), adminNavNote, "utf8");
    console.log("⚠️  AdminLayout.tsx exists but Notification Center not found — see admin-nav-note.txt");
  }
}

// Update HomeownerLayout nav
const hoFile = path.join(ROOT, "client/src/components/HomeownerLayout.tsx");
if (fs.existsSync(hoFile)) {
  let content = fs.readFileSync(hoFile, "utf8");

  if (!content.includes("/my-home/vault")) {
    const hoNavNote = `
// HomeownerLayout.tsx needs these nav items added:
// - /my-home/vault → "Home Health Vault"
// - /my-home/design → "AI Design Studio"
// - /my-home/maintenance → "Maintenance Schedule"
    `.trim();
    fs.writeFileSync(path.join(ROOT, "patches-bugs/homeowner-nav-note.txt"), hoNavNote, "utf8");
  }
}

console.log("\n✅ Nav update scripts complete");
