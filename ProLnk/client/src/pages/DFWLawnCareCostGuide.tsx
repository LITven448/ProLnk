import { useState } from 'react';

const services = [
  { name: 'Mowing', icon: '🌿', frequency: 'Weekly/Bi-weekly', small: '$35–45', mid: '$45–65', large: '$65–100', diy: true },
  { name: 'Fertilization Program', icon: '🌱', frequency: '4–6 rounds/year', small: '$250–350', mid: '$350–500', large: '$500–800', diy: true },
  { name: 'Aeration', icon: '🔩', frequency: 'Fall (annually)', small: '$80–120', mid: '$120–200', large: '$200–350', diy: false },
  { name: 'Overseeding', icon: '🌾', frequency: 'Fall (annually)', small: '$100–180', mid: '$180–280', large: '$280–450', diy: true },
  { name: 'Pre-emergent Weed Control', icon: '🚫', frequency: 'Spring + Fall', small: '$80–120', mid: '$120–180', large: '$180–280', diy: true },
  { name: 'Post-emergent Weed Control', icon: '☠️', frequency: 'As needed', small: '$60–100', mid: '$100–160', large: '$160–250', diy: true },
  { name: 'Edging & Trimming', icon: '✂️', frequency: 'With mowing', small: 'Included', mid: 'Included', large: '$20–40 extra', diy: true },
  { name: 'Leaf Cleanup', icon: '🍂', frequency: 'Fall', small: '$100–200', mid: '$200–350', large: '$350–600', diy: true },
  { name: 'Grub Treatment', icon: '🪲', frequency: 'Summer', small: '$100–150', mid: '$150–250', large: '$250–400', diy: false },
  { name: 'Lawn Disease Treatment', icon: '🍄', frequency: 'As needed', small: '$120–200', mid: '$200–350', large: '$350–600', diy: false },
];

const serviceLevels = {
  diy: {
    label: 'DIY',
    icon: '🔧',
    description: 'You do the work — supplies only',
    color: '#60A5FA',
  },
  basic: {
    label: 'Basic Service',
    icon: '🌿',
    description: 'Mowing + basic weed control',
    color: '#4ADE80',
  },
  full: {
    label: 'Full Service',
    icon: '⭐',
    description: 'All services, professional program',
    color: '#F5E642',
  },
};

const dfwFacts = [
  { fact: 'DFW summer heat', impact: 'Bermuda/Zoysia lawns need mowing every 5–7 days June–August' },
  { fact: 'Clay soil', impact: 'Fall aeration is essential — DFW clay compacts aggressively' },
  { fact: 'Winter freezes', impact: 'Annual pre-emergent timing is March (before soil hits 55°F)' },
  { fact: 'Chinch bugs', impact: 'St. Augustine lawns need monitoring June–September in DFW' },
  { fact: 'Brown patch fungus', impact: 'High humidity + heat triggers outbreaks — act within 48 hours' },
];

const annualCostBreakdown = {
  diy: { small: 450, mid: 700, large: 1100 },
  basic: { small: 1200, mid: 1900, large: 2800 },
  full: { small: 2200, mid: 3500, large: 5500 },
};

export default function DFWLawnCareCostGuide() {
  const [yardSize, setYardSize] = useState<'small' | 'mid' | 'large'>('mid');
  const [serviceLevel, setServiceLevel] = useState<'diy' | 'basic' | 'full'>('basic');

  const costs = annualCostBreakdown[serviceLevel];
  const annualTotal = costs[yardSize];
  const monthlyAvg = Math.round(annualTotal / 12);
  const activeMonthly = Math.round(annualTotal / 9);

  const yardLabels = { small: 'Small (< 5,000 sqft)', mid: 'Medium (5–10k sqft)', large: 'Large (10k+ sqft)' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
            DFW Lawn Care Cost Guide 2026
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>
            Real pricing for mowing, fertilization, aeration, weed control, and full-service plans in North Texas
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>📍 DFW Lawn Care Market Realities</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 10 }}>
            DFW's competitive lawn care market means you can often get professional service for less than homeowners pay in coastal markets. 
            The hot, long growing season (March–November for warm-season grasses) means more service visits — but also means a lush lawn 
            is achievable most of the year with the right program.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            Prices below reflect 2026 DFW rates including labor. DFW labor rates are 15–25% below national averages.
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>💰 Service Pricing by Yard Size</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#94A3B8', borderBottom: '2px solid #0A1628' }}>Service</th>
                  <th style={{ textAlign: 'right', padding: '10px 14px', color: '#60A5FA', borderBottom: '2px solid #0A1628' }}>Small {'<'}5k sqft</th>
                  <th style={{ textAlign: 'right', padding: '10px 14px', color: '#4ADE80', borderBottom: '2px solid #0A1628' }}>Medium 5–10k</th>
                  <th style={{ textAlign: 'right', padding: '10px 14px', color: '#F5E642', borderBottom: '2px solid #0A1628' }}>Large 10k+</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', color: '#94A3B8', borderBottom: '2px solid #0A1628' }}>DIY?</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0A1628' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{s.icon}</span>
                        <div>
                          <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                          <div style={{ color: '#64748B', fontSize: 12 }}>{s.frequency}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#60A5FA', fontWeight: 600 }}>{s.small}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#4ADE80', fontWeight: 600 }}>{s.mid}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#F5E642', fontWeight: 600 }}>{s.large}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <span style={{ color: s.diy ? '#4ADE80' : '#F87171' }}>{s.diy ? '✓' : '✗'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>🌡️ DFW-Specific Lawn Challenges</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {dfwFacts.map((f, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontSize: 16, flexShrink: 0 }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 4 }}>{f.fact}</div>
                  <div style={{ fontSize: 14, color: '#CBD5E1' }}>{f.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>🧮 Monthly Lawn Care Budget</h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Yard Size</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['small', 'mid', 'large'] as const).map(size => (
                <button key={size} onClick={() => setYardSize(size)}
                  style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                    background: yardSize === size ? '#F5E642' : '#0A1628', color: yardSize === size ? '#0A1628' : '#94A3B8' }}>
                  {size === 'small' ? '🏠 Small' : size === 'mid' ? '🏡 Medium' : '🏰 Large'}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#64748B', marginTop: 6 }}>{yardLabels[yardSize]}</div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Service Level</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
              {(Object.entries(serviceLevels) as [keyof typeof serviceLevels, typeof serviceLevels[keyof typeof serviceLevels]][]).map(([key, val]) => (
                <div key={key} onClick={() => setServiceLevel(key)}
                  style={{ background: serviceLevel === key ? '#1A3050' : '#0A1628', borderRadius: 10, padding: 16, cursor: 'pointer',
                    border: `2px solid ${serviceLevel === key ? val.color : '#1E2D45'}`, transition: 'all 0.15s', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{val.icon}</div>
                  <div style={{ fontWeight: 700, color: serviceLevel === key ? val.color : '#E8EDF5', fontSize: 15 }}>{val.label}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{val.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
            {[
              { label: 'Monthly Average', value: `$${monthlyAvg}`, sub: '12-month average', color: '#60A5FA' },
              { label: 'Active Season Mo.', value: `$${activeMonthly}`, sub: 'Mar–Nov (9 months)', color: '#F5E642' },
              { label: 'Annual Total', value: `$${annualTotal.toLocaleString()}`, sub: 'full year', color: '#4ADE80' },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{stat.sub}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Compare Lawn Care Quotes in Your DFW Neighborhood</h3>
          <p style={{ color: '#1E3A5F', marginBottom: 16 }}>Get 3 quotes from local lawn pros in minutes — no commitment</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
