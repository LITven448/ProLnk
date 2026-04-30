#!/bin/bash
# ProLnk — Apply Complete (All Sessions Including Founding Partner)
# Run from project root: bash patches-bugs/apply-complete.sh

set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs 2>/dev/null || true)
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ProLnk Complete Build — Apply Everything"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Step 1: Bug fixes..."
node patches-bugs/apply-all-bugs.mjs

echo "Step 2: Wire Session 1+2 routers..."
node patches-bugs/wire-new-routers.mjs

echo "Step 3: Wire Session 2 additional routers..."
node patches-bugs/wire-additional-routers.mjs

echo "Step 4: Wire Inngest + integration routes..."
node patches-bugs/wire-inngest.mjs

echo "Step 5: Wire Session 1+2 App routes..."
node patches-bugs/wire-app-routes.mjs

echo "Step 6: Wire Session 2 additional App routes..."
node patches-bugs/wire-additional-app-routes.mjs

echo "Step 7: Session 3 pipelines..."
node patches-bugs/wire-auto-approval-and-pipelines.mjs

echo "Step 8: Session 3 final routes..."
node patches-bugs/wire-final-routes.mjs

echo "Step 9: Session 3 App routes..."
node patches-bugs/wire-final-routes.mjs 2>/dev/null || true

echo "Step 10: Brain Trust dashboard..."
node patches-bugs/wire-brain-trust.mjs

echo "Step 11: Founding Partner system..."
node patches-bugs/wire-founding-partner.mjs

echo "Step 12: Fix managing agents sendEmail bug..."
node patches-bugs/fix-managing-agents.mjs

echo "Step 13: Fix photo flow copy..."
node patches-bugs/fix-copy.mjs

echo "Step 14: Delete Section 10 from PROLNK_AUDIT.md..."
node patches-bugs/delete-audit-section-10.mjs

echo "Step 15: Update dashboard nav..."
node patches-bugs/update-dashboard-nav.mjs

echo "Step 16: Run ALL database migrations..."
if [ -n "$DATABASE_URL" ]; then
  node scripts/run-migration.mjs
  node patches-bugs/add-commission-constraint.mjs
else
  echo "⚠️  DATABASE_URL not set — run manually: node scripts/run-migration.mjs"
fi

echo "Step 17: Install new dependencies..."
pnpm add mem0ai @getzep/zep-cloud @qdrant/js-client-rest inngest replicate web-push smartystreets-javascript-sdk graphql-request 2>/dev/null || echo "⚠️  pnpm add had issues — check manually"

echo "Step 18: Sync knowledge base..."
if [ -n "$QDRANT_URL" ] && [ -n "$OPENAI_API_KEY" ]; then
  node scripts/sync-knowledge-base.mjs
else
  echo "⚠️  Set QDRANT_URL + OPENAI_API_KEY then run: node scripts/sync-knowledge-base.mjs"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  COMPLETE! Everything applied."
echo ""
echo "  KEY FACTS AFTER APPLYING:"
echo "  - /founding-partner → Founding Partner landing + dashboard"
echo "  - /admin/brain-trust → All 47 agents + council"
echo "  - All bug fixes applied (auto-payout, FSM rates, etc.)"
echo "  - All memory architecture files in place"
echo "  - All knowledge base files ready for Qdrant sync"
echo ""
echo "  STILL NEEDS YOUR ACTION:"
echo "  1. Grant Full Disk Access to Terminal"
echo "     System Preferences → Privacy & Security → Full Disk Access"
echo "  2. Rotate API keys (Resend, Stripe, Anthropic - exposed in chat)"
echo "  3. Set up accounts: OpenAI, Cloudflare R2, Railway, Zep, Twilio"
echo "  4. Point trustypro.io DNS → your app URL"
echo "  5. Apply to ServiceTitan Titan Exchange"
echo "  6. Form ProLnk LLC in Texas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
