import { useState } from 'react';

export default function DFWSolarAtticFanGuide() {
  const [atticSqft, setAtticSqft] = useState('');
  const [peakTemp, setPeakTemp] = useState('');
  const [exposure, setExposure] = useState('full');
  const [result, setResult] = useState<null | { cfmNeeded: number; panelWatts: number; tempReduction: number; solarCost: string; wiredCost: string; recommendation: string }>(null);

  function assess() {
    const sqft = parseFloat(atticSqft);
    const temp = parseFloat(peakTemp);
    if (!sqft || !temp) return;
    const cfmNeeded = sqft * 1;
    const panelWatts = exposure === 'full' ? Math.ceil(cfmNeeded / 15) : Math.ceil(cfmNeeded / 10);
    const tempReduction = exposure === 'full' ? Math.min(40, Math.round((temp - 90) * 0.55)) : Math.min(28, Math.round((temp - 90) * 0.38));
    const unitCount = Math.ceil(panelWatts / 30);
    const solarCost = `$${(unitCount * 280).toLocaleString()}–$${(unitCount * 420).toLocaleString()} (${unitCount} fan${unitCount > 1 ? 's' : ''}, no wiring needed)`;
    const wiredCost = `$${(unitCount * 180).toLocaleString()}–$${(unitCount * 280).toLocaleString()} + electrician ($200–$500) — adds to electric bill`;
    const recommendation = exposure === 'full'
      ? `DFW gets 300+ sunny days/year — solar fans operate at peak effectiveness exactly when you need them most. Strongly recommended over wired for DFW.`
      : `Partial shading reduces solar fan output. Consider 1 solar fan on south/west exposure + 1 wired fan as backup for full coverage.`;
    setResult({ cfmNeeded, panelWatts, tempReduction, solarCost, wiredCost, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 36px', borderBottom: '3px solid #F5E642' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Solar Attic Fan Guide</h1>
          <p style={{ fontSize: 16, color: '#9BA8C0', margin: 0 }}>
            DFW gets 300+ sunny days/year — solar-powered attic fans are uniquely effective here, running hardest on the hottest days with zero operating cost.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>🌞 Why Solar Wins in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Operating Cost', solar: '$0/year', wired: '$60–$120/year' },
              { label: 'Peak Performance', solar: 'Hottest, sunniest days', wired: 'Runs on timer/thermostat' },
              { label: 'Install Cost', solar: 'No electrician needed', wired: '+$200–$500 electrician' },
              { label: 'DFW Sunny Days', solar: '300+ days/yr', wired: 'N/A' },
              { label: 'Payback Period', solar: '3–5 years', wired: '5–8 years' },
              { label: 'Panel Required', solar: '20–40W per fan', wired: 'Standard circuit' },
            ].map(item => (
              <div key={item.label} style={{ background: '#162040', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ color: '#9BA8C0', fontSize: 12, marginBottom: 6 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>☀️ {item.solar}</div>
                <div style={{ color: '#9BA8C0', fontSize: 12, marginTop: 4 }}>⚡ {item.wired}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>📐 Sizing Rule: 1 CFM per Sq Ft</h2>
          <ul style={{ color: '#9BA8C0', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>1,500 sq ft attic = 1,500 CFM minimum fan capacity</li>
            <li>30W solar panel produces ~15 CFM on a peak DFW summer day</li>
            <li>Typical DFW home (1,800–2,400 sq ft attic): 2–3 solar fans for full coverage</li>
            <li>Mount on south or west slope for maximum DFW solar exposure</li>
            <li>Do not seal ridge vents — balance with passive intake for best results</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Solar Fan Sizing Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Attic Square Footage</label>
              <input type="number" value={atticSqft} onChange={e => setAtticSqft(e.target.value)} placeholder="e.g. 2000"
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Peak Attic Temperature (°F, estimated or measured)</label>
              <input type="number" value={peakTemp} onChange={e => setPeakTemp(e.target.value)} placeholder="e.g. 145"
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Solar Exposure on Roof</label>
              <select value={exposure} onChange={e => setExposure(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                <option value="full">Full sun — south/west facing, no shade</option>
                <option value="partial">Partial — some tree shade or north-facing slopes</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Size My Solar Fan System
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#162040', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>
                Required: {result.cfmNeeded.toLocaleString()} CFM | Panel needed: {result.panelWatts}W | Expected temp drop: {result.tempReduction}°F
              </div>
              <div style={{ color: '#E8EAF0', marginBottom: 12 }}>{result.recommendation}</div>
              <div style={{ color: '#9BA8C0', fontSize: 14, marginBottom: 6 }}>☀️ Solar option: {result.solarCost}</div>
              <div style={{ color: '#9BA8C0', fontSize: 14 }}>⚡ Wired fan comparison: {result.wiredCost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
