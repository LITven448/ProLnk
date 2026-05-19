import { useState } from 'react';

const slabSizes = ['Small (up to 200 sq ft)', 'Medium (200-600 sq ft)', 'Large (600-1500 sq ft)', 'Extra Large (1500+ sq ft)'];
const exposures = ['Full Sun — South/West Facing', 'Partial Shade', 'Full Shade / Covered', 'Heated Interior (Garage)'];

const thicknessSpacing: Record<string, { spacing: string; depth: string; width: string }> = {
  '4 inch slab': { spacing: '8-10 ft', depth: '1 inch (1/4 slab thickness)', width: '1/8 to 1/4 inch' },
  '5 inch slab': { spacing: '10-12 ft', depth: '1.25 inch', width: '1/4 inch' },
  '6 inch slab': { spacing: '12-15 ft', depth: '1.5 inch', width: '1/4 to 3/8 inch' },
};

const data: Record<string, Record<string, { spacing: string; material: string; backerRod: string; sealant: string; cost: string; dfwNote: string; replacement: string }>> = {
  'Small (up to 200 sq ft)': {
    'Full Sun — South/West Facing': { spacing: 'Every 8 ft (max 10 ft)', material: 'Fiber expansion board + polyurethane sealant', backerRod: '3/8 in closed-cell foam backer rod at 1/2 joint depth', sealant: 'NP1 Self-Leveling Polyurethane', cost: '$85-140 for materials on 200 sq ft patio', dfwNote: 'South/west DFW slabs in direct sun hit 160°F surface temps. Joints fail 40% faster — inspect every 3 years', replacement: 'Every 5-7 years in DFW full sun. Silicone lasts longer but NP1 bonds better to DFW aggregate' },
    'Partial Shade': { spacing: 'Every 8-10 ft', material: 'Fiber expansion board + polyurethane sealant', backerRod: '3/8 in closed-cell foam backer rod', sealant: 'NP1 or Sikaflex 1a', cost: '$75-120 for materials', dfwNote: 'Partial shade reduces thermal extremes — standard DFW spacing applies with normal inspection schedule', replacement: 'Every 7-10 years in partial shade DFW conditions' },
    'Full Shade / Covered': { spacing: 'Every 10 ft', material: 'Fiber expansion board + polyurethane sealant', backerRod: '3/8 in backer rod', sealant: 'Any polyurethane joint sealant', cost: '$65-100 for materials', dfwNote: 'Covered patios still experience DFW temperature swings — do not skip joints just because it\’s shaded', replacement: 'Every 10-12 years for covered DFW applications' },
    'Heated Interior (Garage)': { spacing: 'Every 10-12 ft', material: 'Fiber expansion board + epoxy or polyurethane sealant', backerRod: '1/2 in backer rod', sealant: 'Semi-rigid epoxy joint filler', cost: '$90-150 for heated garage', dfwNote: 'Heated garages in DFW have less thermal cycling but oil and traffic stress the joints — use semi-rigid epoxy', replacement: 'Every 10-15 years for interior DFW garage joints' },
  },
  'Medium (200-600 sq ft)': {
    'Full Sun — South/West Facing': { spacing: 'Every 8 ft in both directions — create max 64 sq ft panels', material: 'Pre-formed fiber board + self-leveling polyurethane', backerRod: '3/8-1/2 in backer rod throughout', sealant: 'NP1 Self-Leveling Polyurethane — apply in two passes in DFW heat', cost: '$200-380 for full medium driveway treatment', dfwNote: 'DFW driveways in full sun see 120°F thermal swings annually. Under-jointed medium slabs crack within 5 years — always saw-cut within 12 hrs of pour', replacement: 'Reseal every 5-7 years. Replace backer rod every 15-20 years' },
    'Partial Shade': { spacing: 'Every 10 ft both directions', material: 'Fiber expansion board + polyurethane sealant', backerRod: '3/8 in backer rod', sealant: 'Sikaflex 1a or NP1', cost: '$160-300 for medium slab', dfwNote: 'Standard DFW medium slab treatment — no modifications needed for partial shade', replacement: 'Every 7-10 years for partial shade DFW conditions' },
    'Full Shade / Covered': { spacing: 'Every 10-12 ft', material: 'Fiber expansion board + sealant', backerRod: '3/8 in backer rod', sealant: 'Any polyurethane', cost: '$130-240 for medium covered slab', dfwNote: 'Even covered medium slabs in DFW need joints every 10 ft — clay soil movement creates stress year-round', replacement: 'Every 10-12 years' },
    'Heated Interior (Garage)': { spacing: 'Every 12 ft both directions', material: 'Fiber board + semi-rigid epoxy', backerRod: '1/2 in backer rod', sealant: 'Metzger-McGuire MM-80 or similar semi-rigid', cost: '$220-400 for heated garage treatment', dfwNote: 'Medium heated garages in DFW: semi-rigid epoxy joints handle heavy vehicle traffic and resist oil/chemical penetration better than polyurethane', replacement: 'Every 12-15 years for interior joint sealant in DFW garages' },
  },
  'Large (600-1500 sq ft)': {
    'Full Sun — South/West Facing': { spacing: 'Every 8 ft — panels should not exceed 60 sq ft. Add diagonal joints at corners', material: 'Pre-formed fiber board at pour + saw-cut control joints within 12 hrs', backerRod: '1/2 in backer rod in all saw-cut joints', sealant: 'NP1 Self-Leveling in two applications 24 hrs apart', cost: '$450-900 for full large slab treatment in DFW', dfwNote: 'Large south-facing DFW slabs without proper jointing are a guaranteed callback. Saw-cut joints must be made before concrete is 24 hrs old — non-negotiable in DFW summer', replacement: 'Professional reseal every 5 years for DFW full-sun large slabs' },
    'Partial Shade': { spacing: 'Every 10 ft both directions — panels not exceeding 100 sq ft', material: 'Pre-formed fiber board + saw-cut for interior control joints', backerRod: '3/8-1/2 in backer rod', sealant: 'NP1 or Sikaflex 1a', cost: '$350-700 for large partial shade slab', dfwNote: 'Large partial shade slabs in DFW still need full joint treatment — shade does not eliminate soil movement or seasonal temperature changes', replacement: 'Every 7-10 years' },
    'Full Shade / Covered': { spacing: 'Every 12 ft both directions', material: 'Fiber board + saw-cut control joints', backerRod: '3/8 in backer rod', sealant: 'Polyurethane joint sealant', cost: '$280-560 for large covered slab', dfwNote: 'Large covered slabs in DFW (carports, covered courts): still need joints despite shade — focus on clay movement not temperature', replacement: 'Every 10-12 years' },
    'Heated Interior (Garage)': { spacing: 'Every 12-15 ft both directions', material: 'Fiber board + saw-cut + semi-rigid epoxy filler', backerRod: '1/2-3/4 in backer rod in vehicle traffic areas', sealant: 'MM-80 or Metzger-McGuire semi-rigid epoxy throughout', cost: '$550-1100 for large heated garage', dfwNote: 'Large DFW commercial garages or heated workshops: epoxy joint filler prevents edge spalling from forklift or truck tire traffic', replacement: 'Every 15-20 years for properly installed semi-rigid epoxy in DFW interior' },
  },
  'Extra Large (1500+ sq ft)': {
    'Full Sun — South/West Facing': { spacing: 'Every 8 ft — REQUIRE structural engineering review for slabs over 2000 sq ft in DFW', material: 'Combination: pre-formed board at forms + saw-cut control joints + isolation joints at all structures', backerRod: '1/2-3/4 in backer rod throughout. Use 3/4 in at vehicle traffic areas', sealant: 'Commercial-grade NP1 or Tremco Dymeric 240FC', cost: '$900-2500+ for extra large full-sun DFW slab', dfwNote: 'Extra large DFW slabs in full sun represent $50,000+ in concrete investment. Under-jointing this size slab in DFW is a construction defect. Hire a licensed concrete contractor with DFW commercial experience', replacement: 'Professional joint maintenance program every 3-5 years for DFW commercial full-sun slabs' },
    'Partial Shade': { spacing: 'Every 10-12 ft with engineering review over 3000 sq ft', material: 'Pre-formed board + saw-cut + isolation joints at structures', backerRod: '1/2 in backer rod throughout', sealant: 'Commercial NP1 or Dymeric 240FC', cost: '$700-2000 for extra large partial shade', dfwNote: 'Even partial shade extra-large DFW slabs need professional joint planning — multiple drainage slopes, elevation changes, and utility penetrations all require isolation joints', replacement: 'Every 7-10 years professional reseal' },
    'Full Shade / Covered': { spacing: 'Every 12-15 ft with engineer review', material: 'Pre-formed board + control joints + isolation at all columns and walls', backerRod: '1/2 in backer rod', sealant: 'Commercial polyurethane throughout', cost: '$550-1500 for extra large covered', dfwNote: 'Large covered structures in DFW (warehouse floors, covered courts, parking): isolation joints at every column base are critical — DFW clay settles unevenly under large structures', replacement: 'Every 10-12 years' },
    'Heated Interior (Garage)': { spacing: 'Every 12-15 ft with engineer review — vehicle traffic dictates joint placement', material: 'Saw-cut control joints + semi-rigid epoxy + armored joint edges if forklift traffic', backerRod: '3/4 in backer rod in all traffic joints', sealant: 'Metzger-McGuire MM-80 or Euclid Chemical Euco 700', cost: '$1200-3000 for extra large heated commercial floor', dfwNote: 'Extra large DFW commercial heated floors: armored joint edges (steel nosing) prevent joint edge spalling under heavy equipment. Standard for DFW warehouse construction', replacement: 'Sealant every 10-15 years. Armored edges are permanent' },
  },
};

