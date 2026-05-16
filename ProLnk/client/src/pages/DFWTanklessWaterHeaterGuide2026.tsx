import { useState } from 'react';

export default function DFWTanklessWaterHeaterGuide2026() {
  const [household, setHousehold] = useState('');
  const [usage, setUsage] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    if (!household || !usage) { setResult('Please select household size and usage pattern.'); return; }
    const hh = parseInt(household);
    const simultaneous = usage === 'high' ? hh : Math.ceil(hh / 2);
    const gpm = simultaneous <= 1 ? '6–8 GPM' : simultaneous <= 2 ? '8–10 GPM' : '10–12 GPM';
    const type = 'Gas tankless (recommended for DFW — low gas rates make gas 40% cheaper to operate)';
    const cost = hh <= 2 ? '$1,200–1,800' : hh <= 4 ? '$1,600–2,400' : '$2,200–3,500';
    setResult(`⚡ Recommended: ${gpm} whole-home gas tankless. ${type}. Installed cost: ${cost}. Note: DFW hard water (15–20 GPG) requires annual descaling to maintain warranty.`);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '0.4rem 1rem', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem' }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🔥 DFW Tankless Water Heater Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW homeowners save 25–35% on water heating costs with tankless. Low Texas gas rates make gas units the dominant choice in the metroplex.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔥', title: 'Gas Dominates DFW', desc: 'Natural gas rates in TX average $0.80–0.95/therm. Gas tankless costs 40% less to run than electric in DFW.' },
            { icon: '💧', title: 'Flow Rate Sizing', desc: 'Single fixture: 3–5 GPM. 2 simultaneous: 6–8 GPM. Whole home: 8–12 GPM. Never undersize.' },
            { icon: '🧹', title: 'DFW Hard Water Care', desc: 'Annual descaling required with DFW water (15–20 GPG). Skipping voids most warranties within 3 years.' }
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2035', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📐 Sizing Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.88rem' }}>Household Size</label>
              <select value={household} onChange={e => setHousehold(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
                <option value="">Select size</option>
                <option value="2">1–2 people</option>
                <option value="4">3–4 people</option>
                <option value="6">5–6+ people</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.88rem' }}>Hot Water Usage Pattern</label>
              <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
                <option value="">Select pattern</option>
                <option value="low">Low — sequential use</option>
                <option value="high">High — simultaneous use</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get Sizing Guide →</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: '✅ Whole-Home Gas', pros: 'Unlimited hot water, 20+ yr lifespan, lowest operating cost', cons: 'Higher upfront cost, requires gas line, annual descaling' },
            { label: '⚡ Point-of-Use Electric', pros: 'Low upfront $300–600, no wait for hot water, great for additions', cons: 'Single fixture only, high electric rate impact' }
          ].map((opt, i) => (
            <div key={i} style={{ background: '#0f2035', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>{opt.label}</div>
              <div style={{ color: '#4ade80', fontSize: '0.82rem', marginBottom: '0.3rem' }}>✓ {opt.pros}</div>
              <div style={{ color: '#f87171', fontSize: '0.82rem' }}>✗ {opt.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '10px', padding: '1.2rem', color: '#0A1628' }}>
          <strong>💡 DFW Pro Tip:</strong> Pair your tankless heater with a water softener — DFW hard water is the #1 cause of early tankless failure. Combo installs save 15% on labor.
        </div>
      </div>
    </div>
  );
}
