import { useState } from 'react';

export default function ProLnkGuaranteeExplainer() {
  const [concern, setConcern] = useState('');

  const concerns = [
    { id: 'quality', label: '🔧 Work Quality Issue' },
    { id: 'licensed', label: '📋 Pro Credentials' },
    { id: 'timing', label: '⏰ Completed Too Late' },
    { id: 'scope', label: '📐 Scope Changed' },
    { id: 'weather', label: '🌪️ Weather or Act of God' },
  ];

  const coverage: Record<string, { covered: boolean; icon: string; title: string; detail: string }> = {
    quality: {
      covered: true,
      icon: '✅',
      title: 'Covered by ProLnk Guarantee',
      detail: 'If workmanship issues arise within 30 days of completion, ProLnk will arrange a re-service at no charge or issue a full refund for verified quality problems. The pro is required to return within 48 hours.',
    },
    licensed: {
      covered: true,
      icon: '✅',
      title: 'Covered — Every Pro is Verified',
      detail: 'All Charter pros are verified licensed and insured before their first match. License numbers are on file. If credentials are found to be invalid, you receive a full refund and the pro is removed from the platform.',
    },
    timing: {
      covered: false,
      icon: '⚠️',
      title: 'Partial Coverage',
      detail: 'ProLnk guarantees match speed and response times but cannot guarantee specific completion dates for complex projects. If a Charter pro misses a committed deadline without notice, file a dispute for review.',
    },
    scope: {
      covered: false,
      icon: '❌',
      title: 'Not Covered if Homeowner-Directed',
      detail: 'Changes you request after the job begins fall outside the original quote and guarantee. Any scope changes should be documented in writing via in-app messaging before additional work starts.',
    },
    weather: {
      covered: false,
      icon: '❌',
      title: 'Not Covered — Acts of God',
      detail: 'Damage caused by severe weather, flooding, earthquakes, or other events outside the pro’s control are not covered. We recommend homeowners maintain a separate home warranty policy for such events.',
    },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk Service Guarantee</h1>
          <p style={{ color: '#94a3b8′ }}>We back every job. Here’s exactly what is and is not covered.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '🪪', label: 'Verified Licensed Pro' },
            { icon: '🔄', label: '30-Day Re-Service' },
            { icon: '💵', label: 'Full Refund Option' },
          ].map(item => (
            <div key={item.label} style={{ background: '#1e3a5f', borderRadius: 12, padding: '20px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>Select your concern to check guarantee coverage:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setConcern(c.id)}
              style={{ background: concern === c.id ? '#F5E642′ : '#1e3a5f', border: '2px solid #F5E642', borderRadius: 10, padding: '12px 20px', color: concern === c.id ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
              {c.label}
            </button>
          ))}
        </div>

        {concern && coverage[concern] && (
          <div style={{ background: coverage[concern].covered ? '#0d2e1a' : '#2e1a0d', border: `2px solid ${coverage[concern].covered ? '#22c55e' : '#ef4444'}`, borderRadius: 16, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{coverage[concern].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: 20, margin: 0 }}>{coverage[concern].title}</h2>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>{coverage[concern].detail}</p>
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: 40, color: '#475569', fontSize: 13 }}>Questions? All guarantee claims start in the ProLnk app under Jobs → Report Issue</p>
      </div>
    </div>
  );
}

