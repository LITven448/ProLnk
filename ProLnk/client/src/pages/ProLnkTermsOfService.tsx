import { useState } from 'react';

const userTypes = ['homeowner', 'partner', 'contractor'] as const;
type UserType = typeof userTypes[number];

const terms: Record<UserType, { title: string; rights: string[]; responsibilities: string[]; highlights: string[] }> = {
  homeowner: {
    title: 'Homeowner Terms',
    rights: [
      '🏠 Receive up to 3 matched quotes per request at no cost',
      '⭐ Rate and review any partner who contacts you',
      '🚫 Opt out of communications at any time',
      '🗑️ Request deletion of your data within 30 days',
    ],
    responsibilities: [
      '📋 Provide accurate job descriptions to receive relevant matches',
      '📞 Respond to partner outreach within 72 hours or match expires',
      '💬 Leave honest feedback after work is completed',
      '🚫 Do not solicit partners outside the platform to avoid fees',
    ],
    highlights: [
      'ProLnk never charges homeowners for quotes or matches',
      'You own your home data — ProLnk licenses it, never sells it',
      'Disputes resolved within 14 business days via our mediation team',
    ],
  },
  partner: {
    title: 'Partner Terms',
    rights: [
      '💰 Receive commissions on every matched lead you refer',
      '📊 Access your full earnings dashboard at any time',
      '🔄 Cancel your subscription with 30 days written notice',
      '⚖️ Appeal any commission deduction within 60 days',
    ],
    responsibilities: [
      '✅ Recruit only qualified, licensed home service professionals',
      '🚫 Do not make income guarantees to prospects',
      '📝 Accurate representation of ProLnk’s products and pricing',
      '🔒 Keep your referral links and credentials confidential',
    ],
    highlights: [
      'Commission rates locked for Charter tier ($149/mo, 25 referrals)',
      'Network income cascades 4 levels deep — no cap on depth',
      'Charter tier closes at 500 applications — act before it’s full',
    ],
  },
  contractor: {
    title: 'Contractor Terms',
    rights: [
      '🔧 Choose which leads to accept — no forced assignments',
      '💳 Receive payouts within 7 business days of match completion',
      '📁 Access your match history and earnings records at any time',
      '⭐ Dispute unfair homeowner ratings within 30 days',
    ],
    responsibilities: [
      '📜 Maintain active license and insurance at all times',
      '📞 Respond to matched leads within 4 hours during business hours',
      '✅ Complete jobs to the standard described in your profile',
      '🚫 Do not charge homeowners beyond agreed quote without approval',
    ],
    highlights: [
      'ProLnk never marks up your quote — you set your price',
      'Background verification required before first lead delivery',
      'DFW-specific licensing requirements checked at onboarding',
    ],
  },
};

export default function ProLnkTermsOfService() {
  const [selected, setSelected] = useState<UserType>('homeowner');
  const [section, setSection] = useState<'rights' | 'responsibilities' | 'highlights'>('rights');
  const t = terms[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Terms of Service</h1>
          <p style={{ color: '#64748B', marginTop: 8 }}>Plain-language summary — select your role to see what applies to you</p>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
          {userTypes.map(u => (
            <button key={u} onClick={() => setSelected(u)} style={{
              padding: '8px 20px', borderRadius: 24, border: '2px solid',
              borderColor: selected === u ? '#0A1628' : '#CBD5E1',
              background: selected === u ? '#0A1628' : 'white',
              color: selected === u ? 'white' : '#0A1628',
              fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', fontSize: 14,
            }}>{u}</button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginTop: 0 }}>{t.title}</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {(['rights', 'responsibilities', 'highlights'] as const).map(s => (
              <button key={s} onClick={() => setSection(s)} style={{
                padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: section === s ? '#F5E642' : '#F1F5F9', color: '#0A1628',
              }}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
            ))}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {t[section].map((item, i) => (
              <li key={i} style={{ padding: '10px 0', borderBottom: i < t[section].length - 1 ? '1px solid #F1F5F9' : 'none', color: '#1E293B', fontSize: 15 }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            ⚖️ Disputes are resolved via binding arbitration in Dallas, TX. Full terms at prolnk.io/legal. Last updated May 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
