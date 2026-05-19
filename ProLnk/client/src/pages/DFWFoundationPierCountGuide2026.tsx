import { useState } from 'react';

export default function DFWFoundationPierCountGuide2026() {
  const [perimeter, setPerimeter] = useState('');
  const [loadBearing, setLoadBearing] = useState('');
  const [result, setResult] = useState('');

  const calc = () => {
    const p = parseInt(perimeter);
    if (!p || p < 100) { setResult('Enter a valid perimeter (typically 150-300 ft for DFW homes).'); return; }
    const extMin = Math.ceil(p / 10);
    const extMax = Math.ceil(p / 7);
    const intMin = loadBearing === 'yes' ? 5 : 0;
    const intMax = loadBearing === 'yes' ? 10 : 0;
    const totalMin = extMin + intMin;
    const totalMax = extMax + intMax;
    setResult(`Exterior piers: ${extMin}–${extMax} (1 per 7-10 linear ft). Interior piers: ${intMin}–${intMax}. Estimated total: ${totalMin}–${totalMax} piers. Too few piers = uneven load = repair failure in DFW clay.`);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏗️</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Foundation Pier Count Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Estimating how many piers your DFW home needs</p>
        </div>

        {[{ icon: '📏', title: 'Rule of Thumb', desc: '1 pier per 7-10 linear feet of perimeter. Closer spacing = stronger support. DFW expansive clay demands proper pier distribution.' },
          { icon: '🏠', title: 'Typical DFW Home', desc: '2,000 sq ft home with ~200 ft perimeter = 20-28 exterior piers. Most DFW repairs involve 10-20 piers.' },
          { icon: '⚠️', title: 'Interior Piers', desc: 'Load-bearing interior walls need 5-10 additional piers. Often overlooked — causes ongoing settlement if skipped.' },
          { icon: '❌', title: 'Too Few Piers = Failure', desc: 'Under-piered repairs fail within 3-5 years in DFW clay. Always get a second opinion if pier count seems low.' }
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <h3 style={{ color: '#F5E642', fontSize: '17px', marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6′ }}>{item.desc}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '20px' }}>🔢 Pier Count Estimator</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Home Perimeter (linear feet)</label>
            <input type="number" value={perimeter} onChange={e => setPerimeter(e.target.value)} placeholder="e.g. 200″ style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Load-bearing interior walls?</label>
            <select value={loadBearing} onChange={e => setLoadBearing(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No / Unknown</option>
            </select>
          </div>
          <button onClick={calc} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer', width: '100%' }}>Estimate Pier Count</button>
          {result && <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#1e3a5f', borderRadius: '8px', color: '#F5E642', fontSize: '14px', lineHeight: '1.6′ }}>{result}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '24px' }}>ProLnk — DFW Foundation Experts 2026</p>
      </div>
    </div>
  );
}
