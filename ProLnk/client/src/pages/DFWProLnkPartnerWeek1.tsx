import { useState } from 'react';

const networkOptions = ['<25 contacts', '25-100 contacts', '100-300 contacts', '300+ contacts'];
const locationOptions = ['Dallas proper', 'Fort Worth area', 'Plano/Frisco/McKinney', 'Arlington/Mansfield', 'Irving/Grand Prairie', 'Garland/Mesquite', 'Southlake/Keller', 'Other DFW suburb'];

const dayPlans = [
  {
    day: 'Day 1', icon: '🚀', title: 'Foundation',
    tasks: [
      'Complete profile with photo and DFW service area',
      'Study commission structure — know your numbers cold',
      'Identify first 5 homeowner prospects from existing contacts',
      'Install partner app and enable push notifications',
    ],
  },
  {
    day: 'Day 2', icon: '📞', title: 'First Outreach',
    tasks: [
      'Send 3 warm messages to homeowner prospects (text, not email)',
      'Frame it as a favor: "I found something that helps with home repairs"',
      'No pitch yet — just curiosity and a question about their home',
      'Log each conversation in your partner dashboard',
    ],
  },
  {
    day: 'Day 3', icon: '🏡', title: 'Story Building',
    tasks: [
      'Research DFW home service pain points in your target area',
      'Prepare 2 specific stories: one problem, one solution',
      'Follow up with Day 2 prospects who responded',
      'Add 5 more homeowner prospects to your list',
    ],
  },
  {
    day: 'Day 4', icon: '🤝', title: 'First Real Conversations',
    tasks: [
      'Have 2 real conversations about ProLnk (phone or in person)',
      'Lead with the homeowner value: fast quotes, vetted pros, DFW-specific',
      'Listen for objections — write them down to master later',
      'Submit first referral if any prospect showed interest',
    ],
  },
  {
    day: 'Day 5', icon: '📊', title: 'Network Expansion',
    tasks: [
      'Identify 1 potential sub-partner in your DFW network',
      'Reach out to real estate agents, inspectors, or contractors you know',
      'Share your partner link on 1 social platform (NextDoor is gold for DFW)',
      'Review dashboard — celebrate any activity, even pending',
    ],
  },
  {
    day: 'Day 6-7', icon: '🔄', title: 'Refine and Double Down',
    tasks: [
      'Follow up on all open conversations from the week',
      'Identify what worked — double down on those channels',
      'Set week 2 goal: 1 confirmed homeowner referral submitted',
      'Schedule recurring outreach time in your calendar (30 min/day)',
    ],
  },
];

const networkTargets: Record<string, { referrals: number; conversations: number }> = {
  '<25 contacts': { referrals: 1, conversations: 5 },
  '25-100 contacts': { referrals: 2, conversations: 10 },
  '100-300 contacts': { referrals: 3, conversations: 18 },
  '300+ contacts': { referrals: 5, conversations: 30 },
};

const locationTips: Record<string, string> = {
  'Dallas proper': 'Focus on Lakewood, Oak Cliff, and M Streets — older homes with high maintenance needs.',
  'Fort Worth area': 'TCU/Westside and Aledo areas have strong homeowner density and active HOAs.',
  'Plano/Frisco/McKinney': 'New construction with builder warranty cliffs — homeowners need pros after year 2.',
  'Arlington/Mansfield': 'Strong trade community — look for contractor partners who can cross-refer.',
  'Irving/Grand Prairie': 'Dense rental-to-own transition market — high conversion on first-time buyers.',
  'Garland/Mesquite': 'High deferred maintenance area — homeowners responsive to home health framing.',
  'Southlake/Keller': 'High-value homes, premium service buyers — emphasize vetted pro quality.',
  'Other DFW suburb': 'Map your HOA and neighborhood Facebook groups — highest homeowner density.',
};

export default function DFWProLnkPartnerWeek1() {
  const [network, setNetwork] = useState('');
  const [location, setLocation] = useState('');
  const [generated, setGenerated] = useState(false);
  const ready = network && location;
  const targets = network ? networkTargets[network] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 8 }}>📅 PROLNK PARTNER SYSTEM</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Week 1 Partner Playbook</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Day-by-day actions for your first week as a DFW ProLnk partner. Complete, not overwhelming.</p>
        </div>

        <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your DFW contact network size?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {networkOptions.map(n => (
              <button key={n} onClick={() => setNetwork(n)}
                style={{ padding: '12px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: network === n ? '#F5E642′ : '#1e3a5f',
                  background: network === n ? 'rgba(245,230,66,0.12)' : 'transparent',
                  color: network === n ? '#F5E642′ : '#94a3b8', cursor: ’pointer', fontSize: 14 }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your primary DFW location?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {locationOptions.map(l => (
              <button key={l} onClick={() => setLocation(l)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                  borderColor: location === l ? '#F5E642′ : '#1e3a5f',
                  background: location === l ? 'rgba(245,230,66,0.12)' : 'transparent',
                  color: location === l ? '#F5E642′ : '#94a3b8', cursor: ’pointer', fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setGenerated(true)} disabled={!ready}
          style={{ width: '100%', padding: '16px', background: ready ? '#F5E642′ : '#1e3a5f',
            color: ready ? '#0A1628′ : '#4a6080', border: ’none', borderRadius: 12,
            fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed' }}>
          {ready ? 'Build My Week 1 Plan →' : 'Select network size and location to continue'}
        </button>

        {generated && targets && (
          <div style={{ marginTop: 24 }}>
            <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📍 {location} Strategy</div>
              <div style={{ fontSize: 14, color: '#cbd5e1′ }}>{locationTips[location] || locationTips[’Other DFW suburb']}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{targets.referrals}</div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>Referrals to submit this week</div>
              </div>
              <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{targets.conversations}</div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>Conversations to have this week</div>
              </div>
            </div>
            {dayPlans.map((d, i) => (
              <div key={i} style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{d.day}: {d.title}</div>
                  </div>
                </div>
                {d.tasks.map((t, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>
                    <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>{t}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
