import { useState } from 'react';

const tiers = [
  {
    name: 'Charter Tier',
    max: 500,
    filled: 347,
    price: '$149/mo',
    locked: 'Locked for life at Charter rate',
    perks: ['Highest priority match ranking', 'Charter badge on profile', '25% network commission bonus', 'Founding member NFT certificate'],
    closes: 'Closes at 500 — then gone forever',
    color: '#F5E642',
  },
  {
    name: 'Founding Tier',
    max: 100,
    filled: 61,
    price: '$149/mo',
    locked: 'Same rate, secondary priority',
    perks: ['High priority match ranking', 'Founding badge on profile', '10% network commission bonus', 'Early access to new markets'],
    closes: 'Closes at 100 — limited availability',
    color: '#60a5fa',
  },
];

const tierActions = [
  {
    tier: 'Charter Tier',
    position: 'Early (under 250)',
    queue: 'You are in the top 50% of Charter applicants. Your match priority is locked in — strong position.',
    closure: 'Charter closes when the 500th application is confirmed. At current velocity: ~3 weeks.',
    accelerate: 'Share your referral link. Each confirmed referral moves you up 2 spots in match priority queue and earns you a permanent 12% subscription override on their account.',
  },
  {
    tier: 'Charter Tier',
    position: 'Late (250–499)',
    queue: 'You are in the queue but closure is imminent. Confirm your application immediately to lock your spot.',
    closure: 'Charter is nearly full. Do not delay — once 500 confirm, the tier is permanently closed.',
    accelerate: 'Refer now. If Charter closes before you confirm, referrals you made may still qualify you for Founding Tier upgrade consideration.',
  },
  {
    tier: 'Founding Tier',
    position: 'Any position',
    queue: 'Founding Tier is filling slower but has only 100 spots. You still have a window, but it is narrowing.',
    closure: 'Founding closes at 100 confirmed applications. Charter alumni get priority consideration for any reopened spots.',
    accelerate: 'Refer 2 contractors to unlock early confirmation priority. Referrals are the fastest way to accelerate your position.',
  },
];

export default function ProLnkWaitlistStatusPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⏳</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>Waitlist Status</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Two tiers. Limited spots. Once they close, the founding rate is gone forever.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 52 }}>
          {tiers.map((t, i) => {
            const pct = Math.round((t.filled / t.max) * 100);
            return (
              <div key={i} style={{ background: '#0f1f3d', border: `1px solid ${t.color}33`, borderRadius: 16, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: t.color }}>{t.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{t.locked}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{t.filled} / {t.max}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8′ }}>spots filled</div>
                  </div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, height: 10, marginBottom: 12, overflow: 'hidden' }}>
                  <div style={{ background: t.color, width: `${pct}%`, height: '100%', borderRadius: 8, transition: 'width 0.5s' }} />
                </div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 16 }}>{pct}% full &nbsp;·&nbsp; {t.closes}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {t.perks.map((p, j) => (
                    <span key={j} style={{ background: '#0A1628', border: `1px solid ${t.color}44`, borderRadius: 6, padding: '4px 12px', fontSize: 12, color: t.color }}>✓ {p}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Where do you stand?</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Select your current tier and position to get your status and next steps.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {tierActions.map((a, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '1px solid #1e3a5f',
                background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{a.tier} — {a.position}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>YOUR POSITION</div><div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{tierActions[selected].queue}</div></div>
              <div><div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>TIER CLOSURE</div><div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{tierActions[selected].closure}</div></div>
              <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>⚡ HOW TO ACCELERATE</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>{tierActions[selected].accelerate}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
