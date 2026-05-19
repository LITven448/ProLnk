import { useState } from 'react';

const tradeVerification = {
  hvac: {
    label: 'HVAC',
    icon: '❄️',
    agency: 'TDLR — Texas Dept of Licensing and Regulation',
    license: 'ACR License (Air Conditioning and Refrigeration)',
    steps: [
      { icon: '🏛️', title: 'TDLR License Verification', detail: 'All HVAC contractors must hold an active ACR license from TDLR. ProLnk verifies license number, status, and expiration date in real time.' },
      { icon: '🔍', title: 'Checkr Background Screen', detail: '7-year criminal background check run through Checkr. Any felony conviction or fraud history results in automatic disqualification.' },
      { icon: '🛡️', title: 'Certificate of Insurance', detail: 'Minimum $1M general liability and $500K workers compensation. COI must name ProLnk as additional insured and be current.' },
      { icon: '⭐', title: 'Performance Score', detail: 'After each job, homeowners rate quality, punctuality, and professionalism. Pros below 4.2/5.0 enter a 30-day performance improvement plan before suspension.' },
    ],
  },
  plumbing: {
    label: 'Plumbing',
    icon: '🔧',
    agency: 'TSBPE — Texas State Board of Plumbing Examiners',
    license: 'Master Plumber License (MP)',
    steps: [
      { icon: '🏛️', title: 'TSBPE License Verification', detail: 'All plumbing work requires a licensed Master Plumber. ProLnk verifies MP license number and standing with TSBPE before a pro can receive leads.' },
      { icon: '🔍', title: 'Checkr Background Screen', detail: '7-year criminal background check. Identity verified against state license records. Any fraud or theft conviction results in disqualification.' },
      { icon: '🛡️', title: 'Certificate of Insurance', detail: 'Minimum $1M general liability required. Proof of active bond where required by municipality. Reviewed annually.' },
      { icon: '⭐', title: 'Performance Score', detail: 'Homeowner ratings plus permit compliance tracking. Any failed inspection is flagged in the pro profile and reviewed by our compliance team.' },
    ],
  },
  electrical: {
    label: 'Electrical',
    icon: '⚡',
    agency: 'TDLR — Texas Dept of Licensing and Regulation',
    license: 'Master Electrician License (ME)',
    steps: [
      { icon: '🏛️', title: 'TDLR ME License Verification', detail: 'Electrical work requires a TDLR-issued Master Electrician license. ProLnk cross-references license number and confirms no disciplinary actions on record.' },
      { icon: '🔍', title: 'Checkr Background Screen', detail: '7-year background check with identity verification. Electrical fraud cases are tracked and shared with TDLR upon discovery.' },
      { icon: '🛡️', title: 'Certificate of Insurance', detail: 'Minimum $1M general liability and $500K workers comp. Electrical contractors must also carry completed operations coverage.' },
      { icon: '⭐', title: 'Performance Score', detail: 'Permit pull rate and first-inspection pass rate are tracked in addition to homeowner reviews. Pros with <90% first-pass inspection rate are flagged.' },
    ],
  },
  general: {
    label: 'General',
    icon: '🏗️',
    agency: 'Multiple Texas agencies + local municipality',
    license: 'Varies by trade scope',
    steps: [
      { icon: '🏛️', title: 'State and Local License Check', detail: 'General contractors and specialty trades are verified against all applicable Texas licensing boards and local municipality permit databases.' },
      { icon: '🔍', title: 'Checkr Background Screen', detail: 'All ProLnk pros regardless of trade undergo the same 7-year Checkr background screen. This is non-negotiable and renewed every 2 years.' },
      { icon: '🛡️', title: 'Certificate of Insurance', detail: 'Minimum COI requirements vary by trade but all pros must carry active general liability. High-risk trades require surety bonds.' },
      { icon: '⭐', title: 'Performance Score', detail: 'All pros start at 0 jobs and earn their score. New pros are paired with lower-risk jobs until they build a verified track record.' },
    ],
  },
};

type TradeKey = keyof typeof tradeVerification;

export default function ProLnkAccreditationPage() {
  const [active, setActive] = useState<TradeKey>('hvac');
  const t = tradeVerification[active];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', margin: '0 0 12px' }}>How ProLnk Verifies Every Pro</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Every ProLnk partner passes a 4-checkpoint verification process before receiving a single lead.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {(Object.keys(tradeVerification) as TradeKey[]).map(k => (
            <button key={k} onClick={() => setActive(k)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: active === k ? '#F5E642′ : '#1e2d4a', color: active === k ? '#0A1628' : '#94a3b8' }}>
              {tradeVerification[k].icon} {tradeVerification[k].label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #2d4a7a' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Governing Body</div>
          <div style={{ color: '#fff', fontSize: 15 }}>{t.agency}</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 2 }}>Required credential: {t.license}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {t.steps.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#1e2d4a', borderRadius: 12, padding: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5E642', color: '#0A1628', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>{i + 1}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{s.title}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[['100%', 'License verified'], ['0', 'Tolerance for fraud history'], ['Annual', 'COI renewal required']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#1e2d4a', borderRadius: 12, padding: 18, textAlign: 'center', border: '1px solid #2d4a7a' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
