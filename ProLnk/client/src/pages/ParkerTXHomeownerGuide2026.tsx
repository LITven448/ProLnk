import { useState } from 'react';

export default function ParkerTXHomeownerGuide2026() {
  const [scale, setScale] = useState<string | null>(null);

  const scales: Record<string, { label: string; priorities: string[] }> = {
    estate: {
      label: 'Estate-Scale Property (5+ acres)',
      priorities: [
        '🚽 Septic system full inspection — multiple tank systems common',
        '💧 Well pump yield test and water quality lab panel',
        '🌿 Large lot drainage engineering — French drain or swale',
        '🔥 Propane tank inspection and regulator check',
        '🏠 Standing seam metal roof — 10-year fastener inspection',
        '🌳 Tree survey — oak wilt and emerald ash borer risk',
        '⚡ Generator system — rural Parker outages longer duration',
      ],
    },
    standard: {
      label: 'Custom Home (1-5 acres)',
      priorities: [
        '🏗️ Foundation pier check — Parker clay soil deep profile',
        '💧 Well annual test — coliform, hardness, iron',
        '🚽 Aerobic septic quarterly service — state required',
        '🌬️ HVAC — dual-zone custom homes, both units serviced',
        '🌿 Irrigation zone audit — 1-5 acre systems complex',
        '🏠 Roof inspection — custom materials, hail season priority',
        '🔒 Gate and driveway automation — Parker entry systems common',
      ],
    },
    horse: {
      label: 'Horse-Friendly Property',
      priorities: [
        '🐴 Pasture fence inspection — board or pipe rail specialty',
        '💧 Automatic waterer servicing before summer and freeze',
        '🏗️ Barn roof and structural annual inspection',
        '🌿 Pasture rotation drainage — heavy hoof traffic areas',
        '⚡ Barn panel and lighting GFCI compliance',
        '🚿 Wash rack plumbing winterization',
        '🌳 Poisonous plant removal — yew, red maple, sago palm',
      ],
    },
  };

  const selected = scale ? scales[scale] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌳</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            Parker TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Affluent Collin County enclave — large lots, custom homes, horse-friendly zoning, septic systems standard
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ Parker TX Homeowner Risk Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🚽', label: 'Septic Required', desc: 'City sewer not available — aerobic system mandatory' },
              { icon: '💧', label: 'Well Water Only', desc: 'No municipal water — annual testing essential' },
              { icon: '🐴', label: 'Equestrian Zoning', desc: 'Horse properties need specialty contractor network' },
              { icon: '⚡', label: 'Power Outage Risk', desc: 'Rural grid — generator backup highly recommended' },
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
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏡 Select Your Property Scale</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { key: 'estate', label: 'Estate (5+ acres)' },
              { key: 'standard', label: 'Custom Home (1-5 acres)' },
              { key: 'horse', label: 'Horse-Friendly Property' },
            ].map((opt) => (
              <button key={opt.key} onClick={() => setScale(opt.key)} style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: scale === opt.key ? '#F5E642' : '#1e3a5f', color: scale === opt.key ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 {selected.label} — Parker TX Maintenance Scope</h3>
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
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk — Parker Area Pros Ready</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Estate-grade contractors serving Parker, Lucas, and east Allen</p>
        </div>
      </div>
    </div>
  );
}