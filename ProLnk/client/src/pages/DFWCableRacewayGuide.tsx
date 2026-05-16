import { useState } from 'react';

const locations = ['Living Room TV Wall', 'Bedroom TV Wall', 'Home Office Desk', 'Garage/Workshop', 'Outdoor/Covered Patio'];
const cableCounts = ['1-2 cables', '3-5 cables', '6-10 cables', '10+ cables'];
const diyLevels = ['Beginner (no tools)', 'Intermediate (basic tools)', 'Advanced (drill, stud finder)'];

function getRecommendation(location: string, count: string, diy: string) {
  const permitNote = 'DFW Note: Running power cables (not just signal) inside walls requires an electrical permit in most DFW cities.';
  if (count === '1-2 cables' && diy === 'Beginner (no tools)') {
    return { solution: 'Adhesive Cable Clips + Cord Cover Strip', difficulty: 'Easy', cost: '$15-30', steps: ['Use 3M Command strips or adhesive clips along baseboard', 'Paint-match the cord cover to wall color', 'No tools, no damage, renter-safe', 'Best for single HDMI + power run'], note: 'Fastest, cheapest, fully reversible.' };
  }
  if (location.includes('Living Room') && diy === 'Advanced (drill, stud finder)') {
    return { solution: 'In-Wall Cable Management Kit (signal only) + Surface Raceway for power', difficulty: 'Advanced', cost: '$80-180', steps: ['Run HDMI/coax through wall via low-voltage kit (no permit needed)', 'Use surface power raceway for AC cord — do NOT run power in wall without permit', permitNote, 'Use stud finder to confirm cavity clearance', 'Paintable raceway matches trim'], note: permitNote };
  }
  if (location === 'Outdoor/Covered Patio') {
    return { solution: 'Outdoor-rated UV Conduit or PVC Raceway', difficulty: 'Intermediate-Advanced', cost: '$40-120', steps: ['Use UV-stabilized gray PVC conduit — standard plastic yellows/cracks in DFW sun within 1 year', 'Seal all outdoor conduit ends with foam — DFW insects nest in conduit', 'All outdoor electrical runs need permit + weatherproof boxes', 'Keep conduit shaded if possible — direct DFW sun degrades even UV-rated plastic over 5 years'], note: 'DFW UV exposure requires outdoor-rated conduit — indoor raceway fails in one season.' };
  }
  return {
    solution: count === '6-10 cables' || count === '10+' ? 'D-Line Paintable Cable Raceway System' : 'SimpleCord Raceway Kit',
    difficulty: diy.includes('Beginner') ? 'Easy' : 'Intermediate',
    cost: count === '10+' ? '$60-150' : '$25-70',
    steps: [
      'Measure cable run length and add 20% for routing',
      'Use paintable raceway — match to wall color with standard latex paint',
      'Anchor to studs or drywall anchors every 16 inches',
      'Bundle by cable type (power separate from signal where possible)',
      diy.includes('Advanced') ? 'For clean look: use in-wall kit for signal, surface raceway for power' : 'Stick-on raceway is renter-safe — no permits needed for signal cables',
    ],
    note: 'Signal cables (HDMI, ethernet, coax) need no permit. Power cables in walls require DFW city permit.',
  };
}

export default function DFWCableRacewayGuide() {
  const [location, setLocation] = useState('');
  const [count, setCount] = useState('');
  const [diy, setDiy] = useState('');
  const [result, setResult] = useState<{ solution: string; difficulty: string; cost: string; steps: string[]; note: string } | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔌📺</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Cable Raceway & Management Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Wall-mounted TVs and home offices need clean cable management. In DFW, outdoor cable runs face UV degradation and insect intrusion.
          Know what requires permits before drilling.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 32, fontWeight: 600 }}>
          ⚡ DFW Permit Rule: Running power (AC) cables inside walls requires a permit in Allen, Frisco, Plano, McKinney, and most DFW cities.
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
          {[
            { label: 'Installation Location', value: location, setter: setLocation, options: locations },
            { label: 'Number of Cables', value: count, setter: setCount, options: cableCounts },
            { label: 'DIY Skill Level', value: diy, setter: setDiy, options: diyLevels },
          ].map(field => (
            <div key={field.label}>
              <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>{field.label}</label>
              <select value={field.value} onChange={e => field.setter(e.target.value)}
                style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value=''>Select...</option>
                {field.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <button onClick={() => { if (location && count && diy) setResult(getRecommendation(location, count, diy)); }}
          style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 32, width: '100%' }}>
          📐 Get Cable Management Solution
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div><div style={{ color: '#94A3B8', fontSize: 13 }}>Recommended Solution</div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.solution}</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost</div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.cost}</div></div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 16px', marginBottom: 16, display: 'inline-block' }}>
              <span style={{ color: '#94A3B8' }}>Difficulty: </span><span style={{ color: '#F5E642', fontWeight: 600 }}>{result.difficulty}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD5E1', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            {result.note !== result.steps[result.steps.length - 1] && (
              <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: 12, color: '#F5E642', fontSize: 14 }}>💡 {result.note}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
