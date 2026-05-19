import { useState } from 'react';

const wallLocations = [
  { label: 'Runs Through Center of Home', value: 'center' },
  { label: 'Perpendicular to Floor Joists', value: 'perp' },
  { label: 'Parallel to Floor Joists', value: 'parallel' },
  { label: 'Above / Below Staircase', value: 'stair' },
];
const constructions = [
  { label: 'Pier & Beam Foundation', value: 'pb' },
  { label: 'Slab Foundation (Pre-1990)', value: 'slabold' },
  { label: 'Slab Foundation (Post-1990)', value: 'slabnew' },
  { label: 'Two-Story DFW Home', value: 'twostory' },
];

const matrix: Record<string, Record<string, { likelihood: string; engineerNeeded: string; consequence: string; indicators: string }>> = {
  center: {
    pb: { likelihood: '🔴 High — center walls in pier & beam homes often carry the ridge beam load', engineerNeeded: 'Yes — always get structural engineer opinion before touching center wall in pier & beam DFW home', consequence: 'Removal without beam: roof ridge sag, ceiling crack, potential collapse over time', indicators: 'Check crawl space: if a beam runs under this wall to the center piers → load bearing confirmed' },
    slabold: { likelihood: '🟡 Medium — pre-1990 DFW slab homes varied; some used center walls to carry floor above', engineerNeeded: 'Yes for any full removal. Partial opening may be OK with header — still get engineer', consequence: 'Incorrect removal causes ceiling/roof deflection; visible within months in DFW heat', indicators: 'Look for double top plate, posts directly above in second story, or beam in attic above wall' },
    slabnew: { likelihood: '🟡 Medium — modern DFW tract homes increasingly use engineered trusses that span full width', engineerNeeded: 'Engineer review recommended; some center walls in truss homes are non-structural', consequence: 'If trusses span full width, center wall may be partition only — but always verify', indicators: 'Access attic: if trusses span wall-to-wall without a bearing point above, wall may be partition' },
    twostory: { likelihood: '🔴 High — center walls on ground floor almost always carry upper floor load in DFW two-stories', engineerNeeded: 'Yes — mandatory. Permit also required for any structural modification in DFW municipalities', consequence: 'Upper floor deflection, door frames racking, potential structural failure under DFW soil stress', indicators: 'Upper floor joist direction: joists running perpendicular to wall confirm load transfer' },
  },
  perp: {
    pb: { likelihood: '🔴 High — walls perpendicular to joists typically collect joist loads and transfer to foundation', engineerNeeded: 'Yes — even if plan shows non-bearing, DFW soil movement may have redistributed loads over decades', consequence: 'Joist span doubles if wall removed; floor deflection and squeak cascades', indicators: 'Look from crawl space: joist ends bearing directly on wall bottom plate confirms load bearing' },
    slabold: { likelihood: '🟡 Medium-High — depends on joist/truss direction in upper floor', engineerNeeded: 'Engineer consult strongly recommended', consequence: 'Roof or ceiling sag in 6–18 months; drywall cracking at corners', indicators: 'Attic check: rafters or trusses bearing on wall top plate = load bearing confirmed' },
    slabnew: { likelihood: '🟡 Medium — engineered systems may not rely on this wall', engineerNeeded: 'Engineer review required before any removal', consequence: 'Unpredictable in engineered systems — may have hidden point loads', indicators: 'Builder plans from DFW county records may show structural designation' },
    twostory: { likelihood: '🔴 High', engineerNeeded: 'Yes — mandatory for any two-story DFW home wall removal', consequence: 'Upper floor joist failure risk; immediate engineer and contractor engagement', indicators: 'Upper floor joists resting on top plate of this wall = confirmed load bearing' },
  },
  parallel: {
    pb: { likelihood: '🟢 Lower — walls parallel to joists less commonly carry vertical load', engineerNeeded: 'Still consult if wall is on foundation beam line or has obvious posts above', consequence: 'Typically minimal structural risk but hidden point loads possible', indicators: 'If wall sits directly over a foundation beam in crawl → may still be structural' },
    slabold: { likelihood: '🟢 Lower — partition walls common parallel to joists in DFW ranch homes', engineerNeeded: 'Consult if wall has plumbing or electrical — permits required regardless', consequence: 'Usually cosmetic concern only; verify no hidden mechanical in wall before removal', indicators: 'Check attic: no trusses bearing on this wall is a positive sign' },
    slabnew: { likelihood: '🟢 Low — most parallel interior walls in post-1990 DFW homes are partition', engineerNeeded: 'No engineer typically needed; permit may still be required by city', consequence: 'Cosmetic only if confirmed non-structural; check plumbing and electrical first', indicators: 'Single top plate (not double) is a strong indicator of non-load-bearing' },
    twostory: { likelihood: '🟡 Medium — upper story parallel walls may still carry roof loads', engineerNeeded: 'Consult for any two-story wall regardless of direction', consequence: 'Roof system can transfer unexpected loads in two-story DFW homes', indicators: 'Attic inspection required to trace roof load path' },
  },
  stair: {
    pb: { likelihood: '🔴 Very High — stair walls in pier & beam DFW homes carry stair stringer + floor edge loads', engineerNeeded: 'Yes — always. Also check pier below stair for adequate support', consequence: 'Stair movement, floor edge deflection, potential rapid failure under dynamic load', indicators: 'Open crawl space under stair: dedicated pier or beam confirms load concentration' },
    slabold: { likelihood: '🔴 High — stair openings require structural framing; adjacent walls part of system', engineerNeeded: 'Yes — any modification near stair opening requires engineer and permit in DFW', consequence: 'Stair collapse risk; framing around stair opening is interdependent', indicators: 'Doubled or tripled studs, LVL header above stair opening confirm structural system' },
    slabnew: { likelihood: '🔴 High — modern DFW stair framing is engineered; walls are part of structural system', engineerNeeded: 'Yes — mandatory. DO NOT modify stair-adjacent walls without engineer stamped drawings', consequence: 'Modern engineered stair systems can fail rapidly if framing altered', indicators: 'Builder plans required for any stair-area modification in DFW' },
    twostory: { likelihood: '🔴 Very High — stairwell walls in two-story DFW homes carry upper floor edge and stair loads', engineerNeeded: 'Yes — mandatory. Permit required. Full engineering drawings needed.', consequence: 'Stair failure or upper floor edge collapse; immediate life-safety concern', indicators: 'Never modify without engineer approval regardless of visual assessment' },
  },
};

