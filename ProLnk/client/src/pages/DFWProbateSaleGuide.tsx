import { useState } from 'react';

const sections = [
  {
    icon: '🏛️',
    heading: 'Texas Probate Timeline: 9–12 Months Typical',
    body: 'Texas probate requires filing in the county where the decedent lived (Dallas, Tarrant, Collin, or Denton County for DFW). Standard probate takes 9–12 months minimum. The executor must be appointed before any property can be sold. Letters Testamentary give the executor authority to act.',
  },
  {
    icon: '⚡',
    heading: 'Muniment of Title: Texas\’ Fast-Track Option',
    body: 'If the deceased had a valid will, no unpaid debts (except mortgage), and the only asset is real estate, Texas allows "muniment of title" — no formal probate administration. Timeline: 4–6 weeks. The will itself becomes the transfer document. Available only in Texas; not recognized in all states.',
  },
  {
    icon: '📋',
    heading: 'Court-Ordered Sale Process',
    body: 'The executor has authority to sell under the will. If no will (intestate), court must approve any sale. Required steps: appraise the property, get court approval of price, accept offer (may need to re-advertise at higher bids), close with court confirmation. Add 30–60 days to any timeline.',
  },
  {
    icon: '👨‍⚖️',
    heading: 'Working with Estate Attorneys in DFW',
    body: 'DFW has specialist probate attorneys in Dallas (214), Tarrant (817), and Collin (972) counties. Typical fee: 3–5% of estate value or $2,500–$10,000 flat. Avoid general practice attorneys for complex estates. Texas Probate attorney referrals available through State Bar of Texas.',
  },
  {
    icon: '🏠',
    heading: 'How Probate Affects Your Buyer Pool',
    body: 'Cash buyers strongly prefer probate properties — no lender timeline conflicts. Financed buyers face complexity: lenders require title insurance that covers probate, and closing timelines are unpredictable. Price your probate property 3–8% below market to attract cash offers and offset buyer risk.',
  },
];

const approaches: Record<string, { label: string; timeline: string; notes: string }> = {
  'Will + Muniment': { label: 'Muniment of Title', timeline: '4–8 weeks', notes: 'Best if: simple estate, valid will, no debts except mortgage.' },
  'Will + Full Probate': { label: 'Standard Probate with Will', timeline: '9–14 months', notes: 'Executor files will, gets Letters Testamentary, then sells.' },
  'No Will (Intestate)': { label: 'Intestate Probate', timeline: '12–18 months', notes: 'Court appoints administrator. All heirs must consent to sale.' },
  'Court-Ordered Sale': { label: 'Partition/Court Sale', timeline: '6–24 months', notes: 'Used when heirs disagree. Court receiver manages sale.' },
};

export default function DFWProbateSaleGuide() {
  const [estateType, setEstateType] = useState('');
  const [condition, setCondition] = useState('');
  const [timeline, setTimeline] = useState('');
  const [result, setResult] = useState<null | { approach: string; tl: string; notes: string; priceAdj: string; proceeds: string }>(null);

  function calculate() {
    const rec = approaches[estateType];
    if (!rec) return;
    const priceAdj = condition === 'Poor' ? '10–15% below market (cash buyers only)' : condition === 'Fair' ? '5–8% below market' : '3–5% below market';
    const proceeds = timeline === 'Urgent' ? 'Consider cash investor at 70–80% ARV for speed' : 'List on MLS; target cash buyers for faster close';
    setResult({ approach: rec.label, tl: rec.timeline, notes: rec.notes, priceAdj, proceeds });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#F5E642′ }}>Probate Sale Guide — DFW</h1>
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', marginBottom: '2rem' }}>Selling an inherited home in Dallas-Fort Worth: timelines, process, and strategy</p>
        {sections.map((s, i) => (
          <div key={i} style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>{s.icon} {s.heading}</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{s.body}</p>
          </div>
        ))}
        <div style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Probate Sale Approach Recommender</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {[['Estate Type', estateType, setEstateType, Object.keys(approaches)], ['Property Condition', condition, setCondition, ['Good', 'Fair', 'Poor']], ['Sale Timeline Need', timeline, setTimeline, ['Flexible (6+ months)', 'Moderate (3–6 months)', 'Urgent (<3 months)']]].map(([label, val, setter, opts]: any) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem' }}>
                  <option value="">Select...</option>
                  {opts.map((o: string) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#1a2e4a', borderRadius: '8px', border: '1px solid #374151′ }}>
              <p>Recommended Approach: <strong style={{ color: '#F5E642′ }}>{result.approach}</strong></p>
              <p>Estimated Timeline: <strong>{result.tl}</strong></p>
              <p style={{ color: '#9ca3af', marginTop: '0.25rem' }}>{result.notes}</p>
              <p style={{ marginTop: '0.5rem' }}>Suggested Pricing: <strong>{result.priceAdj}</strong></p>
              <p>Proceeds Strategy: <strong>{result.proceeds}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
