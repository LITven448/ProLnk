# Railway Production Configuration for ProLnk

**Project Name:** prolnk-trustypro  
**Environment:** Production  
**Status:** Ready for configuration

## Build & Start Commands

These are already set in `railway.json`:
- **Build Command:** `pnpm install --frozen-lockfile=false && pnpm build`
- **Start Command:** `node dist/server.mjs`
- **Health Check Path:** `/api/health`
- **Health Check Timeout:** 30 seconds

## Required Environment Variables

Configure these on the Railway dashboard for the prolnk-trustypro project:

```
NODE_ENV=production
PORT=4000
JWT_SECRET=[SET: At least 32 random characters]
APP_BASE_URL=[SET: Your Railway project URL, e.g., https://prolnk-trustypro.railway.app]
DATABASE_URL=[LINK: PostgreSQL service variable]
VITE_APP_ID=production
OAUTH_SERVER_URL=[SET: Same as APP_BASE_URL]
STRIPE_PUBLISHABLE_KEY=[SET: Production Stripe publishable key]
STRIPE_SECRET_KEY=[SET: Production Stripe secret key]
GOOGLE_CLIENT_ID=[SET: Google OAuth client ID]
GOOGLE_CLIENT_SECRET=[SET: Google OAuth client secret]
OPENAI_API_KEY=[SET: OpenAI API key]
```

## Steps to Configure

1. **Go to prolnk-trustypro project on Railway**
2. **Add PostgreSQL Service** (if not already added)
   - Click "New Service" → "Database" → "PostgreSQL"
   - Once created, note its variables
3. **Link PostgreSQL to application**
   - In app variables, set `DATABASE_URL` to reference the PostgreSQL service variable
4. **Set all required environment variables**
   - Use the list above
   - For sensitive keys (JWT_SECRET), generate 32+ random characters
5. **Verify deployment**
   - Health check endpoint: `/api/health`
   - Should return 200 OK

## Production URLs to Update

After deployment, update these if they reference localhost:
- Google OAuth redirect URIs → your Railway project URL
- Stripe webhooks → your Railway project URL
- Any external integrations → your Railway project URL

## Rollback Plan

If deployment fails:
1. Check Railway logs for errors
2. Verify all environment variables are set correctly
3. Ensure DATABASE_URL is properly connected to PostgreSQL service
4. Check that health check endpoint is responding
