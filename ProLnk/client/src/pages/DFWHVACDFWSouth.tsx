import { useState } from 'react';

const suburbs = [
  {
    name: 'Waxahachie',
    county: 'Ellis County',
    housingMix: 'Older ranch + new builds',
    climate: 'Slightly more rural heat, drier',
    commonSystem: '3.5-ton split system',
    avgAge: '13 years',
    notes: 'Ellis County runs hotter and drier in summer than Dallas County. Sizing runs slightly larger. Older homes may have original ductwork.',
  },
  {
    name: 'Mansfield',
    county: 'Tarrant / Johnson',
    housingMix: 'Suburban, 1990s–2010s builds',
    climate: 'Standard DFW suburban',
    commonSystem: '4-ton split system',
    avgAge: '11 years',
    notes: 'Well-established suburb with strong contractor availability. Tarrant side follows Oncor; Johnson County may vary.',
  },
  {
    name: 'Burleson',
    county: 'Johnson County',
    housingMix: 'Mix of ages, growing new tracts',
    climate: 'Standard DFW, slightly windier',
    commonSystem: '3.5-ton split system',
    avgAge: '12 years',
    notes: 'Johnson County has some rural utility co-ops. Growing rapidly with new construction pushing SEER 16+ requirements.',
  },
  {
    name: 'Midlothian',
    county: 'Ellis County',
    housingMix: 'Fast-growing, many new builds',
    climate: 'Rural heat, industrial corridor',
    commonSystem: '4-ton split system',
    avgAge: '7 years',
    notes: 'Heavy industrial area nearby affects air quality planning. New builds dominate — most have current energy-code systems.',
  },
  {
    name: 'Cedar Hill',
    county: 'Dallas / Johnson',
    housingMix: '1980s–2000s established',
    climate: 'Standard DFW suburban',
    commonSystem: '3.5-ton split system',
    avgAge: '16 years',
    notes: 'Older housing stock means aging ductwork and systems nearing end of life. High replacement demand.',
  },
];

export default function DFWHVACDFWSouth() {
  const [selected, setSelected] = useState<string | null>(null);

  const profile = suburbs.find((s) => s.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🏠 DFW HVAC Guide — South Suburbs</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>South DFW HVAC Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Waxahachie, Mansfield, Burleson, and surrounding south DFW suburbs span multiple counties with different
          utility providers, climate microzones, and housing ages. Ellis County runs hotter and drier than Dallas County.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>☀️ South DFW HVAC Factors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🌡️', label: 'Hotter & Drier in Ellis County', desc: 'Rural heat increases cooling load — systems size up' },
              { icon: '🗂️', label: 'Multi-County Complexity', desc: 'Tarrant, Dallas, Ellis, Johnson — different rules per county' },
              { icon: '🏚️', label: 'Mixed Housing Ages', desc: 'Cedar Hill 1980s to Midlothian 2020s — plan accordingly' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642' }}>
          🗺️ Select Your Suburb
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          {suburbs.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelected(s.name)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: 8,
                border: `2px solid ${selected === s.name ? '#F5E642' : '#1e3a5f'}`,
                background: selected === s.name ? '#F5E642' : '#0F2040',
                color: selected === s.name ? '#0A1628' : '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {profile && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', fontSize: '1.3rem', marginBottom: '1rem' }}>📍 {profile.name} HVAC Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { label: 'County', value: profile.county },
                { label: 'Housing Mix', value: profile.housingMix },
                { label: 'Common System', value: profile.commonSystem },
                { label: 'Avg System Age', value: profile.avgAge },
              ].map((item) => (
                <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '0.85rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642' }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem', color: '#cbd5e1' }}>
              ☀️ {profile.notes}
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🛠️ South DFW HVAC Tips</h3>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Ellis County homes often benefit from oversizing by half a ton — account for dry heat</li>
            <li>Confirm county jurisdiction before scheduling permits — multi-county suburbs vary</li>
            <li>Cedar Hill and older suburbs: get ductwork inspected before replacing just the unit</li>
            <li>New Midlothian builds: verify SEER 16 minimum compliance before accepting handoff</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
