import { useState } from 'react';

const events = [
  {
    event: 'Record Heat Wave (105°F+)',
    icon: '🔥',
    steps: [
      'Raise thermostat to 78°F during grid emergency hours (typically 3–7 PM) to reduce draw.',
      'Close blinds/drapes on west and south windows by noon — reduces solar gain up to 30%.',
      'Run ceiling fans counterclockwise to enhance perceived cooling without extra HVAC load.',
      'Check and replace air filter before the wave — restricted airflow causes compressor overload.',
      'Set fan to AUTO (not ON) to prevent re-evaporating moisture off coils.',
    ],
    prepare: 'Stock portable fans, freeze water bottles, identify a cooling center in your ZIP code.',
  },
  {
    event: 'Ice Storm / Winter Freeze',
    icon: '🧊',
    steps: [
      'Switch to emergency heat mode if outdoor temp drops below 30°F — heat pump efficiency collapses below freezing.',
      'Set thermostat no lower than 68°F to keep pipes from freezing in attic air handler area.',
      'Clear ice buildup from outdoor unit manually — DO NOT use sharp tools; use warm water only.',
      'Keep interior doors open to distribute heat evenly from a single air handler.',
      'If power is out, close off rooms not in use and consolidate household into smallest area.',
    ],
    prepare: 'Inspect heat strips every fall. Know your backup heat fuel source. Have a propane or wood backup.',
  },
  {
    event: 'Extended Power Outage',
    icon: '⚡',
    steps: [
      'Keep doors and windows closed to retain thermal mass for as long as possible.',
      'Move to interior rooms — they buffer temperature swings better than exterior walls.',
      'Do not run HVAC on a generator unless rated for full tonnage startup surge (up to 4x run watts).',
      'When power returns, wait 5 minutes before restarting AC to allow refrigerant pressure to equalize.',
      'Check capacitor function after extended outage — voltage spikes damage start capacitors.',
    ],
    prepare: 'Install a whole-home surge protector. Keep capacitor specs on file for rapid replacement.',
  },
  {
    event: 'Hail Storm',
    icon: '🌨️',
    steps: [
      'Do not run the outdoor unit immediately after hail — inspect fins and refrigerant lines first.',
      'Document all damage with photos before touching anything (insurance requirement).',
      'Bent condenser fins reduce airflow — a fin comb can restore minor damage; major damage needs replacement.',
      'Check refrigerant lines for dents or kinks — a kinked line will cause compressor failure.',
      'Contact your homeowner insurer before calling an HVAC contractor — coverage may pay for full unit.',
    ],
    prepare: 'Install a hail guard on the outdoor unit. Budget $150–400 for installation.',
  },
];

export default function DFWHVACAdaptationGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = events.find((e) => e.event === selected) ?? null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>ProLnk · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#FFFFFF' }}>DFW HVAC Adaptation Guide</h1>
        <p style={{ color: '#9AA3B2', fontSize: 15, margin: '0 0 32px', lineHeight: 1.6 }}>
          Specific protocols for adapting your DFW HVAC system during extreme weather events — heat waves, ice storms, power outages, and hail.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {events.map((e) => (
            <button
              key={e.event}
              onClick={() => setSelected(selected === e.event ? null : e.event)}
              style={{
                background: selected === e.event ? '#132040′ : '#0F1E35',
                border: `1.5px solid ${selected === e.event ? '#F5E642' : '#1E2D45'}`,
                borderRadius: 10,
                padding: '16px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span style={{ fontSize: 30 }}>{e.icon}</span>
              <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16 }}>{e.event}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#132040', border: '1.5px solid #F5E642', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{active.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>{active.event} — Protocol</h2>
            <ol style={{ paddingLeft: 20, margin: '0 0 20px' }}>
              {active.steps.map((s, i) => (
                <li key={i} style={{ color: '#C8CDD8', lineHeight: 1.7, marginBottom: 8 }}>{s}</li>
              ))}
            </ol>
            <div style={{ background: '#0F1E35', borderRadius: 8, padding: '14px 18px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🛠️ Prepare Now</div>
              <div style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.6 }}>{active.prepare}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}