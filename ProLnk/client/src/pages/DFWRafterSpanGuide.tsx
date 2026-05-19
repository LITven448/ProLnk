import { useState } from 'react';

const roofObservations = ['Sagging ridgeline', 'Wavy sheathing', 'Visible rafter cracks', 'Ceiling cracks inside', 'All looks normal'];
const homeAges = ['Pre-1960', '1960–1979', '1980–1999', '2000–present'];

function getAssessment(obs: string, age: string) {
  if (obs === 'Sagging ridgeline') {
    return {
      level: 'URGENT',
      color: '#FF4444',
      assessment: 'Sagging ridgelines indicate rafter failure or ridge board damage — a structural emergency in DFW wind zones.',
      urgency: 'Schedule structural engineer inspection within 48 hours.',
      who: 'Licensed structural engineer → licensed roofing contractor',
    };
  }
  if (obs === 'Visible rafter cracks') {
    return {
      level: 'HIGH',
      color: '#FF8C00',
      assessment: 'Cracked rafters in DFW homes are often caused by decades of thermal cycling (100°F+ summers, freeze events).',
      urgency: 'Get a framing inspection before next storm season.',
      who: 'Licensed framing contractor or structural engineer',
    };
  }
  if (obs === 'Wavy sheathing' && (age === 'Pre-1960′ || age === '1960–1979')) {
    return {
      level: 'MODERATE',
      color: '#F5E642',
      assessment: 'Older DFW homes often used board sheathing. Waviness may be sheathing movement, not rafter failure — but verify.',
      urgency: 'Inspect during next roofing project or within 6 months.',
      who: 'Experienced roofing contractor with framing knowledge',
    };
  }
  if (obs === 'Ceiling cracks inside') {
    return {
      level: 'MONITOR',
      color: '#00AAFF',
      assessment: 'Interior ceiling cracks in DFW are often from expansive clay soils shifting foundations, not rafter issues.',
      urgency: 'Rule out foundation movement first before assuming roof structure.',
      who: 'Foundation specialist first, then roofer if foundation checks out',
    };
  }
  return {
    level: 'LOW',
    color: '#00CC66',
    assessment: 'No visible structural concerns. DFW standard rafter spans (16″ or 24″ OC) are typically engineered for local wind loads.',
    urgency: 'Continue routine annual inspection.',
    who: 'Annual roofing inspection by licensed contractor',
  };
}

export default function DFWRafterSpanGuide() {
  const [obs, setObs] = useState('');
  const [age, setAge] = useState('');
  const result = obs && age ? getAssessment(obs, age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Structural Series</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>Rafter Span & Roof Structure Guide</h1>
        <p style={{ color: '#8899BB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Understanding rafter spans in DFW homes — how local wind loads shape structural requirements, and when a sagging roofline signals real danger vs cosmetic sheathing issues.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💨', title: 'DFW Wind Load Reality', body: 'North Texas sits in a high-wind zone. Rafter spans are engineered to handle 90–115 mph gusts. Spans exceeding 20 ft without intermediate support are red flags in older builds.' },
            { icon: '📐', title: 'Standard Span Limits', body: 'Typical DFW residential rafters: 2×6 at 16″ OC spans ~13 ft max; 2×8 at 16″ OC spans ~17 ft max. Anything exceeding span tables without engineering = risk.' },
            { icon: '⚠️', title: 'Sagging ≠ Always Structural', body: 'A wavy roofline often means sheathing delamination or board sheathing movement — not rafter failure. But a sagging ridgeline almost always means structural compromise.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#8899BB', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, border: '1px solid #F5E642′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Structural Assessment Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>What do you observe from outside?</label>
            <select value={obs} onChange={e => setObs(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select observation...</option>
              {roofObservations.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Home age / era</label>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select era...</option>
              {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 800, color: result.color, fontSize: 16, marginBottom: 12 }}>{result.level} CONCERN</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{result.assessment}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>⏱ {result.urgency}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>👷 {result.who}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#0F2040', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#8899BB', fontSize: 12, lineHeight: 1.6 }}>⚠️ This guide is educational only. Always consult a licensed structural engineer or contractor for safety assessments. DFW building codes and wind requirements may vary by municipality.</div>
        </div>
      </div>
    </div>
  );
}
