# ProLnk / TrustyPro — Support Operations Playbook

**Owner:** [OPS_LEAD_NAME] · **Escalation owner:** Andrew Frakes · **Status:** Pilot v1
**Covers:** ProLnk (pros/vendors), TrustyPro (homeowners/residents), operator portal users.
**Audit ref:** PLATFORM_MASTER_AUDIT §10.1

---

## 1. Channels

| Channel | Who uses it | Hours | Notes |
|---|---|---|---|
| In-app support (chat/ticket) | Residents, pros, homeowners | 24/7 intake; staffed [SUPPORT_HOURS, e.g. 8am–8pm CT] | Primary channel. Auto-ack immediately. |
| Email — support@[trustypro.io] | Residents/homeowners | Same | Routes into same queue |
| Email — support@[prolnk.xyz] | Pros/vendors | Same | Routes into same queue, tagged `pro` |
| Phone — [SUPPORT_PHONE] | P1 emergencies only | 24/7 | Published only inside active-job screens and operator SLAs |
| Operator Slack/email channel | Operator staff (PMs) | Business hours | One named contact per operator; never mixed with resident queue |

**Do not** run support from personal cells or DMs. Everything lands in [TICKETING_TOOL — e.g., Zendesk/Front/HelpScout] with a ticket ID.

## 2. Severity & response targets

| Sev | Definition | First response | Resolution target | Who |
|---|---|---|---|---|
| **P1 — Emergency dispatch issue** | Active safety/habitability job (water, gas, no-heat, lockout) blocked: pro no-show on emergency, dispatch failure, resident unable to submit emergency request | **15 min**, 24/7 | Workaround in **1 hr** (manual dispatch by phone if needed) | On-call → ops lead immediately |
| **P2 — Money** | Payment failed, double charge, payout missing/late, refund request, chargeback notice, subscription billing error | **2 business hrs** | 1 business day (or dated commitment) | Support; ops lead approves per refunds policy |
| **P3 — General** | Login, photo upload, verification status, invite problems, how-to, feature questions, non-urgent job scheduling | **1 business day** | 3 business days | Support |

Rules of thumb:
- Anything with the words *leak, flood, gas, smoke, no heat, locked out, unsafe* → treat as P1 until proven otherwise.
- Anything with a dollar amount in it → at least P2.
- A resident mid-move-in who can't complete Move-In Shield before their deadline → P2 (deposit protection is time-boxed).
- Operator-reported issues inherit the operator SLA: first response [OPERATOR_SLA_FIRST_RESPONSE].

## 3. Triage flow (every ticket)

1. **Identify persona:** resident / homeowner / pro / operator staff. Tag it.
2. **Identify property/operator** if applicable (resident tickets must carry the operator tag — it feeds the operator health report).
3. **Set severity** per table above.
4. **Macro first:** if a macro below fits, use it (personalize the first line). If not, write fresh and flag the gap for a new macro.
5. **One-touch goal:** resolve or hand off with a dated commitment. Never close without either.

## 4. Macro library

> Usage: replace bracketed fields. Keep the first sentence personal; the macro carries the rest. Sign as "[AGENT_FIRST_NAME], ProLnk Support" (pro side) or "TrustyPro Support" (resident/homeowner side).

### Account & access

**M01 — Password reset / can't log in**
> Hi [NAME] — sorry for the trouble getting in. I've sent a fresh password-reset link to [EMAIL] (valid 30 minutes). If it doesn't arrive, check spam for a message from hello@prolnk.xyz. If you signed up with a different email, reply with it and I'll locate your account.

**M02 — Account locked / too many attempts**
> Hi [NAME] — your account locked after several failed sign-in attempts (a security measure). I've unlocked it now. Please reset your password before signing in: [RESET_LINK]. If these attempts weren't you, tell me and we'll review the account together.

**M03 — Wrong email / need to change email**
> Hi [NAME] — I can update the email on your account. For security, please reply from your current registered address (or confirm [VERIFICATION_METHOD]) with the new email you'd like. The change takes effect immediately and your history carries over.

**M04 — App won't load / white screen**
> Hi [NAME] — let's get the app working. Please try, in order: (1) force-close and reopen the app, (2) check for an update in the App Store/Play Store, (3) sign out and back in. If it still fails, reply with your device model, OS version, and a screenshot — I'll escalate to engineering with those details.

### Photos & Move-In Shield

