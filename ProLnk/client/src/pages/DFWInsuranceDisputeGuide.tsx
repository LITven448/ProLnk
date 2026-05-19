import { useState } from 'react';

const disputeOptions = [
  'Claim underpaid / lowball estimate',
  'Claim denied wrongfully',
  'Adjuster slow or unresponsive',
  'Contractor estimate exceeds insurer offer',
  'Depreciation withheld unfairly',
];

const resolutionData: Record<string, { path: string[]; timeline: string; outcome: string }> = {
  'Claim underpaid / lowball estimate': {
    path: ['Get independent contractor estimate', 'Request appraisal under Texas Insurance Code §542A', 'Hire public adjuster (10–15% fee, usually worth it)', 'File TDI complaint if insurer stalls'],
    timeline: '30–120 days',
    outcome: 'Appraisal process frequently yields 20–40% higher settlement',
  },
  'Claim denied wrongfully': {
    path: ['Request written denial with specific policy exclusions cited', 'File TDI complaint (tdi.texas.gov)', 'Hire bad faith insurance attorney — contingency fee available', 'Texas allows treble damages for bad faith denials'],
    timeline: '60–365 days',
    outcome: 'Attorney referral strongly recommended — bad faith cases often settle pre-suit',
  },
  'Adjuster slow or unresponsive': {
    path: ['Texas law requires acknowledgment within 15 days and decision within 15 days of proof', 'Send certified letter citing §542 prompt payment law', 'File TDI complaint — insurers face 18% interest penalties for delays', 'Escalate to insurer\’s complaints department'],
    timeline: '15–45 days',
    outcome: 'TDI complaints resolve most adjuster delays within 30 days',
  },
  'Contractor estimate exceeds insurer offer': {
    path: ['Request line-by-line comparison of estimates', 'Invoke policy appraisal clause', 'Both parties select an appraiser — umpire decides disagreements', 'Cost split between you and insurer'],
    timeline: '45–90 days',
    outcome: 'Appraisal is the fastest formal mechanism — widely used in Texas',
  },
  'Depreciation withheld unfairly': {
    path: ['Review policy for "replacement cost" vs "actual cash value" language', 'Complete repairs and submit final invoice for recoverable depreciation', 'Dispute holdback amount with TDI if insurer refuses release', 'Consult public adjuster for large depreciation disputes'],
    timeline: '30–90 days',
    outcome: 'Most depreciation disputes resolved with documentation of completed repairs',
  },
};

export default function DFWInsuranceDisputeGuide() {
  const [disputeType, setDisputeType] = useState('');
  const [result, setResult] = useState<null | { path: string[]; timeline: string; outcome: string }>(null);

  const handleFind = () => {
    if (!disputeType) return;
    setResult(resolutionData[disputeType] || null);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Insurance Dispute Guide</h1>
          <p style={{ color: '#CBD5E1', marginTop: 8 }}>Texas law gives homeowners strong tools against underpaying insurers</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Texas Insurance Rights</h2>
          {[
            ['TDI Oversight', 'Texas Dept of Insurance regulates all homeowner policies — complaints carry real weight.'],
            ['Appraisal Clause', 'Texas Insurance Code allows homeowners to invoke appraisal when disputing settlement amounts.'],
            ['Prompt Payment Law', 'Insurers must respond within 15 days and pay within 15 days of final decision or owe 18% interest.'],
            ['Bad Faith Damages', 'Texas allows treble (3x) damages for insurer bad faith — creates strong settlement incentive.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>✔</span>
              <div><strong style={{ color: '#0A1628′ }}>{title}:</strong> <span style={{ color: '#475569' }}>{desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your Resolution Path</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>What is Your Dispute?</label>
            <select value={disputeType} onChange={e => setDisputeType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628′ }}>
              <option value="">Select dispute type...</option>
              {disputeOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleFind} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Resolution Path →</button>
        </div>

        {result && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📍 Your Resolution Path</h2>
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#1E293B', borderRadius: 8, padding: '12px 20px', flex: 1 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>TIMELINE</div><div style={{ color: '#fff', fontWeight: 700 }}>{result.timeline}</div></div>
            </div>
            <div style={{ marginBottom: 20 }}>
              {result.path.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#E2E8F0′ }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1E293B', borderRadius: 8, padding: '16px 20px' }}>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>🎯 LIKELY OUTCOME</div>
              <div style={{ color: '#E2E8F0′ }}>{result.outcome}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
