import { useState } from 'react';

const recentDeals = [
  { date: 'May 2026', zip: '75034', service: 'HVAC Pre-Season Tune-Up', homes: 14, groupPrice: 89, regularPrice: 149 },
  { date: 'April 2026', zip: '75002', service: 'Pest Control Treatment', homes: 9, groupPrice: 72, regularPrice: 110 },
  { date: 'March 2026', zip: '75035', service: 'Gutter Cleaning', homes: 6, groupPrice: 140, regularPrice: 210 },
];

const steps = [
  { emoji: '🤖', title: 'AI Detects Shared Needs', desc: 'AI scans neighborhood data and identifies homes with similar upcoming needs — like 8+ year-old HVAC units in the same ZIP code.' },
  { emoji: '📲', title: 'Homeowners Get Notified', desc: 'All eligible homeowners in the area receive a group deal offer with the group price and how many neighbors have already joined.' },
  { emoji: '🤝', title: '5+ Homeowners Opt In', desc: 'When 5 or more homeowners accept, the deal is locked and a vetted contractor is dispatched to complete all jobs.' },
  { emoji: '💰', title: 'Everyone Saves', desc: 'Each homeowner receives the group discount automatically. No negotiating. No chasing quotes.' },
];

export default function TrustyProGroupDeals() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>💡 TrustyPro Features</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
            TrustyPro Group Deals
          </h1>
          <p style={{ fontSize: 18, color: '#475569', margin: 0 }}>
            Save 15–25% when neighbors book together — powered by neighborhood AI
          </p>
        </div>

        {/* Savings Banner */}
        <div style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: 14, padding: 28, marginBottom: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏘️</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>15–25% Average Savings</div>
          <div style={{ fontSize: 16, opacity: 0.85 }}>When 5+ neighbors book the same service together</div>
        </div>

        {/* How It Works */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: 20 }}>⚙️ How Group Deals Work</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {steps.map((step, i) => (
              <div key={i} onClick={() => setActiveStep(activeStep === i ? null : i)}
                style={{ background: activeStep === i ? '#eff6ff' : '#f8fafc', borderRadius: 10, padding: '16px 20px', cursor: 'pointer', border: `2px solid ${activeStep === i ? '#3b82f6' : 'transparent'}`, transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: activeStep === i ? '#3b82f6' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, transition: 'background 0.2s' }}>{step.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, background: activeStep === i ? '#3b82f6' : '#94a3b8', color: '#fff', padding: '2px 8px', borderRadius: 12 }}>Step {i + 1}</span>
                      {step.title}
                    </div>
                    {activeStep === i && <div style={{ fontSize: 14, color: '#475569', marginTop: 8, lineHeight: 1.6 }}>{step.desc}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { emoji: '🏠', title: 'Homeowners Get', items: ['15–25% avg savings', 'Pre-vetted contractor', 'Coordinated scheduling', 'No individual negotiating'] },
            { emoji: '🔨', title: 'Contractors Get', items: ['Guaranteed volume jobs', 'Reduced marketing cost', 'Efficient routing', 'Better per-job margins'] },
            { emoji: '📈', title: 'Platform Gets', items: ['Higher transaction volume', 'Community engagement', 'Viral neighborhood growth', 'Stronger retention'] },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: 12 }}>{card.title}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {card.items.map(item => (
                  <li key={item} style={{ fontSize: 14, color: '#475569', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Recent Deals */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: 4 }}>🏆 Recent DFW Group Deals</h2>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>Real deals completed in your area</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {recentDeals.map((deal, i) => {
              const savings = Math.round(((deal.regularPrice - deal.groupPrice) / deal.regularPrice) * 100);
              return (
                <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>{deal.date} · ZIP {deal.zip} · {deal.homes} homes</div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{deal.service}</div>
                    <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
                      <span style={{ textDecoration: 'line-through' }}>${deal.regularPrice} regular</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#16a34a' }}>${deal.groupPrice}</div>
                    <div style={{ fontSize: 12, background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>Save {savings}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Join */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e40af', marginTop: 0, marginBottom: 8 }}>📲 How to Join a Group Deal</h3>
          <p style={{ color: '#3b5eb6', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Group deals are available automatically in the TrustyPro app when your ZIP code has an active deal.
            You'll receive a push notification and can opt in with one tap. No searching required.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            🏘️ Join the Waitlist to Access Group Deals
          </a>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 12 }}>Available automatically in the TrustyPro app at launch.</p>
        </div>

      </div>
    </div>
  );
}
