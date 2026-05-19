import { useState } from 'react';

const DFW_PRICES = [
  { label: 'Starter ($250K)', price: 250000 },
  { label: 'Mid-Range ($375K)', price: 375000 },
  { label: 'Above Average ($500K)', price: 500000 },
  { label: 'Premium ($650K)', price: 650000 },
  { label: 'Luxury ($900K)', price: 900000 },
];

function calcNeeded(price: number, downPct: number) {
  const down = price * (downPct / 100);
  const closing = price * 0.025;
  const reserves = (price * (1 - downPct / 100) * 0.006);
  return { down, closing, reserves, total: down + closing + reserves };
}

export default function DFWSavingsGoalGuide() {
  const [priceIdx, setPriceIdx] = useState(1);
  const [downPct, setDownPct] = useState(10);
  const [currentSavings, setCurrentSavings] = useState(15000);
  const [monthlySavings, setMonthlySavings] = useState(1500);

  const price = DFW_PRICES[priceIdx].price;
  const { down, closing, reserves, total } = calcNeeded(price, downPct);
  const remaining = Math.max(0, total - currentSavings);
  const months = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : 999;
  const years = (months / 12).toFixed(1);

  const hysa = (currentSavings * 0.045 / 12).toFixed(0);
  const accel = Math.ceil(remaining / (monthlySavings * 1.25));

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏦 DFW Down Payment Savings Guide</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>How much you actually need for DFW homes: down payment + closing costs + reserves, and how long to get there.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>🏠 Target Home in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            {DFW_PRICES.map((p, i) => (
              <div key={i} onClick={() => setPriceIdx(i)} style={{
                border: `2px solid ${priceIdx === i ? '#F5E642' : '#e2e8f0'}`,
                borderRadius: 8, padding: '0.75rem', textAlign: 'center', cursor: 'pointer',
                background: priceIdx === i ? '#fefce8′ : '#fff', fontSize: 13, fontWeight: priceIdx === i ? 700 : 400
              }}>{p.label}</div>
            ))}
          </div>
          <label style={{ fontWeight: 600 }}>Down Payment %: <span style={{ color: '#F5E642', background: '#0A1628', padding: '2px 10px', borderRadius: 6 }}>{downPct}%</span></label>
          <input type="range" min={3} max={25} value={downPct} onChange={e => setDownPct(+e.target.value)} style={{ width: '100%', margin: '0.5rem 0', accentColor: '#F5E642′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: 12 }}>
            <span>3% (FHA min)</span><span>5% (Conv min)</span><span>10%</span><span>20% (No PMI)</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>💰 What You Actually Need</h2>
          {[
            { label: 'Down Payment', val: down, note: `${downPct}% of $${price.toLocaleString()}` },
            { label: 'DFW Closing Costs', val: closing, note: '~2.5% of purchase price' },
            { label: 'Cash Reserves (2mo PITI)', val: reserves, note: 'Required by most lenders' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9′ }}>
              <div><div style={{ fontWeight: 600 }}>{r.label}</div><div style={{ color: '#64748b', fontSize: 13 }}>{r.note}</div></div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>${Math.round(r.val).toLocaleString()}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0 0', fontWeight: 800, fontSize: 20 }}>
            <span>Total Cash Needed</span>
            <span style={{ color: '#0A1628′ }}>${Math.round(total).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>📅 Your Timeline</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Current Savings ($)</label>
              <input type="number" value={currentSavings} onChange={e => setCurrentSavings(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Monthly Savings ($)</label>
              <input type="number" value={monthlySavings} onChange={e => setMonthlySavings(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
          </div>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '1rem', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628′ }}>HYSA TIP: At 4.5% yield, your ${currentSavings.toLocaleString()} earns ~${hysa}/mo in interest — add that to your savings rate!</div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
          <h2 style={{ marginTop: 0, color: '#F5E642′ }}>🎯 Your Readiness Timeline</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div><div style={{ fontSize: 48, fontWeight: 800 }}>{months < 999 ? months : '∞'}</div><div style={{ color: '#94a3b8′ }}>months ({years} years)</div></div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642′ }}>${remaining.toLocaleString()}</div>
              <div style={{ color: '#94a3b8′ }}>still needed</div>
            </div>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>⚡ Accelerate by 25%: Save ${Math.round(monthlySavings * 1.25).toLocaleString()}/mo</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>You'd be ready in {accel} months instead of {months}. Cut one subscription, one dining-out habit, or add a side income stream.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
