import { useState } from 'react';

export default function NewHopeTXHomeownerGuide2026() {
  const [propType, setPropType] = useState<string | null>(null);

  const types: Record<string, { label: string; priorities: string[] }> = {
    rural_older: {
      label: 'Older Rural Home (pre-2000)',
      priorities: [
        '💧 Well water test — older casings, bacterial risk higher',
        '🚽 Septic inspection — conventional systems aging out',
        '⚡ Knob-and-tube or aluminum wiring check — fire risk',
        '🏠 Roof replacement — 25+ year shingles critical',
        '🏗️ Pier-and-beam foundation — wood rot and termites',
        '🌿 Ag drainage culverts — keep clear for storm water',
        '🔥 Propane system — regulator and line age inspection',
      ],
    },
    new_custom: {
      label: 'New Custom Build (2010+)',
      priorities: [
        '🏗️ Foundation settling on New Hope clay and sand mix',
        '💧 Well pump and pressure tank — 10-year inspection',
        '🚽 Aerobic septic quarterly service — TCEQ required',
        '🌬️ HVAC efficiency — rural builds often oversized systems',
        '🌿 Large lot irrigation — pump-based systems common',
        '🔌 Generator hookup — New Hope grid less reliable',
        '🌳 Agricultural neighbor runoff — drainage management',
      ],
    },
    ag_land: {
      label: 'Agricultural / Mixed-Use',
      priorities: [
        '🌿 Soil conservation plan — erosion control for crop land',
        '💧 Stock tank and pond inspection — dam integrity',
        '🏗️ Agricultural structure permits — barn, workshop zoning',
        '⚡ Ag rate electricity — verify correct utility classification',
        '🚜 Equipment shed structural — roof load for storage',
        '🌳 Tree line management — prevent encroachment',
        '📋 Ag exemption documentation — annual renewal required',
      ],
    },
  };

  const selected = propType ? types[propType] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌾</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            New Hope TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Tiny rural Collin County community — large lots, well water, agricultural zoning, older homes and custom builds mixed
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ New Hope TX Homeowner Risk Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '💧', label: 'Well Water Only', desc: 'No municipal water supply — test annually minimum' },
              { icon: '🚽', label: 'Septic Required', desc: 'No city sewer — conventional or aerobic systems' },
              { icon: '🌾', label: 'Ag Zoning Neighbors', desc: 'Farm runoff and dust — drainage planning critical' },
              { icon: '⚡', label: 'Rural Grid', desc: 'Longer outages — generator backup recommended' },
            ].map((item) => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F5E642' }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.3rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏡 Select Your Property Type</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { key: 'rural_older', label: 'Older Rural Home' },
              { key: 'new_custom', label: 'New Custom Build' },
              { key: 'ag_land', label: 'Agricultural / Mixed-Use' },
            ].map((opt) => (
              <button key={opt.key} onClick={() => setPropType(opt.key)} style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: propType === opt.key ? '#F5E642' : '#1e3a5f', color: propType === opt.key ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 {selected.label} — Rural Collin County Maintenance Guide</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selected.priorities.map((p) => (
                  <li key={p} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk — Rural Collin County Pros Ready</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Rural-experienced contractors serving New Hope, Lavon, and Copeville</p>
        </div>
      </div>
    </div>
  );
}