import { useState } from 'react';

const CONCERNS = [
  {
    label: 'Background checks',
    prolnk: 'Every contractor runs through criminal history screening, sex offender registry check, and identity verification before activation. This is not optional.',
    responsibility: 'ProLnk handles all of this — you never need to verify credentials yourself.',
  },
  {
    label: 'License verification',
    prolnk: 'We confirm active state licensing for every trade — plumbing, electrical, HVAC, roofing — before a contractor joins the network.',
    responsibility: 'Homeowner responsibility: confirm permits are pulled for work that requires them. ProLnk verifies license status, not project-level permits.',
  },
  {
    label: 'Insurance verification',
    prolnk: 'General liability and workers compensation certificates are reviewed and confirmed during onboarding. Expired or lapsed insurance triggers automatic suspension.',
    responsibility: 'Homeowner note: always confirm the contractor has current coverage on the day work begins. Insurance can lapse.',
  },
  {
    label: 'Damage or disputes',
    prolnk: 'ProLnk has a structured dispute workflow. File a complaint through the platform and our team mediates between you and the contractor.',
    responsibility: 'For major damage claims, homeowners may also need to file with the contractor\’s insurer directly. ProLnk can facilitate documentation.',
  },
  {
    label: 'Contractor ratings',
    prolnk: 'Every completed job generates a performance score. Low scores reduce match priority. Repeated complaints trigger manual review and potential removal.',
    responsibility: 'Your reviews matter — rate every job honestly. This protects the next homeowner.',
  },
  {
    label: 'Unvetted platforms',
    prolnk: 'ProLnk\’s vetting removes contractors who fail background checks, have lapsed licenses, or carry insufficient insurance — none of that filtering exists on Google or Nextdoor.',
    responsibility: 'When using unvetted platforms, homeowners assume the full risk of hiring an unscreened contractor.',
  },
];

const CHECKS = [
  { emoji: '🔍', label: 'Criminal Background', detail: 'Multi-state criminal history search including felony and misdemeanor records' },
  { emoji: '📋', label: 'Sex Offender Registry', detail: 'National sex offender registry cross-check — mandatory for all applicants' },
  { emoji: '🪪', label: 'Identity Verification', detail: 'Government-issued ID and SSN verification to confirm the applicant is who they claim to be' },
  { emoji: '📜', label: 'Trade License', detail: 'Active state license confirmed in the applicable trade at time of onboarding and annually' },
  { emoji: '🛡️', label: 'General Liability', detail: 'Minimum $1M general liability insurance certificate required — coverage for property damage and injury' },
  { emoji: '👷', label: "Workers' Compensation", detail: 'Active workers\’ comp policy required for any contractor with employees' },
];

const DISPUTE_STEPS = [
  { step: 'File through ProLnk', desc: 'Submit your complaint directly through the platform with documentation and photos.' },
  { step: 'ProLnk reviews', desc: 'Our team contacts both parties within 24 hours to gather facts and assess the situation.' },
  { step: 'Mediation', desc: 'ProLnk mediates a resolution — refund, rework, or escalation to formal dispute.' },
  { step: 'Escalation if needed', desc: 'For unresolved claims, we provide documentation to support homeowner insurance or legal claims.' },
];

export default function ProLnkSafety() {
  const [selectedConcern, setSelectedConcern] = useState(0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>ProLnk Safety and Trust Guide</h1>
          <p style={{ fontSize: 16, color: '#6B7280' }}>How we protect you, what we verify, and what is still your responsibility as a homeowner</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>What Every Contractor Goes Through</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {CHECKS.map((c, i) => (
              <div key={i} style={{ backgroundColor: '#F0FDF4', borderRadius: 10, padding: 16, borderLeft: '3px solid #10B981' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{c.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#065F46', marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What Is Your Concern?</h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Select a topic to see how ProLnk addresses it and what remains your responsibility:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {CONCERNS.map((c, i) => (
              <button key={i} onClick={() => setSelectedConcern(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selectedConcern === i ? '#F5E642' : '#E5E7EB',
                  backgroundColor: selectedConcern === i ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#F0FDF4', borderRadius: 10, padding: 18, borderLeft: '4px solid #10B981', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#065F46', marginBottom: 6 }}>✅ How ProLnk Handles This</div>
            <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.7 }}>{CONCERNS[selectedConcern].prolnk}</p>
          </div>
          <div style={{ backgroundColor: '#FFF7ED', borderRadius: 10, padding: 18, borderLeft: '4px solid #F59E0B' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 6 }}>⚠️ Homeowner Responsibility</div>
            <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.7 }}>{CONCERNS[selectedConcern].responsibility}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>If Something Goes Wrong — Dispute Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DISPUTE_STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', backgroundColor: '#F9FAFB', borderRadius: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 3 }}>{s.step}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 16, padding: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Trust Starts Before the Job Does</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 24 }}>Join the ProLnk homeowner waitlist — background-checked pros only, free for homeowners.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Join Free Waitlist →
          </button>
        </div>
      </div>
    </div>
  );
}
