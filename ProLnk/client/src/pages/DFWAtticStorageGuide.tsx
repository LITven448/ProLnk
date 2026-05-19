import { useState } from 'react';

const unsafeItems = [
  { item: 'Clothing & fabrics', reason: '150°F+ temps cause fiber breakdown, mold, pest damage within one season' },
  { item: 'Electronics', reason: 'Heat degrades capacitors and batteries; can cause fire risk in extreme heat' },
  { item: 'Photographs & documents', reason: 'Irreversible yellowing, warping, and ink fade at sustained high temps' },
  { item: 'Candles & wax items', reason: 'Will melt and can ignite in extreme heat — serious fire hazard' },
  { item: 'Wine & spirits', reason: 'Alcohol expands, corks fail, liquid ruins surrounding items' },
  { item: 'Paint & chemicals', reason: 'Flammable; fumes build up in unventilated attic — fire and health risk' },
  { item: 'Musical instruments', reason: 'Wood warps and glue joints fail in heat and humidity swings' },
  { item: 'Medications', reason: 'Heat degrades active ingredients; renders medication ineffective or dangerous' },
];

const safeItems = [
  'Plastic holiday decorations (non-wax)',
  'Metal tools and hardware',
  'Fiberglass insulation rolls (temporarily)',
  'Empty luggage and hard cases',
  'Sturdy plastic bins (contents must also be heat-safe)',
  'Seasonal sports equipment (non-electronic)',
];

const improvements = [
  { name: 'Attic Flooring (OSB panels)', cost: '800–2,500', benefit: 'Makes attic walkable, prevents stepping through drywall' },
  { name: 'Pull-Down Stair Upgrade', cost: '200–600', benefit: 'Safe access — replace old folding ladders' },
  { name: 'Attic Lighting (LED)', cost: '150–400', benefit: 'Essential for safety and visibility' },
  { name: 'Radiant Barrier Insulation', cost: '1,500–3,500', benefit: 'Reduces attic temp by 20–30°F in DFW summer' },
  { name: 'Powered Attic Ventilator', cost: '300–800', benefit: 'Exhausts hot air, reduces temp and moisture' },
  { name: 'Mini-Split in Attic', cost: '3,000–6,000', benefit: 'Full climate control — enables storage of any items' },
];

export default function DFWAtticStorageGuide() {
  const [sqft, setSqft] = useState('');
  const [itemTypes, setItemTypes] = useState<string[]>([]);
  const [result, setResult] = useState<{ safe: boolean; message: string; recs: string[] } | null>(null);

  const itemOptions = ['Clothing', 'Electronics', 'Photos/documents', 'Holiday decor', 'Tools/hardware', 'Luggage', 'Furniture', 'Books'];

  function toggleItem(item: string) {
    setItemTypes(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  }

  function assess() {
    const unsafePicks = ['Clothing', 'Electronics', 'Photos/documents', 'Furniture', 'Books'];
    const hasUnsafe = itemTypes.some(i => unsafePicks.includes(i));
    const recs = [];

    if (parseFloat(sqft) > 0) recs.push(`With ${sqft} sq ft of floored attic space, install pull-down stairs + LED lighting first`);
    if (hasUnsafe) recs.push('Consider a radiant barrier + powered ventilator ($1,800–4,300) to make more items viable');
    recs.push('Use sealed, labeled plastic bins for anything stored — moisture can spike to 80%+ in DFW attic summer storms');
    if (parseFloat(sqft) >= 200) recs.push('Large attic: consider mini-split installation to unlock full climate-controlled storage potential');

    setResult({
      safe: !hasUnsafe,
      message: hasUnsafe
        ? '⚠️ Some selected items are NOT safe for DFW attic storage without climate control'
        : '✅ Your selected items are generally safe for properly ventilated DFW attic storage',
      recs,
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME ORGANIZATION</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Attic Storage Guide — Dallas-Fort Worth 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32, maxWidth: 680 }}>DFW attics reach 150–160°F in summer. Most homeowners don't realize they’re destroying valuable belongings. This guide tells you exactly what’s safe — and what’s not.</p>

        <div style={{ background: '#1a0000', border: '2px solid #7f1d1d', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ color: '#f87171', fontWeight: 800, fontSize: 17, marginBottom: 4 }}>🌡️ DFW ATTIC TEMPERATURE WARNING</div>
          <div style={{ color: '#fca5a5', fontSize: 14 }}>June–September peak: 150–160°F interior attic temperature. Items left in DFW attics without climate control can be permanently destroyed within one summer season.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ background: '#0f2040', border: '1px solid #7f1d1d', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 12, fontSize: 15 }}>🚫 DO NOT Store in DFW Attic</div>
            {unsafeItems.map(u => (
              <div key={u.item} style={{ marginBottom: 10 }}>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{u.item}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{u.reason}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0f2040', border: '1px solid #14532d', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 12, fontSize: 15 }}>✅ Generally Safe for DFW Attic</div>
            {safeItems.map(s => <div key={s} style={{ color: '#94a3b8', fontSize: 13, padding: '5px 0', borderBottom: '1px solid #0f2040′ }}>{s}</div>)}
            <div style={{ marginTop: 16, color: '#22c55e', fontSize: 12 }}>Always use sealed bins. Check annually for pest activity and moisture damage.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
          {improvements.map(i => (
            <div key={i.name} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 18 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{i.name}</div>
              <div style={{ color: '#22c55e', fontSize: 13, marginBottom: 6 }}>${i.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{i.benefit}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Attic Storage Safety Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Attic floored sq footage</label>
            <input value={sqft} onChange={e => setSqft(e.target.value)} type="number" placeholder="e.g. 150″ style={{ width: 200, background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>What do you want to store? (select all)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {itemOptions.map(o => (
                <button key={o} onClick={() => toggleItem(o)} style={{ background: itemTypes.includes(o) ? '#F5E642′ : '#0A1628', color: itemTypes.includes(o) ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: ’pointer' }}>{o}</button>
              ))}
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Assess Safety →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: `1px solid ${result.safe ? '#22c55e' : '#f87171'}` }}>
              <div style={{ color: result.safe ? '#22c55e' : '#f87171', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{result.message}</div>
              {result.recs.map((r, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>• {r}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
