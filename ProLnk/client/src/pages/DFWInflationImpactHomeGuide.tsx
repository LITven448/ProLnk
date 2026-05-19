import { useState } from 'react';

const scopes = [
  {
    scope: 'Kitchen Remodel (Full)',
    baselineCost: 35000,
    inflationAdj: 47800,
    increase: '+37%',
    drivers: 'Cabinet materials +42%, appliances +28%, labor +39%',
    strategy: 'Lock in contractor now with fixed-price contract. Source cabinets immediately — lead times 14-20 weeks. Consider IKEA cabinets + custom fronts to reduce cost 30%.',
  },
  {
    scope: 'Roof Replacement',
    baselineCost: 12000,
    inflationAdj: 16800,
    increase: '+40%',
    drivers: 'Asphalt shingles +38%, underlayment +44%, labor +36%',
    strategy: 'Get 3 quotes — DFW roofing market has competition. Schedule fall installation when demand drops 20%. Metal roofing now cost-competitive at 50yr lifespan.',
  },
  {
    scope: 'HVAC Replacement',
    baselineCost: 8500,
    inflationAdj: 11400,
    increase: '+34%',
    drivers: 'Equipment +29%, refrigerant +55%, labor +31%',
    strategy: 'Budget for heat pump premium but capture $8,000+ in federal ITC credits. Off-season install (Oct-Feb) saves 10-15% on labor.',
  },
  {
    scope: 'Bathroom Remodel',
    baselineCost: 14000,
    inflationAdj: 19600,
    increase: '+40%',
    drivers: 'Tile +45%, fixtures +33%, plumbing labor +38%',
    strategy: 'Tile is the biggest wildcard. Buy 20% extra upfront. Porcelain alternatives to natural stone save 35-50% with similar durability in DFW humidity.',
  },
  {
    scope: 'Exterior Paint',
    baselineCost: 4500,
    inflationAdj: 5900,
    increase: '+31%',
    drivers: 'Paint materials +28%, labor +33%',
    strategy: 'Spring and fall are off-peak — schedule then for 10-15% labor savings. Two-coat application critical in DFW UV environment. Sherwin-Williams Emerald costs more but lasts 15 years vs 7.',
  },
  {
    scope: 'Foundation Repair',
    baselineCost: 9000,
    inflationAdj: 12100,
    increase: '+35%',
    drivers: 'Steel piers +30%, concrete +40%, labor +34%',
    strategy: 'DFW clay soil makes this an expected homeownership cost. Budget annually. Get a 25-year transferable warranty — it adds resale value in DFW specifically.',
  },
];

export default function DFWInflationImpactHomeGuide() {
  const [selectedScope, setSelectedScope] = useState('');
  const [result, setResult] = useState<null | typeof scopes[0]>(null);

  function calculate() {
    const found = scopes.find(s => s.scope === selectedScope);
    setResult(found || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW ECONOMICS</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>Inflation Impact on DFW Homeownership — 2026 Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>
          Since 2021, home maintenance and renovation costs have risen 25-40% across most categories in DFW. Materials, labor, and supply chain pressure have permanently reset the cost baseline. Here's how to budget realistically — and how your home is also your best inflation hedge.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '📈', label: 'Materials Inflation', value: '+38%', sub: 'Building materials 2021-2026′ },
            { icon: '👷', label: 'Labor Inflation', value: '+34%', sub: 'Skilled trades wage growth DFW' },
            { icon: '🏠', label: 'Home Value Hedge', value: '+52%', sub: 'DFW median home value 2021-2026′ },
            { icon: '🔧', label: 'DIY Savings Gap', value: '+28%', sub: 'DIY vs contractor cost differential widened' },
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
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏦 Your Home as an Inflation Hedge</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🔒', title: 'Fixed-Rate Mortgage = Inflation Lock', desc: 'Your largest homeownership cost — the mortgage — is fixed. As inflation erodes dollar value, your real payment gets cheaper every year while renters face annual increases.' },
              { icon: '🏗️', title: 'Maintenance Deferral Costs More', desc: 'A $500 roof repair in 2021 costs $680 in 2026. Deferring maintenance compounds cost inflation. Fix issues when small.' },
              { icon: '📊', title: 'DFW Appreciation Outpaces Inflation', desc: 'DFW homes appreciated 52% since 2021. CPI rose 24% in the same period. Real estate wealth creation in DFW has exceeded inflation by 28 percentage points.' },
              { icon: '⚒️', title: 'DIY Savings Are Real and Growing', desc: 'As contractor labor costs rise, the relative value of homeowner DIY increases. Basic skills save $3,000-8,000/year in DFW. YouTube tutorials pay dividends.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>💰 Inflation-Adjusted Cost Estimator</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>See what your renovation actually costs in 2026 vs pre-inflation baselines — plus how to budget for continued increases.</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Renovation Scope</label>
            <select value={selectedScope} onChange={e => setSelectedScope(e.target.value)}
              style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 15 }}>
              <option value=''>Select project scope...</option>
              {scopes.map(s => <option key={s.scope} value={s.scope}>{s.scope}</option>)}
            </select>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
            Get Inflation-Adjusted Estimate
          </button>
          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '18px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>2021 Baseline Cost</div>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>${result.baselineCost.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>Inflation Increase</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#ef4444′ }}>{result.increase}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>2026 DFW Cost</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642′ }}>${result.inflationAdj.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📊 Cost Drivers</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{result.drivers}</div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🧠 Budget Strategy for DFW</div>
                <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>{result.strategy}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
