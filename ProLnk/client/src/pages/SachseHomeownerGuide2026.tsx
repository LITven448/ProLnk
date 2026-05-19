import { useState } from 'react';

export default function SachseHomeownerGuide2026() {
  const [decade, setDecade] = useState<string | null>(null);

  const decades: Record<string, { label: string; priorities: string[] }> = {
    '1990s': {
      label: '1990s Home',
      priorities: [
        '🏗️ Foundation inspection — clay soil movement after 30 years',
        '🔧 Cast iron drain line camera inspection',
        '🪟 Single-pane window replacement for efficiency',
        '⚡ Panel upgrade if 100-amp original service',
        '🏠 Roof replacement due — 25-30 yr shingles',
        '🌿 Tree root intrusion in sewer lines',
        '💧 Water heater likely past 20-year mark — replace',
      ],
    },
    '2000s': {
      label: '2000s Home',
      priorities: [
        '🏗️ Pier-and-beam foundation monitoring for clay shift',
        '🔩 Chinese drywall check if built 2004-2007',
        '🌬️ HVAC system approaching 15-20 year end of life',
        '💧 Water heater at or near replacement window',
        '🏚️ Brick mortar repointing for Sachse clay movement',
        '🌿 Irrigation system head audit — drought cycles',
        '🔌 Surge protector installation for electronics',
      ],
    },
    '2010s': {
      label: '2010s Home',
      priorities: [
        '📋 Builder warranty expired — full home inspection now',
        '🌿 Landscaping matured — root zone managed',
        '🏗️ Foundation still settling on expansive clay',
        '🔧 Garbage disposal and dishwasher mid-life check',
        '🌬️ HVAC filter and coil cleaning for efficiency',
        '🏠 Roof mid-life inspection for storm damage',
        '🔒 Smart home device security audit',
      ],
    },
  };

  const selected = decade ? decades[decade] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏡</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            Sachse TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Small suburb spanning Collin &amp; Dallas counties — clay soil, established neighborhoods, 1990s–2010s homes
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ Sachse Homeowner Risk Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🌍', label: 'Clay Soil Movement', desc: 'High — foundation monitoring critical' },
              { icon: '🌧️', label: 'Storm Season', desc: 'Hail-prone — roof inspections annually' },
              { icon: '🌿', label: 'Tree Root Risk', desc: 'Mature trees — sewer line camera yearly' },
              { icon: '🔥', label: 'Summer Heat', desc: '100°F+ — HVAC is mission-critical' },
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
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🗓️ Select Your Home's Decade Built</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {Object.keys(decades).map((d) => (
              <button key={d} onClick={() => setDecade(d)} style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: decade === d ? '#F5E642' : '#1e3a5f', color: decade === d ? '#0A1628' : '#fff' }}>
                {d}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 {selected.label} — Sachse Maintenance Priorities</h3>
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
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk — Sachse Area Pros Ready</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Vetted local contractors serving Sachse, Rowlett, and Garland</p>
        </div>
      </div>
    </div>
  );
}