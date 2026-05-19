import { useState } from 'react';

const sensorTypes = [
  { type: 'Indoor PIR Security', use: 'Intruder detection', indoor: true, outdoor: false, petImmune: true, battery: 'Good (cool indoors)', range: '25–40 ft', cost: '$20–$50', emoji: '🔒' },
  { type: 'Indoor Automation PIR', use: 'Lights, routines', indoor: true, outdoor: false, petImmune: false, battery: 'Excellent', range: '15–30 ft', cost: '$15–$35', emoji: '💡' },
  { type: 'Outdoor Microwave/Dual', use: 'Driveway, porch', indoor: false, outdoor: true, petImmune: false, battery: 'Poor in DFW heat', range: '40–60 ft', cost: '$40–$100', emoji: '🌡️' },
  { type: 'Outdoor with Pet Immunity', use: 'Yard with dogs', indoor: false, outdoor: true, petImmune: true, battery: 'Moderate', range: '30–50 ft', cost: '$60–$150', emoji: '🐕' },
  { type: 'Dual-Tech Indoor/Outdoor', use: 'Covered patio', indoor: true, outdoor: true, petImmune: true, battery: 'Good', range: '35–50 ft', cost: '$80–$180', emoji: '🏡' },
];

const placements = [
  { location: 'Entry hallway', reason: 'First motion after entry — lights + alarm', sensor: 'Indoor PIR' },
  { location: 'Living room corner (7–8 ft height)', reason: 'Wide coverage for lighting automation', sensor: 'Indoor Automation' },
  { location: 'Garage corner', reason: 'Vehicle arrival detection', sensor: 'Indoor PIR' },
  { location: 'Driveway (mounted high)', reason: 'Arrivals before entry — cooled cable run for DFW heat', sensor: 'Outdoor Microwave' },
  { location: 'Backyard gate', reason: 'Pet or intruder entry', sensor: 'Outdoor Pet-Immune' },
];

export default function DFWMotionSensorGuide() {
  const [purpose, setPurpose] = useState('security');
  const [hasPets, setHasPets] = useState(false);
  const [layout, setLayout] = useState('single');
  const [result, setResult] = useState<string | null>(null);

  function getRecommendation() {
    let rec = '';
    const budget = layout === 'single' ? '$80–$150′ : layout === ’medium' ? '$200–$400′ : '$400–$800';
    if (purpose === 'security' && hasPets) {
      rec = `Recommended: Outdoor Pet-Immune sensors for yard + Indoor PIR (pet-immune, 40 lb+) for interior. Budget: ${budget}. DFW tip: mount outdoor sensors under eaves — direct summer sun degrades plastic housings fast.`;
    } else if (purpose === 'security') {
      rec = `Recommended: Standard outdoor microwave dual-tech for driveway + indoor PIR for hallways. Budget: ${budget}. DFW summer note: battery-powered outdoor sensors drain 3x faster in 100°F+ heat — prefer wired or USB-C outdoor units.`;
    } else if (purpose === 'automation' && hasPets) {
      rec = `Recommended: Pet-immune indoor PIR for lighting automation (avoids false triggers from cats/dogs). Budget: ${budget}. Place 8 ft high, angled down 15° for best pet-ignore zone below 2 ft.`;
    } else {
      rec = `Recommended: Indoor automation PIR sensors — high sensitivity for lighting, low-cost. Budget: ${budget}. DFW note: keep away from AC vents (temperature swings can cause false triggers in summer).`;
    }
    setResult(rec);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🏠 DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Motion Sensor Guide for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW summer heat (100°F+) kills outdoor battery sensors fast. DFW dogs set off cheap indoor sensors constantly. Here's how to choose and place the right sensor.
        </p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: '16px 20px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>🌡️ DFW Heat + Sensor Reality</div>
          <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0 }}>
            Outdoor sensors in full DFW sun can reach 140°F+ on housing surfaces. This degrades battery life (3x faster), triggers false alarms from heat shimmer, and warps plastic mounts. Always mount under eaves or use wired sensors outdoors.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: '#F5E642', borderBottom: '1px solid #1E3A5F' }}>
                {['Type', 'Use Case', 'Pet-Safe', 'DFW Battery', 'Range', 'Cost'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sensorTypes.map(s => (
                <tr key={s.type} style={{ borderBottom: '1px solid #0D1F35′ }}>
                  <td style={{ padding: '10px 12px', color: '#E8EDF5′ }}>{s.emoji} {s.type}</td>
                  <td style={{ padding: '10px 12px', color: '#94A3B8′ }}>{s.use}</td>
                  <td style={{ padding: '10px 12px', color: s.petImmune ? '#4ADE80′ : '#F87171' }}>{s.petImmune ? '✅ Yes' : '❌ No'}</td>
                  <td style={{ padding: '10px 12px', color: '#94A3B8′ }}>{s.battery}</td>
                  <td style={{ padding: '10px 12px', color: '#94A3B8′ }}>{s.range}</td>
                  <td style={{ padding: '10px 12px', color: '#F5E642′ }}>{s.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📍 Recommended Placement Map</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {placements.map(p => (
            <div key={p.location} style={{ background: '#0D1F35', borderRadius: 8, padding: '14px 18px', border: '1px solid #1E3A5F', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 180, fontSize: 13 }}>📍 {p.location}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#E8EDF5', fontSize: 13, marginBottom: 4 }}>{p.reason}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Sensor: {p.sensor}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '28px', border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔧 Get Your Sensor Recommendation</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            {['security', 'automation', 'both'].map(p => (
              <button key={p} onClick={() => setPurpose(p)} style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${purpose === p ? '#F5E642' : '#1E3A5F'}`, background: purpose === p ? '#F5E64220′ : ’transparent', color: purpose === p ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>
                {p === 'security' ? '🔒 Security' : p === 'automation' ? '💡 Automation' : '🔒💡 Both'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <input type="checkbox" checked={hasPets} onChange={e => setHasPets(e.target.checked)} id="pets" style={{ width: 18, height: 18, cursor: 'pointer' }} />
            <label htmlFor="pets" style={{ color: '#CBD5E1', fontSize: 14, cursor: 'pointer' }}>🐕 I have pets (dogs or cats)</label>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {[['single', 'Single Story'], ['medium', '2-Story / 2000 sq ft'], ['large', 'Large / 3000+ sq ft']].map(([v, l]) => (
              <button key={v} onClick={() => setLayout(v)} style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${layout === v ? '#F5E642' : '#1E3A5F'}`, background: layout === v ? '#F5E64220′ : ’transparent', color: layout === v ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Sensor Plan →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 8, padding: '16px 20px', color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Smart Home Guides · Sensor sizing for DFW heat and homes</div>
      </div>
    </div>
  );
}
