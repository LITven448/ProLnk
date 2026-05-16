import { useState } from 'react';

export default function DFWFlashingGuide2026() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');

  const flashingTypes = [
    { label: 'Pipe boot flashing — cracked or split', guide: 'Most common DFW flashing failure. Rubber collar around plumbing vent pipes degrades in DFW heat — UV exposure hardens rubber in 7–15 years. Signs: rubber collar cracked, split, or pulling away from pipe. Fix: replace with new rubber boot ($15–$25 material) or install aluminum boot with rubber seal. DIY feasible. Pro cost: $150–$300 per boot. Inspect all pipe boots after DFW hailstorms — hail damages rubber.' },
    { label: 'Step flashing at wall-to-roof junction', guide: 'Step flashing is L-shaped metal woven between shingle courses where roof meets vertical wall (dormers, additions, chimneys). DFW failure mode: improper installation without weaving, or caulk used instead of overlapping metal. Signs: water stain inside wall below junction. Fix: remove siding or counter flashing to inspect, replace damaged step flashing pieces, never rely on caulk alone. Pro repair: $400–$1,200 depending on linear feet.' },
    { label: 'Valley flashing — open or closed valley leaking', guide: 'Valley flashing protects where two roof planes meet. DFW issue: high volume storms overwhelm improperly installed valleys. Open metal valley (exposed metal strip): inspect for corrosion, gaps at edges, or debris dams. Closed cut or woven valley: check shingle edges for lifting. DFW hail damage common at valley — check after every storm. Valley repair: $300–$800 depending on length and access.' },
    { label: 'Chimney flashing — multiple layers', guide: 'Chimney requires step flashing + counter flashing + saddle/cricket (for chimneys wider than 30"). DFW failure: single-layer caulk-only installs fail within 5 years in DFW heat cycles. Signs: water stain at ceiling near chimney, efflorescence on chimney interior. Fix: full reflash with step + counter flashing system $800–$2,500 depending on chimney size. Counter flashing embedded in mortar joint is most durable.' },
    { label: 'Drip edge — missing or damaged', guide: 'Drip edge is metal strip at eave and rake edges that directs water into gutter and off fascia. DFW code requires drip edge on all new roofs (post-2012). Older DFW homes often missing drip edge — water wicks under shingles and rots fascia. Signs: rotted or stained fascia board. Fix: install drip edge at eave (under underlayment) and rake (over underlayment). Material: $0.50/LF. Labor at re-roof: included. After-install: $150–$300.' },
    { label: 'Skylight flashing — curb or self-flashing', guide: 'Skylight flashing in DFW fails from thermal expansion — metal expands and contracts with DFW temperature swings (20°F to 105°F). Curb-mounted skylights: inspect the step + counter flashing system around wood curb. Self-flashing skylights: seal between flange and roofing often fails. Signs: water stain around skylight frame interior. Fix: reseal flange with compatible roofing sealant, or reflash curb. Replacement flashing kit: $100–$300. Pro install: $300–$700.' },
  ];

  const handle = () => {
    const match = flashingTypes.find(f => f.label === location);
    setResult(match ? match.guide : 'Select a flashing location and condition to get your DFW repair guide.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Roof Flashing Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Flashing failures cause 90% of roof leaks. DFW heat, UV, and hailstorms attack every flashing type differently — know which ones to prioritize.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔩', label: 'Pipe Boots', note: '#1 DFW failure' },
            { icon: '📐', label: 'Step Flashing', note: 'Wall junctions' },
            { icon: '⛰️', label: 'Valley Flashing', note: 'Plane intersections' },
            { icon: '🏔️', label: 'Chimney Flashing', note: 'Multi-layer system' },
            { icon: '🪣', label: 'Drip Edge', note: 'Eave and rake' },
            { icon: '💡', label: 'Skylight Flashing', note: 'DFW heat expands' },
          ].map(item => (
            <div key={item.label} style={{ background: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', fontSize: 14 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Flashing Repair Guide</h2>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #2d4a7a', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select flashing type and condition...</option>
            {flashingTypes.map(f => <option key={f.label} value={f.label}>{f.label}</option>)}
          </select>
          <button onClick={handle} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Repair Guide →</button>
          {result && <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚡ After DFW Hailstorm — Flashing Checklist</div>
          <ul style={{ color: '#94a3b8', fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 20 }}>
            <li>Inspect all pipe boot flashings — hail dents and cracks rubber collars</li>
            <li>Check valley flashing for denting that creates debris dams</li>
            <li>Inspect drip edge for denting that prevents water runoff</li>
            <li>Skylight frame + flashing seal — hail impact loosens sealant</li>
            <li>Document all damage with photos before any cleanup for insurance claim</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
