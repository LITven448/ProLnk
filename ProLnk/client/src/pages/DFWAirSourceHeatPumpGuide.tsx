import { useState } from 'react';

const heatingTypes = ['Gas furnace', 'Electric resistance', 'Propane', 'Oil furnace', 'Old heat pump (10+ yrs)'];
const homeSizes = ['Under 1,200 sqft', '1,200–2,000 sqft', '2,000–3,000 sqft', 'Over 3,000 sqft'];
const dfwLocations = ['Dallas / Plano / Frisco', 'Fort Worth / Arlington', 'McKinney / Allen / Prosper', 'Denton / Lewisville'];

const heatPumpData: Record<string, Record<string, { feasibility: string; systemType: string; cost: string; annualSavings: string; payback: string; rebates: string }>> = {
  'Gas furnace': {
    'Under 1,200 sqft': { feasibility: 'High', systemType: 'Dual Fuel Hybrid (keeps gas backup)', cost: '$5,500–$9,000', annualSavings: '$300–$500', payback: '12–18 yrs', rebates: 'Oncor $100, 25C Fed Tax Credit 30%' },
    '1,200–2,000 sqft': { feasibility: 'High', systemType: 'Dual Fuel Hybrid', cost: '$7,000–$11,000', annualSavings: '$400–$700', payback: '12–17 yrs', rebates: 'Oncor $100–$200, 25C Fed Tax Credit 30%' },
    '2,000–3,000 sqft': { feasibility: 'High', systemType: 'Dual Fuel Hybrid (recommended)', cost: '$9,000–$14,000', annualSavings: '$500–$900', payback: '13–18 yrs', rebates: '25C Tax Credit 30% (up to $2,000)' },
    'Over 3,000 sqft': { feasibility: 'High', systemType: 'Dual Fuel Hybrid — may need 2-zone', cost: '$14,000–$22,000', annualSavings: '$700–$1,200', payback: '14–20 yrs', rebates: '25C Tax Credit 30% + Oncor rebate' },
  },
  'Electric resistance': {
    'Under 1,200 sqft': { feasibility: 'Excellent — top priority', systemType: 'All-Electric Heat Pump', cost: '$5,000–$8,500', annualSavings: '$600–$900', payback: '7–10 yrs', rebates: 'Oncor $200, 25C 30%, Inflation Reduction Act HEAR rebate up to $8,000′ },
    '1,200–2,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric Heat Pump', cost: '$6,500–$10,500', annualSavings: '$800–$1,200', payback: '7–10 yrs', rebates: 'IRA HEAR rebate up to $8,000 + 25C 30%' },
    '2,000–3,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric Heat Pump', cost: '$9,000–$14,500', annualSavings: '$1,000–$1,600', payback: '8–11 yrs', rebates: 'IRA HEAR up to $8,000 + 25C up to $2,000′ },
    'Over 3,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric Heat Pump (2 units likely)', cost: '$14,000–$22,000', annualSavings: '$1,300–$2,000', payback: '9–13 yrs', rebates: 'IRA + 25C on each system' },
  },
  'Propane': {
    'Under 1,200 sqft': { feasibility: 'Excellent', systemType: 'All-Electric Heat Pump', cost: '$5,000–$8,500', annualSavings: '$700–$1,100', payback: '6–9 yrs', rebates: 'IRA HEAR + 25C 30%' },
    '1,200–2,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric Heat Pump', cost: '$6,500–$10,500', annualSavings: '$900–$1,400', payback: '6–9 yrs', rebates: 'IRA HEAR up to $8,000 + 25C' },
    '2,000–3,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric or Dual Fuel', cost: '$9,000–$14,500', annualSavings: '$1,200–$1,800', payback: '7–10 yrs', rebates: 'IRA HEAR + 25C 30%' },
    'Over 3,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric (2 units)', cost: '$14,000–$22,000', annualSavings: '$1,500–$2,400', payback: '8–12 yrs', rebates: 'Full IRA + 25C stack' },
  },
  'Oil furnace': {
    'Under 1,200 sqft': { feasibility: 'Excellent — urgent upgrade', systemType: 'All-Electric Heat Pump', cost: '$5,000–$8,500', annualSavings: '$800–$1,200', payback: '5–8 yrs', rebates: 'IRA HEAR up to $8,000 + 25C 30%' },
    '1,200–2,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric Heat Pump', cost: '$6,500–$10,500', annualSavings: '$1,000–$1,600', payback: '6–9 yrs', rebates: 'IRA + 25C full stack' },
    '2,000–3,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric Heat Pump', cost: '$9,000–$14,500', annualSavings: '$1,300–$2,000', payback: '6–9 yrs', rebates: 'IRA HEAR + 25C 30%' },
    'Over 3,000 sqft': { feasibility: 'Excellent', systemType: 'All-Electric (2 units)', cost: '$14,000–$22,000', annualSavings: '$1,800–$2,800', payback: '7–11 yrs', rebates: 'Full IRA + 25C stack' },
  },
  'Old heat pump (10+ yrs)': {
    'Under 1,200 sqft': { feasibility: 'High — straightforward swap', systemType: 'New High-SEER2 Heat Pump', cost: '$4,500–$7,500', annualSavings: '$200–$400', payback: '12–20 yrs', rebates: '25C 30% (up to $2,000)' },
    '1,200–2,000 sqft': { feasibility: 'High', systemType: 'New High-SEER2 Heat Pump', cost: '$6,000–$10,000', annualSavings: '$300–$600', payback: '13–20 yrs', rebates: '25C 30% + Oncor rebate' },
    '2,000–3,000 sqft': { feasibility: 'High', systemType: 'New High-SEER2 Heat Pump', cost: '$8,500–$13,500', annualSavings: '$400–$800', payback: '14–20 yrs', rebates: '25C 30% up to $2,000′ },
    'Over 3,000 sqft': { feasibility: 'High', systemType: 'New High-SEER2 Heat Pump (2 units)', cost: '$13,000–$20,000', annualSavings: '$500–$1,000', payback: '15–22 yrs', rebates: '25C 30% per unit' },
  },
};

