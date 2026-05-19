import { useState } from 'react';

const features = [
  { emoji: '📊', title: 'Real-Time Earnings Dashboard', desc: 'See all 5 income streams updating live — commission, overrides, subscriptions, origination rights' },
  { emoji: '🔔', title: 'Instant Match Notifications', desc: 'Tap to accept a matched job before other partners. Speed = priority in the algorithm' },
  { emoji: '🗺️', title: 'Territory & Lead Map', desc: 'See active homeowners in your area. Filter by trade, urgency, and job size' },
  { emoji: '🤝', title: 'Network Builder', desc: 'Manage your recruited pros, track their activity, see your cascade income in real time' },
  { emoji: '💳', title: 'Integrated Payments', desc: 'Accept payment at job completion. ProLnk handles invoicing, escrow, and payout' },
  { emoji: '🏠', title: 'Home Vault Access', desc: 'Pull the full home history before arriving — past repairs, permits, known issues' },
];

const scenarios = [
  { label: 'Starting my morning', result: 'Open app → see 3 new matches in your area → check home history for the best one → accept in 30 seconds. Day starts with a confirmed job.' },
  { label: 'Finishing a job', result: 'Tap "Complete Job" → customer gets payment prompt → funds clear in 24 hrs → commission auto-calculated across your network.' },
  { label: 'Growing my network', result: 'Share your referral link from the app → new pro signs up → you see them appear in your Network tab → cascade income activates immediately.' },
  { label: 'Checking my income', result: 'Dashboard shows this week: $1,240 direct, $340 network override, $89 subscription, $22 origination. Total: $1,691 — and it\’s only Wednesday.' },
];

export default function ProLnkMobileApp() {
  const [scenario, setScenario] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>COMING SOON</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: '0 0 16px' }}>📱 ProLnk Mobile App</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 580, margin: '0 auto' }}>
            Everything you need to run your ProLnk business from the field — in your pocket.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, marginBottom: 8 }}>🚀 App Launch Timeline</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[['Q3 2026', 'iOS Beta', 'First 500 Charter members get early access'],
              ['Q4 2026', 'Android + iOS Public', 'Full release with payment processing'],
              ['Q1 2027', 'AI Features', 'Smart scheduling, predictive match, voice control']
            ].map(([date, label, desc], i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{date}</div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, marginBottom: 20 }}>🎬 Daily Scenario Preview</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setScenario(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: scenario === i ? '#F5E642' : '#1e3a5f', color: scenario === i ? '#0A1628' : '#fff' }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Scenario: {scenarios[scenario].label}</div>
            <div style={{ color: '#fff', fontSize: 16, lineHeight: 1.6 }}>{scenarios[scenario].result}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
