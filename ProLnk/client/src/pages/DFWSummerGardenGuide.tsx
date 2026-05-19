import { useState } from 'react';

const heatTolerantFlowers = [
  { name: 'Lantana', water: 'Weekly once established', sun: 'Full sun', notes: 'Thrives in DFW heat, attracts butterflies' },
  { name: 'Portulaca', water: 'Every 5-7 days', sun: 'Full sun', notes: 'Loves heat, great for hot spots' },
  { name: 'Vinca', water: '2x per week', sun: 'Full to partial sun', notes: 'Disease-resistant, brilliant color' },
  { name: 'Periwinkle', water: '2x per week', sun: 'Full sun', notes: 'Handles DFW humidity well' },
];

const survivingVegetables = [
  { name: 'Okra', plantBy: 'May 15', harvest: 'July–September', notes: 'DFW summer star crop' },
  { name: 'Sweet Potatoes', plantBy: 'June 1', harvest: 'October', notes: 'Set slips now, harvest in fall' },
  { name: 'Southern Peas', plantBy: 'May 30', harvest: 'August', notes: 'Black-eyed peas, crowder peas thrive' },
];

const skipInSummer = ['Tomatoes (stop setting fruit above 95°F)', 'Squash (squash vine borer destroys by July)', 'Lettuce (bolts immediately)', 'Broccoli (goes to seed)', 'Peppers (fruit drops in extreme heat)'];

const gardenTypes = ['Container Garden', 'Raised Bed', 'In-Ground Bed', 'Xeriscape'];
const spaceSizes = ['Small (under 100 sq ft)', 'Medium (100–400 sq ft)', 'Large (400+ sq ft)'];

const containerSchedule = ['Water daily in summer — containers dry out fast in DFW heat', 'Check soil moisture morning and evening above 100°F', 'Self-watering containers reduce frequency to every 2-3 days', 'Group containers together to reduce evaporation'];
const raisedBedSchedule = ['Water 2-3x per week for established plants', 'Daily watering for seedlings and new transplants', 'Drip irrigation strongly recommended — water at root level', 'Mulch 3-4 inches deep to retain moisture'];
const inGroundSchedule = ['Established perennials: weekly deep watering', 'Annuals: 2-3x per week', 'New plantings: every 2-3 days for first 2 weeks', 'Water early morning to reduce fungal disease'];

export default function DFWSummerGardenGuide() {
  const [gardenType, setGardenType] = useState('');
  const [spaceSize, setSpaceSize] = useState('');
  const [showResults, setShowResults] = useState(false);

  const getWateringSchedule = () => {
    if (gardenType === 'Container Garden') return containerSchedule;
    if (gardenType === 'Raised Bed') return raisedBedSchedule;
    return inGroundSchedule;
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌞</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Summer Garden Guide</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>What survives the Texas summer — and what to skip until fall</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🌸 Heat-Tolerant Flowers That Survive DFW Summer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {heatTolerantFlowers.map(f => (
              <div key={f.name} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', border: '1px solid #2d3f5e' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '4px' }}>{f.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8′ }}>💧 {f.water}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8′ }}>☀️ {f.sun}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{f.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🥕 Vegetables That Actually Grow in DFW Summer</h2>
          {survivingVegetables.map(v => (
            <div key={v.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #2d3f5e' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{v.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8′ }}>{v.notes}</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                <div style={{ color: '#F5E642′ }}>Plant by {v.plantBy}</div>
                <div style={{ color: '#94a3b8′ }}>Harvest {v.harvest}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>❌ What to Skip June–August in DFW</h2>
          {skipInSummer.map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #2d3f5e', fontSize: '0.9rem', color: '#94a3b8′ }}>
              🚫 {item}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📋 Get Your DFW Summer Garden Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Garden Type</label>
              <select value={gardenType} onChange={e => setGardenType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select type...</option>
                {gardenTypes.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Space Size</label>
              <select value={spaceSize} onChange={e => setSpaceSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select size...</option>
                {spaceSizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!gardenType || !spaceSize} style={{ background: gardenType && spaceSize ? '#F5E642′ : '#2d3f5e', color: gardenType && spaceSize ? '#0A1628' : '#64748b', border: ’none', borderRadius: '8px', padding: '12px 24px', fontWeight: 700, cursor: gardenType && spaceSize ? 'pointer' : 'not-allowed', fontSize: '0.95rem' }}>
            Generate My Summer Garden Plan
          </button>
          {showResults && gardenType && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '10px' }}>💧 Watering Schedule for {gardenType}</div>
              {getWateringSchedule().map((s, i) => (
                <div key={i} style={{ padding: '6px 0', fontSize: '0.9rem', color: '#e2e8f0', borderBottom: '1px solid #1e2d45′ }}>✅ {s}</div>
              ))}
              <div style={{ marginTop: '12px', color: '#F5E642', fontWeight: 700 }}>🌿 Best Choices for {spaceSize}:</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '6px' }}>Lantana, Portulaca, Okra — proven DFW summer survivors for your space size.</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>ProLnk Home Services · DFW Garden Resource</div>
      </div>
    </div>
  );
}
