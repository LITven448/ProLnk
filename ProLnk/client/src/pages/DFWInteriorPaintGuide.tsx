import { useState } from 'react';

const ROOM_SIZES: Record<string, number> = {
  small: 120,
  medium: 200,
  large: 320,
};

const PAINT_TIERS: Record<string, { label: string; costPerGallon: number; coverage: number }> = {
  budget: { label: 'Budget (flat/eggshell)', costPerGallon: 35, coverage: 350 },
  mid: { label: 'Mid-Range (satin)', costPerGallon: 55, coverage: 400 },
  premium: { label: 'Premium (low-VOC satin)', costPerGallon: 80, coverage: 425 },
};

const CEILING_MULTIPLIERS: Record<string, number> = {
  '8': 1.0,
  '9': 1.12,
  '10': 1.25,
  vaulted: 1.5,
};

const LABOR_PER_SQFT = 1.85;

export default function DFWInteriorPaintGuide() {
  const [roomCount, setRoomCount] = useState(3);
  const [roomSize, setRoomSize] = useState('medium');
  const [ceilingHeight, setCeilingHeight] = useState('9');
  const [paintTier, setPaintTier] = useState('mid');

  const sqft = ROOM_SIZES[roomSize] * roomCount * CEILING_MULTIPLIERS[ceilingHeight];
  const tier = PAINT_TIERS[paintTier];
  const gallonsNeeded = Math.ceil((sqft / tier.coverage) * 2);
  const materialCost = gallonsNeeded * tier.costPerGallon;
  const laborCost = sqft * LABOR_PER_SQFT;
  const totalCost = materialCost + laborCost;
  const daysNeeded = Math.ceil(roomCount * 0.75);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>
            🏠 DFW INTERIOR PAINTING
          </span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
          Interior Paint Guide for DFW Homeowners
        </h1>
        <p style={{ color: '#8A9BBE', fontSize: 16, marginBottom: 40 }}>
          North Texas humidity swings, temperature extremes, and UV intensity demand paint products and prep work tailored for DFW conditions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🌡️', title: 'DFW Climate Impact', body: 'Dallas summers hit 105°F with 65% humidity. Cheap latex expands and contracts leading to cracking within 2-3 years. Low-VOC 100% acrylic latex is the only viable choice for North Texas interiors.' },
            { icon: '🧹', title: 'Prep Is Everything', body: 'In DFW homes, slab foundations cause settling cracks that resurface in drywall. Skim coat cracks, sand glossy surfaces, and prime bare drywall before any topcoat or your new paint will fail fast.' },
            { icon: '🎨', title: '2026 Color Trends', body: 'Leading DFW designers favor warm neutrals: Accessible Beige (SW 7036), Agreeable Gray (SW 7029), and bold accents like Rojo Dust and Urbane Bronze. Warm tones sell homes 11 days faster in DFW.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 16, padding: 32, border: '1px solid #1E2D4A', marginBottom: 40 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Cost & Timeline Estimator</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Number of Rooms</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setRoomCount(Math.max(1, roomCount - 1))} style={{ backgroundColor: '#1E2D4A', color: '#F5E642', border: 'none', borderRadius: 6, width: 36, height: 36, fontSize: 20, cursor: 'pointer' }}>−</button>
                <span style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{roomCount}</span>
                <button onClick={() => setRoomCount(Math.min(12, roomCount + 1))} style={{ backgroundColor: '#1E2D4A', color: '#F5E642', border: 'none', borderRadius: 6, width: 36, height: 36, fontSize: 20, cursor: 'pointer' }}>+</button>
              </div>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Room Size</label>
              <select value={roomSize} onChange={e => setRoomSize(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                <option value="small">Small (120 sqft)</option>
                <option value="medium">Medium (200 sqft)</option>
                <option value="large">Large (320 sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Ceiling Height</label>
              <select value={ceilingHeight} onChange={e => setCeilingHeight(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                <option value="8″>8 ft (standard)</option>
                <option value="9″>9 ft</option>
                <option value="10″>10 ft</option>
                <option value="vaulted">Vaulted / Cathedral</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Paint Quality</label>
              <select value={paintTier} onChange={e => setPaintTier(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(PAINT_TIERS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { label: 'Paint Cost', value: `$${materialCost.toLocaleString()}`, sub: `${gallonsNeeded} gal × $${tier.costPerGallon}` },
              { label: 'Labor Cost', value: `$${laborCost.toLocaleString()}`, sub: `${Math.round(sqft).toLocaleString()} sqft` },
              { label: 'Total Estimate', value: `$${totalCost.toLocaleString()}`, sub: 'materials + labor', highlight: true },
              { label: 'Timeline', value: `${daysNeeded} days`, sub: 'professional crew' },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: stat.highlight ? '#F5E642′ : '#0A1628', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#8A9BBE', fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#FFFFFF', fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: stat.highlight ? '#0A162880′ : '#4A5B7A', fontSize: 11 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>✅ DFW Pro Tips</h3>
          <ul style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 2, paddingLeft: 20 }}>
            <li>Schedule painting October–April to avoid summer humidity banding</li>
            <li>Always use low-VOC: Texas VOC regulations and indoor air quality benefit</li>
            <li>Two coats minimum — DFW dust and UV degrade single-coat finishes fast</li>
            <li>Prime new drywall and repaired spots or sheen will look uneven</li>
            <li>Use satin on walls and semi-gloss on trim for best DFW durability</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
