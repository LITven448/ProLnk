import { useState } from 'react';

export default function DFWMetalRoofingGuide2026B() {
  const [style, setStyle] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

  const getRecommendation = () => {
    if (!style || !budget) { setRecommendation('Please select both options.'); return; }
    if (style === 'modern' && budget === 'high') setRecommendation('🏆 Standing Seam Galvalume — no exposed fasteners, concealed clips handle DFW thermal expansion, 50+ year lifespan. Requires certified metal installer.');
    else if (style === 'modern' && budget === 'mid') setRecommendation('✅ Exposed Fastener Painted Steel — more affordable, still modern look. Use premium sealant caps rated for DFW UV exposure.');
    else if (style === 'traditional' && budget === 'high') setRecommendation('🏠 Standing Seam with Stone-Coated Steel finish — looks like tile or shake, full thermal float, certified DFW installer required.');
    else setRecommendation('🔩 Exposed Fastener Galvalume — best budget metal option for DFW. Plan for fastener re-torque at 5-year intervals due to heat cycling.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 18px', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '16px' }}>
          🏠 DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>DFW Metal Roofing Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px' }}>Standing seam vs exposed fastener — and how DFW heat extremes change everything.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          {[{
            title: 'Standing Seam', icon: '📐',
            facts: ['No exposed fasteners = no leak points', 'Concealed clips allow thermal movement', 'DFW temp swings: 30°F to 110°F+', '50+ year lifespan expected', 'Requires certified installer — not all roofers qualify']
          }, {
            title: 'Exposed Fastener', icon: '🔩',
            facts: ['Lower installed cost by 20-35%', 'Faster installation', 'Sealant washers degrade in DFW UV', 'Re-fastening needed every 5-7 years', 'More roofers can install (but find metal-certified)']
          }].map(s => (
            <div key={s.title} style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{s.icon} {s.title}</div>
              <ul style={{ paddingLeft: '18px', color: '#cbd5e1', lineHeight: '1.8′ }}>
                {s.facts.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '12px' }}>🌡️ DFW-Specific Considerations</h2>
          {[
            ['Thermal Expansion', 'Metal expands ~1″ per 100ft at DFW extremes — standing seam handles this; exposed fastener fights it'],
            ['Material', 'Galvalume (bare) resists DFW humidity better than painted; painted adds curb appeal but needs Kynar 500 coating'],
            ['Installer Cert', 'MBCI, Englert, or manufacturer certification required — ask for proof before signing contract'],
            ['Insurance', 'Most metal roofs qualify for DFW impact/wind discount — verify Class 4 rating with insurer first'],
          ].map(([k,v]) => (
            <div key={k} style={{ borderBottom: '1px solid #1e3a5f', padding: '10px 0′ }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{k}: </span>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px' }}>🎯 Find My Metal Roofing Match</h2>
          <div style={{ marginBottom: '12px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Roof style goal:</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[{v:'modern',l:'🏙️ Modern/Clean'},{v:'traditional',l:'🏡 Traditional'}].map(o => (
                <button key={o.v} onClick={() => setStyle(o.v)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: style===o.v?'#F5E642':'#1e3a5f', backgroundColor: style===o.v?'#F5E642':'transparent', color: style===o.v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>{o.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Budget range:</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[{v:'high',l:'💎 Premium ($18-28/sqft)'},{v:'mid',l:'💰 Mid ($12-18/sqft)'}].map(o => (
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
