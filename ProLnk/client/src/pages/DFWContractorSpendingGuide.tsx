import { useState } from 'react';

const CATEGORIES = [
  { id: 'hvac', label: 'HVAC & Cooling', emoji: '❄️', baseSpend: 680, included: 'Annual tune-up, filter changes, minor repairs' },
  { id: 'plumbing', label: 'Plumbing', emoji: '🚿', baseSpend: 520, included: 'Leak repairs, fixture updates, annual check' },
  { id: 'electrical', label: 'Electrical', emoji: '⚡', baseSpend: 380, included: 'Panel checks, outlet repairs, safety updates' },
  { id: 'roofing', label: 'Roofing & Gutters', emoji: '🏠', baseSpend: 620, included: 'Inspection, gutter cleaning, minor repairs' },
  { id: 'foundation', label: 'Foundation & Structure', emoji: '🏗️', baseSpend: 890, included: 'Monitoring, watering system, soil treatment' },
  { id: 'landscaping', label: 'Landscaping & Pest', emoji: '🌿', baseSpend: 1100, included: 'Lawn service, pest control, tree trimming' },
];

const AGE_FACTORS: Record<string, number> = { '0-10': 0.55, '11-20': 0.8, '21-30': 1.0, '31-40': 1.35, '40+': 1.65 };
const FEATURE_ADDERS: Record<string, number> = {
  pool: 1800, hoa: 0, 'two-story': 400, 'large-lot': 600,
};

export default function DFWContractorSpendingGuide() {
  const [homeAge, setHomeAge] = useState('21-30');
  const [features, setFeatures] = useState<Record<string, boolean>>({});
  const [calculated, setCalculated] = useState(false);

  const toggleFeature = (f: string) => setFeatures(prev => ({ ...prev, [f]: !prev[f] }));
  const ageFactor = AGE_FACTORS[homeAge];

  const categorySpends = CATEGORIES.map(c => ({
    ...c,
    adjusted: Math.round(c.baseSpend * ageFactor),
  }));

  const baseTotal = categorySpends.reduce((s, c) => s + c.adjusted, 0);
  const featureAddon = Object.entries(features)
    .filter(([, v]) => v)
    .reduce((s, [k]) => s + (FEATURE_ADDERS[k] || 0), 0);
  const total = baseTotal + featureAddon;
  const monthly = Math.round(total / 12);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Contractor Spending Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>What DFW homeowners typically spend on contractors each year</p>
          <div style={{ background: '#0F2040', borderRadius: 8, padding: 12, marginTop: 12, display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW average: $4,200/year</span>
            <span style={{ color: '#94a3b8', fontSize: 14, marginLeft: 8 }}>for a maintained home</span>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Home Age</label>
          <select
            value={homeAge}
            onChange={e => setHomeAge(e.target.value)}
            style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}
          >
            {Object.keys(AGE_FACTORS).map(k => <option key={k} value={k}>{k} years</option>)}
          </select>

          <div style={{ marginTop: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Home Features</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.entries(FEATURE_ADDERS).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() => toggleFeature(key)}
                  style={{
                    background: features[key] ? '#1a3a1a' : '#1a2f4e',
                    border: `2px solid ${features[key] ? '#34d399' : '#1e3a5f'}`,
                    borderRadius: 8,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  {features[key] ? '✅' : '⬜'} {key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ')}
                  {val > 0 && <span style={{ color: '#94a3b8', fontSize: 12, marginLeft: 6 }}>+${val.toLocaleString()}/yr</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 10, padding: '14px 32px', width: '100%', cursor: 'pointer', marginBottom: 24 }}
        >
          Show My Expected Spending
        </button>

        {calculated && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Expected Annual Spend</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642′ }}>${total.toLocaleString()}</div>
              </div>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Per Month</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>${monthly.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {categorySpends.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a2f4e', borderRadius: 8, padding: '12px 16px' }}>
                  <div>
                    <span style={{ marginRight: 8 }}>{c.emoji}</span>
                    <span style={{ fontWeight: 600 }}>{c.label}</span>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{c.included}</div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0, marginLeft: 12 }}>${c.adjusted.toLocaleString()}/yr</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
