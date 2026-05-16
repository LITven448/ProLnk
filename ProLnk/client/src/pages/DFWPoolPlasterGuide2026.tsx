import { useState } from 'react';

export default function DFWPoolPlasterGuide2026() {
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');

  const budgets = [
    { id: 'low', label: '💵 Under $5,000' },
    { id: 'mid', label: '💵💵 $5,000-10,000' },
    { id: 'high', label: '💰 $10,000+' },
  ];

  const priorities = [
    { id: 'longevity', label: '🏗️ Longest Life' },
    { id: 'looks', label: '✨ Best Appearance' },
    { id: 'value', label: '🎯 Best Value' },
  ];

  const recs: Record<string, Record<string, { name: string; life: string; desc: string; cost: string }>> = {
    low: {
      longevity: { name: 'White Quartz', life: '15-20 yrs', desc: 'White quartz aggregate over standard plaster. Significantly more durable than white plaster in DFW hard water. Resists staining from high calcium content water.', cost: '$4,500-6,000' },
      looks: { name: 'Standard White Plaster', life: '7-10 yrs', desc: 'Classic look, lowest entry point. DFW hard water stains standard plaster — critical to maintain chemistry. Budget $150/yr for acid washes.', cost: '$3,500-5,000' },
      value: { name: 'Standard White Plaster', life: '7-10 yrs', desc: 'Best cost-per-year value at the low end. Replaster every 8-10 years. For DFW: keep pH 7.4-7.6, alkalinity 80-120 ppm, calcium hardness 200-400 ppm.', cost: '$3,500-5,000' },
    },
    mid: {
      longevity: { name: 'Pebble Tec (Quartz)', life: '20-25 yrs', desc: 'Most popular DFW replaster. Quartz aggregate bonds tightly, resists DFW mineral staining. Blue Quartz and Midnight Blue most popular colors in 2024-2026.', cost: '$6,000-9,000' },
      looks: { name: 'Pebble Sheen', life: '20+ yrs', desc: 'Smooth pebble finish — beautiful in DFW sunlight. Slightly rougher underfoot than quartz. Caribbean Blue and Tahoe Blue are DFW bestsellers.', cost: '$7,000-10,000' },
      value: { name: 'Pebble Tec (Quartz)', life: '20-25 yrs', desc: 'At 20+ years vs 8-10 for white plaster, quartz is the clear winner on cost-per-year. DFW pool owners upgrading from white plaster report zero regrets.', cost: '$6,000-9,000' },
    },
    high: {
      longevity: { name: 'Pebble Fina', life: '25-30 yrs', desc: 'Ultra-fine pebble finish — smooth, durable, premium. DFW luxury pool standard. 30-year warranty with proper chemistry. Best stain resistance in hard DFW water.', cost: '$10,000-15,000' },
      looks: { name: 'Pebble Fina Shimmer', life: '25+ yrs', desc: 'Glass bead infused pebble finish. Shimmers in DFW sunlight. Top choice for resort-style DFW pools. Stunning nighttime appearance with LED lighting.', cost: '$12,000-18,000' },
      value: { name: 'Pebble Tec Premium', life: '25+ yrs', desc: 'Best value at high end — all colors available, proven 25-year life. DFW pools with proper chemistry and Pebble Tec rarely need early replaster.', cost: '$9,000-13,000' },
    },
  };

  const key = budget && priority ? recs[budget]?.[priority] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW POOL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Pool Plaster Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW hard water (200-400 ppm calcium hardness) is the #1 enemy of pool plaster. Standard white plaster lasts 7-10 years. Quartz aggregate (Pebble Tec) lasts 20+ years. Color matters — lighter finishes show DFW mineral staining more.
        </p>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>Budget</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {budgets.map(b => (
            <button key={b.id} onClick={() => setBudget(b.id)} style={{ background: budget === b.id ? '#F5E642' : '#1e2d45', color: budget === b.id ? '#0A1628' : '#fff', border: '2px solid' + (budget === b.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{b.label}</button>
          ))}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>Priority</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {priorities.map(p => (
            <button key={p.id} onClick={() => setPriority(p.id)} style={{ background: priority === p.id ? '#F5E642' : '#1e2d45', color: priority === p.id ? '#0A1628' : '#fff', border: '2px solid' + (priority === p.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{p.label}</button>
          ))}
        </div>
        {key && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED FOR YOUR GOALS</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>✅ {key.name}</h3>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 10 }}>⏱️ Expected life in DFW: {key.life}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>{key.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 16px', display: 'inline-block', color: '#F5E642', fontWeight: 700, fontSize: 15 }}>💰 {key.cost}</div>
          </div>
        )}
        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk © 2026 — Connecting DFW Homeowners with Pool Pros</div>
      </div>
    </div>
  );
}
