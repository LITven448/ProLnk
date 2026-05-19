import { useState } from 'react';

const performanceInputs = ['AC runs constantly but barely cools', 'Delta T only 12–14°F (should be 18–22°F)', 'High electric bill vs last year', 'New system underperforming', 'System is old — not sure if efficient'];
const dfwWeathers = ['Peak summer — 100°F+ outside', 'Warm day — 85–95°F outside', 'Mild — under 85°F outside', 'Humid but not hot (shoulder season)', 'After major storm or cold snap'];

function getEfficiencyAssessment(performance: string, weather: string) {
  const isPeak = weather.includes('100°F');
  const isDeltaT = performance.includes('Delta T');
  const isHighBill = performance.includes('electric bill');
  const isOld = performance.includes('old');

  const deltaTNote = 'Delta T test: measure return air temp vs supply air temp. 18–22°F difference = healthy. Under 16°F = low refrigerant or dirty coil. Under 12°F = frozen coil risk.';
  const likelyCauses = isDeltaT
    ? ['Low refrigerant (leak)', 'Dirty evaporator coil', 'Oversized system short-cycling']
    : isHighBill
    ? ['Refrigerant leak reducing efficiency', 'Dirty condenser coils (common in DFW wind/dust)', 'Failing compressor running hard']
    : ['Full diagnostic needed — multiple possible causes'];
  const dfwNote = isPeak
    ? '⚠️ In 100°F+ heat, rated SEER efficiency drops — systems work harder. Delta T may measure 16–18°F and still be "OK" for peak conditions.'
    : 'Normal DFW conditions — Delta T should be 18–22°F on a properly charged system.';
  const techTests = ['Delta T across supply/return air', 'Amp draw check on compressor', 'Superheat/subcooling measurements (refrigerant charge)', 'Condenser coil cleanliness inspection'];
  return { deltaTNote, likelyCauses, dfwNote, techTests };
}

export default function DFWHVACEfficiencyTestGuide() {
  const [performance, setPerformance] = useState('');
  const [weather, setWeather] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getEfficiencyAssessment> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EFF8', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>📊 HVAC Efficiency Test Guide</h1>
        <p style={{ color: '#8BA0B8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Know if your AC is actually working at rated efficiency — before DFW summer runs up your electric bill. Simple DIY tests tell you a lot. Technician tests tell you everything.
        </p>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ The Delta T Test (DIY)</h2>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EFF8′ }}>What you need:</strong> A digital thermometer ($15 at hardware store)</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Measure:</strong> Temperature of air at the return vent (where air goes in)</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Measure:</strong> Temperature of air at the supply vent (where cold air comes out)</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Subtract:</strong> Difference = Delta T</li>
            <li>18–22°F difference: System working well</li>
            <li>14–17°F: Marginal — possible low refrigerant or dirty coil</li>
            <li>Under 14°F: Problem — schedule service</li>
          </ul>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Technician Efficiency Tests</h2>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EFF8′ }}>Amp draw:</strong> Compressor pulling correct amperage = healthy motor and charge</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Superheat:</strong> Measures refrigerant state — confirms proper charge level</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Subcooling:</strong> Liquid refrigerant measurement — confirms no overcharge</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Condenser coil check:</strong> DFW dust + cottonwood seeds clog condenser frequently</li>
          </ul>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Assess My Efficiency Issue</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>WHAT I'M EXPERIENCING</label>
            <select value={performance} onChange={e => setPerformance(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select performance issue...</option>
              {performanceInputs.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>DFW WEATHER CONDITIONS</label>
            <select value={weather} onChange={e => setWeather(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select current weather...</option>
              {dfwWeathers.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <button onClick={() => { if (performance && weather) setResult(getEfficiencyAssessment(performance, weather)); }} disabled={!performance || !weather} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!performance || !weather) ? 0.5 : 1 }}>
            Assess Efficiency
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📊 Efficiency Assessment</h3>
            <div style={{ marginBottom: 16, padding: 12, background: '#0A1628', borderRadius: 8, color: '#C8D8E8', fontSize: 14, lineHeight: 1.7 }}>{result.deltaTNote}</div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#8BA0B8', fontSize: 13 }}>DFW CONDITIONS NOTE: </span><span style={{ color: '#E8EFF8′ }}>{result.dfwNote}</span></div>
            <div style={{ marginTop: 16 }}>
              <div style={{ color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>🔧 Likely Causes:</div>
              {result.likelyCauses.map(c => <div key={c} style={{ color: '#C8D8E8', marginBottom: 6, paddingLeft: 8 }}>• {c}</div>)}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>🛠️ Tech Should Test:</div>
              {result.techTests.map(t => <div key={t} style={{ color: '#C8D8E8', marginBottom: 6, paddingLeft: 8 }}>• {t}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
