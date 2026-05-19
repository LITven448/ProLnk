import { useState } from 'react';

const films = [
  { name: '3M Prestige', brand: '3M', vlt: '70%', rejection: '97%', warranty: 'Lifetime', cost: '$8-14/sqft', best: 'Luxury homes, max clarity' },
  { name: 'Llumar ATC', brand: 'Llumar', vlt: '55%', rejection: '79%', warranty: '10yr', cost: '$6-10/sqft', best: 'Balanced performance' },
  { name: 'Vista V-Series', brand: 'Vista', vlt: '35%', rejection: '83%', warranty: 'Lifetime', cost: '$7-12/sqft', best: 'West/south DFW exposure' },
  { name: 'Madico', brand: 'Madico', vlt: '50%', rejection: '76%', warranty: '10yr', cost: '$5-9/sqft', best: 'Budget-conscious installs' },
];

const orientations = ['South-facing', 'West-facing', 'East-facing', 'North-facing'];
const problems = ['Excessive heat gain', 'Glare on screens', 'UV fading furniture', 'High cooling bills'];

export default function DFWWindowFilmGuide() {
  const [orientation, setOrientation] = useState('');
  const [problem, setProblem] = useState('');
  const [method, setMethod] = useState('');
  const [rec, setRec] = useState(null);

  const getRecommendation = () => {
    if (!orientation || !problem || !method) return;
    const isWestSouth = orientation.includes('West') || orientation.includes('South');
    const needsClarity = problem === 'Glare on screens';
    if (method === 'Professional') {
      setRec(isWestSouth ? films[2] : needsClarity ? films[0] : films[1]);
    } else {
      setRec({ name: 'DIY Film Kit', brand: 'Various', vlt: '45%', rejection: '70%', warranty: '2-5yr', cost: '$1-3/sqft', best: 'Temporary fix — pro install recommended for DFW' });
    }
  };

  const reset = () => { setOrientation(''); setProblem(''); setMethod(''); setRec(null); };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌞</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Window Film Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Solar control window film cuts 40–80% of solar heat through DFW windows — choose the right film for your exposure.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[['🌡️', 'Heat Reduction', '40–80% solar heat blocked'], ['💡', 'DFW Visibility', 'Preserve natural light on bright days'], ['🛋️', 'UV Protection', '99% UV rays blocked — protects furniture'], ['💰', 'ROI', 'Payback in 2–4 DFW summers']].map(([icon, label, val]) => (
            <div key={label} style={{ background: '#1E293B', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Find Your Film</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Window Orientation</label>
              <select value={orientation} onChange={e => setOrientation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select orientation</option>
                {orientations.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Primary DFW Problem</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select problem</option>
                {problems.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Installation Method</label>
              <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select method</option>
                <option value='Professional'>Professional Install</option>
                <option value='DIY'>DIY</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
            <button onClick={reset} style={{ background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontSize: 15 }}>Reset</button>
          </div>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>✅ Recommended: {rec.name}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                {[['Brand', rec.brand], ['Visible Light', rec.vlt], ['Heat Rejection', rec.rejection], ['Warranty', rec.warranty], ['Cost', rec.cost]].map(([k, v]) => (
                  <div key={k} style={{ background: '#1E293B', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#64748B', fontSize: 12 }}>{k}</div>
                    <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 15, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, color: '#94A3B8', fontSize: 14 }}>💡 Best for: {rec.best}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📊 Brand Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead><tr>{['Film', 'Brand', 'Visible Light', 'Heat Rejection', 'Warranty', 'Cost/sqft'].map(h => <th key={h} style={{ color: '#F5E642', textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #334155′ }}>{h}</th>)}</tr></thead>
              <tbody>{films.map((f, i) => <tr key={i} style={{ borderBottom: '1px solid #1E293B' }}>{[f.name, f.brand, f.vlt, f.rejection, f.warranty, f.cost].map((v, j) => <td key={j} style={{ padding: '10px 12px', color: j === 0 ? '#E2E8F0′ : '#94A3B8' }}>{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
