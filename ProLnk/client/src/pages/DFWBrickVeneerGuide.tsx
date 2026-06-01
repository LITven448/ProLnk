import { useState } from 'react';

const IDENTIFICATION_TESTS = [
  { test: 'Look at the weep holes', result: 'Weep holes visible at bottom course = brick veneer. No weep holes = likely structural brick.' },
  { test: 'Check inside the garage', result: 'If interior walls are wood framing, exterior brick is veneer. Structural brick walls are solid all the way through.' },
  { test: 'Measure wall thickness', result: 'Exterior brick + 1" air gap + wood framing = veneer. 8" or thicker solid masonry = structural.' },
  { test: 'Look at the attic', result: 'If roof trusses bear on wood top plates (not brick), your brick is veneer — all DFW homes built after 1960 standard.' },
  { test: 'Examine mortar joints', result: 'Veneer joints often thinner (3/8") and more uniform. Structural brick has more variation and thicker beds.' },
];

const IMPLICATIONS: Record<string, { veneer: string; structural: string; repair: string; cost: string }> = {
  bulging: {
    veneer: 'Brick veneer bulging = wall ties have failed or corroded. DFW moisture accelerates tie corrosion. Veneer can fall — do not ignore.',
    structural: 'Structural brick bulging is rare and serious — indicates foundation movement or water damage to entire wall assembly.',
    repair: 'Veneer: Re-anchor with helical brick ties through exterior. Structural: Structural engineer required before any repair.',
    cost: 'Veneer tie replacement: -2,500 per wall section. Structural brick repair: ,000-20,000+.',
  },
  cracking: {
    veneer: 'Crack in veneer = cosmetic-to-moderate concern. Stair-step cracks along mortar joints suggest foundation movement transmitted to veneer.',
    structural: 'Cracks in structural brick walls can indicate compromised load path. Foundation evaluation essential.',
    repair: 'Veneer: Tuckpoint cracks, monitor for movement. Diagonal cracks — get foundation checked first.',
    cost: 'Tuckpointing: -15/linear ft. Foundation evaluation: -800. Foundation repair if needed: ,000-20,000.',
  },
  spalling: {
    veneer: 'Spalling veneer is common in DFW — moisture gets behind veneer and cycles through winter freezes. Cosmetic but must be addressed to prevent water infiltration to sheathing.',
    structural: 'Spalling on structural brick exposes interior to moisture and reduces load capacity over time.',
    repair: 'Veneer: Replace individual spalled bricks. Match DFW clay color carefully — use salvage bricks for historic matches.',
    cost: 'Brick replacement: -25/brick installed. Full veneer area re-work: -22/sq ft.',
  },
  gaps: {
    veneer: 'Gaps between veneer and foundation, around windows, or at soffit = brick veneer has moved. DFW settlement common.',
    structural: 'Gaps in structural brick indicate serious movement — this is a structural event, not maintenance.',
    repair: 'Veneer: Inspect flashing and ties at gap locations. Seal gaps with backer rod + elastomeric caulk after addressing cause.',
    cost: 'Caulk and seal: -600 DIY. If movement ongoing, foundation evaluation: -800 before sealing.',
  },
};

export default function DFWBrickVeneerGuide() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<{ veneer: string; structural: string; repair: string; cost: string } | null>(null);

  function analyze() {
    const data = IMPLICATIONS[concern];
    setResult(data ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🧱 DFW BRICK GUIDE</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem' }}>DFW Brick Veneer vs Structural Brick</h1>
          <p style={{ color: '#8899AA', lineHeight: 1.6, margin: 0 }}>
            95%+ of DFW homes built after 1960 have brick veneer — decorative brick attached to a wood-frame structure.
            Understanding whether your brick is veneer or structural changes everything about how you interpret cracks, gaps, and movement.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#111E35', border: '2px solid #F5E642', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem' }}>🏠 Brick Veneer (95% of DFW)</div>
            <ul style={{ color: '#C5D3E0', fontSize: '0.82rem', lineHeight: 1.7, margin: 0, paddingLeft: '1.2rem' }}>
              <li>Non-structural — wood frame carries all loads</li>
              <li>Attached with metal ties screwed to sheathing</li>
              <li>1-inch air gap behind brick (code required)</li>
              <li>Can fail independently — looks terrible but house stands</li>
              <li>DFW tie corrosion is the #1 veneer failure mode</li>
            </ul>
          </div>
          <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ color: '#8899AA', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem' }}>🏛️ Structural Brick (Pre-1950 DFW)</div>
            <ul style={{ color: '#8899AA', fontSize: '0.82rem', lineHeight: 1.7, margin: 0, paddingLeft: '1.2rem' }}>
              <li>Brick IS the structure — walls carry roof loads</li>
              <li>Multiple wythes thick (8" to 16")</li>
              <li>No wood frame behind brick</li>
              <li>Failure is a structural event, not cosmetic</li>
              <li>Rare in DFW — mostly pre-WWII commercial / industrial</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem' }}>🔎 How to Identify Your Brick Type</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {IDENTIFICATION_TESTS.map(t => (
              <div key={t.test} style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.85rem', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', alignItems: 'start' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.82rem' }}>{t.test}</div>
                <div style={{ color: '#C5D3E0', fontSize: '0.82rem', lineHeight: 1.5 }}>{t.result}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.25rem' }}>🔍 Brick Concern Analyzer</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>What Are You Concerned About?</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', maxWidth: '360px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
              <option value=''>Select your concern</option>
              <option value='bulging'>Bulging or bowing brick</option>
              <option value='cracking'>Cracks in brick or mortar joints</option>
              <option value='spalling'>Spalling or flaking brick faces</option>
              <option value='gaps'>Gaps at foundation, soffit, or windows</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.65rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Analyze Concern
          </button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
              {[['🏠 If Brick Veneer (likely)', result.veneer], ['🏛️ If Structural Brick', result.structural], ['🔧 Repair Approach', result.repair], ['💰 Cost Estimate', result.cost]].map(([label, val]) => (
                <div key={label as string} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.85rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>{label}</div>
                  <div style={{ color: '#C5D3E0', fontSize: '0.875rem', lineHeight: 1.6 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
