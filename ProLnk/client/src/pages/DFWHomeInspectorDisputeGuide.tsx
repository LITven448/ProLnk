import { useState } from 'react';

const missTypes = [
  'Structural defect missed',
  'Roof damage not noted',
  'Plumbing / HVAC defect missed',
  'Electrical issue overlooked',
  'Foundation problem not flagged',
  'Mold / moisture overlooked',
];

const timing = ['Found within 1 year', 'Found 1–4 years later', 'Found 4+ years later'];

const outcomes: Record<string, { liability: string; path: string; realistic: string }> = {
  'early-major': { liability: 'Strong — TREC standards require inspection of visible, accessible defects', path: 'File TREC complaint → demand E&O claim → mediation or suit', realistic: 'Good chance of recovery if defect was within scope and accessible' },
  'early-minor': { liability: 'Moderate — depends on scope of inspection agreement', path: 'Demand letter → TREC complaint → small claims if under $20K', realistic: 'Settlement likely if defect was clearly visible' },
  'late-major': { liability: 'Moderate — 4-year statute of limitations in Texas', path: 'Hire construction attorney → gather evidence → file suit', realistic: 'Harder to prove inspector liability vs. later development' },
  'late-minor': { liability: 'Weak — difficult to prove inspector missed vs. condition developed', path: 'TREC complaint for record → consult attorney on viability', realistic: 'Low recovery probability without compelling evidence' },
};

export default function DFWHomeInspectorDisputeGuide() {
  const [missType, setMissType] = useState('');
  const [discovered, setDiscovered] = useState('');
  const [result, setResult] = useState<null | { liability: string; path: string; realistic: string }>(null);

  const handleAssess = () => {
    if (!missType || !discovered) return;
    const major = ['Structural', 'Foundation', 'Roof', 'Electrical'].some(k => missType.includes(k));
    const early = discovered === 'Found within 1 year';
    const key = `${early ? 'early' : 'late'}-${major ? 'major' : 'minor'}`;
    setResult(outcomes[key] || outcomes['late-minor']);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔎</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Home Inspector Dispute Guide</h1>
          <p style={{ color: '#CBD5E1', marginTop: 8 }}>TREC-regulated inspectors — know when and how to hold them accountable</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 How Texas Inspector Liability Works</h2>
          {[
            ['TREC Regulates Inspectors', 'All TX home inspectors must be licensed by TREC. File complaints at trec.texas.gov.'],
            ['Scope Matters', 'Inspectors only owe duty for visible, accessible conditions — hidden defects are generally excluded.'],
            ['E&O Insurance', 'Most inspectors carry Errors & Omissions insurance — this is your primary recovery source.'],
            ['4-Year Statute', 'Texas gives you 4 years from discovery (not purchase) to file a negligence claim.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>✔</span>
              <div><strong style={{ color: '#0A1628′ }}>{title}:</strong> <span style={{ color: '#475569' }}>{desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Liability Assessment Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>Type of Missed Defect</label>
            <select value={missType} onChange={e => setMissType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628′ }}>
              <option value="">Select defect type...</option>
              {missTypes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>When Was It Discovered?</label>
            <select value={discovered} onChange={e => setDiscovered(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628′ }}>
              <option value="">Select timing...</option>
              {timing.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={handleAssess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Assess My Case →</button>
        </div>

        {result && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📍 Your Assessment</h2>
            {[['⚖️ Liability Strength', result.liability], ['📋 Dispute Path', result.path], ['🎯 Realistic Outcome', result.realistic]].map(([label, val]) => (
              <div key={label} style={{ background: '#1E293B', borderRadius: 8, padding: '16px 20px', marginBottom: 12 }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E2E8F0′ }}>{val}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
