import { useState } from 'react';

const issueTypes = ['Door won’t close flush', 'Door drooping/sagging on one side', 'Door hitting adjacent door or frame', 'Drawer not closing fully', 'Drawer sliding crooked', 'Door gap uneven top-to-bottom'];
const cabinetEras = ['Pre-2000 (older American-style hinges)', '2000–2015 (likely European cup hinges)', '2015–present (definitely European cup hinges)'];

type CabinetFix = { hingeType: string; adjustment: string; climate: string; replaceVsAdjust: string };

function getFix(issue: string, era: string): CabinetFix {
  const hasEuropean = !era.includes('Pre-2000');
  const hingeType = hasEuropean ? 'European cup hinge (3 adjustment screws)' : 'American-style hinge (may require shims or replacement)';

  if (issue.includes('flush') || issue.includes('drooping')) return { hingeType, adjustment: hasEuropean ? 'Up/down screw (on hinge body, not mounting plate) — turn clockwise to raise door. Do 1/4 turn increments. Check both hinges.' : 'Tighten hinge screws first. If stripped, use matchstick + wood glue trick. If still drooping, replace hinges.', climate: 'DFW summer heat expands cabinet wood — doors may droop July–Sep and self-correct in fall. Check in October before replacing.', replaceVsAdjust: 'Adjust first. Replace only if adjustment range is maxed out (screw bottomed out) or hinge is physically bent.' };
  if (issue.includes('hitting')) return { hingeType, adjustment: hasEuropean ? 'Side-to-side screw on mounting plate (not hinge body). Loosen center screw, slide plate left/right, retighten.' : 'Bend hinge leaf slightly with pliers or add shim behind hinge to shift door position.', climate: 'DFW humidity spike (March–May) swells wood. Doors that clear in winter may hit in spring — recheck after seasonal shift.', replaceVsAdjust: 'Adjustment nearly always solves this. Replace only if hinge cup has cracked or mounting plate is stripped.' };
  if (issue.includes('Drawer') && issue.includes('closing')) return { hingeType: 'Drawer slide (not hinge)', adjustment: 'Check for debris in track. Check if drawer box is square (measure diagonals — should be equal). Adjust front-to-back by bending soft-close clip or adjusting slide mounting screws.', climate: 'DFW humidity causes drawer box wood to expand. Drawers may stick May–September — try adjusting in cooler months first.', replaceVsAdjust: 'Replace slides if plastic rollers are cracked or ball bearings are grinding. Undermount slides: $30–$60/pair.' };
  if (issue.includes('crooked')) return { hingeType: 'Drawer slide alignment issue', adjustment: 'Loosen slide mounting screws on cabinet side. Use level to realign slide. Re-tighten. Check drawer box for square — a racked box causes crooked slides.', climate: 'Not usually climate-related. More likely original installation issue or wood movement from one wet season.', replaceVsAdjust: 'Adjust before replacing. If slides are bent, replace — Blum undermount slides are DFW standard in quality builders.' };
  return { hingeType, adjustment: hasEuropean ? 'Check depth screw (in/out from frame) — adjust door closer to or farther from frame to even the gap.' : 'Add or remove hinge shim (cardboard strip behind hinge) to shift door plane.', climate: 'DFW summer expansion is greatest at top of door (hot air rises, top rails expand first). Gaps may self-correct in fall.', replaceVsAdjust: 'Adjust first. If gap is uneven AND hinge adjustment is maxed, door itself may have warped — replace door not hinge.' };
}

export default function DFWCabinetAdjustmentGuide() {
  const [issue, setIssue] = useState('');
  const [era, setEra] = useState('');
  const fix = issue && era ? getFix(issue, era) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '2rem' }}>🚪🔧</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Cabinet Adjustment Guide</h1>
          <p style={{ color: '#94a3b8' }}>DFW heat and humidity cause wood expansion — most cabinet issues are adjustable, not replaceable.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌡️ DFW Climate & Cabinets</h2>
          {[['Summer expansion (June–Sep)', 'DFW heat causes wood to expand — cabinet doors may droop or hit frames. Check in October before calling a cabinet company.'],
            ['Winter contraction (Dec–Feb)', 'Short DFW winters shrink wood slightly. Doors may develop small gaps. Usually self-correct by March.'],
            ['European cup hinges are adjustable', 'Most DFW homes built after 2000 have 3-way adjustable hinges. All issues have a screw to fix them.'],
            ['Humidity affects drawer slides', 'DFW spring humidity (March–May) swells drawer boxes. Drawers that stuck last spring may not this year.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚙️ European Cup Hinge — 3 Screws Explained</h2>
          {[['Side screw (on mounting plate)', 'Moves door left or right. Loosen center screw, slide plate, retighten.'],
            ['Up/down screw (on hinge body)', 'Raises or lowers door. Clockwise = up. 1/4 turn increments.'],
            ['Depth screw (front/back)', 'Moves door closer to or farther from frame face. Adjusts gap consistency.'],
          ].map(([screw, fn]) => (
            <div key={screw} style={{ marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#162d4a', borderRadius: 6 }}>
              <div style={{ fontWeight: 'bold', color: '#F5E642' }}>{screw}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>{fn}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Adjustment Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>What's the cabinet issue?</label>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select issue...</option>
              {issueTypes.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Approximate cabinet era:</label>
            <select value={era} onChange={e => setEra(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select era...</option>
              {cabinetEras.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          {fix && (
            <div style={{ backgroundColor: '#162d4a', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642' }}>
              {[['Hardware type', fix.hingeType], ['How to adjust', fix.adjustment], ['DFW climate factor', fix.climate], ['Adjust vs. replace', fix.replaceVsAdjust]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: '0.8rem' }}>
                  <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
