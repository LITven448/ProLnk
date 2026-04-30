# TCPA Compliance Rules for ProLnk

## What is TCPA?
The Telephone Consumer Protection Act (TCPA) regulates automated SMS and phone calls. Violations can cost $500-$1,500 per message (class action risk). ProLnk must comply before sending any SMS.

## SMS Consent Requirements

### Transactional SMS (appointment confirmations, job updates)
- Requires: Express consent (verbal, written, or electronic)
- Can be obtained at registration with clear disclosure
- Example disclosure: "By providing your phone number, you consent to receive service-related text messages from ProLnk."

### Marketing SMS (promotions, new services, upsells)
- Requires: Express WRITTEN consent
- Must be obtained separately from service agreement
- Checkbox on registration form with specific marketing language
- Example: "I agree to receive promotional text messages from ProLnk. Message and data rates may apply. Opt out anytime by replying STOP."

## Required STOP Handling
ProLnk MUST handle opt-out keywords automatically:
- STOP → Add to opt-out list immediately, confirm with: "You have been unsubscribed from ProLnk messages."
- HELP → Reply with: "For help, contact support@prolnk.io. Reply STOP to unsubscribe."
- UNSUBSCRIBE → Same as STOP

## Consent Record Requirements
For each SMS consent, ProLnk must record:
- Phone number
- Consent type (marketing/transactional)
- Exact consent language shown
- IP address at time of consent
- Date and time of consent
- Source URL where consent was given
- Method (checkbox/verbal/form)

All records stored in `smsConsentRecords` table.

## Frequency Rules
- No hard frequency cap in TCPA, but industry best practice:
  - Marketing: max 4-6 messages/month
  - Transactional: as needed for the transaction

## 10DLC Registration (Required for Business SMS)
- All A2P (Application to Person) business SMS must be registered with The Campaign Registry (TCR)
- Register brand (~$4/month) + campaign (~$10/month one-time + $4/month)
- Twilio handles this registration via their console
- Without 10DLC: carriers filter/block business SMS

## Homeowner Context for ProLnk
- ProLnk contacts homeowners on behalf of service professionals who have an existing relationship
- The service professional's prior relationship with the homeowner is the consent basis
- ProLnk must document this consent chain
- Postcards (Lob.com) are NOT subject to TCPA — direct mail is exempt
- Email through Resend is CAN-SPAM governed (different rules, less strict)

## What ProLnk Does NOT Do (correctly)
- ProLnk does not send cold SMS to homeowners without consent
- ProLnk sends email and postcards for outreach (not SMS)
- SMS is used for partner notifications (lead alerts, payout confirmations)
- Partners who have existing homeowner relationships may communicate via SMS through their own tools
