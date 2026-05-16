import { useState } from 'react';

const HOME_SIZES = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'];
const FAMILY_TYPES = ['Single / Couple', 'Family with Kids', 'Multi-generational', 'Work From Home'];

const FEATURES = [
  { icon: '🌡️', title: 'HVAC Voice Control', desc: 'Critical for DFW — "Alexa, set thermostat to 72" before you arrive home saves $30/month in summer.' },
  { icon: '🔔', title: 'Filter Replacement Reminders', desc: 'DFW air quality means filters clog faster. Set monthly reminders tied to your actual HVAC schedule.' },
  { icon: '⚡', title: 'Energy Management', desc: 'Ask "How much energy did I use today?" and get TOU rate alerts during ERCOT peak hours (3–7pm).' },
  { icon: '🛒', title: 'Smart Shopping Lists', desc: 'Add HVAC filters, lawn treatments, and DFW seasonal supplies automatically to your cart.' },
  { icon: '🚪', title: 'Arrival / Departure Routines', desc: 'Auto-adjust thermostat, lock doors, and arm security when you leave or arrive.' },
  { icon: '🌦️', title: 'DFW Weather Routines', desc: 'Freeze warnings trigger pipe-protection alerts. Storm alerts pause irrigation and close smart vents.' },
];

const RECOMMENDATIONS: Record<string, Record<string, string[]>> = {
  'Single / Couple': {
    'Under 1,500 sqft': ['Amazon Echo Dot (1 unit)', 'Single-zone HVAC control', 'Energy monitoring skill', 'Away mode automation'],
    '1,500–2,500 sqft': ['Amazon Echo (2 units)', 'HVAC + lighting scenes', 'ERCOT peak hour alerts', 'Filter reminder routines'],
    '2,500–4,000 sqft': ['Echo + Echo Show combo', 'Multi-room audio', 'Smart thermostat integration', 'DFW weather emergency alerts'],
    '4,000+ sqft': ['Echo fleet (4+ units)', 'Whole-home scenes', 'Energy dashboard', 'Smart panel integration'],
  },
  'Family with Kids': {
    'Under 1,500 sqft': ['Google Nest Hub', 'Homework timer routines', 'Kid-safe voice profiles', 'Chore reminder skills'],
    '1,500–2,500 sqft': ['Google Home (2 units)', 'School schedule automation', 'HVAC kid-zone control', 'Bedtime routines'],
    '2,500–4,000 sqft': ['Google Nest Hub Max', 'Multi-zone control per room', 'After-school arrival alerts', 'Summer cooling schedules'],
    '4,000+ sqft': ['Google Home fleet', 'Full house intercom', 'Energy cost tracker', 'Guest network voice control'],
  },
  'Multi-generational': {
    'Under 1,500 sqft': ['Echo Show 8 (visual)', 'Large-button routines', 'Medication reminders', 'Emergency alert skills'],
    '1,500–2,500 sqft': ['Echo Show per floor', 'Senior-friendly voice control', 'Doctor appointment reminders', 'Video call hub'],
    '2,500–4,000 sqft': ['Mixed Echo + Show setup', 'Per-suite climate control', 'Privacy zone settings', 'Health monitoring routines'],
    '4,000+ sqft': ['Full Echo ecosystem', 'Intercom between suites', 'Individual energy zones', 'Emergency broadcast'],
  },
  'Work From Home': {
    'Under 1,500 sqft': ['Echo Dot desk unit', 'Focus mode scenes', 'Do Not Disturb schedules', 'Coffee routine triggers'],
    '1,500–2,500 sqft': ['Echo Studio (audio quality)', 'Meeting mode (mute doorbell)', 'Pre-cool office by 8am', 'End-of-day wind-down scenes'],
    '2,500–4,000 sqft': ['Echo Show for video calls', 'Office zone HVAC control', 'ERCOT peak alerting', 'Deep work Pomodoro timer'],
    '4,000+ sqft': ['Whole-home WFH setup', 'Conference room scenes', 'Guest isolation routines', 'Energy office-hours mode'],
  },
};

export default function DFWAIHomeAssistantGuide() {
  const [size, setSize] = useState('');
  const [family, setFamily] = useState('');
  const [showRecs, setShowRecs] = useState(false);

  const recs = family && size ? RECOMMENDATIONS[family]?.[size] ?? [] : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🤖</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW AI Home Assistant Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>How Alexa & Google Home are changing DFW home management</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#0F2240', borderRadius: 10, padding: '1rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.3rem', fontSize: '0.9rem' }}>{f.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>Get Your DFW Setup Recommendation</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Home size?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {HOME_SIZES.map(s => (
              <button key={s} onClick={() => setSize(s)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: size === s ? '#F5E642' : '#1E3A5F',
                background: size === s ? '#F5E642' : 'transparent',
                color: size === s ? '#0A1628' : '#94A3B8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{s}</button>
            ))}
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Household type?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {FAMILY_TYPES.map(f => (
              <button key={f} onClick={() => setFamily(f)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: family === f ? '#F5E642' : '#1E3A5F',
                background: family === f ? '#F5E642' : 'transparent',
                color: family === f ? '#0A1628' : '#94A3B8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{f}</button>
            ))}
          </div>
          <button onClick={() => setShowRecs(true)} disabled={!size || !family} style={{
            background: size && family ? '#F5E642' : '#1E3A5F', color: '#0A1628',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700,
            fontSize: '1rem', cursor: size && family ? 'pointer' : 'not-allowed',
          }}>Show My Setup Plan →</button>
        </div>

        {showRecs && recs.length > 0 && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your DFW AI Assistant Plan</h3>
            {recs.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>✓</span>
                <span style={{ color: '#E2E8F0' }}>{r}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '1rem', background: '#0F2240', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', margin: '0 0 0.75rem' }}>Need a smart home installer in DFW?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>
            🔧 Find a DFW Smart Home Pro
          </button>
        </div>
      </div>
    </div>
  );
}
