import { useState } from 'react';

const hardnessOptions = ['Moderate (DFW North)', 'Hard (DFW Central)', 'Very Hard (DFW South/West)'];
const showerTypes = ['Ceramic Tile', 'Porcelain Tile', 'Natural Stone', 'Glass Tile'];

const schedules: Record<string, { weekly: string[]; monthly: string[]; annual: string[]; products: string[] }> = {
  'Moderate (DFW North)': {
    weekly: ['Squeegee glass doors after each use', 'Spray citric acid solution on tile', 'Rinse thoroughly with warm water'],
    monthly: ['Apply calcium lime remover to grout lines', 'Clean showerhead with vinegar soak', 'Check caulk lines for mold or gaps'],
    annual: ['Professional grout sealing', 'Deep clean with oxalic acid solution', 'Inspect all tile for hairline cracks'],
    products: ["Bar Keepers Friend", "CLR Calcium Lime Rust Remover", "Citric acid powder (food grade)"],
  },
  'Hard (DFW Central)': {
    weekly: ['Squeegee every single shower use', 'Daily citric acid spray on glass panels', 'Wipe tile edges completely dry'],
    monthly: ['Full lime remover treatment on all surfaces', 'Two-hour vinegar soak for showerhead', 'Re-caulk any gaps before water intrudes'],
    annual: ['Professional descaling service call', 'Replace showerhead if flow is restricted', 'Full grout resealing with penetrating sealer'],
    products: ["Lime-A-Way Spray", "10% citric acid solution", "Rain-X for glass shower doors"],
  },
  'Very Hard (DFW South/West)': {
    weekly: ['Squeegee then wipe glass completely dry', 'Daily citric acid spray on all surfaces', 'Check door seals for calcium bridging weekly'],
    monthly: ['Full professional-grade descale treatment', 'Replace whole-home water filter if installed', 'Polish glass with Rain-X after cleaning'],
    annual: ['Evaluate whole-home water softener installation', 'Professional tile restoration if etching present', 'Full perimeter recaulk and reseal'],
    products: ["Industrial citric acid concentrate", "Water softener salt pellets", "Diamond polishing pad for glass etching"],
  },
};

export default function DFWTileShowerMaintenanceGuide() {
  const [showerType, setShowerType] = useState('');
  const [hardness, setHardness] = useState('');
  const [showResults, setShowResults] = useState(false);

  const result = hardness ? schedules[hardness] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🚿 DFW Home Care</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Tile Shower Maintenance Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 16, marginBottom: 32 }}>DFW hard water causes calcium buildup faster than almost anywhere in Texas. Here is how to stay ahead of it.</p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>💧 Why DFW Water Destroys Showers</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>DFW water hardness ranges from 140 to 350 mg/L depending on your municipality. Calcium and magnesium deposit on tile, grout, and glass with every shower. Without a maintenance routine, glass shower doors etch permanently within 2 to 3 years and grout darkens with mineral staining.</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔧 Get Your Custom Cleaning Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Shower Surface Type</label>
              <select value={showerType} onChange={e => setShowerType(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select type...</option>
                {showerTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Your DFW Area Water Hardness</label>
              <select value={hardness} onChange={e => setHardness(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select area...</option>
                {hardnessOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!showerType || !hardness} style={{ backgroundColor: showerType && hardness ? '#F5E642′ : '#1E3A5F', color: showerType && hardness ? '#0A1628' : '#4A5568', padding: '12px 28px', borderRadius: 8, border: ’none', fontWeight: 700, fontSize: 15, cursor: showerType && hardness ? 'pointer' : 'default' }}>
            Generate My Schedule →
          </button>
        </div>

        {showResults && result && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: '📅 Weekly Tasks', items: result.weekly, color: '#10B981′ },
              { label: '🗓️ Monthly Tasks', items: result.monthly, color: '#F59E0B' },
              { label: '🔩 Annual Deep Clean', items: result.annual, color: '#EF4444′ },
              { label: '🛒 Recommended Products', items: result.products, color: '#8B5CF6′ },
            ].map(section => (
              <div key={section.label} style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
                <h3 style={{ color: section.color, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{section.label}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1E3A5F' }}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
