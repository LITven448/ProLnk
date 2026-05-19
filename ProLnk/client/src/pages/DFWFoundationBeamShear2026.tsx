import { useState } from 'react';

export default function DFWFoundationBeamShear2026() {
  const [crackDesc, setCrackDesc] = useState('');
  const [assessment, setAssessment] = useState('');

  const getAssessment = () => {
    if (!crackDesc) { setAssessment('Select a crack description to get your shear failure assessment.'); return; }
    const assessments: Record<string, string> = {
      horizontal: '🚨 EMERGENCY — High Shear Risk: A horizontal crack running through a foundation beam is the hallmark of shear failure. This is structurally more dangerous than flexural (vertical) failure because shear failure is sudden — beams can fail rapidly once shear cracks propagate. Call a licensed structural engineer IMMEDIATELY. Do not wait. In DFW clay soil, differential settlement can create concentrated loads that overwhelm beam shear capacity. If crack runs full width of beam, avoid loading that area of the structure (remove heavy furniture, vehicles from garage if applicable).',
      diagonal: '⚠️ Significant — Potential Shear or Combined: Diagonal cracks at 45° from beam ends indicate high shear stress — this is where shear forces are greatest. In DFW foundations, this pattern often appears where settlement has created an uneven bearing condition, concentrating load at one beam location. Get a structural engineer assessment within 1 week. Diagonal cracks can be early warning before full horizontal shear crack develops. Document with photos and measurements today.',
      vertical: '📊 Monitor — Likely Flexural, Not Shear: Vertical cracks in foundation beams are more commonly associated with flexural (bending) stress rather than shear failure. While still concerning in DFW clay-active soil, flexural cracks are generally less immediately dangerous than shear. However, wide vertical cracks (>1/4 inch) warrant engineer evaluation. If crack has horizontal component or is at beam end, escalate to shear assessment. Monitor width monthly with photos.',
      stepped: '🔍 Evaluate — Differential Settlement Pattern: Stepped cracks that follow mortar joints in block foundations or crack diagonally across beam sections suggest differential settlement — soil moving unequally under the foundation. This is the most common DFW foundation failure pattern due to expansive clay. The load redistribution from settlement can eventually create shear conditions. Get engineer evaluation within 2 weeks. Irrigation management (keeping soil moisture consistent year-round) is often recommended.',
      multiple: '🚨 Critical — Multiple Crack Pattern: Multiple cracks in a beam or across multiple beams indicate widespread structural stress. This is consistent with either: 1) Extensive differential settlement creating shear in multiple locations, or 2) Beam capacity exceeded in a zone due to added loads or soil failure. In DFW, severe drought followed by heavy rain can cause catastrophic soil movement in one season. This pattern requires immediate engineer evaluation — do not delay. Foundation repair costs increase significantly if structural failure occurs.'
    };
    setAssessment(assessments[crackDesc] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>🏠 DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>Foundation Beam Shear Failure Guide</h1>
        <p style={{ color: '#8899AA', fontSize: '16px', marginBottom: '32px' }}>Shear failure in DFW foundation beams is more dangerous than flexural failure — it can be sudden and structural. DFW's expansive clay soil creates the differential loads that drive shear. Learn to recognize it.</p>

        <div style={{ backgroundColor: '#FC8181', borderRadius: '12px', padding: '20px', marginBottom: '28px', border: '2px solid #FEB2B2′ }}>
          <div style={{ fontWeight: 800, fontSize: '17px', marginBottom: '8px', color: '#0A1628′ }}>⚠️ Shear vs Flexural: The Critical Difference</div>
          <div style={{ color: '#0A1628', fontSize: '14px', lineHeight: 1.6 }}>Flexural failure (vertical cracks from bending) gives warning signs over months. Shear failure (horizontal or diagonal cracks from shear forces) can progress to structural collapse more rapidly. A horizontal crack through a beam mid-span or at its end is a structural emergency — call a licensed engineer before further investigation.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {[{ icon: '↔️', label: 'Shear Failure', cracks: 'Horizontal through beam', danger: 'EMERGENCY', color: '#FC8181′ },
            { icon: '↕️', label: 'Flexural Failure', cracks: 'Vertical — beam bending', danger: 'MONITOR', color: '#68D391′ },
            { icon: '↗️', label: 'Combined Stress', cracks: 'Diagonal 45° at beam end', danger: 'URGENT', color: '#F6AD55′ },
            { icon: '📉', label: 'Settlement', cracks: 'Stepped or stair-step pattern', danger: 'EVALUATE', color: '#63B3ED' }
          ].map(item => (
            <div key={item.icon} style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#8899AA', fontSize: '13px', marginBottom: '10px' }}>{item.cracks}</div>
              <div style={{ backgroundColor: item.color, color: '#0A1628', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 800, display: 'inline-block' }}>{item.danger}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#F5E642′ }}>🔍 Get My Shear Failure Assessment</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#8899AA', marginBottom: '8px' }}>Describe the Beam Crack</label>
            <select value={crackDesc} onChange={e => setCrackDesc(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0A1628', border: '1px solid #1a3050', borderRadius: '8px', color: '#fff', fontSize: '15px' }}>
              <option value=''>Select crack type...</option>
              <option value='horizontal'>Horizontal crack running across beam width</option>
              <option value='diagonal'>Diagonal crack at 45° angle</option>
              <option value='vertical'>Vertical crack running up/down beam</option>
              <option value='stepped'>Stepped or stair-step pattern</option>
              <option value='multiple'>Multiple cracks across beams</option>
            </select>
          </div>
          <button onClick={getAssessment} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Shear Assessment</button>
          {assessment && <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '15px', lineHeight: 1.7 }}>{assessment}</div>}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', color: '#F5E642′ }}>🔧 DFW Shear Repair Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[{ method: 'Carbon Fiber Straps', use: 'Stabilize shear cracks without excavation', note: 'Most common DFW shear repair — applied to beam face' },
              { method: 'Epoxy Injection', use: 'Restore structural continuity of cracked beam', note: 'Works for moderate shear cracks not involving full beam failure' },
              { method: 'Beam Sister', use: 'Add parallel beam beside failed beam', note: 'Required when beam shear capacity is fully compromised' },
              { method: 'Pier Addition', use: 'Reduce beam span to lower shear forces', note: 'Addresses root cause if settlement created concentrated load' }
            ].map(item => (
              <div key={item.method} style={{ padding: '14px', backgroundColor: '#0A1628', borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: '#F5E642′ }}>{item.method}</div>
                <div style={{ fontSize: '13px', marginBottom: '4px' }}>{item.use}</div>
                <div style={{ color: '#8899AA', fontSize: '12px' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}