import { useState } from 'react';

const concerns = [
  {
    concern: 'Is this contractor legit?',
    emoji: '🪪',
    mechanism: 'License Verification',
    detail: 'We verify every trade license through state licensing boards before a contractor can accept a single job. License number, expiration date, and trade category are cross-checked and re-verified every 90 days.',
    ongoing: 'Expired licenses trigger automatic account suspension until renewed documentation is submitted.',
  },
  {
    concern: 'What if they have a criminal record?',
    emoji: '🔎',
    mechanism: 'Background Check Process',
    detail: 'Every partner undergoes a 7-year criminal background check (personal and business entity) powered by third-party screening. Sex offender registry, felony, and fraud history all checked.',
    ongoing: 'Re-screening triggered by homeowner reports or flagged behavior patterns.',
  },
  {
    concern: 'What if they damage my home?',
    emoji: '🛡️',
    mechanism: 'Insurance Confirmation',
    detail: 'General liability ($1M minimum) and workers\’ comp are verified with certificate of insurance uploaded to the platform. We contact the insurer directly to confirm active coverage.',
    ongoing: 'Policy expiration dates tracked — contractors removed from active matching 14 days before lapse.',
  },
  {
    concern: 'What if they do bad work?',
    emoji: '⭐',
    mechanism: 'Performance Monitoring',
    detail: 'Every completed job generates a homeowner review. AI flags pattern issues: response time failures, dispute frequency, review gaming attempts, and sudden rating drops after sustained performance.',
    ongoing: 'Rolling 90-day quality score used in all matches. A dropping score means fewer matches — a rising score means more.',
  },
  {
    concern: 'What if they misbehave on site?',
    emoji: '🚫',
    mechanism: 'Strike System',
    detail: 'Three-strike system for behavioral violations: Strike 1 = warning + mandatory retraining. Strike 2 = 30-day suspension. Strike 3 = permanent removal, all future match eligibility revoked.',
    ongoing: 'Serious violations (harassment, fraud, theft) result in immediate removal regardless of strike count.',
  },
  {
    concern: 'Who handles disputes?',
    emoji: '⚖️',
    mechanism: 'Dispute Resolution',
    detail: 'Dedicated dispute team reviews all complaints within 24 hours. Homeowner and contractor both submit documentation. ProLnk mediates based on evidence — photo uploads, invoices, and contract terms.',
    ongoing: 'Dispute patterns inform contractor scoring. High dispute rates trigger proactive monitoring.',
  },
];

export default function ProLnkTrustAndSafetyPage() {
  const [selected, setSelected] = useState(0);
  const item = concerns[selected];

  return (
    <div style={{ background: '#f4f7fb', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#1a56db', letterSpacing: 3, marginBottom: 12 }}>TRUST & SAFETY</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px' }}>We Vet So You Don't Have To</h1>
          <p style={{ color: '#4a5568', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Every ProLnk partner is screened before they ever see a job. Here is exactly how — and what happens if they fall short.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 36 }}>
          {concerns.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? '#0A1628' : '#fff',
                color: selected === i ? '#F5E642' : '#0A1628',
                border: '1px solid #d1dde8',
                borderRadius: 8,
                padding: '12px 10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                textAlign: 'left',
              }}
            >
              {c.emoji} {c.concern}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid #d1dde8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ fontSize: 36 }}>{item.emoji}</div>
            <div>
              <div style={{ fontSize: 12, color: '#1a56db', letterSpacing: 2, marginBottom: 4 }}>TRUST MECHANISM</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{item.mechanism}</div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#4a5568', letterSpacing: 2, marginBottom: 10 }}>HOW IT WORKS</div>
            <p style={{ color: '#2d3748', lineHeight: 1.7, margin: 0 }}>{item.detail}</p>
          </div>
          <div style={{ background: '#f4f7fb', borderRadius: 10, padding: 18, borderLeft: '4px solid #0A1628' }}>
            <div style={{ fontSize: 12, color: '#1a56db', letterSpacing: 2, marginBottom: 8 }}>🔄 ONGOING ENFORCEMENT</div>
            <p style={{ color: '#2d3748', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{item.ongoing}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
