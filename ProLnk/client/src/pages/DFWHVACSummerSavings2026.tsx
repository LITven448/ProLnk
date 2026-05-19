import { useState } from 'react';

const situations = [
  { id: 'old-system', label: 'AC over 10 years old', strategy: 'Replace with 18+ SEER2 unit — saves $380–$520/yr vs aging system.', savings: '$380–$520/yr' },
  { id: 'no-tou', label: 'On flat-rate electricity', strategy: 'Switch to ERCOT time-of-use plan — pre-cool to 70°F by 3 PM, raise to 78°F 3–7 PM peak window.', savings: '$200–$340/yr' },
  { id: 'no-shade', label: 'West/south windows unshaded', strategy: 'Add exterior solar screens or awnings — reduces solar gain 60–70%, cuts cooling load 10–15%.', savings: '$120–$180/yr' },
  { id: 'oncor-dr', label: 'Oncor customer eligible for DR', strategy: 'Enroll in Oncor Smart Thermostat demand-response — receive $85 rebate + bill credits on peak events.', savings: '$85–$160/yr' },
  { id: 'dirty-filter', label: 'Filter not changed monthly', strategy: 'Monthly MERV-8 filter changes in DFW summer — dusty air forces motor to overwork, raising bills 5–15%.', savings: '$60–$140/yr' },
];

export default function DFWHVACSummerSavings2026() {
  const [selected, setSelected] = useState('');
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          ☀️ Summer AC Savings for DFW Homeowners
        </h1>
        <p style={{ color: '#8FA3BF', fontSize: 16, margin: '0 0 32px', lineHeight: 1.6 }}>
          DFW summers push AC systems to the limit — June through September average highs above 95°F. These 2026 strategies target the biggest savings levers specific to North Texas: ERCOT rate structures, Oncor demand-response, and the brutal west-sun exposure most DFW homes face.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚡', title: 'ERCOT Time-of-Use', body: 'DFW is ERCOT territory. Peak pricing window is 3–7 PM weekdays. Pre-cool your home to 70–72°F by 2:45 PM, then let it drift to 78°F during peak — your AC barely runs when electricity costs the most.' },
            { icon: '🌡️', title: 'Pre-Cooling Strategy', body: 'Thermal mass in your walls and floors holds cold. Drop to 70°F by 3 PM, set to 78°F at 3 PM. Home stays comfortable until 8–9 PM with minimal runtime during expensive peak hours.' },
            { icon: '🏠', title: 'Oncor Demand Response', body: 'Oncor customers can enroll in Smart Thermostat programs. During grid stress events, your thermostat adjusts automatically. You receive bill credits — typically $85–$160/year for minimal comfort impact.' },
            { icon: '🌿', title: 'Shade Improvements', body: 'West-facing DFW homes absorb intense afternoon sun. Exterior solar screens (not interior blinds) block 65–80% of heat before it enters glass. Payback period: 2–3 summers.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#8FA3BF', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', border: '1px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🎯 Your DFW Situation → Your Strategy</div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642′ : '#162840', color: selected === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid #2A4A6B', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: selected === s.id ? 700 : 400, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>Recommended Strategy</div>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.7, marginBottom: 10 }}>{match.strategy}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>Expected Annual Savings: {match.savings}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, borderTop: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔗 ProLnk connects DFW homeowners with vetted HVAC pros</div>
          <div style={{ color: '#8FA3BF', fontSize: 14 }}>Get competitive quotes for AC tune-ups, system upgrades, and solar screen installation from background-checked North Texas pros — no spam, no pressure.</div>
        </div>
      </div>
    </div>
  );
}
