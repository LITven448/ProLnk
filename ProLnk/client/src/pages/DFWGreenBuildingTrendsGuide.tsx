import { useState } from 'react';

const scenarios = [
  {
    homeType: 'Single Family (Built before 2000)',
    scope: 'Full HVAC replacement',
    trend: '🌡️ Heat Pump Conversion',
    roi: '35-50% energy savings, $8,000-12,000 federal + TX incentives available',
    detail: 'DFW summers make heat pumps ideal — efficient cooling plus backup heat for rare cold snaps. R-410A systems being phased out; new R-454B refrigerant systems now standard.',
  },
  {
    homeType: 'Single Family (Built before 2000)',
    scope: 'Roof replacement',
    trend: '☀️ Solar + Battery Bundle',
    roi: '26% federal ITC + TX no state income tax on savings. 8-12 yr payback in DFW sun',
    detail: 'DFW averages 234 sunny days/yr. Solar now breakeven in under 10 years. Pair with battery for grid independence during summer rolling outages.',
  },
  {
    homeType: 'New Construction (2020+)',
    scope: 'Full build',
    trend: '⚡ All-Electric Build',
    roi: 'Plano mandate drives 15-20% resale premium on all-electric homes vs gas equivalents',
    detail: 'Plano and Frisco now require EV-ready garages on new builds. All-electric homes qualify for better financing rates through green mortgage programs.',
  },
  {
    homeType: 'Condo / Townhome',
    scope: 'Interior renovation',
    trend: '🌿 Low-VOC + Sustainable Materials',
    roi: 'Health premium: 10-18% price uplift in DFW urban markets (Uptown, Knox-Henderson)',
    detail: 'Bamboo flooring, recycled glass counters, low-VOC paints — increasingly expected by millennial buyers who dominate DFW condo demand.',
  },
  {
    homeType: 'Investment Property',
    scope: 'Energy audit + upgrades',
    trend: '🏆 ENERGY STAR Certification',
    roi: '12-22% rent premium possible; qualifies for green financing and lower insurance premiums',
    detail: 'DFW landlords with ENERGY STAR properties see lower vacancy and tenant turnover. Certifications signal quality to eco-conscious renters.',
  },
];

export default function DFWGreenBuildingTrendsGuide() {
  const [homeType, setHomeType] = useState('');
  const [scope, setScope] = useState('');
  const [result, setResult] = useState<null | typeof scenarios[0]>(null);

  function calculate() {
    const found = scenarios.find(s => s.homeType === homeType && s.scope === scope)
      || scenarios.find(s => s.homeType === homeType)
      || scenarios[0];
    setResult(found);
  }

  const homeTypes = [...new Set(scenarios.map(s => s.homeType))];
  const scopes = [...new Set(scenarios.map(s => s.scope))];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW GREEN BUILDING</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>DFW Green Building Trends 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>
          DFW's extreme heat, abundant sun, and pro-growth municipalities have created a perfect environment for green building adoption. Heat pumps, solar-plus-battery systems, and all-electric mandates are reshaping what buyers expect — and what appraisers value.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🌡️', label: 'Heat Pump Adoption', value: '+180%', sub: 'DFW installs 2023-2026′ },
            { icon: '☀️', label: 'Solar Installations', value: '+240%', sub: 'DFW residential since 2022′ },
            { icon: '⚡', label: 'EV-Ready Homes', value: 'Required', sub: 'New builds in Plano, Frisco' },
            { icon: '🏆', label: 'LEED Commercial', value: '62 new', sub: 'DFW LEED projects in 2025′ },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: '20px 18px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '28px', marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏙️ DFW Municipality Green Leaders</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { city: 'Plano', note: 'All-electric mandate (2025)' },
              { city: 'Frisco', note: 'EV garage required, new builds' },
              { city: 'Dallas', note: 'LEED Gold for city projects' },
              { city: 'Fort Worth', note: 'Solar-ready code adopted' },
              { city: 'McKinney', note: 'Green incentive rebates active' },
              { city: 'Garland', note: 'Heat pump rebates via utility' },
            ].map(c => (
              <div key={c.city} style={{ backgroundColor: '#0d1b30', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.city}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🌿 ROI Calculator — DFW Green Trends</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>Find which green renovation delivers the best return for your DFW home specifically.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 14 }}>
                <option value=''>Select...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Renovation Scope</label>
              <select value={scope} onChange={e => setScope(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 14 }}>
                <option value=''>Select...</option>
                {scopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
            Find Best Green Trend
          </button>
          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '18px', border: '1px solid #F5E642′ }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{result.trend}</div>
                <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>{result.detail}</div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>💰 DFW ROI Estimate</div>
                <div style={{ color: '#94a3b8', fontSize: 15 }}>{result.roi}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
