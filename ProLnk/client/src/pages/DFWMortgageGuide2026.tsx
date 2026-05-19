import { useState } from 'react';

export default function DFWMortgageGuide2026() {
  const [loanType, setLoanType] = useState('conventional');
  const [downPct, setDownPct] = useState(10);
  const [homePrice] = useState(385000);

  const rates: Record<string, number> = {
    conventional: 6.5,
    fha: 6.3,
    va: 6.1,
    usda: 6.2,
  };

  const minDown: Record<string, number> = {
    conventional: 3,
    fha: 3.5,
    va: 0,
    usda: 0,
  };

  const rate = rates[loanType] / 100 / 12;
  const effectiveDown = Math.max(downPct, minDown[loanType]);
  const principal = homePrice * (1 - effectiveDown / 100);
  const n = 360;
  const monthly = principal * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
  const pmi = loanType === 'conventional' && effectiveDown < 20 ? Math.round(principal * 0.008 / 12) : 0;
  const total = Math.round(monthly + pmi);

  const loanTypes = [
    { id: 'conventional', label: 'Conventional', icon: '🏦', minDown: '3%', note: 'Best credit required' },
    { id: 'fha', label: 'FHA', icon: '🏛', minDown: '3.5%', note: '580+ credit score' },
    { id: 'va', label: 'VA', icon: '🎖', minDown: '0%', note: 'Veterans only' },
    { id: 'usda', label: 'USDA', icon: '🌾', minDown: '0%', note: 'Rural areas' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Mortgage Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Current rates, loan types, and real payment estimates for DFW's $385K median home</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📊 2026 DFW Average Rates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {['6.2–6.8% 30yr Fixed','5.8–6.4% 15yr Fixed','6.0–6.6% FHA','5.9–6.3% VA'].map((r,i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#cbd5e1' }}>📈 {r}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>💡 Payment Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 20 }}>
            {loanTypes.map(lt => (
              <button key={lt.id} onClick={() => setLoanType(lt.id)} style={{ background: loanType === lt.id ? '#F5E642' : '#0A1628', color: loanType === lt.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: 14, cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: 20 }}>{lt.icon}</div>
                <div style={{ fontWeight: 700, marginTop: 4 }}>{lt.label}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>Min {lt.minDown} — {lt.note}</div>
              </button>
            ))}
          </div>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Down Payment: <strong style={{ color: '#F5E642' }}>{effectiveDown}%</strong></label>
          <input type="range" min={minDown[loanType]} max={30} value={Math.max(downPct, minDown[loanType])} onChange={e => setDownPct(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94a3b8' }}>Est. Monthly Payment on $385K Home</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#F5E642' }}>${total.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>P&I ${Math.round(monthly).toLocaleString()} {pmi > 0 ? `+ PMI $${pmi}` : '(no PMI)'} at {rates[loanType]}%</div>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📋 DTI Requirements</h2>
          {[{t:'Conventional',v:'Max 45% DTI (some lenders 50%)'},{t:'FHA',v:'Max 57% DTI with compensating factors'},{t:'VA',v:'No hard cap — residual income focus'},{t:'USDA',v:'Max 41% back-end DTI'}].map((item,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i<3?'1px solid #0A1628':'none' }}>
              <span style={{ color: '#cbd5e1' }}>{item.t}</span><span style={{ color: '#F5E642', fontSize: 13 }}>{item.v}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>ProLnk connects you with vetted contractors for post-closing home services in DFW.</p>
      </div>
    </div>
  );
}
