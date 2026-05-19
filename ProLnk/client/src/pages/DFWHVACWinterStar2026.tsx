import { useState } from 'react';

const steps = [
  { icon: '🔧', title: 'Replace Filter First', detail: 'Install fresh filter before powering on — dirty filters restrict airflow and can overheat heat exchanger on first run.' },
  { icon: '🌡️', title: 'Switch to Heat Mode', detail: 'Set thermostat to HEAT, fan to AUTO, target 68–70°F. Allow 5 minutes for system to stage up.' },
  { icon: '💨', title: 'Burn-Off Period', detail: 'Run 15–20 minutes with windows cracked. Dust on heat exchanger combusts — light smoke and smell are normal.' },
  { icon: '📏', title: 'Check Temperature Rise', detail: 'Hold thermometer at register. DFW gas furnaces should show 40–70°F rise over return air. Below 40°F = airflow issue.' },
  { icon: '👂', title: 'Listen for Sounds', detail: 'Rumbling = burner issue. Banging = duct expansion or loose panel. Squealing = blower bearing. Clicking = igniter fault.' },
];

const symptoms = [
  { label: 'No heat after 10 min', response: 'Check breaker and filter. If clear, likely igniter or gas valve — call ProLnk.' },
  { label: 'Burning smell persists', response: 'Turn off immediately. Could be wiring issue or cracked heat exchanger — call ProLnk today.' },
  { label: 'Short cycling on/off', response: 'Usually dirty filter or blocked flue. Replace filter first; if continues, call ProLnk.' },
  { label: 'Loud banging on startup', response: 'Delayed ignition — potentially dangerous. Call ProLnk immediately, do not run system.' },
  { label: 'Registers blowing cold', response: 'Thermostat wired wrong or reversing valve stuck. ProLnk HVAC tech needed.' },
];

export default function DFWHVACWinterStar2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW HVAC Winter Startup Guide 2026</h1>
        <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 32 }}>First heat of the season done right — 5 steps before you call anyone.</p>

        <div style={{ marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, background: '#0f1f38', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 26 }}>{s.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Step {i + 1}: {s.title}</div>
                <div style={{ color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f38', borderRadius: 12, padding: '24px 20px', marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔍 Symptom → Response Guide</div>
          <p style={{ color: '#8899aa', fontSize: 13, marginBottom: 16 }}>Select a symptom to see recommended next step:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {symptoms.map((s, i) => (
              <div key={i}>
                <button
                  onClick={() => setSelected(selected === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: selected === i ? '#F5E642′ : '#162035', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                  {s.label}
                </button>
                {selected === i && (
                  <div style={{ background: '#1a2d4a', borderRadius: '0 0 8px 8px', padding: '12px 16px', color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>
                    {s.response}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🔥 Issue beyond DIY? Get a DFW HVAC Pro</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 6 }}>ProLnk matches you with licensed DFW technicians — free quotes, fast response.</div>
        </div>
      </div>
    </div>
  );
}