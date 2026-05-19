import { useState } from 'react';

const referralMessages: Record<string, { headline: string; body: string; cta: string }> = {
  'Google Search': {
    headline: 'You searched — and you found something real.',
    body: 'Most people searching for DFW HVAC help get generic advice from companies that don\’t know North Texas. You found ProLnk because we spent years building knowledge specific to DFW — the heat index, the TOU plans, the soil, the humidity. That knowledge is yours, and it\’s free. Now we\’re building the platform to connect you with pros who know this market as well as we do.',
    cta: 'Join the DFW waitlist — be first to access vetted local pros.',
  },
  'Friend or Neighbor': {
    headline: 'A DFW neighbor pointed you here. That means a lot.',
    body: 'Word of mouth from someone who lives in the same heat, pays the same electric bills, and deals with the same home service challenges is the most honest referral there is. We built ProLnk for exactly this — a community of DFW homeowners helping each other find pros worth trusting. Welcome.',
    cta: 'Join your neighbor on the ProLnk waitlist.',
  },
  'Social Media': {
    headline: 'You scrolled past a lot of noise to find this.',
    body: 'We don\’t buy ads or chase viral moments. If you found ProLnk on social, it\’s because someone in the DFW community thought this was worth sharing. That\’s our entire growth model — real value, real homeowners, real referrals. We hope the content lived up to it.',
    cta: 'Join the waitlist. Tell a DFW neighbor.',
  },
  'ProLnk Article or Guide': {
    headline: 'You read one of our guides. Thank you.',
    body: 'We\’ve published thousands of pages about DFW home services — HVAC efficiency, plumbing, electrical, foundation, and more. All of it written specifically for North Texas homeowners, not a generic audience. If something helped you today, we\’d love to build that relationship further through the platform.',
    cta: 'Join the waitlist and let\’s keep helping each other.',
  },
  'Contractor or Pro Referral': {
    headline: 'A DFW pro sent you here. That\’s a strong signal.',
    body: 'When a contractor or service professional points a homeowner to ProLnk, it\’s usually because they believe in what we\’re building — a marketplace where good pros get found by the right homeowners, without paying for garbage leads. We\’re building that. You found it early.',
    cta: 'Join the waitlist. Good things are coming.',
  },
};

export default function DFWProLnkFinalMessage() {
  const [referral, setReferral] = useState('Google Search');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const msg = referralMessages[referral] ?? referralMessages['Google Search'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
          🏠 ProLnk · DFW Home Services
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          A Message from ProLnk to DFW
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          We built 3,000+ pages of DFW homeowner knowledge — HVAC, plumbing, electrical,
          foundation, roofing — all written specifically for North Texas. This is our commitment
          to DFW, and it\'s just the beginning.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>
            💬 How Did You Find ProLnk?
          </h2>
          <div style={{ marginBottom: 24 }}>
            <select
              value={referral}
              onChange={e => setReferral(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(referralMessages).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ borderLeft: '4px solid #F5E642', paddingLeft: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>{msg.headline}</div>
            <div style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.8 }}>{msg.body}</div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{msg.cta}</div>
          </div>
          {!submitted ? (
            <div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box', marginBottom: 12 }}
              />
              <button
                onClick={() => { if (email.includes('@')) setSubmitted(true); }}
                style={{ width: '100%', padding: '14px', background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Join the DFW Waitlist →
              </button>
            </div>
          ) : (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>You\'re on the list.</div>
              <div style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.6 }}>
                We\'ll reach out when ProLnk is ready in your area. Thank you for believing in what we\'re building for DFW.
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📖 What We\'ve Built for DFW</h2>
          {[
            ['3,000+ pages of DFW-specific guides', 'HVAC, plumbing, electrical, roofing, foundation — all written for North Texas homes, weather, and utilities.'],
            ['A platform built on trust, not volume', 'We don\’t sell leads to the highest bidder. We match homeowners with pros who\’ve earned it.'],
            ['Network income for pros who grow it', 'DFW pros who refer other pros and homeowners earn from 5 income streams — permanently.'],
            ['Free knowledge, always', 'Everything on this site was built to help DFW homeowners make better decisions — free, forever.'],
          ].map(([title, body]) => (
            <div key={title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: 24, color: '#475569', fontSize: 14 }}>
          Built in DFW, for DFW. © 2026 ProLnk · prolnk.io
        </div>
      </div>
    </div>
  );
}
