import { useState } from 'react';

const warrantyTypes = [
  {
    id: 'manufacturer_limited',
    label: '📄 Manufacturer Limited',
    program: 'Standard (no installer program)',
    duration: '25–30 years',
    coverage: [
      'Manufacturing defects in shingles',
      'Granule loss beyond normal wear',
      'Shingle splitting or cracking from defect',
    ],
    exclusions: [
      'Improper installation (your roofer\’s fault, not manufacturer\’s)',
      'Acts of God — wind, hail, lightning',
      'Damage from walking on roof without protection',
      'Improper attic ventilation — voids immediately',
      'Any modification by unlicensed contractor',
    ],
    dfwNote: 'DFW\’s extreme UV and heat (120°F+ attic temps) accelerate shingle aging. Manufacturer warranties are prorated — 30-year warranty pays about 10% of cost in year 25.',
    transferable: 'Sometimes — usually one transfer, often $100–$150 fee',
  },
  {
    id: 'workmanship',
    label: '🔨 Workmanship Warranty',
    program: 'From your contractor directly',
    duration: '1–10 years (varies widely)',
    coverage: [
      'Leaks caused by improper flashing installation',
      'Nail pattern errors causing blow-off',
      'Improper underlayment application',
      'Valley and ridge cap installation failures',
    ],
    exclusions: [
      'Storm damage (covered by insurance, not workmanship)',
      'Clogged gutters causing backup into roof',
      'Damage from HVAC equipment on roof',
      'Contractor goes out of business — warranty worthless',
    ],
    dfwNote: 'Storm chasers offer lifetime workmanship warranties they know they\’ll never honor. A 5-year warranty from a 20-year DFW company beats a lifetime from a storm chaser.',
    transferable: 'Rarely — dies when contractor goes out of business',
  },
  {
    id: 'gaf_system_plus',
    label: '🏆 GAF System Plus',
    program: 'GAF Certified Contractor Required',
    duration: 'Up to 50 years non-prorated',
    coverage: [
      'Full system: shingles, underlayment, ridge cap, starter strip, ventilation',
      'Covers both manufacturing defects AND workmanship errors',
      'Wind coverage up to 130 mph',
      'Algae resistance (10 years)',
    ],
    exclusions: [
      'Only available when all 4 GAF "System Components" are used',
      'Must be installed by a GAF Certified Contractor',
      'Requires proper attic ventilation verified at install',
      'Hail exclusion applies — check policy for Class 4 IR exceptions',
    ],
    dfwNote: 'Best overall protection for DFW. The 130 mph wind coverage matters — DFW regularly sees 70-80 mph gusts. Non-prorated means full replacement value throughout warranty period.',
    transferable: 'Yes — fully transferable once for free',
  },
  {
    id: 'oc_platinum',
    label: '🥇 Owens Corning Platinum',
    program: 'OC Preferred Contractor Required',
    duration: 'Lifetime non-prorated',
    coverage: [
      'TotalProtection® Roofing System coverage',
      'Both materials AND workmanship defects',
      'Wind coverage up to 130 mph',
      'Backed by OC corporate guarantee, not just local contractor',
    ],
    exclusions: [
      'System must use OC Duration shingles + WeatherLock underlayment + VentSure ventilation',
      'Must be OC Preferred Contractor installation',
      'Excludes hail damage (separate rider available in some markets)',
      'Voids if ventilation requirements not met per code',
    ],
    dfwNote: 'OC Platinum\’s corporate backing is a key advantage — if your installer goes out of business, OC still honors the warranty. Worth the premium for DFW homeowners planning to sell.',
    transferable: 'Yes — one transfer, free of charge',
  },
];

