import { useState } from 'react';

export default function DFWOutdoorHeatingGuide2026() {
  const [patioSize, setPatioSize] = useState('medium');
  const [heatPref, setHeatPref] = useState('gas');

  const getRecommendation = () => {
    if (patioSize === 'small' && heatPref === 'electric') return { type: 'Tabletop Infrared Heater', cost: '$80–$200', install: 'None', note: 'Perfect for small covered DFW patios — plug-in, no gas line needed' };
    if (patioSize === 'small') return { type: 'Propane Standing Heater', cost: '$150–$350', install: 'None', note: 'Portable, no plumber needed — ideal for occasional DFW winter nights' };
    if (patioSize === 'medium' && heatPref === 'electric') return { type: 'Ceiling-Mount Infrared Heater', cost: '$300–$700', install: 'Electrician $200–$400', note: 'No gas line, instant heat — great for covered DFW patio' };
    if (patioSize === 'medium') return { type: 'Natural Gas Plumbed Heater', cost: '$400–$900', install: 'Plumber $500–$1,200', note: 'Gas line extension from house — permanent, cost-efficient for frequent use' };
    if (patioSize === 'large' && heatPref === 'gas') return { type: 'Multiple Natural Gas Heaters', cost: '$800–$2,000', install: 'Plumber $700–$1,500', note: '2–3 units for large DFW outdoor spaces — zone coverage' };
    return { type: 'Infrared Ceiling Array', cost: '$1,000–$2,500', install: 'Electrician $400–$800', note: 'Commercial-grade infrared for large covered patios' };
  };

  const rec = getRecommendation();

  const heaterTypes = [
    { name: 'Propane Portable', icon: '🔥', range: '10–15 ft', cost: '$150–$350', dfwUse: 'Casual entertaining' },
    { name: 'Natural Gas Plumbed', icon: '⛽', range: '12–18 ft', cost: '$400–$900 + install', dfwUse: 'Frequent winter use' },
    { name: 'Infrared Electric', icon: '⚡', range: '8–14 ft', cost: '$200–$800 + install', dfwUse: 'Covered patios, no gas' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px' }}>🔥</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '8px 0 4px' }}>DFW Outdoor Heating Guide 2026</h1>
          <p style={{ color: '#8899aa', margin: 0 }}>Outdoor entertaining Oct–Feb in DFW — the right heat source for your patio</p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ margin: 0, color: '#F5E642' }}>⚡ DFW Key Fact: DFW winters (Oct–Feb) average 35–55°F evenings. Gas line extension costs $500–$1,200 via licensed plumber — but pays off fast with nightly use.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {heaterTypes.map(h => (
            <div key={h.name} style={{ background: '#111d30', borderRadius: '8px', padding: '16px', border: '1px solid #1e3050' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{h.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '6px' }}>{h.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '4px' }}>📏 Range: {h.range}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '4px' }}>💰 {h.cost}</div>
              <div style={{ fontSize: '0.8rem', color: '#F5E642' }}>🏠 {h.dfwUse}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Outdoor Heating Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Patio Size</label>
              <select value={patioSize} onChange={e => setPatioSize(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="small">Small (under 200 sq ft)</option>
                <option value="medium">Medium (200–400 sq ft)</option>
                <option value="large">Large (400+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Heat Preference</label>
              <select value={heatPref} onChange={e => setHeatPref(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="gas">Gas (propane or natural)</option>
                <option value="electric">Electric / Infrared</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>Recommended: {rec.type}</div>
            <div style={{ color: '#8899aa', fontSize: '0.85rem', marginBottom: '4px' }}>Unit cost: {rec.cost} | Install: {rec.install}</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{rec.note}</div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📋 Gas Line Notes — Hire a Licensed DFW Plumber</h3>
          {['Gas line extension from house: $500–$1,200 typical DFW cost', 'Must use licensed master plumber — required by TX law', 'Permit required for new gas line extension in all DFW cities', 'Dedicated shutoff valve required at outdoor heater connection', 'Annual inspection recommended for outdoor gas connections'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#ccc', fontSize: '0.9rem' }}>✅ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
