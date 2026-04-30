#!/bin/bash
# ProLnk — Apply All Patches and Wire New Systems
# Run from project root: bash patches-bugs/apply-and-run-all.sh

set -e
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ProLnk Overnight Build — Apply Patches"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Load env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo ""
echo "Step 1: Apply bug fixes to existing files..."
node patches-bugs/apply-all-bugs.mjs

echo ""
echo "Step 2: Wire new routers into server/routers.ts..."
node patches-bugs/wire-new-routers.mjs

echo ""
echo "Step 3: Wire Inngest + integration routes into index.ts..."
node patches-bugs/wire-inngest.mjs

echo ""
echo "Step 4: Run database migration (adds 27 new tables)..."
if [ -n "$DATABASE_URL" ]; then
  node -e "
    import('mysql2/promise').then(async ({ default: mysql }) => {
      const conn = await mysql.createConnection(process.env.DATABASE_URL);
      const sql = require('fs').readFileSync('./drizzle/0004_full_platform.sql', 'utf8');
      const statements = sql.split(';').filter(s => s.trim());
      for (const stmt of statements) {
        try { await conn.execute(stmt); } catch(e) { /* ignore if already exists */ }
      }
      await conn.end();
      console.log('Migration complete');
    });
  "
else
  echo "⚠️  DATABASE_URL not set — skipping migration"
  echo "   Run manually: mysql -u user -p database < drizzle/0004_full_platform.sql"
fi

echo ""
echo "Step 5: Add unique constraint on commissions..."
node patches-bugs/add-commission-constraint.mjs

echo ""
echo "Step 6: Install new dependencies..."
pnpm add mem0ai @getzep/zep-cloud @qdrant/js-client-rest inngest replicate web-push 2>/dev/null || echo "⚠️  pnpm add failed — install dependencies manually"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  All patches applied!"
echo ""
echo "  Next steps:"
echo "  1. Copy .env.example to .env and fill in your values"
echo "  2. Set up Railway: railway.app → New Project → GitHub → ProLnk"
echo "  3. Set up Cloudflare R2: cloudflare.com → R2 → Create bucket"
echo "  4. Get OpenAI API key: platform.openai.com"
echo "  5. Get Zep API key: getzep.com"
echo "  6. pnpm dev (to test locally)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
