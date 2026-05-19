import { useState } from 'react';

const homeTypes = [
  { id: 'single', label: 'Single Family' },
  { id: 'condo', label: 'Condo / Townhome' },
  { id: 'older', label: 'Home 20+ Years Old' },
];

const checklists: Record<string, { icon: string; task: string; urgency: string }[]> = {
  single: [
    { icon: '🌿', task: 'Activate irrigation system and check all zones', urgency: 'High' },
    { icon: '❄️', task: 'Test AC before April heat — schedule tune-up now', urgency: 'High' },
    { icon: '🏠', task: 'Inspect roof for winter damage and loose shingles', urgency: 'Medium' },
    { icon: '🌧️', task: 'Clean gutters ahead of spring storm season', urgency: 'Medium' },
    { icon: '🌱', task: 'Pre-emergent weed treatment before soil warms', urgency: 'Medium' },
    { icon: '🤧', task: 'Replace HVAC filter — cedar pollen peak in March', urgency: 'High' },
  ],
  condo: [
    { icon: '❄️', task: 'Test AC thermostat and replace air filter', urgency: 'High' },
    { icon: '🤧', task: 'Cedar fever peak — upgrade to MERV-11 filter', urgency: 'High' },
    { icon: '🚿', task: 'Check water heater anode rod and pressure relief valve', urgency: 'Medium' },
    { icon: '🌧️', task: 'Inspect balcony drains and weatherstripping', urgency: 'Medium' },
    { icon: '🔌', task: 'Test GFCI outlets in kitchen and bath', urgency: 'Low' },
  ],
  older: [
    { icon: '🏗️', task: 'Foundation check — look for new cracks after wet winter', urgency: 'High' },
    { icon: '❄️', task: 'HVAC inspection — older systems need March tune-up', urgency: 'High' },
    { icon: '🔧', task: 'Inspect plumbing for slow winter leaks', urgency: 'High' },
    { icon: '🏠', task: 'Check attic insulation and ventilation', urgency: 'Medium' },
    { icon: '🌧️', task: 'Clear all drainage paths before storm season', urgency: 'Medium' },
    { icon: '🌿', task: 'Prune dead winter growth and check tree limbs over roof', urgency: 'Medium' },
  ],
};

const urgencyColor: Record<string, string> = {
  High: '#F5E642',
  Medium: '#FFA500',
  Low: '#4CAF50',
};

export default function DFWMarchHomeMaintenanceGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌿</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW March Home Maintenance Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Cedar fever peaks, spring storms begin, and AC season is weeks away. Get ahead of it now.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ March DFW Watch Items</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ color: '#cbd5e1′ }}>🤧 Cedar fever hits peak — MERV-11+ filters essential</li>
            <li style={{ color: '#cbd5e1′ }}>⛈️ First severe storms arrive mid-to-late March</li>
            <li style={{ color: '#cbd5e1′ }}>💧 Irrigation startup window before soil dries</li>
            <li style={{ color: '#cbd5e1′ }}>❄️ Test AC now — HVAC techs book out fast in April</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 12 }}>Select your home type → get your March checklist</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {homeTypes.map(h => (
            <button key={h.id} onClick={() => setSelected(h.id)}
              style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid',
                borderColor: selected === h.id ? '#F5E642′ : '#1e3a5f',
                background: selected === h.id ? '#F5E642′ : '#112240',
                color: selected === h.id ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
              {h.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {checklists[selected].map((item, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #1e3a5f' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ flex: 1, color: '#e2e8f0′ }}>{item.task}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: urgencyColor[item.urgency] }}>{item.urgency}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, padding: 20, background: '#112240', borderRadius: 12, border: '1px solid #F5E642′ }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🏠 ProLnk connects you with vetted DFW pros</p>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>HVAC tune-ups, irrigation startups, roof inspections — get matched with licensed local contractors.</p>
        </div>
      </div>
    </div>
  );
}