import { useState } from 'react';

type Persona = 'homeowner' | 'partner' | 'charter';

const PROMISES: Record<Persona, { title: string; icon: string; commitments: { headline: string; detail: string }[] }> = {
  homeowner: {
    title: 'Our Promise to DFW Homeowners',
    icon: '🏠',
    commitments: [
      { headline: '🚫 Zero Spam, Zero Hassle', detail: 'Your contact info is never sold. Reach out once — get vetted responses only. No call centers, no spam.' },
      { headline: '✅ Only Vetted Contractors', detail: 'Every ProLnk contractor is license-verified, background-checked, and rated by real DFW homeowners.' },
      { headline: '💰 Transparent Pricing Always', detail: 'You see itemized quotes before any work begins. No hidden fees, no surprise charges.' },
      { headline: '🔒 Your Home Data Stays Yours', detail: 'We store your Home Health Vault data under your control. You choose who sees what — always.' },
      { headline: '📈 Better Every Year', detail: 'Our AI improves every match. The longer you\’re on ProLnk, the better your contractor matches get.' },
    ],
  },
  partner: {
    title: 'Our Promise to DFW Partners',
    icon: '🤝',
    commitments: [
      { headline: '💸 Fair Income, Always Paid On Time', detail: 'Commission payouts process by the 5th of each month. No holds, no minimums — your earnings, your timeline.' },
      { headline: '📊 Full Visibility Into Your Network', detail: 'Real-time dashboard shows every referral, every earning, every level of your network cascade — no black boxes.' },
      { headline: '🛠️ Tools That Help You Grow', detail: 'We invest in partner growth tools: leaderboard, territory maps, referral links, and dedicated onboarding support.' },
      { headline: '📜 Your Origination Rights Are Forever', detail: 'Homes you bring into the Vault earn you a permanent revenue share — no expiration, no platform override.' },
      { headline: '📞 A Real Team Behind You', detail: 'Every partner has access to a dedicated ProLnk Partner Success rep — a human, not just a chatbot.' },
    ],
  },
  charter: {
    title: 'Our Promise to Charter Partners',
    icon: '👑',
    commitments: [
      { headline: '🔒 $149/Month Locked Forever', detail: 'Charter tier pricing is grandfathered in permanently. No matter what the platform charges in 2027 or beyond — you never pay more.' },
      { headline: '🏆 Best Network Rates, Always', detail: 'Charter Partners receive the highest override rates in the system: 7% / 4% / 2% / 1% — never diluted.' },
      { headline: '🗺️ Territory Priority', detail: 'Charter Partners get first selection of DFW territories as new service areas open up — before anyone else.' },
      { headline: '📣 Voice in Platform Development', detail: 'Charter Partners join the ProLnk Advisory Circle — direct input on features, pricing, and roadmap decisions.' },
      { headline: '🎯 Exclusive Charter Badge', detail: 'Your ProLnk profile displays the permanent Charter Partner badge — a signal of trust and network seniority.' },
    ],
  },
};

export default function DFWProLnkPromise() {
  const [persona, setPersona] = useState<Persona>('homeowner');

  const { title, icon, commitments } = PROMISES[persona];

  const LABELS: Record<Persona, string> = {
    homeowner: '🏠 Homeowner',
    partner: '🤝 Partner',
    charter: '👑 Charter Partner',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 44 }}>🤝</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>The ProLnk Promise</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>What we commit to every person in the DFW ProLnk community — and what we hold ourselves to.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {(Object.keys(LABELS) as Persona[]).map(p => (
            <button key={p} onClick={() => setPersona(p)}
              style={{ flex: 1, padding: '11px 4px', borderRadius: 8, border: `2px solid ${persona === p ? '#F5E642' : '#1e3a5f'}`, background: persona === p ? '#1a2f50′ : '#0A1628', color: persona === p ? '#F5E642' : '#94a3b8', fontWeight: 700, fontSize: 13, cursor: ’pointer', transition: 'all 0.15s' }}>
              {LABELS[p]}
            </button>
          ))}
        </div>
        <div style={{ background: '#0f2039', borderRadius: 14, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: 32 }}>{icon}</span>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>{title}</h2>
          </div>
          {commitments.map((c, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: i < commitments.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.headline}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f2039', borderRadius: 12, padding: 22, textAlign: 'center', borderTop: '3px solid #F5E642′ }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✊</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, margin: '0 0 8px' }}>These aren't marketing claims.</p>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>They're the commitments we build every feature around. If we ever fall short, tell us — and we’ll make it right.</p>
        </div>
      </div>
    </div>
  );
}