**M05 — Photo upload fails**
> Hi [NAME] — sorry the photo won't upload. Most cases are one of these: (1) weak signal — uploads retry automatically once you're on Wi-Fi, and your photos are saved locally in the meantime; (2) camera/photo permission is off — check Settings → [APP_NAME] → Photos; (3) a very large video — trim to under [MAX_LENGTH]. If none of that works, reply with device model and what you see on screen, and I'll escalate. Your documentation deadline is [DATE]; if we can't fix it in time, I'll extend your window so you're not penalized.

**M06 — Move-In Shield: what is it / why do it**
> Hi [NAME] — Move-In Shield is your timestamped photo record of the home's condition at move-in. It takes about 10 minutes: walk each room, photograph anything worn or damaged, and submit. It's your evidence at move-out — documented pre-existing issues can't be charged against your deposit. Your window closes [DATE]. Start here: [DEEP_LINK].

**M07 — Move-In Shield deadline passed**
> Hi [NAME] — your standard documentation window has closed, but I've reopened it until [NEW_DATE] as a one-time extension. Photos taken now are timestamped as of today, so complete it as soon as you can — sooner is stronger evidence for you.

**M08 — Resident: maintenance request status**
> Hi [NAME] — your request [REQUEST_ID] ("[SHORT_DESCRIPTION]") is currently **[STATUS]**. [IF SCHEDULED: [PRO/VENDOR_NAME] is scheduled for [DATE/WINDOW].] [IF PENDING: it's been triaged and sent to your property team for approval — that step is theirs, and I've nudged them today.] You'll get a notification at each step; you can also track it live here: [DEEP_LINK].

### Verification & background checks

**M09 — Background check status (pro)**
> Hi [NAME] — your background check with our screening partner (Checkr) is currently **[STATUS: invited / in progress / consider / complete]**. Most checks clear in 1–3 business days; county-level searches occasionally take up to [X] days. You'll be notified the moment it completes, and your profile unlocks dispatch automatically. Nothing is needed from you right now [IF INVITED: except completing the Checkr email invitation sent to [EMAIL] — it expires in 7 days].

**M10 — Background check "consider" / adverse status (pro)**
> Hi [NAME] — your screening returned a status that needs manual review. This is not a denial. Our compliance process (including any legally required pre-adverse-action notice) takes [X] business days, and you'll receive full details and a chance to respond directly from the screening provider. I can't share report contents over support chat — the report is delivered to you by Checkr. Questions about what's on the report go to Checkr at [CHECKR_SUPPORT_LINK].

**M11 — Verification documents rejected (vendor)**
> Hi [NAME] — your [DOCUMENT TYPE: insurance certificate / license / W-9] was rejected because **[REASON: expired / name mismatch / missing coverage amount / illegible]**. Please re-upload a corrected copy here: [LINK]. Requirements: [REQUIREMENT_SUMMARY]. Once it's in, review takes under [X] business hours and your priority position on [OPERATOR_NAME] work orders activates immediately.

### Money — payouts, billing, refunds

**M12 — Payout timing (pro)**
> Hi [NAME] — payouts release after job completion is confirmed (homeowner/operator sign-off) and land via Stripe within **[PAYOUT_TIMING, e.g. 2–3 business days]** of release. Your payout for job [JOB_ID] was released on [DATE] and should arrive by [DATE]. If it's not there by then, reply here and I'll open a trace with Stripe the same day.

**M13 — Payout missing / late (pro)**
> Hi [NAME] — I'm sorry your payout is late; I know that's not a small thing. I've confirmed job [JOB_ID] shows completed and the payout was [STATUS]. [IF STUCK: The blocker is [REASON — e.g., Stripe Connect onboarding incomplete: missing [FIELD]. Complete it here: [LINK] and funds release within [X] hours.] [IF TRACE NEEDED: I've opened a trace with our payment processor and will update you by [DATE] at the latest.]

**M14 — Homeowner/resident charged incorrectly / double charge**
> Hi [NAME] — I see the duplicate/incorrect charge of [AMOUNT] on [DATE] and I've initiated the reversal. Refunds return to your original payment method in **[REFUND_TIMING, e.g. 5–10 business days]** depending on your bank. Your reference number is [TICKET_ID]. Apologies for the hassle — this one's on us.

**M15 — Refund request (job dissatisfaction)**
> Hi [NAME] — thanks for flagging this, and I'm sorry the job didn't meet the mark. Here's how we make it right: first option is a **no-cost return visit** by a pro to correct the work, usually within [X] days. If you'd rather not have a return visit, I'll open a refund review — please send 2–3 photos of the issue and one or two sentences on what wasn't done properly. Reviews complete within [X] business days and I'll be your point of contact throughout.

