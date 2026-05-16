import { useState } from 'react';

const projects = [
  { type: 'Structural Change', icon: '🏗️', required: true, notes: 'Always required — load-bearing walls, beams, foundation work. No exceptions in DFW cities.', cities: 'All DFW cities require structural permits' },
  { type: 'Electrical Panel', icon: '⚡', required: true, notes: 'Panel upgrade, new subpanel, or service entrance. Must be inspected by city electrical inspector.', cities: 'All DFW — inspectors are strict on panel work' },
  { type: 'New Plumbing Run', icon: '🔧', required: true, notes: 'New drain lines, supply lines, or relocating plumbing. Rough-in inspection required before walls close.', cities: 'All DFW cities — re-pipe included' },
  { type: 'HVAC Replacement', icon: '❄️', required: null, notes: 'Depends on city — Dallas and Fort Worth require permits. Frisco and Plano: permit required. McKinney: check city code.', cities: 'Varies — confirm with your city code office' },
  { type: 'Room Addition', icon: '🏠', required: true, notes: 'Any addition to the footprint requires building, electrical, plumbing, and HVAC permits — all separate.', cities: 'All DFW — multiple permits required' },
  { type: 'New Pool', icon: '🏊', required: true, notes: 'Pool + equipment permits required. Fence/barrier permit also required by TX law within 30 days.', cities: 'All DFW — fence permit critical for liability' },
  { type: 'Roof Replacement', icon: '🏚️', required: null, notes: 'Most DFW cities require a permit for full tear-off and replacement. Repair/patch typically does not.', cities: 'Full replacement: usually yes. Patch: usually no.' },
  { type: 'Fence', icon: '🚧', required: null, notes: 'Depends on height and location. Most DFW cities require permit for fences over 6ft or in front yard.', cities: 'Check HOA + city code — varies widely' },
  { type: 'Deck or Patio Cover', icon: '🌳', required: true, notes: 'Attached structures always require permit. Detached pergolas under 200 sq ft may be exempt in some cities.', cities: 'Attached: always. Detached: check city.' },
  { type: 'Water Heater Replace', icon: '💧', required: null, notes: 'Most DFW cities require permit for water heater replacement. Simple swap = permit. Relocation = always.', cities: 'Usually yes — confirm with city building dept' },
];

export default function DFWPermitQuickRef2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>DFW Permit Quick Reference 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Select project type to check permit requirements in DFW</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {projects.map((p, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#1a2f4a' : '#0f2035', border: selected === i ? '2px solid #F5E642' : '2px solid #1e3a5f', borderRadius: '10px', padding: '14px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '22px' }}>{p.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '13px' }}>{p.type}</div>
                <div style={{ marginTop: '4px' }}>
                  {p.required === true && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>ALWAYS REQUIRED</span>}
                  {p.required === false && <span style={{ backgroundColor: '#16a34a', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>NOT REQUIRED</span>}
                  {p.required === null && <span style={{ backgroundColor: '#d97706', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>DEPENDS</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div style={{ backgroundColor: '#0f2035', border: '2px solid #F5E642', borderRadius: '14px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>{projects[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '18px', margin: 0 }}>{projects[selected].type}</h2>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>{projects[selected].notes}</p>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px' }}>
              <div style={{ color: '#F5E642', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>📍 DFW COVERAGE</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>{projects[selected].cities}</div>
            </div>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#0A1628', borderRadius: '8px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>💡 PRO TIP</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>Always confirm with your specific city building department — permits must be pulled by a licensed contractor in most DFW cities.</div>
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '24px', color: '#475569', fontSize: '12px' }}>
          ProLnk pros handle permits for you — find licensed contractors at prolnk.io
        </div>
      </div>
    </div>
  );
}