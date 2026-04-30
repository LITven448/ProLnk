#!/bin/bash
# ProLnk Session 3 — Apply Everything
# Run from project root: bash patches-bugs/apply-session3.sh

set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs 2>/dev/null || true)
fi

echo "Session 3 patches applying..."

echo "1. Wire automation pipelines (auto-approval, storm dispatch, postcard, W-9, scoring)..."
node patches-bugs/wire-auto-approval-and-pipelines.mjs

echo "2. Wire final routes (Session 3 pages)..."
node patches-bugs/wire-final-routes.mjs

echo "3. Update dashboard nav..."
node patches-bugs/update-dashboard-nav.mjs

echo "4. Fix photo flow copy..."
node patches-bugs/fix-copy.mjs

echo "5. Delete Section 10 from PROLNK_AUDIT.md..."
node patches-bugs/delete-audit-section-10.mjs

echo ""
echo "✅ Session 3 complete"
echo ""
echo "To apply ALL three sessions at once:"
echo "  bash patches-bugs/apply-all-overnight.sh"
echo "  bash patches-bugs/apply-session3.sh"
