# ProLnk — Deploy Now Guide

## Status: Database ✅ Code ✅ — Just needs Vercel env vars

The Supabase database has all 47 tables created and ready.
The code has been migrated from MySQL to PostgreSQL.
Vercel just needs these 5 environment variables.

## Step 1 — Add Env Vars in Vercel

Go to: vercel.com → ProLnk project → Settings → Environment Variables

| Variable | Value |
|---|---|
| `DATABASE_URL` | `postgresql://postgres.uiinrefxcmmujvampctb:Dblegl236!!@aws-1-us-east-1.pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | `prolnk-jwt-secret-2026-production` |
| `NODE_ENV` | `production` |
| `VITE_SUPABASE_URL` | `https://uiinrefxcmmujvampctb.supabase.co` |
| `VITE_SUPABASE_KEY` | `sb_publishable_Rvy8beNu2jbrkMf-HPESsQ_22_ak-_F` |

## Step 2 — Redeploy

Click Save → then Deployments tab → Redeploy

## Step 3 — Access the Live Site

URL: https://pro-lnk.vercel.app

Pages to test:
- /advertise — Three.js cinematic page
- /admin — Admin portal (brand-organized nav)
- /dashboard — Partner portal (demo mode)
- /waitlist/pro — ProLnk pro waitlist
- /trustypro — TrustyPro homeowner platform

## Step 4 — Create Admin Account

Go to: https://pro-lnk.vercel.app/admin/setup
Click "Activate Admin" — this makes andrew@lit-ventures.com the admin

## What Was Built Overnight

- 47 PostgreSQL tables in Supabase
- Full MySQL → PostgreSQL code migration
- db.ts updated to use postgres.js driver
- drizzle.config.ts updated for PostgreSQL
- vercel.json fixed for proper SPA routing
- package.json updated with postgres driver
