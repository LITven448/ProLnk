import { useState } from 'react';

export default function DFWExteriorSidingGuide2026() {
  const [homeStyle, setHomeStyle] = useState('traditional');
  const [budget, setBudget] = useState('mid');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, Record<string, string>> = {
      traditional: {
        low: 'Vinyl siding — $5-10/sq ft installed. Affordable but fades in DFW UV over 10-15 yrs. Plan to repaint.',
        mid: 'Brick — most common DFW material, $12-20/sq ft, withstands hail, 100-yr lifespan.',
        high: 'Full brick + stone accent — $18-35/sq ft, premium DFW curb appeal, zero maintenance siding.',
      },
      modern: {
        low: 'Fiber cement panels (smooth) — $8-14/sq ft. Modern flat aesthetic, hail-rated for DFW.',
        mid: 'Hardie Panel + board-and-batten — $12-20/sq ft. Trending modern DFW exterior, 30-yr warranty.',
        high: 'Metal siding (steel/aluminum) — $15-30/sq ft. Industrial modern, DFW hail resistant, 50-yr life.',
      },
      farmhouse: {
        low: 'LP SmartSide lap siding — $7-12/sq ft. Wood look engineered for DFW weather, 5/50 yr warranty.',
        mid: 'Hardie board horizontal lap — $10-18/sq ft. #1 new construction choice in DFW, hail-rated.',
        high: 'Cedar board-and-batten + Hardie mix — $18-30/sq ft. Authentic farmhouse with DFW durability.',
      },
      craftsman: {
        low: 'Vinyl shakes — $6-10/sq ft. Craftsman aesthetic on a budget, fades in DFW sun after 15 yrs.',
        mid: 'Hardie shingle siding — $12-20/sq ft. Authentic craftsman look, DFW hail-rated, Class 4 impact.',
        high: 'Brick + Hardie shingle combo — $20-35/sq ft. Premium DFW craftsman, maximum weather protection.',
      },
    };
    setResult(map[homeStyle]?.[budget] || 'Select a home style and budget for your DFW siding recommendation.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK • DFW MATERIALS GUIDE 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Exterior Siding Guide 2026</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Siding for DFW homes — brick dominates existing stock, Hardie board rules new construction, hail rating is mandatory.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🧱', label: 'Brick', desc: 'Most common DFW material. Low maintenance, withstands hail. 100-yr lifespan. $12-20/sq ft.', star: true },
            { icon: '🔲', label: 'Hardie Board', desc: 'Fiber cement, hail-rated Class 4, popular on DFW new builds. $10-20/sq ft installed.', star: true },
            { icon: '📋', label: 'Vinyl', desc: 'Affordable but fades in DFW UV. Avoid south-facing walls. $5-10/sq ft installed.', star: false },
            { icon: '🪨', label: 'Stone Veneer', desc: 'Premium DFW accent material. Manufactured stone $15-25/sq ft, natural $25-40/sq ft.', star: false },
          ].map(t => (
            <div key={t.label} style={{ background: '#0F2035', border: `1px solid ${t.star ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: t.star ? '#F5E642′ : '#fff' }}>{t.label}{t.star ? ' ⭐' : ''}</div>
              <div style={{ color: '#8899AA', fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#162440', border: '1px solid #F5E642', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⚡ DFW Hail Warning</div>
          <div style={{ color: '#ccc', fontSize: 14 }}>DFW averages 4-6 significant hail events per year. Specify Class 4 Impact Resistant rating for all siding. This can reduce homeowner insurance premiums by 20-30% with most TX carriers.</div>
        </div>

        <div style={{ background: '#0F2035', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get Your DFW Siding Recommendation</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>HOME STYLE</label>
              <select value={homeStyle} onChange={e => setHomeStyle(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="traditional">Traditional</option>
                <option value="modern">Modern</option>
                <option value="farmhouse">Farmhouse</option>
                <option value="craftsman">Craftsman</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>BUDGET</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="low">Low ($5-10/sq ft)</option>
                <option value="mid">Mid ($10-20/sq ft)</option>
                <option value="high">High ($20+/sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Recommendation →
          </button>
          {result && <div style={{ marginTop: 16, background: '#162440', borderRadius: 10, padding: 16, color: '#F5E642', fontWeight: 600 }}>✅ {result}</div>}
        </div>

        <div style={{ color: '#8899AA', fontSize: 12, borderTop: '1px solid #1E3A5F', paddingTop: 16 }}>
          ProLnk connects DFW homeowners with verified siding contractors. Pricing reflects 2026 DFW market rates including labor.
        </div>
      </div>
    </div>
  );
}