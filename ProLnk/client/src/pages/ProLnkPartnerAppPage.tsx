import { useState } from 'react';

const appFeatures = [
  { icon: '💵', label: 'Income Dashboard', desc: 'Real-time view of total earnings, commission breakdown by stream, and projected monthly payout.' },
  { icon: '🌐', label: 'Network Overview', desc: 'See your full 4-level referral tree, who is active, and how much each level is generating for you.' },
  { icon: '📡', label: 'Job Feed', desc: 'Live feed of matched service requests in your trade and territory. Accept in one tap.' },
  { icon: '🏡', label: 'Origination Tracker', desc: 'Track every home you have enrolled in the Vault. See recurring revenue tied to each address.' },
  { icon: '💬', label: 'Team Communication', desc: 'Message your downline partners, share leads, and coordinate coverage across your territory.' },
  { icon: '📈', label: 'Performance Score', desc: 'Your platform score based on response time, ratings, and completion rate — affects match priority.' },
];

const incomeProfiles = [
  {
    level: 'New Partner (0–9 matches)',
    focus: ['Job Feed', 'Income Dashboard'],
    insight: 'Your priority right now is completing your first 10 matches to unlock Tier 2 (20% commission). The Job Feed and Income Dashboard are your most important screens — focus there.',
    tip: '🎯 Accept every match you can. Speed and ratings in your first 10 jobs define your algorithm ranking for life.',
  },
  {
    level: 'Active Partner (10–49 matches)',
    focus: ['Network Overview', 'Job Feed', 'Income Dashboard'],
    insight: 'You are now earning 20% commissions. Start building your network. Every partner you recruit adds a passive income stream on top of your job income.',
    tip: '🌐 Refer 3 licensed contractors this month. Their $149/mo subscriptions earn you $17.88/mo each — forever.',
  },
  {
    level: 'Growth Partner (50–99 matches)',
    focus: ['Network Overview', 'Origination Tracker', 'Team Communication'],
    insight: 'At 35% commission and a growing network, your passive streams are becoming real money. Origination rights enrollment should be your next major initiative.',
    tip: '🏡 Help homeowners add their homes to the Vault. Every enrolled home generates permanent origination revenue.',
  },
  {
    level: 'Elite Partner (100+ matches)',
    focus: ['Network Overview', 'Origination Tracker', 'Performance Score', 'Team Communication'],
    insight: 'You are now at 50% commission and your network is producing significant passive income. Managing and coaching your downline is now as important as your own job volume.',
    tip: '📈 A 1-point improvement in Performance Score at your match volume translates to hundreds in additional monthly income.',
  },
];

export default function ProLnkPartnerAppPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>ProLnk Partner App</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            Your business command center. Income, network, jobs, and origination rights — all in one place.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginBottom: 52 }}>
          {appFeatures.map((f, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642', marginBottom: 6 }}>{f.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Which features matter most to you?</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Select your income level to get a personalized app focus.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {incomeProfiles.map((p, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642' : '1px solid #1e3a5f',
                background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{p.level}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 12, padding: 22 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>FOCUS SCREENS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {incomeProfiles[selected].focus.map((f, i) => (
                    <span key={i} style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#F5E642', fontWeight: 600 }}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}>{incomeProfiles[selected].insight}</div>
              <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 8, padding: 14, fontSize: 13, color: '#94a3b8' }}>{incomeProfiles[selected].tip}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
