import { useState } from 'react';

const propertyTypes = [
  { id: 'equestrian', label: '🐴 Equestrian / Large Lot (2+ acres)', tips: ['Well and septic required for most Sunnyvale acreage — annual testing and pumping mandatory', 'Barn and outbuilding roofs: inspect after every storm, replace metal roofing screws every 10 years', 'Pasture fencing: wood fence posts at ground contact rot fastest — switch to steel post with wood rail', 'Gravel driveways on acreage: grade and repack annually to prevent washout ruts', 'Fire safety: maintain 30-foot clearance around all structures, equestrian properties face higher risk'] },
  { id: 'custom1970s', label: '🏠 1970s–1990s Custom Home', tips: ['Older custom homes often have non-standard materials — keep original blueprints for any contractor', 'Cast iron sewer lines in older Sunnyvale homes near end of life — camera scope before failures', 'Attic insulation likely R-11 to R-19 — add blown-in to R-38 minimum for DFW energy compliance', 'Original windows may be single-pane wood-frame — check for rot at sill and replace with vinyl', 'Septic systems: if original, may be under-sized by modern standards — evaluate capacity'] },
  { id: 'newer2000s', label: '🏡 2000s–2020s Custom Build', tips: ['Newer custom builds on acreage: verify all permits finalized — some custom work gets missed', 'Spray foam insulation in newer homes: inspect at 5-year mark for gaps at penetrations', 'Tankless water heater common in 2010s builds: descale annually with citric acid flush', 'Security system integration: acreage properties benefit from perimeter cameras and driveway sensors', 'Foundation on acreage: pier and beam common on uneven lots — inspect crawl space annually for moisture'] },
];

export default function DFWSunnyvaleHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1 }}>
          PROLNK · DFW LOCAL GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🌾 Sunnyvale TX Homeowner Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Sunnyvale is Dallas County's hidden gem — a small enclave between Garland and Mesquite
          known for large lots, equestrian properties, and a semi-rural feel just 20 minutes from
          downtown Dallas. Mix of 1970s homes and newer custom builds on multi-acre lots.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>📍 Sunnyvale Snapshot</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            ZIP code 75182 · Dallas County · Sunnyvale ISD · ~6,000 residents ·
            One of DFW's last remaining single-family-only large-lot municipalities ·
            Equestrian zoning allows horses on qualifying properties ·
            No apartment complexes by city ordinance
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#38bdf8' }}>💧 Well &amp; Septic Reality Check</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Many Sunnyvale properties outside city water service still rely on private wells and
            septic systems. Annual well water testing ($75–$150) and septic pumping ($350–$500
            every 3 years) are non-negotiable maintenance items that are often overlooked by
            homeowners coming from city utilities.
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
          Select your property type for a tailored maintenance guide:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {propertyTypes.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{
                background: selected === p.id ? '#F5E642' : '#0f2040',
                color: selected === p.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === p.id ? '#F5E642' : '#1e3a5f'),
                borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
              {active.label} — 2026 Maintenance Priorities
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.3rem' }}>Sunnyvale property owner? Find rural-capable pros</div>
          <div style={{ color: '#0A1628', fontSize: '0.85rem' }}>Well, septic, acreage, and equestrian specialists on ProLnk — serving 75182</div>
        </div>
      </div>
    </div>
  );
}