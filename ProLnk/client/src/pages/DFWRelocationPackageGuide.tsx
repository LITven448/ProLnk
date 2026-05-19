import { useState } from 'react';

const sections = [
  {
    icon: '✈️',
    heading: 'Texas: The Corporate Relocation Capital',
    body: 'Oracle, Toyota, HP, Goldman Sachs, and hundreds of others have moved headquarters or major operations to DFW. Texas has no state income tax, favorable business regulations, and DFW offers a major international airport — making it the top U.S. relocation destination.',
  },
  {
    icon: '📦',
    heading: 'Common Corporate Relocation Benefits',
    body: '• Moving allowance: $5,000–$25,000 for household goods\n• Temporary housing: 30–90 days covered (corporate housing or hotel)\n• Home sale assistance (COBRA or BVO programs)\n• Destination area orientation trips (paid)\n• Spouse job search assistance\n• School search services\n• Loss-on-sale protection for underwater homes',
  },
  {
    icon: '💡',
    heading: 'How to Maximize Your Package',
    body: 'Negotiate before you accept. Ask for: extended temp housing (60 vs 30 days), BVO (Buyer Value Option) vs direct reimbursement for home sale, lump sum vs managed move. DFW housing prices are higher than many Midwest or Southeast markets — ask for cost-of-living adjustment.',
  },
  {
    icon: '📋',
    heading: 'Tax Implications of Relocation Benefits',
    body: 'Post-2017, most relocation benefits are taxable income. The Tax Cuts and Jobs Act eliminated the moving expense deduction for most employees. Your employer may offer a "gross-up" to cover the tax burden. Always ask HR if a gross-up is included — it can be worth $3,000–$12,000.',
  },
  {
    icon: '🏡',
    heading: 'DFW Housing Market Considerations',
    body: 'Median home price in DFW is $380K (2026). Top relocation corridors: Frisco, Plano, McKinney (north), Las Colinas, Irving, Coppell (west), Southlake, Keller (northeast). Rent vs. buy analysis favors buying in most DFW submarkets for stays of 2+ years.',
  },
];

const packageTypes: Record<string, number> = {
  'Lump Sum Only': 8000,
  'Managed Move (Standard)': 18000,
  'Managed Move (Executive)': 40000,
  'Full Relo (BVO + Housing + Moving)': 75000,
};

export default function DFWRelocationPackageGuide() {
  const [pkgType, setPkgType] = useState('');
  const [homeValue, setHomeValue] = useState('');
  const [result, setResult] = useState<null | { value: number; taxImpact: number; netValue: number; tips: string[] }>(null);

  function calculate() {
    const base = packageTypes[pkgType] || 0;
    const hv = parseFloat(homeValue) || 0;
    const saleAssist = pkgType.includes('BVO') ? hv * 0.03 : 0;
    const value = base + saleAssist;
    const taxImpact = value * 0.32;
    const netValue = value - taxImpact;
    const tips = [
      'Ask for a gross-up to cover the ~32% tax hit.',
      hv > 500000 ? 'With your home value, prioritize BVO or loss-on-sale protection.' : 'Request extended temp housing to buy in a calmer DFW market window.',
      base < 20000 ? 'Your package is below average — negotiate for at least 30 days temp housing and a $5K cost-of-living allowance.' : 'Your package is solid. Focus negotiation on gross-up and timeline flexibility.',
    ];
    setResult({ value, taxImpact, netValue, tips });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1e3a5f' }}>Corporate Relocation Package Guide — DFW</h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2rem' }}>Maximize your relocation benefits when moving to the Dallas-Fort Worth metro</p>
        {sections.map((s, i) => (
          <div key={i} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e3a5f' }}>{s.icon} {s.heading}</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{s.body}</p>
          </div>
        ))}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#1e3a5f' }}>🧮 Relocation Package Value Calculator</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#374151' }}>Package Type</label>
              <select value={pkgType} onChange={e => setPkgType(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}>
                <option value="">Select...</option>
                {Object.keys(packageTypes).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#374151' }}>Current Home Value ($)</label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', boxSizing: 'border-box' }} placeholder="0" />
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#1e3a5f', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Calculate Package Value</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
              <p>Estimated Package Value: <strong>${result.value.toLocaleString()}</strong></p>
              <p>Tax Impact (~32%): <strong>-${result.taxImpact.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong></p>
              <p>Net After-Tax Value: <strong>${result.netValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong></p>
              <div style={{ marginTop: '0.75rem' }}>
                <p style={{ fontWeight: 700 }}>💡 Negotiation Tips:</p>
                {result.tips.map((t, i) => <p key={i} style={{ marginLeft: '1rem', color: '#1e40af' }}>• {t}</p>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
