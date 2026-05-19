import { useState } from 'react';

export default function DFWApplancePackageGuide2026() {
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');
  const [rec, setRec] = useState('');

  const brands = [
    { name: 'Samsung', icon: '📱', tier: 'Mid-Premium', price: '$3,500–$7,000', energyStar: true, note: 'Best smart features for DFW tech-savvy homeowners. Family Hub fridge pairs with DFW smart home setups.' },
    { name: 'LG', icon: '🔷', tier: 'Mid-Premium', price: '$3,200–$6,500', energyStar: true, note: 'InstaView fridge and EasyClean oven popular in DFW. Excellent DFW Best Buy in-store availability.' },
    { name: 'GE Profile', icon: '⚡', tier: 'Mid-Range', price: '$2,800–$5,500', energyStar: true, note: 'Reliable workhorse — most common in DFW new construction builder-grade upgrades.' },
    { name: 'KitchenAid', icon: '🍳', tier: 'Premium', price: '$5,000–$12,000', energyStar: false, note: 'Commercial-feel ranges loved by DFW home chefs. Best-in-class mixer tie-ins.' },
    { name: 'Bosch', icon: '🇩🇪', tier: 'Premium Quiet', price: '$4,500–$9,000', energyStar: true, note: 'Quietest dishwashers — 42 dBA. Popular in DFW open-concept kitchens near living rooms.' },
  ];

  const budgets = [
    { id: 'entry', label: '💰 Under $3,500′ },
    { id: 'mid', label: '💰💰 $3,500–$6,000′ },
    { id: 'premium', label: '💰💰💰 $6,000+' },
  ];

  const priorities = [
    { id: 'smart', label: '📱 Smart Home Integration' },
    { id: 'quiet', label: '🔇 Quiet Operation' },
    { id: 'cooking', label: '🍳 Cooking Performance' },
    { id: 'energy', label: '⚡ DFW Energy Savings' },
  ];

  const matrix: Record<string, Record<string, string>> = {
    smart: { entry: 'GE Profile', mid: 'Samsung', premium: 'Samsung' },
    quiet: { entry: 'GE Profile', mid: 'Bosch', premium: 'Bosch' },
    cooking: { entry: 'GE Profile', mid: 'LG', premium: 'KitchenAid' },
    energy: { entry: 'GE Profile', mid: 'LG', premium: 'Bosch' },
  };

  const handleGenerate = () => {
    if (budget && priority) setRec(matrix[priority]?.[budget] || 'GE Profile');
  };

  const recBrand = brands.find(b => b.name === rec);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🍽️</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '.5rem 0′ }}>DFW Kitchen Appliance Package Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>Best appliance suites for DFW kitchens — package savings, Energy Star for DFW electricity rates, delivery timing.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', border: '1px solid #F5E642′ }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '.5rem' }}>💡 DFW Package Deal Tip</p>
          <p style={{ color: '#94a3b8', fontSize: '.9rem', lineHeight: 1.6 }}>Buy all appliances together at Best Buy, Lowes, or Home Depot DFW locations for 10–20% bundle discounts. DFW Oncor rebates available for Energy Star appliances — save $50–$200 per unit.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {brands.map(b => (
            <div key={b.name} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', border: '1px solid #334155′ }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.25rem' }}>{b.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{b.name}</div>
              <div style={{ color: '#64748b', fontSize: '.75rem', marginBottom: '.5rem' }}>{b.tier} {b.energyStar ? '· ⭐ Energy Star' : ''}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem', lineHeight: 1.5, marginBottom: '.5rem' }}>{b.note}</div>
              <div style={{ color: '#F5E642', fontSize: '.85rem', fontWeight: 600 }}>💰 {b.price}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🎯 Find Your DFW Appliance Package</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>Package Budget:</p>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {budgets.map(b => (
                <button key={b.id} onClick={() => setBudget(b.id)} style={{ flex: 1, background: budget === b.id ? '#F5E642′ : '#0d2137', color: budget === b.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: ’pointer', fontSize: '.8rem', fontWeight: budget === b.id ? 700 : 400 }}>{b.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>Top Priority:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {priorities.map(p => (
                <button key={p.id} onClick={() => setPriority(p.id)} style={{ background: priority === p.id ? '#F5E642′ : '#0d2137', color: priority === p.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: ’pointer', fontSize: '.85rem', fontWeight: priority === p.id ? 700 : 400 }}>{p.label}</button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', width: '100%' }}>Get My DFW Appliance Recommendation →</button>
        </div>

        {recBrand && (
          <div style={{ background: '#0d2137', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>✅ Best DFW Appliance Package Match</h3>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.5rem' }}>{recBrand.icon} {recBrand.name} Suite ({recBrand.tier})</p>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '.5rem' }}>{recBrand.note}</p>
            <p style={{ color: '#F5E642', fontWeight: 600 }}>💰 Package Range: {recBrand.price} {recBrand.energyStar ? '· ⭐ Qualifies for Oncor Rebates' : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}
