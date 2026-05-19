import { useState } from 'react';

export default function DFWCabinetryStylesGuide2026() {
  const [style, setStyle] = useState('');
  const [rec, setRec] = useState('');

  const styles = [
    { id: 'modern', label: '🏙️ Modern / Contemporary' },
    { id: 'farmhouse', label: '🌾 Modern Farmhouse' },
    { id: 'traditional', label: '🏛️ Traditional / Classic' },
    { id: 'transitional', label: '🔄 Transitional (Mix of Both)' },
    { id: 'luxury', label: '💎 Luxury / Custom' },
  ];

  const cabinetData = [
    { name: 'Shaker', trend: '#1 in DFW 2026', icon: '🏆', desc: 'Five-piece door with center panel — timeless, works in every DFW neighborhood from Allen to Fort Worth.', leadTime: 'Semi-custom: 4–6 weeks', price: '$8,000–$25,000 (avg DFW kitchen)' },
    { name: 'Flat Panel', trend: 'Growing Fast', icon: '📈', desc: 'Slab door, no frame detail — popular in Frisco/Prosper new builds. Very easy to clean.', leadTime: 'Semi-custom: 3–5 weeks', price: '$7,000–$22,000′ },
    { name: 'Raised Panel', trend: 'Declining', icon: '📉', desc: 'Traditional DFW look from the 2000s — still common in older Southlake/Colleyville homes needing refresh.', leadTime: 'Semi-custom: 4–8 weeks', price: '$9,000–$28,000′ },
    { name: 'Inset', trend: 'Premium Niche', icon: '💎', desc: 'Cabinet door sits flush inside frame — precise craftsmanship, premium cost. Popular in luxury DFW custom builds.', leadTime: 'Custom only: 8–14 weeks', price: '$20,000–$60,000+' },
  ];

  const recs: Record<string, { cabinet: string; note: string }> = {
    modern: { cabinet: 'Flat Panel', note: 'Clean lines, handleless options, and minimal detail make flat panel the go-to for DFW modern homes.' },
    farmhouse: { cabinet: 'Shaker', note: 'Shaker is the definitive DFW modern farmhouse cabinet — pairs perfectly with white oak open shelving and black hardware.' },
    traditional: { cabinet: 'Raised Panel', note: 'Raised panel honors classic DFW traditional architecture — consider cream or glazed finishes.' },
    transitional: { cabinet: 'Shaker', note: 'Shaker bridges traditional and modern beautifully — the most versatile choice for DFW resale value.' },
    luxury: { cabinet: 'Inset', note: 'Inset cabinetry signals true custom quality — worth the 14-week lead time for DFW luxury builds over $1M.' },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🗄️</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '.5rem 0′ }}>DFW Cabinet Styles Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>What DFW homeowners are choosing in 2026 — from Allen to Fort Worth.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {cabinetData.map(c => (
            <div key={c.name} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', border: '1px solid #334155′ }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.25rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{c.name}</div>
              <div style={{ color: '#64748b', fontSize: '.75rem', marginBottom: '.5rem' }}>Trend: {c.trend}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem', lineHeight: 1.5, marginBottom: '.5rem' }}>{c.desc}</div>
              <div style={{ color: '#cbd5e1', fontSize: '.75rem', marginBottom: '.25rem' }}>⏱ {c.leadTime}</div>
              <div style={{ color: '#F5E642', fontSize: '.8rem', fontWeight: 600 }}>💰 {c.price}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏡 What kitchen style fits your DFW home?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {styles.map(s => (
              <button key={s.id} onClick={() => { setStyle(s.id); setRec(s.id); }} style={{ background: style === s.id ? '#F5E642′ : '#0d2137', color: style === s.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.75rem 1rem', cursor: ’pointer', textAlign: 'left', fontSize: '.95rem', fontWeight: style === s.id ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {rec && recs[rec] && (
          <div style={{ background: '#0d2137', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>✅ DFW Cabinet Recommendation</h3>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.5rem' }}>{recs[rec].cabinet}</p>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{recs[rec].note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
