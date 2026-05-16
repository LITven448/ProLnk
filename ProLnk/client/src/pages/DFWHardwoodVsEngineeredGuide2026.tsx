import { useState } from 'react';

export default function DFWHardwoodVsEngineeredGuide2026() {
  const [situation, setSituation] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const situations = [
    { id: 'slab', label: '🏠 Concrete Slab Foundation' },
    { id: 'pier', label: '🏡 Pier & Beam Foundation' },
    { id: 'humid', label: '💧 High Humidity Rooms (Kitchen/Bath)' },
    { id: 'pet', label: '🐾 Pets & Heavy Traffic' },
    { id: 'budget', label: '💰 Budget-Conscious' },
  ];

  const recs: Record<string, { type: string; reason: string; price: string }> = {
    slab: { type: 'Engineered Hardwood', reason: 'Solid hardwood cannot install over concrete — engineered cross-ply construction handles moisture from slabs perfectly in DFW.', price: '$4–$9/sq ft installed' },
    pier: { type: 'Solid Hardwood', reason: 'Pier & beam allows airflow underneath — solid hardwood thrives here and can be refinished 5+ times over decades.', price: '$6–$14/sq ft installed' },
    humid: { type: 'Engineered Hardwood', reason: 'DFW humidity swings 30–80% seasonally. Engineered resists cupping and gapping that solid wood suffers in DFW bathrooms/kitchens.', price: '$4–$9/sq ft installed' },
    pet: { type: 'Engineered Hardwood (Aluminum Oxide Finish)', reason: 'Harder finishes resist scratches. Engineered handles DFW temp swings without gaps that trap pet dander and debris.', price: '$5–$10/sq ft installed' },
    budget: { type: 'Engineered Hardwood', reason: 'Lower material cost, easier DIY install, and DFW climate suits engineered better anyway — best value in North Texas.', price: '$3–$7/sq ft installed' },
  };

  const handleSelect = (id: string) => {
    setSituation(id);
    setRecommendation(id);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🌲</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '.5rem 0' }}>DFW Hardwood vs Engineered Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>North Texas humidity swings make this decision critical — get it right the first time.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '2px solid #2563eb' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🪵</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.2rem', marginBottom: '.75rem' }}>Solid Hardwood</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '.9rem' }}>
              <li>✅ Refinishable 5–8 times</li>
              <li>✅ Authentic feel and sound</li>
              <li>✅ Adds resale value in DFW market</li>
              <li>⚠️ Moves significantly in DFW humidity</li>
              <li>❌ Cannot install over concrete</li>
              <li>❌ $6–$14/sq ft installed</li>
            </ul>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🏗️</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.2rem', marginBottom: '.75rem' }}>Engineered Hardwood</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '.9rem' }}>
              <li>✅ Cross-ply resists DFW humidity</li>
              <li>✅ Installs over concrete slab</li>
              <li>✅ More stable year-round in DFW</li>
              <li>✅ $3–$9/sq ft installed</li>
              <li>⚠️ Refinishable 1–3 times only</li>
              <li>⚠️ Thinner wear layer on budget lines</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏡 What best describes your situation?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => handleSelect(s.id)} style={{ background: situation === s.id ? '#F5E642' : '#0d2137', color: situation === s.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.75rem 1rem', cursor: 'pointer', textAlign: 'left', fontSize: '.95rem', fontWeight: situation === s.id ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {recommendation && recs[recommendation] && (
          <div style={{ background: '#0d2137', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>✅ Our DFW Recommendation</h3>
            <p style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.5rem' }}>{recs[recommendation].type}</p>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', lineHeight: 1.6 }}>{recs[recommendation].reason}</p>
            <p style={{ color: '#F5E642', fontWeight: 600 }}>💰 Typical DFW Cost: {recs[recommendation].price}</p>
          </div>
        )}
      </div>
    </div>
  );
}
