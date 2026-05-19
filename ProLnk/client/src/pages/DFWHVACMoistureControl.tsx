import { useState } from 'react';

const moistureSymptoms = [
  { id: 'condensation', label: 'Condensation on windows or walls', cause: 'Indoor RH above 60% — HVAC undersized or undersized runtime', fix: 'Verify HVAC sizing, add supplemental dehumidifier', severity: 'Medium' },
  { id: 'wetfloor', label: 'Water pooling around indoor unit', cause: 'Condensate drain clog — very common in DFW summer', fix: 'Clear drain line, check float switch, replace drain pan if rusted', severity: 'High' },
  { id: 'musty', label: 'Musty smell when system runs', cause: 'Mold on evaporator coil or drain pan — humidity not being removed', fix: 'UV coil treatment, professional coil cleaning, drain pan inspection', severity: 'High' },
  { id: 'sticky', label: 'Air feels sticky even when cool', cause: 'System cycling too short — not removing latent heat/humidity', fix: 'Increase runtime, check refrigerant charge, consider whole-home dehumidifier', severity: 'Medium' },
  { id: 'none', label: 'No symptoms — want to stay ahead', cause: 'Preventive mindset — excellent for DFW homes', fix: 'Monthly drain check, annual coil clean, hygrometer monitoring', severity: 'Low' },
];

export default function DFWHVACMoistureControl() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<null | typeof moistureSymptoms[0]>(null);

  const assess = () => {
    const sym = moistureSymptoms.find(s => s.id === selected);
    if (sym) setResult(sym);
  };

  const severityColor: Record<string, string> = { High: '#7F1D1D', Medium: '#78350F', Low: '#14532D' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF4', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>💧</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Moisture Control</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Your HVAC does two jobs: cool the air (sensible heat) and remove moisture (latent heat). In DFW's summer humidity, the moisture removal job is just as important as the cooling. Here's how it works and what goes wrong.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔬 How HVAC Manages Moisture</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { step: '1', icon: '❄️', label: 'Evaporator coil cools air below dew point', desc: 'Humid DFW air hits the cold coil — moisture condenses out like a cold glass of water' },
              { step: '2', icon: '💧', label: 'Condensate collects in drain pan', desc: 'Water drips off the coil into a shallow pan below the air handler' },
              { step: '3', icon: '🚿', label: 'Drain line carries water away', desc: 'Gravity or a condensate pump moves water to a floor drain or outdoors' },
              { step: '4', icon: '🌬️', label: 'Dry air returns to living space', desc: 'Air re-enters at 45–55% RH — comfortable, mold-resistant, efficient' },
            ].map(step => (
              <div key={step.step} style={{ display: 'flex', gap: '1rem', background: '#0A1628', borderRadius: 8, padding: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0, marginTop: 2 }}>{step.step}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{step.icon} {step.label}</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🩺 What Moisture Symptom Are You Seeing?</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>Select your situation for a cause assessment and improvement plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {moistureSymptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642' : '#1E3A5F', background: selected === s.id ? '#1a2f50' : 'transparent', color: '#E8EEF4', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={assess} disabled={!selected}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: selected ? 'pointer' : 'not-allowed', opacity: selected ? 1 : 0.5 }}>
            Get Moisture Control Assessment
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ color: '#F5E642', margin: 0 }}>Moisture Assessment</h3>
              <span style={{ background: severityColor[result.severity], color: '#FEF3C7', padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600 }}>{result.severity} Priority</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>🔍 Likely cause: {result.cause}</p>
            <p style={{ color: '#E8EEF4', marginBottom: '1.25rem' }}>✅ <strong>Recommended action:</strong> {result.fix}</p>
            <div style={{ background: '#1a2f50', borderRadius: 8, padding: '0.75rem' }}>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.85rem' }}>🔧 ProLnk connects you with DFW HVAC pros who specialize in moisture and drainage issues — free quotes, same-day availability.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
