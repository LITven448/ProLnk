import { useState } from 'react';

const trades = [
  { name: '🔧 Plumber', avgTicket: 350 },
  { name: '⚡ Electrician', avgTicket: 420 },
  { name: '❄️ HVAC Tech', avgTicket: 580 },
  { name: '🏠 Roofer', avgTicket: 1800 },
  { name: '🎨 Painter', avgTicket: 280 },
  { name: '🪟 Window Installer', avgTicket: 650 },
  { name: '🔒 Locksmith', avgTicket: 190 },
  { name: '🌿 Landscaper', avgTicket: 310 },
];

export default function ProLnkPricingROICalculator() {
  const [tradeIdx, setTradeIdx] = useState(0);
  const [jobsPerMonth, setJobsPerMonth] = useState(4);
  const [tier, setTier] = useState<'Charter' | 'Founding' | 'L3' | 'L4'>('Charter');

  const tierPrice: Record<string, number> = { Charter: 149, Founding: 199, L3: 249, L4: 299 };
  const tierCommission: Record<string, number> = { Charter: 0.12, Founding: 0.10, L3: 0.08, L4: 0.06 };

  const trade = trades[tradeIdx];
  const monthlyFee = tierPrice[tier];
  const commissionRate = tierCommission[tier];
  const commissionPerJob = trade.avgTicket * commissionRate;
  const monthlyCommission = commissionPerJob * jobsPerMonth;
  const netMonthly = monthlyCommission - monthlyFee;
  const breakEvenJobs = Math.ceil(monthlyFee / commissionPerJob);
  const roi = ((monthlyCommission / monthlyFee) * 100).toFixed(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 8 }}>ROI CALCULATOR</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>Does ProLnk Pay For Itself?</h1>
          <p style={{ color: '#8899aa', marginTop: 8 }}>Spoiler: Usually after your first job.</p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#F5E642' }}>YOUR TRADE</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8 }}>
              {trades.map((t, i) => (
                <button key={i} onClick={() => setTradeIdx(i)} style={{
                  background: tradeIdx === i ? '#F5E642' : '#1a2f4a',
                  color: tradeIdx === i ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '8px 4px', fontSize: 11, cursor: 'pointer', fontWeight: tradeIdx === i ? 700 : 400,
                }}>{t.name}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#F5E642' }}>YOUR TIER</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {(['Charter', 'Founding', 'L3', 'L4'] as const).map(t => (
                <button key={t} onClick={() => setTier(t)} style={{
                  flex: 1, background: tier === t ? '#F5E642' : '#1a2f4a',
                  color: tier === t ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '10px 4px', fontSize: 13, cursor: 'pointer', fontWeight: tier === t ? 700 : 400,
                }}>{t} ${tierPrice[t]}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, color: '#F5E642' }}>JOBS PER MONTH: {jobsPerMonth}</label>
            <input type='range' min={1} max={20} value={jobsPerMonth} onChange={e => setJobsPerMonth(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#F5E642' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Avg ticket', value: `$${trade.avgTicket}` },
            { label: `Commission @ ${(commissionRate * 100).toFixed(0)}%`, value: `$${commissionPerJob.toFixed(0)}/job` },
            { label: 'Monthly earnings', value: `$${monthlyCommission.toFixed(0)}`, highlight: true },
            { label: 'Monthly fee', value: `$${monthlyFee}` },
          ].map((item, i) => (
            <div key={i} style={{ background: item.highlight ? '#1a3a1a' : '#0d1f3c', border: `1px solid ${item.highlight ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: item.highlight ? '#F5E642' : '#fff' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: netMonthly >= 0 ? '#0f2d0f' : '#2d0f0f', border: `2px solid ${netMonthly >= 0 ? '#4caf50' : '#f44336'}`, borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>NET MONTHLY AFTER FEE</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: netMonthly >= 0 ? '#4caf50' : '#f44336' }}>
            {netMonthly >= 0 ? '+' : ''}${netMonthly.toFixed(0)}
          </div>
          <div style={{ marginTop: 12, color: '#aaa', fontSize: 14 }}>
            Break-even: <strong style={{ color: '#F5E642' }}>{breakEvenJobs} job{breakEvenJobs !== 1 ? 's' : ''}</strong> — ROI: <strong style={{ color: '#F5E642' }}>{roi}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