export default function DFWLoadBearingWallGuide() {
  const [loc, setLoc] = useState('');
  const [construction, setConstruction] = useState('');
  const result = loc && construction ? matrix[loc]?.[construction] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Load Bearing Wall Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: 32, lineHeight: 1.6 }}>Removing the wrong wall in a DFW home is one of the most expensive mistakes a homeowner can make. DFW's clay soil foundation movement has often redistributed original load paths in ways that don’t match typical rules of thumb.</p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>⚠️ Why DFW Is Different</h2>
          <ul style={{ color: '#C5CAD8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Expansive clay foundation movement can shift load paths from original design</li>
            <li>Many DFW homes had unlicensed additions or modifications that changed structural logic</li>
            <li>Pre-1990 DFW homes often have no surviving structural drawings</li>
            <li>DFW building codes require permits for load-bearing wall removal — cities enforce actively</li>
          </ul>
        </section>

        <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Load-Bearing Wall Assessor</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>Wall location / orientation</label>
            <select value={loc} onChange={e => setLoc(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select wall location…</option>
              {wallLocations.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>Home construction type</label>
            <select value={construction} onChange={e => setConstruction(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select construction…</option>
              {constructions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Load-Bearing Likelihood: </span><span style={{ fontWeight: 700 }}>{result.likelihood}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Engineer Needed: </span><span style={{ color: '#FACC15′ }}>{result.engineerNeeded}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Consequence of Incorrect Removal: </span><span style={{ color: '#F87171′ }}>{result.consequence}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Visual Indicators: </span><span style={{ color: '#C5CAD8′ }}>{result.indicators}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 8, padding: 20, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#9BA3B5', fontSize: 13, margin: 0 }}>⚠️ This tool provides general guidance only. In DFW, always consult a licensed structural engineer before removing or modifying any wall. Engineer fees ($300–$800 in DFW) are insignificant compared to repair costs from incorrect removal ($15,000–$80,000+). Pull required permits through your city.</p>
        </div>
      </div>
    </div>
  );
}
