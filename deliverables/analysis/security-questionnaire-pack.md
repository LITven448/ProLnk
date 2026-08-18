# ProLnk / TrustyPro — Enterprise Security Questionnaire Answer Pack

**Version:** 1.0 (draft — internal review required before any external send)
**Owner:** Andrew Frakes, Founder (andrew@lit-ventures.com)
**Last reviewed:** [DATE]
**Status:** DRAFT — every answer tagged [VERIFY] must be confirmed by engineering before this document leaves the building. A security reviewer who catches one overstated answer will distrust all of them.

**How to use this pack:** When an enterprise customer (e.g., AMH or another SFR/property-management operator) sends a SIG-Lite, CAIQ, or homegrown vendor security questionnaire, copy the relevant model answers below, adapt names/dates, and have the security owner sign off. The Section 0 narrative can be sent proactively before any questionnaire arrives.

---

## 0. Security Overview (one-page narrative — send proactively)

**ProLnk / TrustyPro Security Overview**

ProLnk (operating homeowner-facing brand TrustyPro) is a home-services marketplace platform that connects property owners and residents with background-checked service professionals, using AI-assisted photo analysis to scope and route work. We designed our security posture around one principle: **hold as little sensitive data as possible, and protect what we must hold.**

**What we hold, and what we deliberately don't.** The platform processes property condition data (service requests, photos of homes and systems, property attributes such as roof/HVAC age), resident and homeowner contact information, and service professional business records. We do **not** store payment card numbers or bank credentials — all payments flow through a PCI DSS–compliant third-party payment processor, and card data never touches our systems. We do not collect Social Security numbers from consumers. Background checks on service professionals are performed by Checkr, an accredited consumer reporting agency; sensitive screening inputs are collected by Checkr directly, not by ProLnk. [VERIFY — confirm Checkr-hosted candidate flow is the implemented pattern]

**Infrastructure.** The platform runs on Microsoft Azure — Azure Container Apps for compute and Azure Database for MySQL Flexible Server for data — inheriting Azure's physical, network, and datacenter controls (SOC 2, ISO 27001, and related attestations available via the Microsoft Service Trust Portal). Data is encrypted at rest (AES-256) and in transit (TLS 1.2+). [VERIFY] Production and non-production environments are separated, and production access is restricted to named individuals with MFA. [VERIFY]

**AI processing.** Photo analysis uses leading commercial AI model providers under enterprise API terms, which by default do not use API-submitted customer data to train their models. Photos are stripped of embedded metadata (EXIF/GPS) at ingestion, and access to imagery is role-gated within the platform. [VERIFY — metadata stripping implementation]

**Where we are as a company.** We are an early-stage company and we are transparent about it: we do not yet hold a SOC 2 report. A SOC 2 Type I engagement is planned for [DATE]. In the interim we offer this security overview, completed questionnaires, our subprocessor list, and a live architecture review with our engineering team. We commit contractually to 72-hour customer notification of confirmed security incidents affecting customer data.

**Security contact:** security@prolnk.xyz [VERIFY — mailbox must exist and be monitored before sending]

---

## 1. Company & Governance

**Q: Describe your company (legal name, ownership, size, locations).**
ProLnk is a privately held, founder-owned company backed by LIT Ventures, an investment group. [VERIFY — exact legal entity name, state of incorporation, headcount, and any contractor/dev-team disclosure language]. The company operates remotely with no company-owned facilities; all production systems are cloud-hosted on Microsoft Azure.

**Q: Who is responsible for information security?**
Security is owned at the executive level by the Founder/CEO, with day-to-day implementation by the engineering lead. [VERIFY — name the accountable engineering individual]. As an early-stage company we do not have a dedicated CISO; security responsibilities are explicitly assigned rather than diffuse, and this questionnaire is reviewed and signed by the accountable owner.

