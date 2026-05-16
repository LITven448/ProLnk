import { useState } from 'react';

export default function DFWPlumbingPipesGuide2026() {
  const [homeAge, setHomeAge] = useState('');
  const [result, setResult] = useState<{ material: string; risk: string; color: string } | null>(null);

  const assess = () => {
    const yr = parseInt(homeAge);
    if (isNaN(yr) || yr < 0) { setResult(null); return; }
    const built = 2026 - yr;
    if (built < 1980) {
      setResult({ material: 'Cast Iron / Galvanized Steel', risk: 'HIGH RISK — Corrosion, scale buildup, slab cracks common. Expect slab leaks. Full repipe may be needed. DFW clay soil movement accelerates joint failure.', color: '#e53e3e' });
    } else if (built < 2000) {
      setResult({ material: 'Copper', risk: 'MODERATE — Copper is solid but solder joints age. DFW hard water causes pinhole leaks in older copper. Inspect joints every 5 yrs.', color: '#dd6b20' });
    } else {
      setResult({ material: 'PEX (Cross-linked Polyethylene)', risk: 'LOW — PEX is ideal for DFW. Flexible against soil shift, resistant to scale. Check manifold for any fitting corrosion every 10 yrs.', color: '#38a169' });
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 ProLnk Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Plumbing Pipes Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem' }}>DFW clay soil shifts constantly. Know what pipes are in your walls — and what that means for your home.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏚️', era: 'Pre-1980', mat: 'Cast Iron / Galvanized', risk: 'High', color: '#e53e3e' },
            { icon: '🏠', era: '1980–2000', mat: 'Copper', risk: 'Moderate', color: '#dd6b20' },
            { icon: '🏡', era: 'Post-2000', mat: 'PEX', risk: 'Low', color: '#38a169' },
          ].map((s) => (
            <div key={s.era} style={{ background: '#1a2744', borderRadius: 8, padding: '1rem', borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{s.era}</div>
              <div style={{ color: '#F5E642', fontSize: '0.9rem' }}>{s.mat}</div>
              <div style={{ color: s.color, fontSize: '0.8rem', marginTop: '0.25rem' }}>Risk: {s.risk}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 What Pipes Are In My Home?</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Home Age (years since built)</label><br />
            <input value={homeAge} onChange={(e) => setHomeAge(e.target.value)} type="number" min="1" max="120"
              style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, width: 140, marginTop: 4 }} />
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
            Check My Pipes
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Likely Material: {result.material}</div>
              <div style={{ color: '#a0aec0' }}>{result.risk}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🌊 DFW Slab Leak Facts</h2>
          {['DFW black clay (expansive soil) shifts pipes constantly — slab leaks are common','Detection cost: $200-400 with electronic listening equipment','Rerouting cost: $3,000-8,000 depending on pipe material and leak location','Insurance may cover — check for sudden vs. gradual damage clauses','ProLnk connects you to licensed plumbers who specialize in DFW slab repair'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', color: '#a0aec0', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642' }}>→</span>{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}