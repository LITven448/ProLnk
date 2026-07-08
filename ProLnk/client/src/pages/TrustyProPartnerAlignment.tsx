import { useState } from 'react';

const platforms = [
  { name: 'Angi', icon: '😤', homeownerProblem: 'Pays for leads they never wanted', partnerProblem: 'Pays for leads that don’t convert', model: 'Pay-per-lead chaos' },
  { name: 'HomeAdvisor', icon: '😤', homeownerProblem: 'Same as Angi — same parent company', partnerProblem: 'Same lead quality issues, same model', model: 'Race to the bottom' },
  { name: 'Thumbtack', icon: '😤', homeownerProblem: 'Overwhelmed by competing bids', partnerProblem: 'Forced to compete on price, not quality', model: 'Auction model' },
  { name: 'ProLnk + TrustyPro', icon: '✅', homeownerProblem: 'Gets relevant, pre-qualified recommendations', partnerProblem: 'Earns commission without competing on price', model: 'AI-driven alignment' },
];

const flywheelSteps = [
  { step: 1, icon: '📸', title: 'Partner Uploads Photos', detail: 'After every job, partner uploads photos. TrustyPro AI analyzes the property and identifies maintenance needs, safety issues, and upgrade opportunities.' },
  { step: 2, icon: '🏡', title: 'Homeowner Gets Recommendation', detail: 'TrustyPro delivers relevant, specific recommendations to the homeowner — not ads, but intelligent insight about their specific home. Trust is built.' },
  { step: 3, icon: '💼', title: 'Homeowner Books → Commission Paid', detail: 'Homeowner books the job through ProLnk. Partner earns commission. No price competition. No bidding war. The AI matched them for quality, not price.' },
  { step: 4, icon: '🏛️', title: 'Origination Right Established', detail: 'The partner who brought this home into the vault earns an origination right — a permanent share of all future platform fees for this property.' },
  { step: 5, icon: '⭐', title: 'Reviews → More Trust → More Bookings', detail: 'Satisfied homeowner leaves a review. More trust built. More future bookings at this property and neighboring homes. The flywheel accelerates.' },
];

export default function TrustyProPartnerAlignment() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div style={{ background: '#f9fafb', color: '#111827', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#6b7280' }}>
          🤝 ProLnk Partner + Homeowner Alignment
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>
          How TrustyPro Homeowners and ProLnk Partners Align — Everyone Wins
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 48, lineHeight: 1.6 }}>
          TrustyPro homeowners want the best contractors. ProLnk partners ARE the best contractors. TrustyPro's AI matches them perfectly.
        </p>

        {/* Why different */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
            🆚 Why This Is Different From Every Other Platform
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb' }}>Platform</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb' }}>Homeowner Problem</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb' }}>Partner Problem</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#374151', border: '1px solid #e5e7eb' }}>Model</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p, i) => (
                  <tr key={p.name} style={{ background: p.icon === '✅' ? '#f0fdf4' : (i % 2 === 0 ? '#fff' : '#fafafa') }}>
                    <td style={{ padding: '12px 16px', border: '1px solid #e5e7eb', fontWeight: 700, color: p.icon === '✅' ? '#166534' : '#111827' }}>
                      {p.icon} {p.name}
                    </td>
                    <td style={{ padding: '12px 16px', border: '1px solid #e5e7eb', color: p.icon === '✅' ? '#166534' : '#6b7280' }}>{p.homeownerProblem}</td>
                    <td style={{ padding: '12px 16px', border: '1px solid #e5e7eb', color: p.icon === '✅' ? '#166534' : '#6b7280' }}>{p.partnerProblem}</td>
                    <td style={{ padding: '12px 16px', border: '1px solid #e5e7eb', color: p.icon === '✅' ? '#16a34a' : '#9ca3af', fontWeight: p.icon === '✅' ? 700 : 400 }}>{p.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Flywheel */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
            🔄 The Flywheel
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 15 }}>
            Click any step to see the detail. Each step feeds the next — the flywheel accelerates with every job.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {flywheelSteps.map(step => (
              <div key={step.step}>
                <button
                  onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    background: activeStep === step.step ? '#eff6ff' : '#fff',
                    border: activeStep === step.step ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: '16px 20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ background: activeStep === step.step ? '#2563eb' : '#f3f4f6', color: activeStep === step.step ? '#fff' : '#374151', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: 14 }}>
                    {step.step}
                  </div>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
                  <span style={{ fontWeight: 700, color: '#111827', fontSize: 15 }}>{step.title}</span>
                  <span style={{ marginLeft: 'auto', color: '#9ca3af', fontSize: 18 }}>{activeStep === step.step ? '▲' : '▼'}</span>
                </button>
                {activeStep === step.step && (
                  <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '16px 20px 20px 68px' }}>
                    <p style={{ color: '#1e40af', lineHeight: 1.7, margin: 0, fontSize: 14 }}>{step.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Network Effects */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
            📈 Network Effects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🔨</div>
              <div style={{ fontWeight: 700, color: '#111827', marginBottom: 8 }}>More Partners = Better Coverage</div>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Each additional licensed partner improves geographic coverage, reduces response time, and increases match quality across every service category.</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🏡</div>
              <div style={{ fontWeight: 700, color: '#111827', marginBottom: 8 }}>More Homeowners = Smarter AI</div>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Each additional home in the TrustyPro vault improves AI pattern recognition. The model learns what predicts HVAC failure, roof issues, and foundation risk in DFW specifically.</p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ background: '#1e3a8a', borderRadius: 14, padding: 32 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔭</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f9fafb', marginBottom: 12 }}>The Vision</h3>
            <p style={{ color: '#bfdbfe', lineHeight: 1.7, fontSize: 16, margin: 0 }}>
              "When every licensed pro in DFW is on ProLnk and every DFW home is in TrustyPro's vault, we've built the most complete home services intelligence layer ever created. That's not a platform — that's infrastructure."
            </p>
          </div>
        </section>

        {/* Dual CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e1b4b)', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔨</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>For Licensed Pros</h3>
            <p style={{ color: '#bfdbfe', fontSize: 14, marginBottom: 20 }}>Join the pro waitlist. Get matched jobs, referral overrides, and origination rights.</p>
            <a
              href="/apply"
              style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}
            >
              Apply as a Partner
            </a>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #14532d, #1a3a1a)', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🏡</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>For Homeowners</h3>
            <p style={{ color: '#86efac', fontSize: 14, marginBottom: 20 }}>Join the TrustyPro waitlist. Get AI-powered home insights and access to vetted pros.</p>
            <a
              href="/waitlist/homeowner"
              style={{ display: 'inline-block', background: '#16a34a', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}
            >
              Join Homeowner Waitlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
