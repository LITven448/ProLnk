import { useState } from 'react';

const floorSystems = [
  {
    id: 'bare',
    name: 'Bare Concrete',
    description: 'Easy to clean DFW clay tracked in. No prep needed beyond sweeping.',
    dfwNote: 'DFW clay soil stains concrete but wipes clean easily.',
    prepSteps: ['Power wash', 'Let dry 48hrs', 'Apply concrete sealer'],
    costRange: '$0.50–$1.50/sqft (sealer only)',
    bestFor: ['Storage only', 'Low budget', 'Rarely used garage'],
  },
  {
    id: 'epoxy',
    name: 'Epoxy Coating',
    description: 'Popular but risky in DFW — hot tire pickup is a real issue in summer.',
    dfwNote: '⚠️ DFW summer heat causes hot tires to bond and peel epoxy. Use 100% solid epoxy, not water-based.',
    prepSteps: ['Acid etch (critical for DFW high-humidity concrete)', 'Diamond grind preferred', 'Fill cracks', 'Apply primer + 2 coats'],
    costRange: '$3–$7/sqft professional, $1–$2 DIY',
    bestFor: ['Light vehicle use', 'Climate-controlled garage', 'Showroom look'],
  },
  {
    id: 'polyurea',
    name: 'Polyurea Coating',
    description: 'Superior to epoxy for DFW — UV stable, handles 140°F+ surface temps.',
    dfwNote: '✅ Best coating for DFW climate. No hot tire pickup, UV resistant for south-facing garages.',
    prepSteps: ['Diamond grind only (no acid etch needed)', 'Fill cracks', 'Apply base + flakes + topcoat same day'],
    costRange: '$5–$12/sqft professional only',
    bestFor: ['Daily drivers', 'South-facing garages', 'High UV exposure'],
  },
  {
    id: 'tiles',
    name: 'Interlocking Tiles',
    description: 'No prep required. Removable. Great for DFW renters or temporary installs.',
    dfwNote: 'Polypropylene tiles handle DFW heat. Rubber tiles may soften — avoid.',
    prepSteps: ['Sweep clean', 'Snap together — no adhesive', 'Trim edges with utility knife'],
    costRange: '$2–$5/sqft DIY',
    bestFor: ['Renters', 'Workshop spaces', 'Budget-friendly upgrade'],
  },
];

const recommendations: Record<string, Record<string, string>> = {
  storage: { low: 'bare', medium: 'bare', high: 'tiles' },
  daily: { low: 'epoxy', medium: 'polyurea', high: 'polyurea' },
  workshop: { low: 'tiles', medium: 'tiles', high: 'epoxy' },
  showroom: { low: 'epoxy', medium: 'polyurea', high: 'polyurea' },
};

export default function DFWGarageFloorGuide() {
  const [use, setUse] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<typeof floorSystems[0] | null>(null);

  const getRecommendation = () => {
    if (!use || !budget) return;
    const id = recommendations[use]?.[budget] ?? 'polyurea';
    setResult(floorSystems.find(f => f.id === id) ?? null);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Garage Floor Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW's heat, humidity, and clay soil create unique challenges for garage floors. Choose wrong and you'll be peeling it up in 2 years.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Floor System Finder</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Garage Use</label>
            <select value={use} onChange={e => setUse(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select use...</option>
              <option value="storage">Storage only</option>
              <option value="daily">Daily vehicle parking</option>
              <option value="workshop">Workshop / hobby space</option>
              <option value="showroom">Showroom / display</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Budget Level</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select budget...</option>
              <option value="low">Low ($0–$2/sqft)</option>
              <option value="medium">Medium ($2–$6/sqft)</option>
              <option value="high">High ($6+/sqft)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32, border: '2px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Recommended for You</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.name}</h3>
            <p style={{ color: '#94A3B8', marginBottom: 12 }}>{result.description}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14 }}>{result.dfwNote}</div>
            <div style={{ marginBottom: 8 }}><strong>Prep Steps:</strong> {result.prepSteps.join(' → ')}</div>
            <div><strong>💰 Cost:</strong> {result.costRange}</div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>All DFW Floor Options</h2>
        {floorSystems.map(f => (
          <div key={f.id} style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{f.name}</h3>
            <p style={{ color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>{f.description}</p>
            <div style={{ fontSize: 13, marginBottom: 6 }}>{f.dfwNote}</div>
            <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {f.costRange}</div>
          </div>
        ))}

        <div style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW-Specific Warning</div>
          <p style={{ color: '#94A3B8', fontSize: 14 }}>DFW concrete slabs have high moisture vapor emission from clay soil. Always test vapor emission before coating (ASTM F1869). Skipping this step causes delamination within 12 months.</p>
        </div>
      </div>
    </div>
  );
}
