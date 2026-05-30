import { useState } from 'react';

type StakeholderType = 'homeowner' | 'partner' | 'pro';

const PAIN_POINTS: Record<StakeholderType, string[]> = {
  homeowner: [
    'Spam calls after requesting a quote',
    'No idea if the contractor is trustworthy',
    'Can\’t compare prices easily',
    'Contractors don\’t show up',
    'Overcharged with no recourse',
  ],
  partner: [
    'Hard to grow passive income',
    'No recurring revenue from referrals',
    'No tools to build a network',
    'Platforms take too much commission',
    'No origination rights on clients I bring',
  ],
  pro: [
    'Too many unqualified leads',
    'Lead aggregators charge too much',
    'No loyalty for long-term customers',
    'Hard to differentiate from competitors',
    'No visibility into match quality before buying',
  ],
};

const SOLUTIONS: Record<StakeholderType, Record<string, string>> = {
  homeowner: {
    'Spam calls after requesting a quote': '🚫 ProLnk never sells your number. One match request = vetted responses only, no call centers.',
    'No idea if the contractor is trustworthy': '✅ Every pro is license-verified, background-checked, and reviewed by DFW homeowners like you.',
    'Can\’t compare prices easily': '📊 Transparent quote comparison — side-by-side pricing, scope, and timeline before you decide.',
    'Contractors don\’t show up': '📱 Real-time confirmation + GPS tracking so you know exactly when your pro arrives.',
    'Overcharged with no recourse': '🛡️ ProLnk guarantee: dispute resolution and rebooking at no extra cost if something goes wrong.',
  },
  partner: {
    'Hard to grow passive income': '💰 5 income streams — direct commission, network override, subscription share, homeowner leads, origination rights.',
    'No recurring revenue from referrals': '🔁 Earn monthly on every pro subscription your network generates — forever.',
    'No tools to build a network': '📈 Partner dashboard with real-time leaderboard, earnings tracker, and downline visibility.',
    'Platforms take too much commission': '🤝 Partners keep 60% of job value. No platform clawback, no hidden deductions.',
    'No origination rights on clients I bring': '📜 Charter Partners lock origination rights permanently — the homes you bring earn you revenue for life.',
  },
  pro: {
    'Too many unqualified leads': '🎯 AI-matched leads based on your trade, service area, capacity, and review score. No junk.',
    'Lead aggregators charge too much': '💸 ProLnk charges per match only — no monthly fees until you\’re earning.',
    'No loyalty for long-term customers': '⭐ Repeat homeowner bookings are routed back to the same pro. Your reputation compounds.',
    'Hard to differentiate from competitors': '🏆 TrustyPro Pro profile highlights your specialties, reviews, and response rate to homeowners.',
    'No visibility into match quality before buying': '👁️ Preview match score and homeowner rating before accepting a lead.',
  },
};

export default function DFWProLnkValueProposition() {
  const [stakeholder, setStakeholder] = useState<StakeholderType>('homeowner');
  const [painPoint, setPainPoint] = useState('');
  const [solution, setSolution] = useState('');

  function showSolution() {
    if (painPoint && SOLUTIONS[stakeholder][painPoint]) {
      setSolution(SOLUTIONS[stakeholder][painPoint]);
    }
  }

  function handleStakeholderChange(s: StakeholderType) {
    setStakeholder(s);
    setPainPoint('');
    setSolution('');
  }

  const LABELS: Record<StakeholderType, string> = { homeowner: '🏠 Homeowner', partner: '🤝 Partner / Networker', pro: '🔧 Service Pro' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌟</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>Why ProLnk for DFW</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>The complete ProLnk value proposition — for every person in the DFW home services ecosystem.</p>
        </div>
        <div style={{ background: '#0f2039', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <span style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 10 }}>👤 I am a...</span>
            <div style={{ display: 'flex', gap: 10 }}>
              {(Object.keys(LABELS) as StakeholderType[]).map(s => (
                <button key={s} onClick={() => handleStakeholderChange(s)}
                  style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: `2px solid ${stakeholder === s ? '#F5E642' : '#1e3a5f'}`, background: stakeholder === s ? '#1a2f50' : '#0A1628', color: stakeholder === s ? '#F5E642' : '#94a3b8', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                  {LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ color: '#F5E642', fontSize: 13 }}>😤 My biggest frustration is...</span>
            <select value={painPoint} onChange={e => setPainPoint(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: painPoint ? '#fff' : '#64748b', fontSize: 14 }}>
              <option value="">Select your pain point...</option>
              {PAIN_POINTS[stakeholder].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <button onClick={showSolution} disabled={!painPoint}
            style={{ width: '100%', padding: '13px 0', background: painPoint ? '#F5E642' : '#1e3a5f', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: painPoint ? 'pointer' : 'default' }}>
            Show ProLnk Solution
          </button>
        </div>
        {solution && (
          <div style={{ background: '#0f2039', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 16 }}>✅ ProLnk's Answer</h3>
            <p style={{ color: '#fff', fontSize: 15, lineHeight: 1.6 }}>{solution}</p>
          </div>
        )}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[['🆓', 'Free for Homeowners', 'No cost to request quotes ever'], ['🛡️', 'Vetted Every Pro', 'Licensed, background-checked'], ['💰', '5 Income Streams', 'For partners who build the network']].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f2039', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, margin: '6px 0 4px' }}>{title}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
