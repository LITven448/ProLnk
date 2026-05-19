import { useState } from 'react';

export default function DFWTileGuide2026() {
  const [room, setRoom] = useState('kitchen');
  const [budget, setBudget] = useState('mid');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, Record<string, string>> = {
      kitchen: {
        low: 'Ceramic tile — $1-3/sq ft, easy DIY install, great for DFW kitchens on a budget.',
        mid: 'Porcelain tile — $3-7/sq ft, non-porous, handles DFW humidity perfectly, highly durable.',
        high: 'Large format 24x24 porcelain — $7-15/sq ft, seamless look, trending in DFW luxury builds.',
      },
      bathroom: {
        low: 'Ceramic tile — $1-3/sq ft, water-resistant, budget-friendly for DFW bathrooms.',
        mid: 'Wood-look porcelain tile — $4-8/sq ft, 100% waterproof, no warping in DFW humidity.',
        high: 'Large format rectified porcelain — $8-18/sq ft, minimal grout lines, spa-like finish.',
      },
      outdoor: {
        low: 'Textured ceramic pavers — $2-4/sq ft, slip-resistant for DFW rain events.',
        mid: 'Porcelain pavers 20mm — $5-10/sq ft, freeze-thaw rated, survives DFW temp swings.',
        high: 'Travertine or natural stone — $10-20/sq ft, premium aesthetic, seal annually in DFW.',
      },
      living: {
        low: 'Ceramic plank tile — $2-4/sq ft, wood look without the DFW humidity damage risk.',
        mid: 'Wood-look porcelain plank — $4-8/sq ft, best for open-concept DFW homes.',
        high: 'Marble-look large format porcelain — $8-15/sq ft, timeless luxury for DFW living rooms.',
      },
    };
    setResult(map[room]?.[budget] || 'Select a room and budget for a recommendation.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK • DFW MATERIALS GUIDE 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Tile Selection Guide 2026</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Best tile for DFW homes — porcelain dominates for humidity resistance, large format trends up.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔷', label: 'Porcelain', desc: 'Most durable, non-porous, best for DFW humidity. $3-15/sq ft.', star: true },
            { icon: '🟫', label: 'Ceramic', desc: 'Lower cost, similar aesthetic. Best for low-traffic DFW rooms. $1-4/sq ft.', star: false },
            { icon: '📐', label: 'Large Format 24x24', desc: 'Trending in DFW luxury builds. Fewer grout lines, modern look.', star: false },
            { icon: '🌲', label: 'Wood-Look Tile', desc: '100% waterproof. Replaces hardwood in DFW bathrooms and kitchens.', star: false },
          ].map(t => (
            <div key={t.label} style={{ background: '#0F2035', border: `1px solid ${t.star ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: t.star ? '#F5E642' : '#fff' }}>{t.label}{t.star ? ' ⭐' : ''}</div>
              <div style={{ color: '#8899AA', fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get Your Tile Recommendation</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>ROOM TYPE</label>
              <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="outdoor">Outdoor / Patio</option>
                <option value="living">Living Room</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>BUDGET</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="low">Low ($1-3/sq ft)</option>
                <option value="mid">Mid ($3-8/sq ft)</option>
                <option value="high">High ($8+/sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Recommendation →
          </button>
          {result && <div style={{ marginTop: 16, background: '#162440', borderRadius: 10, padding: 16, color: '#F5E642', fontWeight: 600 }}>✅ {result}</div>}
        </div>

        <div style={{ color: '#8899AA', fontSize: 12, borderTop: '1px solid #1E3A5F', paddingTop: 16 }}>
          ProLnk connects DFW homeowners with verified tile contractors. Data reflects 2026 DFW market pricing.
        </div>
      </div>
    </div>
  );
}