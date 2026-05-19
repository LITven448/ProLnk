import { useState } from 'react';

export default function LavonTXHomeownerGuide2026() {
  const [vintage, setVintage] = useState<string | null>(null);

  const vintages: Record<string, { label: string; priorities: string[] }> = {
    brand_new: {
      label: 'Brand New (2022-2026)',
      priorities: [
        '🏗️ Foundation settling — new Collin clay still moving',
        '📋 Builder punch list — document all issues before 1-year warranty',
        '🌿 New landscaping drainage — grade away from foundation',
        '💧 Water heater flush — sediment in new builds common',
        '🔌 Verify all GFCI outlets installed correctly',
        '🌬️ HVAC system first filter change and coil inspection',
        '🏠 Roof fastener walk after first wind event',
      ],
    },
    recent: {
      label: 'Recent Build (2018-2021)',
      priorities: [
        '🏗️ Foundation check — 5-year clay settlement most active',
        '📋 Extended warranty expiration — schedule full inspection now',
        '🌿 Irrigation zone audit — heads clogged, pressure check',
        '🏠 Roof mid-life hail inspection — Lavon storm corridor',
        '💧 Lake Lavon proximity — humidity-driven mold check in attic',
        '🔧 Dishwasher and disposal — builder grade nearing replacement',
        '🌬️ HVAC refrigerant check — 5-7 year point',
      ],
    },
    older: {
      label: 'Pre-2018 Home',
      priorities: [
        '🏗️ Foundation pier inspection — deeper clay movement over time',
        '💧 Water heater likely at or past 15-year mark',
        '⚡ Panel capacity for EV charger or added circuits',
        '🌿 Tree roots — sewer camera inspection recommended',
        '🏠 Roof replacement window — 20+ year shingles at end of life',
        '🌬️ HVAC system replacement planning — R-22 refrigerant units',
        '🔧 Fence and gate hardware — lake humidity accelerates rust',
      ],
    },
  };

  const selected = vintage ? vintages[vintage] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌊</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            Lavon TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Fast-growing east Collin County — new construction boom 2018-2026, Lake Lavon proximity, settling foundations
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ Lavon TX Homeowner Risk Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🏗️', label: 'New Build Settlement', desc: 'Clay soil — newest homes still actively settling' },
              { icon: '🌊', label: 'Lake Proximity', desc: 'Higher humidity — attic mold and metal rust risk' },
              { icon: '⛈️', label: 'Storm Exposure', desc: 'Eastern Collin storm corridor — hail annual threat' },
              { icon: '🌿', label: 'Growth Pains', desc: 'Infrastructure still catching up to population boom' },
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
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Select Your Home Vintage</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { key: 'brand_new', label: 'Brand New (2022-2026)' },
              { key: 'recent', label: 'Recent (2018-2021)' },
              { key: 'older', label: 'Pre-2018 Home' },
            ].map((opt) => (
              <button key={opt.key} onClick={() => setVintage(opt.key)} style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: vintage === opt.key ? '#F5E642' : '#1e3a5f', color: vintage === opt.key ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 {selected.label} — Lavon Maintenance Checklist</h3>
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
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk — Lavon Area Pros Ready</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Vetted contractors serving Lavon, Wylie, and east Collin County</p>
        </div>
      </div>
    </div>
  );
}