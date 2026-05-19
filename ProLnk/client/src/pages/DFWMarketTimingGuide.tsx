import { useState } from 'react';

const MONTHS = [
  { month: 'January', supply: 3.8, listToSale: 96.2, dom: 48, trend: 'Buyer advantage — inventory rises post-holidays' },
  { month: 'February', supply: 3.2, listToSale: 97.1, dom: 40, trend: 'Market warming — more activity, fewer listings' },
  { month: 'March', supply: 2.4, listToSale: 99.4, dom: 28, trend: 'Spring surge begins — sellers gain advantage' },
  { month: 'April', supply: 2.1, listToSale: 101.2, dom: 22, trend: 'Peak seller market — multiple offers common' },
  { month: 'May', supply: 2.0, listToSale: 102.0, dom: 19, trend: 'Hottest month — highest competition for buyers' },
  { month: 'June', supply: 2.3, listToSale: 100.8, dom: 23, trend: 'Still strong seller market — slight cooling' },
  { month: 'July', supply: 2.7, listToSale: 99.5, dom: 32, trend: 'Summer slowdown — families settled, less urgency' },
  { month: 'August', supply: 2.9, listToSale: 98.8, dom: 36, trend: 'Slowest summer month — more negotiating room' },
  { month: 'September', supply: 2.5, listToSale: 99.7, dom: 30, trend: 'Fall second wind — buyers return post-vacation' },
  { month: 'October', supply: 2.6, listToSale: 99.2, dom: 33, trend: 'Balanced to slight seller advantage' },
  { month: 'November', supply: 3.1, listToSale: 97.8, dom: 42, trend: 'Buyer window opens — motivated sellers' },
  { month: 'December', supply: 3.6, listToSale: 96.5, dom: 50, trend: 'Best buyer month — lowest competition' },
];

const ADVICE: Record<string, Record<string, string>> = {
  buyer: {
    'Q1 (Jan–Mar)': 'January and February offer your best leverage. Inventory is higher, sellers are motivated after holiday market. Expect 3-5% below list in Jan, then competition rises fast by March.',
    'Q2 (Apr–Jun)': 'Toughest months to buy in DFW. Expect to waive contingencies, offer above list, and move fast. Get pre-approved before looking. Budget 2-3% above list in competitive areas.',
    'Q3 (Jul–Aug)': 'A hidden buyer window. DFW summer heat slows showings. Less competition, longer DOM, and sellers who listed in spring are now more flexible.',
    'Q4 (Oct–Dec)': 'November and December are statistically the best months to buy in DFW. Sellers listing in December need to sell — expect 97% of list or less.',
  },
  seller: {
    'Q1 (Jan–Mar)': 'List in late February to capture early spring buyers. Homes listed Feb 20 – Mar 10 consistently sell for the highest price-to-list ratios in DFW.',
    'Q2 (Apr–Jun)': 'Prime selling window. Price confidently. Multiple offers expected. Accept highest and best by day 4-5 of listing.',
    'Q3 (Jul–Aug)': 'Slower but not dead. Price competitively, ensure home is in show-ready condition. Buyers who look in July are serious.',
    'Q4 (Oct–Dec)': 'List by October 15 to capture fall buyers. After Thanksgiving, the market slows sharply. Motivated buyers in November but volume drops off.',
  },
};

export default function DFWMarketTimingGuide() {
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [quarter, setQuarter] = useState('Q1 (Jan–Mar)');

  const advice = ADVICE[role][quarter];
  const supply2026 = 2.6;
  const listToSale2026 = 99.4;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8e8e8′ }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW Market Intelligence</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#fff' }}>DFW Market Timing Guide</h1>
          <p style={{ fontSize: 18, color: '#aab', lineHeight: 1.7 }}>DFW real estate has distinct seasonality. Know when the market favors buyers, when sellers hold all the cards, and what 2026 looks like for both.</p>
        </div>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 36 }}>
          {[
            { label: '2026 Months of Supply', value: supply2026.toString(), note: 'Balanced = 4–6 months' },
            { label: 'Avg List-to-Sale Ratio', value: listToSale2026 + '%', note: 'Above 100% = multiple offers' },
            { label: 'YoY Price Appreciation', value: '+5.2%', note: 'DFW metro average 2026′ },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{stat.label}</div>
              <div style={{ fontSize: 13, color: '#778′ }}>{stat.note}</div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#fff' }}>📅 DFW Seasonality at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {MONTHS.map(m => {
              const heat = m.supply < 2.2 ? '#F5E642′ : m.supply < 2.8 ? '#f5a642' : '#6bb5f5';
              const textColor = m.supply < 2.2 ? '#0A1628′ : '#fff';
              return (
                <div key={m.month} style={{ background: heat, borderRadius: 10, padding: '14px 12px' }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: textColor }}>{m.month}</div>
                  <div style={{ fontSize: 13, color: textColor, opacity: 0.85, marginTop: 4 }}>{m.supply}mo supply</div>
                  <div style={{ fontSize: 12, color: textColor, opacity: 0.75, marginTop: 2 }}>{m.listToSale}% L/S</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 20, fontSize: 13, color: '#99a' }}>
            <span>🟡 Seller market</span><span>🟠 Balanced</span><span>🔵 Buyer market</span>
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#fff' }}>📈 Key DFW Market Indicators</h2>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 22 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {[
                { icon: '📦', label: 'Months of Supply', desc: 'Under 3: seller\’s market. 3-6: balanced. Over 6: buyer\’s market. DFW typically runs 2-4.' },
                { icon: '💰', label: 'List-to-Sale Ratio', desc: 'Over 100% means buyers routinely pay above asking. DFW averages 99-102% depending on season.' },
                { icon: '📆', label: 'Days on Market (DOM)', desc: 'DFW averages 19-50 days depending on month. Under 21 days = hot. Over 45 = buyer leverage.' },
                { icon: '🏗️', label: 'New Construction', desc: 'DFW adds ~45,000 new homes/year. Frisco, Celina, Princeton have highest new supply — limits appreciation.' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ fontSize: 24, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: '#99a', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(245,230,66,0.08)', border: '2px solid #F5E642', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 20, color: '#fff' }}>🧭 Your Timing Strategy</h2>
          <div style={{ display: 'flex', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>I am a:</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {(['buyer', 'seller'] as const).map(r => (
                  <button key={r} onClick={() => setRole(r)} style={{ padding: '9px 22px', borderRadius: 8, border: '2px solid', borderColor: role === r ? '#F5E642′ : ’rgba(255,255,255,0.2)', background: role === r ? '#F5E642′ : ’transparent', color: role === r ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer', textTransform: 'capitalize', fontSize: 15 }}>{r}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Target quarter:</label>
              <select value={quarter} onChange={e => setQuarter(e.target.value)} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: '#162040', color: '#fff', fontSize: 15 }}>
                {Object.keys(ADVICE.buyer).map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>Strategy for {role === ’buyer' ? 'Buyers' : 'Sellers'} in {quarter}:</div>
            <div style={{ lineHeight: 1.8, color: '#ccd' }}>{advice}</div>
          </div>
        </section>

      </div>
    </div>
  );
}
