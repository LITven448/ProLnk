import { useState } from 'react';

const predictions: Record<string, { icon: string; items: string[] }> = {
  'New (0-10 yrs)': {
    icon: '🏠',
    items: ['HVAC filter replacement at 6mo', 'Water heater anode rod check at 5yr', 'Roof warranty inspection reminder', 'Garage door spring lubrication'],
  },
  'Mid-Age (10-20 yrs)': {
    icon: '🔧',
    items: ['Water heater replacement window approaching', 'HVAC capacitor wear detection', 'Roof mid-life inspection flag', 'Electrical panel age alert'],
  },
  'Mature (20+ yrs)': {
    icon: '⚠️',
    items: ['Sewer line root intrusion risk', 'Panel upgrade recommendation', 'Foundation inspection trigger', 'Full HVAC system replacement planning'],
  },
};

const features = [
  { icon: '📅', title: 'Proactive Scheduling', desc: 'AI books seasonal maintenance before breakdowns happen — not after.' },
  { icon: '🔮', title: 'Appliance Age Tracking', desc: 'Tracks install dates and predicts end-of-life windows for all major systems.' },
  { icon: '🌡️', title: 'Seasonal Reminders', desc: 'DFW-specific prompts: pre-freeze pipe checks, pre-summer AC tune-ups.' },
  { icon: '💡', title: 'Smart Pro Matching', desc: 'When AI flags a need, it pre-selects the best available pro in your area.' },
];

export default function ProLnkHomeHealthVaultAI() {
  const [age, setAge] = useState<string>('New (0-10 yrs)');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>Home Health Vault AI</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Your home has a health record. Our AI reads it — predicting what it needs before it fails.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔮 AI Maintenance Predictor</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select your home's age range to see predicted upcoming needs:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {Object.keys(predictions).map(a => (
              <button key={a} onClick={() => setAge(a)}
                style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: age === a ? '#F5E642' : '#1e3a5f', color: age === a ? '#0A1628' : '#fff' }}>
                {predictions[a].icon} {a}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {predictions[age].items.map((item, i) => (
              <div key={i} style={{ background: '#162033', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642' }}>
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>🔔 {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1a2f4e, #0f1f3d)', border: '1px solid #F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 8 }}>Your Vault. Your Data. Always Private.</div>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Home Health Vault data is never sold. It's used only to match you with better service pros.</p>
        </div>
      </div>
    </div>
  );
}