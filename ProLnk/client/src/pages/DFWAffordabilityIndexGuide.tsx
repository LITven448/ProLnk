import { useState } from 'react';

const submarkets = [
  { name: 'Celina', medianHome: 461000, taxRate: 2.41, score: 72, incomeNeeded: 118000 },
  { name: 'Anna / Van Alstyne', medianHome: 378000, taxRate: 2.38, score: 80, incomeNeeded: 97000 },
  { name: 'Denton', medianHome: 341000, taxRate: 2.19, score: 85, incomeNeeded: 87000 },
  { name: 'Fort Worth', medianHome: 302000, taxRate: 2.26, score: 88, incomeNeeded: 78000 },
  { name: 'Arlington', medianHome: 318000, taxRate: 2.31, score: 86, incomeNeeded: 82000 },
  { name: 'Garland', medianHome: 289000, taxRate: 2.18, score: 90, incomeNeeded: 74000 },
  { name: 'Irving', medianHome: 362000, taxRate: 2.24, score: 82, incomeNeeded: 93000 },
  { name: 'McKinney', medianHome: 492000, taxRate: 2.37, score: 67, incomeNeeded: 126000 },
  { name: 'Plano', medianHome: 521000, taxRate: 2.14, score: 63, incomeNeeded: 133000 },
  { name: 'Frisco', medianHome: 548000, taxRate: 2.29, score: 60, incomeNeeded: 141000 },
  { name: 'Prosper', medianHome: 612000, taxRate: 2.43, score: 54, incomeNeeded: 157000 },
  { name: 'Southlake', medianHome: 891000, taxRate: 2.16, score: 34, incomeNeeded: 228000 },
  { name: 'Uptown Dallas', medianHome: 498000, taxRate: 2.22, score: 65, incomeNeeded: 128000 },
];

function scoreLabel(score: number) {
  if (score >= 85) return { label: 'Highly Affordable', color: '#22c55e' };
  if (score >= 70) return { label: 'Moderately Affordable', color: '#F5E642′ };
  if (score >= 55) return { label: 'Stretching', color: '#f97316′ };
  return { label: 'Significant Stretch', color: '#ef4444′ };
}

export default function DFWAffordabilityIndexGuide() {
  const [income, setIncome] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [result, setResult] = useState<null | {
    sub: (typeof submarkets)[0];
    maxHome: number;
    personalScore: number;
    affordable: (typeof submarkets)[0][];
  }>(null);

  function calculate() {
    const inc = parseInt(income.replace(/,/g, ''));
    const sub = submarkets.find((s) => s.name === selectedArea);
    if (!inc || !sub) return;
    const maxHome = Math.round(inc * 4.2);
    const personalScore = Math.min(100, Math.round((inc / sub.incomeNeeded) * sub.score));
    const affordable = submarkets.filter((s) => s.incomeNeeded <= inc * 1.05).sort((a, b) => b.score - a.score).slice(0, 4);
    setResult({ sub, maxHome, personalScore, affordable });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW MARKET INTELLIGENCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Affordability Index Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW has slipped below the national affordability average. Here's what it means — and where opportunity still exists.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['DFW Median Home', '$421K'], ['Property Tax Rate', '2.1–2.5%'], ['National Afford. Rank', '#38 of 50 metros']].map(([label, val]) => (
            <div key={label} style={{ background: '#0F2137', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚠️ THE AFFORDABILITY REALITY IN DFW</div>
          {[
            '📉 DFW now ranks #38 in national affordability — down from #22 just 5 years ago due to rapid appreciation',
            '🏠 Texas\’s property tax is a unique affordability drag: 2.1–2.5% annually vs national avg of 1.1%',
            '💰 A $450K DFW home can cost $1,200–$1,400/mo more than a similar home in a low-tax state',
            '🌟 Outer suburbs (Garland, Fort Worth, Denton) remain meaningfully more affordable than the national median',
            '📊 Affordability index below 100 = median income cannot qualify for median home price without stretch',
          ].map((item) => (
            <div key={item} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🧮 PERSONAL AFFORDABILITY CALCULATOR</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>HOUSEHOLD INCOME ($/YEAR)</label>
              <input type='number' value={income} onChange={(e) => setIncome(e.target.value)} placeholder='e.g. 110000′ style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14, boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>TARGET DFW AREA</label>
              <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select area...</option>
                {submarkets.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Calculate Affordability</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>${(result.maxHome / 1000).toFixed(0)}K</div>
                  <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>Max Recommended Home</div>
                </div>
                <div style={{ background: '#0F2137', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: scoreLabel(result.personalScore).color, fontSize: 20, fontWeight: 800 }}>{result.personalScore}/100</div>
                  <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>{scoreLabel(result.personalScore).label}</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>EST. ANNUAL PROPERTY TAX IN {result.sub.name.toUpperCase()}</div>
              <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                ${Math.round(result.sub.medianHome * result.sub.taxRate / 100).toLocaleString()}/yr on median home
              </div>
              {result.affordable.length > 0 && (
                <>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8, borderTop: '1px solid #1e3a5f', paddingTop: 14 }}>ALSO AFFORDABLE AT YOUR INCOME LEVEL</div>
                  {result.affordable.map((a) => (
                    <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F2137', borderRadius: 6, padding: '8px 14px', marginBottom: 6 }}>
                      <span style={{ color: '#cbd5e1', fontSize: 13 }}>📍 {a.name}</span>
                      <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>Score {a.score}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>Affordability scores based on income-to-housing-cost ratios and DFW property tax data. Not financial advice.</div>
      </div>
    </div>
  );
}
