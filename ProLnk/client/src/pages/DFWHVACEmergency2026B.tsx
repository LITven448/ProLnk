import { useState } from 'react';

const symptoms = [
  { id: 'runs-no-cool', label: '🌀 System runs but won\'t cool', action: 'Low refrigerant charge is #1 cause. Signs: outdoor unit iced over, suction line sweating heavily, supply air barely cooler than return. Requires pro with gauges to check superheat (should be 10-15°F) and subcooling (should be 10-15°F). Do not add refrigerant without leak check first.' },
  { id: 'outdoor-runs-indoor', label: '🔧 Outdoor runs, indoor blower doesn\'t', action: 'Blower motor failure or seized capacitor. Check indoor air handler breaker first — separate circuit from outdoor unit. If breaker is fine, the blower motor or its capacitor failed. Capacitor: $15-50 part, $100-200 labor. Motor: $200-500 part + labor. ProLnk Charter pros carry both common parts.' },
  { id: 'short-cycle', label: '⚡ System short-cycles (starts/stops every few minutes)', action: 'Two main causes: (1) Low refrigerant — low pressure trips safety switch, system shuts off, pressure normalizes, restarts. (2) Control board failure — erratic relay behavior. Also check: dirty filter blocking airflow (causes freeze-up and short cycling). Replace 1-inch filter every 30 days in summer.' },
  { id: 'high-electric', label: '💰 Electric bill spiked $200+', action: 'DFW summer average for 2,000 sq ft = $180-220/mo on efficient system. Over $300 indicates: dirty condenser coil (30% efficiency loss), failed capacitor forcing motor to draw 3x amps, low refrigerant (compressor runs continuously), or leaking ductwork losing 25-30% of air in attic.' },
  { id: 'water-leak', label: '💧 Water leaking from air handler', action: 'Clogged condensate drain line — most common summer issue. 108°F attic + high humidity = 5-8 gallons of condensate daily. Pour 1 cup bleach + 1 cup water down drain pan monthly. If clogged: wet/dry vac on drain exit, or call pro with nitrogen purge line. If ignored, secondary drain pan overflows into ceiling.' },
];

export default function DFWHVACEmergency2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#ef4444', color: '#fff', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🚨 DFW HVAC EMERGENCY GUIDE 2026 — PART 2
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Advanced DFW HVAC Emergency Response</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Part 2 covers the non-obvious HVAC failures that happen when a system appears to run but doesn't perform. In DFW summer heat, these require same-day response.
        </p>

        <div style={{ background: '#3b1212', border: '1px solid #ef4444', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#fca5a5', fontSize: 14, fontWeight: 600 }}>⚠️ DFW Heat Risk: At 100°F+, indoor temps can reach dangerous levels within 2-4 hours of AC failure. Prioritize same-day response for elderly, infants, or medically vulnerable residents.</p>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {symptoms.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#112240',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#e2e8f0', lineHeight: 1.75, fontSize: 15 }}>{match.action}</p>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>⏱️ ProLnk Emergency Response Times</h3>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 2.2, paddingLeft: 20 }}>
            <li>Charter pros: target 2-4 hour response in DFW metro</li>
            <li>Emergency calls flagged priority in dispatch queue</li>
            <li>Common parts (capacitors, contactors) stocked by Charter pros</li>
            <li>After-hours: Charter pros opt in to after-hours rotation</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🚨 HVAC emergency in DFW? ProLnk Charter pros respond fast.</p>
          <p style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>prolnk.io — Request a Charter HVAC pro now</p>
        </div>
      </div>
    </div>
  );
}