import { useState } from 'react';

export default function DFWDepreciationGuide() {
  const [propertyValue, setPropertyValue] = useState(350000);
  const [landValue, setLandValue] = useState(60000);
  const [bracketRate, setBracketRate] = useState(32);

  const depreciableBase = propertyValue - landValue;
  const annualDepreciation = depreciableBase / 27.5;
  const taxSavings22 = annualDepreciation * 0.22;
  const taxSavings32 = annualDepreciation * 0.32;
  const taxSavings37 = annualDepreciation * 0.37;
  const selectedSavings = annualDepreciation * (bracketRate / 100);
  const tenYearSavings = selectedSavings * 10;
  const recaptureOnSale = annualDepreciation * 27.5 * 0.25;

  return (
    <div style={{ background: '#F8FAFF', minHeight: '100vh', color: '#1A2E4A', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#1A6DD8', fontWeight: 700 }}>📉 DFW REAL ESTATE INVESTOR SERIES</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2, color: '#0A1628' }}>
          DFW Rental Property Depreciation Guide
        </h1>
        <p style={{ color: '#6B7E99', fontSize: 17, marginBottom: 40 }}>
          Depreciation is one of the most powerful tax advantages in real estate — a paper loss that reduces your taxable income even when the property is appreciating.
        </p>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#0A1628' }}>⚡ Straight-Line vs Bonus Depreciation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#F0F5FF', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#1A6DD8', marginBottom: 8 }}>📐 Straight-Line (27.5 yrs)</div>
              <p style={{ color: '#4A5E7A', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                The IRS requires residential rental property to be depreciated evenly over 27.5 years. Divide the depreciable basis 
                (purchase price minus land value) by 27.5 to get your annual deduction. Simple, predictable, automatic.
              </p>
            </div>
            <div style={{ background: '#F0FFF4', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#16A34A', marginBottom: 8 }}>⚡ Bonus Depreciation</div>
              <p style={{ color: '#4A5E7A', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                For shorter-lived components (appliances, flooring, fixtures), bonus depreciation allows 100% first-year deduction 
                via a cost segregation study. This front-loads your tax benefit significantly — common on larger DFW properties.
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0A1628' }}>🔬 Cost Segregation Studies</h2>
          <p style={{ color: '#4A5E7A', lineHeight: 1.7, marginBottom: 16 }}>
            A cost segregation study — typically $5,000–$15,000 for a DFW property — identifies components that qualify for 5, 7, or 15-year 
            depreciation rather than 27.5 years. On a $500K DFW property, this can generate $50,000–$100,000 in additional first-year 
            deductions, often recovering the study cost 10x over.
          </p>
          <div style={{ background: '#FFF8E1', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5A623' }}>
            <p style={{ color: '#5A4010', margin: 0, fontSize: 14 }}>
              <strong>DFW Tip:</strong> Cost segregation is most valuable for properties over $500K or new construction. 
              Work with a CPA who specializes in real estate investors — not every accountant knows this strategy.
            </p>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0A1628' }}>⚠️ Depreciation Recapture on Sale</h2>
          <p style={{ color: '#4A5E7A', lineHeight: 1.7 }}>
            When you sell a DFW rental property, the IRS recaptures all depreciation you've taken and taxes it at a flat 25% rate — 
            regardless of your bracket. This is separate from your capital gains. A 1031 exchange defers both capital gains AND 
            depreciation recapture. Factor this into your hold vs. sell analysis.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#0A1628' }}>🧮 Depreciation Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#6B7E99' }}>Property Value ($)</label>
              <input type="range" min={100000} max={1500000} step={10000} value={propertyValue}
                onChange={e => setPropertyValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1A6DD8' }} />
              <div style={{ color: '#1A6DD8', fontWeight: 700 }}>${propertyValue.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#6B7E99' }}>Land Value ($)</label>
              <input type="range" min={10000} max={400000} step={5000} value={landValue}
                onChange={e => setLandValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1A6DD8' }} />
              <div style={{ color: '#1A6DD8', fontWeight: 700 }}>${landValue.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#6B7E99' }}>Your Tax Bracket (%)</label>
              <input type="range" min={22} max={37} step={5} value={bracketRate}
                onChange={e => setBracketRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1A6DD8' }} />
              <div style={{ color: '#1A6DD8', fontWeight: 700 }}>{bracketRate}%</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Depreciable Basis', value: `$${Math.round(depreciableBase).toLocaleString()}` },
              { label: 'Annual Depreciation (27.5yr)', value: `$${Math.round(annualDepreciation).toLocaleString()}`, highlight: true },
              { label: 'Tax Savings @ 22%', value: `$${Math.round(taxSavings22).toLocaleString()}/yr` },
              { label: 'Tax Savings @ 32%', value: `$${Math.round(taxSavings32).toLocaleString()}/yr` },
              { label: 'Tax Savings @ 37%', value: `$${Math.round(taxSavings37).toLocaleString()}/yr` },
              { label: `Your Savings @ ${bracketRate}%`, value: `$${Math.round(selectedSavings).toLocaleString()}/yr`, highlight: true },
              { label: '10-Year Total Savings', value: `$${Math.round(tenYearSavings).toLocaleString()}` },
              { label: 'Recapture on Sale (25%)', value: `$${Math.round(recaptureOnSale).toLocaleString()}` },
            ].map((item, i) => (
              <div key={i} style={{ background: item.highlight ? '#F0F5FF' : '#F8FAFF', borderRadius: 12, padding: 16, border: item.highlight ? '2px solid #1A6DD8' : 'none' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: item.highlight ? '#1A6DD8' : '#0A1628', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#6B7E99' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

