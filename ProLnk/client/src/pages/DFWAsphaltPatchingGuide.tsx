import { useState } from 'react';

const CRACK_SIZES = ['Hairline (<1/4″)', 'Small (1/4″ - 1/2″)', 'Medium (1/2″ - 1″)', 'Large (>1″)'];
const SEASONS = ['Spring (Mar-May)', 'Summer (Jun-Aug)', 'Fall (Sep-Nov)', 'Winter (Dec-Feb)'];
const AREAS = ['Small (<200 sqft)', 'Medium (200-500 sqft)', 'Large (>500 sqft)'];

function getRepairRecommendation(crack: string, season: string, area: string) {
  const isHot = season.includes('Summer');
  const isLarge = crack.includes('Large');
  const isMedium = crack.includes('Medium');
  const bigArea = area.includes('Large');

  if (isHot) {
    return {
      method: 'Wait or Early Morning Only',
      note: 'DFW summer heat (100°F+) makes asphalt pliable — sealants won\’t cure properly. Work before 8am or wait for fall.',
      material: isLarge ? 'Hot mix patch + professional crew' : 'Rubberized crack filler',
      cost: bigArea ? '$800–$2,400′ : '$150–$600',
    };
  }
  if (isLarge || isMedium) {
    return {
      method: season.includes('Winter') ? 'Cold Patch (temporary)' : 'Hot Patch or Professional',
      note: 'Large cracks need full-depth patching. DFW clay soil shifts cause deep cracking — address base if needed.',
      material: 'Cold patch mix or hire asphalt contractor',
      cost: bigArea ? '$600–$2,000′ : '$200–$800',
    };
  }
  return {
    method: 'DIY Crack Filler',
    note: 'Spring and fall are ideal DFW windows. Temps 50–85°F allow proper cure time before next weather event.',
    material: 'Rubberized pour-in crack filler + squeegee sealer',
    cost: '$50–$200',
  };
}

export default function DFWAsphaltPatchingGuide() {
  const [crack, setCrack] = useState('');
  const [season, setSeason] = useState('');
  const [area, setArea] = useState('');
  const result = crack && season && area ? getRepairRecommendation(crack, season, area) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🛣️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Asphalt Patching Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32 }}>DFW's extreme heat cycles cause asphalt to expand, contract, and crack faster than most climates. Timing your repair is as important as the repair itself.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⚠️ DFW Climate Factors</h2>
          <ul style={{ color: '#9BA3B8', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Summer pavement temps reach 140–160°F — sealants fail before curing</li>
            <li>Clay soil expands in spring rains, contracts in summer drought — causes heaving</li>
            <li>Best repair windows: March–May and September–November</li>
            <li>Cold patch is temporary — plan hot patch or professional in spring</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>🔧 Repair Estimator</h2>
          {[{ label: 'Crack Size', value: crack, set: setCrack, options: CRACK_SIZES },
            { label: 'Current DFW Season', value: season, set: setSeason, options: SEASONS },
            { label: 'Driveway Area', value: area, set: setArea, options: AREAS }].map(({ label, value, set, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => set(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.method}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 12 }}>{result.note}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px' }}>
                  <div style={{ color: '#9BA3B8', fontSize: 11 }}>MATERIAL</div>
                  <div style={{ color: '#E8EAF0', fontSize: 14 }}>{result.material}</div>
                </div>
                <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px' }}>
                  <div style={{ color: '#9BA3B8', fontSize: 11 }}>EST. COST</div>
                  <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>{result.cost}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>📋 Patch Type Comparison</h2>
          {[['Cold Patch', 'DIY, immediate, temporary fix. Degrades faster in DFW heat.'],
            ['Hot Patch', 'Contractor-applied, durable, correct for structural cracks.'],
            ['Sealcoating', 'Preventive only — apply every 3–5 years in spring or fall.']].map(([type, desc]) => (
            <div key={type} style={{ borderBottom: '1px solid #1E3A5F', paddingBottom: 12, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{type}: </span>
              <span style={{ color: '#9BA3B8', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
