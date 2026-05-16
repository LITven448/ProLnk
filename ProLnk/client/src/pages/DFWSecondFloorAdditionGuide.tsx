import { useState } from 'react';

const FEASIBILITY_MAP: Record<string, Record<string, string>> = {
  'ranch-slab': {
    'premium': '⚠️ Feasible but expensive — slab foundations require significant structural reinforcement for second floor loads. Budget $30–60K just for structural prep.',
    'standard': '❌ Rarely cost-effective — structural costs plus construction often exceed moving to a larger home. Get a cost-vs-moving analysis first.',
    'budget': '❌ Not recommended — project cost will exceed neighborhood ceiling value. ROI is negative.',
  },
  'ranch-pier': {
    'premium': '✅ More feasible — pier-and-beam foundations adapt better to second floor loads. Still requires structural engineer.',
    'standard': '⚠️ Borderline — project complexity + cost ($180–300K) may not pencil vs. relocating.',
    'budget': '❌ Not recommended — costs will exceed resale value.',
  },
  'split-level': {
    'premium': '✅ Best candidate — split-levels often have partial second floor framing already. Engineer assessment required.',
    'standard': '⚠️ Possible — assess existing framing capacity with structural engineer first.',
    'budget': '❌ Budget insufficient for scope of work.',
  },
};

const STRUCTURAL_REQS: Record<string, string> = {
  'ranch-slab': 'New footings or grade beams, steel moment frames or shear walls, complete roof removal and reconstruction',
  'ranch-pier': 'New floor joists at top of first floor, shear walls, complete roof removal, pier reinforcement',
  'split-level': 'Existing framing assessment, additional joists, shear wall system, partial roof work',
};

export default function DFWSecondFloorAdditionGuide() {
  const [homeType, setHomeType] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { feasibility: string; structural: string; cost: string; compare: string }>(null);

  function calculate() {
    if (!homeType || !neighborhood || !budget) return;
    const feasibility = FEASIBILITY_MAP[homeType]?.[neighborhood] ?? 'Structural assessment required';
    const structural = STRUCTURAL_REQS[homeType] ?? 'Full structural engineering assessment required';
    const costMap: Record<string, string> = {
      'ranch-slab': '$220,000 – $380,000+',
      'ranch-pier': '$180,000 – $300,000+',
      'split-level': '$140,000 – $240,000+',
    };
    const cost = costMap[homeType];
    const compareMap: Record<string, string> = {
      'premium': 'May pencil in premium DFW neighborhoods (Highland Park, Southlake, Westover Hills) where land is scarce',
      'standard': 'Moving up is likely cheaper — DFW move-up market has strong inventory in $400–600K range',
      'budget': 'Moving is definitively better — project costs exceed realistic resale value',
    };
    setResult({ feasibility, structural, cost, compare: compareMap[neighborhood] });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Second Floor Addition in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Adding a second floor to a DFW ranch home is the most complex residential project possible. It's occasionally the right answer — but only in specific neighborhoods and situations.
        </p>

        <div style={{ background: '#FF8C00', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>⚠️ Critical Reality Check</div>
          <div style={{ marginTop: 8, lineHeight: 1.6 }}>
            Most second floor additions in DFW cost $180,000–380,000+. In standard DFW neighborhoods, this investment rarely returns full value. This project only makes sense in land-constrained premium areas where you cannot buy a larger home.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏗️ What Makes This Extreme</h2>
          <ul style={{ color: '#CBD5E1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Entire roof must be removed and rebuilt</li>
            <li>All existing occupants must vacate during construction (4–8 months)</li>
            <li>DFW slab foundations typically need significant reinforcement</li>
            <li>Structural engineering plans required before any permits</li>
            <li>Project is essentially building a new house on top of an old one</li>
            <li>Budget 20–30% contingency for DFW clay-related structural surprises</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>✅ When It DOES Make Sense in DFW</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['Highland Park / University Park', 'No vacant lots — land cost makes adding up logical'],
              ['Southlake / Westover Hills', 'Premium areas where sq footage commands $300–500/sqft'],
              ['Near top-rated schools', 'Cannot move without losing school district'],
              ['Emotional attachment + investment budget', 'Family home worth keeping at any reasonable cost'],
            ].map(([scenario, reason]) => (
              <div key={scenario} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600 }}>{scenario}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{reason}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Feasibility Assessment</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              ['Home type', homeType, setHomeType, [['', 'Select type'], ['ranch-slab', 'Ranch on slab foundation'], ['ranch-pier', 'Ranch on pier-and-beam'], ['split-level', 'Split-level home']]],
              ['Neighborhood tier', neighborhood, setNeighborhood, [['', 'Select tier'], ['premium', 'Premium (HP, Southlake, Westover)'], ['standard', 'Standard DFW suburban'], ['budget', 'Value neighborhood']]],
              ['Total budget', budget, setBudget, [['', 'Select budget'], ['over-300k', 'Over $300,000'], ['200-300k', '$200,000 – $300,000'], ['under-200k', 'Under $200,000']]],
            ].map(([label, val, setter, opts]: any) => (
              <div key={label}>
                <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8' }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                  {opts.map(([v, l]: string[]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Get Assessment →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              {[['✅ Feasibility', result.feasibility], ['🏗️ Structural Requirements', result.structural], ['💰 Estimated Cost', result.cost], ['🔄 Cost vs. Moving', result.compare]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{label}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>Get a structural feasibility assessment</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 6 }}>ProLnk connects you with DFW structural engineers and general contractors</div>
        </div>
      </div>
    </div>
  );
}
