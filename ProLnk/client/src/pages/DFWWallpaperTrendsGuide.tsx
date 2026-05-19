import { useState } from 'react';

type RoomType = 'powder' | 'dining' | 'bedroom' | 'entryway' | 'living';
type StylePref = 'bold' | 'subtle' | 'botanical' | 'geometric' | 'textured';

const roomInfo: Record<RoomType, { label: string; diyDiff: string; note: string }> = {
  powder: { label: 'Powder Bath', diyDiff: 'Medium', note: 'Most popular wallpaper room in DFW. Small scale = lower cost, high drama. Humidity moderate — peel-and-stick risky near sink.' },
  dining: { label: 'Dining Room', diyDiff: 'Hard', note: 'Statement dining room wallpaper is making a huge comeback. Tall ceilings in DFW new builds make this a showstopper.' },
  bedroom: { label: 'Bedroom / Accent Wall', diyDiff: 'Easy', note: 'Accent wall behind headboard is the safest entry point. Low humidity = peel-and-stick performs well here.' },
  entryway: { label: 'Entryway / Foyer', diyDiff: 'Medium', note: 'Foyer wallpaper sets tone for entire home. DFW buyers love a dramatic first impression. Traditional paste recommended.' },
  living: { label: 'Living Room', diyDiff: 'Hard', note: 'Large surface area. Professional install strongly recommended. Feature wall only is the practical DFW approach.' },
};

const styleRecs: Record<StylePref, { name: string; desc: string; dfwNote: string; costRange: string }> = {
  bold: { name: 'Maximalist Floral / Jungle', desc: 'Large-scale botanicals, tropical leaves, oversized blooms in rich colors', dfwNote: 'Top seller in DFW powder baths. Cole & Son, Schumacher, and Hygge & West lead the category.', costRange: '$8–$18/sq ft installed' },
  subtle: { name: 'Subtle Texture / Grasscloth', desc: 'Woven grasscloth, linen texture, tone-on-tone patterns', dfwNote: 'Most resale-safe option. Natural grasscloth adds warmth without polarizing buyers.', costRange: '$6–$14/sq ft installed' },
  botanical: { name: 'Classic Botanical Prints', desc: 'Toile, chinoiserie, vintage botanical illustrations', dfwNote: 'Huge trend in Highland Park, Preston Hollow, and traditional DFW neighborhoods.', costRange: '$7–$15/sq ft installed' },
  geometric: { name: 'Geometric / Abstract', desc: 'Modern shapes, abstract marks, graphic grid patterns', dfwNote: 'Popular in Uptown/Design District adjacent homes and modern DFW new builds.', costRange: '$7–$16/sq ft installed' },
  textured: { name: '3D Texture / Plaster Effect', desc: 'Embossed textures, layered plaster look, dimensional paper', dfwNote: 'Rising trend that photographs beautifully. Adds depth without strong pattern commitment.', costRange: '$9–$20/sq ft installed' },
};

const installCosts: Record<RoomType, { sqft: string; matCost: string; installCost: string; diyCost: string }> = {
  powder: { sqft: '60–100 sq ft', matCost: '$200–$600', installCost: '$300–$600', diyCost: '$150–$400′ },
  dining: { sqft: '200–400 sq ft', matCost: '$800–$3,000', installCost: '$800–$1,800', diyCost: '$500–$1,500′ },
  bedroom: { sqft: '100–200 sq ft', matCost: '$400–$1,400', installCost: '$400–$900', diyCost: '$250–$800′ },
  entryway: { sqft: '80–160 sq ft', matCost: '$350–$1,200', installCost: '$400–$900', diyCost: '$200–$600′ },
  living: { sqft: '300–600 sq ft', matCost: '$1,200–$5,000', installCost: '$1,200–$3,000', diyCost: '$700–$2,000′ },
};

export default function DFWWallpaperTrendsGuide() {
  const [room, setRoom] = useState<RoomType | ''>('');
  const [style, setStyle] = useState<StylePref | ''>('');
  const [rec, setRec] = useState<null | { roomData: typeof roomInfo[RoomType]; styleData: typeof styleRecs[StylePref]; costs: typeof installCosts[RoomType] }>(null);

  function getRecommendation() {
    if (!room || !style) return;
    setRec({
      roomData: roomInfo[room],
      styleData: styleRecs[style],
      costs: installCosts[room],
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW Wallpaper Guide 2026</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Wallpaper Comeback: DFW Guide</h1>
        <p style={{ fontSize: 17, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>Wallpaper is back in a big way across DFW. Here's where it works, what’s trending, and when to call a pro.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#4ade80′ }}>✅ Best Rooms for Wallpaper</h2>
            {[
              { r: '🚿 Powder Bath', d: '#1 choice in DFW — small space, huge impact' },
              { r: '🍽️ Dining Room', d: 'Statement walls with DFW tall ceilings' },
              { r: '🛏️ Bedroom Accent Wall', d: 'Headboard wall, low humidity = safe for P&S' },
              { r: '🚪 Foyer/Entryway', d: 'First impression, traditional paste best' },
            ].map(item => (
              <div key={item.r} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.r}</div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>{item.d}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#fbbf24′ }}>⚠️ DFW Humidity Considerations</h2>
            <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.7 }}>
              <p style={{ marginBottom: 12 }}>Peel-and-stick wallpaper performs well in low-humidity rooms (bedrooms, living areas) but <strong>fails in bathrooms and kitchens</strong> where steam and moisture loosen adhesive.</p>
              <p style={{ marginBottom: 0 }}>For powder baths and dining rooms, use traditional paste-the-wall or paste-the-paper wallpaper. It lasts 10–20 years with proper prep.</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🌿 Trending DFW Patterns 2026</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {Object.entries(styleRecs).map(([key, s]) => (
              <div key={key} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#F5E642′ }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Get My Wallpaper Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Room Type</label>
              <select value={room} onChange={e => setRoom(e.target.value as RoomType)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select room...</option>
                {(Object.entries(roomInfo) as [RoomType, typeof roomInfo[RoomType]][]).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Style Preference</label>
              <select value={style} onChange={e => setStyle(e.target.value as StylePref)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select style...</option>
                {(Object.entries(styleRecs) as [StylePref, typeof styleRecs[StylePref]][]).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Get Recommendation</button>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 8, padding: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4, color: '#F5E642′ }}>{rec.styleData.name} — {rec.roomData.label}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16, lineHeight: 1.6 }}>{rec.styleData.desc}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'Approx. Square Footage', val: rec.costs.sqft },
                  { label: 'Material Cost', val: rec.costs.matCost },
                  { label: 'Pro Install Cost', val: rec.costs.installCost },
                  { label: 'DIY Material Only', val: rec.costs.diyCost },
                ].map(item => (
                  <div key={item.label} style={{ background: '#0f2847', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontWeight: 700, color: '#4ade80′ }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: '#fbbf24', marginBottom: 8 }}>DIY Difficulty: {rec.roomData.diyDiff}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>💡 {rec.roomData.note}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, marginTop: 8 }}>🎨 {rec.styleData.dfwNote}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
