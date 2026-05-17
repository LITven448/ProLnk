import { useState } from 'react';

export default function DFWFoundationFastFix2026() {
  const [symptom, setSymptom] = useState('');
  const [urgency, setUrgency] = useState('');
  const [result, setResult] = useState('');

  const symptoms = [
    { id: 'slab_leak', label: '💧 Active water from slab' },
    { id: 'large_crack', label: '⚡ Sudden large crack appeared' },
    { id: 'floor_collapse', label: '🏚️ Floor feels soft/collapsing' },
    { id: 'doors_sticking', label: '🚪 Doors and windows sticking' },
    { id: 'slow_cracks', label: '🔍 Small cracks appearing slowly' },
    { id: 'seasonal', label: '📅 Annual monitoring question' },
  ];

  const guides: Record<string, string> = {
    slab_leak: 'URGENT — Do not wait. Active slab leaks cause rapid soil erosion and heave. Call a plumber AND foundation specialist today. Water pressure under slab can shift foundation in 24–72 hours. Document everything for insurance.',
    large_crack: 'URGENT — Sudden cracks wider than 1/4 inch or stair-step cracks in brick indicate rapid movement. Get a structural engineer assessment within 72 hours. Photograph with a coin for scale.',
    floor_collapse: 'URGENT — Floor soft spots or visible sag indicate structural failure risk. Evacuate the area and call a structural engineer immediately. DFW's expansive clay can create voids under slabs.',
    doors_sticking: 'CAN WAIT 30–90 DAYS — Door and window sticking is an early sign of movement. Schedule a foundation inspection but it is not an emergency. Monitor weekly; if sticking worsens rapidly, accelerate timeline.',
    slow_cracks: 'CAN WAIT 30–90 DAYS — Hairline cracks in drywall are normal in DFW due to clay soil. Mark crack ends with pencil and date. If crack grows more than 1/8 inch in 30 days, call for inspection sooner.',
    seasonal: 'SEASONAL MONITORING — DFW foundations shift most in summer drought and fall rains. Annual inspection in October (post-drought) is ideal. Maintain consistent soil moisture with soaker hoses in summer.',
  };

  function evaluate() {
    if (!symptom) return;
    setResult(guides[symptom] || '');
  }

  const isUrgent = ['slab_leak', 'large_crack', 'floor_collapse'].includes(symptom);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Fast Foundation Fix Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW's expansive clay soil makes foundation issues common. Know what needs immediate action and what can wait.
          </p>
        </div>

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 What Are You Seeing?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => { setSymptom(s.id); setResult(''); }}
                style={{ background: symptom === s.id ? '#F5E642' : '#1A2F4A', color: symptom === s.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '14px 20px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={evaluate} disabled={!symptom}
            style={{ marginTop: 20, width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '16px', fontWeight: 800, fontSize: 16, cursor: symptom ? 'pointer' : 'not-allowed', opacity: symptom ? 1 : 0.5 }}>
            Get Timing Guide →
          </button>
        </div>

        {result && (
          <div style={{ background: isUrgent ? '#2D0A0A' : '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28, borderLeft: `4px solid ${isUrgent ? '#FF4444' : '#F5E642'}` }}>
            <h3 style={{ color: isUrgent ? '#FF6B6B' : '#F5E642', marginBottom: 12 }}>{isUrgent ? '🚨 Urgent Action Required' : '📋 Your Timing Guide'}</h3>
            <p style={{ lineHeight: 1.7, fontSize: 15 }}>{result}</p>
          </div>
        )}

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📊 DFW Foundation Timeline</h3>
          <div style={{ display: 'grid', gap: 10, fontSize: 14 }}>
            {['🔴 Slab leak, sudden crack, collapse risk → Act today', '🟡 Door sticking, slow cracks → 30–90 day window', '🟢 Annual survey, moisture management → October ideal'].map((item, i) => (
              <div key={i} style={{ background: '#1A2F4A', borderRadius: 8, padding: '12px 16px', lineHeight: 1.5 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>🏠 Log Foundation Events in Your Home Health Vault</p>
          <p style={{ color: '#1A2F4A', fontSize: 14 }}>ProLnk keeps a permanent record of your foundation inspections and repairs.</p>
        </div>
      </div>
    </div>
  );
}
