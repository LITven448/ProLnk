import { useState } from 'react';

const plants = [
  { name: 'Agave', water: 'Very Low', bloom: 'Once in lifetime', height: '3-8ft', note: 'Dramatic focal point' },
  { name: 'Sotol', water: 'Very Low', bloom: 'Summer spike', height: '4-6ft', note: 'Native to West Texas' },
  { name: 'Yucca', water: 'Very Low', bloom: 'Spring white', height: '3-10ft', note: 'Wildlife habitat' },
  { name: 'Blackfoot Daisy', water: 'Low', bloom: 'Spring-Fall', height: '1-2ft', note: 'Pollinator magnet' },
  { name: 'Flame Acanthus', water: 'Low', bloom: 'Summer-Fall', height: '3-5ft', note: 'Hummingbird favorite' },
  { name: 'Salvia greggii', water: 'Low', bloom: 'Spring-Fall', height: '2-4ft', note: 'Deer resistant' },
];

const restrictionFreqs = ['None (no restrictions)', 'Occasional (1x/year)', 'Frequent (2-3x/year)', 'Severe (4+ times/year)'];
const yardSizes = ['Small (under 2000 sqft)', 'Medium (2000-5000 sqft)', 'Large (5000+ sqft)'];

export default function DFWDroughtTolerantGarden() {
  const [yardSize, setYardSize] = useState('');
  const [restriction, setRestriction] = useState('');
  const [plan, setPlan] = useState<null | { savings: string; plants: string[]; hoaNote: string; timeline: string }>(null);

  function generate() {
    if (!yardSize || !restriction) return;
    const savingsMap: Record<string, string> = {
      'Small (under 2000 sqft)': '8,000-12,000 gallons/year',
      'Medium (2000-5000 sqft)': '18,000-28,000 gallons/year',
      'Large (5000+ sqft)': '35,000-60,000 gallons/year',
    };
    const topPlants = restriction.includes('Severe')
      ? ['Agave', 'Sotol', 'Yucca']
      : ['Blackfoot Daisy', 'Flame Acanthus', 'Salvia greggii'];
    setPlan({
      savings: savingsMap[yardSize] || '15,000 gallons/year',
      plants: topPlants,
      hoaNote: 'Most DFW HOAs now permit native drought-tolerant landscaping - submit a plant list and design sketch for pre-approval.',
      timeline: 'Plant in Sept-Oct for best root establishment before DFW summer heat.',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌵</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#F5E642', margin: '0 0 12px' }}>DFW Drought-Tolerant Garden Guide</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '700px' }}>As DFW faces increasing drought frequency, native drought-tolerant gardens are both practical and strikingly beautiful - saving thousands of gallons while thriving through Texas heat.</p>
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🌱 Texas Natives Built for DFW Drought</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {plants.map(p => (
              <div key={p.name} style={{ background: '#0A1628', borderRadius: '12px', padding: '16px', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '1.05rem', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '8px' }}>💧 {p.water} water | 🌸 {p.bloom}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8′ }}>📏 {p.height} · {p.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🗓️ Transformation Timeline</h2>
          {[['Month 1-2','Remove turf, amend soil with compost and expanded shale'],['Month 3-4','Install hardscape paths and edging; plant anchors (Agave, Yucca)'],['Month 5-6','Add mid-layer shrubs and perennials; install drip irrigation'],['Month 7-12','Fill gaps with annuals; plants establish root systems'],['Year 2+','Minimal irrigation needed; garden self-sustains through drought']].map(([t,d]) => (
            <div key={t} style={{ display: 'flex', gap: '16px', marginBottom: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '8px', padding: '4px 10px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap', minWidth: '90px', textAlign: 'center' }}>{t}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', paddingTop: '4px' }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🔧 Get Your Drought Garden Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Yard Size</label>
              <select value={yardSize} onChange={e => setYardSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select size...</option>
                {yardSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>DFW Water Restriction Frequency</label>
              <select value={restriction} onChange={e => setRestriction(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select frequency...</option>
                {restrictionFreqs.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '10px', padding: '12px 28px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Generate My Drought Garden Plan</button>
          {plan && (
            <div style={{ marginTop: '24px', background: '#0A1628', borderRadius: '12px', padding: '20px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '12px' }}>💧 Estimated Annual Water Savings: {plan.savings}</div>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>🌿 Top Plants for Your Situation: {plan.plants.join(', ')}</div>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>🏘️ {plan.hoaNote}</div>
              <div style={{ color: '#94a3b8′ }}>📅 {plan.timeline}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
