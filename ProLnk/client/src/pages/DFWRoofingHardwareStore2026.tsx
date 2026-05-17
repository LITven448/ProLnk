import { useState } from 'react';

const repairTypes = [
  { label: 'Replace 1–3 damaged shingles after hail', verdict: '✅ DIY-Friendly', guide: 'Homeowner can replace individual shingles without a permit in most DFW cities. Pry up the row above, remove damaged shingle, nail new one, reseal. Matching color is the challenge — bring an old shingle to the lumber yard.' },
  { label: 'Reseal flashing around chimney or skylight', verdict: '✅ DIY-Friendly', guide: 'Roofing caulk (Geocel or Henry brand) and a caulk gun. Clean old sealant, apply new bead. DFW heat degrades sealant every 3–5 years. This is a legitimate homeowner repair. Costs under $20 in materials.' },
  { label: 'Replace pipe boot / vent flashing', verdict: '✅ DIY-Friendly (with care)', guide: 'Flexible pipe boot replacement is a common homeowner repair. Remove surrounding shingles, slide new boot under upper shingles, nail flange, reseal. Watch videos first. The most common DFW leak source.' },
  { label: 'Full tear-off and replacement (whole roof)', verdict: '🚫 Requires Licensed Contractor', guide: 'All major DFW cities (Dallas, Fort Worth, Plano, Frisco, etc.) require a permit + final inspection for full roof replacement. Unlicensed work voids manufacturer warranty. Fine range: $500–5,000 + forced removal.' },
  { label: 'Temporary patch for active leak (storm damage)', verdict: '✅ DIY Temporary Only', guide: 'Blue tarp + sandbags is legal everywhere as temporary weather protection. Henry 208R wet patch in a can works for small holes while waiting for a contractor. Do not walk on wet roof — DFW summer roofs exceed 160°F surface temp.' },
  { label: 'Add a ridge vent or attic ventilation', verdict: '🚫 Requires Licensed Contractor', guide: 'Cutting into the ridge or adding penetrations requires a permit in DFW. Improper ventilation is a top cause of DFW shingle failure (heat bake from below). Get three bids — pricing varies wildly in DFW market.' },
];

export default function DFWRoofingHardwareStore2026() {
  const [selected, setSelected] = useState<number | null>(null);

  const diyCount = repairTypes.filter(r => r.verdict.startsWith('✅')).length;
  const proCount = repairTypes.filter(r => r.verdict.startsWith('🚫')).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME SERVICES · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>🔨 DFW Roofing from the Hardware Store Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.7 }}>
          DFW homeowners can legally do <strong style={{ color: '#F5E642' }}>small repairs themselves</strong> — but full tear-offs and
          replacement require a licensed contractor and city permit. Know the line before you start.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '✅', label: 'DIY-Legal Repairs', value: `${diyCount} of ${repairTypes.length} shown` },
            { icon: '🚫', label: 'Permit Required', value: `${proCount} of ${repairTypes.length} shown` },
            { icon: '🌡️', label: 'DFW Roof Surface Temp', value: 'Up to 160°F in summer' },
            { icon: '📋', label: 'DFW Permit (full roof)', value: '$150–400 typical fee' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🏪 DFW Hardware Store Roofing Essentials</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
            <div>🧴 <strong style={{ color: '#fff' }}>Henry 208R or 209:</strong> wet-patch in a can, $15–25</div>
            <div>🔩 <strong style={{ color: '#fff' }}>Roofing nails (1-3/4 in.):</strong> $8/lb, galvanized only</div>
            <div>🧱 <strong style={{ color: '#fff' }}>Geocel caulk:</strong> best DFW flashing sealant, $10–15/tube</div>
            <div>🛡️ <strong style={{ color: '#fff' }}>Pipe boot (universal fit):</strong> $20–40, fits most DFW pipes</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔍 Your Repair Type → DIY or Licensed Guide</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {repairTypes.map((r, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#112240', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: r.verdict.startsWith('✅') ? '#4ade80' : '#f87171', whiteSpace: 'nowrap', marginLeft: 8 }}>{r.verdict}</div>
              </div>
              {selected === i && (
                <div style={{ marginTop: 10, color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>💡 {r.guide}</div>
              )}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Roofing Hardware Store Guide 2026 · Data: City of Dallas, Fort Worth, Plano permit codes
        </div>
      </div>
    </div>
  );
}