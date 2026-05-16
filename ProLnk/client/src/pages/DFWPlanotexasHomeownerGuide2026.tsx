import { useState } from 'react';

const planoAreas = [
  { id: 'legacy', label: '🏙️ Legacy West (2000s+)', tasks: ['HOA exterior compliance check', 'Townhome roof inspection every 3 years', 'Smart home system audit', 'EV charger installation prep', 'High-efficiency HVAC filter upgrade'] },
  { id: 'central', label: '🏠 Central Plano (1980s-90s)', tasks: ['Polybutylene pipe replacement assessment', 'Roof replacement planning (25-30yr mark)', 'Attic insulation upgrade', 'Foundation inspection after dry summers', 'Electrical panel capacity check'] },
  { id: 'east', label: '🌳 East Plano (1970s)', tasks: ['Full foundation assessment (expansive clay)', 'Galvanized pipe inspection', 'HVAC full system replacement', 'Sewer line scoping', 'Window and door weatherstripping overhaul'] },
];

export default function DFWPlanotexasHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const area = planoAreas.find(a => a.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Plano TX Homeowner Guide 2026</h1>
          <p style={{ color: '#a0b0c8', fontSize: 15 }}>Mature north Dallas suburb — Toyota HQ corridor — aging systems meet new luxury</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[['🚗','Toyota HQ Proximity'],['🏫','Exemplary PISD Schools'],['🔧','Aging 1970s-90s Stock']].map(([icon, label]) => (
            <div key={label as string} style={{ background: '#111f35', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{icon}</div>
              <div style={{ fontSize: 12, color: '#a0b0c8', marginTop: 6 }}>{label as string}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 14 }}>Select Your Plano Area</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {planoAreas.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id === selected ? null : a.id)}
              style={{ background: selected === a.id ? '#F5E642' : '#111f35', color: selected === a.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {a.label}
            </button>
          ))}
        </div>

        {area && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📋 Maintenance Priorities for {area.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {area.tasks.map(t => (
                <li key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#e0e8f0', fontSize: 14 }}>✅ {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f1e33', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '8px 0 4px' }}>Get Plano-Vetted Pros</p>
          <p style={{ color: '#a0b0c8', fontSize: 13 }}>ProLnk connects you with contractors who know Plano codes, HOA rules, and Toyota Corridor standards.</p>
        </div>
      </div>
    </div>
  );
}