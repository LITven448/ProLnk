import { useState } from 'react';

const lightingOptions = [
  { id: 'vanityBarSide', label: '💡 Side Vanity Bar Lights', sizes: ['small','medium','large'], types: ['master','guest','powder'], desc: 'Side placement eliminates under-eye shadows. Best for grooming in DFW homes. Pair two fixtures flanking mirror at eye level.' },
  { id: 'vanityBarTop', label: '🔆 Top Vanity Bar Light', sizes: ['small','medium'], types: ['guest','powder','budget'], desc: 'Common in DFW builder-grade baths. Creates more shadows than side placement but works for general use.' },
  { id: 'recessed', label: '⭕ Recessed Lighting', sizes: ['medium','large'], types: ['master','modern','shower'], desc: 'Clean look in DFW modern baths. Add wet-rated cans over shower. Pairs well with vanity sconces for layered light.' },
  { id: 'naturalLight', label: '☀️ Natural Light Window', sizes: ['medium','large'], types: ['master','natural'], desc: 'DFW natural light is abundant. Privacy window film lets light in while blocking neighbors. North-facing windows = diffused light.' },
];

const bathSizes = ['small','medium','large'];
const bathTypes = ['master','guest','powder','modern','shower','natural','budget'];

export default function DFWBathroomLightingGuide2026() {
  const [bathSize, setBathSize] = useState('');
  const [bathType, setBathType] = useState('');
  const [result, setResult] = useState<typeof lightingOptions | null>(null);

  function getRecommendation() {
    const matches = lightingOptions.filter(o =>
      (!bathSize || o.sizes.includes(bathSize)) && (!bathType || o.types.includes(bathType))
    );
    setResult(matches.length ? matches : lightingOptions);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>💡 DFW Bathroom Lighting Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Bathroom lighting done right for DFW vanities — flattering, functional, and code-compliant in North Texas.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>🎨 DFW Color Temperature Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Use 2700-3000K bulbs for flattering skin tones. DFW homes with warm neutral finishes look best at 2700K. Avoid 4000K+ — too harsh and clinical.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{ label: '💡 Side Bar', desc: 'Best — no shadows' },{ label: '🔆 Top Bar', desc: 'Common, more shadows' },{ label: '⭕ Recessed', desc: 'Modern layered lighting' },{ label: '☀️ Natural Light', desc: 'DFW sunlight + privacy film' }].map(o => (
            <div key={o.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700 }}>{o.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Find Your Lighting</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Bathroom Size</label>
              <select value={bathSize} onChange={e => setBathSize(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Size</option>
                <option value='small'>Small (under 50 sq ft)</option>
                <option value='medium'>Medium (50-80 sq ft)</option>
                <option value='large'>Large (80+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Bathroom Type</label>
              <select value={bathType} onChange={e => setBathType(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Type</option>
                <option value='master'>Master Bath</option>
                <option value='guest'>Guest Bath</option>
                <option value='powder'>Powder Room</option>
                <option value='modern'>Modern Style</option>
                <option value='natural'>Natural Light Priority</option>
                <option value='budget'>Budget Build</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Get My Lighting Recommendation →</button>
        </div>

        {result && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Lighting</h3>
            {result.map(r => (
              <div key={r.id} style={{ background: '#132035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>⚡ DFW Code Requirements</h3>
          {[['GFCI outlets', 'Required within 6 ft of any water source'],['Shower light', 'Must be wet-rated (damp-rated minimum)'],['Exhaust fan', 'Required in all DFW enclosed baths'],['Dimmer switches', 'LED-compatible dimmers only in DFW code']].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8' }}>{k}</span><span style={{ color: '#F5E642' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}