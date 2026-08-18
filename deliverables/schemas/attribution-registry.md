# Attribution Registry — Schema & Reference Implementation (Items 4.6 / 8.3)
**Why this exists:** every future revenue split — Patrick's overrides, AMH's shares, Scout origination, pro photo-origination — depends on one permanent fact: *who brought this address / this pro / this job to the platform.* That fact must be stamped at creation, be immutable, and survive every ownership, tenant, and account change. This is the smallest system with the largest financial consequences.

## Design rules
1. **Stamp at creation, never later.** An address/pro/job row cannot be committed without an attribution record (DB constraint, not app-code politeness).
2. **First origination wins, permanently.** Later claims create a dispute row for human review; they never overwrite.
3. **Address-keyed, not account-keyed.** Attribution follows the normalized property address (and pro entity), so tenant turnover and home sales don't break it.
4. **Append-only.** Corrections are new rows with reason + actor; nothing is updated or deleted.

## Schema (SQL reference)
```sql
CREATE TABLE origination_sources (
  id            CHAR(26) PRIMARY KEY,          -- ULID
  kind          ENUM('pro','scout','channel_partner','operator','platform','homeowner_self') NOT NULL,
  external_ref  VARCHAR(64) NOT NULL,          -- pro_id / partner_id ('utility_valet') / operator_id ('amh')
  display_name  VARCHAR(120) NOT NULL,
  UNIQUE KEY uq_kind_ref (kind, external_ref)
);

CREATE TABLE address_attributions (
  id              CHAR(26) PRIMARY KEY,
  address_id      CHAR(26) NOT NULL,            -- FK normalized_addresses
  source_id       CHAR(26) NOT NULL,            -- FK origination_sources
  attributed_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  method          ENUM('bulk_import','invite_link','scout_claim','organic_signup','api') NOT NULL,
  evidence        JSON NOT NULL,                -- {invite_token|import_batch_id|claim_id|utm}
  superseded_by   CHAR(26) NULL,                -- only via dispute resolution; original retained
  UNIQUE KEY uq_active_address (address_id, (IF(superseded_by IS NULL, 1, NULL)))  -- one ACTIVE attribution per address
);

CREATE TABLE pro_attributions   ( /* identical shape, keyed on pro_id */ );
CREATE TABLE job_attributions (
  id          CHAR(26) PRIMARY KEY,
  job_id      CHAR(26) NOT NULL UNIQUE,
  lead_source ENUM('resident_request','homeowner_request','pro_photo_origination','proactive_alert','operator_dispatch') NOT NULL,
  photo_origination_pro CHAR(26) NULL,          -- set when a pro's uploaded photos generated this job (pays Stream 4)
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attribution_disputes (
  id CHAR(26) PRIMARY KEY, entity ENUM('address','pro'), entity_id CHAR(26),
  claimant_source CHAR(26), reason TEXT, status ENUM('open','upheld','rejected') DEFAULT 'open',
  resolved_by VARCHAR(64) NULL, resolved_at TIMESTAMP NULL
);
```

## Write-path contract (TypeScript reference)
```ts
// The ONLY way addresses enter the system. No attribution → transaction aborts.
async function createAddress(input: NewAddress, attr: AttributionInput, tx: Tx) {
  const address = await tx.addresses.insert(normalize(input));
  await tx.addressAttributions.insert({
    addressId: address.id,
    sourceId: await resolveSource(attr, tx),      // throws if unresolvable
    method: attr.method,
    evidence: attr.evidence,                       // invite token / batch id — REQUIRED
  });
  return address; // commit together or not at all
}
```

## Resolution rules the payout engines consume
| Question | Answer comes from |
|---|---|
| Who gets the 5% home-origination on this job? | Active `address_attributions` row → source |
| Does Patrick's 7% pro-override apply? | `pro_attributions` for the completing pro → source.kind='channel_partner' |
| Does an operator share accrue? | address attribution source.kind='operator' OR address belongs to operator portfolio table |
| Does photo-origination (Stream 4) pay? | `job_attributions.photo_origination_pro` |
| Edge — operator home introduced *via* Patrick? | Address attribution = channel_partner (Patrick, first origination wins); operator relationship recorded separately in portfolio membership — BOTH pay from their own ledgers. This is the AMH-via-Patrick case: document it, don't fudge it. |

## Bulk import requirement (pilot day one)
CSV import (operator portfolios) must take `--source` as a required argument; every imported row gets the same attribution in the same transaction batch, with `evidence.import_batch_id` for auditability. An import without a source flag must hard-fail.

## Acceptance tests
1. Insert address without attribution → constraint violation
2. Two imports claim same address → second creates dispute, first stays active
3. Home sold, new owner account attached → attribution unchanged; origination payout on next job unchanged (ties to engine test V8)
4. Export: for any date range, sum of payouts by source reconciles against attribution counts
