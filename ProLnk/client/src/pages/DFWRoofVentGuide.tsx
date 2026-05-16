import { useState } from 'react';

const ventTypes = ['Static Vent', 'Turbine Vent', 'Power Vent', 'Ridge Vent'];
const dfwIssues = ['No airflow / hot attic', 'Rusting or seized', 'Noisy in wind', 'Visible damage', 'Multiple vents failing'];

function getVentAssessment(vent: string, issue: string) {
  if (issue.includes('Rusting') || issue.includes('seized')) return { action: 'Replace Unit', cost: '$150–$400', note: 'Seized turbines trap heat — DFW attics hit 160°F without airflow', color: '#FF4444' };
  if (issue.includes('Noisy') && vent.includes('Turbine')) return { action: 'Lubricate or Replace Bearing', cost: '$50–$150', note: 'DFW wind of 15–30 mph is ideal for turbine vents — noise means bearing failure', color: '#F5A623' };
  if (issue.includes('No airflow') && vent.includes('Static')) return { action: 'Add Ridge Vent or Turbine', cost: '$300–$800', note: 'Static vents underperform in DFW — consider turbine or ridge upgrade', color: '#F5A623' };
  if (issue.includes('Multiple')) return { action: 'Full Vent System Audit', cost: '$500–$2,000', note: 'Systemic failure — hire a DFW roofer for full attic ventilation redesign', color: '#FF4444' };
  return { action: 'Inspect and Monitor', cost: 'No immediate cost', note: 'Annual inspection recommended for all DFW vent types', color: '#22C55E' };
}

export default function DFWRoofVentGuide() {
  const [vent, setVent] = useState('');
  const [issue, setIssue] = useState('');
  const result = vent && issue ? getVentAssessment(vent, issue) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}>
          🏠 DFW ROOFING GUIDE
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          Roof Vent Guide for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          Proper roof ventilation is critical in DFW — attics without airflow routinely hit 160°F in summer,
          accelerating shingle degradation and driving up cooling costs. Your vent type matters.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
          {[
            { icon: '🔲', name: 'Static Vent', desc: 'Basic box vents. Common in older DFW homes. Reliable but low CFM — often undersized for DFW heat loads.' },
            { icon: '🌀', name: 'Turbine Vent', desc: 'Spins in DFW wind (15–30 mph avg). Excellent for DFW — moves 300+ CFM when spinning. Most cost-effective upgrade.' },
            { icon: '⚡', name: 'Power Vent', desc: 'Electric fan. Best CFM but adds utility cost. Ideal for DFW homes with inadequate natural wind exposure.' },
            { icon: '📏', name: 'Ridge Vent', desc: 'Runs along roof peak. Works with soffit vents. Best for new DFW construction — uniform airflow, no moving parts.' },
          ].map(({ icon, name, desc }) => (
            <div key={name} style={{ background: '#0F2040', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{name}</div>
              <div style={{ color: '#94A3B8', fontSize: '13px', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🌡️ DFW-Specific Vent Performance Facts</h2>
          <ul style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>DFW average wind: 12–18 mph — turbines spin effectively nearly year-round</li>
            <li>FHA/HUD requires 1 sq ft of vent area per 150 sq ft of attic floor space</li>
            <li>Power vents add $10–$25/month in electricity but cut cooling costs more</li>
            <li>Ridge vents must pair with soffit vents — without intake, they don't work</li>
            <li>Turbine bearings fail every 10–15 years in DFW heat — squealing = replace</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>🛠️ DFW Vent Assessment Tool</h2>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Your Vent Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ventTypes.map(v => (
                <button key={v} onClick={() => setVent(v)} style={{
                  background: vent === v ? '#F5E642' : '#162035', color: vent === v ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: vent === v ? 700 : 400
                }}>{v}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Current Issue</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {dfwIssues.map(i => (
                <button key={i} onClick={() => setIssue(i)} style={{
                  background: issue === i ? '#F5E642' : '#162035', color: issue === i ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: issue === i ? 700 : 400
                }}>{i}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '18px', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{result.action}</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '6px' }}>Estimated cost: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{result.cost}</span></div>
              <div style={{ color: '#94A3B8', fontSize: '13px', lineHeight: 1.5 }}>💡 {result.note}</div>
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
