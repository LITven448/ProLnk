import { useState } from 'react';

export default function DFWOutdoorKitchenBrands2026() {
  const [budget, setBudget] = useState('');
  const [features, setFeatures] = useState('');
  const [rec, setRec] = useState('');

  const brands = [
    { name: 'Twin Eagles', icon: '🦅', origin: 'DFW-Based', tier: 'Premium', price: '$8,000–$30,000+', steel: '304 Stainless', note: 'Made right here in DFW — Twin Eagles knows North Texas weather. Best warranty and local service support.' },
    { name: 'Bull BBQ', icon: '🐂', origin: 'Popular DFW', tier: 'Mid-Range', price: '$3,000–$10,000', steel: '304 Stainless', note: 'Most popular brand at DFW outdoor kitchen dealers. Great value with solid DFW heat tolerance.' },
    { name: 'Alfresco', icon: '🌿', origin: 'Premium', tier: 'Luxury', price: '$10,000–$40,000+', steel: '304 Stainless', note: 'Chef-grade outdoor cooking for DFW luxury builds. Infrared burners perform excellently in DFW wind.' },
    { name: 'Summerset', icon: '☀️', origin: 'Widely Available', tier: 'Entry-Mid', price: '$1,500–$5,000', steel: '304 Stainless', note: 'Best entry point for DFW homeowners — widely available at DFW outdoor living stores. Solid DFW reviews.' },
  ];

  const budgetOpts = [
    { id: 'entry', label: '💰 Under $5,000' },
    { id: 'mid', label: '💰💰 $5,000–$15,000' },
    { id: 'luxury', label: '💰💰💰 $15,000+' },
  ];

  const featureOpts = [
    { id: 'local', label: '🦅 DFW Local Brand' },
    { id: 'value', label: '💰 Best Value' },
    { id: 'chef', label: '👨‍🍳 Chef-Grade Performance' },
    { id: 'starter', label: '🚀 First Outdoor Kitchen' },
  ];

  const matrix: Record<string, Record<string, string>> = {
    local: { entry: 'Bull BBQ', mid: 'Twin Eagles', luxury: 'Twin Eagles' },
    value: { entry: 'Summerset', mid: 'Bull BBQ', luxury: 'Bull BBQ' },
    chef: { entry: 'Bull BBQ', mid: 'Alfresco', luxury: 'Alfresco' },
    starter: { entry: 'Summerset', mid: 'Summerset', luxury: 'Bull BBQ' },
  };

  const handleGenerate = () => {
    if (budget && features) setRec(matrix[features]?.[budget] || 'Bull BBQ');
  };

  const recBrand = brands.find(b => b.name === rec);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🔥</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '.5rem 0' }}>DFW Outdoor Kitchen Brands 2026</h1>
          <p style={{ color: '#94a3b8' }}>Best outdoor kitchen brands built for DFW weather — 304 stainless required for North Texas humidity.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', border: '1px solid #F5E642' }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '.5rem' }}>⚠️ DFW Critical: 304 Stainless Only</p>
          <p style={{ color: '#94a3b8', fontSize: '.9rem', lineHeight: 1.6 }}>DFW humidity + summer heat destroys 430 stainless. Every brand below uses 304 stainless — never accept 430 in DFW outdoor kitchens or it will rust within 2 years.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {brands.map(b => (
            <div key={b.name} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.25rem' }}>{b.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{b.name}</div>
              <div style={{ color: '#64748b', fontSize: '.75rem', marginBottom: '.5rem' }}>{b.origin} · {b.tier}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem', lineHeight: 1.5, marginBottom: '.5rem' }}>{b.note}</div>
              <div style={{ color: '#22c55e', fontSize: '.75rem', marginBottom: '.25rem' }}>✅ {b.steel}</div>
              <div style={{ color: '#F5E642', fontSize: '.85rem', fontWeight: 600 }}>💰 {b.price}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🎯 Find Your DFW Outdoor Kitchen Brand</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>Budget:</p>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {budgetOpts.map(b => (
                <button key={b.id} onClick={() => setBudget(b.id)} style={{ flex: 1, background: budget === b.id ? '#F5E642' : '#0d2137', color: budget === b.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: 'pointer', fontSize: '.78rem', fontWeight: budget === b.id ? 700 : 400 }}>{b.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>What matters most?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {featureOpts.map(f => (
                <button key={f.id} onClick={() => setFeatures(f.id)} style={{ background: features === f.id ? '#F5E642' : '#0d2137', color: features === f.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: 'pointer', fontSize: '.85rem', fontWeight: features === f.id ? 700 : 400 }}>{f.label}</button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', width: '100%' }}>Get My DFW Outdoor Kitchen Brand →</button>
        </div>

        {recBrand && (
          <div style={{ background: '#0d2137', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>✅ Best DFW Outdoor Kitchen Brand Match</h3>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.5rem' }}>{recBrand.icon} {recBrand.name} ({recBrand.tier})</p>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '.5rem' }}>{recBrand.note}</p>
            <p style={{ color: '#F5E642', fontWeight: 600 }}>💰 {recBrand.price} · ✅ {recBrand.steel}</p>
          </div>
        )}
      </div>
    </div>
  );
}
