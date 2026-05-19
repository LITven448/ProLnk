import { useState } from 'react';

export default function DFWHVACCapacitorGuide2026B() {
  const [symptom, setSymptom] = useState<string | null>(null);

  const types = [
    {
      icon: '⚡',
      name: 'Dual Run Capacitor',
      desc: 'Powers both compressor and condenser fan motor simultaneously. Most common type in DFW split systems.',
      detail: 'Two capacitance values in one can (e.g. 45/5 MFD). Fails when attic temps exceed 105°F — DFW attics hit 130°F+ in July.',
      cost: '$150–$300 installed',
    },
    {
      icon: '🚀',
      name: 'Start Capacitor',
      desc: 'Provides extra torque to start compressor under load. Used in hard-start kits for aging systems.',
      detail: 'DFW pros add start capacitors to compressors 8+ years old. Reduces startup amp draw by 30-50%, extending compressor life.',
      cost: '$100–$200 installed',
    },
    {
      icon: '🌀',
      name: 'Fan Motor Capacitor',
      desc: 'Dedicated capacitor for condenser fan motor only. Smaller MFD rating than compressor capacitor.',
      detail: 'Fan spins slow or not at all when this fails. DFW homeowners may notice outdoor unit running hot with fan stopped.',
      cost: '$100–$200 installed',
    },
  ];

  const symptoms = [
    { id: 'click', label: 'AC clicks but won’t start', answer: 'Classic failed capacitor — compressor trying to start but can’t. System needs capacitor test immediately. Do not run unit.', urgency: 'high' },
    { id: 'hum', label: 'Loud humming from outdoor unit', answer: 'Capacitor may be weak — compressor humming but not starting. Can cause compressor damage if ignored in DFW heat.', urgency: 'high' },
    { id: 'slow', label: 'Fan spinning slowly', answer: 'Dual run capacitor likely weakening. Fan side failing first is common. Check for bulging cap top.', urgency: 'medium' },
    { id: 'warm', label: 'Blowing slightly warm air', answer: 'Weak capacitor causes compressor to run inefficiently. System runs but struggles — increased energy bills follow.', urgency: 'medium' },
    { id: 'trip', label: 'Breaker trips on startup', answer: 'Failed capacitor causes amp spike on startup. Add hard-start kit if compressor is 7+ years old in DFW conditions.', urgency: 'high' },
  ];

  const sel = symptoms.find(s => s.id === symptom);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW HVAC Capacitor Deep Dive 2026 (Part 2)</h1>
          <div style={{ background: '#7f1d1d', border: '1px solid #ef4444', borderRadius: '0.5rem', padding: '0.75rem', marginTop: '1rem', fontSize: '0.9rem', color: '#fca5a5′ }}>
            🔥 DFW attics hit 130°F+ — the #1 reason capacitors fail early in North Texas
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr' , gap: '1rem', marginBottom: '2rem' }}>
          {types.map((t, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #334155′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{t.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#F5E642′ }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Est. cost: {t.cost}</div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{t.desc}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic' }}>{t.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Symptom → Assessment</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSymptom(symptom === s.id ? null : s.id)}
                style={{ background: symptom === s.id ? '#F5E642′ : '#0f172a', color: symptom === s.id ? '#0A1628' : '#e2e8f0',
                  border: '1px solid' + (symptom === s.id ? ' #F5E642′ : ' #475569'), borderRadius: '0.5rem', padding: '0.5rem 0.9rem', cursor: ’pointer', fontSize: '0.85rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {sel && (
            <div style={{ background: '#0f172a', borderRadius: '0.5rem', padding: '1rem', borderLeft: '4px solid' + (sel.urgency === 'high' ? ' #ef4444′ : ' #F5E642') }}>
              <div style={{ color: sel.urgency === 'high' ? '#ef4444′ : '#F5E642', fontWeight: '700', marginBottom: '0.5rem' }}>
                {sel.urgency === 'high' ? '🚨 HIGH URGENCY' : '⚠️ MONITOR'}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{sel.answer}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW HVAC Experts at Your Fingertips
        </div>
      </div>
    </div>
  );
}