**Q: Do you have a written information security policy?**
[VERIFY — honest current answer required. If not yet written: "A formal written ISMS policy set is being finalized in conjunction with our SOC 2 Type I preparation, targeted for [DATE]. Current practice follows the controls described throughout this document."] Do NOT claim a policy exists if it doesn't — this is one of the first artifacts a reviewer requests.

**Q: Do you carry cyber liability insurance?**
[VERIFY — confirm policy existence, carrier, and limits before answering. If none: state "Cyber liability coverage is being procured as part of enterprise readiness; expected in place by [DATE]."]

---

## 2. Data Classification & Handling

**Q: What customer/consumer data do you collect and process?**
- **Property condition data:** service request details; photos of homes, systems, and damage; property attributes (type, year built, square footage, roof/HVAC/water-heater type and age, systems data).
- **Contact data:** resident and homeowner name, email, phone, and service address.
- **Service professional data:** business information, licensing/insurance attestations, background-check *status* (pass/fail tier), and payout account linkage held by the payment processor.

**Q: What sensitive data do you NOT collect?**
- **Payment cards / bank credentials:** never stored or transmitted through ProLnk systems; handled end-to-end by our PCI DSS–compliant payment processor.
- **Consumer SSNs / government IDs:** not collected. Background-check identity inputs for service professionals are collected directly by Checkr through Checkr-hosted flows. [VERIFY — confirm no SSN field exists anywhere in our forms or database]
- **Health, biometric, or financial account data:** not collected.

**Q: How do you protect photos of residents' homes?**
- **Metadata stripping at ingestion:** EXIF data, including GPS coordinates and device identifiers, is stripped from photos at upload before storage or downstream processing. [VERIFY — confirm implemented in the Azure ingestion pipeline, not just planned]
- **Masking of high-value items:** imagery workflows support masking/redaction of high-value personal items before broader internal or downstream use. [VERIFY — confirm this exists in the current build; if roadmap-only, state "planned for [DATE]" instead]
- **Role-gated access:** photo and property data access is restricted by role; service professionals see only jobs dispatched to them, and administrative access is limited to named operations staff. [VERIFY — confirm RBAC enforcement in the FastAPI layer]

**Q: Do you sell or license customer data?**
Customer personal data is not sold. Any future data-product or licensing use of property condition data will use aggregated and anonymized datasets only, with personal identifiers and precise-location data removed, and will be governed by customer contract terms. [VERIFY — ensure current contracts/privacy policy language matches this commitment before asserting it]

**Q: What are your data retention and deletion practices?**
Account deletion request flow is supported per CCPA requirements. [VERIFY — confirm the deletion flow works end-to-end on the Azure platform, including photo blobs and AI-provider-side deletion, and document the retention schedule; a reviewer will ask "how long do you keep photos after job completion?" — have a number]

---

## 3. Encryption

**Q: Is data encrypted at rest?**
Yes. Azure Database for MySQL Flexible Server and Azure Storage encrypt all data at rest with AES-256 using Microsoft-managed keys by default. [VERIFY — confirm no storage resource has been created outside defaults, and decide/state whether customer-managed keys are offered (likely answer: not currently)]

**Q: Is data encrypted in transit?**
Yes. All external traffic is served over HTTPS with TLS 1.2 or higher; internal service-to-database connections require TLS. [VERIFY — confirm TLS minimum version is enforced on Container Apps ingress and MySQL Flexible Server (`require_secure_transport=ON`, minimum TLS version parameter), and that no plaintext internal hop exists]

**Q: How are encryption keys managed?**
Platform encryption keys are managed by Azure Key Vault / Microsoft-managed key infrastructure. Application secrets are stored in [Azure Key Vault / Container Apps secrets] and are not committed to source control. [VERIFY — see §6 secrets management; confirm which mechanism is actually in use]

---

## 4. Access Control

