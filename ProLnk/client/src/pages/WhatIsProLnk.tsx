import { useState } from 'react';

const faqs = [
  { q: 'Is ProLnk free for homeowners?', a: 'Yes — homeowners never pay to post a need or receive quotes. You only pay the pro you hire.' },
  { q: 'How fast do I get matched?', a: 'Most homeowners receive their first match within 2 hours of posting. Our AI works 24/7.' },
  { q: 'How does ProLnk make money?', a: 'Pros pay a monthly membership starting at $99/mo, plus a platform fee of 6–15% of job value only when they win work. No pay-per-lead fees, ever.' },
  { q: 'What trades are on ProLnk?', a: 'Plumbing, electrical, HVAC, roofing, painting, landscaping, flooring, general contracting, and 40+ more categories.' },
  { q: 'Is my personal information safe?', a: 'Your contact details are never shared until you approve a match. ProLnk is CCPA and GDPR compliant.' },
  { q: 'What if I’m not satisfied with the pro?', a: 'ProLnk has a dispute resolution process backed by our Satisfaction Guarantee program.' },
  { q: 'Can I use ProLnk for commercial properties?', a: 'Currently ProLnk focuses on residential homes. Commercial services are on our 2027 roadmap.' },
];

const incomeStreams = [
  { emoji: '💼', title: 'Matched Jobs', desc: 'AI-matched local jobs with a simple platform fee of 6–15% of job value — the pro completing the job keeps 40–60% of that fee back, depending on plan.' },
  { emoji: '🌐', title: 'Pro Network Override', desc: 'A share of platform fees from jobs completed by pros you recruit, up to 4 levels deep.' },
  { emoji: '🔄', title: 'Subscription Override', desc: '12% of the monthly subscription from every pro you refer directly.' },
  { emoji: '🏠', title: 'Homeowner Referrals', desc: 'Rewards for qualified homeowner leads you bring to the platform.' },
  { emoji: '🏦', title: 'Home Origination Rights', desc: 'A permanent 5% share of the platform fee whenever a home you onboarded generates fees.' },
];

export default function WhatIsProLnk() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: '#f8f9fc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 14, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 16, textTransform: 'uppercase' }}>Complete Guide</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, margin: '0 0 20px', lineHeight: 1.1 }}>What is ProLnk?</h1>
          <p style={{ fontSize: 20, color: '#c0c8d8', lineHeight: 1.7, margin: 0 }}>
            The AI-powered marketplace connecting homeowners with verified home service professionals — smarter, faster, and fairer than anything else on the market.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 840, margin: '0 auto', padding: '60px 24px' }}>
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>The Problem ProLnk Solves</h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#444', marginBottom: 16 }}>
            Finding a trustworthy home service pro is broken. Homeowners waste hours calling companies, getting ghosted, or paying for low-quality leads that go nowhere. Contractors spend thousands on pay-per-lead platforms that send the same lead to 5 competitors simultaneously.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#444' }}>
            ProLnk fixes this with a match-based model: homeowners post their needs, AI finds the single best-fit pro, and the pro only pays if they're actually hired. No spam. No wasted money.
          </p>
        </section>

        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>How It Works — In 4 Steps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { step: '01', emoji: '📋', title: 'Post Your Need', desc: 'Homeowner describes the job — trade type, urgency, location.' },
              { step: '02', emoji: '🤖', title: 'AI Matches', desc: 'ProLnk AI scans verified pros and finds the best fit in your area.' },
              { step: '03', emoji: '👷', title: 'Pro Gets Lead', desc: 'The matched pro reviews the job and contacts the homeowner.' },
              { step: '04', emoji: '✅', title: 'Hire & Pay Pro', desc: 'Homeowner hires the pro. Pro pays a match fee only at this point.' },
            ].map(s => (
              <div key={s.step} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'relative' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#F5E642', background: '#0A1628', borderRadius: 6, padding: '3px 8px', display: 'inline-block', marginBottom: 12 }}>STEP {s.step}</div>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Who Is ProLnk For?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🏠</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Homeowners</h3>
              <ul style={{ paddingLeft: 18, color: '#555', lineHeight: 2, fontSize: 15 }}>
                <li>Need a reliable plumber, HVAC tech, or electrician</li>
                <li>Tired of getting ghosted by contractors</li>
                <li>Want upfront pricing and verified reviews</li>
                <li>Free to use — always</li>
              </ul>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Service Professionals</h3>
              <ul style={{ paddingLeft: 18, color: '#555', lineHeight: 2, fontSize: 15 }}>
                <li>Licensed contractors in 40+ trade categories</li>
                <li>Want higher quality leads than Angi or Thumbtack</li>
                <li>Looking to build a scalable income system</li>
                <li>Interested in referral rewards and origination rights</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ background: '#0A1628', borderRadius: 16, padding: 40, marginBottom: 60, color: '#fff' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>How Partners Earn</h2>
          <p style={{ color: '#a0aec0', marginBottom: 28, fontSize: 15 }}>ProLnk isn't just a lead platform — pros are rewarded for the work they do and the network they help build.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {incomeStreams.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontSize: 28, minWidth: 40, textAlign: 'center' }}>{s.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#F5E642' }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: '#a0aec0', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 28 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, fontWeight: 600 }}
                >
                  {faq.q}
                  <span style={{ fontSize: 20, color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 12 }}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 18px', color: '#555', fontSize: 15, lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#F5E642', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>Ready to Get Started?</h2>
          <p style={{ color: '#1a1a2e', fontSize: 16, marginBottom: 24 }}>Join thousands of homeowners and pros already on the waitlist.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: '#0A1628', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>I'm a Homeowner</button>
            <button style={{ background: '#fff', color: '#0A1628', border: '2px solid #0A1628', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>I'm a Pro</button>
          </div>
        </section>
      </div>
    </div>
  );
}
