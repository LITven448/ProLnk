import { useState } from 'react';

const adhesiveData: Record<string, { product: string; tempRating: string; tips: string; warning?: string }> = {
  'drywall-normal': { product: 'Liquid Nails Heavy Duty (LN-903)', tempRating: 'Up to 150°F', tips: 'Apply in zigzag pattern, press firmly, brace 24hrs. DFW summers OK.' },
  'drywall-hot': { product: 'Loctite PL Premium Max', tempRating: 'Up to 200°F', tips: 'Critical for DFW attic-adjacent walls. Exceeds standard Liquid Nails heat tolerance.' },
  'wood-normal': { product: 'Titebond III Ultimate', tempRating: 'Up to 110°F', tips: 'Waterproof for DFW humidity. Clamp 30-60min. Full cure 24hrs.' },
  'wood-hot': { product: 'Gorilla Wood Glue (Pro)', tempRating: 'Up to 140°F', tips: 'DFW outdoor wood joints in direct sun need this grade. Interior OK with standard.' },
  'concrete-normal': { product: 'Quikrete Construction Adhesive', tempRating: 'Up to 160°F', tips: 'Clean surface, apply 1/4in bead, press 60 seconds. Set in DFW heat faster.' },
  'concrete-hot': { product: 'Loctite PL 500 Landscape Block', tempRating: 'Up to 220°F', tips: 'DFW driveways and patios — standard adhesives fail in summer ground temps.' },
  'tile-normal': { product: 'DAP Premium Construction Adhesive', tempRating: 'Up to 120°F', tips: 'Indoor tile only. DFW interior temps fine. Not for outdoor.' },
  'tile-hot': { product: 'Custom Building Products VersaBond', tempRating: 'Up to 180°F', tips: 'DFW pool decks and patios. Flex-modified required for thermal cycling.' },
};

export default function DFWAdhesiveGuide() {
  const [surface, setSurface] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<{ product: string; tempRating: string; tips: string } | null>(null);

  function getRecommendation() {
    if (!surface || !condition) return;
    const key = `${surface}-${condition}`;
    setResult(adhesiveData[key] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔧</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Adhesive Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW summers hit 105°F+ — many adhesives fail above 100°F. Choose the right product for your project and conditions.
        </p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>⚠️ DFW Heat Warning</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Standard Liquid Nails: fails at 90°F in direct sun', 'Most foam adhesives: bubble and release at 95°F+', 'Gorilla Glue (original): expands uncontrollably in DFW heat', 'Epoxy putty sticks: short working time — work in shade'].map(w => (
              <div key={w} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#CBD5E1', borderLeft: '3px solid #F5A623′ }}>
                ⚡ {w}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Find Your Adhesive</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Surface Type</label>
              <select value={surface} onChange={e => setSurface(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select surface...</option>
                <option value="drywall">Drywall / Interior Wall</option>
                <option value="wood">Wood / Lumber</option>
                <option value="concrete">Concrete / Masonry</option>
                <option value="tile">Tile / Stone</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>DFW Exposure</label>
              <select value={condition} onChange={e => setCondition(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select condition...</option>
                <option value="normal">Interior / Shaded</option>
                <option value="hot">Outdoor / Direct Sun / Attic</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>✅ Recommended Product</h3>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#E8EDF5', marginBottom: 6 }}>🛒 {result.product}</div>
              <div style={{ color: '#F5A623', fontSize: 13 }}>🌡️ Temp Rating: {result.tempRating}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Application Tips for DFW:</div>
              <div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.tips}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
