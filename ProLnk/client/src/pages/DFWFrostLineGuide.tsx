import { useState } from 'react';

const projectTypes = [
  'Outdoor plumbing / irrigation',
  'In-ground pool',
  'Foundation / slab',
  'Underground utilities',
  'Basement or storm shelter',
  'Deck / fence posts',
  'Landscaping / retaining wall',
  'Outdoor faucet / hose bib',
];

function getImplications(project: string) {
  if (project === 'Foundation / slab') return { depth: '12-18 inches', risk: 'Low', color: '#22c55e', notes: 'Post-tension slabs are ideal for DFW because of the shallow frost line. Footings only need to reach below frost depth, which is just 4-6 inches. The bigger concern is expansive clay movement, not freeze depth.', code: 'IRC Section R403.1.4.1 permits shallow footings where frost penetration depth is 12 inches or less.' };
  if (project === 'Outdoor plumbing / irrigation') return { depth: '6-12 inches', risk: 'High', color: '#ef4444', notes: 'DFW pipes are shallower than northern states because frost line is only 4-6 inches. But this means pipes are MORE vulnerable to hard freezes. Install freeze protection valves on all outdoor lines. Insulate exposed pipes. Drain irrigation before first freeze.', code: 'Texas Plumbing Code requires outdoor lines installed 6+ inches below grade with freeze protection.' };
  if (project === 'Outdoor faucet / hose bib') return { depth: '6 inches', risk: 'High', color: '#ef4444', notes: 'Hose bibs in DFW are highly freeze-vulnerable. Install frost-free sillcocks (anti-siphon vacuum breaker type). During hard freezes (below 20F), disconnect hoses and shut off interior supply valve. The 2021 freeze event caused billions in DFW pipe damage.', code: 'Install frost-free sillcock per manufacturer specs, minimum 6 inch burial of supply line.' };
  if (project === 'In-ground pool') return { depth: '18-24 inches', risk: 'Low', color: '#22c55e', notes: 'Pool shells in DFW rarely need freeze protection for the shell itself given the shallow frost line. Freeze risk is primarily to above-ground equipment: pump, filter, heater, and plumbing. Use a pool freeze protector that runs the pump when temps drop below 38F.', code: 'Pool equipment must be protected to 20F per Texas pool code. Shell excavation typically 5-8 feet, well below frost depth.' };
  if (project === 'Underground utilities') return { depth: '24-36 inches', risk: 'Low', color: '#22c55e', notes: 'Water mains and utility lines in DFW are installed much shallower than in northern states. Municipal water lines typically run 24-36 inches. This is adequate for DFW frost depth but means utilities are closer to surface disturbances.', code: 'Call 811 before digging. Texas One Call law requires notification 48 hours before excavation.' };
  if (project === 'Basement or storm shelter') return { depth: '6+ feet', risk: 'None', color: '#22c55e', notes: 'DFW rare basement construction has nothing to do with frost line (only 4-6 inches). The real challenge is expansive Blackland Prairie clay that can shift and crack basement walls. In-ground storm shelters require engineered drainage and waterproofing due to clay soil movement.', code: 'Consult structural engineer for basement design in DFW clay soils. IRC Appendix J covers underground structures.' };
  if (project === 'Deck / fence posts') return { depth: '24-30 inches', risk: 'Low', color: '#22c55e', notes: 'Deck and fence posts in DFW only need to go below frost depth (4-6 inches minimum) but best practice is 24-30 inches for structural stability. Expansive clay is the bigger concern - posts can heave as soil expands and contracts. Use concrete tube forms and allow 1 inch gap at soil surface.', code: 'IRC requires posts set 12 inches minimum below frost depth. DFW: set posts 24-30 inches for clay stability.' };
  return { depth: '6-18 inches', risk: 'Low', color: '#22c55e', notes: 'DFW frost line of 4-6 inches means most landscaping projects only need shallow installation. The primary concern in DFW is expansive clay soil movement rather than freeze depth. Install drainage fabric and use crushed granite base where possible.', code: 'No specific code for landscaping. Follow manufacturer specs for materials in expansive clay soils.' };
}

export default function DFWFrostLineGuide() {
  const [project, setProject] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof getImplications>>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>❄️</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Frost Line Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW's frost line is just 4-6 inches deep - dramatically shallower than the 4+ feet required in northern states. This shapes how everything from foundations to plumbing is built in North Texas. Understanding your frost line helps you avoid costly freeze damage and build to local code.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>4-6"</p>
            <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.25rem' }}>DFW Frost Line</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>Freeze depth</p>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>48"</p>
            <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.25rem' }}>Chicago Frost Line</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>For comparison</p>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>2021</p>
            <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.25rem' }}>Winter Storm Uri</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>$3B DFW pipe damage</p>
          </div>
        </div>
        <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Project Frost Line Implications</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Project Type</label>
            <select value={project} onChange={e => { setProject(e.target.value); setResult(getImplications(e.target.value)); }} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
              <option value=''>Select your project</option>
              {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem' }}>
                <div><span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Required Depth</span><p style={{ color: '#F5E642', fontWeight: 700, margin: '0.25rem 0 0′ }}>{result.depth}</p></div>
                <div><span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Freeze Risk</span><p style={{ color: result.color, fontWeight: 700, margin: '0.25rem 0 0′ }}>{result.risk}</p></div>
              </div>
              <p style={{ color: '#e2e8f0', marginBottom: '0.5rem', lineHeight: 1.6 }}>{result.notes}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic' }}>{result.code}</p>
            </div>
          )}
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          <strong style={{ color: '#F5E642′ }}>ProLnk Note:</strong> Frost line requirements affect permits, inspections, and code compliance. Always pull permits for projects involving underground plumbing or foundations. ProLnk connects you with licensed DFW contractors who know local code.
        </div>
      </div>
    </div>
  );
}
