import { useState } from 'react';

const employers = [
  { name: 'Toyota North America HQ', location: 'Legacy West / Plano', corridors: ['Frisco', 'Plano', 'Allen'], premium: 12, demand: 'Very High' },
  { name: 'JPMorgan Chase Campus', location: 'Legacy West / Plano', corridors: ['Plano', 'McKinney', 'Frisco'], premium: 11, demand: 'Very High' },
  { name: 'AT&T Headquarters', location: 'Downtown Dallas', corridors: ['Uptown Dallas', 'Oak Cliff', 'Bishop Arts'], premium: 9, demand: 'High' },
  { name: 'UT Southwestern Medical', location: 'Medical District', corridors: ['Oak Cliff', 'Kessler Park', 'Bishop Arts'], premium: 10, demand: 'High' },
  { name: 'Charles Schwab HQ', location: 'Westlake / Southlake', corridors: ['Southlake', 'Grapevine', 'Colleyville'], premium: 14, demand: 'Very High' },
  { name: 'Oracle Cloud HQ', location: 'Las Colinas', corridors: ['Irving', 'Las Colinas', 'Coppell'], premium: 8, demand: 'High' },
  { name: 'American Airlines HQ', location: 'Fort Worth', corridors: ['Fort Worth', 'North Richland Hills', 'Hurst'], premium: 7, demand: 'Moderate' },
  { name: 'Lockheed Martin', location: 'Fort Worth', corridors: ['Fort Worth', 'Weatherford', 'Granbury'], premium: 6, demand: 'Moderate' },
  { name: 'Texas Health Resources', location: 'Arlington', corridors: ['Arlington', 'Mansfield', 'Grand Prairie'], premium: 6, demand: 'Moderate' },
];

export default function DFWEmploymentAndHousingGuide() {
  const [selectedEmployer, setSelectedEmployer] = useState('');
  const [result, setResult] = useState<null | (typeof employers)[0]>(null);

  function analyze() {
    const emp = employers.find((e) => e.name === selectedEmployer);
    if (!emp) return;
    setResult(emp);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW MARKET INTELLIGENCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Employment & Housing Connection</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How DFW's top employers drive neighborhood demand — and where to buy near the strongest job corridors.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['New Jobs/Year', '85,000+'], ['Employer Relocations', '47 since 2020'], ['Avg Salary (Relocated)', '$112K']].map(([label, val]) => (
            <div key={label} style={{ background: '#0F2137', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏢 KEY EMPLOYER CORRIDORS</div>
          {[
            '🚗 Toyota & JPMorgan in Legacy West → Frisco, Plano, Allen see 10–14% appreciation premium over DFW baseline',
            '🏥 UT Southwestern Medical District → Oak Cliff, Kessler Park, Bishop Arts benefit from stable, high-income demand',
            '✈️ American Airlines & Lockheed → Fort Worth workforce housing corridor remains affordable with steady appreciation',
            '💻 Oracle / Las Colinas tech cluster → Irving/Coppell command rising rents and shorter days-on-market',
          ].map((item) => (
            <div key={item} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 EMPLOYER IMPACT ANALYZER</div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>SELECT EMPLOYER</label>
            <select value={selectedEmployer} onChange={(e) => setSelectedEmployer(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
              <option value=''>Choose an employer...</option>
              {employers.map((e) => <option key={e.name} value={e.name}>{e.name}</option>)}
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Analyze Housing Impact</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{result.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>📍 Located in {result.location}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>+{result.premium}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>Appreciation Premium</div>
                </div>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.demand}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>Housing Demand Level</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>TOP NEIGHBORHOODS WITH SUSTAINED DEMAND</div>
              {result.corridors.map((c) => (
                <div key={c} style={{ background: '#0F2137', borderRadius: 6, padding: '8px 14px', marginBottom: 6, color: '#cbd5e1', fontSize: 14 }}>📍 {c}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📌 HOW TO USE THIS DATA</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>Homes within a 15-minute commute of major employer campuses historically appreciate 8–14% above the DFW baseline during active hiring cycles. Target neighborhoods before hiring announcements, not after — demand spikes 6–12 months after a major employer signs a campus lease.</p>
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>Data based on employer public filings and DFW MLS trends 2020–2026. Not financial advice.</div>
      </div>
    </div>
  );
}
