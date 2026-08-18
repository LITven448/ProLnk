# MASTER SERVICES AGREEMENT — RENTAL OPERATOR PROGRAM

> **DRAFT — FOR ATTORNEY REVIEW — NOT FOR EXECUTION**

This Master Services Agreement (this "**Agreement**") is entered into as of [EFFECTIVE_DATE] (the "**Effective Date**") by and between **[PLATFORM_ENTITY_LEGAL_NAME]**, a Delaware [ENTITY_TYPE] with its principal place of business at [PLATFORM_ADDRESS] ("**Platform**"), and **[OPERATOR_LEGAL_NAME]**, a [STATE] [ENTITY_TYPE] with its principal place of business at [OPERATOR_ADDRESS] ("**Operator**"). Platform and Operator are each a "**Party**" and together the "**Parties**."

## RECITALS

A. Platform operates a technology platform (the "**Platform Services**") that connects property operators and residents with independently verified service professionals, provides AI-assisted photo analysis and condition documentation, and facilitates escrowed payment for completed work.

B. Operator owns and/or manages a portfolio of residential rental properties and desires to deploy the Platform Services across designated properties on the terms below, including no platform-access fee to Operator, ecosystem participation commitments, and revenue-sharing arrangements.

NOW, THEREFORE, the Parties agree as follows.

## 1. DEFINITIONS

1.1 "**Collected Data**" means all data, records, images, metadata, condition reports, maintenance histories, work-order records, and derivative outputs generated on or through the Platform Services in connection with Covered Properties during the Term, in each case as processed into Anonymized Data.

1.2 "**Anonymized Data**" means Collected Data from which (a) all Resident PII has been removed or irreversibly de-identified in accordance with Section 7.4; and (b) property-level identifiers have been generalized to a level no more specific than [GEOGRAPHIC_GRANULARITY, e.g., ZIP+2 / census tract], such that the data does not identify, and cannot reasonably be used to identify, any natural person.

1.3 "**Covered Properties**" means the properties listed on **Exhibit A**, as updated by the Parties from time to time.

1.4 "**Move-In Shield Documentation**" means the Platform's standardized photographic condition-documentation protocol performed at lease commencement (and, where elected, lease termination) for a unit.

1.5 "**Qualified Record**" means a unit-level property data record that satisfies **all** of the following: (a) Move-In Shield Documentation completed to Platform's then-current capture standard (minimum [MIN_PHOTO_COUNT] images per unit covering [ROOM/COMPONENT_STANDARD]); (b) at least [MIN_EVENTS] verified maintenance or service events recorded for the unit through the Platform; (c) record completeness of at least [COMPLETENESS_%]% against the Platform's schema for major systems (roof, HVAC, water heater, plumbing, electrical); and (d) the record has been processed into Anonymized Data. The Platform's determination of Qualified Record status is made in good faith per the published rubric in **Exhibit C** and is auditable under Section 12.

1.6 "**Resident**" means a tenant or occupant of a Covered Property who registers for or uses the Platform Services.

1.7 "**Vendor**" means a service professional or service company participating on the Platform under Platform's vendor terms.

1.8 "**Resident PII**" means information that identifies or is reasonably linkable to an identifiable Resident, including name, contact information, precise unit address in combination with occupancy data, device identifiers, and images or metadata revealing identity.

## 2. PLATFORM SERVICES; FEES

2.1 **License.** Platform grants Operator a non-exclusive, non-transferable, non-sublicensable right during the Term to access and use the Platform Services for the Covered Properties.

2.2 **No Platform Fee to Operator.** Platform will not charge Operator platform-access, seat, or subscription fees for the Platform Services described in **Exhibit B**. Consideration to Platform consists of Operator's ecosystem commitments (Section 3), the data license (Section 7), and transaction-derived revenue from Vendors and Residents. Services outside Exhibit B are chargeable at rates agreed in an applicable order form.

2.3 **Service Levels.** Platform will provide the Platform Services materially in accordance with the service levels in **Exhibit D** [SLA TERMS — TBD: uptime target, maintenance-request acknowledgment time, emergency dispatch response time, support hours, remedies/credits]. Exhibit D remedies are Operator's sole and exclusive remedy for SLA failures.

## 3. OPERATOR ECOSYSTEM COMMITMENTS

