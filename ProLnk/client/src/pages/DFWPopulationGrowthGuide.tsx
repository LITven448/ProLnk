import { useState } from 'react';

const corridors = [
  { name: 'Frisco', annualGrowth: 12400, pct5yr: 31, medianHome: 548000, goal: 'both', outlook: 'Frisco is adding a city the size of Carrollton every 4 years. Schools, infrastructure, and retail follow demand. High long-term appreciation trajectory.' },
  { name: 'McKinney', annualGrowth: 10800, pct5yr: 28, medianHome: 492000, goal: 'both', outlook: 'McKinney ranks consistently as a top US city. Master-planned communities and top-rated schools sustain family demand.' },
  { name: 'Prosper', annualGrowth: 8900, pct5yr: 47, medianHome: 612000, goal: 'investment', outlook: 'Prosper is the fastest appreciating corridor in DFW. Large-lot premium inventory and proximity to Legacy West drive above-average gains.' },
  { name: 'Celina', annualGrowth: 9200, pct5yr: 52, medianHome: 461000, goal: 'investment', outlook: 'Ground-floor opportunity. Celina is 10–15 years from full build-out. Early buyers capture the full appreciation arc.' },
  { name: 'Anna / Van Alstyne', annualGrowth: 5400, pct5yr: 38, medianHome: 378000, goal: 'investment', outlook: 'Emerging corridor north of McKinney. Infrastructure investment just beginning. Highest risk, highest ceiling.' },
  { name: 'Denton', annualGrowth: 7100, pct5yr: 24, medianHome: 341000, goal: 'residence', outlook: 'University-anchored stable demand. Denton benefits from UNT/TWU enrollment growth and remote worker inflow.' },
  { name: 'Southlake / Colleyville', annualGrowth: 2100, pct5yr: 18, medianHome: 891000, goal: 'residence', outlook: 'Fully mature, high-barrier market. Low inventory, elite schools, and wealth concentration support price floors.' },
  { name: 'North Fort Worth', annualGrowth: 11200, pct5yr: 29, medianHome: 389000, goal: 'both', outlook: 'Alliance corridor and logistics hub expansion driving blue-collar and trade-worker demand. Affordable entry points with strong rental demand.' },
];

const goalLabels: Record<string, string> = {
  residence: 'Best Place to Live',
  investment: 'Best Investment',
  both: 'Strong for Both',
};

export default function DFWPopulationGrowthGuide() {
  const [goalFilter, setGoalFilter] = useState('');
  const [selectedCorridor, setSelectedCorridor] = useState('');
  const [result, setResult] = useState<null | (typeof corridors)[0]>(null);

  const filteredCorridors = goalFilter ? corridors.filter((c) => c.goal === goalFilter || c.goal === 'both') : corridors;

  function analyze() {
    const corridor = corridors.find((c) => c.name === selectedCorridor);
    if (!corridor) return;
    setResult(corridor);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW MARKET INTELLIGENCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Population Growth Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW adds 100,000+ residents per year. Here's where they’re going — and what it means for home values.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['New Residents/Year', '107,000+'], ['Top Growth City', 'Frisco/Celina'], ['DFW Metro Population', '8.1M+']].map(([label, val]) => (
            <div key={label} style={{ background: '#0F2137', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 WHAT DRIVES DFW GROWTH</div>
          {[
            '🌞 No state income tax + lower cost of living vs. coastal metros continues pulling CA, NY, IL residents',
            '🏗️ 47 corporate HQ relocations since 2020 — each brings hundreds of executive families needing premium housing',
            '✈️ DFW airport expansion and second Amazon mega-hub create logistics employment corridors in North Fort Worth',
            '🎓 UNT, TCU, and UTD enrollment growth adds sustained rental and for-sale demand in Denton and Richardson',
          ].map((item) => (
            <div key={item} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🗺️ GROWTH CORRIDOR ANALYZER</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>YOUR GOAL</label>
              <select value={goalFilter} onChange={(e) => setGoalFilter(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>All corridors</option>
                <option value='residence'>Best place to live</option>
                <option value='investment'>Best investment</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>SELECT CORRIDOR</label>
              <select value={selectedCorridor} onChange={(e) => setSelectedCorridor(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Choose a corridor...</option>
                {filteredCorridors.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Analyze This Corridor</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{result.name}</div>
              <div style={{ display: 'inline-block', background: '#1e3a5f', borderRadius: 20, padding: '3px 12px', color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>{goalLabels[result.goal]}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{result.annualGrowth.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>New Residents/Yr</div>
                </div>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>+{result.pct5yr}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>5-Yr Appreciation</div>
                </div>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>${Math.round(result.medianHome / 1000)}K</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>Median Home Price</div>
                </div>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7 }}>{result.outlook}</div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>Population data from US Census Bureau estimates and DFW regional planning. Not financial advice.</div>
      </div>
    </div>
  );
}
