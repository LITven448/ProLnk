import { useState } from 'react';

export default function DFWCoolPavementGuide2026() {
  const [pavType, setPavType] = useState('');
  const [optionGuide, setOptionGuide] = useState('');

  const pavTypes = ['Standard asphalt driveway', 'Concrete driveway', 'Parking lot', 'Backyard patio'];

  const getOption = () => {
    if (!pavType) return;
    if (pavType === 'Standard asphalt driveway') setOptionGuide('🌡️ White or light gray elastomeric coating — reduces surface temp 30-40°F vs black asphalt. Cost: $0.50-$2/sq ft. Applied over existing asphalt. Reapply every 5-7 yrs. Biggest bang for buck in DFW.');
    else if (pavType === 'Concrete driveway') setOptionGuide('✅ Already a cool pavement! Light gray concrete stays 20-30°F cooler than asphalt. Expose the aggregate for even more reflectivity. Add pervious concrete section near garage for foundation-friendly water infiltration.');
    else if (pavType === 'Parking lot') setOptionGuide('🏗️ Cool pavement coating or permeable asphalt — Dallas Cool Pavement Pilot program covers commercial parking lots. Permeable pavers also qualify for stormwater credit. Contact Dallas Water Utilities for rebates.');
    else setOptionGuide('🌿 Permeable pavers + light color — allow rain to infiltrate instead of run off (protects DFW foundations). Choose tan or beige tones. Gravel joints encourage water infiltration. Cooler underfoot by 25°F vs solid concrete in summer.');
  };

  const stats = [
    { icon: '🌡️', label: 'Surface Temp Reduction', value: '30-40°F', note: 'vs standard asphalt' },
    { icon: '💧', label: 'Foundation Benefit', value: 'High', note: 'Permeable options reduce runoff' },
    { icon: '⚡', label: 'AC Load Reduction', value: '5-15%', note: 'From reduced ambient heat' },
    { icon: '💰', label: 'Coating Cost', value: '$0.50-$2/sqft', note: 'DIY or pro applied' },
  ];

  const programs = [
    '🏙️ Dallas Cool Pavement Pilot — commercial and residential rebates',
    '💧 Dallas Water Utilities — stormwater credit for permeable pavers',
    '🌿 North Texas Municipal Water District — water conservation rebates',
    '🌳 Texas Trees Foundation — cool corridor planting programs',
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🛣️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Cool Pavement Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Reflective and permeable pavement solutions for DFW heat</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 28 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#1e2d45', borderRadius: 10, padding: 14, border: '1px solid #2d4a6b', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{s.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 Find Your Cool Pavement Option</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Your pavement type:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {pavTypes.map(p => (
                <button key={p} onClick={() => setPavType(p)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: pavType === p ? '#F5E642' : '#0A1628', color: pavType === p ? '#0A1628' : '#fff', fontSize: 13, textAlign: 'left' }}>{p}</button>
              ))}
            </div>
          </div>
          <button onClick={getOption} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Guide →</button>
          {optionGuide && <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.6 }}>{optionGuide}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>🏛️ DFW Programs and Rebates</div>
          {programs.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 7 }}>{p}</div>)}
        </div>
      </div>
    </div>
  );
}
