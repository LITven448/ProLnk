#!/usr/bin/env node
/**
 * Deletes Section 10 (Top 20 Priority Gaps) from PROLNK_AUDIT.md
 * as requested by Andrew.
 * Run: node patches-bugs/delete-audit-section-10.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const AUDIT_FILE = path.join(ROOT, "PROLNK_AUDIT.md");

try {
  let content = fs.readFileSync(AUDIT_FILE, "utf8");

  // Find Section 10 and Section 11 boundaries
  const section10Start = content.indexOf("## SECTION 10: TOP 20 PRIORITY GAPS");
  const section11Start = content.indexOf("## SECTION 11:");

  if (section10Start === -1) {
    console.log("⏭  Section 10 already removed or not found");
    process.exit(0);
  }

  if (section11Start === -1) {
    console.log("⚠️  Section 11 not found — removing from Section 10 to end");
    content = content.slice(0, section10Start).trim() + "\n";
  } else {
    // Remove Section 10 (keep everything before it and everything from Section 11 on)
    content = content.slice(0, section10Start).trim() + "\n\n" + content.slice(section11Start);
  }

  fs.writeFileSync(AUDIT_FILE, content, "utf8");
  console.log("✅ Section 10 (Top 20 Priority Gaps) removed from PROLNK_AUDIT.md");
} catch (e) {
  console.error("❌ Error:", e.message);
}
