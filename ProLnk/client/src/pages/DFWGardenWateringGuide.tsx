import { useState } from 'react';

const wateringFrequencies = [
  { plantType: 'Container Plants', summer: 'Daily (sometimes 2x above 105°F)', spring: 'Every 2-3 days', fall: 'Every 3-4 days', winter: 'Weekly or less' },
  { plantType: 'Annual Flowers', summer: '2-3x per week', spring: '2x per week', fall: '1-2x per week', winter: 'Weekly' },
  { plantType: 'Perennial Flowers', summer: 'Weekly (deep)', spring: 'Every 10 days', fall: 'Every 10-14 days', winter: 'Monthly if dry' },
  { plantType: 'Vegetable Garden', summer: 'Daily to every other day', spring: 'Every 2-3 days', fall: 'Every 2-3 days', winter: 'Weekly if growing' },
  { plantType: 'Established Shrubs', summer: 'Weekly deep watering', spring: 'Every 2 weeks', fall: 'Every 2-3 weeks', winter: 'Monthly' },
  { plantType: 'Newly Planted Trees', summer: 'Every 2-3 days for 1st year', spring: 'Weekly', fall: 'Weekly', winter: 'Every 2-3 weeks' },
  { plantType: 'Native/Adapted Plants', summer: 'Weekly until established, then minimal', spring: 'Every 2-3 weeks', fall: 'Every 3-4 weeks', winter: 'Rarely needed' },
  { plantType: 'Lawn (Bermuda)', summer: '1-1.5 inch/week (1-2x)', spring: '0.5-1 inch/week', fall: 'Reduce as temps drop', winter: 'None (dormant)' },
];

const restrictionStages = [
  { stage: 'Stage 1', color: '#fbbf24', frequency: '2x per week', allowedDays: 'Odd address: Tue/Sat, Even: Wed/Sun', time: 'Before 10am or after 6pm', notes: 'Most DFW cities default stage' },
  { stage: 'Stage 2', color: '#f97316', frequency: '1x per week', allowedDays: 'Odd: Sat, Even: Sun', time: 'Before 10am or after 6pm', notes: 'Common during summer drought' },
  { stage: 'Stage 3', color: '#ef4444', frequency: '1x per week or less', allowedDays: 'Assigned day only', time: 'Before 10am or after 6pm', notes: 'Severe drought — hand watering exempt' },
  { stage: 'Stage 4', color: '#7c3aed', frequency: 'Emergency restrictions', allowedDays: 'No outdoor irrigation', time: 'Exception for new plantings only', notes: 'Rare — critical drought conditions' },
];

const dripBenefits = [
  'Reduces water use 30-50% vs sprinkler systems',
  'Delivers water directly to root zone — no evaporation',
  'Reduces fungal disease by keeping foliage dry',
  'Can water any time of day (not restricted by odd/even rules in most cities)',
  'Easily converted from standard hose connections',
  'Self-timer drip systems automate watering during vacation',
];

const gardenTypes = ['Container Garden', 'Annual Flower Bed', 'Vegetable Garden', 'Established Perennial Bed', 'New Tree Planting', 'Native Plant Garden', 'Lawn/Bermuda Grass'];
const restrictionStageOptions = ['Stage 1 (2x/week)', 'Stage 2 (1x/week)', 'Stage 3 (Emergency)', 'No Restrictions Currently'];

