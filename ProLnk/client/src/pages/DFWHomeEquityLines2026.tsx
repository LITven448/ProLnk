import { useState } from 'react';

export default function DFWHomeEquityLines2026() {
  const [homeValue, setHomeValue] = useState(450000);
  const [primaryMortgage, setPrimaryMortgage] = useState(280000);
  const [useCase, setUseCase] = useState('renovation');

  const maxLTV = 0.80;
  const maxAllLiens = Math.round(homeValue * maxLTV);
  const availableEquity = Math.max(0, maxAllLiens - primaryMortgage);
  const currentEquity = homeValue - primaryMortgage;
  const ltvPct = Math.round((primaryMortgage / homeValue) * 100);

  const recommendations: Record<string, { product: string; icon: string; reason: string }> = {
    renovation: { product: 'HELOC', icon: '🔧', reason: 'Draw as needed for phased projects — only pay interest on what you use' },
    consolidation: { product: 'Home Equity Loan', icon: '💳', reason: 'Fixed rate lump sum locks in predictable monthly payment' },
    refinance: { product: 'Cash-Out Refi', icon: '🏦', reason: 'Replaces primary mortgage — best if current rate beats your existing rate' },
    emergency: { product: 'HELOC', icon: '🚨', reason: 'Open a HELOC before you need it — $0 cost until drawn' },
  };
  const rec = recommendations[useCase];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK FINANCIAL GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏦 DFW Home Equity Lines & Loans Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Texas-specific rules — max 80% LTV across all liens combined</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {[
            { icon: '📊', label: 'HELOC', type: 'Variable Rate', detail: 'Draw as needed, revolving credit line', tag: 'Most Flexible' },
            { icon: '🔒', label: 'Home Equity Loan', type: 'Fixed Rate', detail: 'Lump sum, predictable payments', tag: 'Most Predictable' },
            { icon: '🔄', label: 'Cash-Out Refi', type: 'Replaces Mortgage', detail: 'New primary loan + cash out', tag: 'Lowest Rate' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'rgba(245,230,66,0.07)', border: '1px solid rgba(245,230,66,0.15)', borderRadius: 12, padding: '18px 14px' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{item.type}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>{item.detail}</div>
              <div style={{ background: 'rgba(245,230,66,0.15)', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: '#F5E642', display: 'inline-block' }}>{item.tag}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🧮 Your DFW Equity Calculator</h2>
          <div style={{ display: 'grid', gap: 20, marginBottom: 20 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Home Value: <strong style={{ color: '#fff' }}>${homeValue.toLocaleString()}</strong></span>
              <input type="range" min={150000} max={1500000} step={10000} value={homeValue} onChange={e => setHomeValue(+e.target.value)} style={{ accentColor: '#F5E642' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Primary Mortgage Balance: <strong style={{ color: '#fff' }}>${primaryMortgage.toLocaleString()}</strong></span>
              <input type="range" min={0} max={homeValue} step={10000} value={primaryMortgage} onChange={e => setPrimaryMortgage(+e.target.value)} style={{ accentColor: '#F5E642' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Use Case</span>
              <select value={useCase} onChange={e => setUseCase(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="renovation">🔧 Home Renovation</option>
                <option value="consolidation">💳 Debt Consolidation</option>
                <option value="refinance">🔄 Cash Out / Refinance</option>
                <option value="emergency">🚨 Emergency Backup Line</option>
              </select>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Current Equity', val: '$' + currentEquity.toLocaleString() },
              { label: 'Current LTV', val: ltvPct + '%' },
              { label: 'Available to Borrow', val: '$' + availableEquity.toLocaleString() },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '14px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642' }}>{item.val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(245,230,66,0.12)', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{rec.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Recommended: {rec.product}</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>{rec.reason}</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>⚠️ Texas 80% LTV Rule</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Texas law caps all mortgage liens combined at 80% of home value. This is more conservative than most states and protects homeowners — but limits how much equity you can access. Always calculate total liens before applying.
          </p>
        </div>
      </div>
    </div>
  );
}