import { useState } from 'react';

const dfwSystemTypes = [
  { id: 'centralAC', label: '🌬️ Central AC + Gas Heat (Most Common DFW)', brand: 'Trane/Carrier/Lennox typical' },
  { id: 'heatPump', label: '🔄 Heat Pump System (Electric Only)', brand: 'Efficient for DFW mild winters' },
  { id: 'dualFuel', label: '⚡ Dual Fuel (Heat Pump + Gas Backup)', brand: 'Premium DFW setup' },
  { id: 'mini', label: '🏠 Mini-Split / Ductless', brand: 'Additions, garages, sunrooms' },
  { id: 'package', label: '📦 Package Unit (Rooftop or Slab)', brand: 'Common in DFW commercial/some residential' },
];

function buildChecklist(system: typeof dfwSystemTypes[0]) {
  return [
    { week: 'Day 1-3', items: [
      '📋 Register warranty with manufacturer online — DFW heat voids some warranties if not registered within 30 days',
      '📸 Photograph all equipment labels: model #, serial #, installation date, refrigerant type',
      '📄 File all paperwork: warranty card, install permit, contractor license info',
      '🌡️ Set initial DFW thermostat schedule: 75°F occupied, 80°F away (summer), 70°F occupied, 65°F away (winter)',
    ]},
    { week: 'Week 1', items: [
      '📊 Record baseline: note temperature at each vent during normal DFW conditions',
      `🔍 Verify airflow: ${system.id === 'mini' ? 'check each head unit blows equally' : 'all registers open, no dead zones'}`,
      '💧 Find condensate drain line — ensure clear and draining outside (critical in DFW humidity)',
      '📱 Download manufacturer app if smart thermostat included',
    ]},
    { week: 'Week 2-4', items: [
      '🔄 Note how system handles DFW\’s temperature swings — document any unusual cycling',
      `${system.id === 'heatPump' || system.id === 'dualFuel' ? '⚡ Heat pump: verify emergency heat switch works — test before first DFW freeze' : '🔥 Verify furnace ignites cleanly — test before first DFW cold snap'}`,
      '📞 Call installer if any strange sounds, smells, or uneven cooling in DFW summer heat',
      '✅ Schedule 1-year warranty inspection — most DFW HVAC warranties require annual pro service',
    ]},
    { week: 'Ongoing', items: [
      '📅 Mark calendar: change filter every 30-60 days in DFW (dust + pollen = faster clogging)',
      '🌞 DFW summer: check system is achieving setpoint by noon — if not, call for service immediately',
      '🧼 Clean condensate drain with bleach/water quarterly in DFW humidity',
      '🤝 Build relationship with your DFW installer — priority service matters when it\’s 105°F',
    ]},
  ];
}

export default function DFWHVACNewPurchase() {
  const [system, setSystem] = useState('');
  const selectedSystem = dfwSystemTypes.find(s => s.id === system);
  const checklist = selectedSystem ? buildChecklist(selectedSystem) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🆕 New DFW HVAC: First 30 Days</h1>
        <p style={{ color: '#8899AA', marginBottom: 12 }}>
          A new HVAC system is a major DFW investment ($6K-$18K). The first 30 days set the foundation for 15-20 years of performance in one of America's most demanding climates.
        </p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '10px 16px', marginBottom: 28, fontWeight: 600, fontSize: 14 }}>
          🏆 DFW HVAC systems work 3x harder than national average due to extreme heat cycles. Proper first-30-day protocol adds years to system life.
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔧 Your New DFW System Type</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {dfwSystemTypes.map(s => (
              <button key={s.id} onClick={() => setSystem(s.id)}
                style={{ background: system === s.id ? '#F5E642' : '#1A2D4A', color: system === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {s.label}
                <span style={{ display: 'block', fontWeight: 400, fontSize: 12, marginTop: 2, opacity: 0.8 }}>{s.brand}</span>
              </button>
            ))}
          </div>
        </div>

        {checklist.length > 0 && checklist.map((section, i) => (
          <div key={i} style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 16 }}>📅 {section.week}</h3>
            {section.items.map((item, j) => (
              <div key={j} style={{ background: '#1A2D4A', borderRadius: 8, padding: '11px 16px', marginBottom: 8, fontSize: 14 }}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
