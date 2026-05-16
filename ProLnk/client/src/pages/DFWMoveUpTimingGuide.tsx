import { useState } from 'react';

const strategies = [
  {
    key: 'sellFirst',
    label: 'Sell First, Then Buy',
    emoji: '🏠➡️🔑',
    pros: ['Know exact equity available', 'No double mortgage risk', 'Stronger offer — no sale contingency', 'DFW market: sellers prefer non-contingent offers'],
    cons: ['May need temporary housing (avg 30-60 days in DFW)', 'Moving twice (storage, hotel, or family)', 'Time pressure to find next home'],
    dfwTip: 'With DFW inventory rising in 2026, this is the safest strategy. Short-term rental options are plentiful in DFW metro.',
    timeline: '60-90 days total process',
    bestFor: 'Equity-rich sellers, flexible timeline, risk-averse buyers',
  },
  {
    key: 'buyFirst',
    label: 'Buy First, Then Sell',
    emoji: '🔑➡️🏠',
    pros: ['Move directly — no temporary housing', 'Take time to find perfect next home', 'No time pressure on current sale'],
    cons: ['Carry two mortgages simultaneously', 'Need reserves or bridge loan', 'Current home sale is uncertain'],
    dfwTip: 'Requires strong credit and reserves. DFW lenders will count both payments against DTI. Jumbo bridge loans available from local credit unions.',
    timeline: '60-90 days, overlapping ownership period',
    bestFor: 'Strong financial position, high equity, dual income households',
  },
  {
    key: 'simultaneous',
    label: 'Simultaneous Close',
    emoji: '🔄',
    pros: ['One move — sell and buy same day', 'No temporary housing', 'Equity flows directly to new purchase'],
    cons: ['Complex coordination between two transactions', 'If one falls through, both can collapse', 'Requires experienced DFW title company'],
    dfwTip: 'Common in DFW. Use a single title company for both transactions (Chicago Title, Attorneys Title). Coordinate closing times same day.',
    timeline: '45-60 days with perfect coordination',
    bestFor: 'Experienced buyers, strong agent coordination, flexible sellers on both sides',
  },
  {
    key: 'bridge',
    label: 'Bridge Loan Strategy',
    emoji: '🌉',
    pros: ['Buy before selling using equity', 'No contingency — competitive offer', 'Typically 6-12 month term'],
    cons: ['Higher interest rate on bridge (8-10%)', 'Fees and closing costs on bridge loan', 'Must sell within term or extend'],
    dfwTip: 'Available from Prosperity Bank, Frost Bank, and local DFW credit unions. Works well in DFW where homes sell quickly (avg 28 days on market).',
    timeline: 'Buy immediately, sell within 3-6 months',
    bestFor: 'High equity homeowners, confident their home sells fast, need to act on specific property',
  },
];

export default function DFWMoveUpTimingGuide() {
  const [equity, setEquity] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [timeline, setTimeline] = useState('');
  const [showResults, setShowResults] = useState(false);

  const equityNum = parseInt(equity.replace(/[^0-9]/g, '')) || 0;
  const targetNum = parseInt(targetPrice.replace(/[^0-9]/g, '')) || 0;

  const getRecommendation = () => {
    if (equityNum >= 150000 && timeline === 'flexible') return 'sellFirst';
    if (equityNum >= 200000 && timeline === 'urgent') return 'bridge';
    if (timeline === 'exact') return 'simultaneous';
    if (equityNum < 100000) return 'sellFirst';
    return 'sellFirst';
  };

  const rec = showResults ? getRecommendation() : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏡⬆️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Move-Up Timing Guide 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 15 }}>Sell first vs buy first vs simultaneous close — which is right for your DFW move-up?</p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#FEF9C3', border: '2px solid #F5E642', borderRadius: 10, padding: 18, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, margin: '0 0 6px' }}>📊 DFW Market Conditions 2026</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, fontSize: 13 }}>
            <div>⏱ <strong>Avg days on market:</strong> 28 days</div>
            <div>📈 <strong>Appreciation YTD:</strong> 3.2%</div>
            <div>🏘 <strong>Inventory:</strong> 2.8 months supply</div>
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Compare Your Options</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {strategies.map(s => (
            <div key={s.key} style={{ background: rec === s.key ? '#0A1628' : '#fff', color: rec === s.key ? '#fff' : '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${rec === s.key ? '#F5E642' : '#E2E8F0'}` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>{s.label} {rec === s.key && '⭐ RECOMMENDED'}</h3>
              <div style={{ fontSize: 12, marginBottom: 8 }}>
                <strong style={{ color: rec === s.key ? '#86EFAC' : '#16A34A' }}>✅ Pros:</strong>
                {s.pros.map((p, i) => <div key={i} style={{ paddingLeft: 12 }}>• {p}</div>)}
              </div>
              <div style={{ fontSize: 12, marginBottom: 8 }}>
                <strong style={{ color: rec === s.key ? '#FCA5A5' : '#DC2626' }}>❌ Cons:</strong>
                {s.cons.map((c, i) => <div key={i} style={{ paddingLeft: 12 }}>• {c}</div>)}
              </div>
              <div style={{ background: rec === s.key ? 'rgba(245,230,66,0.15)' : '#FEF9C3', borderRadius: 6, padding: 8, fontSize: 12 }}>
                <strong>🤠 DFW Tip:</strong> {s.dfwTip}
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: rec === s.key ? '#CBD5E1' : '#64748B' }}>⏱ {s.timeline} • 🎯 {s.bestFor}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Get Your DFW Move-Up Strategy</h2>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Estimated Home Equity</label>
              <input value={equity} onChange={e => setEquity(e.target.value)} placeholder="e.g. $150,000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Target Home Price</label>
              <input value={targetPrice} onChange={e => setTargetPrice(e.target.value)} placeholder="e.g. $550,000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Timeline Flexibility</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#F9FAFB' }}>
                <option value="">Select...</option>
                <option value="flexible">Flexible (3-6 months)</option>
                <option value="exact">Need exact date</option>
                <option value="urgent">Urgent (found the home)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ width: '100%', padding: '14px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get My DFW Move-Up Strategy →</button>
          {rec && (
            <div style={{ marginTop: 16, background: '#DCFCE7', border: '2px solid #16A34A', borderRadius: 10, padding: 16 }}>
              <p style={{ margin: 0, fontWeight: 700 }}>✅ Recommended: {strategies.find(s => s.key === rec)?.label}</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#166534' }}>{strategies.find(s => s.key === rec)?.dfwTip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
