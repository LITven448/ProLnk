import { useState } from 'react';

const AREAS = ['Attic penetrations', 'Rim joist', 'HVAC chase', 'Plumbing penetrations', 'Electrical holes'];
const CONDITIONS = ['Hot and humid (summer)', 'Dry and hot (late summer)', 'Mild and dry (fall/spring)', 'Cool (winter)'];
const DEPTHS = ['Tight gap (<1″)', 'Moderate gap (1–3″)', 'Large cavity (3″+)', 'Rim joist cavity'];

function getFoamRecommendation(area: string, condition: string, depth: string) {
  const isHumid = condition.includes('humid');
  const isDry = condition.includes('Dry');
  const isLargeArea = area.includes('HVAC') || area.includes('Rim');
  const isBigCavity = depth.includes('3″+') || depth.includes('Rim');

  if (isHumid && isLargeArea) {
    return {
      type: 'Closed-Cell Spray Foam',
      note: 'DFW summer humidity + HVAC chases = moisture risk. Closed-cell creates vapor barrier — critical in humid DFW summers.',
      coverage: isBigCavity ? '200–600 sqft per kit' : '100–200 sqft per kit',
      cost: '$300–$900 DIY kit | $1,200–$3,500 professional',
    };
  }
  if (isDry && !isBigCavity) {
    return {
      type: 'Open-Cell Spray Foam',
      note: 'During DFW dry periods, open-cell is cost-effective for smaller gaps and penetrations. Less vapor resistance needed.',
      coverage: '50–150 sqft per can',
      cost: '$30–$120 DIY | $400–$1,200 professional',
    };
  }
  if (isBigCavity) {
    return {
      type: 'Closed-Cell (2″ minimum depth)',
      note: 'Rim joists and large cavities: closed-cell at 2″ depth provides R-13 and vapor control — meets DFW energy code.',
      coverage: 'Measure cavity volume — 1 board-foot per sqft at 1″ depth',
      cost: '$600–$2,000 DIY kit | $1,800–$5,000 professional',
    };
  }
  return {
    type: 'Single-Component Can Foam',
    note: 'For small attic penetrations and plumbing holes, single-component fire-rated can foam is sufficient and easy to apply.',
    coverage: '1 can = 12–20 linear feet of gap',
    cost: '$15–$40 per can DIY | $150–$400 handyman',
  };
}

export default function DFWSprayFoamSealingGuide() {
  const [area, setArea] = useState('');
  const [condition, setCondition] = useState('');
  const [depth, setDepth] = useState('');
  const result = area && condition && depth ? getFoamRecommendation(area, condition, depth) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🫧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Spray Foam Air Sealing Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32 }}>Air sealing is the highest-ROI energy upgrade in DFW homes. Spray foam at attic penetrations and rim joists can cut cooling costs 15–25% in DFW's brutal summers.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⚠️ DFW Spray Foam Factors</h2>
          <ul style={{ color: '#9BA3B8', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>DFW attic temps hit 150°F — closed-cell foam handles heat better than open-cell</li>
            <li>High summer humidity: use closed-cell at exterior boundary locations</li>
            <li>Don't foam over recessed lights unless rated IC/AT — fire risk</li>
            <li>Apply in temps 60–90°F for proper cure — avoid summer midday</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>🔧 Foam Type Recommender</h2>
          {[{ label: 'Area to Seal', value: area, set: setArea, options: AREAS },
            { label: 'DFW Climate Condition', value: condition, set: setCondition, options: CONDITIONS },
            { label: 'Gap / Cavity Depth', value: depth, set: setDepth, options: DEPTHS }].map(({ label, value, set, options }) => (
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
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.type}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 12 }}>{result.note}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px' }}>
                  <div style={{ color: '#9BA3B8', fontSize: 11 }}>COVERAGE</div>
                  <div style={{ color: '#E8EAF0', fontSize: 14 }}>{result.coverage}</div>
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
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>📋 Foam Type Comparison</h2>
          {[['Open-Cell', 'R-3.5/inch, vapor-permeable, lower cost. Good for interior walls and small gaps.'],
            ['Closed-Cell', 'R-6.5/inch, vapor barrier, rigid. Best for DFW attics, rim joists, exterior boundaries.'],
            ['Can Foam (1-part)', 'R-4–5, easiest DIY, for small holes only. Fire-rated versions required in attics.']].map(([type, desc]) => (
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
