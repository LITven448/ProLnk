import { useState } from 'react';

const TIERS = ['Charter', 'Founding'];
const TIERS_DATA: Record<string, { sub: number; directRate: number; l1: number; l2: number; l3: number; l4: number; subOverride: number; homeowner: number; originRate: number }> = {
  Charter: { sub: 149, directRate: 0.12, l1: 0.07, l2: 0.04, l3: 0.02, l4: 0.01, subOverride: 0.10, homeowner: 50, originRate: 0.015 },
  Founding: { sub: 149, directRate: 0.12, l1: 0.07, l2: 0.04, l3: 0.02, l4: 0.01, subOverride: 0.10, homeowner: 50, originRate: 0.010 },
};

export default function PartnerIncomeStreamsDeepDive() {
  const [tier, setTier] = useState('Charter');
  const [jobsPerMonth, setJobsPerMonth] = useState(8);
  const [avgJobValue, setAvgJobValue] = useState(1400);
  const [l1Network, setL1Network] = useState(5);
  const [homesOriginated, setHomesOriginated] = useState(12);

  const t = TIERS_DATA[tier];
  const l2 = Math.floor(l1Network * 2);
  const l3 = Math.floor(l1Network * 4);
  const l4 = Math.floor(l1Network * 8);

  const s1 = Math.round(jobsPerMonth * avgJobValue * t.directRate);
  const s2 = Math.round((l1Network * avgJobValue * t.l1 + l2 * avgJobValue * t.l2 + l3 * avgJobValue * t.l3 + l4 * avgJobValue * t.l4) * jobsPerMonth * 0.6);
  const s3 = Math.round(l1Network * t.sub * t.subOverride);
  const s4 = Math.round(Math.floor(jobsPerMonth * 0.5) * t.homeowner);
  const s5 = Math.round(homesOriginated * avgJobValue * 0.08 * t.originRate * 12);
  const monthlyTotal = s1 + s2 + s3 + s4 + s5;

  const streams = [
    {
      id: 1, name: 'Direct Commission', emoji: '💼',
      amount: s1,
      color: '#0A1628',
      howItWorks: 'You refer a homeowner who books a service professional through ProLnk. When the job is completed, you earn a percentage of the job match value.',
      rate: `${(t.directRate * 100).toFixed(0)}% of job match value`,
      example: `A $1,400 HVAC job → you earn $${Math.round(1400 * t.directRate)} on that job.`,
      tips: ['Focus on high-value trades — HVAC, plumbing, electrical average $1,200–$2,000/job', 'Higher tier = higher direct commission rate (up to 70% at Tier 5)', 'Volume is key — 8 jobs/month compounds fast with Stream 2'],
    },
    {
      id: 2, name: 'Network Override', emoji: '🌐',
      amount: s2,
      color: '#1E3A5F',
      howItWorks: 'Every pro in your network earns direct commissions. You receive a percentage of THEIR earned commission — 4 levels deep. This is your most powerful compounding stream.',
      rate: `L1: ${(t.l1 * 100)}% | L2: ${(t.l2 * 100)}% | L3: ${(t.l3 * 100)}% | L4: ${(t.l4 * 100)}%`,
      example: `Your L1 pro earns $168 on a job → you earn $${Math.round(168 * t.l1)}. Times ${l1Network} L1 pros doing jobs = real money.`,
      tips: ['This stream grows without you doing more work', 'A network of 5 → 10 → 20 → 40 (4 levels) generates $000s passively', 'Focus recruiting energy on your first 3 — they build the rest'],
    },
    {
      id: 3, name: 'Subscription Override', emoji: '🔄',
      amount: s3,
      color: '#2D5A8E',
      howItWorks: 'Every pro you recruit pays $149/month for their ProLnk membership. You earn 10% of that subscription every month, recurring, as long as they stay active.',
      rate: `10% × $149/mo × ${l1Network} active pros`,
      example: `${l1Network} pros in your L1 network = $${Math.round(l1Network * 149 * 0.10)}/month in pure recurring subscription income.`,
      tips: ['This income is recurring — it pays even when you\’re on vacation', 'Retention matters — keep your recruits engaged so they stay active', 'At 30 recruited pros this stream alone covers your ProLnk subscription cost 20x'],
    },
    {
      id: 4, name: 'Homeowner Referral Override', emoji: '🏠',
      amount: s4,
      color: '#7C3AED',
      howItWorks: 'When you refer homeowners who register their property on ProLnk, you earn a per-lead fee. This is income for the homeowner side of the two-sided marketplace.',
      rate: '$50 per qualified homeowner referral',
      example: `${Math.floor(jobsPerMonth * 0.5)} homeowner referrals/month = $${Math.floor(jobsPerMonth * 0.5) * 50}/month.`,
      tips: ['Every neighbor with a home is a potential referral', 'Nextdoor and neighborhood Facebook groups are gold for homeowner sourcing', 'Pair with Stream 5 — homeowners you refer become origination rights assets'],
    },
    {
      id: 5, name: 'Origination Rights', emoji: '⚡',
      amount: s5,
      color: '#D97706',
      howItWorks: 'When you help a homeowner register their property in the ProLnk Home Health Vault, you earn a permanent percentage of every job fee generated at that property — forever.',
      rate: `${(t.originRate * 100).toFixed(1)}% of every job value — permanently — on ${homesOriginated} homes`,
      example: `${homesOriginated} homes × avg 3 jobs/year × $1,400 avg → $${Math.round(homesOriginated * 3 * 1400 * t.originRate)}/year in permanent origination income.`,
      tips: ['This is the most durable income stream — it survives even if you stop active recruiting', 'Charter tier earns 1.5% vs Founding\’s 1.0% — a 50% advantage that compounds for life', 'One high-activity home (landlord with maintenance needs) can generate $100s annually alone'],
    },
  ];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>5 Income Streams — Deep Dive</h1>
          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: 600, margin: '0 auto' }}>
            Every stream explained with real math, examples, and a live projection based on your activity.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 Income Projection Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Your Tier', isSelect: true, value: tier, options: TIERS, onChange: setTier },
              { label: 'Jobs You Refer/Month', isInput: true, value: jobsPerMonth, onChange: setJobsPerMonth },
              { label: 'Avg Job Value ($)', isInput: true, value: avgJobValue, onChange: setAvgJobValue },
              { label: 'L1 Network Size', isInput: true, value: l1Network, onChange: setL1Network },
              { label: 'Homes Originated', isInput: true, value: homesOriginated, onChange: setHomesOriginated },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{field.label}</label>
                {field.isSelect ? (
                  <select value={field.value as string} onChange={e => (field.onChange as (v: string) => void)(e.target.value)}
                    style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 13 }}>
                    {(field.options || []).map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type="number" value={field.value as number} onChange={e => (field.onChange as (v: number) => void)(Number(e.target.value))}
                    style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 13, boxSizing: 'border-box' }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ background: '#F5E642', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>PROJECTED MONTHLY INCOME</div>
            <div style={{ fontSize: 44, fontWeight: 800 }}>${monthlyTotal.toLocaleString()}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>= ${(monthlyTotal * 12).toLocaleString()}/year annualized</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {streams.map(stream => (
            <div key={stream.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
              <div style={{ background: stream.color, color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 600 }}>STREAM {stream.id}</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{stream.emoji} {stream.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 32, fontWeight: 800 }}>${stream.amount.toLocaleString()}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>est. monthly</div>
                </div>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#374151', marginBottom: 12 }}>{stream.howItWorks}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 4 }}>YOUR RATE</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{stream.rate}</div>
                  </div>
                  <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 4 }}>EXAMPLE</div>
                    <div style={{ fontSize: 13 }}>{stream.example}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 6 }}>PRO TIPS</div>
                  {stream.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                      <span style={{ color: '#F5E642', background: stream.color, borderRadius: '50%', width: 16, height: 16,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: '#374151' }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>All 5 streams run simultaneously.</div>
          <p style={{ color: '#9CA3AF', marginBottom: 20 }}>Every job you refer activates Streams 1, 2, and 5. Every pro you recruit activates Streams 2 and 3. Every homeowner activates Streams 4 and 5.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15,
            padding: '14px 32px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Start Earning All 5 Streams →
          </button>
        </div>
      </div>
    </div>
  );
}
