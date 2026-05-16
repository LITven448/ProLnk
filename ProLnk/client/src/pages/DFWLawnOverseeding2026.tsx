import { useState } from 'react';

const lawnTypes = [
  { id: 'bermuda', label: 'Bermuda Grass', icon: '🌿' },
  { id: 'st-aug', label: 'St. Augustine', icon: '🍃' },
  { id: 'zoysia', label: 'Zoysia', icon: '🌾' },
];

const goals = [
  { id: 'winter-green', label: 'Stay Green in Winter', icon: '❄️' },
  { id: 'curb', label: 'Curb Appeal', icon: '🏡' },
  { id: 'sports', label: 'Kids / Sports Use', icon: '⚽' },
];

const guides: Record<string, { title: string; steps: string[]; timing: string; seed: string; note: string }> = {
  'bermuda-winter-green': {
    title: 'Bermuda + Perennial Ryegrass Overseed',
    timing: 'Late October – November (soil temp below 70°F)',
    seed: 'Perennial Ryegrass — 10–15 lbs per 1,000 sq ft',
    steps: [
      'Mow Bermuda short (1 inch) in mid-October',
      'Dethatch or verticut to open soil',
      'Broadcast perennial ryegrass seed evenly',
      'Topdress lightly with 1/4 inch compost',
      'Water 3x daily (light) for 2 weeks until germination',
      'Reduce to normal schedule once established',
      'Ryegrass dies naturally when Bermuda resumes in April–May',
    ],
    note: 'Spring transition: ryegrass fades as temps hit 85°F. Bermuda resumes automatically. Don't mow ryegrass below 2 inches or Bermuda transition slows.',
  },
  'bermuda-curb': {
    title: 'Bermuda Winter Overseed for Curb Appeal',
    timing: 'October 15 – November 15',
    seed: 'Annual Ryegrass (cheaper, fast green) or Perennial Rye (finer texture)',
    steps: [
      'Mow Bermuda at 1 inch, bag clippings',
      'Apply starter fertilizer (phosphorus-rich)',
      'Seed at 8–12 lbs/1,000 sq ft',
      'Water twice daily first 10 days',
      'Mow at 2–2.5 inches once established',
    ],
    note: 'Annual rye is coarser but cheaper (~$1.50/lb vs $3–4 perennial). Either works for visual green.',
  },
  'st-aug-winter-green': {
    title: 'St. Augustine Overseed Note',
    timing: 'N/A — not recommended',
    seed: 'St. Augustine does NOT overseed well',
    steps: ['St. Augustine stays semi-green longer than Bermuda in mild DFW winters', 'If overseeding is desired, use low rate annual rye only', 'Risk: ryegrass competition can thin St. Augustine in spring'],
    note: 'Most DFW lawn pros do NOT overseed St. Augustine — the risk to your permanent grass outweighs the winter color benefit.',
  },
  'default': {
    title: 'Select Your Lawn Type and Goal Above',
    timing: '—',
    seed: '—',
    steps: ['Choose your grass type and goal to get a custom overseeding plan.'],
    note: 'DFW overseeding season runs October through November.',
  },
};

export default function DFWLawnOverseeding2026() {
  const [lawnType, setLawnType] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);

  const guideKey = lawnType && goal ? `${lawnType}-${goal}` : 'default';
  const guide = guides[guideKey] || guides[`${lawnType}-winter-green`] || guides['default'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌾</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Lawn Overseeding Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Keep your DFW lawn green through winter — Bermuda goes dormant, ryegrass keeps it alive.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🌡️ Key Timing:</span>
          <span style={{ color: '#94a3b8', fontSize: 14, marginLeft: 8 }}>Overseed when soil temps drop below 70°F — typically mid-October in DFW. Too early = poor germination. Too late = seed won't establish before cold.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>🌿 Your Grass Type</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lawnTypes.map(t => (
                <button key={t.id} onClick={() => setLawnType(t.id)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, textAlign: 'left',
                    borderColor: lawnType === t.id ? '#F5E642' : '#1e3a5f',
                    background: lawnType === t.id ? '#F5E642' : '#0A1628',
                    color: lawnType === t.id ? '#0A1628' : '#94a3b8', fontWeight: 600 }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>🎯 Your Goal</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {goals.map(g => (
                <button key={g.id} onClick={() => setGoal(g.id)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, textAlign: 'left',
                    borderColor: goal === g.id ? '#F5E642' : '#1e3a5f',
                    background: goal === g.id ? '#F5E642' : '#0A1628',
                    color: goal === g.id ? '#0A1628' : '#94a3b8', fontWeight: 600 }}>
                  {g.icon} {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>📋 {guide.title}</h3>
          {guide.timing !== '—' && <div style={{ color: '#60a5fa', fontSize: 13, marginBottom: 8 }}>🗓️ Timing: {guide.timing}</div>}
          {guide.seed !== '—' && <div style={{ color: '#4ade80', fontSize: 13, marginBottom: 14 }}>🌱 Seed: {guide.seed}</div>}
          {guide.steps.map((step, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8, paddingLeft: 8, borderLeft: '2px solid #1e3a5f' }}>
              {i + 1}. {step}
            </div>
          ))}
          <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 12 }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 12 }}>💡 NOTE: </span>
            <span style={{ color: '#94a3b8', fontSize: 13 }}>{guide.note}</span>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🌾 Get a DFW Lawn Care Quote</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with licensed lawn pros in Dallas-Fort Worth.</p>
        </div>
      </div>
    </div>
  );
}