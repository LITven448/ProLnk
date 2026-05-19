import { useState } from 'react';

const concerns = [
  { label: 'Are they licensed?', icon: '📜', prolnk: 'Every partner must submit their state license number before activation. ProLnk verifies the license against Texas TDLR and local DFW licensing databases. License status is checked at signup and rechecked quarterly.', diy: 'You can verify any contractor\’s Texas license at tdlr.texas.gov using the license number ProLnk provides.' },
  { label: 'Are they insured?', icon: '🛡️', prolnk: 'Partners must provide a certificate of insurance with minimum $1M general liability. ProLnk flags expired certificates and suspends partners who fail to renew.', diy: 'Request the certificate directly from the partner before work begins. Confirm the policy is active with the insurer listed.' },
  { label: 'Background check?', icon: '🔍', prolnk: 'All partners complete a criminal background check through a third-party screening service. Partners with felony convictions in the past 7 years are ineligible.', diy: 'Ask the partner directly about their background check policy. For sensitive access (interior work), consider requesting additional references.' },
  { label: 'What if ratings are bad?', icon: '⭐', prolnk: 'Partners with a rating below 3.8 stars receive a warning. Below 3.5 after 10+ reviews triggers automatic review. Partners can be removed from the platform.', diy: 'Leave honest ratings after every job. This directly improves match quality for every homeowner after you.' },
  { label: 'Local DFW verification?', icon: '📍', prolnk: 'Plumbers, electricians, and HVAC techs in Dallas-Fort Worth must hold the specific city or county license required. ProLnk cross-references against Dallas, Fort Worth, and Tarrant County licensing offices.', diy: 'Dallas contractor licenses can be verified at dallascityhall.com. Fort Worth licenses at fortworthtexas.gov/permitsonline.' },
];

export default function ProLnkPartnerQuality() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏅</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>How ProLnk Ensures Partner Quality</h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 540, margin: '0 auto' }}>
            Every partner on ProLnk has passed a multi-step verification process before they ever receive a match.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '📋', title: 'License Verified', desc: 'State and local trade licenses confirmed before activation and rechecked quarterly.' },
            { icon: '🛡️', title: 'Insurance Confirmed', desc: 'Minimum $1M general liability certificate required. Expired certificates auto-suspend the partner.' },
            { icon: '🔍', title: 'Background Checked', desc: 'Criminal background screening via third-party service. 7-year lookback on felony convictions.' },
            { icon: '⭐', title: 'Ratings After Every Job', desc: 'Homeowners rate each completed match. Low ratings trigger review. Consistently poor partners are removed.' },
            { icon: '📍', title: 'DFW Local License', desc: 'Dallas-Fort Worth trades require city or county licenses. ProLnk cross-references each municipality.' },
            { icon: '🚫', title: 'Removal for Performance', desc: 'Partners who miss appointments, provide false information, or receive sustained low ratings are removed.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: '#0A1628′ }}>{item.title}</div>
              <div style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#0A1628′ }}>🔎 Address Your Specific Concern</h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>Select a concern to see exactly how ProLnk addresses it — and how you can verify it yourself.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {concerns.map((c, i) => (
              <button key={c.label} onClick={() => setSelected(i)} style={{ padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '2px solid #ddd', background: selected === i ? '#0A1628' : '#fff', color: selected === i ? '#F5E642' : '#333', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#f0fff4', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#27ae60′ }}>✅ What ProLnk Does</div>
                <div style={{ color: '#333', fontSize: 15, lineHeight: 1.6 }}>{concerns[selected].prolnk}</div>
              </div>
              <div style={{ background: '#fff8e1', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#e67e22′ }}>🔧 What You Can Verify Yourself</div>
                <div style={{ color: '#333', fontSize: 15, lineHeight: 1.6 }}>{concerns[selected].diy}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
