import { useState } from 'react';

export default function DFWHVACSystemTroubleshooting2026() {
  const [symptom, setSymptom] = useState('');
  const [step, setStep] = useState(0);

  const symptoms = [
    { id: 'no-cool', label: '❄️ Not cooling', steps: ['Check thermostat set to COOL and below current temp','Check breaker — HVAC has 2 breakers (indoor + outdoor)','Check filter — replace if gray/clogged','Check condensate drain line for clogs','Clear 2ft clearance around outdoor unit'] },
    { id: 'no-heat', label: '🔥 Not heating', steps: ['Check thermostat set to HEAT and above current temp','Check gas supply and pilot light if applicable','Check breaker and emergency shut-off switch','Check filter — dirty filter kills airflow','Check vents — ensure all supply vents open'] },
    { id: 'loud', label: '🔊 Loud noises', steps: ['Banging = loose parts or debris in unit','Squealing = belt or bearing issue','Clicking repeatedly = relay problem','Hissing = refrigerant leak (call ProLnk now)','Rattling = loose panels — tighten screws'] },
    { id: 'short-cycle', label: '🔄 Turns on/off rapidly', steps: ['Check filter — #1 cause of short cycling','Check thermostat location — away from vents?','Check refrigerant — low charge causes this','Check outdoor unit for ice buildup','System may be oversized — ProLnk can assess'] },
  ];

  const selected = symptoms.find(s => s.id === symptom);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ProLnk DFW · 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>🌡️ DFW HVAC Quick Troubleshooting</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px' }}>5-minute diagnosis before you call a pro. DFW summers hit 105°F — use this first.</p>

        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What is your system doing?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => { setSymptom(s.id); setStep(0); }}
                style={{ background: symptom === s.id ? '#F5E642' : '#1e2d45', color: symptom === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: '10px', padding: '14px', cursor: 'pointer', fontWeight: 700, fontSize: '14px', textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <p style={{ color: '#F5E642', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>5-Step Diagnosis</p>
            {selected.steps.map((s, i) => (
              <div key={i} onClick={() => setStep(i)} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', cursor: 'pointer', opacity: step === i ? 1 : 0.6 }}>
                <div style={{ background: step === i ? '#F5E642' : '#334155', color: step === i ? '#0A1628' : '#fff', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0 }}>{i + 1}</div>
                <p style={{ color: step === i ? '#fff' : '#94a3b8', fontSize: '14px', margin: 0, paddingTop: '3px' }}>{s}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '14px', padding: '20px' }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>✅ Completed all 5 checks?</p>
          <p style={{ color: '#0A1628', fontSize: '14px', margin: '0 0 12px' }}>If the problem persists, it's time for a licensed DFW HVAC pro. ProLnk matches you with verified, TDLR-licensed technicians — usually within 2 hours in summer.</p>
          <a href="/" style={{ background: '#0A1628', color: '#F5E642', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Get DFW HVAC Quote →</a>
        </div>
      </div>
    </div>
  );
}