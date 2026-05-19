import { useState } from 'react';

const NETWORK_TIERS = [
  { label: 'Just starting (0 in network)', value: 0, monthlyOverride: 0 },
  { label: 'Small network (10 pros)', value: 10, monthlyOverride: 420 },
  { label: 'Growing network (25 pros)', value: 25, monthlyOverride: 1050 },
  { label: 'Established (50 pros)', value: 50, monthlyOverride: 2100 },
  { label: 'Large network (100 pros)', value: 100, monthlyOverride: 4200 },
  { label: 'Scale tier (250+ pros)', value: 250, monthlyOverride: 10500 },
];

const ORIGINATION_SLIDERS = [0, 5, 10, 25, 50, 100, 200, 500];

const ANNUAL_PER_HOME = 56;
const ASSET_MULTIPLE = 36;
const SUBSCRIPTION_OVERRIDE_ANNUAL_PER_PRO = 179;

export default function DFWProLnkNetworkValueCalculator() {
  const [networkTier, setNetworkTier] = useState(2);
  const [originationHomes, setOriginationHomes] = useState(2);
  const [calculated, setCalculated] = useState(false);

  const tier = NETWORK_TIERS[networkTier];
  const monthlyOverride = tier.monthlyOverride;
  const annualOverride = monthlyOverride * 12;
  const subOverride = Math.round(tier.value * SUBSCRIPTION_OVERRIDE_ANNUAL_PER_PRO * 0.1);
  const homeCount = ORIGINATION_SLIDERS[originationHomes];
  const originationAnnual = homeCount * ANNUAL_PER_HOME;
  const totalMonthly = monthlyOverride + Math.round(subOverride / 12) + Math.round(originationAnnual / 12);
  const totalAnnual = annualOverride + subOverride + originationAnnual;
  const assetValue = Math.round(totalAnnual * ASSET_MULTIPLE);

  const breakdown = [
    { label: 'Job Match Overrides', monthly: monthlyOverride, annual: annualOverride, desc: `${tier.value} pros in network × avg job override earnings` },
    { label: 'Subscription Overrides', monthly: Math.round(subOverride / 12), annual: subOverride, desc: `10% of ${tier.value} pro subscriptions you referred ($149/mo each)` },
    { label: 'Origination Rights', monthly: Math.round(originationAnnual / 12), annual: originationAnnual, desc: `${homeCount} homes × $${ANNUAL_PER_HOME}/yr platform share — permanent` },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🌐</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>ProLnk Network Value Calculator</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>What is your ProLnk network worth as an income-producing asset?</p>
        </div>
        <div style={{ background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 17 }}>Build Your Network Profile</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>👥 Network Size (Pros in Your Downline)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
              {NETWORK_TIERS.map((t, i) => (
                <button key={i} onClick={() => { setNetworkTier(i); setCalculated(false); }}
                  style={{ background: networkTier === i ? '#1a2f50′ : '#0f1c33', border: networkTier === i ? '2px solid #F5E642' : '1px solid #2d4166', color: networkTier === i ? '#F5E642' : '#94a3b8', borderRadius: 8, padding: '10px 12px', cursor: ’pointer', fontSize: 12, textAlign: 'left', fontWeight: networkTier === i ? 700 : 400 }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>
              🏠 Origination Rights Homes: <span style={{ color: '#F5E642′ }}>{ORIGINATION_SLIDERS[originationHomes]} homes</span>
            </label>
            <input type="range" min={0} max={ORIGINATION_SLIDERS.length - 1} value={originationHomes}
              onChange={e => { setOriginationHomes(Number(e.target.value)); setCalculated(false); }}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 4 }}>
              <span>0 homes</span><span>500 homes</span>
            </div>
          </div>
          <button onClick={() => setCalculated(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '12px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            💎 Calculate Network Value
          </button>
        </div>
        {calculated && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Monthly Income', value: `$${totalMonthly.toLocaleString()}`, sub: 'Recurring override income', color: '#4ade80′ },
                { label: 'Annual Income', value: `$${totalAnnual.toLocaleString()}`, sub: 'From all 3 streams', color: '#F5E642′ },
                { label: 'Network Asset Value', value: `$${assetValue.toLocaleString()}`, sub: '36× annual income multiple', color: '#a78bfa' },
              ].map((card, i) => (
                <div key={i} style={{ background: '#111f38', border: '2px solid', borderColor: card.color, borderRadius: 12, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{card.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: card.color }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{card.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h3 style={{ color: '#F5E642', marginTop: 0, fontSize: 15 }}>Income Stream Breakdown</h3>
              {breakdown.map((row, i) => (
                <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < breakdown.length - 1 ? '1px solid #1e2d4a' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{row.label}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>{row.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#4ade80', fontWeight: 700 }}>${row.monthly.toLocaleString()}/mo</div>
                      <div style={{ color: '#94a3b8', fontSize: 12 }}>${row.annual.toLocaleString()}/yr</div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ background: '#0f1c33', borderRadius: 8, padding: 14, marginTop: 8, fontSize: 13, color: '#94a3b8′ }}>
                <strong style={{ color: '#F5E642′ }}>💡 Asset Note:</strong> Your ProLnk network generates recurring income like real estate — and origination rights are permanent. At scale, this becomes a sellable income asset.
              </div>
            </div>
          </>
        )}
        <div style={{ textAlign: 'center', padding: 20, background: '#111f38', borderRadius: 12, border: '1px solid #2d4166′ }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Start building your ProLnk network. Charter positions are limited to 500.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            🔗 Secure Your Charter Position
          </button>
        </div>
      </div>
    </div>
  );
}
