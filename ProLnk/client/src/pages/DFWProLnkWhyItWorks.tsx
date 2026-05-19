import { useState } from 'react';

const PROBLEMS = [
  {
    id: 'angi',
    platform: 'Angi / HomeAdvisor',
    icon: '❌',
    problem: 'Pay-per-lead model — contractors pay whether or not they win the job',
    consequence: 'Contractors recoup lead costs by quoting high, rushing jobs, or ignoring leads. You get 4–6 calls from strangers competing for volume, not quality.',
    prolnkFix: 'ProLnk uses match-only — contractors only pay when a homeowner selects them. Quality matters because bad work means no matches.',
    proofPoint: 'Angi charges $15–$85 per lead. A contractor needs to win 1 in 10 leads to break even — so they churn through homeowners to hit volume.',
  },
  {
    id: 'thumbtack',
    platform: 'Thumbtack',
    icon: '❌',
    problem: 'Bidding marketplace — lowest price wins, not best contractor',
    consequence: 'Race-to-the-bottom pricing attracts cut-rate operators. Vetted, licensed pros refuse to compete on price against unvetted bidders.',
    prolnkFix: 'ProLnk matches on fit — trade, service area, availability, and rating — not lowest bid. Premium pros can charge premium prices.',
    proofPoint: 'Thumbtack\’s own data shows 60%+ of pros on their platform never complete a job. You are bidding against ghost accounts.',
  },
  {
    id: 'nextdoor',
    platform: 'Nextdoor Recommendations',
    icon: '❌',
    problem: 'No vetting, no accountability — just neighbor opinions',
    consequence: 'Recommendations are based on who someone\’s cousin knows. No license verification, no insurance check, no performance tracking.',
    prolnkFix: 'ProLnk verifies licensing, insurance, and trade certification before any pro appears in your match pool. Every match is accountable.',
    proofPoint: 'In DFW, unlicensed contractors caused $2.3B in property damage in 2023 — most sourced through informal referrals.',
  },
  {
    id: 'google',
    platform: 'Google / Yelp Search',
    icon: '❌',
    problem: 'No accountability — anyone can buy ads or fake reviews',
    consequence: 'Top Google results are paid placements. Yelp reviews can be gamed. There is no mechanism to remove a bad actor who bought their way to the top.',
    prolnkFix: 'ProLnk\’s match rank is driven by verified match outcomes — homeowner satisfaction scores, completion rate, and repeat requests.',
    proofPoint: 'The FTC logged 110,000+ fake contractor review complaints in 2024. Google Local Services ads still show suspended businesses.',
  },
  {
    id: 'referral',
    platform: 'Word-of-Mouth Referrals',
    icon: '⚠️',
    problem: 'Works great — but limited scale and no verification',
    consequence: 'Your brother-in-law\’s plumber might be great for him. But you have no idea if they are licensed in your county, insured, or available for your job type.',
    prolnkFix: 'ProLnk digitizes the referral trust signal. Verified reviews, verified license, verified insurance — referral quality at internet scale.',
    proofPoint: 'ProLnk homeowners get the same trust level as a personal referral, with the coverage of a national platform.',
  },
];

export default function DFWProLnkWhyItWorks() {
  const [active, setActive] = useState<string | null>(null);

  const selected = PROBLEMS.find(p => p.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40 }}>🔗</div>
          <h1 style={{ color: '#F5E642', fontSize: 30, margin: '8px 0′ }}>Why ProLnk Works</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Unlike every other platform, ProLnk aligns incentives between homeowners and contractors from the start.
            Select a platform to see the problem — and how ProLnk solves it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 32 }}>
          {PROBLEMS.map(p => (
            <button key={p.id} onClick={() => setActive(active === p.id ? null : p.id)}
              style={{
                background: active === p.id ? '#F5E642′ : '#0f2038',
                color: active === p.id ? '#0A1628′ : '#fff',
                border: active === p.id ? 'none' : '1px solid #1e3a5f',
                borderRadius: 12, padding: '14px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'center', transition: 'all 0.2s',
              }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
              {p.platform}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ animation: 'fadeIn 0.2s' }}>
            <div style={{ background: '#1a0a0a', borderRadius: 16, padding: 28, marginBottom: 20, borderLeft: '4px solid #ef4444′ }}>
              <h2 style={{ color: '#ef4444', marginBottom: 8, fontSize: 20 }}>The Problem with {selected.platform}</h2>
              <p style={{ color: '#fca5a5', fontWeight: 600, fontSize: 16, marginBottom: 12 }}>{selected.problem}</p>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 12 }}>{selected.consequence}</p>
              <div style={{ background: '#2a0a0a', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#f97316′ }}>
                📊 {selected.proofPoint}
              </div>
            </div>

            <div style={{ background: '#0a2a0a', borderRadius: 16, padding: 28, marginBottom: 20, borderLeft: '4px solid #22c55e' }}>
              <h2 style={{ color: '#22c55e', marginBottom: 12, fontSize: 20 }}>✅ How ProLnk Fixes This</h2>
              <p style={{ color: '#86efac', lineHeight: 1.7, fontSize: 16 }}>{selected.prolnkFix}</p>
            </div>
          </div>
        )}

        {!selected && (
          <div style={{ background: '#0f2038', borderRadius: 16, padding: 32 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 22 }}>The ProLnk Difference</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                { icon: '🏆', title: 'Match-Only Payment', desc: 'Contractors pay only when selected. Quality is the only path to revenue.' },
                { icon: '🔍', title: 'Verified Licensing & Insurance', desc: 'Every pro is verified before entering the match pool. No exceptions.' },
                { icon: '📊', title: 'Outcome-Based Ranking', desc: 'Match rank is driven by verified job completion and homeowner satisfaction — not ad spend.' },
                { icon: '🤝', title: 'Aligned Incentives', desc: 'ProLnk only makes money when good matches happen. We win when you win.' },
                { icon: '🗺️', title: 'DFW-Specific Expertise', desc: 'Contractors vetted for North Texas licensing, hail damage work, foundation repair, and slab plumbing.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16, background: '#0A1628', borderRadius: 10 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
