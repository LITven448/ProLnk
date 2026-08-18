# Resident Adoption Kit — Operator-Branded Resident Activation

**Owner:** [OPS_LEAD_NAME] · **Brand:** TrustyPro (resident side) · **Audit ref:** PLATFORM_MASTER_AUDIT §10.3
**Purpose:** get invited residents to (1) install the app, (2) complete Move-In Shield inside their documentation window, (3) use photo-based maintenance requests instead of phone/email.
**Sending rules:** invites are operator-branded ("[OPERATOR_NAME], powered by TrustyPro"). SMS requires opt-in captured at lease signing or in the invite email (TCPA); every SMS carries STOP language.

---

## 1. Operator-branded invite email

**Trigger:** operator adds resident (new lease or existing resident rollout). Send from hello@[trustypro.io] with [OPERATOOR display name: "[OPERATOR_NAME] Resident App"].

**Subject:** Your [PROPERTY_NAME] resident app — protect your deposit, report issues in seconds
**Preheader:** Set up in 2 minutes. Your move-in documentation window is open.

> Hi [FIRST_NAME],
>
> Welcome to [PROPERTY_NAME]! [OPERATOR_NAME] uses the TrustyPro app for everything about your home, and your account is ready.
>
> **What it does for you:**
> - **Protect your deposit.** Move-In Shield walks you room by room to photo-document the home's condition on day one. Timestamped, stored, and on record — so pre-existing wear is never charged to you at move-out.
> - **Report issues in 30 seconds.** Snap a photo of any problem; our AI reads it, figures out the trade, and gets the right pro dispatched — no phone tag, no describing a noise over email.
> - **Set up utilities in one tap.** Electric, internet, and more from inside the app.
>
> **Your Move-In Shield window closes [DEADLINE_DATE]** — do it in your first few days while the home is empty. It takes about 10 minutes.
>
> **[Activate your account →]** *(personal link — expires in [X] days)*
>
> Questions? Reply to this email or use in-app support once you're in.
>
> — [OPERATOR_NAME], powered by TrustyPro

## 2. Invite SMS templates

**S1 — Invite (with email, day 0):**
> [OPERATOR_NAME]: Your [PROPERTY_NAME] resident app is ready. Document your move-in (protects your deposit) + report issues by photo. Activate: [LINK] Reply STOP to opt out.

**S2 — Invite reminder (day 3, not activated):**
> [OPERATOR_NAME]: Reminder — your resident app invite expires [DATE]. 2-min setup, then 10 min to photo-document your move-in before your window closes. [LINK] Reply STOP to opt out.

---

## 3. Move-in welcome one-pager

*(Print for the move-in packet / lease-signing folder and post as a door-hanger or fridge card. Operator logo top, TrustyPro mark bottom.)*

---

> ### Welcome home. Two minutes now saves your deposit later.
>
> **[QR_CODE_PLACEHOLDER — deep link: app download + property auto-attach]**
> **Scan to set up your resident app**
>
> **① Protect your deposit.**
> Move-In Shield: walk the home, photograph its condition, submit. Timestamped and on file — documented pre-existing wear can't be charged to you at move-out. **Do it before [WINDOW, e.g. day 7].**
>
> **② Report issues in 30 seconds.**
> Something broken? Photo it in the app. AI figures out the problem and the right pro gets dispatched. No phone calls, no waiting on hold.
>
> **③ Set up utilities in one tap.**
> Electric, internet, renters insurance — handled from the app in minutes, not an afternoon of phone calls.
>
> *Trouble scanning? Go to [SHORT_URL] and enter code [PROPERTY_CODE].*
> *[OPERATOR_NAME] · powered by TrustyPro*

---

## 4. Move-In Shield completion nudge sequence

*Audience: activated residents who have NOT completed Move-In Shield. Exits on completion. Channel: push notification if app installed; SMS fallback; email shadow copy on day 3 and 7.*

**Day 1 — Push/SMS:**
> Your home, on record: take 10 minutes today to photo-document your move-in condition. Empty rooms = easiest photos. Your deposit will thank you. Start: [DEEP_LINK]

**Day 3 — Push/SMS:**
> [FIRST_NAME], your Move-In Shield window closes [DEADLINE_DATE]. 10 minutes, room by room — every scuff you photograph now is one you can't be charged for later. [DEEP_LINK]

*Day 3 email subject:* **[N] days left to document your move-in (it protects your deposit)**
> Short body: restate the benefit, the deadline, one-tap start button, and a 3-line "how to do it well" (open every room; shoot walls, floors, appliances, fixtures; get close-ups of any existing damage).

**Day 7 — final push/SMS:**
> Last call: your move-in documentation window closes [TONIGHT/DATE]. Without it, move-out condition disputes come down to memory vs. paperwork. 10 minutes fixes that: [DEEP_LINK]

*Day 7 email subject:* **Final reminder — your Move-In Shield window closes [DATE]**
> Include: deadline, start button, and support contact for anyone having app trouble ("If something's blocking you — photos won't upload, invite issues — reply to this email and we'll fix it and extend your window.").

*(Post-deadline: mark incomplete in operator dashboard; support may grant a one-time extension per support-playbook.md macro M07.)*

---

## 5. Property-manager talk track (lease signing)

*Three sentences, said while handing over the one-pager:*

> "Before you get the keys — this QR code sets up your resident app, and the first thing it does is walk you through photographing the home's condition, which is what protects your security deposit at move-out. It's also how you report anything that breaks: snap a photo and the right repair person gets sent, no phone calls. Takes two minutes to set up — most residents do the move-in photos the same day, while the place is still empty."

*Coaching notes for PM staff:*
- Lead with **deposit protection** — it's the resident's benefit, not the operator's ask.
- Say "before you get the keys" — anchors it as part of move-in, not optional homework.
- If asked "do I have to?": "It's not required, but it's the record that protects you — without it, move-out is your word against the file."
