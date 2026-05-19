import { useState } from 'react';

const HEAT_TIPS = [
  { item: '🫒 Cooking Oils', tip: 'DFW summer heat accelerates rancidity. Keep oils away from stovetop wall. Olive oil: 3mo once opened. Store in pantry below 70°F.' },
  { item: '🌶️ Spices', tip: 'Tex-Mex staples (cumin, chili powder, paprika) lose potency fast in heat. Store in cool drawer or cabinet — never above stove.' },
  { item: '🧄 Garlic & Onions', tip: 'DFW humidity causes sprouting. Use mesh bags with airflow. Countertop max 1 week in summer.' },
  { item: '🍫 Chocolate', tip: 'Melts and blooms above 78°F. Refrigerate May–October — DFW homes often swing in temp near AC vents.' },
];

const BULK_TIPS = [
  { store: 'Costco', categories: ['Paper goods', 'Canned goods', 'Condiments', 'Cleaning supplies'], tip: 'Allocate 2 pantry shelves just for Costco hauls. Rotate stock by date.' },
  { store: "Sam's Club", categories: ['Beverages', 'Frozen protein', 'Snack multipacks', 'Baking supplies'], tip: 'Sam\’s Club DFW locations peak on weekends. Shop Tuesday for selection.' },
];

const SYSTEMS: Record<string, { name: string; items: string[]; cost: string; spice: string; bulk: string }> = {
  small: { name: 'Small Kitchen Maximizer', items: ['Over-door pantry organizer (48 slots)', 'Pull-out cabinet organizers x3', 'Lazy Susan for corner cabinet', 'Magnetic spice strips on fridge side', 'Under-sink tension rods for cleaners'], cost: '$150–$400', spice: 'Magnetic tins on fridge side — saves 2 full drawers of space.', bulk: 'Designate top shelf for Costco overstock. Pull to front as you use.' },
  medium: { name: 'Mid-Size Pantry System', items: ['Adjustable wire shelving (5 shelves)', 'Clear stackable bins with labels', 'Can organizer racks (FIFO rotation)', 'Spice drawer insert (30 slots)', 'Snack basket zone for kids'], cost: '$300–$700', spice: 'Spice drawer insert at counter height. Alphabetize or group by cuisine type.', bulk: 'Dedicate bottom shelf to bulk items. Decant cereals/pasta into airtight canisters.' },
  large: { name: 'Walk-In Pantry Organization', items: ['Floor-to-ceiling adjustable shelving', 'Zone labels (baking, canned, snacks, beverages)', 'Pull-out drawers for produce', 'Chest freezer area for bulk protein', 'Beverage refrigerator for drinks'], cost: '$800–$2,500', spice: 'Full spice wall — alphabetical on 3 rows. Group Tex-Mex spices together.', bulk: 'Dedicated Costco/Sam\’s zone — 2 shelves minimum. Date sticker on everything.' },
};

const COOKING_STYLES = [
  { style: 'Tex-Mex heavy', essentials: ['Masa harina', 'Various chiles', 'Cumin/oregano', 'Lard or shortening', 'Dried beans x5 varieties'] },
  { style: 'BBQ/grill focus', essentials: ['Rubs and seasonings', 'Wood chips (store cool)', 'Sauce variety', 'Brisket injection', 'Butcher paper rolls'] },
  { style: 'Quick weeknight', essentials: ['Jarred sauces', 'Pasta variety', 'Canned tomatoes', 'Stock boxes', 'Meal kit staples'] },
];

const SIZES = ['Small kitchen (under 150 sqft)', 'Medium (150–250 sqft)', 'Large with walk-in pantry'];
const STYLES = ['small', 'medium', 'large'];
const ISSUES = ['Not enough shelf space', 'Bulk items take over', 'Spices are a mess', 'Food expires before use', 'No system at all'];

export default function DFWKitchenPantryOrganization() {
  const [kitchenSize, setKitchenSize] = useState('');
  const [issue, setIssue] = useState('');
  const [systemKey, setSystemKey] = useState('');
  const [result, setResult] = useState<null | typeof SYSTEMS[string]>(null);

  function calculate() {
    if (!kitchenSize || !issue) return;
    const key = STYLES[SIZES.indexOf(kitchenSize)] || 'medium';
    setSystemKey(key);
    setResult(SYSTEMS[key]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🍳</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: '16px 0 8px' }}>DFW Kitchen & Pantry Organization</h1>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>Beat bulk buying chaos, heat spoilage & Tex-Mex spice overflow</p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🌡️ DFW Heat & Food Storage</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {HEAT_TIPS.map(h => (
            <div key={h.item} style={{ background: '#fff', borderRadius: 10, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 28 }}>{h.item.split(' ')[0]}</div>
              <div><div style={{ fontWeight: 700, marginBottom: 4 }}>{h.item.split(' ').slice(1).join(' ')}</div><div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{h.tip}</div></div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>📦 Bulk Buying Strategy</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {BULK_TIPS.map(b => (
            <div key={b.store} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{b.store}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {b.categories.map(c => <span key={c} style={{ background: '#F1F5F9', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>{c}</span>)}
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{b.tip}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🌮 Tex-Mex Kitchen Essentials</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {COOKING_STYLES.map(c => (
            <div key={c.style} style={{ background: '#fff', borderRadius: 10, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{c.style}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{c.essentials.map(e => <span key={e} style={{ background: '#fef3c7', borderRadius: 12, padding: '3px 10px', fontSize: 12 }}>{e}</span>)}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎯 Get My Kitchen System</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            {[['Kitchen Size', SIZES, kitchenSize, setKitchenSize], ['Biggest Storage Issue', ISSUES, issue, setIssue]].map(([label, opts, val, set]) => (
              <div key={label as string}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>{label as string}</label>
                <select value={val as string} onChange={e => (set as Function)(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                  <option value="">Select...</option>
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My System</button>
          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#F9FAFB', borderRadius: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{result.name}</div>
              <div style={{ color: '#16a34a', fontWeight: 600, marginBottom: 14 }}>{result.cost}</div>
              {result.items.map(i => <div key={i} style={{ padding: '5px 0', color: '#475569′ }}>✓ {i}</div>)}
              <div style={{ marginTop: 12, padding: 12, background: '#fef3c7', borderRadius: 8, fontSize: 13 }}>🌶️ Spice Tip: {result.spice}</div>
              <div style={{ marginTop: 8, padding: 12, background: '#F5E642', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#0A1628′ }}>📦 Bulk: {result.bulk}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
