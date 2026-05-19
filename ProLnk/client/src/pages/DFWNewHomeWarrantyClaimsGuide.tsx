import { useState } from 'react';

const warrantyTypes = [
  { id: '1yr', label: '1-Year Workmanship', desc: 'Covers defects in materials and workmanship — cabinets, flooring, paint, trim' },
  { id: '2yr', label: '2-Year Systems', desc: 'Covers plumbing, electrical, and HVAC systems' },
  { id: '10yr', label: '10-Year Structural', desc: 'Covers major structural defects — foundation, load-bearing walls, roof framing' },
];

const issueTypes = [
  { id: 'cosmetic', label: 'Cosmetic — paint, trim, flooring' },
  { id: 'systems', label: 'Systems — HVAC, plumbing, electrical' },
  { id: 'structural', label: 'Structural — foundation, walls, framing' },
  { id: 'appliances', label: 'Appliances included in home' },
];

function getResult(warranty: string, issue: string) {
  const covered: Record<string, Record<string, { covered: boolean; how: string; timeline: string; escalation: string }>> = {
    '1yr': {
      cosmetic: { covered: true, how: 'Submit written warranty claim to builder warranty department with photos. Reference contract warranty section.', timeline: '30–60 days typical builder response in DFW', escalation: 'If ignored after 30 days, send certified letter. If still no response, file complaint with Texas Residential Construction Commission.' },
      systems: { covered: true, how: 'Log systems claim separately — builder must send licensed contractor within reasonable time.', timeline: '14–21 days typical for urgent HVAC in DFW', escalation: 'DFW summers make HVAC urgent — use Texas Residential Construction Liability Act to demand expedited response.' },
      structural: { covered: true, how: 'Structural issues are highest priority — notify builder in writing immediately.', timeline: 'Builder required to inspect within 10 days under Texas law', escalation: 'Hire independent structural engineer for documentation before builder visits. Critical for dispute resolution.' },
      appliances: { covered: false, how: 'Appliances have their own manufacturer warranty — not covered under builder warranty.', timeline: 'Contact appliance manufacturer directly', escalation: 'If builder installed incorrectly causing appliance damage, that installation defect may be covered under 1-year.' },
    },
    '2yr': {
      cosmetic: { covered: false, how: 'Cosmetic items only covered in year 1. Two-year warranty covers systems only.', timeline: 'Not applicable', escalation: 'If cosmetic issue relates to a systems failure (water damage from plumbing), systems coverage may apply.' },
      systems: { covered: true, how: 'HVAC, plumbing, and electrical defects covered through year 2. Document with licensed contractor diagnosis.', timeline: '21–45 days typical response', escalation: 'Send certified mail with contractor report attached. Builder has specific cure period under Texas RCLA.' },
      structural: { covered: true, how: 'Structural remains covered — same process as year 1.', timeline: 'Builder must inspect within 10 days', escalation: 'Texas RCLA gives builder 45 days to offer repair after 60-day notice period — start the clock early.' },
      appliances: { covered: false, how: 'Appliances not covered under 2-year systems warranty — manufacturer warranty applies.', timeline: 'Contact manufacturer', escalation: 'If appliance failure caused water or fire damage, homeowner insurance may apply.' },
    },
    '10yr': {
      cosmetic: { covered: false, how: 'Ten-year warranty is structural only. Cosmetic issues past year 1 are owner responsibility.', timeline: 'Not applicable', escalation: 'Review builder warranty language carefully — some DFW builders define structural more broadly than minimum requirements.' },
      systems: { covered: false, how: 'Systems coverage ended at year 2. Major systems repairs are owner responsibility after year 2.', timeline: 'Not applicable', escalation: 'If systems failure caused structural damage — for example, slab leak causing foundation heave — structural warranty may apply.' },
      structural: { covered: true, how: 'Major structural defects covered for 10 years. Requires proof defect is structural — foundation, load-bearing, roof framing.', timeline: 'Builder must respond within 10 days per Texas law', escalation: 'Hire a licensed structural engineer before contacting builder. Report is critical for 10-year structural claims in DFW.' },
      appliances: { covered: false, how: 'Appliance warranty from manufacturer — independent of builder warranty.', timeline: 'Contact manufacturer', escalation: 'Extended appliance warranties purchased at closing may still be active — check your closing documents.' },
    },
  };
  return covered[warranty]?.[issue] ?? null;
}

