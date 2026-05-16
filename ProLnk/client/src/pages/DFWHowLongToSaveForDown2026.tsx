import { useState } from 'react';

export default function DFWHowLongToSaveForDown2026() {
  const [monthlySavings, setMonthlySavings] = useState(1000);
  const [pricePoint, setPricePoint] = useState(385000);

  const down20 = pricePoint * 0.2;
  const down35 = pricePoint * 0.035;
  const down5 = pricePoint * 0.05;
  const months20 = Math.ceil(down20 / monthlySavings);
  const months35 = Math.ceil(down35 / monthlySavings);
  const months5 = Math.ceil(down5 / monthlySavings);
  const toYrMo = (m: number) => m >= 12 ? `${Math.floor(m / 12)}y ${m % 12}mo` : `${m}mo`;

  const scenarios = [
    { label: '🏦 20% Conventional', amount: down20, months: months20, color: '#F5E642', note: 'No PMI, best rate' },
    { label: '🏠 5% Conventional', amount: down5, months: months5, color: '#60A5FA', note: 'PMI until 80% LTV' },
    { label: '🔑 3.5% FHA Loan', amount: down35, months: months35, color: '#34D399', note: 'MIP for loan life' },
    { label: '⭐ 0–3% DFW Programs', amount: pricePoint * 0.01, months: Math.ceil(pricePoint * 0.01 / monthlySavings), color: '#F472B6', note: 'TSAHC, TDHCA assist' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEBUYER GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px' }}>💰 How Long to Save for a Down Payment</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>20% of $385K is $77K — daunting. But 3.5% FHA is just $13,500, doable in 18–24 months. Texas buyer assistance programs can cut that to near $0.</p>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚙️ Your Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Monthly Savings Amount</label>
              <input type="range" min={200} max={5000} step={100} value={monthlySavings} onChange={e => setMonthlySavings(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${monthlySavings.toLocaleString()}/mo</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>DFW Target Price</label>
              <input type="range" min={200000} max={700000} step={10000} value={pricePoint} onChange={e => setPricePoint(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${(pricePoint / 1000).toFixed(0)}K</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {scenarios.map(({ label, amount, months, color, note }) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{label}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>{note}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color, fontWeight: 800, fontSize: 20 }}>{toYrMo(months)}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>${Math.round(amount).toLocaleString()} needed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🌟 Texas First-Time Buyer Programs</h2>
          {[
            ['TSAHC Home Sweet Texas', 'Up to 5% down payment assistance, income limits apply'],
            ['TDHCA My First Texas Home', '30-yr fixed + down payment grant, any Texas county'],
            ['DFW Metro Programs', 'City-specific grants in Dallas, Fort Worth, Plano, Frisco'],
            ['FHA + Gift Funds', '100% of down can come from family gift — FHA allows it'],
          ].map(([prog, desc]) => (
            <div key={prog} style={{ marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14 }}>✓ {prog}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginLeft: 18 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18 }}>Pro Tip: Automate Your Savings</div>
          <div style={{ color: '#1E293B', fontSize: 13, marginTop: 6 }}>Set up an auto-transfer on payday to a HYSA (High-Yield Savings Account) earning 4.5–5% APY. Your down payment grows faster.</div>
        </div>
      </div>
    </div>
  );
}
