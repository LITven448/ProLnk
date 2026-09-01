# Matching & Offer Cascade — Spec
**How a job finds a pro. Replaces the current single-ranked-list behavior.**

---

# 1 · The model

**A job is offered to the top 3 ranked firms at once. First to accept wins. Non-responders roll off and the next in line rotates in, keeping 3 live offers until someone takes it.**

Subscription tier is **one input to the ranking**, not a gate and not a delay. A better-rated, closer pro on Starter can and should outrank a distant, poorly-rated pro on Business — the homeowner's outcome is the product.

---

# 2 · Eligibility (hard filters, applied before scoring)

A firm must pass all of these to enter the ranking:

1. **Status** is active or approved, and not suspended
2. **Trade matches** the job category (meaningful-token match; generic words like "service," "repair," "home" never create a match)
3. **Work type unlocked** — residential (includes rental) or commercial, per their subscription
4. **Clearance satisfied** if the job class requires one (school, healthcare, municipal, federal, military)
5. **Compliance current** — license, insurance, and any required certifications unexpired. **An expired COI makes a firm undispatchable, full stop**
6. **Coverage** — the job's ZIP is in their service area, or within their radius
7. **Not at capacity** — under their weekly lead cap
8. **Not the originator** — a firm never receives its own sourced job

---

# 3 · Scoring (100 points)

| Signal | Points | Notes |
|---|---|---|
| **Proximity** | **25** | Exact ZIP match scores full; otherwise distance-decayed against *that firm's own* service radius |
| **Rating & quality** | **20** | Star rating plus first-time-fix rate. Unrated firms score at a **neutral prior**, never zero |
| **Responsiveness** | **15** | Accept rate and median time-to-respond. No history scores at the neutral prior |
| **Subscription tier** | **15** | Starter 0 · Solo 7 · Team 11 · Business 15 |
| **Capacity headroom** | **10** | Remaining weekly capacity as a share of their cap. An unset cap uses the default (25), never "unlimited" |
| **Tenure on platform** | **5** | Rises over the first 24 months, then flat. Rewards staying, not just arriving early |
| **Documentation quality** | **5** | Share of completed jobs with full photo documentation. This is the lever that feeds the data asset — reward it here rather than penalizing its absence with price |
| **Trade match strength** | **5** | Exact specialty beats adjacent trade |

**New-firm ramp:** firms with fewer than 5 lifetime jobs receive a small decaying boost (+5 at zero, decaying to +1) so they can enter rotation and build history. Without it, new firms never rank, never get work, never build a record, and churn.

**Tie handling:** scores within 4 points are treated as equal and ordered by a deterministic per-job rotation, so the same firm does not win every job in a ZIP.

---

# 4 · The cascade

**Offer size:** top **3** firms simultaneously. First to accept wins; the others are notified immediately that it is taken.

**Rotation window** — how long a firm holds a slot before rolling off:

| Job urgency | Window |
|---|---|
| Emergency | **5 minutes** |
| Same-day | **15 minutes** |
| Routine / scheduled | **45 minutes** |

**Rolling replacement:** when a firm declines *or* its window expires, it is removed from the offer set and **the next-ranked firm rotates in immediately.** There are always 3 live offers until the job is accepted.

**Declining is not punished. Ignoring is.**
- **Fast decline** → neutral. It frees the slot immediately and is the behavior you want
- **Window timeout** → small penalty to the responsiveness score
- Three consecutive timeouts → temporary reduction in offer priority, with an in-app notice explaining why

**Anti-hoarding:** a firm may hold at most **3 live offers** at once. Without this, the top-ranked firms in a dense ZIP would sit on every job and block the queue.

**Exhaustion:** if the ranked list runs out with no acceptance:
1. Widen the search radius by 50% and re-rank
2. Then relax the trade match to adjacent trades
3. Then alert operations for manual dispatch
4. **The homeowner is told what is happening at each step** — never left with silence

---

# 5 · What each party sees

**The pro:** the job, the trade, the ZIP-level location, the urgency, the cost band, and **a live countdown on their window.** Their rank in the list is never shown.

**The homeowner:** *"3 pros are reviewing your request"* with a progress state — never a silent wait. On acceptance, the pro's name, photo, rating, and ETA.

**The resident (rental):** the same progress state, **without the vendor's name** until the operator has approved and assigned. Resident gating still applies.

**The operator:** the full ranked list with scores and compliance status, and the ability to override and assign directly.

---

# 6 · Why tier is 15 points and not 30

The current engine weights subscription at **30** and rating at **10**, which means a Business-tier firm with a 2-star rating outranks a 5-star Starter firm at the same distance. **The homeowner gets the worse pro because the better one pays less** — which contradicts the product.

At 15 points, tier is a real advantage — it decides most close calls and gets a Business firm into the first offer set far more often — without ever overriding a large quality or proximity gap.

**The upgrade pitch stays honest:** *"Business firms are in the first offer set on nearly every job in their area."* That is true, sellable, and does not require burying good pros.

---

# 7 · What this replaces

- `rankPartners()` returning a single sorted list with no offer mechanics
- Tier weighted at 30, rating at 10
- Unset lead caps scoring as "unlimited capacity" (maximum points)
- Unrated and unresponsive-history firms scoring zero, which buried every new firm permanently
- No randomization, so one firm won every job in a ZIP until it hit a cap

All of these are documented in `deliverables/analysis/ai-and-algorithms-audit.md` findings M4–M6, with the fixes in `ai-algorithms-FIXES.md`.
