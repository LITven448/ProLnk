import { useState } from 'react';

export default function DFWSmartHVACScheduling2026() {
  const [ercotInterest, setErcotInterest] = useState('enrolled');
  const [homeType, setHomeType] = useState('single');
  const [result, setResult] = useState('');

  const ercotOptions = ['Yes — Enrolled in ERCOT Flex', 'Yes — Want to Enroll', 'No — Just Save Money'];
  const homeTypes = ['Single Story Under 2000 sq ft', 'Single Story 2000–3000 sq ft', 'Two Story Home', 'Home with Pool'];

  const getSchedule = () => {
    const enrolled = ercotInterest !== 'No — Just Save Money';
    let schedule = '';
    if (homeType === 'Two Story Home') {
      schedule = 'Two-Story DFW Schedule: Pre-cool to 72°F by 1:45pm. Set 78°F at 2pm (ERCOT peak start). Upstairs unit may need 1°F lower setpoint due to heat rise. Recover to 74°F at 7pm. Run fan-only mode 10pm–6am during mild DFW nights (May, Oct) for free cooling when outdoor temp drops below 74°F.';
    } else if (homeType === 'Home with Pool') {
      schedule = 'Pool Home DFW Schedule: Shift pool pump to 8pm–6am (off-peak). Pre-cool home to 71°F by 1:30pm. Pool pump running during peak adds ~2kW load — shifting saves $40–$80/month during ERCOT summer season. Smart pool controller pays for itself in one season.';
    } else if (enrolled) {
      schedule = 'ERCOT Flex Schedule: Pre-cool to 72°F by 1:45pm sharp. Set 79°F for 2–7pm ERCOT peak window. Earn $0.50–$1.50/day in demand response credits from your utility. Recover to 74°F at 7:01pm. Estimated annual ERCOT credit: $150–$400 depending on your utility enrollment tier.';
    } else {
      schedule = 'Money-Saving Schedule (No ERCOT): Pre-cool 71°F by 1:30pm. Raise to 78°F for 2–7pm — saves 30–40% on your highest-rate hours. Recover to 74°F at 7pm. Fan mode 10pm–5am in spring/fall when outdoor temp drops below 74°F. Estimated savings vs always-on: $300–$600/summer season.';
    }
    setResult(schedule);
  };

  const stats = [
    { icon: '⏰', label: 'ERCOT Peak Window', val: '2–7pm', sub: 'Daily June–September in DFW' },
    { icon: '🌡️', label: 'Pre-Cool Target', val: '71–72°F', sub: 'By 1:45pm before peak starts' },
    { icon: '💰', label: 'Peak Hour Savings', val: '30–40%', sub: 'vs running normally 2–7pm' },
    { icon: '🌙', label: 'Free Cooling Window', val: '10pm–6am', sub: 'Fan-only mode on mild DFW nights' },
  ];

  const schedule = [
    { time: '6am–1:45pm', action: 'Normal comfort setpoint (74–75°F)', why: 'Off-peak rates, HVAC at full capacity' },
    { time: '1:45–2pm', action: 'Pre-cool to 71–72°F', why: 'Thermal mass stores cool before peak starts' },
    { time: '2:00–7pm', action: 'Raise to 78–79°F', why: 'ERCOT peak window — minimize compressor runtime' },
    { time: '7pm–10pm', action: 'Recover to 74°F', why: 'Peak over, rates drop, comfort restored' },
    { time: '10pm–6am', action: 'Fan mode if outdoor below 75°F', why: 'Free cooling on mild DFW nights in spring/fall' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW Smart HVAC Scheduling Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>ERCOT peak optimization and smart scheduling for DFW homeowners</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.25rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>📅 Optimal DFW Summer Day Schedule</h2>
          {schedule.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0.75rem', background: '#0f1f3d', borderRadius: '8px', marginBottom: '0.4rem', alignItems: 'center' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: '110px', fontSize: '0.85rem' }}>{r.time}</span>
              <span style={{ color: '#60a5fa', minWidth: '180px', fontSize: '0.85rem' }}>{r.action}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{r.why}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 Build My Smart Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>ERCOT Participation</label>
              <select value={ercotInterest} onChange={e => setErcotInterest(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {ercotOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {homeTypes.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getSchedule} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Generate My HVAC Schedule
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0f1f3d', borderRadius: '8px', color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
