import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: '🏠 DFW Homeowner' },
  { id: 'pro', label: '🔧 Home Service Pro' },
  { id: 'scout', label: '🌐 Community Scout / Partner' },
  { id: 'investor', label: '💼 Investor / Stakeholder' },
];

const summaries: Record<string, { title: string; value: string[]; cta: string }> = {
  homeowner: {
    title: 'ProLnk for DFW Homeowners',
    value: [
      'Get 3 verified bids from local DFW pros — free, fast, no spam calls',
      'Every pro is TX-licensed, insured, and rated by real DFW neighbors',
      'Home Health Vault: secure record of every repair, upgrade, and inspection',
      'Vault data increases resale value and speeds up transactions',
      'Join the waitlist now — DFW launch is live and spots are limited',
    ],
    cta: '🏠 Join the DFW Homeowner Waitlist — Free Forever',
  },
  pro: {
    title: 'ProLnk for DFW Service Pros',
    value: [
      'Receive qualified, exclusive leads matched to your trade and service area',
      '5-stream Network Income System: earn on every match, referral, and subscription',
      'Charter Tier ($149/mo locked): 25 spots — closes at 500 applications',
      'Origination Rights: earn permanently on every home you bring to the platform',
      '4-level referral cascade: recruit other pros and earn overrides on their earnings',
    ],
    cta: '🔧 Apply for Charter Pro Status — 25 Spots Remaining',
  },
  scout: {
    title: 'ProLnk for Community Scouts & Partners',
    value: [
      'Earn Homeowner Override: $25–$100 per qualified homeowner you refer',
      'Earn Subscription Override: 12% recurring on every pro you bring to the platform',
      'Home Origination Rights: permanent revenue share on every home added to the Vault',
      'No license required — scouts are community connectors, not service providers',
      'Perfect for real estate agents, insurance agents, community leaders, HOA managers',
    ],
    cta: '🌐 Become a ProLnk Scout Partner — Join the Network',
  },
  investor: {
    title: 'ProLnk Investment Thesis',
    value: [
      'Two-sided marketplace: ProLnk (consumers) + TrustyPro (licensed pros) — one platform',
      'Home Health Vault: data moat — 50M+ homes, structural/health data, permanent asset',
      'Network Economic Lock-In: 5-stream income makes switching cost prohibitive for pros',
      'Unit economics: 85% net margin at scale, path to profitability at 500 active pros',
      'AI agents handle 80% of operations — scales to zero marginal cost at volume',
    ],
    cta: '💼 Request ProLnk Investor Materials — andrew@prolnk.io',
  },
};

export default function DFWProLnkFinalResource() {
  const [selected, setSelected] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW FINAL RESOURCE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🔗 Everything ProLnk — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12, fontSize: 16 }}>The complete one-page summary of what ProLnk offers DFW homeowners, pros, and partners.</p>

        <div style={{ background: '#111d35', borderRadius: 12, padding: 16, marginBottom: 32, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[{ label: 'Waitlist Status', value: 'OPEN', color: '#22c55e' }, { label: 'Charter Spots', value: '25 / 500', color: '#F5E642' }, { label: 'DFW Launch', value: 'LIVE', color: '#22c55e' }, { label: 'Homes in Vault', value: '50M+', color: '#F5E642' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center', flex: 1, minWidth: 100 }}>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏠', title: 'Home Health Vault', body: 'Every repair, permit, upgrade, and inspection in one secure place. Increases resale value. Transfers with the home. Permanent data asset for the homeowner and the platform.' },
            { icon: '💰', title: '5-Stream Income', body: 'Direct commissions (72% match value). Pro network overrides (4 levels deep). Subscription overrides (12% recurring). Homeowner origination fees. Vault origination rights (permanent).' },
            { icon: '🔧', title: 'DFW Pro Network', body: 'TX-licensed, insured, and rated pros in roofing, electrical, plumbing, HVAC, pest control, and 20+ trades. Every pro verified before their first match. Quality guaranteed.' },
            { icon: '🤖', title: 'AI-Powered Platform', body: '47 AI agents handle matching, payments, compliance, marketing, and customer success. 85% net margin at scale. Autonomous operation means unit economics that improve continuously.' },
            { icon: '🌐', title: 'Network Income System', body: 'Patented-pending 5-level network income creates lock-in no competitor can replicate. Charter pros earn 25% more than post-launch members. Waitlist closes at 500 applications + 5,000 homes.' },
            { icon: '📊', title: 'Seed Round Ready', body: 'ProLnk is raising a seed round to fund growth beyond the DFW beta. Investor materials available. Unit economics validated. Team in place. Launch complete. Talk to us.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111d35', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Your ProLnk Summary + Next Step</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 14 }}>Who are you? Get your personalized ProLnk summary:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {roles.map(r => (
              <button key={r.id} onClick={() => { setSelected(r.id); setJoined(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === r.id ? '#F5E642' : '#1e3a5f'}`, background: selected === r.id ? '#F5E642' : 'transparent', color: selected === r.id ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{r.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{summaries[selected].title}</div>
              {summaries[selected].value.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 24 }}>
                {!joined ? (
                  <button onClick={() => setJoined(true)} style={{ padding: '14px 28px', borderRadius: 10, border: 'none', background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>{summaries[selected].cta}</button>
                ) : (
                  <div style={{ padding: 20, background: '#111d35', borderRadius: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                    <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>You're on the list!</div>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>We'll reach out within 24 hours. Welcome to ProLnk DFW.</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>
          ProLnk · Dallas-Fort Worth · 2026 · <span style={{ color: '#F5E642' }}>prolnk.io</span>
        </div>
      </div>
    </div>
  );
}
