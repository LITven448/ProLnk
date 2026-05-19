import { useState } from 'react';

export default function DFWPropertyInvestmentGuide() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [results, setResults] = useState<{ grossYield: string; capRate: string; cashOnCash: string; monthlyCashFlow: string } | null>(null);

  const calculate = () => {
    const price = parseFloat(purchasePrice.replace(/,/g, '')) || 0;
    const rent = parseFloat(monthlyRent.replace(/,/g, '')) || 0;
    const expenses = parseFloat(monthlyExpenses.replace(/,/g, '')) || 0;
    const down = parseFloat(downPayment.replace(/,/g, '')) || 0;

    if (!price || !rent) return;

    const annualRent = rent * 12;
    const annualExpenses = expenses * 12;
    const noi = annualRent - annualExpenses;
    const grossYield = ((annualRent / price) * 100).toFixed(2);
    const capRate = ((noi / price) * 100).toFixed(2);
    const monthlyCashFlow = rent - expenses;
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCash = down > 0 ? ((annualCashFlow / down) * 100).toFixed(2) : 'N/A';

    setResults({
      grossYield: `${grossYield}%`,
      capRate: `${capRate}%`,
      cashOnCash: cashOnCash !== 'N/A' ? `${cashOnCash}%` : 'Enter down payment',
      monthlyCashFlow: `${monthlyCashFlow >= 0 ? '+' : ''}$${monthlyCashFlow.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
    });
  };

  const markets = [
    { city: 'Garland', type: 'Yield Play', entryPrice: '$270K–$340K', grossYield: '7.5–8.5%', appreciation: 'Moderate', notes: 'Affordable entry, stable tenant demand, diverse employment base.', emoji: '💰' },
    { city: 'Mesquite', type: 'Yield Play', entryPrice: '$250K–$320K', grossYield: '7.8–9.0%', appreciation: 'Moderate', notes: 'Lower entry cost, strong blue-collar rental demand, DFW Airport proximity.', emoji: '💰' },
    { city: 'Irving', type: 'Balanced', entryPrice: '$310K–$420K', grossYield: '6.5–7.5%', appreciation: 'Moderate-High', notes: 'Las Colinas corridor, corporate presence, STR (Airbnb) potential in some areas.', emoji: '⚖️' },
    { city: 'Arlington', type: 'Balanced', entryPrice: '$290K–$400K', grossYield: '6.8–8.0%', appreciation: 'Moderate', notes: 'UTA student rental demand, entertainment district, broad employment base.', emoji: '⚖️' },
    { city: 'Grand Prairie', type: 'Balanced', entryPrice: '$270K–$360K', grossYield: '7.0–8.2%', appreciation: 'Moderate', notes: 'Central DFW location, excellent logistics access, growing industrial employer base.', emoji: '⚖️' },
    { city: 'Celina', type: 'Appreciation Play', entryPrice: '$380K–$540K', grossYield: '4.5–5.5%', appreciation: 'High', notes: 'North DFW growth corridor, lower near-term yield but strong long-term appreciation thesis.', emoji: '📈' },
    { city: 'Anna', type: 'Appreciation Play', entryPrice: '$320K–$440K', grossYield: '5.0–6.0%', appreciation: 'High', notes: 'Emerging far-north suburb, infrastructure catching up to population growth.', emoji: '📈' },
    { city: 'Frisco', type: 'Premium', entryPrice: '$480K–$700K+', grossYield: '4.0–5.5%', appreciation: 'Moderate-High', notes: 'Top-tier school districts = premium tenants and home values. More expensive entry.', emoji: '⭐' },
  ];

  const typeColors: Record<string, string> = {
    'Yield Play': '#22c55e',
    'Balanced': '#818cf8',
    'Appreciation Play': '#f59e0b',
    'Premium': '#ec4899',
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111827', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)', padding: '80px 24px 60px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏘️</div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, color: '#111827', marginBottom: '16px', lineHeight: 1.2 }}>
          DFW Real Estate Investment Guide
        </h1>
        <p style={{ fontSize: '20px', color: '#16a34a', fontWeight: 600, marginBottom: '12px' }}>
          Building Wealth Through Dallas-Fort Worth
        </p>
        <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '620px', margin: '0 auto' }}>
          DFW is one of the strongest real estate investment markets in the country — +200,000 residents per year, no state income tax, and a landlord-friendly legal framework. Here is how to play it.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>

        {/* DFW Fundamentals */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '32px' }}>📊 Why DFW for Real Estate Investment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { emoji: '📈', title: 'Population Growth', value: '+200,000/year', desc: 'Consistent demand driver. DFW is the fastest-growing large metro in the US.' },
              { emoji: '💼', title: 'Job Market', value: 'Top 5 US Metro', desc: 'Low unemployment, diverse industries. Corporate relocations keep demand strong.' },
              { emoji: '🏛️', title: 'Landlord Friendly', value: 'No Rent Control', desc: 'Texas law favors property owners. Strong eviction process when needed.' },
              { emoji: '💰', title: 'No State Income Tax', value: '0%', desc: 'Rental income taxed at federal level only — meaningful advantage vs. CA, NY.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.emoji}</div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}>{item.title}</h3>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a', marginBottom: '6px' }}>{item.value}</div>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Property Types */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '32px' }}>🏠 Investment Property Types in DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { type: 'Single-Family Rental', emoji: '🏡', entry: '$280K–$450K', yield: '6–8% gross', pros: 'Easiest to manage, best financing terms, broad tenant pool, easiest exit', cons: 'One vacancy = 100% income loss, lower yield than multifamily', ideal: 'First investment or remote investor' },
              { type: 'Small Multifamily (2–4 units)', emoji: '🏘️', entry: '$380K–$650K', yield: '7–10% gross', pros: 'Higher yield, vacancy risk spread, owner-occupied financing available', cons: 'More management intensity, harder financing, tenant conflicts', ideal: 'Active local investor ready to manage' },
              { type: 'Short-Term Rental (Airbnb)', emoji: '🛎️', entry: '$320K–$600K', yield: '10–16% gross (variable)', pros: 'Higher revenue ceiling, flexible use, premium in right locations', cons: 'City regulations vary, seasonal income, active management required', ideal: 'Operator-type investor in Dallas, Frisco, Las Colinas zones' },
              { type: 'Commercial Strip / Triple Net', emoji: '🏢', entry: '$800K+', yield: '5–7% cap rate', pros: 'Long-term leases, tenant pays expenses, truly passive', cons: 'High entry, tenant credit risk, financing harder for small operators', ideal: 'Experienced investor scaling up' },
            ].map((pt, i) => (
              <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '36px' }}>{pt.emoji}</div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{pt.type}</h3>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Ideal for: {pt.ideal}</p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ background: '#dcfce7', borderRadius: '6px', padding: '6px 10px' }}>
                        <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>✅ </span>
                        <span style={{ fontSize: '12px', color: '#166534′ }}>{pt.pros}</span>
                      </div>
                      <div style={{ background: '#fef2f2', borderRadius: '6px', padding: '6px 10px' }}>
                        <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: 700 }}>⚠️ </span>
                        <span style={{ fontSize: '12px', color: '#991b1b' }}>{pt.cons}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>Entry Range</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#374151′ }}>{pt.entry}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>Yield</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>{pt.yield}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Analysis */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>📍 Best DFW Markets for Investment</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>Markets segmented by investment strategy — yield play, balanced, or appreciation-focused.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {markets.map((market, i) => (
              <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827′ }}>{market.emoji} {market.city}</div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: typeColors[market.type], background: `${typeColors[market.type]}20`, padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                    {market.type}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>Entry Price</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151′ }}>{market.entryPrice}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>Gross Yield</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>{market.grossYield}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>Appreciation</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151′ }}>{market.appreciation}</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>{market.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ProLnk + TrustyPro for Investors */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>🔗 ProLnk + TrustyPro for Real Estate Investors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { emoji: '🏠', title: 'AI Property Monitoring', desc: 'Add your investment properties to TrustyPro vault. AI monitors condition remotely so you don’t need to be on-site to know your properties are being maintained.' },
              { emoji: '⚡', title: 'Fast Contractor Access', desc: 'ProLnk’s vetted contractor network means maintenance requests get filled fast — critical for tenant satisfaction and turnover minimization.' },
              { emoji: '💰', title: 'Partner Income Opportunity', desc: 'ProLnk partners earn commission income from referring other pros and homeowners. Your investment income + platform income = diversified cash flow.' },
              { emoji: '📊', title: 'Home Health Data', desc: 'TrustyPro’s home health scores give you objective condition data at sale, supporting your asking price and accelerating due diligence for buyers.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.emoji}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Yield Calculator */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>🧮 Investment Yield Calculator</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>Enter your property details to calculate gross yield, cap rate, and cash-on-cash return.</p>
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {[
                { label: 'Purchase Price ($)', value: purchasePrice, setter: setPurchasePrice, placeholder: '350,000′ },
                { label: 'Monthly Rent ($)', value: monthlyRent, setter: setMonthlyRent, placeholder: '2,400′ },
                { label: 'Monthly Expenses ($)', value: monthlyExpenses, setter: setMonthlyExpenses, placeholder: '800 (taxes, insurance, mgmt, maintenance)' },
                { label: 'Down Payment ($)', value: downPayment, setter: setDownPayment, placeholder: '87,500 (25%)' },
              ].map((field, i) => (
                <div key={i}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={e => { field.setter(e.target.value); setResults(null); }}
                    placeholder={field.placeholder}
                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#111827', background: '#ffffff', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={calculate}
              style={{ background: '#16a34a', color: '#ffffff', padding: '14px 32px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
            >
              Calculate Returns →
            </button>

            {results && (
              <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                {[
                  { label: 'Gross Yield', value: results.grossYield, desc: 'Annual rent / purchase price', color: '#16a34a' },
                  { label: 'Cap Rate', value: results.capRate, desc: 'NOI / purchase price', color: '#2563eb' },
                  { label: 'Cash-on-Cash', value: results.cashOnCash, desc: 'Annual cash flow / down payment', color: '#7c3aed' },
                  { label: 'Monthly Cash Flow', value: results.monthlyCashFlow, desc: 'Rent minus all expenses', color: parseFloat(results.monthlyCashFlow) >= 0 ? '#16a34a' : '#dc2626′ },
                ].map((metric, i) => (
                  <div key={i} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>{metric.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: metric.color, marginBottom: '4px' }}>{metric.value}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>{metric.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>ProLnk + TrustyPro = The Investor's Edge</h3>
          <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Join the ProLnk partner network and add your investment properties to TrustyPro. AI monitoring, fast contractor access, and partner income — built for DFW real estate investors.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/waitlist/pro" style={{ display: 'inline-block', background: '#16a34a', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
              Become a ProLnk Partner →
            </a>
            <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#ffffff', color: '#16a34a', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: '2px solid #16a34a' }}>
              Add Properties to TrustyPro →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
