import { useState } from 'react';

type KitchenSize = 'small' | 'medium' | 'large';
const sizeOptions: { value: KitchenSize; label: string }[] = [
  { value: 'small', label: 'Small (under 150 sq ft)' },
  { value: 'medium', label: 'Medium (150–300 sq ft)' },
  { value: 'large', label: 'Large (300+ sq ft / open concept)' },
];

const budgets = ['$20,000–$45,000', '$45,000–$80,000', '$80,000–$150,000', 'Over $150,000'];

type Rec = { package: string; includes: string[]; cost: string; note: string };

const recommendations: Record<KitchenSize, Record<string, Rec>> = {
  small: {
    '$20,000–$45,000': { package: 'Modern Refresh', includes: ['Semi-custom white oak shaker cabinets', 'Quartz countertops (Calacatta or Silestone)', 'Matte black hardware', 'Subway tile backsplash in offset pattern', 'Updated lighting fixture'], cost: '$22,000–$40,000', note: 'Focus on cabinet fronts + counters — biggest visual impact per dollar in small kitchens.' },
    '$45,000–$80,000': { package: 'Full Redesign', includes: ['Custom cabinetry + island', 'Statement backsplash (zellige or handmade tile)', 'Mixed metals (gold + matte black)', 'Integrated appliances (panel-ready fridge)', 'Appliance garage'], cost: '$48,000–$75,000', note: 'Add an island if layout allows — DFW buyers heavily prioritize kitchen islands.' },
    '$80,000–$150,000': { package: 'Luxury Compact', includes: ['Full custom millwork', 'Wolf or Thermador range', 'Cambria or natural marble counters', 'Hidden pantry door', 'Under-cabinet lighting throughout'], cost: '$82,000–$130,000', note: 'Premium materials in a compact kitchen photograph beautifully and impress buyers.' },
    'Over $150,000': { package: 'Chef-Level Boutique', includes: ['La Cornue or Wolf Pro range', 'Full custom cabinetry', 'Slab stone backsplash', 'Full panel-ready appliance suite', 'Butler pantry with secondary sink'], cost: '$150,000–$250,000+', note: 'Rare for small kitchen — consider opening wall to expand before this investment.' },
  },
  medium: {
    '$20,000–$45,000': { package: 'Smart Upgrade', includes: ['RTA or semi-custom cabinets', 'Quartz counters', 'LVP or tile floor', 'New fixtures + hardware', 'New lighting plan'], cost: '$25,000–$42,000', note: 'Medium kitchens often just need cabinet + counter refresh to add $30–50K in perceived value.' },
    '$45,000–$80,000': { package: 'Complete Kitchen', includes: ['Custom shaker cabinets (white oak or painted)', 'Large island', 'Quartz or natural stone', 'Statement range (36″ minimum)', 'Mixed metal accents', 'Appliance garage'], cost: '$50,000–$78,000', note: 'This is the sweet spot for medium DFW kitchens — full remodel without major structural changes.' },
    '$80,000–$150,000': { package: 'Signature Kitchen', includes: ['Full custom millwork', 'Hidden pantry + coffee station', 'Wolf or Viking range', 'Panel-ready dishwasher + fridge', 'Unlacquered brass or matte black fixtures', 'Pot filler over range'], cost: '$82,000–$140,000', note: 'Pot fillers are the #1 "show-off" feature in DFW luxury kitchens right now.' },
    'Over $150,000': { package: 'Estate Kitchen', includes: ['La Cornue or Lacanche range', 'Full butler pantry', 'Two islands', 'Integrated refrigeration columns', 'Full custom millwork with glass uppers', 'Smart appliance suite'], cost: '$150,000–$300,000+', note: 'This level is expected in Southlake, Westlake, Highland Park new construction.' },
  },
  large: {
    '$20,000–$45,000': { package: 'Strategic Refresh', includes: ['Cabinet painting or refacing', 'New countertops', 'Updated fixtures and hardware', 'New lighting plan', 'Backsplash upgrade'], cost: '$28,000–$44,000', note: 'Large kitchens are expensive to fully renovate — strategic updates here maximize ROI.' },
    '$45,000–$80,000': { package: 'Open Concept Refresh', includes: ['New cabinets (semi-custom)', 'Quartz counters throughout', 'Large island', 'New appliances (Samsung or LG pro)', 'Open shelving flanking range'], cost: '$50,000–$78,000', note: 'Open concept large kitchens need consistent materials throughout — budget for it.' },
    '$80,000–$150,000': { package: 'Full Custom', includes: ['Custom cabinetry to ceiling', 'Two-tone cabinet color scheme', 'Statement 48″ range', 'Full-height backsplash slab', 'Integrated appliances', 'Hidden pantry behind panel door'], cost: '$85,000–$145,000', note: 'Two-tone cabinets (painted island vs wood uppers) very popular in DFW 2025-2026.' },
    'Over $150,000': { package: 'Magazine Kitchen', includes: ['Full custom millwork', 'Dual-fuel La Cornue range', 'Cambria quartz or marble throughout', 'Two islands + scullery', 'Wine storage column', 'Smart home integration'], cost: '$160,000–$400,000+', note: 'The full magazine spread. Only undertake in homes $1.5M+ where kitchen investment is expected.' },
  },
};

