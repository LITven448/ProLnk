import { useState } from 'react';

export default function FoundingMembershipPage() {
  const [matchesPerMonth, setMatchesPerMonth] = useState(15);
  const [avgJobValue, setAvgJobValue] = useState(700);
  const [teamSize, setTeamSize] = useState(6);

  const foundingRate = 0.20;
  const charterRate = 0.25;
  const overrideRate = 0.04;
  const origRights = 0.01;

  const directEarnings = matchesPerMonth * avgJobValue * foundingRate;
  const teamOverride = teamSize * matchesPerMonth * avgJobValue * overrideRate;
  const origEstimate = 3 * avgJobValue * origRights;
  const total = directEarnings + teamOverride + origEstimate;
  const charterDiff = matchesPerMonth * avgJobValue * (charterRate - foundingRate);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #0a0f1e 100%)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '6px 20px', borderRadius: '999px', fontWeight: 800, fontSize: '13px', marginBottom: '24px', letterSpacing: '2px' }}>
          🏅 FOUNDING MEMBERSHIP — 100 SLOTS
        </div>
        <h1 style={{ fontSize: '46px', fontWeight: 900, color: '#60a5fa', lineHeight: 1.1, marginBottom: '20px' }}>
          The Founding Member<br />Advantage
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '580px', margin: '0 auto' }}>
          Founding Members lock in 20% commission, 4-level network overrides, and 1.0% origination rights — at $149/mo forever.
        </p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { icon: '💰', label: 'Commission Rate', value: '20%', note: 'vs 12% standard' },
            { icon: '🔒', label: 'Monthly Fee', value: '$149/mo', note: 'locked forever' },
            { icon: '🏠', label: 'Origination Rights', value: '1.0%', note: 'permanent revenue share' },
            { icon: '👥', label: 'Total Slots', value: '100', note: 'Founding positions' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#111827', border: '2px solid #3b82f6', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#60a5fa' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{stat.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: '16px', padding: '36px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#60a5fa', marginBottom: '24px', textAlign: 'center' }}>📊 Founding Member Income Projection</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Matches/month', val: matchesPerMonth, min: 5, max: 60, setter: setMatchesPerMonth },
              { label: `Avg job value ($${avgJobValue})`, val: avgJobValue, min: 200, max: 5000, step: 100, setter: setAvgJobValue },
              { label: `Network size (${teamSize} pros)`, val: teamSize, min: 0, max: 30, setter: setTeamSize },
            ].map((sl, i) => (
              <div key={i}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>{sl.label}</label>
                <input type="range" min={sl.min} max={sl.max} step={sl.step || 1} value={sl.val} onChange={e => sl.setter(+e.target.value)} style={{ width: '100%', accentColor: '#3b82f6′ }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Direct (20%)', val: `$${directEarnings.toLocaleString(undefined, {maximumFractionDigits:0})}`, color: '#60a5fa' },
              { label: 'Team Override', val: `$${teamOverride.toLocaleString(undefined, {maximumFractionDigits:0})}`, color: '#34d399′ },
              { label: 'Orig. Rights Est.', val: `$${origEstimate.toLocaleString(undefined, {maximumFractionDigits:0})}`, color: '#a78bfa' },
            ].map((r, i) => (
              <div key={i} style={{ background: '#0a0f1e', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: r.color }}>{r.val}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{r.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(96,165,250,0.1)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#60a5fa' }}>${total.toLocaleString(undefined, {maximumFractionDigits:0})}/mo</span>
            <span style={{ color: '#94a3b8', fontSize: '14px', marginLeft: '12px' }}>total estimated · Charter earns ${charterDiff.toLocaleString(undefined, {maximumFractionDigits:0})} more/mo</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/apply?tier=founding" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '18px 48px', borderRadius: '12px', fontWeight: 800, fontSize: '18px', textDecoration: 'none', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
            Apply for Founding Membership →
          </a>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '14px' }}>100 slots total · 2-minute application · No payment until launch</p>
        </div>
      </div>
    </div>
  );
}
