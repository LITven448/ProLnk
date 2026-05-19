import { useState } from 'react';

export default function ProLnkProScalingGuide() {
  const [dailyMatches, setDailyMatches] = useState(2);

  const getPhase = (matches: number) => {
    if (matches < 2) return {
      phase: 'Solo Mode', icon: '🔨', color: '#8899AA', readyToHire: false,
      decision: 'Stay solo — focus on quality and reviews. Build your network instead.',
      actions: [
        'Optimize your response time to under 15 minutes',
        'Collect 5+ reviews to boost your match priority',
        'Recruit 3 other pros to start earning passive income',
      ],
    };
    if (matches < 4) return {
      phase: 'At Capacity', icon: '⚡', color: '#F5E642', readyToHire: false,
      decision: 'You are approaching the threshold. Start interviewing now before you need help.',
      actions: [
        'Post in ProLnk network for a part-time helper or apprentice',
        'Track how many matches you decline per week',
        'Set up a second phone line for job coordination',
      ],
    };
    if (matches < 7) return {
      phase: 'Time to Hire', icon: '👥', color: '#44BB44', readyToHire: true,
      decision: 'You are leaving money on the table. Hire now — your ProLnk volume justifies it.',
      actions: [
        'Post a tech position in your ProLnk network first',
        'Target: one skilled tech who can run solo calls',
        'Your Charter rate stays regardless of how many techs you add',
      ],
    };
    return {
      phase: 'Scale to Team', icon: '🏢', color: '#00DDAA', readyToHire: true,
      decision: 'Multi-tech operation. Structure matters now — assign leads systematically.',
      actions: [
        'Dedicated dispatcher for ProLnk match routing',
        'Weekly team meetings to review match win and loss',
        'Track per-tech close rate and quality score separately',
      ],
    };
  };

  const phase = getPhase(dailyMatches);
  const monthlyRevPotential = Math.round(dailyMatches * 22 * 800 * 0.35);
  const soloCapacity = Math.round(3 * 22 * 800 * 0.35);
  const leftOnTable = Math.max(0, monthlyRevPotential - soloCapacity);

  const milestones = [
    { matches: 1, label: 'Building', filled: dailyMatches >= 1 },
    { matches: 3, label: 'At Limit', filled: dailyMatches >= 3 },
    { matches: 5, label: 'Hire Now', filled: dailyMatches >= 5 },
    { matches: 8, label: 'Team Mode', filled: dailyMatches >= 8 },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📈</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Pro Scaling Guide</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>Solo to Team · Growing on ProLnk</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 8 }}>
            DAILY PROLNK MATCHES: <span style={{ color: phase.color, fontWeight: 700 }}>{dailyMatches} matches/day</span>
          </label>
          <input type="range" min={0} max={12} value={dailyMatches}
            onChange={e => setDailyMatches(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%',
                  background: m.filled ? '#F5E642' : '#2A3E5A', margin: '0 auto 4px' }} />
                <div style={{ color: m.filled ? '#F5E642' : '#8899AA', fontSize: 10 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1A2E4A', borderRadius: 12, padding: 24,
          border: `2px solid ${phase.color}`, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{phase.icon}</span>
            <div>
              <div style={{ color: phase.color, fontWeight: 700, fontSize: 16 }}>{phase.phase}</div>
              <div style={{ color: '#ccc', fontSize: 13, marginTop: 2 }}>{phase.decision}</div>
            </div>
          </div>
          {phase.actions.map((action, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ color: '#ccc', fontSize: 14 }}>{action}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#8899AA', fontSize: 11, marginBottom: 4 }}>MONTHLY REVENUE POTENTIAL</div>
            <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>${monthlyRevPotential.toLocaleString()}</div>
            <div style={{ color: '#8899AA', fontSize: 10 }}>{dailyMatches} matches/day x 22 days</div>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#8899AA', fontSize: 11, marginBottom: 4 }}>LEFT ON TABLE (SOLO CAP)</div>
            <div style={{ color: leftOnTable > 0 ? '#FF6644' : '#44BB44', fontSize: 22, fontWeight: 700 }}>
              {leftOnTable > 0 ? `$${leftOnTable.toLocaleString()}` : 'none'}
            </div>
            <div style={{ color: '#8899AA', fontSize: 10 }}>solo cap: ~3 matches/day</div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 12px', fontSize: 14 }}>🔑 Charter Rate Protection</h3>
          <p style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            Your Charter rate is locked to your account — not your headcount.
            Adding 2, 5, or 10 techs does not affect your commission tier. Assign jobs to your team
            and collect the full Charter commission on every match they complete under your account.
          </p>
        </div>
      </div>
    </div>
  );
}
