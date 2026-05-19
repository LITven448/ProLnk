import { useState } from 'react';

const flashings = [
  { id: 'pipe', label: '🔧 Pipe Boot Flashing', desc: 'Most common DFW failure point', issues: ['Neoprene boots crack in DFW UV heat (5–10 year lifespan)', 'Rubber degrades, opens gap around pipe', 'Water runs down pipe into attic'], fix: 'Replace boot flashing — do not caulk over cracked rubber. New all-lead or high-temp silicone boots last longer in DFW heat.', cost: '$50–$150/boot' },
  { id: 'step', label: '🏠 Step Flashing', desc: 'Wall-to-roof junction', issues: ['Each step piece must overlap the one below', 'DFW hail can dislodge improperly secured steps', 'Improper installation leaves gaps between step pieces'], fix: 'Step flashing must be woven into shingles, one L-bracket per shingle course. Sealant alone is a temporary fix.', cost: '$200–$600 per wall section' },
  { id: 'counter', label: '🏗️ Counter Flashing', desc: 'Cap over step flashing', issues: ['Must be embedded into mortar joints on masonry walls', 'DFW thermal cycling causes caulked counter flashing to fail', 'Separated counter flashing allows water behind step flashing'], fix: 'Repoint mortar joints and re-embed counter flashing. Reglet counter flashing is most durable for DFW chimneys.', cost: '$300–$800′ },
  { id: 'valley', label: '⛰️ Valley Flashing', desc: 'Where two roof planes meet', issues: ['Open valleys in DFW concentrate high water flow in storms', 'Woven shingle valleys can fail in DFW hail events', 'Metal valley flashing preferred for DFW storm resilience'], fix: 'W-metal valley flashing with 4″ minimum exposure on each side. Avoid woven cut valleys on low-slope DFW roofs.', cost: '$400–$1,200 per valley' },
  { id: 'drip', label: '💧 Drip Edge Flashing', desc: 'Eave and rake edge protection', issues: ['Missing drip edge allows water to wick under shingles', 'DFW code requires drip edge on all edges since 2012 IRC adoption', 'Improper overlap sequence causes back-flow'], fix: 'Eave drip edge goes under felt/synthetic. Rake drip edge goes over felt/synthetic. Critical install sequence.', cost: '$1–$2 per linear foot' },
  { id: 'chimney', label: '🏚️ Chimney Flashing', desc: 'Full chimney flash system', issues: ['DFW clay movement causes chimney to shift, breaking sealants', 'Must have base, step, counter, and saddle (cricket) for wide chimneys', 'Cricket required if chimney is wider than 30″ on DFW roofs'], fix: 'Replace full system with soldered copper or quality galvanized. DFW chimney movement demands flexible, embedded counter flashing.', cost: '$800–$2,500′ },
];

export default function DFWRoofingFlashingTypes2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const fl = flashings.find(f => f.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌧️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0′ }}>DFW Roofing Flashing Types Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Every DFW roof has 5–8 types of flashing — each one a potential leak point</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {flashings.map(f => (
            <button key={f.id} onClick={() => setSelected(f.id === selected ? null : f.id)}
              style={{ background: selected === f.id ? '#1e3a5f' : '#0f2233', border: `2px solid ${selected === f.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '0.8rem', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{f.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8′ }}>{f.desc}</div>
            </button>
          ))}
        </div>

        {fl && (
          <div style={{ background: '#0f2233', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{fl.label}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem' }}>{fl.desc}</p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ DFW Failure Points</div>
              {fl.issues.map((issue, i) => <div key={i} style={{ color: '#94a3b8', padding: '0.3rem 0', fontSize: '0.9rem', borderBottom: '1px solid #1e3a5f' }}>• {issue}</div>)}
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '0.8rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>✅ Proper Fix</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{fl.fix}</div>
            </div>
            <div style={{ color: '#F5E642', fontSize: '0.9rem', fontWeight: 700 }}>💰 {fl.cost}</div>
          </div>
        )}
      </div>
    </div>
  );
}
