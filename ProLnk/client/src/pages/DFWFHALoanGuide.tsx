import { useState } from 'react';

export default function DFWFHALoanGuide() {
  const [creditScore, setCreditScore] = useState(640);
  const [homePrice, setHomePrice] = useState(320000);
  const [showCalc, setShowCalc] = useState(false);

  const FHA_LIMIT_2026 = 472030;
  const FHA_RATE = 7.0;
  const CONV_RATE = 7.25;
  const FHA_MIP_UPFRONT = 0.0175;
  const FHA_MIP_ANNUAL = 0.0055;

  const exceedsLimit = homePrice > FHA_LIMIT_2026;
  const fhaDown = creditScore >= 580 ? 0.035 : 0.10;
  const fhaDownAmt = homePrice * fhaDown;
  const fhaLoan = homePrice - fhaDownAmt;
  const fhaUpfrontMIP = fhaLoan * FHA_MIP_UPFRONT;
  const fhaTotalLoan = fhaLoan + fhaUpfrontMIP;
  const fhaMonthly = fhaTotalLoan * (FHA_RATE/100/12) * Math.pow(1+FHA_RATE/100/12, 360) / (Math.pow(1+FHA_RATE/100/12, 360)-1);
  const fhaAnnualMIP = fhaLoan * FHA_MIP_ANNUAL / 12;
  const fhaTotalMonthly = fhaMonthly + fhaAnnualMIP;

  const convDown = creditScore >= 620 ? 0.05 : 0.20;
  const convDownAmt = homePrice * convDown;
  const convLoan = homePrice - convDownAmt;
  const convMonthly = convLoan * (CONV_RATE/100/12) * Math.pow(1+CONV_RATE/100/12, 360) / (Math.pow(1+CONV_RATE/100/12, 360)-1);
  const convPMI = convLoan > homePrice * 0.8 ? convLoan * 0.0085 / 12 : 0;
  const convTotal = convMonthly + convPMI;

  const better = fhaTotalMonthly < convTotal ? 'FHA' : 'Conventional';
  const saving = Math.abs(fhaTotalMonthly - convTotal);

  const requirements = [
    { icon: '💳', title: '580+ Credit = 3.5% Down', desc: 'Score 580-619 qualifies but expect higher rates. 500-579 requires 10% down.' },
    { icon: '📋', title: 'Debt-to-Income ≤ 43%', desc: 'FHA allows up to 57% DTI with compensating factors (reserves, high credit, etc.).' },
    { icon: '🏠', title: 'Primary Residence Only', desc: 'FHA loans cannot be used for investment properties or vacation homes.' },
    { icon: '🔍', title: 'FHA Appraisal Required', desc: 'FHA appraisers check for safety issues. DFW older homes (pre-1978) need lead paint disclosure.' },
    { icon: '📅', title: '2-Year Employment History', desc: 'Must show stable employment or self-employment income for at least 2 years.' },
    { icon: '💰', title: 'MIP for Life (if <10% down)', desc: 'Annual MIP stays for loan life unless you put 10%+ down (then drops after 11 years).' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏡</div>
        <h1 style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '12px 0 8px' }}>DFW FHA Loan Guide 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
          3.5% down, flexible credit requirements — FHA loans open DFW homeownership to thousands of buyers.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏙️', label: '2026 DFW FHA Limit', value: '$472,030', sub: 'Single-family home' },
            { icon: '⬇️', label: 'Min Down Payment', value: '3.5%', sub: 'With 580+ credit score' },
            { icon: '📊', label: 'Upfront MIP', value: '1.75%', sub: 'Added to loan balance' },
            { icon: '📆', label: 'Annual MIP', value: '0.55%', sub: 'Paid monthly (~$146/$320K)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: 20, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 32 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', margin: '4px 0' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>FHA Requirements</h2>
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
          <h2 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 700 }}>🧮 FHA vs Conventional Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Credit Score: {creditScore}</label>
              <input type="range" min={500} max={800} step={10} value={creditScore} onChange={e => setCreditScore(Number(e.target.value))} style={{ width: '100%' }} />
              <div style={{ fontSize: 12, color: creditScore >= 580 ? '#16A34A' : '#DC2626', marginTop: 4 }}>
                {creditScore >= 580 ? '✅ Qualifies for 3.5% down' : '⚠️ Requires 10% down'}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Home Price: ${homePrice.toLocaleString()}</label>
              <input type="range" min={150000} max={600000} step={10000} value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} style={{ width: '100%' }} />
              {exceedsLimit && <div style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>⚠️ Exceeds DFW FHA limit of $472,030</div>}
            </div>
          </div>
          <button onClick={() => setShowCalc(!showCalc)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            {showCalc ? 'Hide' : 'Compare'} FHA vs Conventional
          </button>
          {showCalc && !exceedsLimit && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { type: 'FHA Loan', down: fhaDownAmt, monthly: fhaTotalMonthly, note: `Incl. $${Math.round(fhaAnnualMIP)}/mo MIP`, color: better === 'FHA' ? '#16A34A' : '#64748B' },
                { type: 'Conventional', down: convDownAmt, monthly: convTotal, note: convPMI > 0 ? `Incl. $${Math.round(convPMI)}/mo PMI` : 'No PMI', color: better === 'Conventional' ? '#16A34A' : '#64748B' },
              ].map(item => (
                <div key={item.type} style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, borderTop: `4px solid ${item.color}` }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{item.type} {better === item.type.split(' ')[0] ? '⭐ Better' : ''}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>Down Payment</div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>${Math.round(item.down).toLocaleString()}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 10 }}>Monthly Total</div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>${Math.round(item.monthly).toLocaleString()}/mo</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{item.note}</div>
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1', background: '#F0FDF4', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <strong style={{ color: '#16A34A' }}>{better} saves ${Math.round(saving).toLocaleString()}/mo</strong>
                <span style={{ color: '#64748B' }}> · ${Math.round(saving * 12).toLocaleString()}/yr · ${Math.round(saving * 120).toLocaleString()} over 10 years</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 20, border: '1px solid #FDE68A' }}>
          <h3 style={{ margin: '0 0 8px', color: '#92400E' }}>🏠 DFW Older Home Tip</h3>
          <p style={{ margin: 0, color: '#78350F', fontSize: 14 }}>
            Many DFW homes built before 1978 (especially in Oak Cliff, East Dallas, North Fort Worth) require lead paint disclosure for FHA loans. FHA appraisers also flag deferred maintenance. Consider neighborhoods like Frisco, McKinney, or Little Elm where newer builds pass FHA inspection easily.
          </p>
        </div>
      </div>
    </div>
  );
}
