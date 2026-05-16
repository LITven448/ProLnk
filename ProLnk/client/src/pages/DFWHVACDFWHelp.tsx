import { useState } from 'react';

const needs = [
  {
    label: 'AC Not Cooling',
    icon: '❄️',
    resource: 'ProLnk Matching',
    detail: 'A non-cooling AC in a DFW summer is an emergency. Use ProLnk to match instantly with a verified technician. Average response: under 2 hours in DFW metro.',
    steps: ['Open prolnk.io', 'Enter your address + "AC repair"', 'Match with a verified DFW technician', 'Get same-day or next-day service'],
  },
  {
    label: 'Strange Noises',
    icon: '🔊',
    resource: 'DFW Contractor Network',
    detail: 'Banging, rattling, or squealing from your HVAC unit usually signals a mechanical issue. The DFW contractor network has specialists who diagnose noise issues fast.',
    steps: ['Note when the noise occurs', 'Check if it\'s indoor or outdoor unit', 'Use ProLnk to find a diagnostic specialist', 'Book a diagnostic appointment'],
  },
  {
    label: 'High Energy Bills',
    icon: '💸',
    resource: 'Resource Library',
    detail: 'High bills in DFW summers often trace to refrigerant loss, dirty coils, or poor insulation. The ProLnk library has a full efficiency audit guide — start there before calling a tech.',
    steps: ['Read the DFW energy efficiency guide', 'Do the 15-minute home audit', 'Identify the likely cause', 'Match with an efficiency specialist if needed'],
  },
  {
    label: 'Emergency / No Heat',
    icon: '🚨',
    resource: 'Emergency Protocol',
    detail: 'A heating failure during a DFW winter cold snap can be dangerous. ProLnk\'s emergency protocol connects you to an on-call technician within 60 minutes.',
    steps: ['Call the ProLnk emergency line', 'Confirm your address and unit type', 'An on-call tech is dispatched immediately', 'Stay warm — we\'ve got you'],
  },
];

export default function DFWHVACDFWHelp() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>🛠️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '16px 0 8px' }}>
            Get DFW HVAC Help
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            When you need HVAC help in DFW, every minute matters. This guide connects
            your specific situation to the exact right resource — no guessing, no wrong turns.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 8 }}>⚡ DFW HVAC Resources at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, color: '#cbd5e1', fontSize: 14 }}>
            {['ProLnk Matching — for service & repair', 'Resource Library — for DIY & understanding', 'Contractor Network — for specialized work', 'Emergency Protocol — for urgent failures'].map((r, i) => (
              <div key={i} style={{ background: '#162544', borderRadius: 8, padding: '10px 14px' }}>{r}</div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, textAlign: 'center', marginBottom: 8 }}>
          What Do You Need Help With?
        </h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>
          Select your situation — we'll point you to exactly the right DFW HVAC resource.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {needs.map((n, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#F5E642' : '#1e3a5f',
                color: selected === i ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 12, padding: '20px 16px',
                cursor: 'pointer', fontSize: 15, fontWeight: 600,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0f1f3d', border: '1px solid #F5E642', borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{needs[selected].icon}</span>
              <div>
                <h3 style={{ color: '#F5E642', margin: 0, fontSize: 18 }}>{needs[selected].label}</h3>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>Best resource: {needs[selected].resource}</p>
              </div>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>{needs[selected].detail}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {needs[selected].steps.map((step, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#162544', borderRadius: 8, padding: '10px 14px' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{j + 1}.</span>
                  <span style={{ color: '#cbd5e1', fontSize: 15 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 14 }}>
          ProLnk • DFW HVAC Help • 2026 • prolnk.io
        </div>
      </div>
    </div>
  );
}
