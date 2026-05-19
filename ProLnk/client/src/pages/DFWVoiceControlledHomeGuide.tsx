import { useState } from 'react';

const ecosystems = [
  { id: 'alexa', label: 'Amazon Alexa', commands: [
    { cmd: '"Alexa, what\’s the temp outside?"', benefit: 'Check DFW heat index before opening up the house or turning off AC' },
    { cmd: '"Alexa, set the thermostat to 74"', benefit: 'Instant HVAC adjustment without walking to the panel' },
    { cmd: '"Alexa, turn off all downstairs lights"', benefit: 'Energy savings during DFW peak rate hours (3–7pm)' },
    { cmd: '"Alexa, lock the front door"', benefit: 'Security check when leaving for weekend travel' },
    { cmd: '"Alexa, run the sprinklers for 10 minutes"', benefit: 'Precise lawn care during DFW watering restrictions' },
  ]},
  { id: 'google', label: 'Google Home', commands: [
    { cmd: '"Hey Google, pre-cool to 72 before I get home"', benefit: 'AI schedules cool-down using DFW traffic ETA from Maps' },
    { cmd: '"Hey Google, what\’s my energy usage today?"', benefit: 'Real-time Oncor smart meter data in DFW areas' },
    { cmd: '"Hey Google, close the garage door"', benefit: 'Secure after forgetting — huge in DFW suburbs' },
    { cmd: '"Hey Google, set vacation mode"', benefit: 'Automated schedule + security while traveling' },
    { cmd: '"Hey Google, find me an HVAC tech"', benefit: 'Pulls ProLnk-matched contractors for your DFW zip' },
  ]},
  { id: 'siri', label: 'Apple HomeKit / Siri', commands: [
    { cmd: '"Hey Siri, goodnight"', benefit: 'Triggers scene: lock doors, dim lights, set 76° overnight (DFW summer standard)' },
    { cmd: '"Hey Siri, is my garage open?"', benefit: 'Status check from anywhere — critical for DFW storm prep' },
    { cmd: '"Hey Siri, add plumber to my home notes"', benefit: 'HomeKit Siri integrates with iOS reminders natively' },
    { cmd: '"Hey Siri, set AC to energy-saving mode"', benefit: 'Reduces AC load during DFW grid stress events' },
    { cmd: '"Hey Siri, turn on the back patio lights"', benefit: 'Outdoor entertaining in DFW evenings made seamless' },
  ]},
];

export default function DFWVoiceControlledHomeGuide() {
  const [selected, setSelected] = useState('alexa');
  const eco = ecosystems.find(e => e.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🎙️</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '16px 0 8px' }}>Voice-Controlled Home Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>The most useful voice commands for DFW homeowners — from beating the summer heat to managing your property hands-free</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🌡️ Why Voice Control Matters in DFW</h2>
          {[
            ['☀️', 'DFW Heat Management', 'With 100°F+ summers, pre-cooling and real-time temp adjustments save $60–$120/month on Oncor bills.'],
            ['⛈️', 'Storm Response', 'Voice commands let you close garage, lock doors, and check sensors without scrambling through apps during fast-moving DFW storms.'],
            ['💧', 'Water Restrictions', 'Voice-scheduled irrigation ensures you stay compliant with DFW city watering rules without manual tracking.'],
            ['🏃', 'Contractor Coordination', 'Voice reminders + notes make it easy to manage the high volume of home service calls DFW homeowners average annually.'],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 16, marginBottom: 16, background: '#0A1628', borderRadius: 12, padding: 16 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{title}</div><div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>🔊 Your Ecosystem → Best Commands</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select your smart home platform to see the most valuable voice commands for DFW homeownership:</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {ecosystems.map(e => (
              <button key={e.id} onClick={() => setSelected(e.id)} style={{ flex: 1, padding: '10px 8px', borderRadius: 8, border: '2px solid', borderColor: selected === e.id ? '#F5E642' : '#1e3a5f', background: selected === e.id ? '#F5E642' : 'transparent', color: selected === e.id ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{e.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {eco.commands.map(({ cmd, benefit }) => (
              <div key={cmd} style={{ background: '#0A1628', borderRadius: 12, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{cmd}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>💡 {benefit}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏡</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Ready to Voice-Command Your Next Contractor?</h3>
          <p style={{ color: '#112240', fontSize: 15, marginBottom: 16 }}>ProLnk matches DFW homeowners with vetted pros — coming soon: voice-initiated service requests through your smart speaker.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Join the ProLnk Waitlist →</button>
        </div>
      </div>
    </div>
  );
}
