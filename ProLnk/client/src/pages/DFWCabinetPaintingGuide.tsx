import { useState } from 'react';

const KITCHEN_SIZES: Record<string, { label: string; linearFt: number }> = {
  small: { label: 'Small (< 150 sqft)', linearFt: 20 },
  medium: { label: 'Medium (150-250 sqft)', linearFt: 30 },
  large: { label: 'Large (250+ sqft)', linearFt: 45 },
  galley: { label: 'Galley / One-Wall', linearFt: 16 },
};

const CONDITIONS: Record<string, { label: string; paintSuitable: boolean; refaceBonus: number }> = {
  excellent: { label: 'Excellent (solid, no damage)', paintSuitable: true, refaceBonus: 0 },
  good: { label: 'Good (minor wear, all hinges work)', paintSuitable: true, refaceBonus: 0 },
  fair: { label: 'Fair (some damage, sticky doors)', paintSuitable: true, refaceBonus: 200 },
  poor: { label: 'Poor (warped, broken, delaminating)', paintSuitable: false, refaceBonus: 500 },
};

const BUDGET_OPTIONS: Record<string, { label: string; perLinFt: number; approach: string }> = {
  paint: { label: '🎨 Professional Paint', perLinFt: 85, approach: 'paint' },
  reface: { label: '🪵 Cabinet Refacing', perLinFt: 280, approach: 'reface' },
  reface_premium: { label: '✨ Premium Refacing', perLinFt: 450, approach: 'reface' },
  replace: { label: '🔨 Full Replacement', perLinFt: 850, approach: 'replace' },
};

export default function DFWCabinetPaintingGuide() {
  const [kitchenSize, setKitchenSize] = useState('medium');
  const [condition, setCondition] = useState('good');
  const [budgetOption, setBudgetOption] = useState('paint');

  const kitchen = KITCHEN_SIZES[kitchenSize];
  const conditionData = CONDITIONS[condition];
  const budget = BUDGET_OPTIONS[budgetOption];
  const totalCost = kitchen.linearFt * budget.perLinFt + (budget.approach === 'paint' ? conditionData.refaceBonus * 0 : conditionData.refaceBonus);
  const daysNeeded = budget.approach === 'paint' ? 4 : budget.approach === 'reface' ? 5 : 14;
  const canPaint = conditionData.paintSuitable;

  const comparison = [
    { label: '🎨 Paint', cost: kitchen.linearFt * 85, time: '3-5 days', lifespan: '5-8 yrs', best: 'Good bones, tight budget' },
    { label: '🪵 Reface', cost: kitchen.linearFt * 280, time: '3-5 days', lifespan: '10-15 yrs', best: 'Layout works, want new look' },
    { label: '🔨 Replace', cost: kitchen.linearFt * 850, time: '2-3 weeks', lifespan: '20-30 yrs', best: 'Layout change or major damage' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>
            🍳 DFW CABINET PAINTING
          </span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
          Cabinet Painting Guide for DFW Homeowners
        </h1>
        <p style={{ color: '#8A9BBE', fontSize: 16, marginBottom: 40 }}>
          Cabinet painting transformed DFW kitchens for $1,500-$5,000 vs $15,000+ for replacement. But humidity, paint selection, and prep make or break the result.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '💧', title: 'DFW Humidity & Cabinet Paint', body: 'North Texas kitchens see steam, grease, and 60-80% summer humidity. This destroys latex paint on cabinets within 2 years. The correct system: oil-based primer (Zinsser BIN or Cover Stain) + waterborne alkyd topcoat (Benjamin Moore Advance or Sherwin ProClassic). This combination handles DFW conditions for 5-8 years.' },
            { icon: '🔄', title: 'Paint vs Reface vs Replace', body: 'Paint wins if cabinet boxes are solid and you like the layout — best ROI. Refacing (new doors + veneer) wins if boxes are good but doors are dated — looks 90% of replacement at 35% of cost. Full replacement only makes sense when changing kitchen layout or boxes are failing.' },
            { icon: '⏱️', title: 'Professional Timeline', body: 'Day 1: Remove all doors, drawer fronts, hardware. Clean degreaser. Fill holes. Sand. Prime. Day 2-3: Two coats of topcoat with light sanding between. Day 4: Reinstall hardware, doors, adjust hinges. Day 5: Touch-ups and final inspection. Rush jobs skip steps and look terrible.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 16, padding: 32, border: '1px solid #1E2D4A', marginBottom: 40 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Cabinet Approach Recommender</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Kitchen Size</label>
              <select value={kitchenSize} onChange={e => setKitchenSize(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(KITCHEN_SIZES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <div style={{ color: '#4A5B7A', fontSize: 12, marginTop: 4 }}>~{kitchen.linearFt} linear feet of cabinets</div>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Cabinet Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(CONDITIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Budget / Approach</label>
              <select value={budgetOption} onChange={e => setBudgetOption(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(BUDGET_OPTIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          {!canPaint && budget.approach === 'paint' && (
            <div style={{ backgroundColor: '#2D1010', border: '1px solid #991B1B', borderRadius: 8, padding: 14, marginBottom: 20 }}>
              <span style={{ color: '#F87171', fontWeight: 700 }}>⚠️ Warning: </span>
              <span style={{ color: '#8A9BBE', fontSize: 14 }}>Cabinet condition is too poor for painting. Warped or delaminating boxes won't hold paint. Consider refacing or replacement.</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { label: 'Cabinet Linear Ft', value: `${kitchen.linearFt} lf`, sub: kitchen.label },
              { label: 'Cost Estimate', value: `$${totalCost.toLocaleString()}`, sub: budget.label, highlight: true },
              { label: 'Project Timeline', value: `${daysNeeded} days`, sub: 'professional crew' },
              { label: 'Cost Per Lin Ft', value: `$${budget.perLinFt}`, sub: 'includes labor + materials' },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: stat.highlight ? '#F5E642′ : '#0A1628', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#8A9BBE', fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#FFFFFF', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: stat.highlight ? '#0A162880′ : '#4A5B7A', fontSize: 11 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A', marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📊 Cost Comparison: Paint vs Reface vs Replace</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {comparison.map(opt => (
              <div key={opt.label} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{opt.label}</div>
                <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, marginBottom: 4 }}>${opt.cost.toLocaleString()}</div>
                <div style={{ color: '#8A9BBE', fontSize: 12, lineHeight: 1.7 }}>
                  <div>⏱ {opt.time}</div>
                  <div>📅 Lasts {opt.lifespan}</div>
                  <div>✅ Best if: {opt.best}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🚫 Common DFW Cabinet Painting Mistakes</h3>
          <ul style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 2, paddingLeft: 18 }}>
            <li>Using wall paint on cabinets — fails within 6 months in DFW humidity</li>
            <li>Skipping degreasing — grease prevents adhesion, causes peeling at handles</li>
            <li>Not removing doors to paint — brush marks guaranteed on vertical surfaces</li>
            <li>One coat only — cabinets need 2 coats minimum with light sanding between</li>
            <li>Reinstalling doors before paint fully cures (72 hrs) — sticking and damage</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
