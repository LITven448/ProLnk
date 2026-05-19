import { useState } from 'react';

const communityTypes = ['New Construction (<5 yrs)', 'Established Master-Planned', 'Near Development Pond', 'Golf Course Community'];
const detectedPests = ['Fire Ants', 'Mosquitoes', 'Termites', 'Roaches / General', 'Multiple Pests'];

type PestResult = { plan: string; frequency: string; cost: string; note: string };

const matrix: Record<string, Record<string, PestResult>> = {
  'New Construction (<5 yrs)': {
    'Fire Ants': { plan: 'Broadcast bait + mound treatment on all disturbed lots', frequency: 'Quarterly', cost: '$180 – $280/yr', note: '🐜 Fire ant colonies migrate into new construction lots aggressively during first 3 years.' },
    'Mosquitoes': { plan: 'Barrier spray program targeting turf and landscape beds', frequency: 'Monthly Apr–Oct', cost: '$420 – $680/yr', note: '🦟 New lots lack mature trees but standing water in grading = early mosquito habitat.' },
    'Termites': { plan: 'Pre-construction soil treatment + annual monitoring', frequency: 'Annual inspection', cost: '$400 – $800 initial', note: '🐛 Subterranean termites are endemic in North Texas. Pre-treat during construction if possible.' },
    'Roaches / General': { plan: 'Interior + exterior perimeter treatment with exclusion', frequency: 'Bi-monthly', cost: '$320 – $480/yr', note: '🪲 New construction gaps in exterior sealing allow rapid indoor infestation.' },
    'Multiple Pests': { plan: 'Full integrated pest management (IPM) program', frequency: 'Monthly', cost: '$600 – $960/yr', note: '🛡️ New lots with multiple pest pressure benefit most from monthly bundled service.' },
  },
  'Established Master-Planned': {
    'Fire Ants': { plan: 'Community-edge barrier treatment + mound spot-control', frequency: 'Bi-annual', cost: '$200 – $320/yr', note: '🐜 HOA coordination for community-wide fire ant programs saves 30–40% per home.' },
    'Mosquitoes': { plan: 'Barrier spray + In2Care station near water features', frequency: 'Monthly Apr–Oct', cost: '$380 – $620/yr', note: '🦟 Mature landscaping harbors adult mosquitoes. In2Care stations target larvae in water features.' },
    'Termites': { plan: 'Sentricon Always Active termite baiting system', frequency: 'Annual inspection', cost: '$300 – $500/yr', note: '🐛 Baiting systems are less disruptive than liquid barriers in established landscape.' },
    'Roaches / General': { plan: 'Exterior perimeter granule + interior gel bait program', frequency: 'Quarterly', cost: '$280 – $420/yr', note: '🪲 German cockroach pressure increases near Frisco restaurant corridors.' },
    'Multiple Pests': { plan: 'Quarterly bundled IPM with seasonal add-ons', frequency: 'Quarterly + seasonal', cost: '$480 – $780/yr', note: '🛡️ Bundle discount typically available from Frisco pest companies for multi-pest agreements.' },
  },
  'Near Development Pond': {
    'Fire Ants': { plan: 'Pond-edge broadcast bait — water-safe formulation required', frequency: 'Tri-annual', cost: '$220 – $360/yr', note: '🐜 Fire ants nest densely along pond berms in Frisco master-planned communities.' },
    'Mosquitoes': { plan: 'BTI larvicide in water + adult barrier spray intensive', frequency: 'Monthly Mar–Nov', cost: '$520 – $840/yr', note: '🦟 Pond proximity doubles mosquito pressure. BTI larvicide is the key intervention.' },
    'Termites': { plan: 'Liquid barrier on pond-side foundation + bait stations', frequency: 'Annual inspection', cost: '$450 – $750 initial', note: '🐛 High moisture from ponds accelerates termite activity on adjacent foundations.' },
    'Roaches / General': { plan: 'Moisture reduction + perimeter granule program', frequency: 'Bi-monthly', cost: '$360 – $560/yr', note: '🪲 Pond proximity = high moisture = American cockroach pressure near foundations.' },
    'Multiple Pests': { plan: 'Intensive monthly IPM — pond-adjacency protocol', frequency: 'Monthly', cost: '$720 – $1,080/yr', note: '🛡️ Pond properties in Frisco are highest-intensity pest environments. Monthly service is optimal.' },
  },
  'Golf Course Community': {
    'Fire Ants': { plan: 'Golf-safe broadcast bait (coordinate with course)', frequency: 'Quarterly', cost: '$240 – $400/yr', note: '🐜 Course-adjacent treatment requires golf-safe products. Confirm with your pest company.' },
    'Mosquitoes': { plan: 'Barrier spray targeting tree lines + landscape beds', frequency: 'Monthly Apr–Oct', cost: '$460 – $740/yr', note: '🦟 Mature course tree lines provide dense resting habitat for adult mosquitoes.' },
    'Termites': { plan: 'Sentricon or Altriset liquid (low-odor for HOA compliance)', frequency: 'Annual inspection', cost: '$380 – $600/yr', note: '🐛 Golf course communities often have HOA aesthetic requirements for treatment methods.' },
    'Roaches / General': { plan: 'Exterior focus — perimeter granule + crack-and-crevice', frequency: 'Quarterly', cost: '$300 – $460/yr', note: '🪲 Course proximity means occasional wildlife/roach pressure from wooded buffers.' },
    'Multiple Pests': { plan: 'Premium quarterly IPM with monthly mosquito add-on', frequency: 'Quarterly + monthly mosquito', cost: '$660 – $1,020/yr', note: '🛡️ Golf course community pest programs are well-suited to bundled annual contracts.' },
  },
};

