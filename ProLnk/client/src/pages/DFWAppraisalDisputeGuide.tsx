import { useState } from 'react';

const situationOptions = [
  'Mortgage appraisal came in low',
  'Property tax appraisal too high',
  'Refinance appraisal below expected',
  'Home equity appraisal dispute',
];

const evidenceOptions = [
  'Recent comparable sales',
  'Prior appraisal or purchase price',
  'Renovation receipts and permits',
  'MLS listing data',
];

const outcomes: Record<string, { process: string[]; evidence: string[]; realistic: string }> = {
  'Mortgage appraisal came in low': {
    process: ['Request copy of appraisal — you are entitled to it', 'Submit Reconsideration of Value (ROV) to lender with comps', 'Provide at least 3 comparable sales within 1 mile and 6 months', 'If denied, request a second appraisal (lender may require this)'],
    evidence: ['Comparable sales (recent, nearby)', 'Recent permits for improvements', 'Listing data showing active market'],
    realistic: 'ROV succeeds in 20–30% of cases with strong comps — worth attempting before paying for second appraisal',
  },
  'Property tax appraisal too high': {
    process: ['File protest with Appraisal Review Board (ARB) by May 15 deadline', 'Present evidence at ARB hearing — you don\’t need an attorney', 'If unsatisfied, appeal to district court or binding arbitration', 'Consider hiring a property tax protest company (contingency fee)'],
    evidence: ['Sales of similar homes in your neighborhood', 'Photos of property condition issues', 'Recent purchase price if bought below appraised value'],
    realistic: 'DFW ARB protests succeed ~40–60% of time — especially effective for homes over $500K',
  },
  'Refinance appraisal below expected': {
    process: ['Review appraisal for factual errors first (square footage, room counts)', 'Submit ROV with 3+ comps to lender within 5 business days', 'Request lender order second appraisal if ROV denied', 'Consider switching lenders — appraisal does not always transfer'],
    evidence: ['Upgrade and renovation documentation', 'Comparable sales from same subdivision', 'Prior appraisals showing higher value'],
    realistic: 'Factual error corrections succeed most often — comp-based ROVs are a harder fight',
  },
  'Home equity appraisal dispute': {
    process: ['Request full appraisal report from lender', 'Identify comparable sales the appraiser missed', 'Submit ROV to lender with market evidence', 'Shop other lenders — each orders their own appraisal'],
    evidence: ['Recent neighborhood sale prices', 'Permitted renovation records', 'Property tax assessed value (as a floor argument)'],
    realistic: 'Shopping lenders is often faster than disputing — each new application triggers a fresh appraisal',
  },
};

export default function DFWAppraisalDisputeGuide() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | { process: string[]; evidence: string[]; realistic: string }>(null);

  const handleFind = () => {
    if (!situation) return;
    setResult(outcomes[situation] || null);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📊</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Property Appraisal Dispute Guide</h1>
          <p style={{ color: '#CBD5E1', marginTop: 8 }}>Challenging low mortgage appraisals and high property tax assessments in DFW</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Two Types of Appraisals — Two Dispute Processes</h2>
          {[
            ['Mortgage Appraisal', 'Ordered by lender — dispute through Reconsideration of Value (ROV) process.'],
            ['Property Tax Appraisal', 'Set by county CAD — dispute through Appraisal Review Board by May 15 each year.'],
            ['ARB Deadline Is Hard', 'Miss the May 15 protest deadline in Texas and you wait until next year.'],
            ['Evidence Is Everything', 'Both processes reward homeowners who bring specific, recent comparable sales data.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>✔</span>
              <div><strong style={{ color: '#0A1628′ }}>{title}:</strong> <span style={{ color: '#475569' }}>{desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your Dispute Process</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>Your Appraisal Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628′ }}>
              <option value="">Select situation...</option>
              {situationOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={handleFind} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Dispute Process →</button>
        </div>

        {result && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📍 Your Dispute Process</h2>
            <div style={{ marginBottom: 16 }}>
              {result.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#E2E8F0′ }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1E293B', borderRadius: 8, padding: '16px 20px', marginBottom: 12 }}>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>📋 KEY EVIDENCE TO GATHER</div>
              {result.evidence.map((e, i) => <div key={i} style={{ color: '#E2E8F0', marginBottom: 4 }}>• {e}</div>)}
            </div>
            <div style={{ background: '#1E293B', borderRadius: 8, padding: '16px 20px' }}>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>🎯 REALISTIC OUTCOME</div>
              <div style={{ color: '#E2E8F0′ }}>{result.realistic}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
