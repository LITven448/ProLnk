import { useState } from 'react';

const portfolioTiers = [
  {
    size: '1-5 units',
    emoji: '🏠',
    timeSaved: '3 hrs/week',
    costReduction: '8%',
    benefit: 'Centralized request handling replaces phone tag with 3 different contractors. One platform, all trades, DFW-wide.',
    features: ['Single contractor network', 'Job documentation log', 'Homeowner satisfaction ratings'],
  },
  {
    size: '6-20 units',
    emoji: '🏘️',
    timeSaved: '11 hrs/week',
    costReduction: '14%',
    benefit: 'Bulk service requests processed simultaneously. Maintenance documentation auto-generated for each property. Renter satisfaction scores tracked.',
    features: ['Bulk request submission', 'Per-unit maintenance history', 'Renter communication logs'],
  },
  {
    size: '21-50 units',
    emoji: '🏢',
    timeSaved: '28 hrs/week',
    costReduction: '19%',
    benefit: 'Full portfolio view across all DFW properties. AI prioritizes urgent requests. Compliance documentation for every unit automatically maintained.',
    features: ['Portfolio dashboard', 'AI urgency prioritization', 'Compliance documentation'],
  },
  {
    size: '50+ units',
    emoji: '🌆',
    timeSaved: '60+ hrs/week',
    costReduction: '24%',
    benefit: 'Enterprise-level coordination across hundreds of units. Dedicated partner matching, SLA tracking, and cost benchmarking against DFW market rates.',
    features: ['SLA tracking per property', 'Cost benchmarking vs market', 'Dedicated support tier'],
  },
];

export default function DFWProLnkForPropertyManagers() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🗂️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>ProLnk for DFW Property Managers</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Select your portfolio size to see your estimated time savings and cost reduction</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {portfolioTiers.map((tier, i) => (
            <div key={tier.size} onClick={() => setActive(active === i ? null : i)} style={{
              background: active === i ? '#0f2a4a' : '#0d1f36',
              border: '2px solid', borderColor: active === i ? '#F5E642' : '#1e3a5f',
              borderRadius: 12, padding: '18px 22px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{tier.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, color: active === i ? '#F5E642' : '#e2e8f0', fontSize: 17 }}>{tier.size}</div>
                    <div style={{ color: '#64748b', fontSize: 13 }}>Click to see your ProLnk ROI</div>
                  </div>
                </div>
                {active !== i && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{tier.timeSaved}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>saved/week</div>
                  </div>
                )}
              </div>

              {active === i && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1e3a5f' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{tier.timeSaved}</div>
                      <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Time saved per week</div>
                    </div>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{tier.costReduction}</div>
                      <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Maintenance cost reduction</div>
                    </div>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px', lineHeight: 1.6 }}>{tier.benefit}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {tier.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#F5E642', fontSize: 14 }}>✓</span>
                        <span style={{ color: '#e2e8f0', fontSize: 14 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: '#0d1f36', borderRadius: 10, padding: 24, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 28 }}>📊</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '8px 0 4px' }}>DFW property managers report 4.8 / 5 renter maintenance satisfaction on ProLnk</p>
          <p style={{ color: '#64748b', fontSize: 13 }}>Compared to 3.1 industry average for traditional vendor coordination</p>
        </div>
      </div>
    </div>
  );
}
