import { useState } from 'react';

export default function DFWProLnkJoinReasons2026() {
  const [concern, setConcern] = useState('');

  const reasons = [
    { num: 1, emoji: '🚫', title: 'No Storm Chasers', body: 'Every pro on ProLnk is verified local. We reject out-of-state contractors and require current Texas license and local references.', tags: ['trust', 'roofing'] },
    { num: 2, emoji: '✅', title: 'Verified Licenses', body: 'ProLnk checks TDLR and state licensing databases before any pro is accepted. You see a verified badge only on confirmed-active licenses.', tags: ['trust'] },
    { num: 3, emoji: '🏦', title: 'Home Health Vault Documentation', body: 'Every job done through ProLnk is documented in your Home Health Vault — your permanent property record that adds resale value and simplifies insurance claims.', tags: ['documentation', 'value'] },
    { num: 4, emoji: '⚖️', title: 'Fair Pricing Transparency', body: 'ProLnk pros compete on quality and service, not hidden markups. You see their rates and reviews before accepting a match.', tags: ['value', 'trust'] },
    { num: 5, emoji: '🏅', title: 'Charter Pros Committed Long-Term', body: 'Charter-tier pros have staked their reputation on ProLnk\’s platform. They\’re not here for a quick job — they\’re building a DFW clientele.', tags: ['trust'] },
    { num: 6, emoji: '⚡', title: 'Quick Match — No Bidding Wars', body: 'Describe your job once. ProLnk matches you with the right pro — no need to post on multiple sites and manage competing bids.', tags: ['convenience'] },
    { num: 7, emoji: '🔧', title: 'All Trades, One Platform', body: 'HVAC, roofing, foundation, plumbing, electrical — all on ProLnk. One account, one history, one trusted network.', tags: ['convenience'] },
    { num: 8, emoji: '📈', title: 'Resale Value Documentation', body: 'Homes with documented service history sell faster and for more. ProLnk Vault data is transferable to the next owner.', tags: ['value', 'documentation'] },
    { num: 9, emoji: '🚨', title: 'Emergency Priority Routing', body: 'Platform members get priority routing in emergency situations. Your request goes to available Charter pros first.', tags: ['convenience', 'emergency'] },
    { num: 10, emoji: '🗺️', title: 'DFW-Specific Knowledge', body: 'Our pros know DFW clay soil, hail patterns, summer HVAC loads, and permitting requirements. No learning curve for your local conditions.', tags: ['trust', 'local'] },
  ];

  const concerns = [
    ['', '🌟 All Reasons'],
    ['trust', '🛡️ Trust & Verification'],
    ['value', '💰 Value & Savings'],
    ['convenience', '⚡ Convenience'],
    ['documentation', '📋 Documentation'],
    ['emergency', '🚨 Emergency'],
    ['local', '🗺️ Local Expertise'],
  ];

  const filtered = concern ? reasons.filter(r => r.tags.includes(concern)) : reasons;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>
            Top 10 Reasons to Join ProLnk
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW Homeowners & Pros — 2026 Edition</p>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>🎯 What Matters Most to You?</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {concerns.map(([val, label]) => (
              <button key={val} onClick={() => setConcern(val)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  backgroundColor: concern === val ? '#F5E642′ : '#1a2d50', color: concern === val ? '#0A1628' : '#94a3b8' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {filtered.map((r) => (
            <div key={r.num} style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                {r.num}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{r.emoji} {r.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{r.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2d50', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px solid #F5E642′ }}>
          <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Ready to Join DFW's Most Trusted Pro Network?</p>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Charter waitlist is open — limited spots for DFW pros and homeowners.</p>
          <a href='https://prolnk.io' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Join ProLnk Waitlist →
          </a>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 20 }}>
          ProLnk · DFW's Verified Home Services Network · 2026
        </p>
      </div>
    </div>
  );
}