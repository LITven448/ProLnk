import { useState } from 'react';

export default function DFWHVACTXVGuide2026() {
  const [active, setActive] = useState<string | null>(null);

  const concepts = [
    { icon: '🎛️', title: 'TXV vs EEV', body: 'TXV (Thermostatic Expansion Valve) is mechanical. EEV (Electronic Expansion Valve) is motor-driven. Both meter refrigerant flow — EEV is more precise, common in 16+ SEER systems now required in DFW.' },
    { icon: '💧', title: 'DFW Humidity Problem', body: 'High DFW humidity makes TXV diagnosis tricky. Condensation on lines can be normal or a symptom. Subcooling and superheat measurements are the only reliable diagnostic — not visual inspection.' },
    { icon: '🌡️', title: 'What Failure Looks Like', body: 'TXV stuck closed: superheat too high, suction pressure low, coil not getting cold. TXV stuck open: suction pressure high, liquid slugging, compressor damage risk.' },
    { icon: '💰', title: 'Repair Cost', body: 'TXV replacement: $300–$600 labor + $50-150 part. EEV replacement on newer systems: $400-800. Always replace filter drier at same time (+$50).' },
  ];

  const symptoms = [
    { id: 'warm', label: 'System runs but barely cools', diag: 'TXV stuck partially closed — refrigerant flow restricted. Measure superheat: if >15°F on suction line, TXV is likely failing. Evacuate and replace.' },
    { id: 'ice', label: 'Ice forming on indoor coil or suction line', diag: 'TXV stuck closed causes low evaporator pressure → coil freezes. Shut system off for 1 hour to defrost, then have tech measure pressures before restarting.' },
    { id: 'hunt', label: 'System cycles rapidly on/off', diag: 'TXV hunting — valve oscillating between open/closed states. Causes pressure fluctuations that trigger low-pressure safety. Common in DFW when sensing bulb loses contact with suction line.' },
    { id: 'liquid', label: 'Gurgling sound at indoor unit', diag: 'TXV stuck open — liquid refrigerant entering compressor (liquid slugging). Shut off immediately. Can destroy compressor within hours. Emergency service call needed.' },
    { id: 'bulb', label: 'System stopped working after refrigerant work', diag: 'Sensing bulb may have been disturbed. TXV sensing bulb must be clamped tightly to suction line with insulation. Check bulb position before replacing valve.' },
  ];

  const sel = symptoms.find(s => s.id === active);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🎛️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC TXV Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Thermostatic Expansion Valve — the refrigerant traffic cop</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {concepts.map((c, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{c.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #334155' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🩺 TXV Symptom → Diagnosis</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
                style={{ background: active === s.id ? '#F5E642' : '#0f172a', color: active === s.id ? '#0A1628' : '#e2e8f0',
                  border: '1px solid' + (active === s.id ? ' #F5E642' : ' #334155'), borderRadius: '0.5rem',
                  padding: '0.75rem 1rem', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {sel && (
            <div style={{ background: '#0f172a', borderRadius: '0.5rem', padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '0.5rem' }}>🔎 Assessment</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>{sel.diag}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — Verified DFW HVAC Professionals
        </div>
      </div>
    </div>
  );
}
