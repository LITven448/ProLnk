import { useState } from 'react';

const SUBMARKETS: Record<string, number> = {
  'Frisco / Prosper': 6.2,
  'McKinney / Allen': 5.8,
  'Southlake / Grapevine': 4.9,
  'Plano / Richardson': 5.1,
  'Fort Worth (West)': 5.5,
  'Dallas (Uptown/Oak Lawn)': 4.7,
  'Arlington / Mansfield': 4.8,
  'Denton / Lewisville': 5.3,
  'Grand Prairie / Irving': 4.5,
  'Garland / Mesquite': 4.3,
};

export default function DFWEquityBuildingGuide() {
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [submarket, setSubmarket] = useState('Frisco / Prosper');
  const [homeValue, setHomeValue] = useState('');
  const [extra, setExtra] = useState('');
  const [result, setResult] = useState<null | any>(null);

  function project() {
    const bal = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const val = parseFloat(homeValue) || bal * 1.25;
    const appRate = (SUBMARKETS[submarket] || 5.0) / 100;
    const extraPmt = parseFloat(extra) || 0;
    if (!bal || !rate) return;

    const years = [1, 3, 5, 10];
    const projections = years.map(yr => {
      const months = yr * 12;
      let b = bal;
      const mp = b * r * Math.pow(1 + r, 360) / (Math.pow(1 + r, 360) - 1);
      for (let i = 0; i < months; i++) {
        const interest = b * r;
        const principal = mp - interest + extraPmt;
        b = Math.max(0, b - principal);
      }
      const projValue = val * Math.pow(1 + appRate, yr);
      const equity = projValue - b;
      return { yr, equity: Math.round(equity), value: Math.round(projValue), balance: Math.round(b) };
    });
    setResult(projections);
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📈</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>DFW Equity Building Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>3 paths to equity in DFW: appreciation, paydown, and improvements — with a projection calculator by submarket.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { icon: '🏘️', title: 'Appreciation', desc: 'DFW averages 4–6% annual appreciation by submarket' },
            { icon: '💸', title: 'Paydown', desc: 'Each mortgage payment shifts principal-to-interest ratio' },
            { icon: '🔨', title: 'Improvements', desc: 'Kitchen/bath remodels return 60–80% in DFW resale' },
          ].map(p => (
            <div key={p.title} style={{ background: '#fff', borderRadius: 10, padding: '16px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#0A1628', marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: '#64748B', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 17, fontWeight: 700, marginTop: 0 }}>📊 Equity Projection Calculator</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Current Loan Balance ($)</label>
              <input type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="e.g. 320000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Current Home Value ($) <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder="e.g. 420000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Interest Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 6.75" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>DFW Submarket</label>
              <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}>
                {Object.entries(SUBMARKETS).map(([k, v]) => <option key={k}>{k} ({v}% avg)</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Extra Monthly Payment ($) <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label>
              <input type="number" value={extra} onChange={e => setExtra(e.target.value)} placeholder="e.g. 500" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={project} style={{ marginTop: 18, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>Project My Equity →</button>
        </div>

        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {result.map((r: any) => (
              <div key={r.yr} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', borderTop: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#64748B', marginBottom: 8 }}>Year {r.yr}</div>
                <div style={{ fontWeight: 800, fontSize: 24, color: '#0A1628' }}>${r.equity.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>equity</div>
                <div style={{ marginTop: 10, fontSize: 12, color: '#64748B' }}>Home value: ${r.value.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>Remaining balance: ${r.balance.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
