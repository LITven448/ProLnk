import { useState } from 'react';

const PROGRAMS = [
  {
    name: 'City of Dallas HOME Program',
    area: 'dallas',
    maxIncome: { 1: 45000, 2: 51450, 3: 57900, 4: 64350, 5: 69500, 6: 74650 },
    assistance: 'Up to $20,000 forgivable loan for down payment/closing costs',
    type: 'Down Payment',
    contact: 'dallashousingpolicy.org',
  },
  {
    name: 'Dallas CDBG Homebuyer Assistance',
    area: 'dallas',
    maxIncome: { 1: 54050, 2: 61750, 3: 69450, 4: 77150, 5: 83350, 6: 89550 },
    assistance: 'Up to $14,999 in down payment assistance',
    type: 'Down Payment',
    contact: 'dallashousingpolicy.org',
  },
  {
    name: 'Tarrant County Housing Assistance',
    area: 'tarrant',
    maxIncome: { 1: 43300, 2: 49500, 3: 55650, 4: 61800, 5: 66800, 6: 71750 },
    assistance: '$5,000-$14,999 down payment assistance for first-time buyers',
    type: 'Down Payment',
    contact: 'tarrantcounty.com/housing',
  },
  {
    name: 'Texas Department of Housing (TDHCA)',
    area: 'all',
    maxIncome: { 1: 70000, 2: 80000, 3: 90000, 4: 100000, 5: 108000, 6: 116000 },
    assistance: 'My First Texas Home: 30yr fixed + up to 5% DPA',
    type: 'Down Payment + Rate',
    contact: 'tdhca.state.tx.us',
  },
  {
    name: 'Collin County Housing Assistance',
    area: 'collin',
    maxIncome: { 1: 57750, 2: 66000, 3: 74250, 4: 82450, 5: 89050, 6: 95650 },
    assistance: 'Up to $10,000 deferred second mortgage for qualified buyers',
    type: 'Down Payment',
    contact: 'collincountytx.gov/cdbg',
  },
  {
    name: 'Denton County First-Time Buyer',
    area: 'denton',
    maxIncome: { 1: 54600, 2: 62400, 3: 70200, 4: 78000, 5: 84250, 6: 90500 },
    assistance: 'Up to $8,000 deferred payment loan for down payment',
    type: 'Down Payment',
    contact: 'dentoncounty.gov/housing',
  },
];

export default function DFWHARProgramsGuide() {
  const [householdSize, setHouseholdSize] = useState(3);
  const [annualIncome, setAnnualIncome] = useState(65000);
  const [area, setArea] = useState('all');
  const [showResults, setShowResults] = useState(false);

  const AMI_2026 = { 1: 70150, 2: 80150, 3: 90200, 4: 100200, 5: 108250, 6: 116250 };
  const amiPct = Math.round((annualIncome / AMI_2026[householdSize as keyof typeof AMI_2026]) * 100);

  const qualifying = PROGRAMS.filter(p => {
    const limit = p.maxIncome[householdSize as keyof typeof p.maxIncome];
    const areaMatch = p.area === 'all' || p.area === area;
    return annualIncome <= limit && areaMatch;
  });

  const areaOptions = [
    { value: 'all', label: 'Any DFW Area' },
    { value: 'dallas', label: 'Dallas (City/County)' },
    { value: 'tarrant', label: 'Tarrant County' },
    { value: 'collin', label: 'Collin County' },
    { value: 'denton', label: 'Denton County' },
  ];

  const stats = [
    { icon: '🏙️', label: 'Dallas HOME Program', value: 'Up to $20K', sub: 'Forgivable after 5 years' },
    { icon: '🏘️', label: 'Tarrant County HAP', value: 'Up to $14,999', sub: 'For first-time buyers' },
    { icon: '🤠', label: 'TDHCA Statewide', value: 'Up to 5% DPA', sub: 'Plus below-market rate' },
    { icon: '📊', label: 'Income Limit', value: '≤ 80% AMI', sub: 'Most programs require' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '12px 0 8px' }}>DFW Housing Assistance Programs 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
          City, county, and state programs that help DFW buyers with down payments, closing costs, and below-market rates.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: 18, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 30 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, margin: '4px 0′ }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8′ }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 700 }}>🔍 Find Your Programs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Household Size: {householdSize} {householdSize === 1 ? 'person' : 'people'}</label>
              <input type="range" min={1} max={6} step={1} value={householdSize} onChange={e => setHouseholdSize(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Annual Income: ${annualIncome.toLocaleString()}</label>
              <input type="range" min={20000} max={150000} step={2500} value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} style={{ width: '100%' }} />
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{amiPct}% of Area Median Income</div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Target Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '2px solid #E2E8F0', borderRadius: 8, fontSize: 14 }}>
                {areaOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(!showResults)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            {showResults ? 'Hide' : 'Show'} Programs I Qualify For
          </button>
          {showResults && (
            <div style={{ marginTop: 24 }}>
              {qualifying.length === 0 ? (
                <div style={{ background: '#FEF2F2', borderRadius: 10, padding: 20, color: '#DC2626', textAlign: 'center' }}>
                  ❌ Income exceeds limits for selected area programs. Try statewide programs or conventional loans.
                </div>
              ) : (
                <div>
                  <div style={{ color: '#16A34A', fontWeight: 700, marginBottom: 14 }}>✅ {qualifying.length} program{qualifying.length > 1 ? 's' : ''} found for your situation</div>
                  {qualifying.map(p => (
                    <div key={p.name} style={{ background: '#F0FDF4', borderRadius: 10, padding: 16, marginBottom: 12, borderLeft: '4px solid #22C55E' }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                      <div style={{ color: '#15803D', fontSize: 14, margin: '6px 0′ }}>{p.assistance}</div>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748B' }}>
                        <span>Type: {p.type}</span>
                        <span>Contact: {p.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#FEF3C7', borderRadius: 12, padding: 20, border: '1px solid #FDE68A' }}>
          <h3 style={{ margin: '0 0 8px', color: '#92400E' }}>⚡ Application Tips for DFW Programs</h3>
          <ul style={{ margin: 0, color: '#78350F', fontSize: 14, paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>Dallas HOME funds are first-come, first-served and typically exhaust within weeks of new funding rounds</li>
            <li style={{ marginBottom: 6 }}>Most programs require HUD-approved homebuyer counseling (8-hour course) before approval</li>
            <li style={{ marginBottom: 6 }}>TDHCA My First Texas Home can be combined with Mortgage Credit Certificate for additional savings</li>
            <li>Keep tax returns, pay stubs, and bank statements for the last 2 years ready before applying</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
