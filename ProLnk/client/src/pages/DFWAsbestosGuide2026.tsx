import { useState } from 'react';

const asbestosData: Record<string, Record<string, { level: string; color: string; actions: string[] }>> = {
  '1950s': {
    popcorn: { level: 'VERY HIGH RISK', color: '#dc2626', actions: ['Do NOT sand, scrape, or disturb ceiling','Hire licensed asbestos inspector first','Test required before any renovation permit in TX','Encapsulation may be option if undisturbed','Abatement cost: $1,500–$5,000 per room'] },
    pipe: { level: 'VERY HIGH RISK', color: '#dc2626', actions: ['Do not touch or wrap over old insulation','Hire TX-licensed asbestos abatement contractor','TDSHS permit required for removal','Air monitoring during and after abatement','Replace with modern insulation post-removal'] },
    tile: { level: 'HIGH RISK', color: '#ef4444', actions: ['Do NOT drill, cut, or break floor tiles','Encapsulate by installing new floor over existing','If removal needed: licensed contractor only','Tile adhesive (mastic) may also contain asbestos','Test both tile and mastic before any work'] },
  },
  '1960s': {
    popcorn: { level: 'HIGH RISK', color: '#ef4444', actions: ['Test before any work — commonly used through 1978','Licensed inspector + air sampling recommended','Permit required for abatement in most DFW cities','Encapsulation viable if ceiling in good condition'] },
    pipe: { level: 'HIGH RISK', color: '#ef4444', actions: ['Pipe wrap common in this era','Do not disturb if in good condition','Inspect for cracks, fraying, deterioration annually','Abatement if deteriorating or if renovation required'] },
    tile: { level: 'MODERATE RISK', color: '#f59e0b', actions: ['Vinyl composite tile common in this era','Test before cutting or removal','Encapsulation preferred if tiles intact','Licensed removal if damaged or needed'] },
  },
  '1970s': {
    popcorn: { level: 'MODERATE RISK', color: '#f59e0b', actions: ['Asbestos banned in spray-applied products in 1978','Pre-1978 popcorn: test before disturbing','Post-1978 popcorn: generally asbestos-free','Licensed inspector can date and test definitively'] },
    pipe: { level: 'LOW RISK', color: '#22c55e', actions: ['Most pipe insulation in late 70s non-asbestos','Visual inspection for old wrap still advised','Test if unsure of original vs replacement insulation'] },
    tile: { level: 'LOW RISK', color: '#22c55e', actions: ['Lower likelihood but not zero','Test if replacing or cutting into tile','DIY removal acceptable if tests negative'] },
  },
};

export default function DFWAsbestosGuide2026() {
  const [decade, setDecade] = useState('');
  const [material, setMaterial] = useState('');
  const result = decade && material && asbestosData[decade]?.[material] ? asbestosData[decade][material] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME HEALTH VAULT · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>⚠️ DFW Asbestos Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Homes built 1950–1980 across older DFW suburbs may contain asbestos in popcorn ceilings, pipe insulation, and floor tiles. Texas requires licensed contractors for removal.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[['📅','Risk Era','Homes built 1950–1980'],['🏘️','DFW Areas','Mesquite, Garland, Irving, Richardson'],['💲','Abatement','$1,500–$30,000 depending on scope']].map(([icon, title, sub]) => (
            <div key={title} style={{ background: '#1a2744', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642′ }}>{title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Asbestos Risk Assessment</h2>
          <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Home decade:</label>
          <select value={decade} onChange={e => setDecade(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 12 }}>
            <option value=''>-- Select decade built --</option>
            <option value='1950s'>1950s</option>
            <option value='1960s'>1960s</option>
            <option value='1970s'>1970s</option>
          </select>
          <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Material of concern:</label>
          <select value={material} onChange={e => setMaterial(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 16 }}>
            <option value=''>-- Select material --</option>
            <option value='popcorn'>Popcorn / Textured Ceiling</option>
            <option value='pipe'>Pipe Insulation</option>
            <option value='tile'>Floor Tiles</option>
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: `4px solid ${result.color}` }}>
                <div style={{ fontWeight: 700, color: result.color }}>{result.level}</div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Recommended Actions:</div>
              {result.actions.map(a => <div key={a} style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 6 }}>• {a}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>🔑 Golden Rule</div>
          <div style={{ fontSize: 14, color: '#94a3b8′ }}>If asbestos-containing material is undisturbed and in good condition, leaving it in place is often safer than removing it. When in doubt, test before you touch.</div>
        </div>
      </div>
    </div>
  );
}
