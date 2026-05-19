import { useState } from 'react';

const complaints = [
  {
    id: 'hot_spots',
    label: 'Hot or cold spots in rooms',
    guarantee: 'Temperature within 2°F of thermostat setpoint in all occupied rooms',
    holdThem: 'Request a room-by-room temp test with a calibrated thermometer during peak load. Document readings and compare to setpoint.',
    redFlags: 'Contractor says "that\’s normal" without testing — it\’s not. All rooms should reach setpoint within 30 min of system run time.',
  },
  {
    id: 'humidity',
    label: 'Muggy or dry air indoors',
    guarantee: '45–55% relative humidity in summer, 30–45% in winter for DFW climate',
    holdThem: 'Use a calibrated hygrometer to measure RH. Ask contractor to demonstrate system humidity performance during commissioning.',
    redFlags: 'No humidity spec in the contract. DFW summers demand humidity control — any installer who ignores it is cutting corners.',
  },
  {
    id: 'noise',
    label: 'System is too loud',
    guarantee: 'Indoor noise levels below 50 dB measured at the register nearest the air handler',
    holdThem: 'Use a free dB meter app. Measure at 3 feet from the register during normal operation. Get the noise spec in writing pre-install.',
    redFlags: 'Contractor says noise is subjective. It is not — decibel levels are measurable and should be guaranteed by brand and model.',
  },
  {
    id: 'recovery',
    label: 'Takes too long to cool or heat',
    guarantee: 'System should recover setpoint within 30 minutes when returning from setback or after door/window exposure',
    holdThem: 'Run a timed recovery test. Raise thermostat 5°F, then reset. Time how long to return to setpoint. Log results for warranty claims.',
    redFlags: 'If recovery takes over 45 minutes on a properly sized system, it may be undersized — a serious install defect in DFW heat.',
  },
  {
    id: 'airflow',
    label: 'Weak airflow from vents',
    guarantee: 'Airflow within 10% of design CFM per duct, per ACCA Manual D specifications',
    holdThem: 'Request a duct balancing report post-install. A quality DFW installer will measure and document each duct\’s airflow.',
    redFlags: 'No duct sizing calculation provided. Manual D compliance is not optional — it\’s how proper DFW systems are designed.',
  },
];

export default function DFWHVACComfortGuaranteeGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF4′ }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC Comfort Guarantee Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BAAC0', maxWidth: 580, margin: '0 auto' }}>
            What every DFW homeowner should demand from their HVAC installer — and how to hold them to it.
          </p>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            🏠 What a Real DFW Comfort Guarantee Looks Like
          </h2>
          <p style={{ color: '#9BAAC0', fontSize: 15, lineHeight: 1.7 }}>
            In DFW's extreme climate — 100°F+ summers, icy winters — comfort is not a luxury. A professional HVAC installer
            should put performance specs in writing: temperature delivery within 2°F of setpoint in every room,
            humidity control within range, noise below 50 dB, and documented airflow per design.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#E8EDF4', marginBottom: 16 }}>
          🔍 Select Your Comfort Complaint
        </h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {complaints.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#1A3A6E' : '#0F2040',
                border: selected === c.id ? '2px solid #F5E642′ : '1px solid #1E3A5F',
                borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
                textAlign: 'left', color: '#E8EDF4', fontSize: 15, fontWeight: 600,
                transition: 'all 0.2s', width: '100%',
              }}
            >
              {selected === c.id ? '▼' : '▶'} {c.label}
              {selected === c.id && (
                <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>✅ What They Should Guarantee</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{c.guarantee}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📋 How to Hold Them To It</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{c.holdThem}</div>
                  </div>
                  <div style={{ background: '#1A0A0A', border: '1px solid #5F1E1E', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#FF6B6B', fontWeight: 700, marginBottom: 6 }}>🚩 Red Flags</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{c.redFlags}</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 Pro Tip: Get It In Writing</h3>
          <p style={{ color: '#9BAAC0', fontSize: 14, lineHeight: 1.7 }}>
            Any reputable DFW HVAC contractor will include comfort specs in their installation agreement.
            If a contractor refuses to put performance metrics in writing, that's your signal to look elsewhere.
            ProLnk only matches DFW homeowners with contractors who stand behind their work.
          </p>
        </div>
      </div>
    </div>
  );
}
