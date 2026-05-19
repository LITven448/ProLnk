import { useState } from 'react';

const situations = [
  { id: 'pool', label: 'Have a Pool' },
  { id: 'hail', label: 'Storm Hit My Area' },
  { id: 'general', label: 'General Home' },
];

const checklists: Record<string, { icon: string; task: string; urgency: string }[]> = {
  pool: [
    { icon: '🏊', task: 'Open pool — balance pH, alkalinity, and chlorine', urgency: 'High' },
    { icon: '❄️', task: 'Last chance HVAC tune-up before summer pricing', urgency: 'High' },
    { icon: '🌿', task: 'Set irrigation to summer schedule — 3x per week', urgency: 'High' },
    { icon: '🪑', task: 'Inspect outdoor furniture and shade structures', urgency: 'Medium' },
    { icon: '💡', task: 'Test and clean outdoor lighting fixtures', urgency: 'Low' },
    { icon: '🌧️', task: 'Verify pool deck drain is clear before summer rains', urgency: 'Medium' },
  ],
  hail: [
    { icon: '🏠', task: 'Roof inspection — document granule loss for insurance', urgency: 'High' },
    { icon: '📸', task: 'Photo all damage before it rains again', urgency: 'High' },
    { icon: '📞', task: 'File insurance claim within 30 days of storm', urgency: 'High' },
    { icon: '🚗', task: 'Check gutters and downspouts for hail dents', urgency: 'Medium' },
    { icon: '❄️', task: 'Check AC condenser fins — hail crushes them', urgency: 'High' },
    { icon: '🪟', task: 'Inspect window screens and seals for hail damage', urgency: 'Medium' },
  ],
  general: [
    { icon: '❄️', task: 'HVAC tune-up — prices spike in June and July', urgency: 'High' },
    { icon: '🌿', task: 'Switch irrigation to summer schedule', urgency: 'High' },
    { icon: '🌧️', task: 'Check drainage around foundation after spring rains', urgency: 'Medium' },
    { icon: '🏠', task: 'Inspect roof if any storms came through in April', urgency: 'Medium' },
    { icon: '🔌', task: 'Outdoor GFCI outlets — test before summer entertaining', urgency: 'Low' },
    { icon: '🪟', task: 'Re-caulk windows and doors before summer heat', urgency: 'Medium' },
  ],
};

const urgencyColor: Record<string, string> = {
  High: '#F5E642',
  Medium: '#FFA500',
  Low: '#4CAF50',
};

export default function DFWMayHomeMaintenanceGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>☀️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW May Home Maintenance Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Last window before summer heat. HVAC tune-ups, pool opening, and storm damage checks are May priorities.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ May DFW Watch Items</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ color: '#cbd5e1' }}>❄️ HVAC tune-ups jump 40% in cost by June — book now</li>
            <li style={{ color: '#cbd5e1' }}>🏊 Pool opening window — water warming fast</li>
            <li style={{ color: '#cbd5e1' }}>🌿 Irrigation shifts to summer mode in May</li>
            <li style={{ color: '#cbd5e1' }}>⛈️ Hail season continues through late May</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 12 }}>Tell us your situation → get your May priority list</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid',
                borderColor: selected === s.id ? '#F5E642' : '#1e3a5f',
                background: selected === s.id ? '#F5E642' : '#112240',
                color: selected === s.id ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
              {s.label}
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
          <p style={{ color: '#94a3b8', fontSize: 14 }}>HVAC tune-ups, pool service, hail inspections — get matched with licensed local contractors before summer prices hit.</p>
        </div>
      </div>
    </div>
  );
}