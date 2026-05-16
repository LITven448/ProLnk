import { useState } from 'react';

const projectTypes = [
  { label: 'Hang TV / Heavy Mirror', value: 'tv' },
  { label: 'Install Shelving / Cabinets', value: 'shelf' },
  { label: 'Open or Remove Wall Section', value: 'open' },
  { label: 'Run Electrical / Plumbing', value: 'elec' },
];
const vintages = [
  { label: 'Pre-1960 DFW Home', value: 'pre60' },
  { label: '1960–1990 DFW Home', value: '60to90' },
  { label: '1990–Present DFW Home', value: 'post90' },
];

const data: Record<string, Record<string, { spacing: string; findMethod: string; weightLimit: string; notes: string }>> = {
  tv: {
    pre60: { spacing: 'Likely 16" OC but verify — older DFW homes often had irregular spacing', findMethod: 'Stud finder unreliable on plaster walls — use strong rare-earth magnet to find nails, then measure 16" from corner (typically 15.5" to center from corner, then every 16")', weightLimit: '100–200 lbs on 2×4 stud with proper lag bolt into stud', notes: 'Pre-1960 walls may be plaster over wood lath — different fastener technique required' },
    '60to90': { spacing: '16" OC standard in DFW 1960–1990 construction', findMethod: 'Stud finder works on drywall. Start at corner: first stud typically 15.5" to center, then 16" increments', weightLimit: '150–250 lbs with 2.5" lag screws into stud center', notes: 'Verify stud with two passes of stud finder — some DFW builders used 24" spacing on non-load-bearing walls' },
    post90: { spacing: '16" OC exterior; may be 24" OC on interior non-bearing walls', findMethod: 'Electronic stud finder (AC detection mode finds wires too — important before drilling). Corner method: 15.5" first, then 16" or 24"', weightLimit: '200–300 lbs with proper 3" lag screws centered in stud', notes: 'DFW production builders often mixed spacing — always verify with physical knock + finder' },
  },
  shelf: {
    pre60: { spacing: '16" OC typical; plaster walls complicate finding', findMethod: 'Magnet method: drag rare-earth magnet along wall to find nail heads in lath. Mark, then measure outward 16"', weightLimit: '75 lbs per shelf bracket into stud; use 2 studs minimum', notes: 'Plaster over lath is 1" thick — use 3" screws minimum to reach stud' },
    '60to90': { spacing: '16" OC standard', findMethod: 'Stud finder + verify by probing with finish nail. Look for electrical outlets — one side typically has stud within 1"', weightLimit: '150 lbs per pair of brackets into 2 studs', notes: 'DFW older homes: check for asbestos texture before drilling into walls pre-1978' },
    post90: { spacing: '16" or 24" OC depending on wall type', findMethod: 'Electronic stud finder with deep scan setting. Verify with thin probe before final pilot hole', weightLimit: '200 lbs per pair into 2 studs with proper wall anchors at non-stud locations', notes: 'Cabinet installs: always hit 2 studs minimum regardless of weight' },
  },
  open: {
    pre60: { spacing: 'Highly variable — some DFW homes had 12" OC for plaster support', findMethod: 'Open wall reveals actual layout. Before opening: probe with coat hanger through outlet to confirm spacing', weightLimit: 'N/A — full structural assessment required before opening any wall', notes: '🔴 Pre-1960 DFW walls often load-bearing even when they appear partition — always consult engineer' },
    '60to90': { spacing: '16" OC standard; confirm before cutting', findMethod: 'Use outlet box as reference — studs on each side. Map full wall before any cutting', weightLimit: 'N/A — engineer review for any DFW wall removal', notes: 'DFW homes from this era may have added walls for room conversions — original load path unclear' },
    post90: { spacing: '16" OC (exterior/bearing) or 24" OC (interior partition)', findMethod: 'Digital stud finder full-wall scan + drawings from original builder if available', weightLimit: 'N/A — engineer required for load-bearing; contractor for partition', notes: 'DFW production homes: interior walls rarely load-bearing BUT verify with joist direction above' },
  },
  elec: {
    pre60: { spacing: '12–16" OC; knob-and-tube wiring era', findMethod: 'Turn off power. Probe from outlet box side. Plaster walls require careful drilling to avoid wiring', weightLimit: 'N/A', notes: '🔴 Pre-1960 DFW homes may have original knob-and-tube wiring — do not DIY electrical; licensed electrician required' },
    '60to90': { spacing: '16" OC standard', findMethod: 'Electronic finder with AC detection. Mark all live circuit paths before drilling', weightLimit: 'N/A', notes: 'DFW homes 1960–1978 may have aluminum wiring — requires licensed electrician to modify' },
    post90: { spacing: '16–24" OC with wiring run through drilled holes in stud center', findMethod: 'AC detection stud finder mandatory. Wires run 1.25" from face — avoid drilling deep without checking', weightLimit: 'N/A', notes: 'Permit required for most DFW electrical work. Always pull permit for new circuits.' },
  },
};

