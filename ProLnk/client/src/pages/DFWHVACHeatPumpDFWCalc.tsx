import { useState } from 'react';

export default function DFWHVACHeatPumpDFWCalc() {
  const [homeSize, setHomeSize] = useState('');
  const [currentSystem, setCurrentSystem] = useState('');
  const [systemAge, setSystemAge] = useState('');
  const [showCalc, setShowCalc] = useState(false);

  const sizeCosts: Record<string, number> = {
    'Under 1,200 sqft': 6500,
    '1,200-1,800 sqft': 8000,
    '1,800-2,500 sqft': 10000,
    '2,500-3,500 sqft': 13000,
    '3,500+ sqft': 16000,
  };
  const gasSavings: Record<string, number> = { 'Gas furnace + AC': 780, 'Electric furnace + AC': 320, 'Old heat pump': 180 };

  const systemCost = sizeCosts[homeSize] || 0;
  const annualSavings = gasSavings[currentSystem] || 0;
  const taxCredit = Math.min(systemCost * 0.3, 2000);
  const oncorRebate = 200;
  const netCost = systemCost - taxCredit - oncorRebate;
  const breakeven = annualSavings > 0 ? Math.round(netCost / annualSavings * 10) / 10 : 0;
  const tenYearReturn = annualSavings * 10 - netCost;

  const homeSizes = ['Under 1,200 sqft', '1,200-1,800 sqft', '1,800-2,500 sqft', '2,500-3,500 sqft', '3,500+ sqft'];
  const systemTypes = ['Gas furnace + AC', 'Electric furnace + AC', 'Old heat pump'];
  const ages = ['Under 5 years', '5-10 years', '10-15 years', '15+ years'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          💰 DFW HVAC RESOURCE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Heat Pump Total Cost Calculator
        </h1>
        <p style={{ color: '#8899aa', fontSize: 16, marginBottom: 32 }}>
          Complete ROI analysis: system cost, federal 30% tax credit, Oncor rebate, annual savings vs your current system, and breakeven.
        </p>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Your DFW Home Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={homeSize} onChange={e => { setHomeSize(e.target.value); setShowCalc(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select size...</option>
                {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Current System</label>
              <select value={currentSystem} onChange={e => { setCurrentSystem(e.target.value); setShowCalc(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select system...</option>
                {systemTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Current System Age</label>
            <select value={systemAge} onChange={e => { setSystemAge(e.target.value); setShowCalc(false); }}
              style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select age...</option>
              {ages.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <button onClick={() => setShowCalc(true)} disabled={!homeSize || !currentSystem || !systemAge}
            style={{ background: homeSize && currentSystem && systemAge ? '#F5E642′ : '#1e3a5f', color: homeSize && currentSystem && systemAge ? '#0A1628' : '#4a6080', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: homeSize && currentSystem && systemAge ? 'pointer' : 'not-allowed' }}>
            Calculate My ROI →
          </button>
        </div>

        {showCalc && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'System + Install Cost', value: `$${systemCost.toLocaleString()}`, color: '#fff' },
                { label: 'Federal 30% Tax Credit', value: `-$${taxCredit.toLocaleString()}`, color: '#a0d4a0′ },
                { label: 'Oncor Rebate', value: `-$${oncorRebate}`, color: '#a0d4a0′ },
                { label: 'Your Net Cost', value: `$${netCost.toLocaleString()}`, color: '#F5E642′ },
              ].map((item, i) => (
                <div key={i} style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                  <div style={{ color: '#8899aa', fontSize: 12, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, textAlign: 'center', borderTop: '3px solid #F5E642′ }}>
                <div style={{ color: '#8899aa', fontSize: 12, marginBottom: 6 }}>Annual Savings vs {currentSystem}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${annualSavings}/yr</div>
                <div style={{ color: '#8899aa', fontSize: 12, marginTop: 4 }}>Breakeven: {breakeven} years</div>
              </div>
              <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, textAlign: 'center', borderTop: '3px solid #a0d4a0′ }}>
                <div style={{ color: '#8899aa', fontSize: 12, marginBottom: 6 }}>10-Year Net Benefit</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: tenYearReturn >= 0 ? '#a0d4a0′ : '#ff6b6b' }}>
                  {tenYearReturn >= 0 ? '+' : ''}${Math.abs(tenYearReturn).toLocaleString()}
                </div>
                <div style={{ color: '#8899aa', fontSize: 12, marginTop: 4 }}>After all costs and savings</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 DFW Heat Pump Cost Facts</h2>
          {[
            { icon: '🏛️', title: 'IRA Tax Credit (2023-2032)', desc: '30% of system cost, up to $2,000/year. File Form 5695 with your taxes. No income limit.' },
            { icon: '⚡', title: 'Oncor Rebate Program', desc: 'Oncor offers up to $200-400 for qualifying heat pump installs. Requires ENERGY STAR certification.' },
            { icon: '📊', title: 'DFW Gas vs Electric', desc: 'With Atmos Energy rates and Oncor electricity, most DFW homes save $500-900/yr switching from gas to heat pump.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 2 ? 16 : 0, padding: 16, background: '#152238', borderRadius: 8 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#8899aa', fontSize: 13 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
