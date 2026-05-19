import { useState } from 'react';

const homeFeatures = [
  { id: 'pool', label: 'Pool / Outdoor' },
  { id: 'foundation', label: 'Slab Foundation' },
  { id: 'standard', label: 'Standard Home' },
];

const checklists: Record<string, { icon: string; task: string; urgency: string }[]> = {
  pool: [
    { icon: '⛈️', task: 'Install storm anchor stakes for patio furniture', urgency: 'High' },
    { icon: '❄️', task: 'AC tune-up — April is last easy booking before summer', urgency: 'High' },
    { icon: '🏊', task: 'Open pool and balance chemicals before Memorial Day', urgency: 'Medium' },
    { icon: '🌿', task: 'Planting window — install summer annuals after last frost', urgency: 'Medium' },
    { icon: '🌧️', task: 'Check pool deck drainage before peak storm season', urgency: 'Medium' },
    { icon: '🏠', task: 'Hail damage inspection from any March storms', urgency: 'High' },
  ],
  foundation: [
    { icon: '🏗️', task: 'Inspect foundation for new cracks — soil re-hydrating', urgency: 'High' },
    { icon: '💧', task: 'Set drip soaker hoses 18 inches from foundation', urgency: 'High' },
    { icon: '🚪', task: 'Check if doors stick — early warning of foundation shift', urgency: 'High' },
    { icon: '❄️', task: 'AC system tune-up before summer load', urgency: 'Medium' },
    { icon: '🌧️', task: 'Grade soil away from foundation after rains', urgency: 'Medium' },
    { icon: '⛈️', task: 'Verify storm shelter or safe room is stocked', urgency: 'High' },
  ],
  standard: [
    { icon: '⛈️', task: 'Severe weather peak — tornado watch prep now', urgency: 'High' },
    { icon: '❄️', task: 'Schedule AC tune-up — refrigerant check required', urgency: 'High' },
    { icon: '🏠', task: 'Post-hail roof inspection — call insurance if damage found', urgency: 'High' },
    { icon: '🌿', task: 'Fertilize lawn and plant warm-season grass seed', urgency: 'Medium' },
    { icon: '🔌', task: 'Test smoke and CO2 detectors — replace batteries', urgency: 'Medium' },
    { icon: '🌧️', task: 'Clean gutters and downspouts after spring storms', urgency: 'Medium' },
  ],
};

const urgencyColor: Record<string, string> = {
  High: '#F5E642',
  Medium: '#FFA500',
  Low: '#4CAF50',
};

export default function DFWAprilHomeMaintenanceGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>⛈️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW April Home Maintenance Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>April is DFW tornado and hail season. AC tune-up window closes fast. Foundation soil shifts now.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ April DFW Watch Items</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ color: '#cbd5e1' }}>🌪️ Peak tornado and hail season for North Texas</li>
            <li style={{ color: '#cbd5e1' }}>❄️ AC tune-up window — book before May price surge</li>
            <li style={{ color: '#cbd5e1' }}>🏗️ Foundation soil re-hydrating from winter drought</li>
            <li style={{ color: '#cbd5e1' }}>🌱 Prime planting window before summer heat arrives</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 12 }}>Select your home features → get your April action guide</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {homeFeatures.map(h => (
            <button key={h.id} onClick={() => setSelected(h.id)}
              style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid',
                borderColor: selected === h.id ? '#F5E642' : '#1e3a5f',
                background: selected === h.id ? '#F5E642' : '#112240',
                color: selected === h.id ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
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
                <span style={{ flex: 1, color: '#e2e8f0' }}>{item.task}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: urgencyColor[item.urgency] }}>{item.urgency}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, padding: 20, background: '#112240', borderRadius: 12, border: '1px solid #F5E642' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🏠 ProLnk connects you with vetted DFW pros</p>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>AC tune-ups, hail inspections, foundation assessments — get matched with licensed local contractors today.</p>
        </div>
      </div>
    </div>
  );
}