import { useState } from 'react';

const behaviors = [
  { id: 'edges-up', label: 'Slab edges are raised or rocking', result: 'curling', guide: 'Classic curling pattern. Top surface dries faster than bottom, causing upward curl at edges. DFW sun on exposed slab perimeter accelerates this. Monitor quarterly — curling under 3/4" typically needs no repair.' },
  { id: 'center-high', label: 'Center of slab higher than edges', result: 'settlement', guide: 'This is foundation settlement, not curling. Edges dropping indicate soil shrinkage beneath — common in DFW clay soils during drought. Requires pier evaluation, not concrete repair.' },
  { id: 'cracks-edges', label: 'Cracks running along slab edges', result: 'curling', guide: 'Edge cracking accompanies severe curling. DFW thermal cycling widens cracks seasonally. Fill with polyurethane sealant to prevent water infiltration. Structural evaluation warranted if cracks exceed 1/4".' },
  { id: 'door-gaps', label: 'Doors sticking or gaps appearing', result: 'settlement', guide: 'Door and frame issues point to differential settlement, not curling. Curling affects slab surface only, not superstructure. Get a foundation engineer — this is a soil-load problem requiring piers.' },
];

export default function DFWFoundationCurlingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = behaviors.find(b => b.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏗️</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', marginBottom: '0.5rem' }}>DFW Concrete Curling Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Is your slab curling or settling? They look similar but require completely different fixes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⬆️', label: 'Curling: edges rise', note: 'Drying differential — top vs bottom' },
            { icon: '⬇️', label: 'Settlement: edges drop', note: 'Soil shrinkage below slab' },
            { icon: '☀️', label: 'DFW sun accelerates curling', note: 'South/west exposures worst' },
            { icon: '🔍', label: 'Different causes, different fixes', note: 'Diagnosis matters most' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 What Are You Observing?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {behaviors.map(b => (
              <button
                key={b.id}
                onClick={() => setSelected(b.id)}
                style={{
                  backgroundColor: selected === b.id ? '#F5E642' : '#0A1628',
                  color: selected === b.id ? '#0A1628' : '#fff',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >{b.label}</button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: '1.2rem' }}>
              <div style={{ display: 'inline-block', backgroundColor: match.result === 'curling' ? '#1d4ed8' : '#dc2626', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                {match.result === 'curling' ? 'Likely: Concrete Curling' : 'Likely: Foundation Settlement'}
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