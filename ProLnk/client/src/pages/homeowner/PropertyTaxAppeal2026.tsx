import { useState } from 'react';

const steps = [
  {
    num: 1,
    title: 'Get Your Notice & Compare Values',
    body: 'When your assessment notice arrives in January, locate two numbers: the Appraised Value (what the CAD says your home is worth) and the Assessed Value (used for tax calculation, capped at 10% increase for homesteads). If either number exceeds your estimated market value, you have grounds to protest.',
  },
  {
    num: 2,
    title: 'Gather Comparable Sales Evidence',
    body: 'Find 3–5 homes that sold in the past 6 months in your neighborhood at a lower price per square foot than your assessed value implies. On Zillow, use the "Sold" filter, match your sqft range (±200 sqft), same school district, and similar lot size. Export or screenshot each comp with address, sale date, price, and sqft.',
  },
  {
    num: 3,
    title: 'File Your Protest Online',
    body: 'Each county has an online portal. File by May 15 or within 30 days of your notice, whichever is later. Collin: protest.collincad.org | Dallas: dallascad.org | Denton: dcad.org | Tarrant: tad.org. Select "Market Value" as your basis. Upload your comps at filing time.',
  },
  {
    num: 4,
    title: 'Attend the Informal Hearing',
    body: 'You will receive a scheduled time (usually 15–30 minutes). Present your comps calmly. Ask the appraiser: "What value would you consider based on these sales?" Most DFW appraisers will settle informally — 65% of protesters get a reduction. Average DFW reduction: $12,000–$25,000 in assessed value.',
  },
  {
    num: 5,
    title: 'Request a Formal ARB Hearing if Needed',
    body: 'If the informal hearing does not produce an acceptable reduction, request a formal Appraisal Review Board (ARB) hearing. Formal hearings have higher success rates when you present documented evidence. You can also hire a property tax consultant on a contingency basis (they only charge if they win).',
  },
];

const keyDates = [
  { month: 'January', event: 'Assessment notices mailed — Collin, Dallas, Denton, Tarrant counties' },
  { month: 'April 30', event: 'Homestead exemption application deadline' },
  { month: 'May 15*', event: 'Protest filing deadline (*or 30 days after your notice, whichever is later)' },
  { month: 'May–July', event: 'Informal hearing window — most resolutions happen here' },
  { month: 'July–Sept', event: 'Formal ARB hearings for unresolved protests' },
];

export default function PropertyTaxAppeal2026() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [assessed, setAssessed] = useState(420000);
  const [market, setMarket] = useState(385000);

  const taxRate = 0.02315;
  const savings = assessed > market ? Math.round((assessed - market) * taxRate) : 0;
  const reductionPct = assessed > 0 ? Math.round(((assessed - market) / assessed) * 100) : 0;

  return (
    <div style={{ background: '#0d1117', minHeight: '100vh', color: '#e6edf3', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 13, color: '#58a6ff', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🏡 Texas Property Tax 2026
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            Texas Property Tax Appeal Guide 2026
          </h1>
          <p style={{ fontSize: 18, color: '#8b949e', maxWidth: 600, margin: '0 auto' }}>
            Step-by-step to lower your bill — 65% of DFW homeowners who protest get a reduction
          </p>
        </div>

        {/* Key Dates */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 20px', color: '#f0f6fc' }}>📅 2026 Key Dates</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {keyDates.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 90, fontSize: 13, fontWeight: 700, color: '#58a6ff', paddingTop: 2 }}>{d.month}</div>
                <div style={{ fontSize: 14, color: '#8b949e', lineHeight: 1.5 }}>{d.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Calculator */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#f0f6fc' }}>💰 Tax Savings Calculator</h2>
          <p style={{ fontSize: 13, color: '#8b949e', margin: '0 0 24px' }}>DFW blended rate ≈ 2.315%. Enter your values to estimate potential savings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8b949e', display: 'block', marginBottom: 8 }}>CAD Assessed Value</label>
              <input
                type="number"
                value={assessed}
                onChange={e => setAssessed(Number(e.target.value))}
                style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: '10px 14px', color: '#e6edf3', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8b949e', display: 'block', marginBottom: 8 }}>Your Estimated Market Value</label>
              <input
                type="number"
                value={market}
                onChange={e => setMarket(Number(e.target.value))}
                style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: '10px 14px', color: '#e6edf3', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          {savings > 0 ? (
            <div style={{ background: '#0d2818', border: '1px solid #238636', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#3fb950', marginBottom: 4 }}>Potential Annual Tax Savings</div>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#3fb950′ }}>${savings.toLocaleString()}</div>
              <div style={{ fontSize: 13, color: '#8b949e', marginTop: 4 }}>Based on {reductionPct}% value reduction (${(assessed - market).toLocaleString()} decrease)</div>
            </div>
          ) : (
            <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 10, padding: 20, textAlign: 'center', color: '#8b949e', fontSize: 14 }}>
              Enter a market value below your assessed value to see potential savings
            </div>
          )}
        </div>

        {/* 5-Step Process */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#f0f6fc' }}>5-Step Appeal Process</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {steps.map(step => (
            <div key={step.num} style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenStep(openStep === step.num ? null : step.num)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1f6feb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                  {step.num}
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#e6edf3', flex: 1 }}>{step.title}</span>
                <span style={{ fontSize: 18, color: '#8b949e' }}>{openStep === step.num ? '▲' : '▼'}</span>
              </button>
              {openStep === step.num && (
                <div style={{ padding: '0 24px 20px 72px' }}>
                  <p style={{ fontSize: 14, color: '#8b949e', lineHeight: 1.7, margin: 0 }}>{step.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Evidence Tips */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px', color: '#f0f6fc' }}>🔍 Evidence Tips</h2>
          <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Use Zillow "Sold" filter — set your neighborhood + ±200 sqft range + last 6 months',
              'Find homes that sold at a lower price per sqft than your assessed value implies',
              'Print or screenshot each comp: address, sale date, price, sqft, $/sqft',
              'Bring 3–5 comps minimum to your informal hearing',
              'Condition issues documented by TrustyPro AI scan can support a below-market value argument',
            ].map((tip, i) => (
              <li key={i} style={{ fontSize: 14, color: '#8b949e', lineHeight: 1.6 }}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* TrustyPro CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0d2818 0%, #0a1628 100%)', borderRadius: 16, border: '1px solid #238636', padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px', color: '#f0f6fc' }}>Document Condition Issues for Your Protest</h3>
          <p style={{ fontSize: 14, color: '#8b949e', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            TrustyPro's AI scan identifies moisture staining, water intrusion patterns, aging systems, and structural concerns — documentation that supports a below-market value argument at your hearing.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#238636', color: '#fff', fontWeight: 700, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 15 }}
          >
            Add Your Home to TrustyPro
          </a>
        </div>
      </div>
    </div>
  );
}
