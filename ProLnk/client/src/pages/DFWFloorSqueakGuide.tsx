import { useState } from 'react';

const locations = [
  { label: 'Center of Room (Walking Path)', value: 'center' },
  { label: 'Near Wall / Edge', value: 'wall' },
  { label: 'Around Stairs or Hallway', value: 'stair' },
  { label: 'Under or Near Bathroom', value: 'bath' },
];
const homeTypes = [
  { label: 'Pier & Beam (Crawl Space)', value: 'pb' },
  { label: 'Slab Foundation', value: 'slab' },
  { label: 'Two-Story (Upper Floor)', value: 'twostory' },
];

const guide: Record<string, Record<string, { cause: string; diy: string; concern: string; cost: string }>> = {
  center: {
    pb: { cause: 'Subfloor separated from joist; DFW humidity cycling loosened nails', diy: 'From below: drive 2.5" screws at angle into joist every 8". Use construction adhesive in gap.', concern: 'If squeak is NEW and getting worse → joist may be cracking; get inspection', cost: '$50–$200 DIY / $300–$700 pro' },
    slab: { cause: 'Hardwood or laminate rubbing at subfloor seams; expansion from DFW heat', diy: 'Inject powdered graphite or wax between boards. Screw subfloor if accessible.', concern: 'Slab homes rarely have structural squeak concerns — mostly cosmetic', cost: '$20–$100 DIY / $200–$500 pro' },
    twostory: { cause: 'I-joist or subfloor separation; common in DFW after first 5 dry summers', diy: 'From below (ceiling): locate joist, drive Squeeeeek No More screw kit', concern: 'Multiple new squeaks in same area = moisture event; check for roof or plumbing leak', cost: '$40–$150 DIY / $400–$900 pro' },
  },
  wall: {
    pb: { cause: 'Joist end bearing on sill plate shifted; DFW clay moved perimeter piers', diy: 'Limited DIY access near walls; shim between joist and sill plate if reachable', concern: 'Wall-edge squeaks + sloping floor = foundation settlement; call specialist', cost: '$300–$1,200 pro' },
    slab: { cause: 'Flooring expansion pushing against baseboard; no room to move', diy: 'Remove baseboard, add 1/4" expansion gap, replace base', concern: 'Structural concern is low for slab; thermal expansion is primary cause in DFW', cost: '$100–$400 DIY' },
    twostory: { cause: 'Top plate flex or stair stringer movement; seasonal DFW wood movement', diy: 'Screw through floor into joist from above using long trim head screws + fill holes', concern: 'If wall squeak accompanies cracked drywall → settling; needs engineer', cost: '$200–$600 pro' },
  },
  stair: {
    pb: { cause: 'Stair tread pulling away from riser; wood shrinkage in dry DFW summers', diy: 'From below: drive screws up through riser into tread. Add construction adhesive.', concern: 'Structural stair risk is separate from squeak — check stringer attachment to framing', cost: '$150–$500 DIY or pro' },
    slab: { cause: 'Same tread-riser separation; glue failure after DFW heat cycles', diy: 'Inject wood glue into gap, clamp overnight, then screw from below', concern: 'Stair squeaks are rarely structural — focus on safety (no wobble)', cost: '$100–$400 DIY' },
    twostory: { cause: 'Upper landing subfloor flex plus tread movement', diy: 'Address both: screw tread to riser, screw landing subfloor to joist', concern: 'If landing feels bouncy + squeaky → joist span issue; get inspection', cost: '$200–$700 pro' },
  },
  bath: {
    pb: { cause: 'Moisture-softened subfloor rubbing joists; tile grout cracking allows water in', diy: 'Do NOT attempt DIY — moisture near plumbing requires professional assessment', concern: '🔴 HIGH CONCERN: bathroom squeak often = subfloor rot. Check for soft spots before tile fails completely.', cost: '$800–$4,000 pro (moisture damage)' },
    slab: { cause: 'Tile loose from substrate; grout failure from DFW thermal cycles', diy: 'Press each tile — hollow sound = debonded. Re-grout if isolated; relay if widespread', concern: 'Cracked or loose tile near toilet = wax ring failure risk; inspect immediately', cost: '$300–$1,500 pro' },
    twostory: { cause: 'Upper bath subfloor separation; water from above softening structure', diy: 'Do NOT attempt DIY — risk of ceiling failure; needs licensed contractor', concern: '🔴 HIGH CONCERN: water-damaged upper floor subfloor can fail suddenly under load', cost: '$1,200–$5,000 pro' },
  },
};

export default function DFWFloorSqueakGuide() {
  const [location, setLocation] = useState('');
  const [homeType, setHomeType] = useState('');
  const result = location && homeType ? guide[location]?.[homeType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Floor Squeak Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: 32, lineHeight: 1.6 }}>Floor squeaks in DFW are epidemic — the combination of expansive clay soil, seasonal humidity swings, and fast-built 1990s–2000s homes creates perfect squeak conditions. Most are cosmetic. A few are structural warnings.</p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>📐 What Causes Floor Squeaks</h2>
          <ul style={{ color: '#C5CAD8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EAF0' }}>Subfloor separation:</strong> Panels lift off joists during humid seasons, squeak when stepped on</li>
            <li><strong style={{ color: '#E8EAF0' }}>Nail pullout:</strong> Ring-shank nails loosen after years of DFW thermal cycling</li>
            <li><strong style={{ color: '#E8EAF0' }}>Seasonal wood expansion:</strong> DFW summer heat pushes boards against each other</li>
            <li><strong style={{ color: '#E8EAF0' }}>Joist crown reversal:</strong> Joists installed crown-up that flatten under load create gap</li>
          </ul>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🛠️ DIY Fix Methods Ranked</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { title: '1. Screw From Above (Easiest)', desc: 'Drive 2.5" trim-head screws through finished floor into joist. Fill holes with wood filler. Works on most DFW subfloor squeaks.' },
              { title: '2. Squeeeeek No More Kit (Best)', desc: 'Special screw designed to pull subfloor to joist then snap off below surface. Use from below in crawl space. $20 kit at home improvement stores.' },
              { title: '3. Shim From Below', desc: 'Slide thin wood shim into gap between subfloor and joist. Add construction adhesive. No-drill option for accessible crawl spaces.' },
              { title: '4. Powdered Graphite / Wax', desc: 'Temporary fix only. Works for board-to-board rubbing on hardwood. Does not address structural separation.' },
            ].map(m => (
              <div key={m.title} style={{ background: '#0F2040', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{m.title}</div>
                <div style={{ color: '#C5CAD8', fontSize: 14 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Squeak Diagnosis Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>Where is the squeak?</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select location…</option>
              {locations.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>DFW home type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select home type…</option>
              {homeTypes.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Likely Cause: </span><span style={{ color: '#C5CAD8' }}>{result.cause}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>DIY Fix: </span><span style={{ color: '#C5CAD8' }}>{result.diy}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>When to Be Concerned: </span><span style={{ color: '#FACC15' }}>{result.concern}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Typical Cost: </span><span style={{ color: '#4ADE80' }}>{result.cost}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 8, padding: 20, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#9BA3B5', fontSize: 13, margin: 0 }}>⚠️ When a squeak is accompanied by floor sag, soft spots, or appears after a plumbing issue — treat it as a structural concern and get a professional inspection before DIY attempts.</p>
        </div>
      </div>
    </div>
  );
}
