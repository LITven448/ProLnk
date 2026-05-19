import { useState } from 'react';

const stressLevels = [
  {
    level: 'High Stress',
    emoji: '😰',
    description: 'Worried every time the AC runs, dreading the next breakdown',
    solutions: [
      '✅ Schedule annual DFW HVAC tune-up before summer heat hits',
      '✅ Save 3 ProLnk-vetted contractors in your phone right now',
      '✅ Build a $500-1,000 HVAC emergency fund this month',
      '✅ Document your system: age, model, last service date',
    ],
  },
  {
    level: 'Moderate Stress',
    emoji: '😟',
    description: 'Some anxiety, but managing — just not confident in a crisis',
    solutions: [
      '✅ Review your last service report and flag anything unresolved',
      '✅ Set calendar reminders for filter changes every 60 days',
      '✅ Confirm your contractor offers 24/7 emergency service',
      '✅ Know your system’s warranty status and what it covers',
    ],
  },
  {
    level: 'Low Stress',
    emoji: '😊',
    description: 'Mostly calm — your system is maintained and you have a plan',
    solutions: [
      '✅ You’re ahead of 80% of DFW homeowners — keep it up',
      '✅ Use ProLnk to compare your current contractor vs. top-rated alternatives',
      '✅ Add your system to Home Health Vault for long-term tracking',
      '✅ Share your peace-of-mind approach with neighbors and earn referrals',
    ],
  },
];

export default function DFWHVACDFWPeace() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🧘</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC Peace of Mind Guide
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
            Real peace of mind in DFW isn't hoping your AC holds — it’s knowing exactly what to do
            when it doesn't. Here’s how to build that certainty.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { emoji: '🔧', label: 'System is healthy', sub: 'Maintained & documented' },
            { emoji: '📱', label: 'Backup is ready', sub: 'ProLnk contractors saved' },
            { emoji: '🚨', label: 'Emergency plan exists', sub: 'Who to call, what to do' },
            { emoji: '💰', label: 'Budget is set', sub: '$500–$1K reserve' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 30 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, marginTop: 8, fontSize: 14 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            🌡️ What's your current HVAC stress level?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {stressLevels.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? '#F5E642′ : '#0f172a',
                  color: selected === i ? '#0A1628′ : '#fff',
                  border: '2px solid',
                  borderColor: selected === i ? '#F5E642′ : '#334155',
                  borderRadius: 10,
                  padding: '14px 18px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {item.emoji} {item.level} — <span style={{ fontWeight: 400 }}>{item.description}</span>
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 16, fontWeight: 700 }}>
                Your path to HVAC peace of mind:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {stressLevels[selected].solutions.map((s, j) => (
                  <li key={j} style={{ padding: '6px 0', fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🏠</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, margin: '8px 0′ }}>
            ProLnk is your DFW HVAC safety net
          </h3>
          <p style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.6 }}>
            Pre-vetted contractors, same-day emergency matching, and your Home Health Vault record
            — all working together so you're never caught off guard again.
          </p>
        </div>
      </div>
    </div>
  );
}