export default function DFWKitchenTrendsGuide() {
  const [size, setSize] = useState<KitchenSize | ''>('');
  const [budget, setBudget] = useState('');
  const [rec, setRec] = useState<Rec | null>(null);

  function getRecommendation() {
    if (!size || !budget) return;
    setRec(recommendations[size]?.[budget] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW Kitchen Trends 2026</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Kitchen Design Trends</h1>
        <p style={{ fontSize: 17, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>Quartz still dominates. Open shelving is declining. Here's what DFW buyers want in 2026 kitchens.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#4ade80′ }}>✅ Trending In (2026)</h2>
            {['White oak shaker cabinets', 'Quartz countertops (still dominant)', 'Mixed metals (gold + matte black)', 'Hidden pantry doors', 'Appliance garages', 'Statement ranges (La Cornue, Wolf)', 'Two-tone cabinet schemes', 'Pot fillers over range'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#cbd5e1', padding: '5px 0', borderBottom: '1px solid #1e3a5f' }}>{item}</div>
            ))}
          </div>
          <div style={{ background: '#0f2847', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#f87171′ }}>❌ Going Out</h2>
            {['Open shelving (dust magnet in DFW)', 'All-white kitchens (too cold)', 'Dark espresso cabinets', 'Granite countertops (being replaced by quartz)', 'Stainless steel accent tile', 'Farmhouse apron sinks as statement piece', 'Matching appliance suites in black', 'Tuscan or Old World style'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#94a3b8', padding: '5px 0', borderBottom: '1px solid #1e3a5f' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>⚠️ Open Shelving Warning for DFW</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>Open shelving peaked in 2019–2022 and is now actively declining in DFW resale appeal. North Texas generates significant dust from wind, construction, and seasonal pollen — open shelves require constant upkeep. If you want the airy look, consider glass-front upper cabinets as an alternative that photographs well without the maintenance burden.</p>
        </div>

        <div style={{ background: '#0f2847', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Get My Kitchen Design Package</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Kitchen Size</label>
              <select value={size} onChange={e => setSize(e.target.value as KitchenSize)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select size...</option>
                {sizeOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Total Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value=''>Select budget...</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Build My Package</button>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 8, padding: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4, color: '#F5E642′ }}>{rec.package}</div>
              <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 16 }}>{rec.cost}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Included Features:</div>
              {rec.includes.map(f => <div key={f} style={{ fontSize: 14, color: '#cbd5e1', padding: '5px 0', display: 'flex', gap: 8 }}><span style={{ color: '#F5E642′ }}>→</span><span>{f}</span></div>)}
              <div style={{ marginTop: 16, fontSize: 14, color: '#94a3b8', lineHeight: 1.6, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>💡 {rec.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
