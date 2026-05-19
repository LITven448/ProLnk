import { useState } from 'react';

const backsplashOptions = [
  { id: 'subway', label: '🧱 Subway Tile', styles: ['traditional','farmhouse','transitional'], budgets: ['budget','mid'], desc: 'Classic and timeless. Easy to clean DFW cooking grease. Widely available, fast install.' },
  { id: 'largeTile', label: '⬜ Large Format Tile', styles: ['modern','contemporary','transitional'], budgets: ['mid','premium'], desc: 'Trending in DFW new builds. Fewer grout lines = less cleaning. Dramatic visual impact.' },
  { id: 'glass', label: '✨ Glass Mosaic', styles: ['modern','glam','coastal'], budgets: ['mid','premium'], desc: 'Reflective surface amplifies DFW natural light. Adds sparkle. Grout maintenance required.' },
  { id: 'quartz', label: '💎 Quartz Slab', styles: ['modern','contemporary'], budgets: ['premium'], desc: 'Seamless look, no grout lines. Premium DFW remodel choice. Durable against heat and grease.' },
];

const kitchenStyles = ['traditional','farmhouse','transitional','modern','contemporary','glam','coastal'];
const budgets = ['budget','mid','premium'];

export default function DFWKitchenBacksplashGuide2026() {
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<typeof backsplashOptions | null>(null);

  function getRecommendation() {
    const matches = backsplashOptions.filter(o =>
      (!style || o.styles.includes(style)) && (!budget || o.budgets.includes(budget))
    );
    setResult(matches.length ? matches : backsplashOptions);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🍳 DFW Kitchen Backsplash Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Find the right backsplash for your DFW kitchen — durability, style, and grease resistance in North Texas heat.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{ label: '🧱 Subway Tile', desc: 'Classic, easy clean' },{ label: '⬜ Large Format', desc: 'Fewer grout lines' },{ label: '✨ Glass Mosaic', desc: 'Light-enhancing' },{ label: '💎 Quartz Slab', desc: 'Seamless premium' }].map(o => (
            <div key={o.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700 }}>{o.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Find Your Backsplash</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Kitchen Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Style</option>
                {kitchenStyles.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Budget</option>
                <option value='budget'>Budget-Friendly</option>
                <option value='mid'>Mid-Range</option>
                <option value='premium'>Premium</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Get My Backsplash Recommendation →</button>
        </div>

        {result && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Options</h3>
            {result.map(r => (
              <div key={r.id} style={{ background: '#132035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🌡️ DFW-Specific Tip</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>DFW cooking generates more grease vapor in summer heat. Choose non-porous surfaces and seal all grout annually for best longevity.</p>
        </div>
      </div>
    </div>
  );
}