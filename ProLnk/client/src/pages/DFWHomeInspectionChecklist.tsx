import { useState } from 'react';

const ROOMS = [
  {
    name: 'Foundation & Structure',
    emoji: '🏗️',
    items: [
      'Check for diagonal cracks in brick mortar (clay soil shifting)',
      'Inspect interior drywall for stair-step cracks near corners',
      'Look for doors or windows that stick or won\’t close properly',
      'Examine pier-and-beam crawl space for moisture or rot (if applicable)',
      'Check slab perimeter for separation from brick veneer',
      'Walk perimeter and note soil pulling away from foundation',
    ],
  },
  {
    name: 'HVAC System',
    emoji: '❄️',
    items: [
      'Record age of HVAC unit (DFW units average 12-15 year lifespan)',
      'Inspect air handler in attic for rust, leaks, or corrosion',
      'Check refrigerant lines for insulation and ice buildup',
      'Measure attic insulation depth (R-38 min recommended for DFW)',
      'Verify all registers blow air and return air vents are clear',
      'Inspect condensate drain line for algae or clogs',
      'Check thermostat wiring and functionality in both heat/cool modes',
    ],
  },
  {
    name: 'Attic & Roof',
    emoji: '🏠',
    items: [
      'Check attic insulation depth with ruler (target 13-16 inches fiberglass)',
      'Look for daylight penetrations through roof deck',
      'Inspect ridge vent and soffit vents for blockages',
      'Check for stains indicating prior or active roof leaks',
      'Count layers of shingles visible at roof edge (max 2 allowed)',
      'Inspect flashing around chimney, skylights, and HVAC penetrations',
    ],
  },
  {
    name: 'Plumbing',
    emoji: '🚿',
    items: [
      'Locate main water shut-off valve and confirm it operates',
      'Check water pressure (40-80 PSI is normal)',
      'Run all faucets and look under sinks for slow drains or leaks',
      'Inspect water heater age, anode condition, and temperature setting',
      'Flush all toilets and check for running water after fill',
      'Check exterior hose bibs for freeze damage from past ice storms',
    ],
  },
  {
    name: 'Electrical',
    emoji: '⚡',
    items: [
      'Identify panel brand — Federal Pacific or Zinsco are red flags',
      'Check for double-tapped breakers in main panel',
      'Test GFCI outlets in kitchen, bathrooms, garage, and exterior',
      'Verify smoke detectors present on each floor and in each bedroom',
      'Check CO detector near furnace or gas appliances',
      'Look for aluminum wiring on pre-1973 homes',
    ],
  },
  {
    name: 'Pool & Outdoor',
    emoji: '🏊',
    items: [
      'Inspect pool equipment pad — pump, filter, heater age and condition',
      'Check pool deck for lifted or cracked concrete (foundation movement)',
      'Look for water line staining indicating evaporation rate or leaks',
      'Inspect wood fence for rot, termite damage, or leaning posts',
      'Check grading — soil should slope away from home 6 inches per 10 feet',
      'Inspect drainage swales and ensure water paths are clear',
    ],
  },
];

export default function DFWHomeInspectionChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);

  const allItems = ROOMS.flatMap((r) => r.items.map((item) => `${r.name}::${item}`));
  const totalItems = allItems.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const findings = ROOMS.flatMap((r) =>
    r.items
      .filter((item) => !checked[`${r.name}::${item}`])
      .map((item) => ({ room: r.name, item }))
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Home Inspection Checklist
          </h1>
          <p style={{ color: '#8899aa', fontSize: 14, margin: 0 }}>
            Self-inspection walk-through — room by room
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>{pct}% Complete</span>
            <span style={{ color: '#8899aa', fontSize: 13 }}>{checkedCount} / {totalItems} items</span>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 99, height: 8 }}>
            <div style={{ background: '#F5E642', borderRadius: 99, height: 8, width: `${pct}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {ROOMS.map((room) => {
          const roomChecked = room.items.filter((item) => checked[`${room.name}::${item}`]).length;
          return (
            <div key={room.name} style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#F5E642′ }}>
                  {room.emoji} {room.name}
                </h2>
                <span style={{ fontSize: 12, color: '#8899aa' }}>{roomChecked}/{room.items.length}</span>
              </div>
              {room.items.map((item) => {
                const key = `${room.name}::${item}`;
                return (
                  <div
                    key={item}
                    onClick={() => toggle(key)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid #1a3050', cursor: 'pointer' }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked[key] ? '#F5E642' : '#334466'}`,
                      background: checked[key] ? '#F5E642′ : ’transparent', flexShrink: 0, marginTop: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0A1628', fontWeight: 900,
                    }}>
                      {checked[key] ? '✓' : ''}
                    </div>
                    <span style={{ fontSize: 14, color: checked[key] ? '#556677′ : '#cdd9e5', textDecoration: checked[key] ? ’line-through' : 'none', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}

        <button
          onClick={() => setShowSummary(!showSummary)}
          style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 0', fontSize: 16, fontWeight: 800, cursor: 'pointer', marginBottom: 16 }}
        >
          {showSummary ? 'Hide' : 'Generate'} Findings Summary
        </button>

        {showSummary && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>🔍 Open Items ({findings.length})</h3>
            {findings.length === 0 ? (
              <p style={{ color: '#4ade80', fontWeight: 700 }}>All items checked — great job!</p>
            ) : (
              findings.map((f, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1a3050', fontSize: 13, color: '#cdd9e5′ }}>
                  <span style={{ color: '#F5E642', fontWeight: 600 }}>{f.room}: </span>{f.item}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
