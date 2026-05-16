import { useState } from 'react';

type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';
type ProjectSize = 'Small (< 10 sq ft)' | 'Medium (10–50 sq ft)' | 'Large (50+ sq ft)';

const PROJECTS = [
  { name: 'Stepping stones', diy: true, size: 'Small', note: 'Ideal DFW DIY project; use pre-mixed bags.' },
  { name: 'Mailbox base', diy: true, size: 'Small', note: 'Set in 12" deep holes below DFW frost line (6").' },
  { name: 'Fence post setting', diy: true, size: 'Small', note: 'Quick-set concrete; DFW clay soil drains slowly — wait 48 h.' },
  { name: 'Garden border / edging', diy: true, size: 'Small', note: 'Use dry-stacked forms; no finishing required.' },
  { name: 'Patio (< 100 sq ft)', diy: true, size: 'Medium', note: 'DFW heat cures concrete fast; mist surface for 7 days.' },
  { name: 'Driveway', diy: false, size: 'Large', note: 'Requires rebar, expansion joints, and city permit in most DFW cities.' },
  { name: 'Pool deck', diy: false, size: 'Large', note: 'Stamped or broom finish requires pro equipment for DFW heat control.' },
  { name: 'Retaining wall (> 4 ft)', diy: false, size: 'Large', note: 'Structural requirement — engineered rebar plan required in DFW.' },
  { name: 'Foundation repair', diy: false, size: 'Large', note: 'Never DIY in DFW clay soil — improper repair worsens movement.' },
];

const SEASON_TIPS: Record<Season, string> = {
  Spring: 'Ideal DFW concrete season. Temps 60–80°F let concrete cure evenly. Watch spring storms — cover fresh pours.',
  Summer: 'Challenging: above 90°F concrete sets too fast. Pour before 8 AM or after 6 PM. Use retarder additives.',
  Fall: 'Second best season. Temps moderate; watch for early freezes in November in northern DFW suburbs.',
  Winter: 'Possible with precautions. Use hot water mix; cover with insulating blankets overnight. Avoid below 40°F pours.',
};

const COST: Record<string, { diy: string; pro: string }> = {
  'Small (< 10 sq ft)': { diy: '–', pro: '–' },
  'Medium (10–50 sq ft)': { diy: '–', pro: '–,000' },
  'Large (50+ sq ft)': { diy: 'Not recommended', pro: ',500–,000+' },
};

export default function DFWDIYConcreteProject() {
  const [size, setSize] = useState<ProjectSize | ''>('');
  const [season, setSeason] = useState<Season | ''>('');

  const feasibleProjects = size
    ? PROJECTS.filter(p =>
        size === 'Small (< 10 sq ft)' ? p.size === 'Small' :
        size === 'Medium (10–50 sq ft)' ? p.size !== 'Large' : true
      )
    : PROJECTS;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏗️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW DIY Concrete Projects</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>What North Texas homeowners can DIY — and when to call a pro</p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 Feasibility Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>Project Size</label>
              <select value={size} onChange={e => setSize(e.target.value as ProjectSize)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>All sizes</option>
                {(['Small (< 10 sq ft)', 'Medium (10–50 sq ft)', 'Large (50+ sq ft)'] as ProjectSize[]).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>DFW Season</label>
              <select value={season} onChange={e => setSeason(e.target.value as Season)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select season...</option>
                {(['Spring', 'Summer', 'Fall', 'Winter'] as Season[]).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {season && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '1rem', borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>🌡️ {SEASON_TIPS[season]}</p>
            </div>
          )}
          {size && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #22c55e' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>DIY COST</span><br /><span style={{ color: '#22c55e', fontWeight: 700 }}>{COST[size].diy}</span></div>
                <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>PRO COST</span><br /><span style={{ color: '#F5E642', fontWeight: 700 }}>{COST[size].pro}</span></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Project Guide</h2>
          {feasibleProjects.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem 0', borderBottom: i < feasibleProjects.length - 1 ? '1px solid #334155' : 'none' }}>
              <span style={{ fontSize: '1.2rem' }}>{p.diy ? '✅' : '🚫'}</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{p.name} <span style={{ color: '#64748b', fontSize: '0.8rem' }}>({p.size})</span></div>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{p.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d47', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>Need a DFW concrete contractor?</p>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Find Concrete Pros on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
