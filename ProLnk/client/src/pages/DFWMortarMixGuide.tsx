import { useState } from 'react';

const projectTypes = ['Brick Repair', 'New Brickwork', 'Stone Veneer', 'Block Wall', 'Chimney Repointing', 'Retaining Wall'];
const locations = ['North DFW (Plano/Frisco/McKinney)', 'East DFW (Garland/Mesquite/Rockwall)', 'South DFW (Mansfield/Cedar Hill/DeSoto)', 'West DFW (Fort Worth/Arlington/Grand Prairie)', 'Central Dallas'];

const data: Record<string, { type: string; why: string; warning: string; cost: string; tip: string }> = {
  'Brick Repair': { type: 'Type N (270 PSI)', why: 'DFW brick is often 75+ years old and softer than modern specs. High PSI mortar will crack the brick face — not the joint — forcing full brick replacement', warning: 'Never use Type S or M on old DFW brick', cost: '$18-24/bag, ~30 sq ft coverage', tip: 'Match existing mortar color before ordering' },
  'New Brickwork': { type: 'Type S (1800 PSI)', why: 'DFW clay soil shifts seasonally. Type S flexes slightly more than Type M while still providing structural integrity for new walls', warning: 'Type M is overkill and reduces flexibility', cost: '$16-22/bag, ~25 sq ft coverage', tip: 'Add polymer modifier for DFW soil movement zones' },
  'Stone Veneer': { type: 'Type N (270 PSI)', why: 'Stone veneer is non-structural. Type N bonds well without cracking the veneer face from thermal expansion in DFW heat', warning: 'High PSI mortar cracks stone veneer in DFW temperature swings', cost: '$20-28/bag, ~20 sq ft coverage', tip: 'Use scratch coat + finish coat system in DFW' },
  'Block Wall': { type: 'Type S (1800 PSI)', why: 'CMU block walls in DFW need Type S for below-grade stability and soil pressure resistance from expansive clay', warning: 'Type N insufficient for DFW soil pressure', cost: '$16-22/bag, ~30 sq ft coverage', tip: 'Core fill with concrete for retaining applications' },
  'Chimney Repointing': { type: 'Type N (270 PSI)', why: 'Chimneys expand and contract dramatically in DFW temperature swings (-5°F to 115°F). Type N absorbs movement without cracking brick', warning: 'Many contractors wrongly use Type S — causes brick spalling', cost: '$18-24/bag, spot repair only', tip: 'Test mortar color match on inconspicuous area first' },
  'Retaining Wall': { type: 'Type S (1800 PSI)', why: 'Retaining walls face lateral soil pressure from DFW expansive clay. Type S provides strength while retaining enough flexibility to resist cracking', warning: 'Type M too rigid — cracks under DFW soil movement', cost: '$16-22/bag, depends on wall height', tip: 'Install weep holes every 4 ft to manage hydrostatic pressure' },
};

export default function DFWMortarMixGuide() {
  const [project, setProject] = useState('');
  const [location, setLocation] = useState('');

  const result = project ? data[project] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🧱</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Mortar Mix Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            The #1 DFW masonry mistake: using high-PSI mortar because it sounds stronger. In DFW, high-PSI mortar is stiffer than the brick — so when DFW clay soil shifts, the brick face cracks instead of the joint. Joints are cheap. Brick replacement is not.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>🔑 DFW Rule:</strong>
          <span style={{ color: '#94a3b8′ }}> Mortar must be weaker than the masonry unit. Type N for old brick. Type S for block/structural. Type M only for below-grade foundations.</span>
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
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>DFW Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select area...</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>✅ Mortar Recommendation</h2>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Recommended Type</div>
              <div style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '1.3rem' }}>{result.type}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💡 Why This Works for DFW</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.why}</div>
            </div>
            <div style={{ backgroundColor: '#7f1d1d', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#fca5a5', fontSize: '0.85rem' }}>⚠️ DFW Warning</div>
              <div style={{ color: '#fff', marginTop: '0.25rem' }}>{result.warning}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💰 Cost Estimate</div>
                <div style={{ color: '#fff', marginTop: '0.25rem' }}>{result.cost}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🔧 Pro Tip</div>
                <div style={{ color: '#fff', marginTop: '0.25rem' }}>{result.tip}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📊 DFW Mortar Type Quick Reference</h3>
          {[['Type N', '270 PSI', 'Exposed brick, chimneys, veneers', '✅ Best for DFW brick repair'], ['Type S', '1800 PSI', 'Below-grade, structural block', '✅ Best for new DFW construction'], ['Type M', '2500 PSI', 'Below-grade foundations only', '⚠️ Too rigid for most DFW use']].map(([type, psi, use, note]) => (
            <div key={type} style={{ display: 'grid', gridTemplateColumns: '80px 100px 1fr 1fr', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid #334155', alignItems: 'center' }}>
              <span style={{ color: '#F5E642', fontWeight: 'bold' }}>{type}</span>
              <span style={{ color: '#94a3b8′ }}>{psi}</span>
              <span style={{ color: '#fff', fontSize: '0.9rem' }}>{use}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