**Q: Describe your access control model.**
Least-privilege, role-based access. Production access (Azure subscription, database, admin panels) is limited to named individuals with a business need. [VERIFY — enumerate who currently has production access, including any external dev-team members, and confirm each is on a named account, not shared credentials]

**Q: Is MFA enforced?**
MFA is enforced on all administrative access: Azure/Entra ID accounts, source control, and third-party admin consoles (payment processor, Checkr, email/SMS). [VERIFY — audit each console; one admin account without MFA makes this answer false]

**Q: Describe your onboarding/offboarding process.**
Access is granted on role assignment and revoked within [24 hours / same business day] of termination or role change, via a documented offboarding checklist covering Azure, source control, database, and all third-party consoles. [VERIFY — the checklist must actually exist; with an external dev team this is a near-certain probe. If informal today, write the checklist before sending rather than claiming one exists]

**Q: Do you use shared accounts?**
No shared accounts are used for production access. [VERIFY — this is frequently untrue at early-stage companies; audit before asserting]

---

## 5. Infrastructure & Network Security

**Q: Describe your hosting environment.**
Production runs entirely on Microsoft Azure: Azure Container Apps (application compute), Azure Database for MySQL Flexible Server (primary datastore), Azure Storage (media/photos). Physical, environmental, and hypervisor-level security are inherited from Microsoft Azure (SOC 1/2/3, ISO 27001/27017/27018; reports available via the Microsoft Service Trust Portal). [VERIFY — confirm the platform migration from prior hosting (Render/TiDB) is complete for the environment being reviewed; if the legacy platform is still live and serving customers, it must be disclosed and described too — do not answer as if Azure is the only production environment while prolnk.xyz/trustypro.io still run on Render]

**Q: Are production and non-production environments separated?**
Yes — separate environments with separate credentials; production data is not used in development or test environments. [VERIFY — confirm separate Azure resource groups/subscriptions actually exist and that no prod DB copies are used in dev]

**Q: How is network access restricted?**
Database access is restricted to the application tier (private networking / firewall rules); no databases are exposed to the public internet. [VERIFY — check MySQL Flexible Server public access setting; "public access enabled with firewall rules" vs. "private VNet" are different answers — give the true one]

