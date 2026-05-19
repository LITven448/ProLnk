import { useState } from 'react';

const projectTypes = [
  { label: 'Full Home Redesign', minBudget: 50000, designFeeRate: 0.15, recommendation: 'Full-service designer' },
  { label: 'Single Room Makeover', minBudget: 5000, designFeeRate: 0.12, recommendation: 'Full-service or hourly designer' },
  { label: 'Kitchen/Bath Renovation', minBudget: 20000, designFeeRate: 0.1, recommendation: 'Specialty designer' },
  { label: 'Furniture & Accessories Only', minBudget: 2000, designFeeRate: 0, recommendation: 'E-design or DIY' },
  { label: 'New Construction Finish-Out', minBudget: 80000, designFeeRate: 0.08, recommendation: 'Full-service designer essential' },
];

export default function DFWInteriorDesignerGuide() {
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { needsDesigner: boolean; fee: string; tip: string }>(null);

  function calculate() {
    const b = parseInt(budget.replace(/\D/g, ''));
    const pt = projectTypes.find(p => p.label === projectType);
    if (!pt || isNaN(b)) return;
    const needsDesigner = b >= pt.minBudget || pt.designFeeRate > 0;
    const fee = pt.designFeeRate > 0
      ? `$${Math.round(b * pt.designFeeRate).toLocaleString()} – $${Math.round(b * (pt.designFeeRate + 0.05)).toLocaleString()} estimated design fee`
      : 'Design fee minimal or included in e-design package ($500–$2,000 flat)';
    const tip = needsDesigner
      ? `Recommendation: ${pt.recommendation}. DFW designers often charge $125–$250/hr or 10–18% of total project cost.`
      : 'This scope is very DIY-friendly. Consider an e-design service for curated room packages at $500–$1,500.';
    setResult({ needsDesigner, fee, tip });
  }

  return (
    <div style={{ background: '#f9f7f4', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW Home Services Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>Interior Designer Guide for DFW Homeowners</h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 40, lineHeight: 1.7 }}>Everything you need to know before hiring — or skipping — an interior designer in the Dallas-Fort Worth market.</p>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🎨 What Does a Designer Actually Do?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '📐', title: 'Space Planning', desc: 'Furniture layout, traffic flow, room function optimization' },
              { icon: '🛍️', title: 'Sourcing & Procurement', desc: 'Trade-only vendors, custom orders, contractor coordination' },
              { icon: '🎭', title: 'Style Direction', desc: 'Color palettes, material selection, cohesive aesthetic' },
              { icon: '📋', title: 'Project Management', desc: 'Contractor scheduling, delivery tracking, punch lists' },
            ].map(item => (
              <div key={item.title} style={{ background: '#f5f5f0', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>💵 How DFW Designers Charge</h2>
          {[
            { model: 'Hourly Rate', range: '$125 – $250/hr', best: 'Small projects, consultations, or when you want budget control' },
            { model: 'Flat Fee', range: '$2,500 – $25,000', best: 'Defined scope projects like single rooms or kitchen refreshes' },
            { model: '% of Purchases', range: '15 – 35% markup', best: 'Full furnishing projects where designer handles all procurement' },
            { model: 'Hybrid', range: 'Fee + markup combo', best: 'Most common in DFW — design fee covers planning, markup covers goods' },
          ].map(row => (
            <div key={row.model} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{row.model}</div>
                <div style={{ fontSize: 13, color: '#777', marginTop: 2 }}>{row.best}</div>
              </div>
              <div style={{ fontWeight: 700, color: '#2e7d32', whiteSpace: 'nowrap', marginLeft: 16 }}>{row.range}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🤠 DFW Style Specialties</h2>
          <p style={{ color: '#666', marginBottom: 16, lineHeight: 1.6 }}>Texas Transitional is the dominant style in Plano, Frisco, Southlake, and Allen — blending traditional architecture with clean-lined modern furniture. Other popular DFW niches include Modern Ranch, Contemporary Farmhouse, and Old Highland Park Traditional.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Texas Transitional', 'Modern Ranch', 'Contemporary Farmhouse', 'Highland Park Traditional', 'Urban Dallas Modern', 'Maximalist Glam'].map(tag => (
              <span key={tag} style={{ background: '#f0ece3', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Do I Need a Designer?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Project Type</label>
              <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }}>
                <option value=''>Select project type...</option>
                {projectTypes.map(p => <option key={p.label} value={p.label}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Total Budget</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder='e.g. $30,000′ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, boxSizing: ’border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get My Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, background: result.needsDesigner ? '#e8f5e9′ : '#fff8e1', borderRadius: 8, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{result.needsDesigner ? '✅ A designer adds clear value here' : '🛠️ DIY or e-design is viable'}</div>
              <div style={{ fontSize: 15, marginBottom: 8, fontWeight: 600 }}>{result.fee}</div>
              <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{result.tip}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
