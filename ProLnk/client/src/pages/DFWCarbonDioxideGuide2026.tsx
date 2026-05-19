import { useState } from 'react';

export default function DFWCarbonDioxideGuide2026() {
  const [size, setSize] = useState<string | null>(null);

  const homeSizes = [
    { id: 'small', label: '🏠 Under 1,500 sqft', tip: '2–4 occupants in a small home can push CO2 above 1,200 ppm with windows closed. A single ERV unit handles fresh air needs. Opening one window for 10 min/hour is a low-tech solution.' },
    { id: 'medium', label: '🏡 1,500–3,000 sqft', tip: 'Standard DFW ranch or two-story. Zone-based fresh air ventilation works best. Single ERV with 2 supply points typically adequate for family of 4.' },
    { id: 'large', label: '🏘️ 3,000–5,000 sqft', tip: 'Multiple occupied zones require either multi-port ERV or per-zone fresh air dampers tied to your HVAC. CO2 monitors in each bedroom recommended.' },
    { id: 'xl', label: '🏰 5,000+ sqft', tip: 'Multi-zone ERV or HRV system required. Each zone should have its own CO2 sensor and fresh air damper. DFW energy recovery ventilation recovers 70–80% of conditioned air energy.' },
  ];

  const facts = [
    { icon: '🧠', stat: '1,000 ppm', label: 'CO2 level where cognitive performance begins measurably declining' },
    { icon: '😴', stat: '2,500 ppm', label: 'CO2 in sealed bedroom overnight with 2 sleepers — causes fatigue and headaches' },
    { icon: '🌬️', stat: 'ERV/HRV', label: 'Best mechanical fresh air solution for DFW climate — recovers energy from exhaust air' },
    { icon: '⚠️', stat: 'CO ≠ CO2', label: 'Carbon monoxide is deadly; CO2 is a fresh-air issue — different sensors, different solutions' },
  ];

  const solutions = [
    { icon: '🔄', title: 'ERV (Energy Recovery Ventilator)', desc: 'Brings fresh outdoor air in while exhausting stale indoor air — recovers 70–80% of heating/cooling energy' },
    { icon: '💨', title: 'Fresh Air Damper on HVAC', desc: 'Simple motorized damper on return air duct — opens periodically to inject outdoor air into HVAC stream' },
    { icon: '🪟', title: 'Window Ventilation Scheduling', desc: 'Open windows 10 min/hour during mild DFW weather (Oct–Nov, Mar–Apr) — avoid during ozone alerts' },
    { icon: '📊', title: 'CO2 Monitor', desc: '$50–150 sensor shows real-time ppm — immediate feedback on when ventilation is needed' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>💨</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Home CO2 Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>CO2 from occupants is a fresh-air problem, not a safety emergency — but it still tanks your cognitive performance</p>
        </div>

        <div style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 24 }}>⚠️</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '8px 0 4px' }}>CO2 vs CO — Critical Difference</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Carbon dioxide (CO2) causes cognitive fog and fatigue above 1,000 ppm. Carbon monoxide (CO) is a silent killer — needs a separate CO detector. These are entirely different issues with different solutions.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {facts.map(f => (
            <div key={f.stat} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>{f.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏠 Select Your Home Size</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {homeSizes.map(h => (
              <button key={h.id} onClick={() => setSize(h.id === size ? null : h.id)}
                style={{ background: size === h.id ? '#F5E642′ : '#1e3a5f', color: size === h.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {h.label}
              </button>
            ))}
          </div>
          {size && (
            <div style={{ background: '#1e3a5f', borderLeft: '4px solid #F5E642', borderRadius: '0 10px 10px 0', padding: 20, marginTop: 16 }}>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{homeSizes.find(h => h.id === size)?.tip}</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {solutions.map(s => (
            <div key={s.title} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', margin: '8px 0 6px', fontSize: 15 }}>{s.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
