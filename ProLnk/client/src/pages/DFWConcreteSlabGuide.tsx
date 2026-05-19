import { useState } from 'react';

const slabTypes = ['Post-Tension Slab', 'Conventional Rebar Slab', "Don't Know"];
const projectTypes = ['Add a pool', 'Interior plumbing repair', 'Drill for anchor/bolt', 'Add floor drain', 'Just learning'];

function getSlabGuidance(slabType: string, project: string) {
  if (slabType === 'Post-Tension Slab' && project === 'Add a pool') {
    return { risk: 'HIGH', guidance: 'PT cables around pool cutout are extremely dangerous. Never cut a PT slab without a structural engineer reviewing and a GPR scan marking cable locations. A single cut cable can explosively release thousands of pounds of tension.', consult: 'Structural Engineer + PT Slab Specialist' };
  }
  if (slabType === 'Post-Tension Slab' && project === 'Drill for anchor/bolt') {
    return { risk: 'HIGH', guidance: 'Post-tension cables run in a grid pattern typically 4–6 feet apart. Even a standard anchor drill can sever a cable. Get a GPR scan before drilling anything deeper than 1 inch.', consult: 'GPR Scanner + Foundation Company' };
  }
  if (project === 'Interior plumbing repair') {
    return { risk: 'MEDIUM', guidance: 'Interior plumbing under DFW slabs requires tunneling (preferred) or saw-cutting. Tunneling preserves slab integrity. Get a leak detection scan first to confirm location before any cutting.', consult: 'Leak Detection Specialist + Licensed Plumber' };
  }
  if (project === 'Add floor drain') {
    return { risk: 'MEDIUM', guidance: 'Adding a floor drain requires cutting the slab and tying into existing drain lines. On PT slabs, requires engineer approval and GPR scan. On conventional slabs, still requires permit in most DFW cities.', consult: 'Licensed Plumber + City Permit Office' };
  }
  return { risk: 'LOW', guidance: 'Understanding your slab type is the first step. Check your home builder documents or pull your original permit from the city — it will list the slab specification. Post-tension is dominant in DFW homes built after 1985.', consult: 'City Permit Records + Foundation Inspector' };
}

const dfwFacts = [
  { icon: '⚡', title: 'Post-Tension Dominates DFW', desc: 'Most DFW homes built after 1985 have post-tension slabs. PT cables are tensioned steel strands that add compressive strength but create serious hazards when cut.' },
  { icon: '🚫', title: "Don't Drill Without a GPR Scan", desc: 'Ground Penetrating Radar (GPR) scans map PT cable locations before any drilling or cutting. Cost: $300–$600. Skipping this step can cost $20,000+ in repairs.' },
  { icon: '💧', title: 'Slab Leaks Are Common', desc: 'DFW clay movement stresses copper supply lines under slabs. Signs: hot spots on floor, unexplained water bills, foundation settlement. Electronic detection finds leaks without cutting.' },
  { icon: '🏗️', title: 'Tunneling vs Saw-Cutting', desc: "Tunneling under the slab preserves structural integrity and is preferred for plumbing repairs. Saw-cutting is faster but risks cutting PT cables and requires patching." },
];

export default function DFWConcreteSlabGuide() {
  const [slabType, setSlabType] = useState('');
  const [projectType, setProjectType] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = slabType && projectType ? getSlabGuidance(slabType, projectType) : null;
  const riskColor = result?.risk === 'HIGH' ? '#ef4444′ : result?.risk === ’MEDIUM' ? '#f59e0b' : '#22c55e';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Concrete Slab Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>Understanding whether your DFW home has a post-tension or conventional slab determines what you can and can't safely do — from drilling to pool installation to plumbing repairs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {dfwFacts.map(f => (
            <div key={f.title} style={{ background: '#112240', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>🔍 Slab Project Risk Checker</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Your Slab Type</div>
              <select value={slabType} onChange={e => { setSlabType(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {slabTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Planned Project</div>
              <select value={projectType} onChange={e => { setProjectType(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!slabType || !projectType} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', opacity: (!slabType || !projectType) ? 0.5 : 1 }}>
            Check Project Risk
          </button>
          {showResult && result && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: `3px solid ${riskColor}` }}>
              <div style={{ color: riskColor, fontWeight: 700, marginBottom: 8 }}>⚠️ Risk Level: {result.risk}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: '0 0 12px 0′ }}>{result.guidance}</p>
              <div style={{ fontSize: 13, color: '#F5E642′ }}>👷 Who to Consult: {result.consult}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>📋 How to Identify Your Slab Type</div>
          {['Check your closing documents for "post-tension" or "PT slab" notation', 'Pull your building permit from the city — it lists foundation type', 'Look for PT end caps on slab edges (square metal plates, often painted)', 'Ask your HOA or builder — most DFW builders document slab specs'].map(f => (
            <div key={f} style={{ fontSize: 13, marginBottom: 8, color: '#cbd5e1′ }}>• {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
