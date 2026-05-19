import { useState } from 'react';

const symptoms = [
  { id: 'vibration', label: 'Unusual vibration or shaking from air handler', diagnosis: 'Imbalanced blower wheel from debris accumulation — common in DFW due to dust and cottonwood buildup', recommendation: 'Clean blower wheel first. If vibration persists after cleaning, wheel may need replacement', cost: 'Cleaning: $150–$300 | Replacement: $300–$600′ },
  { id: 'noise', label: 'Rattling, scraping, or grinding noise', diagnosis: 'Debris inside blower housing or failing blower wheel bearings — debris enters through return air grilles', recommendation: 'Immediate inspection needed — debris can damage motor if left. Clean housing and wheel', cost: '$150–$350 service call + parts if needed' },
  { id: 'weak', label: 'Reduced airflow despite clean filter', diagnosis: 'Blower wheel caked with dust and pollen reducing blade efficiency — very common in DFW', recommendation: 'Blower wheel cleaning restores airflow. DFW homes typically need cleaning every 3–5 years', cost: 'Cleaning: $150–$300 — most effective first step' },
  { id: 'none', label: 'No symptoms — checking blower health', diagnosis: 'Proactive check is smart in DFW — dusty air and high run hours accelerate wheel buildup', recommendation: 'Inspect blower wheel annually. Clean if any visible buildup on blades', cost: '$100–$200 for inspection + cleaning if needed' },
];

export default function DFWHVACBlowerWheelGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>💨</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Blower Wheel Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          The blower wheel (also called the squirrel cage) is the centrifugal fan inside your air handler that pushes conditioned air through your ductwork. DFW's dusty air, high pollen counts, and humid summers cause blower wheels to accumulate debris faster than almost anywhere else — leading to vibration, noise, and reduced airflow.
        </p>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>⚙️ Why DFW Blower Wheels Fail Faster</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🌾', title: 'High Pollen', desc: 'DFW\’s oak, cedar, and grass pollen coats blower blades, building imbalance over time' },
              { icon: '🏜️', title: 'Dust & Particulates', desc: 'Spring dust storms push particulates through even well-filtered return air grilles' },
              { icon: '💧', title: 'Humidity Bonding', desc: 'DFW humidity causes dust to stick to blades rather than pass through cleanly' },
              { icon: '🕐', title: 'Long Run Hours', desc: '8–12 hrs/day operation in summer means 3x more debris accumulation than northern climates' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>🔧 Clean vs. Replace Decision Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { condition: 'Buildup on blades but wheel is intact', verdict: 'Clean', detail: 'Professional cleaning restores balance and airflow to near-new condition' },
              { condition: 'Visible cracks or broken blades', verdict: 'Replace', detail: 'Structural damage cannot be reversed by cleaning — imbalance will worsen' },
              { condition: 'Vibration persists after thorough cleaning', verdict: 'Replace', detail: 'Wheel may be permanently warped from years of imbalance' },
              { condition: 'Bearing noise from motor', verdict: 'Motor service', detail: 'If bearings are failing, blower motor replacement may be needed ($300–$700)' },
            ].map(item => (
              <div key={item.condition} style={{ display: 'flex', gap: 16, background: '#0A1628', borderRadius: 8, padding: 14, alignItems: 'flex-start' }}>
                <div style={{ background: item.verdict === 'Clean' ? '#1E5F3A' : item.verdict === 'Replace' ? '#5F1E1E' : '#3A3A1E', borderRadius: 6, padding: '4px 10px', fontSize: 13, fontWeight: 700, color: '#F5E642', minWidth: 80, textAlign: 'center' }}>{item.verdict}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.condition}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔍 What's Your Blower Symptom?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#1E3A5F' : '#0A1628',
                  border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`,
                  borderRadius: 8, padding: '12px 16px', color: '#E8EDF5',
                  textAlign: 'left', cursor: 'pointer', fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Diagnosis</div>
              <div style={{ marginBottom: 10 }}>{match.diagnosis}</div>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#E8EDF5′ }}>Recommendation:</strong> <span style={{ color: '#94A3B8' }}>{match.recommendation}</span></div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>Cost: <strong style={{ color: '#F5E642′ }}>{match.cost}</strong></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
