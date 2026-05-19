import { useState } from 'react';

const systems = [
  {
    id: 'split',
    name: 'Central Split System',
    icon: '🏠',
    purchase: '$3,500–$7,000',
    install: '$2,000–$4,500',
    efficiency: '16–24 SEER2',
    lifespan: '12–15 yrs (DFW)',
    maintenance: 'Moderate',
    dfwScore: 88,
    pros: ['Best for large DFW homes', 'Wide service network', 'Flexible zoning'],
    cons: ['Duct leakage in attic heat', 'Higher install cost'],
    bestFor: 'large',
  },
  {
    id: 'packaged',
    name: 'Packaged Unit',
    icon: '📦',
    purchase: '$2,800–$5,500',
    install: '$1,500–$3,000',
    efficiency: '14–18 SEER2',
    lifespan: '12–14 yrs (DFW)',
    maintenance: 'Low',
    dfwScore: 74,
    pros: ['All-in-one simplicity', 'Great for slab homes', 'Easier service access'],
    cons: ['Lower peak efficiency', 'Exposed to DFW heat'],
    bestFor: 'slab',
  },
  {
    id: 'minisplit',
    name: 'Mini-Split (Ductless)',
    icon: '🔀',
    purchase: '$1,500–$4,000/zone',
    install: '$1,000–$2,500/zone',
    efficiency: '18–33 SEER2',
    lifespan: '15–20 yrs (DFW)',
    maintenance: 'Low',
    dfwScore: 92,
    pros: ['No duct losses in DFW attics', 'Highest efficiency', 'Per-zone control'],
    cons: ['Higher upfront per zone', 'Different aesthetic'],
    bestFor: 'addition',
  },
  {
    id: 'geo',
    name: 'Geothermal',
    icon: '🌍',
    purchase: '$10,000–$20,000',
    install: '$5,000–$15,000',
    efficiency: '300–500% COP',
    lifespan: '25+ yrs (DFW)',
    maintenance: 'Very Low',
    dfwScore: 79,
    pros: ['Lowest operating cost', 'Ground stays 65°F year-round', 'Long lifespan'],
    cons: ['Very high upfront', 'Needs yard space', 'Rare DFW contractors'],
    bestFor: 'large',
  },
];

const situations = [
  { id: 'large', label: 'Large DFW Home (2,500+ sq ft)' },
  { id: 'slab', label: 'Slab Foundation / No Basement' },
  { id: 'addition', label: 'Room Addition / Retrofit' },
  { id: 'efficiency', label: 'Maximum Efficiency Priority' },
  { id: 'budget', label: 'Budget-Conscious Upfront' },
];

const recommendations: Record<string, string> = {
  large: 'split',
  slab: 'packaged',
  addition: 'minisplit',
  efficiency: 'minisplit',
  budget: 'packaged',
};

export default function DFWHVACSystemComparisonFinal() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const recommended = selected ? recommendations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW HVAC System Comparison: The Definitive Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Central Split vs Packaged vs Mini-Split vs Geothermal — optimized for DFW's extreme conditions</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏡 Your DFW Situation → Best System</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{s.label}</button>
            ))}
          </div>
          {recommended && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <strong style={{ color: '#F5E642' }}>Recommended: </strong>
              <span style={{ color: '#fff' }}>{systems.find(s => s.id === recommended)?.name} — {systems.find(s => s.id === recommended)?.pros[0]}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {systems.map(sys => (
            <div key={sys.id} onClick={() => setActiveSystem(activeSystem === sys.id ? null : sys.id)} style={{ background: recommended === sys.id ? '#1a3a20' : '#111f3a', border: `2px solid ${recommended === sys.id ? '#F5E642' : activeSystem === sys.id ? '#3b82f6' : '#1e3a5f'}`, borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{sys.icon}</div>
              <h3 style={{ color: recommended === sys.id ? '#F5E642' : '#fff', fontSize: 15, margin: '0 0 8px' }}>{sys.name}</h3>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>DFW Score: <span style={{ color: '#F5E642', fontWeight: 700 }}>{sys.dfwScore}/100</span></div>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.8 }}>
                <div>💰 {sys.purchase}</div>
                <div>⚡ {sys.efficiency}</div>
                <div>📅 {sys.lifespan}</div>
              </div>
              {activeSystem === sys.id && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: '#4ade80', marginBottom: 4 }}>✅ {sys.pros.join(' • ')}</div>
                  <div style={{ fontSize: 12, color: '#f87171' }}>⚠️ {sys.cons.join(' • ')}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔥 DFW Key Insight</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>DFW's 7-month cooling season (100°F+ peaks) makes duct integrity critical. Mini-splits eliminate attic duct losses — a major efficiency drain in DFW. For most DFW homes with existing ducts, a high-SEER2 central split system offers the best balance of performance and cost.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 12 }}>ProLnk — Connect with Verified DFW HVAC Pros</div>
      </div>
    </div>
  );
}
