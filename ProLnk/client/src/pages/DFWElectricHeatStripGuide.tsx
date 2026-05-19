import { useState } from 'react';

export default function DFWElectricHeatStripGuide() {
  const [systemType, setSystemType] = useState('');
  const [kw, setKw] = useState('');
  const [coldDays, setColdDays] = useState('');
  const [result, setResult] = useState<null | { sizing: string; annualCost: string; hpComparison: string; detail: string }>(null);

  function calculate() {
    const k = parseFloat(kw);
    const d = parseInt(coldDays, 10);
    if (!systemType || !k || !d) return;
    const ratePerKwh = 0.13;
    const hoursPerDay = 6;
    const annualKwh = k * hoursPerDay * d;
    const annualCost = (annualKwh * ratePerKwh).toFixed(0);
    const hpKwh = annualKwh * 0.28;
    const hpCost = (hpKwh * ratePerKwh).toFixed(0);
    const savings = (parseFloat(annualCost) - parseFloat(hpCost)).toFixed(0);
    let sizing = '';
    if (k <= 5) sizing = '5 kW — suitable for mild backup only; may struggle in rare DFW hard freezes';
    else if (k <= 10) sizing = '10 kW — standard for DFW homes under 2,000 sq ft as backup heat';
    else if (k <= 15) sizing = '15 kW — appropriate for 2,000–3,000 sq ft DFW homes';
    else sizing = '20+ kW — large DFW home or all-electric primary heat setup';
    const detail = systemType === 'primary'
      ? 'Using heat strips as primary heat in DFW is costly but manageable given the short heating season. DFW averages only 30–40 days per year below 35°F. The real risk is the occasional ice storm or hard freeze when strips run continuously for 48–72 hours and usage spikes dramatically.'
      : 'Heat pumps in DFW efficiently handle most winter days (COP of 2.5–3.5 down to ~25°F). Heat strips activate as backup only when temps drop below the heat pump\’s balance point — usually 17–22°F in DFW. This is rare but happens 5–15 days per year.';
    setResult({ sizing, annualCost: `$${annualCost}/year`, hpComparison: `Heat pump equivalent: $${hpCost}/year (saves ~$${savings}/yr)`, detail });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Electric Heat Strip Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Electric heat strips are resistance heaters built into your air handler — essentially a giant toaster inside your duct system.
          They're found in all-electric DFW homes and as backup heat in heat pump systems. They’re expensive to run but rarely used in DFW’s mild winters.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚡ Heat Strip Basics for DFW</h2>
          {[
            ['How heat strips work', 'Electric resistance coils heat air directly as it passes through — 100% of electrical input becomes heat. No refrigerant cycle, no moving parts, instant heat. The tradeoff: no efficiency multiplier like a heat pump.'],
            ['kW sizing', 'Typical DFW homes use 10–20 kW of heat strip capacity. Undersized strips mean cold air in rare hard freezes. Oversized strips cycle too fast and wear the system.'],
            ['DFW cold events', 'DFW averages 30–45 days below 40°F per year. Heat strips run hard during rare ice storms (like 2021 and 2024 events). Knowing your strip kW helps forecast cost spikes.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Heat Strip Cost Calculator</h2>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>System Type</label>
          <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
            {[['primary', '🔌 All-Electric (heat strips are primary heat)'], ['backup', '♨️ Heat Pump with Strip Backup']].map(([v, l]) => (
              <button key={v} onClick={() => setSystemType(v)}
                style={{ background: systemType === v ? '#F5E642′ : '#1a2f4a', color: systemType === v ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Heat Strip Size (kW)</label>
          <input type="number" value={kw} onChange={e => setKw(e.target.value)} placeholder="e.g. 10″
            style={{ background: '#1a2f4a', border: '1px solid #2a4060', borderRadius: 8, color: '#fff', padding: '10px 14px', width: '100%', marginBottom: 16, fontSize: 15, boxSizing: 'border-box' }} />
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Estimated DFW Heating Days Per Year</label>
          <input type="number" value={coldDays} onChange={e => setColdDays(e.target.value)} placeholder="e.g. 40″
            style={{ background: '#1a2f4a', border: '1px solid #2a4060', borderRadius: 8, color: '#fff', padding: '10px 14px', width: '100%', marginBottom: 20, fontSize: 15, boxSizing: 'border-box' }} />
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Calculate Heat Strip Costs →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>📐 Sizing: {result.sizing}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Estimated Annual Heat Strip Cost: {result.annualCost}</div>
            <div style={{ color: '#4ade80', fontSize: 14, marginBottom: 12 }}>♨️ {result.hpComparison}</div>
            <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{result.detail}</div>
          </div>
        )}
      </div>
    </div>
  );
}
