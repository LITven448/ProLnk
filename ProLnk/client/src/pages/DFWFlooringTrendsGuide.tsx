import { useState } from 'react';

const styles = ['Modern/Contemporary', 'Transitional', 'Farmhouse/Rustic', 'Traditional', 'Coastal/Light'];
const budgets = ['Under $5/sq ft', '$5–$10/sq ft', '$10–$18/sq ft', '$18+/sq ft'];

const recommendations: Record<string, Record<string, { floor: string; cost: string; note: string }>> = {
  'Modern/Contemporary': {
    'Under $5/sq ft': { floor: 'Natural LVP (Luxury Vinyl Plank)', cost: '$3–$5/sq ft material', note: 'Best value for DFW humidity resistance. Wide plank, matte finish.' },
    '$5–$10/sq ft': { floor: 'Engineered White Oak', cost: '$6–$9/sq ft material', note: 'Real wood look, dimensionally stable in DFW heat cycles.' },
    '$10–$18/sq ft': { floor: 'Polished Concrete or Large Format Tile', cost: '$10–$16/sq ft installed', note: 'Statement look. Requires radiant heating for comfort in winter.' },
    '$18+/sq ft': { floor: 'Wide Plank Solid White Oak', cost: '$18–$30/sq ft installed', note: 'Premium choice. Acclimate 2 weeks before install in DFW humidity.' },
  },
  'Transitional': {
    'Under $5/sq ft': { floor: 'Natural LVP — Light Honey Oak Look', cost: '$3–$5/sq ft material', note: 'Top seller in Frisco, Allen, McKinney suburbs.' },
    '$5–$10/sq ft': { floor: 'Engineered Hardwood — Wire Brushed Oak', cost: '$7–$10/sq ft material', note: 'Hides scratches, very popular in DFW new builds.' },
    '$10–$18/sq ft': { floor: 'European Oak Hardwood', cost: '$12–$16/sq ft material', note: 'Long planks (5″+ wide), warm natural tone. Top DFW resale value.' },
    '$18+/sq ft': { floor: 'Custom Stained White Oak', cost: '$20–$35/sq ft installed', note: 'Designer grade. Custom stain matching to cabinetry very popular.' },
  },
  'Farmhouse/Rustic': {
    'Under $5/sq ft': { floor: 'Hand-Scraped LVP', cost: '$3–$5/sq ft material', note: 'Hides wear, great for pets and kids. Authentic rustic look at budget price.' },
    '$5–$10/sq ft': { floor: 'Reclaimed-Look Engineered Wood', cost: '$6–$8/sq ft material', note: 'Warm tones, character marks, pairs with shiplap.' },
    '$10–$18/sq ft': { floor: 'True Reclaimed Wood', cost: '$12–$18/sq ft material', note: 'Authentic character. Requires professional installation for stability.' },
    '$18+/sq ft': { floor: 'Genuine Reclaimed Barn Wood', cost: '$18–$40/sq ft installed', note: 'Maximum character. DFW sourcing from Texas barns adds provenance.' },
  },
  'Traditional': {
    'Under $5/sq ft': { floor: 'Luxury Vinyl — Dark Walnut Look', cost: '$3–$5/sq ft material', note: 'Safer bet than real dark stains which are trending out.' },
    '$5–$10/sq ft': { floor: 'Engineered Hardwood — Medium Brown', cost: '$7–$9/sq ft material', note: 'Classic look, practical DFW performance.' },
    '$10–$18/sq ft': { floor: 'Solid Oak — Medium Stain', cost: '$11–$16/sq ft installed', note: 'Timeless. Choose lighter stains for longevity of appeal.' },
    '$18+/sq ft': { floor: 'Solid Walnut or Hickory', cost: '$20–$35/sq ft installed', note: 'Luxury traditional. Walnut very popular in Southlake estates.' },
  },
  'Coastal/Light': {
    'Under $5/sq ft': { floor: 'White/Gray LVP — Wide Plank', cost: '$3–$5/sq ft material', note: 'Light and airy. Washes out dark DFW interiors beautifully.' },
    '$5–$10/sq ft': { floor: 'White Oak — Natural or Whitewash', cost: '$6–$9/sq ft material', note: 'Bright, open feel. Works with all light paint palettes.' },
    '$10–$18/sq ft': { floor: 'Cerused White Oak', cost: '$12–$16/sq ft material', note: 'White grain fill creates coastal-contemporary look. Trending.' },
    '$18+/sq ft': { floor: 'Italian Porcelain Tile — Stone Look', cost: '$18–$30/sq ft installed', note: 'Ultimate coastal. Large format 24″x48″ slabs — stunning.' },
  },
};

export default function DFWFlooringTrendsGuide() {
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [rec, setRec] = useState<null | { floor: string; cost: string; note: string }>(null);

  function getRecommendation() {
    if (style && budget && recommendations[style]?.[budget]) {
      setRec(recommendations[style][budget]);
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW Flooring Trends 2026</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Flooring Trends Guide</h1>
        <p style={{ fontSize: 17, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>What DFW buyers want, what's going out of style, and what actually performs in North Texas climate.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#4ade80′ }}>✅ What’s In (2026)</h2>
            {['White oak wide plank hardwood', 'Natural LVP — light honey tones', 'Polished concrete in modern homes', 'Terracotta tile accents in entryways', 'Large format porcelain (24″x48″)', 'Wire-brushed & hand-scraped textures'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#cbd5e1', padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>{item}</div>
            ))}
          </div>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#f87171′ }}>❌ What’s Out</h2>
            {['Dark espresso stain hardwood', 'Gray laminate flooring', 'Wall-to-wall carpet in main areas', 'Small 12″x12″ tile in main spaces', 'Narrow strip hardwood (2.25″)', 'Honey-gold oak (90s toned)'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#94a3b8', padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>🌡️ DFW Climate Consideration</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>DFW temperature swings 80°F+ between seasons. Solid hardwood expands and contracts significantly — LVP and engineered hardwood handle this far better. If choosing solid wood, choose quartersawn or rift-sawn cuts which are more dimensionally stable. Always acclimate materials 7–14 days before install.</p>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Get My Flooring Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Design Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select your style...</option>
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Material Budget (per sq ft)</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select budget range...</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Get Recommendation</button>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 8, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8, color: '#F5E642′ }}>{rec.floor}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#4ade80′ }}>{rec.cost}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
