import { useState } from 'react';

export default function DFWHVACThermostatBattery2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const symptoms = [
    {
      id: 'erratic',
      label: '🔄 HVAC Acting Erratic',
      title: 'Erratic HVAC Behavior — Battery Check First',
      steps: [
        '🔋 Check thermostat display — dim screen = low battery warning',
        '🔋 AC short-cycling (turns on/off rapidly) = common low battery symptom',
        '🔋 System not reaching setpoint despite running = signal loss from weak battery',
        '🔋 Replace batteries BEFORE calling an HVAC tech — saves + service call',
        '🔋 After replacement: wait 5 minutes for thermostat to reboot and resync',
      ],
      note: 'DFW HVAC techs report 20-30% of summer service calls are thermostat battery issues — easy DIY fix.',
    },
    {
      id: 'lifespan',
      label: '📅 Battery Lifespan in DFW',
      title: 'DFW Heat Drains Batteries Faster',
      steps: [
        '📅 Moderate US climates: thermostat batteries last 12-18 months',
        '📅 DFW climate: expect 8-12 months due to electronic stress from heat',
        '📅 Attic-mounted thermostats or sun-exposed locations drain faster',
        '📅 Set annual reminder: replace every October before heating season',
        '📅 Smart thermostats with C-wire: battery backup lasts longer (less discharge)',
      ],
      note: 'DFW summer attic temps reach 140°F — thermostats on interior walls still experience 80-95°F ambient in peak summer.',
    },
    {
      id: 'alkaline',
      label: '⚡ Alkaline vs Lithium for DFW',
      title: 'Best Battery Type for DFW Thermostats',
      steps: [
        '⚡ Alkaline (standard): fine for most climates — adequate for DFW with annual replacement',
        '⚡ Lithium: performs better in temperature extremes — recommended for DFW',
        '⚡ Lithium lasts 25-30% longer in high-heat environments like DFW',
        '⚡ Lithium costs 2-3x more but worth it for HVAC-critical applications',
        '⚡ Never use rechargeable NiMH in thermostats — voltage is lower and causes malfunctions',
      ],
      note: 'Energizer Ultimate Lithium AA is the top recommendation for DFW thermostats —  for 4 pack.',
    },
    {
      id: 'replacement',
      label: '🔧 Battery Replacement Steps',
      title: 'DFW Thermostat Battery Replacement',
      steps: [
        '🔧 Note your current settings before starting (screenshot the screen)',
        '🔧 Pull thermostat off wall mount — most snap off gently',
        '🔧 Locate battery compartment (usually on back or side)',
        '🔧 Remove old batteries — note polarity (+/-) orientation',
        '🔧 Insert new batteries, snap back on mount, verify display powers on',
      ],
      note: 'Most DFW thermostats use 2x AA or 2x AAA batteries. Some Honeywell models use a 3V lithium coin cell.',
    },
  ];

  const selected_item = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔋</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW HVAC Thermostat Battery Guide 2026
          </h1>
          <p style={{ color: '#8899BB', fontSize: 14, margin: 0 }}>
            DFW heat drains faster · 8-12 month lifespan · Lithium vs alkaline · Erratic HVAC symptoms
          </p>
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1A2E4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 12px' }}>🌡️ Why DFW Heat Kills Thermostat Batteries</h2>
          <p style={{ color: '#B0BFDA', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
            DFW summers push thermostats into overdrive — your HVAC runs nearly continuously from June through September. This constant electronic load, combined with heat stress from ambient temperatures, reduces battery life by <strong style={{ color: '#F5E642′ }}>25-40% vs moderate climates</strong>.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[['🌡️ 8-12 months', 'Expected DFW battery life'], ['⚡ Lithium wins', 'Best for DFW heat stress'], ['📅 Replace Oct', 'Before heating season']].map(([label, desc]) => (
              <div key={label} style={{ background: '#1A2E4A', borderRadius: 8, padding: '10px 14px', flex: '1 1 180px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#8899BB', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#8899BB', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Select your thermostat symptom or question:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {symptoms.map(s => (
            <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ background: selected === s.id ? '#F5E642′ : '#0F1E35', color: selected === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid', borderColor: selected === s.id ? '#F5E642' : '#1A2E4A', borderRadius: 10, padding: '12px 14px', fontSize: 13, fontWeight: 600, cursor: ’pointer', textAlign: 'left' }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected_item && (
          <div style={{ background: '#0F1E35', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>{selected_item.title}</h3>
            {selected_item.steps.map((step, i) => (
              <div key={i} style={{ color: '#B0BFDA', fontSize: 14, padding: '6px 0', borderBottom: i < selected_item.steps.length - 1 ? '1px solid #1A2E4A' : 'none' }}>{step}</div>
            ))}
            <div style={{ background: '#1A2E4A', borderRadius: 8, padding: 12, marginTop: 14, color: '#8899BB', fontSize: 12 }}>
              💡 {selected_item.note}
            </div>
          </div>
        )}

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, border: '1px solid #1A2E4A', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW HVAC Experts</div>
          <p style={{ color: '#8899BB', fontSize: 13, margin: 0 }}>Still having issues after battery replacement? Get a DFW HVAC tech quote in minutes.</p>
        </div>
      </div>
    </div>
  );
}