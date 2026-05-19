import { useState } from 'react';

const actions = [
  {
    id: 'tuneup',
    label: '🔧 Pre-Summer Tune-Up',
    title: 'Schedule Your Tune-Up Before May 31',
    steps: [
      'Book a 21-point inspection: coils, refrigerant level, capacitors, drain line, thermostat calibration.',
      'Ask the tech to check your air handler filter and replace if over 3 months old.',
      'Request a written inspection report — you’ll need it if the system fails under warranty.',
      'Verify the contractor is NATE-certified and licensed in Texas (TDL #).',
    ],
    why: 'DFW summers routinely exceed 105°F. Systems that go into summer without a tune-up fail at 3× the rate of inspected systems.',
  },
  {
    id: 'warranty',
    label: '📄 Register Warranty',
    title: 'Register Your HVAC Warranty in 2026',
    steps: [
      'Locate your system\’s model and serial number (usually on the outdoor unit nameplate).',
      'Visit the manufacturer’s website (Carrier, Trane, Lennox, Goodman, etc.) and register within 60 days of install.',
      'Store your warranty certificate in your Home Health Vault for future reference.',
      'Note: unregistered systems often default to 5-year parts — registered units get 10-year coverage.',
    ],
    why: 'Most DFW homeowners never register their HVAC warranty. A 10-year warranty can be worth $800–$3,000 in covered repairs.',
  },
  {
    id: 'prolnk',
    label: '🔗 Join ProLnk',
    title: 'Join ProLnk Before You Need It',
    steps: [
      'Sign up at prolnk.io — takes 90 seconds, free for homeowners.',
      'Enter your ZIP code and the type of service you anticipate needing.',
      'ProLnk pre-matches you with 2–3 vetted pros in your area.',
      'When you need service, you get a real quote fast — no waiting on hold.',
    ],
    why: 'The worst time to find a good HVAC contractor is when your system fails at 9pm on a 104°F day. Set up your match now.',
  },
  {
    id: 'replace',
    label: '🏗️ Plan Replacement',
    title: 'If Your System Is 10+ Years Old, Plan Now',
    steps: [
      'Get a replacement quote in spring — prices rise 15–25% once summer demand peaks.',
      'Ask for SEER2 14.3+ systems using R-454B or R-32 refrigerant.',
      'Check Oncor / Atmos rebates — up to $500 for qualifying equipment in 2026.',
      'Consider heat pump if your home is under 2,500 sq ft and well-insulated.',
    ],
    why: 'Systems over 10 years old average 30% higher energy bills and 60% higher repair frequency vs. new installs.',
  },
];

export default function DFWHVACDFWAction2026() {
  const [selected, setSelected] = useState(actions[0].id);
  const active = actions.find(a => a.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>What DFW Homeowners Should Do This Year</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
            Select an action area to get your specific 2026 action plan.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
          {actions.map(a => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              style={{
                padding: '10px 18px', borderRadius: 8, border: '2px solid',
                borderColor: selected === a.id ? '#F5E642' : '#1E3A5F',
                backgroundColor: selected === a.id ? '#F5E642' : '#0F2340',
                color: selected === a.id ? '#0A1628' : '#CBD5E1',
                fontWeight: 600, cursor: 'pointer', fontSize: 14,
              }}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2340', borderRadius: 16, padding: 36, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginTop: 0 }}>{active.title}</h2>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: '18px 22px', marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Why This Matters</div>
            <p style={{ color: '#E2E8F0', margin: 0, fontSize: 15 }}>{active.why}</p>
          </div>
          <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>Step-by-Step Plan</div>
          {active.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
              <div style={{ minWidth: 28, height: 28, borderRadius: '50%', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
              <p style={{ color: '#CBD5E1', margin: 0, fontSize: 15, lineHeight: 1.6 }}>{step}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', backgroundColor: '#0F2340', borderRadius: 12, padding: 28, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Ready to Act? ProLnk Connects You Fast</div>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Vetted DFW HVAC pros, transparent quotes, zero pressure.</p>
          <a href="https://prolnk.io" style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Get My HVAC Match
          </a>
        </div>
      </div>
    </div>
  );
}
