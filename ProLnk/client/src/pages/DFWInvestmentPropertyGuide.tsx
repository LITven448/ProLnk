import { useState } from 'react';

const submarkets = [
  { name: 'East Dallas / Deep Ellum', type: 'SFR/Duplex', capRate: '5.2–6.8%', avgRent: '$1,650', note: 'High demand near walkable urban core, strong appreciation' },
  { name: 'Oak Cliff / Bishop Arts', type: 'SFR/Multifamily', capRate: '5.8–7.2%', avgRent: '$1,580', note: 'Gentrifying, value-add opportunities, long-term upside' },
  { name: 'Garland / Mesquite', type: 'SFR', capRate: '6.5–8.0%', avgRent: '$1,750', note: 'Working class renter base, strong cash flow, B-class assets' },
  { name: 'Irving / Las Colinas', type: 'SFR/Condo', capRate: '5.5–6.5%', avgRent: '$1,900', note: 'Corporate proximity, stable tenants, international renter pool' },
  { name: 'Grand Prairie / Arlington', type: 'SFR', capRate: '6.0–7.5%', avgRent: '$1,800', note: 'Mid-cities location, diverse renter base, solid fundamentals' },
  { name: 'Denton', type: 'SFR/Student', capRate: '6.5–8.5%', avgRent: '$1,550', note: 'UNT/TWU demand, lower price points, student/young professional mix' },
  { name: 'Frisco / Allen', type: 'SFR', capRate: '4.5–5.5%', avgRent: '$2,400', note: 'Premium market, appreciation play, strong tenant quality' },
  { name: 'Fort Worth East Side', type: 'SFR/Duplex', capRate: '7.0–9.0%', avgRent: '$1,400', note: 'Value market, highest cap rates, significant value-add inventory' },
];

