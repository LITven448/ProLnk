import React from 'react';
import { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER = '#F59E0B';
const LIGHT_BG = '#F9FAFB';

const issues = [
  {
    icon: '🔧',
    title: 'Galvanized Plumbing End-of-Life',
    body: 'Farmers Branch has one of the highest concentrations of original galvanized steel plumbing in DFW. After 50+ years, these pipes corrode from the inside out, reducing water pressure and leaching rust. Full repipe projects are common — and increasingly urgent.',
  },
  {
    icon: '⚡',
    title: 'Original Electrical Systems',
    body: 'Many 1960s–1970s homes still have Federal Pacific or Zinsco panels — both flagged as fire hazards by electrical safety organizations. Aluminum wiring and two-prong outlets are also prevalent, requiring licensed panel upgrades before insurance renewals.',
  },
  {
    icon: '🌍',
    title: 'Blackland Prairie Clay Soil Movement',
    body: 'Dallas County’s Blackland Prairie clay expands and contracts dramatically with moisture changes. In Farmers Branch’s older housing stock, this seasonal movement has been stressing slab foundations for five decades, making professional foundation assessment non-optional.',
  },
  {
    icon: '🚿',
    title: 'Aging Utility Connections',
    body: 'Original sewer laterals and water service lines in Farmers Branch were installed with 1960s materials and standards. Root intrusion, collapsed clay tile sewers, and corroded water service lines are discovered regularly during real estate transactions.',
  },
];

const stats = [
  { label: 'Avg Home Age', value: '48 yrs' },
  { label: 'County', value: 'Dallas' },
  { label: 'Galvanized Homes', value: 'Very High %' },
  { label: 'Soil Type', value: 'Blackland Clay' },
];

export default function TrustyProFarmersBranch() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ background: LIGHT_BG, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#111827′ }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: INDIGO }}>TrustyPro</span>
        <a href="/trustypro" style={{ fontSize: 14, color: '#6B7280', textDecoration: 'none' }}>← All Cities</a>
      </nav>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #6366F1 100%)`, color: '#fff', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 24, padding: '4px 16px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
          Farmers Branch, TX · Dallas County
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 780, margin: '0 auto 20px' }}>
          Farmers Branch TX: Classic DFW Suburb, Real Foundation Challenges
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
          One of DFW's oldest suburbs means character homes with history — and infrastructure that needs an honest professional assessment, not a band-aid.
        </p>
        <a href="/trustypro/waitlist" style={{ background: AMBER, color: '#111', padding: '14px 32px', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
          Get Matched with a Verified Pro →
        </a>
      </section>

      {/* Stats */}
      <section style={{ background: '#fff', padding: '40px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: INDIGO }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Issues */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>50 Years of Deferred Maintenance Adds Up</h2>
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: 16, marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
          Farmers Branch homes have charm. They also have infrastructure installed before the Apollo program landed on the moon. Here's what that means.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 24 }}>
          {issues.map(item => (
            <div key={item.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#111827′ }}>{item.title}</h3>
              <p style={{ color: '#4B5563', lineHeight: 1.65, fontSize: 15, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why TrustyPro */}
      <section style={{ background: '#EEF2FF', padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>Old-Home Experts, Verified Credentials</h2>
          <p style={{ color: '#4B5563', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
            TrustyPro's Farmers Branch network specializes in the specific challenges of pre-1980 DFW housing: galvanized pipe replacement, panel upgrades, pier-and-beam foundation repair, and Blackland Prairie clay soil management. Every pro is licensed in Texas and verified before their first match.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, textAlign: 'left' }}>
            {['Galvanized repipe specialists', 'Panel upgrade licensed electricians', 'Foundation engineers', 'Clay soil drainage experts', 'Sewer lateral inspection', 'Pre-1980 home certified'].map(f => (
              <div key={f} style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', fontSize: 14, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: INDIGO }}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Get Ahead of Your Home's Infrastructure</h2>
        <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 32 }}>Connect with a pro who specializes in Farmers Branch's older housing stock — before small issues become expensive emergencies.</p>
        {submitted ? (
          <div style={{ background: '#D1FAE5', color: '#065F46', padding: '16px 32px', borderRadius: 12, display: 'inline-block', fontWeight: 600 }}>
            ✓ You're on the list! We’ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, minWidth: 240, padding: '13px 16px', borderRadius: 10, border: '1px solid #D1D5DB', fontSize: 15 }}
            />
            <button type="submit" style={{ background: AMBER, color: '#111', border: 'none', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Join Waitlist
            </button>
          </form>
        )}
      </section>

      <footer style={{ background: '#1F2937', color: '#9CA3AF', textAlign: 'center', padding: '24px', fontSize: 13 }}>
        © 2026 TrustyPro · Serving Farmers Branch, TX and Dallas County
      </footer>
    </div>
  );
}
