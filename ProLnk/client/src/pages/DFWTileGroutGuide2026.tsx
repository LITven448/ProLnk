import { useState } from 'react';

const groutOptions = [
  { id: 'epoxy', label: '🛡️ Epoxy Grout', tileTypes: ['glass','porcelain','ceramic','stone'], concerns: ['hardwater','stains','mold'], desc: 'Best for DFW hard water. Non-porous, stain-resistant, never needs sealing. Harder to install.' },
  { id: 'sanded', label: '🟤 Sanded Cement Grout', tileTypes: ['porcelain','ceramic','stone','largeTile'], concerns: ['budget','normal'], desc: 'For joints wider than 1/8 inch. Must seal in DFW. Re-seal every 1-2 years.' },
  { id: 'unsanded', label: '⬜ Unsanded Cement Grout', tileTypes: ['glass','mosaic','smallTile'], concerns: ['budget','normal'], desc: 'For joints under 1/8 inch. Smoother texture. Seal required — DFW hard water stains fast.' },
];

const tileTypes = ['glass','porcelain','ceramic','stone','largeTile','mosaic','smallTile'];
const concerns = ['hardwater','stains','mold','budget','normal'];

export default function DFWTileGroutGuide2026() {
  const [tileType, setTileType] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<typeof groutOptions | null>(null);

  function getRecommendation() {
    const matches = groutOptions.filter(o =>
      (!tileType || o.tileTypes.includes(tileType)) && (!concern || o.concerns.includes(concern))
    );
    setResult(matches.length ? matches : groutOptions);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🧱 DFW Tile Grout Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Choose and maintain grout in DFW's hard water environment — the right grout prevents staining and mold year-round.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{ label: '🛡️ Epoxy', desc: 'DFW hard water champion' },{ label: '🟤 Sanded', desc: 'Wide joints, must seal' },{ label: '⬜ Unsanded', desc: 'Narrow joints, must seal' }].map(o => (
            <div key={o.label} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700 }}>{o.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Find Your Grout</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Tile Type</label>
              <select value={tileType} onChange={e => setTileType(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Tile</option>
                {tileTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Main Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value=''>Any Concern</option>
                <option value='hardwater'>DFW Hard Water</option>
                <option value='stains'>Staining</option>
                <option value='mold'>Mold / Mildew</option>
                <option value='budget'>Budget</option>
                <option value='normal'>Normal Use</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Get My Grout Recommendation →</button>
        </div>

        {result && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Grout</h3>
            {result.map(r => (
              <div key={r.id} style={{ background: '#132035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>📅 DFW Grout Sealing Schedule</h3>
          {[['New cement grout', 'Seal within 72 hours of install'],['Annual re-seal', 'Every 12 months in DFW hard water zones'],['Grout color tip', 'Lighter = shows DFW mineral deposits faster; choose mid-tone']].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>
              <span style={{ color: '#94a3b8' }}>{k}</span><span style={{ color: '#F5E642' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}