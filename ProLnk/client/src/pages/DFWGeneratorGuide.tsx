import { useState } from 'react';

const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–3,500 sq ft', '3,500+ sq ft'];
const coverageTypes = ['Essentials Only (lights, fridge, HVAC zone, outlets)', 'Whole Home (everything)'];
const fuelTypes = ['Natural Gas', 'Propane'];

function getGeneratorRec(size: string, coverage: string, fuel: string) {
  const isEssentials = coverage.startsWith('Essentials');
  const sizeKw: Record<string, [number, number]> = {
    'Under 1,500 sq ft': [10, 14],
    '1,500–2,500 sq ft': [14, 20],
    '2,500–3,500 sq ft': [20, 26],
    '3,500+ sq ft': [26, 36],
  };
  const [essen, whole] = sizeKw[size];
  const kw = isEssentials ? essen : whole;
  const baseCost = isEssentials ? 4500 : 8500;
  const sizeAdj = sizeKw[size][0] / 10;
  const lowCost = Math.round((baseCost + sizeAdj * 1500) * (fuel === 'Propane' ? 1.1 : 1));
  const highCost = Math.round(lowCost * 1.7);
  return { kw, lowCost, highCost, fuel };
}

export default function DFWGeneratorGuide() {
  const [selSize, setSelSize] = useState(1);
  const [selCoverage, setSelCoverage] = useState(0);
  const [selFuel, setSelFuel] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const rec = getGeneratorRec(homeSizes[selSize], coverageTypes[selCoverage], fuelTypes[selFuel]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '3px solid #F5E642' }}>
        <div style={{ fontSize: 48 }}>⚡</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Whole-Home Generator Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>After February 2021, generator demand in DFW exploded. Learn what size you need, what it costs, and how to get it installed right.</p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 20, border: '2px solid #dc2626', marginBottom: 28, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 32, flexShrink: 0 }}>🧊</span>
          <div>
            <p style={{ color: '#fca5a5', fontWeight: 700, fontSize: 16, margin: '0 0 6px' }}>The February 2021 ERCOT Lesson</p>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.7 }}>4.5 million DFW homes lost power for up to 10 days. The lesson: ERCOT is an isolated grid prone to weather-related failure. A standby generator is not a luxury in DFW — it's infrastructure protection. Natural gas lines continued functioning throughout the 2021 event, making gas-powered standby generators the reliable choice.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🔌', title: 'Standby vs Portable', items: ['Standby: automatic, natural gas/propane, whole-home', 'Portable: manual, gasoline, limited circuits', 'Standby turns on within 10 seconds of outage', 'Portable requires refueling every 8–12 hours', 'Standby lasts unlimited with gas line'] },
            { icon: '📏', title: 'Sizing Guide', items: ['Essentials (lights/fridge/HVAC zone): 10–14 kW', 'Whole home under 2,500 sq ft: 14–20 kW', 'Whole home 2,500–3,500 sq ft: 20–26 kW', 'Large home + pool/EV: 26–36 kW', 'Oversizing is better than undersizing'] },
            { icon: '💰', title: 'Total Installed Cost', items: ['10 kW unit: $3,500–$6,500 installed', '14–20 kW unit: $5,500–$10,000 installed', '22–26 kW unit: $7,500–$14,000 installed', 'Transfer switch: included in most quotes', 'Natural gas connection: $500–$1,500'] },
            { icon: '📋', title: 'DFW Permit Info', items: ['Permit required in all DFW municipalities', 'Dallas, Plano, Frisco — typical 2–4 week permit', 'HOA approval often needed (check first)', 'Noise ordinances apply in most suburbs', 'Annual service recommended (Generac, Kohler)'] },
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
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🧮 Generator Size & Cost Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Get your recommended standby generator size and installed cost estimate for your DFW home.</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Home size?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {homeSizes.map((s, i) => (
                <button key={s} onClick={() => { setSelSize(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selSize === i ? '#F5E642' : '#1e3a5f'}`, background: selSize === i ? '#F5E642' : '#0A1628', color: selSize === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Coverage needed?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {coverageTypes.map((c, i) => (
                <button key={c} onClick={() => { setSelCoverage(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selCoverage === i ? '#F5E642' : '#1e3a5f'}`, background: selCoverage === i ? '#F5E642' : '#0A1628', color: selCoverage === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{c}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Fuel type?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {fuelTypes.map((f, i) => (
                <button key={f} onClick={() => { setSelFuel(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selFuel === i ? '#F5E642' : '#1e3a5f'}`, background: selFuel === i ? '#F5E642' : '#0A1628', color: selFuel === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{f}</button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get My Generator Recommendation →</button>

          {showResult && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { label: 'Recommended Size', value: `${rec.kw} kW`, sub: 'Standby generator', highlight: true },
                { label: 'Installed Cost Range', value: `$${rec.lowCost.toLocaleString()}–$${rec.highCost.toLocaleString()}`, sub: `${rec.fuel} unit` },
                { label: 'Fuel Type', value: rec.fuel, sub: rec.fuel === 'Natural Gas' ? 'Best for DFW (unaffected in 2021)' : 'Requires on-site tank' },
                { label: 'Transfer Switch', value: 'Included', sub: 'Automatic switchover' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${stat.highlight ? '#F5E642' : '#1e3a5f'}`, textAlign: 'center' }}>
                  <p style={{ color: '#64748b', fontSize: 12, marginBottom: 6 }}>{stat.label}</p>
                  <p style={{ color: stat.highlight ? '#F5E642' : '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 6px' }}>{stat.value}</p>
                  <p style={{ color: '#64748b', fontSize: 11 }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
