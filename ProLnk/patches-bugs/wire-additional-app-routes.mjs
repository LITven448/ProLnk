#!/usr/bin/env node
/**
 * Wire additional pages into client/src/App.tsx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_FILE = path.join(ROOT, "client/src/App.tsx");

let content = fs.readFileSync(APP_FILE, "utf8");

const IMPORT_ANCHOR = `import TrustyProSite from "@/pages/trustypro/TrustyProSite";`;
const NEW_IMPORTS = `import TrustyProSite from "@/pages/trustypro/TrustyProSite";
import HomeHealthVaultPage from "@/pages/homeowner/HomeHealthVaultPage";
import RenderingConversation from "@/pages/homeowner/RenderingConversation";
import PartnerOnboardingWizard from "@/pages/PartnerOnboardingWizard";
import IntegrationSettingsPage from "@/pages/IntegrationSettingsPage";
import AdminNotificationCenter from "@/pages/admin/NotificationCenter";
import PlatformHealthDashboard from "@/pages/admin/PlatformHealthDashboard";
import BriefcaseAdmin from "@/pages/admin/BriefcaseAdmin";
import AdminScoutDashboard from "@/pages/admin/ScoutDashboard";`;

if (!content.includes("HomeHealthVaultPage")) {
  content = content.replace(IMPORT_ANCHOR, NEW_IMPORTS);
  console.log("✅ Added new page imports");
}

const ROUTE_ANCHOR = `        <Route path="/media-site" component={ProLnkMediaSite} />`;
const NEW_ROUTES = `        <Route path="/media-site" component={ProLnkMediaSite} />

        {/* Homeowner features */}
        <Route path="/my-home/vault" component={HomeHealthVaultPage} />
        <Route path="/my-home/design" component={RenderingConversation} />

        {/* Partner features */}
        <Route path="/dashboard/onboarding" component={PartnerOnboardingWizard} />
        <Route path="/dashboard/integrations" component={IntegrationSettingsPage} />

        {/* Admin */}
        <Route path="/admin/notifications" component={AdminNotificationCenter} />
        <Route path="/admin/platform-health-new" component={PlatformHealthDashboard} />
        <Route path="/admin/briefcases" component={BriefcaseAdmin} />
        <Route path="/admin/scouts" component={AdminScoutDashboard} />`;

if (!content.includes("HomeHealthVaultPage")) {
  content = content.replace(ROUTE_ANCHOR, NEW_ROUTES);
  console.log("✅ Added new routes");
}

fs.writeFileSync(APP_FILE, content, "utf8");
console.log("\n✅ client/src/App.tsx updated with additional routes");
