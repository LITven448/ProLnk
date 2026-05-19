import { useState } from 'react';

export default function DFWPoolDeckingGuide2026() {
  const [prio, setPrio] = useState('');
  const [budget, setBudget] = useState('');

  const priorities = [
    { id: 'cool', label: '🌡️ Stay Cool Underfoot' },
    { id: 'durable', label: '🏗️ Durability & Longevity' },
    { id: 'looks', label: '✨ Premium Appearance' },
    { id: 'budget', label: '💵 Best Value' },
  ];

  const budgets = [
    { id: 'low', label: '💵 Under $8,000' },
    { id: 'mid', label: '💵💵 $8,000-20,000' },
    { id: 'high', label: '💰 $20,000+' },
  ];

  const recs: Record<string, Record<string, { name: string; temp: string; life: string; desc: string; cost: string }>> = {
    cool: {
      low: { name: 'Kool Deck Coating', temp: '30-40°F cooler', life: '10-15 yrs', desc: 'Applied over existing concrete. Most economical way to reduce DFW pool deck temperature. Cementitious coating available in multiple colors. Popular in DFW since the 1970s for good reason.', cost: '$3,000-6,000' },
      mid: { name: 'Travertine Pavers', temp: 'Naturally cool', life: '30+ yrs', desc: 'Natural stone stays 20-30°F cooler than concrete under DFW sun. Tumbled travertine most popular — non-slip, beautiful. Requires polymer sand joints for DFW clay movement.', cost: '$12,000-20,000' },
      high: { name: 'Travertine + Cool Deck Combo', temp: 'Coolest possible', life: '30+ yrs', desc: 'Full travertine with shaded pergola areas. DFW luxury pool standard. Pairs with misting system for ultimate cool-deck experience June-September.', cost: '$20,000-35,000' },
    },
    durable: {
      low: { name: 'Brushed Concrete + Sealant', temp: 'Hot in sun', life: '20-30 yrs', desc: 'Standard DFW pool deck material. Brush finish for slip resistance. Annual sealant application prevents DFW UV damage and staining. Most cost-effective durable option.', cost: '$5,000-9,000' },
      mid: { name: 'Concrete Pavers', temp: 'Moderately hot', life: '25-40 yrs', desc: 'Individual pavers flex with DFW clay — fewer cracks than poured concrete. Replaceable if one cracks. DFW: use polymeric sand joints to prevent ant and weed issues.', cost: '$12,000-18,000' },
      high: { name: 'Travertine on Concrete Base', temp: 'Cool', life: '40+ yrs', desc: 'Travertine over concrete base. Most durable DFW pool deck. Lifetime investment. Sealing every 3-5 years maintains appearance. Used in all DFW luxury builds.', cost: '$20,000-35,000' },
    },
    looks: {
      low: { name: 'Stamped Concrete', temp: 'Hot in sun', life: '15-20 yrs', desc: 'Stamped to mimic flagstone, travertine, or brick. Much cheaper than real stone. DFW stamped concrete needs re-sealing every 2-3 years. Fades over time but looks great initially.', cost: '$6,000-10,000' },
      mid: { name: 'Concrete Pavers (Designer)', temp: 'Moderate', life: '25-40 yrs', desc: 'Belgard, Techo-Bloc premium pavers in slate, travertine-look, or modern finishes. DFW pool contractors love these for mid-budget renovations. Many colors and patterns available.', cost: '$14,000-22,000' },
      high: { name: 'Natural Travertine + Coping Match', temp: 'Cool', life: '40+ yrs', desc: 'Full natural travertine deck matching travertine coping. Cohesive luxury look. DFW signature upscale pool design. Pairs with Pebble Fina plaster and color-changing LED for resort feel.', cost: '$25,000-45,000' },
    },
    budget: {
      low: { name: 'Resurface Existing Concrete', temp: 'Hot — add Kool Deck', life: '10-15 yrs', desc: 'Spray Kool Deck or Sundek over existing concrete. By far the cheapest DFW option. If existing deck is structurally sound, resurface avoids $15K+ in demo and pour costs.', cost: '$3,000-6,000' },
      mid: { name: 'Brushed Concrete (New Pour)', temp: 'Hot — sealant helps', life: '20-30 yrs', desc: 'New poured concrete with brushed finish and Kool Deck coating. Best value for new decks. DFW standard and proven. Add expansion joints every 8-10 feet for clay movement.', cost: '$8,000-14,000' },
      high: { name: 'Concrete Pavers', temp: 'Moderate', life: '25-40 yrs', desc: 'At this budget, concrete pavers offer best durability-to-cost. Individual paver replacement avoids full resurfacing costs. DFW clay: use 1 inch bedding sand + polymeric jointing sand.', cost: '$12,000-18,000' },
    },
  };

  const rec = prio && budget ? recs[prio]?.[budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW POOL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌿 DFW Pool Decking Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>DFW concrete pool decks reach 130-160°F in summer. DFW clay soil causes deck cracking. Kool Deck coating reduces surface temp 30-40°F. Travertine is naturally cool. Choose your priority and budget for a recommendation.</p>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>Priority</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 24 }}>
          {priorities.map(p => (
            <button key={p.id} onClick={() => setPrio(p.id)} style={{ background: prio === p.id ? '#F5E642' : '#1e2d45', color: prio === p.id ? '#0A1628' : '#fff', border: '2px solid' + (prio === p.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>{p.label}</button>
          ))}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>Budget</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {budgets.map(b => (
            <button key={b.id} onClick={() => setBudget(b.id)} style={{ background: budget === b.id ? '#F5E642' : '#1e2d45', color: budget === b.id ? '#0A1628' : '#fff', border: '2px solid' + (budget === b.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{b.label}</button>
          ))}
        </div>
        {rec && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED FOR DFW</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>✅ {rec.name}</h3>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ background: '#0A1628', borderRadius: 6, padding: '4px 12px', fontSize: 13, color: '#F5E642', fontWeight: 600 }}>🌡️ {rec.temp}</span>
              <span style={{ background: '#0A1628', borderRadius: 6, padding: '4px 12px', fontSize: 13, color: '#F5E642', fontWeight: 600 }}>⏱️ {rec.life}</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>{rec.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 16px', display: 'inline-block', color: '#F5E642', fontWeight: 700, fontSize: 15 }}>💰 {rec.cost}</div>
          </div>
        )}
        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk © 2026 — Connecting DFW Homeowners with Pool Pros</div>
      </div>
    </div>
  );
}
