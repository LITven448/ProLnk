import { useState } from 'react';

export default function DFWHVACGroundLoopGuide2026() {
  const [propertyType, setPropertyType] = useState('');
  const [yardSize, setYardSize] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!propertyType || !yardSize) { setResult('Please select both options.'); return; }
    if (propertyType === 'pond') { setResult('Pond loop is ideal — most efficient and lowest cost. Requires 0.5-1 acre pond nearby. Coils sink to bottom.'); return; }
    if (yardSize === 'large') { setResult('Horizontal loop recommended. DFW clay soil drills beautifully. Need ~0.5 acres clear. Pipes buried 4-6 ft deep.'); return; }
    if (yardSize === 'small') { setResult('Vertical loop recommended. Drill 150-400 ft deep — below DFW clay into stable 65°F rock. Less land, higher drill cost.'); return; }
    setResult('Vertical loop likely best for medium yards in DFW. Stable ground temp 65°F at 10-15 ft depth makes DFW ideal for geothermal.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌍</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Geothermal Ground Loop Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Choosing the right ground loop for DFW properties</p>
        </div>

        {[{ icon: '↔️', title: 'Horizontal Loop', desc: 'Needs large yard (0.5+ acres). Pipes at 4-6 ft depth. DFW clay soil drills exceptionally well. Lower cost than vertical.' },
          { icon: '⬇️', title: 'Vertical Loop', desc: 'Smaller yard OK. Drill 150-400 ft deep into stable rock. Reaches 65°F stable DFW ground temp. Higher drill cost, less land.' },
          { icon: '🌊', title: 'Pond Loop', desc: 'Most efficient option. Coils sink to pond bottom. Requires 0.5-1 acre water body within 200 ft of home.' },
          { icon: '🌡️', title: 'DFW Ground Temp', desc: 'Stable 65°F at 10-15 ft depth year-round. DFW clay helps retain thermal mass. Excellent geothermal conditions.' }
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <h3 style={{ color: '#F5E642', fontSize: '17px', marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6′ }}>{item.desc}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '20px' }}>🔍 Ground Loop Feasibility Check</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Property Type</label>
            <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="standard">Standard lot</option>
              <option value="acreage">Acreage / rural</option>
              <option value="pond">Has pond nearby</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Yard Size</label>
            <select value={yardSize} onChange={e => setYardSize(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="small">Small (&lt;0.25 acres)</option>
              <option value="medium">Medium (0.25-0.5 acres)</option>
              <option value="large">Large (0.5+ acres)</option>
            </select>
          </div>
          <button onClick={assess} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer', width: '100%' }}>Check Feasibility</button>
          {result && <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#1e3a5f', borderRadius: '8px', color: '#F5E642', fontSize: '14px', lineHeight: '1.6′ }}>{result}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '24px' }}>ProLnk — DFW Geothermal Specialists 2026</p>
      </div>
    </div>
  );
}
