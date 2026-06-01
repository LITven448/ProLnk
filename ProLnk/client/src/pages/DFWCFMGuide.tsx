import { useState } from 'react';

const cfmData: Record<string, Record<string, { targetCFM: number; tonsNeeded: number; signs: string[]; causes: string[] }>> = {
  small: { single: { targetCFM: 600, tonsNeeded: 2, signs: ['Rooms heat up slowly after opening', 'Filter gets dirty faster than expected', 'Slight stuffiness but no extreme hot spots'], causes: ['Partially closed dampers', 'Dirty filter restricting flow', 'Undersized return grille'] }, multi: { targetCFM: 750, tonsNeeded: 2.5, signs: ['Stairwell feels warm vs downstairs', 'Upper level takes 30+ min to cool after setback', 'Noticeable pressure difference when doors close'], causes: ['Insufficient return air on upper level', 'Duct run too long to upper floor', 'Need second return air grille upstairs'] } },
  medium: { single: { targetCFM: 1100, tonsNeeded: 3.5, signs: ['Far rooms are 3–5°F warmer than thermostat area', 'System runs constantly on 100°F days', 'High electric bills despite newer equipment'], causes: ['Undersized duct system (common in 1990s–2000s DFW homes)', 'Duct leakage in attic reducing delivered CFM', 'Return air too small for system capacity'] }, multi: { targetCFM: 1400, tonsNeeded: 4.5, signs: ['Master bedroom upstairs is always hottest', 'System short-cycles on mild days but runs all day in July', 'Some rooms with closed doors become stuffy'], causes: ['Single return serving multiple floors', 'Trunk line undersized for total square footage', 'Zoning needed but not installed'] } },
  large: { single: { targetCFM: 1800, tonsNeeded: 6, signs: ['Never reaches setpoint on 104°F days', 'AC runs 20+ hours per day in July', 'Hot/cold zones throughout home'], causes: ['Almost certainly undersized for DFW heat load', 'Duct system designed for milder climate standards', 'Multiple issues likely: leaks + undersizing + poor return'] }, multi: { targetCFM: 2400, tonsNeeded: 8, signs: ['System barely keeps up even at night', 'Electric bills over $400/month in summer', 'Frequent short-cycling then long recovery runs'], causes: ['Single-system large home is a DFW design failure', 'Dual-zone system likely required', 'Professional load calculation and duct assessment needed immediately'] } },
};

export default function DFWCFMGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [stories, setStories] = useState('single');

  const result = cfmData[homeSize]?.[stories];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>CFM Guide for DFW Homeowners</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          CFM (Cubic Feet per Minute) is how HVAC technicians measure airflow. Getting enough CFM to every room is the difference between a comfortable DFW home and one that struggles all summer — regardless of equipment size.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📐 What Is CFM and Why Does It Matter in DFW?</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            Every air conditioner moves a specific volume of air per minute. If your ducts can't carry enough CFM to all rooms, some rooms starve for cool air no matter how powerful your unit is. In DFW's extreme heat, a 10% CFM deficit that would be barely noticeable in Colorado becomes a room that hits 82°F when your setpoint is 75°F.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            The standard rule is 400 CFM per ton of cooling capacity. DFW homes built before 2005 frequently have duct systems that were undersized at installation, then further degraded by attic heat, settling, and leaks. Many DFW homeowners have perfectly good equipment and terrible duct delivery.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🏠 Your DFW Home CFM Target</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Home Size</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['small', 'Small\n<1,500 sf'], ['medium', 'Medium\n1,500–3,000 sf'], ['large', 'Large\n3,000+ sf']].map(([val, label]) => (
                  <button key={val} onClick={() => setHomeSize(val)}
                    style={{ flex: 1, padding: '10px 8px', borderRadius: 10, border: `2px solid ${homeSize === val ? '#F5E642' : '#1E3A5F'}`, background: homeSize === val ? '#F5E642' : 'transparent', color: homeSize === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 13, whiteSpace: 'pre-line', lineHeight: 1.3 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Stories</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['single', '🏠 Single Story'], ['multi', '🏢 Two Story']].map(([val, label]) => (
                  <button key={val} onClick={() => setStories(val)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${stories === val ? '#F5E642' : '#1E3A5F'}`, background: stories === val ? '#F5E642' : 'transparent', color: stories === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div style={{ background: '#111D35', borderRadius: 10, padding: 16, textAlign: 'center', border: '1px solid #F5E642' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642' }}>{result.targetCFM}</div>
                  <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Target CFM (DFW)</div>
                </div>
                <div style={{ background: '#111D35', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#E8EAF0' }}>{result.tonsNeeded}</div>
                  <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Tons AC Capacity Needed</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 10 }}>Signs Your CFM Is Insufficient</div>
              <ul style={{ paddingLeft: 20, color: '#94A3B8', lineHeight: 1.9, marginBottom: 16 }}>
                {result.signs.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 10 }}>Common DFW Root Causes</div>
              <ul style={{ paddingLeft: 20, color: '#94A3B8', lineHeight: 1.9 }}>
                {result.causes.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔍 How to Assess Your Own Airflow</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Hold a tissue near each supply vent — it should flutter briskly, not barely move</li>
            <li>Check all supply registers are fully open (turn the lever to fully open)</li>
            <li>Measure temperature at supply vents with a thermometer — should be 15–20°F below setpoint</li>
            <li>Check for closed or kinked flex ducts in attic — extremely common in DFW homes</li>
            <li>A pro duct test (using a blower door) can measure exact CFM delivery to each room</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 14, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>Get a DFW Airflow Assessment</div>
          <div style={{ fontSize: 14, color: '#1E3A5F' }}>A duct pressure test can find exactly where your system is losing CFM — often fixable without replacing equipment.</div>
        </div>
      </div>
    </div>
  );
}
