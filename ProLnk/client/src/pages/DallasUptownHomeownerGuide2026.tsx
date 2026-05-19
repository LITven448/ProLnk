import { useState } from 'react';

export default function DallasUptownHomeownerGuide2026() {
  const [unitType, setUnitType] = useState<string>('');

  const unitTypes = [
    {
      id: 'highrise-condo', label: '🏢 High-Rise Condo', desc: 'Fan coil HVAC, HOA-managed roof/exterior',
      responsibilities: ['Fan coil unit maintenance inside unit', 'Interior plumbing from shutoff inward', 'Electrical panel and fixtures', 'Window seals and interior finishes', 'HVAC filter changes monthly'],
      hoa: ['Roof, facade, and common areas', 'Main plumbing stack', 'Elevator and hallways', 'Exterior window cleaning', 'Building HVAC chillers']
    },
    {
      id: 'townhome', label: '🏘️ Townhome', desc: 'Split system HVAC, shared walls, private roof',
      responsibilities: ['Full HVAC system (split system)', 'Roof if fee-simple ownership', 'Front stoop and private patio', 'All interior plumbing and electrical', 'Garage door and mechanism'],
      hoa: ['Shared walls and party wall agreements', 'Landscaping of common areas', 'Exterior paint (check your docs)', 'Pest control for common areas']
    },
    {
      id: 'garden-condo', label: '🌿 Garden-Style Condo', desc: 'Ground-floor or low-rise, more owner control',
      responsibilities: ['HVAC unit on ground-level pad', 'Private patio/balcony', 'Interior plumbing', 'Interior electrical', 'Water heater in closet'],
      hoa: ['Roof and building exterior', 'Pool and amenities', 'Parking structure', 'Common landscaping']
    },
  ];

  const selected = unitTypes.find(u => u.id === unitType);

  const uptownTips = [
    { icon: '🔇', tip: 'Noise complaints spike in Uptown — fix squeaky floors and noisy HVAC fast' },
    { icon: '💧', tip: 'High-rise water pressure fluctuates; install pressure regulator at your unit shutoff' },
    { icon: '🌡️', tip: 'Fan coil units need annual coil cleaning — often skipped, causes poor cooling' },
    { icon: '🔌', tip: 'Older Uptown buildings (pre-2000) may have aluminum wiring — have inspected' },
    { icon: '📋', tip: 'Always review HOA docs before any repair — scope of owner responsibility varies widely' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏙️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Dallas Uptown Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>High-rises, townhomes, HOA boundaries — know what is yours to maintain</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Select Your Unit Type</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {unitTypes.map(u => (
              <button key={u.id} onClick={() => setUnitType(u.id)}
                style={{ background: unitType === u.id ? '#F5E642' : '#0f1f3d', color: unitType === u.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                {u.label} <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.75 }}>— {u.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>✅ Owner Responsible</h3>
              {selected.responsibilities.map((r, i) => <p key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>• {r}</p>)}
            </div>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#94a3b8', marginBottom: 12, fontSize: 15 }}>🏢 HOA Covers</h3>
              {selected.hoa.map((h, i) => <p key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>• {h}</p>)}
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 Uptown Pro Tips</h2>
          {uptownTips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{t.tip}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#F5E642', borderRadius: 12 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>🔧 Need a vetted Uptown contractor? ProLnk connects you in minutes.</p>
        </div>
      </div>
    </div>
  );
}
