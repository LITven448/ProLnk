import { useState } from 'react';

const dfwTrees = [
  { name: 'Live Oak', pruneWindow: 'August 1 – March 31', restricted: true, notes: 'Most common DFW tree. High oak wilt risk if pruned April–July.' },
  { name: 'Cedar Elm', pruneWindow: 'October – February', restricted: false, notes: 'DFW native. Prune in dormancy to reduce stress.' },
  { name: 'Pecan', pruneWindow: 'December – February', restricted: false, notes: 'State tree of TX. Prune dormant, never more than 25% canopy.' },
  { name: 'Bald Cypress', pruneWindow: 'Winter dormancy', restricted: false, notes: 'Great for DFW wet areas. Light pruning only.' },
  { name: 'Red Oak', pruneWindow: 'August 1 – March 31', restricted: true, notes: 'Extremely susceptible to oak wilt. Never prune Apr–July.' },
  { name: 'Crepe Myrtle', pruneWindow: 'February – March', restricted: false, notes: 'Avoid "crepe murder" — never top these trees.' },
];

const oakWiltFacts = [
  'April 1 – July 1: NO PRUNING for oaks in DFW (especially red oaks)',
  'Nitidula beetles spread fungal spores through fresh pruning cuts',
  'Paint ALL wounds immediately with latex paint if pruned',
  'Oak wilt can spread through connected root systems — whole neighborhoods at risk',
  'Signs: leaves turn brown from edges inward, tree may die within weeks',
];

const foundationWarning = [
  { distance: 'Under 10 feet', risk: 'High', action: 'Consult arborist immediately — root barrier may be needed' },
  { distance: '10–15 feet', risk: 'Medium', action: 'Monitor foundation cracks annually, consider root barrier' },
  { distance: '15–20 feet', risk: 'Low-Medium', action: 'Watch for soil heaving near foundation' },
  { distance: 'Over 20 feet', risk: 'Low', action: 'Standard maintenance, no foundation concern' },
];

const treeTypes = dfwTrees.map(t => t.name);
const issues = ['Overgrown Canopy', 'Dead Branches', 'Too Close to Foundation', 'Disease/Pest Signs', 'Storm Damage', 'Drought Stress'];

export default function DFWTreeMaintenanceGuide() {
  const [treeType, setTreeType] = useState('');
  const [issue, setIssue] = useState('');
  const [showAdvice, setShowAdvice] = useState(false);

  const selectedTree = dfwTrees.find(t => t.name === treeType);

  const getAdvice = () => {
    if (!selectedTree) return [];
    if (issue === 'Too Close to Foundation') return foundationWarning.map(f => `${f.distance}: ${f.risk} risk — ${f.action}`);
    if (issue === 'Disease/Pest Signs') return ['Contact a certified ISA arborist — oak wilt spreads rapidly', 'Do NOT prune during April–July oak wilt season', 'Check for fungal mats under bark (oak wilt indicator)', 'Treat for oak wilt via fungicide injection (professional only)'];
    if (issue === 'Storm Damage') return ['Remove hanging branches immediately — call arborist for large limbs', 'Paint all fresh cuts with latex paint', 'Assess lean — a 15°+ lean toward structure needs professional evaluation', 'File insurance claim if large limbs caused property damage'];
    return [`Prune during: ${selectedTree.pruneWindow}`, selectedTree.restricted ? '⚠️ OAK WILT RISK: Never prune April 1 – July 1' : 'No seasonal pruning restrictions', 'Never remove more than 25% of canopy in one season', 'Hire ISA-certified arborist for limbs over 3 inches diameter', 'Water mature trees deeply (1 inch/week) during DFW drought'];
  };

  const currentMonth = new Date().getMonth() + 1;
  const oakWiltActive = currentMonth >= 4 && currentMonth <= 7;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌳</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Tree Maintenance Guide</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Pruning windows, oak wilt prevention, and foundation protection</p>
        </div>

        {oakWiltActive && (
          <div style={{ background: '#3a1a1a', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '2px solid #ef4444' }}>
            <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '1rem' }}>⚠️ OAK WILT SEASON ACTIVE (April 1 – July 1)</div>
            <div style={{ color: '#fca5a5', fontSize: '0.9rem', marginTop: '6px' }}>Do NOT prune live oaks or red oaks during this period. Beetles are actively spreading oak wilt spores through fresh cuts.</div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🌲 Common DFW Trees — Pruning Windows</h2>
          {dfwTrees.map(t => (
            <div key={t.name} style={{ padding: '12px 0', borderBottom: '1px solid #2d3f5e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, color: t.restricted ? '#fbbf24' : '#e2e8f0' }}>{t.name} {t.restricted ? '⚠️' : ''}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>{t.notes}</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#4ade80', textAlign: 'right', minWidth: '160px' }}>✅ {t.pruneWindow}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>🍄 Oak Wilt Prevention — DFW Critical Info</h2>
          {oakWiltFacts.map((f, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #2d3f5e', fontSize: '0.9rem', color: '#e2e8f0' }}>
              {i === 0 ? '🚫' : '⚠️'} {f}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📋 Get Tree-Specific Maintenance Advice</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Tree Type</label>
              <select value={treeType} onChange={e => setTreeType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select tree...</option>
                {treeTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Primary Issue</label>
              <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select issue...</option>
                {issues.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowAdvice(true)} disabled={!treeType || !issue} style={{ background: treeType && issue ? '#F5E642' : '#2d3f5e', color: treeType && issue ? '#0A1628' : '#64748b', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: 700, cursor: treeType && issue ? 'pointer' : 'not-allowed' }}>
            Get Maintenance Advice
          </button>
          {showAdvice && treeType && issue && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '10px' }}>🌳 {treeType} — {issue} Guidance</div>
              {getAdvice().map((item, i) => (
                <div key={i} style={{ padding: '6px 0', fontSize: '0.9rem', color: '#e2e8f0', borderBottom: '1px solid #1e2d45' }}>{item}</div>
              ))}
              <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#64748b' }}>For large trees, always hire an ISA-certified arborist. ProLnk connects you with vetted tree care professionals in DFW.</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>ProLnk Home Services · DFW Tree Care Resource</div>
      </div>
    </div>
  );
}
