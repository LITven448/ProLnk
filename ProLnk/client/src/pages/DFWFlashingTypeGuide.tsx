import { useState } from 'react';

export default function DFWFlashingTypeGuide() {
  const [flashingLocation, setFlashingLocation] = useState('');
  const [issueType, setIssueType] = useState('');
  const [result, setResult] = useState<null | { repairType: string; urgency: string; urgencyColor: string; cost: string; context: string }>(null);

  const matrix: Record<string, Record<string, { repairType: string; urgency: string; urgencyColor: string; cost: string; context: string }>> = {
    chimney: {
      cracked: { repairType: 'Recaulk with roofing sealant — if counter flashing is lifting, rebed with mortar and reseal. If step flashing is cracked, replace the affected steps.', urgency: 'Fix Within 30 Days', urgencyColor: '#F59E0B', cost: '$200-600 depending on scope', context: 'Chimney flashing is the most common DFW roof leak source. The joint between masonry and metal expands at different rates during DFW temperature swings — sealant fails in 5-8 years.' },
      lifting: { repairType: 'Counter flashing must be reembedded in the mortar joint. Cannot be just caulked — requires tuckpointing the mortar joint and reset flashing.', urgency: '🚨 Fix This Month', urgencyColor: '#EF4444', cost: '$350-900 with masonry work', context: 'Lifted chimney counter flashing creates an open gap that DFW storm-driven rain enters directly. Every inch of rain adds gallons of water into the chimney-wall junction.' },
      rusting: { repairType: 'Replace all rusted flashing components. Rust compromises the full seal. Aluminum or galvalume replacement lasts 40+ years.', urgency: 'Replace This Season', urgencyColor: '#F59E0B', cost: '$400-800 full chimney flashing replacement', context: 'Galvanized steel chimney flashing rusts over 15-20 years in DFW humidity and temperature cycling. Once rust appears through, active water intrusion is often already occurring.' },
      recaulk: { repairType: 'Clean existing sealant, apply self-leveling roofing sealant or polyurethane. Do not use standard silicone — it fails under DFW UV and temperature cycling.', urgency: 'Recaulk This Season', urgencyColor: '#F5E642', cost: '$100-250 for professional recaulk', context: 'Planned recaulking every 5-7 years is the best chimney leak prevention strategy for DFW homeowners. Proactive recaulk is dramatically cheaper than water damage remediation.' }
    },
    skylight: {
      cracked: { repairType: 'Inspect if crack is in the flashing or the skylight curb. Flashing cracks can be sealed; curb cracks may require skylight replacement.', urgency: 'Inspect and Fix Within 30 Days', urgencyColor: '#F59E0B', cost: '$200-500 for flashing; $500-2000 if curb replacement needed', context: 'DFW UV degrades skylight curb gaskets 30% faster than northern climates. Inspect gaskets annually — they fail before the flashing.' },
      lifting: { repairType: 'Skylight step flashing that is lifting must be renailed and resealed. Water is entering at the lifted corner during DFW rain.', urgency: '🚨 Fix Immediately', urgencyColor: '#EF4444', cost: '$250-600', context: 'Skylight leaks in DFW typically appear as ceiling staining in living areas — high-visibility, high-stress leak locations. Lifting flashing at skylights is never a "wait and see" situation.' },
      rusting: { repairType: 'Replace all rusted skylight flashing. Aluminum or lead flashing recommended for DFW climate longevity.', urgency: 'Replace Within 60 Days', urgencyColor: '#EF4444', cost: '$300-700', context: 'Rusted skylight flashing typically accompanies an aging skylight. If the skylight itself is 15+ years old, evaluate replacement simultaneously.' },
      recaulk: { repairType: 'Remove failed sealant from skylight-to-flashing joint. Apply self-leveling roofing sealant around perimeter. Check gasket condition simultaneously.', urgency: 'Recaulk This Season', urgencyColor: '#F5E642', cost: '$100-200', context: 'Skylight recaulk is a DFW maintenance standard — every 5 years is the recommended interval given UV degradation rates.' }
    },
    wall: {
      cracked: { repairType: 'Step flashing cracks at wall-to-roof junctions require step flashing replacement for the cracked sections. Caulk alone will not hold against DFW wind-driven rain.', urgency: 'Fix Within 60 Days', urgencyColor: '#F59E0B', cost: '$200-500 for step flashing replacement', context: 'Wall step flashing protects the junction where a roof meets a vertical wall — common on DFW dormer walls, additions, and two-story transitions. Failures here cause wall cavity moisture and mold.' },
      lifting: { repairType: 'Renail and reseal lifting step flashing. If multiple steps are lifting, replace the full run — partial repairs create inconsistent sealing.', urgency: 'Fix This Month', urgencyColor: '#EF4444', cost: '$250-600', context: 'DFW wind events pull at any lifted flashing — once one step lifts, adjacent steps fail under the next storm.' },
      rusting: { repairType: 'Replace all rusted step flashing with aluminum. Rust through means active water infiltration is likely already occurring at the wall cavity.', urgency: 'Replace Immediately', urgencyColor: '#EF4444', cost: '$300-700 for full step flashing replacement', context: 'Rusted wall step flashing in DFW often indicates the original galvanized steel has aged past 20 years — full replacement is the only reliable solution.' },
      recaulk: { repairType: 'Recaulk the top edge of step flashing where it meets the wall siding. Use polyurethane sealant, not silicone.', urgency: 'Recaulk This Season', urgencyColor: '#F5E642', cost: '$75-175', context: 'Wall flashing recaulk is the highest-return preventive maintenance for DFW two-story homes. $150 in sealant prevents $3,000 in wall cavity remediation.' }
    },
    pipe: {
      cracked: { repairType: 'Pipe boot flashing with cracked rubber collar requires boot replacement. The rubber collar around plumbing vents is sacrificial — it fails before the metal base.', urgency: 'Replace Within 30 Days', urgencyColor: '#F59E0B', cost: '$150-350 per pipe boot', context: 'DFW UV degrades rubber pipe boot collars in 7-12 years. Cracked collars allow water to run down the pipe and into the attic on every rain event — often unnoticed until ceiling damage appears.' },
      lifting: { repairType: 'If the full pipe boot is lifting off the roof, the base seal has failed. Replace the complete boot assembly and reseal to shingle surface.', urgency: 'Replace This Month', urgencyColor: '#EF4444', cost: '$175-400 per boot', context: 'A lifted pipe boot is an open hole in your roof during every DFW storm. One 2-inch rain event can push gallons of water through a lifted boot.' },
      rusting: { repairType: 'Replace the pipe boot — base and collar. Aluminum or galvalume base with EPDM collar recommended for DFW UV conditions.', urgency: 'Replace Within 60 Days', urgencyColor: '#F59E0B', cost: '$150-350 per boot', context: 'Rusty pipe boots are a deferred maintenance item commonly found during DFW reroof projects. Replace proactively rather than let them fail mid-lifecycle.' },
      recaulk: { repairType: 'Apply self-leveling sealant around the boot base perimeter. Do not caulk over cracked rubber collars — replace the collar.', urgency: 'Maintain This Season', urgencyColor: '#F5E642', cost: '$50-100 per boot sealant application', context: 'Pipe boot maintenance is a 10-minute job per penetration. A DFW homeowner with 5 plumbing vents can maintain all boots for under $100.' }
    }
  };

  function analyze() {
    if (!flashingLocation || !issueType) return;
    setResult(matrix[flashingLocation]?.[issueType] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.25rem' }}>🔩</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '.5rem' }}>
          DFW Roof Flashing Types Guide
        </h1>
        <p style={{ color: '#9AAAB8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Flashing is the metal waterproofing that seals every roof penetration and transition — chimneys, skylights, walls, and pipe boots. In DFW's climate of extreme UV, temperature cycling, and intense storm rainfall, flashing is the most common source of non-storm roof leaks. Know your flashing types and when to act.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Step Flashing', icon: '🪜', desc: 'L-shaped pieces at wall-to-roof junctions and alongside chimneys. Each piece overlaps the one below.' },
            { label: 'Counter Flashing', icon: '🧱', desc: 'Embedded into mortar joints above step flashing — seals the top edge of chimney and masonry flashing.' },
            { label: 'Base/Apron Flashing', icon: '🔽', desc: 'Flat flashing at the base of chimneys and walls where roof meets vertical surface.' },
            { label: 'Pipe Boot Flashing', icon: '🔧', desc: 'Rubber collar around plumbing vents — most commonly replaced flashing component in DFW.' },
          ].map(f => (
            <div key={f.label} style={{ background: '#0F2040', borderRadius: 10, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '.25rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', fontSize: '.9rem', marginBottom: '.25rem' }}>{f.label}</div>
              <div style={{ color: '#9AAAB8', fontSize: '.85rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #3B82F6', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#3B82F6', marginBottom: '.5rem' }}>🌡️ DFW Temperature Cycles & Flashing Failure</div>
          <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>DFW sees 50°F daily temperature swings and 100°F+ summer peaks. Metal flashing expands and contracts constantly, working sealant loose over 5-10 years. DFW homeowners should plan for flashing inspection every 5 years and proactive recaulk rather than waiting for leaks to appear.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>🔍 Diagnose Your Flashing Issue</h2>
          <div style={{ display: 'grid', gap: '.75rem', marginBottom: '1rem' }}>
            <select value={flashingLocation} onChange={e => setFlashingLocation(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Flashing location</option>
              <option value='chimney'>Chimney flashing</option>
              <option value='skylight'>Skylight flashing</option>
              <option value='wall'>Wall / dormer step flashing</option>
              <option value='pipe'>Pipe boot / vent flashing</option>
            </select>
            <select value={issueType} onChange={e => setIssueType(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Issue type</option>
              <option value='cracked'>Cracked or deteriorating</option>
              <option value='lifting'>Lifting or separating</option>
              <option value='rusting'>Rusting or corroding</option>
              <option value='recaulk'>Needs recaulking (planned maintenance)</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
            Get Flashing Recommendation
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: `1px solid ${result.urgencyColor}` }}>
            <h3 style={{ color: result.urgencyColor, marginBottom: '1rem' }}>{result.urgency}</h3>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>REPAIR TYPE</div><div style={{ color: '#E8EDF5' }}>{result.repairType}</div></div>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>ESTIMATED COST</div><strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
              <div style={{ color: '#9AAAB8', fontSize: '.9rem', borderTop: '1px solid #1E3A5F', paddingTop: '.75rem' }}>{result.context}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
