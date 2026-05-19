import { useState } from 'react';

const teamSizes = [
  { label: '1-10 partners', key: 'tiny' },
  { label: '11-30 partners', key: 'small' },
  { label: '31-75 partners', key: 'medium' },
  { label: '76-200 partners', key: 'large' },
];

const cultureGoals = [
  { label: 'Get people talking to each other', key: 'connected' },
  { label: 'Increase recruiting activity', key: 'recruiting' },
  { label: 'Celebrate wins and build momentum', key: 'momentum' },
  { label: 'Build long-term loyalty and retention', key: 'retention' },
];

const plans: Record<string, { platform: string; meetings: string; wins: string; dfwStrategy: string; tools: string[]; timeEstimate: string }> = {
  tiny_connected: {
    platform: 'WhatsApp group — simple, everyone is already on it. Name it something energizing: ProLnk DFW Founders or your territory name.',
    meetings: 'Monthly 30-min Zoom call. Casual, no agenda — just share what is working. Rotate who opens with a story.',
    wins: 'Post every win in the group, no matter how small. First homeowner registered, first partner recruited — celebrate it all.',
    dfwStrategy: 'One coffee meetup per quarter at a central DFW location — Victory Park, Legacy West, or Uptown Dallas. Keep it small and personal.',
    tools: ['WhatsApp (free)', 'Zoom free tier (40-min calls)', 'Google Calendar for shared events'],
    timeEstimate: '2-3 hours/month to run effectively',
  },
  tiny_recruiting: {
    platform: 'WhatsApp group with a specific channel for partner success stories — make recruiting wins visible and contagious.',
    meetings: 'Bi-weekly 20-min call focused exclusively on sharing recruiting conversations — what worked, what did not.',
    wins: 'Create a simple leaderboard shared in the group: who recruited this month. Public visibility drives action.',
    dfwStrategy: 'Attend one trade event or HOA meeting per month together as a team — social proof is powerful in person.',
    tools: ['WhatsApp', 'Simple shared Google Sheet for tracking recruits', 'Zoom for calls'],
    timeEstimate: '3-4 hours/month including event attendance',
  },
  tiny_momentum: {
    platform: 'Telegram group — better for sharing media, videos, and longer updates. Create a high-energy culture from day one.',
    meetings: 'Monthly victory call — every person shares their biggest win. No business updates, just wins.',
    wins: 'Weekly win posts mandatory — every partner shares one win, no matter what. Creates positive pressure and visibility.',
    dfwStrategy: 'Host a quarterly dinner for your team — your treat for the first 10 people. Nothing builds loyalty like breaking bread.',
    tools: ['Telegram (free)', 'Loom for quick video updates', 'Canva for simple win graphics'],
    timeEstimate: '3-4 hours/month',
  },
  tiny_retention: {
    platform: 'Private Facebook Group — better for relationship building and longer-form content that creates belonging.',
    meetings: 'Monthly storytelling call — partners share their ProLnk journey, not just results. Connection keeps people in.',
    wins: 'Monthly written recognition post on the Facebook group — tag each person, describe their specific contribution.',
    dfwStrategy: 'Annual in-person DFW gathering — make it a tradition. People stay for the community they cannot find elsewhere.',
    tools: ['Facebook Private Group (free)', 'Zoom for calls', 'Eventbrite for in-person events'],
    timeEstimate: '4-5 hours/month',
  },
  small_connected: {
    platform: 'Telegram with sub-groups by territory — main team channel plus smaller geographic clusters for local conversation.',
    meetings: 'Monthly all-team call (30 min) plus weekly sub-group check-ins (15 min). Two-tier meeting cadence.',
    wins: 'Dedicated wins channel in Telegram — only wins allowed, no questions or updates. Keep it pure.',
    dfwStrategy: 'Quarterly regional meetups — one North DFW, one South DFW. Lower barrier than a single large event.',
    tools: ['Telegram (free, better than WhatsApp at this scale)', 'Zoom', 'Google Calendar'],
    timeEstimate: '5-6 hours/month across all touchpoints',
  },
  small_recruiting: {
    platform: 'Telegram with a public-facing channel where you post recruiting wins — creates FOMO and social proof for prospects.',
    meetings: 'Weekly 20-min recruiting strategy call — share best scripts, roleplay objections, celebrate new recruits in real time.',
    wins: 'New partner announcement ritual — every new recruit gets a personal shoutout with their photo and why they joined.',
    dfwStrategy: 'Monthly DFW recruiting event — open to prospects. Partners bring their warm leads. Make it low-pressure and informative.',
    tools: ['Telegram', 'Zoom', 'Eventbrite or Facebook Events for recruiting events'],
    timeEstimate: '6-8 hours/month including events',
  },
  small_momentum: {
    platform: 'Slack or Discord for a more professional community feel — channels for wins, recruiting, homeowners, off-topic.',
    meetings: 'Bi-weekly all-team call with a rotating spotlight — one partner shares their full story each call.',
    wins: 'Monthly leaderboard published to the full group — top 5 recruiters, top 5 homeowner originators, top 5 earners.',
    dfwStrategy: 'Quarterly momentum event — half business update, half celebration. Bring in a guest speaker once a year.',
    tools: ['Slack free tier or Discord (free)', 'Zoom', 'Canva for leaderboard graphics'],
    timeEstimate: '6-7 hours/month',
  },
  small_retention: {
    platform: 'Private Facebook Group plus a WhatsApp group for fast communication — Facebook for depth, WhatsApp for speed.',
    meetings: 'Monthly community call (no agenda — just connection) plus quarterly vision call (where are we going together).',
    wins: 'Milestone recognition system: first recruit, 10th homeowner, first $500 month — each milestone gets a unique recognition.',
    dfwStrategy: 'Semi-annual in-person event — let partners bring their families once a year to build deeper bonds.',
    tools: ['Facebook Group', 'WhatsApp', 'Zoom', 'Eventbrite'],
    timeEstimate: '7-9 hours/month',
  },
  medium_connected: {
    platform: 'Discord with dedicated channels by topic and territory — scales to hundreds of members without becoming noise.',
    meetings: 'Monthly all-team (leaders only on video, others listen), weekly sub-leader syncs, bi-weekly territory calls.',
    wins: 'Automated win notifications using a simple Google Form — partners submit wins, you post the highlights weekly.',
    dfwStrategy: 'Quarterly DFW regional events by territory — smaller, more intimate, higher engagement than one large event.',
    tools: ['Discord (free)', 'Zoom', 'Google Forms for win submissions', 'Eventbrite'],
    timeEstimate: '8-10 hours/month for leadership team combined',
  },
  medium_recruiting: {
    platform: 'Slack with a public-invite channel for prospects — they can see the community culture before they join.',
    meetings: 'Weekly recruiting clinic — open to all partners. Share scripts, roleplay, celebrate new recruits in real time.',
    wins: 'Weekly recruiting leaderboard — most recruits in last 7 days. Simple, visible, competitive.',
    dfwStrategy: 'Monthly DFW open house event — prospects attend, partners share stories. Low pressure, high conversion.',
    tools: ['Slack', 'Zoom', 'Loom for partner story videos', 'Eventbrite'],
    timeEstimate: '10-12 hours/month including events',
  },
  medium_momentum: {
    platform: 'Custom community platform like Circle or Mighty Networks — creates a branded, professional home for your network.',
    meetings: 'Bi-weekly all-team call plus monthly leadership summit. Energy and accountability at two speeds.',
    wins: 'Annual awards program — Best Recruiter, Most Homes Originated, Fastest Growing Territory. Make it a real event.',
    dfwStrategy: 'Semi-annual DFW partner summit — half-day event with speakers, recognition, and networking. Your signature event.',
    tools: ['Circle.so or Mighty Networks ($49-99/mo)', 'Zoom', 'Eventbrite', 'Canva for event materials'],
    timeEstimate: '12-15 hours/month for leadership team',
  },
  medium_retention: {
    platform: 'Multi-platform approach: Slack for daily, Zoom for weekly, a private newsletter for monthly depth.',
    meetings: 'Monthly connection call (no business), quarterly vision call, annual in-person retreat.',
    wins: 'Monthly written impact report — how the whole network helped homeowners this month. Purpose beyond income.',
    dfwStrategy: 'Annual DFW partner retreat — full day, bring families, make it memorable. This is your retention anchor.',
    tools: ['Slack', 'Zoom', 'Beehiiv or Substack for newsletter (free)', 'Retreat venue booking'],
    timeEstimate: '10-14 hours/month',
  },
  large_connected: {
    platform: 'Circle.so or Mighty Networks — full community platform with subgroups, events, courses, and messaging.',
    meetings: 'Monthly all-hands (leaders present), weekly territory calls (sub-leaders run), daily async in platform.',
    wins: 'Dedicated wins curator role — one person whose job is finding and amplifying wins across the full network.',
    dfwStrategy: 'Quarterly territory summits — 4 events per year, each covering a different DFW quadrant.',
    tools: ['Circle.so ($99+/mo)', 'Zoom Webinar', 'Eventbrite', 'Loom for leadership updates'],
    timeEstimate: '15-20 hours/month for leadership team',
  },
  large_recruiting: {
    platform: 'Two-tier platform: internal community (Circle) plus a public-facing showcase (LinkedIn or YouTube) of partner success.',
    meetings: 'Weekly recruiting clinic for all partners, monthly recruiting mastermind for top recruiters only.',
    wins: 'Real-time recruiting dashboard visible to all partners — creates permanent social proof and friendly competition.',
    dfwStrategy: 'Monthly DFW prospecting events — well-marketed, professional production, your brand as the draw.',
    tools: ['Circle.so', 'LinkedIn Company Page', 'Zoom Webinar', 'Eventbrite'],
    timeEstimate: '18-25 hours/month for leadership team',
  },
  large_momentum: {
    platform: 'Full community ecosystem: Circle for community, YouTube for content, podcast for thought leadership.',
    meetings: 'Weekly all-hands call, monthly leadership summit, annual conference.',
    wins: 'Annual ProLnk Partner Awards — formal ceremony, real prizes, maximum recognition. Your Super Bowl moment.',
    dfwStrategy: 'Annual DFW conference — 200+ partners, keynote speakers, networking, celebration. This is your signature event.',
    tools: ['Circle.so', 'YouTube', 'Podcast platform', 'Conference venue', 'Event production budget'],
    timeEstimate: '25-35 hours/month for leadership team',
  },
  large_retention: {
    platform: 'Purpose-built community with sub-communities by tier, interest, and territory. Every partner has a home.',
    meetings: 'Layered cadence: daily async, weekly territory, monthly all-hands, quarterly vision, annual retreat.',
    wins: 'Comprehensive recognition system: real-time wins, monthly awards, annual hall of fame. Every level celebrated.',
    dfwStrategy: 'Annual DFW partner retreat for top performers — invite-only, premium experience, ultimate retention anchor.',
    tools: ['Circle.so or Mighty Networks', 'Zoom', 'Event venue', 'Retreat location', 'Recognition budget'],
    timeEstimate: '20-30 hours/month for leadership team',
  },
};

