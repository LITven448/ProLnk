import { useState } from 'react';

export default function LucasTXHomeownerGuide2026() {
  const [propertyType, setPropertyType] = useState<string | null>(null);

  const types: Record<string, { label: string; priorities: string[] }> = {
    equestrian: {
      label: 'Equestrian Property',
      priorities: [
        '🐴 Barn structure inspection — roof, ventilation, footing',
        '💧 Well water annual test — bacteria, nitrates, minerals',
        '🚽 Septic system pump-out — 3-5 year cycle for large lots',
        '🌿 Pasture drainage management — standing water risk',
        '⚡ Barn electrical — GFCI, UV lighting for stalls',
        '🏗️ Pole barn and run-in shed structural check',
        '🔧 Automatic waterer winterization — Texas freeze prep',
      ],
    },
    custom: {
      label: 'Custom Estate Home',
      priorities: [
        '🏗️ Foundation monitoring — 1+ acre lots, deep clay profile',
        '💧 Well pump pressure tank inspection — 10-15 year life',
        '🚽 Aerobic septic system maintenance — quarterly service',
        '🌿 Acre+ irrigation — zone-by-zone efficiency audit',
        '🏠 Custom roof materials — tile or metal, specialty inspection',
        '🔥 Propane system check — rural Lucas common fuel source',
        '🌳 Mature tree hazard assessment — limb drop on structures',
      ],
    },
    acreage: {
      label: 'Raw Acreage / New Build',
      priorities: [
        '📋 Perc test and septic design before building',
        '💧 Well drilling site survey and yield test',
        '🌿 Land clearing drainage plan — prevent erosion',
        '🔌 Electric co-op hookup — Oncor extension planning',
        '🏗️ Soil bearing test for foundation design',
        '🌳 Tree preservation plan during construction',
        '📍 Survey pin verification — 1-acre lot corners marked',
      ],
    },
  };

  const selected = propertyType ? types[propertyType] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🐴</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            Lucas TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Upscale equestrian community — Collin County, 1+ acre lots, custom homes, well water and septic common
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ Lucas TX Homeowner Risk Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '💧', label: 'Well Water', desc: 'Annual bacterial and mineral testing required' },
              { icon: '🚽', label: 'Septic Systems', desc: 'Aerobic and conventional — specialty maintenance' },
              { icon: '🐴', label: 'Horse Facilities', desc: 'Barn and pasture specialty contractors needed' },
              { icon: '🌍', label: 'Large Lot Drainage', desc: 'Acre+ parcels need active stormwater management' },
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
              { key: 'equestrian', label: 'Equestrian Property' },
              { key: 'custom', label: 'Custom Estate Home' },
              { key: 'acreage', label: 'Raw Acreage / New Build' },
            ].map((opt) => (
              <button key={opt.key} onClick={() => setPropertyType(opt.key)} style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: propertyType === opt.key ? '#F5E642' : '#1e3a5f', color: propertyType === opt.key ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 {selected.label} — Lucas TX Homeowner Guide</h3>
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
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk — Lucas Area Pros Ready</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Vetted contractors serving Lucas, Allen, and east Collin County</p>
        </div>
      </div>
    </div>
  );
}