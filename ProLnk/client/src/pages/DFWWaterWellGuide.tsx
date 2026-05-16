import { useState } from 'react';

const wellAges = ['< 5 years', '5–15 years', '15–30 years', '30+ years'];
const waterIssues = ['None detected', 'Iron bacteria (reddish staining)', 'High hardness (scale buildup)', 'Sulfur smell (rotten egg)', 'Multiple issues'];

const treatments: Record<string, { system: string; cost: string; maintenance: string; note: string }> = {
  'None detected': { system: 'Annual testing only', cost: '$150–300/yr', maintenance: '$150/yr testing', note: 'Even clean wells need annual coliform + nitrate testing per Texas DSHS.' },
  'Iron bacteria (reddish staining)': { system: 'Oxidizing filter + chlorination', cost: '$1,500–4,000 install', maintenance: '$300–500/yr', note: 'Common in Parker and Kaufman county wells. Chlorination shock treatment may be needed annually.' },
  'High hardness (scale buildup)': { system: 'Salt-based water softener', cost: '$1,200–3,000 install', maintenance: '$150–300/yr salt', note: 'DFW groundwater hardness averages 15–25 GPG. Most county well water requires softening.' },
  'Sulfur smell (rotten egg)': { system: 'Aeration system or activated carbon', cost: '$800–2,500 install', maintenance: '$200–400/yr', note: 'H2S present in many Johnson county wells. Aeration is most effective for moderate levels.' },
  'Multiple issues': { system: 'Whole-home treatment package', cost: '$4,000–12,000 install', maintenance: '$600–1,000/yr', note: 'Combo systems: softener + carbon + sediment + UV sterilizer. Common in outer DFW exurbs.' },
};

const counties = ['Parker County', 'Kaufman County', 'Johnson County', 'Hood County', 'Wise County'];
const countyNotes: Record<string, string> = {
  'Parker County': 'Very common private wells. Trinity aquifer primary source. High iron and hardness typical.',
  'Kaufman County': 'Mix of city water and private wells in rural areas. Woodbine aquifer — iron bacteria prevalent.',
  'Johnson County': 'Significant well use. Sulfur odor common in Paluxy formation wells.',
  'Hood County': 'Mostly private well territory. Trinity aquifer. Granbury area has some municipal water.',
  'Wise County': 'Rural well-dependent. Low yield wells common — check GPM before purchase.',
};

export default function DFWWaterWellGuide() {
  const [age, setAge] = useState(wellAges[0]);
  const [issue, setIssue] = useState(waterIssues[0]);
  const [county, setCounty] = useState(counties[0]);
  const [result, setResult] = useState<null | { system: string; cost: string; maintenance: string; note: string; pumpNote: string; countyNote: string }>(null);

  function estimate() {
    const t = treatments[issue];
    const pumpNote = age === '30+ years' ? '⚠️ Pump likely near end of life. Budget $1,500–3,500 for replacement.' : age === '15–30 years' ? 'Schedule pump inspection — submersible pumps average 20 year lifespan.' : 'Pump likely in good shape. Annual flow test recommended.';
    setResult({ ...t, pumpNote, countyNote: countyNotes[county] });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 60%,#122040)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>💧</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>DFW Private Water Well Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Parker, Kaufman, Johnson, and Hood county well owners — what to test, treat, and budget for in 2026.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16, marginBottom: 28 }}>
          {[['🧪','Annual Testing Required','Texas DSHS recommends coliform, nitrate, and pH annually. Cost: $150–300. Required if selling home.'],['⚙️','Pump Lifespan','Submersible pumps last 15–25 years. Sudden pressure loss or air in lines = pump failure warning.'],['📋','Well Log','Texas Water Well Report database has your well specs. Search TWDB.texas.gov for depth and GPM.'],['🔬','Treatment Systems','Most DFW wells need at minimum a water softener. Iron and bacteria issues common in outer counties.']].map(([ic,t,d])=>(
            <div key={t} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{ic}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>{t}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>📍 DFW County Notes</h2>
          {counties.map(c=>(
            <div key={c} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 14, marginBottom: 14 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{c}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{countyNotes[c]}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#0f1f3d,#122040)', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Treatment & Budget Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Well Age</label>
              <select value={age} onChange={e=>setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {wellAges.map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Water Test Results</label>
              <select value={issue} onChange={e=>setIssue(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {waterIssues.map(i=><option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>County</label>
              <select value={county} onChange={e=>setCounty(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {counties.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={estimate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, textAlign: 'center', marginBottom: 14 }}>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Treatment System</div><div style={{ color: '#F5E642', fontSize: 14, fontWeight: 800 }}>{result.system}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Install Cost</div><div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 700 }}>{result.cost}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Annual Maintenance</div><div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 700 }}>{result.maintenance}</div></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 12, borderTop: '1px solid #1e3a5f', paddingTop: 10, marginBottom: 8 }}>{result.note}</div>
              <div style={{ color: '#F5E642', fontSize: 12, borderTop: '1px solid #1e3a5f', paddingTop: 10, marginBottom: 8 }}>{result.pumpNote}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, borderTop: '1px solid #1e3a5f', paddingTop: 10 }}>📍 {result.countyNote}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
