import { useState } from 'react';

const materials = [
  {
    id: 'solid-hardwood',
    name: 'Solid Hardwood',
    emoji: '🪵',
    upfront: '8–15',
    humidity: 'Poor',
    dfwRating: '⚠️ Risky',
    dfwNote: 'DFW humidity swings cause cupping and gapping — requires precise climate control year-round',
    rooms: ['bedroom', 'living'],
    lifespan: '50–100 yrs (refinishable)',
    budgetScore: 3,
  },
  {
    id: 'engineered',
    name: 'Engineered Hardwood',
    emoji: '🏗️',
    upfront: '5–12',
    humidity: 'Good',
    dfwRating: '✅ DFW Friendly',
    dfwNote: 'Cross-ply construction handles DFW humidity cycles — hardwood look with better stability',
    rooms: ['bedroom', 'living', 'basement'],
    lifespan: '25–30 yrs',
    budgetScore: 2,
  },
  {
    id: 'lvp',
    name: 'Luxury Vinyl Plank (LVP)',
    emoji: '🏆',
    upfront: '3–8',
    humidity: 'Excellent',
    dfwRating: '⭐ DFW Winner',
    dfwNote: '100% waterproof, handles DFW temp swings perfectly — most popular DFW flooring 2023–2025',
    rooms: ['bedroom', 'living', 'kitchen', 'bathroom', 'basement'],
    lifespan: '15–25 yrs',
    budgetScore: 1,
  },
  {
    id: 'porcelain',
    name: 'Porcelain Tile',
    emoji: '⬜',
    upfront: '5–15',
    humidity: 'Excellent',
    dfwRating: '✅ DFW Proven',
    dfwNote: 'Stays cool in summer — popular in DFW kitchens and baths, hard underfoot for living areas',
    rooms: ['kitchen', 'bathroom', 'living'],
    lifespan: '50+ yrs',
    budgetScore: 2,
  },
  {
    id: 'carpet',
    name: 'Carpet',
    emoji: '🛋️',
    upfront: '2–6',
    humidity: 'Fair',
    dfwRating: '✅ DFW Standard',
    dfwNote: 'Still popular in DFW bedrooms — traps allergens but provides comfort; clean regularly in DFW dust',
    rooms: ['bedroom'],
    lifespan: '5–15 yrs',
    budgetScore: 1,
  },
  {
    id: 'cork',
    name: 'Cork',
    emoji: '🍾',
    upfront: '5–10',
    humidity: 'Poor',
    dfwRating: '❌ Not Ideal',
    dfwNote: 'DFW humidity swings and AC fluctuations cause cork to swell and shrink — avoid in most DFW homes',
    rooms: ['bedroom'],
    lifespan: '10–25 yrs',
    budgetScore: 2,
  },
];

export default function DFWFlooringMaterialsCompared() {
  const [room, setRoom] = useState<string>('living');
  const [lifestyle, setLifestyle] = useState<string>('family');
  const [budget, setBudget] = useState<number>(2);
  const [selected, setSelected] = useState<string | null>(null);

  const getRecommendation = () => {
    if (room === 'bathroom' || room === 'kitchen') {
      return budget >= 3 ? 'porcelain' : 'lvp';
    }
    if (room === 'bedroom' && lifestyle === 'cozy') return 'carpet';
    if (room === 'bedroom' && budget === 1) return 'lvp';
    if (lifestyle === 'pets' || lifestyle === 'kids') return 'lvp';
    if (budget >= 3 && room === 'living') return 'engineered';
    return 'lvp';
  };

  const rec = getRecommendation();
  const filtered = materials.filter(m => m.rooms.includes(room));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Flooring Materials Compared</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>DFW humidity and temperature swings change which floors hold up</p>
        </div>

        <div style={{ background: '#1a1020', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>💧</span>
          <div>
            <div style={{ fontWeight: 600, color: '#F5E642′ }}>DFW Humidity Reality</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>DFW swings from 20% humidity in February to 80%+ in June. Many flooring materials that work elsewhere fail in North Texas homes without perfect HVAC control.</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Your Situation</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Room Type</label>
              <select value={room} onChange={e => setRoom(e.target.value)}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="living">Living / common areas</option>
                <option value="bedroom">Bedroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="basement">Basement (rare in DFW)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Lifestyle</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="family">Active family</option>
                <option value="pets">Pets in the home</option>
                <option value="kids">Young kids</option>
                <option value="cozy">Comfort-focused</option>
                <option value="entertaining">Love to entertain</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Budget ($ per sq ft installed)</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Under $5/sq ft</option>
                <option value={2}>$5–$10/sq ft</option>
                <option value={3}>$10+ /sq ft</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f3020', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>⭐ BEST FLOORING FOR YOUR DFW HOME</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{materials.find(m => m.id === rec)?.emoji} {materials.find(m => m.id === rec)?.name}</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{materials.find(m => m.id === rec)?.dfwNote}</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {(filtered.length > 0 ? filtered : materials).map(m => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ background: selected === m.id ? '#0f2040′ : '#0f1e35', border: `1px solid ${m.id === rec ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20, cursor: ’pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{m.name} {m.id === rec && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, padding: '2px 8px', borderRadius: 4, marginLeft: 6 }}>BEST FIT</span>}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>${m.upfront}/sq ft · {m.lifespan}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 13 }}>
                  <div>{m.dfwRating}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>humidity: {m.humidity}</div>
                </div>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1e3a5f', color: '#94a3b8', fontSize: 14 }}>
                  🌡️ <strong>DFW Note:</strong> {m.dfwNote}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0f2040', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Get a free quote from a DFW flooring contractor</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>🏠 Get Free DFW Flooring Quote</button>
        </div>
      </div>
    </div>
  );
}
