import { useState } from 'react';

const foundationIssues = ['Corner lift/separation', 'Interior beam drop', 'Perimeter settlement', 'Multiple crack pattern', 'New construction issue'];
const soilTypes = ['Black clay (expansive)', 'Sandy loam', 'Mixed/unknown', 'Fill soil'];

function getPierRecommendation(issue: string, soil: string) {
  const depth = soil === 'Sandy loam' ? '15–22 ft' : soil === 'Fill soil' ? '25–35 ft' : '20–30 ft';
  const pierType = (issue === 'New construction issue' || issue === 'Interior beam drop') ? 'Helical Pier' : 'Steel Push Pier';
  const costPer = pierType === 'Helical Pier' ? '$1,200–$1,800 per pier' : '$900–$1,400 per pier';
  const piers = issue === 'Corner lift/separation' ? '4–8 piers' : issue === 'Perimeter settlement' ? '8–16 piers' : '6–12 piers';
  const warranty = pierType === 'Helical Pier' ? '15–25 years (transferable)' : '5–15 years (transferable)';
  return { pierType, depth, costPer, piers, warranty };
}

const pierComparison = [
  {
    name: 'Steel Push Pier',
    icon: '🔩',
    how: 'Hydraulically driven steel sections pushed through soil until reaching load-bearing stratum. Lifts and stabilizes settled slab.',
    bestFor: 'Settled/sinking foundations, perimeter issues, high-load areas',
    depthDFW: '20–30 ft in DFW clay to stable limestone/hardpan',
    warranty: '5–15 years typical',
    cost: '$900–$1,400 per pier',
  },
  {
    name: 'Helical Pier',
    icon: '🌀',
    how: 'Screwed into soil like a large bolt using hydraulic torque motor. No reaction force needed — can be installed in limited access areas.',
    bestFor: 'New construction, interior piers, light loads, pier & beam',
    depthDFW: '15–25 ft typical in DFW depending on torque readings',
    warranty: '15–25 years typical',
    cost: '$1,200–$1,800 per pier',
  },
];

export default function DFWUnderpinningGuide() {
  const [issue, setIssue] = useState('');
  const [soil, setSoil] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = issue && soil ? getPierRecommendation(issue, soil) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Underpinning & Foundation Lifting</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>When DFW foundations settle, push piers and helical piers lift and stabilize the slab by driving past expansive clay to stable soil — typically 20–30 feet down.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {pierComparison.map(p => (
            <div key={p.name} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>How It Works</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{p.how}</div>
              {[
                { label: '✅ Best For', value: p.bestFor },
                { label: '📏 DFW Depth', value: p.depthDFW },
                { label: '🛡️ Warranty', value: p.warranty },
                { label: '💰 Cost Per Pier', value: p.cost },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{label}</div>
                  <div style={{ fontSize: 13 }}>{value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>🔧 Pier Type Recommendation Tool</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Foundation Issue</div>
              <select value={issue} onChange={e => { setIssue(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {foundationIssues.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Soil Type</div>
              <select value={soil} onChange={e => { setSoil(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!issue || !soil} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', opacity: (!issue || !soil) ? 0.5 : 1 }}>
            Get Pier Recommendation
          </button>
          {showResult && result && (
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: '🔩 Recommended Pier Type', value: result.pierType },
                { label: '📏 Expected Depth in DFW', value: result.depth },
                { label: '💰 Cost Per Pier', value: result.costPer },
                { label: '🏠 Estimated Pier Count', value: result.piers },
                { label: '🛡️ Typical Warranty', value: result.warranty },
                { label: '⏱️ Install Time', value: '1–3 days typical' },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: 12, background: '#0A1628', borderRadius: 8, borderTop: '2px solid #F5E642' }}>
                  <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📍 DFW Underpinning Facts</div>
          {['DFW clay requires piers to reach stable Austin Chalk limestone — typically 20–30 ft', 'Always get 3 quotes; pricing varies significantly by company and access conditions', 'Warranty transferability is valuable — ask specifically when selling your home', 'City permits required in most DFW municipalities for foundation repair'].map(f => (
            <div key={f} style={{ fontSize: 13, marginBottom: 8, color: '#cbd5e1' }}>• {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
