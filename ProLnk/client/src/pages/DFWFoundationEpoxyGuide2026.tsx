import { useState } from 'react';

export default function DFWFoundationEpoxyGuide2026() {
  const [crackType, setCrackType] = useState('');
  const [result, setResult] = useState('');

  const crackTypes = [
    { id: 'hairline', label: '〰️ Hairline crack (less than 1/16 inch wide)' },
    { id: 'narrow', label: '↔️ Narrow crack (1/16 to 1/4 inch wide)' },
    { id: 'wide', label: '⚠️ Wide crack (greater than 1/4 inch wide)' },
    { id: 'active', label: '🔄 Crack is growing or changing over time' },
    { id: 'horizontal', label: '↔️ Horizontal crack in basement or stem wall' },
    { id: 'leaking', label: '💧 Crack is leaking water' },
  ];

  const recommendations: Record<string, string> = {
    'hairline': '✅ EPOXY WORKS WELL — Hairline cracks in concrete are ideal candidates for epoxy injection. Epoxy restores tensile strength equal to or greater than original concrete. DIY epoxy kits (–) work for hairline cracks if crack is dry and stable. Professional injection recommended for structural elements.',
    'narrow': '✅ EPOXY APPLICABLE — Cracks up to 1/4 inch are injectable with epoxy under moderate pressure. Verify the crack is not actively growing. A structural engineer should assess whether the crack represents ongoing movement before sealing — sealed cracks can mask future activity.',
    'wide': '🚨 EPOXY ALONE INSUFFICIENT — Wide cracks indicate significant displacement or settlement. Epoxy seals the crack cosmetically but does not address the cause. In DFW, wide cracks typically require pier underpinning or soil stabilization first. Get a structural engineer evaluation before any crack repair.',
    'active': '🚫 DO NOT SEAL YET — Injecting epoxy into an actively growing crack seals in the problem and masks ongoing movement. Monitor crack width monthly with a crack gauge or pencil marks. Determine and address root cause (moisture, settlement, load) before any injection.',
    'horizontal': '🚨 ENGINEER REQUIRED — Horizontal cracks indicate lateral soil pressure and potential structural compromise. This is not an epoxy situation — structural repair (carbon fiber straps, wall anchors, or full replacement) may be needed. Get a licensed structural engineer evaluation immediately.',
    'leaking': '🔧 POLYURETHANE FIRST — Leaking cracks should be sealed with flexible polyurethane foam injection, not rigid epoxy. Epoxy is rigid and will crack again if movement or water pressure continues. After stopping water intrusion, assess whether structural repair is needed.',
  };

  const handleCheck = () => {
    if (crackType) setResult(recommendations[crackType] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Home Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>DFW Foundation Crack Epoxy Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem', fontSize: '1.05rem' }}>Epoxy injection fills and structurally seals foundation cracks — but only when the crack type and cause are right. Know the difference before you inject.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '✅', label: 'Best For', value: 'Hairline to 1/4 in. cracks' },
            { icon: '💪', label: 'Strength', value: 'Stronger than concrete' },
            { icon: '🔧', label: 'DIY Kit Cost', value: '$60–$150 at hardware store' },
            { icon: '👷', label: 'Pro Injection', value: '$400–$800 per crack' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Crack Type → Treatment Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {crackTypes.map(c => (
              <button key={c.id} onClick={() => setCrackType(c.id)}
                style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', border: crackType === c.id ? '2px solid #F5E642' : '1px solid #1e3a5f', backgroundColor: crackType === c.id ? '#1a3060' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck} disabled={!crackType}
            style={{ backgroundColor: crackType ? '#F5E642' : '#2a3a50', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: crackType ? 'pointer' : 'not-allowed', fontSize: '0.95rem', width: '100%' }}>
            Get Treatment Recommendation →
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>📌 Epoxy vs. Polyurethane</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.88rem', lineHeight: 1.7 }}>Epoxy is rigid and structural — ideal for dry, stable hairline cracks where you want to restore tensile strength. Polyurethane foam is flexible and waterproofing — ideal for wet or active cracks where movement will continue. Using epoxy on a wet crack or active crack is a common mistake that leads to re-cracking.</p>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#0f2040', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#a0aec0', fontSize: '0.8rem' }}>Need a DFW foundation repair pro? <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> connects you with vetted local contractors.</p>
        </div>
      </div>
    </div>
  );
}