import { useState } from 'react';

export default function DFWTreeRootIntrusion2026() {
  const [intrusionType, setIntrusionType] = useState('sewer');

  const assessments: Record<string, { risk: string; action: string; remove: string }> = {
    sewer: {
      risk: 'HIGH — Most common tree-infrastructure conflict in DFW. Clay pipes from pre-1980s construction are most vulnerable. Roots enter at joints and grow explosively inside pipes.',
      action: '1. Camera inspection first ($150-300). 2. Hydro-jet cleaning if roots present. 3. Pipe lining (cured-in-place) if structurally sound. 4. Full replacement if pipe is collapsed. Do NOT ignore — full backup possible.',
      remove: 'Consider removal if tree is within 10ft of main sewer line AND pipes are old clay. Silver Maples, Willows, and Cottonwoods are highest risk in DFW. Live Oaks are lower risk.',
    },
    water: {
      risk: 'MODERATE — Water line intrusion less common than sewer (pressurized lines resist roots better). Risk spikes at junction points and older copper/clay connections.',
      action: '1. Unexplained water bill spike = possible sign. 2. Locate line with utility mark-out. 3. Inspect junction points near large trees. 4. HDPE replacement lines are root-resistant.',
      remove: 'Removal rarely needed for water lines alone. Root barriers during planting prevent future issues. Address the line before the tree in most cases.',
    },
    foundation: {
      risk: 'LOW-MODERATE — Overblown fear in DFW. Roots do NOT push through concrete. They grow where moisture is, and foundations are waterproofed. Real risk: roots draw moisture from expansive clay soil, causing differential settlement.',
      action: '1. Keep trees 20ft from foundation (Live Oak), 15ft (Cedar Elm). 2. Maintain consistent soil moisture around perimeter during drought. 3. Install root barriers at planting for new trees.',
      remove: 'Removal justified if: tree is within 10ft of foundation AND you have active settlement cracks AND soil is highly expansive clay. Get structural engineer opinion before removing.',
    },
    driveway: {
      risk: 'MODERATE — Visible and frustrating but rarely a safety issue. Surface heaving from large surface roots. Common with large Oaks, Pecans, and Silver Maples over concrete.',
      action: '1. Root pruning 18-24 inches deep along driveway edge (hire arborist — improper cuts can destabilize tree). 2. Flexible paving materials (pavers, asphalt) tolerate roots better than concrete. 3. Add expansion joints in concrete to accommodate movement.',
      remove: 'Rarely worth removing a healthy mature tree for driveway heaving. Repair cost ($2-5K) is far less than tree removal ($1-5K) plus the loss of a mature tree.',
    },
  };

  const data = assessments[intrusionType];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🌱</div>
        <h1 style={{ fontSize: '2rem', color: '#F5E642', marginBottom: '.5rem' }}>DFW Tree Root Intrusion Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>When DFW trees attack your infrastructure — and when the fear is overblown.</p>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Select Intrusion Type</h2>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[{ v: 'sewer', l: '🚽 Sewer Line' }, { v: 'water', l: '💧 Water Line' }, { v: 'foundation', l: '🏠 Foundation' }, { v: 'driveway', l: '🚗 Driveway' }].map(t => (
              <button key={t.v} onClick={() => setIntrusionType(t.v)} style={{ padding: '.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: intrusionType === t.v ? '#F5E642' : '#334155', color: intrusionType === t.v ? '#0A1628' : '#fff', fontWeight: 600 }}>{t.l}</button>
            ))}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.25rem' }}>⚠️ Risk Level</div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#e2e8f0' }}>{data.risk}</div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.25rem' }}>🛠️ Action Plan</div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#e2e8f0' }}>{data.action}</div>
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.25rem' }}>🌳 Remove the Tree?</div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#e2e8f0' }}>{data.remove}</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🔗</div>
          <p style={{ color: '#0A1628', fontWeight: 700, margin: 0 }}>ProLnk connects DFW homeowners with licensed arborists and plumbers who specialize in root intrusion assessment and remediation.</p>
        </div>
      </div>
    </div>
  );
}
