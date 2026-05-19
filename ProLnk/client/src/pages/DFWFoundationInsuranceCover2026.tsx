import { useState } from 'react';

export default function DFWFoundationInsuranceCover2026() {
  const [damageType, setDamageType] = useState('');
  const [result, setResult] = useState<{ covered: string; detail: string } | null>(null);

  const damageTypes = [
    { id: 'pipe_burst', label: '💧 Pipe burst caused foundation heave' },
    { id: 'settlement', label: '📉 Gradual soil settlement' },
    { id: 'earth_movement', label: '🌍 Clay soil expansion/contraction' },
    { id: 'sinkhole', label: '🕳️ Sinkhole or void under slab' },
    { id: 'flood', label: '🌊 Flood-related foundation damage' },
    { id: 'construction', label: '🏗️ Neighbor construction vibration damage' },
  ];

  const guides: Record<string, { covered: string; detail: string }> = {
    pipe_burst: { covered: 'POSSIBLY COVERED — Document carefully', detail: 'If a plumbing pipe burst suddenly and caused foundation heave, the water damage portion may be covered but the foundation repair itself is typically excluded. File separate claims: plumber for the pipe (covered), foundation specialist for structural work (often excluded). Document the pipe failure as the cause with photos and plumber invoice.' },
    settlement: { covered: 'NOT COVERED', detail: 'Gradual soil settlement is explicitly excluded from standard DFW homeowner policies under the "earth movement" exclusion. This is the most common foundation issue in DFW due to expansive Blackland Prairie clay. This is a maintenance issue — budget $5,000–$15,000 for pier-and-beam lifting when needed.' },
    earth_movement: { covered: 'NOT COVERED', detail: 'DFW policies universally contain an earth movement exclusion. Clay soil expanding in summer rains and contracting in drought is the primary cause of DFW foundation movement. No standard policy covers this. Some specialty earthquake endorsements exist but do not cover clay shrink-swell.' },
    sinkhole: { covered: 'RARELY COVERED', detail: 'True sinkholes from limestone dissolution are uncommon in DFW (more common in Central Texas karst). Standard policies exclude. Some insurers offer sinkhole coverage as an endorsement. If you suspect a void, get a GPR (ground-penetrating radar) scan before filing any claim.' },
    flood: { covered: 'NOT COVERED (standard policy)', detail: 'Flood-related foundation erosion or heave requires separate NFIP or private flood insurance. DFW flooded neighborhoods in 2015 saw widespread coverage gaps. If your area has a flood history, contact the NFIP for a flood policy addendum for structural damage.' },
    construction: { covered: 'POSSIBLY VIA NEIGHBOR LIABILITY', detail: 'If nearby construction caused vibration damage to your foundation, the contractor’s liability insurance may cover it — not your homeowner policy. Hire a licensed engineer to document cracking with construction dates as the cause. Send a demand letter to the contractor before any claim.' },
  };

  function evaluate() {
    if (!damageType) return;
    setResult(guides[damageType] || null);
  }

  const isPartial = result?.covered.includes('POSSIBLY') || result?.covered.includes('RARELY');
  const isCovered = result?.covered === 'LIKELY COVERED';
  const borderColor = isCovered ? '#22C55E' : isPartial ? '#F5E642' : '#FF4444';
  const headerColor = isCovered ? '#22C55E' : isPartial ? '#F5E642' : '#FF6B6B';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Foundation and Home Insurance Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Most foundation damage in DFW is NOT covered. Know the exceptions and how to document the ones that might be.
          </p>
        </div>

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 What Caused Your Foundation Damage?</h2>
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
            Check Coverage →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28, borderLeft: `4px solid ${borderColor}` }}>
            <h3 style={{ color: headerColor, marginBottom: 12 }}>{result.covered}</h3>
            <p style={{ lineHeight: 1.7, fontSize: 15 }}>{result.detail}</p>
          </div>
        )}

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>⚠️ DFW Foundation Insurance Reality</h3>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
            The earth movement exclusion in standard Texas homeowner policies eliminates coverage for the vast majority of DFW foundation issues. The Blackland Prairie clay that underlies most of DFW is the primary culprit. Annual foundation surveys ($200–$400) and consistent soil moisture management are your best defense.
          </p>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>📂 Foundation Records in Your Home Health Vault</p>
          <p style={{ color: '#1A2F4A', fontSize: 14 }}>ProLnk stores inspection reports and crack documentation for future claims.</p>
        </div>
      </div>
    </div>
  );
}
