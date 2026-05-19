import { useState } from 'react';

const DFWDATA = {
  medianPrice: 390000,
  propertyTax: 2.1,
  avgCommute: 27,
  techJobs: 142000,
  population: 7800000,
};

const AUSTINDATA = {
  medianPrice: 520000,
  propertyTax: 2.4,
  avgCommute: 31,
  techJobs: 98000,
  population: 2400000,
};

export default function DFWVsAustinHousingGuide() {
  const [budget, setBudget] = useState(450000);
  const [jobPref, setJobPref] = useState('tech');
  const [lifestyle, setLifestyle] = useState('suburban');
  const [result, setResult] = useState<null | { city: string; pros: string[]; cons: string[] }>(null);

  function getRecommendation() {
    let dfwScore = 0;
    let austinScore = 0;

    if (budget < 450000) dfwScore += 3;
    else if (budget < 600000) { dfwScore += 1; austinScore += 1; }
    else austinScore += 2;

    if (jobPref === 'tech') { dfwScore += 1; austinScore += 2; }
    else if (jobPref === 'finance') { dfwScore += 2; austinScore += 1; }
    else { dfwScore += 1; austinScore += 1; }

    if (lifestyle === 'urban') austinScore += 2;
    else if (lifestyle === 'suburban') dfwScore += 2;
    else dfwScore += 1;

    if (dfwScore >= austinScore) {
      setResult({
        city: 'DFW',
        pros: ['Lower home prices ($390K median)', 'Lower city tax rates', 'More family-friendly suburbs', 'Larger job market overall'],
        cons: ['Less walkable urban core', 'Sprawling geography', 'Intense summer heat'],
      });
    } else {
      setResult({
        city: 'Austin',
        pros: ['Thriving tech startup scene', 'Vibrant cultural scene', 'More walkable neighborhoods', 'Strong appreciation history'],
        cons: ['Higher median price ($520K)', 'Higher city tax burden', 'Rapid growth straining infrastructure', 'Traffic congestion'],
      });
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🏠 DFW vs Austin Housing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Side-by-side comparison to help you choose your Texas market</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {[['DFW', DFWDATA], ['Austin', AUSTINDATA]].map(([city, d]: any) => (
            <div key={city} style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
              <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📍 {city}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Median Home Price</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>${d.medianPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Property Tax Rate</span>
                  <span style={{ color: '#e2e8f0' }}>{d.propertyTax}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Avg Commute (min)</span>
                  <span style={{ color: '#e2e8f0' }}>{d.avgCommute} min</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Tech Jobs</span>
                  <span style={{ color: '#e2e8f0' }}>{d.techJobs.toLocaleString()}+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Metro Population</span>
                  <span style={{ color: '#e2e8f0' }}>{(d.population / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem' }}>🎯 Find Your Best Match</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Your Budget</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value={350000}>Under $400K</option>
                <option value={450000}>$400K–$550K</option>
                <option value={700000}>$550K+</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Job Market Priority</label>
              <select value={jobPref} onChange={e => setJobPref(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="tech">Tech / Startup</option>
                <option value="finance">Finance / Corporate</option>
                <option value="mixed">Mixed / Remote</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Lifestyle Preference</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="suburban">Suburban Family</option>
                <option value="urban">Urban Walkable</option>
                <option value="rural">Semi-Rural Space</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Get My Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended: {result.city}</h3>
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
