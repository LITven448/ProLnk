import { useState } from 'react';

const propertyTypes = [
  { id: 'waterfront', label: '⚓ Waterfront Property', tips: ['Boat dock permits require Garland city approval plus TRWD (Trinity River Authority) sign-off', 'Seawall and retaining wall annual inspection before storm season', 'Waterfront setback rules: no structures within 50ft of Ray Hubbard shoreline without variance'] },
  { id: 'older-lakeside', label: '🏠 Older Lakeside Home', tips: ['1970s-1990s Garland lakeside builds: verify septic vs city sewer connection status', 'Galvanized supply lines common in pre-1990 builds — inspect for corrosion annually', 'Flood zone designation: check FEMA map for Ray Hubbard floodplain overlay'] },
  { id: 'newer-lakefront', label: '🏡 Newer Lakefront Build', tips: ['2000s+ lakefront builds often have spray foam with OSB — moisture barrier integrity check yearly', 'High-efficiency HVAC standard; confirm maintenance contract transferability at purchase', 'Dock electrical must be GFCI-protected per NEC 553 — inspect annually for safety'] },
];

const garlandFacts = [
  'Ray Hubbard is one of DFW largest reservoirs — waterfront inventory stays tight',
  'Eastern Garland has mix of 1970s stock and post-2000 lakefront custom builds',
  'Boat dock maintenance: treat wood decking annually; aluminum docks every 3-5 years',
  'Garland offers homestead exemption plus senior freeze — file by April 30 each year',
];

export default function DFWGarlandLakeRayHubbardGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>GARLAND · LAKE RAY HUBBARD · 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '12px 0 6px' }}>⚓ Garland Lake Ray Hubbard Guide</h1>
        <p style={{ color: '#8899aa', marginBottom: 28 }}>Eastern Garland waterfront · Ray Hubbard reservoir · Mixed eras · Boat dock community</p>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>📍 Area Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ icon: '🌊', label: 'Lake', val: 'Ray Hubbard' }, { icon: '📅', label: 'Home Eras', val: '1970s–2020s' }, { icon: '⚓', label: 'Boat Docks', val: 'Common' }, { icon: '📋', label: 'Permit Body', val: 'City + TRWD' }].map(s => (
              <div key={s.label} style={{ background: '#162236', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: '#8899aa', marginTop: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🔍 Select Your Property Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {propertyTypes.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{ background: selected === p.id ? '#F5E642′ : '#162236', color: selected === p.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {p.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#162236', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 14 }}>{active.label} — Lakefront Guide</h3>
              {active.tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>
                  <span style={{ color: '#ccd6e0', fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🏞️ Garland Lakefront Key Facts</h2>
          {garlandFacts.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>→</span>
              <span style={{ color: '#ccd6e0', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: 12, marginTop: 32 }}>ProLnk · Garland Lake Ray Hubbard · 2026</p>
      </div>
    </div>
  );
}