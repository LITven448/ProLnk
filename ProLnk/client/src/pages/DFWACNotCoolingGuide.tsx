import { useState } from 'react';

const steps = [
  { id: 'thermostat', label: 'Thermostat & Settings', emoji: '🌡️' },
  { id: 'filter', label: 'Air Filter', emoji: '🔲' },
  { id: 'capacitor', label: 'Capacitor / Fan', emoji: '⚡' },
  { id: 'refrigerant', label: 'Refrigerant / Coils', emoji: '❄️' },
  { id: 'condenser', label: 'Condenser Cleaning', emoji: '🧹' },
];

const symptomMap: Record<string, Record<string, { cause: string; diy: string; urgency: string; cost: string }>> = {
  warm_air: {
    below90: { cause: 'Dirty filter or low refrigerant', diy: 'Replace filter; check vents open', urgency: 'Moderate — schedule within 48h', cost: '$20–$400' },
    t90to100: { cause: 'Capacitor failure or refrigerant leak', diy: 'Listen for clicking at outdoor unit', urgency: 'High — same day', cost: '$150–$800' },
    above100: { cause: 'System overload or refrigerant critically low', diy: 'Shade outdoor unit; call HVAC now', urgency: '🚨 Emergency', cost: '$300–$1,200' },
  },
  not_running: {
    below90: { cause: 'Tripped breaker or bad capacitor', diy: 'Reset breaker; check thermostat batteries', urgency: 'Moderate', cost: '$100–$400' },
    t90to100: { cause: 'Capacitor burned out from heat load', diy: 'Check outdoor disconnect box', urgency: 'High — same day', cost: '$150–$500' },
    above100: { cause: 'Thermal overload or compressor failure', diy: 'Do not reset repeatedly — call HVAC', urgency: '🚨 Emergency', cost: '$500–$3,000' },
  },
  freezing: {
    below90: { cause: 'Dirty coils or blocked airflow', diy: 'Turn off cooling; run fan only 2h to thaw', urgency: 'Moderate', cost: '$80–$300' },
    t90to100: { cause: 'Low refrigerant causing ice buildup', diy: 'Thaw then test — if repeats, call tech', urgency: 'High', cost: '$200–$600' },
    above100: { cause: 'Refrigerant critically low — compressor at risk', diy: 'Shut down system; call HVAC immediately', urgency: '🚨 Emergency', cost: '$400–$1,500' },
  },
};

export default function DFWACNotCoolingGuide() {
  const [symptom, setSymptom] = useState('');
  const [temp, setTemp] = useState('');
  const tempKey = temp === 'below-90' ? 'below90' : temp === '90-100' ? 't90to100' : temp === 'above-100' ? 'above100' : '';
  const symptomKey = symptom === 'warm-air' ? 'warm_air' : symptom === 'not-running' ? 'not_running' : symptom;
  const result = symptomKey && tempKey ? symptomMap[symptomKey]?.[tempKey] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW SUMMER EMERGENCY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>❄️ AC Not Cooling — DFW Troubleshooting Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>In DFW summers, a failing AC is a health emergency. Use this guide to diagnose fast and know when to call.</p>
        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {steps.map(s => (
            <div key={s.id} style={{ background: '#132035', borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>{s.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>Step: {s.label}</div>
                {s.id === 'thermostat' && <div style={{ color: '#94a3b8', fontSize: 13 }}>Set to COOL, 3°F below room temp. Check batteries. Try auto vs on fan mode.</div>}
                {s.id === 'filter' && <div style={{ color: '#94a3b8', fontSize: 13 }}>A clogged filter blocks airflow and causes freeze-up. Replace if gray/dark. ($10–$25)</div>}
                {s.id === 'capacitor' && <div style={{ color: '#94a3b8', fontSize: 13 }}>Listen at outdoor unit — clicking but not starting = bad capacitor. Common in DFW heat. ($150–$400)</div>}
                {s.id === 'refrigerant' && <div style={{ color: '#94a3b8', fontSize: 13 }}>Ice on copper lines or warm air = low refrigerant. Requires licensed tech. ($200–$800)</div>}
                {s.id === 'condenser' && <div style={{ color: '#94a3b8', fontSize: 13 }}>Dirty outdoor coils reduce efficiency 30%. Hose down fins gently top-to-bottom.</div>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#132035', borderRadius: 10, padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Symptom Checker</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>What is the AC doing?</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select symptom...</option>
              <option value="warm-air">Running but blowing warm air</option>
              <option value="not-running">Not running at all</option>
              <option value="freezing">Ice forming on unit or lines</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Outside temperature?</label>
            <select value={temp} onChange={e => setTemp(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select temp range...</option>
              <option value="below-90">Below 90°F</option>
              <option value="90-100">90–100°F</option>
              <option value="above-100">Above 100°F</option>
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Likely Cause: </span>{result.cause}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>DIY Check: </span>{result.diy}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Urgency: </span>{result.urgency}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Est. Cost: </span>{result.cost}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#7f1d1d', borderRadius: 8, padding: 16, fontSize: 14 }}>
          ⚠️ <strong>DFW Heat Safety:</strong> Indoor temps above 90°F are dangerous. Elderly, pets, and children are at highest risk. Move to a cooling center or hotel if AC fails above 100°F outside.
        </div>
      </div>
    </div>
  );
}
