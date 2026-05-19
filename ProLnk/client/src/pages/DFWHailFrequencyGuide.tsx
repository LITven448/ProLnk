import { useState } from 'react';

const zones = [
  { name: 'North Dallas / Plano / Allen', annual: 9.2, insurance: '+18%', risk: 'High', mitigation: ['Class 4 impact-resistant shingles', 'Hail-rated skylight glazing', 'Covered parking'], emoji: '🔴' },
  { name: 'Fort Worth / Tarrant County', annual: 8.1, insurance: '+14%', risk: 'High', mitigation: ['Class 3–4 shingles', 'Impact-resistant windows', 'Metal roofing option'], emoji: '🔴' },
  { name: 'Frisco / McKinney / Celina', annual: 10.4, insurance: '+22%', risk: 'Very High', mitigation: ['Class 4 shingles required', 'Steel or stone-coated metal roof', 'Storm shutters', 'Covered carport'], emoji: '🟠' },
  { name: 'Garland / Mesquite / Rowlett', annual: 8.8, insurance: '+16%', risk: 'High', mitigation: ['Class 4 shingles', 'Hail guards on AC units', 'Impact-resistant siding'], emoji: '🔴' },
  { name: 'Arlington / Mansfield / Grand Prairie', annual: 7.4, insurance: '+12%', risk: 'Moderate-High', mitigation: ['Class 3 shingles minimum', 'Covered parking if possible', 'Annual roof inspection'], emoji: '🟡' },
  { name: 'Denton / Lewisville / Flower Mound', annual: 9.6, insurance: '+19%', risk: 'Very High', mitigation: ['Class 4 shingles', 'Metal roof consideration', 'Hail-rated skylights', 'AC fin guards'], emoji: '🟠' },
  { name: 'Downtown Dallas / Oak Cliff', annual: 7.0, insurance: '+11%', risk: 'Moderate', mitigation: ['Annual roof inspection', 'Class 3 shingles', 'Document pre-existing conditions'], emoji: '🟡' },
];

export default function DFWHailFrequencyGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  const info = selected !== null ? zones[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🗺️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Hail Frequency Guide
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            DFW sits in "Hail Alley" — one of the highest hail-frequency regions in North America. Select your DFW submarket to see annual hail probability, insurance impact, and mitigation strategies.
          </p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📊 DFW Metro Average</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div><span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642′ }}>8.7</span><div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>hail events / year</div></div>
            <div><span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ef4444′ }}>+15%</span><div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>avg insurance premium impact</div></div>
            <div><span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f59e0b' }}>1\"</span><div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>average worst hail per season</div></div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {zones.map((z, i) => (
            <button
              key={z.name}
              onClick={() => setSelected(i === selected ? null : i)}
              style={{
                background: selected === i ? '#1e3a5f' : '#1e2d47',
                border: selected === i ? '2px solid #F5E642′ : '2px solid #2d4a6b',
                borderRadius: '10px',
                padding: '0.85rem 1.2rem',
                cursor: 'pointer',
                color: '#fff',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{z.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{z.name}</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8′ }}>Risk: {z.risk}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{z.annual}/yr</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8′ }}>{z.insurance} premium</div>
              </div>
            </button>
          ))}
        </div>

        {info && (
          <div style={{ background: '#1e2d47', borderRadius: '16px', padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.3rem', marginBottom: '1rem' }}>
              {info.emoji} {info.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642′ }}>{info.annual}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>events/year</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ef4444′ }}>{info.insurance}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>premium increase</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f59e0b' }}>{info.risk}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>risk level</div>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🛡️ Recommended Mitigation</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#e2e8f0′ }}>
                {info.mitigation.map((m) => <li key={m} style={{ marginBottom: '0.25rem' }}>{m}</li>)}
              </ul>
            </div>
          </div>
        )}

        {!info && (
          <div style={{ textAlign: 'center', color: '#94a3b8′ }}>
            👆 Select your DFW submarket above to see personalized hail risk and insurance impact
          </div>
        )}
      </div>
    </div>
  );
}
