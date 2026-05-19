import { useState } from 'react';

const homeStyles = ['Ranch / Single-story', 'Two-story Traditional', 'Colonial / Georgian', 'Modern / Contemporary', 'Craftsman', 'Mediterranean'];
const hoaStatuses = ['No HOA', 'HOA with landscaping rules', 'HOA with strict approval process'];
const budgets = ['Under $1,000', '$1,000–$3,000', '$3,000–$8,000', '$8,000–$20,000', '$20,000+'];

type ImprovementPlan = { priority: string; item: string; cost: string; valueImpact: string }[];

function getPlan(hoaStatus: string, budget: string): ImprovementPlan {
  const baseItems: ImprovementPlan = [
    { priority: '1', item: '🌿 Lawn health — fertilize, overseed, treat bare spots', cost: '$200–$600', valueImpact: '+1–2% value' },
    { priority: '2', item: '🚪 Front door repaint + new hardware', cost: '$150–$400', valueImpact: '+0.5–1% value' },
    { priority: '3', item: '🌸 Seasonal color plantings (beds near entry)', cost: '$300–$800', valueImpact: '+0.5% value' },
    { priority: '4', item: '🪨 Driveway pressure wash + seal coat', cost: '$200–$500', valueImpact: '+0.3% value' },
    { priority: '5', item: '💡 Exterior lighting (porch + path lights)', cost: '$400–$1,200', valueImpact: '+0.5–1% value' },
    { priority: '6', item: '🌳 Tree trimming — frame the home, not block it', cost: '$300–$1,000', valueImpact: '+0.5% value' },
    { priority: '7', item: '🎨 Exterior paint / stain refresh', cost: '$2,500–$6,000', valueImpact: '+2–4% value' },
    { priority: '8', item: '🧱 Driveway replacement or resurfacing', cost: '$3,000–$15,000', valueImpact: '+1–3% value' },
  ];
  if (hoaStatus !== 'No HOA') {
    return baseItems.map(i => ({ ...i, item: i.priority <= '4′ ? i.item + ' (HOA-safe)' : i.item }));
  }
  return baseItems;
}

const dfwSeasonalNotes = [
  { season: '🌱 Spring (Mar–May)', note: 'Best time to plant annuals and refresh beds. St. Augustine and Bermuda lawns green up — fertilize in late March.' },
  { season: '☀️ Summer (Jun–Aug)', note: 'Lawn stress is real at 105°F. Don\’t overseed in summer. Focus on irrigation, mulching beds to retain moisture.' },
  { season: '🍂 Fall (Sep–Nov)', note: 'Prime planting season for trees and shrubs. Overseed with ryegrass for winter color if HOA permits.' },
  { season: '❄️ Winter (Dec–Feb)', note: 'Bermuda and St. Augustine go dormant and turn brown. This is normal — plan for it visually with evergreen shrubs and hardscape.' },
];

export default function DFWFrontYardGuide() {
  const [homeStyle, setHomeStyle] = useState('');
  const [hoaStatus, setHoaStatus] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { plan: ImprovementPlan; valueNote: string }>(null);

  function calculate() {
    if (!homeStyle || !hoaStatus || !budget) return;
    const plan = getPlan(hoaStatus, budget);
    const budgetIndex = ['Under $1,000', '$1,000–$3,000', '$3,000–$8,000', '$8,000–$20,000', '$20,000+'].indexOf(budget);
    const filteredPlan = plan.slice(0, Math.min(4 + budgetIndex, plan.length));
    const valueNote = budgetIndex <= 1
      ? 'At this budget, focus on items 1–3 — highest ROI per dollar spent. DFW buyers notice lawn and front door first.'
      : budgetIndex <= 3
      ? 'At this range, completing items 1–6 achieves strong curb appeal ROI. Expect 3–6% value increase on a well-executed project.'
      : 'Full curb appeal transformation is achievable. Prioritize permanent improvements (paint, driveway, landscaping) over seasonal plants.';
    setResult({ plan: filteredPlan, valueNote });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642′ }}>🏡 DFW Exterior Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Front Yard Curb Appeal Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: '1.6′ }}>DFW buyers form their impression in 8 seconds from the curb. Here’s what actually moves the needle — and what to skip.</p>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>👁️ What DFW Buyers Notice First</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              { rank: '1', item: 'Lawn condition', note: 'Dead patches or overgrowth signals deferred maintenance — buyers discount accordingly' },
              { rank: '2', item: 'Front door', note: 'Color, condition, and hardware are the focal point of every listing photo' },
              { rank: '3', item: 'Driveway condition', note: 'Cracks and stains read as age — a clean or fresh driveway reads as \’well-maintained\’' },
              { rank: '4', item: 'Exterior paint / color', note: 'Faded or chipped paint is the #1 objection in DFW buyer feedback on listing tours' },
              { rank: '5', item: 'Landscaping / beds', note: 'Mulched, defined beds signal pride of ownership even with minimal plants' },
            ].map(item => (
              <div key={item.rank} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>{item.rank}</div>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: '600', marginBottom: '4px' }}>{item.item}</div>
                  <div style={{ color: '#94A3B8', fontSize: '13px' }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>📅 DFW Seasonal Lawn Reality</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {dfwSeasonalNotes.map(s => (
              <div key={s.season} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
                <div style={{ color: '#F5E642', fontWeight: '600', marginBottom: '4px' }}>{s.season}</div>
                <p style={{ color: '#CBD5E1', fontSize: '13px', margin: 0 }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔮 Get Your Priority Improvement List</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <select value={homeStyle} onChange={e => setHomeStyle(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your home style...</option>
              {homeStyles.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={hoaStatus} onChange={e => setHoaStatus(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select HOA status...</option>
              {hoaStatuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your budget...</option>
              {budgets.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: '700', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', cursor: 'pointer' }}>Get My Curb Appeal Priority List →</button>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>✅ Your Curb Appeal Plan</h2>
            <p style={{ color: '#CBD5E1', marginBottom: '16px' }}>{result.valueNote}</p>
            <div style={{ display: 'grid', gap: '10px' }}>
              {result.plan.map(item => (
                <div key={item.priority} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#FFFFFF', fontWeight: '600', marginBottom: '4px' }}>#{item.priority} {item.item}</div>
                    <div style={{ color: '#22C55E', fontSize: '13px' }}>Expected value impact: {item.valueImpact}</div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: '700', whiteSpace: 'nowrap' }}>{item.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
