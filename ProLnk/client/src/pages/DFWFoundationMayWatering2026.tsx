import { useState } from 'react';

const scenarios = [
  { id: 'dry', label: '🌵 Soil Feeling Dry', protocol: 'Run soaker hoses 45-60 minutes, 3-4x this week. Check 6 inches down with a screwdriver — it should slide in without cracking.' },
  { id: 'cracks', label: '🪨 Seeing Soil Cracks', protocol: 'You are behind schedule. Water deeply today: 90 minutes per zone. Re-check in 48 hours. Maintain daily watering until cracks close.' },
  { id: 'good', label: '✅ Soil Feels Damp', protocol: 'You are on track. Maintain 3x per week schedule through May. Increase to daily when temps exceed 90°F consistently.' },
  { id: 'new', label: '🏠 New DFW Homeowner', protocol: 'Start your soaker hose program now — before you see any signs of cracking. May is the setup month. Perimeter hose 18 inches from foundation, water 3-4x per week.' },
];

export default function DFWFoundationMayWatering2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = scenarios.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW FOUNDATION · MAY 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          DFW Foundation May<br />Watering Complete Guide 2026
        </h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          May is the setup month for DFW foundation health. The expansive clay soil is beginning to dry
          after spring rains. Start your soaker hose program before problems develop — prevention
          costs pennies vs. $5,000-$30,000 in foundation repairs.
        </p>

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>MAY WATERING PROTOCOL</div>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              ['📅', 'Frequency', '3-4x per week in May, daily when temps exceed 90°F'],
              ['⏰', 'Timing', 'Early morning preferred (5-8am) to reduce evaporation loss'],
              ['💧', 'Amount', 'Soil damp 6 inches down — test with screwdriver or moisture probe'],
              ['📍', 'Placement', 'Soaker hose 18 inches from foundation perimeter, on all sides'],
              ['🌡', 'Watch For', 'Gaps between soil and foundation — early warning sign, increase watering immediately'],
            ].map(([icon, title, desc]) => (
              <div key={String(title)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: '#8899AA', fontSize: 13 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>WHAT IS YOUR CURRENT SITUATION?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{
                background: selected === s.id ? '#F5E642′ : '#111D2E',
                color: selected === s.id ? '#0A1628′ : '#fff',
                border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 32, fontWeight: 600, fontSize: 15 }}>
            {active.protocol}
          </div>
        )}

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>FOUNDATION PRO ON PROLNK</div>
          <p style={{ color: '#8899AA', fontSize: 14, margin: 0 }}>
            If you notice cracks wider than 1/4 inch or sticking doors, get a foundation evaluation.
            ProLnk connects DFW homeowners with vetted foundation specialists — join the waitlist for access.
          </p>
        </div>
      </div>
    </div>
  );
}