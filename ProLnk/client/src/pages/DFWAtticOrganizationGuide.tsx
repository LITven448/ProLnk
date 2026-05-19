import { useState } from 'react';

const NO_STORE = [
  { item: 'Photos & Documents', reason: 'Heat warps photos, yellows paper. Humidity from DFW storms causes mold.' },
  { item: 'Electronics', reason: 'Capacitors degrade above 95°F. One DFW summer = permanent damage.' },
  { item: 'Artwork & Canvas', reason: 'Oil paint cracks in extreme heat cycles. Canvas warps and delaminates.' },
  { item: 'Wine & Spirits', reason: 'Flavor destroyed above 70°F consistently. DFW attics hit 150°F.' },
  { item: 'Medications', reason: 'Efficacy degrades rapidly. Heat-sensitive compounds break down.' },
  { item: 'Musical Instruments', reason: 'Wood cracks and glue joints fail. String tension causes warping.' },
];

const OK_STORE = [
  { item: '🎄 Holiday Decorations', tip: 'Use sealed bins — DFW attics get mouse activity Oct–Nov' },
  { item: '👗 Seasonal Clothing', tip: 'Vacuum-sealed bags + airtight containers. Label by season.' },
  { item: '🧸 Kids\’ Toys (plastic)', tip: 'Avoid vinyl — it off-gasses and degrades. Hard plastic OK.' },
  { item: '🏕️ Camping Gear', tip: 'Sleeping bags, tents — heat-tolerant. Check seams annually.' },
  { item: '📦 Moving Boxes (empty)', tip: 'Flat-stack. Reuse for next DFW move — averages every 5 years.' },
  { item: '🏈 Sports Equipment', tip: 'Balls, pads, helmets — durable. Avoid leather gloves.' },
];

const SHELVING: Record<string, { name: string; cost: string; pros: string; cons: string }> = {
  small: { name: 'Wire Grid Shelving', cost: '$200–$500', pros: 'Airflow prevents mold, easy assembly, affordable', cons: 'Items fall through gaps — use bins' },
  medium: { name: 'Plywood Platform System', cost: '$400–$900', pros: 'Solid surface, custom fit, high weight capacity', cons: 'Requires carpentry skills, permanent' },
  large: { name: 'Attic Truss Storage System', cost: '$800–$2,000', pros: 'Professional install, maximizes truss space, clean look', cons: 'Professional install recommended' },
};

const SQ_FTGS = ['Under 200 sqft', '200–400 sqft', '400–600 sqft', '600+ sqft'];
const GOALS = ['Holiday storage only', 'Seasonal wardrobe', 'General overflow storage', 'Maximize every inch'];

export default function DFWAtticOrganizationGuide() {
  const [sqft, setSqft] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<null | { shelving: typeof SHELVING[string]; climate: string; items: string[] }>(null);

  function calculate() {
    if (!sqft || !goal) return;
    const idx = SQ_FTGS.indexOf(sqft);
    const key = idx <= 0 ? 'small' : idx === 1 ? 'medium' : 'large';
    const goalItems: Record<string, string[]> = {
      'Holiday storage only': ['Sealed plastic bins x8', 'Label maker', 'Shelving unit x1'],
      'Seasonal wardrobe': ['Vacuum bags x20', 'Cedar blocks for moths', 'Rolling garment rack'],
      'General overflow storage': ['Heavy-duty shelving x3', 'Airtight bins x20', 'Floor walkboard system'],
      'Maximize every inch': ['Full truss system', 'Pull-down stairs upgrade', 'LED lighting', 'Dehumidifier'],
    };
    const climate = idx >= 2 ? 'Install attic fan ($300–$600) + radiant barrier ($0.15/sqft). Drop temps 20–40°F.'
      : 'Passive ventilation adequate. Ensure ridge and soffit vents are clear of insulation.';
    setResult({ shelving: SHELVING[key], climate, items: goalItems[goal] });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: '16px 0 8px' }}>DFW Attic Organization Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>Store smart in North Texas heat — not everything survives up there</p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>❌ Never Store in a DFW Attic</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 40 }}>
          {NO_STORE.map(n => (
            <div key={n.item} style={{ background: '#fff', borderRadius: 10, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: 6 }}>✗ {n.item}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{n.reason}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>✅ Safe to Store in DFW Attic</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 40 }}>
          {OK_STORE.map(o => (
            <div key={o.item} style={{ background: '#fff', borderRadius: 10, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ fontWeight: 700, color: '#16a34a', marginBottom: 6 }}>{o.item}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{o.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎯 Get Your Attic System</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            {[['Attic Square Footage', SQ_FTGS, sqft, setSqft], ['Storage Goal', GOALS, goal, setGoal]].map(([label, opts, val, set]) => (
              <div key={label as string}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>{label as string}</label>
                <select value={val as string} onChange={e => (set as Function)(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                  <option value="">Select...</option>
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate My Attic Plan</button>

          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#F9FAFB', borderRadius: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{result.shelving.name}</div>
              <div style={{ color: '#16a34a', fontWeight: 600, marginBottom: 12 }}>{result.shelving.cost}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#dcfce7', borderRadius: 8, padding: 12, fontSize: 13 }}><strong>Pros:</strong> {result.shelving.pros}</div>
                <div style={{ background: '#fee2e2', borderRadius: 8, padding: 12, fontSize: 13 }}><strong>Cons:</strong> {result.shelving.cons}</div>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Shopping List:</div>
              {result.items.map(i => <div key={i} style={{ padding: '4px 0', color: '#475569′ }}>• {i}</div>)}
              <div style={{ marginTop: 16, padding: 14, background: '#F5E642', borderRadius: 8, fontSize: 14, color: '#0A1628', fontWeight: 600 }}>🌡️ Climate: {result.climate}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
