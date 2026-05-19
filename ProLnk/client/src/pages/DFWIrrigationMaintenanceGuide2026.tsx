import { useState } from 'react';

const seasons = [
  {
    id: 'spring', label: '🌱 Spring (March–May)', tasks: [
      'Inspect all heads for winter damage — replace cracked or sunken heads',
      'Turn on system slowly: open backflow preventer shutoff a quarter-turn first',
      'Run each zone manually and walk the yard — note dry spots or puddling',
      'Adjust rotary heads for seasonal coverage — DFW grass needs 1 inch/week',
      'Set controller: 2–3 days/week, early morning (4–6am) to reduce evaporation',
      'Test backflow preventer: DFW water districts require annual backflow test by licensed irrigator',
    ]
  },
  {
    id: 'summer', label: '☀️ Summer (June–Sept)', tasks: [
      'Monitor for dry patches weekly — DFW summers cause rapid soil dry-out',
      'Increase run time by 10–15% in July/August when temps exceed 100°F',
      'Inspect heads monthly: mow damage, lifting, and clogging are common',
      'Check for soggy areas between heads — likely a lateral line leak',
      'Use rain sensor override if system lacks a rain sensor (required in TX for new installs)',
      'Clean filter screens on drip emitters (raised beds, shrub zones)',
    ]
  },
  {
    id: 'fall', label: '🍂 Fall (Oct–Nov)', tasks: [
      'Reduce schedule: DFW fall needs 1 day/week max until first frost',
      'Run backflow test if not completed in spring (TCEQ requirement)',
      'Winterize controller: switch to seasonal adjust or reduce run times 40%',
      'Inspect valves: debris from summer storms can lodge in solenoids',
      'Mark head locations with flags before winter lawn care',
      'Flush drip lines and check for root intrusion',
    ]
  },
  {
    id: 'winter', label: '❄️ Winter (Dec–Feb)', tasks: [
      'DFW rarely freezes hard enough for full blowout — monitor forecasts',
      'When freeze is predicted: turn off at backflow preventer, drain lateral lines if accessible',
      'Wrap above-ground backflow preventer with insulation foam or heat tape',
      'Set controller to OFF or rain delay — do not water frozen ground',
      'After freeze event: walk system at thaw, check for burst laterals or cracked heads',
      'Schedule spring startup inspection now (irrigators book fast in March)',
    ]
  },
];

export default function DFWIrrigationMaintenanceGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = seasons.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem' }}>
            DFW Irrigation System Maintenance Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Keep your DFW lawn irrigation running efficiently year-round. Select a season for a tailored maintenance checklist.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: '0', fontSize: '1.1rem' }}>📋 DFW Irrigation Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['🌿 DFW grass target: 1 inch water per week (spring/fall), 1.5 inch in peak summer', '🕓 Best watering time: 4–6am — reduces evaporation and fungal risk', '📜 TX law: rain sensor required on all new irrigation installs since 2009', '🔧 Backflow test: required annually by most DFW water districts (licensed irrigator)', '💧 Watering restrictions: most DFW cities limit to 2 days/week June–Oct', '❄️ Freeze threshold: protect above-ground components below 28°F for 4+ hours'].map((item, i) => (
              <div key={i} style={{ background: '#1a3a5c', borderRadius: '8px', padding: '0.75rem', fontSize: '0.9rem', lineHeight: '1.5′ }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Season → Irrigation Maintenance Checklist</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {seasons.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: '8px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: '0′ }}>Checklist: {match.label}</h3>
            <ul style={{ margin: '0', paddingLeft: '1.25rem' }}>
              {match.tasks.map((task, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.6′ }}>{task}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡</div>
          <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.25rem' }}>Need a DFW licensed irrigator?</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk connects you with TCEQ-licensed irrigation pros in your zip code. Free quotes.</div>
        </div>
      </div>
    </div>
  );
}