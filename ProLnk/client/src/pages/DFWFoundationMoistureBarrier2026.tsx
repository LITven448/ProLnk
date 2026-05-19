import { useState } from 'react';

export default function DFWFoundationMoistureBarrier2026() {
  const [foundationType, setFoundationType] = useState('slab');
  const [issue, setIssue] = useState('none');
  const [result, setResult] = useState('');

  const foundations = ['Slab-on-Grade', 'Crawl Space', 'Pier & Beam', 'Basement'];
  const issues = ['No Current Issues', 'Moisture/Mold Smell', 'Wood Floor Buckling', 'Foundation Cracks', 'High Indoor Humidity'];

  const getGuide = () => {
    let rec = '';
    if (foundationType === 'Slab-on-Grade' && issue === 'No Current Issues') {
      rec = 'DFW slab foundations rely on the vapor barrier installed during construction (6-mil poly). If your slab is post-1980, you likely have adequate protection. Key risk: DFW clay soil expands when wet and contracts when dry — maintain consistent soil moisture around perimeter with drip irrigation to prevent differential movement.';
    } else if (foundationType === 'Crawl Space') {
      rec = 'Crawl space encapsulation is high priority for DFW homes. DFW clay soil releases moisture constantly. Standard: 20-mil reinforced poly liner on floor + walls, sealed to foundation walls, with dehumidifier. Cost: $4,000–$12,000. ROI: prevents structural damage and improves air quality throughout home.';
    } else if (foundationType === 'Pier & Beam') {
      rec = 'Pier & beam foundations in DFW need active moisture management. Ensure proper ventilation under structure (1 sq ft vent per 150 sq ft), install 6-mil poly ground cover overlapping 12 inches, and maintain soil grade sloping away from home. Inspect annually after heavy DFW rain events.';
    } else if (issue === 'Foundation Cracks') {
      rec = 'Foundation cracks in DFW are almost always moisture-related — clay soil shrinkage during drought. Immediate steps: soil moisture probe around perimeter, install soaker hoses 18 inches from foundation on timer, call foundation specialist. Do NOT add vapor barrier until structural assessment complete.';
    } else {
      rec = `${issue} with ${foundationType}: Moisture intrusion symptoms on DFW foundations require inspection before treatment. DFW clay capillary action can wick moisture upward through slab micro-cracks. Vapor barrier upgrade options range from interior drainage systems ($3,000–$8,000) to exterior waterproofing ($8,000–$20,000).`;
    }
    setResult(rec);
  };

  const stats = [
    { icon: '🌱', label: 'DFW Clay Expansion', val: '3–9%', sub: 'Volume change dry vs saturated soil' },
    { icon: '💧', label: 'Standard Vapor Barrier', val: '6-mil poly', sub: 'IRC minimum for slab-on-grade' },
    { icon: '🏠', label: 'Crawl Encapsulation', val: '20-mil liner', sub: 'Recommended for DFW crawl spaces' },
    { icon: '🔧', label: 'Upgrade Cost Range', val: '$1K–$12K', sub: 'Depends on foundation type and severity' },
  ];

  const soilPhases = [
    { phase: 'Drought (Summer)', soil: 'Shrinks 3–9%', risk: 'Foundation settles, cracks form, pipes stressed' },
    { phase: 'Rain Event', soil: 'Rapid expansion', risk: 'Hydrostatic pressure on foundation walls' },
    { phase: 'Wet Season', soil: 'Saturated + capillary', risk: 'Vapor migrates upward through slab/crawl' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0′ }}>DFW Foundation Moisture Barrier Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Vapor barriers and moisture management for North Texas clay soil</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.25rem', borderTop: '3px solid #F5E642′ }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🌍 DFW Clay Soil Capillary Action</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1rem' }}>
            DFW Blackland Prairie clay soil is notorious for its dramatic moisture behavior. Without proper vapor barriers, clay soil acts as a pump — drawing ground moisture upward through capillary action and releasing it into your crawl space or through micro-cracks in your slab.
          </p>
          {soilPhases.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0.75rem', background: '#0f1f3d', borderRadius: '8px', marginBottom: '0.4rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 600, minWidth: '140px', fontSize: '0.85rem' }}>{r.phase}</span>
              <span style={{ color: '#60a5fa', minWidth: '120px', fontSize: '0.85rem' }}>{r.soil}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{r.risk}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 Your Moisture Barrier Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Foundation Type</label>
              <select value={foundationType} onChange={e => setFoundationType(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {foundations.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Current Symptoms</label>
              <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {issues.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get My Moisture Barrier Guide
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0f1f3d', borderRadius: '8px', color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
