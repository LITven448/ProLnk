import { useState } from 'react';

export default function DFWProLnkMatchDemo2026() {
  const [service, setService] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const services = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Pest Control'];

  const steps = [
    ['📝', 'Homeowner Submits Request', 'You describe your {service} issue and upload a photo. Takes 2 minutes.'],
    ['🤖', 'AI Routes Your Job', 'ProLnk AI finds top Charter {service} pros in your DFW service area.'],
    ['⚡', 'Pro Accepts', 'First available Charter {service} pro reviews and accepts your job.'],
    ['🛠️', 'Job Completed', 'Your {service} pro arrives and completes the work.'],
    ['⭐', 'You Rate + Vault Updates', 'You confirm completion and rate the pro. Job auto-logs to your Home Health Vault.'],
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔄</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            ProLnk Match Process Demo 2026
          </h1>
          <p style={{ color: '#9BAECF', fontSize: 16, margin: 0 }}>
            DFW — See how a ProLnk match works step by step
          </p>
        </div>

        <p style={{ color: '#CBD5E1', marginBottom: 16, fontSize: 15 }}>Choose a service to walk through the match:</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {services.map(s => (
            <button key={s} onClick={() => { setService(s); setStep(0); }} style={{
              padding: '10px 16px', borderRadius: 10, border: '2px solid',
              borderColor: service === s ? '#F5E642' : '#1E3A5F',
              background: service === s ? '#F5E642' : '#0D1F3C',
              color: service === s ? '#0A1628' : '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 14
            }}>{s}</button>
          ))}
        </div>

        {service && (
          <div>
            <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ color: '#F5E642', margin: 0 }}>Step {step + 1} of {steps.length}</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  {steps.map((_, i) => (
                    <div key={i} onClick={() => setStep(i)} style={{ width: 10, height: 10, borderRadius: '50%', background: i === step ? '#F5E642' : '#1E3A5F', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{steps[step][0]}</div>
              <h4 style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>{steps[step][1]}</h4>
              <p style={{ color: '#9BAECF', margin: 0, fontSize: 15 }}>
                {steps[step][2].replace(/\{service\}/g, service)}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
                flex: 1, padding: 14, borderRadius: 10, border: 'none',
                background: step === 0 ? '#1E3A5F' : '#0D1F3C', color: '#fff', cursor: step === 0 ? 'default' : 'pointer', fontWeight: 700
              }}>← Back</button>
              <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} style={{
                flex: 1, padding: 14, borderRadius: 10, border: 'none',
                background: step === steps.length - 1 ? '#1E3A5F' : '#F5E642',
                color: step === steps.length - 1 ? '#fff' : '#0A1628', cursor: step === steps.length - 1 ? 'default' : 'pointer', fontWeight: 700
              }}>Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