export default function DFWWallStudGuide() {
  const [project, setProject] = useState('');
  const [vintage, setVintage] = useState('');
  const result = project && vintage ? data[project]?.[vintage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Wall Stud Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: 32, lineHeight: 1.6 }}>Before hanging anything heavy, opening a wall, or running wires in your DFW home — you need to know where your studs are, how they're spaced, and how much weight they can handle. Vintage matters in DFW.</p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>📏 Stud Spacing Basics for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: '16" On Center (OC)', desc: 'Standard for load-bearing and most exterior walls. 15.5" from corner to first stud center, then every 16".' },
              { label: '24" On Center (OC)', desc: 'Common on non-load-bearing interior walls in post-1990 DFW production homes to save lumber.' },
              { label: 'Irregular Spacing', desc: 'Common around windows, doors, corners, and in pre-1960 DFW homes where plaster required extra nailing surface.' },
              { label: 'Double Studs', desc: 'Found at door/window rough openings and partition wall intersections — always more structural here.' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{s.label}</div>
                <div style={{ color: '#C5CAD8', fontSize: 13 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🧲 How to Find Studs in DFW Homes</h2>
          <ul style={{ color: '#C5CAD8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EAF0' }}>Stud finder (electronic):</strong> Works on drywall; unreliable on plaster — use magnet method for older DFW homes</li>
            <li><strong style={{ color: '#E8EAF0' }}>Rare-earth magnet:</strong> Drags along wall to find nail/screw heads; works through plaster, tile, even wallpaper</li>
            <li><strong style={{ color: '#E8EAF0' }}>Corner measurement:</strong> First stud is usually 15.5" from corner center; measure every 16" or 24" after</li>
            <li><strong style={{ color: '#E8EAF0' }}>Outlet trick:</strong> Electrical boxes mount to studs — usually a stud within 1" of each side</li>
          </ul>
        </section>

        <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Stud Advisor by Project + Vintage</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>What's your project?</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select project…</option>
              {projectTypes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>DFW home vintage</label>
            <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select vintage…</option>
              {vintages.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Stud Spacing: </span><span style={{ color: '#C5CAD8' }}>{result.spacing}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>How to Find: </span><span style={{ color: '#C5CAD8' }}>{result.findMethod}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Weight Limit: </span><span style={{ color: '#4ADE80' }}>{result.weightLimit}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Notes: </span><span style={{ color: '#FACC15' }}>{result.notes}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 8, padding: 20, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#9BA3B5', fontSize: 13, margin: 0 }}>⚠️ Always verify stud location with a physical probe before final drilling. Weight limits assume properly centered fasteners into stud — not just near a stud. For walls over 10 years old, pilot hole first to confirm solid wood.</p>
        </div>
      </div>
    </div>
  );
}
