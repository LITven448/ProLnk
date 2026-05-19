import { useState } from 'react';

export default function DFWFirstYearBudget2026() {
  const [homeAge, setHomeAge] = useState('');
  const [homeSize, setHomeSize] = useState('');

  const getEstimate = () => {
    if (!homeAge || !homeSize) return null;
    const base: Record<string, number> = { new: 1800, mid: 3200, older: 5500 };
    const sizeMod: Record<string, number> = { small: -400, medium: 0, large: 800, xlarge: 1800 };
    const total = base[homeAge] + sizeMod[homeSize];
    return total;
  };

  const estimate = getEstimate();

  const fixedCosts = [
    { label: '🚛 Moving costs (local DFW move)', range: '$1,200 – $3,500′ },
    { label: '💡 Utility deposits (electric, gas, water)', range: '$300 – $700′ },
    { label: '🔒 Lock replacement / rekeying', range: '$150 – $400′ },
    { label: '🛋️ Immediate furniture and window coverings', range: '$2,000 – $8,000′ },
    { label: '💨 HVAC filter + first tune-up', range: '$80 – $200′ },
    { label: '🌿 Lawn care equipment or first service', range: '$200 – $600′ },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK HOMEOWNER GUIDES — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>💰 DFW First Year Homeowner Budget</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Real numbers for your first 12 months. Most DFW homeowners underestimate year 1 costs by $4,000–$8,000. Here is what to actually plan for.</p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Known First-Year Costs</h2>
        {fixedCosts.map((item, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
            <span>{item.label}</span>
            <span style={{ color: '#F5E642', fontWeight: 600 }}>{item.range}</span>
          </div>
        ))}

        <div style={{ marginTop: 32, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Estimate Your Unexpected Repair Budget</h2>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: 6, fontSize: 14 }}>Home Age</label>
          <select
            value={homeAge}
            onChange={e => setHomeAge(e.target.value)}
            style={{ background: '#1e2d45', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', fontSize: 15, width: '100%', marginBottom: 16 }}
          >
            <option value="">Select home age</option>
            <option value="new">Built 2015 or newer</option>
            <option value="mid">Built 1990–2014</option>
            <option value="older">Built before 1990</option>
          </select>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: 6, fontSize: 14 }}>Home Size</label>
          <select
            value={homeSize}
            onChange={e => setHomeSize(e.target.value)}
            style={{ background: '#1e2d45', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', fontSize: 15, width: '100%', marginBottom: 20 }}
          >
            <option value="">Select home size</option>
            <option value="small">Under 1,500 sq ft</option>
            <option value="medium">1,500 – 2,500 sq ft</option>
            <option value="large">2,500 – 3,500 sq ft</option>
            <option value="xlarge">Over 3,500 sq ft</option>
          </select>

          {estimate && (
            <div style={{ background: '#162236', borderRadius: 12, padding: '24px', borderLeft: '4px solid #F5E642', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>Estimated Year 1 Unexpected Repair Budget</div>
              <div style={{ color: '#F5E642', fontSize: 36, fontWeight: 800 }}>${estimate.toLocaleString()}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>DFW average for your home profile — includes HVAC, plumbing, foundation, and misc repairs</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏦 DFW-Specific Budget Truth</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 14 }}>
            Property taxes are due in January and average $8,000–$12,000 on a $400K DFW home. If your lender does not escrow them, set aside $700–$1,000/month starting month 1. This is the #1 financial surprise for first-time DFW buyers.
          </div>
        </div>
      </div>
    </div>
  );
}

