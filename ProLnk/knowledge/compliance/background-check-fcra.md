# Background Check & FCRA Compliance

## What is FCRA?
The Fair Credit Reporting Act (FCRA) governs how consumer reporting agencies and employers/platforms use background check reports. ProLnk is considered a "user" of consumer reports under FCRA when using Checkr or similar services.

## FCRA Requirements for ProLnk

### Before Running a Background Check
1. **Disclose** to the partner in writing that a background check will be conducted
2. **Authorize** — obtain signed authorization from the partner
3. **Provide FCRA summary**: "A Summary of Your Rights Under the Fair Credit Reporting Act" (Checkr provides this)

ProLnk should include these in the partner application flow:
- Disclosure: "We conduct background checks through Checkr on approved applicants"
- Authorization checkbox: "I authorize ProLnk to run a background check through Checkr"
- Link to FCRA rights summary

### If Taking Adverse Action (Denying Based on Report)
FCRA requires a two-step adverse action process:

**Step 1 — Pre-Adverse Action Notice:**
- Send the partner a copy of the background check report
- Send the FCRA summary of rights
- Give them a "reasonable time" to dispute errors (courts have held this to be at least 5 business days)
- DO NOT take adverse action yet

**Step 2 — Adverse Action Notice:**
After the waiting period (if no successful dispute):
- Send formal notice that adverse action has been taken
- State the name, address, and phone number of the reporting agency (Checkr)
- State that Checkr didn't make the decision and can't explain why
- Inform of right to dispute the accuracy or completeness of the report
- Inform of right to a free copy of the report within 60 days

## What Checkr Handles vs. What ProLnk Handles
Checkr handles: Running the actual checks, candidate consent flow, report delivery, FCRA disclosures in their platform.

ProLnk must handle: The adverse action process, final decision, and documentation that the process was followed.

## What Background Checks Cover (Checkr "Basic Plus" Package)
- National criminal database search
- Sex offender registry (all 50 states)
- SSN trace (verifies identity)
- County criminal court search (jurisdictions lived/worked)
- Terrorist watch list (OFAC)

Additional (if ordered):
- Motor vehicle record (for drivers)
- Employment verification
- Education verification
- Credit report (requires additional authorization)

## ProLnk's Adjudication Matrix
What disqualifies a partner:

| Category | Automatic Disqualification |
|----------|---------------------------|
| Sexual offenses | Any |
| Violent felonies | Within 7 years |
| Financial crimes | Within 5 years (for roles handling payments) |
| Drug-related felonies | Case-by-case (Texas is employment-at-will) |

What requires review (but not automatic disqualification):
- Older felonies (7+ years) that are unrelated to the work
- Misdemeanors
- Arrests without convictions (must be considered carefully per FCRA)

## Texas-Specific Note
Texas has "ban the box" provisions in some contexts. ProLnk should:
- Not ask about convictions in the initial application form
- Only run background checks after conditional approval
- Consider the nature of the crime vs. the job duties

## Checkr Integration Requirements for FCRA Compliance
1. Store the `candidateId` from Checkr on the partner record
2. Store the `reportId` when complete
3. Record the adverse action dates in the partner record
4. Never use an expired report (results are valid for 30-90 days per state)
5. Log all adverse action steps with timestamps
