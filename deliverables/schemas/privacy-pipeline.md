# Privacy Pipeline — PII Stripping, Masking, Role-Gated Access (Item 8.2)
**Why:** this machinery is claimed in the patent (Claims 15/21) and promised in every partner document. It must exist in code before any operator pilot. This file is the reference design the dev team implements.

## Pipeline stages (every media ingest, no exceptions)
```
upload → [1] metadata strip → [2] quality gate → [3] AI analysis (redacted copy) → [4] masking pass → [5] tiered storage → [6] access layer
```

**[1] Metadata strip (synchronous, before first write to durable storage)**
- Remove: GPS/EXIF location, device serial/identifiers, owner name fields, original filename
- Keep (re-attached as first-class DB fields, not EXIF): capture timestamp, address_id linkage, uploader role
- Implementation: re-encode image (strips all EXIF) rather than tag-by-tag deletion — fail-closed

**[2] Quality gate** — reject black/blurred/zero-content frames before they pollute the record (cheap heuristic: luminance variance + resolution floor)

**[3] AI analysis** runs on the stripped copy only. Prompts NEVER include: resident name, contact info, account ids. Address context passed as opaque `address_ref`, not the street address, unless the specific analysis requires locality (weather overlay) — then city/zip only.

**[4] Masking pass (interior images)**
- Detect and blur: faces/people (reject frame if person is primary subject), documents/mail/screens with readable text, firearms, medications, high-value portables (jewelry/electronics serials)
- Output = masked derivative; original goes to restricted tier
- Detection via vision model with conservative thresholds; UNCERTAIN → mask anyway (fail-closed)

**[5] Tiered storage**
| Tier | Contents | Access |
|---|---|---|
| `masked/` | masked derivatives | pros on assigned jobs; operator approvers; support |
| `restricted/` | originals | AI pipeline service account; break-glass admin (logged, alerts) |
| `export/` | anonymized aggregates only | data-licensing pipeline (Phase 2) — NEVER raw imagery |

**[6] Access layer rules**
- Pro sees masked images ONLY for lead records currently assigned to them; unmask event = confirmed engagement + logged
- Operator staff see masked interiors; originals never leave restricted tier to any human role without break-glass
- Every image view is an audit row (who/which image/why-context)

## Reference implementation sketch (TypeScript)
```ts
export async function ingestMedia(file: Upload, ctx: IngestCtx): Promise<MediaRecord> {
  const clean = await reencodeStripped(file);            // [1] hard fail => reject upload
  assertQuality(clean);                                   // [2]
  const rec = await store.restricted.put(clean, ctx);     // original to restricted FIRST (durability)
  await queue.enqueue('mask', { mediaId: rec.id });       // [4] async, SLA < 60s
  await queue.enqueue('analyze', { mediaId: rec.id, redactedCtx: redact(ctx) }); // [3]
  return rec;                                             // UI shows "processing" until masked copy exists
}
// Serving path: ONLY masked derivatives resolve for non-service roles.
export function mediaUrlFor(role: Role, media: MediaRecord) {
  if (role.isServiceAccount) return signed(media.restrictedKey, '5m');
  const masked = media.maskedKey ?? PLACEHOLDER_PROCESSING;
  return signed(masked, '15m', { audit: role });
}
```

## Data-deletion flow (CCPA/TDPSA tie-in, item 9.5)
Resident deletion request → PII rows purged (contact, account) → media is address-record data: masked derivatives retained (property record, legitimate interest — counsel to confirm posture), originals with any person-content hard-deleted. Document the policy either way; don't improvise per request.

## Acceptance tests
1. Upload with GPS EXIF → stored object has zero EXIF; DB has timestamp
2. Interior with visible mail/person → masked derivative blurs both; original restricted
3. Pro requests image off an unassigned job → 403 + audit row
4. AI prompt log sample contains no names/addresses/emails (automated regex sweep in CI)
5. Restricted-tier human access → break-glass alert fires
