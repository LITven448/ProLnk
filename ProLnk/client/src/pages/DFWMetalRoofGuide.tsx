import { useState } from 'react';

const metalTypes = ['Standing Seam Steel', 'Standing Seam Aluminum', 'Metal Shingles', 'Corrugated Metal Panels'];
const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

const metalInfo: Record<string, { lifespan: string; hailRating: string; energySavings: string; noiseLevel: string; installCost: string }> = {
  'Standing Seam Steel': {
    lifespan: '40-70 years',
    hailRating: 'Class 4 — denting possible at 2″+, no granule loss or leak risk',
    energySavings: '10-25% cooling reduction in DFW summer with reflective coating',
    noiseLevel: 'Moderate in DFW rain — foam insulation underlayment reduces noise',
    installCost: '$12-18/sq ft installed (1,500 sq ft home: $18,000-27,000)',
  },
  'Standing Seam Aluminum': {
    lifespan: '40-60 years — no rust in DFW alkaline soil environment',
    hailRating: 'Class 4 — softer metal means denting at smaller hail sizes than steel',
    energySavings: '15-30% cooling reduction — aluminum reflects more UV than steel',
    noiseLevel: 'Similar to steel — proper underlayment essential in DFW storm season',
    installCost: '$14-22/sq ft installed',
  },
  'Metal Shingles': {
    lifespan: '30-50 years with proper coating maintenance',
    hailRating: 'Class 3-4 depending on gauge — check individual product ratings',
    energySavings: '8-20% cooling reduction',
    noiseLevel: 'Quieter than standing seam in rain — more similar to asphalt shingle profile',
    installCost: '$8-14/sq ft installed — lower entry cost than standing seam',
  },
  'Corrugated Metal Panels': {
    lifespan: '20-40 years depending on coating quality',
    hailRating: 'Class 3 — exposed fasteners can fail in severe DFW hail',
    energySavings: '5-15% cooling reduction',
    noiseLevel: 'Loudest option — not recommended for DFW residential without solid sheathing',
    installCost: '$5-9/sq ft installed — most economical metal option',
  },
};

const maintenanceGuide: Record<string, Record<string, string>> = {
  'Standing Seam Steel': {
    Excellent: 'Inspect seams and fasteners every 5 years. Check coating integrity. Touch up scratches immediately to prevent rust in DFW alkaline conditions.',
    Good: 'Touch up any scratched coating immediately. Re-coat if finish is fading from DFW UV exposure. Annual drain inspection.',
    Fair: 'Full seam inspection — assess for oil canning (waviness) and compromised seams. Repaint if base metal is exposed.',
    Poor: 'Panel replacement or full re-roof assessment needed. Significant rust or seam failure requires immediate repair.',
  },
  'Standing Seam Aluminum': {
    Excellent: 'Low maintenance — inspect seams and transitions annually. Aluminum does not rust but check sealant degradation.',
    Good: 'Re-apply sealant at transitions and penetrations. DFW heat cycles cause significant expansion/contraction.',
    Fair: 'Expansion joint inspection critical — aluminum moves substantially in DFW temperature extremes (-10 to 110 F).',
    Poor: 'Panel assessment and likely partial replacement. Aluminum denting from hail is cosmetic — check seam integrity.',
  },
  'Metal Shingles': {
    Excellent: 'Annual inspection — check fastener tightness and coating condition. DFW hail may dent individual shingles.',
    Good: 'Replace any dented or lifted shingles. Metal shingles are individually replaceable — advantage after DFW hail.',
    Fair: 'Full fastener assessment — exposed fasteners common failure in DFW wind events. Recoat if needed.',
    Poor: 'Section or full replacement. Metal shingle failure often localized — targeted replacement may be cost-effective.',
  },
  'Corrugated Metal Panels': {
    Excellent: 'Check all exposed fasteners annually — primary leak point in DFW rain events.',
    Good: 'Replace fastener washers showing cracking. Apply fresh sealant at all penetrations before storm season.',
    Fair: 'Significant fastener replacement likely needed. Rust at fastener holes is common — full panel assessment required.',
    Poor: 'Full replacement recommended. Corrugated with significant rust or fastener failure is a DFW leak risk.',
  },
};

export default function DFWMetalRoofGuide() {
  const [metalType, setMetalType] = useState('');
  const [condition, setCondition] = useState('');
  const info = metalType ? metalInfo[metalType] : null;
  const maintenance = metalType && condition ? maintenanceGuide[metalType]?.[condition] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px' }}>🏠 ProLnk DFW Roofing Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>Metal Roofing Guide — Dallas/Fort Worth</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '24px', lineHeight: '1.6′ }}>
          Metal roofing is the fastest-growing residential roofing category in DFW. Key DFW considerations: superior hail performance (denting vs granule loss), energy savings in extreme summer heat, and noise management during DFW thunderstorms.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[{ label: '🏆 vs Asphalt', val: '3-4x longer lifespan' }, { label: '🌨️ Hail Advantage', val: 'Dents only — no granule loss' }, { label: '❄️ Energy Savings', val: '10-30% cooling reduction' }, { label: '📈 ROI', val: '85-95% home value return' }].map(({ label, val }) => (
            <div key={label} style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47′ }}>
              <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: '12px', padding: '24px', border: '1px solid #1E2D47', marginBottom: '16px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px', fontSize: '18px' }}>🔍 Metal Roof Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Metal Roof Type</label>
              <select value={metalType} onChange={e => setMetalType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select type...</option>
                {metalTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Current Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select condition...</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {info && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47', marginBottom: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div><span style={{ color: '#F5E642′ }}>Lifespan: </span>{info.lifespan}</div>
                <div><span style={{ color: '#F5E642′ }}>Cost: </span>{info.installCost}</div>
                <div style={{ gridColumn: '1/-1′ }}><span style={{ color: '#F5E642' }}>Hail: </span>{info.hailRating}</div>
                <div style={{ gridColumn: '1/-1′ }}><span style={{ color: '#F5E642' }}>Energy: </span>{info.energySavings}</div>
                <div style={{ gridColumn: '1/-1′ }}><span style={{ color: '#F5E642' }}>Noise: </span>{info.noiseLevel}</div>
              </div>
            </div>
          )}
          {maintenance && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '16px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '6px' }}>Maintenance Recommendation</div>
              <div>{maintenance}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47′ }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '8px' }}>🌧️ DFW Rain Noise Note</div>
          <p style={{ color: '#9BA3B8', fontSize: '14px', margin: 0, lineHeight: '1.6′ }}>DFW averages 78 thunderstorm days per year. Minimize noise with foam insulation beneath metal panels, solid plywood sheathing, and higher gauge (thicker) metal. Most DFW homeowners report adapting within weeks.</p>
        </div>
      </div>
    </div>
  );
}
