import { useState } from 'react';

const woodTypes = ['Pine', 'Cedar', 'Redwood', 'Composite', 'Pressure-Treated'];
const stainTypes = ['Oil-Based', 'Water-Based'];

export default function DFWWoodDeckMaintenanceGuide() {
  const [sqft, setSqft] = useState('');
  const [wood, setWood] = useState('');
  const [lastTreated, setLastTreated] = useState('');
  const [result, setResult] = useState<null | { schedule: string; product: string; cost: string }>(null);

  function calculate() {
    const area = parseInt(sqft) || 200;
    const yearsAgo = parseInt(lastTreated) || 2;
    const isDFWHarsh = yearsAgo >= 2;
    const isNatural = wood === 'Pine' || wood === 'Cedar' || wood === 'Redwood';

    const schedule = isDFWHarsh
      ? 'Restain every 2 years (DFW UV accelerates fade vs 4+ yrs in northern climates)'
      : 'Restain within 12 months — overdue for DFW conditions';

    const product = isNatural
      ? 'Oil-based semi-transparent stain recommended — superior UV penetration for DFW pine/cedar'
      : 'Water-based solid stain for composite/PT lumber — avoid oil-based on treated wood';

    const laborRate = 2.5;
    const materialRate = 0.65;
    const totalCost = Math.round(area * (laborRate + materialRate));
    const cost = `$${totalCost}–$${Math.round(totalCost * 1.3)} (cleaning + prep + 2 coats stain for ${area} sq ft)`;

    setResult({ schedule, product, cost });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          🏡 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Wood Deck Maintenance Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>
          DFW-specific guidance — where summer UV and 110°F heat destroy deck stain in 2 years, not 4.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 36 }}>
          {[
            { icon: '☀️', title: 'DFW UV Destroys Stain 2x Faster', body: 'North Texas UV index regularly hits 10–11 from May–September. Oil-based penetrating stains outlast water-based in DFW by 40%. Expect 18–24 months before reapplication, not the 4-year cycle common in northern climates.' },
            { icon: '🧹', title: 'Clean Before You Stain — Always', body: 'DFW clay soil and pollen coat decks year-round. Apply deck cleaner (oxalic acid-based) before any staining. Rinse completely, let dry 48–72 hrs. Staining dirty wood traps dirt under finish and causes peeling within months.' },
            { icon: '💧', title: 'Pressure Washing PSI Limits', body: 'DFW pine is soft. Limit pressure washing to 1,200–1,500 PSI max with a 40-degree tip. Higher PSI fuzzes the grain and splits boards. Use a fan tip, never a zero-degree tip on wood. Keep nozzle 12+ inches from surface.' },
            { icon: '🛢️', title: 'Oil-Based vs Water-Based for DFW', body: 'Oil-based stains penetrate grain and resist DFW UV better. Water-based are lower VOC and dry faster but need reapplication every 1–2 years. For natural wood decks in DFW, oil-based semi-transparent is the professional choice.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Deck Treatment Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Deck Square Footage</label>
              <input value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 320″ style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Wood Type</label>
              <select value={wood} onChange={e => setWood(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                <option value="">Select wood type</option>
                {woodTypes.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Years Since Last Treatment</label>
              <input value={lastTreated} onChange={e => setLastTreated(e.target.value)} placeholder="e.g. 2″ style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }} />
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Treatment Schedule + Cost
          </button>
          {result && (
            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {[{ label: '📅 Schedule', value: result.schedule }, { label: '🛢️ Product', value: result.product }, { label: '💰 Estimated Cost', value: result.cost }].map(r => (
                <div key={r.label} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 14, color: '#E2E8F0′ }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
