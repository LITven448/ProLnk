import { useState } from 'react';

export default function DFWLVPBrandsGuide2026() {
  const [useCase, setUseCase] = useState('');
  const [budget, setBudget] = useState('');
  const [rec, setRec] = useState('');

  const brands = [
    { name: 'COREtec', tier: 'Premium', price: '$4–$7/sq ft', wear: '20 mil', icon: '⭐', note: 'Pioneer of LVP — best overall for DFW heat and humidity. Rigid core, zero issues.' },
    { name: 'Pergo', tier: 'Mid-Range', price: '$2.50–$5/sq ft', wear: '12 mil', icon: '🏪', note: 'Wide availability at Lowes DFW stores. Reliable warranty, easy returns if needed.' },
    { name: 'Lifeproof', tier: 'Value', price: '$2–$4/sq ft', wear: '12 mil', icon: '🔨', note: 'Home Depot exclusive — best value LVP in DFW. 100% waterproof, solid DFW reviews.' },
    { name: 'LifeCore', tier: 'Premium Quiet', price: '$5–$8/sq ft', wear: '20 mil', icon: '🔇', note: 'Best acoustic underlayment in the market — ideal for DFW two-story homes.' },
    { name: 'MSI Woodhaven', tier: 'Design', price: '$3–$6/sq ft', wear: '12 mil', icon: '🎨', note: 'Tile-look LVP — stunning in DFW modern farmhouse kitchens and bathrooms.' },
  ];

  const useCases = [
    { id: 'pet', label: '🐾 Pets & Kids (Heavy Traffic)' },
    { id: 'noise', label: '🔇 Noise Reduction (Multi-Story)' },
    { id: 'design', label: '🎨 Design Statement Floors' },
    { id: 'rental', label: '🏘️ Rental Property Durability' },
  ];

  const budgets = [
    { id: 'low', label: '💰 Under $3/sq ft' },
    { id: 'mid', label: '💰💰 $3–$5/sq ft' },
    { id: 'high', label: '💰💰💰 $5+/sq ft' },
  ];

  const matrix: Record<string, Record<string, string>> = {
    pet: { low: 'Lifeproof', mid: 'Pergo', high: 'COREtec' },
    noise: { low: 'Lifeproof', mid: 'Pergo', high: 'LifeCore' },
    design: { low: 'MSI Woodhaven', mid: 'MSI Woodhaven', high: 'COREtec' },
    rental: { low: 'Lifeproof', mid: 'Pergo', high: 'Pergo' },
  };

  const handleGenerate = () => {
    if (useCase && budget) setRec(matrix[useCase]?.[budget] || 'COREtec');
  };

  const recBrand = brands.find(b => b.name === rec);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🏆</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '.5rem 0′ }}>DFW LVP Brand Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>The best luxury vinyl plank brands for North Texas homes — 12 mil+ wear layer minimum for DFW pets and kids.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {brands.map(b => (
            <div key={b.name} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', border: '1px solid #334155′ }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.25rem' }}>{b.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>{b.name}</div>
              <div style={{ color: '#64748b', fontSize: '.75rem', marginBottom: '.5rem' }}>{b.tier} · Wear: {b.wear}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem', lineHeight: 1.5, marginBottom: '.5rem' }}>{b.note}</div>
              <div style={{ color: '#F5E642', fontSize: '.85rem', fontWeight: 600 }}>{b.price}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🎯 Find Your DFW LVP Brand</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>Primary Use Case:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {useCases.map(u => (
                <button key={u.id} onClick={() => setUseCase(u.id)} style={{ background: useCase === u.id ? '#F5E642′ : '#0d2137', color: useCase === u.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: ’pointer', fontSize: '.85rem', fontWeight: useCase === u.id ? 700 : 400 }}>{u.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>Budget (material only):</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.5rem' }}>
              {budgets.map(b => (
                <button key={b.id} onClick={() => setBudget(b.id)} style={{ background: budget === b.id ? '#F5E642′ : '#0d2137', color: budget === b.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: ’pointer', fontSize: '.8rem', fontWeight: budget === b.id ? 700 : 400 }}>{b.label}</button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', width: '100%' }}>Get My DFW Brand Recommendation →</button>
        </div>

        {recBrand && (
          <div style={{ background: '#0d2137', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>✅ Recommended for Your DFW Home</h3>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.5rem' }}>{recBrand.icon} {recBrand.name} ({recBrand.tier})</p>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '.5rem' }}>{recBrand.note}</p>
            <p style={{ color: '#F5E642', fontWeight: 600 }}>💰 {recBrand.price} · Wear Layer: {recBrand.wear}</p>
          </div>
        )}
      </div>
    </div>
  );
}
