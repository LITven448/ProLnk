import { useState } from 'react';

const mirrorOptions = [
  { id: 'ledAntiLog', label: '💡 LED Anti-Fog Mirror', types: ['master','modern','shower'], priorities: ['fogresist','modern','lighting'], desc: 'Built-in anti-fog heating element. Backlit for ambient light. DFW shower steam eliminated. Best investment for master baths.' },
  { id: 'medicineCabinet', label: '🗄️ Medicine Cabinet Mirror', types: ['small','guest','storage'], priorities: ['storage','budget','small'], desc: 'Recessed storage behind mirror. DFW guest baths love the hidden storage. Flush with wall = clean look. Surface-mount option for tiled walls.' },
  { id: 'framedMirror', label: '🖼️ Framed Mirror', types: ['master','guest','traditional'], priorities: ['aesthetic','traditional','budget'], desc: 'Statement piece in DFW traditional and farmhouse baths. Size close to vanity width. Frame must be moisture-resistant for DFW humidity.' },
  { id: 'frameless', label: '⬜ Frameless Mirror', types: ['modern','master'], priorities: ['modern','minimal','clean'], desc: 'Clean minimalist look. DFW modern bath staple. No frame to trap moisture. Easy to clean edges with squeegee.' },
];

const bathTypes = ['master','guest','small','modern','traditional','storage','shower'];
const priorities = ['fogresist','modern','storage','budget','aesthetic','traditional','lighting','minimal','clean','small'];

export default function DFWMirrorGuide2026() {
  const [bathType, setBathType] = useState('');
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState<typeof mirrorOptions | null>(null);

  function getRecommendation() {
    const matches = mirrorOptions.filter(o =>
      (!bathType || o.types.includes(bathType)) && (!priority || o.priorities.includes(priority))
    );
    setResult(matches.length ? matches : mirrorOptions);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🪞 DFW Bathroom Mirror Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Choose the right bathroom mirror for DFW homes — fog resistance, sizing, and style for North Texas humidity.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>💨 DFW Fog Issue</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>DFW shower steam fogs mirrors instantly in summer. Standard mirrors need 5-10 minutes to clear. LED anti-fog mirrors with heating pads stay clear during use — highly recommended for master baths.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{ label: '💡 LED Anti-Fog', desc: 'Best for DFW steam' },{ label: '🗄️ Medicine Cabinet', desc: 'Hidden storage' },{ label: '🖼️ Framed Mirror', desc: 'Statement aesthetic' },{ label: '⬜ Frameless', desc: 'Clean, modern look' }].map(o => (
            <div key={o.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700 }}>{o.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Find Your Mirror</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Bathroom Type</label>
              <select value={bathType} onChange={e => setBathType(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Type</option>
                {bathTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Priority</option>
                <option value='fogresist'>Fog Resistance</option>
                <option value='modern'>Modern Look</option>
                <option value='storage'>Storage</option>
                <option value='budget'>Budget</option>
                <option value='aesthetic'>Aesthetic Statement</option>
                <option value='lighting'>Built-in Lighting</option>
                <option value='minimal'>Minimal / Clean</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Get My Mirror Recommendation →</button>
        </div>

        {result && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Mirrors</h3>
            {result.map(r => (
              <div key={r.id} style={{ background: '#132035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>📏 DFW Mirror Sizing Rules</h3>
          {[['Single vanity mirror', '2–4 inches narrower than vanity width'],['Double vanity mirror', 'Two mirrors or one wide — match vanity width'],['Height from counter', '5–10 inches above backsplash'],['Medicine cabinet depth', '3.5 inches standard for DFW stud walls']].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8' }}>{k}</span><span style={{ color: '#F5E642' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}