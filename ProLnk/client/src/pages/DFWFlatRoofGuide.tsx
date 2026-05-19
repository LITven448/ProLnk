import { useState } from 'react';

const flatMaterials = ['TPO (Thermoplastic Polyolefin)', 'EPDM (Rubber)', 'Modified Bitumen'];
const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

const materialInfo: Record<string, { lifespan: string; cost: string; dfwNote: string; uvNote: string }> = {
  'TPO (Thermoplastic Polyolefin)': {
    lifespan: '15-20 years',
    cost: '.50-8.50/sq ft installed',
    dfwNote: 'Most popular flat roof material in DFW — white surface reflects DFW sun, reduces cooling costs 15-25%',
    uvNote: 'DFW UV accelerates TPO degradation — expect 15 years max without recoating',
  },
  'EPDM (Rubber)': {
    lifespan: '20-25 years',
    cost: '.50-7.00/sq ft installed',
    dfwNote: 'Black EPDM absorbs DFW heat — avoid on residential in DFW unless coated white. Popular for commercial.',
    uvNote: 'Apply white reflective coating to offset DFW heat absorption — critical for energy efficiency',
  },
  'Modified Bitumen': {
    lifespan: '10-20 years',
    cost: '.00-6.50/sq ft installed',
    dfwNote: 'Proven technology — granulated cap sheet handles DFW hail well. Commonly used in DFW commercial strip centers.',
    uvNote: 'Darker surface means higher cooling costs in DFW summer — plan for white coating or choose cap sheet carefully',
  },
};

const repairAdvice: Record<string, Record<string, { action: string; urgency: string; cost: string }>> = {
  'TPO (Thermoplastic Polyolefin)': {
    Excellent: { action: 'Annual inspection — check seams, flashings, and drains. DFW debris can clog drains and cause ponding.', urgency: 'Low', cost: '-400 inspection' },
    Good: { action: 'Seal any open seams with TPO tape. Clear all drains before DFW storm season (May-October).', urgency: 'Medium', cost: '-1,500 seam repairs' },
    Fair: { action: 'Full seam inspection — open seams allow water intrusion. Ponding water is roof life enemy #1 in DFW.', urgency: 'High', cost: ',000-5,000 comprehensive repair' },
    Poor: { action: 'Full TPO replacement. Blistering, significant ponding, or membrane failure requires immediate action.', urgency: 'Immediate', cost: ',000-25,000 full replacement' },
  },
  'EPDM (Rubber)': {
    Excellent: { action: 'Inspect lap seams annually — EPDM seams are the most common failure point.', urgency: 'Low', cost: '-400 inspection' },
    Good: { action: 'Re-lap any lifting seams. Apply white coating if not already present to reduce DFW heat gain.', urgency: 'Medium', cost: '-2,500′ },
    Fair: { action: 'Assess seam integrity across entire roof. EPDM tears can be patched but extensive damage requires overlay or replacement.', urgency: 'High', cost: ',000-8,000 repair or overlay' },
    Poor: { action: 'Replace EPDM membrane. Extensive cracking, ponding damage, or seam failure throughout.', urgency: 'Immediate', cost: ',000-30,000 replacement' },
  },
  'Modified Bitumen': {
    Excellent: { action: 'Annual inspection — check blistering, granule loss from DFW hail, and flashing condition.', urgency: 'Low', cost: '-400 inspection' },
    Good: { action: 'Patch any blisters or splits. Apply reflective coating to reduce DFW heat load.', urgency: 'Medium', cost: '-2,000 repairs + coating' },
    Fair: { action: 'Multiple layers may be possible — adding modified bitumen cap sheet over existing can extend life 8-12 years.', urgency: 'High', cost: ',000-10,000 overlay' },
    Poor: { action: 'Full tear-off and replacement. Do not overlay failing modified bitumen — trapped moisture causes deck damage.', urgency: 'Immediate', cost: ',000-35,000 replacement' },
  },
};

export default function DFWFlatRoofGuide() {
  const [material, setMaterial] = useState('');
  const [condition, setCondition] = useState('');
  const info = material ? materialInfo[material] : null;
  const repair = material && condition ? repairAdvice[material]?.[condition] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px' }}>🏠 ProLnk DFW Roofing Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>Flat Roof Guide — Dallas/Fort Worth</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '24px', lineHeight: '1.6′ }}>
          Flat and low-slope roofs are common on DFW commercial properties and some modern residential builds. DFW-specific challenges include intense UV degradation, rapid ponding after heavy rain events, and extreme summer heat exceeding 100°F.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[{ label: '☀️ DFW UV Index', val: 'High — accelerates all membranes' }, { label: '🌧️ Ponding Risk', val: 'Critical — 5″+ rain events common' }, { label: '🌡️ Summer Temps', val: '100-110°F surface temps on black roofs' }, { label: '🏢 Common Uses', val: 'Commercial + modern residential' }].map(({ label, val }) => (
            <div key={label} style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47′ }}>
              <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: '12px', padding: '24px', border: '1px solid #1E2D47', marginBottom: '16px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px', fontSize: '18px' }}>🔍 Material Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Flat Roof Material</label>
              <select value={material} onChange={e => setMaterial(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select material...</option>
                {flatMaterials.map(m => <option key={m} value={m}>{m}</option>)}
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
                <div><span style={{ color: '#F5E642′ }}>Cost: </span>{info.cost}</div>
                <div style={{ gridColumn: '1/-1′ }}><span style={{ color: '#F5E642' }}>DFW Note: </span>{info.dfwNote}</div>
                <div style={{ gridColumn: '1/-1′ }}><span style={{ color: '#F5E642' }}>UV Impact: </span>{info.uvNote}</div>
              </div>
            </div>
          )}
          {repair && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '16px', border: '1px solid #F5E642′ }}>
              <div style={{ marginBottom: '8px' }}><span style={{ color: repair.urgency === 'Immediate' ? '#EF4444′ : '#F5E642', fontWeight: 600 }}>Urgency: {repair.urgency} </span></div>
              <div style={{ marginBottom: '8px' }}><span style={{ color: '#F5E642′ }}>Action: </span>{repair.action}</div>
              <div><span style={{ color: '#F5E642′ }}>Cost: </span>{repair.cost}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47′ }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '8px' }}>⚠️ Ponding Water Warning</div>
          <p style={{ color: '#9BA3B8', fontSize: '14px', margin: 0, lineHeight: '1.6′ }}>DFW receives 35-40″ of rain annually, often in heavy storm bursts. Ponding water standing more than 48 hours accelerates flat roof degradation dramatically. Ensure all drains are clear before storm season. Add additional drains if any area consistently ponds.</p>
        </div>
      </div>
    </div>
  );
}
