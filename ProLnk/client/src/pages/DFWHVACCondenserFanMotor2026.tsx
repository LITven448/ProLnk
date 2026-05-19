import { useState } from 'react';

const SYMPTOMS = [
  { id: 'humming', label: 'Humming but not spinning', emoji: '🔊', diagnosis: 'Capacitor failure (90% likely). Test capacitor first — $15 part, $80–$140 installed. Do NOT replace motor yet.', cost: '$80–$140' },
  { id: 'slow-start', label: 'Fan starts slow / struggles', emoji: '🐢', diagnosis: 'Weak capacitor or worn motor bearings. Start with capacitor replacement — if still slow after, motor needs replacement.', cost: '$80–$400' },
  { id: 'no-spin', label: 'Not spinning at all (no hum)', emoji: '⛔', diagnosis: 'Contactor or control board issue — fan motor receives no signal. Check capacitor and contactor before replacing motor.', cost: '$100–$300' },
  { id: 'overheat', label: 'Motor hot to touch, shuts off', emoji: '🔥', diagnosis: 'DFW ambient temps (105°F+) cause thermal overload. Ensure airflow clear, clean coils. ECM motor upgrade handles heat better.', cost: '$250–$600' },
  { id: 'noise', label: 'Grinding / rattling noise', emoji: '⚙️', diagnosis: 'Fan blade hitting housing or worn motor bearings. Check blade alignment first. Motor replacement likely needed.', cost: '$200–$400' },
  { id: 'intermittent', label: 'Works sometimes, not others', emoji: '🎲', diagnosis: 'Thermal overload protector tripping. Clean coils, check refrigerant charge. Capacitor or wiring issue if persists.', cost: '$80–$350' },
];

const MOTOR_TYPES = [
  { type: 'Single Speed', emoji: '1️⃣', note: 'On/off only. Common in older units. Least efficient — runs at full power regardless of load.', cost: '$150–$250' },
  { type: 'Dual Speed', emoji: '2️⃣', note: 'High and low speed. Better efficiency at low load. Step up from single speed.', cost: '$180–$320' },
  { type: 'ECM (Variable Speed)', emoji: '♾️', note: 'Electronically commutated — self-regulates speed for conditions. Best for DFW heat, most efficient, longest life.', cost: '$350–$600' },
];

export default function DFWHVACCondenserFanMotor2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = SYMPTOMS.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌀</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW AC Condenser Fan Motor Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Fan motor diagnosis, motor types, and DFW-specific failure patterns</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 18, marginBottom: 24, borderLeft: '4px solid #FF8800' }}>
          <h2 style={{ color: '#FF8800', fontSize: 15, margin: '0 0 8px' }}>⚠️ Capacitor First — Common Misdiagnosis</h2>
          <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            DFW techs commonly quote a full motor replacement when the capacitor is the actual failure. A $15–$40 capacitor part causes 60% of fan motor symptoms. Always test and replace capacitor first before a $200–$400 motor swap.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ Motor Types in DFW Outdoor Units</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {MOTOR_TYPES.map(m => (
              <div key={m.type} style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 26, textAlign: 'center' }}>{m.emoji}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textAlign: 'center', marginTop: 6 }}>{m.type}</div>
                <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 6, lineHeight: 1.6 }}>{m.note}</div>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginTop: 8 }}>{m.cost} installed</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔍 Select Your Fan Symptom for Diagnosis</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 10, marginBottom: 24 }}>
          {SYMPTOMS.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? '#1E3A5F' : '#112240', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 10px', cursor: 'pointer', color: '#fff', textAlign: 'center', fontSize: 12 }}>
              <div style={{ fontSize: 26 }}>{s.emoji}</div>
              <div style={{ fontWeight: 600, marginTop: 6 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 11, marginTop: 4 }}>{s.cost}</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px' }}>{active.emoji} {active.label}</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, margin: '0 0 10px' }}>{active.diagnosis}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
              <span style={{ color: '#94A3B8', fontSize: 12 }}>Typical repair cost: </span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{active.cost}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 12px' }}>Get HVAC diagnoses from vetted DFW technicians</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🌀 Find HVAC Techs in DFW
          </button>
        </div>
      </div>
    </div>
  );
}
