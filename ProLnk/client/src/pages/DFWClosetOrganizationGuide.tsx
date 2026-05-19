import { useState } from 'react';

const systems = [
  { name: 'Custom Built-In', minBudget: 3000, maxBudget: 15000, diy: false, roi: 85, best: 'Large master closets, permanent installation' },
  { name: 'California Closets', minBudget: 2000, maxBudget: 10000, diy: false, roi: 75, best: 'Mid-range custom, design consultation included' },
  { name: 'Elfa (The Container Store)', minBudget: 800, maxBudget: 4000, diy: true, roi: 60, best: 'Flexible, adjustable, good for renters' },
  { name: 'IKEA PAX', minBudget: 400, maxBudget: 2000, diy: true, roi: 50, best: 'Budget-friendly, modular, DIY-friendly' },
  { name: 'Wire Shelving', minBudget: 100, maxBudget: 600, diy: true, roi: 35, best: 'Minimum budget, utility closets' },
];

function recommend(sqft: number, items: string, budget: number) {
  if (budget >= 5000 && sqft >= 80) return systems[0];
  if (budget >= 3000 && sqft >= 50) return systems[1];
  if (budget >= 1500) return systems[2];
  if (budget >= 500) return systems[3];
  return systems[4];
}

export default function DFWClosetOrganizationGuide() {
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [items, setItems] = useState('moderate');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<typeof systems[0] | null>(null);

  function calculate() {
    const sqft = parseFloat(width) * parseFloat(depth);
    const b = parseFloat(budget);
    if (!sqft || !b) return;
    setResult(recommend(sqft, items, b));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME ORGANIZATION</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Closet Organization Guide — Dallas-Fort Worth 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40, maxWidth: 680 }}>DFW homes trend large — many master closets exceed 100 sq ft. Choosing the right system determines ROI, usability, and resale value.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
          {systems.map(s => (
            <div key={s.name} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{s.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>{s.best}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>Cost range</span>
                <span style={{ color: '#fff' }}>${s.minBudget.toLocaleString()}–${s.maxBudget.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6 }}>
                <span style={{ color: '#64748b' }}>ROI at resale</span>
                <span style={{ color: '#22c55e' }}>{s.roi}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 6 }}>
                <span style={{ color: '#64748b' }}>DIY friendly</span>
                <span>{s.diy ? '✅ Yes' : '🔧 Pro only'}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 System Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Closet width (ft)</label>
              <input value={width} onChange={e => setWidth(e.target.value)} type="number" placeholder="e.g. 12″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Closet depth (ft)</label>
              <input value={depth} onChange={e => setDepth(e.target.value)} type="number" placeholder="e.g. 8″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Clothing volume</label>
              <select value={items} onChange={e => setItems(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="light">Light — minimal wardrobe</option>
                <option value="moderate">Moderate — average household</option>
                <option value="heavy">Heavy — large wardrobe, shoes, accessories</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Budget ($)</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="e.g. 3000″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✅ Recommended: {result.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>{result.best}</div>
              <div style={{ color: '#fff', fontSize: 14 }}>Estimated cost: <strong>${result.minBudget.toLocaleString()}–${result.maxBudget.toLocaleString()}</strong> · ROI: <strong style={{ color: '#22c55e' }}>{result.roi}%</strong> · Install: {result.diy ? 'DIY or Pro' : 'Professional recommended'}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>💡 DFW-Specific Insights</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.8, paddingLeft: 20, fontSize: 14 }}>
            <li>DFW master closets average 80–120 sq ft — significantly larger than national average of 50 sq ft</li>
            <li>Dual walk-in closets are standard in DFW homes above $400K — both need organization systems</li>
            <li>Humidity in DFW can reach 80%+ in summer — cedar lining or silica packets protect clothing</li>
            <li>Custom built-ins add $8–15K to appraisal value in DFW luxury market</li>
            <li>Permit not required for closet organizers in most DFW municipalities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
