import { useState } from 'react';

const pressItems = [
  {
    outlet: 'Dallas Morning News',
    emoji: '📰',
    date: 'April 28, 2026',
    headline: 'ProLnk Wants to Fix the Broken Home Services Market — and Pay Tradespeople What They Are Worth',
    excerpt: 'The Dallas-based startup is taking aim at a $600 billion industry with a network income model that flips the traditional lead-gen platform on its head.',
    url: '#',
  },
  {
    outlet: 'CultureMap Dallas',
    emoji: '🎯',
    date: 'May 2, 2026',
    headline: 'Meet the Dallas Startup That Is Putting Plumbers, Electricians, and HVAC Techs in the Driver Seat',
    excerpt: 'ProLnk launched its waitlist this week with over 3,000 homeowners and 400 skilled trade professionals already signed up.',
    url: '#',
  },
  {
    outlet: 'D Magazine',
    emoji: '🏙️',
    date: 'May 8, 2026',
    headline: 'The Home Services Marketplace You Did Not Know Dallas Needed',
    excerpt: 'In a city with a booming construction market and a chronic shortage of skilled labor, ProLnk is betting that transparency and aligned incentives can solve what the old platforms never could.',
    url: '#',
  },
];

const stats = [
  { label: 'Waitlist Signups', value: '5,000+' },
  { label: 'Skilled Pros', value: '500+' },
  { label: 'Trades Covered', value: '28' },
  { label: 'Founded', value: '2025' },
];

export default function ProLnkPressPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📣</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#1e3a5f', marginBottom: 16 }}>Press and Media</h1>
          <p style={{ fontSize: 20, color: '#555', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            ProLnk is on a mission to build the fairest home services marketplace in America. We love talking to journalists who care about the trades.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 56 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#1e3a5f', color: '#fff', borderRadius: 14, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 700, color: '#1e3a5f', marginBottom: 32 }}>In the News</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 56 }}>
          {pressItems.map(p => (
            <div key={p.outlet} style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 2px 14px rgba(0,0,0,0.06)', display: 'flex', gap: 24 }}>
              <div style={{ fontSize: 48, flexShrink: 0 }}>{p.emoji}</div>
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: '#1e3a5f', fontSize: 15 }}>{p.outlet}</span>
                  <span style={{ color: '#aaa', fontSize: 13 }}>{p.date}</span>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: '#111', margin: '0 0 10px', lineHeight: 1.4 }}>{p.headline}</h3>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: '0 0 14px' }}>{p.excerpt}</p>
                <a href={p.url} style={{ color: '#2563eb', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Read the full article
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 56 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 12 }}>Press Kit</h3>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
              Download our full press kit including logos, founder photos, company overview, and brand guidelines.
            </p>
            <button
              onClick={handleCopy}
              style={{ background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              {copied ? 'Request Sent!' : 'Request Press Kit'}
            </button>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎙️</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 12 }}>Media Contact</h3>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>
              For interview requests, fact-checking, photography, or embargoed briefings, please reach out directly.
            </p>
            <div style={{ fontSize: 15 }}>
              <div style={{ marginBottom: 8 }}>📧 press@prolnk.io</div>
              <div>📍 Dallas, Texas</div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🖼️</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 12 }}>Brand Assets</h3>
            <ul style={{ fontSize: 15, color: '#555', lineHeight: 2.0, paddingLeft: 20 }}>
              <li>Primary logo (SVG, PNG, dark/light)</li>
              <li>Wordmark variations</li>
              <li>Color palette and typography</li>
              <li>Founder headshots</li>
              <li>Product screenshots</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#eef4ff', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f', marginBottom: 12 }}>Want to Tell Our Story?</h3>
          <p style={{ fontSize: 16, color: '#444', maxWidth: 500, margin: '0 auto 20px', lineHeight: 1.7 }}>
            We are available for podcast appearances, panel discussions, and one-on-one media briefings.
          </p>
          <a href=mailto:press@prolnk.io style={{ background: '#2563eb', color: '#fff', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            Contact Press Team
          </a>
        </div>

      </div>
    </div>
  );
}
