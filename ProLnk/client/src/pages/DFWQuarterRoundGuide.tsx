import { useState } from 'react';

const flooringTypes = ['Hardwood', 'Engineered Wood', 'LVP / Luxury Vinyl', 'Laminate', 'Tile'];
const installSituations = ['New floor install', 'Replacing old quarter round', 'Floor expanding / gaps opening', 'Seasonal gaps (DFW temp swings)', 'Glue-down floor with no gap'];

function getQuarterRoundAssessment(flooring: string, situation: string) {
  if (situation.includes('no gap') || flooring === 'Tile') return {
    needed: 'Optional / Decorative Only',
    method: 'Adhesive only — no nails into tile',
    expansion: 'Tile doesn\’t expand — quarter round is cosmetic on tile floors',
    dfwNote: 'DFW grout lines absorb minor thermal movement in tile — no gap required',
    color: '#22C55E'
  };
  if (situation.includes('Seasonal gaps') || situation.includes('expanding')) return {
    needed: 'Required — Use Wider Profile',
    method: 'Nail to baseboard ONLY — never nail to floor (must float with floor)',
    expansion: 'DFW temp swings 40°F–105°F cause hardwood to expand/contract up to 3/8" per 10 ft',
    dfwNote: 'Nailing quarter round to the floor traps expansion and causes buckling — common DFW mistake',
    color: '#FF4444'
  };
  if (flooring === 'Hardwood' || flooring === 'Engineered Wood') return {
    needed: 'Required — Standard Profile',
    method: 'Nail to baseboard only, 3/4" gap at perimeter maintained by spacers',
    expansion: 'DFW hardwood needs 3/4"–1" expansion gap — quarter round covers this gap',
    dfwNote: 'Install during fall when wood is at median moisture — neither peak expansion nor peak contraction',
    color: '#F5A623'
  };
  if (flooring === 'LVP / Luxury Vinyl' || flooring === 'Laminate') return {
    needed: 'Required — Lightweight Profile OK',
    method: '1/2" gap at perimeter — LVP expands more than hardwood in DFW heat',
    expansion: 'LVP in DFW sun-exposed rooms can expand 1/2"+ — undersized gap causes floor to lift',
    dfwNote: 'LVP flooring near DFW south-facing windows needs maximum gap — direct sun adds 20°F to surface temp',
    color: '#F5A623'
  };
  return {
    needed: 'Recommended',
    method: 'Nail to baseboard only, standard 1/2" gap',
    expansion: 'Follow manufacturer\’s expansion gap requirements for DFW climate zone',
    dfwNote: 'DFW\’s temperature range is one of the widest in the U.S. — always use maximum recommended gap',
    color: '#22C55E'
  };
}

export default function DFWQuarterRoundGuide() {
  const [flooring, setFlooring] = useState('');
  const [situation, setSituation] = useState('');
  const result = flooring && situation ? getQuarterRoundAssessment(flooring, situation) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}>
          🏠 DFW INTERIOR GUIDE
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          Quarter Round & Shoe Molding Guide for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          Quarter round isn't just decorative — in DFW homes it covers the critical expansion gap that
          prevents wood and LVP floors from buckling. DFW's 65°F temperature range is one of the widest
          in the U.S., making proper installation non-negotiable.
        </p>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🌡️ Why DFW Needs Quarter Round More Than Most Cities</h2>
          <ul style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>DFW temp range: 20°F winter lows to 110°F summer highs — 90°F seasonal swing</li>
            <li>Hardwood expands ~1/8" per 4 ft across the grain for every 4% moisture change</li>
            <li>LVP flooring near DFW south-facing windows sees surface temps of 120°F+ and expands more</li>
            <li>Quarter round nailed to the floor (not baseboard) is the #1 cause of DFW floor buckling</li>
            <li>Laminate with undersized expansion gaps regularly lifts in DFW's summer heat — and voids warranty</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🔧 Nail vs Glue in DFW Conditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: '🔫', name: 'Nail to Baseboard', desc: 'Only correct method for floating floors. Quarter round must move with the floor, not anchor it.' },
              { icon: '🪝', name: 'Adhesive on Tile', desc: 'No nail option on tile — use construction adhesive. Quarter round is cosmetic only on tile.' },
              { icon: '❌', name: 'Never Nail to Floor', desc: 'Nailing to flooring locks expansion — causes buckling, cupping, and warranty void in DFW heat.' },
              { icon: '✅', name: 'Stagger Joints', desc: 'On long DFW hallways, stagger quarter round joints at least 24" from flooring seams below.' },
            ].map(({ icon, name, desc }) => (
              <div key={name} style={{ background: '#162035', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{name}</div>
                <div style={{ color: '#94A3B8', fontSize: '13px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>🛠️ DFW Quarter Round Recommendation Tool</h2>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Flooring Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {flooringTypes.map(f => (
                <button key={f} onClick={() => setFlooring(f)} style={{
                  background: flooring === f ? '#F5E642' : '#162035', color: flooring === f ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: flooring === f ? 700 : 400
                }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>DFW Installation Situation</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {installSituations.map(s => (
                <button key={s} onClick={() => setSituation(s)} style={{
                  background: situation === s ? '#F5E642' : '#162035', color: situation === s ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: situation === s ? 700 : 400
                }}>{s}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '18px', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{result.needed}</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '6px' }}>Method: <span style={{ color: '#FFFFFF' }}>{result.method}</span></div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '6px' }}>Expansion: <span style={{ color: '#FFFFFF' }}>{result.expansion}</span></div>
              <div style={{ color: '#94A3B8', fontSize: '13px' }}>💡 DFW: {result.dfwNote}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#162035', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#64748B', textAlign: 'center' }}>
          ProLnk • DFW Home Intelligence • Connecting homeowners with vetted local pros
        </div>
      </div>
    </div>
  );
}
