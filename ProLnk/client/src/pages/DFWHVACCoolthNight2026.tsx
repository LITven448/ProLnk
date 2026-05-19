import { useState } from 'react';

const months = [
  { name: 'June', low: 78, humid: true },
  { name: 'July', low: 80, humid: true },
  { name: 'August', low: 79, humid: true },
  { name: 'September', low: 72, humid: false },
  { name: 'October', low: 60, humid: false },
];

const strategy = (month: typeof months[0]) => {
  if (month.humid && month.low >= 78) return { label: '⚠️ Too Humid', detail: 'DFW dew points above 70°F tonight — running fans adds moisture indoors. Keep AC running.', color: '#e74c3c' };
  if (month.low >= 75) return { label: '✅ Marginal Benefit', detail: 'Open windows at 11pm, run whole-house fan for 2 hrs to exhaust attic heat, close before sunrise.', color: '#F5E642' };
  return { label: '🌙 Full Free Cooling', detail: 'Open all windows at 10pm, run attic fan all night, close by 7am. Typical savings: $8-14/day.', color: '#27ae60' };
};

export default function DFWHVACCoolthNight2026() {
  const [selected, setSelected] = useState(0);
  const month = months[selected];
  const result = strategy(month);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
          🌬️ DFW FREE COOLING GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Using DFW Nights for Free Cooling</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          DFW summer nights drop to 75–80°F — smart homeowners use fan-only mode to exhaust attic heat and flush hot indoor air before sunrise.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🕚', label: 'Best Window', val: '11pm – 6am' },
            { icon: '💧', label: 'Too Humid When', val: 'Dew pt > 70°F' },
            { icon: '🔒', label: 'Safety First', val: 'Check all window screens' },
            { icon: '💰', label: 'Avg Daily Savings', val: '$8 – $14' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 2 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>🗓️ Select DFW Month</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {months.map((m, i) => (
              <button key={m.name} onClick={() => setSelected(i)}
                style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>
                {m.name}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${result.color}` }}>
            <div style={{ fontWeight: 700, color: result.color, fontSize: 18, marginBottom: 8 }}>{result.label}</div>
            <div style={{ color: '#cbd5e1' }}>Avg overnight low: <strong style={{ color: '#fff' }}>{month.low}°F</strong> — {result.detail}</div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚠️ Safety Checklist Before Opening Up</div>
          {['Inspect all window screens for holes or tears', 'Ensure ground-floor openings are secured or elevated', 'Never leave windows open unattended if humidity rises overnight', 'Close all openings before 7am to trap cool air inside'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cbd5e1' }}>
              <span>✅</span><span>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>🏠 Track Your Home's Cooling History with ProLnk</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Every HVAC service, seasonal tip, and cost-saving action logged in your Home Health Vault — permanently.</div>
        </div>
      </div>
    </div>
  );
}