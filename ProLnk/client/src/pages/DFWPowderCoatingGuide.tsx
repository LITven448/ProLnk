import { useState } from 'react';

const itemTypes = ['Iron fence', 'Iron gate', 'Metal railing (stair/porch)', 'Outdoor patio furniture', 'Metal shutters', 'Custom metalwork'];
const itemSizes = ['Small (under 50 sq ft)', 'Medium (50–150 sq ft)', 'Large (150–400 sq ft)', 'Extra large (400+ sq ft)'];
const conditions = ['Good — surface rust starting', 'Fair — flaking paint, moderate rust', 'Poor — heavy rust, pitting'];

const decisions: Record<string, { verdict: string; reason: string; cost: string; lifespan: string }> = {
  'Small-Good': { verdict: 'Powder Coat', reason: 'Small items are cost-effective to powder coat and the longevity gain in DFW humidity is worth it.', cost: '$150–$350', lifespan: '10–15 years' },
  'Small-Fair': { verdict: 'Powder Coat After Prep', reason: 'Rust must be sandblasted before powder coating — included in most DFW shop quotes.', cost: '$200–$450', lifespan: '10–15 years' },
  'Small-Poor': { verdict: 'Evaluate Replacement', reason: 'Heavy pitting may not hold powder coat well. Get a shop assessment first.', cost: '$250–$500 or replace', lifespan: '8–12 years if coated' },
  'Medium-Good': { verdict: 'Powder Coat', reason: 'Medium iron fences and gates are the sweet spot for powder coating ROI in DFW.', cost: '$400–$900', lifespan: '12–15 years' },
  'Medium-Fair': { verdict: 'Powder Coat', reason: 'Sandblasting + powder coat is still cheaper than replacement and far more durable than repainting.', cost: '$600–$1,100', lifespan: '10–14 years' },
  'Medium-Poor': { verdict: 'Powder Coat or Replace', reason: 'Get a quote from a DFW powder coat shop — if prep cost exceeds 40% of replacement, replace.', cost: '$700–$1,400', lifespan: '8–12 years' },
  'Large-Good': { verdict: 'Powder Coat', reason: 'Large iron fences are DFW\’s most common powder coat job. Economies of scale reduce per-sq-ft cost.', cost: '$900–$2,200', lifespan: '12–15 years' },
  'Large-Fair': { verdict: 'Powder Coat', reason: 'Full sandblast and recoat is standard practice for large fencing in DFW — most shops do this in-house.', cost: '$1,200–$2,800', lifespan: '10–14 years' },
  'Large-Poor': { verdict: 'Replace or Powder Coat Sections', reason: 'Section-by-section replacement + powder coat of good sections is often the best strategy.', cost: '$1,500–$4,000', lifespan: '10–15 years on new sections' },
  'Extra large-Good': { verdict: 'Powder Coat — Batch Quote', reason: 'At this scale, get 3 DFW shop quotes. Batch pricing significantly reduces per-unit cost.', cost: '$2,000–$5,000', lifespan: '12–15 years' },
  'Extra large-Fair': { verdict: 'Powder Coat', reason: 'Large-scale prep + coat is cost-effective vs. annual repainting at $800–$2,000/year.', cost: '$2,500–$6,000', lifespan: '10–14 years' },
  'Extra large-Poor': { verdict: 'Phased Approach', reason: 'Phase replacement with powder coat of new sections. Full project over 2–3 years spreads cost.', cost: '$3,000–$8,000+', lifespan: 'Varies by section' },
};

export default function DFWPowderCoatingGuide() {
  const [itemType, setItemType] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<null | typeof decisions[string]>(null);

  function calculate() {
    if (!itemType || !itemSize || !condition) return;
    const sizeKey = itemSize.split(' (')[0];
    const condKey = condition.split(' —')[0];
    const key = `${sizeKey}-${condKey}`;
    setResult(decisions[key] || decisions['Medium-Good']);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642' }}>🔩 DFW Exterior Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Powder Coating Guide — DFW Iron & Metal</h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: '1.6' }}>DFW humidity and 100°F+ summers destroy standard paint in 2–3 years. Powder coating lasts 10–15 years and costs less long-term.</p>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>☀️ Why DFW Conditions Demand Powder Coating</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Standard Paint Lifespan (DFW)', value: '2–3 years', color: '#EF4444' },
              { label: 'Powder Coat Lifespan (DFW)', value: '10–15 years', color: '#22C55E' },
              { label: 'Repaint Cost Every 3 Years', value: '$600–$2,000', color: '#EF4444' },
              { label: 'Powder Coat (one-time)', value: '$400–$2,200', color: '#22C55E' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '16px' }}>
                <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ color: item.color, fontWeight: '700', fontSize: '18px' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>🏭 How Powder Coating Works</h2>
          <p style={{ color: '#CBD5E1', lineHeight: '1.7', marginBottom: '12px' }}>Metal is sandblasted to bare metal, electrostatically charged, then coated with dry powder. It's baked at 400°F — the powder melts into a uniform, bond-level finish. No runs, no brush marks, no peeling. DFW has 15+ powder coat shops in the Metroplex including facilities in Garland, Grand Prairie, and Fort Worth.</p>
          <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
            <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>⚡ Important: Shops require item delivery</div>
            <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0 }}>Most DFW powder coat shops are not mobile. You'll need to remove and transport your fence sections, railings, or furniture to the shop. Factor in removal/reinstallation labor ($50–$150/hr for a welder/ironworker).</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔮 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <select value={itemType} onChange={e => setItemType(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select item type...</option>
              {itemTypes.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={itemSize} onChange={e => setItemSize(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select item size...</option>
              {itemSizes.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select current condition...</option>
              {conditions.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: '700', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', cursor: 'pointer' }}>Get Powder Coat vs Repaint Decision →</button>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>✅ Recommendation: {result.verdict}</h2>
            <p style={{ color: '#CBD5E1', marginBottom: '16px', lineHeight: '1.7' }}>{result.reason}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '16px' }}>
                <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>Estimated Cost</div>
                <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '18px' }}>{result.cost}</div>
              </div>
              <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '16px' }}>
                <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>Expected Lifespan</div>
                <div style={{ color: '#22C55E', fontWeight: '700', fontSize: '18px' }}>{result.lifespan}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
