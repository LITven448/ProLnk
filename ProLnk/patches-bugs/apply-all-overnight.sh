#!/bin/bash
# ProLnk — Apply ALL overnight builds (both sessions)
# Run from project root: bash patches-bugs/apply-all-overnight.sh

set -e
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ProLnk Complete Overnight Build — Apply Everything"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo ""
echo "Step 1: Apply P0 bug fixes..."
node patches-bugs/apply-all-bugs.mjs

echo ""
echo "Step 2: Wire new routers (Session 1)..."
node patches-bugs/wire-new-routers.mjs

echo ""
echo "Step 3: Wire additional routers (Session 2)..."
node patches-bugs/wire-additional-routers.mjs

echo ""
echo "Step 4: Wire Inngest + integration OAuth routes..."
node patches-bugs/wire-inngest.mjs

echo ""
echo "Step 5: Wire new React routes (Session 1)..."
node patches-bugs/wire-app-routes.mjs

echo ""
echo "Step 6: Wire additional React routes (Session 2)..."
node patches-bugs/wire-additional-app-routes.mjs

echo ""
echo "Step 7: Fix photo flow copy throughout the platform..."
node patches-bugs/fix-copy.mjs

echo ""
echo "Step 8: Run database migrations..."
if [ -n "$DATABASE_URL" ]; then
  node scripts/run-migration.mjs
else
  echo "⚠️  DATABASE_URL not set — run manually: node scripts/run-migration.mjs"
fi

echo ""
echo "Step 9: Add unique constraint on commissions..."
if [ -n "$DATABASE_URL" ]; then
  node patches-bugs/add-commission-constraint.mjs
fi

echo ""
echo "Step 10: Install new npm packages..."
pnpm add mem0ai @getzep/zep-cloud @qdrant/js-client-rest inngest replicate web-push smartystreets-javascript-sdk graphql-request 2>/dev/null || echo "⚠️  pnpm add partially failed — install packages manually"

echo ""
echo "Step 11: Sync knowledge base to Qdrant..."
if [ -n "$QDRANT_URL" ] && [ -n "$OPENAI_API_KEY" ]; then
  node scripts/sync-knowledge-base.mjs
else
  echo "⚠️  QDRANT_URL or OPENAI_API_KEY not set — run manually after setup: node scripts/sync-knowledge-base.mjs"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Complete! All overnight builds applied."
echo ""
echo "  IMPORTANT — Do these now:"
echo "  1. Rotate API keys exposed in chat:"
echo "     - Resend: resend.com → API Keys → delete + create new"
echo "     - Stripe: dashboard.stripe.com → Developers → Roll key"
echo "     - Anthropic: console.anthropic.com → API Keys → delete + create"
echo ""
echo "  2. Set up accounts (see .env.example for all needed vars):"
echo "     - OpenAI API key: platform.openai.com"
echo "     - Cloudflare R2: cloudflare.com"
echo "     - Railway: railway.app (hosting)"
echo "     - Zep Cloud: getzep.com"
echo "     - Twilio + 10DLC: twilio.com"
echo ""
echo "  3. DNS for TrustyPro.io:"
echo "     - Point CNAME @ → your Manus/Railway URL"
echo "     - DNS propagation: 5-60 minutes"
echo ""
echo "  4. Start service titan developer application:"
echo "     developer.servicetitan.io"
echo ""
echo "  5. pnpm dev to test locally"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
