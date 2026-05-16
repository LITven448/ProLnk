import { useState } from 'react';

const teamSizes = [
  { label: '1-5 partners (you are the doer)', key: 'tiny' },
  { label: '6-20 partners (emerging leader)', key: 'small' },
  { label: '21-60 partners (building a team)', key: 'medium' },
  { label: '61-150 partners (leading leaders)', key: 'large' },
];

const challenges = [
  { label: 'Partners are not recruiting anyone', key: 'norecruit' },
  { label: 'Partners sign up but go silent', key: 'ghosting' },
  { label: 'I am doing all the work myself', key: 'doingitall' },
  { label: 'Team morale is low / people are quitting', key: 'morale' },
  { label: 'My top partner is underperforming', key: 'topunder' },
];

const guidance: Record<string, { priority: string; action: string; insight: string }> = {
  tiny_norecruit: {
    priority: 'Teach by example — you recruit one person in front of them',
    action: 'Do a live recruiting call with your partner watching. Debrief immediately after. Show it works before expecting them to do it.',
    insight: 'At this stage, leadership means modeling, not managing. They need to see you do it first.',
  },
  tiny_ghosting: {
    priority: 'Tighten your onboarding — the first 72 hours determine everything',
    action: 'Call every new partner within 24 hours of signup. Give them one small win in the first week. Check in every 3 days for the first month.',
    insight: 'Ghosting happens because new partners have no anchor. Your job is to be that anchor.',
  },
  tiny_doingitall: {
    priority: 'Stop doing tasks your partners can do — even if slower',
    action: 'Pick one task this week and hand it fully to a partner. Accept imperfection. Coach after the fact. Repeat weekly.',
    insight: 'If you do everything yourself, you cap your income at your own hours. Delegation is the only way to scale.',
  },
  tiny_morale: {
    priority: 'Find one thing to celebrate — immediately',
    action: 'Look for any win in your network — a new signup, a homeowner registered, a follow-up made. Celebrate it loudly. Energy follows attention.',
    insight: 'Low morale is usually low visibility of progress. Make progress visible and morale follows.',
  },
  tiny_topunder: {
    priority: 'Have a direct, caring conversation — not a performance review',
    action: 'Ask: what is getting in your way? Listen. Offer one specific form of help. Follow up in 1 week.',
    insight: 'Underperformance is usually a clarity or confidence issue, not a motivation issue.',
  },
  small_norecruit: {
    priority: 'Make recruiting a team sport — create social proof within your group',
    action: 'Share every new partner announcement in your group chat. Create a simple contest: first to recruit someone this week wins a $25 gift card.',
    insight: 'Partners recruit when they see other partners recruiting. Social proof is your most powerful lever.',
  },
  small_ghosting: {
    priority: 'Build a structured 30-day onboarding sequence',
    action: 'Day 1 call. Day 3 check-in text. Day 7 group call. Day 14 individual check-in. Day 30 review. Make it systematic, not ad hoc.',
    insight: 'Retention is won in the first 30 days. Invest there first.',
  },
  small_doingitall: {
    priority: 'Identify your top 2 partners and transfer real responsibility to them',
    action: 'Give each a specific role: one runs the team group, one manages new partner onboarding. Hold them accountable weekly.',
    insight: 'You cannot grow beyond 20 partners without sub-leaders. This transition is non-negotiable.',
  },
  small_morale: {
    priority: 'Host a team call focused entirely on wins and vision — no tactics',
    action: 'Open with the biggest wins of the month. Share the 12-month vision. Ask each person to share one thing they are proud of. Close with energy.',
    insight: 'Tactics drain energy. Vision and wins create it.',
  },
  small_topunder: {
    priority: 'Dig deeper — is this person in the right role?',
    action: 'Have an honest 1:1. Explore what they actually enjoy doing. Reposition them if needed — some people are better at homeowner origination than partner recruiting.',
    insight: 'Not everyone excels at the same activity. Great leaders find the right lane for each person.',
  },
  medium_norecruit: {
    priority: 'Teach your sub-leaders to teach recruiting — second-order leverage',
    action: 'Run a training call on your best recruiting scripts. Record it. Make it a resource your sub-leaders use with their teams.',
    insight: 'At this size, your impact comes from what your sub-leaders teach, not what you do directly.',
  },
  medium_ghosting: {
    priority: 'Build an onboarding system that runs without you',
    action: 'Create a recorded welcome video. Write a 1-page quick start guide. Assign a buddy to every new partner from your existing team.',
    insight: 'Systems replace you. Build them now or you will always be the bottleneck.',
  },
  medium_doingitall: {
    priority: 'You have a delegation problem — and it is actually a trust problem',
    action: 'List every task you did last week. Circle the ones only you can do. Hand the rest to sub-leaders this week. No exceptions.',
    insight: 'Doing everything yourself at this stage means you do not trust your team. That distrust will cap your growth.',
  },
  medium_morale: {
    priority: 'Culture is now a leadership responsibility — not just a mood',
    action: 'Create a recognition system: weekly shoutouts, monthly awards, public leaderboard. Culture is built through repeated rituals, not one-off moments.',
    insight: 'At 21-60 partners, culture becomes a system, not a personality. Build the system.',
  },
  medium_topunder: {
    priority: 'Is this person a leader or a producer? Different coaching for each.',
    action: 'Leaders need vision and accountability. Producers need tools and encouragement. Identify which they are first, then tailor your approach.',
    insight: 'Applying the same coaching to every partner is the most common leadership mistake.',
  },
  large_norecruit: {
    priority: 'Your sub-leaders have a sub-leader problem — go two levels deep',
    action: 'Skip-level conversations: talk directly to partners 2 levels below you. Find out what barriers your sub-leaders are not surfacing. Fix the root cause.',
    insight: 'At your scale, problems two levels below you determine your growth ceiling.',
  },
  large_ghosting: {
    priority: 'Onboarding is now a product, not a process',
    action: 'Build a complete onboarding curriculum: video series, written guides, a 30-day milestone track. Assign a dedicated onboarding role in your team.',
    insight: 'At 61-150 partners, every new person should feel like they joined a professional organization, not a side hustle.',
  },
  large_doingitall: {
    priority: 'You have a structural problem — you need to reorganize your leadership team',
    action: 'Map your org: who reports to whom? Are spans of control too wide? Add a layer of leadership if needed. Formalize the structure.',
    insight: 'Leaders of leaders cannot also be individual contributors. Something has to give.',
  },
  large_morale: {
    priority: 'At your scale, morale is a communication problem',
    action: 'Increase transparency: share network metrics monthly with your full team. Show the trajectory. People stay when they see momentum and feel included.',
    insight: 'Large networks drift when people lose sight of the mission. Keep the mission visible.',
  },
  large_topunder: {
    priority: 'This is a strategic decision, not a coaching conversation',
    action: 'Is this person in the right seat? Can they be repositioned? Is this a skill gap or a will gap? Decide and act — do not delay. Indecision is the real cost.',
    insight: 'At your level, one underperforming sub-leader holds back hundreds of people below them.',
  },
};

