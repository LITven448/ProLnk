import { useState } from 'react';

const repaymentOptions = [
  { name: 'Reinstatement', desc: 'Pay all missed amounts in a lump sum to bring loan current', best: 'Short hardship, have savings available' },
  { name: 'Repayment Plan', desc: 'Add extra to monthly payments over 6–12 months to catch up', best: 'Returned to income, manageable overage' },
  { name: 'Deferral', desc: 'Move missed payments to end of loan term, resume normal payments', best: 'Temporary hardship now resolved' },
  { name: 'Loan Modification', desc: 'Permanently change loan terms — rate, term, or principal', best: 'Long-term income reduction, need lasting relief' },
];

export default function DFWMortgageForbearanceGuide() {
  const [hardshipType, setHardshipType] = useState('');
  const [timelineMo, setTimelineMo] = useState('');
  const [result, setResult] = useState<null | { rec: string; steps: string[]; caution: string }>(null);

  function recommend() {
    const months = parseInt(timelineMo);
    let rec = '';
    let steps: string[] = [];
    let caution = '';

    if (hardshipType === 'job-loss' && months <= 6) {
      rec = 'COVID/Hardship Forbearance (CARES Act or servicer program)';
      steps = ['Call your loan servicer immediately — do not wait for a missed payment', 'Request forbearance verbally or in writing — no documentation required for federally backed loans', 'Get forbearance terms in writing before agreeing', 'Plan for repayment plan or deferral when forbearance ends'];
      caution = 'Forbearance does not forgive payments — they are deferred. Plan your repayment path before starting.';
    } else if (hardshipType === 'medical') {
      rec = 'Short-Term Forbearance + Loan Modification Review';
      steps = ['Request 3-month forbearance from servicer', 'Document medical hardship with letters or bills', 'After forbearance, request loan modification if income is permanently affected', 'Contact a HUD-approved housing counselor in DFW (free service)'];
      caution = 'Medical hardships often qualify for modification — do not exit forbearance without exploring all options.';
    } else {
      rec = 'Contact Servicer + HUD Counselor';
      steps = ['Call your mortgage servicer and explain your hardship', 'Request a forbearance review and ask what options are available', 'Contact a free HUD-approved housing counselor in Dallas or Fort Worth', 'Explore refinancing if you have equity and improved credit'];
      caution = 'Every servicer program varies — always get terms in writing and understand your repayment obligation.';
    }

    setResult({ rec, steps, caution });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🛟</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Mortgage Forbearance Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Financial hardship options for Texas homeowners — what to do and what to expect.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📋 What Is Forbearance?</h2>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6 }}>Forbearance is a temporary pause or reduction in mortgage payments, granted by your lender or servicer. In Texas, you can request forbearance directly from your loan servicer. Forbearance does not erase payments — it defers them to a later date. Your credit may be affected depending on how the servicer reports it.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔄 Repayment Options After Forbearance</h2>
          {repaymentOptions.map(opt => (
            <div key={opt.name} style={{ background: '#F9FAFB', borderRadius: 8, padding: 14, marginBottom: 10, border: '1px solid #E2E8F0′ }}>
              <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{opt.name}</div>
              <div style={{ color: '#374151', fontSize: 13, marginBottom: 4 }}>{opt.desc}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>Best for: {opt.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 DFW-Specific Resources</h2>
          {['HUD-approved housing counselors in Dallas and Fort Worth (free service)', 'Texas Homeowner Assistance Fund (HAF) — may cover missed payments', 'Texas Department of Housing and Community Affairs hardship programs', 'DFW-area nonprofit: CitySquare housing assistance'].map(pt => (
            <div key={pt} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>📍</span>
              <span style={{ color: '#374151', fontSize: 14 }}>{pt}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Hardship Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Hardship type</label>
              <select value={hardshipType} onChange={e => setHardshipType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="job-loss">Job loss / income reduction</option>
                <option value="medical">Medical emergency</option>
                <option value="divorce">Divorce or separation</option>
                <option value="disaster">Natural disaster</option>
                <option value="other">Other hardship</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Estimated hardship duration (months)</label>
              <input type="number" value={timelineMo} onChange={e => setTimelineMo(e.target.value)} placeholder="e.g. 4″ style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My Recommendation</button>
          {result && (
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{result.rec}</div>
              {result.steps.map((s, i) => (
                <div key={s} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD5E1', fontSize: 14 }}>{s}</span>
                </div>
              ))}
              <div style={{ background: '#0A1628', borderRadius: 6, padding: 10, marginTop: 10 }}>
                <span style={{ color: '#FBBF24', fontSize: 13 }}>⚠️ {result.caution}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}