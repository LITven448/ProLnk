import { useState } from 'react';

export default function DFWPoolEnergyGuide() {
  const [pumpType, setPumpType] = useState<'single' | 'variable'>('single');
  const [poolSize, setPoolSize] = useState(15000);
  const [heated, setHeated] = useState(false);
  const [result, setResult] = useState<null | { annualCurrent: number; annualVariable: number; savings: number; payback: number; totalUpgrade: number; oncorRebate: number }>(null);

  const s = { background: '#0F1E35', borderRadius: '12px', padding: '20px', marginBottom: '16px' };
  const tg = { display: 'inline-block', background: '#1A2F50', color: '#F5E642', borderRadius: '6px', padding: '3px 10px', fontSize: '12px', marginRight: '6px', marginBottom: '6px' };

  function calculate() {
    const hrs = 8;
    const rate = 0.115;
    const singleKw = poolSize > 20000 ? 2.0 : poolSize > 15000 ? 1.5 : 1.2;
    const varKw = singleKw * 0.3;
    const annualCurrent = pumpType === 'single' ? singleKw * hrs * 365 * rate : varKw * hrs * 365 * rate;
    const annualVariable = varKw * hrs * 365 * rate;
    const savings = Math.max(0, annualCurrent - annualVariable);
    const pumpCost = 1200;
    const ledCost = 400;
    const solarCost = heated ? 4500 : 0;
    const totalUpgrade = pumpCost + ledCost + solarCost;
    const oncorRebate = 200;
    const netCost = totalUpgrade - oncorRebate;
    const payback = savings > 0 ? netCost / savings : 99;
    setResult({ annualCurrent, annualVariable, savings, payback, totalUpgrade, oncorRebate });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '8px' }}>🏊 DFW ENERGY GUIDES</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>Pool Energy Efficiency Guide for DFW</h1>
        <p style={{ color: '#A0AEC0', fontSize: '15px', marginBottom: '28px' }}>DFW pools run 8+ months a year. Your pump is likely your 2nd or 3rd largest electricity consumer. Here's how to cut pool energy costs by up to 90%.</p>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>⚡ Variable Speed Pump: The Biggest Win</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '12px' }}>Single-speed pumps run at full power 100% of the time. Variable speed pumps modulate RPM — and because power scales with the cube of speed, small RPM drops = massive energy savings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {[
              { label: '🔴 Single Speed Pump', kwh: '2,200–3,500 kWh/yr', cost: '$253–$403/yr', note: 'Full power, all the time' },
              { label: '🟢 Variable Speed Pump', kwh: '400–900 kWh/yr', cost: '$46–$104/yr', note: '60–90% energy reduction' },
            ].map(p => (
              <div key={p.label} style={{ background: '#1A2F50', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px' }}>{p.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '4px' }}>{p.kwh}</div>
                <div style={{ color: '#CBD5E0', fontSize: '13px', marginBottom: '4px' }}>{p.cost}</div>
                <div style={{ color: '#718096', fontSize: '12px' }}>{p.note}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1A3A20', borderRadius: '8px', padding: '12px', color: '#68D391', fontSize: '14px' }}>
            ✅ Oncor offers a <strong>$200 rebate</strong> for qualifying variable speed pump upgrades in DFW. Visit oncor.com/rebates.
          </div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>💡 LED Pool Lighting</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>If your pool still has incandescent or halogen lights, LED conversion is a simple upgrade with fast payback.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { metric: '300–500W', label: 'Old halogen per light' },
              { metric: '20–30W', label: 'LED equivalent' },
              { metric: '2–3 yrs', label: 'Typical payback' },
            ].map(m => (
              <div key={m.metric} style={{ background: '#1A2F50', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{m.metric}</div>
                <div style={{ color: '#A0AEC0', fontSize: '12px' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>☀️ Solar Pool Heating in DFW</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>DFW gets 229+ sunny days/year, making solar pool heating a strong investment — especially vs gas heaters running at $200+/mo in shoulder seasons.</p>
          <div style={tg}>Extends season by 4–6 weeks</div>
          <div style={tg}>$4,000–$6,500 installed</div>
          <div style={tg}>5–7 year payback vs gas</div>
          <div style={tg}>No federal credit (not solar electric)</div>
          <div style={tg}>30% state sales tax exemption in TX</div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>🧮 Pool Energy Cost + Upgrade Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>Current Pump Type</div>
              <select value={pumpType} onChange={e => setPumpType(e.target.value as 'single' | 'variable')}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="single">Single Speed Pump</option>
                <option value="variable">Variable Speed Pump</option>
              </select>
            </div>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>Pool Size (gallons)</div>
              <input type="number" value={poolSize} onChange={e => setPoolSize(Number(e.target.value))}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', cursor: 'pointer' }}>
            <input type="checkbox" checked={heated} onChange={e => setHeated(e.target.checked)} style={{ accentColor: '#F5E642', width: '16px', height: '16px' }} />
            <span style={{ color: '#CBD5E0', fontSize: '14px' }}>🌡️ Pool is or will be heated</span>
          </label>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer', width: '100%' }}>
            Calculate Energy Costs + Savings
          </button>

          {result && (
            <div style={{ marginTop: '20px', background: '#0A1628', borderRadius: '10px', padding: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                {[
                  { label: 'Current Annual Pump Cost', val: `$${result.annualCurrent.toFixed(0)}` },
                  { label: 'With Variable Speed Pump', val: `$${result.annualVariable.toFixed(0)}`, green: true },
                  { label: 'Annual Savings', val: `$${result.savings.toFixed(0)}/yr`, green: true },
                  { label: 'Payback Period', val: `${result.payback < 99 ? result.payback.toFixed(1) + ' yrs' : 'Already optimal'}` },
                  { label: 'Total Upgrade Package', val: `$${result.totalUpgrade.toLocaleString()}` },
                  { label: 'Oncor Rebate', val: `-$${result.oncorRebate}`, green: true },
                ].map(r => (
                  <div key={r.label} style={{ background: '#0F1E35', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ color: '#718096', fontSize: '11px', marginBottom: '4px' }}>{r.label}</div>
                    <div style={{ color: r.green ? '#68D391' : '#FFF', fontWeight: 700, fontSize: '16px' }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A2F50', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#A0AEC0' }}>
                💡 Upgrade package includes: variable speed pump ($1,200), LED lights ($400){heated ? ', solar heating ($4,500)' : ''}. Oncor rebate applied to pump only.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
