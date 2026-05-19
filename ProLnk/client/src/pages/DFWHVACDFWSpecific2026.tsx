import { useState } from 'react';

const challenges = [
  {
    id: 'cooling',
    label: '🌡️ 9-Month Cooling Season',
    content: [
      'DFW runs AC from April through October — nearly 9 months',
      'Northern US averages 4–6 months; DFW is nearly double',
      'Your unit works 60–70% harder annually than a Chicago unit',
      'Annual maintenance is not optional — it is survival',
      'Replace filters every 30 days during peak season (not 90)',
      'Size your system for DFW load, not generic square footage charts',
    ],
  },
  {
    id: 'heat',
    label: '🔥 60+ Days Above 95°F',
    content: [
      'DFW averages 65–70 days above 95°F per year',
      'Systems running in 100°F+ ambient air lose 15–20% efficiency',
      'Compressors are the #1 failure point during DFW heat waves',
      'Surge protectors on outdoor units are mandatory — not optional',
      'Set thermostat to 78°F when away; 72°F when home to reduce strain',
      'Pre-cool your home before 2–6 PM peak grid demand hours',
    ],
  },
  {
    id: 'humidity',
    label: '💧 Gulf Humidity (Spring/Summer)',
    content: [
      'Gulf moisture pushes DFW humidity to 70–85% in spring',
      'High humidity forces your AC to work as a dehumidifier too',
      'Oversized units short-cycle and fail to remove moisture properly',
      'Signs of oversizing: clammy air, mold smells, short run cycles',
      'Consider a whole-home dehumidifier if you feel sticky indoors',
      'Drain line checks are critical — blocked lines = water damage',
    ],
  },
  {
    id: 'freeze',
    label: '🧊 Rare But Severe Freezes (Uri 2021)',
    content: [
      'Winter Storm Uri (Feb 2021) destroyed thousands of DFW HVAC units',
      'Heat pumps are now more common — they struggle below 35°F',
      'Dual-fuel systems (heat pump + gas backup) are ideal for DFW',
      'Insulate exposed refrigerant lines before winter each year',
      'Cover outdoor condenser units during rare hard freezes only',
      'Know your emergency heat setting — use it when it drops below 35°F',
    ],
  },
  {
    id: 'cottonwood',
    label: '🌿 Cottonwood Season (May)',
    content: [
      'May cottonwood clogs outdoor condenser coils rapidly in DFW',
      'A clogged condenser can raise energy bills 20–30% instantly',
      'Check and clean your outdoor coils every 2 weeks during May',
      'Use a garden hose (low pressure) to rinse coils from inside out',
      'Install a seasonal pre-filter screen during peak cottonwood weeks',
      'Schedule a spring tune-up in April — before the cottonwood hits',
    ],
  },
];

export default function DFWHVACDFWSpecific2026() {
  const [active, setActive] = useState('cooling');
  const current = challenges.find(c => c.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>❄️🌡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>
            What Makes DFW HVAC Different — 2026 Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            DFW homeowners face HVAC challenges found almost nowhere else in the US. Here's why — and what to do about it.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {challenges.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '10px 16px', borderRadius: 8, border: '2px solid',
                borderColor: active === c.id ? '#F5E642′ : '#1e3a5f',
                background: active === c.id ? '#F5E642′ : '#0f2240',
                color: active === c.id ? '#0A1628′ : '#cbd5e1',
                fontWeight: 700, cursor: 'pointer', fontSize: 13,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f2240', border: '2px solid #F5E642', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 18 }}>
            {current.label}
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {current.content.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 22, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>
            🏠 Need a DFW-certified HVAC pro who understands these challenges?
          </p>
          <a
            href="https://prolnk.io"
            style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 15 }}
          >
            Connect via ProLnk — Free for Homeowners
          </a>
        </div>

        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
          ProLnk DFW HVAC Guide 2026 · Serving Dallas–Fort Worth homeowners · prolnk.io
        </p>
      </div>
    </div>
  );
}
