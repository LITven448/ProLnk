import { useState } from 'react';

export default function DFWOwensCorningVsGAFGuide2026() {
  const [priority, setPriority] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

  const getRecommendation = () => {
    if (priority === 'warranty') setRecommendation('🏆 GAF Timberline HDZ with Golden Pledge Warranty — 50-year non-prorated coverage with installer-backed labor, the gold standard in DFW.');
    else if (priority === 'price') setRecommendation('💰 Owens Corning Duration Series — comparable performance at 5-10% lower installed cost in most DFW markets.');
    else if (priority === 'impact') setRecommendation('🛡️ Either brand’s Class 4 impact-resistant line — GAF Timberline ArmorShield II or OC Duration Storm — both qualify for DFW insurance discounts.');
    else setRecommendation('');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 18px', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '16px' }}>
          🏠 DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Owens Corning vs GAF Shingles for DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px' }}>The two dominant shingle brands in North Texas — side by side.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          {[{
            brand: 'GAF Timberline HDZ', icon: '🔵',
            facts: ['Most-installed shingle in DFW', 'LayerLock technology for wind resistance', 'Class A fire rated', 'ArmorShield II = Class 4 impact', 'Golden Pledge: 50-yr non-prorated']
          }, {
            brand: 'Owens Corning Duration', icon: '🟠',
            facts: ['SureNail Technology for grip', 'TruDefinition color depth', 'Class A fire rated', 'Duration Storm = Class 4 impact', 'Platinum Protection: 50-yr transferable']
          }].map(b => (
            <div key={b.brand} style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{b.icon} {b.brand}</div>
              <ul style={{ paddingLeft: '18px', color: '#cbd5e1', lineHeight: '1.8′ }}>
                {b.facts.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '12px' }}>📊 Key Comparison</h2>
          {[
            ['Warranty', 'Golden Pledge (labor-backed)', 'Platinum Protection (transferable)'],
            ['DFW Market Share', '~52% of DFW installs', '~38% of DFW installs'],
            ['Impact Upgrade', 'ArmorShield II (+$0.30/sqft)', 'Duration Storm (+$0.25/sqft)'],
            ['Installed Cost', '$4.50–$6.50/sqft avg', '$4.25–$6.25/sqft avg'],
          ].map(([cat, gaf, oc]) => (
            <div key={cat} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: '8px', borderBottom: '1px solid #1e3a5f', padding: '8px 0', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8′ }}>{cat}</span>
              <span style={{ color: '#60a5fa' }}>{gaf}</span>
              <span style={{ color: '#f97316′ }}>{oc}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px' }}>🎯 Get My DFW Recommendation</h2>
          <p style={{ color: '#94a3b8', marginBottom: '12px' }}>What matters most to you?</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {[{v:'warranty',l:'🛡️ Best Warranty'},{v:'price',l:'💰 Best Price'},{v:'impact',l:'🌧️ Impact Resistance'}].map(o => (
              <button key={o.v} onClick={() => setPriority(o.v)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: priority===o.v ? '#F5E642′ : '#1e3a5f', backgroundColor: priority===o.v ? '#F5E642' : ’transparent', color: priority===o.v ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600 }}>{o.l}</button>
            ))}
          </div>
          <button onClick={getRecommendation} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}>Get Recommendation →</button>
          {recommendation && <div style={{ backgroundColor: '#0d3b5e', borderRadius: '8px', padding: '16px', color: '#e2e8f0', lineHeight: '1.6′ }}>{recommendation}</div>}
        </div>
      </div>
    </div>
  );
}
