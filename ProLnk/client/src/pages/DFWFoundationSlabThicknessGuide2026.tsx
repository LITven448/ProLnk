import { useState } from 'react';

const slabSituations = [
  { id: 'typical', label: 'Standard DFW residential home', guide: 'Typical DFW post-tension slab: 4-inch field thickness, 18–24-inch grade beams at perimeter and interior load lines. Grade beam spacing varies 8–12 feet. If you are hiring a foundation company, they need this info for pier placement and drilling depth.' },
  { id: 'measure', label: 'How to measure slab thickness', guide: 'Options: (1) Drill a 3/4-inch hole through slab in an inconspicuous area and insert a bent wire. (2) Core sample — a foundation company can take a core plug. (3) Check original builder plans if available — thickness is specified on structural sheets.' },
  { id: 'pierDrilling', label: 'Foundation company asked about thickness', guide: 'Pier drilling companies need slab thickness to set depth — going through a 4-inch slab requires different drill setup than 6-inch. Thin slabs (under 3.5 inches) can crack during pier drilling if approach angle is wrong. Confirm with core sample first.' },
  { id: 'thinSpot', label: 'Suspect a thin spot or poor pour', guide: 'Thin spots occur at form edges, around plumbing sleeves, or where the concrete finisher ran low on material. Signs: hollow sound when walked on (rare), crack patterns that radiate from one area. Ground-penetrating radar can map thickness without drilling.' },
];

export default function DFWFoundationSlabThicknessGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = slabSituations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 ProLnk DFW Foundation Series</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>DFW Slab Thickness Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 24 }}>How thick is your DFW slab, how to measure it, and why it matters for pier drilling and foundation repairs.</p>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📐 DFW Slab Thickness Standards</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6, marginBottom: 10 }}>Dallas-Fort Worth residential slabs built since the 1980s follow a standard post-tension design: 4-inch field thickness with deeper grade beams at the perimeter and along interior load-bearing lines. These beams are typically 18 to 24 inches deep and are the structural backbone of the slab system.</p>
          <ul style={{ color: '#cbd5e0', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>📏 Field (mid-slab): 4 inches typical</li>
            <li>🏗️ Perimeter grade beam: 18–24 inches deep</li>
            <li>🔩 Interior beams: 12–18 inches, spaced 8–12 feet</li>
            <li>⚠️ Pre-1975 homes may have conventional (non-post-tension) slabs — thicker but no PT cables</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔬 Why Thickness Matters</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>Foundation pier companies drill through or alongside your slab to reach stable soil at 10–20 feet depth. Knowing your slab thickness lets them calibrate their drill angle and avoid damaging post-tension cables. Cutting a PT cable during pier work can cause immediate slab cracking — a costly mistake to repair.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Interactive: Slab Situation → Thickness Assessment Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {slabSituations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Assessment Guide:</p>
              <p style={{ color: '#cbd5e0', lineHeight: 1.7 }}>{match.guide}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Connect With a DFW Foundation Expert</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>ProLnk matches DFW homeowners with licensed foundation contractors. Get free, no-pressure quotes.</p>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}