const rentalStats = [
  { stat: 'DFW Average Monthly Rent (SFR)', value: '$1,850′ },
  { stat: 'Vacancy Rate', value: '4.2%' },
  { stat: 'YoY Rent Growth (2025)', value: '+3.8%' },
  { stat: 'Population Growth Rate', value: '+2.1%/yr' },
  { stat: 'New Household Formation', value: '42K/yr' },
  { stat: 'Owner-to-Renter Ratio', value: '61% / 39%' },
];

export default function DFWInvestmentPropertyGuide() {
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [monthlyRent, setMonthlyRent] = useState(2100);
  const [downPct, setDownPct] = useState(25);
  const [interestRate, setInterestRate] = useState(7.0);
  const [expenses, setExpenses] = useState(35);
  const [activeTab, setActiveTab] = useState<'market' | 'submarkets' | 'calculator' | 'sfrvsmf'>('market');

  const downPayment = (purchasePrice * downPct) / 100;
  const loanAmount = purchasePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360;
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const annualGrossRent = monthlyRent * 12;
  const annualExpenses = annualGrossRent * (expenses / 100);
  const noi = annualGrossRent - annualExpenses;
  const capRate = ((noi / purchasePrice) * 100).toFixed(2);
  const annualDebtService = monthlyMortgage * 12;
  const annualCashFlow = noi - annualDebtService;
  const monthlyCashFlow = Math.round(annualCashFlow / 12);
  const cashOnCash = ((annualCashFlow / downPayment) * 100).toFixed(2);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📈</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Investment Property Guide 2026
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>
            Cap rates by submarket, SFR vs multifamily analysis, DFW rental market stats, and a live ROI calculator.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['market', 'submarkets', 'calculator', 'sfrvsmf'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeTab === tab ? '#F5E642′ : '#1E3A5F', color: activeTab === tab ? '#0A1628' : '#fff',
              }}
            >
              {tab === 'market' ? '🏙️ Why DFW' : tab === 'submarkets' ? '🗺️ Cap Rates by Area' : tab === 'calculator' ? '🧮 ROI Calculator' : '⚖️ SFR vs Multifamily'}
            </button>
          ))}
        </div>

        {activeTab === 'market' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              {rentalStats.map(s => (
                <div key={s.stat} style={{ background: '#1E3A5F', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 6 }}>{s.stat}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏆 Why DFW is a Landlord Market</h3>
              {[
                { reason: 'No State Income Tax on Rental Income', detail: 'Texas landlords keep more of every dollar earned vs California (9.3%), New York (6.85%), or Illinois (4.95%).' },
                { reason: 'Population Inflow Rate of 42K New Households/Year', detail: 'Companies relocating to DFW (Toyota, Ericsson, Goldman, etc.) bring high-income renters who prefer premium SFR before buying.' },
                { reason: 'Landlord-Friendly Legal Framework', detail: 'Texas has no rent control. Eviction process is faster than most states (3-day notice to vacate, ~30-day court process).' },
                { reason: 'Strong Job Market Anchors Demand', detail: '6.2M jobs in the metro, unemployment below national average. Tenant employment stability is above average nationally.' },
                { reason: 'Property Management Cost-Competitive', detail: 'DFW property management runs 8–10% of gross rents vs 10–12% in coastal markets. More competition = better service at lower cost.' },
              ].map(item => (
                <div key={item.reason} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>✅ {item.reason}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 Property Management Cost Breakdown</h3>
              {[
                { item: 'Monthly Management Fee', cost: '8–10% of gross rent', note: 'On $1,850/mo rent = $148–$185/mo' },
                { item: 'Leasing Fee (tenant placement)', cost: '50–100% of 1 month\’s rent', note: 'One-time when tenant placed' },
                { item: 'Lease Renewal Fee', cost: '$150–$300', note: 'Per renewal, every 12 months' },
                { item: 'Maintenance Coordination', cost: '$0 or 10% markup on repairs', note: 'Ask how they handle contractor billing' },
                { item: 'Vacancy Period Coverage', cost: 'No fee during vacancy (typically)', note: 'Verify this in your management agreement' },
              ].map(row => (
                <div key={row.item} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: 16, padding: '12px 0', borderBottom: '1px solid #1A2E4A', fontSize: 13 }}>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{row.item}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{row.cost}</div>
                  <div style={{ color: '#64748B' }}>{row.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'submarkets' && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🗺️ DFW Cap Rates by Submarket</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {submarkets.map(sm => (
                <div key={sm.name} style={{ background: '#1E3A5F', borderRadius: 12, padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{sm.name}</div>
                      <div style={{ color: '#94A3B8', fontSize: 13 }}>{sm.type}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
                        <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 800 }}>{sm.capRate}</div>
                        <div style={{ color: '#64748B', fontSize: 11 }}>Cap Rate</div>
                      </div>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
                        <div style={{ color: '#34D399', fontSize: 16, fontWeight: 800 }}>{sm.avgRent}</div>
                        <div style={{ color: '#64748B', fontSize: 11 }}>Avg Rent/Mo</div>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: '#94A3B8', fontSize: 13 }}>{sm.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🧮 DFW Investment Property ROI Calculator</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {[
                  { label: 'Purchase Price', value: purchasePrice, setter: setPurchasePrice, min: 100000, max: 2000000, step: 10000, format: (v: number) => `$${v.toLocaleString()}` },
                  { label: 'Monthly Rent', value: monthlyRent, setter: setMonthlyRent, min: 800, max: 8000, step: 50, format: (v: number) => `$${v.toLocaleString()}` },
                  { label: 'Down Payment', value: downPct, setter: setDownPct, min: 15, max: 100, step: 5, format: (v: number) => `${v}%` },
                  { label: 'Interest Rate', value: interestRate, setter: setInterestRate, min: 4, max: 12, step: 0.25, format: (v: number) => `${v}%` },
                  { label: 'Expense Ratio (taxes, insurance, maintenance, PM)', value: expenses, setter: setExpenses, min: 20, max: 60, step: 5, format: (v: number) => `${v}% of gross rent` },
                ].map(field => (
                  <div key={field.label} style={{ gridColumn: field.label.includes('Expense') ? '1 / -1′ : undefined }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label style={{ color: '#94A3B8', fontSize: 13 }}>{field.label}</label>
                      <span style={{ color: '#F5E642', fontWeight: 700 }}>{field.format(field.value)}</span>
                    </div>
                    <input
                      type="range"
                      min={field.min} max={field.max} step={field.step}
                      value={field.value}
                      onChange={e => field.setter(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#F5E642′ }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2D4A6B', fontSize: 11, marginTop: 2 }}>
                      <span>{field.format(field.min)}</span>
                      <span>{field.format(field.max)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Cap Rate', value: `${capRate}%`, sub: 'NOI / Purchase Price', color: Number(capRate) >= 6 ? '#34D399′ : Number(capRate) >= 5 ? '#F5E642' : '#F87171' },
                { label: 'Cash-on-Cash Return', value: `${cashOnCash}%`, sub: 'Annual cash flow / down payment', color: Number(cashOnCash) >= 8 ? '#34D399′ : Number(cashOnCash) >= 5 ? '#F5E642' : '#F87171' },
                { label: 'Monthly Cash Flow', value: `${monthlyCashFlow >= 0 ? '+' : ''}$${Math.abs(monthlyCashFlow).toLocaleString()}`, sub: 'After mortgage and all expenses', color: monthlyCashFlow >= 200 ? '#34D399′ : monthlyCashFlow >= 0 ? '#F5E642' : '#F87171' },
                { label: 'Annual NOI', value: `$${Math.round(noi).toLocaleString()}`, sub: 'Net operating income', color: '#60A5FA' },
              ].map(metric => (
                <div key={metric.label} style={{ background: '#1E3A5F', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: metric.color }}>{metric.value}</div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginTop: 4 }}>{metric.label}</div>
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{metric.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📊 Full Breakdown</h3>
              {[
                ['Down Payment', `$${Math.round(downPayment).toLocaleString()}`],
                ['Loan Amount', `$${Math.round(loanAmount).toLocaleString()}`],
                ['Monthly Mortgage (P&I)', `$${Math.round(monthlyMortgage).toLocaleString()}`],
                ['Annual Gross Rent', `$${Math.round(annualGrossRent).toLocaleString()}`],
                ['Annual Expenses', `$${Math.round(annualExpenses).toLocaleString()} (${expenses}% ratio)`],
                ['Annual Debt Service', `$${Math.round(annualDebtService).toLocaleString()}`],
                ['Annual Cash Flow', `${annualCashFlow >= 0 ? '+' : ''}$${Math.round(annualCashFlow).toLocaleString()}`],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A2E4A', fontSize: 14 }}>
                  <span style={{ color: '#94A3B8′ }}>{label}</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sfrvsmf' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[
                {
                  type: 'Single-Family Rental (SFR)', icon: '🏡', color: '#F5E642',
                  pros: ['Easier to finance (conventional loans)', 'Simpler management (one tenant)', 'Better appreciation historically in DFW', 'Easier to sell (owner-user market)', 'Higher quality tenant demographic'],
                  cons: ['0% or 100% occupied (binary risk)', 'Lower cash flow per $ invested vs MF', 'No economies of scale', 'Vacancy = zero income'],
                  bestFor: 'Long-term appreciation, first-time investors, remote landlords',
                  dfwRange: '$280K–$600K entry, $1,500–$2,800/mo rent',
                },
                {
                  type: 'Multifamily (2–4 units)', icon: '🏢', color: '#60A5FA',
                  pros: ['Vacancy risk spread across units', 'Higher cash flow per dollar invested', 'Still eligible for residential financing', 'Economies of scale on maintenance', 'Forced appreciation through NOI growth'],
                  cons: ['Harder to find in DFW suburbs', 'More complex management', 'Higher entry price for good assets', 'More turnover on average', 'Harder to exit (smaller buyer pool)'],
                  bestFor: 'Cash flow maximizers, experienced investors, local operators',
                  dfwRange: '$350K–$900K for duplex/triplex, $2,800–$5,500/mo combined',
                },
              ].map(item => (
                <div key={item.type} style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, border: `2px solid ${item.color}` }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{ color: item.color, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{item.type}</h3>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#34D399', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>✅ Pros</div>
                    {item.pros.map(p => <div key={p} style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>• {p}</div>)}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#F87171', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>⚠️ Cons</div>
                    {item.cons.map(c => <div key={c} style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>• {c}</div>)}
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: item.color, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>BEST FOR</div>
                    <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.bestFor}</div>
                    <div style={{ color: '#64748B', fontSize: 12, marginTop: 8 }}>{item.dfwRange}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Find Vetted DFW Investment Property Pros</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Connect with investor-friendly agents, property managers, and contractors through ProLnk.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Find Investment Property Pros →
          </button>
        </div>
      </div>
    </div>
  );
}
