import { useState } from 'react';

export default function DFWHVACDuctlessVsDucted2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const recommendations: Record<string, { type: string; reason: string; cost: string }> = {
    whole_home: { type: 'Ducted Central HVAC', reason: 'Most cost-effective for whole-home cooling. Existing ductwork? Replacement is straightforward.', cost: '$5,000–$12,000 installed' },
    addition: { type: 'Ductless Mini-Split', reason: 'No ductwork to add. Single zone, independent control, energy efficient.', cost: '$1,800–$3,500 installed' },
    detached: { type: 'Ductless Mini-Split', reason: 'Detached garages/workshops — running ducts is expensive. Mini-split is the obvious choice.', cost: '$1,800–$2,800 installed' },
    multi_zone: { type: 'Multi-Zone Ductless', reason: 'Different temp zones for different people. Ductless multi-zone is cleaner than zoned ducted systems.', cost: '$4,000–$10,000 for 3 zones' },
    hybrid: { type: 'Hybrid System', reason: 'Ducted for main living areas + mini-split for bonus room/addition. Best of both worlds.', cost: '$7,000–$15,000 total' },
  };

  function evaluate() {
    if (!situation) { setResult('Select your situation'); return; }
    const r = recommendations[situation];
    setResult(r ? `${r.type} | ${r.reason} | Cost: ${r.cost}` : 'Consult a DFW HVAC pro');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>❄️ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Ductless vs Ducted HVAC in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>When each system makes sense for DFW homes — cost, comfort, and climate considerations.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏠', label: 'Ducted Central', pros: 'Whole-home, consistent temps, lower upfront for existing ductwork', cons: 'Duct leakage loses 20-30% efficiency, no zone control' },
            { icon: '🌬️', label: 'Ductless Mini-Split', pros: 'No duct losses, zone control, quiet, 25-40% more efficient', cons: 'Higher cost per zone, visible wall units, limited whole-home' },
            { icon: '🔀', label: 'Hybrid System', pros: 'Central for main areas, mini-split for additions — ideal coverage', cons: 'Two systems to maintain, higher upfront cost' },
            { icon: '💰', label: 'DFW Cost Comparison', pros: 'Same 3-ton BTU: Ducted $6K vs Ductless $8K — but ductless saves $600/yr in energy', cons: 'Ductless ROI: ~3-4 years on energy savings alone' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>{c.label}</div>
              <div style={{ color: '#4ade80', fontSize: '0.78rem', marginBottom: '0.25rem' }}>✅ {c.pros}</div>
              <div style={{ color: '#f87171', fontSize: '0.78rem' }}>❌ {c.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧮 System Recommendation Tool</h2>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.6rem', width: '100%', marginBottom: '1rem' }}>
            <option value="">Select your home situation</option>
            <option value="whole_home">Cooling entire home (2,000+ sq ft)</option>
            <option value="addition">Room addition or bonus room</option>
            <option value="detached">Detached garage or workshop</option>
            <option value="multi_zone">Multiple zones with different temp needs</option>
            <option value="hybrid">Mix — main home ducted + one problem area</option>
          </select>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', cursor: 'pointer' }}>Get Recommendation</button>
          {result && <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8, color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🌡️ DFW Climate Reality</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>DFW averages 100+ days above 90°F annually. Any HVAC system must be sized for peak load, not average. Both ducted and ductless systems from major brands (Carrier, Lennox, Trane, Mitsubishi, Daikin) perform reliably in DFW heat when properly sized.</p>
        </div>
      </div>
    </div>
  );
}