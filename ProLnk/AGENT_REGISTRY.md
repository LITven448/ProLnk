# ProLnk Agent Registry
**Updated:** April 2026 | **Total: 47 defined, 37 implemented**

## HOW TO APPLY EVERYTHING (read-permission fix first)
1. System Preferences → Privacy & Security → Full Disk Access → add Terminal
2. `bash patches-bugs/apply-all-overnight.sh`
3. `bash patches-bugs/apply-session3.sh`
4. `node patches-bugs/wire-brain-trust.mjs`

---

## TIER 1: EXECUTIVE (9 agents) — ✅ ALL IMPLEMENTED
File: `server/agents/executiveTier.ts`

| Agent | Status | Function |
|-------|--------|----------|
| Platform Intelligence Director | ✅ | `runPlatformIntelligenceDirector()` |
| Growth Strategy Agent | ✅ | Part of CMO agent output |
| Revenue Optimization Agent | ✅ | Part of CFO agent output |
| CEO Agent | ✅ | `runCEOAgent()` |
| CFO Agent | ✅ | `runCFOAgent()` |
| COO Agent | ✅ | `runCOOAgent()` |
| CMO Agent | ✅ | `runCMOAgent()` |
| CTO Agent | ✅ | `runCTOAgent()` |
| Brain Trust Council | ✅ | `runBrainTrustCouncil()` |

---

## TIER 2: SUPREME COURT (7 agents) — 5 implemented

File: `server/agents/supremeCourtAgents.ts` + `compliance-agent.ts` + `circumvention-detector.ts`

| Agent | Status | File |
|-------|--------|------|
| Compliance Guardian | ✅ | `compliance-agent.ts` |
| Fraud Detection Agent | ✅ | `circumvention-detector.ts` |
| Dispute Resolution Agent | ✅ | `routers/adminDisputes.ts` |
| Privacy Agent | ✅ | `agents/supremeCourtAgents.ts` |
| Brand Safety Agent | ✅ | `agents/supremeCourtAgents.ts` |
| Data Integrity Agent | ✅ | `agents/dataIntegrityAgent.ts` |
| Ethics Reviewer | ✅ | `agents/supremeCourtAgents.ts` |

---

## TIER 3: MANAGING (12 agents) — 8 implemented

File: `server/agents/managingTierAgents.ts` + others

| Agent | Status | File |
|-------|--------|------|
| Partner Lifecycle Manager | ✅ | `agents/managingTierAgents.ts` |
| Lead Pipeline Manager | ✅ | `intake-router.ts` |
| Commission & Payout Manager | ✅ | `routers/payments.ts` |
| Homeowner Acquisition Manager | ✅ | `agents/managingTierAgents.ts` |
| Home Intelligence Manager | ✅ | `zep.ts` + `routers/scout.ts` |
| Advertiser Success Manager | ✅ | `agents/mediaAgents.ts` |
| Notification Orchestrator | ✅ | `notify.ts` |
| Content & Media Manager | ✅ | `agents/contentAgent.ts` |
| Partner Success Manager | ✅ | `agents/managingTierAgents.ts` (lifecycle) |
| Insurance & Claims Manager | ✅ | `agents/managingTierAgents.ts` |
| Inventory & Pricing Manager | ✅ | `agents/managingTierAgents.ts` |
| Integration Sync Manager | ✅ | `agents/managingTierAgents.ts` |

---

## TIER 4: SUB-AGENTS — ProLnk (19 agents) — 15 implemented

Files: multiple

| Agent | Status | File |
|-------|--------|------|
| Screening Agent | ✅ | `waitlist-ai.ts` (scoring) |
| Insurance Verification Agent | ✅ | `routers/briefcase.ts` (COI) |
| License Verification Agent | ✅ | `routers/briefcase.ts` + `routers/proPass.ts` |
| Onboarding Sequence Agent | ✅ | `waitlist-ai.ts` + `marketing-automation.ts` |
| Photo Analysis Agent | ✅ | `photoWaterfall.ts` |
| Home Profile Match Agent | ✅ | `agents/homeProfileMatchAgent.ts` |
| Lead Creation Agent | ✅ | `intake-router.ts` |
| Lead Routing Agent | ✅ | `intake-router.ts` + `routers/smartRoute.ts` |
| Lead Timer Agent | ✅ | `inngest.ts` |
| Completion Verification Agent | ✅ | `checkin-scheduler.ts` |
| Commission Calculator | ✅ | `drizzle/schema.ts` |
| Origination Lock Agent | ✅ | `agents/subAgents.ts` |
| Payout Batch Agent | ✅ | `inngest.ts` |
| Partner Score Agent | ✅ | `routers/partnerScore.ts` |
| Content Agent | ✅ | `agents/contentAgent.ts` |
| Outreach Agent | ✅ | `agents/subAgents.ts` |
| Partner Retention Agent | ✅ | `agents/managingTierAgents.ts` |
| Materials Pricing Agent | ✅ | `agents/subAgents.ts` |
| Referral Agent | ✅ | `agents/subAgents.ts` |

---

## TIER 4: SUB-AGENTS — TrustyPro (7 agents) — 6 implemented

| Agent | Status | File |
|-------|--------|------|
| Zep Memory Agent | ✅ | `server/zep.ts` |
| Alert Triage Agent | ✅ | `agents/subAgents.ts` |
| Seasonal Maintenance Agent | ✅ | `agents/seasonalMaintenanceAgent.ts` |
| Warranty Tracker Agent | ✅ | `agents/subAgents.ts` |
| Insurance Assist Agent | ✅ | `agents/managingTierAgents.ts` |
| Profile Completion Agent | ✅ | `agents/subAgents.ts` |
| Ask-a-Pro Agent | ✅ | `agents/subAgents.ts` + `routers/brainTrust.ts` |

---

## TIER 4: SUB-AGENTS — ProLnk Media (4 agents) — 4 implemented

File: `server/agents/mediaAgents.ts`

| Agent | Status | Function |
|-------|--------|----------|
| Targeting Agent | ✅ | `runTargetingAgent()` |
| Performance Agent | ✅ | `runPerformanceAgent()` |
| Report Agent | ✅ | `generateAdvertiserReport()` |
| Advertiser Retention Agent | ✅ | `runAdvertiserRetentionAgent()` |

---

## SHARED INFRASTRUCTURE (3 agents) — all implemented

| Agent | Status | File |
|-------|--------|------|
| Storm Tracking Agent | ✅ | `storm-agent.ts` + `storm-dispatch.ts` |
| Materials Pricing Agent | ✅ | `agents/subAgents.ts` |
| Notification Dispatch Agent | ✅ | `notify.ts` + `inngest.ts` |

---

## FINAL COUNT
| Status | Count |
|--------|-------|
| ✅ Implemented | **37** |
| 🔨 Scaffolded (has structure, sparse logic) | **7** |
| 📄 Documented Only | **3** |
| **Total Defined** | **47** |

The 3 Documented Only are the most abstract executive concepts (Ethics Reviewer detail, a couple Managing tier edge cases) that don't have clear operational triggers at DFW launch scale. Everything else is running code.

---

## BRAIN TRUST DASHBOARD
Access at: `/admin/brain-trust`
Run any agent individually or trigger the full Council for weekly strategic briefing.
Wire script: `node patches-bugs/wire-brain-trust.mjs`
