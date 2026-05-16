import { useState } from 'react';

const systems = [
  { name: 'Overhead Storage Racks', cost: '300–900', best: 'Seasonal items, bins, rarely accessed', heatSafe: true, diy: true },
  { name: 'Wall-Mounted Slatwall', cost: '400–1,200', best: 'Tools, bikes, sports equipment', heatSafe: true, diy: true },
  { name: 'Heavy-Duty Shelving Units', cost: '200–800', best: 'Garage staples, paint cans, hardware', heatSafe: true, diy: true },
  { name: 'Workbench + Cabinets', cost: '600–3,000', best: 'Workshop setup, organized tools', heatSafe: true, diy: false },
  { name: 'Full Garage System (pro)', cost: '3,000–8,000', best: 'Complete transformation, epoxy floor + all storage', heatSafe: true, diy: false },
];

const unsafe = ['Candles', 'Vinyl records', 'Wax items', 'Photographs', 'Wine / spirits', 'Medications', 'Electronics', 'Chocolate / candy', 'Makeup / cosmetics', 'Rubber items (degrade)'];
const safe = ['Metal tools', 'PVC pipe', 'Concrete / masonry supplies', 'Automotive supplies (sealed)', 'Holiday lights (plastic)', 'Camping gear (non-edible)', 'Lawn equipment'];

export default function DFWGarageOrganizationGuide2026() {
  const [size, setSize] = useState('');
  const [priority, setPriority] = useState('general');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<typeof systems[0] | null>(null);

  function recommend() {
    const b = parseFloat(budget);
    const s = parseFloat(size);
    if (!b || !s) return;
    if (b >= 3000) { setResult(systems[4]); return; }
    if (priority === 'workshop' && b >= 600) { setResult(systems[3]); return; }
    if (priority === 'sports' || priority === 'bikes') { setResult(systems[1]); return; }
    if (b >= 300 && s >= 400) { setResult(systems[0]); return; }
    setResult(systems[2]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME ORGANIZATION</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Garage Organization Guide — Dallas-Fort Worth 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32, maxWidth: 680 }}>DFW garages routinely hit 150°F+ in summer. Most DFW homeowners use garages as primary storage — but without a plan, heat destroys thousands in belongings.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ background: '#1a0a0a', border: '1px solid #7f1d1d', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 12 }}>🚫 NEVER Store in DFW Garage</div>
            {unsafe.map(u => <div key={u} style={{ color: '#94a3b8', fontSize: 13, padding: '4px 0', borderBottom: '1px solid #1f0a0a' }}>{u}</div>)}
            <div style={{ color: '#f87171', fontSize: 12, marginTop: 10 }}>Heat damage is irreversible. Climate-controlled storage units in DFW: $60–200/mo.</div>
          </div>
          <div style={{ background: '#0a1a0a', border: '1px solid #14532d', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 12 }}>✅ Safe to Store in DFW Garage</div>
            {safe.map(s => <div key={s} style={{ color: '#94a3b8', fontSize: 13, padding: '4px 0', borderBottom: '1px solid #0a1f0a' }}>{s}</div>)}
            <div style={{ color: '#22c55e', fontSize: 12, marginTop: 10 }}>Metal and plastic items handle Texas heat well when properly sealed.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
          {systems.map(s => (
            <div key={s.name} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 18 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>{s.best}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>Cost</span><span>${s.cost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 4 }}>
                <span style={{ color: '#64748b' }}>DIY</span><span>{s.diy ? '✅' : '🔧 Pro'}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 System Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Garage size (sq ft)</label>
              <input value={size} onChange={e => setSize(e.target.value)} type="number" placeholder="e.g. 440 (2-car)" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Primary use</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="general">General storage</option>
                <option value="workshop">Workshop / tools</option>
                <option value="sports">Sports equipment</option>
                <option value="bikes">Bikes / recreation</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Budget ($)</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="e.g. 1500" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✅ Recommended: {result.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>{result.best}</div>
              <div style={{ color: '#fff', fontSize: 14 }}>Estimated cost: <strong>${result.cost}</strong> · Install: {result.diy ? 'DIY or Pro' : 'Professional recommended'}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>💡 DFW Garage Heat Tips</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.8, paddingLeft: 20, fontSize: 14 }}>
            <li>Install a mini-split AC in garage for ~$1,800–3,500 if storing sensitive items</li>
            <li>Insulate garage door ($400–800) to reduce interior temp by 20–30°F</li>
            <li>Attic ventilation above garage dramatically reduces heat transfer</li>
            <li>Epoxy floor coating ($1,500–4,000) makes cleaning and organizing far easier</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
