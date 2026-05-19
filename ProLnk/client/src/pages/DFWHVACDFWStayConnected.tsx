import { useState } from 'react';

const prefs = [
  {
    label: 'Join the Waitlist',
    icon: '📋',
    detail: 'Be first in line when ProLnk opens to DFW homeowners. Your spot reserves priority access to verified HVAC contractors, the full lead network, and the Network Income System.',
    action: 'Go to prolnk.io and sign up — takes 60 seconds.',
  },
  {
    label: 'Follow Updates',
    icon: '📡',
    detail: 'ProLnk publishes DFW HVAC updates as the platform grows — new contractors vetted, new features launched, new library pages added. Stay in the loop without any commitment.',
    action: 'Add prolnk.io to your bookmarks and check back monthly.',
  },
  {
    label: 'Get Reminders',
    icon: '🔔',
    detail: 'Seasonal HVAC reminders help DFW homeowners never miss a tune-up, filter change, or storm prep window. Subscribe to smart reminders tailored to DFW\’s climate calendar.',
    action: 'Sign up with your email at prolnk.io — reminder preferences come next.',
  },
  {
    label: 'Join the Community',
    icon: '🏘️',
    detail: 'DFW homeowners who share HVAC knowledge build stronger neighborhoods. The ProLnk community connects you with people in your ZIP code who\’ve been through the same challenges.',
    action: 'Join the ProLnk waitlist and opt into the community beta.',
  },
];

export default function DFWHVACDFWStayConnected() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>🔗</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '16px 0 8px' }}>
            Stay Connected with ProLnk
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            This is the beginning of a relationship between DFW homeowners and the HVAC knowledge
            they deserve. Here's how to stay connected and keep that relationship growing.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌟 What's Coming for DFW</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Full contractor matching — DFW verified pros, real-time availability</li>
            <li>Home Health Vault — your home's full HVAC history, stored securely</li>
            <li>Network Income System — earn by referring neighbors and contractors</li>
            <li>Seasonal HVAC intelligence — smart alerts before every Texas season shift</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8, textAlign: 'center' }}>
          How Do You Want to Stay Connected?
        </h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>
          Choose your connection preference and get a clear next step.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {prefs.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#F5E642′ : '#1e3a5f',
                color: selected === i ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 12, padding: '20px 16px',
                cursor: 'pointer', fontSize: 15, fontWeight: 600,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0f1f3d', border: '1px solid #F5E642', borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 18 }}>
              {prefs[selected].icon} {prefs[selected].label}
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: '0 0 14px' }}>
              {prefs[selected].detail}
            </p>
            <div style={{ background: '#162544', borderRadius: 8, padding: '12px 16px', color: '#F5E642', fontWeight: 600, fontSize: 15 }}>
              ➡️ {prefs[selected].action}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 14 }}>
          ProLnk • DFW HVAC • 2026 • prolnk.io
        </div>
      </div>
    </div>
  );
}
