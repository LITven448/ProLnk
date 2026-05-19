import { useState } from 'react';

export default function DFWGasPipingGuide2026() {
  const [project, setProject] = useState('');
  const [result, setResult] = useState('');

  const getRequirements = () => {
    if (!project) { setResult('Please select a project type.'); return; }
    const reqs: Record<string,string> = {
      bonding: '⚡ CSST Bonding (Critical in DFW): Corrugated stainless steel tubing must be bonded to your electrical grounding system to prevent lightning strike damage. DFW sits in storm alley — this is non-negotiable. A licensed master plumber must add bonding clamps every 6 ft. Cost: $300–600. Required by Texas code.',
      extension: '🔥 Gas Line Extension: Extending to a new appliance requires a licensed master plumber and a City of Dallas (or local) permit. Expect 1–2 week permit turnaround. Cost varies: $400–1,500 for a 20-ft extension + shut-off valve. Black iron pipe is standard; CSST allowed with proper bonding.',
      outdoor: '🍖 Outdoor Kitchen / Fire Pit: Requires a separate permit from your local municipality. Most DFW cities require a dedicated shutoff within 3 ft of the appliance. Underground lines must be at least 12 inches deep. Budget $800–2,500 depending on distance from main.',
      leak: '🚨 Gas Leak Repair: Leave the home immediately. Call Atmos Energy (DFW provider): 1-866-322-8667. Do NOT use any switches. Once cleared, a licensed master plumber must locate and repair. All gas repairs in Texas require a licensed plumber — no DIY.',
      replacement: '🔧 Full Gas Line Replacement: Black iron pipe over 30 years old may have corrosion at fittings. Full replacement to CSST + bonding system runs $2,000–5,000 for a typical DFW home. Requires master plumber + permit + city inspection.',
    };
    setResult(reqs[project] || 'Select a project for requirements.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔥 DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gas Piping Upgrade Guide for DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW sits in tornado and lightning alley. Gas line safety — especially CSST bonding — is critical. All gas work requires a licensed master plumber in Texas.</p>

        <div style={{ background: '#7f1d1d', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', borderLeft: '4px solid #ef4444′ }}>
          <strong style={{ color: '#fca5a5′ }}>⚠️ Texas Law:</strong>
          <span style={{ color: '#fecaca' }}> All gas piping work — including repairs — must be performed by a licensed master plumber. No exceptions. Unlicensed work voids homeowner insurance.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{icon:'⚡',label:'CSST bonding cost',val:'$300–600'},{icon:'📋',label:'Permit turnaround',val:'1–2 weeks'},{icon:'🏠',label:'Full replacement',val:'$2,000–5,000'}].map(c=>(
            <div key={c.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.3rem' }}>{c.val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Gas Project Requirements Guide</h2>
          <select value={project} onChange={e=>setProject(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem', width: '100%', marginBottom: '1rem' }}>
            <option value="">Select project type...</option>
            <option value="bonding">CSST bonding update</option>
            <option value="extension">Gas line extension (new appliance)</option>
            <option value="outdoor">Outdoor kitchen / fire pit</option>
            <option value="leak">Suspected gas leak</option>
            <option value="replacement">Full gas line replacement</option>
          </select>
          <button onClick={getRequirements} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get Requirements</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '6px', padding: '1rem', color: '#e2e8f0′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.8rem' }}>📞 Emergency: Atmos Energy DFW</h3>
          <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>1-866-322-8667</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>24/7 gas emergency line for Dallas-Fort Worth area</div>
        </div>
      </div>
    </div>
  );
}
