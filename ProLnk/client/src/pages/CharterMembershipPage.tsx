import { useState } from 'react';

export default function CharterMembershipPage() {
  const [matchesPerMonth, setMatchesPerMonth] = useState(20);
  const [avgJobValue, setAvgJobValue] = useState(800);

  const charterCommission = 0.25;
  const standardCommission = 0.12;
  const overrideTeamSize = 10;
  const overrideRate = 0.07;

  const directEarnings = matchesPerMonth * avgJobValue * charterCommission;
  const teamEarnings = overrideTeamSize * matchesPerMonth * avgJobValue * overrideRate;
  const monthlyTotal = directEarnings + teamEarnings;
  const standardMonthly = matchesPerMonth * avgJobValue * standardCommission;
  const advantage = monthlyTotal - standardMonthly;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 100%)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#f59e0b', color: '#0a0f1e', padding: '6px 20px', borderRadius: '999px', fontWeight: 800, fontSize: '13px', marginBottom: '24px', letterSpacing: '2px' }}>
          👑 CHARTER MEMBERSHIP — 25 SLOTS ONLY
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#f59e0b', lineHeight: 1.1, marginBottom: '20px' }}>
          The Most Powerful<br />Position in ProLnk
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '580px', margin: '0 auto' }}>
          Charter Members lock in the highest commission tier, the lowest price, and permanent origination rights — forever.
        </p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {[
            { icon: '💰', label: 'Commission Rate', value: '25%', note: 'vs 12% standard' },
            { icon: '🔒', label: 'Monthly Fee', value: '$149/mo', note: 'locked forever' },
            { icon: '🏠', label: 'Origination Rights', value: '1.5%', note: 'permanent revenue share' },
            { icon: '👥', label: 'Available Slots', value: '25', note: 'total Charter positions' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#111827', border: '2px solid #f59e0b', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{stat.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: '16px', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f59e0b', marginBottom: '24px', textAlign: 'center' }}>💡 Charter Income Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Matches per month: <strong style={{ color: '#f59e0b' }}>{matchesPerMonth}</strong></label>
              <input type="range" min={5} max={80} value={matchesPerMonth} onChange={e => setMatchesPerMonth(+e.target.value)} style={{ width: '100%', accentColor: '#f59e0b' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Avg job value: <strong style={{ color: '#f59e0b' }}>${avgJobValue.toLocaleString()}</strong></label>
              <input type="range" min={200} max={5000} step={100} value={avgJobValue} onChange={e => setAvgJobValue(+e.target.value)} style={{ width: '100%', accentColor: '#f59e0b' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
            {[
              { label: 'Direct (Charter 25%)', val: directEarnings, color: '#f59e0b' },
              { label: 'Team Override (7%)', val: teamEarnings, color: '#34d399′ },
              { label: 'vs Standard (12%)', val: -advantage, color: '#ef4444', prefix: '-$' },
            ].map((row, i) => (
              <div key={i} style={{ background: '#0a0f1e', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 900, color: row.color }}>{i === 2 ? `$${Math.abs(advantage).toLocaleString()}` : `$${row.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{row.label}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px', padding: '16px', background: 'rgba(245,158,11,0.1)', borderRadius: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b' }}>${monthlyTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
            <span style={{ color: '#94a3b8', fontSize: '14px', marginLeft: '12px' }}>estimated total earnings</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/apply?tier=charter" style={{ display: 'inline-block', background: '#f59e0b', color: '#0a0f1e', padding: '18px 48px', borderRadius: '12px', fontWeight: 800, fontSize: '18px', textDecoration: 'none', boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}>
            Apply for Charter Membership →
          </a>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '14px' }}>25 slots total · 2-minute application · No payment until launch</p>
        </div>
      </div>
    </div>
  );
}
