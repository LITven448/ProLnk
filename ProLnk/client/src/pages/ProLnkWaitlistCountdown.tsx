import { useState } from 'react';

export default function ProLnkWaitlistCountdown() {
  const [joinWeek, setJoinWeek] = useState(1);
  const currentCount = 463;
  const charterMax = 500;
  const remaining = charterMax - currentCount;
  const projectedPosition = currentCount + joinWeek * 12;
  const isCharter = projectedPosition <= charterMax;
  const recruits = 10;
  const monthlyFee = 149;
  const charterIncome = Math.round(recruits * monthlyFee * 0.12);
  const foundingIncome = Math.round(recruits * monthlyFee * 0.06);
  const missedPerMonth = charterIncome - foundingIncome;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#ef4444', color: '#fff', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontWeight: 700, marginBottom: 16 }}>
          CHARTER CLOSING SOON
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Waitlist Countdown</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>
          Charter tier locks at exactly 500 pros. See what you gain or miss based on when you join.
        </p>

        <div style={{ background: '#111d2e', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Current waitlist</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#F5E642′ }}>{currentCount}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Charter spots left</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#ef4444′ }}>{remaining}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Charter capacity</div>
              <div style={{ fontSize: 36, fontWeight: 900 }}>{charterMax}</div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, height: 16, overflow: 'hidden' }}>
            <div style={{ background: '#F5E642', height: '100%', width: `${(currentCount / charterMax) * 100}%`, borderRadius: 8 }} />
          </div>
          <div style={{ textAlign: 'right', color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{Math.round((currentCount / charterMax) * 100)}% full</div>
        </div>

        <div style={{ background: '#111d2e', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Timing Simulator</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94a3b8′ }}>
            If you wait {joinWeek} week{joinWeek > 1 ? 's' : ''}, your estimated position: #{projectedPosition}
          </label>
          <input type="range" min={0} max={8} value={joinWeek} onChange={e => setJoinWeek(+e.target.value)}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: 20 }} />

          <div style={{ background: isCharter ? '#14532d' : '#7f1d1d', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
              {isCharter ? 'You land Charter Tier' : 'You land Founding Tier'}
            </div>
            <div style={{ color: isCharter ? '#86efac' : '#fca5a5', fontSize: 14 }}>
              {isCharter
                ? `Position #${projectedPosition} of 500 — Charter rates locked forever.`
                : `Position #${projectedPosition} misses Charter by ${projectedPosition - charterMax}. Founding tier applies.`}
            </div>
          </div>
        </div>

        {!isCharter && (
          <div style={{ background: '#1e1a06', border: '1px solid #F5E642', borderRadius: 10, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642′ }}>What Waiting Costs (per 10 recruits)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
              <div>Charter sub override: <strong>${charterIncome}/mo</strong></div>
              <div>Founding sub override: <strong>${foundingIncome}/mo</strong></div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>You miss out on</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#ef4444′ }}>${missedPerMonth}/mo</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>${missedPerMonth * 12}/yr — every year, forever</div>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 8, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Join now — Charter closes at exactly 500 pros.</div>
        </div>
      </div>
    </div>
  );
}