import { useState } from 'react';

export default function DFWCoolRoofGuide2026() {
  const [roofType, setRoofType] = useState<string>('');
  const [electricBill, setElectricBill] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calcROI = () => {
    if (!roofType || !electricBill) { setResult('Please select both options.'); return; }
    const bill = parseInt(electricBill);
    const saving = roofType === 'shingle' ? Math.round(bill * 0.12) : Math.round(bill * 0.18);
    const cost = roofType === 'shingle' ? '$300-600 premium over standard shingles' : '$1.50-3.00/sqft for coating';
    const payback = roofType === 'shingle' ? Math.round(500 / saving * 12) : Math.round(800 / saving * 12);
    setResult(`Estimated monthly savings: $${saving}/mo | Upgrade cost: ${cost} | DFW payback: ~${payback} months`);
  };

  const btn = (active: boolean) => ({
    padding: '10px 18px', borderRadius: '8px', border: '2px solid',
    borderColor: active ? '#F5E642' : '#1e3a5f',
    backgroundColor: active ? '#F5E642' : 'transparent',
    color: active ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600 as const,
  });

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 18px', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '16px' }}>
          DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>DFW Cool Roof Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px' }}>Cut attic temps 20-30 degrees F and slash summer energy bills across North Texas.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          {[{
            title: 'Reflective Shingles', icon: 'House',
            facts: ['Reduce attic temp 20-30F in DFW summers', 'ENERGY STAR rated options from GAF/OC', 'Granule technology reflects solar IR', 'Works on existing roof pitch', '$150-300 premium on full replacement']
          }, {
            title: 'Flat Roof Coatings', icon: 'Square',
            facts: ['White/aluminum coatings for flat roofs', 'Reflect 80-90% of solar energy', 'Extend membrane life 10+ years', 'Applied over existing EPDM/TPO', '$1.50-3.00/sqft installed DFW average']
          }].map(t => (
            <div key={t.title} style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#F5E642' }}>{t.title}</div>
              <ul style={{ paddingLeft: '18px', color: '#cbd5e1', lineHeight: '1.8' }}>
                {t.facts.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '12px' }}>Why DFW Makes Cool Roofing Worth It</h2>
          {[
            ['Heat Days', 'DFW averages 102+ days above 90F annually — more than almost any major US city'],
            ['ENERGY STAR', 'Look for ENERGY STAR roof rating — qualifies for federal tax credit (10% of cost, up to $500)'],
            ['Attic Impact', 'Every 10F attic temp reduction = ~3% AC energy savings in DFW summer months'],
            ['HOA Note', 'Some DFW HOAs restrict light-colored roofs — verify before selecting white/tan options'],
          ].map(([k, v]) => (
            <div key={k} style={{ borderBottom: '1px solid #1e3a5f', padding: '10px 0' }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{k}: </span>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px' }}>Calculate My DFW Cool Roof ROI</h2>
          <div style={{ marginBottom: '12px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Roof type:</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[{ v: 'shingle', l: 'Pitched Shingle' }, { v: 'flat', l: 'Flat/Low-Slope' }].map(o => (
                <button key={o.v} onClick={() => setRoofType(o.v)} style={btn(roofType === o.v)}>{o.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Average summer electric bill:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[{ v: '150', l: '$150/mo' }, { v: '250', l: '$250/mo' }, { v: '400', l: '$400/mo' }, { v: '600', l: '$600+/mo' }].map(o => (
                <button key={o.v} onClick={() => setElectricBill(o.v)} style={btn(electricBill === o.v)}>{o.l}</button>
              ))}
            </div>
          </div>
          <button onClick={calcROI} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}>Calculate ROI</button>
          {result && <div style={{ backgroundColor: '#0d3b5e', borderRadius: '8px', padding: '16px', color: '#e2e8f0', lineHeight: '1.6' }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}
