import { useState } from 'react';

const surfaces = ['Bathtub/shower tile', 'Kitchen backsplash', 'Bathroom floor tile', 'Trim/baseboards/crown', 'Exterior siding joints', 'Window frames'];
const colorDesc = ['Bright white', 'Off-white/cream', 'Beige/tan', 'Gray (light to dark)', 'Almond/ivory', 'Custom/unknown color'];

type CaulkRec = { caulkType: string; colorApproach: string; whereInDFW: string; tip: string };

function getRecommendation(surface: string, color: string): CaulkRec {
  if (surface.includes('shower') || surface.includes('Bathtub')) return { caulkType: '100% silicone or siliconized latex', colorApproach: color === 'Bright white' ? 'Bright white silicone — GE Supreme or DAP 100%' : color.includes('Gray') ? 'Clear silicone — matches grout lines better than gray caulk' : 'Color-match sample to Sherwin-Williams paint chip, then find closest DAP Alex Plus', whereInDFW: 'Home Depot on Industrial Blvd or Lowe\’s in Plano have best color selection', tip: 'DFW humidity and AC swings dry out latex caulk fast. Use silicone in wet areas — never latex.' };
  if (surface.includes('backsplash')) return { caulkType: 'Sanded or unsanded grout caulk (matches grout)', colorApproach: 'Match to existing grout exactly — bring a tile chip to TileShop in Dallas or Floor & Decor', whereInDFW: 'Floor & Decor (multiple DFW locations) has grout-matched caulk tubes in 40+ colors', tip: 'Kitchen tile in DFW often has regional color codes from 1980s–2000s builders. TileShop can match by manufacturer.' };
  if (surface.includes('floor tile')) return { caulkType: 'Flexible grout caulk — never rigid caulk', colorApproach: color.includes('Gray') ? 'Polyblend grout caulk in matching gray — Custom Building Products #380 or #115' : 'Bring floor tile chip to Floor & Decor for custom match', whereInDFW: 'Floor & Decor in Fort Worth or Irving best for DFW builder-grade tile color matching', tip: 'Floor corners always need flexible caulk not grout — DFW slab movement cracks rigid grout in corners within months.' };
  if (surface.includes('Trim')) return { caulkType: 'Paintable latex caulk (Alex Plus or similar)', colorApproach: 'Go white and paint over. DFW builder homes almost all use SW Extra White trim.', whereInDFW: 'Any hardware store. DAP Alex Plus in white — then paint with Sherwin-Williams Emerald trim paint.', tip: 'Prime and paint over caulk for best match. DFW trim colors vary by builder era — pre-2000 often cream, post-2010 bright white.' };
  if (surface.includes('Exterior')) return { caulkType: 'Elastomeric exterior caulk (paintable)', colorApproach: 'White or match siding — DFW builders used 6 common siding colors. Colorfast or Sherwin match possible.', whereInDFW: 'Sherwin-Williams stores across DFW can color-tint exterior caulk tubes', tip: 'DFW summer heat (100°F+) destroys low-grade exterior caulk in 2–3 years. Use 50-year rated elastomeric.' };
  return { caulkType: 'Clear silicone (universal default)', colorApproach: 'Clear wins when you cannot match — it disappears visually against any color', whereInDFW: 'Any Home Depot or Lowe\’s in DFW — GE Silicone 1+ in clear is the safe universal choice', tip: 'Clear caulk can yellow over time in UV exposure. Use clear only in non-sunlit areas or use UV-resistant formula.' };
}

export default function DFWCaulkColorGuide() {
  const [surface, setSurface] = useState('');
  const [color, setColor] = useState('');
  const rec = surface && color ? getRecommendation(surface, color) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '2rem' }}>🎨🔧</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Caulk Color Matching Guide</h1>
          <p style={{ color: '#94a3b8' }}>DFW builder tile and grout colors are regional. Here's how to match caulk without guessing.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏡 Why DFW Caulk Matching Is Tricky</h2>
          {[['Builder-era color clustering', 'DFW homes built 1985–2005 used regional tile colors — almond, bisque, and bone were dominant. Matching today requires knowing the era.'],
            ['Heat degrades caulk faster', 'DFW summers destroy latex caulk in wet areas faster than northern climates. Use silicone in showers/tubs.'],
            ['Grout varies by builder', 'Custom, KB, DR Horton, and Pulte all had preferred tile/grout combos. Floor & Decor DFW staff often recognize them.'],
            ['Clear vs. color-matched', 'Clear silicone is the universal fallback — it blends with any grout color and ages better than mismatched caulk.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Match Recommendation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Surface you're caulking:</label>
            <select value={surface} onChange={e => setSurface(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select surface...</option>
              {surfaces.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Existing tile/grout/trim color:</label>
            <select value={color} onChange={e => setColor(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select color range...</option>
              {colorDesc.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ backgroundColor: '#162d4a', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642' }}>
              {[['Caulk type to use', rec.caulkType], ['Color approach', rec.colorApproach], ['Where to find in DFW', rec.whereInDFW]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: '0.8rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ color: '#e2e8f0' }}>{val}</div>
                </div>
              ))}
              <div style={{ padding: '0.8rem', backgroundColor: '#0A1628', borderRadius: 6, color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>💡 {rec.tip}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏪 DFW Color Match Resources</h2>
          {[['Floor & Decor', 'Multiple DFW locations — best for grout-matched caulk by SKU', '⭐⭐⭐⭐⭐'],
            ['TileShop Dallas', 'Specialty tile colors and grout caulk matching', '⭐⭐⭐⭐'],
            ['Sherwin-Williams', 'Can tint exterior caulk to any SW paint color', '⭐⭐⭐⭐'],
            ['Home Depot / Lowe\’s', 'Standard colors — Polyblend grout caulk has 40+ options', '⭐⭐⭐'],
          ].map(([store, desc, stars]) => (
            <div key={store} style={{ marginBottom: '1rem', padding: '0.8rem', backgroundColor: '#162d4a', borderRadius: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{store}</span>
                <span>{stars}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
