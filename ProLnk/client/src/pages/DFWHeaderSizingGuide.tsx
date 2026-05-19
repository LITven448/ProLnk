import { useState } from 'react';

const openingWidths = [
  { label: 'Up to 3 ft (Standard Door)', value: 'w3′ },
  { label: '3–5 ft (Wide Door / Small Passage)', value: 'w5′ },
  { label: '5–8 ft (Double Door / Archway)', value: 'w8′ },
  { label: '8–12 ft (Wide Opening / Room Merge)', value: 'w12′ },
  { label: '12–16 ft (Large Opening / Kitchen)', value: 'w16′ },
];
const wallTypes = [
  { label: 'Exterior Load-Bearing Wall', value: 'exterior' },
  { label: 'Interior Load-Bearing Wall', value: 'intbearing' },
  { label: 'Interior Non-Load-Bearing Wall', value: 'partition' },
];

const specs: Record<string, Record<string, { header: string; lumber: string; engineered: string; cost: string; permit: string }>> = {
  w3: {
    exterior: { header: '(2) 2×6 or (2) 2×8 with 1/2″ plywood spacer (3.5″ total)', lumber: 'Standard dimensional lumber acceptable for 3ft span in DFW', engineered: 'LVL not required but allowed; use (1) 3.5″×5.25″ LVL if engineered preferred', cost: '$150–$400 material + $800–$2,000 labor in DFW', permit: 'Yes — DFW cities require permit for exterior wall modifications' },
    intbearing: { header: '(2) 2×6 with 1/2″ plywood spacer standard for 3ft interior bearing span', lumber: 'Dimensional lumber acceptable; crown-select grade for DFW humidity resistance', engineered: 'LVL preferred for long-term performance in DFW moisture conditions', cost: '$100–$300 material + $600–$1,500 labor', permit: 'Yes — interior load-bearing wall permit required in all DFW cities' },
    partition: { header: '(2) 2×4 flatwise or single 2×6 for non-structural 3ft opening', lumber: 'Any grade dimensional lumber acceptable — no load to transfer', engineered: 'Not required or necessary for partition walls', cost: '$50–$150 material + $400–$900 labor', permit: 'Usually not required for non-bearing partitions in DFW — verify with city' },
  },
  w5: {
    exterior: { header: '(2) 2×10 or (2) 2×12 with 1/2″ plywood spacer for 5ft exterior span', lumber: 'Dimensional lumber borderline for 5ft exterior — engineered preferred in DFW', engineered: '(1) 3.5″×9.25″ LVL recommended for DFW exterior 5ft opening; more stable in humidity', cost: '$300–$700 material + $1,200–$3,000 labor', permit: 'Yes — mandatory. Structural drawings may be required.' },
    intbearing: { header: '(2) 2×10 with 1/2″ spacer minimum for 5ft interior bearing', lumber: 'Acceptable but engineer may specify LVL for DFW soil-movement conditions', engineered: '(1) 3.5″×7.25″ LVL standard recommendation for 5ft interior bearing in DFW', cost: '$250–$600 material + $1,000–$2,500 labor', permit: 'Yes — required in DFW for interior bearing modifications' },
    partition: { header: '(2) 2×4 or (2) 2×6 flatwise for 5ft non-bearing', lumber: 'Standard lumber; no special grade required', engineered: 'Not applicable', cost: '$100–$250 material + $500–$1,200 labor', permit: 'Typically not required; confirm with your DFW city' },
  },
  w8: {
    exterior: { header: '(1) 3.5″×11.25″ LVL or (2) 1.75″×11.25″ LVL for 8ft exterior span — dimensional lumber insufficient', lumber: 'Dimensional lumber NOT recommended for 8ft exterior span in DFW', engineered: 'LVL mandatory — (1) 3.5″×11.25″ LVL minimum; engineer may specify deeper section', cost: '$600–$1,400 material + $2,500–$5,000 labor in DFW', permit: 'Yes — engineer-stamped drawings typically required at this span in DFW' },
    intbearing: { header: '(1) 3.5″×9.25″ LVL minimum for 8ft interior bearing; engineer to confirm load', lumber: 'Dimensional lumber not appropriate for 8ft bearing span', engineered: '(1) 3.5″×9.25″ or (1) 3.5″×11.25″ LVL depending on tributary load above', cost: '$500–$1,200 material + $2,000–$4,500 labor', permit: 'Yes — engineer required for 8ft+ interior bearing opening in DFW' },
    partition: { header: '(2) 2×6 or (1) 2×8 flatwise for 8ft non-bearing; large opening needs king/jack stud support', lumber: 'Standard lumber; double jack studs on each side at this width', engineered: 'Not required', cost: '$150–$400 material + $700–$1,800 labor', permit: 'Likely not required; check with DFW city for openings this wide' },
  },
  w12: {
    exterior: { header: '(2) 1.75″×14″ LVL or PSL beam engineered for 12ft exterior span — engineer must specify', lumber: 'Dimensional lumber completely inadequate for 12ft exterior bearing span', engineered: 'Engineer-specified LVL/PSL mandatory. Temporary shoring wall required during installation.', cost: '$1,200–$3,000 material + $4,000–$9,000 labor in DFW (includes temporary shoring)', permit: 'Yes — engineer-stamped drawings required. Inspections at each phase.' },
    intbearing: { header: 'Engineer-specified beam (LVL, PSL, or steel) for 12ft interior bearing — no standard rule applies', lumber: 'No dimensional lumber solution for 12ft bearing span', engineered: 'Structural engineer must calculate based on actual DFW home load conditions', cost: '$1,000–$2,500 material + $3,500–$8,000 labor', permit: 'Yes — mandatory. Multiple inspections. May require post-installation survey.' },
    partition: { header: '(2) 2×8 flatwise with adequate king/jack stud support for 12ft non-bearing', lumber: 'Large enough that stud substitution strategy may be needed', engineered: 'Not required structurally but can simplify rough opening', cost: '$250–$600 material + $1,000–$2,500 labor', permit: 'Check with DFW city — openings this wide sometimes require permit regardless of bearing status' },
  },
  w16: {
    exterior: { header: 'Steel W-beam or engineered timber (Parallam PSL) — engineer must design for DFW site conditions', lumber: 'Not applicable — dimensional lumber cannot span 16ft under any load conditions', engineered: 'Steel W-beam most common solution in DFW for 16ft+ exterior openings. Requires beam pockets in foundation.', cost: '$3,000–$8,000 material (steel) + $7,000–$18,000 labor including shoring and foundation work', permit: 'Yes — structural engineer drawings + city plan review required. Long lead time in DFW.' },
    intbearing: { header: 'Steel W-beam or Parallam PSL engineered by structural engineer — DFW-specific load calculation required', lumber: 'Not applicable', engineered: 'Steel or large PSL. Point loads at beam ends must be transferred to foundation — post and footing design needed.', cost: '$2,500–$7,000 material + $6,000–$15,000 labor', permit: 'Yes — full structural permit. DFW cities typically require 3–6 week review at this scope.' },
    partition: { header: '(2) 2×10 with doubled king/jack studs for 16ft non-bearing — header carries only ceiling drywall weight', lumber: 'Acceptable; use LVL for less deflection on ceiling plane', engineered: 'LVL preferred at this span even for partition; limits long-term ceiling sag in DFW humidity', cost: '$400–$900 material + $1,500–$3,500 labor', permit: 'Usually not required for non-bearing; confirm with your DFW city' },
  },
};

export default function DFWHeaderSizingGuide() {
  const [width, setWidth] = useState('');
  const [wallType, setWallType] = useState('');
  const result = width && wallType ? specs[width]?.[wallType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Header Sizing Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: 32, lineHeight: 1.6 }}>Every wall opening in a DFW home needs a header — a structural beam above the opening that carries the load the removed studs would have handled. Undersized headers fail silently for years, then all at once. DFW building code specifies minimums; engineers often require more.</p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🔩 Why Header Size Matters in DFW</h2>
          <ul style={{ color: '#C5CAD8', lineHeight: 2, paddingLeft: 20 }}>
            <li>DFW homes experience more thermal cycling than most U.S. climates — headers must resist long-term creep</li>
            <li>Engineered lumber (LVL) is dimensionally stable in DFW humidity; dimensional lumber can bow and sag over time</li>
            <li>Clay soil foundation movement puts additional racking loads on wall framing — headers absorb some of this</li>
            <li>DFW inspectors frequently cite undersized headers on unpermitted work discovered at resale</li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>📐 Dimensional Lumber vs LVL</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Dimensional Lumber</div>
              <ul style={{ color: '#C5CAD8', fontSize: 13, lineHeight: 1.8, paddingLeft: 14, margin: 0 }}>
                <li>Lower cost upfront</li>
                <li>Susceptible to crown, bow in DFW humidity</li>
                <li>Appropriate for short spans (&lt;5 ft)</li>
                <li>Widely available at DFW lumber yards</li>
              </ul>
            </div>
            <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>LVL (Laminated Veneer Lumber)</div>
              <ul style={{ color: '#C5CAD8', fontSize: 13, lineHeight: 1.8, paddingLeft: 14, margin: 0 }}>
                <li>Engineered for dimensional stability</li>
                <li>Preferred for 5 ft+ spans in DFW</li>
                <li>Mandatory for most exterior openings</li>
                <li>Available at DFW building supply houses</li>
              </ul>
            </div>
          </div>
        </section>

        <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Header Size Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>Opening width</label>
            <select value={width} onChange={e => setWidth(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select width…</option>
              {openingWidths.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>DFW wall type</label>
            <select value={wallType} onChange={e => setWallType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select wall type…</option>
              {wallTypes.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Header Specification: </span><span style={{ color: '#C5CAD8′ }}>{result.header}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Dimensional Lumber: </span><span style={{ color: '#C5CAD8′ }}>{result.lumber}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Engineered Option: </span><span style={{ color: '#4ADE80′ }}>{result.engineered}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Cost Estimate: </span><span style={{ color: '#4ADE80′ }}>{result.cost}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Permit Required: </span><span style={{ color: '#FACC15′ }}>{result.permit}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 8, padding: 20, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#9BA3B5', fontSize: 13, margin: 0 }}>⚠️ Header sizing depends on actual loads specific to your DFW home — number of stories above, roof type, and foundation conditions. These are general guidelines. For openings over 5 ft in load-bearing walls, always get structural engineer review and pull your city permit before work begins.</p>
        </div>
      </div>
    </div>
  );
}
