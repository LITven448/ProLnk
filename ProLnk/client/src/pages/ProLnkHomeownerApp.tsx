import { useState } from 'react';

const features = [
  { icon: '🔧', title: 'Request Vetted Service', desc: 'Submit a job in 60 seconds and receive up to 3 matched quotes from verified DFW contractors.' },
  { icon: '📍', title: 'Track Match Status', desc: 'Real-time updates on your request — matched, quote received, contractor en route, job complete.' },
  { icon: '⭐', title: 'Rate & Review', desc: 'Rate each contractor post-job. Your feedback improves match quality for every homeowner in DFW.' },
  { icon: '🏠', title: 'Home Health Vault', desc: 'Store appliance records, warranties, permits, and service history securely in your digital home file.' },
  { icon: '🔔', title: 'Maintenance Reminders', desc: 'AI-scheduled reminders for HVAC filters, water heater flushes, gutter cleans, and more.' },
  { icon: '💰', title: 'Origination Rights Income', desc: 'Share your home data and earn a recurring share of platform fees — permanently tied to your address.' },
];

const scenarios = [
  { situation: 'AC stopped working', feature: 'Request Vetted Service', detail: 'Smart Match routes your urgent HVAC request to available, top-rated contractors within your zip code. Expect quotes within 2 hours.', timeline: 'Live at launch' },
  { situation: 'Buying a home and need inspection', feature: 'Home Health Vault', detail: 'Upload the inspection report and all documents are indexed. Future contractors see your home history, saving time and money.', timeline: 'Live at launch' },
  { situation: 'Want to earn passive income', feature: 'Origination Rights Income', detail: 'Enroll your home and earn a perpetual micro-share of every service transaction tied to your address on the platform.', timeline: 'Phase 2 (Q3 2026)' },
  { situation: 'Forgetting seasonal maintenance', feature: 'Maintenance Reminders', detail: 'AI analyzes your home age, climate zone, and service history to push reminders 2 weeks before tasks are due.', timeline: 'Phase 2 (Q3 2026)' },
];

export default function ProLnkHomeownerApp() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📱</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>ProLnk Homeowner App</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Your home — managed, protected, and working for you. See what the app does when it launches.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 52 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#F5E642', marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Which feature helps your situation?</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Select a scenario to see what the app does for you.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '1px solid #1e3a5f',
                background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{s.situation}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>✅ {scenarios[selected].feature}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7, marginBottom: 10 }}>{scenarios[selected].detail}</div>
              <div style={{ display: 'inline-block', background: '#1e3a5f', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#94a3b8′ }}>
                🗓 {scenarios[selected].timeline}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
