import { useState } from 'react';

const HVAC_SETUPS = ['Single-zone central', 'Multi-zone central', 'Mini-split system', 'Heat pump'];
const SCHEDULES = ['Always home', 'Standard 9–5 away', 'Irregular schedule', 'Frequent traveler'];

const FEATURES = [
  { icon: '⏰', title: 'Pre-cool Before Peak Hours', desc: 'ERCOT 3–7pm peak pricing can cost 3x normal rates. Smart thermostats auto-cool your DFW home to 68°F by 2:45pm then coast.' },
  { icon: '👤', title: 'Occupancy-Based Control', desc: 'Motion sensors + phone geofencing cut HVAC runtime 20% in typical DFW homes by detecting empty rooms.' },
  { icon: '🌍', title: 'Remote Vacation Access', desc: 'Set 85°F holding temp from your phone when traveling. Save $150+ per week-long DFW summer vacation.' },
  { icon: '💰', title: 'ERCOT Demand Response', desc: 'Enroll your smart thermostat in Demand Response programs. DFW homeowners earn $50–$200/summer for allowing brief setbacks.' },
  { icon: '🌡️', title: 'Multi-Zone Precision', desc: 'Control upstairs vs downstairs separately — critical for DFW two-story homes where upstairs can be 8°F hotter.' },
  { icon: '📊', title: 'Runtime & Efficiency Reports', desc: 'Monthly reports show HVAC cycles, filter usage, and efficiency trends specific to your DFW climate zone.' },
];

type Plan = { thermostat: string; config: string[]; savings: string; extras: string[] };

function getPlan(setup: string, schedule: string): Plan {
  const traveler = schedule === 'Frequent traveler';
  const irregular = schedule === 'Irregular schedule';
  const standard = schedule === 'Standard 9–5 away';

  if (setup === 'Multi-zone central') {
    return {
      thermostat: 'Ecobee SmartThermostat Premium (per zone)',
      config: ['Zone sensors in every occupied room', 'Geofencing per family member', 'Peak-hour pre-cool schedule', 'ERCOT demand response enrollment'],
      savings: '$280–$420/year',
      extras: traveler ? ['Vacation hold mode', 'Away notifications if temp spikes'] : ['Follow-me room sensing', 'Sleep schedule optimization'],
    };
  }
  if (setup === 'Mini-split system') {
    return {
      thermostat: 'Cielo Breez Plus (per head unit)',
      config: ['Room-by-room scheduling', 'Humidity-based auto mode for DFW humidity swings', 'Phone app grouping', 'Weekly schedule templates'],
      savings: '$150–$220/year',
      extras: ['Filter cleaning reminders', 'Energy usage per room'],
    };
  }
  if (setup === 'Heat pump') {
    return {
      thermostat: 'Google Nest Learning Thermostat',
      config: ['Auto heat/cool switchover', 'Balance mode for DFW shoulder seasons', 'Sunblock schedule for afternoon heat', 'Emergency heat override'],
      savings: '$180–$300/year',
      extras: traveler ? ['Smart away learning', 'Low-temp freeze alerts'] : ['Seasonal adjustment', 'Energy history dashboard'],
    };
  }
  return {
    thermostat: 'Honeywell T6 Pro or Google Nest (E)',
    config: [
      standard ? 'M–F 8am away / 5pm home schedule' : 'Geofencing-based schedule',
      'Pre-cool to 70°F by 2:30pm in summer',
      'ERCOT peak-hour setback 74°F (3–7pm)',
      'Night setback to 72°F',
    ],
    savings: irregular || traveler ? '$160–$240/year' : '$200–$300/year',
    extras: traveler ? ['Vacation mode one-tap', 'Freeze alert notifications'] : ['Filter reminder every 30 days', 'Monthly energy report'],
  };
}

export default function DFWSmartHVACControlGuide() {
  const [setup, setSetup] = useState('');
  const [schedule, setSchedule] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const ready = setup && schedule;
  const plan = ready ? getPlan(setup, schedule) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Smart HVAC Control Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Beat ERCOT peak pricing and DFW heat with intelligent climate control</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#0F2240', borderRadius: 10, padding: '1rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.88rem', marginBottom: '0.3rem' }}>{f.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>Get Your Smart HVAC Configuration</h2>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Current HVAC setup?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {HVAC_SETUPS.map(s => (
              <button key={s} onClick={() => setSetup(s)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: setup === s ? '#F5E642' : '#1E3A5F',
                background: setup === s ? '#F5E642' : 'transparent',
                color: setup === s ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{s}</button>
            ))}
          </div>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Home schedule?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {SCHEDULES.map(s => (
              <button key={s} onClick={() => setSchedule(s)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: schedule === s ? '#F5E642' : '#1E3A5F',
                background: schedule === s ? '#F5E642' : 'transparent',
                color: schedule === s ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{s}</button>
            ))}
          </div>

          <button onClick={() => setShowPlan(true)} disabled={!ready} style={{
            background: ready ? '#F5E642' : '#1E3A5F', color: '#0A1628',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem',
            fontWeight: 700, fontSize: '1rem', cursor: ready ? 'pointer' : 'not-allowed',
          }}>Get My HVAC Plan →</button>
        </div>

        {showPlan && plan && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your DFW Smart HVAC Setup</h3>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Recommended Thermostat</span>
              <div style={{ color: '#E2E8F0', fontWeight: 700, marginTop: '0.2rem' }}>{plan.thermostat}</div>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Configuration Steps</span>
              {plan.config.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', marginTop: '0.35rem' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span>
                  <span style={{ color: '#E2E8F0', fontSize: '0.9rem' }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Estimated Annual Savings</span>
              <div style={{ color: '#34D399', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.2rem' }}>{plan.savings}</div>
            </div>
            <div>
              <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Extra Features for You</span>
              {plan.extras.map((e, i) => (
                <div key={i} style={{ color: '#E2E8F0', fontSize: '0.9rem', marginTop: '0.3rem' }}>✓ {e}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '1rem', background: '#0F2240', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', margin: '0 0 0.75rem' }}>Need a DFW HVAC pro to install your smart system?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>
            🔧 Find a DFW HVAC Pro
          </button>
        </div>
      </div>
    </div>
  );
}
