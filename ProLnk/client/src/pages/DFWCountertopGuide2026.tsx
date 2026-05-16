import { useState } from 'react';

export default function DFWCountertopGuide2026() {
  const [style, setStyle] = useState('modern');
  const [budget, setBudget] = useState('mid');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, Record<string, string>> = {
      modern: {
        low: 'Laminate with quartz look — $20-40/sq ft installed. Surprisingly convincing in DFW modern kitchens.',
        mid: 'Quartz (Silestone/Cambria) — $55-85/sq ft. #1 choice in DFW — non-porous, no sealing needed.',
        high: 'Quartzite — $80-140/sq ft. Natural luxury, harder than granite, stunning in DFW high-end builds.',
      },
      traditional: {
        low: 'Ceramic tile countertop — $10-30/sq ft. Old-school but budget-friendly for DFW traditional kitchens.',
        mid: 'Granite — $45-75/sq ft. Natural beauty, seal annually in DFW humidity for best longevity.',
        high: 'Marble — $75-150/sq ft. Timeless elegance. Seal every 6 months in DFW climate.',
      },
      farmhouse: {
        low: 'Butcher block — $40-60/sq ft. Beautiful but requires oiling monthly; avoid DFW humidity areas near sink.',
        mid: 'Quartz in white/gray — $55-85/sq ft. Farmhouse look without the maintenance headache.',
        high: 'Concrete countertop — $80-150/sq ft. Trending farmhouse material. High maintenance in DFW humidity.',
      },
      contemporary: {
        low: 'Recycled glass countertop — $50-70/sq ft. Eco-friendly and unique for DFW contemporary homes.',
        mid: 'Quartz with waterfall edge — $70-100/sq ft. Statement piece, zero maintenance for DFW lifestyles.',
        high: 'Dekton ultra-compact — $90-160/sq ft. Virtually indestructible, handles DFW outdoor kitchens perfectly.',
      },
    };
    setResult(map[style]?.[budget] || 'Select a style and budget for your DFW countertop recommendation.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK • DFW MATERIALS GUIDE 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🍽️ DFW Countertop Guide 2026</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Countertop options for DFW kitchens — quartz dominates, granite still strong, concrete rising.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔵', label: 'Quartz', desc: '#1 in DFW. Non-porous, heat resistant, zero sealing. $55-85/sq ft installed.', star: true },
            { icon: '🪨', label: 'Granite', desc: 'Natural beauty. Seal annually for DFW humidity. $45-75/sq ft installed.', star: false },
            { icon: '💎', label: 'Quartzite', desc: 'Luxury natural stone. Harder than granite. $80-140/sq ft installed.', star: false },
            { icon: '🌳', label: 'Butcher Block', desc: 'Avoid near DFW humidity zones. Monthly oiling required. $40-60/sq ft.', star: false },
            { icon: '🏗️', label: 'Concrete', desc: 'Trending but high maintenance in DFW humidity. $80-150/sq ft installed.', star: false },
            { icon: '⚡', label: 'Dekton', desc: 'Ultra-compact surface. DFW outdoor kitchen champion. $90-160/sq ft.', star: false },
          ].map(t => (
            <div key={t.label} style={{ background: '#0F2035', border: `1px solid ${t.star ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: t.star ? '#F5E642' : '#fff' }}>{t.label}{t.star ? ' ⭐' : ''}</div>
              <div style={{ color: '#8899AA', fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get Your Countertop Recommendation</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>KITCHEN STYLE</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="modern">Modern</option>
                <option value="traditional">Traditional</option>
                <option value="farmhouse">Farmhouse</option>
                <option value="contemporary">Contemporary</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>BUDGET</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="low">Low ($10-45/sq ft)</option>
                <option value="mid">Mid ($45-85/sq ft)</option>
                <option value="high">High ($85+/sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Recommendation →
          </button>
          {result && <div style={{ marginTop: 16, background: '#162440', borderRadius: 10, padding: 16, color: '#F5E642', fontWeight: 600 }}>✅ {result}</div>}
        </div>

        <div style={{ color: '#8899AA', fontSize: 12, borderTop: '1px solid #1E3A5F', paddingTop: 16 }}>
          ProLnk connects DFW homeowners with verified countertop fabricators and installers. Pricing reflects 2026 DFW market rates.
        </div>
      </div>
    </div>
  );
}