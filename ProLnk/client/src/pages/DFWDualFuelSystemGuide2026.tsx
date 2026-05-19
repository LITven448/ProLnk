import { useState } from 'react';

export default function DFWDualFuelSystemGuide2026() {
  const [size, setSize] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!size || !goal) { setResult('Please fill in all fields.'); return; }
    const s = parseInt(size);
    if (goal === 'reliability' && s > 1500) {
      setResult('✅ Strong fit. Dual fuel is ideal for ERCOT grid independence — gas backup fires automatically when temps drop below 35°F. Expect $1,800–$2,500 premium over straight heat pump. At your home size, gas savings in winter offset the cost in ~6 years.');
      return;
    }
    if (goal === 'efficiency' && s <= 1500) {
      setResult('🟡 Marginal fit. A heat pump alone may be more cost-effective for smaller DFW homes since you have fewer heating hours. Dual fuel ROI weakens below 1,500 sqft. Consider high-SEER heat pump with emergency heat strips instead.');
      return;
    }
    if (goal === 'cost') {
      setResult('🟡 Upfront cost premium of $1,500–$2,500 vs straight systems. Monthly savings are modest in DFW mild winters. Best financial fit: homes in Frisco/McKinney/Allen (north DFW) with more heating days than Dallas proper.');
      return;
    }
    setResult('✅ Dual fuel makes sense for your profile. Get quotes from 3 HVAC contractors — ask specifically for Carrier Infinity or Lennox XC21 heat pump paired with 80% furnace. Dual fuel staging is automatic once set up.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Dual Fuel Heat System Guide 2026</h1>
          <p style={{ color: '#a0aec0′ }}>Heat pump efficiency + gas backup reliability — the DFW sweet spot</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>How Dual Fuel Works in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[
              { temp: 'Above 35°F', mode: '⚡ Heat Pump', note: 'Highly efficient — 200–300% efficiency vs gas. Covers 90%+ of DFW heating hours.' },
              { temp: 'Below 35°F', mode: '🔥 Gas Furnace', note: 'Kicks in automatically. Heat pump loses efficiency in rare DFW hard freeze. Gas takes over.' },
              { temp: 'ERCOT Events', mode: '🛡️ Gas Backup', note: 'Grid stress events like Feb 2021 — gas independence protects your family when power is unreliable.' },
            ].map((row, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: '#a0aec0', fontSize: '0.75rem', marginBottom: 4 }}>{row.temp}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: 6 }}>{row.mode}</div>
                <div style={{ color: '#a0aec0', fontSize: '0.8rem', lineHeight: 1.4 }}>{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '💰', title: 'Cost Premium', desc: '$1,500–$2,500 more than straight heat pump or furnace. Full system install: $6,000–$12,000 depending on tonnage and efficiency ratings.' },
            { icon: '📍', title: 'Best DFW Zones', desc: 'North DFW (Frisco, McKinney, Allen, Plano) — more heating days. South DFW (Mansfield, Cedar Hill) — marginally less benefit but ERCOT protection still valuable.' },
            { icon: '🌡️', title: 'Crossover Temperature', desc: 'Factory default is 35°F but many DFW techs set it at 40°F for better comfort during light freeze events. Ask your installer to set this manually.' },
            { icon: '🔧', title: 'Maintenance Needs', desc: 'Both systems need annual service. Heat pump service in spring ($80–$120), furnace tune-up in fall ($80–$120). Budget $200/year total maintenance.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1rem' }}>{card.title}</h3>
              <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏠 Dual Fuel Feasibility Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Home Size (sqft)</label>
              <input type="number" value={size} onChange={e => setSize(e.target.value)} placeholder="e.g. 2200″
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }} />
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
                <option value=''>Select goal</option>
                <option value='reliability'>Grid independence / reliability</option>
                <option value='efficiency'>Maximum energy efficiency</option>
                <option value='cost'>Lowest total cost</option>
              </select>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Check Feasibility
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}
