import { useState } from 'react';

const locations = [
  {
    name: 'Dallas (Inner Loop)',
    soil: 'Houston Black Clay (Blackland Prairie)',
    clay: 85,
    ph: 7.8,
    shrinkSwell: 'Extreme',
    organic: '1.5%',
    drainage: 'Poor — water pools 24–48 hrs after rain',
    notes: 'Pure Blackland Prairie clay. Expands 30% when wet, contracts violently in drought. Foundation movement is the #1 home issue.',
    systems: [
      { sys: '🏗️ Foundation', impact: 'Extreme seasonal movement. Pier-and-beam homes flex; slabs crack. Maintain consistent soil moisture year-round.' },
      { sys: '🌳 Landscaping', impact: 'Plants suffocate in waterlogged clay. Raised beds or heavily amended soil required.' },
      { sys: '🚰 Drainage', impact: 'Surface drainage critical — grade away from foundation minimum 6 inches over 10 feet.' },
      { sys: '🌿 Irrigation', impact: 'Deep watering 2x/week better than daily shallow. Clay retains water but can crack if too dry.' },
    ],
    amendments: ['Expanded shale (2–4 inches) for drainage', 'Compost + gypsum for pH correction', 'Never rototill when wet — destroys soil structure'],
  },
  {
    name: 'Plano / Allen',
    soil: 'Austin Chalk over Blackland Clay',
    clay: 70,
    ph: 7.9,
    shrinkSwell: 'High',
    organic: '1.2%',
    drainage: 'Moderate — chalk layer creates drainage barrier',
    notes: 'Shallow chalk bedrock (6–24 inches) under clay. Drilling for irrigation difficult. Trees struggle with shallow roots.',
    systems: [
      { sys: '🏗️ Foundation', impact: 'Chalk provides stability but clay above still moves. Post-tension slabs common.' },
      { sys: '🌳 Landscaping', impact: 'Tree roots spread laterally, not deep. Plant trees 20+ ft from foundation.' },
      { sys: '🚰 Drainage', impact: 'French drains may be needed where chalk creates perched water table.' },
      { sys: '💧 Irrigation', impact: 'Install shallow irrigation (3–4 inch heads) — deeper excavation hits rock.' },
    ],
    amendments: ['Organic compost to improve clay structure', 'Iron sulfate to lower pH for acid-loving plants', 'Raised bed gardens avoid chalk layer entirely'],
  },
  {
    name: 'Fort Worth (West)',
    soil: 'Sandy Loam / Mollisol',
    clay: 25,
    ph: 6.8,
    shrinkSwell: 'Low',
    organic: '2.8%',
    drainage: 'Good — drains within 4–6 hours',
    notes: 'West Fort Worth transitions from Blackland to sandy Cross Timbers soil. More forgiving for landscaping and drainage.',
    systems: [
      { sys: '🏗️ Foundation', impact: 'Lower shrink-swell risk than East DFW. Still recommend consistent moisture maintenance.' },
      { sys: '🌳 Landscaping', impact: 'Much broader plant palette. Native Cross Timbers plants thrive without amendment.' },
      { sys: '🚰 Drainage', impact: 'Natural drainage adequate for most homes. Minimal intervention needed.' },
      { sys: '🌿 Irrigation', impact: 'Sandy soil dries faster — may need 3x/week watering in summer.' },
    ],
    amendments: ['Mulch to retain moisture in sandy areas', 'Compost to improve nutrient retention', 'Minimal pH adjustment needed'],
  },
  {
    name: 'Frisco / McKinney',
    soil: 'Blackland Prairie (North variant)',
    clay: 78,
    ph: 7.6,
    shrinkSwell: 'High-Extreme',
    organic: '1.8%',
    drainage: 'Poor to Moderate',
    notes: 'New construction area with heavy Blackland clay. Many homes built 2000–2020 on minimally prepared lots.',
    systems: [
      { sys: '🏗️ Foundation', impact: 'Post-tension slabs standard in new builds. Monitor for cracks at doors/windows quarterly.' },
      { sys: '🌳 Landscaping', impact: 'Newly graded lots have compacted clay. Deep aeration before planting any grass.' },
      { sys: '🚰 Drainage', impact: 'Builder grading often inadequate. Have drainage professionally assessed first year.' },
      { sys: '🌿 Irrigation', impact: 'Smart irrigation controllers with rain sensors required to prevent over-saturation.' },
    ],
    amendments: ['Expanded shale (must be installed pre-plant)', 'Aerate lawn annually with hollow tines', 'Organic topdress yearly'],
  },
];

const getShrinkColor = (s: string) => {
  if (s === 'Low') return '#00e400';
  if (s === 'High') return '#ff7e00';
  return '#ff0000';
};

export default function DFWSoilCompositionGuide() {
  const [locIdx, setLocIdx] = useState(0);
  const loc = locations[locIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Guide</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>🌱 Soil Composition Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            DFW sits on Blackland Prairie — one of the most challenging soil environments for homeownership in the U.S.
            The heavy clay expands up to 30% when wet and contracts sharply in drought, driving foundation movement,
            drainage failures, and landscaping challenges unique to this region.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>⚡ Why Soil Matters for Every System in Your Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { icon: '🏗️', title: 'Foundation', detail: 'Clay movement cracks slabs and shifts piers — #1 repair cost in DFW' },
              { icon: '🌳', title: 'Landscaping', detail: 'Wrong plants die in months; clay drainage kills most standard species' },
              { icon: '🚰', title: 'Drainage', detail: 'Poor drainage causes flooding, foundation saturation, and erosion' },
              { icon: '💧', title: 'Irrigation', detail: 'Over-watering clay causes heave; under-watering causes shrink gaps' },
            ].map(f => (
              <div key={f.title} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 3 }}>{f.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{f.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', textTransform: 'uppercase', letterSpacing: 1 }}>📍 Select Your DFW Location</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {locations.map((l, i) => (
              <button key={l.name} onClick={() => setLocIdx(i)}
                style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: i === locIdx ? '2px solid #F5E642′ : '2px solid #2d4a7a', background: i === locIdx ? '#F5E642' : ’transparent', color: i === locIdx ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer', fontSize: '0.8rem' }}>
                {l.name}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{loc.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{loc.soil}</div>
              </div>
              <div style={{ background: getShrinkColor(loc.shrinkSwell), borderRadius: 8, padding: '0.4rem 0.8rem', color: '#000', fontWeight: 800, fontSize: '0.8rem' }}>
                {loc.shrinkSwell} Movement
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              {[
                { label: 'Clay %', val: `${loc.clay}%` },
                { label: 'Soil pH', val: loc.ph },
                { label: 'Organic', val: loc.organic },
                { label: 'Drainage', val: loc.drainage.split(' ')[0] },
              ].map(m => (
                <div key={m.label} style={{ background: '#0f1f3d', borderRadius: 6, padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{m.label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{m.val}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>{loc.notes}</div>
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
              {loc.systems.map(s => (
                <div key={s.sys} style={{ background: '#0f1f3d', borderRadius: 8, padding: '0.65rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.sys}: </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{s.impact}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #2d4a7a', paddingTop: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 Amendment Recommendations</div>
              {loc.amendments.map(a => <div key={a} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 3 }}>• {a}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
