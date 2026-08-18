# Revenue-Share Ledgers — Operator & Channel Partner (Items 5.5 / 5.6)
**Why:** before AMH's first dollar and Patrick's first override, every accrual must be computed by a ledger the counterparty can audit — statements, not spreadsheets. Rates are [PLACEHOLDERS] until Andrew sets them; the machinery is rate-agnostic.

## Design principles
1. **Accrue at event time, pay on schedule.** Every revenue event immediately writes accrual rows; monthly payout jobs sweep accruals → payouts. No end-of-month recomputation from raw data (drift = disputes).
2. **Double-entry discipline:** every accrual references its source event (subscription invoice id, order id, job id, data-license invoice id). Statement lines are drill-downable to source.
3. **Rates are versioned config**, effective-dated: `share_rates(counterparty_id, stream, rate, effective_from)`. Changing a rate never rewrites history.
4. **Separation:** operator ledger and channel ledger are separate systems from the pro cascade (see engine test V10). One event may legitimately hit multiple ledgers (AMH-via-Patrick home: operator share AND Patrick origination — each from its own stream, both bounded by the platform-floor policy).

## Streams & triggers
| Ledger | Stream | Trigger event | Base amount | Rate |
|---|---|---|---|---|
| Operator | VENDOR_SUBS | vendor subscription invoice PAID (vendor attributed to operator) | net subscription revenue | [10]% |
| Operator | RESIDENT_COMMERCE | affiliate/commerce order CONFIRMED at operator address | platform's net commission on order | [15–20]% |
| Operator | MOVEOUT_SERVICES | move-out service booking COMPLETED at operator address | platform's net referral revenue | [15–20]% |
| Operator | DATA_SHARE | data-license revenue recognized, allocated to operator's QUALIFIED records (day-weighted, see qualified-record schema) | allocated net data revenue | tiered [10/15/20]% |
| Channel (Patrick) | HOME_ORIGINATION | job COMPLETED at channel-attributed address | platform fee of job | 5% |
| Channel (Patrick) | PRO_ORIGINATION | job COMPLETED by channel-attributed pro | platform fee of job | 7% |
| Channel (Patrick) | AFFILIATE_SOURCING | revenue from partner deals the channel sourced | platform net partnership revenue | [NEGOTIATED]% |
| Channel | — NO SUBSCRIPTION STREAM — guard test: any channel accrual on a subscription invoice is a bug | | | |

## Schema
```sql
CREATE TABLE counterparties ( id CHAR(26) PRIMARY KEY, kind ENUM('operator','channel_partner'), name VARCHAR(120), payout_method JSON );
CREATE TABLE share_rates (
  id CHAR(26) PRIMARY KEY, counterparty_id CHAR(26), stream VARCHAR(32),
  rate DECIMAL(6,4) NOT NULL, tier_rules JSON NULL, effective_from DATE NOT NULL,
  UNIQUE KEY (counterparty_id, stream, effective_from)
);
CREATE TABLE share_accruals (
  id CHAR(26) PRIMARY KEY, counterparty_id CHAR(26), stream VARCHAR(32),
  source_event_type VARCHAR(40) NOT NULL, source_event_id CHAR(26) NOT NULL,
  base_amount_cents BIGINT NOT NULL, rate_applied DECIMAL(6,4) NOT NULL, rate_row_id CHAR(26) NOT NULL,
  accrued_cents BIGINT NOT NULL, accrued_at TIMESTAMP NOT NULL,
  status ENUM('accrued','swept','reversed') DEFAULT 'accrued',
  reversal_of CHAR(26) NULL,                       -- refunds/chargebacks create negative mirror rows
  UNIQUE KEY uq_event_stream (counterparty_id, stream, source_event_type, source_event_id)  -- idempotency
);
CREATE TABLE payout_runs ( id CHAR(26) PRIMARY KEY, counterparty_id CHAR(26), period_start DATE, period_end DATE,
  total_cents BIGINT, status ENUM('draft','approved','paid'), statement_uri VARCHAR(255), approved_by VARCHAR(64) );
```

## Statement (what AMH/Patrick receives monthly)
PDF + CSV: period, per-stream subtotal, event-count, drill-down CSV of every accrual (event id, date, base, rate, amount), reversals itemized, qualification summary for DATA_SHARE (qualified-day % by tier), YTD totals. Statement generation is deterministic re-run of ledger rows — regenerating any past statement byte-identical is the audit test.

## Guard tests
1. Idempotency: replaying an event stream produces zero duplicate accruals (unique key holds)
2. Refunded commerce order → reversal row; statement nets correctly
3. Rate change mid-month → events before/after use correct effective rate
4. Channel + subscription invoice → NO accrual (the Patrick rule)
5. AMH-via-Patrick home job → operator RESIDENT_COMMERCE untouched; Patrick HOME_ORIGINATION accrues; pro cascade unchanged
6. Statement regeneration → byte-identical
