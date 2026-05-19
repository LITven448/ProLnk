import { useState } from 'react';

const MATERIALS = [
  { id: 'composite', label: 'Composite (Trex/TimberTech)', costPerSqFt: 28, maintPerSqFt: 0.1, lifespan: 30, termiteRisk: 'None' },
  { id: 'cedar', label: 'Cedar Wood', costPerSqFt: 18, maintPerSqFt: 0.6, lifespan: 20, termiteRisk: 'Medium' },
  { id: 'pine', label: 'Pressure-Treated Pine', costPerSqFt: 14, maintPerSqFt: 0.7, lifespan: 15, termiteRisk: 'Low' },
  { id: 'ipe', label: 'Ipe Hardwood', costPerSqFt: 38, maintPerSqFt: 0.3, lifespan: 40, termiteRisk: 'Very Low' },
];

const ELEVATIONS = [
  { id: 'ground', label: 'Ground Level (0–18″)', laborMult: 1.0, permitRequired: false },
  { id: 'mid', label: 'Mid-Elevation (18″–5ft)', laborMult: 1.3, permitRequired: true },
  { id: 'elevated', label: 'Elevated (5ft+)', laborMult: 1.65, permitRequired: true },
];

export default function DFWDeckBuildingGuide() {
  const [sqft, setSqft] = useState(300);
  const [material, setMaterial] = useState('composite');
  const [elevation, setElevation] = useState('ground');
  const [shadeStructure, setShadeStructure] = useState(false);

  const mat = MATERIALS.find(m => m.id === material)!;
  const elev = ELEVATIONS.find(e => e.id === elevation)!;
  const baseMaterial = Math.round(sqft * mat.costPerSqFt);
  const baseLaborPerSqFt = 12;
  const labor = Math.round(sqft * baseLaborPerSqFt * elev.laborMult);
  const shadeAdd = shadeStructure ? Math.round(sqft * 0.4 * 800) : 0;
  const totalCost = baseMaterial + labor + shadeAdd;
  const annualMaint = Math.round(sqft * mat.maintPerSqFt);
  const tenYrMaint = annualMaint * 10;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Deck Building Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
          DFW's heat and UV destroy wood decks fast — composite is the smarter investment for most homeowners.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 36 }}>
          {[
            { icon: '☀️', title: 'DFW Heat Destroys Wood', body: 'DFW averages 60+ days above 100°F. Untreated wood decks cup, crack, and splinter within 3–5 years. Composite expands uniformly and won\’t splinter bare feet in summer.' },
            { icon: '🐜', title: 'Termite Risk Is Real', body: 'DFW has one of Texas\’s highest subterranean termite pressures. Pressure-treated pine resists termites, but composite eliminates the risk entirely — no wood = no termite food source.' },
            { icon: '📋', title: 'Permit Requirements', body: 'Any deck over 30″ from grade in most DFW cities requires a building permit. Frisco, McKinney, Plano, and Dallas all require stamped structural plans for elevated decks.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '10px 0 6px' }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, marginTop: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔧 Deck Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Deck Size (sq ft)</label>
              <input type="range" min={100} max={1000} step={25} value={sqft} onChange={e => setSqft(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <span style={{ color: '#F5E642', fontSize: 15, fontWeight: 700 }}>{sqft} sq ft</span>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Decking Material</label>
              <select value={material} onChange={e => setMaterial(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {MATERIALS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Elevation</label>
              <select value={elevation} onChange={e => setElevation(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {ELEVATIONS.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
              </select>
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 20 }}>
            <input type="checkbox" checked={shadeStructure} onChange={e => setShadeStructure(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
            <span style={{ color: '#94A3B8', fontSize: 14 }}>Add shade structure (pergola/awning)</span>
          </label>

          {elev.permitRequired && (
            <div style={{ background: '#2d2200', border: '1px solid #F5E642', borderRadius: 10, padding: 12, marginBottom: 16 }}>
              <span style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>📋 Building permit required for this elevation. Budget $500–$1,200 for permit + inspections.</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { label: 'Materials', value: `$${baseMaterial.toLocaleString()}` },
              { label: 'Labor', value: `$${labor.toLocaleString()}` },
              { label: 'Total Installed', value: `$${totalCost.toLocaleString()}` },
              { label: 'Annual Maint.', value: `$${annualMaint}/yr` },
              { label: '10-yr Maint.', value: `$${tenYrMaint.toLocaleString()}` },
              { label: 'Termite Risk', value: mat.termiteRisk },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginTop: 20, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>🛡️ DFW Termite Protection</h3>
          {[
            { type: 'Composite Deck', rating: '✅ No risk — no organic material for termites to consume.' },
            { type: 'Ipe Hardwood', rating: '✅ Very low — natural oils repel termites for decades.' },
            { type: 'Pressure-Treated Pine', rating: '⚠️ Low — treatment wears off over time; reapply borate treatments every 5 years.' },
            { type: 'Cedar', rating: '⚠️ Medium — aromatic cedar resists initially but loses protection as wood ages.' },
          ].map(item => (
            <div key={item.type} style={{ display: 'flex', gap: 12, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#94A3B8', fontSize: 13, fontWeight: 700, minWidth: 160 }}>{item.type}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{item.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