3.1 **Vendor Invitations.** Within [DAYS] days of the Effective Date, and on an ongoing basis, Operator will invite its existing maintenance vendors servicing Covered Properties to enroll on the Platform, using Platform-provided invitation materials. Operator will use commercially reasonable efforts to achieve enrollment of at least [VENDOR_TARGET_%]% of active vendors by trade volume within [MONTHS] months. Operator does not guarantee any vendor's enrollment and is not liable for a vendor's refusal.

3.2 **Move-In Shield on Every New Lease.** For every new lease and lease renewal commencing at a Covered Property after the Onboarding Date for that property, Operator will cause Move-In Shield Documentation to be completed within [DAYS] days of lease commencement, and will incorporate the Platform lease addendum (in substantially the form provided by Platform) into such leases.

3.3 **Maintenance Channel.** Operator will designate the Platform as [the exclusive / a primary] intake channel for routine resident maintenance requests at Covered Properties, subject to Operator's emergency procedures and legal obligations.

3.4 **No Exclusivity.** Except as stated in Section 3.3, nothing in this Agreement restricts Operator from using other vendors, software, or service providers, and nothing restricts Platform from serving other operators, including competitors of Operator.

## 4. REVENUE SHARES TO OPERATOR

4.1 Platform will pay Operator the following revenue shares, calculated on amounts actually received and retained by Platform (net of refunds, chargebacks, taxes, and payment-processing costs):

| Stream | Share to Operator | Base |
|---|---|---|
| Vendor subscriptions attributable to Operator-invited Vendors | [RATE]% | Net subscription revenue during [ATTRIBUTION_PERIOD] |
| Resident-paid purchases and services at Covered Properties | [RATE]% | Net platform revenue on such transactions |
| Move-out services at Covered Properties | [RATE]% | Net platform revenue on such transactions |
| Data licensing revenue on Qualified Records (tiered per §4.2) | [RATE]% | Net data-licensing revenue allocable to Operator-originated Qualified Records |

4.2 **Tiered Data Share.** The data-licensing share applies per Qualified Record on a tiered basis: Tier 1 ([0]–[N1] Qualified Records): [RATE]%; Tier 2 ([N1+1]–[N2]): [RATE]%; Tier 3 ([N2+1]+): [RATE]%. Allocation across licensees' data pools will be made pro rata per Qualified Record per Platform's records.

4.3 **Reporting and Payment.** Platform will report and pay quarterly within [45] days of quarter end, with a statement sufficient to verify calculation. No payment is due for any quarter in which the aggregate share is less than $[MIN_PAYOUT]; unpaid amounts roll forward.

4.4 **Attribution.** A Vendor is "Operator-invited" if enrollment is completed via Operator's tracked invitation link/code or otherwise documented in Platform's attribution system. Attribution disputes are resolved per Section 12.

## 5. TERM AND TERMINATION

5.1 **Term.** The initial term is [INITIAL_TERM_YEARS] years from the Effective Date, renewing for successive [1]-year terms unless either Party gives [90] days' notice of non-renewal.

5.2 **Termination.** Either Party may terminate (a) for material breach uncured [30] days after written notice; or (b) upon the other Party's insolvency. Operator may additionally terminate for convenience on [180] days' written notice after the first [12] months.

5.3 **Effect of Termination.** Upon termination: (a) Operator's access ceases; (b) accrued payment obligations survive; (c) revenue shares under Section 4 continue only as stated in [SURVIVAL_ELECTION: data-licensing share on pre-termination Qualified Records survives for [TAIL_PERIOD] / in perpetuity — COUNSEL TO ADVISE]; and (d) **the license in Section 7.1 survives in perpetuity as to all Collected Data collected during the Term.**

## 6. RESIDENT AND VENDOR RELATIONSHIPS

6.1 Residents and Vendors contract directly with Platform under Platform's own terms. Platform is not Operator's agent, and Vendors are independent contractors of neither Party. Operator remains solely responsible for its landlord obligations under applicable law and its leases.

## 7. DATA RIGHTS — PERPETUAL LICENSE

7.1 **Perpetual License to Platform.** Operator hereby grants Platform a **perpetual, irrevocable, worldwide, non-exclusive, royalty-bearing (solely per Section 4), transferable, sublicensable license** to host, store, process, analyze, create derivative works from, commercialize, and license to third parties all Collected Data, in Anonymized Data form, for any lawful purpose, including analytics products, benchmarking, AI model training and improvement, and data-licensing offerings. **This license applies to all Collected Data collected during the Term and survives expiration or termination of this Agreement for any reason.** Termination terminates prospective collection only; it does not affect Platform's rights in Collected Data already collected.

