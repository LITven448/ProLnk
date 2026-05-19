import { useState } from 'react';

const cards = [
  { name: 'Wells Fargo Reflect', apy: '0% for 21 months then 17.24%', reward: 'No rewards', bestFor: 'Longest 0% window, large project', type: '0% APR' },
  { name: 'Citi Custom Cash', apy: '0% for 15 months then 18.24%', reward: '5% back on top category', bestFor: 'Contractor spend as top category', type: 'Cash Back' },
  { name: 'Chase Freedom Unlimited', apy: '0% for 15 months then 19.74%', reward: '1.5% on everything', bestFor: 'Simple flat-rate rewards on supplies', type: 'Cash Back' },
  { name: 'Home Depot Card', apy: '0% for 6–24 months (deferred!)', reward: 'Special financing only', bestFor: 'Only if paying in full — deferred interest trap', type: 'Store Card' },
  { name: 'Lowe\’s Advantage', apy: '0% for 6 months or 5% discount', reward: '5% off or financing', bestFor: 'Smaller purchases, pay in full', type: 'Store Card' },
];

function calcResults(cost: number, months: number, score: number, timeline: number) {
  const eligible0 = score >= 690;
  const zeroAprEnd = eligible0 ? Math.min(21, timeline) : 0;
  const rewards = cost * 0.015;
  const loanRate = score >= 740 ? 0.12 : score >= 690 ? 0.15 : 0.19;
  const loanR = loanRate / 12;
  const loanMonthly = (cost * loanR * Math.pow(1 + loanR, months)) / (Math.pow(1 + loanR, months) - 1);
  const loanTotal = loanMonthly * months;
  const cardTotal = eligible0 && timeline <= zeroAprEnd ? cost : cost * (1 + (loanRate * (months - zeroAprEnd) / 12));
  return { eligible0, zeroAprEnd, rewards, loanMonthly, loanTotal, cardTotal };
}

export default function DFWHomeImprovementCreditCards() {
  const [cost, setCost] = useState(15000);
  const [months, setMonths] = useState(60);
  const [score, setScore] = useState(730);
  const [timeline, setTimeline] = useState(12);

  const res = calcResults(cost, months, score, timeline);
  const cardWins = res.cardTotal < res.loanTotal;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>💳 Home Improvement Credit Cards</div>
          <div style={{ color: '#CBD5E1', marginTop: 6 }}>DFW Homeowner Strategy Guide — 0% APR, Rewards & Risk</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '1.25rem', border: '1px solid #BFDBFE' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>✅ When Credit Cards Work</div>
            {['Project under $20K', 'You can pay off in 0% window', 'Strong credit score (690+)', 'Want rewards on contractor spend', 'Short timeline, need funds now'].map(i => <div key={i} style={{ fontSize: 13, marginBottom: 3 }}>• {i}</div>)}
          </div>
          <div style={{ background: '#FEF2F2', borderRadius: 10, padding: '1.25rem', border: '1px solid #FECACA' }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: '#991B1B' }}>❌ When Cards Are Risky</div>
            {['Project over $25K', 'Can\’t repay in 0% period', 'APR kicks in at 20–30%', 'Store cards with deferred interest', 'Carrying balance long-term'].map(i => <div key={i} style={{ fontSize: 13, marginBottom: 3, color: '#7F1D1D' }}>• {i}</div>)}
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>🃏 Top Cards for DFW Home Improvement</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {cards.map(c => (
              <div key={c.name} style={{ background: '#fff', borderRadius: 8, padding: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name} <span style={{ background: '#F5E642', borderRadius: 4, padding: '1px 6px', fontSize: 11, fontWeight: 600, color: '#0A1628' }}>{c.type}</span></div>
                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{c.apy}</div>
                    <div style={{ fontSize: 13, color: '#16A34A', marginTop: 2 }}>🎁 {c.reward}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', maxWidth: 200, textAlign: 'right' }}>{c.bestFor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>🔢 Strategy Calculator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Project Cost ($)', value: cost, set: setCost, min: 1000, max: 100000, step: 500 },
              { label: 'Credit Score', value: score, set: setScore, min: 580, max: 850, step: 10 },
              { label: 'Months to Pay Off Project', value: timeline, set: setTimeline, min: 3, max: 24, step: 1 },
              { label: 'Alt Loan Term (months)', value: months, set: setMonths, min: 12, max: 84, step: 12 },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.label}: <span style={{ color: '#6366F1' }}>{f.value.toLocaleString()}</span></div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value} onChange={e => f.set(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.5rem', color: '#fff' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#F5E642' }}>📊 Your Results</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>💳 Credit Card Strategy</div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>0% eligible: <span style={{ color: res.eligible0 ? '#4ADE80' : '#F87171', fontWeight: 700 }}>{res.eligible0 ? 'Yes' : 'No (score too low)'}</span></div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>0% window: <span style={{ color: '#F5E642', fontWeight: 700 }}>{res.zeroAprEnd} months</span></div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>Rewards earned: <span style={{ color: '#F5E642', fontWeight: 700 }}>${res.rewards.toFixed(0)}</span></div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>Total cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>${res.cardTotal.toFixed(0)}</span></div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>🏦 Personal Loan Alternative</div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>Monthly payment: <span style={{ color: '#F5E642', fontWeight: 700 }}>${res.loanMonthly.toFixed(0)}</span></div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>Total cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>${res.loanTotal.toFixed(0)}</span></div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>Predictable fixed payments</div>
            </div>
          </div>
          <div style={{ background: cardWins ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
            <span style={{ color: cardWins ? '#4ADE80' : '#F87171', fontWeight: 700 }}>
              {cardWins ? `✅ Credit card strategy saves $${(res.loanTotal - res.cardTotal).toFixed(0)} — pay off within ${timeline} months` : `⚠️ Personal loan wins by $${(res.cardTotal - res.loanTotal).toFixed(0)} — timeline too long for 0% card`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
