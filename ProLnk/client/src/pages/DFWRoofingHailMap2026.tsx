import { useState } from 'react';

export default function DFWRoofingHailMap2026() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState('');

  const hailData: { [key: string]: { freq: string; risk: string; note: string } } = {
    'fort worth': { freq: 'Very High', risk: '🔴', note: 'Fort Worth sits in the primary hail corridor entering DFW from the southwest. Historically receives more hail events per year than Dallas.' },
    'arlington': { freq: 'High', risk: '🔴', note: 'Arlington is in the center of the DFW hail zone. Mid-Cities area catches storms tracking NE toward Dallas.' },
    'dallas': { freq: 'High', risk: '🟠', note: 'Dallas receives significant hail but fewer direct hits than Fort Worth due to storm track direction (SW to NE means FW first).' },
    'plano': { freq: 'Moderate-High', risk: '🟠', note: 'North Dallas suburbs receive less frequent hail but storms that reach Plano are often larger due to longer storm duration.' },
    'denton': { freq: 'High', risk: '🔴', note: 'Denton sits at the northwest entry point of storms entering DFW. Frequent hail events, often earlier in storm season.' },
    'mckinney': { freq: 'Moderate', risk: '🟡', note: 'McKinney is further northeast — storms weaken slightly after crossing Dallas. Still significant hail risk seasonally.' },
    'mansfield': { freq: 'High', risk: '🔴', note: 'Mansfield is in the direct path of storms entering from southwest. High frequency of 1 to 2 inch hail events.' },
  };

  function assess() {
    const key = city.toLowerCase().trim();
    const match = hailData[key];
    if (match) {
      setResult(match.risk + ' ' + city + ': ' + match.freq + ' hail frequency\n\n' + match.note + '\n\nInsurance impact: High-frequency hail zones typically see 15 to 30% higher roof insurance premiums. Document every hail event with date and report to insurer within 12 months.');
    } else {
      setResult('DFW-wide: All of DFW is in the highest hail frequency zone in the continental US. Storm tracks enter from the southwest and exit northeast. Fort Worth and Tarrant County receive the most direct hits. Check the NOAA Storm Events Database at ncdc.noaa.gov for your specific ZIP code hail history.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌩️ DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>DFW Hail Frequency Map Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW is located in the highest hail-frequency zone in the United States. Understanding your area's hail history is essential for insurance claims, roof replacement timing, and material selection.</p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🗺️ DFW Storm Track Pattern</h2>
          <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Typical Storm Direction: Southwest to Northeast</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Storms enter DFW from the southwest near Weatherford and Granbury, cross Tarrant County including Fort Worth, Arlington, and Mansfield, then move northeast through Dallas County toward Plano and McKinney. Fort Worth consistently receives storms before Dallas.</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[
              ['🔴 Very High', 'Fort Worth, Denton, Mansfield'],
              ['🟠 High', 'Arlington, Dallas, Irving'],
              ['🟡 Moderate', 'Plano, McKinney, Frisco'],
            ].map(([level, cities]) => (
              <div key={level} style={{ background: '#1a3058', borderRadius: 6, padding: '0.75rem', textAlign: 'center' as const }}>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: '0.85rem' }}>{level}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{cities}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 How to Check Your Property's Hail History</h2>
          {[
            ['1', 'Visit NOAA Storm Events Database: ncdc.noaa.gov/stormevents'],
            ['2', 'Search by ZIP code and filter event type to Hail'],
            ['3', 'Review last 5 years of events and note dates and hail size'],
            ['4', 'Cross-reference with your insurance claim history'],
            ['5', 'File a claim for any event with hail 1 inch or larger even if no obvious damage yet'],
          ].map(([n, step]) => (
            <div key={n} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>{n}</span>
              <span style={{ color: '#cbd5e1′ }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📍 Check Your DFW Location</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Enter Your DFW City</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. Fort Worth, Mansfield, Plano"
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem', boxSizing: 'border-box' as const }}
              />
            </div>
            <button
              onClick={assess}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Get Hail Frequency Assessment
            </button>
            {result && (
              <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                {result}
              </div>
            )}
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center' as const }}>
          ProLnk DFW Roofing Resource 2026
        </div>
      </div>
    </div>
  );
}
