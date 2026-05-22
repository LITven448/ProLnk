# ProLnk Project Configuration

## Quick Reference

**Repo**: github.com/LITven448/ProLnk (private)
**Working Directory**: /Users/andrewfrakes/Desktop/prolnk/ProLnk
**Build Command**: `npm run build`
**Dev Server**: `npm run dev`
**Type Check**: `npm run check`
**Deploy**: Push to main → Render auto-deploys (service: srv-d7ugk90sfn5c73b5pvd0)

**Key Files**:
- server/_core/vite.ts - Brand detection (hostname-based routing)
- client/src/App.tsx - RootPage component with brand switching
- server/routers/ - tRPC endpoints
- drizzle/schema.ts - Database schema (130+ tables)
- vite.config.ts - Build config
- package.json - Dependencies, scripts

## Deployment

**Production URL**: prolnk-platform.onrender.com
**Custom Domains**:
- prolnk.xyz → prolnk-platform.onrender.com (Render custom domain)
- trustypro.io → prolnk-platform.onrender.com (Render custom domain)

**Environment Variables** (set in Render dashboard, service srv-d7ugk90sfn5c73b5pvd0):
```
DATABASE_URL=mysql://[tidb_credentials]@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/prolnk
RESEND_API_KEY=re_[key]
N8N_WEBHOOK_SECRET=[secret]
NODE_ENV=production
PORT=3000
```

**Database Initialization**:
- POST /setup endpoint creates 106 tables
- Only runs once, subsequent calls are no-ops
- Idempotent (safe to call multiple times)

## Brand Routing

**How it works**:
1. Request comes in for prolnk.xyz or trustypro.io
2. server/_core/vite.ts detects hostname
3. Injects window.__BRAND__ into HTML
4. client/src/App.tsx renders appropriate home page

**Code Pattern**:
```typescript
// server/_core/vite.ts line 36
const hostname = (req.get("host") || "prolnk.xyz").split(":")[0].toLowerCase();
const isTrustyPro = hostname.includes("trustypro");
const brandScript = `<script>window.__BRAND__='${isTrustyPro ? "trustypro" : "prolnk"}';</script>`;
```

## Database

**Provider**: TiDB Cloud (MySQL-compatible)
**Schema File**: drizzle/schema.ts (auto-generated, do not edit manually)
**Migrations**: drizzle/migrations/ (use Drizzle CLI)
**Tables**: 130+ tables including partners, opportunities, commissions, homes, health records

**Key Tables**:
- partners (Pro users)
- homeownerSignups (Homeowner waitlist)
- partnerSignups (Pro waitlist)
- opportunities (Leads)
- commissionPayout (Earnings records)
- homes (Home Health Vault)
- healthRecords (HIPAA-sensitive health data)

## API Structure

All endpoints go through tRPC router at `/api/trpc`

**Key Routes**:
- /setup - Initialize database (POST, no auth)
- /api/trpc - tRPC procedures
- /api/health - Health check
- /api/webhooks/n8n/* - Webhook listeners from n8n
- /admin/waitlist - Admin dashboard (requires auth)

## Coding Patterns

### 1. tRPC Procedures
```typescript
export const router = createRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // query logic
    }),
  
  updateUser: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // mutation logic, ctx has user auth
    }),
});
```

### 2. Database Queries
```typescript
import { getDb } from "../db";
import { partners, eq } from "drizzle-orm";

const dbConn = await getDb();
const result = await dbConn
  .select()
  .from(partners)
  .where(eq(partners.id, partnerId));
```

### 3. Email (Resend)
```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: "noreply@prolnk.xyz",
  to: email,
  subject: "Welcome to ProLnk",
  html: template,
});
```

### 4. Environment Detection
```typescript
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
```

## May 6 Scope

**Live Features**:
- Waitlist signup for Pros
- Waitlist signup for Homeowners
- Confirmation emails
- Admin dashboard to view signups

**NOT Included**:
- Lead matching algorithm
- Payments/Stripe
- Pro activation/dashboard
- Lead delivery
- Commission calculations

**Goal**: Validate demand, collect email list for seed round

## Common Tasks

**Deploy changes**:
```bash
cd /Users/andrewfrakes/Desktop/prolnk/ProLnk
npm run build
git add .
git commit -m "message"
git push origin main
# Render auto-deploys
```

**Test database connection**:
```bash
curl -X POST https://prolnk-platform.onrender.com/setup
# Should return {"status":"success","created":106}
```

**Check type errors**:
```bash
npm run check
# No output = no errors
```

**Start dev server**:
```bash
npm run dev
# Vite dev server on http://localhost:5173
```

## Git Workflow

- main branch is production
- All commits go to main (no feature branches currently)
- Push triggers Render auto-deploy
- Do NOT force push
- Do NOT rebase public commits

## Troubleshooting

**Form shows "Invalid input" error**:
- Check validation schema in server/routers/
- Verify client is sending expected field types
- Check browser console for client-side validation errors

**Database not found**:
- Verify DATABASE_URL in Render dashboard
- Run /setup endpoint to initialize
- Check TiDB Cloud console for connectivity

**Emails not arriving**:
- Check Resend API key in Render
- Verify sender email is verified in Resend
- Check spam/junk folders
- Review Resend dashboard for delivery failures

**Brand detection not working**:
- Verify hostname matches prolnk.xyz or trustypro.io
- Check browser console for window.__BRAND__ value
- Clear browser cache (⌘+Shift+Delete)
- Verify server/_core/vite.ts changes are deployed

## Contact

- **Andrew**: andrew@lit-ventures.com
- **GitHub**: LITven448
- **Render**: service srv-d7ugk90sfn5c73b5pvd0 (token in .env)
- **TiDB**: (credentials in .env)
