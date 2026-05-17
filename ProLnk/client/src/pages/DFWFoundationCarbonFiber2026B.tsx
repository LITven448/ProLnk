import { useState } from 'react';

const concerns = [
  { id: 'bowing', label: 'Foundation wall bowing inward', applicable: true, guide: 'Carbon fiber straps are highly effective for bowing walls — they bond to concrete with structural epoxy, providing tensile strength that stops inward movement. Unlike steel I-beams, carbon fiber requires no excavation. DFW note: most DFW homes have slab foundations without basement walls, so this applies primarily to DFW homes with partial basements or retaining walls.' },
  { id: 'slab-movement', label: 'Slab moving up or down (heaving/settling)', applicable: false, guide: 'Carbon fiber is not applicable here. Slab heave and settlement in DFW are soil moisture problems — carbon fiber cannot address soil volume change. The correct solution is pier underpinning (push piers or helical piers) to reach stable bearing strata below the expansive clay.' },
  { id: 'crack-stabilize', label: 'Crack in foundation wall needing stabilization', applicable: true, guide: 'Carbon fiber fabric applied over cracks provides excellent crack stabilization — prevents crack propagation under load. Installation: crack is cleaned, epoxy primer applied, carbon fiber mat bonded over crack, top coat sealed. Works on concrete block and poured walls. Not a gap filler — concrete must be structurally sound on both sides.' },
  { id: 'pier-supplement', label: 'Already have piers, walls still moving', applicable: true, guide: 'Carbon fiber straps used alongside existing piers is a best-practice approach — piers address vertical movement, carbon fiber addresses lateral wall pressure. Common in DFW hillside lots with retaining structures. Consult a structural engineer for combined system design.' },
];

export default function DFWFoundationCarbonFiber2026B() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = concerns.find(c => c.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🧵</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', marginBottom: '0.5rem' }}>DFW Carbon Fiber Foundation Repair 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Advanced carbon fiber applications — when it works and when it does not in DFW construction</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💪', label: 'Tensile strength: 10x steel', note: 'By weight' },
            { icon: '🔩', label: 'Epoxy bonded — no excavation', note: 'Minimal disruption' },
            { icon: '✅', label: 'Best for bowing walls', note: 'Lateral pressure resistance' },
            { icon: '❌', label: 'Not for DFW slab heave', note: 'Wrong tool for soil movement' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 Describe Your Foundation Concern</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {concerns.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                style={{
                  backgroundColor: selected === c.id ? '#F5E642' : '#0A1628',
                  color: selected === c.id ? '#0A1628' : '#fff',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >{c.label}</button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: '1.2rem' }}>
              <div style={{ display: 'inline-block', backgroundColor: match.applicable ? '#15803d' : '#dc2626', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                Carbon Fiber: {match.applicable ? 'Applicable' : 'Not Recommended'}
              </div>
              <div style={{ backgroundColor: '#0f172a', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642' }}>
                <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>{match.guide}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          <p>ProLnk DFW Foundation Resource · Free homeowner guidance · 2026</p>
        </div>
      </div>
    </div>
  );
}