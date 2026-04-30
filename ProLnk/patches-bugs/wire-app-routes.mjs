#!/usr/bin/env node
/**
 * Wire new pages into client/src/App.tsx
 * Run: node patches-bugs/wire-app-routes.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_FILE = path.join(ROOT, "client/src/App.tsx");

let content = fs.readFileSync(APP_FILE, "utf8");

// Add new imports near the top (after existing lazy imports or static imports)
const IMPORT_ANCHOR = `import NotFound from "@/pages/NotFound";`;
const NEW_IMPORTS = `import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import BriefcaseManager from "@/pages/BriefcaseManager";
import ProPassManager from "@/pages/ProPassManager";
import BidBoardPage from "@/pages/BidBoardPage";
import ScoutAssessmentWizard from "@/pages/ScoutAssessmentWizard";
import ProPassVerify from "@/pages/ProPassVerify";
import PublicBriefcaseVerify from "@/pages/PublicBriefcaseVerify";
import TrustyProSite from "@/pages/trustypro/TrustyProSite";
import ProLnkMediaSite from "@/pages/media/ProLnkMediaSite";`;

if (!content.includes("import Login from")) {
  content = content.replace(IMPORT_ANCHOR, NEW_IMPORTS);
  console.log("✅ Added new page imports");
} else {
  console.log("⏭  Page imports already added");
}

// Add new routes — find the NotFound route and add before it
const NOT_FOUND_ROUTE = `        <Route component={NotFound} />`;
const NEW_ROUTES = `        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Partner credentialing */}
        <Route path="/dashboard/briefcase" component={BriefcaseManager} />
        <Route path="/dashboard/pro-passes" component={ProPassManager} />

        {/* Bid Board & Scout */}
        <Route path="/dashboard/bid-board" component={BidBoardPage} />
        <Route path="/dashboard/scout" component={ScoutAssessmentWizard} />
        <Route path="/dashboard/scout/new" component={ScoutAssessmentWizard} />
        <Route path="/dashboard/scout/:assessmentId" component={ScoutAssessmentWizard} />

        {/* Public verification */}
        <Route path="/pass/:passCode" component={ProPassVerify} />
        <Route path="/verify/:slug" component={PublicBriefcaseVerify} />

        {/* Brand-specific sites */}
        <Route path="/trustypro-site" component={TrustyProSite} />
        <Route path="/media-site" component={ProLnkMediaSite} />

        <Route component={NotFound} />`;

if (!content.includes("import Login from") || !content.includes("/dashboard/briefcase")) {
  content = content.replace(NOT_FOUND_ROUTE, NEW_ROUTES);
  console.log("✅ Added new routes to App.tsx");
} else {
  console.log("⏭  Routes already added");
}

fs.writeFileSync(APP_FILE, content, "utf8");
console.log("\n✅ client/src/App.tsx updated");
