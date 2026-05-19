import { useState } from 'react';

export default function DFWRoofingDebrisGuide2026() {
  const [debrisType, setDebrisType] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const debrisTypes = [
    { value: 'oak-leaves', label: 'Oak Leaves (November DFW Drop)' },
    { value: 'pine-needles', label: 'Pine Needles (Cluster Pines)' },
    { value: 'cottonwood', label: 'Cottonwood Seeds (May)' },
    { value: 'mixed', label: 'Mixed Organic Debris' },
  ];

  const amounts = [
    { value: 'light', label: 'Light (visible but sparse)' },
    { value: 'moderate', label: 'Moderate (covering valleys)' },
    { value: 'heavy', label: 'Heavy (multiple inches deep)' },
  ];

  const getGuide = () => {
    if (!debrisType || !amount) return;
    const guides: Record<string, Record<string, string>> = {
      'oak-leaves': {
        'light': 'MONITOR: Light oak leaves blow off in next wind event. Check valleys and gutters after November rainstorm — leaves compact fast when wet.',
        'moderate': 'DIY CLEAN: Use leaf blower from ridge down — never blow upward under shingles. Clear valleys first (moisture trap). Schedule gutter cleaning within 1 week.',
        'heavy': 'PRO RECOMMENDED: Heavy oak accumulation in DFW valleys holds moisture for weeks. Premature granule loss starts within 1–2 seasons. Professional roof cleaning: $300–$700.',
      },
      'pine-needles': {
        'light': 'MONITOR MONTHLY: Pine needles slide off steep pitches but lodge in low-slope areas. Check after wind events — they accumulate faster than leaves in DFW cluster pine neighborhoods.',
        'moderate': 'CLEAN WITHIN 2 WEEKS: Pine needles hold moisture and are acidic. Prolonged contact accelerates shingle granule loss. Blower or soft-bristle brush, never pressure wash.',
        'heavy': 'PRO REQUIRED: Heavy pine needle mats hold moisture 24/7 even in DFW summer heat. Shingle damage can occur within 1 season. Consider trimming overhanging branches as long-term fix.',
      },
      'cottonwood': {
        'light': 'CLEAN AC FIRST: Even light cottonwood means your condenser needs immediate inspection. Light roof debris typically blows off — focus on gutters and AC unit.',
        'moderate': '1-WEEK WINDOW: Cottonwood seeds in roof valleys become seed + moisture mats when it rains. Clean before the next DFW May rain event. Gutters need same-day attention.',
        'heavy': 'IMMEDIATE ACTION: Heavy cottonwood on roof + May rains = accelerated granule loss within weeks. Clear roof, gutters, and AC condenser same day. Check attic vents for seed entry.',
      },
      'mixed': {
        'light': 'SCHEDULE SEASONAL CLEAN: Mixed debris is typical DFW seasonal accumulation. Annual professional roof cleaning before each DFW summer is best practice for longevity.',
        'moderate': 'CLEAN WITHIN 1 WEEK: Mixed debris in valleys creates moisture retention zones. Inspect for existing granule loss or soft spots while cleaning. Document with photos.',
        'heavy': 'PRO + INSPECTION: Heavy mixed debris warrants a full roof inspection during cleaning. Check for shingle damage, flashing gaps, and valley wear. Cost: $400–$900 for clean + inspect.',
      },
    };
    setResult(guides[debrisType]?.[amount] || 'No guide found for this combination.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          🍂 Roof Debris Management Guide
        </h1>
        <p style={{ color: '#9BAEC8', marginBottom: '28px', lineHeight: 1.6 }}>
          DFW has <strong style={{ color: '#F5E642′ }}>three distinct debris seasons</strong>: November oak leaf drop, May cottonwood seed blizzard, and year-round pine needle accumulation. Each type damages shingles differently — management strategy depends on debris type AND volume.
        </p>

        {[
          { icon: '🍂', title: 'November Oak Leaf Drop', desc: 'DFW live oaks drop late (November–December) and heavily. Leaves in roof valleys trap moisture for weeks — DFW’s remaining mild temps keep them damp, accelerating granule loss.' },
          { icon: '🌲', title: 'Cluster Pine Needles', desc: 'Loblolly and shortleaf pines are common in DFW older neighborhoods. Needles are acidic and lodge in valleys year-round. Properties with overhanging branches need semi-annual cleaning.' },
          { icon: '❄️', title: 'Cottonwood Seeds (May)', desc: 'Unique to DFW’s creek corridors. Seeds look like snow but compact into moisture-holding mats when wet. Most time-sensitive of all DFW roof debris — act within days, not weeks.' },
          { icon: '⚠️', title: 'Granule Loss Warning', desc: 'Debris-induced granule loss voids most DFW shingle warranties. Document roof condition annually. Granule loss in gutters = sign debris has been sitting too long on your roof.' },
        ].map((item) => (
          <div key={item.title} style={{ backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', marginBottom: '12px', borderLeft: '3px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.icon} {item.title}</div>
            <div style={{ color: '#9BAEC8', fontSize: '14px' }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#111D35', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
          <div style={{ fontWeight: 700, marginBottom: '16px', color: '#F5E642′ }}>🍂 Debris Type + Amount → Management Guide</div>
          <select
            value={debrisType}
            onChange={(e) => { setDebrisType(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #2A3F6F', marginBottom: '10px', fontSize: '15px' }}
          >
            <option value="">Select debris type...</option>
            {debrisTypes.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
          <select
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #2A3F6F', marginBottom: '12px', fontSize: '15px' }}
          >
            <option value="">Select debris amount...</option>
            {amounts.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
          <button
            onClick={getGuide}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            Get Management Guide
          </button>
          {result && (
            <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#E8EDF5', lineHeight: 1.6, fontSize: '14px' }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

