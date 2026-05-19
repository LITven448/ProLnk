import { useState } from 'react';

const sections = [
  {
    icon: '⚖️',
    heading: 'Texas Community Property: 50/50 Default',
    body: 'Texas is one of 9 community property states. Any home purchased during the marriage is marital property split 50/50 at divorce — regardless of whose name is on the deed. Separate property (inherited or owned before marriage) is exempt but must be proven.',
  },
  {
    icon: '🏛️',
    heading: 'Court-Ordered Sale Process',
    body: 'If spouses cannot agree on selling vs. one buying out the other, the court issues a partition order. A receiver or special commissioner manages the sale. Timeline: 6–18 months depending on court docket in Dallas, Tarrant, Collin, or Denton County.',
  },
  {
    icon: '🔄',
    heading: 'One Spouse Buying Out the Other',
    body: 'The buying spouse must: 1) Qualify for a new mortgage in their name alone, 2) Refinance within a court-ordered timeframe (usually 90 days), 3) Pay departing spouse their equity share at closing. If the buying spouse can\’t qualify, the home must be sold.',
  },
  {
    icon: '💸',
    heading: 'Tax Implications in Divorce',
    body: 'Section 121 exclusion still applies: $250K gain excluded per person ($500K if both lived there 2 of last 5 years). Transfers between divorcing spouses are generally tax-free under IRC 1041. But post-divorce sales may trigger capital gains — consult a CPA.',
  },
  {
    icon: '🏚️',
    heading: 'Handling Underwater Mortgages in Divorce',
    body: 'If you owe more than the home is worth: both spouses remain liable unless refinanced or short sold. Options: short sale (both must agree), deed-in-lieu, keep renting until equity recovers. Credit impact affects both parties while mortgage stays joint.',
  },
];

const situations: Record<string, string> = {
  'Agreed Sale': 'List the home, split net proceeds 50/50. Timeline: 30–90 days. Cleanest option.',
  'Buyout': 'Buying spouse must refi to remove other from mortgage. Requires income qualification. Pay equity share at closing.',
  'Court-Ordered Sale': 'A receiver manages the sale. Slower (6–18 months), higher costs, less control over sale price.',
  'Underwater': 'Short sale requires lender approval. Both spouses\’ credit is affected. Explore deed-in-lieu as alternative.',
};

export default function DFWDivorceSaleGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | { equity: number; perSpouse: number; costs: number; netEach: number; guidance: string }>(null);

  function calculate() {
    const hv = parseFloat(homeValue) || 0;
    const mort = parseFloat(mortgage) || 0;
    const equity = hv - mort;
    const costs = hv * 0.08;
    const netEach = (equity - costs) / 2;
    const guidance = situations[situation] || 'Select a situation type to see guidance.';
    setResult({ equity, perSpouse: equity / 2, costs, netEach, guidance });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#F5E642′ }}>Divorce Home Sale Guide — DFW</h1>
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', marginBottom: '2rem' }}>Texas community property rules, buyouts, court sales, and your financial options</p>
        {sections.map((s, i) => (
          <div key={i} style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>{s.icon} {s.heading}</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{s.body}</p>
          </div>
        ))}
        <div style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Divorce Sale Impact Calculator</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {[['Home Value ($)', homeValue, setHomeValue], ['Mortgage Balance ($)', mortgage, setMortgage]].map(([label, val, setter]: any) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>{label}</label>
                <input type="number" value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }} placeholder="0″ />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>Situation Type</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem' }}>
                <option value="">Select...</option>
                {Object.keys(situations).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Calculate Options</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#1a2e4a', borderRadius: '8px', border: '1px solid #374151′ }}>
              <p>Total Equity: <strong style={{ color: result.equity >= 0 ? '#4ade80′ : '#f87171' }}>${result.equity.toLocaleString(’en-US', { maximumFractionDigits: 0 })}</strong></p>
              <p>Est. Sale Costs (~8%): <strong>-${result.costs.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong></p>
              <p>Net Per Spouse: <strong style={{ color: result.netEach >= 0 ? '#4ade80′ : '#f87171' }}>${result.netEach.toLocaleString(’en-US', { maximumFractionDigits: 0 })}</strong></p>
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#0f2137', borderRadius: '8px' }}>
                <p style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem' }}>📋 Recommended Path:</p>
                <p style={{ color: '#d1d5db' }}>{result.guidance}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
