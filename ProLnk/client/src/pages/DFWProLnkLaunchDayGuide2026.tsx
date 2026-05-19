import { useState } from 'react';

const STAKEHOLDERS = [
  { id: 'charter', label: '🏅 Charter Pro (First 500)' },
  { id: 'founding', label: '🌟 Founding Pro (501–2,000)' },
  { id: 'homeowner', label: '🏠 Waitlist Homeowner' },
  { id: 'vault', label: '🗄️ Home Health Vault Member' },
  { id: 'curious', label: '👀 Just Exploring' },
];

const GUIDES: Record<string, { title: string; points: string[] }> = {
  charter: {
    title: 'Charter Pro — Launch Day Timeline',
    points: [
      '🏅 You are in the first 500 — Charter tier locks at capacity, your rate is permanent',
      '⚡ First match queue opens exclusively to Charter pros at 9:00 AM CT on launch day',
      '💰 $149/month locked rate — never increases regardless of future tier pricing',
      '🔗 Your 4-level network cascade activates — referral tracking goes live',
      '📊 Dashboard shows earnings, match history, and network tree from day one',
      '📱 SMS and email notifications go live — accept or decline matches in real time',
      '🎯 First 30 days: Charter pros get 2x match priority weighting',
      '🤝 ProLnk team available via direct line for Charter tier on launch day',
    ],
  },
  founding: {
    title: 'Founding Pro — Launch Day Timeline',
    points: [
      '🌟 Founding tier: slots 501–2,000 — you are in the second wave',
      '⏳ Match queue opens to Founding pros 24 hours after Charter queue opens',
      '💰 $149/month locked rate — same pricing as Charter, network cascade active',
      '📊 Full dashboard access from launch — earnings and network tracking live',
      '📱 Real-time match notifications activate on your launch day',
      '🔗 Network override commissions begin accumulating immediately',
      '🎯 Founding tier: 1.5x match priority weighting for first 30 days',
      '🤝 Onboarding team reaches out within 48 hours of launch to confirm setup',
    ],
  },
  homeowner: {
    title: 'Waitlist Homeowner — Launch Day Experience',
    points: [
      '🏠 Waitlist homeowners get first access — no cold signup required',
      '📱 SMS and email notification sent when your match is ready',
      '🔍 ProLnk matches your service need to the top 3 vetted pros in your area',
      '📋 You receive pro profiles, ratings, and a match explanation before choosing',
      '💬 Messaging opens immediately between you and matched pros',
      '🏥 Home Health Vault pre-populated with your address data on launch',
      '🔒 Your data is private by default — you control what pros can see',
      '✅ No obligation — review matches, then decide',
    ],
  },
  vault: {
    title: 'Home Health Vault — Goes Live on Launch Day',
    points: [
      '🗄️ Home Health Vault activates for all registered homes on launch day',
      '🏥 Your home’s service history, permits, and health data aggregated in one place',
      '🔍 Pros matched to your home can see relevant system ages — better quotes',
      '📊 Health score assigned to your home based on available data',
      '🔒 You control data sharing permissions at the pro and job level',
      '📁 Upload your own records — warranties, inspections, repair receipts',
      '🌐 Vault data persists permanently — builds value with each job completed',
      '📡 Origination rights: if you sourced this home to the Vault, you earn on activity',
    ],
  },
  curious: {
    title: 'Just Exploring — What ProLnk Is',
    points: [
      '🔗 ProLnk connects DFW homeowners with vetted, licensed service professionals',
      '🏅 Charter and Founding tiers are for pros who want priority access and locked rates',
      '🏠 Homeowners get matched — no bidding, no cold outreach, just qualified pros',
      '🗄️ Home Health Vault is a permanent record of your home’s health and history',
      '💰 Network Income System: 5 streams for pros who refer other pros and homeowners',
      '🌐 Launch day is when the match engine goes fully live for the first time',
      '📋 Waitlist signup takes 2 minutes — homeowner or pro, both welcome',
      '🚀 ProLnk is DFW-first, expanding metro by metro in 2026–2027',
    ],
  },
};

export default function DFWProLnkLaunchDayGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? GUIDES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚀 Launch Day Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          When ProLnk officially launches, every stakeholder experiences something different. Charter pros, homeowners, Vault members — select your role to see what happens on launch day.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {STAKEHOLDERS.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#0f2035', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === s.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '14px 10px', fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
              {s.label}
            </button>
          ))}
        </div>
        {guide && (
          <div style={{ background: '#0f2035', border: '1px solid #1e3a5f', borderRadius: 14, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>{guide.title}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {guide.points.map((p, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14, lineHeight: 1.6 }}>{p}</li>
              ))}
            </ul>
          </div>
        )}
        {!guide && (
          <div style={{ textAlign: 'center', color: '#475569', padding: '40px 0', fontSize: 14 }}>
            ☝️ Select your stakeholder type above to see your ProLnk launch day experience
          </div>
        )}
        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🏅 Charter Tier Closes at 500 Pros</div>
          <div style={{ color: '#1a2e4a', fontSize: 13 }}>Once 500 Charter pros are confirmed, the tier closes permanently. Founding tier then opens. Join the waitlist now to secure your position.</div>
        </div>
      </div>
    </div>
  );
}
