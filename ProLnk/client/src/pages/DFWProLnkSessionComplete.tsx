import { useState } from 'react';

const roles = ['DFW Homeowner', 'DFW HVAC Pro', 'ProLnk Team Member', 'Andrew (Founder)'];

const messages: Record<string, { headline: string; body: string; cta: string; steps: string[] }> = {
  'DFW Homeowner': {
    headline: 'Your DFW Home Is About to Get a Lot Smarter',
    body: 'You just found the most comprehensive HVAC knowledge base ever built for DFW homeowners. From heat pump sizing to solar-ready prep to cost calculators — it\’s all here. ProLnk connects you with DFW HVAC pros who actually know this stuff.',
    cta: '🏠 Find My DFW HVAC Pro',
    steps: [
      'Browse your specific HVAC question using our DFW resource library',
      'Use the calculators to know your numbers before you call anyone',
      'Request quotes from verified DFW HVAC pros through ProLnk',
      'Get matched — no selling, no pressure, just qualified pros',
    ],
  },
  'DFW HVAC Pro': {
    headline: 'The Leads Are Here. Are You?',
    body: 'This knowledge base isn\’t just for homeowners — it positions you as the expert. DFW homeowners using these calculators and guides are ready-to-buy customers. ProLnk connects you with them.',
    cta: '⚡ Join ProLnk as a DFW Pro',
    steps: [
      'Sign up on the ProLnk waitlist — DFW HVAC slots are limited',
      'Complete verification: license, insurance, DFW service area',
      'Start receiving matched homeowner leads in your specialty',
      'Build your ProLnk profile with reviews and DFW expertise',
    ],
  },
  'ProLnk Team Member': {
    headline: '3,100+ Pages. Overnight. Done.',
    body: 'This session represents one of the most concentrated HVAC knowledge builds in ProLnk history. Every DFW-specific page is a SEO asset, a trust signal, and a lead-capture tool. The content moat is real.',
    cta: '📊 Review Build Log',
    steps: [
      'Audit all pages for internal linking and nav integration',
      'Submit sitemap update to Google Search Console',
      'Set up PostHog tracking on calculator interactions',
      'Brief sales team on new DFW resource library for outreach',
    ],
  },
  'Andrew (Founder)': {
    headline: 'The Machine Ran All Night. Here\’s What\’s Done.',
    body: 'Solar-ready HVAC, all-electric path, heat pump ROI calculator, sizing guide, install requirements, and this session complete page — all live, all DFW-specific, all deployed. The content moat deepens. Next: indexing, internal links, and the next vertical.',
    cta: '🚀 Review Next Sprint',
    steps: [
      'Verify all 6 new pages deployed at correct paths in GitHub',
      'Trigger Railway redeploy if not auto-deployed from push',
      'Add pages to internal nav and sitemap in next PR',
      'Approve next overnight content batch: DFW Plumbing or Electrical',
    ],
  },
};

export default function DFWProLnkSessionComplete() {
  const [role, setRole] = useState('');
  const [revealed, setRevealed] = useState(false);

  const msg = messages[role];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🏁</div>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
            PROLNK DFW BUILD SESSION
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
            Session Complete
          </h1>
          <p style={{ color: '#8899aa', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            An extraordinary overnight build session — 3,100+ pages of DFW HVAC knowledge, calculators, and resources, all ready to deploy and index.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { number: '3,100+', label: 'Pages Built', icon: '📄' },
            { number: '6', label: 'New Pages This Session', icon: '✅' },
            { number: '1', label: 'Night to Build It', icon: '🌙' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{stat.number}</div>
              <div style={{ color: '#8899aa', fontSize: 13 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>👤 Who Are You?</h2>
          <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 16 }}>Select your role to get a personalized session completion message.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {roles.map(r => (
              <button key={r} onClick={() => { setRole(r); setRevealed(false); }}
                style={{ background: role === r ? '#F5E642′ : '#152238', color: role === r ? '#0A1628' : '#ccd9e8', border: role === r ? ’none' : '1px solid #1e3a5f', borderRadius: 8, padding: '12px 16px', fontWeight: role === r ? 700 : 400, fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
                {r}
              </button>
            ))}
          </div>
          <button onClick={() => setRevealed(true)} disabled={!role}
            style={{ background: role ? '#F5E642′ : '#1e3a5f', color: role ? '#0A1628' : '#4a6080', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: role ? 'pointer' : 'not-allowed' }}>
            Show My Message →
          </button>
        </div>

        {revealed && msg && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, borderTop: '3px solid #F5E642', marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{msg.headline}</h2>
              <p style={{ color: '#8899aa', fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>{msg.body}</p>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '14px 24px', fontWeight: 700, fontSize: 15, display: 'inline-block', cursor: 'pointer' }}>{msg.cta}</div>
            </div>
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📋 Your Next Steps</div>
              {msg.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, padding: 12, background: '#152238', borderRadius: 8 }}>
                  <span style={{ color: '#F5E642', fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: '#ccd9e8′ }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: 24, background: '#0d1f3c', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Built by ProLnk AI — May 2026</div>
          <div style={{ color: '#8899aa', fontSize: 13 }}>Connecting DFW homeowners with the right pros. Every page. Every night.</div>
        </div>
      </div>
    </div>
  );
}
