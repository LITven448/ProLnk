import { useState } from 'react';

export default function DFWSolarVsGridGuide2026() {
  const [bill, setBill] = useState('');
  const [roof, setRoof] = useState('');
  const [years, setYears] = useState('');

  const monthlyBill = parseFloat(bill) || 0;
  const stayYears = parseInt(years) || 0;
  const systemCost = 18000;
  const annualProduction = monthlyBill * 0.85 * 12;
  const breakEven = systemCost / (monthlyBill * 0.85 * 12 / 12) || 0;
  const tenYearSavings = (monthlyBill * 0.85 * 120) - systemCost;
  const goodCandidate = monthlyBill >= 150 && roof === 'south' && stayYears >= 10;

  const pros = [
    { icon: '💰', text: 'Eliminate 70–90% of electric bill permanently' },
    { icon: '🏡', text: 'Increases home resale value by avg $15,000 in DFW' },
    { icon: '🔋', text: 'Battery backup = grid independence during ERCOT events' },
    { icon: '🌱', text: '25-year panel warranty — set it and forget it' },
  ];

  const cons = [
    { icon: '💸', text: '$15,000–25,000 upfront (before federal 30% tax credit)' },
    { icon: '🏠', text: 'Rental, HOA restrictions, or bad roof can prevent install' },
    { icon: '📄', text: 'ONCOR net metering pays low rates for exported power' },
    { icon: '🔧', text: 'Inverter replacement typically needed at 10–15 years (~$2,000)' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Solar vs Grid Power 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>When solar makes sense in North Texas — and when it doesn't</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{ background: '#1e3a5f', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>DFW: 234 sunny days/yr</span>
            <span style={{ background: '#1e3a5f', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>Federal Tax Credit: 30%</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#112240', borderRadius: 16, padding: 20, border: '1px solid #1e3a5f' }}>
            <h3 style={{ color: '#22c55e', fontSize: 16, marginBottom: 10 }}>✅ Solar Pros</h3>
            {pros.map((p, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}><span>{p.icon}</span><span style={{ color: '#94a3b8', fontSize: 13 }}>{p.text}</span></div>)}
          </div>
          <div style={{ background: '#112240', borderRadius: 16, padding: 20, border: '1px solid #1e3a5f' }}>
            <h3 style={{ color: '#ef4444', fontSize: 16, marginBottom: 10 }}>❌ Solar Cons</h3>
            {cons.map((c, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}><span>{c.icon}</span><span style={{ color: '#94a3b8', fontSize: 13 }}>{c.text}</span></div>)}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔆 Solar Break-Even Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Current monthly electric bill ($)</label>
              <input value={bill} onChange={e => setBill(e.target.value)} placeholder="e.g. 200"
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Roof orientation</label>
              <select value={roof} onChange={e => setRoof(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: roof ? '#fff' : '#64748b', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="south">South or West facing ✅</option>
                <option value="north">North or East facing ⚠️</option>
                <option value="flat">Flat roof (adjustable) ✅</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Years you plan to stay in home</label>
              <input value={years} onChange={e => setYears(e.target.value)} placeholder="e.g. 12"
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          {monthlyBill > 0 && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: `4px solid ${goodCandidate ? '#22c55e' : '#f97316'}` }}>
              <div style={{ color: goodCandidate ? '#22c55e' : '#f97316', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                {goodCandidate ? '✅ Solar makes strong sense for you' : '⚠️ Solar may not be optimal yet'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ textAlign: 'center' }}><div style={{ color: '#94a3b8', fontSize: 12 }}>Est. break-even</div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{breakEven.toFixed(1)} yrs</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ color: '#94a3b8', fontSize: 12 }}>10-yr net savings</div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${tenYearSavings.toLocaleString()}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}