import { useState } from 'react';

export default function DFWNoHotWaterGuide2026() {
  const [heaterType, setHeaterType] = useState('');
  const [symptom, setSymptom] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const diagnose = () => {
    if (heaterType === 'gas' && symptom === 'no-heat') {
      setDiagnosis('🔥 Pilot light is likely out. Locate the pilot assembly, turn the knob to PILOT, press and hold while lighting. If it won’t stay lit, the thermocouple may need replacement ($20-40 part, $80-120 labor).');
    } else if (heaterType === 'electric' && symptom === 'no-heat') {
      setDiagnosis('⚡ Check your breaker panel. Electric water heaters trip breakers during power surges. Reset breaker once. If it trips again, upper heating element has likely failed ($30 part, $100-150 labor).');
    } else if (symptom === 'lukewarm') {
      setDiagnosis('🌡️ Thermostat set too low or failed. DFW hard water causes sediment buildup on elements. Try flushing the tank (drain 2-3 gallons). If >12 years old, replacement is more economical than repair.');
    } else if (symptom === 'age') {
      setDiagnosis('📅 If your unit is 12+ years old in DFW, replacement beats repair every time. DFW hard water accelerates mineral buildup, reducing efficiency by 30-40%. New 50-gal unit: $900-1,400 installed.');
    } else if (symptom === 'rumbling') {
      setDiagnosis('🪨 Sediment buildup — classic DFW hard water problem. Flush the tank immediately. If popping or crackling continues, heating elements are coated. Schedule a flush + inspection before complete failure.');
    } else {
      setDiagnosis('Select your heater type and symptom above for a diagnosis.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'inline-block', fontWeight: 700 }}>
          🚰 DFW Plumbing Guide 2026
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>No Hot Water? DFW Troubleshooting Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW hard water (300-500 ppm) accelerates water heater failure. Use this guide to diagnose your issue before calling a plumber.
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚡ Emergency Cold Shower Tips</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Run cold water 30 sec before entering — DFW cold water is ~55°F in winter, tolerable</li>
            <li>Warm up with a kettle + bucket bath while waiting for repair</li>
            <li>Most DFW plumbers offer same-day water heater service 7am-7pm</li>
            <li>Emergency after-hours service: add $75-150 to standard rates</li>
          </ul>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Interactive Diagnosis Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Water Heater Type</label>
            <select value={heaterType} onChange={e => setHeaterType(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value="">Select type...</option>
              <option value="gas">🔥 Gas Water Heater</option>
              <option value="electric">⚡ Electric Water Heater</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Primary Symptom</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value="">Select symptom...</option>
              <option value="no-heat">❄️ Completely no hot water</option>
              <option value="lukewarm">🌡️ Water only lukewarm</option>
              <option value="rumbling">💥 Rumbling / popping sounds</option>
              <option value="age">📅 Unit is 10+ years old</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Diagnose My Issue
          </button>
          {diagnosis && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642', color: '#e2e8f0′ }}>
              {diagnosis}
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>💰 DFW Repair Cost Ranges 2026</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { item: 'Thermocouple replacement', cost: '$80–$150′ },
              { item: 'Heating element (electric)', cost: '$100–$200′ },
              { item: 'Thermostat replacement', cost: '$120–$200′ },
              { item: 'Tank flush + inspection', cost: '$80–$120′ },
              { item: 'Full unit replacement (50 gal)', cost: '$900–$1,400′ },
            ].map(r => (
              <div key={r.item} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: 8 }}>
                <span style={{ color: '#cbd5e1′ }}>{r.item}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}