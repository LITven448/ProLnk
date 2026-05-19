import { useState } from 'react';

export default function DFWPatioGuide2026() {
  const [budget, setBudget] = useState('medium');
  const [lotSize, setLotSize] = useState('medium');

  const getRecommendation = () => {
    if (budget === 'low' && lotSize === 'small') return { type: 'Concrete Slab Patio', cost: '$8,000–$12,000', note: 'Uncovered, simple, budget-friendly — add a shade sail for ~$500' };
    if (budget === 'low') return { type: 'Stamped Concrete', cost: '$10,000–$18,000', note: 'Great look on a budget — pair with a pergola later' };
    if (budget === 'medium' && lotSize === 'small') return { type: 'Paver Patio + Shade Sail', cost: '$15,000–$22,000', note: 'Pavers hold up to DFW clay soil movement better than concrete' };
    if (budget === 'medium') return { type: 'Attached Covered Patio', cost: '$18,000–$28,000', note: 'Extends outdoor season to 9 months — permit required, check HOA' };
    if (budget === 'high' && lotSize === 'large') return { type: 'Full Outdoor Living Room', cost: '$35,000–$60,000', note: 'Flagstone, fireplace, ceiling fans — DFW luxury standard' };
    return { type: 'Premium Covered Patio', cost: '$25,000–$40,000', note: 'Tongue & groove ceiling, recessed lights, fans — HOA approval often needed' };
  };

  const rec = getRecommendation();

  const surfaces = [
    { name: 'Concrete', icon: '🏗️', pros: 'Cheapest, smooth finish', cons: 'Cracks in DFW clay, hot in summer', cost: '$6–$12/sq ft' },
    { name: 'Pavers', icon: '🧱', pros: 'Flexible, replaceable, clay-resilient', cons: 'Higher upfront cost', cost: '$12–$22/sq ft' },
    { name: 'Flagstone', icon: '🪨', pros: 'Natural look, premium feel', cons: 'Uneven surface, higher labor', cost: '$18–$30/sq ft' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px' }}>🌿</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '8px 0 4px' }}>DFW Patio Guide 2026</h1>
          <p style={{ color: '#8899aa', margin: 0 }}>Covered vs uncovered patios — extend your outdoor season to 9 months</p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ margin: 0, color: '#F5E642' }}>⚡ DFW Key Fact: A covered patio extends usable outdoor season from 7 months to 9 months — permit required for permanent structures, HOA approval common.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {surfaces.map(s => (
            <div key={s.name} style={{ background: '#111d30', borderRadius: '8px', padding: '16px', border: '1px solid #1e3050' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '6px' }}>{s.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '4px' }}>✅ {s.pros}</div>
              <div style={{ fontSize: '0.8rem', color: '#8899aa', marginBottom: '8px' }}>⚠️ {s.cons}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{s.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Patio Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="low">Low ($8K–$18K)</option>
                <option value="medium">Medium ($18K–$35K)</option>
                <option value="high">High ($35K+)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Lot Size</label>
              <select value={lotSize} onChange={e => setLotSize(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
                <option value="small">Small (&lt;6,000 sq ft)</option>
                <option value="medium">Medium (6K–12K sq ft)</option>
                <option value="large">Large (12K+ sq ft)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>Recommended: {rec.type}</div>
            <div style={{ color: '#8899aa', fontSize: '0.85rem', marginBottom: '4px' }}>Estimated cost: {rec.cost}</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{rec.note}</div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📋 DFW Permit & HOA Checklist</h3>
          {['Permanent covered structures require city building permit', 'HOA approval required in most DFW communities', 'Setback requirements vary by city (typically 5–10 ft from property line)', 'Electrical in covered patio requires licensed electrician', 'Gas lines require licensed plumber and inspection'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#ccc', fontSize: '0.9rem' }}>✅ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
