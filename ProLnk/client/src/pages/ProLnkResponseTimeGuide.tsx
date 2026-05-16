import { useState } from 'react';

const tiers = [
  { label: 'Under 15 min', color: '#22C55E', badge: '🥇 Elite', impact: 'Top 5% priority queue — first to receive every match in your area.' },
  { label: '15-30 min', color: '#84CC16', badge: '🥈 Priority', impact: 'Priority queue — ahead of 85% of pros in your market.' },
  { label: '30-60 min', color: '#F5E642', badge: '🥉 Standard', impact: 'Standard queue — competitive with most active pros.' },
  { label: '1-4 hours', color: '#F97316', badge: '⚠️ At Risk', impact: 'Deprioritized — homeowners often choose a faster responder before you are notified.' },
  { label: 'Over 4 hours', color: '#EF4444', badge: '🚫 Penalized', impact: 'Match suppressed — your profile is hidden from new leads until response rate improves.' },
];

const tips = [
  { icon: '📱', tip: 'Enable push notifications on your phone — SMS and app push both active.' },
  { icon: '🔕', tip: 'Set DND exceptions for ProLnk so alerts break through sleep or focus modes.' },
  { icon: '🌅', tip: 'Check the app first thing each morning — overnight leads assigned at 6 AM.' },
  { icon: '⏸', tip: 'Use "Pause Matches" when you are on vacation — beats a slow response penalty.' },
];

export default function ProLnkResponseTimeGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Response Time Guide</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Response time is the #1 factor in your match priority score. Here is how it works.</p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {tiers.map((t, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
              background: '#0F2035', borderLeft: `4px solid ${t.color}`,
              borderRadius: 10, padding: '16px 20px', cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>{t.label}</span>
                <span style={{ background: '#1A2F4A', borderRadius: 6, padding: '4px 12px', fontSize: 13 }}>{t.badge}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 12, color: '#B0C4D8', fontSize: 14, lineHeight: 1.6 }}>
                  📊 {t.impact}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🛠 Notification Management Tips</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {tips.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <span style={{ color: '#B0C4D8', fontSize: 14, lineHeight: 1.6 }}>{t.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}