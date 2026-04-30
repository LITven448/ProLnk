#!/usr/bin/env node
/**
 * Fix all "how it works" copy throughout the platform
 * Corrects the photo description from "3 wide angle exterior shots"
 * to the correct "before & after photos from your actual jobs"
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
    if (!content.includes(oldStr)) { return; }
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(abs, content, "utf8");
    console.log(`✅ Fixed: ${description} in ${filePath}`);
  } catch (e) {
    console.log(`❌ Error patching ${filePath}: ${e.message}`);
  }
}

console.log("📝 Fixing photo flow copy throughout the platform...\n");

// WaitlistProLanding.tsx
patch(
  "client/src/pages/WaitlistProLanding.tsx",
  "Photo description",
  "Upload job photos. Our AI detects what else the homeowner needs and routes it to the right partner.",
  "Take before & after photos of every job — or connect CompanyCam, Jobber, or Housecall Pro and we extract them automatically. Our AI detects what else the homeowner needs and routes those leads to the right partner in your network."
);

patch(
  "client/src/pages/WaitlistProLanding.tsx",
  "Photo title",
  "Every photo becomes a lead",
  "Every job you do generates leads automatically"
);

// Apply.tsx if it has the wrong description
patch(
  "client/src/pages/Apply.tsx",
  "Apply page photo description",
  "Upload photos of completed jobs",
  "Take before & after photos of jobs or connect your FSM tool (CompanyCam, Jobber, etc.) for automatic photo sync"
);

console.log("\n✅ Copy fixes applied");
