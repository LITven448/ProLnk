import { useState } from 'react';

export default function DFWSyntheticShingleGuide2026() {
  const [aesthetic, setAesthetic] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

  const getRecommendation = () => {
    if (!aesthetic || !budget) { setRecommendation('Please select both options.'); return; }
    if (aesthetic === 'slate' && budget === 'high') setRecommendation('🏆 DaVinci Slate — the gold standard for synthetic slate in DFW. Class 4 impact rated, 50-yr warranty, HOA-approved in virtually every DFW community.');
    else if (aesthetic === 'slate' && budget === 'mid') setRecommendation('✅ CertainTeed Belmont — excellent DFW value for slate look. Class 4 impact, lighter than DaVinci, easier for roofers to install.');
    else if (aesthetic === 'shake' && budget === 'high') setRecommendation('🌲 Brava Cedar Shake — best wood-shake alternative for DFW. Hail tested to Class 4, no rot or mold risk, DFW HOAs widely approve.');
    else setRecommendation('🔶 CertainTeed Belmont or Atlas Pinnacle Pristine — mid-range synthetics with good DFW hail performance and HOA acceptance.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 18px', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '16px' }}>
          🏠 DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>DFW Synthetic Shingle Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px' }}>Polymer composites that look like slate or shake — with Class 4 hail resistance standard asphalt can't match.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[{
            brand: 'DaVinci', icon: '🔵', look: 'Slate / Shake',
            facts: ['Class 4 impact rated', '50-year warranty', '$9-14/sqft installed', '130+ DFW-approved colors']
          }, {
            brand: 'Brava', icon: '🟢', look: 'Cedar Shake',
            facts: ['Class 4 + Class A fire', 'Algae/mold resistant', '$10-15/sqft installed', 'Lighter than real shake']
          }, {
            brand: 'CertainTeed Belmont', icon: '🟡', look: 'Slate',
            facts: ['Class 4 UL 2218 rated', '40-year warranty', '$7-11/sqft installed', 'Most installer-familiar']
          }].map(b => (
            <div key={b.brand} style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{b.icon} {b.brand}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem', marginBottom: '10px' }}>{b.look}</div>
              <ul style={{ paddingLeft: '16px', color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.85rem' }}>
                {b.facts.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '12px' }}>📊 Synthetic vs Real: DFW Cost Comparison</h2>
          {[
            ['Real Slate', '$20-40/sqft installed', '50-150 years', 'Often HOA-required'],
            ['Real Cedar Shake', '$10-18/sqft installed', '20-30 years DFW', 'Fire risk in DFW areas'],
            ['Synthetic Slate', '$8-15/sqft installed', '40-50 years', 'HOA approves 95%+ time'],
            ['Asphalt Shingle', '$4-7/sqft installed', '15-25 years DFW', 'Standard approval'],
          ].map(([mat, cost, life, hoa]) => (
            <div key={mat} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '8px', borderBottom: '1px solid #1e3a5f', padding: '8px 0', fontSize: '0.85rem' }}>
              <span style={{ color: '#F5E642′ }}>{mat}</span>
              <span style={{ color: '#60a5fa' }}>{cost}</span>
              <span style={{ color: '#34d399′ }}>{life}</span>
              <span style={{ color: '#94a3b8′ }}>{hoa}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px' }}>🎯 Find My DFW Synthetic Shingle</h2>
          <div style={{ marginBottom: '12px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Aesthetic goal:</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[{v:'slate',l:'🪨 Slate Look'},{v:'shake',l:'🌲 Wood Shake Look'}].map(o => (
                <button key={o.v} onClick={() => setAesthetic(o.v)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: aesthetic===o.v?'#F5E642':'#1e3a5f', backgroundColor: aesthetic===o.v?'#F5E642':'transparent', color: aesthetic===o.v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>{o.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Budget:</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[{v:'high',l:'💎 Premium ($12+/sqft)'},{v:'mid',l:'💰 Mid ($7-12/sqft)'}].map(o => (
                <button key={o.v} onClick={() => setBudget(o.v)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: budget===o.v?'#F5E642':'#1e3a5f', backgroundColor: budget===o.v?'#F5E642':'transparent', color: budget===o.v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>{o.l}</button>
              ))}
            </div>
          </div>
          <button onClick={getRecommendation} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}>Get Recommendation →</button>
          {recommendation && <div style={{ backgroundColor: '#0d3b5e', borderRadius: '8px', padding: '16px', color: '#e2e8f0', lineHeight: '1.6′ }}>{recommendation}</div>}
        </div>
      </div>
    </div>
  );
}
