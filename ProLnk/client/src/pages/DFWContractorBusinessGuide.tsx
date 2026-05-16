import { useState } from 'react';

const structures = [
  { type: 'Sole Proprietor', liability: 'Unlimited personal liability', tax: 'Pass-through (Schedule C)', cost: '$50–200/yr', best: 'First year, under $80K revenue, minimal employees', risk: 'High — one lawsuit can wipe personal assets' },
  { type: 'LLC (Single Member)', liability: 'Limited liability', tax: 'Pass-through (treated as SP)', cost: '$300–500/yr', best: 'Year 1-2, revenue $80K–$400K', risk: 'Low — must maintain separation' },
  { type: 'LLC (Multi-Member)', liability: 'Limited liability', tax: 'Pass-through (partnership)', cost: '$500–800/yr', best: 'Partners or investor situations', risk: 'Low with proper operating agreement' },
  { type: 'S-Corp Election', liability: 'Limited liability', tax: 'Salary + distribution split', cost: '$800–1,500/yr', best: 'Revenue >$150K — saves 15% SE tax on distributions', risk: 'Low but requires payroll' },
];

const firstYearCosts = [
  { item: 'Texas SOC Registration', cost: 300 },
  { item: 'General Liability Insurance (1M/2M)', cost: 1800 },
  { item: 'Workers Comp (1 helper)', cost: 3200 },
  { item: 'Vehicle/tools insurance', cost: 1400 },
  { item: 'Licensing fees (trade-specific)', cost: 300 },
  { item: 'Website + marketing basics', cost: 800 },
  { item: 'ProLnk subscription (annual)', cost: 1788 },
  { item: 'Tools/equipment (starter)', cost: 4000 },
];

const trades = ['HVAC', 'Electrical', 'Plumbing', 'Roofing', 'General Contracting', 'Painting', 'Landscaping'];

export default function DFWContractorBusinessGuide() {
  const [trade, setTrade] = useState('');
  const [experience, setExperience] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { structure: string; reason: string; firstYearRevLow: number; firstYearRevHigh: number; note: string }>(null);

  function generate() {
    const bgt = parseInt(budget) || 0;
    const yrs = parseInt(experience) || 0;
    let structure = 'LLC (Single Member)';
    let reason = 'Best liability protection for solo operators with minimal tax complexity.';
    if (bgt < 5000 && yrs < 2) { structure = 'Sole Proprietor'; reason = 'Lower startup cost, simpler — upgrade to LLC by year 2.'; }
    if (bgt > 20000 && yrs > 4) { structure = 'S-Corp Election'; reason = 'At your experience and capital level, S-Corp payroll savings justify the overhead.'; }
    const revFactor = yrs < 2 ? 1 : yrs < 5 ? 1.5 : 2;
    const baseRevLow = trade === 'HVAC' ? 90000 : trade === 'Plumbing' ? 85000 : trade === 'Electrical' ? 80000 : trade === 'Roofing' ? 120000 : 70000;
    const note = bgt < 3000 ? 'Tip: Apply for equipment financing — most banks offer 0% for 12 months for established trades.' : 'Tip: Keep 20% of revenue in reserve for slow months (summer HVAC aside).';
    setResult({ structure, reason, firstYearRevLow: Math.round(baseRevLow * revFactor * 0.7), firstYearRevHigh: Math.round(baseRevLow * revFactor), note });
  }

  const totalStartupCost = firstYearCosts.reduce((s, i) => s + i.cost, 0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK CONTRACTOR GUIDES — DFW BUSINESS</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.1 }}>Starting a Home Service Business in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: '0 0 40px' }}>Business structure, registration, insurance, and first-year financials — done right from day one.</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏢 Business Structure Comparison</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {structures.map((s, i) => (
              <div key={i} style={{ background: '#131f35', borderRadius: 10, padding: '18px 20px', border: '1px solid #1e3a5f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{s.type}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{s.cost}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 12 }}><span style={{ color: '#64748b' }}>Liability: </span><span>{s.liability}</span></div>
                  <div style={{ fontSize: 12 }}><span style={{ color: '#64748b' }}>Tax: </span><span>{s.tax}</span></div>
                </div>
                <div style={{ fontSize: 13, color: '#4ade80', marginBottom: 4 }}>✅ {s.best}</div>
                <div style={{ fontSize: 13, color: '#f87171' }}>⚠️ {s.risk}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>💵 Typical First-Year Startup Costs (DFW)</h2>
          <div style={{ background: '#131f35', borderRadius: 10, overflow: 'hidden', border: '1px solid #1e3a5f' }}>
            {firstYearCosts.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 18px', borderBottom: i < firstYearCosts.length - 1 ? '1px solid #1e2d4a' : 'none' }}>
                <span style={{ fontSize: 14, color: '#e2e8f0' }}>{item.item}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#F5E642' }}>${item.cost.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 18px', background: '#0f1e35', fontWeight: 700 }}>
              <span style={{ color: '#fff' }}>Total Estimated Startup</span>
              <span style={{ color: '#F5E642', fontSize: 16 }}>${totalStartupCost.toLocaleString()}</span>
            </div>
          </div>
        </section>

        <section style={{ background: '#131f35', borderRadius: 14, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Business Structure Recommender</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Your trade</label>
              <select value={trade} onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select trade</option>
                {trades.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Years of trade experience</label>
              <input type="number" value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g. 5"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Startup budget ($)</label>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 15000"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={generate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>
            Get My Recommendation →
          </button>
          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 10, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 8 }}>Recommended: {result.structure}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>{result.reason}</div>
              <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 8 }}>💰 Year 1 Revenue Projection: ${result.firstYearRevLow.toLocaleString()} – ${result.firstYearRevHigh.toLocaleString()}</div>
              <div style={{ color: '#60a5fa', fontSize: 13 }}>💡 {result.note}</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
