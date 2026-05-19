import { useState } from 'react';

const disputeTypes = [
  {
    id: 'quality',
    label: 'Job Quality Dispute',
    icon: '🔧',
    desc: 'Homeowner claims work was substandard or incomplete.',
    process: [
      'Partner receives written notice within 24h of complaint',
      'Mediation team reviews photos, job record, and all platform communications',
      'Partner given 72 hours to cure the issue or enter mediation',
      'If unresolved: neutral mediator assigned — decision within 10 business days',
      'Resolved commission held until decision; partner retains remainder',
    ],
    timeline: '3–14 days',
    tip: 'Upload job photos DURING the job (time-stamped). Photos taken after a complaint carry less weight.',
  },
  {
    id: 'scope',
    label: 'Scope Creep Dispute',
    icon: '📝',
    desc: 'Additional work was done without written authorization or payment.',
    process: [
      'Written change orders are the only protection for scope additions',
      'Verbal additions confirmed only if documented in platform chat',
      'Unauthorized scope additions are not compensated through ProLnk',
      'Dispute reviewed against original job specs and any change order records',
    ],
    timeline: '5 business days',
    tip: 'Use ProLnk’s in-platform change order tool before starting ANY additional work. Verbal agreements are not binding.',
  },
  {
    id: 'cancellation',
    label: 'Cancellation Dispute',
    icon: '❌',
    desc: 'Either party cancels after job acceptance.',
    process: [
      'Cancellation within 2 hours of acceptance: no penalty for either party',
      'Cancellation after 2 hours: 25% of estimated commission held from canceling party',
      'Emergency cancellations (documented): reviewed case by case, penalties may be waived',
      'Homeowner cancellations follow same timeline — fee credited to your next job',
    ],
    timeline: '24–48 hours',
    tip: 'If you cannot complete a job, cancel within 2 hours of accepting. After that window, you absorb the penalty.',
  },
  {
    id: 'commission',
    label: 'Commission Dispute',
    icon: '💰',
    desc: 'Disagreement on payout amount, rate, or calculation.',
    process: [
      'Submit dispute with job ID and expected vs. received amount',
      'Financial operations team reviews job record and commission schedule',
      'All calculations verified against tier rates and job value at time of match',
      'Resolution provided within 5 business days',
      'If error confirmed: corrected payout in next cycle + confirmation',
    ],
    timeline: '5 business days',
    tip: 'Screenshot your commission estimate before accepting a job. This is your baseline for any dispute.',
  },
  {
    id: 'attribution',
    label: 'Photo-Lead Attribution Dispute',
    icon: '📸',
    desc: 'Multiple partners photographed the same property — contest over who gets origination credit.',
    process: [
      'First verified upload wins attribution for that property — no exceptions',
      'Upload timestamp is determined by server receipt time, not device clock',
      'Disputed properties reviewed by data team within 48 hours',
      'If fraud is suspected (photo manipulation, date tampering): both partners investigated',
    ],
    timeline: '48 hours',
    tip: 'Upload immediately after photographing — don’t save photos to batch upload later. First upload = your origination right.',
  },
];

export default function PartnerDisputeResolutionGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const dispute = disputeTypes.find(d => d.id === selected);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>⚖️</div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.15 }}>
            ProLnk Dispute Resolution
          </h1>
          <p style={{ color: '#475569', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            How we handle disagreements — exact processes, timelines, and what you can do to protect yourself before a dispute arises.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 36, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0f172a', fontSize: 17, fontWeight: 800, margin: '0 0 8px' }}>Your Rights as a ProLnk Partner</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { icon: '📣', text: 'All decisions appealable to Partner Relations team' },
              { icon: '🛡️', text: 'No partner suspended without a full investigation' },
              { icon: '🏛️', text: 'Settlements can escalate to binding arbitration (Texas law)' },
            ].map(r => (
              <div key={r.text} style={{ background: '#f1f5f9', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{r.icon}</span>
                <span style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ color: '#64748b', fontSize: 14, fontWeight: 700, margin: '0 0 16px' }}>
            SELECT YOUR SITUATION — See the exact resolution process and timeline
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {disputeTypes.map(d => (
              <button
                key={d.id}
                onClick={() => setSelected(selected === d.id ? null : d.id)}
                style={{
                  background: selected === d.id ? '#1d4ed8' : '#fff',
                  border: `2px solid ${selected === d.id ? '#3b82f6' : '#e2e8f0'}`,
                  borderRadius: 12, padding: '18px 14px', cursor: 'pointer',
                  textAlign: 'center', transition: 'all 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{d.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: selected === d.id ? '#fff' : '#0f172a', lineHeight: 1.3 }}>{d.label}</div>
              </button>
            ))}
          </div>
        </div>

        {dispute && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 36, border: '2px solid #3b82f6', boxShadow: '0 4px 20px rgba(59,130,246,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>{dispute.icon}</span>
              <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 800, margin: 0 }}>{dispute.label}</h2>
            </div>
            <p style={{ color: '#475569', fontSize: 15, margin: '0 0 24px' }}>{dispute.desc}</p>
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 13, marginBottom: 12 }}>RESOLUTION PROCESS</div>
              {dispute.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 10 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#eff6ff', color: '#1d4ed8',
                    fontSize: 12, fontWeight: 800, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, paddingTop: 2 }}>{step}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '12px 16px', flex: 1, minWidth: 200 }}>
                <div style={{ color: '#16a34a', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>⏱ Typical Timeline</div>
                <div style={{ color: '#0f172a', fontWeight: 700, fontSize: 16 }}>{dispute.timeline}</div>
              </div>
              <div style={{ background: '#fffbeb', borderRadius: 10, padding: '12px 16px', flex: 2, minWidth: 280 }}>
                <div style={{ color: '#d97706', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>💡 How to Protect Yourself</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>{dispute.tip}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 48, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0f172a', fontSize: 17, fontWeight: 800, margin: '0 0 16px' }}>🛡️ How to Avoid Disputes Entirely</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Always confirm scope in writing before starting any work — use ProLnk’s in-platform change order tool',
              'Upload photos DURING the job — time-stamped photos carry significantly more weight than post-job submissions',
              'Communicate any issues to the homeowner in writing through the ProLnk platform (not text or phone)',
              'For photo origination: upload immediately after photographing — first verified upload wins',
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: '#f8fafc', borderRadius: 10 }}>
                <span style={{ color: '#22c55e', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #4f46e5 100%)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>📞</div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: '0 0 10px' }}>Questions About a Dispute?</h2>
          <p style={{ color: '#c7d2fe', fontSize: 15, margin: '0 0 24px', maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
            ProLnk's Partner Relations team is your advocate. No partner should navigate a dispute alone — reach out before it escalates.
          </p>
          <a
            href="/apply"
            style={{
              display: 'inline-block', background: '#fff', color: '#1e40af',
              fontWeight: 800, fontSize: 16, padding: '13px 32px',
              borderRadius: 10, textDecoration: 'none',
            }}
          >
            Become a Partner — See Full Protections →
          </a>
        </div>
      </div>
    </div>
  );
}
