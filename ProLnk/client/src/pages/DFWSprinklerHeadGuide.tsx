import { useState } from 'react';

const headTypes = [
  {
    id: 'rotary',
    name: 'Rotary / Rotor Heads',
    description: 'Rotating streams cover 15–50 ft radius. Best for large DFW turf areas with Bermuda or St. Augustine.',
    dfwNote: '🌀 DFW wind above 10mph (common in spring) causes spray drift. Rotary heads with low-angle trajectory reduce drift vs fixed spray.',
    spacing: '15–30 ft apart, head-to-head coverage',
    dfwGrass: ['Bermuda', 'St. Augustine', 'Zoysia'],
    pressureNeeded: '25–45 PSI',
    replacementCost: '$8–$25/head + $75–$120 labor',
    bestFor: ['Large lawns', 'Wind-prone areas', 'Efficient water distribution'],
  },
  {
    id: 'fixed',
    name: 'Fixed Spray Heads',
    description: 'Fan-pattern spray covering 4–15 ft. Standard for most DFW residential beds and smaller lawn zones.',
    dfwNote: '⚠️ DFW municipal water pressure varies 40–80 PSI by zone. Fixed heads without pressure regulators mist in high-pressure areas, wasting water.',
    spacing: '8–12 ft apart, head-to-head coverage',
    dfwGrass: ['Bermuda', 'St. Augustine', 'Beds/shrubs'],
    pressureNeeded: '20–30 PSI (use pressure-regulating stems)',
    replacementCost: '$4–$15/head + $60–$90 labor',
    bestFor: ['Small zones', 'Planting beds', 'Uniform coverage areas'],
  },
  {
    id: 'drip',
    name: 'Drip Emitters',
    description: 'Delivers water directly to root zone — ideal for DFW garden beds, trees, and water-restricted zones.',
    dfwNote: '💧 DFW Stage 2 water restrictions (common in drought) allow drip irrigation daily vs 2x/week for sprinklers.',
    spacing: '1 emitter per plant, 12–18 in apart in rows',
    dfwGrass: ['Flower beds', 'Vegetable gardens', 'Trees', 'Shrubs'],
    pressureNeeded: '15–25 PSI (pressure regulator required)',
    replacementCost: '$0.50–$5/emitter + filter replacement $10–$20/yr',
    bestFor: ['Water conservation', 'Drought restrictions', 'Planting beds'],
  },
  {
    id: 'mp',
    name: 'MP Rotator Heads',
    description: 'Rotating multi-stream heads — the gold standard for DFW clay soil. Low precipitation rate prevents runoff.',
    dfwNote: '✅ DFW clay soil absorbs water at 0.2–0.5 in/hr. MP rotators apply at 0.4 in/hr — perfect match. Standard spray heads apply 1–2 in/hr causing runoff.',
    spacing: '12–20 ft apart, head-to-head',
    dfwGrass: ['All DFW grass types', 'Especially on slopes'],
    pressureNeeded: '25–45 PSI',
    replacementCost: '$12–$30/head + $75–$120 labor',
    bestFor: ['DFW clay soil', 'Slopes', 'Water efficiency mandates'],
  },
];

const recommend = (lawn: string, issue: string): string => {
  if (issue === 'runoff') return 'mp';
  if (issue === 'drift') return 'rotary';
  if (issue === 'restrictions') return 'drip';
  if (lawn === 'large') return 'rotary';
  if (lawn === 'beds') return 'drip';
  return 'mp';
};

export default function DFWSprinklerHeadGuide() {
  const [lawn, setLawn] = useState('');
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState<typeof headTypes[0] | null>(null);

  const getRecommendation = () => {
    if (!lawn || !issue) return;
    const id = recommend(lawn, issue);
    setResult(headTypes.find(h => h.id === id) ?? null);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💧 DFW Sprinkler Head Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW clay soil, inconsistent municipal pressure, and frequent water restrictions make sprinkler head selection a real decision — not just a replacement swap.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Sprinkler Head Finder</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Lawn / Zone Type</label>
            <select value={lawn} onChange={e => setLawn(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select type...</option>
              <option value="large">Large turf area (1,000+ sqft)</option>
              <option value="small">Small turf area (&lt;1,000 sqft)</option>
              <option value="beds">Planting beds / shrubs</option>
              <option value="mixed">Mixed turf and beds</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Primary DFW Water Issue</label>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select issue...</option>
              <option value="runoff">Water runs off into street (clay soil)</option>
              <option value="drift">Spray drifts in wind</option>
              <option value="restrictions">Water restriction compliance</option>
              <option value="pressure">Inconsistent water pressure</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Head Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32, border: '2px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Best Head for Your DFW Zone</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.name}</h3>
            <p style={{ color: '#94A3B8', marginBottom: 12 }}>{result.description}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14 }}>{result.dfwNote}</div>
            <div style={{ marginBottom: 8 }}><strong>📐 Spacing:</strong> {result.spacing}</div>
            <div style={{ marginBottom: 8 }}><strong>💨 Pressure Needed:</strong> {result.pressureNeeded}</div>
            <div style={{ color: '#F5E642′ }}><strong>💰 Replacement Cost:</strong> {result.replacementCost}</div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>All DFW Head Types</h2>
        {headTypes.map(h => (
          <div key={h.id} style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{h.name}</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8 }}>{h.description}</p>
            <div style={{ fontSize: 13, marginBottom: 6 }}>{h.dfwNote}</div>
            <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {h.replacementCost}</div>
          </div>
        ))}

        <div style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 DFW Water Schedule Tip</div>
          <p style={{ color: '#94A3B8', fontSize: 14 }}>DFW cities recommend watering before 10am or after 6pm to reduce evaporation. In summer, set run times to 3x weekly max (Bermuda) or 2x weekly (St. Augustine). Clay soil needs longer soak cycles with 30-min breaks between zones.</p>
        </div>
      </div>
    </div>
  );
}
