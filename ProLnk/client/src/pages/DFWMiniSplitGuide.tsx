import { useState } from 'react';

const zones = [
  { label: '1 Zone', rooms: 1 },
  { label: '2 Zones', rooms: 2 },
  { label: '3 Zones', rooms: 3 },
  { label: '4+ Zones', rooms: 4 },
];

const sqftOptions = ['< 500 sq ft', '500–1,000 sq ft', '1,000–1,500 sq ft', '1,500+ sq ft'];

function getRecommendation(rooms: number, sqft: string) {
  const large = sqft === '1,500+ sq ft';
  const small = sqft === '< 500 sq ft';
  if (rooms >= 4 || large) {
    return {
      type: 'Central AC',
      cost: '$5,500–$12,000',
      reason: 'Whole-home central AC is more cost-effective for large footprints.',
    };
  }
  if (rooms === 1 && small) {
    return {
      type: 'Single-Zone Mini-Split',
      cost: '$1,200–$3,500 installed',
      reason: 'Ideal for one targeted space with no existing ductwork.',
    };
  }
  return {
    type: 'Multi-Zone Mini-Split',
    cost: '$2,800–$7,500 installed',
    reason: 'Best for additions, garages, or older homes lacking ducts.',
  };
}

export default function DFWMiniSplitGuide() {
  const [selectedZone, setSelectedZone] = useState(0);
  const [selectedSqft, setSelectedSqft] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const rec = getRecommendation(zones[selectedZone].rooms, sqftOptions[selectedSqft]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '3px solid #F5E642' }}>
        <div style={{ fontSize: 48 }}>❄️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Mini-Split Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Is a ductless mini-split right for your DFW home? Get the facts on cost, efficiency, and when to choose mini-split vs central AC.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🏠', title: 'Best Use Cases', items: ['Room additions & sunrooms', 'Garages & workshops', 'Older homes without ductwork', 'Supplemental cooling for hot spots'] },
            { icon: '💰', title: 'Cost vs Central AC', items: ['Single-zone: $1,200–$3,500', 'Multi-zone: $2,800–$7,500', 'Central AC: $5,500–$12,000', 'Mini-splits have no duct losses (20–30% savings)'] },
            { icon: '⚡', title: 'SEER Ratings for DFW', items: ['DFW minimum: SEER 15+', 'Recommended: SEER 18–25', 'DFW summer averages 100°F+', 'Higher SEER = lower summer bills'] },
            { icon: '🔧', title: 'Installation Timeline', items: ['Single-zone: 4–8 hours', 'Multi-zone: 1–2 days', 'No ductwork modifications needed', 'Permit required in most DFW cities'] },
          ].map((card) => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
              <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
                {card.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🧮 Mini-Split vs Central AC Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Select your situation to get a tailored recommendation.</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>How many rooms/zones need cooling?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {zones.map((z, i) => (
                <button key={z.label} onClick={() => { setSelectedZone(i); setShowResult(false); }} style={{ padding: '10px 20px', borderRadius: 8, border: `2px solid ${selectedZone === i ? '#F5E642' : '#1e3a5f'}`, background: selectedZone === i ? '#F5E642' : '#0A1628', color: selectedZone === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>{z.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Total square footage to condition?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {sqftOptions.map((s, i) => (
                <button key={s} onClick={() => { setSelectedSqft(i); setShowResult(false); }} style={{ padding: '10px 20px', borderRadius: 8, border: `2px solid ${selectedSqft === i ? '#F5E642' : '#1e3a5f'}`, background: selectedSqft === i ? '#F5E642' : '#0A1628', color: selectedSqft === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>{s}</button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get Recommendation →</button>

          {showResult && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, marginBottom: 8 }}>✅ Recommended: {rec.type}</p>
              <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 8 }}>{rec.reason}</p>
              <p style={{ color: '#F5E642', fontWeight: 700 }}>Estimated Cost: {rec.cost}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 Single-Zone vs Multi-Zone</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642' }}>
                  {['Feature', 'Single-Zone', 'Multi-Zone'].map((h) => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#F5E642' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Zones covered', '1 room', '2–8 rooms'],
                  ['Installed cost', '$1,200–$3,500', '$2,800–$7,500'],
                  ['Best for', 'Garages, additions', 'Multi-room, no ducts'],
                  ['SEER range', 'Up to SEER 30', 'Up to SEER 25'],
                  ['Installation time', '4–8 hours', '1–2 days'],
                ].map((row) => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    {row.map((cell, i) => <td key={i} style={{ padding: '10px 14px', color: i === 0 ? '#cbd5e1' : '#94a3b8' }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
