import { useState } from 'react';

const ELIGIBLE_AREAS = [
  { name: 'Celina', county: 'Collin', eligible: true, note: 'Most of Celina qualifies — verify by address' },
  { name: 'Forney', county: 'Kaufman', eligible: true, note: 'Majority of city qualifies' },
  { name: 'Waxahachie', county: 'Ellis', eligible: true, note: 'Outer areas qualify, check inner limits' },
  { name: 'Midlothian', county: 'Ellis', eligible: true, note: 'Most areas qualify' },
  { name: 'Ennis', county: 'Ellis', eligible: true, note: 'Fully eligible' },
  { name: 'Corsicana', county: 'Navarro', eligible: true, note: 'Fully eligible' },
  { name: 'Weatherford', county: 'Parker', eligible: true, note: 'Most areas qualify' },
  { name: 'Kaufman', county: 'Kaufman', eligible: true, note: 'Fully eligible' },
  { name: 'Fate', county: 'Rockwall', eligible: false, note: 'Part of Rockwall metro — ineligible' },
  { name: 'Rockwall', county: 'Rockwall', eligible: false, note: 'Metro area — ineligible' },
  { name: 'Frisco', county: 'Collin', eligible: false, note: 'Urban area — ineligible' },
  { name: 'McKinney', county: 'Collin', eligible: false, note: 'Urban area — ineligible' },
];

const INCOME_LIMITS_2026: Record<number, number> = {
  1: 47900, 2: 54750, 3: 61600, 4: 68450, 5: 73950, 6: 79450, 7: 84950, 8: 90450,
};

