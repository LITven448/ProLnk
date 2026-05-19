import { useState } from 'react';

export default function DFWBuyingTimeline() {
  const [moveInDate, setMoveInDate] = useState('');
  const [result, setResult] = useState<any>(null);

  const phases = [
    {
      offset: -9, label: 'Month 1–2: Financial Foundation', emoji: '🏦',
      tasks: [
        'Pull all three credit reports (Experian, TransUnion, Equifax)',
        'Calculate your debt-to-income ratio',
        'Open a dedicated down payment savings account',
        'Set up automatic savings transfers',
        'Research DFW neighborhoods you\’re interested in',
      ],
      tip: 'This is the boring but critical phase. Most buyers skip it and pay for it later.',
    },
    {
      offset: -7, label: 'Month 3–4: Pre-Approval & Team', emoji: '📋',
      tasks: [
        'Get pre-approved with 2–3 lenders — compare rates and fees',
        'Select a buyer\’s agent (interview at least 2)',
        'Finalize your must-have vs. nice-to-have list',
        'Research DFW property tax rates by ZIP code',
        'Check FEMA flood maps for your target neighborhoods',
      ],
      tip: 'DFW lenders know the market. Ask specifically about Texas tax escrow and PMI options.',
    },
    {
      offset: -5, label: 'Month 5–6: Active House Hunting', emoji: '🏘️',
      tasks: [
        'Begin touring homes with your agent',
        'Attend open houses in multiple neighborhoods',
        'Drive target commutes at rush hour',
        'Check HOA documents on any communities you like',
        'Verify school district assignments for every address',
      ],
      tip: 'DFW homes sell in 7–14 days on average. Be ready to move fast.',
    },
    {
      offset: -3, label: 'Month 7: Offer & Contract', emoji: '✍️',
      tasks: [
        'Submit offer with pre-approval letter and earnest money',
        'Negotiate inspection period (7–10 days standard in TX)',
        'Understand option fee vs. earnest money in Texas contracts',
        'Review seller\’s disclosure carefully',
        'Lock your interest rate or choose a float-down strategy',
      ],
      tip: 'In DFW\’s market, come in strong on price. Ask for seller concessions instead of lowball offers.',
    },
    {
      offset: -2, label: 'Month 8: Inspection, Appraisal & Financing', emoji: '🔍',
      tasks: [
        'Complete general home inspection ($400–$600)',
        'Order structural/foundation inspection if home is 15+ years old',
        'Review inspection report — negotiate repairs or credit',
        'Home appraisal ordered by lender (5–10 business days)',
        'Submit all financial docs to lender (bank statements, tax returns)',
      ],
      tip: 'Never skip the DFW foundation inspection. Clay soil is the #1 source of costly surprises.',
    },
    {
      offset: -1, label: 'Month 9: Final Steps', emoji: '🔑',
      tasks: [
        'Final walkthrough 24–48 hours before close',
        'Review closing disclosure (sent 3 business days before close)',
        'Wire closing funds (down payment + closing costs)',
        'Sign closing documents at title company',
        'Get keys — you\’re a homeowner!',
      ],
      tip: 'Wire funds early. Wire fraud is common — always verify wire instructions by phone with the title company.',
    },
  ];

  const calculate = () => {
    if (!moveInDate) return;
    const target = new Date(moveInDate);
    const results = phases.map(phase => {
      const phaseDate = new Date(target);
      phaseDate.setMonth(phaseDate.getMonth() + phase.offset);
      const now = new Date();
      const diffMs = phaseDate.getTime() - now.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      let status: 'past' | 'current' | 'upcoming' = 'upcoming';
      if (diffDays < -30) status = 'past';
      else if (diffDays <= 60) status = 'current';
      return { ...phase, phaseDate: phaseDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), diffDays, status };
    });
    setResult(results);
  };

  const statusStyle = (status: string) => {
    if (status === 'past') return { border: '1px solid #d1d5db', bg: '#f8fafc', badge: '#94a3b8', badgeBg: '#f1f5f9', badgeText: 'Past' };
    if (status === 'current') return { border: '2px solid #F5E642', bg: '#fffde7', badge: '#92400e', badgeBg: '#fef9c3', badgeText: '⚡ Do This Now' };
    return { border: '1px solid #e2e8f0', bg: '#fff', badge: '#0369a1', badgeBg: '#f0f9ff', badgeText: 'Upcoming' };
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DFW BUYER EDUCATION</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>DFW Home Buying Timeline: Month-by-Month</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>From "thinking about it" to moved in — a complete 9-month DFW buying roadmap. Enter your target move-in date to get personalized deadlines.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 28, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>📅 Get Your Personalized Timeline</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>Enter when you want to be moved in — we'll work backward to give you deadlines for each phase.</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Target Move-In Date</label>
              <input type="date" value={moveInDate} onChange={e => setMoveInDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', whiteSpace: 'nowrap' }}>Build My Timeline</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(result || phases).map((phase: any, i: number) => {
            const sty = result ? statusStyle(phase.status) : { border: '1px solid #e2e8f0', bg: '#fff', badge: '#64748b', badgeBg: '#f8fafc', badgeText: `Phase ${i + 1}` };
            return (
              <div key={i} style={{ background: sty.bg, borderRadius: 12, padding: 24, border: sty.border }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 26 }}>{phase.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16 }}>{phase.label}</div>
                      {result && <div style={{ fontSize: 13, color: '#64748b' }}>Target: {phase.phaseDate}</div>}
                    </div>
                  </div>
                  <div style={{ background: sty.badgeBg, color: sty.badge, borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>{sty.badgeText}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {phase.tasks.map((task: string) => (
                    <div key={task} style={{ fontSize: 14, color: '#374151', display: 'flex', gap: 8 }}>
                      <span>☐</span><span>{task}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#f0f9ff', borderRadius: 8, padding: '10px 14px', border: '1px solid #bae6fd', fontSize: 13, color: '#0369a1' }}>
                  💡 {phase.tip}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
