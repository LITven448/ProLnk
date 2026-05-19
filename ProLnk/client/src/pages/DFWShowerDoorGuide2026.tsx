import { useState } from 'react';

const doorOptions = [
  { id: 'frameless', label: '🚿 Frameless Glass', showerTypes: ['walkin','niche','custom'], concerns: ['hardwater','modern','mold'], desc: 'Minimal metal = less calcium trapping. DFW favorite. Squeegee after every use. Daily shower spray extends clarity.' },
  { id: 'semiFrameless', label: '🪟 Semi-Frameless', showerTypes: ['walkin','alcove','niche'], concerns: ['hardwater','budget','modern'], desc: 'Some metal framing but less than framed. Balance of cost and calcium resistance for DFW homes.' },
  { id: 'framed', label: '🔲 Framed Glass Door', showerTypes: ['alcove','standard'], concerns: ['budget'], desc: 'More affordable but metal frame traps DFW hard water deposits. Grout around frame molds in humidity. Extra cleaning required.' },
  { id: 'pivot', label: '🔄 Pivot Door', showerTypes: ['walkin','large'], concerns: ['modern','custom'], desc: 'Large statement door. Easy to squeegee. Fewer seams = fewer calcium collection points in DFW.' },
];

const showerTypes = ['walkin','alcove','niche','standard','large','custom'];
const concerns = ['hardwater','modern','mold','budget','custom'];

export default function DFWShowerDoorGuide2026() {
  const [showerType, setShowerType] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<typeof doorOptions | null>(null);

  function getRecommendation() {
    const matches = doorOptions.filter(o =>
      (!showerType || o.showerTypes.includes(showerType)) && (!concern || o.concerns.includes(concern))
    );
    setResult(matches.length ? matches : doorOptions);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🚿 DFW Shower Door Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW hard water leaves calcium deposits on glass fast — choose and maintain your shower door the right way.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>⚠️ DFW Hard Water Alert</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>DFW water hardness averages 200-300 ppm. Calcium builds on untreated glass within 2 weeks. Frameless doors with less metal are the #1 recommended choice.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{ label: '🚿 Frameless', desc: 'Best for DFW hard water' },{ label: '🪟 Semi-Frameless', desc: 'Balance of cost + clean' },{ label: '🔲 Framed', desc: 'Budget, extra cleaning' },{ label: '🔄 Pivot', desc: 'Large, easy squeegee' }].map(o => (
            <div key={o.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700 }}>{o.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Find Your Door</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Shower Type</label>
              <select value={showerType} onChange={e => setShowerType(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Type</option>
                {showerTypes.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Main Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Concern</option>
                <option value='hardwater'>DFW Hard Water</option>
                <option value='mold'>Mold / Mildew</option>
                <option value='modern'>Modern Look</option>
                <option value='budget'>Budget</option>
                <option value='custom'>Custom Size</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Get My Door Recommendation →</button>
        </div>

        {result && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Doors</h3>
            {result.map(r => (
              <div key={r.id} style={{ background: '#132035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🧹 DFW Maintenance Routine</h3>
          {[['After every shower', 'Squeegee all glass surfaces'],['Weekly', 'Daily Shower Spray to prevent calcium buildup'],['Monthly', 'Vinegar solution soak on door seals'],['Annually', 'Professional glass restoration if etching occurs']].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8′ }}>{k}</span><span style={{ color: '#F5E642' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}