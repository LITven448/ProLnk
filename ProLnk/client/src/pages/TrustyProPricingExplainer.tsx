import { useState } from 'react';

export default function TrustyProPricingExplainer() {
  const [activeTab, setActiveTab] = useState<'homeowners' | 'funded'>('homeowners');

  const freeFeatures = [
    { icon: '📱', title: 'Unlimited AI Home Scans', desc: 'Scan any room, any system, any time. AI identifies issues, estimates costs, and prioritizes repairs.' },
    { icon: '🏛️', title: 'Home Health Vault', desc: 'Permanent property record that travels with you across homes. Insurers, buyers, and contractors trust Vault data.' },
    { icon: '📅', title: 'Maintenance Reminders', desc: 'Seasonal guides and personalized reminders based on your specific home, age, and climate zone.' },
    { icon: '⛈️', title: 'Storm Alerts by ZIP Code', desc: 'Real-time alerts when severe weather is heading to your property. Know before the damage happens.' },
    { icon: '✅', title: 'Vetted Contractor Matching', desc: 'Get matched with background-checked, licensed, insured contractors. No cold calling random companies.' },
    { icon: '💰', title: 'Group Deal Access', desc: 'Group buying power for common services (HVAC tune-ups, pest control, roof inspections) at negotiated rates.' },
    { icon: '📈', title: 'Home Value Monitoring', desc: 'Powered by ATTOM data. Track your home’s estimated value alongside maintenance investment and ROI.' },
  ];

  const howItsFunded = [
    { icon: '🔧', title: 'Partner Subscriptions', desc: 'Home service professionals pay $149/month to join the ProLnk network and receive qualified leads. This is our primary revenue source.', amount: '$149/mo per partner' },
    { icon: '✅', title: 'Job Completion Commission', desc: 'When a homeowner books and completes a job through TrustyPro, ProLnk earns a commission on the completed work. Homeowners pay exactly what the contractor quotes.', amount: 'Commission on jobs' },
    { icon: '🤝', title: 'No Homeowner Markup', desc: 'Homeowners pay exactly what contractors charge. ProLnk earns from contractors, not by adding fees on top of homeowner invoices.', amount: '$0 added to your bill' },
  ];

  const comparisons = [
    { platform: 'Angi', homeownerFee: '$5-10/service request', contractorFee: '$15-85/lead', transparency: 'Low', freeForHomeowners: false },
    { platform: 'HomeAdvisor', homeownerFee: 'Hidden (baked in)', contractorFee: '$15-85/lead', transparency: 'Low', freeForHomeowners: false },
    { platform: 'Thumbtack', homeownerFee: 'Varies', contractorFee: '$5-75/lead', transparency: 'Medium', freeForHomeowners: false },
    { platform: 'TrustyPro', homeownerFee: '$0 — guaranteed', contractorFee: '$149/mo subscription', transparency: 'Full', freeForHomeowners: true },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#0369a1', fontWeight: 600, letterSpacing: 1 }}>
          💡 HOW TRUSTYPRO WORKS
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: '#0f172a' }}>
          TrustyPro Pricing
        </h1>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 40, lineHeight: 1.7 }}>
          How We Keep It Free for Homeowners
        </p>

        <div style={{ background: '#dcfce7', borderRadius: 16, padding: 32, marginBottom: 40, textAlign: 'center', border: '2px solid #86efac' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#14532d', marginBottom: 12 }}>$0.00 for Homeowners</h2>
          <p style={{ fontSize: 17, color: '#166534', lineHeight: 1.7, maxWidth: 540, margin: '0 auto', marginBottom: 0 }}>
            TrustyPro is completely free for homeowners, forever. No hidden fees, no premium tiers, no payment required — ever.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0′ }}>
          {[
            { key: 'homeowners', label: '🏠 What Homeowners Get' },
            { key: 'funded', label: '💰 How It’s Funded' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'homeowners' | 'funded')}
              style={{
                flex: 1, padding: '14px 20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                background: activeTab === tab.key ? '#0284c7′ : ’white',
                color: activeTab === tab.key ? 'white' : '#64748b',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'homeowners' && (
          <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
            {freeFeatures.map(item => (
              <div key={item.title} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6, fontSize: 16 }}>{item.title}</div>
                  <div style={{ color: '#64748b', lineHeight: 1.6, fontSize: 15 }}>{item.desc}</div>
                </div>
                <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 13, marginLeft: 'auto', flexShrink: 0, alignSelf: 'flex-start', background: '#f0fdf4', padding: '4px 10px', borderRadius: 6 }}>FREE</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'funded' && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
              {howItsFunded.map(item => (
                <div key={item.title} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 16 }}>{item.title}</div>
                      <div style={{ color: '#0284c7', fontWeight: 700, fontSize: 13, marginLeft: 16, flexShrink: 0, background: '#e0f2fe', padding: '4px 10px', borderRadius: 6 }}>{item.amount}</div>
                    </div>
                    <div style={{ color: '#64748b', lineHeight: 1.6, fontSize: 15 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 24, borderLeft: '4px solid #22c55e' }}>
              <h3 style={{ fontWeight: 700, color: '#14532d', marginBottom: 12 }}>Why This Model Works</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  'Homeowners who use TrustyPro book 3x more services than those who don’t',
                  'More bookings = more commission = sustainable platform without homeowner fees',
                  'Partners earn more from better-educated, higher-trust homeowners who understand their home’s needs',
                  'Homeowner trust is worth more to TrustyPro than any fee we could charge',
                ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12 }}>
                    <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#166534', fontSize: 15, lineHeight: 1.5 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>📊 How TrustyPro Compares</h2>
        <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1f5f9′ }}>
                {['Platform', 'Homeowner Fee', 'Contractor Fee', 'Transparency', 'Free for Homeowners'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#475569', fontSize: 12, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={row.platform} style={{ borderTop: '1px solid #e2e8f0', background: row.platform === 'TrustyPro' ? '#f0fdf4′ : i % 2 === 0 ? ’white' : '#f8fafc' }}>
                  <td style={{ padding: '14px 16px', fontWeight: row.platform === 'TrustyPro' ? 800 : 600, color: row.platform === 'TrustyPro' ? '#059669′ : '#0f172a', fontSize: 14 }}>{row.platform}</td>
                  <td style={{ padding: '14px 16px', color: row.freeForHomeowners ? '#059669′ : '#dc2626', fontSize: 13, fontWeight: row.freeForHomeowners ? 700 : 400 }}>{row.homeownerFee}</td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontSize: 13 }}>{row.contractorFee}</td>
                  <td style={{ padding: '14px 16px', color: row.transparency === 'Full' ? '#059669′ : '#f59e0b', fontSize: 13, fontWeight: row.transparency === ’Full' ? 700 : 400 }}>{row.transparency}</td>
                  <td style={{ padding: '14px 16px', fontSize: 18 }}>{row.freeForHomeowners ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
            ❓ "Will it ever cost money for homeowners?"
          </h3>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>
            We've committed to keeping TrustyPro free for homeowners. Our business model works without homeowner fees, and homeowner trust is our most valuable asset. Charging homeowners would undermine the trust that makes the entire platform work.
          </p>
          <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: 15, margin: 0 }}>
            The ProLnk network of contractors funds the platform because they get value from it — quality leads, verified homeowners, and a trust layer that helps them close jobs. That alignment of incentives is why both sides win.
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0c4a6e, #075985)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>Join TrustyPro Free Today</h3>
          <p style={{ color: '#bae6fd', marginBottom: 24, lineHeight: 1.6 }}>
            Get your Home Health Vault, AI scans, storm alerts, and vetted contractor matching — all at no cost, forever.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#22c55e', color: '#0f172a', fontWeight: 800, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}>
            Join as a Homeowner — Free
          </a>
        </div>

      </div>
    </div>
  );
}
