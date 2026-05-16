import { useState } from 'react';

const symptoms = [
  { id: 'standing', label: 'Standing water in yard after rain' },
  { id: 'basement', label: 'Water seeping into garage or foundation' },
  { id: 'erosion', label: 'Soil washing away near flower beds or fences' },
  { id: 'slope', label: 'Yard slopes toward the house' },
  { id: 'soggy', label: 'Perpetually soggy or muddy patches' },
  { id: 'gutters', label: 'Gutters overflow during heavy rain' },
];

const solutions: Record<string, { name: string; emoji: string; cost: string; desc: string }> = {
  none: { name: 'No Action Needed', emoji: '✅', cost: '$0', desc: 'Your drainage appears healthy based on the symptoms selected. Monitor after heavy rains.' },
  gutter: { name: 'Gutter Extension / Downspout Fix', emoji: '🏚️', cost: '$100–$500', desc: 'Extend downspouts away from foundation. Often the simplest fix when gutters are the primary issue.' },
  regrading: { name: 'Lawn Regrading', emoji: '🏔️', cost: '$500–$3,000', desc: 'Texas clay soil compacts over time and tilts toward foundations. Regrading redirects water flow away from the house.' },
  french: { name: 'French Drain System', emoji: '🌊', cost: '$1,500–$6,000', desc: 'Perforated pipe buried in gravel channels water underground and away. Best for chronic standing water and soggy yards.' },
  creek: { name: 'Dry Creek Bed', emoji: '🪨', cost: '$1,000–$4,000', desc: 'Decorative rock-lined channel that handles heavy runoff while adding curb appeal. Popular in DFW for erosion-prone lots.' },
  full: { name: 'Full Drainage System', emoji: '🚧', cost: '$4,000–$12,000+', desc: 'Combination of French drains, regrading, catch basins, and potentially sump pump. Required for severe multi-symptom drainage failure.' },
};

function getSolution(checked: string[]): string {
  const n = checked.length;
  if (n === 0) return 'none';
  if (n === 1 && checked[0] === 'gutters') return 'gutter';
  if (n <= 2 && !checked.includes('basement') && !checked.includes('slope')) return 'regrading';
  if (checked.includes('standing') && !checked.includes('basement') && !checked.includes('slope')) return 'french';
  if (checked.includes('erosion') && n <= 3) return 'creek';
  return 'full';
}

export default function DrainageAndGradingGuide() {
  const [checked, setChecked] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setShowResult(false);
  };

  const solution = solutions[getSolution(checked)];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0d2137 100%)', padding: '60px 24px 40px', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW DRAINAGE GUIDE</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.15 }}>Drainage & Grading: Why Texas Yards Fail (and How to Fix Them)</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, margin: 0 }}>Dallas-Fort Worth's clay-heavy soil expands when wet and cracks when dry — creating a nightmare for drainage and foundations.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>⚠️ Signs of Drainage Failure</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {['Standing water after rain', 'Foundation cracks or settlement', 'Soil erosion and washout', 'Mold or mildew near foundation', 'Yard slopes toward house', 'Perpetually soggy lawn'].map((s, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#ef4444', fontSize: 18 }}>🚨</span>
                <span style={{ fontSize: 15, color: '#cbd5e1' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>🔧 Solution Comparison</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Three main approaches used across DFW:</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { emoji: '🌊', name: 'French Drains', cost: '$1,500–$6,000', pros: 'Works underground, very effective, long-lasting', cons: 'Higher upfront cost, requires excavation' },
              { emoji: '🏔️', name: 'Lawn Regrading', cost: '$500–$3,000', pros: 'Fixes root cause (wrong slope), improves curb appeal', cons: 'Landscape disturbance during work' },
              { emoji: '🪨', name: 'Dry Creek Beds', cost: '$1,000–$4,000', pros: 'Decorative and functional, handles heavy runoff', cons: 'Requires more space, not for severe drainage issues' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 14, padding: '24px', border: '1px solid #1e3a5f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{s.emoji} {s.name}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{s.cost}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Pros</div>
                    <div style={{ color: '#94a3b8', fontSize: 14 }}>{s.pros}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#f87171', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Cons</div>
                    <div style={{ color: '#94a3b8', fontSize: 14 }}>{s.cons}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56, background: '#112240', borderRadius: 16, padding: '32px 28px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>🩺 Drainage Symptom Checker</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>Check all symptoms that apply to your yard:</p>

          <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
            {symptoms.map(s => (
              <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', background: '#0A1628', borderRadius: 10, padding: '14px 18px', border: `2px solid ${checked.includes(s.id) ? '#F5E642' : '#1e3a5f'}` }}>
                <input
                  type="checkbox"
                  checked={checked.includes(s.id)}
                  onChange={() => toggle(s.id)}
                  style={{ width: 20, height: 20, accentColor: '#F5E642', cursor: 'pointer' }}
                />
                <span style={{ fontSize: 15, color: checked.includes(s.id) ? '#fff' : '#94a3b8', fontWeight: checked.includes(s.id) ? 600 : 400 }}>{s.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
          >Get My Recommendation</button>

          {showResult && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 14, padding: '24px', border: '2px solid #F5E642' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{solution.emoji}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Recommended: {solution.name}</h3>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{solution.cost}</div>
              <p style={{ color: '#94a3b8', margin: 0 }}>{solution.desc}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 48, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 16, padding: '28px 24px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🏠 Get a Free Drainage Assessment</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects DFW homeowners with vetted drainage and grading contractors. Get 3 quotes with no commitment.</p>
        </div>
      </div>
    </div>
  );
}
