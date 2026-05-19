import { useState } from 'react';

export default function DFWHVACInsuranceCover2026() {
  const [damageType, setDamageType] = useState('');
  const [result, setResult] = useState<{ covered: string; detail: string } | null>(null);

  const damageTypes = [
    { id: 'hail', label: '🌨️ Hail damage to outdoor unit' },
    { id: 'wind', label: '💨 Wind-blown debris damage' },
    { id: 'wear', label: '⚙️ Gradual wear and breakdown' },
    { id: 'flood', label: '🌊 Flood damage to unit' },
    { id: 'power', label: '⚡ Power surge damage' },
    { id: 'breakdown', label: '🔧 Mechanical breakdown / refrigerant leak' },
  ];

  const guides: Record<string, { covered: string; detail: string }> = {
    hail: { covered: 'LIKELY COVERED', detail: 'Hail damage to your outdoor condenser is typically covered under your dwelling or other structures policy. File within 12 months of the storm. Document dents on fins and coils with photos. A separate wind/hail deductible often applies in DFW — commonly 1–2% of dwelling value.' },
    wind: { covered: 'LIKELY COVERED', detail: 'Wind-blown debris that physically damages your HVAC unit is covered as sudden and accidental damage. Document the debris and resulting damage. If the debris came from a neighbor’s tree, their liability policy may also apply.' },
    wear: { covered: 'NOT COVERED', detail: 'Gradual wear, rust, corrosion, and normal mechanical failure are explicitly excluded from standard homeowner policies. This is what HVAC warranties and home warranties cover. Consider a home warranty for aging systems (10+ years).' },
    flood: { covered: 'NOT COVERED (standard policy)', detail: 'Standard DFW homeowner policies exclude flood damage. Ground-level units that flood require separate NFIP flood insurance. If water entered through a roof opening caused by wind, that portion may be covered — document carefully.' },
    power: { covered: 'SOMETIMES COVERED', detail: 'Power surge damage depends on your policy. Some include equipment breakdown or electrical damage. Ask your insurer specifically. Whole-home surge protectors ($150–$400 installed) are better prevention than relying on a claim.' },
    breakdown: { covered: 'NOT COVERED', detail: 'Refrigerant leaks, compressor failure, and mechanical breakdown are maintenance/warranty issues, not covered events. A home warranty ($50–$80/mo) or HVAC service agreement covers these. Get quotes before your system ages past 8 years.' },
  };

  function evaluate() {
    if (!damageType) return;
    setResult(guides[damageType] || null);
  }

  const isCovered = result?.covered.includes('COVERED') && !result?.covered.includes('NOT');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC and Home Insurance Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW hail storms are frequent. Know exactly what your policy covers before you need to file a claim.
          </p>
        </div>

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>⚡ What Type of HVAC Damage?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {damageTypes.map(d => (
              <button key={d.id} onClick={() => { setDamageType(d.id); setResult(null); }}
                style={{ background: damageType === d.id ? '#F5E642' : '#1A2F4A', color: damageType === d.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '14px 20px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
                {d.label}
              </button>
            ))}
          </div>
          <button onClick={evaluate} disabled={!damageType}
            style={{ marginTop: 20, width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '16px', fontWeight: 800, fontSize: 16, cursor: damageType ? 'pointer' : 'not-allowed', opacity: damageType ? 1 : 0.5 }}>
            Check Insurance Coverage →
          </button>
        </div>

        {result && (
          <div style={{ background: isCovered ? '#0A2010' : '#2D0A0A', borderRadius: 12, padding: 28, marginBottom: 28, borderLeft: `4px solid ${isCovered ? '#22C55E' : '#FF4444'}` }}>
            <h3 style={{ color: isCovered ? '#22C55E' : '#FF6B6B', marginBottom: 12 }}>{result.covered}</h3>
            <p style={{ lineHeight: 1.7, fontSize: 15 }}>{result.detail}</p>
          </div>
        )}

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 DFW HVAC Coverage Quick Reference</h3>
          <div style={{ display: 'grid', gap: 8, fontSize: 13 }}>
            {['✅ Hail dents on condenser fins — covered', '✅ Wind debris physical impact — covered', '❌ Normal wear and aging — not covered', '❌ Flood water damage — requires flood policy', '❌ Mechanical breakdown — home warranty territory', '⚠️ Power surge — check your specific policy'].map((item, i) => (
              <div key={i} style={{ background: '#1A2F4A', borderRadius: 8, padding: '10px 16px' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>📂 Store HVAC Records in Your Home Health Vault</p>
          <p style={{ color: '#1A2F4A', fontSize: 14 }}>ProLnk keeps your HVAC history ready for insurance claims — instantly.</p>
        </div>
      </div>
    </div>
  );
}