**M16 — Subscription cancel (pro)**
> Hi [NAME] — I can process that. Before I do: your [TIER] membership includes [KEY_BENEFITS — keep rate, lead flow, network overrides], and canceling ends override earnings from your network. If cost is the issue, [DOWNGRADE/PAUSE OPTION] may fit better — happy to switch you in one step. If you'd still like to cancel, confirm by replying "confirm cancel" and it takes effect at the end of your current billing period ([DATE]); no further charges. Either way, your account and history are preserved if you return.

**M17 — Subscription refund request (pro)**
> Hi [NAME] — our subscription terms are [REFUND_TERMS, e.g., no proration on partial months / 14-day first-month guarantee]. [IF ELIGIBLE: I've issued your refund of [AMOUNT] — allow 5–10 business days.] [IF NOT: I can't refund this period, but I've canceled effective [DATE] so you won't be billed again.] If you believe a billing error occurred, tell me the details and I'll review it personally.

### Jobs gone wrong

**M18 — "Pro didn't show" (homeowner/resident/operator)**
> Hi [NAME] — I'm sorry, that's exactly what we exist to prevent. Here's what happens now: (1) I'm contacting [PRO_NAME] right now for an explanation; (2) meanwhile I'm lining up the next available cleared pro — new window options: [OPTIONS]; (3) [IF FEE PAID: any trip/booking fee is refunded today]. No-shows carry real consequences on our side (strikes against the pro's account). I'll confirm your new appointment within [X] hours. Again — apologies, and thank you for the patience.

**M19 — "Damage during job" (homeowner/resident/operator)**
> Hi [NAME] — I'm sorry to hear something was damaged, and we take this seriously. I've opened dispute case [CASE_ID]. Please send: (1) photos of the damage, (2) a short description of what happened and when it was noticed, (3) approximate value/repair estimate if known. From there we follow our formal dispute process — I'll acknowledge your evidence within 1 business day and you'll have a named case owner and a decision timeline of [X] business days. All our dispatched pros carry [INSURANCE_REQUIREMENT], so covered damage has a clear path to resolution.

**M20 — Quality complaint (work done poorly)**
> Hi [NAME] — thank you for the photos/details. I've logged a quality dispute on job [JOB_ID]. Standard path: the pro is offered one return visit to correct the work within [X] days at no cost to you; if you decline the return visit or it fails, the case moves to refund review. Which would you prefer? Your payment [IS HELD / release is paused] until this resolves.

**M21 — Pro disputes a complaint (pro side)**
> Hi [NAME] — a [quality/no-show/damage] dispute was opened on job [JOB_ID]. You have **[X] business days** to submit your side: completion photos, timestamps, messages with the customer, and anything else relevant — upload here: [LINK]. Your payout for this job is held (not forfeited) until the case closes. Disputes are decided on evidence, which is exactly why we push completion photos on every job. I'll confirm receipt of your submission within 1 business day.

### Invites & onboarding

**M22 — Resident can't accept invite**
> Hi [NAME] — sorry the invite is fighting you. Common causes: (1) **expired link** — invites last [X] days; I've sent a fresh one to [EMAIL/PHONE] just now; (2) **email mismatch** — the invite is tied to the address your property manager has on file ([MASKED_EMAIL]) — if that's outdated, tell me the right one and I'll reissue; (3) **already registered** — if you've signed up before, just log in and the property attaches automatically. If none of those work, reply with a screenshot of the error and I'll fix it directly.

**M23 — Vendor invite not received / expired**
> Hi [NAME] — I've reissued your invitation to join [OPERATOR_NAME]'s vendor network on ProLnk; check [EMAIL] (and spam) for a message from hello@prolnk.xyz. The link is valid [X] days. Onboarding takes ~10 minutes: business info, verification docs, and payout setup. Reply here if anything in it blocks you.

**M24 — Operator approval stuck (vendor waiting on operator)**
> Hi [NAME] — your ProLnk verification is complete; the remaining step is approval by [OPERATOR_NAME], which is on their side. We've nudged their team today and typically these clear within [X] business days. You don't need to do anything — the moment they approve, you're live on their work-order queue and we'll notify you. If it's still pending in [X] days, I'll escalate it with the operator's account manager personally.

**M25 — Operator staff: how to approve vendors / where things live**
> Hi [NAME] — vendor approvals live in your operator portal under **Vendors → Pending** ([LINK]). Each pending vendor shows their verification status (docs, screening, insurance) so approval is one click when you're satisfied. Anything unclear in a vendor's file, reply here and we'll pull the detail for you.

### General

