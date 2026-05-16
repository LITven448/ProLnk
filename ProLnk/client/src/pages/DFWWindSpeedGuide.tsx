import { useState } from 'react';

const materials = [
  { name: 'Standard Asphalt Shingles', emoji: '🏠', threshold: '60 mph', code: '90 mph', tips: ['Tabs can uplift at 60 mph gusts', 'Use 6-nail pattern instead of 4 for higher resistance', 'Consider architectural shingles rated to 130 mph'] },
  { name: 'Metal Roofing', emoji: '🔩', threshold: '130 mph', code: '90 mph', tips: ['Most wind-resistant roofing material', 'Standing seam outperforms exposed fastener panels', 'Annual fastener inspection recommended'] },
  { name: 'Wood Fencing', emoji: '🌲', threshold: '45 mph', code: 'N/A', tips: ['Most vulnerable structure in DFW storms', 'Concrete-set posts add 15–20 mph resistance', 'Dog-ear style holds better than flat-top panels'] },
  { name: 'Vinyl Siding', emoji: '🏗️', threshold: '80 mph', code: '90 mph', tips: ['Ensure proper overlap and nail hem engagement', 'Corner pieces are most vulnerable', 'Hurricane-rated vinyl rated to 110+ mph'] },
  { name: 'Windows (Standard)', emoji: '🪟', threshold: '75 mph', code: '90 mph', tips: ['Standard glass fails at pressure differential', 'Impact-resistant film adds 20–30 mph buffer', 'Consider storm shutters for severe events'] },
  { name: 'Garage Doors', emoji: '🚪', threshold: '55 mph', code: '90 mph', tips: ['Most common point of wind damage in DFW', 'Horizontal bracing kits available for existing doors', 'Wind-rated doors labeled for specific pressure'] },
];

const zones = [
  { name: 'Dallas / Collin County', designSpeed: '90 mph', exposure: 'B', zone: 'Non-hurricane' },
  { name: 'Fort Worth / Tarrant County', designSpeed: '90 mph', exposure: 'B', zone: 'Non-hurricane' },
  { name: 'Denton County', designSpeed: '90 mph', exposure: 'B/C', zone: 'Open terrain areas' },
  { name: 'Ellis / Johnson County', designSpeed: '95 mph', exposure: 'C', zone: 'More open terrain' },
];

export default function DFWWindSpeedGuide() {
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const mat = selectedMaterial !== null ? materials[selectedMaterial] : null;
  const zone = selectedZone !== null ? zones[selectedZone] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>💨</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Wind Speed Guide
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            DFW's design wind speed is 90 mph for most jurisdictions. Thunderstorm straight-line winds regularly exceed 60–80 mph. Know your material thresholds.
          </p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>💡 Step 1: Select Building Material</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {materials.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setSelectedMaterial(i === selectedMaterial ? null : i)}
                style={{
                  background: selectedMaterial === i ? '#1e3a5f' : '#0A1628',
                  border: selectedMaterial === i ? '2px solid #F5E642' : '2px solid #2d4a6b',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '1.6rem' }}>{m.emoji}</div>
                <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{m.name}</div>
                <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>Fails at {m.threshold}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📍 Step 2: Select DFW Location</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {zones.map((z, i) => (
              <button
                key={z.name}
                onClick={() => setSelectedZone(i === selectedZone ? null : i)}
                style={{
                  background: selectedZone === i ? '#1e3a5f' : '#0A1628',
                  border: selectedZone === i ? '2px solid #F5E642' : '2px solid #2d4a6b',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  color: '#fff',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontWeight: 600 }}>{z.name}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{z.designSpeed}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Exposure {z.exposure}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {(mat || zone) && (
          <div style={{ background: '#1e2d47', borderRadius: '16px', padding: '1.5rem', border: '2px solid #F5E642' }}>
            {zone && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🏗️ Building Code Wind Speed</div>
                <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', display: 'flex', gap: '1.5rem' }}>
                  <div><div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F5E642' }}>{zone.designSpeed}</div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Design Wind Speed</div></div>
                  <div><div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#60a5fa' }}>{zone.exposure}</div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Exposure Category</div></div>
                </div>
              </div>
            )}
            {mat && (
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{mat.emoji} {mat.name} — Wind Tips</div>
                <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>Damage threshold: <span style={{ color: '#ef4444', fontWeight: 700 }}>{mat.threshold}</span> | Code requirement: <span style={{ color: '#22c55e', fontWeight: 700 }}>{mat.code}</span></div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#e2e8f0' }}>
                    {mat.tips.map((t) => <li key={t} style={{ marginBottom: '0.25rem' }}>{t}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {!mat && !zone && (
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
            👆 Select your building material and DFW location for wind damage assessment
          </div>
        )}
      </div>
    </div>
  );
}
