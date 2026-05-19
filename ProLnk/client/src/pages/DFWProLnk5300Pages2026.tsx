import { useState } from 'react';

const stakeholders = [
  {
    id: 'homeowner',
    label: '🏠 DFW Homeowner',
    headline: 'What 5,300+ Pages Means for You',
    points: [
      'Every page answers a real question a DFW homeowner has typed into Google',
      'HVAC guides, foundation guides, roofing guides — all written for DFW specifically',
      'No generic national advice — every article accounts for DFW soil, climate, and market',
      'You can search ProLnk content to educate yourself before getting any quote',
      'Better-educated homeowners get better quotes — that is by design',
      'Each article connects to a vetted pro who can actually do the work in your zip code',
      'The library grows every week — more trades, more neighborhoods, more seasonal guides',
    ],
  },
  {
    id: 'pro',
    label: '🔧 DFW Pro',
    headline: 'What 5,300+ Pages Means for Your Business',
    points: [
      'Each article ranks in Google and drives organic homeowner traffic — free for Charter Pros',
      'ProLnk pages pre-educate homeowners before they contact you — fewer tire-kickers',
      'Your profile appears alongside authoritative DFW content — instant credibility transfer',
      'SEO authority from 5,300+ pages means homeowners find ProLnk first, then find you',
      'Charter Pros appear in DFW-specific content relevant to their trade and zip code',
      'The content library reduces your marketing spend by generating inbound demand for you',
      'As the library grows, so does your organic lead volume — compounding returns for members',
    ],
  },
  {
    id: 'seo',
    label: '📈 SEO Impact',
    headline: 'What 5,300+ Pages Means for Search Rankings',
    points: [
      '5,300+ pages of original DFW-specific content creates massive topical authority with Google',
      'Topical authority means Google trusts ProLnk as a DFW home services source — rankings accelerate',
      'Long-tail keywords (e.g. "DFW HVAC cottonwood season") are being captured at scale',
      'Each new page strengthens every existing page through internal link equity',
      'Content moat: impossible for a new competitor to replicate 5,300 pages in under 3 years',
      'DFW-specific content outperforms generic national content by 3–5x for local search intent',
      'The 5,000+ page threshold is widely considered a Google topical authority inflection point',
    ],
  },
  {
    id: 'charter',
    label: '🟡 Charter Member',
    headline: 'What 5,300+ Pages Means If You Join Now',
    points: [
      'Charter members are embedded in the DFW content library — your profile links from relevant pages',
      'The earlier you join, the more content equity accumulates to your profile over time',
      'Charter closes at 500 members — the content library is already working, your position is not yet reserved',
      'Each new page is potential inbound demand for Charter Pros already in the system',
      'ProLnk content will continue scaling — Charter members ride the growth at the founding rate',
      'The SEO compounding effect means page 5,300 is worth more than page 1,000 — and you get both',
      'Apply today at prolnk.io before Charter capacity closes',
    ],
  },
];

export default function DFWProLnk5300Pages2026() {
  const [active, setActive] = useState('homeowner');
  const current = stakeholders.find(s => s.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>📚🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>
            ProLnk DFW Content Library: 5,300+ Pages & Growing
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            The ProLnk DFW knowledge library continues to expand — helping homeowners make better decisions and connecting them to verified local pros. Select who you are to see what this milestone means for you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { label: '5,300+', sub: 'DFW-specific pages' },
            { label: '40+', sub: 'trades covered' },
            { label: '200+', sub: 'DFW zip codes' },
            { label: '2026', sub: 'content freshness' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#0f2240', borderRadius: 10, padding: '18px 20px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{stat.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {stakeholders.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                padding: '10px 18px', borderRadius: 8, border: '2px solid',
                borderColor: active === s.id ? '#F5E642′ : '#1e3a5f',
                background: active === s.id ? '#F5E642′ : '#0f2240',
                color: active === s.id ? '#0A1628′ : '#cbd5e1',
                fontWeight: 700, cursor: 'pointer', fontSize: 13,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f2240', border: '2px solid #F5E642', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 18 }}>
            {current.headline}
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {current.points.map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.5 }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 22, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>
            🟡 Charter closes at 500 members. The library keeps growing — your spot does not wait.
          </p>
          <a
            href="https://prolnk.io"
            style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 15 }}
          >
            Explore ProLnk & Apply for Charter — prolnk.io
          </a>
        </div>

        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
          ProLnk DFW Content Milestone 2026 · 5,300+ pages and growing · prolnk.io
        </p>
      </div>
    </div>
  );
}
