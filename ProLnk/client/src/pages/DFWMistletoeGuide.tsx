import { useState } from 'react';

const treeTypes = ['Live Oak', 'Cedar Elm', 'Hackberry', 'Pecan', 'Bur Oak', 'Red Oak', 'Post Oak', 'Mesquite'];
const coverageOptions = ['Less than 10%', '10-25%', '25-50%', 'More than 50%'];

function getRecommendation(tree: string, coverage: string) {
  const severe = coverage === 'More than 50%';
  const moderate = coverage === '25-50%';
  if (tree === 'Mesquite') return { severity: 'Low', color: '#22c55e', action: 'Mesquite is rarely significantly harmed by mistletoe. Monitor but no immediate action needed.', method: 'Prune affected branch 12+ inches below attachment point if desired.' };
  if (severe && (tree === 'Live Oak' || tree === 'Bur Oak' || tree === 'Red Oak')) return { severity: 'High', color: '#f97316', action: 'Heavy infestation significantly weakens this oak. Schedule professional pruning. Consider consulting an arborist about long-term canopy health.', method: 'Remove entire branch 12 inches below mistletoe attachment. Do not prune oaks April-July.' };
  if (moderate) return { severity: 'Moderate', color: '#eab308', action: 'Mistletoe is weakening your tree. Plan pruning during dormant season to improve tree health.', method: 'Prune branch 12 inches below attachment. Cover stump with black polyethylene to inhibit regrowth.' };
  return { severity: 'Low-Moderate', color: '#22c55e', action: 'Light mistletoe infestation. Tree is not in danger. Prune during next dormant season for aesthetics.', method: 'Prune branch 12 inches below mistletoe attachment during October-March.' };
}

export default function DFWMistletoeGuide() {
  const [tree, setTree] = useState('');
  const [coverage, setCoverage] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof getRecommendation>>(null);

  function assess() {
    if (!tree || !coverage) return;
    setResult(getRecommendation(tree, coverage));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🌿</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Mistletoe Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Broadleaf mistletoe (Phoradendron tomentosum) is a native parasitic plant common throughout DFW. It attaches to tree branches and extracts water and nutrients. While rarely fatal on its own, heavy infestations weaken trees and make them vulnerable to drought, insects, and other disease. DFW homeowners frequently see it on elms, oaks, and hackberries.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>📋 Key Facts</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Native to Texas - not invasive</li>
              <li>Birds spread seeds through droppings</li>
              <li>Attaches to branch cambium layer</li>
              <li>Can live 40+ years on a host</li>
              <li>Green year-round, visible in winter</li>
            </ul>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>⚠️ When to Worry</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <li>More than 25% canopy coverage</li>
              <li>On a tree already stressed by drought</li>
              <li>Near trunk or major limbs</li>
              <li>Combined with other disease signs</li>
              <li>Young trees under 6 inches diameter</li>
            </ul>
          </div>
        </div>
        <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Treatment Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Tree Type</label>
              <select value={tree} onChange={e => setTree(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select tree type</option>
                {treeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Mistletoe Coverage of Canopy</label>
              <select value={coverage} onChange={e => setCoverage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select coverage</option>
                {coverageOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: `4px solid ${result.color}` }}>
              <p style={{ color: result.color, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Severity: {result.severity}</p>
              <p style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}><strong>Action:</strong> {result.action}</p>
              <p style={{ color: '#F5E642' }}><strong>Removal Method:</strong> {result.method}</p>
            </div>
          )}
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <strong style={{ color: '#F5E642' }}>Important:</strong> Mistletoe regrows from haustorium tissue embedded in the branch. Pulling mistletoe without pruning the branch only delays regrowth by 1-2 years. The only permanent solution is to remove the entire affected branch.
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Note:</strong> For heavy mistletoe infestations or trees over 20 feet, hire a licensed arborist. DIY pruning of large limbs risks injury and property damage. ProLnk connects DFW homeowners with certified tree care professionals.
        </div>
      </div>
    </div>
  );
}
