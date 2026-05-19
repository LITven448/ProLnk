import { useState } from 'react';

const guides: Record<string, Record<string, string>> = {
  open: {
    'add-definition': 'DFW tip: Add definition with half-walls (36" knee walls), columns, or ceiling treatment changes. Preserves open feel while creating functional zones. No permit needed for non-structural partitions.',
    'add-walls': 'Adding non-load-bearing walls requires permit in most DFW cities. Contact city building department. Framing + drywall typically $80-140/linear ft installed. Consider HVAC zoning cost — open plans harder to cool in Texas heat.',
    'zone-cooling': 'Texas heat problem: open plans create single HVAC zone. Solution: ceiling fans at zone intersections, mini-split in specific areas, smart thermostat with multiple sensors. Zoning can cut cooling costs 15-25%.',
  },
  closed: {
    'remove-walls': 'Wall removal in DFW requires permit if structural. Hire structural engineer ($500-1,500) to assess load-bearing before demo. Beam installation for span: $3,000–$12,000 depending on size and material.',
    'partial-open': 'Partial opening (doorway to wide cased opening) avoids structural complexity. Widen opening to 6-8 ft for modern feel. Non-load-bearing: $800–$2,500. Load-bearing: $4,000–$15,000.',
    'identify-load': 'Load-bearing wall ID: walls perpendicular to joists, walls above foundation beams, exterior walls, walls directly above/below other walls. Always verify with licensed contractor before demo.',
  },
};

const goals = ['add-definition', 'add-walls', 'zone-cooling', 'remove-walls', 'partial-open', 'identify-load'];
const goalLabels: Record<string, string> = {
  'add-definition': '🏗️ Add Definition',
  'add-walls': '🧱 Add Walls',
  'zone-cooling': '❄️ Zone Cooling',
  'remove-walls': '💥 Remove Walls',
  'partial-open': '🚪 Partial Opening',
  'identify-load': '🔍 Identify Load-Bearing',
};

export default function DFWOpenFloorPlanGuide2026() {
  const [layout, setLayout] = useState<'open' | 'closed' | ''>('');
  const [goal, setGoal] = useState('');
  const openGoals = ['add-definition', 'add-walls', 'zone-cooling'];
  const closedGoals = ['remove-walls', 'partial-open', 'identify-load'];
  const validGoals = layout === 'open' ? openGoals : layout === 'closed' ? closedGoals : [];
  const rec = layout && goal && guides[layout]?.[goal] ? guides[layout][goal] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Open vs Closed Floor Plan Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Texas-specific considerations for floor plan changes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>✅ Open Concept Pros</div>
            {['Natural light flows through home', 'Better for entertaining — DFW home value driver', 'Modern aesthetic matches DFW resale expectations', 'Sightlines to backyard / outdoor living'].map((p, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>• {p}</div>)}
          </div>
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>⚠️ Open Concept Cons (Texas-Specific)</div>
            {['Harder to zone cool — single HVAC zone', 'Noise travels — cooking smells spread', 'Less wall space for art / storage', 'Return to defined spaces trending 2026'].map((p, i) => <div key={i} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>• {p}</div>)}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Current Layout + Goal → DFW Floor Plan Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Current Layout</div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setLayout('open'); setGoal(''); }} style={{ background: layout === 'open' ? '#F5E642' : '#1a3050', color: layout === 'open' ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', fontWeight: 600 }}>🏠 Open Concept</button>
              <button onClick={() => { setLayout('closed'); setGoal(''); }} style={{ background: layout === 'closed' ? '#F5E642' : '#1a3050', color: layout === 'closed' ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', fontWeight: 600 }}>🏚️ Closed/Traditional</button>
            </div>
          </div>
          {layout && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>What's Your Goal?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {validGoals.map(g => <button key={g} onClick={() => setGoal(g)} style={{ background: goal === g ? '#F5E642' : '#1a3050', color: goal === g ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 6, padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>{goalLabels[g]}</button>)}
              </div>
            </div>
          )}
          {rec && <div style={{ background: '#1a3050', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7 }}>📋 {rec}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>⚠️ DFW Permit Requirements</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>Structural wall removal requires permit in all DFW cities (Dallas, Plano, Frisco, McKinney, Allen, etc.). Non-structural partition additions typically require permit too. Unpermitted structural work creates title issues at resale and voids homeowner insurance claims. Always pull permits.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW Home Service Professionals
        </div>
      </div>
    </div>
  );
}