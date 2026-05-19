import { useState } from 'react';

const PHASES = [
  {
    label: '3–6 Months Before',
    emoji: '📅',
    color: '#a78bfa',
    desc: 'Foundation work, major systems, deep prep',
    tasks: [
      'Order a pre-listing foundation letter from a structural engineer',
      'Schedule HVAC tune-up and get report showing clean bill of health',
      'Address any known foundation movement with a pier company',
      'Replace or repair roof if near end of life — buyers will negotiate hard',
      'Deep clean interior including carpets, grout, and vents',
      'Declutter every room — rent storage if needed',
      'Begin minor repairs: caulking, drywall dings, sticking doors',
      'Repaint walls in neutral tones — avoid bold accent walls',
    ],
  },
  {
    label: '1–3 Months Before',
    emoji: '🏗️',
    color: '#60a5fa',
    desc: 'Curb appeal, staging, and paperwork',
    tasks: [
      'Schedule professional staging consultation',
      'Power wash driveway, sidewalk, and exterior',
      'Freshen landscaping — mulch, trimmed shrubs, seasonal color',
      'Repaint front door and replace hardware if dated',
      'Fix any exterior drainage issues that leave standing water',
      'Gather all warranty docs, appliance manuals, and HOA records',
      'Compile list of all improvements with dates and costs for disclosure',
      'Interview and select a listing agent with strong DFW market data',
    ],
  },
  {
    label: '2 Weeks Before Listing',
    emoji: '📸',
    color: '#fbbf24',
    desc: 'Final prep, photography, and pricing',
    tasks: [
      'Professional photography scheduled — DFW twilight shots convert best',
      'Remove personal photos and family items from all surfaces',
      'Deep clean kitchen — counters clear, appliances spotless',
      'Replace all burnt-out bulbs — bright lighting photographs well',
      'Set HVAC to 72°F for photos and showings',
      'Confirm lock box is installed and code shared with agent',
      'Review comparable sales with agent and agree on list price',
      'Prepare seller disclosure form — be honest to avoid future liability',
    ],
  },
  {
    label: 'Listing Day',
    emoji: '🚀',
    color: '#34d399',
    desc: 'Go live and attract buyers',
    tasks: [
      'Confirm property is live on MLS and Zillow/Redfin',
      'Remove all vehicles from driveway for listing photos',
      'Confirm showing instructions are active in agent system',
      'Set up automatic feedback request after each showing',
      'Review first-day traffic and agent feedback with agent',
      'Post on Nextdoor and social media (Facebook Marketplace optional)',
    ],
  },
  {
    label: 'Under Contract',
    emoji: '✍️',
    color: '#F5E642',
    desc: 'Keep deal alive through closing',
    tasks: [
      'Review all offer terms: price, earnest money, option fee, closing date',
      'Confirm title company is ordered and survey is on file',
      'Prepare for buyer\’s inspection — repair requests are likely',
      'Negotiate repair requests strategically — credits vs. actual repairs',
      'Confirm appraisal is scheduled and provide comps to appraiser',
      'Begin your own move — assume closing date is firm',
      'Do a final walkthrough with your agent 48 hours before closing',
      'Collect all keys, garage openers, and mailbox keys for handover',
    ],
  },
];

export default function DFWHomeSellingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activePhase, setActivePhase] = useState<string>(PHASES[0].label);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalItems = PHASES.reduce((s, p) => s + p.tasks.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const overallPct = Math.round((checkedCount / totalItems) * 100);

  const currentPhase = PHASES.find((p) => p.label === activePhase) || PHASES[0];
  const phaseDone = currentPhase.tasks.filter((t) => checked[`${currentPhase.label}::${t}`]).length;
  const phasePct = Math.round((phaseDone / currentPhase.tasks.length) * 100);

  const stepsComplete = PHASES.filter((p) =>
    p.tasks.every((t) => checked[`${p.label}::${t}`])
  ).length;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ color: '#0A1628', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Home Selling Checklist
          </h1>
          <p style={{ color: '#5a6a7a', fontSize: 14, margin: 0 }}>
            Everything you need to maximize your DFW sale price
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#0A1628', fontWeight: 700 }}>Sale Readiness: {overallPct}%</span>
            <span style={{ color: '#5a6a7a', fontSize: 13 }}>{stepsComplete}/{PHASES.length} phases done</span>
          </div>
          <div style={{ background: '#e8eef4', borderRadius: 99, height: 12 }}>
            <div style={{ background: '#F5E642', borderRadius: 99, height: 12, width: `${overallPct}%`, transition: 'width 0.4s' }} />
          </div>
          {overallPct === 100 && (
            <p style={{ color: '#059669', fontWeight: 700, textAlign: 'center', margin: '10px 0 0' }}>
              Ready to list — time to sell!
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {PHASES.map((phase) => {
            const done = phase.tasks.every((t) => checked[`${phase.label}::${t}`]);
            return (
              <button
                key={phase.label}
                onClick={() => setActivePhase(phase.label)}
                style={{
                  background: activePhase === phase.label ? phase.color : '#fff',
                  border: `2px solid ${activePhase === phase.label ? phase.color : '#dde3ea'}`,
                  borderRadius: 8, padding: '7px 12px', cursor: 'pointer',
                  color: activePhase === phase.label ? '#0A1628' : '#5a6a7a',
                  fontWeight: 700, fontSize: 12,
                }}
              >
                {phase.emoji} {phase.label} {done ? '✓' : ''}
              </button>
            );
          })}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800, color: '#0A1628' }}>
            {currentPhase.emoji} {currentPhase.label}
          </h2>
          <p style={{ margin: '0 0 12px', color: '#5a6a7a', fontSize: 13 }}>{currentPhase.desc}</p>
          <div style={{ background: '#e8eef4', borderRadius: 99, height: 7, marginBottom: 16 }}>
            <div style={{ background: currentPhase.color, borderRadius: 99, height: 7, width: `${phasePct}%`, transition: 'width 0.3s' }} />
          </div>

          {currentPhase.tasks.map((task) => {
            const key = `${currentPhase.label}::${task}`;
            return (
              <div
                key={task}
                onClick={() => toggle(key)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: '1px solid #eef1f5', cursor: 'pointer' }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 5, border: `2px solid ${checked[key] ? currentPhase.color : '#c0cad5'}`,
                  background: checked[key] ? currentPhase.color : 'transparent', flexShrink: 0, marginTop: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#0A1628', fontWeight: 900,
                }}>
                  {checked[key] ? '✓' : ''}
                </div>
                <span style={{ fontSize: 14, color: checked[key] ? '#9aabb8' : '#1a2a3a', textDecoration: checked[key] ? 'line-through' : 'none', lineHeight: 1.5 }}>
                  {task}
                </span>
              </div>
            );
          })}

          {phaseDone === currentPhase.tasks.length && (
            <p style={{ color: '#059669', fontWeight: 700, textAlign: 'center', margin: '14px 0 0' }}>
              {currentPhase.emoji} Phase complete!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
