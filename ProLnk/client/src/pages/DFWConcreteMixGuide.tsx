import { useState } from 'react';

const projectTypes = ['Driveway', 'Sidewalk', 'Patio', 'Fence Post', 'Foundation Repair', 'Steps'];
const seasons = ['Summer (Jun-Sep)', 'Spring/Fall (Mar-May, Oct-Nov)', 'Winter (Dec-Feb)'];

const recommendations: Record<string, Record<string, { mix: string; psi: string; workingTime: string; curing: string; brand: string }>> = {
  'Driveway': {
    'Summer (Jun-Sep)': { mix: 'High-Strength 5000 PSI', psi: '5000 PSI', workingTime: '20-25 min', curing: 'Wet cure 7 days minimum — DFW heat will dry surface too fast', brand: 'Quikrete 5000' },
    'Spring/Fall (Mar-May, Oct-Nov)': { mix: 'High-Strength 4500 PSI', psi: '4500 PSI', workingTime: '35-45 min', curing: 'Curing compound + 5 days', brand: 'Quikrete 5000 or Sakrete High-Strength' },
    'Winter (Dec-Feb)': { mix: 'Fast-Setting 4000 PSI', psi: '4000 PSI', workingTime: '30-40 min', curing: 'Blanket cure 3 days — protect from freeze', brand: 'Quikrete Fast-Setting' },
  },
  'Sidewalk': {
    'Summer (Jun-Sep)': { mix: 'Crack-Resistant 4000 PSI', psi: '4000 PSI', workingTime: '15-20 min', curing: 'Wet cure 5 days', brand: 'Quikrete Crack-Resistant' },
    'Spring/Fall (Mar-May, Oct-Nov)': { mix: 'Standard 4000 PSI', psi: '4000 PSI', workingTime: '30-40 min', curing: 'Curing compound + 3 days', brand: 'Quikrete or Sakrete 4000' },
    'Winter (Dec-Feb)': { mix: 'Fast-Setting 3500 PSI', psi: '3500 PSI', workingTime: '25-35 min', curing: 'Blanket cure 2 days', brand: 'Quikrete Fast-Setting' },
  },
  'Patio': {
    'Summer (Jun-Sep)': { mix: 'High-Strength 4000 PSI', psi: '4000 PSI', workingTime: '20-25 min', curing: 'Wet cure 5 days — add shade if possible', brand: 'Sakrete High-Strength' },
    'Spring/Fall (Mar-May, Oct-Nov)': { mix: 'Standard 4000 PSI', psi: '4000 PSI', workingTime: '35-45 min', curing: 'Curing compound + 3 days', brand: 'Quikrete or Sakrete' },
    'Winter (Dec-Feb)': { mix: 'Standard 3500 PSI', psi: '3500 PSI', workingTime: '30-40 min', curing: 'Blanket cure 2 days', brand: 'Quikrete 4000' },
  },
  'Fence Post': {
    'Summer (Jun-Sep)': { mix: 'Fast-Setting Post Mix', psi: '4000 PSI', workingTime: '4-5 min after water', curing: 'Hold post 4 min — sets in hole', brand: 'Quikrete Fast-Setting Post' },
    'Spring/Fall (Mar-May, Oct-Nov)': { mix: 'Fast-Setting Post Mix', psi: '4000 PSI', workingTime: '5-6 min after water', curing: 'Hold post 4 min — sets in hole', brand: 'Quikrete or Sakrete Post Mix' },
    'Winter (Dec-Feb)': { mix: 'Fast-Setting Post Mix', psi: '4000 PSI', workingTime: '6-8 min after water', curing: 'Hold post 6 min — slower in cold', brand: 'Quikrete Fast-Setting Post' },
  },
  'Foundation Repair': {
    'Summer (Jun-Sep)': { mix: 'Hydraulic Cement + 5000 PSI', psi: '5000 PSI', workingTime: '10-15 min', curing: 'Wet cure 7 days minimum', brand: 'Quikrete Hydraulic Cement' },
    'Spring/Fall (Mar-May, Oct-Nov)': { mix: 'Structural Repair 5000 PSI', psi: '5000 PSI', workingTime: '20-30 min', curing: 'Wet cure 5 days', brand: 'Quikrete 5000 or Sakrete 5000+' },
    'Winter (Dec-Feb)': { mix: 'Fast-Setting 5000 PSI', psi: '5000 PSI', workingTime: '20-25 min', curing: 'Blanket cure 5 days', brand: 'Quikrete 5000' },
  },
  'Steps': {
    'Summer (Jun-Sep)': { mix: 'High-Strength 4500 PSI', psi: '4500 PSI', workingTime: '20-25 min', curing: 'Wet cure 5 days — cover with burlap', brand: 'Quikrete 5000' },
    'Spring/Fall (Mar-May, Oct-Nov)': { mix: 'High-Strength 4000 PSI', psi: '4000 PSI', workingTime: '30-40 min', curing: 'Curing compound + 4 days', brand: 'Sakrete High-Strength' },
    'Winter (Dec-Feb)': { mix: 'Fast-Setting 4000 PSI', psi: '4000 PSI', workingTime: '25-35 min', curing: 'Blanket cure 3 days', brand: 'Quikrete Fast-Setting' },
  },
};

export default function DFWConcreteMixGuide() {
  const [project, setProject] = useState('');
  const [season, setSeason] = useState('');

  const result = project && season ? recommendations[project]?.[season] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🏗️</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Concrete Mix Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            DFW's extreme heat (115°F summers) cuts your working time nearly in half vs the national average.
            DFW freeze-thaw cycles also demand higher PSI than most of Texas. Choose the wrong mix and you'll be re-pouring in 3 years.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Project Type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select project...</option>
              {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>DFW Season</label>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select season...</option>
              {seasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>✅ Recommended Mix</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Mix Type</div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{result.mix}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Strength</div>
                <div style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '1.1rem' }}>{result.psi}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⏱️ Working Time in DFW</div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{result.workingTime}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Brand</div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{result.brand}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💧 Curing Method for DFW</div>
              <div style={{ color: '#fff', marginTop: '0.25rem' }}>{result.curing}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ DFW Concrete Rules</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 2, margin: 0, paddingLeft: '1.25rem' }}>
            <li>Never pour in temps above 90°F without retarder additive</li>
            <li>Mix water should be cool — use ice in summer if possible</li>
            <li>Have all tools ready before mixing — no stopping in DFW heat</li>
            <li>PSI 4000+ required for driveways due to DFW freeze-thaw cycles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
