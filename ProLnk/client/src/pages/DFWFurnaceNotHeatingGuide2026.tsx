import { useState } from 'react';

const symptoms = [
  { id: 'no-heat', label: '🥶 Blows cold air, no heat', steps: ['Check thermostat — switch to HEAT mode, set 3° above room temp', 'Check furnace power switch on unit (looks like a light switch)', 'Check breaker — furnace has dedicated circuit', 'Check pilot light or ignitor indicator light on furnace', 'Replace filter — severely clogged filter causes furnace to shut off on high limit'] },
  { id: 'no-ignite', label: '🔥 Furnace clicks but won't ignite', steps: ['Turn thermostat to HEAT and listen for ignitor glow (HSI) or click (spark)', 'If clicking repeatedly without flame: gas supply issue or dirty flame sensor', 'Check gas valve is open (parallel to pipe = open)', 'Reset furnace: flip power switch off, wait 30 sec, flip back on', '3 failed ignition attempts = call a pro to clean flame sensor'] },
  { id: 'partial-heat', label: '😬 Heats then shuts off', steps: ['Replace filter immediately — most common cause of high-limit shutoff', 'Check all vents open — restricted airflow causes overheating and shutoff', 'Check inducer motor running before burner starts', 'If error code showing on furnace board, Google the code + your model', 'Call a tech if same day — DFW cold fronts hit fast and book up HVAC techs same day'] },
];

export default function DFWFurnaceNotHeatingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>🔥 DFW Furnace Not Heating — 2026 Guide</h1>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>DFW furnaces sit idle 10 months a year. When the first cold front hits, here's how to troubleshoot fast.</p>
        </div>

        <div style={{ background: '#ff4444', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>⚠️</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>DFW Cold Front Warning</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>When temps drop below 40°F, every HVAC tech in DFW books same-day. Call ProLnk first — we match you before the rush.</div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🔍 What symptom do you have?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '14px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ marginTop: 20, background: '#0d1f3c', borderRadius: 8, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Diagnosis Steps</h3>
              {active.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ color: '#F5E642', fontWeight: 800, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ color: '#cdd9e5' }}>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🛡️ Annual DFW Furnace Prep</h2>
          {['Replace filter before October each year', 'Test furnace in September — before cold hits', 'Schedule tune-up in fall (cheaper than emergency calls)', 'Know your furnace model and error code chart'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#cdd9e5' }}>✅ {item}</div>
          ))}
          <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>ProLnk gets a tech to you same day — even during cold snaps.</div>
          </div>
        </div>
      </div>
    </div>
  );
}