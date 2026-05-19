import { useState } from 'react';

type GarageSize = '1car' | '2car' | '3car';
type GarageUse = 'cars' | 'workshop' | 'storage' | 'mixed';

const systems: Record<GarageSize, Record<GarageUse, { system: string; why: string; heatNote: string; difficulty: string; costEstimate: string; panels: string }>> = {
  '1car': {
    cars: { system: 'Wall Control Steel Panel System', why: 'Best space efficiency for single-car garages; steel holds in 120°F DFW summers.', heatNote: 'Steel panels — zero warping risk. Avoid plastic slotwall in DFW heat.', difficulty: 'Easy (2–3 hrs)', costEstimate: '$180–$350', panels: '2 panels, 16 hooks' },
    workshop: { system: 'French Cleat + Wall Control Hybrid', why: 'Custom tool layout flexibility; French cleat holds 200 lbs per linear foot.', heatNote: 'All wood/metal — heat resistant. Add ventilation fan for summer shop work.', difficulty: 'Medium (4–6 hrs)', costEstimate: '$200–$500', panels: 'DIY cleat + 1 Wall Control panel' },
    storage: { system: 'Rubbermaid FastTrack Rail', why: 'Fastest install in DFW — most popular system at Lowes/HD in DFW stores.', heatNote: 'Plastic hooks can soften above 110°F — keep them on shaded walls only.', difficulty: 'Easy (1–2 hrs)', costEstimate: '$120–$250', panels: '1 rail, 16 accessories' },
    mixed: { system: 'Proslat PVC Slatwall (shade wall only)', why: 'Versatile accessory system; good mix of tool + storage hooks.', heatNote: '⚠️ Install on north/east walls only — south/west walls exceed 115°F in DFW summers.', difficulty: 'Easy-Medium (3 hrs)', costEstimate: '$150–$350', panels: '32 sq ft panels' },
  },
  '2car': {
    cars: { system: 'Gladiator GearWall + Ceiling Track', why: 'Best for car-first garages; overhead tracks use dead ceiling space.', heatNote: 'Steel GearWall safe in DFW heat; ceiling tracks — use metal, not plastic brackets.', difficulty: 'Medium (4–6 hrs)', costEstimate: '$400–$700', panels: '4 GearWall panels + 2 ceiling tracks' },
    workshop: { system: 'Wall Control 16 Gauge Steel Panels', why: 'Industrial grade — handles DFW contractors and serious DIYers.', heatNote: 'Full steel — no heat concerns. Powder coat won\’t fade in DFW UV.', difficulty: 'Medium (4–5 hrs)', costEstimate: '$350–$600', panels: '4 panels, 32+ hooks' },
    storage: { system: 'Proslat 8-Panel System + Ceiling Shelf', why: 'Most storage capacity per sq ft; ceiling adds 40–60 cu ft in DFW 2-car.', heatNote: 'Shade wall install required; ceiling storage ideal for DFW seasonal (holiday decor, camping).', difficulty: 'Medium (5–7 hrs)', costEstimate: '$500–$900', panels: '8 Proslat + 2 ceiling units' },
    mixed: { system: 'Husky Steel Cabinet + Wall Control Panels', why: 'Cabinets for valuables (AC protected); panels for tools and sports gear.', heatNote: 'Cabinets protect items from DFW heat; steel panels for wall-mount.', difficulty: 'Medium-Hard (6–8 hrs)', costEstimate: '$800–$1,500', panels: '2 Husky cabinets + 4 Wall Control' },
  },
  '3car': {
    cars: { system: 'Ceiling Storage Grid + Gladiator Columns', why: 'DFW 3-car garages often store RV gear, ATVs — overhead grid maximizes floor space.', heatNote: 'Grid in center bay safe from wall heat; corner vent fans recommended for summer.', difficulty: 'Hard (8–10 hrs)', costEstimate: '$900–$1,600', panels: '3 ceiling grids + 6 vertical columns' },
    workshop: { system: 'Full Wall Control Steel + French Cleat Workwall', why: 'Pro-level workshop build for DFW trades; handles 3-car footprint efficiently.', heatNote: 'Steel + wood only. Mini-split in workshop bay is common DFW upgrade ($1,500 installed).', difficulty: 'Hard (10–14 hrs)', costEstimate: '$1,000–$2,500', panels: '8 panels + full cleat wall' },
    storage: { system: 'Rubbermaid Heavy Duty Ceiling + Proslat Walls', why: 'Maximizes a DFW 3-car — ceiling for seasonal, walls for daily access.', heatNote: 'Ceiling units need 24″ clearance from garage door tracks; metal brackets for DFW heat.', difficulty: 'Hard (8–12 hrs)', costEstimate: '$1,200–$2,000', panels: '4 ceiling + 12 wall panels' },
    mixed: { system: 'Custom Zone Design: 1 bay workshop, 1 bay storage, 1 bay flex', why: 'Most DFW 3-car owners get best value dividing by function rather than buying one system.', heatNote: 'Dedicated mini-split for workshop bay; passive ventilation for storage bay.', difficulty: 'Hard (12–16 hrs or hire out)', costEstimate: '$2,000–$4,000', panels: 'Zone-specific selection' },
  },
};

export default function DFWGarageStorageSystemGuide() {
  const [size, setSize] = useState<GarageSize | null>(null);
  const [use, setUse] = useState<GarageUse | null>(null);

  const result = size && use ? systems[size][use] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW GARAGE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Garage Storage Systems for DFW Homeowners</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW garages hit 130°F+ in summer. Plastic storage systems can warp or soften. This guide covers what actually holds up — and which wall to put it on.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 16, marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#F5E642′ }}>🌡️ South/west walls: 115–130°F</div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#C8D0E0′ }}>❄️ North/east walls: Safe for plastic</div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#C8D0E0′ }}>🔩 Steel always beats plastic here</div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#C8D0E0′ }}>☁️ Ceiling is coolest storage zone</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>1️⃣ GARAGE SIZE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[['1car', '🚗 1-Car', '~240 sq ft'], ['2car', '🚗🚗 2-Car', '~480 sq ft'], ['3car', '🚗🚗🚗 3-Car', '~720 sq ft']] .map(([k, label, sf]) => (
              <button key={k} onClick={() => setSize(k as GarageSize)} style={{ background: size === k ? '#F5E642′ : '#111E35', color: size === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (size === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '10px 12px', cursor: ’pointer', fontWeight: 700, fontSize: 12, textAlign: 'center' }}>{label}<br /><span style={{ fontWeight: 400, fontSize: 11 }}>{sf}</span></button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>2️⃣ PRIMARY USE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['cars', '🚗 Park Cars'], ['workshop', '🔨 Workshop'], ['storage', '📦 Storage'], ['mixed', '🔀 Mixed Use']] .map(([k, label]) => (
              <button key={k} onClick={() => setUse(k as GarageUse)} style={{ background: use === k ? '#F5E642′ : '#111E35', color: use === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (use === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '12px 16px', cursor: ’pointer', fontWeight: 700, fontSize: 13 }}>{label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#111E35', border: '2px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ RECOMMENDED SYSTEM</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{result.system}</div>
            <div style={{ color: '#C8D0E0', marginBottom: 16, lineHeight: 1.6 }}>{result.why}</div>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>🌡️ <strong>DFW Heat:</strong> {result.heatNote}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>🔧 <strong>Install Difficulty:</strong> {result.difficulty}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>💰 <strong>Est. Cost:</strong> {result.costEstimate}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>📐 <strong>What You'll Need:</strong> {result.panels}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
