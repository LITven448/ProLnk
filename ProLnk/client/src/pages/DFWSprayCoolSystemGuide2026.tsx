import { useState } from 'react';

export default function DFWSprayCoolSystemGuide2026() {
  const [roofKind, setRoofKind] = useState('asphalt');
  const [summerBill, setSummerBill] = useState('medium');
  const [result, setResult] = useState('');

  const roofKinds = ['Asphalt Shingles', 'Metal Roof', 'Flat/TPO', 'Tile'];
  const billOptions = ['Under $150/mo', '$150–$300/mo', '$300–$500/mo', 'Over $500/mo'];

  const getGuide = () => {
    let rec = '';
    const highBill = summerBill === '$300–$500/mo' || summerBill === 'Over $500/mo';
    if (roofKind === 'Flat/TPO') {
      rec = '🎯 Flat roofs are ideal for spray cooling! Misting systems reduce surface temps 30–40°F. Pair with white TPO coating for compounding effect. Note: DFW Stage 2 restrictions limit irrigation — ensure misting system has dedicated meter or permit.';
    } else if (highBill) {
      rec = '⚡ Your high summer bills make spray cooling worth evaluating. A roof misting system ($800–$2,500 installed) connected to existing irrigation can cut peak attic temps by 35°F. Water cost: ~$15–30/month at peak. Net savings potential: $80–$150/month. Check DFW water authority restrictions first.';
    } else if (roofKind === 'Metal Roof') {
      rec = '🌊 Metal roofs respond extremely well to evaporative cooling spray. The metal surface cools instantly and retains lower temps. Best ROI of any roof type for spray systems. Ensure drainage is planned — water pooling on metal causes rust over time.';
    } else {
      rec = '📋 Spray cooling may not be your best first investment. With moderate bills and standard asphalt shingles, a radiant barrier ($600–$1,200) or upgraded attic insulation delivers better ROI with no water restrictions risk. Revisit spray cooling if bills increase.';
    }
    setResult(rec);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW Roof Spray Cooling System Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Evaporative misting systems for DFW residential roofs</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{icon:'🌡️',label:'Surface Temp Reduction',val:'30–40°F',sub:'With active misting during peak heat'},{icon:'💧',label:'Water Use',val:'~25 gal/hr',sub:'Typical residential misting system'},{icon:'🏗️',label:'Install Cost',val:'$800–$2,500',sub:'Connected to existing irrigation'},{icon:'⚠️',label:'DFW Stage 2',val:'Restricted',sub:'Verify water authority rules before install'}].map((s,i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.25rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🚰 DFW Water Restriction Considerations</h2>
          {[{stage:'Stage 1',rule:'Odd/Even days only',impact:'Roof misting may need timer adjustment'},{stage:'Stage 2',rule:'Landscape watering restricted',impact:'Roof spray systems face restrictions — dedicated meter helps'},{stage:'Stage 3',rule:'Emergency conservation',impact:'Non-essential water systems suspended — plan backup strategy'}].map((r,i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', background: '#0f1f3d', borderRadius: '8px', marginBottom: '0.5rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: '80px' }}>{r.stage}</span>
              <span style={{ color: '#60a5fa', minWidth: '180px', fontSize: '0.9rem' }}>{r.rule}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{r.impact}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 Should You Install Spray Cooling?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Roof Type</label>
              <select value={roofKind} onChange={e => setRoofKind(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {roofKinds.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Summer Electric Bill</label>
              <select value={summerBill} onChange={e => setSummerBill(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {billOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Evaluate Spray Cooling for My Home</button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0f1f3d', borderRadius: '8px', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}