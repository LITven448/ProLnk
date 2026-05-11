# Resend Email Setup — Domain Verification Guide

## Current Status
- RESEND_API_KEY: ✅ Set on Render
- From domain: ❓ Needs verification (emails may go to spam)

---

## Step 1: Verify Your Domain in Resend (10 minutes)

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter `prolnk.io`
4. Resend will give you DNS records to add (3-4 records)

**DNS records to add in Cloudflare:**
- TXT record for SPF (tells email servers ProLnk is allowed to send)
- TXT record for DMARC (prevents spoofing)
- CNAME for DKIM (cryptographic signature)

5. After adding DNS records, click "Verify" in Resend
6. Takes 5-60 minutes to propagate

## Step 2: Set Environment Variables on Render

After verification, set:
```
FROM_EMAIL=ProLnk <noreply@prolnk.io>
FROM_EMAIL_TRUSTYPRO=TrustyPro <noreply@trustypro.io>
```

## Step 3: Also Verify trustypro.io
Repeat step 1 for `trustypro.io` so TrustyPro homeowner emails are delivered.

---

## Why This Matters
Without domain verification:
- Emails send from `onboarding@resend.dev` (looks spammy)
- Gmail/Outlook may mark as spam
- Open rates drop 60-80%

With verification:
- Emails come from `noreply@prolnk.io`
- Professional appearance
- Much higher deliverability

---

## Email Templates Currently Active

| Trigger | Template | Status |
|---------|----------|--------|
| Pro joins waitlist | Confirmation with tier + referral code | ✅ Built |
| Homeowner joins waitlist | TrustyPro welcome | ✅ Built |
| Partner approved | Approval with checkout link | ✅ Built |
| Partner rejected | Rejection with reason | ✅ Built |
| Network welcome | Welcome to founding network | ✅ Built |
| Weekly digest | Partner network summary | ✅ Built (n8n triggers) |
| Storm alert | Weather event notification | ✅ Built |
| Partner inactive | 90-day nudge | ✅ Built |

All templates are in `server/email.ts`.

---

## Test Email Sending

Once domain is verified and FROM_EMAIL is set, test with:
```bash
curl -X POST https://prolnk-v2.onrender.com/api/trpc/proWaitlist.create \
  -H "Content-Type: application/json" \
  -d '{"0":{"json":{"firstName":"Test","lastName":"Email","email":"your-real-email@gmail.com","phone":"2145550001","trade":"Roofing","primaryCity":"Dallas","primaryState":"TX"}}}'
```

You should receive a confirmation email within 60 seconds.
