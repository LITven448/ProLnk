import { useState } from 'react';

const networkSizes = [
  { label: 'Just Starting (0-5 partners)', key: 'new' },
  { label: 'Building (6-20 partners)', key: 'building' },
  { label: 'Established (21-60 partners)', key: 'established' },
  { label: 'Leader (61-150 partners)', key: 'leader' },
];

const growthGoals = [
  { label: 'Add 2-5 partners this month', key: 'slow' },
  { label: 'Add 6-15 partners this month', key: 'medium' },
  { label: 'Add 16+ partners this month', key: 'fast' },
];

type PlanKey = 'new_slow' | 'new_medium' | 'new_fast' | 'building_slow' | 'building_medium' | 'building_fast' | 'established_slow' | 'established_medium' | 'established_fast' | 'leader_slow' | 'leader_medium' | 'leader_fast';

const plans: Record<string, { week1: string[]; week2: string[]; week3: string[]; week4: string[]; recurring: string[] }> = {
  new_slow: {
    week1: ['Review your dashboard — understand your current earnings baseline', 'List 10 people you know in home services', 'Make 3 warm introductions to ProLnk'],
    week2: ['Attend 1 local trade event or HOA meeting', 'Share ProLnk in 2 Facebook/Nextdoor groups', 'Follow up with Week 1 contacts'],
    week3: ['Convert 1-2 new partners from your list', 'Register 5 homeowner addresses in your territory', 'Schedule a 1:1 with your strongest new partner'],
    week4: ['Celebrate any win — publicly in your network group', 'Set next month goals based on this month results', 'Plan one new recruitment channel to test next month'],
    recurring: ['Weekly 15-min pipeline check every Monday', 'Monthly check-in call with each active partner', 'Track homeowner originations in your ProLnk dashboard'],
  },
  new_medium: {
    week1: ['Audit your contact list — identify 30 potential partner leads', 'Set up a WhatsApp group for your early team', 'Post your ProLnk story on LinkedIn or Facebook'],
    week2: ['Host a casual coffee meetup with 5+ prospects', 'Attend 2 trade events or HOA meetings', 'Make 15+ outreach contacts'],
    week3: ['Run a 3-day recruiting blitz — dedicated time blocks daily', 'Register 15+ homeowner addresses', 'Onboard new partners with a personal call'],
    week4: ['Review conversion rates — what channels are working?', 'Promote top performers in your team group', 'Plan a team call for Month 2'],
    recurring: ['Daily 20-min prospecting block', 'Weekly team update in WhatsApp group', 'Monthly virtual team call with recognition'],
  },
  new_fast: {
    week1: ['Go all-in: identify 50+ partner prospects', 'Create content — your ProLnk story for social', 'Make 30+ outreach contacts Day 1-3'],
    week2: ['Host 2+ meetups or info sessions', 'Target HOA boards and realtor offices directly', 'Close 5+ new partners this week alone'],
    week3: ['Activate new partners immediately — give them scripts and goals', 'Launch a team referral contest: most recruits wins a bonus', 'Push homeowner originations hard — target 30+ this week'],
    week4: ['Review metrics: conversion rate, active rate, homeowner count', 'Identify your top 3 partners — invest in their development', 'Plan Month 2 with a higher target'],
    recurring: ['Daily 45-min growth block (non-negotiable)', '3x/week team touchpoints', 'Weekly leadership development call with top partners'],
  },
  building_slow: {
    week1: ['Run a health check — who is active vs. silent in your network?', 'Re-engage 3 lapsed partners with a personal call', 'Review your homeowner origination rate'],
    week2: ['Add 1-2 new partners through referrals from existing network', 'Attend 1 community event to find homeowners', 'Share a win story in your team group to re-energize'],
    week3: ['Coach your top 2 partners on their own recruiting', 'Register 10 new homeowner addresses', 'Identify one underperformer — have a direct conversation'],
    week4: ['Celebrate milestones — shout out partners who hit goals', 'Plan next month with your top 2 partners as sub-leaders', 'Document what is working in a simple playbook for your team'],
    recurring: ['Bi-weekly team call (30 min)', 'Monthly 1:1 with each active partner', 'Quarterly homeowner blitz campaign'],
  },
  building_medium: {
    week1: ['Set aggressive targets with your team — create accountability', 'Identify 2 partners ready to become sub-leaders', 'Launch a team recruiting contest with a real prize'],
    week2: ['Each partner recruits 1 person — network effect kicks in', 'Run a homeowner origination challenge: most homes registered wins', 'Host a virtual team call to share best practices'],
    week3: ['Follow up on contest progress — public leaderboard in group', 'Onboard all new recruits with your personal story call', 'Focus on DFW growth corridors for new homeowner targets'],
    week4: ['Award contest winners — make it a big moment', 'Promote 2 partners to sub-leader status officially', 'Set Month 2 goals 25% higher than Month 1'],
    recurring: ['Weekly team call with leaderboard update', 'Monthly sub-leader strategy session', 'Quarterly territory expansion planning'],
  },
  building_fast: {
    week1: ['All hands: set a team stretch goal together', 'Assign each partner a specific recruiting target (name + contact)', 'Launch a blitz week with daily team check-ins'],
    week2: ['Run daily recruiting sprints — morning huddle, evening recap', 'Partner with 2 HOA boards or realtor offices', 'Push for 25+ new homeowner originations this week'],
    week3: ['Close the gap on blitz targets — personal outreach to stragglers', 'Celebrate every milestone in real time in the team group', 'Onboard all new partners with urgency'],
    week4: ['Final push: close all pending prospects', 'Major recognition event — virtual or in-person', 'Plan the next blitz for Month 2'],
    recurring: ['Daily team momentum posts', 'Weekly sub-leader calls', 'Monthly in-person DFW meetup'],
  },
  established_slow: {
    week1: ['Deep dive: who are your top 10 earners and what are they doing?', 'Identify your biggest at-risk partners — early intervention', 'Review origination rights portfolio — gaps in coverage?'],
    week2: ['Focus on quality over quantity — coach top partners', 'Run one targeted homeowner campaign in your best territory', 'Document 3 best practices to share with your full team'],
    week3: ['Leadership development: 2 partners ready for promotion?', 'Reactivate 5 lapsed partners with a specific re-engagement script', 'Add 3-5 high-quality new partners through warm referrals'],
    week4: ['Quarterly business review with your top sub-leaders', 'Publish a team newsletter with wins and goals', 'Plan a new market expansion into an adjacent DFW territory'],
    recurring: ['Monthly leadership team call', 'Quarterly territory health review', 'Semi-annual in-person event'],
  },
  established_medium: {
    week1: ['Set team OKRs for the month — cascaded to each sub-leader', 'Launch a network-wide recruiting contest', 'Identify 2 new territories to expand into'],
    week2: ['Sub-leaders run their own team blitzes — you coach from above', 'Target 40+ new homeowner originations across the full network', 'Guest-speak at a trade event to attract new partners'],
    week3: ['Mid-month check-in on all sub-leader progress', 'Recognition push — celebrate sub-leaders publicly', 'Close any pending high-value partner recruits personally'],
    week4: ['Final push with your sub-leaders', 'Full network call — share wins, set next month vision', 'Promote top performers to new leadership tier'],
    recurring: ['Weekly sub-leader syncs', 'Monthly all-hands network call', 'Quarterly expansion review'],
  },
  established_fast: {
    week1: ['Treat this month like a launch — all-in mentality across the team', 'Each sub-leader sets their own stretch goal and is held accountable', 'Hire or assign a dedicated homeowner origination coordinator'],
    week2: ['Network blitz: every partner doing outreach daily', 'Personal recruiting push from you — 10+ new high-quality partners', 'Partner with 3+ realtor offices for post-closing homeowner flow'],
    week3: ['Blitz continues: daily public leaderboard posts', 'Host a mid-month virtual celebration to keep energy high', 'Onboard all new partners at scale with a group call format'],
    week4: ['Major close — push every pending recruit over the line', 'Epic recognition: biggest monthly win celebration in network history', 'Plan Month 2 with even higher targets'],
    recurring: ['Daily momentum posts at scale', 'Weekly all-hands calls', 'Monthly in-person DFW event'],
  },
  leader_slow: {
    week1: ['Operate as CEO of your network — let sub-leaders run execution', 'Focus on 1-2 strategic partnerships this month only', 'Review network health dashboard: engagement, earnings, churn'],
    week2: ['Coach your top 3 sub-leaders individually', 'Identify one underperforming territory — intervention plan', 'One high-value speaking or community appearance'],
    week3: ['Sub-leaders execute; you remove blockers only', 'Add 2-3 charter-level recruits if available', 'Review Q/Q earnings trend — identify growth levers'],
    week4: ['Leadership development: who is ready for the next tier?', 'Publish insights to your network — thought leadership', 'Quarterly strategic review with your full leadership team'],
    recurring: ['Monthly leadership council call', 'Quarterly network health audit', 'Semi-annual in-person leadership retreat'],
  },
  leader_medium: {
    week1: ['Set monthly vision and OKRs for your leadership team', 'Identify 3 strategic growth initiatives for this month', 'Personal recruiting: 5-10 high-value partner additions'],
    week2: ['Leadership team executes independently; you coach', 'Major community or realtor partnership push', 'Network-wide homeowner origination campaign'],
    week3: ['Check-in on all leadership OKRs — mid-month adjustment', 'Public recognition of top performers across all levels', 'Media or PR opportunity in DFW (local news, podcast, LinkedIn)'],
    week4: ['Full leadership team review', 'Promote top performers to new leadership positions', 'Plan next month at a higher level of ambition'],
    recurring: ['Weekly leadership team sync', 'Monthly all-network call (you headline)', 'Quarterly DFW expansion strategy'],
  },
  leader_fast: {
    week1: ['All-in growth mode: set the most ambitious goals your team has ever seen', 'Align all sub-leaders on the vision and their personal accountability', 'Personal recruiting of 10+ high-value charter-level partners'],
    week2: ['Every level of the network is in recruiting mode simultaneously', 'Major DFW community events — your brand is the draw', 'Homeowner origination at scale: 200+ target for the month'],
    week3: ['Real-time tracking across all sub-leader networks', 'Daily motivation content for your entire network', 'Remove blockers fast — empower sub-leaders to make decisions'],
    week4: ['Historic month celebration — make it legendary', 'Promote multiple partners to leadership positions', 'Set up next month for sustained momentum'],
    recurring: ['Daily leadership posts to inspire the full network', 'Weekly leadership council', 'Monthly all-network celebration call'],
  },
};

