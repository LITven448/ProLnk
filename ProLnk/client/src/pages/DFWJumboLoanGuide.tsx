import { useState } from 'react';

export default function DFWJumboLoanGuide() {
  const [homePrice, setHomePrice] = useState(850000);
  const [creditScore, setCreditScore] = useState(740);
  const [downPct, setDownPct] = useState(20);
  const [showCalc, setShowCalc] = useState(false);

  const CONFORMING_LIMIT = 726200;
  const isJumbo = homePrice > CONFORMING_LIMIT;

  const jumboRate = creditScore >= 760 ? 7.0 : creditScore >= 720 ? 7.25 : creditScore >= 680 ? 7.625 : 8.0;
  const conformingRate = 7.0;

  const minJumboDown = homePrice > 2000000 ? 30 : homePrice > 1500000 ? 25 : 20;
  const effectiveDown = Math.max(downPct, isJumbo ? minJumboDown : 5);

  const downAmt = homePrice * (effectiveDown / 100);
  const loanAmt = homePrice - downAmt;
  const monthly = (r: number) => {
    const mr = r / 100 / 12;
    return loanAmt * (mr * Math.pow(1 + mr, 360)) / (Math.pow(1 + mr, 360) - 1);
  };
  const jumboMonthly = monthly(jumboRate);
  const conformingMonthly = monthly(conformingRate);
  const diff = jumboMonthly - conformingMonthly;

  const luxuryAreas = [
    { name: 'Highland Park', city: 'Dallas', medianPrice: '2.1M', note: 'Almost always jumbo' },
    { name: 'Southlake', city: 'Tarrant County', medianPrice: '1.3M', note: 'Majority jumbo' },
    { name: 'Westlake', city: 'Denton/Tarrant', medianPrice: '1.8M', note: 'Most listings jumbo' },
    { name: 'Colleyville', city: 'Tarrant County', medianPrice: '950K', note: 'Mix of conforming/jumbo' },
    { name: 'Flower Mound', city: 'Denton County', medianPrice: '750K', note: 'Near conforming limit' },
    { name: 'Coppell', city: 'Dallas County', medianPrice: '680K', note: 'Often conforming' },
  ];

  const requirements = [
    { icon: '💳', title: 'Credit Score 700+', desc: 'Most jumbo lenders want 720+; best rates at 760+. Under 680 is very difficult.' },
    { icon: '💰', title: '20%+ Down Payment', desc: 'Standard minimum. Some lenders allow 10% with higher rates and strong reserves.' },
    { icon: '🏦', title: '12-24 Month Reserves', desc: 'Must show 12-24 months of PITI in liquid assets after closing.' },
    { icon: '📋', title: 'DTI Under 43%', desc: 'Stricter than conforming. Ideal under 36%. Income documentation is rigorous.' },
    { icon: '📑', title: 'Full Doc Required', desc: 'Bank statements, tax returns (2 years), W-2s. No stated income jumbo loans.' },
    { icon: '🔍', title: 'Two Appraisals', desc: 'Jumbo loans over $1.5M often require two independent appraisals in DFW.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏰</div>
        <h1 style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '12px 0 8px' }}>DFW Jumbo Loan Guide 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
          Financing Southlake, Highland Park, and Westlake luxury homes — everything above the $726,200 conforming limit.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#EFF6FF', borderRadius: 12, padding: 24, marginBottom: 32, border: '2px solid #BFDBFE' }}>
          <h2 style={{ color: '#1E40AF', margin: '0 0 8px', fontSize: 20 }}>📏 2026 Conforming Limit: $726,200</h2>
          <p style={{ margin: 0, color: '#3B82F6', fontSize: 15 }}>
            Any DFW home purchase above $726,200 requires a jumbo loan. With median prices in Southlake at $1.3M+, roughly 40% of luxury DFW purchases are jumbo.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>DFW Luxury Markets — Jumbo Impact</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 32 }}>
          {luxuryAreas.map(a => (
            <div key={a.name} style={{ background: 'white', borderRadius: 10, padding: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{a.name}</div>
              <div style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>{a.city}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', margin: '8px 0 4px' }}>{a.medianPrice}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{a.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Jumbo Loan Requirements</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 32 }}>
          {requirements.map(r => (
            <div key={r.title} style={{ background: 'white', borderRadius: 10, padding: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <h3 style={{ margin: '8px 0 6px', fontSize: 15, fontWeight: 700 }}>{r.title}</h3>
              <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 700 }}>🧮 Jumbo vs Conforming Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Home Price: ${homePrice.toLocaleString()}</label>
              <input type="range" min={400000} max={3000000} step={50000} value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} style={{ width: '100%' }} />
              <div style={{ fontSize: 12, marginTop: 4, color: isJumbo ? '#DC2626' : '#16A34A' }}>
                {isJumbo ? '⚠️ Jumbo loan required' : '✅ Conforming loan eligible'}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Credit Score: {creditScore}</label>
              <input type="range" min={620} max={820} step={10} value={creditScore} onChange={e => setCreditScore(Number(e.target.value))} style={{ width: '100%' }} />
              <div style={{ fontSize: 12, marginTop: 4, color: '#64748B' }}>Jumbo rate: {jumboRate}%</div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Down Payment: {effectiveDown}%{effectiveDown > downPct ? " (min required)" : ""}</label>
              <input type="range" min={10} max={40} step={5} value={downPct} onChange={e => setDownPct(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
          <button onClick={() => setShowCalc(!showCalc)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            {showCalc ? 'Hide' : 'Calculate'} Payments
          </button>
          {showCalc && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
              {[
                { label: 'Loan Type', value: isJumbo ? 'JUMBO' : 'Conforming' },
                { label: 'Down Payment', value: `$${Math.round(downAmt).toLocaleString()}` },
                { label: 'Loan Amount', value: `$${Math.round(loanAmt).toLocaleString()}` },
                { label: 'Jumbo Monthly', value: `$${Math.round(jumboMonthly).toLocaleString()}` },
                { label: 'Rate Premium', value: isJumbo ? `+${(jumboRate - conformingRate).toFixed(2)}%` : 'N/A', highlight: isJumbo },
                { label: 'Monthly Premium', value: isJumbo ? `+$${Math.round(diff).toLocaleString()}` : '$0', highlight: isJumbo },
              ].map(item => (
                <div key={item.label} style={{ background: item.highlight ? '#FEF2F2' : '#F8FAFC', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: item.highlight ? '#DC2626' : '#0A1628' }}>{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F0FDF4', borderRadius: 12, padding: 20, border: '1px solid #BBF7D0' }}>
          <h3 style={{ margin: '0 0 8px', color: '#166534' }}>💡 DFW Jumbo Strategy</h3>
          <p style={{ margin: 0, color: '#14532D', fontSize: 14 }}>
            Portfolio lenders (local banks, credit unions) often offer better jumbo rates than national lenders in DFW. First Financial Bank, Prosperity Bank, and Veritex Community Bank are known for competitive jumbo programs. Consider a 5/1 or 7/1 ARM if you plan to sell or refinance within 7 years — luxury DFW appreciation averages 6-8% annually.
          </p>
        </div>
      </div>
    </div>
  );
}