7.2 **Operator Ownership; Operator Access.** As between the Parties, Operator retains ownership of raw property records it supplies. Platform owns the Platform Services, its systems, its analyses, derived scores, and aggregated/Anonymized Data sets. During the Term, Operator may export its property-level records (excluding Platform-derived scoring methodologies) in a standard format.

7.3 **Restrictions on Platform.** Platform will not (a) license or disclose Collected Data in any form that identifies Operator as the source without Operator's consent, except to auditors, counsel, and as required by law; (b) sell or license Resident PII; or (c) use Collected Data in a manner that violates applicable privacy law.

7.4 **PII Protections.** Prior to inclusion in any licensed or commercialized data set, Platform will (a) strip Resident PII from records and image metadata (including EXIF location and device identifiers); (b) mask or blur portions of images revealing faces, identity documents, mail, screens, or other identifying content per Platform's published masking standard; and (c) apply de-identification consistent with [CCPA §1798.140(m) / Texas TDPSA] standards. Platform will maintain administrative, technical, and physical safeguards appropriate to the sensitivity of the data.

7.5 **Consent Chain.** Each Party will maintain the consent chain: Operator via the lease addendum; Platform via Resident and Vendor terms. Neither Party will represent to Residents that data practices differ from those disclosed.

## 8. REPRESENTATIONS AND WARRANTIES

8.1 Each Party represents that it is duly organized, has authority to enter this Agreement, and will comply with applicable law in its performance. Operator represents that it has the right to grant the licenses herein for the Covered Properties and that its leases (as supplemented by the lease addendum) permit the data practices described. Platform represents that it will perform the Platform Services in a professional and workmanlike manner.

8.2 **Disclaimer.** EXCEPT AS EXPRESSLY STATED, THE PLATFORM SERVICES ARE PROVIDED "AS IS" AND PLATFORM DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. PLATFORM DOES NOT WARRANT THE WORK OF ANY VENDOR AND DOES NOT GUARANTEE OUTCOMES OF AI-GENERATED ANALYSES, WHICH ARE INFORMATIONAL AIDS ONLY.

## 9. INDEMNIFICATION

9.1 Platform will defend and indemnify Operator against third-party claims arising from (a) Platform's violation of privacy law in its handling of Collected Data; and (b) Platform's infringement of third-party IP by the Platform Services. Operator will defend and indemnify Platform against third-party claims arising from (a) Operator's breach of its leases or landlord-tenant law; and (b) Operator-supplied data or materials. Indemnification is conditioned on prompt notice, control of defense by the indemnitor, and reasonable cooperation.

## 10. LIMITATION OF LIABILITY

10.1 NEITHER PARTY IS LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, OR LOST PROFITS.

10.2 EACH PARTY'S AGGREGATE LIABILITY UNDER THIS AGREEMENT IS CAPPED AT THE GREATER OF (a) THE AMOUNTS PAID OR PAYABLE BETWEEN THE PARTIES UNDER THIS AGREEMENT IN THE [12] MONTHS PRECEDING THE CLAIM, AND (b) $[LIABILITY_FLOOR]. FOR CLAIMS ARISING FROM VENDOR ON-SITE WORK, LIABILITY IS FURTHER LIMITED TO AVAILABLE PROCEEDS OF THE APPLICABLE INSURANCE REQUIRED UNDER SECTION 11. THE CAPS DO NOT APPLY TO (i) INDEMNIFICATION OBLIGATIONS UNDER SECTION 9, (ii) BREACH OF SECTION 7.3–7.4 [COUNSEL: consider super-cap of [X]× instead of uncapped], OR (iii) A PARTY'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT.

## 11. INSURANCE

11.1 Platform will maintain, and will require participating Vendors to maintain, insurance at not less than: Vendor commercial general liability $[GL_LIMIT] per occurrence; workers' compensation as required by law; Platform technology E&O and cyber liability $[EO_CYBER_LIMIT]. Certificates available on request; Operator named as additional insured on Vendor GL policies for work at Covered Properties where obtainable.

## 12. RECORDS; AUDIT; DISPUTES

12.1 Platform will keep records supporting Section 4 calculations and Qualified Record determinations for [3] years. Operator may audit such records once per [12]-month period, on [30] days' notice, through an independent auditor under NDA. If an audit reveals underpayment exceeding [5]%, Platform pays the shortfall plus reasonable audit costs.

