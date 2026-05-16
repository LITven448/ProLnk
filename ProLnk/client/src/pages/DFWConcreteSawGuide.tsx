import { useState } from 'react';

const sawTypes = [
  { project: 'Expansion Joint Cutting', slab: 'Standard', saw: 'Walk-Behind Concrete Saw', postTension: false, rec: 'Rent' },
  { project: 'Expansion Joint Cutting', slab: 'Post-Tension', saw: 'Walk-Behind Concrete Saw', postTension: true, rec: 'Hire Professional' },
  { project: 'Slab Repair Access', slab: 'Standard', saw: 'Cut-Off Saw (14")', postTension: false, rec: 'Rent' },
  { project: 'Slab Repair Access', slab: 'Post-Tension', saw: 'Cut-Off Saw (14")', postTension: true, rec: 'Hire Professional' },
  { project: 'Patio Modification', slab: 'Standard', saw: 'Walk-Behind Concrete Saw', postTension: false, rec: 'Rent' },
  { project: 'Patio Modification', slab: 'Post-Tension', saw: 'Walk-Behind Concrete Saw', postTension: true, rec: 'Hire Professional' },
];

export default function DFWConcreteSawGuide() {
  const [project, setProject] = useState('');
  const [slab, setSlab] = useState('');
  const [result, setResult] = useState<typeof sawTypes[0] | null>(null);

  function calculate() {
    const match = sawTypes.find(s => s.project === project && s.slab === slab);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🏗️ DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Concrete Saw Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's expansive clay soil causes constant slab movement — concrete cutting is a common repair task. Know when to rent vs. hire, and always check for post-tension cables before cutting.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ DFW Concrete Saw Selector</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>Project Type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select project...</option>
              <option>Expansion Joint Cutting</option>
              <option>Slab Repair Access</option>
              <option>Patio Modification</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>DFW Slab Type</label>
            <select value={slab} onChange={e => setSlab(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select slab type...</option>
              <option>Standard</option>
              <option>Post-Tension</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Recommendation</button>
        </div>

        {result && (
          <div style={{ background: result.postTension ? '#3b1a1a' : '#1a2e1a', border: `1px solid ${result.postTension ? '#ef4444' : '#22c55e'}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>🪚 {result.saw}</div>
            {result.postTension && <div style={{ background: '#ef4444', color: '#fff', borderRadius: 6, padding: '8px 14px', marginBottom: 12, fontWeight: 700 }}>⚠️ POST-TENSION CABLE RISK — Do NOT cut without locating cables. Hire a licensed concrete contractor.</div>}
            <div style={{ color: '#94a3b8', marginBottom: 8 }}>Recommendation: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.rec}</span></div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>{result.rec === 'Rent' ? 'Standard slab cutting can be DIY with proper PPE (eye protection, dust mask, hearing protection). Always wet-cut to control silica dust.' : 'Post-tension slabs require cable location (GPR scan) and licensed contractor. Cutting a cable can cause catastrophic slab failure.'}</div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Saw Types Reference</h2>
          {[
            { icon: '🚶', name: 'Walk-Behind Concrete Saw', use: 'Long straight cuts, expansion joints, driveway repair', depth: 'Up to 13"' },
            { icon: '✂️', 'name': 'Cut-Off Saw (14")', use: 'Spot cuts, tight areas, slab access points', depth: 'Up to 5"' },
            { icon: '💧', name: 'Handheld Angle Grinder', use: 'Small patches, tile removal, edge work', depth: 'Up to 2"' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.icon} {item.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Use: {item.use}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Max depth: {item.depth}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Need a DFW Concrete Pro?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, lineHeight: 1.7 }}>Post-tension slabs, deep cuts, or large projects require a licensed concrete contractor. ProLnk connects DFW homeowners with vetted concrete pros.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
