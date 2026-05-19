import { useState } from 'react';

const granuleLevels = ['Minimal loss (uniform color)', 'Moderate loss (patchy)', 'Heavy loss (bare spots)', 'Granules filling gutters'];
const exposureLevels = ['Full shade', 'Mixed sun/shade', 'Full south/west sun', 'Metal roof nearby (heat reflection)'];

function getGranuleAssessment(granules: string, exposure: string) {
  const severe = granules.includes('filling gutters') || (granules.includes('bare spots') && exposure.includes('south/west'));
  const moderate = granules.includes('bare spots') || granules.includes('Moderate');
  if (severe) return {
    life: '1–3 years remaining', urgency: 'Replace Soon', insurance: 'File Claim if Hail-Related',
    color: '#FF4444', note: 'DFW hail events are the #1 cause of accelerated granule loss — document with photos and date'
  };
  if (moderate) return {
    life: '3–7 years remaining', urgency: 'Monitor Closely', insurance: 'Get Inspection First',
    color: '#F5A623', note: 'DFW UV accelerates bare-spot deterioration — consider cool-roof coating to extend life'
  };
  return {
    life: '7–15 years remaining', urgency: 'Inspect Annually', insurance: 'No Claim Needed',
    color: '#22C55E', note: 'Normal granule loss for DFW climate — clean gutters annually to remove accumulation'
  };
}

export default function DFWRoofGranulesGuide() {
  const [granules, setGranules] = useState('');
  const [exposure, setExposure] = useState('');
  const result = granules && exposure ? getGranuleAssessment(granules, exposure) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}>
          🏠 DFW ROOFING GUIDE
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          Roof Granule Loss Guide for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          Granules protect asphalt shingles from UV radiation. In DFW's intense sun, granule loss accelerates faster
          than most U.S. climates — and hailstorms strip granules in minutes. Know what to look for.
        </p>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>☀️ Why DFW Destroys Granules Faster</h2>
          <ul style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>DFW receives ~234 UV-intense days per year — among highest in the U.S.</li>
            <li>South- and west-facing slopes in DFW lose granules 40% faster than north slopes</li>
            <li>DFW averages 6–9 hail events per year — each strips granules permanently</li>
            <li>Thermal expansion from 50°F–105°F daily swings loosens granule adhesive</li>
            <li>Bare spots let UV degrade asphalt base — cracking and leaks follow within 2–4 years</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🔍 How to Check for Granule Loss</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: '🪣', label: 'Check Your Gutters', desc: 'After rain, look in gutters. Sand-like grit = significant granule loss event' },
              { icon: '🔭', label: 'Scan from Ground', desc: 'Binoculars to look for patchy, lighter-colored areas on shingles' },
              { icon: '📸', label: 'After Hail', desc: 'Photograph date-stamped within 24 hrs of hail — required for insurance claim' },
              { icon: '🤌', label: 'Touch Test', desc: 'On accessible sections, rub shingle — more than a few loose granules = concern' },
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
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>📊 DFW Granule Loss Assessment Tool</h2>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Granule Loss Level</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {granuleLevels.map(g => (
                <button key={g} onClick={() => setGranules(g)} style={{
                  background: granules === g ? '#F5E642′ : '#162035', color: granules === g ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: granules === g ? 700 : 400
                }}>{g}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Sun Exposure</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {exposureLevels.map(e => (
                <button key={e} onClick={() => setExposure(e)} style={{
                  background: exposure === e ? '#F5E642′ : '#162035', color: exposure === e ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: exposure === e ? 700 : 400
                }}>{e}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '18px', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{result.urgency}</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '4px' }}>Estimated remaining shingle life: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{result.life}</span></div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '8px' }}>Insurance: <span style={{ color: '#F5E642', fontWeight: 600 }}>{result.insurance}</span></div>
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
