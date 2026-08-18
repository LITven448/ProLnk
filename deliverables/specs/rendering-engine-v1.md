# Rendering Engine v1 — Photo → Reimagined Room with Real Products (Item 2.7)
**What it is:** resident/homeowner photographs their actual room; AI re-imagines it with real, purchasable products composited in (furniture, paint, decor, drapes) while preserving the real windows, layout, and light; every rendered product is tappable → buy via affiliate. NOT AR — pure image-to-image reimagining, per Andrew's direction.

## Pipeline
```
room photo → [1] safety screen → [2] scene understanding → [3] product selection → [4] render (inpaint/restyle) → [5] guardrail pass → [6] shoppable overlay
```

**[1] Safety screen** — person detected as subject → decline politely (guardrails PART B); strip metadata (privacy pipeline runs first as always).

**[2] Scene understanding** — one vision call: room type, style descriptors, dominant palette, replaceable zones (sofa zone, wall paint, window treatment, rug zone, lighting), approximate zone boxes. Output `scene.v1` JSON.

**[3] Product selection** — query catalog index (from affiliate feeds §6.1: SKU, image, price, dimensions, category, style tags) for candidates per zone; rank by style-match + price band + margin; pick 3–6 products per render concept.

**[4] Render** — image-editing model call: source photo + instruction built from structured template + product reference images. Two modes:
- `restyle`: repaint walls / swap textiles (highest fidelity, lowest risk) — LAUNCH MODE
- `refurnish`: replace furniture zones with selected products (harder; product likeness must stay recognizable) — fast-follow
Never structural changes in v1.

**[5] Guardrail pass** — automated: no people appeared, watermark applied, product likeness check (rendered item visually matches SKU reference above threshold — if the model hallucinated a different sofa, drop the tap-target for that SKU rather than mislabeling).

**[6] Shoppable overlay** — tap-targets on product zones → SKU card (live price fetched at view-time, "AI visualization — actual product may vary") → affiliate checkout link with attribution params.

## Contracts
```json
// scene.v1
{ "room_type":"living_room", "style":["transitional","warm"], "palette":["#B8A184","..."],
  "zones":[{"kind":"sofa","box":[x,y,w,h],"replaceable":true}, {"kind":"wall_paint","replaceable":true}] }
// render.v1
{ "render_id":"...", "source_media_id":"...", "mode":"restyle|refurnish",
  "products":[{"sku":"WF-123","zone":"sofa","partner":"wayfair","likeness_ok":true}],
  "output_media_id":"...", "watermarked":true, "kind":"render" }   // kind=render → excluded from evidence surfaces
```

## Prototype plan (1 week, one engineer, before productionizing)
Day 1–2: catalog ingest script — parse one Wayfair CJ feed slice (500 SKUs, 3 categories) into a searchable table
Day 3–4: pipeline script — 10 test room photos → scene call → manual product pick → image-edit call (restyle mode) → outputs reviewed
Day 5: likeness + watermark pass; simple HTML gallery of before/after with tap-targets
Exit criteria: 7/10 renders "would show a customer" by eyeball panel; cost per render measured; the demo gallery IS the AMH/NFM pitch asset.

## Cost & performance envelope
Per render: 1 vision call + 1 image-gen call ≈ $0.05–0.15 at current API pricing [measure in prototype]; target < 20s p90 end-to-end; cache scene.v1 per photo (re-renders reuse it). Daily cost cap per user (agent-audit rule 4): [5] renders/day free tier.

## Legal/brand dependencies (blockers to launch, not to prototype)
- Rendering-rights clause signed with each catalog partner (affiliate template §6.11) — prototype uses feed data internally only
- "AI visualization" disclosure language in ToS (legal stack)

## Acceptance tests
1. Photo with person as subject → declined with friendly copy
2. Restyle render → windows/layout unchanged (SSIM on non-zone regions above threshold)
3. Rendered SKU fails likeness → tap-target dropped, render still shown
4. Render never appears in approval/dispute/move-out evidence surfaces (`kind:'render'` filter test)
5. Price shown at tap-time differs from render-time → tap-time price wins, no stale price displayed
