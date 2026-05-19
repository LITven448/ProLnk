import { useState } from 'react';

export default function DFWFlatRoofGuide2026() {
  const [area, setArea] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');

  const getRecommendation = () => {
    if (!area) { setRecommendation('Please select roof area.'); return; }
    const sqft = parseInt(area);
    if (sqft <= 500) setRecommendation('🔧 Modified Bitumen — best for small DFW flat areas (additions, garages). Torch-down or self-adhered, easy for roofers to patch, handles DFW UV well. Cost: $4-6/sqft.');
    else if (sqft <= 2000) setRecommendation('✅ TPO Single-Ply — ideal for DFW mid-size flat roofs. White membrane reflects heat, seam-welded for watertightness, ENERGY STAR rated. Cost: $5-8/sqft installed.');
    else setRecommendation('🏢 TPO or EPDM Commercial Grade — large DFW flat roofs need mechanically attached or ballasted systems. TPO for UV reflection; EPDM if budget-constrained. Plan for interior drain system. Cost: $4-7/sqft.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 18px', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '16px' }}>
          🏠 DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>DFW Flat Roof Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px' }}>TPO vs EPDM vs Modified Bitumen — and why drainage is critical in North Texas.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[{
            title: 'TPO', icon: '⬜',
            facts: ['White = reflects DFW sun', 'Heat-welded seams', 'Most popular DFW flat option', '$5-8/sqft installed', '20-30 year lifespan']
          }, {
            title: 'EPDM', icon: '⬛',
            facts: ['Black rubber membrane', 'Lower material cost', 'Absorbs DFW heat (negative)', '$4-7/sqft installed', '25-30 year lifespan']
          }, {
            title: 'Modified Bitumen', icon: '🟫',
            facts: ['Torch-down or peel-and-stick', 'Good for small flat areas', 'Handles DFW UV decently', '$4-6/sqft installed', '15-20 year lifespan']
          }].map(t => (
            <div key={t.title} style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{t.icon} {t.title}</div>
              <ul style={{ paddingLeft: '16px', color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.85rem' }}>
                {t.facts.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '12px' }}>⚠️ DFW Flat Roof Critical Factors</h2>
          {[
            ['Drainage', 'DFW gets 3-5″ rain events — flat roofs must have interior drains or scuppers sized for heavy flow, not just gutters'],
            ['Ponding Water', 'Standing water 48hrs+ voids most warranties — DFW soils expand/contract, creating low spots over time'],
            ['UV Exposure', 'DFW flat roofs see intense direct UV — TPO white membranes outperform black EPDM by 15-20 years in DFW climate'],
            ['Maintenance', 'Flat roofs need annual inspection in DFW — check seams, drains, and flashings after every major hail event'],
          ].map(([k,v]) => (
            <div key={k} style={{ borderBottom: '1px solid #1e3a5f', padding: '10px 0′ }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{k}: </span>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px' }}>🎯 Get My DFW Flat Roof Recommendation</h2>
          <p style={{ color: '#94a3b8', marginBottom: '12px' }}>Flat roof area:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {[{v:'300',l:'📦 Under 500 sqft'},{v:'1000',l:'🏠 500–2,000 sqft'},{v:'3000',l:'🏢 2,000+ sqft'}].map(o => (
              <button key={o.v} onClick={() => setArea(o.v)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: area===o.v?'#F5E642':'#1e3a5f', backgroundColor: area===o.v?'#F5E642':'transparent', color: area===o.v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>{o.l}</button>
            ))}
          </div>
          <button onClick={getRecommendation} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}>Get Recommendation →</button>
          {recommendation && <div style={{ backgroundColor: '#0d3b5e', borderRadius: '8px', padding: '16px', color: '#e2e8f0', lineHeight: '1.6′ }}>{recommendation}</div>}
        </div>
      </div>
    </div>
  );
}
