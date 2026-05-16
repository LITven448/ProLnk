import { useState } from 'react';

const brands = [
  { name: 'Trane', reliability: 9.2, cost: 'High', warranty: '10 yr parts', noise: 'Low', dfwRating: 9.5, badge: '🏆' },
  { name: 'Carrier', reliability: 9.0, cost: 'High', warranty: '10 yr parts', noise: 'Low', dfwRating: 9.3, badge: '⭐' },
  { name: 'Lennox', reliability: 8.8, cost: 'High', warranty: '10 yr parts', noise: 'Very Low', dfwRating: 9.1, badge: '⭐' },
  { name: 'American Standard', reliability: 8.9, cost: 'High', warranty: '10 yr parts', noise: 'Low', dfwRating: 9.0, badge: '' },
  { name: 'Daikin', reliability: 8.7, cost: 'Medium', warranty: '12 yr parts', noise: 'Low', dfwRating: 8.8, badge: '' },
  { name: 'Rheem', reliability: 8.3, cost: 'Medium', warranty: '10 yr parts', noise: 'Medium', dfwRating: 8.4, badge: '' },
  { name: 'York', reliability: 7.8, cost: 'Low-Med', warranty: '10 yr parts', noise: 'Medium', dfwRating: 7.9, badge: '' },
  { name: 'Goodman', reliability: 7.5, cost: 'Low', warranty: '10 yr parts', noise: 'Medium', dfwRating: 7.6, badge: '💲' },
];

const priorities = ['Reliability', 'Efficiency', 'Cost'];
const budgets = ['Under $4,000', '$4,000–$7,000', '$7,000–$12,000', '$12,000+'];

function getTopThree(budget: string, priority: string) {
  let filtered = [...brands];
  if (budget === 'Under $4,000') filtered = filtered.filter(b => b.cost === 'Low' || b.cost === 'Low-Med');
  else if (budget === '$4,000–$7,000') filtered = filtered.filter(b => b.cost !== 'High');
  else if (budget === '$7,000–$12,000') filtered = filtered.filter(b => b.cost !== 'Low');

  if (priority === 'Reliability') filtered.sort((a, b) => b.reliability - a.reliability);
  else if (priority === 'Efficiency') filtered.sort((a, b) => b.dfwRating - a.dfwRating);
  else filtered.sort((a, b) => (a.cost < b.cost ? -1 : 1));

  return filtered.slice(0, 3);
}

export default function DFWHVACBrandsGuide2026() {
  const [selectedBudget, setSelectedBudget] = useState(1);
  const [selectedPriority, setSelectedPriority] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const topThree = getTopThree(budgets[selectedBudget], priorities[selectedPriority]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '3px solid #F5E642' }}>
        <div style={{ fontSize: 48 }}>🌡️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>Best HVAC Brands for DFW 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Top 8 brands rated for DFW's brutal summers. Compare reliability, cost, warranty, and heat performance before you buy.</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          {brands.map((b) => (
            <div key={b.name} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', position: 'relative' }}>
              {b.badge && <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 18 }}>{b.badge}</span>}
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 800, marginBottom: 12 }}>{b.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Reliability</span>
                  <span style={{ color: '#cbd5e1', fontWeight: 700 }}>{b.reliability}/10</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Cost</span>
                  <span style={{ color: '#cbd5e1' }}>{b.cost}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Warranty</span>
                  <span style={{ color: '#cbd5e1' }}>{b.warranty}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Noise</span>
                  <span style={{ color: '#cbd5e1' }}>{b.noise}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1e3a5f', paddingTop: 6, marginTop: 4 }}>
                  <span style={{ color: '#64748b' }}>DFW Score</span>
                  <span style={{ color: '#F5E642', fontWeight: 800 }}>{b.dfwRating}/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🎯 Find Your Best DFW Brand</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Tell us your budget and priority to get personalized top 3 picks.</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Budget range (installed)?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {budgets.map((b, i) => (
                <button key={b} onClick={() => { setSelectedBudget(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selectedBudget === i ? '#F5E642' : '#1e3a5f'}`, background: selectedBudget === i ? '#F5E642' : '#0A1628', color: selectedBudget === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{b}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>What matters most to you?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {priorities.map((p, i) => (
                <button key={p} onClick={() => { setSelectedPriority(i); setShowResult(false); }} style={{ padding: '10px 24px', borderRadius: 8, border: `2px solid ${selectedPriority === i ? '#F5E642' : '#1e3a5f'}`, background: selectedPriority === i ? '#F5E642' : '#0A1628', color: selectedPriority === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{p}</button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Show My Top 3 Brands →</button>

          {showResult && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {topThree.map((b, idx) => (
                <div key={b.name} style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${idx === 0 ? '#F5E642' : '#1e3a5f'}` }}>
                  <p style={{ color: '#F5E642', fontWeight: 800, fontSize: 14, marginBottom: 4 }}>#{idx + 1} Pick</p>
                  <p style={{ color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{b.name} {b.badge}</p>
                  <p style={{ color: '#94a3b8', fontSize: 13 }}>DFW Score: <span style={{ color: '#F5E642', fontWeight: 700 }}>{b.dfwRating}/10</span></p>
                  <p style={{ color: '#94a3b8', fontSize: 13 }}>Cost: {b.cost} · Warranty: {b.warranty}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🌞 Why DFW Climate Matters for Brand Choice</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '🔥', label: 'DFW averages 100°F+ for 20+ days/year — choose brands with proven heat durability' },
              { icon: '💧', label: 'High humidity in summer — dehumidification performance matters as much as cooling' },
              { icon: '❄️', label: 'Mild winters — oversized units short-cycle, hurting efficiency and longevity' },
              { icon: '🌪️', label: 'Severe weather risk — look for units with hail guards and surge protection' },
            ].map((tip) => (
              <div key={tip.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{tip.icon}</span>
                <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{tip.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
