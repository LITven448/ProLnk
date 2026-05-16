import { useState } from 'react';

type ProbateResult = {
  recommendation: string;
  requirements: string[];
  estimatedCost: string;
  timeframe: string;
  notes: string;
};

const situations: Record<string, ProbateResult> = {
  'Simple estate, valid will, no disputes': {
    recommendation: 'Muniment of Title — Use this Texas shortcut',
    requirements: [
      'Decedent must have had a valid written will',
      'No unpaid debts except real estate liens (mortgage)',
      'No pending Medicaid recovery claims',
      'Only real property needs to be transferred (personal property handled separately)',
      'File in county where decedent resided',
    ],
    estimatedCost: '$500–$1,500 total (attorney fees + court filing)',
    timeframe: '4–8 weeks from filing to recorded deed',
    notes: 'Muniment of title is recorded directly in county property records. No executor appointed. No estate administration. Fastest path to clear title on a DFW home.',
  },
  'Valid will, minor debts, no disputes': {
    recommendation: 'Independent Administration — Streamlined but full probate',
    requirements: [
      'Will must authorize independent administration, or all heirs must agree',
      'Executor files inventory, appraisement, and list of claims',
      'No court supervision required for most transactions',
      'Debts must be resolved before distribution',
    ],
    estimatedCost: '$2,500–$6,000 (attorney + court costs + appraisals)',
    timeframe: '4–8 months',
    notes: 'Most common probate path in Texas. Independent administration avoids court oversight on every action, making it far faster than dependent administration.',
  },
  'No will (intestate), clear heirs': {
    recommendation: 'Affidavit of Heirship — For real property transfers',
    requirements: [
      'Two disinterested witnesses who knew the decedent sign an affidavit',
      'Affidavit describes the decedent, heirs, and property',
      'Must be filed in county real property records',
      'Effective after 5 years — title companies often require waiting period',
    ],
    estimatedCost: '$300–$800',
    timeframe: '2–4 weeks to record; 5-year seasoning period for clear title',
    notes: 'Useful when estate is simple and heirs agree. Does not go through court. Title companies may require full probate for large sales during the 5-year window.',
  },
  'No will, disputes among heirs': {
    recommendation: 'Full Dependent Administration — Court-supervised',
    requirements: [
      'Court appoints administrator',
      'All transactions require court approval',
      'Formal inventory and appraisement required',
      'Creditor claims must be formally resolved',
    ],
    estimatedCost: '$8,000–$25,000+ depending on estate size and disputes',
    timeframe: '12–24+ months',
    notes: 'Most expensive and time-consuming path. Avoid by having a valid will. A simple will drafted in Texas costs $300–$800 and eliminates this scenario entirely.',
  },
  'Small estate (under $75,000, no real property)': {
    recommendation: 'Small Estate Affidavit',
    requirements: [
      'Estate value under $75,000 (excluding homestead and exempt property)',
      'No real property to transfer',
      'At least 30 days since death',
      'No pending probate application',
    ],
    estimatedCost: '$150–$400',
    timeframe: '2–3 weeks',
    notes: 'Useful for small bank accounts and personal property. Cannot transfer real estate. Fastest resolution for qualifying small estates.',
  },
};

export default function DFWTexasProbateExpedited() {
  const [selected, setSelected] = useState('');
  const result = situations[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📜</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Expedited Texas Probate Guide for DFW Homeowners</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Texas offers several shortcuts that avoid full probate. Muniment of title — available when there's a valid will and no major debts — can transfer a DFW home in 4–8 weeks for under $1,500. Knowing your options before filing saves months and thousands of dollars.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 Describe the Estate Situation</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 6, background: '#1a2f50', color: '#fff', border: '1px solid #2a4070', fontSize: '1rem' }}
          >
            <option value=''>-- Select situation --</option>
            {Object.keys(situations).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: '#1a3a1a', borderRadius: 10, padding: '1.5rem' }}>
              <div style={{ color: '#4ade80', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Recommended Path</div>
              <div style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700 }}>{result.recommendation}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#0f2040', borderRadius: 10, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Estimated Cost</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.estimatedCost}</div>
              </div>
              <div style={{ background: '#0f2040', borderRadius: 10, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Timeframe</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.timeframe}</div>
              </div>
            </div>
            <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
              <h2 style={{ color: '#60a5fa', fontSize: '1rem', marginBottom: '0.75rem' }}>📋 Requirements</h2>
              {result.requirements.map(r => (
                <div key={r} style={{ color: '#cbd5e1', marginBottom: '0.4rem' }}>✓ {r}</div>
              ))}
            </div>
            <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
              <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>💡 Key Notes</h2>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>{result.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
