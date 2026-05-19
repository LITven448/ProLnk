import { useState } from 'react';

const homeStyles = ['Ranch', 'Two-Story', 'Colonial', 'Craftsman', 'Tudor'];
const projectTypes = ['Gable Vent Addition', 'Gable End Ventilation', 'Dormer Addition', 'Gable Repair'];

function getResult(style: string, project: string) {
  const permitNeeded = project === 'Dormer Addition' || project === 'Gable End Ventilation';
  const costs: Record<string, [number, number]> = {
    'Gable Vent Addition': [400, 900],
    'Gable End Ventilation': [800, 2000],
    'Dormer Addition': [15000, 45000],
    'Gable Repair': [300, 1200],
  };
  const feasibility: Record<string, string> = {
    'Ranch': 'Straightforward',
    'Two-Story': 'Moderate',
    'Colonial': 'Moderate',
    'Craftsman': 'Complex',
    'Tudor': 'Complex',
  };
  const [low, high] = costs[project];
  return { permitNeeded, low, high, feasibility: feasibility[style] };
}

export default function DFWGableAndDormerGuide() {
  const [style, setStyle] = useState('');
  const [project, setProject] = useState('');
  const result = style && project ? getResult(style, project) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🏠 DFW Gable & Dormer Guide
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW sits in Tornado Alley — gable ends face significant wind uplift. Proper ventilation and structural integrity are non-negotiable.
        </p>

        <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌬️', title: 'Why Gables Matter in DFW', desc: 'Gable ends act like sails in high wind events. Unreinforced gable ends are among the first failures in severe storms. Bracing gable trusses is code-required in many DFW counties.' },
            { icon: '🔄', title: 'Gable Vent vs. Gable End Ventilation', desc: 'A gable vent is a passive louvered opening. Full gable end ventilation combines ridge vents, soffit vents, and gable vents for balanced airflow — critical in DFW summers where attic temps exceed 150°F.' },
            { icon: '☀️', title: 'Adding a Dormer', desc: 'Dormers bring natural light and usable space to attic areas. In DFW, a shed dormer can add 200–600 sq ft of conditioned space. Structural approval and a DFW city permit are required.' },
            { icon: '📋', title: 'DFW Permit Requirements', desc: 'Dormer additions and structural gable modifications require permits from your city (Dallas, Fort Worth, Plano, Frisco, etc.). Most cities require engineered drawings for anything structural.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#111e35', borderRadius: 12, padding: '1.25rem', display: 'flex', gap: '1rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>⚡ Wind Exposure by Home Style</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
            {[['Ranch', 'Low'], ['Two-Story', 'Medium'], ['Colonial', 'Medium'], ['Craftsman', 'High'], ['Tudor', 'High']].map(([s, risk]) => (
              <div key={s} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{s}</div>
                <div style={{ color: risk === 'Low' ? '#4ade80′ : risk === ’Medium' ? '#facc15′ : '#f87171', fontSize: '0.8rem', marginTop: 4 }}>{risk} Risk</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Project Estimator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Home Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select style</option>
                {homeStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Project Type</label>
              <select value={project} onChange={e => setProject(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select project</option>
                {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Cost Range</div>
                <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700 }}>${result.low.toLocaleString()}–${result.high.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Feasibility</div>
                <div style={{ color: result.feasibility === 'Straightforward' ? '#4ade80′ : result.feasibility === ’Moderate' ? '#facc15′ : '#f87171', fontSize: '1.1rem', fontWeight: 700 }}>{result.feasibility}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Permit Required</div>
                <div style={{ color: result.permitNeeded ? '#f87171′ : '#4ade80', fontSize: '1.1rem', fontWeight: 700 }}>{result.permitNeeded ? ’Yes' : 'Likely No'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