export default function PartnerMonthlyActionPlan() {
  const [networkSize, setNetworkSize] = useState('');
  const [growthGoal, setGrowthGoal] = useState('');
  const planKey = networkSize && growthGoal ? `${networkSize}_${growthGoal}` : null;
  const plan = planKey && plans[planKey] ? plans[planKey] : null;
  const weeks = ['week1', 'week2', 'week3', 'week4'];
  const weekLabels = ['Week 1 — Pipeline Check', 'Week 2 — New Outreach', 'Week 3 — Follow-Up & Conversion', 'Week 4 — Network Activation'];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📅</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Monthly Action Plan</h1>
          <p style={{ color: '#4B5563', fontSize: 16, lineHeight: 1.6 }}>
            Consistency beats intensity. This template gives you a structured 4-week rhythm so every month compounds on the last.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Build Your Custom Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Current Network Size</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {networkSizes.map(n => (
                <button key={n.key} onClick={() => setNetworkSize(n.key)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: networkSize === n.key ? '#F5E642′ : '#E5E7EB', backgroundColor: networkSize === n.key ? '#FEFCE8' : '#F9FAFB', cursor: ’pointer', textAlign: 'left', fontSize: 13, color: '#0A1628', fontWeight: networkSize === n.key ? 700 : 400 }}>
                  {n.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Growth Goal This Month</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {growthGoals.map(g => (
                <button key={g.key} onClick={() => setGrowthGoal(g.key)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: growthGoal === g.key ? '#F5E642′ : '#E5E7EB', backgroundColor: growthGoal === g.key ? '#FEFCE8' : '#F9FAFB', cursor: ’pointer', textAlign: 'left', fontSize: 13, color: '#0A1628', fontWeight: growthGoal === g.key ? 700 : 400 }}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {plan && (
            <div>
              {weeks.map((week, i) => (
                <div key={week} style={{ marginBottom: 16, backgroundColor: '#F9FAFB', borderRadius: 10, padding: 16, border: '1px solid #E5E7EB' }}>
                  <p style={{ fontWeight: 700, color: '#0369A1', marginBottom: 8, fontSize: 14 }}>{weekLabels[i]}</p>
                  <ul style={{ paddingLeft: 18, margin: 0 }}>
                    {(plan[week as keyof typeof plan] as string[]).map((item: string) => (
                      <li key={item} style={{ fontSize: 13, marginBottom: 6, color: '#374151′ }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <p style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8, fontSize: 14 }}>🔁 Recurring Monthly Tasks</p>
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {plan.recurring.map((item: string) => (
                    <li key={item} style={{ fontSize: 13, marginBottom: 6, color: '#D1D5DB' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
