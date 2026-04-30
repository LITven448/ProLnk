#!/usr/bin/env node
/**
 * Wire additional routers into server/routers.ts
 * (Checkr, admin notifications, facility)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ROUTERS_FILE = path.join(ROOT, "server/routers.ts");

let content = fs.readFileSync(ROUTERS_FILE, "utf8");

// Add imports
const IMPORT_ANCHOR = `import { projectBidsRouter } from "./routers/projectBids";`;
const NEW_IMPORTS = `import { projectBidsRouter } from "./routers/projectBids";
import { checkrRouter } from "./routers/checkr";
import { adminNotificationsRouter } from "./routers/adminNotifications";
import { facilityRouter } from "./routers/facility";`;

if (!content.includes("checkrRouter")) {
  content = content.replace(IMPORT_ANCHOR, NEW_IMPORTS);
  console.log("✅ Added new router imports");
}

// Wire into appRouter
const ROUTE_ANCHOR = `  projectBids: projectBidsRouter,`;
const NEW_ROUTES = `  projectBids: projectBidsRouter,
  checkr: checkrRouter,
  facility: facilityRouter,
  admin: {
    ...adminNotificationsRouter,
  },`;

if (!content.includes("checkr: checkrRouter")) {
  content = content.replace(ROUTE_ANCHOR, NEW_ROUTES);
  console.log("✅ Wired additional routers");
}

// Also wire admin.getNotifications and admin.getPlatformHealth (if admin router exists)
// Update the existing admin router section to include notification methods
if (!content.includes("adminNotificationsRouter")) {
  // Find the existing admin section and extend it
  content = content.replace(
    "import { adminNotificationsRouter } from \"./routers/adminNotifications\";",
    "import { adminNotificationsRouter } from \"./routers/adminNotifications\";"
  );
}

fs.writeFileSync(ROUTERS_FILE, content, "utf8");
console.log("\n✅ server/routers.ts updated with additional routers");