export default function DFWUSDALoanGuide() {
  const [locationType, setLocationType] = useState('exurb');
  const [householdIncome, setHouseholdIncome] = useState(55000);
  const [familySize, setFamilySize] = useState(3);
  const [homePrice, setHomePrice] = useState(280000);
  const [showCalc, setShowCalc] = useState(false);

  const incomeLimit = INCOME_LIMITS_2026[familySize] || 68450;
  const incomeEligible = householdIncome <= incomeLimit;
  const locationEligible = locationType === 'exurb' || locationType === 'rural';
  const fullyEligible = incomeEligible && locationEligible;

  const USDA_RATE = 6.5;
  const USDA_GUARANTEE_FEE = 0.01;
  const USDA_ANNUAL_FEE = 0.0035;

  const loanAmt = homePrice;
  const upfrontFee = loanAmt * USDA_GUARANTEE_FEE;
  const totalLoan = loanAmt + upfrontFee;
  const mr = USDA_RATE / 100 / 12;
  const monthly = totalLoan * (mr * Math.pow(1 + mr, 360)) / (Math.pow(1 + mr, 360) - 1);
  const annualFee = loanAmt * USDA_ANNUAL_FEE / 12;
  const totalMonthly = monthly + annualFee;

  const convDown = homePrice * 0.10;
  const convLoan = homePrice - convDown;
  const convMr = 7.25 / 100 / 12;
  const convMonthly = convLoan * (convMr * Math.pow(1 + convMr, 360)) / (Math.pow(1 + convMr, 360) - 1);
  const convPMI = convLoan * 0.0085 / 12;
  const convTotal = convMonthly + convPMI;

  const locationOptions = [
    { value: 'urban', label: '🏙️ Urban DFW (Dallas/Ft Worth/Plano)' },
    { value: 'suburban', label: '🏘️ Suburban (Frisco/McKinney/Mansfield)' },
    { value: 'exurb', label: '🌾 Exurban (Celina/Forney/Waxahachie)' },
    { value: 'rural', label: '🌿 Rural (Kaufman/Ennis/Corsicana area)' },
  ];

  const features = [
    { icon: '💯', title: '100% Financing', desc: 'Zero down payment required — purchase with no cash for the home price.' },
    { icon: '📉', title: 'Low Guarantee Fee', desc: '1% upfront fee (vs 2.15% VA or 1.75% FHA MIP) added to loan balance.' },
    { icon: '🔄', title: '0.35% Annual Fee', desc: 'Annual fee of 0.35% — much lower than FHA MIP at 0.55%.' },
    { icon: '🏠', title: 'Site-Built Homes Only', desc: 'No manufactured/mobile homes. Must be primary residence in eligible area.' },
    { icon: '📋', title: 'Income Limits Apply', desc: 'Household income must be ≤115% of area median income for the county.' },
    { icon: '🌿', title: 'Property Condition', desc: 'Must be move-in ready. USDA will not allow deferred maintenance at closing.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🌾</div>
        <h1 style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '12px 0 8px' }}>DFW USDA Loan Guide 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
          100% financing for DFW exurbs — Celina, Forney, Waxahachie and surrounding rural areas qualify for zero-down USDA loans.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💵', label: 'Down Payment', value: '0%', sub: '100% financing available' },
            { icon: '📊', label: 'Guarantee Fee', value: '1.0%', sub: 'Added to loan balance' },
            { icon: '📅', label: 'Annual Fee', value: '0.35%', sub: 'Much less than FHA MIP' },
            { icon: '🏡', label: 'Max Income (4-person)', value: '$68,450', sub: 'DFW county limits 2026' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: 18, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, margin: '4px 0' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>DFW Eligible vs Ineligible Areas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 32 }}>
          {ELIGIBLE_AREAS.map(a => (
            <div key={a.name} style={{ background: 'white', borderRadius: 10, padding: 14, borderLeft: `4px solid ${a.eligible ? '#22C55E' : '#EF4444'}`, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</span>
                <span style={{ fontSize: 18 }}>{a.eligible ? '✅' : '❌'}</span>
              </div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{a.county} County</div>
              <div style={{ color: a.eligible ? '#16A34A' : '#DC2626', fontSize: 11, marginTop: 6 }}>{a.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>USDA Loan Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14, marginBottom: 32 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: 'white', borderRadius: 10, padding: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <h3 style={{ margin: '8px 0 6px', fontSize: 15, fontWeight: 700 }}>{f.title}</h3>
              <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 700 }}>🧮 USDA Eligibility & Payment Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Location Type</label>
              <select value={locationType} onChange={e => setLocationType(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '2px solid #E2E8F0', borderRadius: 8, fontSize: 13 }}>
                {locationOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Household Income: ${householdIncome.toLocaleString()}</label>
              <input type="range" min={25000} max={130000} step={2500} value={householdIncome} onChange={e => setHouseholdIncome(Number(e.target.value))} style={{ width: '100%' }} />
              <div style={{ fontSize: 12, marginTop: 4, color: incomeEligible ? '#16A34A' : '#DC2626' }}>
                Limit for {familySize}-person household: ${incomeLimit.toLocaleString()}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Family Size: {familySize}</label>
              <input type="range" min={1} max={8} step={1} value={familySize} onChange={e => setFamilySize(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Home Price: ${homePrice.toLocaleString()}</label>
              <input type="range" min={150000} max={500000} step={10000} value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
          <button onClick={() => setShowCalc(!showCalc)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            {showCalc ? 'Hide' : 'Check'} USDA Eligibility
          </button>
          {showCalc && (
            <div style={{ marginTop: 24 }}>
              <div style={{ background: fullyEligible ? '#F0FDF4' : '#FEF2F2', borderRadius: 10, padding: 16, marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>{fullyEligible ? '✅' : '❌'}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: fullyEligible ? '#16A34A' : '#DC2626', marginTop: 8 }}>
                  {fullyEligible ? 'Likely USDA Eligible!' : 'May Not Qualify'}
                </div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 6 }}>
                  {!locationEligible && 'Location is in an urban/suburban area not eligible for USDA. '}
                  {!incomeEligible && `Income $${householdIncome.toLocaleString()} exceeds ${familySize}-person limit of $${incomeLimit.toLocaleString()}.`}
                </div>
              </div>
              {fullyEligible && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
                  {[
                    { label: 'Down Payment', value: '$0', sub: '0% — zero down' },
                    { label: 'USDA Monthly', value: `$${Math.round(totalMonthly).toLocaleString()}/mo`, sub: `Incl. $${Math.round(annualFee)}/mo annual fee` },
                    { label: 'Conv. w/ 10% Down', value: `$${Math.round(convTotal).toLocaleString()}/mo`, sub: 'Incl. PMI' },
                    { label: 'Monthly Savings', value: `$${Math.round(convTotal - totalMonthly).toLocaleString()}/mo`, sub: 'vs conventional + down pmt' },
                    { label: 'Cash Saved Upfront', value: `$${convDown.toLocaleString()}`, sub: '10% down you keep' },
                  ].map(item => (
                    <div key={item.label} style={{ background: '#F8FAFC', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: '#0A1628' }}>{item.value}</div>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#F0FDF4', borderRadius: 12, padding: 20, border: '1px solid #BBF7D0' }}>
          <h3 style={{ margin: '0 0 8px', color: '#166534' }}>🌾 DFW USDA Strategy</h3>
          <p style={{ margin: 0, color: '#14532D', fontSize: 14 }}>
            As DFW suburbs grow, USDA eligible boundaries shrink. Celina and Forney are growing fast — boundaries could shift in 2027. Buy now while eligible. Use USDA eligibility map at eligibility.sc.egov.usda.gov to verify any address. USDA loans typically take 30-45 days vs 20-30 for conventional in DFW — budget extra time.
          </p>
        </div>
      </div>
    </div>
  );
}
