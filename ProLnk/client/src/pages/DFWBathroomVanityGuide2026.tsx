import { useState } from 'react';

const vanityOptions = [
  { id: 'floating', label: '🛁 Floating Vanity', sizes: ['small','medium','large'], priorities: ['modern','cleaning','flood'], desc: 'Floor-mounted plumbing hidden in wall. Easy floor cleaning. DFW favorite in modern remodels. Avoid in high-humidity baths without ventilation.' },
  { id: 'floorMounted', label: '🪵 Floor-Mounted Vanity', sizes: ['small','medium','large'], priorities: ['traditional','storage','stability'], desc: 'More storage, more stable. Standard in DFW traditional homes. Use plywood base — particleboard swells in humidity.' },
  { id: 'double', label: '👫 Double Sink Vanity', sizes: ['large'], priorities: ['master','storage','modern'], desc: 'DFW master bath standard. 60-72" wide. Requires minimum 8ft bathroom width. Two basins, shared storage.' },
  { id: 'single', label: '🚿 Single Sink Vanity', sizes: ['small','medium'], priorities: ['guest','budget','small'], desc: 'Best for DFW guest baths and secondary baths. 30-48" wide. More countertop space per basin.' },
];

const bathSizes = ['small','medium','large'];
const priorities = ['modern','storage','master','guest','budget','traditional','cleaning','flood','small','stability'];

export default function DFWBathroomVanityGuide2026() {
  const [bathSize, setBathSize] = useState('');
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState<typeof vanityOptions | null>(null);

  function getRecommendation() {
    const matches = vanityOptions.filter(o =>
      (!bathSize || o.sizes.includes(bathSize)) && (!priority || o.priorities.includes(priority))
    );
    setResult(matches.length ? matches : vanityOptions);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🛁 DFW Bathroom Vanity Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Vanity selection tailored for DFW homes — humidity, resale value, and DFW buyer expectations.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>🏠 DFW Resale Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>DFW buyers expect double sinks in master baths. Solid wood in high-humidity baths without proper ventilation will swell — always use plywood-based cabinets.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{ label: '🛁 Floating', desc: 'Modern, easy to clean' },{ label: '🪵 Floor-Mounted', desc: 'Storage, traditional' },{ label: '👫 Double Sink', desc: 'DFW master standard' },{ label: '🚿 Single Sink', desc: 'Guest bath, budget' }].map(o => (
            <div key={o.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700 }}>{o.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Find Your Vanity</h2>
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
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Priority</option>
                <option value='modern'>Modern Look</option>
                <option value='storage'>Storage</option>
                <option value='master'>Master Bath</option>
                <option value='guest'>Guest Bath</option>
                <option value='budget'>Budget</option>
                <option value='traditional'>Traditional Style</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Get My Vanity Recommendation →</button>
        </div>

        {result && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Vanities</h3>
            {result.map(r => (
              <div key={r.id} style={{ background: '#132035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>📏 DFW Standard Dimensions</h3>
          {[['Master bath double sink', '60–72 inches wide'],['Guest bath single sink', '30–48 inches wide'],['Vanity depth', '21–24 inches standard'],['Counter height', '36 inches (comfort height)']].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8' }}>{k}</span><span style={{ color: '#F5E642' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}