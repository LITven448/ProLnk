import { useState } from 'react';

const areas = ['North DFW (Plano, Frisco, McKinney)', 'East DFW (Garland, Mesquite, Rockwall)', 'South DFW (Cedar Hill, Mansfield, Burleson)', 'West DFW (Fort Worth, Arlington, Weatherford)', 'Urban Core (Dallas, Irving, Grand Prairie)'];

const decades = [
  {
    label: '1960s–1970s',
    range: '1960s–1970s',
    status: '🟠 High Monitoring Need',
    design: 'Conventional slab-on-grade — typically no post-tension cables, poured with basic engineering',
    issues: [
      'Settlement and differential movement from DFW expansive clay (Blackland Prairie)',
      'Perimeter beam erosion from decades of irrigation cycles',
      'No moisture barrier under slab in most builds',
      'Tree root interference common in established neighborhoods',
      'Pier and beam (crawl space) foundations also common — different failure modes',
    ],
    monitoring: [
      'Annual elevation survey with a level or pro survey',
      'Door and window sticking patterns (early warning)',
      'Interior drywall cracks at corners and over openings',
      'Exterior brick cracks — stair-step pattern indicates movement',
      'Soil moisture consistency around perimeter (avoid drought-wet cycles)',
    ],
    budget: '$3,000–$25,000 for pier underpinning; $500–$2,000/year for maintenance',
    note: 'Conventional slabs have no internal cable system to resist movement. Movement is cumulative over decades. Ask for prior foundation repair history — this is a major disclosure item in Texas.',
  },
  {
    label: '1980s–1990s',
    range: '1980s–1990s',
    status: '🟡 Post-Tension Era',
    design: 'Post-tension cable slab — cables stressed after pour to resist movement. Became standard in DFW by mid-1980s.',
    issues: [
      'Cable corrosion if moisture barrier failed or slab cracked',
      'Cable anchor pocket damage at slab perimeter',
      'Movement still possible — PT reduces but does not eliminate it',
      'Cutting a PT cable during renovation = major structural event',
      'Slab plumbing leaks more common (cast iron transitioning to PVC)',
    ],
    monitoring: [
      'Inspect cable anchor pockets at perimeter — look for rust staining',
      'Slab plumbing leak detection (electronic listening recommended every 5 years)',
      'Standard crack and door/window monitoring',
      'Verify "Do Not Cut" warning stamps on slab edge before any work',
    ],
    budget: '$2,500–$15,000 for repairs; $8,000–$30,000 for major events',
    note: 'Post-tension slabs are generally superior in DFW clay but require specialized contractors. Never allow a general contractor to saw-cut a PT slab without X-ray or GPR to locate cables.',
  },
  {
    label: '2000s–2010s',
    range: '2000s–2010s',
    status: '🟢 Modern Engineering',
    design: 'Engineered PT slab with geotechnical report — designed for site-specific soil conditions',
    issues: [
      'Clay shrinkage during drought years still causes movement',
      'Irrigation system design critical — uniform moisture maintenance',
      'Slab plumbing in PVC — lower leak risk but still monitor',
      'Builder grade workmanship varies significantly by developer',
    ],
    monitoring: [
      'Quarterly perimeter moisture checks during DFW droughts',
      'Annual interior elevation check for new homes in first 5 years',
      'Monitor for shrinkage cracks in drywall during first 2–3 years (normal settling)',
      'Root barriers around large trees within 20 feet of foundation',
    ],
    budget: '$500–$5,000 for minor adjustments; larger repairs uncommon in this era',
    note: 'DFW\’s 2022–2023 drought years caused significant foundation movement even in newer homes. Consistent perimeter irrigation is the best preventive investment.',
  },
  {
    label: '2010s–Present',
    range: '2010s–Present',
    status: '✅ Best Engineering',
    design: 'Advanced PT slab with site-specific geotechnical engineering, moisture barriers, root control',
    issues: [
      'Initial settling in first 3–5 years is normal — minor cracks expected',
      'Irrigation system setup and maintenance is critical',
      'Verify warranty: most builders offer 10-year structural warranty',
      'HOA grading standards compliance',
    ],
    monitoring: [
      'Builder warranty claim window — document any cracks immediately',
      'Irrigation system commissioning and seasonal adjustment',
      'Grade maintenance around perimeter — soil should slope away at 6 inches per 10 feet',
      'Root barriers around trees planted near home',
    ],
    budget: '$0–$2,000 maintenance; warranty should cover structural defects',
    note: 'File warranty claims in writing with photos. Texas law provides specific foundation warranty protections. Document everything from day one.',
  },
];

export default function DFWFoundationDecadeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [area, setArea] = useState<number>(0);
  const active = selected !== null ? decades[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏗️ DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Foundation by Decade Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, fontSize: 15 }}>DFW's expansive Blackland Prairie clay makes foundation health the most critical home system. Select your decade and area.</p>
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>📍 Your DFW Area:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {areas.map((a, i) => (
              <button key={i} onClick={() => setArea(i)}
                style={{ padding: '8px 14px', borderRadius: 6, border: `2px solid ${area === i ? '#F5E642' : '#1E3A5F'}`, background: area === i ? '#1E3A5F' : '#0F2645', color: area === i ? '#F5E642′ : '#94A3B8', fontWeight: 600, cursor: ’pointer', fontSize: 12 }}>
                {a}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          {decades.map((d, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, background: selected === i ? '#F5E642′ : '#0F2645', color: selected === i ? '#0A1628' : '#E8EAF0', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>
              {d.label}
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: '#0F2645', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{active.range} Homes</div>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>📍 {areas[area]}</div>
            <div style={{ fontSize: 18, marginBottom: 12 }}>{active.status}</div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Foundation Design: </span>{active.design}</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ Common Issues for This Era:</div>
              {active.issues.map((item, i) => <div key={i} style={{ marginBottom: 4, paddingLeft: 12 }}>• {item}</div>)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔍 Monitoring Recommendations:</div>
              {active.monitoring.map((item, i) => <div key={i} style={{ marginBottom: 4, paddingLeft: 12 }}>• {item}</div>)}
            </div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Budget Range: </span>{active.budget}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, fontSize: 14, color: '#94A3B8′ }}>{active.note}</div>
          </div>
        )}
        {!active && <div style={{ color: '#4A6080', textAlign: 'center', padding: 40, fontSize: 16 }}>👆 Select a decade above to see your foundation profile</div>}
      </div>
    </div>
  );
}
