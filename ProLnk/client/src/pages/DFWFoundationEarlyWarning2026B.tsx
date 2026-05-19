import { useState } from 'react';

export default function DFWFoundationEarlyWarning2026B() {
  const [warning, setWarning] = useState('');
  const [assessment, setAssessment] = useState('');

  const assessments: Record<string, string> = {
    grout_crack: 'Tile grout cracking in a line across the floor = floor movement from foundation shift. Isolated grout crack near an edge could be thermal expansion — check if it forms a pattern or follows a direction. A line of cracked grout spanning multiple tiles pointing toward an exterior wall is a foundation signal. Mark the ends with tape and measure weekly.',
    nail_pops: 'Nail pops in drywall are small drywall fasteners pushing through paint as framing moves with the foundation. One or two near doors = normal seasonal movement. Multiple in a line or concentrated in one room = document and schedule evaluation. DFW clay movement causes this in cycles — track which season they appear.',
    ceiling_gap: 'Gap at ceiling-wall junction = wall is pulling away or ceiling is sagging due to framing movement tied to foundation. Measure the gap with a business card. Gap you can see daylight through = call ProLnk this week. Hairline gap that appeared gradually = monitor weekly and document photos.',
    window_lock: 'Window that won’t lock properly = frame has racked due to foundation movement. Test all windows on that wall. If multiple windows on the same wall have alignment issues, the foundation under that wall has shifted. This is an actionable sign — call ProLnk for a pier and beam or slab evaluation.',
    pier_moisture: 'Moisture staining on pier and beam foundation walls or under-house moisture = critical in DFW. Pier and beam homes need positive drainage away from the house and vapor barriers under the crawl space. Moisture causes wood rot and undermines the beam support structure. Schedule inspection immediately — this escalates fast in DFW summer humidity.',
    sticky_interior: 'Interior doors sticking (not just exterior) = structural frame movement from foundation shift. Exterior doors can swell from humidity, but interior hollow-core doors sticking = framing has moved. Note which doors, mark the contact points, and watch whether the sticking increases or spreads to adjacent doors.',
  };

  function assess() {
    if (!warning) return;
    setAssessment(assessments[warning] || 'Select a warning sign to see your assessment guide.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Foundation Early Warning Signs 2026 — Part 2</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Subtle signs DFW homeowners miss until the repair bill hits $15,000+</p>

        {[
          { emoji: '⬛', sign: 'Grout cracking in tile', subtle: 'Floor movement from foundation shift' },
          { emoji: '📌', sign: 'Nail pops in drywall', subtle: 'Framing moving with the foundation' },
          { emoji: '↔️', sign: 'Gap at ceiling-wall junction', subtle: 'Wall pulling away from framing' },
          { emoji: '🔒', sign: 'Window won’t lock properly', subtle: 'Frame racked by foundation movement' },
          { emoji: '💧', sign: 'Pier and beam moisture', subtle: 'Wood rot risk in crawl space' },
          { emoji: '🚪', sign: 'Interior doors sticking', subtle: 'Structural frame movement — not humidity' },
        ].map((item) => (
          <div key={item.sign} style={{ background: '#0f2040', borderRadius: 10, padding: '12px 18px', marginBottom: 8, display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>{item.emoji}</span>
            <div>
              <div style={{ color: '#e2e8f0', fontSize: 15 }}>{item.sign}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{item.subtle}</div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 22, marginTop: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Subtle Warning → Assessment Guide</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>What subtle sign do you see?</label>
            <select value={warning} onChange={(e) => setWarning(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select warning sign</option>
              <option value="grout_crack">Tile grout cracking in a line</option>
              <option value="nail_pops">Nail pops appearing in drywall</option>
              <option value="ceiling_gap">Gap forming at ceiling-wall junction</option>
              <option value="window_lock">Window won't lock or align</option>
              <option value="pier_moisture">Pier and beam moisture or staining</option>
              <option value="sticky_interior">Interior doors sticking</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Assessment Guide
          </button>
          {assessment && <div style={{ marginTop: 16, background: '#162d4a', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{assessment}</div>}
        </div>
      </div>
    </div>
  );
}