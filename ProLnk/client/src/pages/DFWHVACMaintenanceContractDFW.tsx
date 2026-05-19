import { useState } from 'react';

const contractItems = [
  { category: 'Visits', good: '2 visits/year (spring + fall)', bad: '1 visit/year', dfwRequirement: 'DFW needs spring pre-cooling + fall pre-heating checkups minimum' },
  { category: 'Drain Line', good: 'Flush quarterly or semi-annually', bad: 'Inspect only, no flush', dfwRequirement: 'DFW humidity makes drain line clogs a monthly risk June–Sept' },
  { category: 'Coil Cleaning', good: 'Evaporator coil cleaned annually', bad: 'Visual inspection only', dfwRequirement: 'DFW dust + outdoor allergens coat coils fast — annual cleaning is non-negotiable' },
  { category: 'Filter', good: 'Filter replaced each visit', bad: 'Customer-supplied / not included', dfwRequirement: 'DFW construction + pollen require filter changes every 1–2 months in season' },
  { category: 'Priority Service', good: '24-hour emergency response guaranteed', bad: 'Next available appointment', dfwRequirement: 'DFW summer failures are emergencies — 100°F+ homes become dangerous in hours' },
  { category: 'Refrigerant', good: 'Leak check included; refrigerant at cost', bad: 'Not included; full diagnostic charge if needed', dfwRequirement: 'DFW heat stress accelerates refrigerant leaks — early detection saves $800+ repairs' },
];

const redFlags = [
  'No drain line flush — just "inspection"',
  'Only 1 annual visit (no spring prep)',
  'No coil cleaning included',
  'Emergency response not guaranteed',
  '100% paid upfront, no cancellation clause',
  'No mention of refrigerant leak check',
];

const evaluateContract = (price: number, visits: string, drain: string, coil: string) => {
  const issues: string[] = [];
  if (price > 350) issues.push('Overpriced: DFW fair range is $150–$350/year for 2-visit plan');
  if (visits === '1') issues.push('Only 1 visit — insufficient for DFW climate. Negotiate 2 or walk away');
  if (drain === 'inspect') issues.push('Drain line inspection only — must include flush for DFW humidity risk');
  if (coil === 'no') issues.push('No coil cleaning — add this or deduct $75 from price');
  const verdict = issues.length === 0 ? 'SOLID CONTRACT' : issues.length <= 2 ? 'NEGOTIATE THESE ITEMS' : 'WALK AWAY OR RENEGOTIATE';
  return { issues, verdict };
};

export default function DFWHVACMaintenanceContractDFW() {
  const [price, setPrice] = useState('');
  const [visits, setVisits] = useState('');
  const [drain, setDrain] = useState('');
  const [coil, setCoil] = useState('');
  const [result, setResult] = useState<null | { issues: string[]; verdict: string }>(null);

  function evaluate() {
    if (!price || !visits || !drain || !coil) return;
    setResult(evaluateContract(Number(price), visits, drain, coil));
  }

  const verdictColor = result?.verdict === 'SOLID CONTRACT' ? '#22C55E' : result?.verdict === 'NEGOTIATE THESE ITEMS' ? '#F5E642′ : '#FF6B6B';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', fontWeight: 600, letterSpacing: '0.08em' }}>DFW HVAC RESOURCE LIBRARY</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>HVAC Maintenance Contract Comparison</h1>
        <p style={{ color: '#9AA5B8', marginBottom: '2rem', fontSize: '1rem' }}>What DFW homeowners must require — and what to negotiate out of every contract.</p>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>📋 What DFW Contracts Must Include</h2>
        <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '2.5rem' }}>
          {contractItems.map((item, i) => (
            <div key={i} style={{ background: '#0F2040', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>📌 {item.category}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.85rem' }}><span style={{ color: '#22C55E' }}>✅ Good: </span>{item.good}</div>
                <div style={{ fontSize: '0.85rem' }}><span style={{ color: '#FF6B6B' }}>❌ Bad: </span>{item.bad}</div>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#9AA5B8′ }}>🌡️ DFW: {item.dfwRequirement}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🚩 DFW Contract Red Flags</h2>
        <div style={{ background: '#FF6B6B15', border: '1px solid #FF6B6B50', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '2.5rem' }}>
          {redFlags.map((f, i) => <div key={i} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>🚩 {f}</div>)}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Evaluate Your Contract Offer</h2>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.4rem' }}>Annual Contract Price ($)</label>
            <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="e.g. 299″ style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.6rem 1rem', color: '#E8EDF5', fontSize: '0.95rem', width: '160px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.4rem' }}>Visits per Year</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[['1','1 visit'],['2','2 visits'],['3+','3+ visits']].map(([v,l]) => (
                <button key={v} onClick={() => setVisits(v)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: visits === v ? '2px solid #F5E642′ : '1px solid #1E3A5F', background: visits === v ? '#F5E64220' : '#0A1628', color: visits === v ? '#F5E642' : '#E8EDF5', cursor: ’pointer', fontSize: '0.9rem' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.4rem' }}>Drain Line Service</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[['flush','Flush included'],['inspect','Inspect only']].map(([v,l]) => (
                <button key={v} onClick={() => setDrain(v)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: drain === v ? '2px solid #F5E642′ : '1px solid #1E3A5F', background: drain === v ? '#F5E64220' : '#0A1628', color: drain === v ? '#F5E642' : '#E8EDF5', cursor: ’pointer', fontSize: '0.9rem' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.4rem' }}>Coil Cleaning Included?</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[['yes','Yes'],['no','No']].map(([v,l]) => (
                <button key={v} onClick={() => setCoil(v)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: coil === v ? '2px solid #F5E642′ : '1px solid #1E3A5F', background: coil === v ? '#F5E64220' : '#0A1628', color: coil === v ? '#F5E642' : '#E8EDF5', cursor: ’pointer', fontSize: '0.9rem' }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Evaluate Contract →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: `2px solid ${verdictColor}` }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: verdictColor, marginBottom: '1rem' }}>📊 {result.verdict}</div>
            {result.issues.length === 0
              ? <div style={{ color: '#22C55E' }}>This contract covers DFW requirements. Review emergency response terms and sign with confidence.</div>
              : result.issues.map((issue, i) => <div key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>⚠️ {issue}</div>)
            }
          </div>
        )}

        <div style={{ marginTop: '3rem', background: '#0F2040', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Want a ProLnk-vetted HVAC company with a fair maintenance contract?</div>
          <div style={{ color: '#9AA5B8', fontSize: '0.9rem' }}>We screen DFW pros for transparent pricing and DFW-appropriate service plans.</div>
        </div>
      </div>
    </div>
  );
}
