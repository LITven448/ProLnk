import { useState } from 'react';

const PRIORITIES = [
  {
    rank: 1,
    label: 'Safety First',
    icon: '🚨',
    color: '#7F1D1D',
    items: ['Smoke & CO detectors', 'Electrical panel hazards', 'GFCI outlets', 'Structural cracks'],
    dfwNote: 'Electrical fires spike in DFW summers — inspect panels before peak AC season.',
    avgCost: 800,
  },
  {
    rank: 2,
    label: 'Weatherproofing',
    icon: '🌧️',
    color: '#1E3A5F',
    items: ['Roof integrity', 'Window seals', 'Exterior caulking', 'Attic insulation'],
    dfwNote: 'Spring hail + summer UV destroy roofs fast in DFW. Inspect every April.',
    avgCost: 4500,
  },
  {
    rank: 3,
    label: 'Systems (DFW: AC is Always #1)',
    icon: '❄️',
    color: '#14532D',
    items: ['HVAC tune-up / replacement', 'Plumbing leaks', 'Water heater', 'Foundation moisture'],
    dfwNote: 'DFW rule: AC maintenance before anything else. 100°F+ days are a health risk.',
    avgCost: 9000,
  },
  {
    rank: 4,
    label: 'Cosmetic Updates',
    icon: '🎨',
    color: '#3B1F6B',
    items: ['Kitchen refresh', 'Bathroom updates', 'Interior paint', 'Flooring'],
    dfwNote: 'Do cosmetic work AFTER systems and foundation — DFW clay soil can shift.',
    avgCost: 15000,
  },
  {
    rank: 5,
    label: 'ROI Plays',
    icon: '💰',
    color: '#78350F',
    items: ['Landscaping curb appeal', 'Exterior paint', 'Garage door replacement', 'Smart home devices'],
    dfwNote: 'DFW buyers pay a premium for curb appeal and energy efficiency upgrades.',
    avgCost: 7000,
  },
];

const ISSUES = [
  'AC not cooling efficiently', 'Roof damage or missing shingles', 'Foundation cracks',
  'Electrical flickering/tripping', 'Plumbing leaks', 'Drafty windows/doors',
  'Outdated kitchen', 'Worn flooring', 'Poor curb appeal', 'Old water heater',
];

export default function DFWHomeImprovementPriorityGuide() {
  const [budget, setBudget] = useState(10000);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  const toggle = (issue: string) =>
    setSelectedIssues(prev => prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]);

  const prioritized = PRIORITIES.filter(p =>
    p.items.some(item => selectedIssues.some(si => item.toLowerCase().includes(si.split(' ')[0].toLowerCase()))) ||
    selectedIssues.length === 0
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.75rem 0 0.25rem' }}>🔨 Home Improvement Priority Guide</h1>
          <p style={{ color: '#8FA3BF', marginTop: 4 }}>DFW-specific hierarchy for home improvements — safety first, AC always at the top.</p>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {PRIORITIES.map(p => (
            <div key={p.rank} style={{ background: p.color, borderRadius: 10, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>#{p.rank}</span>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{p.label}</h2>
                <span style={{ marginLeft: 'auto', color: '#F5E642', fontWeight: 700, fontSize: 13 }}>~${p.avgCost.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                {p.items.map(i => <span key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, padding: '3px 10px', fontSize: 12 }}>{i}</span>)}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0, fontStyle: 'italic' }}>🌡️ {p.dfwNote}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D2238', border: '1px solid #F5E642', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🎯 Build My Priority Plan</h2>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF', marginBottom: '1rem' }}>
            Total Budget
            <input type="number" value={budget} step={1000}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14, maxWidth: 200 }} />
          </label>

          <p style={{ fontSize: 13, color: '#8FA3BF', marginBottom: 8 }}>Select your home issues:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1rem' }}>
            {ISSUES.map(issue => (
              <button key={issue} onClick={() => toggle(issue)}
                style={{ background: selectedIssues.includes(issue) ? '#F5E642′ : ’rgba(255,255,255,0.07)', color: selectedIssues.includes(issue) ? '#0A1628′ : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, padding: '6px 12px', fontSize: 13, cursor: ’pointer' }}>
                {issue}
              </button>
            ))}
          </div>

          <button onClick={() => setShowPlan(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Prioritize My Projects →
          </button>

          {showPlan && (
            <div style={{ marginTop: '1.25rem' }}>
              <p style={{ color: '#8FA3BF', fontSize: 13, marginBottom: 10 }}>With a ${budget.toLocaleString()} budget, tackle in this order:</p>
              {prioritized.map((p, idx) => {
                const canAfford = p.avgCost <= budget;
                return (
                  <div key={p.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '0.75rem 1rem', marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{idx + 1}. {p.label}</div>
                      <div style={{ fontSize: 12, color: '#8FA3BF' }}>~${p.avgCost.toLocaleString()} · {p.dfwNote}</div>
                    </div>
                    <span style={{ color: canAfford ? '#22C55E' : '#EF4444', fontSize: 12, fontWeight: 700 }}>{canAfford ? '✓ In Budget' : 'Over Budget'}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