export default function DFWPestControlFrisco() {
  const [community, setCommunity] = useState('');
  const [pest, setPest] = useState('');

  const result = community && pest ? matrix[community]?.[pest] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🐜 ProLnk · Frisco TX
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>Frisco TX Pest Control</h1>
        <p style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>Master-Planned Community Specialists</p>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 40, maxWidth: 640 }}>
          Frisco's explosive growth has created a perfect pest storm — fire ants colonizing new construction lots, mosquitoes breeding in retention ponds, and termites thriving in North Texas clay. Master-planned community pest control requires a specialized approach.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          {[
            ['🐜', 'Fire Ant Capital', 'New construction in Frisco disrupts fire ant colonies, triggering aggressive recolonization throughout new-build neighborhoods.'],
            ['🦟', 'Development Pond Mosquitoes', 'Every master-planned community pond is a mosquito breeding ground. Larvicide programs are essential near water.'],
            ['🐛', 'Termite Endemic Zone', 'Frisco sits squarely in North Texas\’s high termite pressure zone. Pre-treatment during construction is strongly advised.'],
            ['🏘️', 'HOA Coordination', 'Top Frisco pest companies coordinate community-wide programs that reduce per-home cost by 30–40%.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111e35', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🛡️ Frisco Pest Treatment Planner</h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Your community type?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {communityTypes.map(c => (
                <button key={c} onClick={() => setCommunity(c)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: community === c ? '#F5E642′ : '#1e3a5f', backgroundColor: community === c ? '#F5E642' : ’transparent', color: community === c ? '#0A1628′ : '#fff', fontWeight: community === c ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{c}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Pest detected?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {detectedPests.map(p => (
                <button key={p} onClick={() => setPest(p)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: pest === p ? '#F5E642′ : '#1e3a5f', backgroundColor: pest === p ? '#F5E642' : ’transparent', color: pest === p ? '#0A1628′ : '#fff', fontWeight: pest === p ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{p}</button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Recommended Plan: {result.plan}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>Service Frequency: {result.frequency}</div>
              <div style={{ color: '#94a3b8', marginBottom: 16, fontSize: 13 }}>{result.note}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>Estimated Annual Cost</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.cost}</div>
                </div>
                <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15 }}>Get Pest Quotes →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          ProLnk connects Frisco homeowners with licensed pest control specialists who know master-planned communities.
        </div>
      </div>
    </div>
  );
}
