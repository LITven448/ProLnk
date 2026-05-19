import { useState } from 'react';

export default function DFWFoundationSlabMoisture2026() {
  const [concern, setConcern] = useState("");

  const concerns = [
    { id: "flooring", label: "Wood floor gaps or cupping", guide: "DFW humidity drives water vapor upward through concrete. Wood absorbs moisture, expands across grain, and cups. Without vapor retarder under slab, this recurs seasonally. Test: tape 2-foot plastic square to slab for 24 hours — condensation confirms vapor drive." },
    { id: "adhesive", label: "Floor tile adhesive failing", guide: "Vinyl and ceramic tile adhesives emulsify when vapor transmission exceeds 3 lbs per 1000 sq ft per 24hr (ASTM F1869). DFW slabs without vapor retarder commonly test 8-15 lbs. Mitigation: epoxy vapor barrier coating before reinstallation." },
    { id: "musty", label: "Musty smell in lower level", guide: "Vapor transmission through DFW slab creates humidity below vapor barrier (flooring). Mold grows at sustained 70 percent plus RH. Test slab moisture with calcium chloride or relative humidity probe. Solution: dehumidification plus vapor retarder under new flooring." },
    { id: "newbuild", label: "Purchasing or building new", guide: "Texas building code requires 6-mil polyethylene vapor retarder under all slabs on grade. Confirm placement is under slab, not over (common error). Overlap seams 12 inches minimum and tape. Termite baiting systems can compromise retarder — verify penetrations are sealed." },
  ];

  const facts = [
    { icon: "💧", title: "Concrete is Permeable", body: "Concrete transmits water vapor — it is not a vapor barrier. A typical 4-inch slab on DFW clay can transmit 5-20 lbs of water vapor per 1,000 sq ft per 24 hours." },
    { icon: "☀️", title: "DFW Drives Vapor Upward", body: "High outdoor humidity plus interior air conditioning creates a vapor pressure gradient pushing moisture through the slab year-round, especially in summer." },
    { icon: "🛡️", title: "6-Mil Poly Standard", body: "IRC and Texas code specify 6-mil polyethylene minimum. Some engineers specify 10-mil or reinforced for DFW expansive soils where settling can puncture film." },
    { icon: "📏", title: "Testing Methods", body: "Calcium chloride test (ASTM F1869) or in-situ RH probe (ASTM F2170). RH probe is more accurate for DFW conditions. Thresholds: adhesive below 75 percent RH, hardwood below 65 percent RH." },
  ];

  const sel = concerns.find(c => c.id === concern);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧱</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Slab Moisture Transmission Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>
            Water vapor through Dallas-Fort Worth slabs — causes, testing, and solutions
          </p>
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #F5E642″ }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>Slab Moisture Concern - Assessment Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c.id === concern ? "" : c.id)}
                style={{ background: concern === c.id ? "#F5E642″ : "#0A1628", color: concern === c.id ? "#0A1628" : "#fff",
                  border: "1px solid #F5E642″, borderRadius: 8, padding: "10px 12px", cursor: "pointer", fontSize: 13, textAlign: "left" }}>
                {c.label}
              </button>
            ))}
          </div>
          {sel ? (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 16, border: "1px solid #4ADE80" }}>
              <div style={{ color: "#4ADE80″, fontWeight: 700, marginBottom: 8 }}>Assessment and Action:</div>
              <div style={{ color: "#CBD5E1″, fontSize: 14, lineHeight: 1.6 }}>{sel.guide}</div>
            </div>
          ) : (
            <div style={{ color: "#475569″, fontSize: 13, textAlign: "center" }}>Select a concern above to see the assessment guide</div>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>DFW Slab Vapor Facts</h2>
          {facts.map((f, i) => (
            <div key={i} style={{ background: "#1E293B", borderRadius: 8, padding: 16, marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24 }}>{f.icon}</span>
                <div>
                  <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                  <div style={{ color: "#CBD5E1″, fontSize: 13, lineHeight: 1.5 }}>{f.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 12 }}>DFW Flooring Vapor Thresholds</h2>
          {[
            { floor: "Hardwood or Engineered Wood", limit: "Below 65% RH / 3 lbs", action: "Epoxy coating or wait for slab to cure" },
            { floor: "Vinyl or LVP", limit: "Below 75% RH / 5 lbs", action: "Most tolerant, but adhesive variants differ" },
            { floor: "Ceramic Tile (thinset)", limit: "Below 85% RH / 8 lbs", action: "Latex-modified thinset improves tolerance" },
            { floor: "Carpet (glue-down)", limit: "Below 65% RH / 3 lbs", action: "Vapor transmission causes mold under pad" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0″, borderBottom: i < 3 ? "1px solid #334155" : "none" }}>
              <span style={{ color: "#fff", fontSize: 13 }}>{r.floor}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#F5E642″, fontSize: 12, fontWeight: 700 }}>{r.limit}</div>
                <div style={{ color: "#94A3B8″, fontSize: 11 }}>{r.action}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, color: "#475569″, fontSize: 12 }}>
          ProLnk Slab Moisture Guide 2026 | ASTM F1869 and F2170 testing standards
        </div>
      </div>
    </div>
  );
}
