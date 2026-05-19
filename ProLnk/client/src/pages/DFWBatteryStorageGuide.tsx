import { useState } from 'react';

export default function DFWBatteryStorageGuide() {
  const [sqft, setSqft] = useState(2200);
  const [hasSolar, setHasSolar] = useState(false);
  const [priority, setPriority] = useState<'essentials' | 'whole'>('essentials');
  const [result, setResult] = useState<null | { kWh: number; units: number; cost: number; afterCredit: number; payback: number; brand: string }>(null);

  const s = { background: '#0F1E35', borderRadius: '12px', padding: '20px', marginBottom: '16px' };
  const tg = { display: 'inline-block', background: '#1A2F50', color: '#F5E642', borderRadius: '6px', padding: '3px 10px', fontSize: '12px', marginRight: '6px', marginBottom: '6px' };

  function calculate() {
    const base = priority === 'essentials' ? 10 : 20;
    const sizeAdj = sqft > 3000 ? 1.4 : sqft > 2000 ? 1.2 : 1.0;
    const kWh = Math.round(base * sizeAdj);
    const units = Math.ceil(kWh / 13.5);
    const cost = units * 12500 + 3000;
    const afterCredit = cost * 0.7;
    const annualSavings = hasSolar ? cost * 0.12 : cost * 0.06;
    const payback = afterCredit / annualSavings;
    const brand = priority === 'whole' ? 'Tesla Powerwall 3′ : hasSolar ? ’Enphase IQ Battery' : 'LG CHEM RESU';
    setResult({ kWh, units, cost, afterCredit, payback, brand });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '8px' }}>🔋 DFW ENERGY GUIDES</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>Home Battery Storage for DFW Homes</h1>
        <p style={{ color: '#A0AEC0', fontSize: '15px', marginBottom: '28px' }}>After Winter Storm Uri in 2021, DFW homeowners lost power for days. Battery storage is no longer a luxury — it's grid insurance. Here’s what you need to know.</p>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>⚡ DFW Grid Outage Reality Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {[
              { stat: '14.2 hrs', label: 'Avg annual outage time in DFW', sub: 'Per Oncor 2024 data' },
              { stat: '2–4 days', label: 'Winter storm outage duration', sub: 'Extreme weather events' },
              { stat: '3–5x', label: 'Summer peak demand spikes', sub: 'July–Aug in DFW' },
            ].map(d => (
              <div key={d.stat} style={{ background: '#1A2F50', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>{d.stat}</div>
                <div style={{ color: '#CBD5E0', fontSize: '12px', marginBottom: '4px' }}>{d.label}</div>
                <div style={{ color: '#718096', fontSize: '11px' }}>{d.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>🔬 Battery Comparison: DFW Use Cases</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2D4A70′ }}>
                  {['', 'Tesla Powerwall 3', 'Enphase IQ', 'LG CHEM RESU'].map(h => (
                    <th key={h} style={{ color: '#A0AEC0', padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Capacity', '13.5 kWh', '10.08–40.1 kWh', '10–22 kWh'],
                  ['Power Output', '11.5 kW', '3.84–7.68 kW', '5–11 kW'],
                  ['Solar Integration', '✅ Built-in', '✅ Best-in-class', '✅ Compatible'],
                  ['Price per unit', '~$12,500', '~$4,000/unit', '~$9,500'],
                  ['Best DFW use', 'Whole-home backup', 'Solar+storage', 'Outage backup'],
                  ['Warranty', '10 yrs / 70%', '15 yrs / 70%', '10 yrs / 60%'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1A2F50', background: i % 2 === 0 ? 'transparent' : '#0F1E35′ }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '10px 12px', color: j === 0 ? '#A0AEC0′ : '#CBD5E0' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>💰 Federal IRA Tax Credit (30%)</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>The Inflation Reduction Act provides a 30% federal tax credit for home battery storage installed in 2023–2032. No income limit. Applies even without solar.</p>
          <div style={tg}>30% of total installed cost</div>
          <div style={tg}>No max cap on residential</div>
          <div style={tg}>File IRS Form 5695</div>
          <div style={tg}>Applies through 2032</div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>🧮 Battery Size + Cost Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>Home Size (sq ft)</div>
              <input type="number" value={sqft} onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' }}>Backup Priority</div>
              <select value={priority} onChange={e => setPriority(e.target.value as 'essentials' | 'whole')}
                style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '15px', boxSizing: 'border-box' }}>
                <option value="essentials">Essentials Only (fridge, lights, outlets)</option>
                <option value="whole">Whole-Home (incl. HVAC)</option>
              </select>
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', cursor: 'pointer' }}>
            <input type="checkbox" checked={hasSolar} onChange={e => setHasSolar(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#F5E642′ }} />
            <span style={{ color: '#CBD5E0', fontSize: '14px' }}>☀️ I have (or plan to add) solar panels</span>
          </label>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer', width: '100%' }}>
            Get Battery Recommendation
          </button>

          {result && (
            <div style={{ marginTop: '20px', background: '#0A1628', borderRadius: '10px', padding: '18px' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '14px', fontSize: '15px' }}>📦 Recommended: {result.brand}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Recommended Capacity', val: `${result.kWh} kWh` },
                  { label: 'Units Needed', val: `${result.units} unit${result.units > 1 ? 's' : ''}` },
                  { label: 'Installed Cost', val: `$${result.cost.toLocaleString()}` },
                  { label: 'After 30% IRA Credit', val: `$${result.afterCredit.toLocaleString()}`, highlight: true },
                  { label: 'Est. Payback Period', val: `${result.payback.toFixed(1)} years` },
                  { label: 'Solar Benefit', val: hasSolar ? 'High — self-consume solar' : 'Moderate — outage backup' },
                ].map(r => (
                  <div key={r.label} style={{ background: '#0F1E35', borderRadius: '8px', padding: '12px', border: (r as any).highlight ? '1px solid #F5E642′ : ’none' }}>
                    <div style={{ color: '#718096', fontSize: '11px', marginBottom: '4px' }}>{r.label}</div>
                    <div style={{ color: (r as any).highlight ? '#F5E642′ : '#FFF', fontWeight: 700, fontSize: '16px' }}>{r.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
