import React from 'react';
import { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER = '#F59E0B';
const LIGHT_BG = '#F9FAFB';

const issues = [
  {
    icon: '🏗️',
    title: '1980s–2000s System Aging',
    body: 'HVAC, water heaters, and roofing from this era are hitting end-of-life simultaneously. Coppell homes built during the tech-boom years need systematic asset reviews before deferred maintenance compounds repair costs.',
  },
  {
    icon: '✈️',
    title: 'DFW Airport Vibration Stress',
    body: 'Proximity to DFW creates persistent low-frequency vibration. Older slab foundations show micro-fractures that worsen with clay-soil expansion cycles, making early detection critical for high-value Coppell properties.',
  },
  {
    icon: '📋',
    title: 'HOA Compliance Standards',
    body: 'CISD-area HOAs enforce strict exterior maintenance codes. Paint, roofing, landscaping, and fence standards require verified contractors who understand documentation requirements to avoid fines and disputes.',
  },
  {
    icon: '💧',
    title: 'Irrigation & Drainage Maturity',
    body: 'Established landscaping means complex irrigation zones installed over two decades. Aging valves, cracked manifolds, and root intrusion in drainage lines are common in Coppell’s mature subdivisions.',
  },
];

const stats = [
  { label: 'Avg Home Value', value: '$550K' },
  { label: 'School District Rank', value: '#1 in TX' },
  { label: 'Median Home Age', value: '22 yrs' },
  { label: 'Airport Distance', value: '< 3 mi' },
];

export default function TrustyProCoppell() {
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
          Coppell, TX · DFW Metroplex
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 780, margin: '0 auto 20px' }}>
          Coppell TX: DFW's Most Educated City Deserves the Smartest Home Care
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
          CISD-rated #1 in Texas. $550K homes. Business-class professionals who expect the same precision in home maintenance they bring to the boardroom.
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
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>What Coppell Homeowners Actually Deal With</h2>
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: 16, marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
          Educated homeowners deserve transparent diagnostics, not upsells. Here's the real picture.
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
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>Why Coppell Pros Choose TrustyPro</h2>
          <p style={{ color: '#4B5563', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
            TrustyPro matches Coppell homeowners exclusively with vetted, licensed professionals who understand the specific demands of CISD-area properties — from HOA documentation requirements to airport-adjacent foundation protocols. Every match is backed by verified credentials, not just reviews.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, textAlign: 'left' }}>
            {['License verification on every pro', 'HOA-ready documentation', 'Foundation-aware inspectors', 'Airport corridor specialists', 'Transparent pricing upfront', 'Response within 2 hours'].map(f => (
              <div key={f} style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', fontSize: 14, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: INDIGO }}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Email capture */}
      <section style={{ background: '#fff', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to Protect Your Coppell Home?</h2>
        <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 32 }}>Join the waitlist. We'll match you with a vetted pro in your service category.</p>
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
        © 2026 TrustyPro · Serving Coppell, TX and the DFW Metroplex
      </footer>
    </div>
  );
}
