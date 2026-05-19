import { useState } from 'react';

type Situation = {
  protections: string[];
  process: string[];
  protected: string[];
  notProtected: string[];
};

const situations: Record<string, Situation> = {
  'Primary Homeowner': {
    protections: [
      'Forced sale prohibited for most debts',
      'Property tax homestead exemption ($100K off assessed value)',
      'Unlimited acreage protection on rural homestead (up to 200 acres)',
      'Urban homestead protected up to 10 acres',
    ],
    process: [
      'File Form 50-114 with your county appraisal district',
      'Must own and occupy on January 1 of tax year',
      'One-time filing — stays in place until you move',
      'No fee in most DFW counties',
    ],
    protected: ['Mortgage debt (only voluntary lien)', 'Property taxes (still owed but can\’t be forced)', 'Home improvements you commissioned'],
    notProtected: ['Delinquent property taxes (can force sale)', 'Purchase money mortgage foreclosure', 'Mechanics\’ liens from unpaid contractors', 'HOA dues in some cases'],
  },
  'Over 65 / Disabled': {
    protections: [
      'School tax freeze — school taxes never increase',
      'Additional $10,000 exemption on top of general homestead',
      'Can defer property tax payment without penalty (lien accrues)',
      'Surviving spouse maintains freeze if 55+ at time of death',
    ],
    process: [
      'File Form 50-114 with over-65 or disability box checked',
      'Disability requires documentation from Social Security or VA',
      'Apply by April 30 for current tax year benefit',
    ],
    protected: ['School district tax amount frozen permanently', 'Accrued deferred taxes — no interest if paid within 180 days of sale'],
    notProtected: ['City and county taxes still increase', 'Deferred taxes become lien on property'],
  },
  'Surviving Spouse': {
    protections: [
      'Retains homestead designation without re-filing',
      'Keeps school tax freeze if spouse was over 65',
      'Protected from forced sale of homestead',
    ],
    process: [
      'Notify county appraisal district of spouse\’s death',
      'Must be 55+ at time of spouse\’s death to keep freeze',
      'Continue occupying as primary residence',
    ],
    protected: ['Pre-existing tax freeze', 'Homestead exemption continuity'],
    notProtected: ['New mortgages taken on by surviving spouse', 'Delinquent tax debt'],
  },
};

export default function DFWTexasHomesteadLaw() {
  const [selected, setSelected] = useState('');
  const result = situations[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Texas Homestead Law Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Texas homestead protections are among the strongest in the nation. Unlike most states, Texas prohibits forced sale of your home for most debts — but only if you've properly designated it. Understanding what’s protected and what isn’t can save your home.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>👤 Select Your Situation</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem' }}
          >
            <option value=''>-- Select your situation --</option>
            {Object.keys(situations).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: '🛡️ Protections You Have', items: result.protections, color: '#F5E642′ },
              { label: '📋 Designation Process', items: result.process, color: '#60a5fa' },
              { label: '✅ What\’s Protected', items: result.protected, color: '#4ade80′ },
              { label: '❌ What\’s NOT Protected', items: result.notProtected, color: '#f87171′ },
            ].map(section => (
              <div key={section.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
                <h2 style={{ color: section.color, fontSize: '1rem', marginBottom: '0.75rem' }}>{section.label}</h2>
                {section.items.map(item => (
                  <div key={item} style={{ color: '#cbd5e1', marginBottom: '0.4rem', lineHeight: 1.5 }}>• {item}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
