import { useState } from 'react';

export default function DFWFoundationSoilShrink2026() {
  const [location, setLocation] = useState<string>('');
  const [trees, setTrees] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const locationOptions = [
    { label: 'Blackland Prairie core (Dallas, Plano, Richardson)', value: 'core' },
    { label: 'Transition zone (Frisco, McKinney, Allen)', value: 'transition' },
    { label: 'West DFW (Fort Worth, Arlington, Mansfield)', value: 'west' },
    { label: 'East DFW (Garland, Mesquite, Rowlett)', value: 'east' },
  ];
  const treeOptions = [
    { label: 'No large trees near foundation', value: 'none' },
    { label: '1-2 large trees within 20 feet', value: 'few' },
    { label: '3+ large trees or dense canopy within 20 feet', value: 'many' },
  ];

  const riskMap: Record<string, Record<string, string>> = {
    core: {
      none: 'HIGH BASE RISK. Blackland Prairie core clay can lose 20-30% volume in drought years. Without tree acceleration, expect 1-3 inches of potential settlement per drought cycle. Water your foundation perimeter consistently April through October.',
      few: 'HIGH-ELEVATED RISK. Core Blackland clay plus 1-2 large trees significantly accelerates drying radius (15-30 ft root zones). Expected shrinkage risk: 2-4 inches potential movement. Maintain soil moisture, consider root barriers.',
      many: 'SEVERE RISK. Dense tree coverage over Blackland Prairie clay is the top cause of DFW foundation failure. Root networks can dehydrate soil 40+ feet from trunk. Expect 3-6+ inches of differential settlement potential. Get an elevation survey now.',
    },
    transition: {
      none: 'MODERATE RISK. Transition zone soils are mixed — some Blackland clay, some sandier loam. Volume loss typically 10-20% in drought. Watering program recommended but risk is lower than core.',
      few: 'MODERATE-HIGH RISK. Tree root competition in transition soils still creates significant drying zones. 1-2 inch movement potential in drought years. Monitor for door/window sticking.',
      many: 'HIGH RISK. Even transition zone soils with heavy tree canopy show significant shrinkage. 2-4 inch movement potential. Root barriers and consistent watering strongly recommended.',
    },
    west: {
      none: 'LOWER-MODERATE RISK. West DFW soils trend sandier (Trinity and Woodbine formations). Less expansive than Blackland, but clay pockets still exist. Monitor low spots near roofline and grading.',
      few: 'MODERATE RISK. Sandy loam with trees still creates localized drying. 0.5-1.5 inch movement potential. Standard watering program usually sufficient.',
      many: 'MODERATE-HIGH RISK. Dense trees even in west DFW sandy soils create measurable drying zones. Get a baseline elevation survey and water regularly.',
    },
    east: {
      none: 'HIGH BASE RISK. East DFW (Garland, Mesquite, Rowlett) sits on heavy Blackland clay similar to core zone. 15-25% volume loss in drought. Consistent perimeter watering essential.',
      few: 'HIGH RISK. East DFW clay plus trees: same risk profile as core zone. 1.5-3.5 inch movement potential. Root barriers recommended for trees within 15 feet.',
      many: 'SEVERE RISK. East DFW homeowners with dense tree canopy are in the highest risk category alongside core Dallas. Proactive elevation monitoring and aggressive watering program required.',
    },
  };

  function evaluate() {
    if (!location || !trees) return;
    setResult(riskMap[location]?.[trees] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>DFW Expansive Clay Shrinkage Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Blackland Prairie clay loses 15-30% volume in drought — this is what causes foundation settlement. Understand your risk.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
          {[
            { emoji: '🌧️', label: 'Wet season', detail: 'Clay expands, foundation lifts slightly' },
            { emoji: '☀️', label: 'Dry season', detail: 'Clay shrinks, ground drops under foundation' },
            { emoji: '🌳', label: 'Tree roots', detail: 'Accelerate drying 15-40ft from trunk' },
            { emoji: '💧', label: 'Prevention', detail: 'Consistent moisture = minimal shrink cycle' },
          ].map((c) => (
            <div key={c.label} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>📍 Assess your shrinkage risk</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>DFW Location</div>
            <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#E8EDF4', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14 }}>
              <option value="">Select your area...</option>
              {locationOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Tree Coverage Near Foundation</div>
            <select value={trees} onChange={(e) => setTrees(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#E8EDF4', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14 }}>
              <option value="">Select tree coverage...</option>
              {treeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, width: '100%' }}>Assess My Risk</button>
          {result && (
            <div style={{ marginTop: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642', color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1a1a2e', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🏠 Home Health Vault</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Add your home to the Vault and get a permanent soil shrinkage risk profile with elevation monitoring history.</div>
        </div>
      </div>
    </div>
  );
}
