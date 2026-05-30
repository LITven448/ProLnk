import { useState } from 'react';

const painPoints = [
  {
    emoji: '💸',
    problem: 'Pay to bid — no guarantee',
    thumbtack: 'Pay $8–$40 per lead before you even talk to the homeowner. No refunds if they ghost you.',
    prolnk: 'Zero upfront lead fees. You only pay a commission when the job closes — 28% of match value.',
  },
  {
    emoji: '🎲',
    problem: 'Leads that never convert',
    thumbtack: 'Thumbtack sells the same lead to 3–5 pros simultaneously. Race to the bottom on price.',
    prolnk: 'AI-matched leads come pre-qualified by trade, territory, and availability. No bidding wars.',
  },
  {
    emoji: '📉',
    problem: 'No passive income',
    thumbtack: 'Every dollar you earn requires active work. No residual, no override, no network.',
    prolnk: '4-level cascade pays you on every pro you recruit — and their recruits — indefinitely.',
  },
  {
    emoji: '🤖',
    problem: 'No AI or tech advantage',
    thumbtack: 'You upload photos manually. No AI analysis. No defect detection. No smart routing.',
    prolnk: 'Photo-to-lead AI detects issues from job photos and routes new leads automatically.',
  },
  {
    emoji: '🔓',
    problem: 'Unverified competition',
    thumbtack: 'Background checks optional. Homeowners can’t tell the good from the fly-by-night.',
    prolnk: 'Every ProLnk partner is licensed, insured, and background-checked before lead #1.',
  },
];

const comparison = [
  { feature: 'Lead fees', prolnk: '$0 upfront', thumbtack: '$8–$40 per lead' },
  { feature: 'Commission structure', prolnk: '60% keep on job value', thumbtack: 'N/A — you set your price' },
  { feature: 'Passive income', prolnk: '4-level cascade ♾️', thumbtack: 'None' },
  { feature: 'Photo-to-lead AI', prolnk: '✅ Yes', thumbtack: '❌ No' },
  { feature: 'Background check', prolnk: '✅ Required', thumbtack: '⚠️ Optional' },
  { feature: 'Network income', prolnk: '✅ Yes', thumbtack: '❌ No' },
  { feature: 'Monthly cost', prolnk: '$149/mo (locked)', thumbtack: '$0 (but pay per lead)' },
  { feature: 'Lead exclusivity', prolnk: 'AI-matched to you', thumbtack: 'Sold to 3–5 pros' },
  { feature: 'Verification badge', prolnk: '✅ Licensed + insured', thumbtack: 'Self-reported' },
];

export default function ProLnkVsThumbtack() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1B2A4A', color: '#fff', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#F5C842', color: '#1B2A4A', borderRadius: 6, padding: '4px 14px', fontWeight: 700, fontSize: 13, marginBottom: 18 }}>
          COMPARISON
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 46px)', fontWeight: 800, margin: '0 0 16px' }}>
          ProLnk vs. Thumbtack
        </h1>
        <p style={{ fontSize: 19, opacity: 0.85, maxWidth: 600, margin: '0 auto' }}>
          Why Home Service Pros Are Switching — and Never Looking Back
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 24 }}>
          💢 The Real Cost of Thumbtack
        </h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 56 }}>
          {painPoints.map((p, i) => (
            <div
              key={i}
              style={{ background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer' }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{p.emoji}</span>
                <div style={{ fontWeight: 700, color: '#1B2A4A', fontSize: 17 }}>{p.problem}</div>
                <span style={{ marginLeft: 'auto', color: '#888', fontSize: 20 }}>{expanded === i ? '▲' : '▼'}</span>
              </div>
              {expanded === i && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
                  <div style={{ background: '#FFF4F4', borderRadius: 8, padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: '#C0392B', fontSize: 13, marginBottom: 8 }}>THUMBTACK</div>
                    <div style={{ color: '#333', fontSize: 15 }}>{p.thumbtack}</div>
                  </div>
                  <div style={{ background: '#F0FFF4', borderRadius: 8, padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: '#2A7A3B', fontSize: 13, marginBottom: 8 }}>PROLNK</div>
                    <div style={{ color: '#333', fontSize: 15 }}>{p.prolnk}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 20 }}>📊 Side-by-Side Comparison</h2>
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#1B2A4A', color: '#fff', padding: '14px 20px', fontWeight: 700, fontSize: 14 }}>
            <div>FEATURE</div>
            <div style={{ color: '#F5C842' }}>PROLNK</div>
            <div style={{ opacity: 0.6 }}>THUMBTACK</div>
          </div>
          {comparison.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 20px',
                background: i % 2 === 0 ? '#F8F9FC' : '#fff',
                borderBottom: '1px solid #EEE', fontSize: 15,
              }}
            >
              <div style={{ fontWeight: 600, color: '#333' }}>{row.feature}</div>
              <div style={{ color: '#2A7A3B', fontWeight: 600 }}>{row.prolnk}</div>
              <div style={{ color: '#888' }}>{row.thumbtack}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 16 }}>🧮 Real Math: 10 Leads / Month</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 56 }}>
          <div style={{ background: '#FFF4F4', borderRadius: 14, padding: '28px', border: '2px solid #F1948A' }}>
            <div style={{ fontWeight: 800, color: '#C0392B', fontSize: 17, marginBottom: 16 }}>❌ Thumbtack</div>
            <div style={{ color: '#333', fontSize: 15, lineHeight: 1.8 }}>
              <div>10 leads × $8–40 = <strong>$80–$400</strong> in lead fees</div>
              <div>Industry close rate: 20–30%</div>
              <div>Avg job: $500</div>
              <div style={{ borderTop: '1px solid #F1948A', marginTop: 12, paddingTop: 12 }}>
                <strong>Closed 2–3 jobs = $1,000–$1,500</strong><br />
                Minus $80–400 in fees before job 1<br />
                <strong style={{ color: '#C0392B' }}>Net: ~$700–$1,200</strong>
              </div>
            </div>
          </div>
          <div style={{ background: '#F0FFF4', borderRadius: 14, padding: '28px', border: '2px solid #58D68D' }}>
            <div style={{ fontWeight: 800, color: '#2A7A3B', fontSize: 17, marginBottom: 16 }}>✅ ProLnk</div>
            <div style={{ color: '#333', fontSize: 15, lineHeight: 1.8 }}>
              <div>10 AI-matched leads × $0 upfront</div>
              <div>Higher close rate (pre-qualified): 40%+</div>
              <div>Avg job: $700</div>
              <div style={{ borderTop: '1px solid #58D68D', marginTop: 12, paddingTop: 12 }}>
                <strong>Closed 4 jobs = $2,800 gross</strong><br />
                60% keep = $2,016<br />
                Minus $149/mo sub = <strong style={{ color: '#2A7A3B' }}>$1,867 net</strong><br />
                <em>Plus network income on top</em>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '48px 24px', background: '#1B2A4A', borderRadius: 16 }}>
          <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            Stop paying to bid. Start earning on every match.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            ProLnk partners earn more per job, build passive income, and never pay upfront for leads. Join before the waitlist closes.
          </p>
          <a
            href="/apply"
            style={{
              background: '#F5C842', color: '#1B2A4A', fontWeight: 800,
              padding: '16px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 17,
            }}
          >
            Apply as a Pro — It's Free to Start →
          </a>
        </div>
      </div>
    </div>
  );
}