export default function DFWNewHomeWarrantyClaimsGuide() {
  const [warranty, setWarranty] = useState('');
  const [issue, setIssue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const result = warranty && issue ? getResult(warranty, issue) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '6px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏗️ NEW HOME WARRANTY
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8, color: '#fff' }}>New Construction Warranty Claims in DFW</h1>
        <p style={{ fontSize: 17, color: '#aaa', marginBottom: 36 }}>
          Builder responsiveness in DFW varies dramatically. Knowing your rights under Texas law — and how to escalate — is the difference between a repaired defect and an ignored claim.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📋 Texas New Home Warranty Structure</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {warrantyTypes.map(w => (
              <div key={w.id} style={{ background: 'rgba(245,230,66,0.08)', borderLeft: '3px solid #F5E642', borderRadius: 8, padding: 16 }}>
                <strong style={{ color: '#F5E642' }}>{w.label}</strong>
                <p style={{ color: '#ccc', fontSize: 14, margin: '6px 0 0' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚖️ Texas Residential Construction Liability Act (RCLA)</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#ccc' }}>
            <li>You must give the builder a <strong>written 60-day notice</strong> before filing a lawsuit</li>
            <li>Builder has <strong>45 days after that notice</strong> to offer a repair or settlement</li>
            <li>Keep all communications — <strong>certified mail creates a legal record</strong></li>
            <li>Builder who ignores RCLA notice loses many legal defenses in court</li>
            <li>Many DFW builders settle quickly once they receive a formal RCLA notice letter</li>
          </ul>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📅 Use Your 11-Month Warranty Inspection</h2>
          <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 14 }}>
            Schedule an independent home inspection at the 11-month mark — before your 1-year warranty expires. A professional inspector will identify issues you may have missed. Submit all findings to your builder in writing before the anniversary date.
          </p>
          <div style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 8, padding: 16, fontSize: 14 }}>
            <strong style={{ color: '#F5E642' }}>DFW Tip:</strong> DFW clay soil causes settlement in the first year — foundation cracks appearing at month 10 are very common. An 11-month inspection catches these before your warranty window closes.
          </div>
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, marginBottom: 28, color: '#0A1628' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🧮 Warranty Coverage Checker</h2>
          <p style={{ color: '#333', marginBottom: 20 }}>Warranty type plus issue type → covered, how to file, timeline, and escalation path</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10 }}>Warranty Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {warrantyTypes.map(w => (
                <button key={w.id} onClick={() => { setWarranty(w.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: warranty === w.id ? '#0A1628' : 'rgba(10,22,40,0.3)', background: warranty === w.id ? '#0A1628' : 'transparent', color: warranty === w.id ? '#F5E642' : '#0A1628', fontWeight: 600, cursor: 'pointer' }}>
                  {w.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10 }}>Issue Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {issueTypes.map(i => (
                <button key={i.id} onClick={() => { setIssue(i.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: issue === i.id ? '#0A1628' : 'rgba(10,22,40,0.3)', background: issue === i.id ? '#0A1628' : 'transparent', color: issue === i.id ? '#F5E642' : '#0A1628', fontWeight: 600, cursor: 'pointer' }}>
                  {i.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!warranty || !issue}
            style={{ background: warranty && issue ? '#0A1628' : 'rgba(10,22,40,0.3)', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: warranty && issue ? 'pointer' : 'not-allowed', fontSize: 16 }}>
            Check Coverage →
          </button>
        </div>
        {showResult && result && (
          <div style={{ background: 'rgba(255,255,255,0.05)', border: `2px solid ${result.covered ? '#4CAF50' : '#f44336'}`, borderRadius: 12, padding: 28, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ background: result.covered ? '#4CAF50' : '#f44336', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {result.covered ? '✅' : '❌'}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: result.covered ? '#4CAF50' : '#f44336' }}>
                {result.covered ? 'Covered Under This Warranty' : 'Not Covered Under This Warranty'}
              </h3>
            </div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>How to File: </span><span style={{ color: '#ccc' }}>{result.how}</span></div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Expected Timeline: </span><span style={{ color: '#ccc' }}>{result.timeline}</span></div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Escalation Path: </span><span style={{ color: '#aaa', fontSize: 14 }}>{result.escalation}</span>
            </div>
          </div>
        )}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📌 DFW Builder Responsiveness Reality</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#aaa' }}>
            <li>Large national builders (D.R. Horton, Lennar, Pulte) have formal warranty departments — document everything in their portal</li>
            <li>Smaller custom builders may be more responsive personally but have less structured processes</li>
            <li>DFW market activity affects responsiveness — builders are less responsive in boom markets when they have more buyers</li>
            <li>A real estate attorney review of warranty language before closing is worth the cost on homes over $400K</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
