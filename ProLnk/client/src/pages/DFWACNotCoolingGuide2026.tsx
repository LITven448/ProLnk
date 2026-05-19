import { useState } from 'react';

const symptoms = [
  { id: 'no-cool', label: '🌡️ Blowing warm air', steps: ['Check thermostat — set to COOL, set 3° below room temp', 'Check/replace air filter — clogged filter is #1 cause in DFW', 'Check circuit breaker — reset if tripped', 'Go outside — clear debris from condenser unit', 'Check condensate drain line — flush with vinegar if clogged'] },
  { id: 'no-air', label: '💨 No airflow at all', steps: ['Check thermostat is ON and fan is set to AUTO', 'Check breaker panel — HVAC often has 2 breakers', 'Replace filter if completely blocked', 'Check all vents are open in home', 'Call a pro — blower motor may have failed'] },
  { id: 'weak-cool', label: '🥵 Cooling but barely', steps: ['Replace filter immediately', 'Check all supply/return vents are unobstructed', 'Look for ice on the copper lines outside — if frozen, turn off and let thaw', 'Low refrigerant likely — requires licensed tech', 'Check if outdoor unit is running — capacitor may be failed'] },
];

export default function DFWACNotCoolingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>🥵 DFW AC Not Cooling — 2026 Troubleshooting Guide</h1>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>Dallas-Fort Worth summer heat demands a working AC. Start here before calling a tech.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>⚡ Quick Checklist (Do These First)</h2>
          {['Thermostat set to COOL, fan to AUTO', 'Filter checked/replaced (most common fix in DFW)', 'Both breakers ON in panel', 'Outdoor condenser unit running', 'Condensate drain not overflowing'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontSize: 18 }}>✅</span>
              <span style={{ color: '#cdd9e5′ }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🔍 What symptom do you have?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ marginTop: 20, background: '#0d1f3c', borderRadius: 8, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Step-by-Step Diagnosis</h3>
              {active.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ color: '#F5E642', fontWeight: 800, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ color: '#cdd9e5′ }}>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📞 When to Call a Pro</h2>
          {['Ice forming on refrigerant lines', 'Breaker trips repeatedly', 'Unit over 12 years old with declining performance', 'Refrigerant smell (sweet chemical odor)', 'No improvement after filter + breaker reset'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#cdd9e5′ }}>🚨 {item}</div>
          ))}
          <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>ProLnk connects you with DFW HVAC techs — fast.</div>
          </div>
        </div>
      </div>
    </div>
  );
}