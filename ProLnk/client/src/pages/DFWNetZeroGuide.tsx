import { useState } from 'react';

const steps = [
  { step: 1, icon: '🔍', title: 'Energy Audit First', desc: 'Start with a professional energy audit ($300–$500) or free utility audit through Oncor. Find where your home loses energy before spending on upgrades.', cost: '$300–$500', impact: 'Identifies highest-ROI improvements first' },
  { step: 2, icon: '🏠', title: 'Seal & Insulate', desc: 'Air sealing + upgraded attic insulation is the highest-ROI first step. In DFW, unconditioned attics can hit 140°F, driving massive cooling loads.', cost: '$3,000–$7,000', impact: '20–30% energy reduction' },
  { step: 3, icon: '❄️', title: 'High-Efficiency HVAC', desc: 'SEER 18+ heat pump (also heats efficiently) replaces gas + AC. DFW mild winters make heat pumps ideal — only need resistance backup a few days/year.', cost: '$8,000–$15,000', impact: '35–50% HVAC energy reduction' },
  { step: 4, icon: '☀️', title: 'Solar Panels', desc: 'After reducing your load with efficiency upgrades, size your solar array to match your remaining usage. Right-sized system costs less and performs better.', cost: '$18,000–$35,000', impact: '80–100% of electricity offset' },
  { step: 5, icon: '🔋', title: 'Battery Storage', desc: 'Tesla Powerwall or similar stores excess solar production for nighttime use and grid outages. Critical in DFW where ice storms knock out power for days.', cost: '$10,000–$18,000', impact: 'True energy independence' },
];

const oncorNet = [
  { rule: 'Net Metering', detail: 'Oncor credits excess solar production at retail rate (no buyback — carried forward on your bill)' },
  { rule: 'Interconnection Required', detail: 'Must file with Oncor and receive permission to operate (PTO) before switching on solar panels' },
  { rule: 'No Export Limit (residential)', detail: 'No cap on how much you can export for most residential systems under 50 kW' },
  { rule: 'TDSP Charges Still Apply', detail: 'Even with solar + battery, you pay Oncor distribution charges (~$30–$40/mo fixed)' },
];

export default function DFWNetZeroGuide() {
  const [bill, setBill] = useState('');
  const [sqFt, setSqFt] = useState('');
  const [result, setResult] = useState<{ solarKw: number; batteryKwh: number; totalCost: string; annualSavings: number; payback: number } | null>(null);

  function calculate() {
    const monthlyBill = parseFloat(bill);
    const sf = parseFloat(sqFt) || 2000;
    if (!monthlyBill) return;
    const monthlyKwh = monthlyBill / 0.12;
    const annualKwh = monthlyKwh * 12;
    const solarKw = Math.ceil(annualKwh / 1400);
    const batteryKwh = Math.round(monthlyKwh / 30 * 1.5);
    const solarCost = solarKw * 3000;
    const batteryCost = batteryKwh * 400;
    const efficiencyUpgrades = sf < 2500 ? 12000 : 18000;
    const total = solarCost + batteryCost + efficiencyUpgrades;
    const annualSavings = Math.round(monthlyBill * 12 * 0.9);
    const payback = Math.round(total / annualSavings);
    const low = Math.round(total * 0.85 / 1000) * 1000;
    const high = Math.round(total * 1.15 / 1000) * 1000;
    setResult({ solarKw, batteryKwh, totalCost: `$${low.toLocaleString()}–$${high.toLocaleString()}`, annualSavings, payback });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#1a1a2e 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚖️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Net-Zero Energy Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>Produce as much energy as you use. Here's the DFW-specific path — and what it actually costs.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: 'linear-gradient(135deg,#1a2a1a,#0f1f0f)', border: '1px solid #2d5a2d', borderRadius: 16, padding: 24, margin: '40px 0 0′ }}>
          <h2 style={{ color: '#4ADE80', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>What Net-Zero Actually Means</h2>
          <p style={{ color: '#86EFAC', margin: 0 }}>A net-zero energy home produces as much energy as it consumes over a full year, measured at the utility meter. In DFW, with 229+ sunny days/year and Oncor net metering, net-zero is achievable for most homes for $25,000–$60,000 total investment — and pays back in 8–14 years.</p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 8px' }}>The DFW Path to Net-Zero</h2>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Always in this order: reduce consumption first, then right-size your generation.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map(s => (
            <div key={s.step} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{s.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, color: '#E8EDF5', fontSize: 16 }}>{s.title}</span>
                </div>
                <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 8px' }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ color: '#60A5FA', fontSize: 13 }}>💰 {s.cost}</span>
                  <span style={{ color: '#4ADE80', fontSize: 13 }}>📊 {s.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Oncor Net Metering Rules</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {oncorNet.map(r => (
            <div key={r.rule} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{r.rule}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{r.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 8px' }}>Net-Zero Cost & Payback Calculator</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20 }}>Enter your current monthly electric bill and home size to get a DFW net-zero roadmap.</p>
        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 28, border: '1px solid #2A3F5C', maxWidth: 520 }}>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Current Monthly Electric Bill ($)</label>
          <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="e.g. 280″
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Home Size (sq ft)</label>
          <input type="number" value={sqFt} onChange={e => setSqFt(e.target.value)} placeholder="e.g. 2500″
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Build My Net-Zero Plan
          </button>
        </div>
        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginTop: 24 }}>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Solar System Size</div>
              <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 800 }}>{result.solarKw} kW</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Battery Storage</div>
              <div style={{ color: '#60A5FA', fontSize: 32, fontWeight: 800 }}>{result.batteryKwh} kWh</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Total Investment</div>
              <div style={{ color: '#E8EDF5', fontSize: 22, fontWeight: 800 }}>{result.totalCost}</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Annual Savings</div>
              <div style={{ color: '#4ADE80', fontSize: 32, fontWeight: 800 }}>${result.annualSavings.toLocaleString()}</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Payback Period</div>
              <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 800 }}>{result.payback} yrs</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
