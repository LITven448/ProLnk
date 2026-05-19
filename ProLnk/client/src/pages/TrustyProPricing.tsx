import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'Is TrustyPro really free for homeowners?',
    a: 'Yes, completely free. No credit card required, no hidden fees, no premium tiers. Homeowners always pay $0 to use TrustyPro.',
  },
  {
    q: 'How does TrustyPro make money if homeowners don’t pay?',
    a: 'Contractors (our "Partners") pay a monthly subscription of $149/month plus a commission on jobs they close through TrustyPro. This funds the entire platform. Homeowners never contribute to this.',
  },
  {
    q: 'What happens to my home data?',
    a: 'Your Home Health Vault data belongs to you. TrustyPro never sells your personal information. You can request deletion of your data at any time, and we will comply within 30 days per CCPA guidelines.',
  },
  {
    q: 'Can I cancel my account at any time?',
    a: 'Yes. Homeowner accounts have no commitment. You can close your account at any time and all your data will be removed from our systems within 30 days.',
  },
  {
    q: 'What’s the difference between TrustyPro and Angi or HomeAdvisor?',
    a: 'Angi charges homeowners for premium lead access ($4–10 per request). HomeAdvisor charges contractors per lead whether the job closes or not. TrustyPro charges contractors only on successful job commissions — homeowners pay nothing and contractors only pay when they win work.',
  },
];

export default function TrustyProPricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? null : i);
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
          💰 Pricing
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2, color: '#0f172a' }}>
          TrustyPro — What Does It Cost?
        </h1>

        <div style={{ backgroundColor: '#f0fdf4', border: '2px solid #16a34a', borderRadius: 12, padding: 28, marginBottom: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#15803d', marginBottom: 8 }}>
            TrustyPro is free for homeowners. Always.
          </div>
          <div style={{ color: '#166534', fontSize: 16 }}>No subscriptions, no per-lead fees, no hidden charges — ever.</div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>✅ What Homeowners Get for Free</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['🤖', 'Unlimited AI Home Scans', 'Instant visual analysis of your home’s systems and condition'],
              ['🏠', 'Home Health Vault', 'Secure permanent record of your property history, repairs, and health data'],
              ['🔔', 'Maintenance Reminders', 'Seasonal service reminders based on your home age and systems'],
              ['⛈️', 'Storm Alerts', 'Real-time severe weather notifications with damage assessment'],
              ['🔗', 'Contractor Matching', 'Get matched with vetted, background-checked local professionals'],
              ['💰', 'Group Deal Access', 'Bulk pricing from local contractors — only available through TrustyPro'],
            ].map(([icon, title, desc]) => (
              <div key={String(title)} style={{ display: 'flex', gap: 12, padding: 16, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 14, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>🏗️ How TrustyPro Makes Money</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div style={{ backgroundColor: '#fef3c7', borderRadius: 10, padding: 20, border: '1px solid #fcd34d' }}>
              <div style={{ fontWeight: 700, color: '#92400e', fontSize: 15, marginBottom: 8 }}>Partner Monthly Subscription</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#78350f', marginBottom: 4 }}>$149<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 13, color: '#92400e' }}>Paid by contractors (Partners), not homeowners</div>
            </div>
            <div style={{ backgroundColor: '#f0fdf4', borderRadius: 10, padding: 20, border: '1px solid #86efac' }}>
              <div style={{ fontWeight: 700, color: '#166534', fontSize: 15, marginBottom: 8 }}>Commission on Closed Jobs</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#15803d', marginBottom: 4 }}>% of job</div>
              <div style={{ fontSize: 13, color: '#166534' }}>Only when a job is won — zero if no work is awarded</div>
            </div>
          </div>
          <div style={{ backgroundColor: '#f0f9ff', borderRadius: 8, padding: 16, border: '1px solid #bae6fd' }}>
            <div style={{ fontWeight: 700, color: '#0369a1', marginBottom: 4 }}>Why this model works for everyone</div>
            <p style={{ color: '#0369a1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Homeowners who trust TrustyPro book more services. More bookings mean more commission revenue for TrustyPro. More value means better partner tools and homeowner features. It's a flywheel — everyone wins, and no homeowner fees are ever needed.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>📊 How We Compare</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#64748b', fontWeight: 600 }}>Platform</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#64748b', fontWeight: 600 }}>Homeowner Cost</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#64748b', fontWeight: 600 }}>Contractor Cost</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#64748b', fontWeight: 600 }}>Model</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['TrustyPro', '$0 always', '$149/mo + commission on wins', 'Commission on closed jobs'],
                  ['Angi', '$4–10/request', 'Per-lead fee', 'Lead marketplace'],
                  ['HomeAdvisor', 'Free basic', '$15–100/lead regardless of win', 'Pay per lead'],
                  ['Thumbtack', 'Free', '$3–50/quote sent', 'Pay per contact'],
                ].map(([name, hcost, ccost, model], i) => (
                  <tr key={name} style={{ backgroundColor: i === 0 ? '#f0fdf4' : i % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 14px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#15803d' : '#0f172a' }}>{name}</td>
                    <td style={{ padding: '10px 14px', color: i === 0 ? '#15803d' : '#0f172a', fontWeight: i === 0 ? 700 : 400 }}>{hcost}</td>
                    <td style={{ padding: '10px 14px', color: '#475569' }}>{ccost}</td>
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>{model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>❓ Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                <button
                  onClick={() => toggleFaq(i)}
                  style={{ width: '100%', textAlign: 'left', padding: '16px 20px', backgroundColor: openFaq === i ? '#f0f9ff' : '#f8fafc', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 15, fontWeight: 600, color: '#0f172a' }}
                >
                  {item.q}
                  <span style={{ fontSize: 18, color: '#0369a1', flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 16px', color: '#475569', lineHeight: 1.7, fontSize: 14, backgroundColor: '#f0f9ff' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f172a', borderRadius: 12, padding: 36, textAlign: 'center', border: '1px solid #1e293b' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Ready to get started?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Join thousands of DFW homeowners getting smarter home maintenance — for free.</p>
          <a
            href="/waitlist/homeowner"
            style={{ backgroundColor: '#0ea5e9', color: '#fff', textDecoration: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, display: 'inline-block' }}
          >
            Join Free Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
