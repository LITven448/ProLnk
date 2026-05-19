import { useState } from 'react';

const conditions = [
  { id: 'weeds-heavy', label: '>50% Weeds', icon: '🌿', score: 3 },
  { id: 'bare-heavy', label: '>50% Bare Dirt', icon: '🟫', score: 3 },
  { id: 'weeds-moderate', label: '25–50% Weeds', icon: '🌱', score: 2 },
  { id: 'thin', label: 'Thin / Sparse Grass', icon: '🪨', score: 1 },
  { id: 'compacted', label: 'Compacted Soil', icon: '⛏️', score: 1 },
  { id: 'healthy', label: 'Mostly Healthy', icon: '✅', score: 0 },
];

const approaches = [
  {
    id: 'full-reno',
    title: 'Full Renovation',
    icon: '🔄',
    trigger: 'Score 4+',
    steps: [
      'Apply glyphosate herbicide in July–August (kills all vegetation)',
      'Wait 2 weeks — do NOT irrigate or mow',
      'Apply second round if needed for stubborn weeds',
      'Till or verticut dead material into soil',
      'Install Bermuda sod (late May–August for best establishment)',
      'Water 2x daily for 3 weeks until rooted',
      'Fertilize at 6 weeks with slow-release nitrogen',
    ],
    cost: '$1,500–$4,000 for avg DFW lot',
    best: 'Sod wins over seed in DFW — faster establishment, fewer weeds',
    timing: 'Late spring through summer (Bermuda sod peak season)',
  },
  {
    id: 'partial-reno',
    title: 'Targeted Spot Renovation',
    icon: '🎯',
    trigger: 'Score 2–3',
    steps: [
      'Spot-spray problem areas with herbicide',
      'Wait 2 weeks after herbicide',
      'Aerate or till treated areas',
      'Patch with Bermuda sod or plugs',
      'Water patches 2x daily for 3 weeks',
      'Edge and maintain boundaries to contain healthy grass',
    ],
    cost: '$500–$1,500 depending on coverage',
    best: 'Bermuda plugs at 12″ spacing work for smaller areas',
    timing: 'April–August',
  },
  {
    id: 'maintenance',
    title: 'Aggressive Maintenance Plan',
    icon: '💪',
    trigger: 'Score 0–1',
    steps: [
      'Core aerate in spring (April–May for DFW Bermuda)',
      'Apply pre-emergent herbicide (Feb/March) for crabgrass',
      'Fertilize 4x per year on DFW schedule',
      'Water 1 inch per week during growing season',
      'Dethatch if thatch exceeds 1/2 inch',
      'Overseed bare spots with Bermuda seed in summer',
    ],
    cost: '$300–$800/year for professional program',
    best: 'Prevent renovation — maintain what you have',
    timing: 'Year-round program',
  },
];

export default function DFWLawnRenovation2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeApproach, setActiveApproach] = useState<string | null>(null);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const score = selected.reduce((acc, id) => {
    const c = conditions.find(x => x.id === id);
    return acc + (c?.score || 0);
  }, 0);

  const recommended = score >= 4 ? approaches[0] : score >= 2 ? approaches[1] : approaches[2];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Complete Lawn Renovation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Know when to start over — and how to do it right in Dallas-Fort Worth.'s extreme clay soil and summer heat.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #f87171′ }}>
          <span style={{ color: '#f87171', fontWeight: 700 }}>⚠️ DFW Rule of Thumb:</span>
          <span style={{ color: '#94a3b8', fontSize: 14, marginLeft: 8 }}>If your lawn is more than 50% weeds or bare, renovation beats rehabilitation every time. Trying to save a failed lawn costs more long-term.</span>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔍 Assess Your Lawn (select all that apply)</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {conditions.map(c => (
              <button key={c.id} onClick={() => toggle(c.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  borderColor: selected.includes(c.id) ? '#F5E642′ : '#1e3a5f',
                  background: selected.includes(c.id) ? '#F5E642′ : '#0A1628',
                  color: selected.includes(c.id) ? '#0A1628′ : '#94a3b8' }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          {selected.length > 0 && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Lawn condition score:</div>
              <div style={{ background: score >= 4 ? '#f87171′ : score >= 2 ? '#fbbf24' : '#4ade80',
                color: '#0A1628', fontWeight: 800, fontSize: 16, padding: '4px 12px', borderRadius: 20 }}>{score}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>→ {recommended.title} Recommended</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {approaches.map(a => (
            <div key={a.id} onClick={() => setActiveApproach(activeApproach === a.id ? null : a.id)}
              style={{ background: a.id === recommended.id && selected.length > 0 ? '#1a3a6a' : '#0f2040',
                borderRadius: 12, padding: 20, cursor: 'pointer', border: '2px solid',
                borderColor: a.id === recommended.id && selected.length > 0 ? '#F5E642′ : '#1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 24, marginRight: 10 }}>{a.icon}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 17 }}>{a.title}</span>
                  {a.id === recommended.id && selected.length > 0 && (
                    <span style={{ marginLeft: 10, background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>RECOMMENDED</span>
                  )}
                </div>
                <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>{a.cost}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '6px 0 0′ }}>🗓️ {a.timing}</p>
              {activeApproach === a.id && (
                <div style={{ marginTop: 14 }}>
                  {a.steps.map((step, i) => (
                    <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8, paddingLeft: 8, borderLeft: '2px solid #1e3a5f' }}>
                      {i + 1}. {step}
                    </div>
                  ))}
                  <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: 10 }}>
                    <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 12 }}>💡 </span>
                    <span style={{ color: '#94a3b8', fontSize: 13 }}>{a.best}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏡 Get a DFW Lawn Renovation Quote</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with licensed lawn pros in Dallas-Fort Worth.</p>
        </div>
      </div>
    </div>
  );
}