import { useState } from 'react';

const TIERS = [
  { label: 'Tier 1', matches: 0, rate: 12, color: '#6B7280′ },
  { label: 'Tier 2', matches: 10, rate: 20, color: '#3B82F6′ },
  { label: 'Tier 3', matches: 50, rate: 35, color: '#8B5CF6′ },
  { label: 'Tier 4', matches: 100, rate: 50, color: '#F59E0B' },
  { label: 'Tier 5', matches: 500, rate: 70, color: '#F5E642′ },
];

const TRADES = [
  { trade: 'HVAC', avg: 3200 },
  { trade: 'Electrical', avg: 2800 },
  { trade: 'Plumbing', avg: 2400 },
  { trade: 'Roofing', avg: 6500 },
  { trade: 'Foundation', avg: 8200 },
  { trade: 'Remodeling', avg: 12000 },
];

export default function ProLnkStream1DirectCommission() {
  const [matchCount, setMatchCount] = useState(0);
  const [matchValue, setMatchValue] = useState(3000);

  const currentTier = TIERS.slice().reverse().find(t => matchCount >= t.matches) || TIERS[0];
  const nextTier = TIERS.find(t => t.matches > matchCount);
  const commission = (matchValue * currentTier.rate) / 100;
  const toNext = nextTier ? nextTier.matches - matchCount : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>STREAM 1 OF 5</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💰 Direct Commission</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Earn 12–70% of every match value. Your rate climbs as you close more jobs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 32 }}>
          {TIERS.map(t => (
            <div key={t.label} style={{ background: matchCount >= t.matches ? '#1E2D45′ : '#111B2E', border: `2px solid ${matchCount >= t.matches ? t.color : '#1E3A5F'}`, borderRadius: 10, padding: '12px 8px', textAlign: ’center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.color }}>{t.rate}%</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{t.label}</div>
              <div style={{ fontSize: 10, color: '#64748B' }}>{t.matches === 0 ? 'Start' : `${t.matches}+ matches`}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 DFW Average Match Values by Trade</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {TRADES.map(t => (
              <div key={t.trade} style={{ display: 'flex', justifyContent: 'space-between', background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                <span style={{ color: '#CBD5E1′ }}>{t.trade}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>${t.avg.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📊 Your Tier Calculator</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Total Matches Completed: {matchCount}</label>
            <input type="range" min={0} max={600} value={matchCount} onChange={e => setMatchCount(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Match Value: ${matchValue.toLocaleString()}</label>
            <input type="range" min={500} max={15000} step={100} value={matchValue} onChange={e => setMatchValue(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Current Tier</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: currentTier.color }}>{currentTier.rate}%</div>
              <div style={{ fontSize: 11, color: '#94A3B8′ }}>{currentTier.label}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Commission/Match</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>${commission.toLocaleString()}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Next Tier In</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#3B82F6′ }}>{nextTier ? `${toNext}` : ’MAX'}</div>
              <div style={{ fontSize: 11, color: '#94A3B8′ }}>{nextTier ? ’matches' : '🏆 Top Tier'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}