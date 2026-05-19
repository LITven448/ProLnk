import { useState } from 'react';

const heatingOptions = [
  {
    type: 'Air-Source Heat Pump',
    upfront: '$2,500–5,000',
    monthly: '$40–90',
    payback: '3–5 years',
    bestFor: 'Year-round use + season extension',
    dfwNotes: 'DFW mild winters (avg 45°F) are ideal for heat pumps — efficient down to 45°F air temp.',
  },
  {
    type: 'Solar Pool Heater',
    upfront: '$3,000–6,000',
    monthly: '$5–15 (pump only)',
    payback: '2–4 years',
    bestFor: 'Spring/fall heating, daytime use',
    dfwNotes: 'DFW gets 230+ sunny days/year. Solar panels heat water 10–15°F above ambient during daylight.',
  },
  {
    type: 'Gas Heater',
    upfront: '$1,500–3,000',
    monthly: '$150–400',
    payback: 'Never (ongoing cost)',
    bestFor: 'Rapid heating, occasional use',
    dfwNotes: 'Natural gas prices volatile in DFW after 2021 freeze. Best for occasional hot tub use, not pools.',
  },
];

function calcHeatPump(size: string, season: string) {
  const sizeMap: Record<string, { sqft: number; gallons: number }> = {
    small: { sqft: 400, gallons: 15000 },
    medium: { sqft: 600, gallons: 22000 },
    large: { sqft: 900, gallons: 35000 },
  };
  const seasonMap: Record<string, { months: number; rec: string }> = {
    spring: { months: 2, rec: 'Solar + heat pump combo — maximize DFW sunny spring days, heat pump for cool evenings.' },
    fall: { months: 2, rec: 'Air-source heat pump — DFW October temps drop fast at night, pump handles it efficiently.' },
    both: { months: 4, rec: 'Air-source heat pump (2.5–4 COP) — best ROI for DFW 4-month extension.' },
    winter: { months: 3, rec: 'Gas heater for occasional use OR move to a heated indoor spa — DFW winters are mild but heat pumps lose efficiency below 45°F.' },
  };
  const s = sizeMap[size];
  const se = seasonMap[season];
  if (!s || !se) return null;
  const kwhPerMonth = Math.round(s.gallons * 0.004);
  const costPerMonth = Math.round(kwhPerMonth * 0.13);
  return { ...se, kwhPerMonth, costPerMonth, gallons: s.gallons };
}

export default function DFWPoolHeatPumpGuide() {
  const [poolSize, setPoolSize] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcHeatPump>>(null);

  function calculate() {
    setResult(calcHeatPump(poolSize, season));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏊 DFW POOL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Pool Heating: Heat Pump vs Solar</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          A DFW pool without a heater is usable June–September. Add a heater and you gain March–May and
          September–November — that's 5 more months of swimming.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>📅 DFW Pool Season Reality</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Without Heater', months: '4 months', detail: 'June – September only' },
            { label: 'With Heat Pump', months: '7–8 months', detail: 'April – November' },
            { label: 'With Solar', months: '6 months', detail: 'April – October (daytime)' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1e2d45', borderRadius: 8, padding: 14, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{s.months}</div>
              <div style={{ fontSize: 13, color: '#fff', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Heating Method Comparison</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {heatingOptions.map(o => (
            <div key={o.type} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <strong style={{ color: '#F5E642′ }}>{o.type}</strong>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>
                  {o.upfront} upfront · {o.monthly}/mo · Payback: {o.payback}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 6px' }}><strong>Best for:</strong> {o.bestFor}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>🌡️ DFW: {o.dfwNotes}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Calculate Your DFW Pool Heating</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Size</label>
              <select value={poolSize} onChange={e => setPoolSize(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select size</option>
                <option value='small'>Small (15K gal, ~14x28)</option>
                <option value='medium'>Medium (22K gal, ~16x32)</option>
                <option value='large'>Large (35K gal, ~20x40)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Season Goal</label>
              <select value={season} onChange={e => setSeason(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select season</option>
                <option value='spring'>Spring Extension (Mar–May)</option>
                <option value='fall'>Fall Extension (Sep–Nov)</option>
                <option value='both'>Both Spring & Fall</option>
                <option value='winter'>Winter Use</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Calculate My DFW Setup
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 6, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>✅ DFW Recommendation</div>
              <p style={{ color: '#cbd5e1', margin: '0 0 8px' }}>{result.rec}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
                Est. operating cost: <strong style={{ color: '#fff' }}>${result.costPerMonth}/month</strong> ·
                Pool volume: {result.gallons.toLocaleString()} gallons ·
                Season extension: {result.months} months
              </p>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>💡 DFW Combo Strategy</strong>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 14 }}>
            Many DFW homeowners pair solar heating (handles 70°F+ days) with a small heat pump (handles 55–70°F evenings).
            Combined cost runs $4,500–8,000 installed but dramatically extends your season at low operating cost.
          </p>
        </div>
      </div>
    </div>
  );
}
