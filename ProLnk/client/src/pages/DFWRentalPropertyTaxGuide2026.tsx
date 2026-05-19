import { useState } from 'react';

const situations = {
  'I have 1-2 rental properties': {
    deductions: [
      'Mortgage interest (Schedule E, not Schedule A for rental property)',
      'Property taxes — fully deductible as rental expense',
      'Depreciation: residential rental = 27.5 years straight-line (land value excluded)',
      'Repairs and maintenance (NOT capital improvements — those depreciate separately)',
      'ProLnk contractor fees and platform fees — deductible as ordinary business expense',
      'Property management fees if using a PM company',
      'Advertising costs for finding tenants (Zillow, listings, etc.)',
      'Professional fees: accountant, attorney related to rental',
      'Utilities paid by landlord',
      'Travel to property for repairs or inspections (mileage at IRS rate)',
    ],
    notes: [
      'Passive activity loss rules: rental losses may be limited if your income exceeds $150K',
      'Real estate professional status exempts you from passive loss limits — consult CPA',
      'Keep all receipts for DFW contractors — IRS expects documentation',
      'Issue 1099-NEC to any contractor paid over $600 in a year',
    ],
  },
  'I have 3-10 rental properties': {
    deductions: [
      'All items from small portfolio PLUS:',
      'Home office deduction if managing properties is primary activity',
      'Separate entity (LLC) consideration for liability protection',
      'Cost segregation study may accelerate depreciation on larger properties',
      'Section 179 on certain personal property in rentals',
      'Insurance premiums (landlord policy, umbrella policy)',
      'HOA fees if paid by landlord',
      'Loan origination fees (amortized over loan life)',
    ],
    notes: [
      'At 5+ properties, strong case for real estate professional status — track hours',
      'Self-rental rules if you own entity that rents back to you',
      'Texas has no state income tax — federal Schedule E is your primary concern',
      'Quarterly estimated tax payments likely required once portfolio grows',
    ],
  },
  'I just bought my first DFW rental': {
    deductions: [
      'Closing costs: some deductible immediately, some amortized',
      'Depreciation begins when property is placed in service (available for rent)',
      'Pre-rental expenses: advertising before first tenant',
      'Repairs made before first tenant occupancy (if not capital improvements)',
      'Loan interest from day one of ownership',
      'Title insurance, appraisal fees — typically capitalized',
    ],
    notes: [
      'Establish a separate bank account for rental income immediately',
      'Document purchase price allocation: land vs structure (land is not depreciable)',
      'Tarrant/Dallas County assessor records can help establish structure percentage',
      'DFW property values are high — depreciation deduction will be significant',
    ],
  },
};

export default function DFWRentalPropertyTaxGuide2026() {
  const [situation, setSituation] = useState('');

  const guide = situations[situation as keyof typeof situations];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Rental Property Tax Guide 2026</h1>
          <p style={{ color: '#9AA3B2', fontSize: 15 }}>Maximize deductions on your DFW rental income — Texas has no state income tax</p>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <span>📌</span>
            <span style={{ fontSize: 14, color: '#F5E642', fontWeight: 600 }}>Texas advantage: No state income tax on rental income. Federal Schedule E is your primary tax filing vehicle.</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span>🏗️</span>
            <span style={{ fontSize: 14, color: '#E8EAF0' }}>Depreciation: Residential rental property depreciates over 27.5 years. On a $350K DFW property (land $80K), that is roughly $9,818/year in non-cash deductions.</span>
          </div>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Your Situation → Tax Deduction Guide</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2A3A50', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
            <option value=''>Select your situation...</option>
            {Object.keys(situations).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {guide && (
          <>
            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>✅ Key Deductions for Your Situation</h2>
              {guide.deductions.map(d => (
                <div key={d} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span>💵</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0' }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>⚠️ Important Notes</h2>
              {guide.notes.map(n => (
                <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span>🔔</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0' }}>{n}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#9AA3B2', fontSize: 13 }}>Maximize your DFW rental deductions — start with documented contractor quotes and invoices.</p>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 4 }}>ProLnk connects DFW landlords with vetted pros who provide proper invoicing for tax records.</p>
        </div>
      </div>
    </div>
  );
}
