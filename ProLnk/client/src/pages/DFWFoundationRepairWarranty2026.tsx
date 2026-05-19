import { useState } from 'react';

const warrantyTypes = [
  { type: 'Lifetime Transferable', coverage: 'Lifetime on all pier work, transfers to new owner at closing. Adds $3,000–$8,000 to home resale value in DFW market.' },
  { type: '25-Year Transferable', coverage: '25 years on pier installation, prorated after year 10. Must register within 30 days of repair completion.' },
  { type: '10-Year Limited', coverage: '10 years on labor and materials. Non-transferable — voids upon sale. Common with budget contractors.' },
  { type: '1-Year Labor Only', coverage: 'Covers installation defects only. Materials warranty separate from manufacturer. Minimum standard — avoid if possible.' },
];

const coveredItems = [
  '🏗️ Foundation movement beyond 1-inch threshold',
  '⚙️ Pier failure or settling beyond spec',
  '🔧 Re-leveling if slabs drop post-repair',
  '📋 Engineer re-inspection at warranty claim',
];

const notCoveredItems = [
  '💧 New plumbing leaks after repair',
  '🎨 Cosmetic cracks in drywall or tile',
  '🌊 Flood or drainage damage',
  '🚫 Skipped annual inspection voids warranty',
];

export default function DFWFoundationRepairWarranty2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>🛡️</span>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Foundation Repair Warranty Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Know what you're buying before you sign — DFW-specific warranty breakdown</p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Select Your Warranty Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {warrantyTypes.map((w, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ padding: '12px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '2px solid #334155',
                  backgroundColor: selected === i ? '#0A1628′ : '#0F2340', color: selected === i ? '#F5E642' : '#CBD5E1',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600, textAlign: 'left' }}>
                {w.type}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ color: '#E2E8F0', fontSize: 15, lineHeight: 1.6 }}>{warrantyTypes[selected].coverage}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20 }}>
            <h3 style={{ color: '#4ADE80', fontSize: 16, marginBottom: 12 }}>✅ What's Covered</h3>
            {coveredItems.map((item, i) => <p key={i} style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 8 }}>{item}</p>)}
          </div>
          <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20 }}>
            <h3 style={{ color: '#F87171', fontSize: 16, marginBottom: 12 }}>❌ Not Covered</h3>
            {notCoveredItems.map((item, i) => <p key={i} style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 8 }}>{item}</p>)}
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📅 Annual Inspection Requirement</h3>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
            Most DFW foundation warranties require an annual inspection to remain valid. Missing even one year can void coverage.
            Schedule every spring — DFW's wet season stresses foundations most. ProLnk Vault stores your inspection history permanently.
          </p>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🏠 Store your foundation warranty in ProLnk Home Health Vault — transferable at closing, accessible forever.</p>
        </div>
      </div>
    </div>
  );
}
