import { useState } from 'react';

const IMPROVEMENTS = [
  { name: 'Kitchen Full Remodel', cost: 45000, roi: 78, emoji: '🍳', category: 'Interior' },
  { name: 'Kitchen Minor Update', cost: 18000, roi: 87, emoji: '🍽️', category: 'Interior' },
  { name: 'Master Bath Remodel', cost: 22000, roi: 74, emoji: '🛁', category: 'Interior' },
  { name: 'Second Bath Update', cost: 11000, roi: 69, emoji: '🚿', category: 'Interior' },
  { name: 'New Roof Replacement', cost: 16000, roi: 91, emoji: '🏠', category: 'Exterior' },
  { name: 'HVAC Replacement', cost: 12000, roi: 85, emoji: '❄️', category: 'Systems' },
  { name: 'Garage Door Replace', cost: 3800, roi: 93, emoji: '🚗', category: 'Exterior' },
  { name: 'Vinyl Siding Replace', cost: 18000, roi: 82, emoji: '🧱', category: 'Exterior' },
  { name: 'Hardwood Floors', cost: 12000, roi: 76, emoji: '🪵', category: 'Interior' },
  { name: 'Fresh Interior Paint', cost: 4500, roi: 88, emoji: '🎨', category: 'Interior' },
  { name: 'Landscaping/Curb Appeal', cost: 6500, roi: 80, emoji: '🌿', category: 'Exterior' },
  { name: 'Deck/Patio Addition', cost: 18000, roi: 67, emoji: '🪑', category: 'Exterior' },
  { name: 'Pool Addition', cost: 55000, roi: 48, emoji: '🏊', category: 'Exterior' },
  { name: 'Smart Home Systems', cost: 8000, roi: 58, emoji: '🏡', category: 'Systems' },
  { name: 'Energy Efficient Windows', cost: 14000, roi: 73, emoji: '🪟', category: 'Systems' },
  { name: 'Attic Insulation', cost: 3500, roi: 95, emoji: '🌡️', category: 'Systems' },
  { name: 'Electrical Panel Upgrade', cost: 5000, roi: 81, emoji: '⚡', category: 'Systems' },
  { name: 'New Exterior Paint', cost: 5500, roi: 86, emoji: '🖌️', category: 'Exterior' },
];

export default function DFWHomeImprovementROIRanker() {
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('All');
  const [ranked, setRanked] = useState(null);
  const categories = ['All', 'Interior', 'Exterior', 'Systems'];

  function toggle(name) {
    setSelected(s => s.includes(name) ? s.filter(x => x !== name) : [...s, name]);
  }

  function rank() {
    const items = IMPROVEMENTS.filter(i => selected.includes(i.name));
    setRanked(items.sort((a, b) => b.roi - a.roi));
  }

  const visible = filter === 'All' ? IMPROVEMENTS : IMPROVEMENTS.filter(i => i.category === filter);
  const totalCost = selected.reduce((s, n) => s + (IMPROVEMENTS.find(i => i.name === n)?.cost || 0), 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔨</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#F5E642' }}>DFW Home Improvement ROI Ranker</h1>
          <p style={{ margin: '0.5rem 0 0', color: '#8899bb', fontSize: 14 }}>Select your planned improvements — we rank them by DFW-specific ROI</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', background: filter === c ? '#F5E642' : '#1e2d4a', color: filter === c ? '#0A1628' : '#ccc', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
          {visible.map(item => {
            const isSelected = selected.includes(item.name);
            return (
              <div key={item.name} onClick={() => toggle(item.name)} style={{ background: isSelected ? '#1e3a6e' : '#132035', borderRadius: 10, padding: '0.9rem', cursor: 'pointer', border: isSelected ? '2px solid #F5E642' : '2px solid transparent', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{item.emoji}</div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: 13, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#8899bb' }}>~${item.cost.toLocaleString()} avg cost</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: item.roi >= 85 ? '#4ade80' : item.roi >= 70 ? '#F5E642' : '#f87171' }}>{item.roi}%</div>
                    <div style={{ fontSize: 10, color: '#8899bb' }}>ROI</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div style={{ background: '#132035', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#ccc', fontSize: 14 }}>{selected.length} selected — Total: <strong style={{ color: '#F5E642' }}>${totalCost.toLocaleString()}</strong></span>
            <button onClick={() => setSelected([])} style={{ background: 'none', border: '1px solid #444', color: '#888', fontSize: 12, padding: '4px 10px', borderRadius: 6, cursor: 'pointer' }}>Clear</button>
          </div>
        )}
        <button onClick={rank} disabled={selected.length === 0} style={{ width: '100%', background: selected.length ? '#F5E642' : '#2a3a50', color: selected.length ? '#0A1628' : '#666', padding: '14px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700, cursor: selected.length ? 'pointer' : 'not-allowed', marginBottom: '1rem' }}>
          🏆 Rank My Improvements by ROI
        </button>
        {ranked && (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', color: '#F5E642' }}>🏆 Your Prioritized DFW Improvement Plan</h3>
            {ranked.map((item, i) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
                <div style={{ width: 32, height: 32, background: i === 0 ? '#F5E642' : i === 1 ? '#aaa' : i === 2 ? '#cd7f32' : '#2a3a50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: i < 3 ? '#000' : '#ccc', flexShrink: 0, fontSize: 13 }}>#{i+1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{item.emoji} {item.name}</div>
                  <div style={{ fontSize: 12, color: '#8899bb' }}>~${item.cost.toLocaleString()} cost • ${Math.round(item.cost * item.roi / 100).toLocaleString()} estimated return</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, color: item.roi >= 85 ? '#4ade80' : item.roi >= 70 ? '#F5E642' : '#f87171' }}>{item.roi}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
