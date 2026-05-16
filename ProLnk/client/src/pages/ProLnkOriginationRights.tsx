import { useState } from 'react';

export default function ProLnkOriginationRights() {
  const [homes, setHomes] = useState(50);
  const [avgSpend, setAvgSpend] = useState(2000);
  const [tier, setTier] = useState<'charter' | 'founding'>('charter');

  const rate = tier === 'charter' ? 0.015 : 0.010;
  const annual = Math.round(homes * avgSpend * rate);
  const monthly = Math.round(annual / 12);
  const fiveYear = annual * 5;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>STREAM 5</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: '0 0 16px' }}>🏛️ Origination Rights</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Bring a home onto the ProLnk platform once. Earn a share of ProLnk commission on every service job at that home — forever.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🎯', title: 'How You Earn It', desc: 'A homeowner joins ProLnk through your referral link. That home is permanently attributed to you.' },
            { emoji: '💰', title: 'What You Receive', desc: '1.5% Charter or 1.0% Founding of ProLnk gross commission on every service job booked at that address.' },
            { emoji: '♾️', title: 'How Long It Lasts', desc: 'Permanently. The home stays in the system. You keep earning even if you stop actively partnering.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#fff', fontWeight: 800, marginBottom: 16 }}>📐 The Math Made Simple</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['100 homes × $2,000 avg annual service spend', '= $200,000 platform activity'],
              ['ProLnk earns ~25% gross commission', '= $50,000 gross'],
              ['Your 1.5% origination right', '= $750/year from 100 homes'],
              ['Scale to 500 homes', '= $3,750/year — every year — no new work'],
            ].map(([left, right], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{left}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{right}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, marginBottom: 20 }}>📊 Origination Income Calculator</h2>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {(['charter', 'founding'] as const).map(t => (
              <button key={t} onClick={() => setTier(t)}
                style={{ flex: 1, padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                  background: tier === t ? '#F5E642' : '#1e3a5f', color: tier === t ? '#0A1628' : '#fff' }}>
                {t === 'charter' ? '🥇 Charter (1.5%)' : '🥈 Founding (1.0%)'}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Homes Originated</label>
              <input type="range" min={10} max={500} step={10} value={homes}
                onChange={e => setHomes(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642', marginTop: 8 }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{homes} homes</div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Avg Annual Service Spend per Home</label>
              <input type="range" min={500} max={8000} step={250} value={avgSpend}
                onChange={e => setAvgSpend(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642', marginTop: 8 }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${avgSpend.toLocaleString()}/yr</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[['Monthly', '$' + monthly.toLocaleString(), '#94a3b8'], ['Annual', '$' + annual.toLocaleString(), '#F5E642'], ['5-Year Total', '$' + fiveYear.toLocaleString(), '#22c55e']].map(([label, val, color], i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: color as string, fontSize: 28, fontWeight: 900 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
