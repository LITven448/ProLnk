import { useState } from 'react';

const SYSTEMS = [
  {
    name: 'HVAC',
    icon: '❄️',
    items: [
      'Replace air filters (every 1-3 months)',
      'Clean condenser coils annually',
      'Check refrigerant levels',
      'Inspect ductwork for leaks',
      'Test thermostat accuracy',
      'Lubricate motor bearings',
      'Clean evaporator coils',
      'Check condensate drain line',
      'Inspect electrical connections',
      'Test capacitors and contactors',
      'Clear debris from outdoor unit',
      'Check system airflow and static pressure',
      'Inspect heat exchanger for cracks',
      'Test carbon monoxide detector',
      'Verify emergency shutoff works',
      'Calibrate zoning controls',
      'Check refrigerant line insulation',
      'Inspect blower motor and wheel',
      'Test defrost cycle (heat pump)',
      'Schedule professional tune-up',
      'Document all service dates',
      'Check SEER rating vs. current units',
      'Inspect weatherstripping on air returns',
      'Verify attic insulation R-value',
      'Review warranty documentation',
    ],
  },
  {
    name: 'Plumbing',
    icon: '🔧',
    items: [
      'Inspect all visible pipes for leaks',
      'Test water pressure (40-80 psi ideal)',
      'Flush water heater annually',
      'Check anode rod in water heater',
      'Inspect toilet flappers and fill valves',
      'Test all shutoff valves',
      'Clean showerheads and aerators',
      'Check water softener salt levels',
      'Inspect washing machine hoses',
      'Test sump pump operation',
      'Check for slow drains',
      'Inspect outdoor hose bibs',
      'Test pressure relief valve on water heater',
      'Look for staining under sinks',
      'Verify main shutoff valve location',
      'Inspect garbage disposal',
      'Check dishwasher supply line',
      'Test backflow preventer',
      'Clear P-traps in rarely used fixtures',
      'Document water meter baseline reading',
    ],
  },
  {
    name: 'Electrical',
    icon: '⚡',
    items: [
      'Test all GFCI outlets monthly',
      'Inspect panel for signs of heat or burning',
      'Check breaker labels are accurate',
      'Test smoke detectors',
      'Test carbon monoxide detectors',
      'Replace smoke detector batteries',
      'Inspect outdoor outlets for weatherproofing',
      'Check for flickering lights (loose wiring)',
      'Test whole-home surge protector',
      'Inspect attic wiring for rodent damage',
      'Verify AFCI breakers in bedrooms',
      'Check ceiling fan wobble and direction',
      'Inspect dryer vent and connection',
      'Test bathroom exhaust fans',
      'Verify 240V appliance connections',
      'Check for overloaded extension cords',
      'Inspect outdoor lighting and sensors',
      'Test garage door safety reverse',
      'Review panel capacity vs. load',
      'Document last panel inspection date',
    ],
  },
  {
    name: 'Roofing',
    icon: '🏠',
    items: [
      'Inspect shingles for curling or missing',
      'Check flashing around chimney and vents',
      'Clean gutters and downspouts',
      'Inspect soffit and fascia condition',
      'Look for granule loss in gutters',
      'Check attic for daylight or moisture',
      'Inspect ridge cap shingles',
      'Verify attic ventilation is adequate',
      'Look for moss or algae growth',
      'Inspect skylights for leaks',
      'Check gutter slope and drainage',
      'Trim overhanging tree branches',
      'Inspect chimney mortar and cap',
      'Check drip edge installation',
      'Document roof age and warranty',
      'Photograph all roof sections annually',
      'Check for sagging deck boards',
      'Inspect ice dam risk areas',
      'Verify downspout extensions divert water',
      'Schedule professional inspection every 3 years',
    ],
  },
  {
    name: 'Foundation',
    icon: '🏗️',
    items: [
      'Inspect perimeter for new cracks',
      'Measure and document existing cracks',
      'Check for doors that stick or won\’t latch',
      'Inspect crawl space for moisture',
      'Verify proper grading away from house',
      'Check window frames for gaps',
      'Inspect basement walls for water staining',
      'Test crawl space humidity levels',
      'Verify vapor barrier condition',
      'Check for efflorescence on block walls',
      'Inspect pier and beam supports',
      'Look for sloping or uneven floors',
      'Check expansion joint condition',
      'Inspect drainage away from foundation',
      'Verify sump pit and pump operation',
      'Document any soil movement or settlement',
      'Inspect attached garage slab',
      'Check for plumbing leaks near foundation',
      'Review prior foundation reports',
      'Consult engineer if cracks grow >1/4 inch',
    ],
  },
  {
    name: 'Pest',
    icon: '🐛',
    items: [
      'Inspect exterior entry points',
      'Check for termite mud tubes in crawl space',
      'Look for sawdust near wood (carpenter ants)',
      'Inspect attic insulation for rodent nesting',
      'Check garage door seal at floor',
      'Seal gaps around pipes and conduits',
      'Inspect weatherstripping on all doors',
      'Check for wasp or hornet nests',
      'Look for standing water near foundation',
      'Trim shrubs away from house perimeter',
      'Store firewood away from structure',
      'Inspect window screens for tears',
      'Check pantry for signs of stored-product pests',
      'Verify dryer vent has proper screen',
      'Inspect attic vent screens',
      'Look for grease trails along walls',
      'Check under sinks for rodent droppings',
      'Inspect door sweeps condition',
      'Schedule annual professional inspection',
      'Document any pest activity with photos',
    ],
  },
];

const GRADES = ['F', 'D', 'C', 'B', 'A', 'A+'];

export default function DFWHomeOwnerMasterChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totalItems = SYSTEMS.reduce((a, s) => a + s.items.length, 0);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneCount / totalItems) * 100);
  const gradeIdx = Math.min(Math.floor(pct / 17), 5);
  const grade = GRADES[gradeIdx];

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🏡 DFW Master Homeowner Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>125 items across 6 home systems — track your maintenance progress</p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 28, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <div><div style={{ color: '#F5E642', fontSize: 36, fontWeight: 900 }}>{pct}%</div><div style={{ color: '#94a3b8', fontSize: 13 }}>Complete</div></div>
          <div><div style={{ color: '#F5E642', fontSize: 36, fontWeight: 900 }}>{doneCount}/{totalItems}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>Items Done</div></div>
          <div><div style={{ color: '#F5E642', fontSize: 36, fontWeight: 900 }}>{grade}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>Grade</div></div>
        </div>

        {SYSTEMS.map((sys) => {
          const sysDone = sys.items.filter((_, i) => checked[`${sys.name}-${i}`]).length;
          return (
            <div key={sys.name} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{sys.icon} {sys.name}</h2>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{sysDone}/{sys.items.length}</span>
              </div>
              {sys.items.map((item, i) => {
                const key = `${sys.name}-${i}`;
                return (
                  <div key={key} onClick={() => toggle(key)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer', borderBottom: '1px solid #0A1628' }}>
                    <span style={{ fontSize: 18 }}>{checked[key] ? '✅' : '⬜'}</span>
                    <span style={{ color: checked[key] ? '#64748b' : '#e2e8f0', textDecoration: checked[key] ? 'line-through' : 'none', fontSize: 14 }}>{item}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
