import { useState } from 'react';

const bootConditions = ['New (0-5 yrs)', 'Good (5-10 yrs)', 'Cracking (10-15 yrs)', 'Failed (15+ yrs)'];
const roofAges = ['Under 5 years', '5-10 years', '10-15 years', '15+ years'];

function getAssessment(condition: string, age: string) {
  const failed = condition.includes('Failed') || age.includes('15+');
  const cracking = condition.includes('Cracking') || age.includes('10-15');
  if (failed) return { urgency: 'Replace Immediately', diy: 'Hire Roofer', cost: '$150–$400 per boot', color: '#FF4444′ };
  if (cracking) return { urgency: 'Replace This Season', diy: 'DIY Possible', cost: '$80–$200 per boot', color: '#F5A623′ };
  return { urgency: 'Inspect Annually', diy: 'Monitor Only', cost: 'No cost now', color: '#22C55E' };
}

export default function DFWRoofBootGuide() {
  const [condition, setCondition] = useState('');
  const [age, setAge] = useState('');
  const result = condition && age ? getAssessment(condition, age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}>
          🏠 DFW ROOFING GUIDE
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          Pipe Boot (Pipe Flashing) Guide for DFW Roofs
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          The rubber boot around plumbing vent pipes is the #1 source of roof leaks in DFW homes after 10 years.
          DFW's intense UV radiation and heat cycles degrade neoprene boots faster than almost any other U.S. climate.
        </p>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>⚠️ Why DFW Is Especially Hard on Pipe Boots</h2>
          <ul style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>Average 234 sunny days/year accelerates UV rubber breakdown</li>
            <li>Summer temps regularly exceed 105°F — boots expand and contract daily</li>
            <li>Neoprene boots typically last 10–12 years in DFW vs 15–20 in northern climates</li>
            <li>EPDM (ethylene propylene) boots last 20–25 years — preferred for DFW heat</li>
            <li>A failed boot lets water run down the vent pipe into your attic — undetected for months</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🔍 How to Inspect Your Pipe Boots</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: '📐', label: 'From Ground', desc: 'Binoculars to check for visible cracking or gap at boot base' },
              { icon: '🔦', label: 'Attic Check', desc: 'Look for water stains or daylight around vent pipe penetrations' },
              { icon: '🤏', label: 'Touch Test', desc: 'Squeeze the boot — should be pliable, not brittle or crumbly' },
              { icon: '💧', label: 'Hose Test', desc: 'Have helper run hose on roof while you watch attic for drips' },
            ].map(({ icon, label, desc }) => (
              <div key={label} style={{ background: '#162035', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
                <div style={{ color: '#94A3B8', fontSize: '13px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>🛠️ Boot Condition Assessment Tool</h2>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Boot Condition</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {bootConditions.map(c => (
                <button key={c} onClick={() => setCondition(c)} style={{
                  background: condition === c ? '#F5E642′ : '#162035', color: condition === c ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: condition === c ? 700 : 400
                }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>DFW Roof Age</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {roofAges.map(a => (
                <button key={a} onClick={() => setAge(a)} style={{
                  background: age === a ? '#F5E642′ : '#162035', color: age === a ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: age === a ? 700 : 400
                }}>{a}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '18px', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{result.urgency}</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '4px' }}>Recommendation: <span style={{ color: '#F5E642′ }}>{result.diy}</span></div>
              <div style={{ color: '#CBD5E1', fontSize: '14px' }}>Estimated Cost: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{result.cost}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#162035', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#64748B', textAlign: 'center' }}>
          ProLnk • DFW Home Intelligence • Connecting homeowners with vetted local pros
        </div>
      </div>
    </div>
  );
}
