# Certificate of Insurance (COI) Requirements

## What Is a COI?
A Certificate of Insurance (ACORD 25) is a document issued by an insurance carrier that summarizes a contractor's coverage. ProLnk collects COIs to verify insurance before dispatching partners to homeowner properties.

## Standard ProLnk COI Requirements (Residential)

| Coverage Type | Minimum Requirement |
|---------------|---------------------|
| General Liability | $1,000,000 per occurrence / $2,000,000 aggregate |
| Workers Compensation | Statutory (required if any employees other than sole owner) |
| Auto Liability | $1,000,000 combined single limit (if company vehicles used) |

## Enhanced Requirements (Commercial/School/Healthcare)

| Coverage Type | Minimum Requirement |
|---------------|---------------------|
| General Liability | $2,000,000 per occurrence / $4,000,000 aggregate |
| Workers Compensation | Required (no exceptions) |
| Auto Liability | $1,000,000+ |
| Umbrella/Excess | $1,000,000+ (preferred for large commercial) |

## COI Verification Process

### Step 1: Document Upload
Partner uploads COI PDF via Briefcase → Document OCR extracts key fields

### Step 2: OCR Extraction (Docsumo/Textract)
Extract these fields from ACORD 25:
- Named insured (must match partner business name)
- Insurance carrier name + NAIC #
- Policy numbers (separate per coverage type)
- Effective dates (not expired)
- Coverage amounts per occurrence and aggregate
- Certificate holder (who the cert is issued to — can leave blank or add ProLnk)

### Step 3: Admin Verification
Admin confirms:
- Coverage amounts meet minimums
- Policy is not expired
- Named insured matches partner record
- Carrier has an A.M. Best rating of A- or better (preferred)

### Step 4: Expiry Monitoring
Compliance agent monitors expiry dates:
- 60 days before: Yellow warning, notify partner
- 30 days before: Orange alert, urgent renewal request
- Expired: Red, restrict Briefcase, pause lead routing
- 7 days expired: Auto-suspend if not renewed

## What to Look for in COI Photos
When AI analyzes a COI document:
1. Find the "CERTIFICATE OF COVERAGE" header (confirms document type)
2. Check "POLICY NUMBER" fields for each coverage type
3. Read "POLICY EFF" and "POLICY EXP" dates (expiration must be future)
4. Check "EACH OCCURRENCE" dollar amount under General Liability
5. Note "INSURED" name — must match partner's business name
6. Look for "Workers Compensation" section with statutory limits
7. Note certificate date (should be recent — within past 60 days for verification)

## Common COI Issues
- **Expired policy**: Partner renewed but forgot to upload new COI
- **Wrong named insured**: DBA vs. legal entity name mismatch
- **Workers comp exempt**: Only valid if truly sole proprietor with no employees
- **Claims made vs occurrence**: Occurrence policy preferred; claims made requires tail coverage
- **Low limits**: Some partners have legacy $500K policies — must upgrade to qualify

## ProLnk as Additional Insured
For commercial/facility work, ProLnk may need to be listed as Additional Insured on the COI.
This provides ProLnk coverage if a claim arises from the partner's work.
Partners should request this from their insurance agent when working commercial facilities.
