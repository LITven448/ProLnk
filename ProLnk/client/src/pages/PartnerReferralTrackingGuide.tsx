import { useState } from 'react';

const shareChannels = [
  { icon: '📸', name: 'Instagram / Facebook Bio', tip: 'Update your bio link now — every profile visitor is a potential recruit or homeowner.' },
  { icon: '📇', name: 'Business Card / Leave-Behind', tip: 'Add your referral URL and QR code to every leave-behind you drop at jobs.' },
  { icon: '📧', name: 'Email Signature', tip: 'Add a one-liner: "Earn extra income with ProLnk → [your-link]"' },
  { icon: '🏠', name: 'After Every Job', tip: '"Want to see the full home analysis for this property?" — then share your homeowner link.' },
  { icon: '🏘️', name: 'Nextdoor Profile', tip: 'Nextdoor users are already homeowners seeking local pros — perfect match.' },
  { icon: '📍', name: 'Google Business Profile', tip: 'Add your referral link to your GBP description and services section.' },
];

const messages = [
  { label: 'High performer', text: '"Just earned $312 from a job I already did. Here’s how:"' },
  { label: 'Value add', text: '"I just started using a platform that sends me pre-screened homeowner leads. Worth a look."' },
  { label: 'Homeowner angle', text: '"This tool shows the full health history of your home. Pretty interesting — [link]"' },
];

