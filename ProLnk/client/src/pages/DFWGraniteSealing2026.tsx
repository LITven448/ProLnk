import { useState } from 'react';

const stones = [
  { id: 'granite', label: '🪨 Granite', sealerType: 'Penetrating / Impregnating', frequency: 'Every 1–2 years (DFW hard water)', brands: 'Tenax Hydrex, StoneTech BulletProof, DuPont StoneTech', steps: ['Clean surface with pH-neutral stone cleaner', 'Dry completely (24 hours)', 'Apply sealer evenly with clean cloth', 'Let penetrate 3–5 minutes — do not let dry on surface', 'Buff off excess with dry cloth', 'Apply second coat for extra protection', 'Do not use surface for 24 hours'], test: 'Water droplets bead on surface = sealed. Droplets absorb/darken stone = needs sealing.' },
  { id: 'marble', label: '🏛️ Marble', sealerType: 'Penetrating (gentle formula)', frequency: 'Every 6–12 months — marble is very porous', brands: 'Miracle 511 Porous Plus, StoneTech Marble Sealer', steps: ['Use marble-specific cleaner only — no acids', 'Avoid vinegar, citrus, or any acidic product', 'Apply penetrating sealer (not topical)', 'Work in small sections — marble absorbs fast', 'Buff immediately — marble shows streaks easily', 'Apply 2–3 coats for bathrooms', 'Test annually with water drop test'], test: 'Marble is very porous — test monthly. Absorption in under 3 minutes = reseal now.' },
  { id: 'travertine', label: '🌅 Travertine', sealerType: 'Penetrating + fill voids first', frequency: 'Every 1–2 years', brands: 'Aqua Mix Sealer\’s Choice Gold, Tenax Porous Plus', steps: ['Fill any voids or pitting with color-matched filler', 'Let filler cure 24 hours', 'Clean with pH-neutral cleaner', 'Apply penetrating sealer', 'Let sit 5–10 minutes', 'Buff dry — travertine absorbs unevenly', 'Two coats recommended for DFW kitchens'], test: 'Travertine has natural voids — water will absorb at open holes regardless of sealing. Focus on flat areas.' },
  { id: 'slate', label: '🖤 Slate', sealerType: 'Color-enhancing penetrating', frequency: 'Every 3–5 years — naturally dense', brands: 'StoneTech Enhancer Pro, Miracle Impregnator', steps: ['Sweep and mop with clean water', 'Allow to fully dry (48 hours for first seal)', 'Apply color-enhancing impregnator if desired', 'Work into surface with brush or roller', 'Wipe off excess after 10–15 minutes', 'Buff surface dry', 'Slate may need 2 coats on first application'], test: 'Slate is naturally dense — it may never fully absorb water. A slight sheen when wet is normal and means good protection.' },
];

export default function DFWGraniteSealing2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const stone = stones.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🪨</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Granite & Natural Stone Sealing Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW hard water and heat make stone sealing critical — learn what your stone needs.</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 18, marginBottom: 24, border: '1px solid #334155' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 15 }}>💧 The Water Drop Test</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 8px', fontSize: 14 }}>Place a few drops of water on your stone and wait 3–5 minutes:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ background: '#1a3a1a', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>✅ Water Beads = Sealed</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Your sealer is holding. Retest in 6 months.</div>
            </div>
            <div style={{ background: '#450a0a', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>⚠️ Water Absorbs = Reseal Now</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Stone is unprotected. Seal within the week.</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {stones.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#1e293b', color: selected === s.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === s.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {s.label}
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 4, color: selected === s.id ? '#0A1628' : '#94a3b8' }}>Seal: {s.frequency}</div>
            </button>
          ))}
        </div>

        {stone && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, border: '1px solid #334155' }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 6px' }}>{stone.label}</h2>
            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 3 }}>🧴 Sealer Type</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{stone.sealerType}</div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 3 }}>🛍️ Recommended Brands</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{stone.brands}</div>
              </div>
              <div style={{ background: '#1a1a2e', borderRadius: 8, padding: 12, border: '1px solid #3b82f6' }}>
                <div style={{ color: '#93c5fd', fontSize: 13, fontWeight: 700, marginBottom: 3 }}>🔬 DFW Test Tip</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{stone.test}</div>
              </div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 10px' }}>Step-by-Step Sealing</h3>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {stone.steps.map((s, i) => (
                <li key={i} style={{ marginBottom: 10, color: '#e2e8f0', lineHeight: 1.5 }}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {!stone && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
            <p>Select your stone type above to get the sealing guide and product recommendations.</p>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>© 2026 ProLnk — DFW Home Services</p>
      </div>
    </div>
  );
}