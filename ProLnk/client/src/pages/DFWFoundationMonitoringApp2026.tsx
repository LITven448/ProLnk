import { useState } from 'react';

export default function DFWFoundationMonitoringApp2026() {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, string> = {
      elevation: '🔬 Ziplevel Pro 2000 — professional floor elevation instrument that maps all slab points to 0.01″ accuracy. Required for any pier work scoping in DFW clay.',
      moisture: '💧 Smart soil moisture sensors (Toro Precision or Irrometer) installed at drip zone perimeter. Prevents the heave-inducing saturation that DFW clay is infamous for.',
      leaks: '🚰 Leak detection sensors under sinks, near HVAC condensate, and at water heater. Slab leaks cause foundation heave; early detection is critical in DFW.',
      cracks: '📸 Monthly photographic documentation with millimeter scale + Ziplevel quarterly survey. ProLnk Vault stores all readings with timestamps for trend analysis.',
    };
    setResult(map[goal] || 'Select a monitoring goal above.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#F5E642', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          📡 DFW Foundation Monitoring Technology 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Digital tools for continuous DFW foundation monitoring — from professional elevation instruments to smart water sensors.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⚖️', title: 'Ziplevel Instrument', desc: 'Professional-grade floor elevation mapping at 0.01″ precision. Creates a topographic baseline for every DFW foundation.' },
            { icon: '💧', title: 'Soil Moisture Sensors', desc: 'Real-time soil saturation data around the perimeter. Prevents DFW clay heave from irrigation overwatering.' },
            { icon: '🚰', title: 'Leak Detection', desc: 'Smart sensors detect plumbing leaks under the slab — the #1 cause of unexpected heave in DFW.' },
            { icon: '🏦', title: 'ProLnk Vault Storage', desc: 'All readings stored with timestamps in Home Health Vault for trend analysis and contractor handoff.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: '16px', padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🎯 Technology Recommendation Tool</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>What is your monitoring goal?</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem' }}>
              <option value="">Select a goal...</option>
              <option value="elevation">Track floor elevation changes over time</option>
              <option value="moisture">Monitor soil moisture around foundation</option>
              <option value="leaks">Detect plumbing leaks under or near slab</option>
              <option value="cracks">Document and trend crack progression</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get My Technology Recommendation
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: '8px', color: '#F5E642', fontSize: '0.95rem' }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}