**Q: Do you perform vulnerability scanning or penetration testing?**
[VERIFY — honest answer required. Likely honest answer: "Dependency and container image scanning are performed in CI (see §6). An initial third-party penetration test is planned in conjunction with SOC 2 preparation, targeted [DATE]." Do not claim pen testing that hasn't happened; reviewers ask for the report]

---

## 6. Application Security

**Q: Describe your secure development lifecycle.**
- **Code review:** changes to production are reviewed before merge. [VERIFY — confirm branch protection/required review is actually enforced on the repo, especially with the external dev team]
- **Dependency scanning:** automated dependency vulnerability scanning (e.g., GitHub Dependabot/`npm audit`/`pip-audit`) runs on the Next.js and FastAPI codebases. [VERIFY — confirm enabled]
- **Secrets management:** secrets are held in [Azure Key Vault / Container Apps secrets / CI secrets] and excluded from source control; secret scanning is enabled on the repository. [VERIFY — confirm mechanism and confirm no secrets in repo history; run a secret scan before asserting this]
- **Framework-level protections:** the platform uses parameterized queries via ORM, framework CSRF/XSS protections, and input validation at the API layer (FastAPI/Pydantic). [VERIFY — confirm with engineering lead]

**Q: How do you authenticate users?**
[VERIFY — document the actual auth implementation on the Azure build (session management, password hashing algorithm, OAuth providers if any). Do not guess]

**Q: Do you have a responsible disclosure process?**
Security issues may be reported to security@prolnk.xyz. [VERIFY — mailbox must exist; a formal bug bounty is not claimed]

---

## 7. AI-Specific Security

**Q: Which AI systems process customer data, and what data do they receive?**
Photo analysis for service-request scoping is performed via APIs from leading commercial AI model providers under enterprise API terms. Data sent: the uploaded photo (metadata-stripped, see §2) and non-identifying request context. Data NOT sent: resident names, contact details, or precise addresses are excluded from AI API calls. [VERIFY — confirm prompts/payloads actually exclude PII; audit the actual API call sites in the codebase. If address or name is currently in any prompt, fix before sending]

**Q: Do AI providers train on customer data?**
No. Our AI providers' standard API/enterprise terms state that data submitted via API is not used to train their models (in contrast to their consumer products). We rely on and flow down these commitments. [VERIFY — confirm each provider in use is accessed under API/enterprise terms (not consumer accounts) and that any available "do not retain" / zero-data-retention options are enabled where offered]

**Q: How is access to AI capabilities controlled?**
AI API keys are held as platform secrets (§6) and are not exposed client-side; AI analysis runs server-side only. Model outputs are treated as untrusted input and validated before use. [VERIFY — confirm no AI API keys are shipped in frontend bundles or mobile apps]

**Q: What are the AI outputs used for? Is there human review?**
AI photo analysis produces scoping/opportunity reports used to route service requests. Routing to a professional includes ProLnk team/admin review — AI output does not autonomously dispatch work or make consequential decisions about individuals. [VERIFY — confirm human-in-the-loop review step exists in the Azure build's dispatch flow]

**Q: AI and background checks.**
AI is not used to make background-check or adverse-action decisions. Screening decisions follow Checkr results against pre-defined clearance tier requirements (fail-closed: if clearance cannot be confirmed at the required tier, the professional is not dispatchable).

---

## 8. Subprocessor List

| Subprocessor | Function | Data shared | Location |
|---|---|---|---|
| Microsoft Azure | Cloud hosting (compute, database, storage) | All platform data | US regions [VERIFY — name the region(s)] |
| Leading AI model providers (enterprise API terms) | Photo analysis for service scoping | Metadata-stripped photos + non-identifying request context | US [VERIFY — confirm data residency terms per provider] |
| Checkr, Inc. | Professional background screening | Professional identity data (collected by Checkr directly) | US |
| Payment processor — Stripe, Inc. [VERIFY — spec names Stripe/Stripe Connect on the live platform; confirm Stripe is the processor of record for the platform under review] | Payments and professional payouts | Payment/payout data (card data never held by ProLnk) | US |
| Email provider [TBD — Resend on current live platform; VERIFY provider for Azure platform] | Transactional email | Name, email | US |
| SMS provider [TBD — Twilio on current live platform; VERIFY provider for Azure platform] | Transactional/notification SMS | Name, phone | US |

Customers are notified of subprocessor additions [VERIFY — commit to a mechanism, e.g., 30-day advance notice via email, and make sure contracts say the same thing].

---

## 9. Business Continuity & Disaster Recovery

**Q: Describe your backup strategy.**
Azure Database for MySQL Flexible Server automated backups are enabled with [7–35]-day retention and point-in-time restore. [VERIFY — confirm configured retention; also confirm photo/blob storage redundancy setting (LRS/ZRS/GRS)]

**Q: Do you test restores?**
[VERIFY — honest answer required. If never tested: perform one restore test before sending, then answer "Restore procedures are tested [quarterly/semi-annually]; last test [DATE]." A one-time tested restore is a true answer; an untested claim is not]

**Q: What are your RTO/RPO targets?**
Target RTO: [X hours]; target RPO: [X minutes/hours, bounded by point-in-time-restore granularity]. [VERIFY — set real numbers with engineering; do not publish targets nobody has agreed to meet]

**Q: Single points of failure / key person risk?**
[VERIFY — honest answer for an early-stage team: document that infrastructure access and runbooks are held by more than one person, or state the mitigation plan]

---

## 10. Incident Response

**Q: Do you have an incident response process?**
Yes. Suspected incidents are triaged by the engineering lead and escalated to the Founder/CEO; the process covers identification, containment, eradication, recovery, and post-incident review with documented timeline. [VERIFY — a written IR runbook must exist before this is asserted; write a one-page version if needed — reviewers ask for it]

**Q: What are your customer notification commitments?**
We commit to notifying affected enterprise customers of a confirmed security incident involving their data **within 72 hours** of confirmation, with ongoing updates through resolution. Notification includes nature of the incident, data affected, and remediation steps.

**Q: Security contact:**
security@prolnk.xyz [VERIFY — create and monitor before sending]; escalation: Andrew Frakes, Founder.

**Q: Have you experienced a breach in the last 24 months?**
[VERIFY — confirm with all team members, then answer truthfully. Standard answer if clean: "No security incidents involving unauthorized access to customer data have occurred."]

---

## 11. Compliance Status

**Q: Do you hold SOC 2 / ISO 27001?**
**Honest answer — use verbatim:** "Not yet. A SOC 2 Type I engagement is planned for [DATE — VERIFY: pick a real date and book the auditor before sending, or say 'engagement in scoping']. In the interim, we offer this completed questionnaire, our subprocessor list, and a live architecture review with our engineering team. Our infrastructure providers (Microsoft Azure) hold SOC 2 and ISO 27001 attestations, available via the Microsoft Service Trust Portal."
Never say "SOC 2 compliant," "SOC 2 in progress" (unless an auditor is actually engaged), or "SOC 2 equivalent."

**Q: Privacy law compliance?**
- **CCPA/CPRA (California) and Texas TDPSA:** privacy policy published; consumer rights request flow (access/deletion) supported. [VERIFY — confirm the privacy policy names both statutes and the deletion flow works on the platform under review; TDPSA applies to us as a Texas-market business and requires recognizing universal opt-out mechanisms if we ever sell/share data]
- **GDPR:** not currently targeting EU residents; [VERIFY — confirm no EU data subjects onboarded]
- **TCPA:** SMS is sent only with captured opt-in consent; opt-out (STOP) honored automatically; do-not-call respected. [VERIFY — confirm opt-in capture and STOP handling are wired on the platform under review]
- **FCRA:** professional background checks via Checkr follow FCRA process, including consent and adverse-action notices administered through Checkr. [VERIFY — Checkr integration not yet live per spec ("key not yet set"); do not describe vetting as operational until it is]
- **RESPA:** routing logic is designed not to steer homeowners to a specific professional in covered transactions.

**Q: PCI DSS?**
ProLnk is out of PCI scope for card storage: all card data is collected and held by our PCI DSS Level 1 payment processor via their hosted/tokenized fields; card numbers never transit ProLnk servers. [VERIFY — confirm the integration uses processor-hosted fields/tokenization, i.e., SAQ-A posture]

---

## 12. Physical Security

**Q: Describe physical security of facilities housing customer data.**
Not applicable at the company level: ProLnk operates no data centers or offices housing customer data; the team works remotely. All customer data resides in Microsoft Azure data centers, which maintain physical controls (perimeter security, biometric access, 24/7 monitoring) attested under Azure's SOC 2 and ISO 27001 audits (Microsoft Service Trust Portal).

**Q: Endpoint security for remote workers?**
Staff and contractors with production access use devices with full-disk encryption, screen lock, and OS auto-update enabled. [VERIFY — with an external dev team this is a real exposure; confirm or implement a lightweight endpoint standard before asserting]

---

## 13. Personnel Security

**Q: Do you perform background checks on employees?**
Background checks are performed on personnel with access to production customer data. [VERIFY — likely NOT currently true for the internal team/dev contractors; either run them (Checkr can do this too) or answer honestly: "Background checks are performed on all marketplace service professionals via Checkr; employee/contractor screening for production-access personnel is being implemented by [DATE]"]

**Q: Security awareness training?**
[VERIFY — honest answer: if none exists, implement a lightweight annual training (even a documented 1-hour session) before claiming it, or state "Security training program launching [DATE] as part of SOC 2 preparation"]

**Q: Confidentiality agreements?**
All employees and contractors with data access are bound by confidentiality obligations. [VERIFY — confirm the external dev team is under signed agreements covering data protection; if not, this is urgent independent of any questionnaire]

---

## GAPS TO CLOSE BEFORE SENDING

Ranked by likelihood an enterprise reviewer (e.g., AMH's vendor security team, which reviews vendors touching resident data and home imagery constantly) probes it, weighted by how damaging a false answer would be.

| # | Gap ([VERIFY] item) | Why it will be probed | Action before sending |
|---|---|---|---|
| 1 | **Photo PII handling: EXIF/GPS stripping, no PII in AI API payloads (§2, §7)** | This is the product's core data flow — resident home photos to external AI APIs is exactly the scenario an SFR operator's security team fears. They WILL ask what leaves your boundary. | Audit the actual ingestion code and AI call sites; implement stripping if absent. This one being false is fatal. |
| 2 | **SOC 2 date + written security policy + IR runbook (§1, §10, §11)** | First three artifact requests in almost every review: "your ISMS policy," "your IR plan," "your SOC 2 report or roadmap." | Book/scope the auditor so [DATE] is real; write the 1-page policy set and IR runbook — hours of work, not weeks. |
| 3 | **MFA + named accounts + offboarding across ALL admin surfaces, including the external dev team (§4)** | Access control with offshore/external developers is a standard probe for early-stage vendors; one non-MFA console or shared login makes §4 false. | Audit every console (Azure, GitHub, Stripe, Checkr, email/SMS); write the offboarding checklist; confirm dev-team NDAs/DPAs (§13). |
| 4 | **Which environment is actually "production" — Azure rebuild vs. live Render/TiDB platform (§5)** | The pack describes Azure, but the spec says the live platform still runs on Render/TiDB Cloud. Answering only for Azure while customer data sits on Render is a misrepresentation. | Decide scope: either the Azure platform is production by send date, or add a disclosed section for the current stack. |
| 5 | **TLS/encryption enforcement settings (§3)** | Easy for reviewers to test externally (SSL Labs scan of your endpoints) — a claim they can falsify in 5 minutes. | Verify Container Apps ingress TLS minimum, MySQL `require_secure_transport`, and run an external scan yourself first. |
| 6 | **Backup restore test + real RTO/RPO numbers (§9)** | Standard SIG-Lite questions; "we've never tested a restore" is a common early-stage failure they expect to catch. | Run one restore test, record the date/duration, and set agreed RTO/RPO targets. |
| 7 | **Checkr integration not actually live (§11, spec §3.5)** | If marketing says "background-checked pros" and the reviewer asks for the screening process, "key not yet set" is a trust-destroying discovery. | Wire Checkr before sending, or word all vetting claims as forward-looking. |
| 8 | **Deletion flow end-to-end incl. photo blobs + retention schedule (§2)** | CCPA/TDPSA questions are checklist items; "how long do you keep photos?" needs a number. | Test the deletion flow on the platform under review; document a retention schedule. |
| 9 | **AI provider terms: enterprise/API accounts, no-training, retention options (§7)** | AI subprocessors are the fashionable probe in 2026 questionnaires. | Confirm each provider account type; enable zero-retention options where offered; keep the terms links on file. |
| 10 | **Insurance, employee background checks, security training, endpoint standards (§1, §12, §13)** | Asked in every SIG-Lite, but reviewers tolerate honest "planned by [DATE]" answers here more than in items 1–5. | Fill in honest dates; procure cyber insurance quote; run internal Checkr checks on production-access personnel. |

**Send rule:** do not send until items 1–5 are green. Items 6–10 may ship with honest "planned by [DATE]" language.