export default function DFWAirSourceHeatPumpGuide() {
  const [heating, setHeating] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const result = heating && size ? heatPumpData[heating]?.[size] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME EFFICIENCY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Air Source Heat Pump Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 12 }}>DFW winters rarely drop below 20°F — the sweet spot for heat pump efficiency. Here is why DFW is one of the best climates in the US for heat pumps.</p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '10px 16px', fontWeight: 700, fontSize: 14, marginBottom: 28, display: 'inline-block' }}>
          🌡️ Modern heat pumps operate efficiently down to 0°F — DFW's cold snaps are no problem.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '⚡', title: 'All-Electric', desc: 'Eliminates gas bill entirely. Best for homes with electric resistance or propane heat now.' },
            { icon: '🔥', title: 'Dual Fuel Hybrid', desc: 'Heat pump for mild days, gas furnace kicks in below ~35°F. Recommended for gas homes.' },
            { icon: '💵', title: 'IRA Rebates 2026', desc: 'Up to $8,000 HEAR rebate + 30% tax credit for qualifying households.' },
            { icon: '🏆', title: 'SEER2 22+', desc: 'Top-tier units hit SEER2 22+ — dramatically lower cooling bills in DFW summers.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0F2040', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Heat Pump Feasibility Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Current Heating', value: heating, setter: setHeating, options: heatingTypes },
              { label: 'Home Size', value: size, setter: setSize, options: homeSizes },
              { label: 'DFW Location', value: location, setter: setLocation, options: dfwLocations },
            ].map(f => (
              <div key={f.label}>
                <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <select value={f.value} onChange={e => f.setter(e.target.value)}
                  style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                  <option value=''>Select...</option>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 14 }}>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Feasibility</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{result.feasibility}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Recommended System</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15 }}>{result.systemType}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Install Cost</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{result.cost}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Annual Savings</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{result.annualSavings}</div></div>
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: '10px 14px', marginBottom: 10 }}>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>Simple Payback</div>
                <div style={{ color: '#A7F3D0', fontWeight: 700 }}>{result.payback}</div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>💰 Available Rebates: <span style={{ color: '#fff' }}>{result.rebates}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
