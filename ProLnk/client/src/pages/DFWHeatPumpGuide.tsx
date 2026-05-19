import { useState } from 'react';

const systemTypes = ['Gas Furnace + AC', 'Electric Resistance + AC', 'Older Heat Pump'];
const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–3,500 sq ft', '3,500+ sq ft'];
const rateTypes = ['Low Gas + Low Electric', 'Low Gas + High Electric', 'High Gas + Low Electric', 'All Electric (no gas)'];

function calcSavings(system: string, size: string, rates: string) {
  const baseCost: Record<string, number> = {
    'Gas Furnace + AC': 2200,
    'Electric Resistance + AC': 3100,
    'Older Heat Pump': 2600,
  };
  const sizeMultiplier: Record<string, number> = {
    'Under 1,500 sq ft': 0.7,
    '1,500–2,500 sq ft': 1.0,
    '2,500–3,500 sq ft': 1.35,
    '3,500+ sq ft': 1.75,
  };
  const rateAdj: Record<string, number> = {
    'Low Gas + Low Electric': 0.15,
    'Low Gas + High Electric': 0.28,
    'High Gas + Low Electric': 0.32,
    'All Electric (no gas)': 0.38,
  };
  const current = Math.round(baseCost[system] * sizeMultiplier[size]);
  const heatPumpCost = Math.round(current * (1 - rateAdj[rates]));
  const annualSave = current - heatPumpCost;
  const installCost = Math.round(5000 + sizeMultiplier[size] * 2500);
  const payback = Math.round(installCost / annualSave * 10) / 10;
  const taxCredit = Math.min(Math.round(installCost * 0.3), 2000);
  return { current, heatPumpCost, annualSave, installCost, payback, taxCredit };
}

export default function DFWHeatPumpGuide() {
  const [selSystem, setSelSystem] = useState(0);
  const [selSize, setSelSize] = useState(1);
  const [selRates, setSelRates] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const result = calcSavings(systemTypes[selSystem], homeSizes[selSize], rateTypes[selRates]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ fontSize: 48 }}>🔄</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>Heat Pumps in DFW — Do They Work?</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Yes — DFW rarely drops below 20°F, making heat pumps highly effective. Calculate your savings vs gas heating.</p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🌡️', title: 'DFW Winter Reality', items: ['Avg winter low: 35–45°F', 'Drops below 20°F: ~3 days/year', 'Heat pumps effective above 15°F', 'Hybrid adds gas backup for rare freeze'] },
            { icon: '💡', title: 'Energy Savings', items: ['2–3x more efficient than electric resistance', 'Saves $400–$900/year vs gas furnace', 'COP of 3.0+ in DFW winters', 'Also cools in summer (replaces AC)'] },
            { icon: '🏛️', title: 'Federal Tax Credits (IRA)', items: ['30% credit up to $2,000 for heat pump', 'Energy Star certified required', 'Available through 2032', 'Applies to both purchase + installation'] },
            { icon: '⚡', title: 'All-Electric vs Hybrid', items: ['All-electric: no gas line needed', 'Hybrid: heat pump + gas backup', 'Hybrid best if gas rates < $1.20/therm', 'All-electric best for new construction'] },
          ].map((card) => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
              <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
                {card.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>💰 Heat Pump Savings Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Estimate your annual savings and tax credit when switching to a heat pump in DFW.</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Current heating system?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {systemTypes.map((s, i) => (
                <button key={s} onClick={() => { setSelSystem(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selSystem === i ? '#F5E642' : '#1e3a5f'}`, background: selSystem === i ? '#F5E642′ : '#0A1628', color: selSystem === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Home size?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {homeSizes.map((s, i) => (
                <button key={s} onClick={() => { setSelSize(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selSize === i ? '#F5E642' : '#1e3a5f'}`, background: selSize === i ? '#F5E642′ : '#0A1628', color: selSize === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Your utility rate situation?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {rateTypes.map((r, i) => (
                <button key={r} onClick={() => { setSelRates(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selRates === i ? '#F5E642' : '#1e3a5f'}`, background: selRates === i ? '#F5E642′ : '#0A1628', color: selRates === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 13 }}>{r}</button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Calculate My Savings →</button>

          {showResult && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { label: 'Current Annual Cost', value: `$${result.current.toLocaleString()}`, sub: 'Heating + cooling' },
                { label: 'With Heat Pump', value: `$${result.heatPumpCost.toLocaleString()}`, sub: 'Estimated annual cost' },
                { label: 'Annual Savings', value: `$${result.annualSave.toLocaleString()}`, sub: 'Per year', highlight: true },
                { label: 'Federal Tax Credit', value: `$${result.taxCredit.toLocaleString()}`, sub: 'IRA 30% credit' },
                { label: 'Payback Period', value: `${result.payback} yrs`, sub: 'After tax credit' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#0A1628', borderRadius: 12, padding: 16, border: `2px solid ${stat.highlight ? '#F5E642' : '#1e3a5f'}`, textAlign: 'center' }}>
                  <p style={{ color: '#64748b', fontSize: 12, marginBottom: 6 }}>{stat.label}</p>
                  <p style={{ color: stat.highlight ? '#F5E642′ : '#fff', fontSize: 24, fontWeight: 800, margin: '0 0 4px' }}>{stat.value}</p>
                  <p style={{ color: '#64748b', fontSize: 12 }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
