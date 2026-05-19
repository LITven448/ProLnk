import { useState } from 'react';

const SUBMARKETS = [
  { name: 'East Dallas / Lakewood', strategy: ['flip', 'rental'], capRate: 5.8, flipROI: '22%', strPotential: 'Medium', avgPrice: 280000, note: 'Gentrifying fast — buy before appreciation peaks' },
  { name: 'South Dallas (Red Bird)', strategy: ['flip'], capRate: 6.4, flipROI: '31%', strPotential: 'Low', avgPrice: 185000, note: 'Highest flip margins, highest execution risk' },
  { name: 'Garland / Mesquite', strategy: ['rental'], capRate: 6.1, flipROI: '18%', strPotential: 'Low', avgPrice: 255000, note: 'Stable rental demand, strong working-class tenant base' },
  { name: 'Fort Worth Near Southside', strategy: ['str', 'flip'], capRate: 5.2, flipROI: '19%', strPotential: 'High', avgPrice: 310000, note: 'STR hot zone near Magnolia Ave entertainment district' },
  { name: 'Frisco / Little Elm', strategy: ['rental'], capRate: 4.6, flipROI: '14%', strPotential: 'Medium', avgPrice: 420000, note: 'Best appreciation but lower cap rate — long-hold play' },
  { name: 'Arlington (Entertainment)', strategy: ['str'], capRate: 5.5, flipROI: '16%', strPotential: 'High', avgPrice: 280000, note: 'Cowboys/Rangers/Six Flags STR demand driver' },
];

export default function DFWInvestorHousingGuide() {
  const [strategy, setStrategy] = useState('flip');
  const [budget, setBudget] = useState(300000);
  const [results, setResults] = useState<typeof SUBMARKETS>([]);

  function findInvestments() {
    let filtered = SUBMARKETS.filter(s => {
      const withinBudget = s.avgPrice <= budget * 1.1;
      const matchesStrategy = s.strategy.includes(strategy);
      return withinBudget && matchesStrategy;
    });

    if (strategy === 'flip') filtered.sort((a, b) => parseFloat(b.flipROI) - parseFloat(a.flipROI));
    else if (strategy === 'rental') filtered.sort((a, b) => b.capRate - a.capRate);
    else filtered.sort((a, b) => (b.strPotential === 'High' ? 1 : 0) - (a.strPotential === 'High' ? 1 : 0));

    setResults(filtered);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>📈 DFW Investor Housing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Cap rates, flip ROI, STR opportunities, and how to compete with institutional buyers</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '💼 Avg DFW Cap Rate', value: '5.6%', sub: 'Single family rentals' },
            { label: '🔨 Avg Flip ROI', value: '21%', sub: 'Active investor market' },
            { label: '🏨 STR Occupancy', value: '68%', sub: 'Arlington / FW corridors' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#111f3d', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{s.label}</p>
              <p style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0′ }}>{s.value}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏦 Institutional Buyer Impact</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Invitation Homes, Progress Residential, and others own ~3% of DFW SFR stock — concentrated below $350K.</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• They bid 5–8% over asking in target corridors</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• All-cash, waived inspections — hard to compete head-on</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>• Opportunity: beat them to off-market deals via direct mail, wholesalers, probate leads</p>
          </div>
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚡ How to Compete with Cash Buyers</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Get pre-underwritten hard money or DSCR loan ready to close in 10 days</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Build a direct-to-seller pipeline (skip the MLS)</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Target properties needing rehab — institutions avoid heavy lifts</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>• Focus on $200K–$280K range — less institutional competition above $300K</p>
          </div>
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem' }}>🔍 Find Your DFW Investment Submarket</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Investment Strategy</label>
              <select value={strategy} onChange={e => setStrategy(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="flip">Fix & Flip</option>
                <option value="rental">Long-Term Rental (BRRRR)</option>
                <option value="str">Short-Term Rental (STR/Airbnb)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Investment Budget (All-In)</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value={220000}>Under $220K</option>
                <option value={300000}>$220K–$320K</option>
                <option value={450000}>$320K–$450K</option>
                <option value={600000}>$450K+</option>
              </select>
            </div>
          </div>
          <button onClick={findInvestments} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Find Opportunities →</button>
        </div>

        {results.length > 0 ? (
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🎯 Top DFW Investment Submarkets for You</h3>
            {results.map((r, i) => (
              <div key={r.name} style={{ borderBottom: i < results.length - 1 ? '1px solid #1e3a5f' : 'none', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>#{i + 1} {r.name}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700' }}>~${r.avgPrice.toLocaleString()} avg</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.3rem' }}>
                  <span style={{ color: '#4ade80', fontSize: '0.8rem' }}>📊 Cap: {r.capRate}%</span>
                  <span style={{ color: '#60a5fa', fontSize: '0.8rem' }}>🔨 Flip ROI: {r.flipROI}</span>
                  <span style={{ color: '#a78bfa', fontSize: '0.8rem' }}>🏨 STR: {r.strPotential}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.825rem', marginTop: '0.3rem' }}>💡 {r.note}</p>
              </div>
            ))}
          </div>
        ) : results !== null && results.length === 0 && strategy ? (
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #f87171', textAlign: 'center' }}>
            <p style={{ color: '#f87171′ }}>No submarkets match your criteria. Try increasing your budget or changing your strategy.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
