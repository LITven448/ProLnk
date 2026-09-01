# Power Score & Vendor Support — Spec
**Two features that together move responsibility for a pro's success onto the pro.**

---

# PART 1 — POWER SCORE

## What it is

**A single 0–100 number showing a firm how likely it is to get offered work — and exactly what is holding it back.**

It is the *same* scoring that drives the offer cascade, surfaced to the pro. That is the point: **the thing that decides who gets leads is visible, explainable, and improvable.** A pro who is not getting work should be able to see why in five seconds and know what to fix.

## Two levels

| Level | Whose score | Where it lives |
|---|---|---|
| **Firm Power Score** | The company | Digital Briefcase — the company's home |
| **Individual Power Score** | Each technician | Their ProPass |

**The firm score is not an average of its people.** It combines company-level factors (compliance, coverage, subscription, tenure) with the aggregate performance of its technicians. A firm with excellent documents and one weak technician should see exactly that, not a muddied average.

## What goes into it

| Component | Weight | What lifts it |
|---|---|---|
| **Quality** | 20 | Star rating, first-time-fix rate, low callback rate |
| **Responsiveness** | 15 | Accept rate, median time-to-respond, few expired offers |
| **Compliance** | 15 | License, insurance, certifications, background check — all current and unexpired |
| **Documentation** | 15 | Share of jobs completed with full photo documentation |
| **Reliability** | 15 | On-time arrival, jobs completed as scheduled, no-shows |
| **Coverage & capacity** | 10 | ZIPs served, headroom against their weekly cap |
| **Subscription** | 5 | Tier |
| **Tenure** | 5 | Months active, capped at 24 |

**Compliance behaves differently from everything else.** An expired insurance certificate does not subtract points — **it makes the firm undispatchable.** The score shows a hard red state, not a lower number, because the consequence is categorical, not gradual.

## The visual

**The score itself:** a ring, 0–100, with a band label — *Needs work · Fair · Strong · Top tier.* Colored by band, not by brand accent, so the state is readable at a glance.

**Below it, the breakdown — always visible, never hidden behind a tap:** eight horizontal bars, one per component, each showing current versus attainable. The weakest bar is highlighted with the single most valuable next action.

**Tap any component and get:**
- What it measures, in one plain sentence
- Your current number and the network median
- **The specific jobs or documents affecting it** — "3 offers expired without a response in the last 30 days," with the list
- **One concrete action** — "Upload your renewed COI" · "Add photos to these 4 completed jobs" · "Respond to offers within 15 minutes"

**Impact preview:** each action shows what it is worth — *"Documenting these 4 jobs: +6 points."* Never vague encouragement. A number.

**Trend:** a 90-day sparkline, and a plain statement of direction: *"Up 8 points since June."*

## The individual view

Inside a ProPass, each technician gets the same treatment on the factors they control — reliability, documentation, quality, responsiveness. **Not compliance-at-company-level, not subscription.**

**The owner sees every technician's score in one roster view**, ranked, with the weakest factor called out per person. This is what makes the feature operationally useful: an owner can see that one technician never photographs completed work and that it is costing the firm offers.

**A technician sees only their own score**, never their colleagues'.

## Rules that keep it honest

- **Never show a rank or a comparison to a named competitor.** Network median only.
- **Never show the score to homeowners or residents.** It is an internal performance tool, not a public rating.
- **New firms start at the neutral prior, not zero** — and the app says so explicitly: *"New firms start here. Complete jobs to build your score."* A zero-state that looks like failure drives people off the platform in week one.
- **Every number must be traceable** to the jobs or documents behind it. A score a pro cannot audit is a score they will not trust.
- **Recompute nightly**, and after any completed job, review, or document upload.

## Why this matters strategically

Documentation quality is a scored factor **because documentation is the data asset.** Every photo, serial number, and completed record is what makes a qualified record licensable. Putting it in the Power Score means the network improves the asset in order to get more work — **the incentive and the business model point the same direction.**

---

# PART 2 — VENDOR SUPPORT ASSISTANT

## What it is

An in-app chat assistant for firms and technicians. Its single most important job: **answer "why is my Power Score low?" with a specific, accurate, personalized answer.**

## What it must be able to do

**Answer from the pro's actual account** — not generic help text:
- *"Why is my Power Score 62?"* → the component breakdown, weakest factor first, with the specific jobs or documents involved
- *"Why am I not getting leads?"* → checks compliance status, coverage, capacity, work types, score, and offer history, then names the actual reason
- *"When do I get paid?"* → their real payout status on real jobs
- *"What does ProPass cost?"* → the current price from the pricing config, never a hardcoded number
- *"How do I add a technician?"* → walks the flow and can deep-link to it

## Guardrails — non-negotiable

- **Never quotes a price from memory.** All pricing comes from the pricing configuration, so the bot cannot drift from the real rate card.
- **Never makes legal, tax, insurance, or earnings promises.** No "you'll make $X." Escalates instead.
- **Never speculates about another firm**, their scores, or why someone else got a job.
- **Never discloses the ranking formula's exact weights** — it explains what improves a score, not how to game it.
- **Escalates to a human** on: payment disputes, account suspension, compliance rejections, anything involving money owed, and anything it cannot answer from account data.
- **Every answer that cites a number links to the underlying record**, so the pro can verify it.

## Why it pays for itself

The three highest-volume support questions in a marketplace like this are *why am I not getting work*, *when do I get paid*, and *what am I being charged*. All three are answerable from account data, and all three currently require a human. Answering them instantly and accurately removes most of the ticket volume before a support team exists — and every one of those answers ends in a concrete action the pro can take.
