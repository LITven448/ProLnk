import { useState } from 'react';

const CHARTER_MAX = 500;
const CURRENT_APPS = 187;
const WEEKS_ELAPSED = 3;
const APPS_PER_WEEK = Math.round(CURRENT_APPS / WEEKS_ELAPSED);

const perks = [
  { icon: '🔒', title: 'Locked Pricing', desc: '$149/mo rate locked forever — never increases regardless of platform growth.' },
  { icon: '🏆', title: 'Highest Origination Rights', desc: '1.5% origination rights on every home you bring to the platform, permanently.' },
  { icon: '⭐', title: 'Charter Badge', desc: 'Visible charter status builds trust with every partner and homeowner you recruit.' },
  { icon: '💰', title: 'Maximum Network Earnings', desc: 'Charter tier earns highest percentage at every level of the 4-level cascade.' },
  { icon: '🗳️', title: 'Founder Input', desc: 'Charter partners get a voice in platform features and market expansion decisions.' },
];

export default function PartnerCharter500Guide() {
  const [currentWeek, setCurrentWeek] = useState('');
  const remaining = CHARTER_MAX - CURRENT_APPS;
  const pct = Math.round((CURRENT_APPS / CHARTER_MAX) * 100);
  const weeksLeft = currentWeek
    ? Math.max(0, Math.round(remaining / APPS_PER_WEEK) - (parseInt(currentWeek) - WEEKS_ELAPSED))
    : null;
  const urgency = weeksLeft !== null
    ? weeksLeft <= 2 ? '🔴 Critical — likely closes within 2 weeks. Apply today.'
    : weeksLeft <= 5 ? '🟡 Elevated — roughly 5 weeks remaining at current pace.'
    : '🟢 Some runway — but momentum is accelerating. Don’t wait.'
    : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>🏅</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>Charter 500 Tracker Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>ProLnk closes the waitlist at exactly 500 Charter applications. Here is where we stand.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Charter Applications</span>
            <span style={{ color: '#F5E642', background: '#0A1628', padding: '4px 12px', borderRadius: 20, fontWeight: 700, fontSize: 15 }}>
              {CURRENT_APPS} / {CHARTER_MAX}
            </span>
          </div>
          <div style={{ background: '#E2E8F0', borderRadius: 8, height: 18, overflow: 'hidden' }}>
            <div style={{ background: '#F5E642', width: `${pct}%`, height: '100%', borderRadius: 8, transition: 'width 0.5s' }} />
          </div>
          <p style={{ color: '#64748B', margin: '10px 0 0', fontSize: 14 }}>{pct}% full — {remaining} spots remaining at this moment.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {perks.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '16px 18px', border: '1px solid #E2E8F0′ }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{p.title}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0′ }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>⏱️ Urgency Calculator</h3>
          <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
            What week are you in (from ProLnk launch)?
          </label>
          <input type='number' value={currentWeek} onChange={e => setCurrentWeek(e.target.value)}
            placeholder='e.g. 4'
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1',
              fontSize: 15, marginBottom: 16, boxSizing: 'border-box' }} />
          {urgency && (
            <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F5E642', padding: '14px 18px', borderRadius: 8 }}>
              <p style={{ color: '#92400E', margin: 0, fontWeight: 600 }}>{urgency}</p>
              {weeksLeft !== null && (
                <p style={{ color: '#78350F', margin: '8px 0 0', fontSize: 14 }}>
                  At ~{APPS_PER_WEEK} apps/week, approximately <strong>{weeksLeft} weeks</strong> remain before Charter closes.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
