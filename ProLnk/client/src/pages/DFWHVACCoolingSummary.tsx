import { useState } from 'react';

const situations = [
  { label: 'My AC isn\’t cooling well', key: 'poor_cooling' },
  { label: 'My energy bills are too high', key: 'high_bills' },
  { label: 'Need a new AC system', key: 'replacement' },
  { label: 'Emergency — AC is completely out', key: 'emergency' },
  { label: 'Want to maintain my current system', key: 'maintenance' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  poor_cooling: {
    title: '🔍 DFW Cooling Troubleshooting Plan',
    steps: [
      '✅ Check and replace air filter (DFW dust clogs filters fast)',
      '✅ Verify thermostat set to COOL, fan to AUTO',
      '✅ Check all vents are open and unobstructed',
      '✅ Inspect outdoor unit — clear debris, ensure 2ft clearance',
      '✅ Check circuit breaker for tripped HVAC breaker',
      '📞 If none resolve it: call ProLnk for same-day DFW tech',
    ],
  },
  high_bills: {
    title: '💡 DFW Energy Savings Plan',
    steps: [
      '🌡️ Set thermostat to 78°F when home, 85°F away (DFW standard)',
      '🔄 Replace filter monthly May–Sep (high-use season)',
      '🌿 Add shade to outdoor unit if in direct afternoon sun',
      '🪟 Use blackout curtains on west-facing windows',
      '⚡ Consider SEER 18+ unit if current system is 10+ years old',
      '📊 Annual tune-up pays for itself in 2–3 months of DFW summers',
    ],
  },
  replacement: {
    title: '🏗️ DFW AC Replacement Roadmap',
    steps: [
      '📐 Size: For DFW, 1 ton per 400–500 sq ft (Manual J calc preferred)',
      '⭐ Minimum SEER 16 — DFW summers demand efficiency',
      '🔄 Consider 2-stage or variable speed for DFW humidity control',
      '💨 Heat pump works well in DFW mild climate (down to 25°F)',
      '💰 Budget $6,000–$14,000 installed for standard DFW home',
      '📞 Get 3 quotes via ProLnk — vetted DFW HVAC pros only',
    ],
  },
  emergency: {
    title: '🚨 DFW AC Emergency Protocol',
    steps: [
      '🌡️ Immediate: open windows at night (DFW cools to 75°F+ after dark)',
      '❄️ Use fans + wet towels — evaporative cooling works in low humidity',
      '🔌 Check breaker panel — reset HVAC breaker once only',
      '🧊 Place ice in front of box fan for temporary spot cooling',
      '📞 Call ProLnk emergency line — DFW techs available 24/7',
      '⚠️ Do NOT run AC if ice is visible on refrigerant lines — off 2 hrs first',
    ],
  },
  maintenance: {
    title: '🔧 DFW Annual Maintenance Plan',
    steps: [
      '🌸 March/April: Spring tune-up before cooling season starts',
      '🔄 Monthly May–Sep: Replace 1-inch filter (DFW pollen + dust)',
      '💧 Monthly: Pour 1 cup bleach in condensate drain line',
      '🍂 October: Fall check before mild DFW heating season',
      '🌿 Quarterly: Clear 2ft radius around outdoor unit',
      '📅 Annual: Refrigerant check, coil cleaning, electrical inspection',
    ],
  },
};

export default function DFWHVACCoolingSummary() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          DFW HVAC GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>❄️ DFW Cooling Summary</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Everything about cooling your DFW home — sizing, efficiency, maintenance, emergency protocol, and replacement timing.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📐', title: 'Sizing', body: 'DFW: 1 ton per 400–500 sq ft. Oversized = short cycling + humidity issues.' },
            { icon: '⭐', title: 'Efficiency', body: 'Min SEER 16 for DFW summers. Variable speed adds humidity control.' },
            { icon: '🔧', title: 'Maintenance', body: 'Monthly filter May–Sep. Spring tune-up. Drain line flush monthly.' },
            { icon: '🔄', title: 'Replacement', body: '10–15 year lifespan. Replace before summer if 12+ years old in DFW.' },
            { icon: '🚨', title: 'Emergency', body: 'DFW hits 110°F. Know your shutoff. ProLnk 24/7 emergency available.' },
            { icon: '💰', title: 'Cost Range', body: 'Tune-up: $89–$149. Full replacement: $6K–$14K installed in DFW.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Your DFW Cooling Situation</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Select your situation to get a personalized action plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {situations.map(s => (
              <button
                key={s.key}
                onClick={() => setSelected(s.key)}
                style={{
                  background: selected === s.key ? '#F5E642' : '#1A2F4E',
                  color: selected === s.key ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 10, padding: '13px 18px',
                  textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>{plans[selected].title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plans[selected].steps.map((step, i) => (
                  <div key={i} style={{ background: '#0F2040', borderRadius: 8, padding: '12px 16px', fontSize: 14 }}>{step}</div>
                ))}
              </div>
              <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 10, padding: '14px 20px', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
                📞 Get a vetted DFW HVAC pro via ProLnk — free, fast, no spam
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