export default function DFWConcreteExpansionJoints() {
  const [size, setSize] = useState('');
  const [exposure, setExposure] = useState('');
  const result = size && exposure ? data[size]?.[exposure] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>📐</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Concrete Expansion Joint Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            DFW's 120°F annual temperature swing (-5°F to 115°F) means concrete expands and contracts more than almost anywhere in the US. Without properly spaced and sealed expansion joints, that movement becomes cracking. Most DFW concrete cracks are a joint spacing failure, not a concrete quality failure.
          </p>
        </div>
        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#93c5fd' }}>📏 DFW Slab Thickness → Joint Spacing:</strong>
          <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {Object.entries(thicknessSpacing).map(([thickness, vals]) => (
              <div key={thickness} style={{ backgroundColor: '#0A1628', borderRadius: '6px', padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '0.9rem' }}>{thickness}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Spacing: {vals.spacing}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Depth: {vals.depth}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Slab Size</label>
            <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select size...</option>
              {slabSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Sun Exposure</label>
            <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select exposure...</option>
              {exposures.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
        {result && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>✅ Joint Plan for DFW</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>📏 Joint Spacing</div>
                <div style={{ color: '#F5E642', fontWeight: 'bold' }}>{result.spacing}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💰 Material Cost</div>
                <div style={{ color: '#fff' }}>{result.cost}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🏗️ Joint Material</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.material}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Backer Rod</div>
                <div style={{ color: '#fff', marginTop: '0.25rem', fontSize: '0.9rem' }}>{result.backerRod}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Sealant</div>
                <div style={{ color: '#fff', marginTop: '0.25rem', fontSize: '0.9rem' }}>{result.sealant}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#93c5fd', fontSize: '0.85rem' }}>🌡️ DFW-Specific Note</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.dfwNote}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🔄 Replacement Schedule</div>
              <div style={{ color: '#F5E642', marginTop: '0.25rem' }}>{result.replacement}</div>
            </div>
          </div>
        )}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🧪 DFW Joint Material Comparison</h3>
          {[['Polyurethane (NP1)', 'Most flexible', 'Best for DFW outdoor — handles 120°F swing', '5-7 yrs sun, 10 yrs shade'], ['Semi-Rigid Epoxy', 'Vehicle traffic', 'Best for DFW garage/commercial floors', '12-20 years interior'], ['Silicone', 'Long-lasting', 'Good DFW UV resistance but poor adhesion to aggregate', '10-15 years outdoor'], ['Fiber Board', 'Pre-formed compressible', 'Install at pour in all DFW expansion joints', 'Permanent — only sealant replaced']].map(([mat, strength, dfwUse, life]) => (
            <div key={mat} style={{ padding: '0.75rem 0', borderBottom: '1px solid #334155' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 120px 1fr', gap: '0.5rem', alignItems: 'start' }}>
                <span style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '0.9rem' }}>{mat}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{strength}</span>
                <span style={{ color: '#fff', fontSize: '0.85rem' }}>{dfwUse}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem', paddingLeft: '140px' }}>Service life: {life}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
