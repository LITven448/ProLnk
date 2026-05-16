import { useState } from 'react';

export default function DFWWaterSoftenerGuide2026() {
  const [household, setHousehold] = useState('');
  const [hardness, setHardness] = useState('');
  const [rec, setRec] = useState('');

  const recommend = () => {
    if (!household || !hardness) { setRec('Please select both household size and hardness level.'); return; }
    const hh = parseInt(household);
    const gpg = parseInt(hardness);
    let size = '';
    if (hh <= 2) size = '24,000 grain';
    else if (hh <= 4) size = '32,000 grain';
    else size = '48,000+ grain';
    let type = '';
    if (gpg >= 15) type = 'Salt-based ion exchange (required for DFW hardness levels)';
    else type = 'Salt-free descaler may work; test first';
    setRec(`📐 Recommended: ${size} softener. Type: ${type}. Budget $${hh <= 2 ? '800–1,400' : hh <= 4 ? '1,200–1,900' : '1,800–2,500'} installed. ROI via appliance longevity: 2–4 years.`);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '0.4rem 1rem', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem' }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>💧 DFW Water Softener Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW water ranks among the hardest in the US at 15–20 grains per gallon. Soft water extends appliance life by 30% and cuts soap use significantly.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🪨', title: 'DFW Hardness: 15–20 GPG', desc: 'Very hard. Scale builds inside water heaters, dishwashers, and washing machines. Shortens appliance life by 30–50%.' },
            { icon: '🧂', title: 'Salt vs Salt-Free', desc: 'Salt-based ion exchange is the gold standard for DFW hardness. Salt-free descalers prevent scale but do not soften.' },
            { icon: '📦', title: 'Sizing Matters', desc: '2-person home: 24k grain. 4-person: 32k grain. 6+ person: 48k grain. Undersized = frequent regeneration.' },
            { icon: '💰', title: 'Rental vs Purchase', desc: 'Purchase: $800–2,500 installed, 10–15 yr lifespan. Rental: $30–50/mo with maintenance included. Purchase wins long-term.' }
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2035', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🎯 Softener Sizing Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.88rem' }}>Household Size</label>
              <select value={household} onChange={e => setHousehold(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
                <option value="">Select size</option>
                <option value="1">1–2 people</option>
                <option value="3">3–4 people</option>
                <option value="5">5–6+ people</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.88rem' }}>Water Hardness (GPG)</label>
              <select value={hardness} onChange={e => setHardness(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
                <option value="">Select hardness</option>
                <option value="10">Moderate (7–12 GPG)</option>
                <option value="15">Hard (13–17 GPG)</option>
                <option value="20">Very Hard (18–22 GPG)</option>
              </select>
            </div>
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get My Recommendation →</button>
          {rec && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#e2e8f0' }}>{rec}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '10px', padding: '1.2rem', color: '#0A1628' }}>
          <strong>💡 DFW Pro Tip:</strong> Test your water hardness for free — most DFW plumbers and water treatment companies offer free tests. Frisco, McKinney, and Plano average 18+ GPG.
        </div>
      </div>
    </div>
  );
}
