import { useState } from 'react';

const DFWSTATS = { medianPrice: 390000, floodRisk: 'Low–Medium', avgRain: 37, commute: 27, techJobs: 142000 };
const HOUSTONSTATS = { medianPrice: 310000, floodRisk: 'High', avgRain: 49, commute: 33, techJobs: 89000 };

export default function DFWVsHoustonHousingGuide() {
  const [budget, setBudget] = useState(350000);
  const [climate, setClimate] = useState('dry');
  const [lifestyle, setLifestyle] = useState('suburban');
  const [result, setResult] = useState<null | { city: string; pros: string[]; cons: string[] }>(null);

  function getRecommendation() {
    let dfwScore = 0;
    let houstonScore = 0;

    if (budget < 350000) houstonScore += 3;
    else if (budget < 450000) { dfwScore += 1; houstonScore += 2; }
    else { dfwScore += 2; houstonScore += 1; }

    if (climate === 'dry') dfwScore += 2;
    else if (climate === 'humid') houstonScore += 2;
    else { dfwScore += 1; houstonScore += 1; }

    if (lifestyle === 'urban') houstonScore += 2;
    else if (lifestyle === 'suburban') dfwScore += 2;
    else dfwScore += 1;

    if (dfwScore >= houstonScore) {
      setResult({
        city: 'DFW',
        pros: ['Lower flood risk', 'Stronger tech job market', 'Better storm drainage', 'Higher appreciation trajectory'],
        cons: ['Higher median price than Houston', 'Sprawling metro geography', 'Limited bayou/water access'],
      });
    } else {
      setResult({
        city: 'Houston',
        pros: ['Lowest median prices ($310K)', 'Energy sector dominance', 'True urban density options', 'Diverse international culture'],
        cons: ['High flood risk (Harvey precedent)', 'Highest humidity in Texas', 'Higher insurance premiums', 'Longer average commutes'],
      });
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🏠 DFW vs Houston Housing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Compare Texas's two largest metros before you buy</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {[['DFW', DFWSTATS], ['Houston', HOUSTONSTATS]].map(([city, d]: any) => (
            <div key={city} style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
              <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📍 {city}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Median Home Price</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>${d.medianPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Flood Risk</span>
                  <span style={{ color: d.floodRisk === 'High' ? '#f87171' : '#4ade80' }}>{d.floodRisk}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Annual Rainfall</span>
                  <span style={{ color: '#e2e8f0' }}>{d.avgRain}" / year</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Avg Commute</span>
                  <span style={{ color: '#e2e8f0' }}>{d.commute} min</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Tech Jobs</span>
                  <span style={{ color: '#e2e8f0' }}>{d.techJobs.toLocaleString()}+</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ Disaster Risk Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem', fontSize: '1rem' }}>🌪️ DFW Risks</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>• Tornado corridor — storm shelters recommended</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>• Hail damage common (check insurance)</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>• Winter ice events (rare but disruptive)</p>
            </div>
            <div>
              <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem', fontSize: '1rem' }}>🌊 Houston Risks</h3>
              <p style={{ color: '#f87171', fontSize: '0.9rem' }}>• Severe flooding risk — Hurricane Harvey benchmark</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>• Flood insurance often required (adds $150–400/mo)</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>• Check FEMA flood zone before any purchase</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem' }}>🎯 Get Your Personalized Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Your Budget</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value={300000}>Under $350K</option>
                <option value={350000}>$350K–$450K</option>
                <option value={500000}>$450K+</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Climate Preference</label>
              <select value={climate} onChange={e => setClimate(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="dry">Drier / Less Rain</option>
                <option value="humid">Don't Mind Humidity</option>
                <option value="either">No Preference</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Lifestyle</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="suburban">Suburban Neighborhoods</option>
                <option value="urban">Urban / Walkable</option>
                <option value="space">Need Yard / Space</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Compare My Options →</button>
        </div>

        {result && (
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Best Match: {result.city}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h4 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>👍 Pros</h4>
                {result.pros.map((p, i) => <p key={i} style={{ color: '#e2e8f0', margin: '0.25rem 0', fontSize: '0.9rem' }}>• {p}</p>)}
              </div>
              <div>
                <h4 style={{ color: '#f87171', marginBottom: '0.5rem' }}>👎 Cons</h4>
                {result.cons.map((c, i) => <p key={i} style={{ color: '#e2e8f0', margin: '0.25rem 0', fontSize: '0.9rem' }}>• {c}</p>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
