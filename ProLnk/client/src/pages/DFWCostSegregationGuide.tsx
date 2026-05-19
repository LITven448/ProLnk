import { useState } from 'react';

const COMPONENT_DATA = {
  title: 'DFW Cost Segregation Guide',
  subtitle: 'Accelerate depreciation and reduce taxes on your DFW investment property',
  sections: [
    {
      heading: 'What Is Cost Segregation?',
      body: 'Cost segregation is an IRS-approved tax strategy that reclassifies components of a real property into shorter depreciation lifetimes — 5, 7, or 15 years instead of 27.5 or 39 years. Non-structural components like flooring, cabinetry, landscaping, and electrical fixtures qualify for accelerated deductions, allowing investors to front-load depreciation and dramatically reduce taxable income in year one.',
    },
    {
      heading: 'When Does It Make Sense in DFW?',
      body: 'Cost segregation studies typically pencil out for DFW investment properties valued above $500K. The higher the value and the more recent the acquisition or renovation, the larger the year-one deduction. Multifamily, commercial, and mixed-use properties in high-growth DFW submarkets like Frisco, Plano, and Southlake are especially strong candidates.',
    },
    {
      heading: 'Year-One Tax Impact',
      body: 'A well-executed study can reclassify 20–40% of a property\’s cost basis into shorter-life assets. On a $1M acquisition, that might mean $200K–$400K of accelerated deductions in year one — potentially eliminating taxable income from the property entirely and creating passive losses that offset other income for qualifying real estate professionals.',
    },
    {
      heading: 'Finding a DFW Cost Segregation CPA',
      body: 'Look for CPAs or engineering firms that specialize in cost segregation studies for Texas real estate. Ask for sample studies, turnaround times, and fee structures (flat fee vs. percentage of tax savings). Organizations like the American Society of Cost Segregation Professionals (ASCSP) maintain a directory of credentialed practitioners active in the DFW market.',
    },
  ],
};

export default function DFWCostSegregationGuide() {
  const [propertyValue, setPropertyValue] = useState('');
  const [renovationCost, setRenovationCost] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const pv = parseFloat(propertyValue.replace(/,/g, '')) || 0;
    const rc = parseFloat(renovationCost.replace(/,/g, '')) || 0;
    const totalBasis = pv + rc;
    if (totalBasis < 100000) {
      setResult('Enter a property value above $100K for meaningful results.');
      return;
    }
    const reclassifiedPct = totalBasis >= 1000000 ? 0.35 : 0.25;
    const accelerated = totalBasis * reclassifiedPct;
    const standardYr1 = totalBasis / 27.5;
    const acceleratedYr1 = accelerated / 5 + (totalBasis - accelerated) / 27.5;
    const extraDeduction = acceleratedYr1 - standardYr1;
    const taxSavings = extraDeduction * 0.37;
    setResult(
      `Estimated extra Year-1 deduction: $${extraDeduction.toLocaleString('en-US', { maximumFractionDigits: 0 })} — ` +
      `Potential tax savings (37% bracket): $${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    );
  }

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏗️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{COMPONENT_DATA.title}</h1>
          <p style={{ color: '#555', fontSize: '1.05rem' }}>{COMPONENT_DATA.subtitle}</p>
        </div>
        {COMPONENT_DATA.sections.map((s) => (
          <div key={s.heading} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', color: '#0A1628′ }}>{s.heading}</h2>
            <p style={{ lineHeight: 1.7, color: '#444′ }}>{s.body}</p>
          </div>
        ))}
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: '#0A1628′ }}>📊 Year-1 Tax Savings Estimator</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.9rem' }}>Property Value ($)</label>
              <input value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} placeholder="e.g. 750000″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.9rem' }}>Renovation Cost ($)</label>
              <input value={renovationCost} onChange={(e) => setRenovationCost(e.target.value)} placeholder="e.g. 100000″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Calculate Savings
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f8ff', borderRadius: 8, color: '#0A1628', fontWeight: 600 }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
