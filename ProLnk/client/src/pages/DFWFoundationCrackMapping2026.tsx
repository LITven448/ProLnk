import { useState } from 'react';

export default function DFWFoundationCrackMapping2026() {
  const [situation, setSituation] = useState('');
  const [method, setMethod] = useState('');

  const getMethod = () => {
    if (!situation) { setMethod('Select a crack situation to get your mapping methodology.'); return; }
    const methods: Record<string, string> = {
      single: '📍 Single Crack Mapping: Photograph with a ruler showing width. Mark location on floor plan sketch — note which wall (N/S/E/W) and distance from corners. Measure crack width with feeler gauge or credit card. Record date, width, and length. Check again in 30 days. Single cracks in DFW clay soil are common after dry spells.',
      multiple: '🗺️ Multiple Crack Mapping: Create a full floor plan sketch of your DFW home. Number each crack (C1, C2, C3...). For each: photo with date stamp, width measurement, location on plan, direction (horizontal/vertical/diagonal). Look for pattern — cracks radiating from one corner = localized; widespread = systemic DFW clay movement.',
      widening: '📈 Active Crack Monitoring: Install crack monitors (tell-tales) across each crack — available at hardware stores. Mark crack ends with pencil and date. Photograph weekly. In DFW, cracks often widen in summer drought and partially close in wet season. Document this cycle — it is normal. Rapid widening (>1/16 inch in 30 days) = call engineer.',
      pattern: '🔍 Pattern Analysis: Lay your crack map flat and look for alignment. Cracks that form a line across multiple rooms indicate beam failure zone. Cracks all near one corner = pier failure. Diagonal cracks from corners of windows/doors = differential settlement. Horizontal cracks through beams = shear (emergency — call engineer immediately).',
      new: '🆕 Documenting New Crack: Photograph immediately with smartphone and timestamp. Measure and record. Add to your master crack log. Note recent weather — DFW drought conditions (soil shrinks away from foundation) commonly trigger new cracks. Note if any recent heavy rain after drought (soil swells, foundation heaves). Both can crack foundations.'
    };
    setMethod(methods[situation] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>🏠 DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>Foundation Crack Mapping Guide</h1>
        <p style={{ color: '#8899AA', fontSize: '16px', marginBottom: '32px' }}>A crack map is your foundation's health record. DFW's expansive clay soil means cracks change seasonally — documenting them over time tells you if movement is normal or structural.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          {[{ icon: '📷', label: 'Photo', desc: 'Date-stamped photo of each crack with ruler' },
            { icon: '📐', label: 'Measure', desc: 'Width in fractions of an inch or mm' },
            { icon: '🗺️', label: 'Map', desc: 'Mark location on home floor plan sketch' },
            { icon: '📅', label: 'Log', desc: 'Date, width, length — build history over time' },
            { icon: '🔍', label: 'Pattern', desc: 'Look at all cracks together for system view' },
            { icon: '⚠️', label: 'Escalate', desc: 'Horizontal or fast-widening = engineer now' }
          ].map(item => (
            <div key={item.icon} style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ color: '#8899AA', fontSize: '12px' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#F5E642' }}>🗺️ Get My Mapping Methodology</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#8899AA', marginBottom: '8px' }}>My Crack Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0A1628', border: '1px solid #1a3050', borderRadius: '8px', color: '#fff', fontSize: '15px' }}>
              <option value=''>Select situation...</option>
              <option value='single'>Single crack I just noticed</option>
              <option value='multiple'>Multiple cracks throughout home</option>
              <option value='widening'>Crack that seems to be widening</option>
              <option value='pattern'>Trying to understand crack patterns</option>
              <option value='new'>New crack appeared suddenly</option>
            </select>
          </div>
          <button onClick={getMethod} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Mapping Methodology</button>
          {method && <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '15px', lineHeight: 1.6 }}>{method}</div>}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', color: '#F5E642' }}>📊 Crack Width Reference — DFW Context</h3>
          {[{ width: 'Hairline (<1/16 in)', status: 'Monitor', color: '#48BB78', note: 'Common in DFW — seasonal clay movement. Document and watch.' },
            { width: '1/16 – 1/4 in', status: 'Evaluate', color: '#ECC94B', note: 'Get a structural engineer assessment if widening or accompanied by door/window sticking.' },
            { width: '1/4 – 1/2 in', status: 'Urgent', color: '#F6AD55', note: 'Significant movement. Engineer visit within 2 weeks. Do not delay.' },
            { width: '>1/2 in', status: 'Emergency', color: '#FC8181', note: 'Structural emergency. Call engineer immediately. May need emergency shoring.' }
          ].map(row => (
            <div key={row.width} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1a3050' }}>
              <div style={{ width: '120px', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{row.width}</div>
              <div style={{ backgroundColor: row.color, color: '#0A1628', borderRadius: '6px', padding: '3px 10px', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{row.status}</div>
              <div style={{ color: '#8899AA', fontSize: '13px' }}>{row.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}