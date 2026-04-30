#!/usr/bin/env node
/**
 * Wire new routers into server/routers.ts
 * Run: node patches-bugs/wire-new-routers.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ROUTERS_FILE = path.join(ROOT, "server/routers.ts");

let content = fs.readFileSync(ROUTERS_FILE, "utf8");

// 1. Add new imports after the last existing router import
const IMPORT_ANCHOR = `import { partnerToolsRouter } from "./routers/partnerTools";`;
const NEW_IMPORTS = `import { partnerToolsRouter } from "./routers/partnerTools";
import { projectBidsRouter } from "./routers/projectBids";
import { scoutRouter } from "./routers/scout";
import { bidBoardRouter } from "./routers/bidBoard";
import { briefcaseRouter } from "./routers/briefcase";
import { proPassRouter } from "./routers/proPass";
import { facilityRouter } from "./routers/facility";`;

if (!content.includes("scoutRouter")) {
  content = content.replace(IMPORT_ANCHOR, NEW_IMPORTS);
  console.log("✅ Added new router imports");
} else {
  console.log("⏭  New router imports already present");
}

// 2. Wire routers into appRouter
const ROUTER_ANCHOR = `  partnerTools: partnerToolsRouter,`;
const NEW_ROUTES = `  partnerTools: partnerToolsRouter,
  projectBids: projectBidsRouter,
  scout: scoutRouter,
  bidBoard: bidBoardRouter,
  briefcase: briefcaseRouter,
  proPass: proPassRouter,
  facility: facilityRouter,`;

if (!content.includes("scout: scoutRouter")) {
  content = content.replace(ROUTER_ANCHOR, NEW_ROUTES);
  console.log("✅ Wired new routers into appRouter");
} else {
  console.log("⏭  New routers already wired");
}

fs.writeFileSync(ROUTERS_FILE, content, "utf8");
console.log("\n✅ server/routers.ts updated successfully");
console.log("\nNext: Run the database migration:");
console.log("  node -e \"require('dotenv').config(); require('./scripts/run-migration.mjs')\"");
