import { useState } from 'react';

export default function ProLnkProNetworkBuilder() {
  const [networkSize, setNetworkSize] = useState(5);

  const strategies = [
    {
      range: [0, 5], icon: '🌱', title: 'Start With Your Crew',
      steps: [
        'Text 5 trade contacts this week: "I joined ProLnk — DFW leads, paid to recruit too"',
        'Offer to walk them through setup (30 min call)',
        'Focus on same trade first — trust is already there',
      ],
    },
    {
      range: [6, 20], icon: '🔗', title: 'Cross-Trade Expansion',
      steps: [
        'Recruit complementary trades (HVAC → Plumbing → Electrical)',
        'Attend 1 DFW trade association meeting per month',
        'Use LinkedIn: search "licensed [trade] DFW" → connect 10/day',
      ],
    },
    {
      range: [21, 50], icon: '🚀', title: 'Referral Machine',
      steps: [
        'Your L1 recruits should now recruit L2s',
        'Host a monthly "ProLnk DFW Pro Meetup" at a coffee shop',
        'Share your income screenshots with permission on social',
      ],
    },
    {
      range: [51, 999], icon: '🏆', title: 'Network Leader',
      steps: [
        'Build a private Facebook group for your network',
        'Create a simple onboarding guide to share with recruits',
        'Your passive income now exceeds most people salaries',
      ],
    },
  ];

  const current = strategies.find(s => networkSize >= s.range[0] && networkSize <= s.range[1]) || strategies[3];
  const monthlyPassive = Math.round(networkSize * 149 * 0.12 + networkSize * 800 * 0.07 * 0.01 * 20);
  const nextMilestone = networkSize < 5 ? 5 : networkSize < 20 ? 20 : networkSize < 50 ? 50 : 100;

  const levels = [
    { level: 'L1 Direct Recruits', rate: '7% job + 12% sub', est: Math.round(networkSize * 0.5 * (149 * 0.12 + 800 * 0.07 * 0.01 * 20)) },
    { level: 'L2 Their Recruits', rate: '4% job + 6% sub', est: Math.round(networkSize * 1.5 * (149 * 0.06 + 800 * 0.04 * 0.01 * 20)) },
    { level: 'L3 Deep Network', rate: '2% job + 3% sub', est: Math.round(networkSize * 3 * (149 * 0.03 + 800 * 0.02 * 0.01 * 20)) },
    { level: 'L4 Network Roots', rate: '1% job + 1.5% sub', est: Math.round(networkSize * 6 * (149 * 0.015 + 800 * 0.01 * 0.01 * 20)) },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌐</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Network Building Guide</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>4-Level Income Tree · DFW Pros</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 8 }}>
            YOUR CURRENT L1 RECRUITS: <span style={{ color: '#F5E642′ }}>{networkSize} pros</span>
          </label>
          <input type="range" min={0} max={100} value={networkSize}
            onChange={e => setNetworkSize(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8899AA', fontSize: 11, marginTop: 4 }}>
            <span>0</span>
            <span>Next milestone: {nextMilestone} pros</span>
            <span>100</span>
          </div>
        </div>

        <div style={{ background: '#1A2E4A', borderRadius: 12, padding: 20, marginBottom: 20, border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 24 }}>{current.icon}</div>
          <h3 style={{ color: '#F5E642', margin: '8px 0 12px', fontSize: 16 }}>{current.title}</h3>
          {current.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ color: '#ccc', fontSize: 14 }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 14px', fontSize: 14 }}>🌳 Your 4-Level Income Tree</h3>
          {levels.map((l, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderBottom: i < 3 ? '1px solid #2A3E5A' : 'none' }}>
              <div>
                <div style={{ fontSize: 13 }}>{l.level}</div>
                <div style={{ color: '#8899AA', fontSize: 11 }}>{l.rate}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${l.est.toLocaleString()}/mo</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#8899AA', fontSize: 12, marginBottom: 4 }}>ESTIMATED PASSIVE INCOME</div>
          <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 700 }}>${monthlyPassive.toLocaleString()}/mo</div>
          <div style={{ color: '#8899AA', fontSize: 11, marginTop: 4 }}>based on {networkSize} direct recruits + estimated downstream</div>
        </div>
      </div>
    </div>
  );
}