const voidReasons = [
  { icon: '💨', title: 'Improper Ventilation', desc: 'DFW attics need 1 sq ft of ventilation per 150 sq ft. Too little traps heat and moisture, destroying shingles from below. Most warranty voids trace back here.' },
  { icon: '🚶', title: 'Walking Damage', desc: 'HVAC technicians, solar installers, or satellite dish crews walking a roof without proper footwear and protection can crack shingles and void warranties without visible exterior damage.' },
  { icon: '☀️', title: 'Adding Solar Incorrectly', desc: 'Penetrating the roof deck for solar mounts without re-flashing and coordinating with your roofer voids both workmanship and manufacturer warranties.' },
  { icon: '🧹', title: 'Pressure Washing', desc: 'Power washing removes granules — your shingles\’ UV protection. Even one cleaning can accelerate aging by 5-10 years and void algae warranty clauses.' },
];

export default function DFWRoofingWarrantyGuide() {
  const [selected, setSelected] = useState<string>('gaf_system_plus');

  const w = warrantyTypes.find(x => x.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW WARRANTY GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          DFW Roofing Warranties Explained
        </h1>
        <p style={{ color: '#9AA3B4', fontSize: 16, marginBottom: 32 }}>
          Not all roofing warranties are equal. DFW's heat, UV, and hail environment exposes gaps in standard coverage that homeowners rarely discover until it’s too late.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {warrantyTypes.map(w => (
            <button key={w.id} onClick={() => setSelected(w.id)} style={{
              padding: '10px 16px', borderRadius: 10, border: selected === w.id ? '2px solid #F5E642′ : '2px solid #1E2D45',
              background: selected === w.id ? '#F5E642′ : '#111E33',
              color: selected === w.id ? '#0A1628′ : '#9AA3B4', fontWeight: 700, fontSize: 13, cursor: ’pointer',
            }}>{w.label}</button>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 16, padding: 26, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <div>
              <h2 style={{ color: '#F5E642', fontWeight: 700, fontSize: 22, marginBottom: 4 }}>{w.label}</h2>
              <div style={{ color: '#6B7A99', fontSize: 14 }}>Program: {w.program}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#6B7A99′ }}>DURATION</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#4ADE80′ }}>{w.duration}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <h4 style={{ color: '#4ADE80', fontWeight: 700, marginBottom: 10 }}>✅ What's Covered</h4>
              {w.coverage.map(c => (
                <div key={c} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: '#4ADE80', flexShrink: 0 }}>•</span>
                  <span style={{ color: '#C5CAD8', fontSize: 14 }}>{c}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ color: '#F87171', fontWeight: 700, marginBottom: 10 }}>❌ Common Exclusions</h4>
              {w.exclusions.map(e => (
                <div key={e} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: '#F87171', flexShrink: 0 }}>•</span>
                  <span style={{ color: '#C5CAD8', fontSize: 14 }}>{e}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#0D1E35', border: '1px solid #1E3A5C', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <span style={{ color: '#60A5FA', fontWeight: 700 }}>🌡️ DFW Context: </span>
            <span style={{ color: '#C5CAD8', fontSize: 14 }}>{w.dfwNote}</span>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '10px 16px' }}>
            <span style={{ color: '#A78BFA', fontWeight: 700 }}>🔄 Transferable: </span>
            <span style={{ color: '#C5CAD8', fontSize: 14 }}>{w.transferable}</span>
          </div>
        </div>

        <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>⚠️ Top Ways DFW Homeowners Void Their Warranty</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          {voidReasons.map(v => (
            <div key={v.title} style={{ background: '#111E33', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{v.icon}</div>
              <div style={{ color: '#FBBF24', fontWeight: 700, marginBottom: 6 }}>{v.title}</div>
              <div style={{ color: '#9AA3B4', fontSize: 13, lineHeight: 1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 20px', background: '#111E33', borderRadius: 12, borderLeft: '4px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>Bottom Line:</strong>
          <span style={{ color: '#9AA3B4', marginLeft: 8 }}>
            In DFW, a GAF System Plus or OC Platinum warranty from a certified local contractor is worth 10-15% extra upfront — both have corporate backing and survive contractor bankruptcy. Read every exclusion before signing.
          </span>
        </div>
      </div>
    </div>
  );
}
