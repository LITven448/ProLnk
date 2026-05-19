import { useState } from 'react';

const scenarios = [
  {
    label: 'Homeowner with deferred maintenance',
    emoji: '🏚️',
    benefit: 'Fewer Claims at Renewal',
    integration: 'Refer to ProLnk for repairs',
    detail: 'Deferred maintenance is the top driver of homeowner claims in DFW. ProLnk gets policyholders connected to vetted contractors before problems become claims. Maintained homes = lower loss ratios = better renewal rates for you.',
  },
  {
    label: 'New policyholder onboarding',
    emoji: '📋',
    benefit: 'Value-Add Differentiator',
    integration: 'ProLnk welcome bundle',
    detail: 'Include a ProLnk membership in your new policyholder welcome kit. It signals that you care about the home, not just the premium. Sets you apart from every other agent at renewal time.',
  },
  {
    label: 'High-value home policy',
    emoji: '🏰',
    benefit: 'Verified Contractor Quality',
    integration: 'Origination rights registration',
    detail: 'High-value homes in DFW need quality contractors. ProLnk partners are licensed, insured, and background-checked. Register the home to earn origination rights on every service job.',
  },
  {
    label: 'Rental property insured',
    emoji: '🏘️',
    benefit: 'Landlord Maintenance Compliance',
    integration: 'PM portfolio sync',
    detail: 'Landlords who use ProLnk maintain better documentation of repairs — critical for liability claims. You can recommend ProLnk as part of a landlord risk management package.',
  },
  {
    label: 'Post-claim repair coordination',
    emoji: '🔧',
    benefit: 'Faster Claim Resolution',
    integration: 'Contractor referral at claim time',
    detail: 'After a claim is approved, policyholders often struggle to find contractors fast. Referring ProLnk at claim time reduces your open-claim days and improves policyholder satisfaction scores.',
  },
];

export default function DFWProLnkForInsuranceAgents() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>ProLnk for DFW Insurance Agents</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Maintained homes file fewer claims. ProLnk helps your policyholders maintain.</p>
        </div>

        <div style={{ background: '#0d1f36', borderRadius: 10, padding: 20, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            The best insurance claim is the one that never happens. ProLnk connects DFW homeowners to vetted contractors before small issues become major losses. Insurance agents who recommend ProLnk reduce claims, improve retention, and earn origination income. Select a scenario.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {scenarios.map((s, i) => (
            <div key={s.label} onClick={() => setActive(active === i ? null : i)} style={{
              background: active === i ? '#0f2a4a' : '#0d1f36',
              border: '1px solid', borderColor: active === i ? '#F5E642′ : '#1e3a5f',
              borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{s.emoji}</span>
                <span style={{ fontWeight: 700, color: active === i ? '#F5E642′ : '#e2e8f0', fontSize: 15 }}>{s.label}</span>
              </div>
              {active === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e3a5f' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>INSURANCE BENEFIT</div>
                      <div style={{ color: '#e2e8f0', fontSize: 14 }}>{s.benefit}</div>
                    </div>
                    <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>HOW TO USE PROLNK</div>
                      <div style={{ color: '#e2e8f0', fontSize: 14 }}>{s.integration}</div>
                    </div>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{s.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['23% fewer claims', 'for maintained homes on ProLnk'], ['Permanent income', 'from origination rights per insured home']].map(([val, label]) => (
            <div key={label} style={{ background: '#0d1f36', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 6 }}>{val}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
