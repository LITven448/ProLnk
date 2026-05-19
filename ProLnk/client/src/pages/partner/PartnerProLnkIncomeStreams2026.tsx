import { useState } from 'react';

const TIERS = ['Just Starting (0–9 matches)', 'Building (10–49 matches)', 'Growing (50–99 matches)', 'Established (100–499 matches)', 'Top Producer (500+ matches)'];
const ACTIVITY = ['Passive (< 5 hrs/week)', 'Part-Time (5–15 hrs/week)', 'Full-Time (15+ hrs/week)'];

const streamStatus = [
  { id: 1, name: 'Direct Commission', emoji: '💰', status: 'LIVE', desc: 'Earn 12–70% of match value. Rate climbs with your match count. Every match you complete right now builds toward higher tiers.' },
  { id: 2, name: 'Pro 4-Level Override', emoji: '🌲', status: 'LIVE', desc: 'Earn 1% on pros you recruit, 0.5% on their recruits, and so on 4 levels deep. Every pro you bring in generates passive income forever.' },
  { id: 3, name: 'Subscription Override', emoji: '🔄', status: 'LIVE', desc: 'Earn 10% recurring on every $149/mo subscription from pros you refer. One pro = $179/year in passive income, every year they stay.' },
  { id: 4, name: 'Homeowner Override', emoji: '🏠', status: 'LIVE', desc: 'Earn $25–100 per qualified homeowner lead you bring in. You negotiate the per-lead rate directly. Volume = predictable income.' },
  { id: 5, name: 'Home Origination Rights', emoji: '🏛️', status: 'COMING SOON', desc: 'Permanent share of all platform fees from homes you add to the Home Health Vault. One-time action, lifetime income. Launching with full platform.' },
];

