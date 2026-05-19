import { useState } from 'react';

const disputeOptions = [
  'Violation notice I disagree with',
  'HOA denied my architectural request',
  'HOA not maintaining common areas',
  'HOA mismanaging funds',
  'HOA not following its own rules',
  'Foreclosure threat over dues',
];

const resolutionData: Record<string, { rights: string; process: string[]; escalation: string }> = {
  'Violation notice I disagree with': {
    rights: 'Texas Property Code §209.007 gives you the right to a hearing before any fine is imposed.',
    process: ['Request hearing in writing within 30 days of notice', 'Present evidence at hearing — photos, contractor reports', 'Appeal board decision if needed — most HOAs must have appeals process', 'File Texas AG complaint if HOA denies hearing rights'],
    escalation: 'Texas AG HOA complaint → attorney demand letter citing §209 → district court',
  },
  'HOA denied my architectural request': {
    rights: 'HOA must follow written review standards — arbitrary denial is challengeable.',
    process: ['Request written denial with specific guideline citations', 'Submit revised plan addressing stated objections', 'File formal internal appeal per HOA bylaws', 'Sue for injunctive relief if denial was arbitrary or discriminatory'],
    escalation: 'Texas AG complaint → real estate attorney → district court injunction',
  },
  'HOA not maintaining common areas': {
    rights: 'HOA has contractual obligation to maintain common areas per CC&Rs — failure is breach of contract.',
    process: ['Document deficiencies with photos and dates', 'Send certified demand letter to HOA board', 'Demand agenda item at next board meeting', 'File suit for breach of governing documents if ignored'],
    escalation: 'Texas AG complaint → small claims for minor issues → district court for major repairs',
  },
  'HOA mismanaging funds': {
    rights: 'Texas law requires HOA to allow member inspection of financial records (§209.005).',
    process: ['Request financial records in writing — HOA must provide within 10 business days', 'Review for irregularities with CPA if needed', 'File Texas AG complaint for non-disclosure', 'Contact local DA if fraud is suspected'],
    escalation: 'Texas AG → CPA audit demand → DA referral → civil suit for damages',
  },
  'HOA not following its own rules': {
    rights: 'HOA is bound by its own governing documents — selective enforcement is actionable.',
    process: ['Document the inconsistency with written evidence', 'Cite the specific rule in your response to HOA', 'File formal grievance per HOA dispute resolution procedure', 'Raise at annual meeting — board members can be voted out'],
    escalation: 'Texas AG complaint → attorney demand letter → district court for declaratory relief',
  },
  'Foreclosure threat over dues': {
    rights: 'Texas §209.009 limits HOA foreclosure — must follow strict notice requirements. HOA cannot foreclose for fines alone.',
    process: ['Respond in writing immediately — do not ignore', 'Request payment plan — HOA must offer one under Texas law', 'Pay under protest if funds available — dispute separately', 'Consult HOA attorney immediately if foreclosure suit filed'],
    escalation: 'Real estate attorney ASAP → court hearing to challenge notice compliance → file counterclaim if procedures violated',
  },
};

export default function DFWHOADisputeResolutionGuide() {
  const [disputeType, setDisputeType] = useState('');
  const [result, setResult] = useState<null | { rights: string; process: string[]; escalation: string }>(null);

  const handleFind = () => {
    if (!disputeType) return;
    setResult(resolutionData[disputeType] || null);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏘️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW HOA Dispute Resolution Guide</h1>
          <p style={{ color: '#CBD5E1', marginTop: 8 }}>Texas Property Code Chapter 209 gives homeowners real rights against HOAs</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Texas HOA Law Basics</h2>
          {[
            ['Hearing Required (§209.007)', 'HOA must give you a hearing before imposing fines — not optional.'],
            ['Records Access (§209.005)', 'You can inspect all HOA financial records and meeting minutes.'],
            ['Dispute Resolution Required', 'Texas law requires HOAs to maintain a written dispute resolution process.'],
            ['No Fines-Only Foreclosure', 'HOAs cannot foreclose solely for unpaid fines — only unpaid dues with strict notice rules.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>✔</span>
              <div><strong style={{ color: '#0A1628' }}>{title}:</strong> <span style={{ color: '#475569' }}>{desc}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your Resolution Path</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#0A1628', fontWeight: 600, display: 'block', marginBottom: 8 }}>What Is Your Dispute?</label>
            <select value={disputeType} onChange={e => setDisputeType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628' }}>
              <option value="">Select dispute type...</option>
              {disputeOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleFind} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get My Rights + Path →</button>
        </div>

        {result && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📍 Your Rights & Path</h2>
            <div style={{ background: '#1E293B', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>⚖️ YOUR LEGAL RIGHTS</div>
              <div style={{ color: '#E2E8F0' }}>{result.rights}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              {result.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#E2E8F0' }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1E293B', borderRadius: 8, padding: '16px 20px' }}>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>🚨 ESCALATION PATH</div>
              <div style={{ color: '#E2E8F0' }}>{result.escalation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