export default function PartnerLeadershipDevelopmentGuide2() {
  const [teamSize, setTeamSize] = useState('');
  const [challenge, setChallenge] = useState('');
  const key = teamSize && challenge ? `${teamSize}_${challenge}` : null;
  const result = key && guidance[key] ? guidance[key] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🧠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Leadership Development Guide</h1>
          <p style={{ color: '#4B5563', fontSize: 16, lineHeight: 1.6 }}>
            The biggest shift in network income is from doing to leading. Every skill you develop here multiplies across every person in your network.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔄 The Teaching vs. Doing Mindset Shift</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ backgroundColor: '#FEF2F2', borderRadius: 8, padding: 16 }}>
              <p style={{ fontWeight: 700, color: '#DC2626', marginBottom: 8, fontSize: 13 }}>❌ Doing Mindset</p>
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                {['I will just do it faster myself', 'My partners are not ready yet', 'I need to be on every call', 'If I delegate, quality drops'].map(i => <li key={i} style={{ fontSize: 12, marginBottom: 4, color: '#374151' }}>{i}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: 16 }}>
              <p style={{ fontWeight: 700, color: '#16A34A', marginBottom: 8, fontSize: 13 }}>✅ Teaching Mindset</p>
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                {['Slow down now, scale later', 'Ready enough — learn by doing', 'My partners run calls, I coach', 'Imperfect delegation beats no delegation'].map(i => <li key={i} style={{ fontSize: 12, marginBottom: 4, color: '#374151' }}>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📞 Running Team Calls That Actually Work</h2>
          {[['Opening (5 min)', 'Start with wins only — no problems, no complaints. Set the energy.'], ['Main Content (15 min)', 'One topic, one skill, one strategy. Keep it focused.'], ['Recognition (5 min)', 'Call out names. Be specific. People repeat what gets rewarded.'], ['Q&A and Close (5 min)', 'Open floor, then end on a forward-looking call to action.']].map(([phase, desc]) => (
            <div key={phase} style={{ display: 'flex', gap: 12, marginBottom: 12, padding: 12, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
              <div style={{ minWidth: 120, fontWeight: 700, fontSize: 13, color: '#0369A1' }}>{phase}</div>
              <div style={{ fontSize: 13, color: '#374151' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Leadership Challenge Advisor</h2>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Your Current Team Size</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {teamSizes.map(t => (
                <button key={t.key} onClick={() => setTeamSize(t.key)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: teamSize === t.key ? '#F5E642' : '#E5E7EB', backgroundColor: teamSize === t.key ? '#FEFCE8' : '#F9FAFB', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: '#0A1628', fontWeight: teamSize === t.key ? 700 : 400 }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Biggest Leadership Challenge Right Now</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {challenges.map(c => (
                <button key={c.key} onClick={() => setChallenge(c.key)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: challenge === c.key ? '#F5E642' : '#E5E7EB', backgroundColor: challenge === c.key ? '#FEFCE8' : '#F9FAFB', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: '#0A1628', fontWeight: challenge === c.key ? 700 : 400 }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#F0F9FF', borderRadius: 10, padding: 20 }}>
              <div style={{ backgroundColor: '#FEFCE8', borderRadius: 8, padding: 12, marginBottom: 14, borderLeft: '3px solid #F5E642' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#854D0E', marginBottom: 4 }}>TOP PRIORITY</p>
                <p style={{ fontSize: 14, color: '#0A1628', margin: 0, fontWeight: 600 }}>{result.priority}</p>
              </div>
              <p style={{ fontWeight: 700, color: '#0369A1', marginBottom: 6, fontSize: 13 }}>Recommended Action</p>
              <p style={{ fontSize: 13, color: '#374151', marginBottom: 14, lineHeight: 1.6 }}>{result.action}</p>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                <p style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, margin: '0 0 4px 0' }}>💡 Leadership Insight</p>
                <p style={{ fontSize: 13, color: '#D1D5DB', margin: 0, fontStyle: 'italic' }}>{result.insight}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
