import { useState } from 'react';

const sections = [
  {
    icon: '🔑',
    heading: 'What Is a Sale-Leaseback?',
    body: 'You sell your home to a buyer (often an investor) and immediately sign a lease to stay as a tenant while you search for your next home. You get the cash from the sale, avoid double moves, and buy time in a competitive DFW market.',
  },
  {
    icon: '🏘️',
    heading: 'Who Agrees to Sale-Leasebacks in DFW?',
    body: 'Primarily real estate investors, iBuyers (Opendoor, Offerpad), and some individual buyers. Traditional buyers with financing often cannot agree because their lender requires the property to be owner-occupied at close. Cash buyers and investors are your best target.',
  },
  {
    icon: '📝',
    heading: 'How to Negotiate Leaseback Terms',
    body: '• Length: 30–90 days most common. 6 months is possible with motivated investors.\n• Rent: Typically set at buyer\’s PITI (principal, interest, taxes, insurance) per month.\n• Deposit: Usually $2,000–$5,000, credited back if you leave on time.\n• Condition clause: Document home condition at close to protect your deposit.',
  },
  {
    icon: '⚠️',
    heading: 'Risks for Seller and Buyer',
    body: 'Seller risks: You lose ownership immediately — buyer can sell or refinance without telling you. Inspect lease carefully. Buyer risks: Tenant (you) may not leave on time, requiring eviction. Market exposure during leaseback period. Both parties should use a real estate attorney.',
  },
  {
    icon: '📊',
    heading: 'DFW Market Context',
    body: 'DFW\’s active investor market (institutional and individual) makes sale-leasebacks more viable here than most U.S. markets. Metroplex has 40,000+ active real estate investors. In a seller\’s market, buyers are motivated to offer leaseback to win the deal.',
  },
];

export default function DFWSaleLeasebackGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [months, setMonths] = useState('');
  const [marketType, setMarketType] = useState('');
  const [result, setResult] = useState<null | { feasible: boolean; rentEst: number; altCost: number; verdict: string }>(null);

  function calculate() {
    const hv = parseFloat(homeValue) || 0;
    const mo = parseInt(months) || 0;
    const isSeller = marketType === 'seller';
    const feasible = hv > 0 && mo <= 6 && (isSeller || mo <= 2);
    const rentEst = hv * 0.006;
    const altCost = mo * 1800 + 3000;
    const totalRent = rentEst * mo;
    const verdict = feasible
      ? totalRent < altCost
        ? `Sale-leaseback saves you ~$${(altCost - totalRent).toLocaleString('en-US', { maximumFractionDigits: 0 })} vs renting separately.`
        : `Renting separately may be cheaper by ~$${(totalRent - altCost).toLocaleString('en-US', { maximumFractionDigits: 0 })}, but leaseback avoids double-move stress.`
      : `Sale-leaseback is unlikely: ${!isSeller ? 'buyer\'s market makes investors less flexible.' : `${mo} months is too long for most DFW buyers.`}`;
    setResult({ feasible, rentEst, altCost, verdict });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#F5E642′ }}>Sale-Leaseback Guide — DFW</h1>
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', marginBottom: '2rem' }}>Sell your home and stay as a tenant while you find your next place in Dallas-Fort Worth</p>
        {sections.map((s, i) => (
          <div key={i} style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>{s.icon} {s.heading}</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{s.body}</p>
          </div>
        ))}
        <div style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Sale-Leaseback Feasibility Calculator</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>Home Value ($)</label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }} placeholder="0″ />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>Months Needed</label>
              <input type="number" value={months} onChange={e => setMonths(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }} placeholder="1–6″ />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>Current Market</label>
              <select value={marketType} onChange={e => setMarketType(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem' }}>
                <option value="">Select...</option>
                <option value="seller">Seller's Market</option>
                <option value="balanced">Balanced</option>
                <option value="buyer">Buyer's Market</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Assess Feasibility</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: result.feasible ? '#052e16′ : '#3b0000', borderRadius: '8px', border: `1px solid ${result.feasible ? '#16a34a' : '#dc2626'}` }}>
              <p style={{ fontWeight: 700, color: result.feasible ? '#4ade80′ : '#f87171' }}>{result.feasible ? '✅ Sale-Leaseback Is Viable' : '⚠️ Challenging Situation'}</p>
              <p>Est. Monthly Rent: <strong>${(result.rentEst).toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</strong></p>
              <p>Alt. Rental Cost (apt + moving): <strong>${result.altCost.toLocaleString()}</strong></p>
              <p style={{ marginTop: '0.5rem', color: '#d1d5db' }}>{result.verdict}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
