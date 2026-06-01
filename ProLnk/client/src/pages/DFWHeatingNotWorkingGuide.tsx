import { useState } from 'react';

const furnaceSteps = [
  { id: 'pilot', label: 'Pilot Light / Igniter', emoji: '🔥', detail: 'Gas furnace: check if pilot is lit. Modern furnaces use electronic igniter — listen for clicking then whoosh.' },
  { id: 'thermocouple', label: 'Thermocouple', emoji: '🌡️', detail: 'If pilot keeps going out, thermocouple may be faulty. Inexpensive fix ($20–$80) but requires tech.' },
  { id: 'gas', label: 'Gas Supply', emoji: '⛽', detail: 'Check other gas appliances (stove, water heater). If all off, call gas company — not an HVAC issue.' },
  { id: 'heat-exchanger', label: 'Heat Exchanger', emoji: '🔩', detail: 'Cracked heat exchanger = CO risk. If CO alarm goes off, evacuate immediately and call 911.' },
];

const heatPumpSteps = [
  { id: 'defrost', label: 'Defrost Cycle', emoji: '🧊', detail: 'DFW cold fronts can trigger defrost mode — outdoor unit frosts, system pauses 5–15 min. Normal.' },
  { id: 'emergency', label: 'Emergency Heat', emoji: '🆘', detail: 'Switch to emergency heat if outdoor unit is clearly failing. Higher cost but keeps home warm.' },
  { id: 'reversing', label: 'Reversing Valve', emoji: '🔄', detail: 'Heat pump stuck in cooling mode = bad reversing valve. Requires licensed HVAC tech.' },
];

const diagMap: Record<string, Record<string, { steps: string; urgency: string; cost: string }>> = {
  furnace: {
    'no-heat': { steps: 'Check thermostat heat mode → check filter → check pilot/igniter → check breaker → call tech', urgency: 'High if below 40°F outside', cost: '$80–$600' },
    'weak-heat': { steps: 'Replace filter → check all vents open → inspect heat exchanger for cracks', urgency: 'Moderate — schedule within 48h', cost: '$50–$400' },
    'short-cycling': { steps: 'Dirty filter most common cause → check flue pipe not blocked → call if continues', urgency: 'High — can damage unit', cost: '$100–$500' },
  },
  'heat-pump': {
    'no-heat': { steps: 'Check defrost mode (wait 15 min) → switch to emergency heat → call HVAC', urgency: 'High if temps below 35°F', cost: '$150–$800' },
    'weak-heat': { steps: 'Heat pumps lose efficiency below 35°F — normal. Supplement with emergency heat.', urgency: 'Low if above 35°F outside', cost: '$0–$200' },
    'short-cycling': { steps: 'Check refrigerant charge → inspect reversing valve → call licensed tech', urgency: 'High — compressor at risk', cost: '$200–$1,000' },
  },
};

export default function DFWHeatingNotWorkingGuide() {
  const [system, setSystem] = useState('');
  const [symptom, setSymptom] = useState('');
  const result = system && symptom ? diagMap[system]?.[symptom] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW WINTER EMERGENCY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔥 Heating Not Working — DFW Troubleshooting Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW winters are mild but cold fronts drop temps rapidly. Know your system type and act fast before pipes freeze.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div style={{ background: '#132035', borderRadius: 10, padding: 18 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>🔥 Gas Furnace Steps</h2>
            {furnaceSteps.map(s => (
              <div key={s.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.emoji} {s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#132035', borderRadius: 10, padding: 18 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>💨 Heat Pump Steps</h2>
            {heatPumpSteps.map(s => (
              <div key={s.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.emoji} {s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 10, padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Heating Diagnosis Tool</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Heating system type?</label>
            <select value={system} onChange={e => setSystem(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select system...</option>
              <option value="furnace">Gas Furnace</option>
              <option value="heat-pump">Heat Pump</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>What is it doing?</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select symptom...</option>
              <option value="no-heat">Not producing any heat</option>
              <option value="weak-heat">Producing weak or insufficient heat</option>
              <option value="short-cycling">Turning on and off rapidly</option>
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Steps: </span>{result.steps}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Urgency: </span>{result.urgency}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Est. Cost: </span>{result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 16, fontSize: 14 }}>
          ❄️ <strong>Freeze Protection:</strong> If heating fails overnight, let faucets drip slowly to prevent pipe freezing. Focus on pipes along exterior walls and under sinks on outside walls.
        </div>
      </div>
    </div>
  );
}
