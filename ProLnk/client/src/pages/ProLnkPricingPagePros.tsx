import { useState } from 'react';

const tiers = [
  {
    name: 'Charter',
    price: 149,
    badge: '🏆',
    tag: 'LOCKED FOR LIFE',
    slots: 'First 500 pros',
    matchPriority: 'Tier 1 — highest priority',
    directCommission: '12% rising to 70%',
    networkOverride: '7% / 4% / 2% / 1%',
    subscriptionOverride: '12% / 6% / 3% / 1.5%',
    originationRights: '1.5% permanent',
    highlight: true,
  },
  {
    name: 'Founding',
    price: 199,
    badge: '⭐',
    tag: 'PROS 501–2125',
    slots: 'Pros 501–2,125',
    matchPriority: 'Tier 2',
    directCommission: '10% rising to 65%',
    networkOverride: '5% / 3% / 1.5% / 0.75%',
    subscriptionOverride: '10% / 5% / 2.5% / 1.25%',
    originationRights: '1.25% permanent',
    highlight: false,
  },
  {
    name: 'L3',
    price: 249,
    badge: '🔵',
    tag: 'STANDARD',
    slots: 'Open enrollment',
    matchPriority: 'Tier 3',
    directCommission: '8% rising to 58%',
    networkOverride: '4% / 2% / 1% / 0.5%',
    subscriptionOverride: '8% / 4% / 2% / 1%',
    originationRights: '1% permanent',
    highlight: false,
  },
  {
    name: 'L4',
    price: 299,
    badge: '⚪',
    tag: 'LATE ENTRY',
    slots: 'Open enrollment',
    matchPriority: 'Tier 4 — base priority',
    directCommission: '6% rising to 50%',
    networkOverride: '3% / 1.5% / 0.75% / 0.375%',
    subscriptionOverride: '6% / 3% / 1.5% / 0.75%',
    originationRights: '0.75% permanent',
    highlight: false,
  },
];

export default function ProLnkPricingPagePros() {
  const [spotsUsed, setSpotsUsed] = useState(247);

  const getTierForSpot = (used: number) => {
    if (used < 500) return tiers[0];
    if (used < 2125) return tiers[1];
    if (used < 2525) return tiers[2];
    return tiers[3];
  };

  const yourTier = getTierForSpot(spotsUsed);
  const remaining = Math.max(0, 500 - spotsUsed);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 8 }}>PROLNK PRO MEMBERSHIP</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>Choose Your Tier.</h1>
          <p style={{ color: '#8899aa', marginTop: 8 }}>One flat monthly fee. Unlimited matches. No per-lead charges. Ever.</p>
        </div>

        <div style={{ background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 12 }}>⏰ CHARTER TIER CLOSES AT 500 SPOTS</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{remaining} spots remaining</div>
          <input type='range' min={0} max={600} value={spotsUsed} onChange={e => setSpotsUsed(Number(e.target.value))}
            style={{ width: '80%', marginTop: 16, accentColor: '#F5E642′ }} />
          <div style={{ marginTop: 12, fontSize: 14, color: '#ccc' }}>
            If you join now ({spotsUsed} pros already in): <strong style={{ color: '#F5E642′ }}>{yourTier.name} Tier — ${yourTier.price}/mo</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {tiers.map(t => (
            <div key={t.name} style={{
              background: t.highlight ? '#1a2f1a' : '#0d1f3c',
              border: `2px solid ${t.highlight ? '#F5E642' : '#1e3a5f'}`,
              borderRadius: 12, padding: 24,
            }}>
              <div style={{ fontSize: 28 }}>{t.badge}</div>
              <div style={{ fontSize: 11, color: '#F5E642', letterSpacing: 2, marginTop: 8 }}>{t.tag}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 4px' }}>{t.name}</h2>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642′ }}>${t.price}<span style={{ fontSize: 14, fontWeight: 400, color: '#aaa' }}>/mo</span></div>
              <div style={{ marginTop: 16, fontSize: 12, color: '#aaa', lineHeight: 1.8 }}>
                <div>🎯 {t.matchPriority}</div>
                <div>💰 {t.directCommission}</div>
                <div>🔗 Override: {t.networkOverride}</div>
                <div>📋 Sub Override: {t.subscriptionOverride}</div>
                <div>🏠 Origination: {t.originationRights}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: '#0d1f3c', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#aaa' }}>All tiers include: unlimited job matches, network income system access, cancel anytime (30-day notice)</div>
          <button style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 40px', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Join Charter Tier — Lock In $149/mo Forever
          </button>
        </div>
      </div>
    </div>
  );
}