export default function PartnerCommunityBuilding() {
  const [teamSize, setTeamSize] = useState('');
  const [cultureGoal, setCultureGoal] = useState('');
  const key = teamSize && cultureGoal ? `${teamSize}_${cultureGoal}` : null;
  const plan = key && plans[key] ? plans[key] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🤝</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Community Building Guide</h1>
          <p style={{ color: '#4B5563', fontSize: 16, lineHeight: 1.6 }}>
            Income keeps people in for months. Community keeps them in for years. Build a network people are proud to be part of and retention takes care of itself.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📱 Platform Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { name: 'WhatsApp', best: 'Under 15 people', cost: 'Free', note: 'Simple, universal, but noisy at scale' },
              { name: 'Telegram', best: '15-50 people', cost: 'Free', note: 'Better organization, channels, bots' },
              { name: 'Slack / Discord', best: '30-150 people', cost: 'Free tier', note: 'Professional structure, searchable' },
              { name: 'Circle / Mighty Networks', best: '50+ people', cost: '$49-149/mo', note: 'Full community platform, courses, events' },
            ].map(p => (
              <div key={p.name} style={{ padding: 14, backgroundColor: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB' }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#0A1628', marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontSize: 12, color: '#22C55E', marginBottom: 2 }}>Best for: {p.best}</p>
                <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Cost: {p.cost}</p>
                <p style={{ fontSize: 11, color: '#9CA3AF' }}>{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎉 Celebrating Wins That Build Culture</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Name the specific win and the specific person — not just good job',
              'Share wins within 24 hours — fresh wins create the most energy',
              'Ask the winner to share their story in their own words',
              'Connect the win to the bigger mission — helping DFW homeowners',
              'Make every level of win shareable — not just big ones',
            ].map(tip => (
              <div key={tip} style={{ display: 'flex', gap: 10, padding: '10px 14px', backgroundColor: '#F0FDF4', borderRadius: 8, borderLeft: '3px solid #22C55E' }}>
                <span>✅</span>
                <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🗺️ Community Building Plan Builder</h2>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Team Size</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {teamSizes.map(t => (
                <button key={t.key} onClick={() => setTeamSize(t.key)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: teamSize === t.key ? '#F5E642′ : '#E5E7EB', backgroundColor: teamSize === t.key ? '#FEFCE8' : '#F9FAFB', cursor: ’pointer', textAlign: 'left', fontSize: 13, color: '#0A1628', fontWeight: teamSize === t.key ? 700 : 400 }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Primary Culture Goal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {cultureGoals.map(g => (
                <button key={g.key} onClick={() => setCultureGoal(g.key)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: cultureGoal === g.key ? '#F5E642′ : '#E5E7EB', backgroundColor: cultureGoal === g.key ? '#FEFCE8' : '#F9FAFB', cursor: ’pointer', textAlign: 'left', fontSize: 13, color: '#0A1628', fontWeight: cultureGoal === g.key ? 700 : 400 }}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          {plan && (
            <div style={{ backgroundColor: '#F0F9FF', borderRadius: 10, padding: 20 }}>
              {[
                { label: '📱 Recommended Platform', value: plan.platform },
                { label: '📅 Meeting Cadence', value: plan.meetings },
                { label: '🎉 Win Celebration Strategy', value: plan.wins },
                { label: '🗺️ DFW In-Person Strategy', value: plan.dfwStrategy },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, color: '#0369A1', fontSize: 13, marginBottom: 6 }}>{item.label}</p>
                  <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.6 }}>{item.value}</p>
                </div>
              ))}
              <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#0A1628', marginBottom: 8 }}>🛠️ Tools Needed</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {plan.tools.map(tool => (
                    <span key={tool} style={{ padding: '4px 10px', backgroundColor: '#F3F4F6', borderRadius: 20, fontSize: 12, color: '#374151′ }}>{tool}</span>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                <p style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, margin: '0 0 4px 0′ }}>⏱️ Time Investment</p>
                <p style={{ fontSize: 13, color: '#D1D5DB', margin: 0 }}>{plan.timeEstimate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
