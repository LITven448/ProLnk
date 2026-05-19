import { useState } from 'react';

const symptoms = [
  { id: 'weak', label: '💨 Weak airflow from vents', diagnosis: 'Low CFM detected. Check for dirty filter (replace if over 90 days), blocked return vents, or collapsed flex duct. Target: 400 CFM per ton of capacity.' },
  { id: 'noise', label: '🔊 Loud rushing noise at vents', diagnosis: 'High velocity from undersized ducts or closed dampers. Measure CFM with anemometer — if over 700 FPM face velocity, duct resizing needed.' },
  { id: 'uneven', label: '🌡️ Uneven temperatures room to room', diagnosis: 'Imbalanced CFM distribution. Each room needs calculated CFM based on square footage. Master bedroom typically 150-250 CFM; living areas 300-500 CFM.' },
  { id: 'humid', label: '💧 High humidity despite AC running', diagnosis: 'Excessive CFM prevents dehumidification. AC needs 350-400 CFM/ton for humidity control in DFW. Oversized systems short-cycle and fail to dehumidify.' },
  { id: 'freeze', label: '❄️ Ice on refrigerant lines', diagnosis: 'Severely restricted airflow (below 300 CFM/ton). Immediately turn off AC, check filter, inspect all return vents. Low airflow causes evaporator to freeze.' },
];

export default function DFWHVACCFMGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const found = symptoms.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HVAC GUIDE 2026</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>💨 CFM & Airflow Guide for DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>CFM (cubic feet per minute) is the foundation of HVAC performance. DFW homes average 2,200 sq ft — understanding airflow prevents comfort issues and costly failures.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📐', label: '400 CFM', sub: 'per ton — DFW standard' },
            { icon: '🌡️', label: '95°F+', sub: 'DFW summer peak demand' },
            { icon: '🔧', label: 'Manual D', sub: 'duct sizing calculation' },
            { icon: '📏', label: '0.5" w.c.', sub: 'target static pressure' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.25rem', border: '1px solid #2d3f5a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5E642' }}>{card.label}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🔍 Symptom → Airflow Diagnosis</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Select your symptom for a CFM-based diagnosis:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ textAlign: 'left', background: selected === s.id ? '#F5E642' : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {found && (
            <div style={{ marginTop: '1rem', backgroundColor: '#0A1628', borderRadius: 6, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{found.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🛠️ Need a DFW HVAC Airflow Specialist?</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk connects DFW homeowners with verified HVAC technicians who perform proper CFM testing and duct analysis.</p>
          <a href='/homeowner-signup' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '0.75rem 1.5rem', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Get Free HVAC Quote →</a>
        </div>
      </div>
    </div>
  );
}