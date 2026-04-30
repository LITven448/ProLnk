# GitHub Setup & Push Guide

**Goal:** Push ProLnk codebase to GitHub and configure for CI/CD

---

## Step 1: Create GitHub Repository

1. Go to github.com and sign in
2. Click **New Repository**
3. Name: `prolnk` (or `ProLnk`)
4. Description: "ProLnk Partner Platform + TrustyPro Homeowner App"
5. Visibility: **Private** (unless making public for investors)
6. Initialize: Leave empty (we'll push existing code)
7. Click **Create Repository**

Copy the HTTPS URL (looks like: `https://github.com/yourname/prolnk.git`)

---

## Step 2: Configure Git Locally

```bash
cd /Users/andrewfrakes/Desktop/prolnk

# Initialize repo (if not already done)
git init

# Add remote
git remote add origin https://github.com/yourname/prolnk.git

# Verify
git remote -v
# Output should show:
# origin  https://github.com/yourname/prolnk.git (fetch)
# origin  https://github.com/yourname/prolnk.git (push)
```

---

## Step 3: Create .gitignore

The repo should already have `.gitignore` but verify it includes:

```
# Environment
.env.local
.env.production
.env.*.local

# Build
dist/
*.js
*.js.map
*.css.map

# Dependencies
node_modules/
package-lock.json

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log
.manus-logs/

# OS
.DS_Store
Thumbs.db

# Database
*.sqlite
*.db

# Secrets
.env
.env.*
!.env.example

# Temporary
/tmp
/temp
.claude/projects/*/tasks/
.claude/projects/*/plans/
```

---

## Step 4: Stage & Commit

```bash
cd /Users/andrewfrakes/Desktop/prolnk/ProLnk

# Check what's modified
git status

# Stage all files
git add -A

# Commit with message
git commit -m "Initial commit: ProLnk platform — all 84 features complete

Platform:
- Full ProLnk + TrustyPro rebrand
- Partner dashboard with leads, earnings, commissions, referrals
- Homeowner app with scan, recommendations, maintenance calendar
- Admin command center with partners, applications, broadcasts
- Exchange marketplace (job posting + bidding)
- Stripe Connect payouts + commission disputes

Features built this session:
- Sentry error monitoring
- PostHog product analytics  
- LangGraph AI pipeline (Python microservice)
- 8 unrouted pages wired to navigation
- Homeowner waitlist form fixes
- Full webhook & API documentation

See todo.md for complete feature list and DEPLOYMENT.md for setup instructions."

# Verify
git log --oneline -5
```

---

## Step 5: Push to GitHub

```bash
# Push main branch
git push -u origin main

# Or if using different branch name
git push -u origin <branch-name>
```

**Note:** First push may take a few minutes if codebase is large.

---

## Step 6: GitHub Repository Setup

Once pushed, configure repository settings:

### Branch Protection

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass (once CI configured)
   - ✅ Dismiss stale pull request approvals
   - ✅ Require code review before merging (1 review)
5. Save

### Secrets (for GitHub Actions CI/CD)

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:

```
STRIPE_SECRET_KEY: sk_live_xxxxx
RESEND_API_KEY: re_xxxxx
OPENAI_API_KEY: sk-xxxxx
DATABASE_URL: mysql://...
SENTRY_DSN: https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**Never commit `.env.production` to GitHub.** Use Secrets instead.

### CI/CD Workflow (Optional)

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npx tsc --noEmit
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm run test
```

---

## Step 7: Verify Push

```bash
# Check remote
git remote -v

# List branches
git branch -a

# Show last commit
git log -1 --oneline
```

Visit `https://github.com/yourname/prolnk` in browser to verify code is there.

---

## Step 8: Add Collaborators (Optional)

If working with a team:

1. Go to **Settings** → **Collaborators**
2. Click **Add people**
3. Search for GitHub username
4. Set permission level (Maintain or Push)
5. Send invitation

---

## Continuous Deployment (Optional)

Once on GitHub, deploy to production:

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Connect to GitHub
vercel --prod

# Follow prompts to link GitHub repo and environment variables
```

### GitHub Pages (Static only)

For static sites, enable in **Settings** → **Pages** → **Source: GitHub Actions**

### Other Platforms

- AWS Amplify
- Render
- Railway
- Heroku

---

## Verify Deployment

After pushing to GitHub:

- [ ] Code appears on GitHub.com
- [ ] All files present (check node_modules not included)
- [ ] `.env` files NOT present
- [ ] DEPLOYMENT.md and ENV_SETUP.md visible
- [ ] `.gitignore` in root
- [ ] CI/CD workflow running (if configured)

---

## Troubleshooting

**"fatal: remote origin already exists"**
```bash
git remote rm origin
git remote add origin https://github.com/yourname/prolnk.git
```

**"Permission denied (publickey)"**
- Add SSH key to GitHub: Settings → SSH and GPG keys
- Or use HTTPS and supply GitHub personal access token

**"Large files rejected"**
```bash
# Check file sizes
find . -size +100M -type f

# Remove if not needed, or use Git LFS:
git lfs install
git lfs track "*.{psd,zip,mp4}"
```

**"Untracked files after push"**
```bash
# Check .gitignore
git check-ignore -v <filename>

# Add to .gitignore and retry
echo "filename" >> .gitignore
git add .gitignore
git commit -m "Add file to gitignore"
git push
```

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push codebase
3. ⬜ Configure branch protection rules
4. ⬜ Add repository secrets
5. ⬜ Set up CI/CD (optional)
6. ⬜ Deploy to production (Vercel/AWS/etc)
7. ⬜ Enable monitoring alerts (Sentry, PostHog)
8. ⬜ Set up database backups
