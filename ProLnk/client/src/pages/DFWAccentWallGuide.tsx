import { useState } from 'react';

type Material = 'shiplap' | 'boardbatten' | 'wallpaper' | 'paint' | 'stone';
type DiyPro = 'diy' | 'pro';

const materials: { id: Material; label: string; icon: string }[] = [
  { id: 'shiplap', label: 'Shiplap', icon: '🪵' },
  { id: 'boardbatten', label: 'Board & Batten', icon: '🔲' },
  { id: 'wallpaper', label: 'Wallpaper', icon: '🎨' },
  { id: 'paint', label: 'Accent Paint', icon: '🖌️' },
  { id: 'stone', label: 'Stone Veneer', icon: '🪨' },
];

const materialData: Record<Material, { dfw: string; rooms: string; diy: string; pro: string; skillLevel: string; timeRange: string }> = {
  shiplap: {
    dfw: 'Shiplap holds up well in DFW humidity when properly primed and caulked. Use solid wood or moisture-resistant MDF — avoid standard MDF in bathrooms.',
    rooms: 'Living rooms, bedrooms, entryways — works anywhere for farmhouse or transitional look',
    diy: '$3–6/sq ft material only',
    pro: '$8–14/sq ft installed',
    skillLevel: '🟡 Intermediate — cutting angles and tight seams are tricky',
    timeRange: '1–2 weekends for a standard 12×10 wall',
  },
  boardbatten: {
    dfw: 'Board and batten is one of the most humidity-tolerant millwork options. Widely used in DFW craftsman and transitional homes.',
    rooms: 'Dining rooms, foyers, hallways, home offices — adds architectural detail',
    diy: '$2–5/sq ft material',
    pro: '$7–12/sq ft installed',
    skillLevel: '🟢 Beginner-friendly — just requires a level and miter saw',
    timeRange: '1 weekend for a standard wall',
  },
  wallpaper: {
    dfw: 'Use peel-and-stick or pre-pasted modern wallpapers — DFW humidity can cause bubbling with cheap pastes. Avoid in bathrooms without proper ventilation.',
    rooms: 'Primary bedrooms, dining rooms, powder baths — where wow factor matters',
    diy: '$2–8/sq ft material (wide range by brand)',
    pro: '$6–15/sq ft installed',
    skillLevel: '🟡 Intermediate — pattern matching and seams require patience',
    timeRange: '4–8 hours per wall',
  },
  paint: {
    dfw: 'Paint is the #1 DFW accent wall choice. DFW\’s bright sun makes colors look different throughout the day — always test samples in your actual light before committing.',
    rooms: 'Every room — most versatile and reversible option',
    diy: '$0.50–1/sq ft (paint + supplies)',
    pro: '$2–5/sq ft with professional prep and finish',
    skillLevel: '🟢 Beginner — most DIY-able accent wall option',
    timeRange: '2–4 hours including drying time',
  },
  stone: {
    dfw: 'Natural and faux stone veneer are popular for DFW fireplace surrounds and media walls. Faux panels are humidity-safe and weigh much less than real stone.',
    rooms: 'Living room fireplace surround, media wall, exterior-facing interior walls',
    diy: '$5–12/sq ft (faux panels) — DIY-able with adhesive panels',
    pro: '$15–40/sq ft (real stone installed)',
    skillLevel: '🔴 Advanced for real stone — faux panels are 🟢 Beginner',
    timeRange: 'Faux panels: 1 day | Real stone: 2–5 days',
  },
};

export default function DFWAccentWallGuide() {
  const [material, setMaterial] = useState<Material>('shiplap');
  const [diyPro, setDiyPro] = useState<DiyPro>('pro');
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(9);

  const sqft = width * height;
  const data = materialData[material];

  const costRaw = diyPro === 'diy' ? data.diy : data.pro;
  const rateMatch = costRaw.match(/\$(\d+(?:\.\d+)?)–(\d+(?:\.\d+)?)/);
  const lowCost = rateMatch ? Math.round(parseFloat(rateMatch[1]) * sqft) : 0;
  const highCost = rateMatch ? Math.round(parseFloat(rateMatch[2]) * sqft) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', marginBottom: 8 }}>
          🎨 DFW Interior Guide
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          DFW Accent Wall Guide
        </h1>
        <p style={{ fontSize: 16, color: '#9BB0CC', lineHeight: 1.7, marginBottom: 40, maxWidth: 680 }}>
          Shiplap, board and batten, wallpaper, paint, or stone — the right choice depends on your room, your humidity zone, and whether you're picking up tools yourself.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {materials.map(m => (
            <button key={m.id} onClick={() => setMaterial(m.id)} style={{ padding: '10px 20px', borderRadius: 100, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: material === m.id ? '#F5E642' : 'rgba(255,255,255,0.1)', color: material === m.id ? '#0A1628' : '#ccc', transition: 'all 0.2s' }}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>🌡️ DFW Humidity Notes</div>
            <p style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6, margin: 0 }}>{data.dfw}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>🏠 Best Rooms</div>
            <p style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6, margin: 0 }}>{data.rooms}</p>
          </div>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>💰 Cost Estimator</h2>

          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: '#9BB0CC', display: 'block', marginBottom: 6 }}>WALL WIDTH (ft)</label>
              <input type="number" value={width} min={4} max={30} onChange={e => setWidth(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 16 }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: '#9BB0CC', display: 'block', marginBottom: 6 }}>WALL HEIGHT (ft)</label>
              <input type="number" value={height} min={7} max={20} onChange={e => setHeight(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 16 }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: '#9BB0CC', display: 'block', marginBottom: 6 }}>INSTALLATION</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                {(['diy', 'pro'] as DiyPro[]).map(d => (
                  <button key={d} onClick={() => setDiyPro(d)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: diyPro === d ? '#F5E642' : 'rgba(255,255,255,0.1)', color: diyPro === d ? '#0A1628' : '#ccc' }}>
                    {d === 'diy' ? '🔨 DIY' : '👷 Pro'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Wall Area</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{sqft} sq ft</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Estimated Cost</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>${lowCost.toLocaleString()}–${highCost.toLocaleString()}</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Time to Complete</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{data.timeRange}</div>
            </div>
          </div>

          <div style={{ marginTop: 16, padding: '14px 18px', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
            <span style={{ fontSize: 12, color: '#F5E642', fontWeight: 700 }}>SKILL LEVEL: </span>
            <span style={{ fontSize: 14, color: '#ccc' }}>{data.skillLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
