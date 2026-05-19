import { useState } from 'react';

const issueTypes = [
  { value: 'crack_cosmetic', label: 'Cosmetic cracks (hairline, drywall)' },
  { value: 'crack_structural', label: 'Structural cracks (>1/4 inch, stair-step)' },
  { value: 'plumbing_leak', label: 'Foundation damage from plumbing leak' },
  { value: 'sudden_collapse', label: 'Sudden collapse or sinkhole' },
  { value: 'settling', label: 'General settling / soil movement' },
];

const coverageMap: Record<string, { covered: boolean; reason: string; evidence: string[]; appeal: string }> = {
  crack_cosmetic: { covered: false, reason: 'Cosmetic cracks from settling are universally excluded in Texas homeowner policies.', evidence: ['Annual photos showing crack size', 'Structural engineer report baseline'], appeal: 'Limited appeal potential — focus on endorsements for future coverage.' },
  crack_structural: { covered: false, reason: 'Structural settling is still excluded, but document thoroughly if a covered peril (burst pipe) contributed.', evidence: ['Plumber inspection report', 'Engineer structural assessment', 'Dated photos of progression'], appeal: 'Appeal if any covered peril contributed. Reference Texas Department of Insurance complaint process.' },
  plumbing_leak: { covered: true, reason: 'Foundation damage caused by a sudden, accidental plumbing leak is typically covered under standard DFW policies.', evidence: ['Plumber report confirming sudden leak', 'Foundation engineer linking damage to leak', 'Repair invoices'], appeal: 'Strong claim — document the leak source and chain of causation clearly.' },
  sudden_collapse: { covered: true, reason: 'Sudden collapse from a covered peril (not gradual settling) is covered. Sinkholes may require separate endorsement.', evidence: ['Emergency incident documentation', 'Structural engineer report', 'Photos/video of collapse event'], appeal: 'File immediately. Delays weaken coverage arguments.' },
  settling: { covered: false, reason: 'Soil movement and settling — the most common DFW foundation issue — is explicitly excluded in nearly all policies.', evidence: ['Baseline engineer report', 'Soil test showing expansive clay', 'Annual measurement records'], appeal: 'Shop for specialty foundation coverage riders. Some carriers offer limited endorsements.' },
};

export default function DFWFoundationInsuranceGuide() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<typeof coverageMap[string] | null>(null);

  function analyze() {
    if (selected && coverageMap[selected]) setResult(coverageMap[selected]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Foundation Insurance Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW sits on some of the most expansive clay soil in the nation. Understanding what your policy actually covers — and what it excludes — can save you tens of thousands of dollars.</p>

        <div style={{ background: '#EF4444', borderRadius: 10, padding: '16px 20px', marginBottom: 32, fontWeight: 700 }}>
          ⚠️ Critical: Most standard DFW homeowner policies do NOT cover foundation repair from soil movement or settling — the most common local cause.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>What IS Covered</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[['✅', 'Sudden collapse from a covered structural peril'],['✅', 'Foundation damage caused by an accidental plumbing leak'],['✅', 'Explosion or vehicle impact causing foundation failure']].map(([icon, text]) => (
            <div key={text} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #10B981′ }}>{icon} {text}</div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>What Is NOT Covered</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {[['❌', 'Normal settling, shifting, or soil expansion (the #1 DFW cause)'],['❌', 'Tree root intrusion'],['❌', 'Gradual water infiltration'],['❌', 'Poor original construction or soil prep']].map(([icon, text]) => (
            <div key={text} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #EF4444′ }}>{icon} {text}</div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Endorsements to Ask About</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20, fontSize: 14 }}>A small number of Texas carriers offer limited foundation endorsements. Ask specifically about: Service Line Coverage (protects pipes that feed the foundation), Water Backup Rider, and Sinkhole Coverage in applicable areas.</p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Foundation Issue Coverage Checker</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Describe your foundation issue</label>
            <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select issue type...</option>
              {issueTypes.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>Check Coverage</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: result.covered ? '#10B981′ : '#EF4444', marginBottom: 10 }}>{result.covered ? '✅ Likely Covered' : '❌ Typically NOT Covered'}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>{result.reason}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 6 }}>Evidence to Gather:</div>
              {result.evidence.map(e => <div key={e} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>• {e}</div>)}
              <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginTop: 12, marginBottom: 6 }}>Appeal Strategy:</div>
              <div style={{ fontSize: 13, color: '#94A3B8′ }}>{result.appeal}</div>
            </div>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: 12, textAlign: 'center' }}>General guidance only — consult your insurance agent for policy-specific advice.</div>
      </div>
    </div>
  );
}
