import { useState } from 'react';

const FUNDING_FEE_TABLE: Record<string, Record<string, number>> = {
  'first': { 'full': 2.15, 'down5': 1.5, 'down10': 1.25 },
  'subsequent': { 'full': 3.3, 'down5': 1.5, 'down10': 1.25 },
  'reserve': { 'full': 2.15, 'down5': 1.5, 'down10': 1.25 },
  'disabled': { 'full': 0, 'down5': 0, 'down10': 0 },
};

export default function DFWVALoanGuide() {
  const [usage, setUsage] = useState('first');
  const [homePrice, setHomePrice] = useState(350000);
  const [downPct, setDownPct] = useState(0);
  const [showCalc, setShowCalc] = useState(false);

  const rate = 6.75;
  const convRate = 7.25;
  const convDown = 0.10;

  function getFeeKey(pct: number) {
    if (pct >= 10) return 'down10';
    if (pct >= 5) return 'down5';
    return 'full';
  }

  const feeKey = getFeeKey(downPct);
  const feePct = FUNDING_FEE_TABLE[usage][feeKey];
  const downAmt = homePrice * (downPct / 100);
  const loanAmt = homePrice - downAmt;
  const fundingFee = loanAmt * (feePct / 100);
  const totalLoan = loanAmt + fundingFee;
  const monthlyRate = rate / 100 / 12;
  const months = 360;
  const vaMonthly = totalLoan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const convLoanAmt = homePrice * (1 - convDown);
  const convMonthlyRate = convRate / 100 / 12;
  const convMonthly = convLoanAmt * (convMonthlyRate * Math.pow(1 + convMonthlyRate, months)) / (Math.pow(1 + convMonthlyRate, months) - 1);
  const convPMI = convLoanAmt * 0.0085 / 12;
  const convTotal = convMonthly + convPMI;
  const monthlySavings = convTotal - vaMonthly;
  const lifetimeSavings = monthlySavings * 360;

  const benefits = [
    { icon: '🏛️', title: 'No Down Payment', desc: 'Purchase with 0% down — keep your savings for reserves or improvements.' },
    { icon: '🚫', title: 'No PMI Ever', desc: 'VA loans never require private mortgage insurance, saving -300/mo vs conventional.' },
    { icon: '📉', title: 'Competitive Rates', desc: 'VA rates typically run 0.25-0.75% below conventional due to government backing.' },
    { icon: '🔄', title: 'Reusable Benefit', desc: 'Use your VA entitlement multiple times throughout your life — it restores after payoff.' },
    { icon: '🛡️', title: 'Foreclosure Protection', desc: 'VA has dedicated loan technicians to help veterans avoid foreclosure.' },
    { icon: '✅', title: 'No Prepayment Penalty', desc: 'Pay off early without fees — great for the fast-appreciating DFW market.' },
  ];

  const dfwBases = [
    { name: 'Naval Air Station Fort Worth (JRB)', city: 'Fort Worth', branch: 'Navy/Air Force' },
    { name: 'Naval Air Station Dallas (closed, legacy)', city: 'Grand Prairie', branch: 'Navy (reserve)' },
    { name: 'Dyess Air Force Base', city: 'Abilene (near DFW)', branch: 'Air Force' },
    { name: 'Carswell Field', city: 'Fort Worth', branch: 'Air Force Reserve' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🎖️</div>
        <h1 style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '12px 0 8px' }}>DFW VA Loan Guide 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
          Everything DFW veterans need to know about VA home loans — from JRB Fort Worth to Carswell Field and beyond.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#EFF6FF', border: '2px solid #BFDBFE', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#1E40AF', margin: '0 0 12px', fontSize: 20 }}>🏠 DFW Military Presence</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {dfwBases.map(b => (
              <div key={b.name} style={{ background: 'white', borderRadius: 8, padding: 14, borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0A1628′ }}>{b.name}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{b.city} · {b.branch}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>VA Loan Benefits</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
          {benefits.map(b => (
            <div key={b.title} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28 }}>{b.icon}</div>
              <h3 style={{ margin: '10px 0 6px', fontSize: 16, fontWeight: 700 }}>{b.title}</h3>
              <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 700 }}>🧮 VA Loan Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Service History</label>
              <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '2px solid #E2E8F0', borderRadius: 8, fontSize: 14 }}>
                <option value="first">First-time VA use</option>
                <option value="subsequent">Subsequent VA use</option>
                <option value="reserve">Guard / Reserve</option>
                <option value="disabled">10%+ Service Disability</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Home Price: ${homePrice.toLocaleString()}</label>
              <input type="range" min={200000} max={900000} step={10000} value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Down Payment: {downPct}%</label>
              <input type="range" min={0} max={20} step={5} value={downPct} onChange={e => setDownPct(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
          <button onClick={() => setShowCalc(!showCalc)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            {showCalc ? 'Hide' : 'Calculate'} My VA Savings
          </button>
          {showCalc && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { label: 'VA Funding Fee', value: feePct === 0 ? 'WAIVED ✅' : `${feePct}% ($${Math.round(fundingFee).toLocaleString()})` },
                { label: 'VA Monthly Payment', value: `$${Math.round(vaMonthly).toLocaleString()}/mo` },
                { label: 'Conventional + PMI', value: `$${Math.round(convTotal).toLocaleString()}/mo` },
                { label: 'Monthly Savings', value: `$${Math.round(monthlySavings).toLocaleString()}/mo`, highlight: true },
                { label: 'Lifetime Savings', value: `$${Math.round(lifetimeSavings).toLocaleString()}`, highlight: true },
              ].map(item => (
                <div key={item.label} style={{ background: item.highlight ? '#0A1628′ : '#F8FAFC', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                  <div style={{ fontSize: 12, color: item.highlight ? '#F5E642′ : '#64748B', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: item.highlight ? '#F5E642′ : '#0A1628' }}>{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 20, border: '1px solid #FDE68A' }}>
          <h3 style={{ margin: '0 0 8px', color: '#92400E' }}>⚠️ DFW VA Appraisal Note</h3>
          <p style={{ margin: 0, color: '#78350F', fontSize: 14 }}>
            VA appraisals in DFW are stricter than conventional. Properties must meet Minimum Property Requirements (MPRs): working HVAC, no peeling paint, functional plumbing, and roof with 2+ years life. In the competitive DFW market, some sellers prefer conventional buyers. Consider an escalation clause or pre-offer VA inspection.
          </p>
        </div>
      </div>
    </div>
  );
}