**M26 — Feature request / feedback**
> Hi [NAME] — thank you, genuinely — this kind of feedback steers the roadmap. I've logged it with the product team under [TICKET_ID]. I can't promise a timeline, but requests with real use cases like yours get weighted heavily. If it ships, you'll hear about it in release notes.

**M27 — "Is my data safe / who sees my photos"**
> Hi [NAME] — your move-in photos and maintenance photos are visible only to you, your property management team, and (for an active work order) the dispatched pro. They're never sold and never public. Full details: [PRIVACY_POLICY_LINK]. You can request account deletion any time under Settings → Privacy.

**M28 — Wrong brand / wrong queue (misrouted ticket)**
> Hi [NAME] — you've reached [BRAND] support, and your question belongs with our [OTHER BRAND/TEAM] — I've transferred your ticket rather than bouncing you, and [TEAM] will pick it up under the same ticket number. Nothing more needed from you.

## 5. "Job went wrong" dispute intake script

Use for any live conversation (phone or chat) where a customer reports a failed/damaged/disputed job. Goal: **complete intake in one contact.** Never assign blame or promise an outcome during intake.

1. **Acknowledge, don't adjudicate.** "I'm really sorry this happened — let's get everything documented so we can make it right." *(Never say "the pro was wrong" or "you'll get a refund" at intake.)*
2. **Capture the basics:** job ID, date, pro/vendor name, property, who was present.
3. **Capture the narrative:** "Walk me through what happened, start to finish." Write it in their words.
4. **Capture evidence:** photos of the issue (request minimum 3), any messages with the pro, receipts/estimates for claimed damage.
5. **Pull our side (agent, during or after call):** dispatch record, completion photos, pro's job notes, GPS/timestamp data if available, Move-In Shield baseline photos for the room (damage claims at rentals — check whether the damage pre-existed).
6. **Classify:** quality / no-show / damage / overcharge (per refunds-disputes-policy.md).
7. **Set expectations:** "You'll get written confirmation today with a case number. A case owner reviews the evidence and you'll have a decision or next step within [X] business days. Your payment [status: held/paused] in the meantime."
8. **Immediately after:** open the dispute case, notify the pro with the evidence-submission deadline (M21), pause payout release on the job, and post the case to the ops-lead review queue.

## 6. Escalation path

| Level | Who | Handles | Authority |
|---|---|---|---|
| L1 — Support agent | [AGENT(S)] | All intake, macros, P3 resolution, refunds ≤ $[L1_REFUND_LIMIT] | Per refunds policy |
| L2 — Ops lead | [OPS_LEAD_NAME] | P1/P2 ownership, disputes, refunds ≤ $[L2_REFUND_LIMIT], operator escalations, pro strikes | Per refunds policy |
| L3 — Andrew | Andrew Frakes | Anything touching: an operator relationship, legal/insurance claims, press/social threats, refunds > $[L2_REFUND_LIMIT], pro removal, chargebacks > $[AMOUNT] | Final |

**Escalate immediately (skip levels) when:** safety incident or injury, legal threat or attorney contact, media/social-media threat, suspected fraud, any operator principal complaining directly, data breach suspicion.

**Escalation format (paste into [ESCALATION_CHANNEL]):**
> TICKET: [ID] · SEV: [P1/2/3] · PERSONA: [type] · OPERATOR: [name/none]
> SUMMARY: [2 lines] · MONEY AT STAKE: [$] · WHAT I'VE DONE: [bullets] · WHAT I NEED: [decision/action] · CLOCK: [customer promised update by DATE]

## 7. On-call rotation (P1 coverage)

- **Rotation:** weekly, [DAY] [TIME] handoff. Primary + backup at all times.
- **Contact:** P1 alerts page via [PAGING_METHOD — e.g., phone tree / PagerDuty / OpsGenie]. Acknowledge within 15 min or it rolls to backup, then to Andrew.
- **On-call kit:** access to ticketing tool, dispatch admin, Stripe dashboard (read), pro/vendor phone numbers, operator emergency contacts sheet [LINK], this playbook.
- **Handoff note (every rotation):** open P1/P2s, live disputes, anything promised to an operator.

| Week of | Primary | Backup | Notes |
|---|---|---|---|
| [DATE] | [NAME] | [NAME] | |
| [DATE] | [NAME] | [NAME] | |
| [DATE] | [NAME] | [NAME] | |
| [DATE] | [NAME] | [NAME] | |

**After-action:** every P1 gets a 5-line postmortem within 48 hrs (what happened / impact / root cause / fix / prevention) filed in [POSTMORTEM_LOCATION].
