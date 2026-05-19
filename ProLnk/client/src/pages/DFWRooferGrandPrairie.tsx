import { useState } from 'react';

type DamageLevel = 'minor' | 'moderate' | 'major';

const damageData: Record<DamageLevel, {
  label: string;
  icon: string;
  description: string;
  recommendation: string;
  repairRange: string;
  replaceRange: string;
  verdict: string;
  verdictIcon: string;
}> = {
  minor: {
    label: 'Minor Damage',
    icon: '🟡',
    description: 'A few missing shingles, small hail hits, minor flashing issues. No visible interior leaks.',
    recommendation: 'Repair',
    repairRange: '$350 – $1,200',
    replaceRange: '$8,000 – $14,000',
    verdict: 'Repair is the right call. Likely insurable as a maintenance claim. Document with photos before work starts.',
    verdictIcon: '🔨',
  },
  moderate: {
    label: 'Moderate Damage',
    icon: '🟠',
    description: 'Multiple areas affected, cracked or curling shingles, active minor leaks, storm-damaged ridge cap.',
    recommendation: 'Repair or Replace — get adjuster opinion',
    repairRange: '$1,800 – $4,500',
    replaceRange: '$9,500 – $17,000',
    verdict: 'File an insurance claim first. An adjuster may approve full replacement — many Grand Prairie homeowners qualify after hail events.',
    verdictIcon: '📋',
  },
  major: {
    label: 'Major Damage',
    icon: '🔴',
    description: 'Large sections compromised, visible decking damage, multiple active leaks, structural concerns.',
    recommendation: 'Full Replacement',
    repairRange: 'Temporary tarp only: $400 – $900',
    replaceRange: '$11,000 – $22,000',
    verdict: 'Full replacement required. Insurance claim is strongly recommended — most policies cover storm damage. Do NOT patch — it won\’t pass inspection.',
    verdictIcon: '🏗️',
  },
};

export default function DFWRooferGrandPrairie() {
  const [level, setLevel] = useState<DamageLevel | ''>('');
  const data = level ? damageData[level] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ borderBottom: '3px solid #F5E642', paddingBottom: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            ⛈️ GRAND PRAIRIE TX — VALUE-FOCUSED STORM REPAIR
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Grand Prairie Roofers<br />Storm Repair Experts
          </h1>
          <p style={{ color: '#a0aec0', fontSize: 18, marginTop: 16, maxWidth: 640 }}>
            Grand Prairie gets hit hard every storm season. Our roofing pros know the local damage patterns, work directly with insurance adjusters, and deliver honest repairs without the storm-chaser markups.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2f1a', border: '1px solid #2d5a2d', borderRadius: 12, padding: 20, marginBottom: 32, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28 }}>⚠️</span>
          <div>
            <div style={{ fontWeight: 700, color: '#86efac', marginBottom: 4 }}>Insurance Claim Tip for Grand Prairie Homeowners</div>
            <div style={{ color: '#a0aec0', fontSize: 15 }}>DFW hailstorms often qualify entire neighborhoods for full roof replacements. If your neighbors are getting new roofs, yours may qualify too — even if damage looks minor. Always file first, decide later.</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111f35', border: '2px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>
            ⛈️ Storm Damage Estimator
          </h2>
          <p style={{ color: '#a0aec0', marginBottom: 28 }}>Describe your damage level to get a repair vs. replace recommendation and cost range.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
            {(['minor', 'moderate', 'major'] as DamageLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                style={{
                  padding: '20px 12px',
                  backgroundColor: level === lvl ? '#F5E642′ : '#0A1628',
                  color: level === lvl ? '#0A1628′ : '#fff',
                  border: `2px solid ${level === lvl ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{damageData[lvl].icon}</div>
                <div>{damageData[lvl].label}</div>
                <div style={{ fontSize: 12, fontWeight: 400, marginTop: 6, opacity: 0.8 }}>{damageData[lvl].description.substring(0, 50)}...</div>
              </button>
            ))}
          </div>

          {data && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#a0aec0', fontSize: 13, marginBottom: 4 }}>DAMAGE DESCRIPTION</div>
                <div style={{ color: '#e2e8f0′ }}>{data.description}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 6 }}>🔨 REPAIR COST</div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>{data.repairRange}</div>
                </div>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 6 }}>🏗️ REPLACEMENT COST</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{data.replaceRange}</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#1a2f1a', border: '1px solid #2d5a2d', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, color: '#86efac' }}>{data.verdictIcon} Our Recommendation: {data.recommendation}</div>
                <div style={{ color: '#a0aec0′ }}>{data.verdict}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '📋', label: 'Insurance Claim Assist', detail: 'We work directly with your adjuster' },
            { icon: '🏠', label: 'Shingle Replacement', detail: 'All major brands stocked' },
            { icon: '🌊', label: 'Emergency Tarping', detail: '24-hour response' },
            { icon: '🔍', label: 'Free Inspection', detail: 'No obligation estimate' },
          ].map((svc) => (
            <div key={svc.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{svc.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{svc.label}</div>
              <div style={{ color: '#a0aec0', fontSize: 14 }}>{svc.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Free Roof Inspection — Grand Prairie</div>
          <p style={{ color: '#1a2f4a', marginBottom: 24 }}>No storm chasers. Local pros with local references, matched to your area.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 800, fontSize: 17, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Schedule Free Inspection ⛈️
          </button>
        </div>

      </div>
    </div>
  );
}
