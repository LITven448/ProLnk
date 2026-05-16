import { useState } from 'react';

const journeys = {
  homeowner: {
    title: 'Homeowner Journey',
    steps: [
      { day: 'Right Now', icon: '✅', action: 'Confirm your email and secure your spot in the ProLnk waitlist' },
      { day: 'Day 1', icon: '📧', action: 'Receive your welcome email with your queue position and unique referral link' },
      { day: 'Day 2-3', icon: '🏠', action: 'Add your home to the ProLnk Home Health Vault (optional but earns origination rights)' },
      { day: 'Week 1', icon: '🤝', action: 'Your first match opportunity — a vetted local pro reaches out for your service need' },
      { day: 'Week 2+', icon: '💬', action: 'Messaging and quoting with matched pros directly through the platform' },
    ],
    perks: ['No upfront cost — homeowners never pay to get matched', 'Only vetted, background-checked pros reach you', 'Origination rights = you earn every time your home is serviced through ProLnk forever'],
  },
  partner: {
    title: 'Partner (Pro) Journey',
    steps: [
      { day: 'Right Now', icon: '✅', action: 'Application submitted — you are in the Charter Founding queue (first 500 only)' },
      { day: 'Day 1', icon: '📧', action: 'Welcome email with your partner ID, referral link, and onboarding checklist' },
      { day: 'Day 3-5', icon: '📋', action: 'License and insurance verification (takes 24-48 hours after you submit docs)' },
      { day: 'Week 1', icon: '🎯', action: 'First lead opportunities appear in your dashboard based on your trade and territory' },
      { day: 'Week 2+', icon: '💰', action: 'Commission tracking goes live — every match, every referral, every origination right earns' },
    ],
    perks: ['Charter Founding rate: $149/mo locked for life (price rises after 500 partners)', '5 income streams: commissions, overrides, subscriptions, homeowner leads, origination rights', 'Your referral network earns you overrides 4 levels deep'],
  },
  both: {
    title: 'Homeowner + Partner Journey',
    steps: [
      { day: 'Right Now', icon: '✅', action: 'Both applications submitted — you are on both waitlists' },
      { day: 'Day 1', icon: '📧', action: 'Two welcome emails — one for each role with separate onboarding paths' },
      { day: 'Day 2-5', icon: '🔄', action: 'Partner verification runs in parallel with your homeowner profile setup' },
      { day: 'Week 1', icon: '🏆', action: 'Unique advantage: you understand both sides — use it to build your referral network faster' },
      { day: 'Week 2+', icon: '🚀', action: 'Full access: get matched as a homeowner AND earn as a partner from your network' },
    ],
    perks: ['Maximum earning potential on the platform', 'Credibility with homeowners you recruit because you are one too', 'Origination rights on your own home plus partner commissions'],
  },
};

export default function ProLnkJoinPage() {
  const [role, setRole] = useState<'homeowner' | 'partner' | 'both' | ''>('');
  const journey = role ? journeys[role] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔗</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>Join ProLnk</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>Dallas-Fort Worth's home services network — built for homeowners and pros</p>
        </div>
        <div style={{ background: '#111d30', borderRadius: 16, padding: 24, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 16, color: '#F5E642' }}>I am joining as a...</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {(['homeowner', 'partner', 'both'] as const).map(r => (
              <button key={r} onClick={() => setRole(r)}
                style={{ padding: '16px 8px', background: role === r ? '#F5E642' : '#0A1628', color: role === r ? '#0A1628' : '#cbd5e1', border: '1.5px solid #1e3a5f', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', textTransform: 'capitalize' }}>
                {r === 'homeowner' ? '🏠 Homeowner' : r === 'partner' ? '🔧 Partner' : '⭐ Both'}
              </button>
            ))}
          </div>
        </div>
        {journey && (
          <div>
            <div style={{ background: '#111d30', borderRadius: 16, padding: 24, marginBottom: 20, border: '2px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, color: '#F5E642' }}>Your {journey.title} — Days 1-7</div>
              {journey.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 70, color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{s.day}</div>
                  <div style={{ fontSize: 22 }}>{s.icon}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 15 }}>{s.action}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#111d30', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: '#F5E642' }}>✨ Your Perks</div>
              {journey.perks.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', color: '#94a3b8', fontSize: 14, borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ color: '#F5E642' }}>→</span> {p}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}