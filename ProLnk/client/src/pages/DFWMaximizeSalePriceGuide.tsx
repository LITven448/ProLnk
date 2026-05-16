import { useState } from 'react';

type FeatureKey = 'threeCarGarage' | 'masterSuite' | 'openKitchen' | 'gameRoom' | 'pool' | 'updated';

const dfwBuyerHotButtons: { feature: string; impact: string; note: string }[] = [
  { feature: '🚗 3-Car Garage', impact: '+$15,000–30,000', note: 'DFW buyers have big trucks and toys. 3-car commands serious premium over 2-car.' },
  { feature: '🛏️ Large Master Suite', impact: '+$10,000–20,000', note: 'Spa bathroom, walk-in closet, retreat feel. DFW buyers pay for master luxury.' },
  { feature: '🍳 Open Kitchen to Family Room', impact: '+$8,000–18,000', note: 'DFW buyers entertain family constantly. Open concept is non-negotiable in new construction — existing homes that have it win.' },
  { feature: '🎮 Game Room or Media Room', impact: '+$5,000–12,000', note: 'DFW families want dedicated entertainment space. Especially if school district is strong.' },
  { feature: '🌳 Large Lot / Privacy', impact: '+$5,000–25,000', note: 'DFW sprawl means buyers can afford space. Big backyards for dogs and kids are hugely valued.' },
  { feature: '⭐ Top School District', impact: '+$20,000–50,000', note: 'Frisco, Southlake, Carroll, Allen, Prosper ISD — address in these districts commands massive premiums.' },
];

type Improvement = { name: string; cost: string; gain: string; roi: number; requires: FeatureKey[] };

const improvements: Improvement[] = [
  { name: 'Professional staging', cost: '$1,500–3,500', gain: '+$8,000–20,000', roi: 500, requires: [] },
  { name: 'Professional photography', cost: '$200–400', gain: '+$3,000–8,000', roi: 800, requires: [] },
  { name: 'Interior paint — neutral tones', cost: '$2,000–5,000', gain: '+$5,000–12,000', roi: 180, requires: [] },
  { name: 'Kitchen cabinet refresh + hardware', cost: '$800–2,500', gain: '+$5,000–10,000', roi: 300, requires: [] },
  { name: 'Master bath upgrade', cost: '$3,000–8,000', gain: '+$8,000–15,000', roi: 150, requires: ['masterSuite'] },
  { name: 'HVAC service + documentation', cost: '$200–600', gain: '+$3,000–6,000', roi: 600, requires: [] },
  { name: 'Landscaping refresh', cost: '$1,000–3,000', gain: '+$5,000–10,000', roi: 250, requires: [] },
  { name: 'Garage epoxy floor coat', cost: '$500–1,500', gain: '+$2,000–5,000', roi: 200, requires: ['threeCarGarage'] },
];

const defaultFeatures: Record<FeatureKey, boolean> = {
  threeCarGarage: false, masterSuite: false, openKitchen: false, gameRoom: false, pool: false, updated: false,
};

export default function DFWMaximizeSalePriceGuide() {
  const [features, setFeatures] = useState(defaultFeatures);
  const [budget, setBudget] = useState(10000);

  const toggle = (k: FeatureKey) => setFeatures(prev => ({ ...prev, [k]: !prev[k] }));

  const eligible = improvements.filter(i => i.requires.length === 0 || i.requires.some(r => features[r]));
  const sorted = [...eligible].sort((a, b) => b.roi - a.roi);

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0A1628', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40 }}>💰</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '12px 0 8px' }}>
            Maximize Your DFW Sale Price Guide
          </h1>
          <p style={{ color: '#aaa', fontSize: 16 }}>Five things move the needle in DFW. Everything else is noise. Here's exactly what to focus on.</p>
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏠 What does your home have?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            {(Object.keys(defaultFeatures) as FeatureKey[]).map(k => {
              const labels: Record<FeatureKey, string> = { threeCarGarage: '🚗 3-Car Garage', masterSuite: '🛏️ Master Suite', openKitchen: '🍳 Open Kitchen', gameRoom: '🎮 Game Room', pool: '🏊 Pool', updated: '✨ Recently Updated' };
              return (
                <button key={k} onClick={() => toggle(k)} style={{ padding: '10px 18px', borderRadius: 24, border: `2px solid ${features[k] ? '#F5E642' : '#2a3a54'}`, background: features[k] ? '#F5E642' : 'transparent', color: features[k] ? '#0A1628' : '#aaa', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                  {labels[k]}
                </button>
              );
            })}
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#aaa', display: 'block', marginBottom: 10 }}>💵 Your improvement budget: ${budget.toLocaleString()}</label>
            <input type="range" min={2000} max={50000} step={1000} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📈 Improvements Ranked by ROI (highest first)</h2>
          {sorted.map((imp, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < sorted.length - 1 ? '1px solid #1e3050' : 'none', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{imp.name}</div>
                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Cost: {imp.cost}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#4ade80' }}>{imp.gain}</div>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 600 }}>~{imp.roi}% ROI</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 DFW Buyer Hot Buttons</h2>
          {dfwBuyerHotButtons.map((b, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: i < dfwBuyerHotButtons.length - 1 ? '1px solid #1e3050' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{b.feature}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#4ade80' }}>{b.impact}</span>
              </div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{b.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
