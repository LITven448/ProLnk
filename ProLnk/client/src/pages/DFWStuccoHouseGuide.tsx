import { useState } from 'react';

const stuccoTypes = ['Hard Coat (3-Coat)', 'EIFS (Synthetic)', 'One-Coat', 'Unknown'];
const ageOptions = ['Under 5 Years', '5–15 Years', '16–25 Years', '25+ Years'];
const issues = ['Surface Cracks', 'Moisture Intrusion', 'UV Fading/Chalking', 'Delamination', 'Impact Damage'];

const matrix: Record<string, Record<string, { guide: string; approach: string; cost: string }>> = {
  'Hard Coat (3-Coat)': {
    'Under 5 Years': { guide: 'New hard coat — inspect for shrinkage cracks at control joints', approach: 'Flexible caulk at joints + paint', cost: '$200–$600' },
    '5–15 Years': { guide: 'Prime maintenance window — seal and repaint before moisture intrusion', approach: 'Elastomeric paint + crack repair', cost: '$600–$2,000' },
    '16–25 Years': { guide: 'DFW UV has degraded surface — waterproofing essential', approach: 'Full repaint + recoat with elastomeric', cost: '$1,500–$4,000' },
    '25+ Years': { guide: 'Evaluate structural integrity — partial or full re-stucco may be needed', approach: 'Professional assessment + potential re-stucco', cost: '$3,000–$12,000' },
  },
  'EIFS (Synthetic)': {
    'Under 5 Years': { guide: 'EIFS requires caulk maintenance at all joints and penetrations', approach: 'Inspect and re-caulk all transitions', cost: '$300–$800' },
    '5–15 Years': { guide: 'DFW thermal movement is stressing EIFS seams — re-caulk critical', approach: 'Full joint re-caulking + inspection', cost: '$800–$2,500' },
    '16–25 Years': { guide: 'High moisture intrusion risk — probe for soft spots in foam', approach: 'Probe testing + targeted replacement', cost: '$2,000–$6,000' },
    '25+ Years': { guide: 'EIFS at end of life in DFW climate — removal recommended', approach: 'Remove EIFS + replace with hard coat or fiber cement', cost: '$8,000–$25,000' },
  },
  'One-Coat': {
    'Under 5 Years': { guide: 'One-coat performs well early — control joint inspection key', approach: 'Control joint caulk + monitor', cost: '$150–$400' },
    '5–15 Years': { guide: 'DFW UV fading accelerates on one-coat — repaint on schedule', approach: 'Repaint + elastomeric top coat', cost: '$800–$2,200' },
    '16–25 Years': { guide: 'Cracking and porosity increasing — waterproofing needed', approach: 'Crack repair + waterproof coating', cost: '$1,200–$3,500' },
    '25+ Years': { guide: 'One-coat at end of serviceable life — re-stucco or reside', approach: 'Full re-stucco or fiber cement replacement', cost: '$4,000–$15,000' },
  },
  'Unknown': {
    'Under 5 Years': { guide: 'Identify system before treatment — probe and tap test recommended', approach: 'Professional assessment first', cost: '$200–$500' },
    '5–15 Years': { guide: 'Type identification important for correct repair approach', approach: 'Assessment + targeted repair', cost: '$500–$2,000' },
    '16–25 Years': { guide: 'Age and unknown type = higher risk — full assessment needed', approach: 'Professional inspection + plan', cost: '$800–$3,000' },
    '25+ Years': { guide: 'Significant maintenance overdue — complete evaluation essential', approach: 'Full evaluation + likely re-stucco', cost: '$3,000–$15,000' },
  },
};

export default function DFWStuccoHouseGuide() {
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const result = type && age ? matrix[type]?.[age] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME MATERIALS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏠 Stucco House Guide — DFW</h1>
        <p style={{ color: '#9BA3B5', fontSize: 15, marginBottom: 32 }}>Stucco is popular in DFW luxury homes and ranch-style properties. DFW's extreme temperature swings (20°F to 110°F+) and UV intensity create unique stucco maintenance challenges.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
          {[
            { icon: '🌡️', label: 'Thermal Movement', text: 'DFW temps swing 90°F+ annually — cracks at control joints are common' },
            { icon: '☀️', label: 'UV Degradation', text: 'DFW UV index is among highest in Texas — pigment fades 2x faster than northern US' },
            { icon: '💧', label: 'Moisture Intrusion', text: 'Stucco without proper flashing allows DFW rain infiltration behind the system' },
          ].map(card => (
            <div key={card.label} style={{ background: '#111D35', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{card.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: 12 }}>{card.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📊 DFW Stucco System Comparison</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: '#0A1628', borderRadius: 8, overflow: 'hidden' }}>
            {['System', 'DFW Rating', 'Lifespan'].map(h => <div key={h} style={{ background: '#1E3A5F', padding: '10px 14px', fontSize: 12, fontWeight: 700, color: '#9BA3B5' }}>{h}</div>)}
            {[['Hard Coat 3-Coat', '⭐⭐⭐⭐⭐', '30–50 yrs'], ['One-Coat', '⭐⭐⭐⭐', '20–35 yrs'], ['EIFS Synthetic', '⭐⭐⭐', '15–25 yrs']].map(row => row.map((cell, i) => <div key={`${row[0]}-${i}`} style={{ background: '#111D35', padding: '10px 14px', fontSize: 13 }}>{cell}</div>))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 Stucco Maintenance Advisor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>STUCCO TYPE</label>
              <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select type...</option>
                {stuccoTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>AGE OF STUCCO</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select age...</option>
                {ageOptions.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>MAINTENANCE GUIDE</div>
              <p style={{ marginBottom: 12, fontSize: 14 }}>{result.guide}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>REPAIR APPROACH</div><div style={{ fontSize: 14 }}>{result.approach}</div></div>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>ESTIMATED COST</div><div style={{ fontSize: 14, color: '#F5E642' }}>{result.cost}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 DFW Stucco Annual Maintenance</div>
          {['Inspect all control joints and caulk annually (spring)', 'Check flashing at windows, doors, and roof transitions', 'Repaint with elastomeric paint every 5–8 years in DFW sun', 'Address hairline cracks before monsoon season (June)', 'Check south and west faces quarterly for UV chalking'].map(item => (
            <div key={item} style={{ color: '#9BA3B5', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1E3A5F' }}>✓ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
