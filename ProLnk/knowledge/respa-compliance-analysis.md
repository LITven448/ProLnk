# RESPA Compliance Analysis — ProLnk Agent Referral Program

**Prepared:** April 29, 2026
**Status:** Internal analysis — NOT legal advice. Engage RESPA counsel before launch.

---

## What is RESPA?

The Real Estate Settlement Procedures Act (12 U.S.C. § 2601-2617) prohibits kickbacks and unearned fees in connection with **settlement services** for federally related mortgage loans. Section 8 is the key provision.

## Does RESPA Apply to ProLnk?

### Settlement Services (RESPA applies)
- Title insurance
- Mortgage origination/brokerage
- Appraisals
- Home inspections **tied to a real estate transaction**
- Escrow/closing services

### Non-Settlement Services (RESPA does NOT apply)
- General home maintenance (HVAC, plumbing, roofing)
- Home improvement projects
- Subscription home health monitoring
- AI-powered home analysis
- Ongoing maintenance plans

**ProLnk's core business — connecting homeowners with home service professionals — is NOT a settlement service.** The referral fees ProLnk pays to agents are for referring homeowners to a **home maintenance platform**, not to settlement service providers.

## Current Risk Assessment

### LOW RISK: Agent refers homeowner to TrustyPro platform
- Agent earns fee for referring a homeowner to subscribe to TrustyPro's AI-powered home monitoring
- This is a referral for a **consumer service**, not a settlement service
- Comparable to an agent referring a client to a home warranty company or pest control service
- **Assessment: Likely compliant**, but structure carefully

### MEDIUM RISK: Agent refers homeowner, who then uses ProLnk partner for pre-sale repairs
- If the agent refers a homeowner who is **actively selling** and the homeowner uses a ProLnk partner for pre-sale home repairs
- Pre-sale repairs are not technically settlement services, but proximity to a transaction increases scrutiny
- **Assessment: Requires careful structuring** — ensure the referral is to the platform, not to specific repair work tied to a sale

### HIGH RISK: Agent conditions real estate services on TrustyPro signup
- If an agent says "I'll only represent you if you sign up for TrustyPro"
- This creates a tying arrangement that could violate RESPA Section 8(b)
- **Assessment: Must be explicitly prohibited** in agent agreement

### HIGH RISK: ProLnk home inspection replaces traditional inspection
- If ProLnk's AI analysis is marketed as a substitute for a formal home inspection in a real estate transaction
- Home inspections in connection with a sale ARE settlement services
- **Assessment: Must NOT market AI analysis as a replacement for settlement-related inspections**

## Recommended Safeguards (Already Partially Implemented)

### 1. Agent Agreement (DONE — AgentAgreement.tsx)
- [x] States referral is for home maintenance platform, not settlement services
- [x] Prohibits tying real estate services to TrustyPro signup
- [x] Requires RESPA disclosure
- [x] Agent must disclose compensation to homeowners

### 2. Marketing Materials (NEEDS REVIEW)
- [ ] All agent-facing marketing should clarify: "TrustyPro is a home maintenance subscription, not a settlement service"
- [ ] Remove any language that positions AI scans as "home inspections" in the real estate context
- [ ] Agent training materials should include RESPA overview

### 3. Fee Structure (DONE)
- [x] Flat per-referral fee ($50) — not tied to any specific transaction value
- [x] Recurring commission (10% of subscription) — tied to ongoing service, not a transaction
- [x] No fee is contingent on a real estate closing

### 4. Disclosures (PARTIALLY DONE)
- [x] Agent Agreement includes RESPA section
- [ ] Consumer-facing disclosure: "Your agent may receive compensation for this referral"
- [ ] Agent portal should show disclosure reminder before each referral

## Action Items Before Enabling Agent Commissions

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| 1 | Engage Texas real estate attorney with RESPA expertise | CEO | Critical |
| 2 | Review fee structure with counsel | CEO + Attorney | Critical |
| 3 | Add consumer disclosure to homeowner signup from agent link | Engineering | High |
| 4 | Create agent training module on RESPA compliance | Operations | High |
| 5 | Add "this is not a home inspection" disclaimer to AI scan results | Engineering | Medium |
| 6 | Review marketing materials for RESPA-triggering language | Marketing | Medium |
| 7 | Obtain written legal opinion before launch | Attorney | Critical |

## Comparable Programs (Market Precedent)

- **Zillow Home Services:** Pays agents for referring homeowners to service providers — structured as marketing referral, not settlement service
- **HomeAdvisor / Angi:** Pays real estate agents for homeowner referrals to contractors — not treated as RESPA-regulated
- **Home warranty companies:** Commonly pay agents referral fees — generally considered outside RESPA scope when not tied to closing

## Bottom Line

ProLnk's agent referral program is **structurally sound** from a RESPA perspective because:
1. TrustyPro is a home maintenance subscription, not a settlement service
2. Referral fees are flat/recurring, not transaction-based
3. The agent agreement prohibits tying arrangements

**However:** Formal legal review is non-negotiable before enabling live agent commission payments. The risk is not in the structure but in potential edge cases where a homeowner's platform usage overlaps with an active real estate transaction.
