import { useState } from 'react';

const WISH_ITEMS = [
  { label: 'Pool installation', roi: 35, buyerValue: true, cost: 55000, category: 'Lifestyle' },
  { label: 'Kitchen full remodel', roi: 68, buyerValue: true, cost: 45000, category: 'Kitchen/Bath' },
  { label: 'Master bath remodel', roi: 62, buyerValue: true, cost: 25000, category: 'Kitchen/Bath' },
  { label: 'Additional bathroom', roi: 54, buyerValue: true, cost: 18000, category: 'Kitchen/Bath' },
  { label: 'Open floor plan conversion', roi: 45, buyerValue: true, cost: 30000, category: 'Structural' },
  { label: 'Smart home system', roi: 30, buyerValue: false, cost: 8000, category: 'Tech' },
  { label: 'Home theater room', roi: 20, buyerValue: false, cost: 35000, category: 'Lifestyle' },
  { label: 'Garage conversion to studio', roi: 25, buyerValue: false, cost: 22000, category: 'Structural' },
  { label: 'Curb appeal & landscaping', roi: 72, buyerValue: true, cost: 12000, category: 'Exterior' },
  { label: 'Outdoor kitchen / patio', roi: 40, buyerValue: true, cost: 20000, category: 'Lifestyle' },
  { label: 'Luxury closet system', roi: 28, buyerValue: false, cost: 12000, category: 'Interior' },
  { label: 'Wine cellar / wet bar', roi: 22, buyerValue: false, cost: 18000, category: 'Lifestyle' },
  { label: 'Energy efficiency package', roi: 58, buyerValue: true, cost: 15000, category: 'Systems' },
  { label: 'Additional bedroom (addition)', roi: 50, buyerValue: true, cost: 80000, category: 'Structural' },
  { label: 'Converted attic / bonus room', roi: 44, buyerValue: true, cost: 28000, category: 'Structural' },
  { label: 'Whole-house generator', roi: 35, buyerValue: true, cost: 14000, category: 'Systems' },
];

const MUST_FIX = ['Foundation concerns', 'Roof damage', 'HVAC failure', 'Electrical hazards', 'Plumbing leaks'];

export default function DFWHomeWishListGuide() {
  const [budget, setBudget] = useState(50000);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'roi' | 'cost'>('roi');
  const [showPlan, setShowPlan] = useState(false);

  const toggle = (label: string) =>
    setSelectedItems(prev => prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label]);

  const plan = WISH_ITEMS
    .filter(i => selectedItems.includes(i.label))
    .sort((a, b) => sortBy === 'roi' ? b.roi - a.roi : a.cost - b.cost);

  let running = 0;
  const withAffordability = plan.map(i => {
    running += i.cost;
    return { ...i, cumulativeCost: running, inBudget: running <= budget };
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.75rem 0 0.25rem' }}>✨ Home Wish List Planning Guide</h1>
          <p style={{ color: '#8FA3BF', marginTop: 4 }}>Build a realistic wish list, understand what DFW buyers actually pay for, and allocate your budget wisely.</p>
        </div>

        <div style={{ background: '#0D1F3A', border: '1px solid #EF4444', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem' }}>
          <h2 style={{ color: '#EF4444', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>🚨 Must-Fix Before Wish List</h2>
          <p style={{ fontSize: 13, color: '#8FA3BF', marginBottom: 8 }}>These are non-negotiable and must be funded first. No wish list item beats safety or structure.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {MUST_FIX.map(f => <span key={f} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444', borderRadius: 4, padding: '4px 10px', fontSize: 12 }}>{f}</span>)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { pct: '20%', label: 'Safety & Systems', color: '#EF4444', desc: 'Roof, HVAC, electrical, plumbing' },
            { pct: '30%', label: 'Kitchen & Baths', color: '#F5E642', desc: 'Highest buyer ROI in DFW market' },
            { pct: '50%', label: 'Lifestyle', color: '#22C55E', desc: 'Pool, outdoor living, personal enjoyment' },
          ].map(b => (
            <div key={b.label} style={{ background: '#0D1F3A', border: `1px solid ${b.color}`, borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: b.color }}>{b.pct}</div>
              <div style={{ fontWeight: 700, fontSize: 13, margin: '4px 0′ }}>{b.label}</div>
              <div style={{ fontSize: 12, color: '#8FA3BF' }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D2238', border: '1px solid #F5E642', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>📝 Build My Wish List</h2>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF' }}>
              Total Budget
              <input type="number" value={budget} step={5000}
                onChange={e => setBudget(Number(e.target.value))}
                style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14, width: 160 }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF' }}>
              Sort By
              <select value={sortBy} onChange={e => setSortBy(e.target.value as 'roi' | 'cost')}
                style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="roi">ROI (highest first)</option>
                <option value="cost">Cost (lowest first)</option>
              </select>
            </label>
          </div>

          <p style={{ fontSize: 13, color: '#8FA3BF', marginBottom: 8 }}>Select wish list items:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8, marginBottom: '1rem' }}>
            {WISH_ITEMS.map(i => (
              <button key={i.label} onClick={() => toggle(i.label)}
                style={{ background: selectedItems.includes(i.label) ? '#F5E642′ : ’rgba(255,255,255,0.05)', color: selectedItems.includes(i.label) ? '#0A1628′ : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', fontSize: 12, cursor: ’pointer', textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>{i.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>${i.cost.toLocaleString()} · {i.roi}% ROI {i.buyerValue ? '⭐' : ''}</div>
              </button>
            ))}
          </div>

          <button onClick={() => setShowPlan(true)} disabled={selectedItems.length === 0}
            style={{ background: selectedItems.length > 0 ? '#F5E642′ : '#1E3A5F', color: selectedItems.length > 0 ? '#0A1628' : '#8FA3BF', border: ’none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed' }}>
            Rank My Wish List →
          </button>

          {showPlan && withAffordability.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              {withAffordability.map((item, idx) => (
                <div key={item.label} style={{ background: item.inBudget ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)', border: `1px solid ${item.inBudget ? '#22C55E' : '#EF4444'}`, borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>{idx + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#8FA3BF' }}>{item.category} · {item.roi}% ROI · {item.buyerValue ? '⭐ Buyers pay for this' : '👤 Personal enjoyment'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700 }}>${item.cost.toLocaleString()}</div>
                      <div style={{ fontSize: 11, color: item.inBudget ? '#22C55E' : '#EF4444′ }}>{item.inBudget ? '✓ In budget' : '✗ Over budget'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
