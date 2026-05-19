import { useState } from 'react';

type Concern = 'cost' | 'quality' | 'trust' | 'scale' | 'competition';

const DIFFERENTIATORS = [
  {
    emoji: '💵',
    title: 'Match-Only Revenue Model',
    tagline: 'We earn when you earn. Not before.',
    detail: 'Most platforms charge per lead — win or lose. ProLnk charges only when a match converts. This aligns the platform’s incentive with yours. We are structurally motivated to send you only serious, qualified matches.',
    addresses: ['cost', 'trust'] as Concern[],
  },
  {
    emoji: '🗄️',
    title: 'Home Health Vault Data Moat',
    tagline: 'The most comprehensive home data asset in DFW — and it compounds.',
    detail: 'Every job completed adds to the Vault. AI learns from every match. The data advantage grows with time and cannot be replicated by a new entrant — they would need years of DFW-specific job history to catch up.',
    addresses: ['competition', 'scale'] as Concern[],
  },
  {
    emoji: '🔗',
    title: '4-Level Cascade Network',
    tagline: 'Partners who build loyalty cannot be poached.',
    detail: 'When your income depends on the success of the people you brought in, you don’t leave. The cascade creates a self-reinforcing loyalty structure that no competitor can dissolve with a better commission rate.',
    addresses: ['competition', 'trust'] as Concern[],
  },
  {
    emoji: '🌆',
    title: 'Texas Home-Field Advantage',
    tagline: 'DFW first. Deep before wide.',
    detail: 'ProLnk launched in DFW with local partnerships, contractor relationships, and homeowner trust built on the ground. National platforms optimize for breadth. We optimize for depth — and DFW depth is unbeatable.',
    addresses: ['quality', 'trust'] as Concern[],
  },
  {
    emoji: '🤖',
    title: 'AI-Native Architecture',
    tagline: '47 autonomous agents. The platform runs itself.',
    detail: 'Matching, onboarding, scoring, payouts, and compliance are all AI-automated. As volume grows, cost stays flat. The unit economics improve with scale — the opposite of human-staffed competitors.',
    addresses: ['scale', 'cost'] as Concern[],
  },
];

const CONCERN_LABELS: Record<Concern, string> = {
  cost: '💸 I worry about cost',
  quality: '🏆 I worry about quality',
  trust: '🤝 I worry about trust',
  scale: '📈 I worry about scale',
  competition: '⚔️ I worry about competitors',
};

export default function DFWProLnkDifferentiatorsGuide() {
  const [concern, setConcern] = useState<Concern>('cost');

  const relevant = DIFFERENTIATORS.filter(d => d.addresses.includes(concern));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk Differentiators</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>What makes ProLnk impossible to replicate — and which one addresses your concern.</p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12, textAlign: 'center' }}>What's your biggest concern?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {(Object.keys(CONCERN_LABELS) as Concern[]).map(c => (
              <button key={c} onClick={() => setConcern(c)}
                style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: concern === c ? '#F5E642′ : '#1e3a5f', color: concern === c ? '#0A1628' : '#94a3b8' }}>
                {CONCERN_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Differentiators that address this →</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {relevant.map(d => (
              <div key={d.title} style={{ background: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{d.emoji}</div>
                <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 17, marginBottom: 4 }}>{d.title}</div>
                <div style={{ color: '#e2e8f0', fontStyle: 'italic', fontSize: 14, marginBottom: 12 }}>{d.tagline}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{d.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>All 5 differentiators reinforce each other. Together they form a moat no competitor can cross in under 5 years.</div>
        </div>
      </div>
    </div>
  );
}