export default function PartnerReferralTrackingGuide() {
  const [partners, setPartners] = useState(5);
  const [homeowners, setHomeowners] = useState(10);

  const partnerMonthly = partners * 0.07 * 800;
  const homeownerMonthly = homeowners * 50;
  const total = partnerMonthly + homeownerMonthly;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#6366f1', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            🔗 Partner Resource
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#0f172a' }}>
            Referral Link Guide
          </h1>
          <p style={{ fontSize: 18, color: '#64748b', margin: 0 }}>
            Track Every Recruit and Homeowner You Send
          </p>
        </div>

        {/* Your Two Links */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>Your Two Referral Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#eef2ff', border: '2px solid #6366f1', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#6366f1', fontWeight: 700, marginBottom: 6 }}>👷 Partner Link</div>
              <div style={{ color: '#4338ca', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>prolnk.io/join?ref=[your-id]</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>For recruiting other pros. When they join and earn, you get 7% of their commissions (L1 network override).</div>
            </div>
            <div style={{ background: '#f0fdf4', border: '2px solid #10b981', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 6 }}>🏠 Homeowner Link</div>
              <div style={{ color: '#059669', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>trustypro.io/join?ref=[your-id]</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>For bringing in homeowners who need services. When they book, you earn $25–100 per qualified homeowner.</div>
            </div>
          </div>
        </div>

        {/* Where to Share */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>Where to Share Your Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
            {shareChannels.map((c) => (
              <div key={c.name} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ color: '#0f172a', fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
                <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{c.tip}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, marginBottom: 40, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>📊 Tracking Your Referrals</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Referrals Tab Shows', items: ['Clicks on your link', 'Signups generated', 'Conversions to paid'] },
              { label: 'Partner Referrals Show', items: ['Their tier level', 'Their job completions', 'Your override income'] },
              { label: 'Homeowner Referrals Show', items: ['When they complete signup', 'When they book first service', 'Your earnings trigger'] },
            ].map((section) => (
              <div key={section.label} style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#6366f1', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>{section.label}</div>
                {section.items.map((item) => (
                  <div key={item} style={{ color: '#64748b', fontSize: 14, marginBottom: 4 }}>→ {item}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ background: '#eef2ff', borderRadius: 8, padding: '12px 16px', color: '#4338ca', fontSize: 14 }}>
            📍 Find it: Dashboard → Referrals tab
          </div>
        </div>

        {/* Optimizing */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>⚡ Optimizing Your Links</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              'Test different channels — track which drives the most signups from your dashboard',
              'Time your shares — post after completing a job with good before/after photos',
              'Be specific — stories about real earnings outperform generic "join this platform" messages',
              'Follow up — if someone clicked but didn’t sign up, a personal message converts 3x better',
            ].map((tip, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 18px', display: 'flex', gap: 12 }}>
                <div style={{ color: '#6366f1', fontWeight: 800, fontSize: 16 }}>{i + 1}</div>
                <div style={{ color: '#475569', fontSize: 15, lineHeight: 1.6 }}>{tip}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0f172a', borderRadius: 10, padding: 20 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8, fontWeight: 600 }}>MESSAGES THAT CONVERT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((m) => (
                <div key={m.label} style={{ background: '#1e293b', borderRadius: 8, padding: '12px 16px' }}>
                  <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>/{m.label}/</div>
                  <div style={{ color: '#a5b4fc', fontStyle: 'italic', fontSize: 15 }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Income Types */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          <div style={{ background: '#eef2ff', border: '1px solid #6366f1', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#4338ca', marginTop: 0 }}>👷 Pro Recruits</h3>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#6366f1', marginBottom: 4 }}>7%</div>
            <div style={{ color: '#64748b', fontSize: 14 }}>of their commission income (L1 network override). Recurring — keeps paying as long as they're active.</div>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #10b981', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#059669', marginTop: 0 }}>🏠 Homeowner Referrals</h3>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#10b981', marginBottom: 4 }}>$25–100</div>
            <div style={{ color: '#64748b', fontSize: 14 }}>per homeowner who completes their first booking. Paid when the booking is confirmed.</div>
          </div>
        </div>

        {/* Interactive Calculator */}
        <div style={{ background: '#fff', border: '2px solid #6366f1', borderRadius: 12, padding: 28, marginBottom: 40, boxShadow: '0 4px 16px rgba(99,102,241,0.1)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, color: '#0f172a' }}>💰 Referral Income Calculator</h2>
          <p style={{ color: '#64748b', marginBottom: 24 }}>Estimate your monthly passive income from referrals.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 8 }}>
                Partners Recruited (active): <span style={{ color: '#6366f1′ }}>{partners}</span>
              </label>
              <input
                type="range" min={0} max={50} value={partners}
                onChange={(e) => setPartners(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1′ }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 12, marginTop: 4 }}>
                <span>0</span><span>25</span><span>50</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 8 }}>
                Homeowners Referred (monthly): <span style={{ color: '#10b981′ }}>{homeowners}</span>
              </label>
              <input
                type="range" min={0} max={100} value={homeowners}
                onChange={(e) => setHomeowners(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981′ }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 12, marginTop: 4 }}>
                <span>0</span><span>50</span><span>100</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div style={{ background: '#eef2ff', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ color: '#6366f1', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Partner Overrides</div>
              <div style={{ color: '#4338ca', fontSize: 26, fontWeight: 900 }}>${Math.round(partnerMonthly).toLocaleString()}/mo</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>7% × avg $800/mo earnings × {partners} partners</div>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Homeowner Bonuses</div>
              <div style={{ color: '#059669', fontSize: 26, fontWeight: 900 }}>${Math.round(homeownerMonthly).toLocaleString()}/mo</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>avg $50 × {homeowners} homeowners</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Total Referral Income</div>
              <div style={{ color: '#a5b4fc', fontSize: 26, fontWeight: 900 }}>${Math.round(total).toLocaleString()}/mo</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>passive income</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#0f172a', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔗</div>
          <h3 style={{ color: '#e2e8f0', marginTop: 0 }}>Ready to Start Earning from Referrals?</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Log in to your dashboard to get your personalized referral links and start tracking today.</p>
          <button style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16,
            fontWeight: 700, cursor: 'pointer',
          }}>
            Go to My Referral Dashboard →
          </button>
        </div>

      </div>
    </div>
  );
}
