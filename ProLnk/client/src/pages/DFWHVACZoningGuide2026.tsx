import { useState } from 'react';

const scenarios = [
  { size: 'small', label: 'Under 2,500 sqft', layout: 'open', recommendation: 'Single-zone programmable thermostat', detail: 'Standard single-zone setup handles open floor plans efficiently. Upgrade to smart thermostat for 10–15% savings. No zoning needed.', cost: '$300–$600', savings: '10–15%' },
  { size: 'medium', label: '2,500–3,500 sqft', layout: 'mixed', recommendation: '2-zone damper system', detail: 'Separate upstairs/downstairs zones. Damper system added to existing HVAC ductwork. Ideal for 2-story DFW homes with heat-rise issues in summer.', cost: '$2,000–$3,500', savings: '18–25%' },
  { size: 'large', label: '3,500–5,000 sqft', layout: 'complex', recommendation: '3-zone damper + smart controls', detail: 'Living, sleeping, and bonus room zones independently controlled. Pairs with Ecobee or Nest multi-zone. Standard for Southlake and Frisco builds.', cost: '$3,500–$5,000', savings: '22–30%' },
  { size: 'addition', label: 'Room Addition / Garage Conversion', layout: 'addition', recommendation: 'Mini-split ductless system', detail: 'Additions are impossible to zone into existing ductwork cost-effectively. Mini-splits run $1,500–$3,000 per unit, heat and cool, and add zero duct load.', cost: '$1,500–$3,000/unit', savings: 'Up to 40% for addition' },
];

const sizeOptions = [
  { id: 'small', label: '< 2,500 sqft' },
  { id: 'medium', label: '2,500–3,500 sqft' },
  { id: 'large', label: '3,500–5,000 sqft' },
  { id: 'addition', label: 'Room Addition' },
];

export default function DFWHVACZoningGuide2026() {
  const [selected, setSelected] = useState('medium');
  const rec = scenarios.find(s => s.size === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ fontSize: 27, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW HVAC Zoning Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Multi-zone HVAC for DFW homes 2,500+ sqft — damper systems, mini-splits, and energy savings data.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
          {sizeOptions.map(opt => (
            <button key={opt.id} onClick={() => setSelected(opt.id)}
              style={{ padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: selected === opt.id ? '#F5E642′ : '#1e3a5f', color: selected === opt.id ? '#0A1628' : '#94a3b8' }}>
              {opt.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 26 }}>
          <h2 style={{ fontSize: 20, color: '#F5E642', marginBottom: 6 }}>✅ Recommended: {rec.recommendation}</h2>
          <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, marginBottom: 18 }}>{rec.detail}</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px 20px', flex: 1, minWidth: 140 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>INSTALLED COST</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{rec.cost}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px 20px', flex: 1, minWidth: 140 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ENERGY SAVINGS</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{rec.savings}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: 18, marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🔧 ProLnk Vetted HVAC Pros</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>HVAC zoning requires licensed professionals. ProLnk connects DFW homeowners with vetted HVAC contractors who specialize in zoning systems — all work recorded in your Home Health Vault.</p>
        </div>
      </div>
    </div>
  );
}
