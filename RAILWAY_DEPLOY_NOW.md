# Railway Deployment — ProLnk

**Code Status:** ✅ Ready to deploy (build passes, no errors)

## Steps to Deploy on Railway

### 1. Create New Railway Project
- Go to [railway.app](https://railway.app)
- Click **"New Project"**
- Select **"Deploy from GitHub"**
- Repository: `LITven448/ProLnk`
- Root Directory: `ProLnk`

### 2. Set Environment Variables
Railway will prompt you to add variables. Copy/paste these exactly:

```
NODE_ENV=production
PORT=3000
JWT_SECRET=prolnk-jwt-secret-2026-production
APP_BASE_URL=[LEAVE BLANK — will be set after Railway gives you the URL]
DATABASE_URL=postgresql://postgres.uiinrefxcmmujvampctb:Dblegl236!!@aws-1-us-east-1.pooler.supabase.com:6543/postgres
VITE_APP_ID=production
OAUTH_SERVER_URL=[SAME AS APP_BASE_URL]
STRIPE_PUBLISHABLE_KEY=[GET FROM STRIPE DASHBOARD]
STRIPE_SECRET_KEY=[GET FROM STRIPE DASHBOARD]
GOOGLE_CLIENT_ID=[GET FROM GOOGLE CONSOLE]
GOOGLE_CLIENT_SECRET=[GET FROM GOOGLE CONSOLE]
OPENAI_API_KEY=[GET FROM OPENAI]
RESEND_API_KEY=[GET FROM RESEND]
FROM_EMAIL=ProLnk <noreply@prolnk.io>
VITE_SUPABASE_URL=https://uiinrefxcmmujvampctb.supabase.co
VITE_SUPABASE_KEY=[GET FROM SUPABASE]
TWILIO_ACCOUNT_SID=[OPTIONAL - GET FROM TWILIO]
TWILIO_AUTH_TOKEN=[OPTIONAL - GET FROM TWILIO]
TWILIO_PHONE_NUMBER=[OPTIONAL - YOUR TWILIO NUMBER]
```

### 3. Wait for Build & Deploy
Railway will:
1. Build the app (uses `railway.json` config)
2. Run `pnpm install --frozen-lockfile=false && pnpm build`
3. Start with `node dist/index.js`
4. Give you a live URL in ~3 minutes

### 4. Update URLs After Deployment
Once Railway gives you the live URL (e.g., `https://prolnk-app.railway.app`):

Update these in Railway variables:
- `APP_BASE_URL=https://prolnk-app.railway.app` (use your actual URL)
- `OAUTH_SERVER_URL=https://prolnk-app.railway.app`

Also update these in their dashboards:
- **Google OAuth:** Add redirect URI: `https://prolnk-app.railway.app/auth/google/callback`
- **Stripe:** Update webhook endpoint: `https://prolnk-app.railway.app/api/stripe/webhook`
- **Resend:** (optional) update allowed domains

### 5. Delete Old Deployments
Once Railway deployment is live:
- **Delete Vercel:** https://vercel.com → Projects → prolnk → Settings → Delete
- **Delete Netlify:** https://netlify.com → Your site → Settings → Delete site

## Health Check
Railway will automatically check `GET /api/health` every 10 seconds. It should return:
```json
{ "status": "ok" }
```

## Database
- Uses Supabase (already has 47 tables)
- Supabase connection string is in `DATABASE_URL`
- No migration needed — Railway just connects to existing DB

## Build Info
- Build command: `pnpm install --frozen-lockfile=false && pnpm build`
- Output: `dist/index.js` (server) + `dist/public/` (frontend)
- Startup: `node dist/index.js` on port 3000
