import { useState } from 'react';

export default function DFWHomeWealthGuide2026() {
  const [purchaseYear, setPurchaseYear] = useState(2019);
  const [purchasePrice, setPurchasePrice] = useState(320000);
  const [downPayment, setDownPayment] = useState(64000);

  const currentYear = 2026;
  const yearsOwned = currentYear - purchaseYear;
  const annualAppreciation = 0.062;
  const currentValue = Math.round(purchasePrice * Math.pow(1 + annualAppreciation, yearsOwned));
  const appreciation = currentValue - purchasePrice;
  const mortgagePaydown = Math.round(purchasePrice * 0.035 * yearsOwned);
  const totalEquity = downPayment + appreciation + mortgagePaydown;
  const leverageMultiple = downPayment > 0 ? (totalEquity / downPayment).toFixed(1) : 'N/A';

  const annualTaxDeduction = Math.round((purchasePrice - downPayment) * 0.065 * 0.22);
  const propertyTaxDeduction = Math.round(currentValue * 0.021);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK FINANCIAL GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💰 DFW Home as Wealth Building Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>How DFW homeowners build real wealth — equity, leverage, appreciation, and tax benefits</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📈', label: 'DFW Appreciation', stat: '+62%', note: 'Since 2019, avg DFW home' },
            { icon: '🏦', label: 'Avg Equity Gained', stat: '$68K', note: 'Since 2021 for median home' },
            { icon: '⚡', label: 'Leverage Effect', stat: '5–7x', note: 'Return on down payment' },
            { icon: '🧾', label: 'Annual Tax Benefit', stat: '$3–9K', note: 'Interest + property tax deduction' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'rgba(245,230,66,0.07)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: '20px 18px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 900, fontSize: 22, marginBottom: 4 }}>{item.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Your DFW Wealth Building Calculator</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8′ }}>Year Purchased: <strong style={{ color: '#fff' }}>{purchaseYear}</strong></span>
              <input type="range" min={2010} max={2025} value={purchaseYear} onChange={e => setPurchaseYear(+e.target.value)} style={{ accentColor: '#F5E642′ }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8′ }}>Purchase Price: <strong style={{ color: '#fff' }}>${purchasePrice.toLocaleString()}</strong></span>
              <input type="range" min={100000} max={1200000} step={10000} value={purchasePrice} onChange={e => setPurchasePrice(+e.target.value)} style={{ accentColor: '#F5E642′ }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8′ }}>Down Payment: <strong style={{ color: '#fff' }}>${downPayment.toLocaleString()}</strong></span>
              <input type="range" min={10000} max={purchasePrice} step={5000} value={downPayment} onChange={e => setDownPayment(+e.target.value)} style={{ accentColor: '#F5E642′ }} />
            </label>
          </div>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[
              { label: 'Current Est. Value', val: '$' + currentValue.toLocaleString() },
              { label: 'Appreciation Gain', val: '$' + appreciation.toLocaleString() },
              { label: 'Principal Paydown', val: '$' + mortgagePaydown.toLocaleString() },
              { label: 'Total Equity', val: '$' + totalEquity.toLocaleString() },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '16px 14px' }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642′ }}>{item.val}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, background: '#F5E642', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>LEVERAGE MULTIPLE ON DOWN PAYMENT</div>
            <div style={{ color: '#0A1628', fontSize: 48, fontWeight: 900 }}>{leverageMultiple}x</div>
            <div style={{ color: '#1a2d4e', fontSize: 13, marginTop: 4 }}>Your ${downPayment.toLocaleString()} down payment created ${totalEquity.toLocaleString()} in net wealth</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>🧾 Annual Tax Benefits</div>
            <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 2 }}>
              <div>Mortgage interest deduction: ~${annualTaxDeduction.toLocaleString()}</div>
              <div>Property tax deductible up to $10K (SALT cap)</div>
              <div>Capital gains exclusion: $250K single / $500K married</div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>🔐 ProLnk Vault Advantage</div>
            <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
              Document your home improvements to increase cost basis, protect warranty history, and maximize resale value. Every dollar documented is a dollar protected at sale.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}