## 13. CONFIDENTIALITY

13.1 Each Party will protect the other's non-public information with at least reasonable care, use it only to perform this Agreement, and not disclose it except to representatives under confidentiality duties or as required by law (with notice where lawful). Anonymized Data licensed under Section 7 is not Operator Confidential Information. This Section survives [3] years after termination (trade secrets: as long as protected by law).

## 14. GENERAL

14.1 **Governing Law; Venue.** This Agreement is governed by the laws of the State of Texas, without regard to conflicts rules. Exclusive venue lies in the state and federal courts sitting in [COUNTY], Texas, and the Parties consent to personal jurisdiction there. [COUNSEL: consider arbitration alternative.]

14.2 **Assignment.** Neither Party may assign without the other's consent, except to an affiliate or in connection with a merger, acquisition, or sale of substantially all assets, with notice.

14.3 **Severability.** If any provision is held unenforceable, it will be modified to the minimum extent necessary and the remainder enforced.

14.4 **Entire Agreement; Amendment; Notices; Force Majeure; No Waiver; Counterparts.** This Agreement (with its Exhibits) is the entire agreement and supersedes prior discussions; amendments must be in a writing signed by both Parties; notices go to the addresses above by [METHOD]; neither Party is liable for delay due to events beyond reasonable control; no waiver is implied from conduct; this Agreement may be executed in counterparts, including electronically.

14.5 **Survival.** Sections 1, 4.3 (accrued), 5.3, 7, 8.2, 9, 10, 12, 13, and 14 survive termination.

---

## EXHIBIT A — Covered Properties
[PROPERTY_SCHEDULE]

## EXHIBIT B — Included Platform Services
[SERVICE_DESCRIPTION: resident app; maintenance intake and dispatch; Move-In Shield; vendor management; escrowed payments; reporting dashboard]

## EXHIBIT C — Qualified Record Rubric
[CAPTURE STANDARD; COMPLETENESS SCHEMA; VERIFICATION EVENTS — TBD]

## EXHIBIT D — Service Levels
[SLA TERMS — TBD]

## EXHIBIT E — 90-DAY PILOT PROGRAM

E.1 **Pilot Scope.** For the first [90] days after the Effective Date (the "**Pilot Period**"), the Platform Services will be deployed only at the pilot properties listed here ([PILOT_UNIT_COUNT] units): [PILOT_PROPERTY_LIST].

E.2 **Success Criteria.** [PILOT_KPIs — e.g., % of maintenance requests routed through Platform; average time-to-dispatch; Move-In Shield completion rate on new leases; resident adoption rate; vendor enrollment count — TARGETS TBD].

E.3 **Pilot Exit.** Within [15] days after the Pilot Period, the Parties will review results. If success criteria are met, Exhibit A automatically expands per the rollout schedule in [E.4 / mutual written confirmation]. If not met, either Party may terminate on [30] days' notice; **Section 7.1 survives as to Collected Data collected during the Pilot Period.**

E.4 **Rollout Schedule.** [PHASED_EXPANSION_SCHEDULE — TBD].

---

*Signature blocks intentionally omitted — DRAFT, not for execution.*

---

## KEY DECISIONS FOR COUNSEL

1. **Perpetual data license enforceability and structure (§7.1)** — confirm the survival-of-license mechanic is drafted robustly against termination-for-Platform-breach scenarios (should Operator's remedy for Platform's data misuse include license revocation, or damages only?), and whether "irrevocable" should be qualified by cure rights.
2. **Post-termination revenue-share tail (§5.3(c))** — business decision with legal implications: does the data-licensing share on pre-termination Qualified Records survive in perpetuity (mirrors the license) or sunset? Perpetual payment obligation affects assignability and M&A diligence.
3. **De-identification standard (§1.2, §7.4)** — pick and validate the operative standard (CCPA de-identified, TDPSA pseudonymous vs. de-identified, HIPAA-style expert determination) so "Anonymized Data" survives regulator scrutiny; the whole license rides on this definition.
4. **Exclusive vs. primary maintenance channel (§3.3)** — exclusivity raises habitability-law and antitrust/steering questions in some jurisdictions; confirm the enforceable framing per state.
5. **Liability cap tied to insurance proceeds for vendor work (§10.2)** — confirm this holds against direct-negligence theories (negligent vetting claims against Platform) and whether the operator will accept it; consider express "no warranty of vendor work" plus additional-insured mechanics as the primary shield.
