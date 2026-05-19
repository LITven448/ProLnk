import { useState } from 'react';

const homeTypes = [
  { type: 'Single Story', tips: ['Seal attic hatch with foam weatherstrip', 'Add radiant barrier in attic', 'Set thermostat to 78°F when away — not higher'] },
  { type: 'Two Story', tips: ['Zone cooling — close vents on unused floors', 'Insulate stairwell door at night', 'Second floor needs 2°F lower setpoint'] },
  { type: 'Townhome', tips: ['Shared walls reduce load — check neighbor settings', 'Focus on west-facing window film', 'Condensate pan check quarterly'] },
  { type: 'Condo', tips: ['Check your unit vs building thermostat override', 'Replace filters monthly during pollen season', 'Test bathroom exhaust fans'] },
];

const tips = [
  { icon: '🌡️', title: 'Set 78°F Away — Not Higher', detail: 'DFW attic temps hit 150°F. Higher setpoints make your system run hours to recover.' },
  { icon: '🔄', title: 'Ceiling Fan Counterclockwise in Summer', detail: 'Creates wind-chill effect. Allows 4°F higher thermostat setting with same comfort.' },
  { icon: '🪟', title: 'Close West Blinds 2–6 PM', detail: 'West-facing glass is the #1 heat load in DFW summer afternoons. Block it.' },
  { icon: '🍳', title: 'Cook Outside or Use Microwave', detail: 'Oven adds 3,000 BTU of heat. In July, that’s real money fighting back.' },
  { icon: '🚪', title: 'Seal Your Attic Hatch', detail: 'Uninsulated attic doors leak conditioned air into a 150°F space.' },
  { icon: '🧹', title: 'Clean Condenser Coils Annually', detail: 'Dirty coils cut efficiency 20–30%. Rinse with garden hose in spring.' },
  { icon: '💧', title: 'Flush Condensate Drain Quarterly', detail: 'Algae clogs = water damage + shutdown. Pour vinegar monthly.' },
  { icon: '📱', title: 'Use a Smart Thermostat Schedule', detail: 'Pre-cool to 74°F before you return vs. fighting 85°F interior.' },
  { icon: '🌀', title: 'Change Filters Monthly in Cedar Season', detail: 'Cedar (Dec–Feb) and oak (Mar–Apr) clog filters in 2 weeks in DFW.' },
  { icon: '🏠', title: 'Insulate to R-49 in Attic', detail: 'DFW standard is R-30. R-49 pays back in 4 years at current rates.' },
];

export default function DFWHVACEfficiencyTips2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const matched = homeTypes.find(h => h.type === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW HVAC Efficiency Tips 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>10 ways to cut your cooling bill in the Dallas-Fort Worth summer. Tested for Texas conditions.</p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🏠 Get Tips for Your Home Type</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {homeTypes.map(h => (
              <button key={h.type} onClick={() => setSelected(h.type === selected ? null : h.type)}
                style={{ background: selected === h.type ? '#F5E642′ : '#1e3a5f', color: selected === h.type ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '0.5rem 1.2rem', cursor: 'pointer', fontWeight: 600 }}>
                {h.type}
              </button>
            ))}
          </div>
          {matched && (
            <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem' }}>
              {matched.tips.map((t, i) => <li key={i} style={{ color: '#e2e8f0', marginBottom: '0.4rem' }}>{t}</li>)}
            </ul>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {tips.map((tip, i) => (
            <div key={i} style={{ background: '#0d1f3c', border: '1px solid #1e3a5f', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{tip.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>{tip.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>{tip.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Need a DFW HVAC Pro?</div>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects you with verified HVAC technicians serving the DFW metroplex.</p>
        </div>
      </div>
    </div>
  );
}