export default function DFWGardenWateringGuide() {
  const [gardenType, setGardenType] = useState('');
  const [restrictionStage, setRestrictionStage] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);

  const getFrequency = () => {
    const match = wateringFrequencies.find(w => {
      if (gardenType === 'Container Garden') return w.plantType === 'Container Plants';
      if (gardenType === 'Annual Flower Bed') return w.plantType === 'Annual Flowers';
      if (gardenType === 'Vegetable Garden') return w.plantType === 'Vegetable Garden';
      if (gardenType === 'Established Perennial Bed') return w.plantType === 'Perennial Flowers';
      if (gardenType === 'New Tree Planting') return w.plantType === 'Newly Planted Trees';
      if (gardenType === 'Native Plant Garden') return w.plantType === 'Native/Adapted Plants';
      if (gardenType === 'Lawn/Bermuda Grass') return w.plantType === 'Lawn (Bermuda)';
      return false;
    });
    return match;
  };

  const freq = getFrequency();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>💧</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Garden Watering Guide</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Water restriction compliance, seasonal schedules, and drought survival tips</p>
        </div>

        <div style={{ background: '#1a2a4a', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid #2d4a6e' }}>
          <div style={{ color: '#60a5fa', fontWeight: 700, marginBottom: '4px' }}>⏰ Morning Watering is Critical in DFW</div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8′ }}>Water before 10am in DFW. Evening watering leaves foliage wet overnight, dramatically increasing fungal disease risk in DFW’s summer humidity. Early morning also reduces evaporation — afternoon temps above 100°F can evaporate 40% of water before it reaches roots.</div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📅 Watering Frequency by Plant Type — DFW Summer</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642′ }}>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#F5E642′ }}>Plant Type</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#F5E642′ }}>Summer</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#F5E642′ }}>Spring/Fall</th>
                </tr>
              </thead>
              <tbody>
                {wateringFrequencies.map((w, i) => (
                  <tr key={w.plantType} style={{ borderBottom: '1px solid #2d3f5e', background: i % 2 === 0 ? 'transparent' : '#0d1f38′ }}>
                    <td style={{ padding: '8px', fontWeight: 600 }}>{w.plantType}</td>
                    <td style={{ padding: '8px', color: '#fbbf24′ }}>{w.summer}</td>
                    <td style={{ padding: '8px', color: '#94a3b8′ }}>{w.spring}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🚿 DFW Water Restriction Stages</h2>
          {restrictionStages.map(r => (
            <div key={r.stage} style={{ padding: '12px', borderRadius: '8px', marginBottom: '10px', background: '#0A1628', border: `1px solid ${r.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ color: r.color, fontWeight: 700 }}>{r.stage}</div>
                <div style={{ fontSize: '0.85rem', color: '#e2e8f0′ }}>{r.frequency}</div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8′ }}>Days: {r.allowedDays}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8′ }}>Time: {r.time}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{r.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>💧 Drip Irrigation Advantages for DFW</h2>
          {dripBenefits.map((b, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #2d3f5e', fontSize: '0.9rem' }}>✅ {b}</div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📋 Get Your Watering Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Garden Type</label>
              <select value={gardenType} onChange={e => setGardenType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select type...</option>
                {gardenTypes.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Current Water Restriction Stage</label>
              <select value={restrictionStage} onChange={e => setRestrictionStage(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select stage...</option>
                {restrictionStageOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowSchedule(true)} disabled={!gardenType || !restrictionStage} style={{ background: gardenType && restrictionStage ? '#F5E642′ : '#2d3f5e', color: gardenType && restrictionStage ? '#0A1628' : '#64748b', border: ’none', borderRadius: '8px', padding: '12px 24px', fontWeight: 700, cursor: gardenType && restrictionStage ? 'pointer' : 'not-allowed' }}>
            Generate Watering Schedule
          </button>
          {showSchedule && freq && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '10px' }}>💧 {gardenType} — Watering Schedule</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: '#1e2d45', borderRadius: '6px', padding: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SUMMER (June–Sep)</div>
                  <div style={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.9rem', marginTop: '4px' }}>{freq.summer}</div>
                </div>
                <div style={{ background: '#1e2d45', borderRadius: '6px', padding: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SPRING/FALL</div>
                  <div style={{ color: '#4ade80', fontWeight: 600, fontSize: '0.9rem', marginTop: '4px' }}>{freq.spring}</div>
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#94a3b8′ }}>
                🕐 Always water before 10am in DFW. Under {restrictionStage}, check your city's assigned watering days for your address.
              </div>
              <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#64748b' }}>Drought tip: Add 3-4 inches of mulch to reduce watering frequency 25-30%.</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>ProLnk Home Services · DFW Garden Resource</div>
      </div>
    </div>
  );
}
