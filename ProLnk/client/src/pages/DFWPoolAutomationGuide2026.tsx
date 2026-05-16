import { useState } from 'react';

const setups = [
  { id: 'basic', label: '🔌 Basic Single-Speed Pump', path: ['Replace pump with variable-speed (required for most automation systems)', 'Install Pentair IntelliConnect or Hayward OmniLogic base module ($600-1,200)', 'Connect to home WiFi via 2.4GHz band — keep router within 50 ft or add WiFi extender', 'Download brand app; pair and test remote on/off control', 'Schedule pump to run during ERCOT off-peak hours (9pm-6am) for DFW energy savings', 'Add smart LED light control for color-change convenience ($150-400 upgrade)'] },
  { id: 'variable', label: '⚡ Variable-Speed Pump Installed', path: ['You already qualify for a full automation controller — skip the pump upgrade', 'Add IntelliCenter or OmniLogic full controller ($1,500-3,000 installed)', 'Map all relays: pump speed programs, heater, lights, water feature, spa blower', 'Configure ERCOT time-of-use schedule: low speed during peak hours (2pm-9pm summer)', 'Enable freeze protection automation: pump runs when temps drop below 34°F', 'Set up remote diagnostics — get alerts if filter pressure rises above threshold'] },
  { id: 'full', label: '🤖 Full Equipment Pad (Heater + Salt + Lights)', path: ['Full automation is your best ROI — one controller manages everything', 'Install a top-tier controller: Pentair IntelliCenter or Hayward ProLogic', 'Integrate salt chlorinator for remote output control and cell status alerts', 'Program heater to preheat before use via app schedule — save gas vs reheating cold water', 'Set lights to color scenes on timers — DFW evenings perfect for outdoor entertaining', 'Enable auto-notifications for chemical dosing reminders based on run time'] },
];

export default function DFWPoolAutomationGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const path = setups.find(s => s.id === selected)?.path ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>📱</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Pool Automation Guide 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Smart pool systems let you control every piece of equipment from your phone. In DFW, automation also
            means scheduling around ERCOT rates and enabling freeze protection automatically.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📲', label: 'Phone Control', desc: 'Adjust pump speed, heater, lights, and spa from anywhere' },
            { icon: '⚡', label: 'ERCOT Scheduling', desc: 'Shift pump runtime to off-peak hours and cut your electric bill' },
            { icon: '❄️', label: 'Freeze Guard', desc: 'Automation runs pump automatically when temps approach freezing' },
            { icon: '🔔', label: 'Remote Alerts', desc: 'Get push notifications for filter pressure, errors, or freeze events' },
          ].map(c => (
            <div key={c.label} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', border: '1px solid #2d4a7a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏆 Top Systems for DFW 2026</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Pentair IntelliConnect / IntelliCenter</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Best ecosystem for complex setups; IntelliConnect entry-level ($600-1,000), IntelliCenter for full systems ($2,000-4,000 installed).</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Hayward OmniLogic</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Strong app UX; integrates well with Hayward equipment; $1,500-3,500 installed depending on relay count.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚙️ Current Setup → Automation Upgrade Path</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {setups.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642' : '#2d4a7a', background: selected === s.id ? '#F5E642' : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          {path.length > 0 && (
            <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {path.map(p => <li key={p} style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>{p}</li>)}
            </ol>
          )}
          {!selected && <p style={{ color: '#94a3b8' }}>Select your current setup above to see your DFW automation upgrade path.</p>}
        </div>
      </div>
    </div>
  );
}