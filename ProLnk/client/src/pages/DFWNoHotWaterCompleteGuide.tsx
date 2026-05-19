import { useState } from 'react';

const gasSteps = [
  { id: 'pilot', emoji: '🔥', label: 'Check Pilot Light', detail: 'Look through the sight glass at bottom of tank. No flame = pilot is out. Relight per label instructions on tank.' },
  { id: 'thermocouple', emoji: '🌡️', label: 'Thermocouple', detail: 'If pilot relights but goes out within 30 sec, thermocouple is bad. $20–$50 part, 30-min fix for a plumber.' },
  { id: 'gas-valve', emoji: '⛽', label: 'Gas Valve / Thermostat', detail: 'Set to 120°F. If pilot is lit but no hot water, thermostat or gas valve may be faulty. Call a plumber.' },
  { id: 'sediment', emoji: '🪨', label: 'Sediment Buildup (DFW Hard Water)', detail: 'DFW water is hard — sediment accumulates on burner and reduces efficiency. Rumbling/popping sounds confirm this. Flush tank annually.' },
];

const electricSteps = [
  { id: 'breaker', emoji: '⚡', label: 'Check Breaker', detail: 'Water heater is on a dedicated 240V circuit. Check panel for tripped breaker — reset once.' },
  { id: 'reset', emoji: '🔄', label: 'Reset Button', detail: 'High-limit reset button is behind upper access panel. Press red button. If it trips again, call a plumber.' },
  { id: 'elements', emoji: '🔩', label: 'Heating Elements', detail: 'Electric tanks have upper and lower elements. Failed element = lukewarm or no hot water. $20–$40 part but requires draining tank.' },
  { id: 'thermostat-e', emoji: '🎛️', label: 'Thermostat (Electric)', detail: 'Each element has its own thermostat behind access panels. Faulty thermostat prevents element from activating.' },
];

const diagMap: Record<string, Record<string, { action: string; diyOrPro: string; cost: string }>> = {
  gas: {
    no-hot: { action: 'Check pilot → relight per instructions → if fails call plumber', diyOrPro: 'DIY pilot relight; plumber if thermocouple or gas valve', cost: '$0–$350' },
    lukewarm: { action: 'Check thermostat setting → flush sediment → inspect lower burner', diyOrPro: 'DIY flush; plumber for thermostat/burner', cost: '$0–$200' },
    runs-out-fast: { action: 'Tank too small for demand OR heavy sediment buildup reducing capacity', diyOrPro: 'DIY flush; consider upgrade', cost: '$0–$1,800' },
  },
  electric: {
    no-hot: { action: 'Reset breaker → press high-limit reset → call plumber if still no heat', diyOrPro: 'DIY breaker/reset; plumber for elements', cost: '$0–$300' },
    lukewarm: { action: 'Upper element most likely failed — lower element handles volume, upper handles recovery', diyOrPro: 'Plumber recommended — involves draining tank', cost: '$100–$300' },
    runs-out-fast: { action: 'Lower heating element failed OR thermostat set too low', diyOrPro: 'Plumber for element; DIY thermostat adjustment', cost: '$0–$250' },
  },
  tankless: {
    no-hot: { action: 'Check error code on display → verify gas/electric supply → clean inlet filter', diyOrPro: 'DIY filter clean; tech for error codes', cost: '$0–$400' },
    lukewarm: { action: 'Flow rate exceeds unit capacity OR scale buildup on heat exchanger', diyOrPro: 'DIY: reduce simultaneous demand; tech: descale', cost: '$100–$500' },
    runs-out-fast: { action: 'Tankless units do not run out — if flow drops, scale buildup likely', diyOrPro: 'Annual descaling service', cost: '$150–$300' },
  },
};

export default function DFWNoHotWaterCompleteGuide() {
  const [heaterType, setHeaterType] = useState('');
  const [symptom, setSymptom] = useState('');
  const result = heaterType && symptom ? diagMap[heaterType]?.[symptom] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚿 No Hot Water — Complete DFW Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW hard water accelerates water heater failure. This guide covers gas, electric, and tankless systems with DFW-specific context.</p>

        <div style={{ background: '#132035', borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🪨 DFW Hard Water Warning</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>DFW municipal water averages 15–25 grains per gallon hardness. Sediment buildup cuts tank life from 12 years to 7–8 years. Annual flushing is strongly recommended.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div style={{ background: '#132035', borderRadius: 10, padding: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>⛽ Gas Tank Steps</h2>
            {gasSteps.map(s => (
              <div key={s.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{s.emoji} {s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#132035', borderRadius: 10, padding: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>⚡ Electric Tank Steps</h2>
            {electricSteps.map(s => (
              <div key={s.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{s.emoji} {s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 10, padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Diagnosis Tool</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Water heater type?</label>
            <select value={heaterType} onChange={e => setHeaterType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select type...</option>
              <option value="gas">Gas Tank</option>
              <option value="electric">Electric Tank</option>
              <option value="tankless">Tankless (Gas or Electric)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>What is happening?</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select symptom...</option>
              <option value="no-hot">No hot water at all</option>
              <option value="lukewarm">Only lukewarm water</option>
              <option value="runs-out-fast">Hot water runs out quickly</option>
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Action: </span>{result.action}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>DIY vs Plumber: </span>{result.diyOrPro}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Est. Cost: </span>{result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 14, fontSize: 13 }}>
          💡 <strong>Replacement Tip:</strong> Water heaters 10+ years old in DFW should be replaced proactively. Tankless units last 20+ years and eliminate standby heat loss — typical ROI in 5–7 years.
        </div>
      </div>
    </div>
  );
}
