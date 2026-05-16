import { useState } from 'react';

const ages = [
  { id: 'new', label: '0–7 Years Old' },
  { id: 'mid', label: '8–15 Years Old' },
  { id: 'old', label: '16+ Years Old' },
];

const checklists: Record<string, { icon: string; task: string; urgency: string; note?: string }[]> = {
  new: [
    { icon: '🔲', task: 'Replace air filter (1-inch: every 30 days; 4-inch: every 6 months)', urgency: 'High' },
    { icon: '🧹', task: 'Gently clean condenser coils with garden hose', urgency: 'Medium' },
    { icon: '🌡️', task: 'Test thermostat — set to COOL and verify cold air in 5 min', urgency: 'High' },
    { icon: '💧', task: 'Check condensate drain pan — should be dry', urgency: 'Medium' },
    { icon: '🔲', task: 'Verify all vents open and unblocked', urgency: 'Low' },
    { icon: '📋', task: 'Schedule annual pro tune-up to protect warranty', urgency: 'Medium' },
  ],
  mid: [
    { icon: '🔲', task: 'Replace filter — mid-age units need monthly swaps', urgency: 'High' },
    { icon: '❄️', task: 'Refrigerant check — only a licensed tech can do this', urgency: 'High', note: 'DIY illegal' },
    { icon: '🧹', task: 'Clean condenser coils — vegetation buildup is common', urgency: 'High' },
    { icon: '💧', task: 'Flush condensate drain line with diluted bleach', urgency: 'High' },
    { icon: '🌡️', task: 'Test thermostat and calibrate if readings drift', urgency: 'Medium' },
    { icon: '🔊', task: 'Listen for banging, rattling, or hissing at startup', urgency: 'High' },
  ],
  old: [
    { icon: '📞', task: 'Schedule licensed HVAC inspection before summer', urgency: 'High' },
    { icon: '❄️', task: 'Refrigerant leak test — R-22 systems may need retrofit', urgency: 'High', note: 'Licensed only' },
    { icon: '🔲', task: 'Replace filter and assess airflow — restriction = strain', urgency: 'High' },
    { icon: '⚡', task: 'Check capacitors and contactors — common failure point', urgency: 'High' },
    { icon: '💧', task: 'Inspect heat exchanger for cracks (safety critical)', urgency: 'High' },
    { icon: '🆕', task: 'Get a replacement quote now — summer installs have 6-week wait', urgency: 'High' },
  ],
};

const urgencyColor: Record<string, string> = {
  High: '#F5E642',
  Medium: '#FFA500',
  Low: '#4CAF50',
};

export default function DFWSpringHVACChecklist2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>❄️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Spring HVAC Checklist 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Complete spring AC startup guide for DFW homes. Do this before 95°F hits in June.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ Spring HVAC Facts for DFW</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ color: '#cbd5e1' }}>🌡️ DFW hits 90°F+ by late May — AC must be ready</li>
            <li style={{ color: '#cbd5e1' }}>❄️ Refrigerant work requires EPA 608 license — never DIY</li>
            <li style={{ color: '#cbd5e1' }}>📅 HVAC techs fully booked by June — book April or May</li>
            <li style={{ color: '#cbd5e1' }}>💧 Clogged condensate drain causes water damage fast</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 12 }}>Select your AC system age → get your spring checklist</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {ages.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id)}
              style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid',
                borderColor: selected === a.id ? '#F5E642' : '#1e3a5f',
                background: selected === a.id ? '#F5E642' : '#112240',
                color: selected === a.id ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
              {a.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {checklists[selected].map((item, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #1e3a5f' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#e2e8f0' }}>{item.task}</span>
                  {item.note && <span style={{ display: 'block', fontSize: 11, color: '#ef4444', marginTop: 2 }}>⛔ {item.note}</span>}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: urgencyColor[item.urgency] }}>{item.urgency}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, padding: 20, background: '#112240', borderRadius: 12, border: '1px solid #F5E642' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🏠 ProLnk connects you with vetted DFW HVAC pros</p>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Licensed AC technicians for tune-ups, refrigerant service, and full system replacements across the Metroplex.</p>
        </div>
      </div>
    </div>
  );
}