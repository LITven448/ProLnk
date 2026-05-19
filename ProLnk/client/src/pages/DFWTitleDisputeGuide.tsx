import { useState } from 'react';

const issueOptions = [
  'Undisclosed lien or judgment discovered',
  'Boundary / survey dispute with neighbor',
  'Prior owner fraud or forgery',
  'Easement or access rights dispute',
  'Heir or estate claim on property',
  'HOA lien not disclosed at closing',
];

const outcomes: Record<string, { covered: string; notCovered: string; steps: string[]; attorney: string; timeline: string }> = {
  'Undisclosed lien or judgment discovered': {
    covered: 'Yes — title insurance specifically covers undisclosed liens from prior owners.',
    notCovered: 'Liens you agreed to assume at closing, or liens created after your policy date.',
    steps: ['Locate your title insurance policy (you received it at closing)', 'Call your title insurer — claims dept is separate from sales', 'Submit written claim with lien documentation', 'Insurer investigates and either clears lien or defends you in court'],
    attorney: 'Only needed if insurer denies claim — then consult a real estate attorney.',
    timeline: '30–120 days for insurer response',
  },
  'Boundary / survey dispute with neighbor': {
    covered: 'Maybe — depends on whether your policy includes survey coverage (ALTA policy vs standard).',
    notCovered: 'Standard owner policies often exclude boundary disputes — check your policy type.',
    steps: ['Review your policy for survey exception language', 'Order a new boundary survey from a licensed Texas surveyor', 'File title claim if boundary issue was present at purchase', 'If not covered, negotiate directly or file suit to quiet title'],
    attorney: 'Recommended — boundary disputes often require court action (quiet title suit).',
    timeline: '3–18 months depending on litigation',
  },
  'Prior owner fraud or forgery': {
    covered: 'Yes — forgery and fraud by prior owners is a core coverage of title insurance.',
    notCovered: 'Your own fraud, or fraud that occurred after your policy date.',
    steps: ['File police report immediately — creates official record', 'Notify title insurer in writing with police report number', 'Title company defends your ownership in court', 'Insurer covers attorney fees and potential loss'],
    attorney: 'Insurer provides defense attorney — you may want independent counsel to protect your interests.',
    timeline: '6–24 months — fraud cases can be complex',
  },
  'Easement or access rights dispute': {
    covered: 'Partially — recorded easements at time of purchase may be excluded from coverage.',
    notCovered: 'Easements that were recorded in public records before your purchase — buyer is on notice.',
    steps: ['Pull the property deed and title commitment from closing', 'Identify whether easement was in public records at purchase', 'File title claim if easement was not disclosed', 'Consult real estate attorney for unresolved access disputes'],
    attorney: 'Recommended for access disputes — especially if blocking use of your property.',
    timeline: '60 days–2 years depending on coverage and litigation',
  },
  'Heir or estate claim on property': {
    covered: 'Yes — claims by unknown heirs are specifically covered by most owner title policies.',
    notCovered: 'Known heirs disclosed at closing, or issues arising from your own estate planning.',
    steps: ['File title insurance claim immediately upon notice of claim', 'Do not negotiate with claimant without consulting insurer', 'Title company defends your ownership', 'If no insurance, file quiet title action in Texas district court'],
    attorney: 'Insurer assigns defense attorney — estate litigation is specialized, review carefully.',
    timeline: '6 months–3 years — probate-adjacent claims are slow',
  },
  'HOA lien not disclosed at closing': {
    covered: 'Often covered — undisclosed HOA liens should appear in title search and are insurer responsibility if missed.',
    notCovered: 'HOA dues that accrued after closing are your responsibility regardless.',
    steps: ['Review your HUD-1 or Closing Disclosure for HOA disclosures', 'Contact your title company — this may be a missed search error', 'File title insurance claim citing undisclosed lien', 'Title company typically pays off lien and seeks subrogation from prior owner'],
    attorney: 'Usually not needed — title company handles these claims routinely.',
    timeline: '30–90 days in most cases',
  },
};

export default function DFWTitleDisputeGuide() {
  const [issueType, setIssueType] = useState('');
  const [result, setResult] = useState<null | { covered: string; notCovered: string; steps: string[]; attorney: string; timeline: string }>(null);

  const handleFind = () => {
    if (!issueType) return;
    setResult(outcomes[issueType] || null);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📜</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Title Dispute Guide</h1>
          <p style={{ color: '#CBD5E1', marginTop: 8 }}>When a title issue surfaces after purchase — what your title insurance covers and what to do</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Title Insurance Basics</h2>
          {[
            ['One-Time Premium', 'Texas title insurance is priced by the state — you paid at closing, coverage is permanent.'],
            ['Two Policies', 'Lender policy protects the bank. Owner policy protects you — make sure you have both.'],
            ['Claims Are Free to File', 'There is no cost to file a title insurance claim — insurer defends at their expense.'],
            ['Quiet Title Action', 'If uninsured, Texas allows a quiet title lawsuit to legally establish ownership.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>✔</span>
              <div><strong style={{ color: '#0A1628′ }}>{title}:</strong> <span style={{ color: '#475569' }}>{desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your Title Dispute Path</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>Title Issue Type</label>
            <select value={issueType} onChange={e => setIssueType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628′ }}>
              <option value="">Select issue type...</option>
              {issueOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <button onClick={handleFind} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Claim Path →</button>
        </div>

        {result && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📍 Your Title Dispute Path</h2>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#166534', borderRadius: 8, padding: '12px 16px', flex: 1 }}>
                <div style={{ color: '#86EFAC', fontSize: 12, marginBottom: 4 }}>✅ COVERED BY TITLE INSURANCE</div>
                <div style={{ color: '#E2E8F0', fontSize: 14 }}>{result.covered}</div>
              </div>
            </div>
            <div style={{ background: '#7F1D1D', borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ color: '#FCA5A5', fontSize: 12, marginBottom: 4 }}>❌ TYPICALLY NOT COVERED</div>
              <div style={{ color: '#E2E8F0', fontSize: 14 }}>{result.notCovered}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#E2E8F0′ }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ background: '#1E293B', borderRadius: 8, padding: '12px 16px', flex: 1 }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>👨‍⚖️ ATTORNEY</div>
                <div style={{ color: '#E2E8F0', fontSize: 14 }}>{result.attorney}</div>
              </div>
              <div style={{ background: '#1E293B', borderRadius: 8, padding: '12px 16px', flex: 1 }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>⏱️ TIMELINE</div>
                <div style={{ color: '#E2E8F0', fontSize: 14 }}>{result.timeline}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
