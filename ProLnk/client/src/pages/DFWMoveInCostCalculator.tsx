import { useState } from 'react';

export default function DFWMoveInCostCalculator() {
  const [homePrice, setHomePrice] = useState('');
  const [condition, setCondition] = useState('good');
  const [moveType, setMoveType] = useState('local');
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState<null | { items: { label: string; low: number; high: number }[]; total: { low: number; high: number } }>(null);

  function calculate() {
    const price = parseFloat(homePrice) || 0;
    const sf = parseFloat(sqft) || 2000;
    const cond = condition;
    const move = moveType;

    const movingCost = move === 'diy' ? [350, 700] : move === 'local' ? [1800, 3500] : [4500, 9000];
    const storage = move === 'longdistance' ? [400, 800] : [0, 0];
    const immediateRepairs = cond === 'excellent' ? [500, 1500] : cond === 'good' ? [1500, 4000] : cond === 'fair' ? [5000, 15000] : [12000, 30000];
    const appliances = cond === 'excellent' ? [0, 500] : cond === 'good' ? [500, 2000] : [2000, 6000];
    const windowTreatments = [Math.round(sf * 0.5), Math.round(sf * 1.2)];
    const landscaping = cond === 'excellent' ? [300, 800] : [800, 3000];
    const pestControl = [250, 450];
    const hvacTuneup = [150, 250];
    const lockRekey = [150, 350];
    const paint = cond === 'excellent' ? [0, 0] : cond === 'good' ? [500, 2000] : [2000, 6000];
    const cleaning = [200, 500];
    const misc = [500, 1500];

    const items = [
      { label: '🚛 Moving costs', low: movingCost[0], high: movingCost[1] },
      { label: '📦 Storage (if needed)', low: storage[0], high: storage[1] },
      { label: '🔧 Immediate repairs', low: immediateRepairs[0], high: immediateRepairs[1] },
      { label: '🍳 Appliances not included', low: appliances[0], high: appliances[1] },
      { label: '🪟 Window treatments', low: windowTreatments[0], high: windowTreatments[1] },
      { label: '🌿 Initial landscaping', low: landscaping[0], high: landscaping[1] },
      { label: '🐛 Year 1 pest control (DFW)', low: pestControl[0], high: pestControl[1] },
      { label: '❄️ HVAC tune-up', low: hvacTuneup[0], high: hvacTuneup[1] },
      { label: '🔑 Lock re-key', low: lockRekey[0], high: lockRekey[1] },
      { label: '🖌️ Paint / touch-up', low: paint[0], high: paint[1] },
      { label: '🧹 Deep cleaning', low: cleaning[0], high: cleaning[1] },
      { label: '📋 Miscellaneous', low: misc[0], high: misc[1] },
    ].filter(item => item.high > 0);

    const total = items.reduce((acc, item) => ({ low: acc.low + item.low, high: acc.high + item.high }), { low: 0, high: 0 });
    setResult({ items, total });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32 }}>🚛🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Move-In Cost Calculator</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Beyond down payment and closing — what most buyers forget to budget.</p>
        </div>

        <div style={{ background: '#FEF9EC', borderRadius: 10, padding: 14, marginBottom: 20, borderLeft: '4px solid #F59E0B', fontSize: 13, color: '#92400E' }}>
          ⚠️ Most DFW buyers budget for down payment and closing costs — then get hit with <strong>$8,000–$25,000+</strong> in move-in expenses they didn't see coming.
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Home purchase price ($)
              <input type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 425000" />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Home size (sq ft)
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 2400" />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Home condition (as-purchased)
              <select value={condition} onChange={e => setCondition(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }}>
                <option value="excellent">Excellent — move-in ready, updated</option>
                <option value="good">Good — minor cosmetic updates needed</option>
                <option value="fair">Fair — several repairs or updates needed</option>
                <option value="fixer">Fixer-upper — significant work required</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Move type
              <select value={moveType} onChange={e => setMoveType(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }}>
                <option value="diy">DIY — rent a truck</option>
                <option value="local">Local professional movers (DFW area)</option>
                <option value="longdistance">Long-distance professional movers</option>
              </select>
            </label>
          </div>
          <button onClick={calculate}
            style={{ marginTop: 22, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Calculate My Move-In Costs →
          </button>
        </div>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 17, marginBottom: 16 }}>📊 Your DFW Move-In Cost Estimate</h2>
            {result.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #F1F5F9', fontSize: 14 }}>
                <span>{item.label}</span>
                <span style={{ fontWeight: 600, color: '#475569' }}>
                  {item.low === item.high ? `$${item.low.toLocaleString()}` : `$${item.low.toLocaleString()} – $${item.high.toLocaleString()}`}
                </span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, padding: '14px 0', borderTop: '2.5px solid #0A1628', fontWeight: 800 }}>
              <span style={{ fontSize: 16 }}>Total Move-In Budget</span>
              <span style={{ fontSize: 18, color: '#0A1628' }}>${result.total.low.toLocaleString()} – ${result.total.high.toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 16, padding: 14, background: '#EFF6FF', borderRadius: 8, fontSize: 13, color: '#1E40AF' }}>
              💡 Keep this cash liquid — don't use it for closing. Request seller concessions or negotiate closing cost credits to preserve your move-in budget.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
