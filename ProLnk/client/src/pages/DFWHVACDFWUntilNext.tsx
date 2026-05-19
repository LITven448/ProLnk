import { useState } from 'react';

const steps = [
  {
    label: 'Apply It at Home',
    icon: '🏠',
    content: 'Start with your next HVAC filter change. Schedule your fall tune-up. Walk your outdoor unit after the next storm. Every small action compounds into a home that runs efficiently for years.',
  },
  {
    label: 'Share with a Neighbor',
    icon: '🤝',
    content: 'Your neighbor probably doesn\’t know about the DFW HVAC library. Send them the ProLnk link. Host a quick HOA conversation. Shared knowledge multiplies its value across the whole community.',
  },
  {
    label: 'Use ProLnk When Ready',
    icon: '⚡',
    content: 'When your HVAC needs service, don\’t guess. Use ProLnk to match with a verified DFW contractor. The network you\’ve learned about is ready to serve you the moment you need it.',
  },
  {
    label: 'Build the Network',
    icon: '🌐',
    content: 'Refer a pro. Refer a homeowner. Join the ProLnk referral network and earn while helping people you know find trusted HVAC contractors in DFW. Five income streams. Zero guesswork.',
  },
];

export default function DFWHVACDFWUntilNext() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>🔄</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '16px 0 8px' }}>
            Until Next Time — DFW HVAC
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            The session ends. The knowledge stays. Here's exactly what to do with everything
            you've learned — until the next time you open ProLnk.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>📅 Your DFW HVAC Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, color: '#cbd5e1', fontSize: 15 }}>
            {['Spring: System tune-up + filter change', 'Summer: Check refrigerant + coil cleaning', 'Fall: Heating system inspection', 'Winter: Thermostat check + emergency prep'].map((item, i) => (
              <div key={i} style={{ background: '#162544', borderRadius: 8, padding: '10px 14px' }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8, textAlign: 'center' }}>
          🧭 Choose Your Next Step
        </h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>
          Select where you are and we'll tell you exactly how to continue the journey.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {steps.map((s, i) => (
            <div key={i}>
              <button
                onClick={() => setActive(active === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left',
                  background: active === i ? '#F5E642' : '#1e3a5f',
                  color: active === i ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 12, padding: '16px 20px',
                  cursor: 'pointer', fontSize: 16, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                {s.label}
              </button>
              {active === i && (
                <div style={{ background: '#0f1f3d', border: '1px solid #F5E642', borderRadius: '0 0 12px 12px', padding: '16px 20px', color: '#cbd5e1', fontSize: 15, lineHeight: 1.7 }}>
                  {s.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', background: '#0f1f3d', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🌟</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: 0 }}>
            ProLnk will be here when you return.
          </p>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 15 }}>
            The DFW HVAC library grows with every session. Come back any time.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 14 }}>
          ProLnk • DFW HVAC Resource Library • 2026
        </div>
      </div>
    </div>
  );
}
