import { useState } from 'react';

const CHECKLIST_MAP: Record<string, string[]> = {
  'small-construction': [
    '✅ Minimum 3 competitive bids required',
    '✅ Verify contractor general liability (min $1M)',
    '✅ Confirm workers comp certificate on file',
    '✅ Require signed lien waiver before final payment',
    '✅ Board vote required if over $5,000 threshold',
    '✅ Document decision rationale in meeting minutes',
  ],
  'small-maintenance': [
    '✅ 2 bids minimum for routine maintenance',
    '✅ Verify contractor insurance',
    '✅ Document scope of work in writing',
    '✅ Manager approval for invoices under $2,500',
  ],
  'large-construction': [
    '✅ Minimum 3 bids — RFP process recommended',
    '✅ Require $2M+ general liability coverage',
    '✅ Performance bond for projects over $50K',
    '✅ Lien waiver required at each payment milestone',
    '✅ Full board vote + homeowner notice required',
    '✅ Hire independent inspector for completion sign-off',
    '✅ Reserve fund draw approval from HOA attorney',
    '✅ Verify contractor license with Texas TDLR',
  ],
  'large-maintenance': [
    '✅ Formal bid process with written specs',
    '✅ Annual contract review recommended',
    '✅ Board approval for contracts over $10,000',
    '✅ Insurance verification annually',
    '✅ Performance review clause in contract',
  ],
};

export default function DFWHOABoardGuide() {
  const [hoaSize, setHoaSize] = useState('');
  const [projectType, setProjectType] = useState('');
  const [checklist, setChecklist] = useState<string[]>([]);

  function generate() {
    if (!hoaSize || !projectType) return;
    const key = `${hoaSize}-${projectType}`;
    setChecklist(CHECKLIST_MAP[key] || CHECKLIST_MAP[`${hoaSize}-maintenance`] || []);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#F5E642', padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🏘️</div>
        <h1 style={{ color: '#0A1628', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW HOA Board Member Guide</h1>
        <p style={{ color: '#0A1628', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>What every DFW HOA board member needs to know about hiring contractors the right way.</p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚖️ Fiduciary Duty First</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>As a board member you hold a fiduciary duty to all homeowners. Every contractor decision must prioritize the community's financial interest — not personal preference. DFW associations governed under Texas Property Code Chapter 204 must document all major expenditures and maintain competitive bid records for at least 7 years.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 Insurance Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['General Liability', 'Min $1M per occurrence'], ['Workers Compensation', 'Required for all employees'], ['Auto Liability', '$500K for vehicle work'], ['Umbrella Policy', 'Recommended for large jobs']].map(([title, desc]) => (
              <div key={title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔒 Lien Waiver Importance</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>Texas mechanic's lien law (Chapter 53, Texas Property Code) gives contractors the right to file a lien against HOA-owned property for unpaid work. Always collect a conditional lien waiver upon each payment and a final unconditional lien waiver upon project completion. ProLnk contractors are trained on this requirement.</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 20 }}>🔧 Generate Your Hiring Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>HOA Size</label>
              <select value={hoaSize} onChange={e => setHoaSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14, background: '#fff' }}>
                <option value="">Select size</option>
                <option value="small">Small (&lt;100 units)</option>
                <option value="large">Large (100+ units)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Project Type</label>
              <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14, background: '#fff' }}>
                <option value="">Select type</option>
                <option value="construction">Capital Construction</option>
                <option value="maintenance">Routine Maintenance</option>
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Generate Checklist →</button>
          {checklist.length > 0 && (
            <div style={{ marginTop: 20, background: '#fff', borderRadius: 8, padding: 20 }}>
              {checklist.map((item, i) => <div key={i} style={{ color: '#0A1628', fontSize: 14, padding: '6px 0', borderBottom: i < checklist.length - 1 ? '1px solid #E2E8F0′ : ’none' }}>{item}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginTop: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🤝</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, marginBottom: 8 }}>ProLnk Serves HOA Boards</h3>
          <p style={{ color: '#0A1628', fontSize: 14, marginBottom: 16 }}>Pre-vetted contractors, insurance verification built in, competitive bids in hours — not weeks.</p>
          <a href="/pro-signup" style={{ background: '#0A1628', color: '#F5E642', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700 }}>Connect Your HOA →</a>
        </div>
      </div>
    </div>
  );
}
