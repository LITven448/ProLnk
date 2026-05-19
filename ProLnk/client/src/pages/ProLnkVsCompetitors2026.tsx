import { useState } from 'react';

const tradeJobValues: Record<string, number> = {
  Plumber: 950, Electrician: 1100, HVAC: 1300, Roofer: 4500, Painter: 800, Handyman: 450,
};

export default function ProLnkVsCompetitors2026() {
  const [trade, setTrade] = useState('HVAC');
  const [monthlyJobs, setMonthlyJobs] = useState(8);
  const jobValue = tradeJobValues[trade] || 1000;
  const prolnkFee = 149;
  const annualRevenue = jobValue * monthlyJobs * 12;
  const prolnkNet = annualRevenue - prolnkFee * 12;
  const angiCost = monthlyJobs * 85 * 12;
  const thumbCost = monthlyJobs * 55 * 12;
  const directCost = monthlyJobs * 120 * 12;

  const platforms = [
    { name: 'ProLnk', cost: prolnkFee * 12, net: prolnkNet, note: '$149/mo flat + network income', bg: '#F5E642', fg: '#0A1628′ },
    { name: 'Angi / HomeAdvisor', cost: angiCost, net: annualRevenue - angiCost, note: '$85/lead avg, no exclusivity', bg: '#111d2e', fg: '#fff' },
    { name: 'Thumbtack', cost: thumbCost, net: annualRevenue - thumbCost, note: '$55/lead avg, shared leads', bg: '#111d2e', fg: '#fff' },
    { name: 'Direct Marketing', cost: directCost, net: annualRevenue - directCost, note: '$120/lead avg estimate', bg: '#111d2e', fg: '#fff' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontWeight: 700, marginBottom: 16 }}>
          2026 COMPARISON
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>ProLnk vs Competitors</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>
          The lead generation market is broken. Compare what you actually keep.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Trade</label>
            <select value={trade} onChange={e => setTrade(e.target.value)}
              style={{ background: '#111d2e', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              {Object.keys(tradeJobValues).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Jobs per month: {monthlyJobs}</label>
            <input type="range" min={2} max={20} value={monthlyJobs} onChange={e => setMonthlyJobs(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642', marginTop: 14 }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 32 }}>
          {platforms.map(p => (
            <div key={p.name} style={{ background: p.bg, borderRadius: 12, padding: 22 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: p.fg, marginBottom: 6 }}>{p.name}</div>
              <div style={{ color: p.fg, opacity: 0.7, fontSize: 12, marginBottom: 14 }}>{p.note}</div>
              <div style={{ color: p.fg, opacity: 0.8, fontSize: 13 }}>Annual spend</div>
              <div style={{ fontWeight: 700, fontSize: 22, color: p.fg }}>${p.cost.toLocaleString()}</div>
              <div style={{ color: p.fg, opacity: 0.8, fontSize: 13, marginTop: 8 }}>Net after lead costs</div>
              <div style={{ fontWeight: 800, fontSize: 26, color: p.net > 0 ? (p.name === 'ProLnk' ? '#0A1628′ : '#4ade80') : '#ef4444' }}>
                ${p.net.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d2e', borderRadius: 10, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642′ }}>ProLnk Only: Network Income</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>
            No other platform pays you to grow the network. Charter members earn 7% job overrides + 12% subscription overrides on every pro they recruit — for life. Angi, Thumbtack, and direct marketing give you zero for referrals.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {[
            { label: 'Exclusive leads', prolnk: true, angi: false, thumb: false },
            { label: 'Network income', prolnk: true, angi: false, thumb: false },
            { label: 'Flat fee model', prolnk: true, angi: false, thumb: false },
            { label: 'Rate locked forever', prolnk: true, angi: false, thumb: false },
          ].map(f => (
            <div key={f.label} style={{ background: '#111d2e', borderRadius: 8, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>{f.label}</div>
              <div style={{ fontSize: 22 }}>{f.prolnk ? 'Y' : 'N'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}