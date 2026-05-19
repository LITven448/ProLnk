import { useState } from 'react';

const frequencies = [
  {
    id: 'monthly',
    label: '📅 Monthly',
    color: '#F5E642',
    tasks: [
      {
        title: 'Replace Air Filter',
        how: 'Locate return air grille (usually hallway ceiling or wall). Slide out old filter, note size printed on frame. Slide in new MERV-8 or higher filter with airflow arrow pointing toward unit. DFW tip: check mid-month during cedar and oak pollen peaks — may need replacement every 3 weeks.',
      },
      {
        title: 'Check Thermostat Display',
        how: 'Verify temperature reading is accurate with a separate thermometer. Check that scheduled programs are active. Confirm battery indicator shows full. If display is dim or sluggish, replace batteries before peak season.',
      },
      {
        title: 'Visual Inspection of Outdoor Unit',
        how: 'Walk to outdoor condenser. Look for leaves, debris, or vegetation within 2 feet. Listen for unusual rattling or squealing. Check that refrigerant lines are still insulated. Clear any debris with a hose on gentle setting — do not use high pressure.',
      },
    ],
  },
  {
    id: 'quarterly',
    label: '🗓️ Quarterly',
    color: '#60A5FA',
    tasks: [
      {
        title: 'Flush Condensate Drain Line',
        how: 'Find condensate drain — white PVC pipe typically near indoor air handler. Pour 1/4 cup distilled white vinegar into the pipe access point. Let sit 30 minutes, flush with water. In DFW summer months, do this every 6 weeks. A blocked drain is the #1 cause of system shutdowns in July and August.',
      },
      {
        title: 'Clean Evaporator Coil Area',
        how: 'Turn off system at thermostat and breaker. Open air handler access panel. Use a flashlight to inspect evaporator coil — should look clean and silver. If dusty, use a soft brush or commercial coil cleaner spray. Let dry completely before restoring power.',
      },
      {
        title: 'Test Carbon Monoxide and Smoke Detectors',
        how: 'Press test buttons on all CO and smoke detectors. Replace batteries if chirping. DFW homes with gas furnaces should have CO detectors within 10 feet of sleeping areas. Confirm all detectors are less than 10 years old — replace if approaching end of life.',
      },
      {
        title: 'Check All Supply and Return Vents',
        how: 'Walk each room and confirm vents are open and unobstructed. Furniture blocking return vents starves the system of airflow. Feel for airflow strength — weak airflow in a room suggests duct issues. Log any rooms that feel significantly hotter or colder than thermostat setting.',
      },
    ],
  },
  {
    id: 'annual',
    label: '📆 Annual',
    color: '#34D399',
    tasks: [
      {
        title: 'Professional HVAC Tune-Up (March)',
        how: 'Schedule in February for March appointment — DFW books fast after March. Tech should check refrigerant charge, capacitors, contactor, blower motor amps, evaporator and condenser coils, thermostat calibration, and duct static pressure. Get a written report of findings and system age documentation.',
      },
      {
        title: 'Duct Inspection in Attic',
        how: 'During cooler months (October-February) have a tech or trusted helper inspect flex duct connections in attic. Look for disconnected sections, torn insulation, or crushed duct runs. DFW attic heat (140°F in summer) degrades duct tape and flex duct connections over 10-15 years.',
      },
      {
        title: 'Attic Insulation Check',
        how: 'Verify attic insulation R-value is at least R-38 (approximately 12 inches of fiberglass batts). Insufficient insulation is the leading cause of HVAC overwork in DFW. Add blown-in insulation if below standard — cost is $1,500-2,500 and payback is typically under 4 years in Texas.',
      },
      {
        title: 'Refrigerant Line Insulation Inspection',
        how: 'Inspect black foam insulation on suction line from outdoor unit to house. Texas UV degrades this material every 3-5 years. Bare suction lines reduce efficiency and can cause condensation dripping. Replace deteriorated insulation with 3/4-inch closed-cell foam pipe insulation — DIY or tech.',
      },
    ],
  },
];

export default function DFWHVACMaintenanceLoop() {
  const [selected, setSelected] = useState<string>('monthly');
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const active = frequencies.find(f => f.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          DFW HVAC MAINTENANCE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Maintenance Loop</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Select a frequency. Tap any task for step-by-step DFW-specific instructions.</p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {frequencies.map(f => (
            <button
              key={f.id}
              onClick={() => { setSelected(f.id); setExpandedTask(null); }}
              style={{
                flex: 1,
                background: selected === f.id ? f.color : '#0F2040',
                color: selected === f.id ? '#0A1628′ : '#fff',
                border: '1px solid',
                borderColor: selected === f.id ? f.color : '#1E3A5F',
                borderRadius: 10,
                padding: '12px 8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {active.tasks.map((task, i) => (
            <div
              key={i}
              style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setExpandedTask(expandedTask === i ? null : i)}
            >
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>✅ {task.title}</div>
                <div style={{ color: '#64748B', fontSize: 18 }}>{expandedTask === i ? '▲' : '▼'}</div>
              </div>
              {expandedTask === i && (
                <div style={{ padding: '0 20px 20px', color: '#CBD5E1', fontSize: 14, lineHeight: 1.75, borderTop: '1px solid #1E3A5F', paddingTop: 16 }}>
                  {task.how}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
