import { useState } from 'react';

export default function DFWTexasElmGuide2026() {
  const [shadeGoal, setShadeGoal] = useState('cooling');
  const [lotSize, setLotSize] = useState('medium');

  const placements: Record<string, Record<string, string>> = {
    cooling: {
      small: 'Plant 1 Cedar Elm on SW corner — 15ft from foundation, shade hits peak mid-afternoon. One tree can drop AC load 15-20%.',
      medium: 'Plant 2 Cedar Elms: SW corner + due West. Space 30ft apart. Combined canopy covers 80% of west-facing wall by year 8.',
      large: '3-tree arc: SW, W, NW. Creates full afternoon shade envelope. 30% AC reduction at maturity. Stake young trees first 2 seasons.',
    },
    privacy: {
      small: 'Staggered row along south property line, 20ft spacing. Reaches privacy height (25ft) in 5-6 years. Dense summer foliage.',
      medium: 'Double row offset pattern along two sides. Cedar Elm fills gaps other trees leave. Year-round partial privacy (semi-evergreen in mild DFW winters).',
      large: 'Full perimeter planting at 25ft spacing. Mix with Eastern Redcedar for full evergreen privacy baseline plus Cedar Elm canopy above.',
    },
    shade: {
      small: 'Single specimen 20ft west of patio. At maturity (60ft canopy spread) covers 500+ sq ft of outdoor space. Stake and water weekly year 1.',
      medium: 'Two trees flanking patio east/west. Creates dappled light summer canopy. Cedar Elm leaf texture gives filtered shade, not full dark shade.',
      large: 'Orchard-style grid at 35ft spacing. Interconnected canopy by year 12. Adds $40K+ to property value (DFW appraisal data 2024).',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🌳</div>
        <h1 style={{ fontSize: '2rem', color: '#F5E642', marginBottom: '.5rem' }}>DFW Cedar Elm Tree Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW's quintessential shade tree — drought-tolerant, fast-growing, and built for Texas heat.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '📏', label: 'Height', value: '60–70 ft' }, { icon: '💧', label: 'Drought Tolerant', value: 'After 3 Years' }, { icon: '🌡️', label: 'AC Savings', value: 'Up to 30%' }, { icon: '🐛', label: 'Watch For', value: 'Elm Leaf Beetle' }].map(s => (
            <div key={s.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🎯 Placement Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '.5rem' }}>Shade Goal</label>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {['cooling', 'privacy', 'shade'].map(g => (
                <button key={g} onClick={() => setShadeGoal(g)} style={{ padding: '.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: shadeGoal === g ? '#F5E642' : '#334155', color: shadeGoal === g ? '#0A1628' : '#fff', fontWeight: 600, textTransform: 'capitalize' }}>{g}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '.5rem' }}>Lot Size</label>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {['small', 'medium', 'large'].map(s => (
                <button key={s} onClick={() => setLotSize(s)} style={{ padding: '.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: lotSize === s ? '#F5E642' : '#334155', color: lotSize === s ? '#0A1628' : '#fff', fontWeight: 600, textTransform: 'capitalize' }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#e2e8f0' }}>{placements[shadeGoal][lotSize]}</div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ Elm Leaf Beetle — Not Dutch Elm Disease</h2>
          <p style={{ color: '#94a3b8' }}>Cedar Elms in DFW are NOT susceptible to Dutch Elm Disease (American Elm risk). Elm Leaf Beetle causes cosmetic skeletonizing — rarely fatal. Treat with systemic imidacloprid in spring if infestation is severe.</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🔗</div>
          <p style={{ color: '#0A1628', fontWeight: 700, margin: 0 }}>ProLnk connects DFW homeowners with licensed arborists for Cedar Elm planting, pruning, and pest treatment.</p>
        </div>
      </div>
    </div>
  );
}
