import { useState } from 'react';

const months = [
  { name: 'January', tasks: ['Check weatherstripping on all exterior doors — DFW cold snaps are brief but intense', 'Inspect caulking around windows and door frames for winter shrinkage gaps', 'Walk roof perimeter to check for winter storm damage to flashing and shingles'] },
  { name: 'February', tasks: ['Inspect for freeze damage — cracked pipes, split hose bibs, buckled siding', 'Check attic vents — confirm not blocked by bird nests from prior season', 'Caulk any gaps opened by winter freeze-thaw cycles around trim and siding'] },
  { name: 'March', tasks: ['Power wash driveways, sidewalks, and decks — remove winter grime and mold', 'Add 3 inches of fresh mulch to all landscape beds', 'Inspect fence posts and wood fencing for winter rot or termite damage'] },
  { name: 'April', tasks: ['Inspect and clean gutters — spring storms bring heavy leaf and debris loads', 'Touch up exterior paint where winter caused peeling or bubbling', 'Check deck boards and railings — tighten any loose fasteners before summer use'] },
  { name: 'May', tasks: ['Startup irrigation system — check all zones, heads, and pressure', 'Inspect window screens — replace torn screens before mosquito season', 'Apply fresh caulk around all exterior penetrations (pipes, wires, vents)'] },
  { name: 'June', tasks: ['Inspect roof for lifted shingles before peak storm season', 'Check soffit and fascia for wasp nests beginning to form', 'Clean AC condenser coils with hose — improves efficiency 15%+ in summer heat'] },
  { name: 'July', tasks: ['Flush AC condensate drain line — summer humidity causes algae buildup', 'Inspect garage door weatherstripping — heat warps seals', 'Check exterior wood for sun bleaching — apply UV-protective sealant if needed'] },
  { name: 'August', tasks: ['Inspect foundation for summer drought cracks — DFW clay shrinks significantly', 'Water foundation perimeter if soil has pulled away 2+ inches from slab', 'Check attic for heat damage — look for warped sheathing or nail pops'] },
  { name: 'September', tasks: ['Clean gutters before fall leaf season ramps up', 'Inspect exterior caulking before winter — budget time while weather is mild', 'Touch up paint and sealant on wood trim before cool weather'  ] },
  { name: 'October', tasks: ['Clean gutters — heaviest leaf fall of the year in DFW', 'Caulk around windows, doors, and utility penetrations before first cold snap', 'Inspect and clean chimney if wood-burning fireplace — creosote buildup risk'] },
  { name: 'November', tasks: ['Disconnect and drain garden hoses before freeze', 'Inspect roof and attic before winter storm season', 'Check exterior outlets and covers — confirm weatherproof before holiday lights'] },
  { name: 'December', tasks: ['Inspect Christmas light clips — avoid staples that puncture weatherproofing', 'Do final gutter clean before potential ice storms', 'Confirm attic insulation is not compressed or displaced — heat loss skyrockets if it is'] },
];

export default function DFWExteriorMaintenanceCalendar2026() {
  const [selected, setSelected] = useState(new Date().getMonth());
  const m = months[selected];
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Exterior Home Maintenance Calendar 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Month-by-month exterior tasks for Dallas–Fort Worth homes</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {months.map((mo, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', fontWeight: 600, fontSize: 13 }}>{mo.name}</button>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🗓️ {m.name} — Exterior Task List</h2>
          {m.tasks.map((task, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontSize: 18, minWidth: 24 }}>✓</span>
              <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{task}</span>
            </div>
          ))}
        </div>
        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>ProLnk — Connecting DFW Homeowners with Trusted Home Maintenance Pros</p>
      </div>
    </div>
  );
}
