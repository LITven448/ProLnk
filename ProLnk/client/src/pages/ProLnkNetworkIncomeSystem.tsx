import { useState } from 'react';

const streams = [
  { emoji: '💼', title: 'Direct Commission', desc: 'Earn 12–70% of each match value based on your tier', example: 'A $2,000 HVAC job = $400–$1,400 to you' },
  { emoji: '🔗', title: 'Pro Override', desc: '1–4% of earnings from pros you recruit, 4 levels deep', example: '10 recruited pros each earning $5K/mo = $500+/mo passive' },
  { emoji: '📅', title: 'Subscription Override', desc: '10% of $149/mo from every pro you refer, recurring', example: '20 referred pros = $298/mo recurring forever' },
  { emoji: '🏠', title: 'Homeowner Override', desc: 'Per-lead fee on homeowners you source to the platform', example: '$25–100 per qualified homeowner you refer' },
  { emoji: '🏛️', title: 'Origination Rights', desc: '1.5% Charter / 1.0% Founding of ProLnk commission on every home you originate, permanently', example: '100 homes × $2K avg service × 1.5% = $3,000/yr passive' },
];

const tiers = [
  { name: 'Charter', price: '$149/mo', slots: 500, keep: '60%', networkJob: '7/4/2/1%', sub: '12/6/3/1.5%', orig: '1.5%' },
  { name: 'Founding', price: '$149/mo', slots: 1600, keep: '60%', networkJob: '4/2/1/0.5%', sub: '6/3/1.5/0.75%', orig: '1.0%' },
];

export default function ProLnkNetworkIncomeSystem() {
  const [tradeIncome, setTradeIncome] = useState(80000);
  const [hoursPerWeek, setHoursPerWeek] = useState(45);

  const multiplier = hoursPerWeek > 50 ? 1.4 : hoursPerWeek > 40 ? 1.2 : 1.0;
  const base6 = Math.round((tradeIncome * 0.18 * multiplier) / 12 * 6);
  const base12 = Math.round(tradeIncome * 0.35 * multiplier);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK NETWORK</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: '0 0 16px' }}>5-Stream Income System</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Traditional contractors trade time for money. ProLnk partners build income that compounds.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {streams.map((s, i) => (
            <div key={i} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, minWidth: 44 }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Stream {i + 1}: {s.title}</div>
                <div style={{ color: '#cbd5e1', marginBottom: 4 }}>{s.desc}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Example: {s.example}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{ background: i === 0 ? '#1a2f1a' : '#0f2040', border: `1px solid ${i === 0 ? '#22c55e' : '#1e3a5f'}`, borderRadius: 12, padding: 24 }}>
              <div style={{ color: i === 0 ? '#22c55e' : '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{t.name} Tier</div>
              <div style={{ color: '#fff', marginBottom: 4 }}>Price: {t.price} · {t.slots} slots</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Keep: {t.keep} · Network job: {t.networkJob}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Subscription: {t.sub} · Origination: {t.orig}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, marginBottom: 24 }}>📊 Income Projection</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Current Annual Trade Income</label>
              <input type="range" min={40000} max={200000} step={5000} value={tradeIncome}
                onChange={e => setTradeIncome(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642', marginTop: 8 }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${tradeIncome.toLocaleString()}/yr</div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Hours Worked Per Week</label>
              <input type="range" min={20} max={70} step={5} value={hoursPerWeek}
                onChange={e => setHoursPerWeek(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642', marginTop: 8 }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{hoursPerWeek} hrs/week</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Projected ProLnk Income at 6 Months</div>
              <div style={{ color: '#F5E642', fontSize: 36, fontWeight: 900 }}>${base6.toLocaleString()}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Projected ProLnk Income at 12 Months</div>
              <div style={{ color: '#22c55e', fontSize: 36, fontWeight: 900 }}>${base12.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
