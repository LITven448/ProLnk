import { useState } from 'react';

const plans = [
  { size: 'Under 1,500 sqft', bedrooms: 1, detectors: 4, placement: 'Each bedroom, hallway outside bedrooms, main living area', interconnected: 'Recommended — 3-wire or wireless', cost: '$80–$160′ },
  { size: '1,500–2,500 sqft', bedrooms: 2, detectors: 6, placement: 'Each bedroom, hallway, living area, basement or bonus room', interconnected: 'Strongly recommended', cost: '$140–$280′ },
  { size: '2,500–4,000 sqft', bedrooms: 3, detectors: 9, placement: 'Each bedroom, each hallway, 2-story landings, garage entry', interconnected: 'Essential — alarm must reach all areas', cost: '$220–$440′ },
  { size: '4,000+ sqft', bedrooms: 4, detectors: 12, placement: 'Each bedroom, all hallways, multiple floors, media room, guest suite', interconnected: 'Required — wireless mesh system', cost: '$300–$600′ },
];

export default function DFWSmokeDetectorPlacementDFW() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = plans.find(p => p.size === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            DFW Smoke Detector Placement Guide
          </h1>
          <p style={{ color: '#94a3b8′ }}>
            Texas law requires smoke detectors in every sleeping area and outside each bedroom. DFW large homes need interconnected systems.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>Select Your Home Size</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {plans.map(p => (
              <button
                key={p.size}
                onClick={() => setSelected(p.size === selected ? null : p.size)}
                style={{
                  background: selected === p.size ? '#F5E642′ : '#1e3a5f',
                  color: selected === p.size ? '#0A1628′ : '#fff',
                  border: 'none', borderRadius: 8, padding: '0.75rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s'
                }}
              >
                {p.size}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Placement Plan — {match.size}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Detectors Needed', value: `${match.detectors} units` },
                { label: 'Placement Locations', value: match.placement },
                { label: 'Interconnected', value: match.interconnected },
                { label: 'Estimated Cost', value: match.cost },
              ].map(item => (
                <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{item.label}</div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Texas Requirements and DFW Tips</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { icon: '⚖️', text: 'Texas law: required in every sleeping area and outside each bedroom on every floor' },
              { icon: '🔗', text: 'Interconnected units alert the whole home — critical in DFW homes over 2,500 sqft' },
              { icon: '🧪', text: 'Test monthly by pressing the test button for 5 seconds until alarm sounds' },
              { icon: '📅', text: 'Replace entire unit every 10 years — check manufacture date on back of detector' },
              { icon: '🏗️', text: 'New DFW construction requires hardwired interconnected detectors with battery backup' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
