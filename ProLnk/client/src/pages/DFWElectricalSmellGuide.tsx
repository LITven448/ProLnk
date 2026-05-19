import { useState } from 'react';

const immediateSteps = [
  { emoji: '👃', label: 'Locate the Smell', detail: 'Move slowly through the home. Is it stronger near an outlet, the panel, a specific wall, or ceiling? Location narrows the cause dramatically.' },
  { emoji: '🔌', label: 'Do NOT Plug/Unplug', detail: 'Do not touch outlets if you smell burning near them. Arcing can occur when you make or break contact with a hot circuit.' },
  { emoji: '🔦', label: 'Check Visible Outlets', detail: 'Look for discoloration, melted plastic, or scorch marks. Any of these = do not use this outlet and call an electrician today.' },
  { emoji: '🚪', label: 'Ventilate the Space', detail: 'Open windows. If smell is strong, occupants should step outside while you investigate or while waiting for help.' },
];

const dfwFactors = [
  { emoji: '❄️', factor: 'AC Overload', detail: 'DFW AC systems run near maximum capacity all summer. This overloads circuits and can overheat wiring in homes wired pre-1990.' },
  { emoji: '🏠', factor: '1980s Wiring', detail: 'Many DFW suburbs built in the 1980s still have aluminum branch circuit wiring or older panels that struggle with today\’s electrical demand.' },
  { emoji: '⛈️', factor: 'Storm Surge', detail: 'DFW storms cause voltage spikes and surges that burn out outlets and can damage wiring inside walls.' },
  { emoji: '🌡️', factor: 'Attic Heat', detail: 'DFW attics hit 140°F+ in summer. Wiring insulation in attics degrades faster, increasing fire risk in older homes.' },
];

const actionMap: Record<string, Record<string, { risk: string; action: string; callWho: string }>> = {
  outlet: {
    'smell-only': { risk: 'Moderate', action: 'Stop using outlet immediately. Check for discoloration. Test other outlets on same circuit.', callWho: 'Electrician — schedule today or tomorrow' },
    'visible-scorch': { risk: '🚨 High', action: 'Do not use. Switch off circuit breaker for that area. Do not touch outlet.', callWho: 'Emergency electrician — call now' },
    'smoke-sparks': { risk: '🚨 Emergency', action: 'Switch off main breaker. Evacuate. Call 911 if smoke continues.', callWho: '911 first, then electrician' },
  },
  panel: {
    'smell-only': { risk: '🚨 High', action: 'Burning smell from panel is always serious. Do not open panel. Call electrician immediately.', callWho: 'Emergency electrician — call now' },
    'visible-scorch': { risk: '🚨 Emergency', action: 'Evacuate. Do not touch panel. Call 911 — panel fires spread rapidly inside walls.', callWho: '911 immediately' },
    'smoke-sparks': { risk: '🚨 Life Safety', action: 'Evacuate all occupants immediately. Call 911. Do not re-enter.', callWho: '911 — do not delay' },
  },
  wall: {
    'smell-only': { risk: 'Moderate–High', action: 'Feel wall for warmth. If warm, this indicates active arcing inside wall. Evacuate that room.', callWho: 'Emergency electrician if wall is warm; schedule electrician if not' },
    'visible-scorch': { risk: '🚨 High', action: 'Scorch on wall means fire may be inside wall cavity. Evacuate and call 911.', callWho: '911 — wall fires are hidden and dangerous' },
    'smoke-sparks': { risk: '🚨 Emergency', action: 'Evacuate. Call 911. Hidden wall fires spread to attic rapidly.', callWho: '911 immediately' },
  },
  appliance: {
    'smell-only': { risk: 'Low–Moderate', action: 'Unplug appliance if safe to do so. Check cord for melted insulation.', callWho: 'Appliance repair or replacement; electrician if outlet is also affected' },
    'visible-scorch': { risk: 'Moderate', action: 'Unplug if no sparks present. Appliance is failed — do not use.', callWho: 'Appliance replacement; check outlet condition' },
    'smoke-sparks': { risk: '🚨 High', action: 'Do not touch appliance. Turn off breaker. Use fire extinguisher ONLY if fire is contained.', callWho: '911 if fire; electrician if no fire but outlet involved' },
  },
};

export default function DFWElectricalSmellGuide() {
  const [location, setLocation] = useState('');
  const [symptom, setSymptom] = useState('');
  const result = location && symptom ? actionMap[location]?.[symptom] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#ef4444', color: '#fff', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>🚨 POTENTIAL FIRE EMERGENCY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>⚡ Burning Electrical Smell — DFW Emergency Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>A burning smell from outlets, panels, or walls is a potential fire emergency. DFW homes have specific electrical risk factors — act immediately and correctly.</p>

        <div style={{ background: '#7f1d1d', borderRadius: 8, padding: 14, marginBottom: 24, fontSize: 14 }}>
          🔥 <strong>If you see smoke, flames, or the smell is overwhelming: Evacuate immediately and call 911. Do not investigate further.</strong>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔍 Safe Investigation Steps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {immediateSteps.map(s => (
              <div key={s.label} style={{ background: '#132035', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{s.emoji} {s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🏠 DFW Electrical Risk Factors</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {dfwFactors.map(f => (
              <div key={f.factor} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{f.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{f.factor}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 10, padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚡ Emergency Assessment Tool</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>Where is the smell coming from?</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select location...</option>
              <option value="outlet">Outlet or switch</option>
              <option value="panel">Electrical panel / breaker box</option>
              <option value="wall">Wall or ceiling (no visible source)</option>
              <option value="appliance">Appliance or device</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>What else are you observing?</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select observation...</option>
              <option value="smell-only">Smell only — no visible damage</option>
              <option value="visible-scorch">Discoloration or scorch marks visible</option>
              <option value="smoke-sparks">Smoke or sparks present</option>
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${result.risk.includes('🚨') ? '#ef4444' : '#F5E642'}` }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Risk Level: </span>{result.risk}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Immediate Action: </span>{result.action}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Who to Call: </span>{result.callWho}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 14, fontSize: 13 }}>
          🛡️ <strong>Prevention:</strong> Have your panel and wiring inspected every 10 years in DFW homes built before 2000. Arc fault circuit interrupters (AFCIs) are the most effective protection against hidden wiring fires and cost $30–$60 per circuit to install.
        </div>
      </div>
    </div>
  );
}
