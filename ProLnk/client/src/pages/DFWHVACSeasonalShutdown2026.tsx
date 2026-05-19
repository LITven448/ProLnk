import { useState } from 'react';

const transitions = [
  {
    id: 'ac-to-heat',
    label: 'AC → Heat (Oct/Nov)',
    icon: '🍂',
    title: 'Switching to Heat Mode',
    steps: [
      { step: 'Test heat in late September', detail: 'DFW gets surprise cold fronts — don’t wait until you need it. Run heat for 30 min to burn off summer dust smell safely.' },
      { step: 'Change air filter', detail: 'After 6 months of summer cooling, your filter is clogged. Replace before heating season.' },
      { step: 'Switch thermostat to HEAT mode', detail: 'Don’t leave it on AUTO-COOL. Set to HEAT, set temp to 68-70°F for DFW winters.' },
      { step: 'Check outdoor unit clearance', detail: 'Clear any leaves/debris around heat pump or furnace exhaust. DFW fall brings significant leaf accumulation.' },
      { step: 'Schedule pre-season heater tune-up', detail: 'October is the right time — before the rush. Most DFW HVAC companies are fully booked by first cold snap.' },
    ]
  },
  {
    id: 'heat-to-ac',
    label: 'Heat → AC (Mar/Apr)',
    icon: '🌸',
    title: 'Switching to Cooling Mode',
    steps: [
      { step: 'Test AC in early March', detail: 'DFW 90°F days can hit in April. Test your AC before you need it — if it fails, you have time to get it repaired without urgency pricing.' },
      { step: 'Replace the air filter', detail: '6 months of heating season means another filter change. Do it at every season transition in DFW.' },
      { step: 'Inspect outdoor unit', detail: 'Check for winter debris, straighten bent fins, verify clearance of 2ft around unit. Trim any shrubs that grew during winter.' },
      { step: 'Set thermostat to COOL mode', detail: 'Switch from HEAT to COOL. Set to 75-78°F initially. Run it for an hour to verify cold air comes out.' },
      { step: 'Schedule spring tune-up', detail: 'March is ideal — check refrigerant levels, clean coils, verify capacitors before peak summer demand.' },
    ]
  },
];

export default function DFWHVACSeasonalShutdown2026() {
  const [selected, setSelected] = useState('ac-to-heat');
  const transition = transitions.find(t => t.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🔄 DFW Seasonal HVAC Transition Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW has two major transitions: October (AC off, heat on) and March (heat off, AC on). Getting these right prevents emergency calls and extends equipment life.</p>

        <div style={{ background: '#132035', borderRadius: 12, padding: '16px', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {transitions.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id)} style={{ padding: 16, borderRadius: 10, border: `2px solid ${selected === t.id ? '#F5E642' : 'transparent'}`, background: selected === t.id ? '#1e3a5f' : '#0A1628', cursor: 'pointer', color: '#fff' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: '#F5E642′ }}>{transition.icon} {transition.title}</div>
          <div style={{ display: 'grid', gap: 16 }}>
            {transition.steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.step}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ title: '🌡️ DFW Thermostat Settings', items: ['Summer: 76-78°F (saves $30+/mo vs 72°F)', 'Winter: 68-70°F (typical DFW comfort)', 'Away: 85°F in summer, 62°F in winter'] }, { title: '📅 DFW HVAC Calendar', items: ['March: Spring tune-up + AC test', 'May-Sep: Peak cooling (change filter monthly)', 'October: Heating test + fall tune-up', 'December: Min heat setting + protect pipes'] }].map(card => (
            <div key={card.title} style={{ background: '#132035', borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642', marginBottom: 12 }}>{card.title}</div>
              {card.items.map(i => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>›</span><span style={{ color: '#cbd5e1', fontSize: 13 }}>{i}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', color: '#0A1628′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔧 Book Seasonal Tune-Ups Before the Rush</div>
          <div style={{ fontSize: 13 }}>ProLnk connects you with DFW HVAC pros for spring and fall maintenance — before every company is booked solid.</div>
        </div>
      </div>
    </div>
  );
}
