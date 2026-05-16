import { useState } from 'react';

export default function DFWHVACContactorGuide2026() {
  const [step, setStep] = useState<string | null>(null);

  const facts = [
    { icon: '⚡', title: 'What It Does', body: 'Electromagnetic switch that sends 240V power to the compressor when thermostat calls for cooling. Without it, compressor never starts.' },
    { icon: '🔌', title: 'Single vs Double Pole', body: 'Single pole switches one leg of power (older systems). Double pole switches both legs — safer, more common in modern DFW installs.' },
    { icon: '🌩️', title: 'DFW Power Surges', body: 'DFW thunderstorms cause voltage spikes that pit contactor contacts. Pitting increases resistance, generates heat, causes premature failure.' },
    { icon: '💰', title: 'Replacement Cost', body: 'Part: $25-60. Labor: $150-290. Total: $200-350. One of the most cost-effective HVAC repairs — always worth replacing vs. letting fail.' },
  ];

  const diagSteps = [
    { id: 'chatter', label: 'Chattering / buzzing noise from outdoor unit', diagnosis: 'Failing contactor — contacts bouncing instead of holding firm. Often caused by weak coil or pitted contacts from DFW surge history. Replace soon.' },
    { id: 'stuck', label: 'AC won't shut off — runs continuously', diagnosis: 'Contactor stuck closed (welded contacts). Compressor runs nonstop — will freeze coil and damage compressor. Shut system off immediately.' },
    { id: 'nostart', label: 'Outdoor unit won't turn on at all', diagnosis: 'Contactor may be stuck open or coil failed. 24V control voltage should pull contactor in — if it doesn't, contactor or thermostat wiring issue.' },
    { id: 'burn', label: 'Burn marks or pitting visible on contacts', diagnosis: 'Replace immediately — pitted contacts restrict current, overheat, and can weld shut. Visual inspection is the easiest way to catch this.' },
    { id: 'intermit', label: 'System starts and stops randomly', diagnosis: 'Weak contactor coil or marginal contacts. Drops out under heat load in DFW summer. Replace before it fails completely mid-heat wave.' },
  ];

  const sel = diagSteps.find(d => d.id === step);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔌</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC Contactor Deep Dive 2026</h1>
          <p style={{ color: '#94a3b8' }}>The electrical gatekeeper of your DFW compressor</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {facts.map((f, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.5rem' }}>{f.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.5' }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #334155', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🩺 Contactor Symptom Diagnosis</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {diagSteps.map(d => (
              <button key={d.id} onClick={() => setStep(step === d.id ? null : d.id)}
                style={{ background: step === d.id ? '#F5E642' : '#0f172a', color: step === d.id ? '#0A1628' : '#e2e8f0',
                  border: '1px solid' + (step === d.id ? ' #F5E642' : ' #334155'), borderRadius: '0.5rem',
                  padding: '0.75rem 1rem', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {d.label}
              </button>
            ))}
          </div>
          {sel && (
            <div style={{ background: '#0f172a', borderRadius: '0.5rem', padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '0.5rem' }}>🔎 Diagnosis</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>{sel.diagnosis}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #3b82f6', textAlign: 'center' }}>
          <div style={{ color: '#93c5fd', fontSize: '0.9rem' }}>💡 Pro tip: Replace contactors every 5 years in DFW regardless of symptoms. $25 part beats a $2,000 compressor.</div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — Trusted DFW HVAC Service Professionals
        </div>
      </div>
    </div>
  );
}