const focusMap: Record<string, Record<string, { active: number[]; focus: string[] }>> = {
  'Just Starting (0–9 matches)': {
    'Passive (< 5 hrs/week)': { active: [4], focus: ['Bring in 2–3 homeowners this week to activate Stream 4', 'Each homeowner adds immediate per-lead income with no match required', 'Sign up 1 pro to start Stream 3 recurring income'] },
    'Part-Time (5–15 hrs/week)': { active: [3, 4], focus: ['Recruit 2–3 pros to build your Stream 3 base', 'Add homeowners to activate Stream 4', 'Complete first match to begin Stream 1 progression'] },
    'Full-Time (15+ hrs/week)': { active: [1, 3, 4], focus: ['Target 5+ matches this month to accelerate toward Tier 2 (20%)', 'Recruit 5+ pros — your 10% recurring compounds fast', 'Add as many homeowners as you can — per-lead income funds your ramp'] },
  },
  'Building (10–49 matches)': {
    'Passive (< 5 hrs/week)': { active: [2, 3], focus: ['Your recruited pros are now generating passive income — focus on adding more', 'Stream 2 cascade is building — every pro your recruits bring in earns you 0.5%', 'Maintain homeowner pipeline for Stream 4 income between matches'] },
    'Part-Time (5–15 hrs/week)': { active: [1, 2, 3, 4], focus: ['All 4 active streams are running — optimize each', 'Push for 50 total matches to unlock Tier 3 (35%) — that\’s a 75% pay increase', 'Recruit pros into your downline while you still have the Charter advantage'] },
    'Full-Time (15+ hrs/week)': { active: [1, 2, 3, 4], focus: ['Sprint to 50 matches — Tier 3 is a massive jump in per-match income', 'Your recruiting window is most powerful now — Charter tier closes at 500 apps', 'Document your process to train recruits — leverage multiplies everything'] },
  },
  'Growing (50–99 matches)': {
    'Passive (< 5 hrs/week)': { active: [2, 3], focus: ['At Tier 3 (35%), your downline override income is substantial — prioritize recruiting', 'Stream 2 and 3 are your focus — they require no active matching', 'Review your 4-level downline: who is producing, who needs support'] },
    'Part-Time (5–15 hrs/week)': { active: [1, 2, 3, 4], focus: ['Push for 100 matches — Tier 4 (50%) is a 43% income increase per match', 'Train your most active recruits to accelerate downline productivity', 'Add homeowners strategically in high-need categories for better per-lead rates'] },
    'Full-Time (15+ hrs/week)': { active: [1, 2, 3, 4], focus: ['100 matches in sight — go all-in on Stream 1 income increase', 'Your downline should be generating income while you sleep', 'Start planning Stream 5: identify homeowners to add to the Vault at launch'] },
  },
  'Established (100–499 matches)': {
    'Passive (< 5 hrs/week)': { active: [2, 3], focus: ['At 50% direct commission, even occasional matches generate strong income', 'Focus entirely on downline growth — recruit actively or train recruiters in your network', 'Prepare for Stream 5 launch — identify 10+ homeowners to add to Vault'] },
    'Part-Time (5–15 hrs/week)': { active: [1, 2, 3, 4], focus: ['Tier 4 (50%) is exceptional — maintain match cadence', '500 matches = Tier 5 (70%) — the top tier is within reach', 'Your downline is producing — track and optimize your 4-level cascade'] },
    'Full-Time (15+ hrs/week)': { active: [1, 2, 3, 4], focus: ['500 matches = Tier 5 (70%) — this is the income ceiling, go get it', 'Build and document a recruiting system — you\’re becoming a leader', 'Position yourself for Stream 5 origination rights at scale'] },
  },
  'Top Producer (500+ matches)': {
    'Passive (< 5 hrs/week)': { active: [2, 3, 5], focus: ['At 70%, even passive matching is high-yield', 'Stream 2 cascade at your level is significant — maintain downline health', 'Stream 5 origination rights will compound for years — max it early'] },
    'Part-Time (5–15 hrs/week)': { active: [1, 2, 3, 4, 5], focus: ['All 5 streams active — you\’re at full income potential', 'Mentorship and recruiting now multiplies income faster than personal matching', 'Document your system — it\’s your most valuable asset'] },
    'Full-Time (15+ hrs/week)': { active: [1, 2, 3, 4, 5], focus: ['You are the proof of concept — lead with your results', 'Build a team of Charter recruits before waitlist closes', 'Stream 5 origination rights will be your most durable long-term income'] },
  },
};

export default function PartnerProLnkIncomeStreams2026() {
  const [tier, setTier] = useState(TIERS[0]);
  const [activity, setActivity] = useState(ACTIVITY[0]);

  const focus = focusMap[tier]?.[activity];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💎</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>ProLnk Income Streams 2026</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>All 5 streams — current status, what's live now, and what to maximize based on where you are.</p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {streamStatus.map(s => (
            <div key={s.id} style={{ background: '#fff', borderRadius: 10, padding: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{s.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: '#0A1628', fontSize: 15 }}>Stream {s.id}: {s.name}</span>
                  <span style={{ background: s.status === 'LIVE' ? '#D1FAE5′ : '#FEF3C7', color: s.status === ’LIVE' ? '#065F46′ : '#92400E', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{s.status}</span>
                </div>
                <p style={{ color: '#64748B', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎯 Your Personalized Focus Plan</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 6 }}>Current Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, color: '#0A1628′ }}>
                {TIERS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#64748B', marginBottom: 6 }}>Activity Level</label>
              <select value={activity} onChange={e => setActivity(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, color: '#0A1628′ }}>
                {ACTIVITY.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {focus && (
            <>
              <div style={{ marginBottom: 16 }}>
                <p style={{ color: '#64748B', fontSize: 13, marginBottom: 8 }}>Active streams for you right now:</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {streamStatus.filter(s => focus.active.includes(s.id)).map(s => (
                    <span key={s.id} style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>{s.emoji} Stream {s.id}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ color: '#64748B', fontSize: 13, marginBottom: 8 }}>Where to focus this week:</p>
                {focus.focus.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <p style={{ color: '#334155', margin: 0, fontSize: 14, lineHeight: 1.5 }}>{f}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
