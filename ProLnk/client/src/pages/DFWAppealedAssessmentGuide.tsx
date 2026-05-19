import { useState } from 'react';

type EvidenceResult = {
  strategy: string;
  howToPresent: string;
  expectedOutcome: string;
};

const evidenceGuide: Record<string, EvidenceResult> = {
  'Recent Comparable Sales': {
    strategy: 'Pull 3–5 closed sales within 0.5 miles of your home from the past 12 months, adjusting for square footage, age, and condition. This is the strongest evidence ARB boards accept.',
    howToPresent: 'Print a one-page comp grid: address, sale date, price, $/sqft, and your home side-by-side. Mark each comp on a map. Bring 3 copies.',
    expectedOutcome: 'If comps support 10%+ reduction, ARB boards typically grant 50–100% of the requested reduction. This wins the most cases.',
  },
  'Repair Estimates Reducing Market Value': {
    strategy: 'Obtain 2–3 contractor estimates for major deferred repairs (roof, HVAC, foundation, plumbing). Deduct repair costs from assessed value to argue impaired market value.',
    howToPresent: 'Bring itemized contractor bids on letterhead. Calculate: "A buyer would discount $X for known issues." Present adjusted value = assessment minus verified repair costs.',
    expectedOutcome: 'Strong for homes with $15,000+ in documented repairs. ARB grants 60–80% of repair deduction. Often overlooked by homeowners.',
  },
  'Appraisal District\’s Own Data Errors': {
    strategy: 'Request the property record card from the appraisal district. Verify square footage, bedroom/bath count, pool status, and year built. Errors are common and are an automatic win.',
    howToPresent: 'Print the property card and highlight discrepancies. Bring your deed, permit records, or photos proving the correct facts.',
    expectedOutcome: 'Data errors result in immediate correction and reduction. Win rate is near 100% when errors are verified.',
  },
  'Unequal Appraisal (Equity Argument)': {
    strategy: 'Texas law allows protests based on unequal appraisal — meaning similar homes in your neighborhood are taxed lower than yours, regardless of market value.',
    howToPresent: 'Download the appraisal district\’s comparable sales report for your protest. Show 5+ similar homes with lower assessed values per sqft. Focus on $/sqft comparison.',
    expectedOutcome: 'ARB must equalize within 10% of the median. This argument wins even when market value is correct. Often most effective in fast-appreciating DFW neighborhoods.',
  },
  'Income Approach (Rental Properties)': {
    strategy: 'For investment or mixed-use properties, present actual net operating income (NOI) and apply a market cap rate to derive value independently of comparable sales.',
    howToPresent: 'Bring 12 months of rent rolls, operating expenses, and vacancy data. Use DFW market cap rates (typically 5.5–7.5%). Show resulting value versus assessment.',
    expectedOutcome: 'Effective for rentals, duplexes, and small commercial. Requires documentation. Can reduce assessment 10–25% when NOI supports it.',
  },
};

export default function DFWAppealedAssessmentGuide() {
  const [selected, setSelected] = useState('');
  const result = evidenceGuide[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>⚖️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', marginBottom: '0.5rem' }}>DFW Property Tax Assessment Appeal Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW homeowners leave millions on the table each year by not protesting. ARB boards respond to specific evidence, not emotion. Knowing which evidence wins — and how to present it — is the difference between a dismissed protest and a 15% reduction.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 Select Your Evidence Type</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem' }}
          >
            <option value=''>-- Select evidence type --</option>
            {Object.keys(evidenceGuide).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: '🎯 Strategy', text: result.strategy, color: '#F5E642′ },
              { label: '📊 How to Present to ARB', text: result.howToPresent, color: '#60a5fa' },
              { label: '📈 Expected Outcome', text: result.expectedOutcome, color: '#4ade80′ },
            ].map(section => (
              <div key={section.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
                <h2 style={{ color: section.color, fontSize: '1rem', marginBottom: '0.75rem' }}>{section.label}</h2>
                <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>{section.text}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginTop: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>📅 DFW Protest Deadlines</h2>
          <div style={{ color: '#94a3b8', lineHeight: 1.8 }}>
            <div>• Notices typically mailed April–May each year</div>
            <div>• Protest deadline: <strong style={{ color: '#fff' }}>May 15 or 30 days after notice</strong>, whichever is later</div>
            <div>• File online at your county appraisal district portal (free)</div>
            <div>• Informal meeting offered before formal ARB hearing</div>
          </div>
        </div>
      </div>
    </div>
  );
}
