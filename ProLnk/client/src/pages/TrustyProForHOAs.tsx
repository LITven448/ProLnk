import { useState } from 'react';

const tiers = [
  { label: 'Under 100 Units', price: '$299/mo', features: ['Community health dashboard', 'Anonymized aggregate data', 'Up to 3 preferred vendors', 'Monthly report'] },
  { label: '100–500 Units', price: '$599/mo', features: ['Full community dashboard', 'Detailed health analytics', 'Unlimited preferred vendors', 'Group deal coordination', 'Dedicated HOA liaison'] },
];

const benefits = [
  { icon: '📊', title: 'Community-Wide Health Monitoring', desc: 'Anonymized, aggregate data across your community shows health trends — aging roofs, HVAC system age, deferred maintenance patterns — so you can get ahead of community-wide issues before they become emergencies.' },
  { icon: '🏘️', title: 'Exterior Compliance Assistance', desc: "TrustyPro's AI detects exterior issues — paint condition, roof wear, landscaping violations, gutter issues — during property scans. HOAs get a compliance flag queue, not a lawsuit." },
  { icon: '🔧', title: 'Preferred Contractor Network', desc: 'List your HOA-approved contractors as TrustyPro Preferred Vendors. When homeowners search for service in your community, your vetted list appears first.' },
  { icon: '🤝', title: 'Group Deal Coordination', desc: 'Coordinate community-wide services — bulk roof inspections, pest control contracts, exterior painting bids. TrustyPro’s platform handles scheduling coordination and homeowner opt-in.' },
  { icon: '💰', title: 'Property Value Protection', desc: 'Homes with TrustyPro health records sell faster and for measurably more. When even 20% of homes in your community carry verified health records, the whole community’s comp values improve.' },
];

export default function TrustyProForHOAs() {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <div style={{ background: '#f9fafb', color: '#111827', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ background: '#ede9fe', borderRadius: 12, padding: '12px 20px', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span>🏘️</span>
          <span style={{ color: '#7c3aed', fontWeight: 600, fontSize: 14 }}>TrustyPro for Communities</span>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: '#111827' }}>
          TrustyPro for HOA Communities
          <span style={{ display: 'block', color: '#7c3aed' }}>Manage Your Neighborhood's Home Health</span>
        </h1>

        <p style={{ color: '#4b5563', fontSize: 18, lineHeight: 1.7, marginBottom: 20 }}>
          HOAs enforce exterior standards — but they can't inspect interior maintenance. Deferred maintenance inside homes creates liability, reduces property values, and leads to costly emergency repairs that affect the whole community.
        </p>

        <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: 12, padding: 20, marginBottom: 50 }}>
          <strong>The blind spot:</strong> You enforce the paint color and landscaping. But the roof that's 18 years past replacement? The HVAC systems on 40 homes that haven't been serviced in 5 years? You have no visibility — until there's a problem.
        </div>

        {/* Benefits */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, color: '#111827' }}>How TrustyPro Helps HOAs</h2>
        <div style={{ display: 'grid', gap: 20, marginBottom: 60 }}>
          {benefits.map(b => (
            <div key={b.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, display: 'flex', gap: 20 }}>
              <div style={{ fontSize: 36, flexShrink: 0 }}>{b.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{b.title}</div>
                <p style={{ color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Eligibility */}
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: 28, marginBottom: 50 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#166534', marginBottom: 12 }}>✅ Partnership Eligibility</h3>
          <p style={{ color: '#166534', lineHeight: 1.7, margin: 0 }}>
            HOA communities with <strong>50 or more units</strong> qualify for the TrustyPro Community Dashboard. Individual homeowners always use TrustyPro for free — HOA management access is the paid tier.
          </p>
        </div>

        {/* Pricing */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: '#111827' }}>Community Dashboard Pricing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 16 }}>
          {tiers.map((tier, i) => (
            <div
              key={tier.label}
              onClick={() => setActiveTier(i)}
              style={{
                background: activeTier === i ? '#7c3aed' : '#fff',
                border: '2px solid ' + (activeTier === i ? '#7c3aed' : '#e5e7eb'),
                borderRadius: 16,
                padding: 28,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 18, color: activeTier === i ? '#fff' : '#111827', marginBottom: 4 }}>{tier.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: activeTier === i ? '#ede9fe' : '#7c3aed', marginBottom: 20 }}>{tier.price}</div>
              {tier.features.map(f => (
                <div key={f} style={{ color: activeTier === i ? '#ede9fe' : '#4b5563', marginBottom: 8, fontSize: 14 }}>✓ {f}</div>
              ))}
            </div>
          ))}
        </div>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 50 }}>Individual homeowners: always free. Community management access requires a subscription.</p>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', borderRadius: 16, padding: 40, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>📬</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Start an HOA Partnership</h3>
          <p style={{ color: '#ede9fe', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Contact us directly to discuss your community's needs. We'll set up a pilot at no cost for the first 30 days.
          </p>
          <a href="mailto:hello@prolnk.xyz?subject=HOA Partnership Inquiry" style={{ display: 'inline-block', background: '#fff', color: '#7c3aed', fontWeight: 700, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>
            Email Us to Get Started →
          </a>
        </div>
      </div>
    </div>
  );
}
