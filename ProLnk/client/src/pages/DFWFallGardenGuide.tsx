import { useState } from 'react';

const coolWeatherVegs = [
  { name: 'Kale', startSeeds: 'July 15', transplant: 'Aug 15', harvest: 'Oct–Dec', difficulty: 'Easy' },
  { name: 'Broccoli', startSeeds: 'July 20', transplant: 'Aug 20', harvest: 'Nov–Dec', difficulty: 'Medium' },
  { name: 'Lettuce', startSeeds: 'Aug 15', transplant: 'Sep 1', harvest: 'Oct–Nov', difficulty: 'Easy' },
  { name: 'Spinach', startSeeds: 'Aug 20', transplant: 'Sep 5', harvest: 'Oct–Dec', difficulty: 'Easy' },
  { name: 'Carrots', startSeeds: 'Sep 1 (direct sow)', transplant: 'N/A', harvest: 'Nov–Jan', difficulty: 'Medium' },
  { name: 'Collard Greens', startSeeds: 'Aug 1', transplant: 'Aug 25', harvest: 'Oct–Feb', difficulty: 'Easy' },
];

const fallFlowers = [
  { name: 'Pansies', plant: 'October 1–Nov 1', bloom: 'Oct–April', notes: 'DFW winter color staple' },
  { name: 'Snapdragons', plant: 'September–October', bloom: 'Nov–May', notes: 'Survive light freezes' },
  { name: 'Ornamental Kale', plant: 'October', bloom: 'Oct–Feb', notes: 'Color through winter' },
  { name: 'Alyssum', plant: 'September–October', bloom: 'Oct–May', notes: 'Fragrant ground cover' },
];

const gardenSizes = ['Small Patio/Container', 'Small Yard (under 200 sq ft)', 'Medium Yard (200–600 sq ft)', 'Large Yard (600+ sq ft)'];
const gardenGoals = ['Food Production', 'Color & Curb Appeal', 'Both Food + Flowers', 'Lawn Overseeding'];

const overseeding = [
  'Overseed bermuda lawns with ryegrass: September 15–October 15',
  'Mow bermuda as short as possible before overseeding',
  'Use annual or perennial ryegrass — 8-10 lbs per 1,000 sq ft',
  'Water lightly 2-3x daily for 2 weeks until ryegrass germinates',
  'Ryegrass stays green all winter, dies back as bermuda greens up in May',
];

export default function DFWFallGardenGuide() {
  const [gardenSize, setGardenSize] = useState('');
  const [goals, setGoals] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const getCalendar = () => {
    if (goals === 'Lawn Overseeding') return overseeding;
    if (goals === 'Color & Curb Appeal') return fallFlowers.map(f => `${f.name}: Plant ${f.plant} — ${f.notes}`);
    return coolWeatherVegs.map(v => `${v.name}: Start seeds ${v.startSeeds}, harvest ${v.harvest}`);
  };

  const calendarLabel = goals === 'Lawn Overseeding' ? '🌱 Ryegrass Overseeding Steps' : goals === 'Color & Curb Appeal' ? '🌸 Fall Flower Planting Plan' : '🥦 Fall Vegetable Calendar';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🍂</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Fall Garden Guide</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>September–December is DFW's best gardening season — here’s how to maximize it</p>
        </div>

        <div style={{ background: '#1e3a2a', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid #2d5a3d' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#4ade80', marginBottom: '6px' }}>🏆 DFW's Best Gardening Season</div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8′ }}>DFW summers are brutal — but fall is when gardens truly thrive. Moderate temps, fewer pests, and excellent soil conditions make September–December perfect for cool-season crops and winter flowers.</div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🥦 Cool Weather Vegetables That Thrive in DFW Fall</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642′ }}>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#F5E642′ }}>Vegetable</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#F5E642′ }}>Start Seeds</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#F5E642′ }}>Transplant</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#F5E642′ }}>Harvest</th>
                </tr>
              </thead>
              <tbody>
                {coolWeatherVegs.map((v, i) => (
                  <tr key={v.name} style={{ borderBottom: '1px solid #2d3f5e', background: i % 2 === 0 ? 'transparent' : '#0d1f38′ }}>
                    <td style={{ padding: '8px', fontWeight: 600 }}>{v.name}</td>
                    <td style={{ padding: '8px', color: '#94a3b8′ }}>{v.startSeeds}</td>
                    <td style={{ padding: '8px', color: '#94a3b8′ }}>{v.transplant}</td>
                    <td style={{ padding: '8px', color: '#4ade80′ }}>{v.harvest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🌸 Fall Flowers for DFW Winter Color</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {fallFlowers.map(f => (
              <div key={f.name} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', border: '1px solid #2d3f5e' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{f.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Plant: {f.plant}</div>
                <div style={{ fontSize: '0.8rem', color: '#4ade80′ }}>Bloom: {f.bloom}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{f.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📋 Build Your Fall Garden Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Garden Size</label>
              <select value={gardenSize} onChange={e => setGardenSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select size...</option>
                {gardenSizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>My Goals</label>
              <select value={goals} onChange={e => setGoals(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select goals...</option>
                {gardenGoals.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!gardenSize || !goals} style={{ background: gardenSize && goals ? '#F5E642′ : '#2d3f5e', color: gardenSize && goals ? '#0A1628' : '#64748b', border: ’none', borderRadius: '8px', padding: '12px 24px', fontWeight: 700, cursor: gardenSize && goals ? 'pointer' : 'not-allowed' }}>
            Generate My Fall Plan
          </button>
          {showPlan && goals && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '10px' }}>{calendarLabel}</div>
              {getCalendar().map((item, i) => (
                <div key={i} style={{ padding: '6px 0', fontSize: '0.9rem', color: '#e2e8f0', borderBottom: '1px solid #1e2d45′ }}>✅ {item}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>ProLnk Home Services · DFW Garden Resource</div>
      </div>
    </div>
  );
}
