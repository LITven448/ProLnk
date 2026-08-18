# AI Triage Output Contract + Evaluation Harness (Item 7.2)
**Why:** every downstream system (approval queues, cost bands, dispatch, pilot metrics) consumes the triage output. Lock the shape, version it, and grade every model/prompt change against a golden set — otherwise "did the AI get better or worse?" is a vibe, not a number.

## Output contract v1 (JSON Schema)
```json
{
  "$id": "triage.v1",
  "type": "object",
  "required": ["contract_version","issue","trade","urgency","confidence"],
  "properties": {
    "contract_version": { "const": "triage.v1" },
    "issue":       { "type": "string", "maxLength": 140 },
    "detail":      { "type": "string", "maxLength": 600 },
    "trade":       { "enum": ["plumbing","electrical","hvac","roofing","appliance","carpentry","painting","flooring","pest","landscaping","garage_door","locksmith","handyman","water_mitigation","other"] },
    "urgency":     { "enum": ["emergency","soon","routine"] },
    "urgency_reason": { "type": "string", "maxLength": 200 },
    "cost_band":   { "type": "object", "properties": { "low": {"type":"integer"}, "high": {"type":"integer"}, "currency": {"const":"USD"} } },
    "likely_cause": { "type": "string", "maxLength": 200 },
    "parts_likely": { "type": "array", "items": {"type":"string"}, "maxItems": 6 },
    "self_help":   { "type": "string", "maxLength": 200, "description": "safe interim step for resident; NEVER instructions involving electricity/gas beyond shutoff" },
    "confidence":  { "type": "number", "minimum": 0, "maximum": 1 },
    "escalate":    { "type": "boolean", "description": "true => route to next waterfall tier / human review" },
    "media_quality": { "enum": ["ok","poor","unusable"] }
  }
}
```
Rules: unparseable/schema-invalid output → automatic retry once → then `escalate:true` fallback record. NEVER free-text into downstream systems. `contract_version` is mandatory so old records replay correctly forever.

## Safety constraints (enforced by post-validation, not prompt hope)
- `self_help` regex-screened: no "rewire", "gas", "breaker replacement", "open the panel"
- emergency urgency ⇒ `self_help` limited to shutoff/evacuate/ventilate vocabulary
- cost_band absent when confidence < 0.5 (bad estimates are worse than none)

## Golden set (the report card)
- **Target: 500+ labeled photos.** Sources: existing platform job history (photo + what the pro actually found + final invoice), staged captures, public dataset augmentation.
- Label fields per item: true_trade, true_urgency, true_issue_summary, actual_cost (when known), media_quality
- Split: 400 eval / 100 holdout (never in prompts)
- **Team task tomorrow:** start labeling from job history — 50/day gets there in ~10 days; harness works from day one with whatever exists.

## Metrics & gates (run on every prompt/model change, in CI)
| Metric | Definition | Ship gate |
|---|---|---|
| Trade accuracy | exact match | ≥ 90% |
| Urgency safety | emergency recall (missed emergencies are the dangerous error) | ≥ 95% recall on true emergencies |
| Urgency overcall | % routine labeled emergency | ≤ 10% |
| Cost-band hit | actual cost within band (when both known) | ≥ 70% |
| Schema validity | parse rate before retry | ≥ 99% |
| Escalation sanity | escalate rate | 5–20% band (outside = miscalibrated confidence) |

## Harness (reference implementation)
```python
# eval_triage.py — run: python eval_triage.py --golden golden.jsonl --model-config prod.yaml
import json, statistics, argparse
def evaluate(golden_path, run_inference):
    rows = [json.loads(l) for l in open(golden_path)]
    results = []
    for r in rows:
        out = run_inference(r["image_path"])          # calls the SAME code path production uses
        results.append({
            "id": r["id"],
            "trade_ok": out.get("trade") == r["true_trade"],
            "urgency_pred": out.get("urgency"), "urgency_true": r["true_urgency"],
            "band_ok": (r.get("actual_cost") is not None and out.get("cost_band")
                        and out["cost_band"]["low"] <= r["actual_cost"] <= out["cost_band"]["high"]),
            "valid": out.get("_schema_valid", False),
            "escalated": out.get("escalate", False),
        })
    em_true = [x for x in results if x["urgency_true"] == "emergency"]
    report = {
        "n": len(results),
        "trade_accuracy": sum(x["trade_ok"] for x in results) / len(results),
        "emergency_recall": (sum(x["urgency_pred"] == "emergency" for x in em_true) / len(em_true)) if em_true else None,
        "overcall_rate": sum(x["urgency_pred"] == "emergency" and x["urgency_true"] == "routine" for x in results) / len(results),
        "cost_band_hit": (lambda k=[x for x in results if x["band_ok"] is not None]: sum(x["band_ok"] for x in k)/len(k) if k else None)(),
        "schema_validity": sum(x["valid"] for x in results) / len(results),
        "escalate_rate": sum(x["escalated"] for x in results) / len(results),
    }
    print(json.dumps(report, indent=2)); return report
```
Wire into CI: prompt/model config changes fail the build when a gate regresses. Store every report row with git SHA + prompt version → the accuracy dashboard is a one-query chart.

## Waterfall note (7.1 dependency)
This contract is tier-agnostic: Tier 1 and Tier 3 return the same shape; `escalate` + `confidence` drive tier promotion. Wiring the currently-dead waterfall = routing on these two fields. If pilot ships single-model, the contract is unchanged — only the router is.
