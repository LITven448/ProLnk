import { useState } from 'react';

const faqs = [
  {
    q: 'Will my insurer see my scan data?',
    a: 'No — absolutely not. TrustyPro scan data is never shared with insurance companies, brokers, or underwriters. We built this policy into our infrastructure: our systems have no integration with any insurance data networks. Your scan cannot be used to raise your premiums.',
  },
  {
    q: 'Can the government access my property data?',
    a: 'Only with a valid court order or legal process — the same standard that applies to your phone records. We will notify you of any such request unless legally prohibited from doing so, and we will challenge overly broad requests.',
  },
  {
    q: 'What do pros actually see about my home?',
    a: 'Pros only see the zones you choose to share and the specific condition flags relevant to their trade. A plumber sees plumbing data — not your roof score or foundation report. You control each share individually.',
  },
  {
    q: 'How do I delete my data?',
    a: 'Go to Account → Privacy → Delete All Data. Your scans, photos, and health scores are permanently deleted within 72 hours. We retain only your email address for the mandatory 30-day grace period, then that too is purged.',
  },
  {
    q: 'Is TrustyPro CCPA compliant?',
    a: 'Yes. California residents can request a full copy of all data we hold, request deletion, and opt out of any sale (we don\’t sell data, but the opt-out is available regardless). We honor these rights for all users, not just California residents.',
  },
];

const prosVsPrivate: { category: string; prosee: string; staysprivate: string }[] = [
  { category: 'Roof condition', prosee: 'Condition score + detected issues', staysprivate: 'Scan photos (unless you share)' },
  { category: 'Foundation', prosee: 'Flagged cracks / moisture risk', staysprivate: 'Exact measurement data' },
  { category: 'HVAC', prosee: 'Age estimate + efficiency flag', staysprivate: 'System serial numbers' },
  { category: 'Interior', prosee: 'Water stain / mold risk flags', staysprivate: 'Room-by-room photos' },
  { category: 'Your identity', prosee: 'First name + service zip', staysprivate: 'Full name, address, phone' },
  { category: 'Job history', prosee: 'Nothing — ever', staysprivate: 'All job records' },
];

export default function TrustyProPrivacyFirst() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: '#050d1a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🔒</div>
          <div style={{ background: '#4F46E5', display: 'inline-block', borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>PRIVACY FIRST</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>Your Home Data<br /><span style={{ color: '#4F46E5' }}>Belongs to You</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>TrustyPro was designed from the ground up so homeowners — not platforms, not insurers, not anyone else — own and control their property data.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 80 }}>
          {[
            { icon: '🙋', title: 'You Own It', desc: 'Scan data, photos, and health scores are legally yours. TrustyPro holds it in trust at your direction.' },
            { icon: '🚫', title: 'Never Sold', desc: 'We don\’t sell, license, or broker your property data to any third party. Period.' },
            { icon: '🏥', title: 'Not for Insurance', desc: 'Your scan data cannot be used by insurers to raise premiums. This is a hard technical and contractual block.' },
            { icon: '🗑️', title: 'Delete Anytime', desc: 'Permanently delete all your data in two clicks. Gone within 72 hours, no questions asked.' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{b.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>What Pros See vs. What Stays Private</h2>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>You choose what to share. Here's the default breakdown:</p>
        <div style={{ overflowX: 'auto', marginBottom: 80 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Category', '✅ Pro Sees', '🔒 Stays Private'].map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'left', background: '#0f1e35', color: i === 1 ? '#4ade80' : i === 2 ? '#FACC15' : '#94a3b8', borderBottom: '1px solid #1e3a5f', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prosVsPrivate.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#050d1a' : '#080f1c' }}>
                  <td style={{ padding: '12px 16px', color: '#e2e8f0', fontWeight: 600 }}>{row.category}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{row.prosee}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{row.staysprivate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Privacy FAQ</h2>
        <div style={{ marginBottom: 80 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: 12, marginBottom: 12, border: '1px solid #1e3a5f', overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '20px 24px', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {faq.q}
                <span style={{ color: '#4F46E5', fontSize: 20, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px', color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 20, padding: 40, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#4F46E5', fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>COMPLIANCE</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['CCPA Compliant', 'GDPR Ready', 'SOC 2 Type II (in progress)', 'No Insurance Data Sharing', 'End-to-End Encrypted'].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#e2e8f0' }}>
                <span style={{ color: '#4ade80' }}>✓</span> {c}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
