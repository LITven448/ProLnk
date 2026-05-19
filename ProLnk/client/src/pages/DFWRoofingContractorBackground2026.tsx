import { useState } from 'react';

export default function DFWRoofingContractorBackground2026() {
  const [stage, setStage] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!stage) { setResult('Please select a vetting stage.'); return; }
    const guides: Record<string, string> = {
      initial: '📋 INITIAL SCREENING: Start with TDLR license lookup (tdlr.texas.gov) — verify roofing contractor license is current and not suspended. Google the company name + all prior names they have operated under. Storm chasers frequently rebrand after a bad season of complaints. Check if they have a physical DFW address or only a PO box.',
      shortlist: '🔍 SHORTLIST CHECK: Run BBB complaint history — filter for pattern complaints about no-shows, incomplete work, or material substitution. Search TDI (Texas Department of Insurance) complaint database for AOB (Assignment of Benefits) fraud flags. Call 2-3 references from jobs completed 18+ months ago, not just recent work.',
      hired: '✅ PRE-HIRE VERIFICATION: Request proof of criminal background check (ProLnk uses Checkr for all pros). Confirm drug testing policy — ProLnk requires pre-job testing. Ask for COI (Certificate of Insurance) directly from their insurer, not a PDF they provide. Verify workers\’ comp covers all crew, not just the owner.',
      prolnk: '🏆 PROLNK VERIFIED: Every ProLnk roofing contractor has passed Checkr criminal background screening, drug testing, TDLR license verification, and insurance confirmation. We also track complaint patterns and remove contractors who generate customer issues. Skip the manual vetting — every match is pre-cleared.'
    };
    setResult(guides[stage] || '');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔍 DFW Roofing Contractor Background Check Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW's hail season attracts storm chasers who disappear after the season. Here’s what to check beyond the license — and why ProLnk’s vetting process matters.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚠️ DFW Roofing Red Flags</h2>
          {[['Storm Chaser Rebrand','Companies change names after a bad hail season to reset negative reviews — search all DBAs'],['AOB Fraud','Assignment of Benefits fraud — contractor takes control of your insurance claim. Check TDI complaints.'],['No Physical Address','Legitimate DFW roofing contractors have a local address — PO boxes only is a warning sign'],['Cash-Only Requests','Pressure to pay all cash before work starts — legitimate pros accept checks and cards']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: '1px solid #1e3a5f', alignItems: 'flex-start' }}>
              <span style={{ color: '#ef4444', fontSize: 18 }}>🚨</span>
              <div><div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{label}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{val}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🛡️ ProLnk Vetting Standard</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Checkr Background','Criminal background check on every contractor and crew member'],['Drug Testing','Pre-job drug screening required — zero tolerance policy'],['TDLR Verified','Texas roofing license confirmed current and in good standing'],['Insurance COI','Certificate of Insurance verified directly with carrier, not PDF']].map(([title, desc]) => (
              <div key={title} style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>✅ {title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 Get Stage-Specific Guidance</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Where are you in the vetting process?</label>
            <select value={stage} onChange={e => setStage(e.target.value)} style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}>
              <option value=''>Select your stage...</option>
              <option value='initial'>Initial screening — just got a few names</option>
              <option value='shortlist'>Shortlist — narrowed to 2-3 contractors</option>
              <option value='hired'>Ready to hire — final pre-hire checks</option>
              <option value='prolnk'>Using ProLnk — what's already done?</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Vetting Guide →</button>
          {result && <div style={{ marginTop: 16, background: '#1a2f50', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Skip the Vetting — Use ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Every ProLnk roofing match is pre-vetted. Background check, drug test, license, and insurance — done before they ever appear in your results.</p>
        </div>
      </div>
    </div>
  );
}