import { useState } from 'react';

const CONTENT_TYPES = [
  { emoji: '🎬', title: '30-Second Before/After', desc: 'Walk into job, show problem, cut to fixed result. No voiceover needed. The transformation speaks for itself.' },
  { emoji: '🔍', title: '"What I Found Today"', desc: 'Educational 60-second reel — show the issue (aging HVAC, foundation crack) + why it matters to homeowners.' },
  { emoji: '⛈️', title: 'Storm Damage Documentation', desc: 'Real-time video right after a storm has enormous reach. Film the damage, explain what you’re seeing.' },
  { emoji: '🚚', title: 'Day in the Life', desc: 'Show your crew, your truck, your process — people hire people they trust.' },
  { emoji: '❓', title: 'Answering Common Questions', desc: '"How do I know if my foundation is moving?" Short answer = authority building. Use native text captions.' },
];

const PLATFORMS = [
  { name: 'TikTok', emoji: '🎵', strategy: '15–30 second clips. Trending audio. Fast cuts. Educational or shocking content performs best with DFW homeowners under 45.', color: '#ff2d55′ },
  { name: 'Instagram Reels', emoji: '📸', strategy: 'Same format as TikTok but your followers see it plus algorithm sharing. Cross-post directly from TikTok.', color: '#e1306c' },
  { name: 'YouTube Shorts', emoji: '▶️', strategy: '60 seconds or less. Long-term SEO value makes this essential — YouTube is the #2 search engine.', color: '#ff0000′ },
  { name: 'Facebook', emoji: '👥', strategy: 'Longer content okay (2–3 min). Best platform for the older DFW homeowner demographic who owns larger homes.', color: '#1877f2′ },
];

const TRADES = ['HVAC', 'Plumbing', 'Roofing', 'Foundation', 'Electrical', 'Landscaping', 'General Contractor'];
const FREQUENCIES = ['Daily (7 posts/wk)', '3x per week', 'Weekly', '2x per month'];

const CONTENT_IDEAS: Record<string, Record<string, string[]>> = {
  'HVAC': {
    'Daily (7 posts/wk)': [
      'Day 1: AC tune-up before/after (filter comparison)', 'Day 2: "What your utility bill tells me about your AC"',
      'Day 3: Storm damage check — outdoor condenser unit', 'Day 4: Customer testimonial — quick clip',
      'Day 5: "Signs your AC is dying" — 3 red flags', 'Day 6: Filter replacement timelapse',
      'Day 7: DFW summer prep checklist',
    ],
    '3x per week': [
      'Week 1, Mon: AC before/after', 'Week 1, Wed: "Is your AC ready for DFW summer?"', 'Week 1, Fri: Customer story',
      'Week 2, Mon: Common HVAC mistakes homeowners make', 'Week 2, Wed: Storm season prep', 'Week 2, Fri: Filter timelapse',
    ],
    'Weekly': [
      'Week 1: AC tune-up before/after', 'Week 2: Educational — signs your AC needs service', 'Week 3: Storm damage walk-through',
      'Week 4: DFW summer prep guide',
    ],
    '2x per month': [
      'Post 1: Best before/after content this month', 'Post 2: Educational — top homeowner question you’ve answered',
    ],
  },
  'Roofing': {
    'Daily (7 posts/wk)': [
      'Day 1: Hail damage close-up comparison', 'Day 2: "What DFW homeowners miss after a storm"',
      'Day 3: Before/after full roof replacement', 'Day 4: Insurance claim walkthrough (general)',
      'Day 5: Gutter cleaning before/after', 'Day 6: Customer interview at job completion', 'Day 7: "Storm just hit? Do this first"',
    ],
    '3x per week': [
      'Week 1, Mon: Storm damage before/after', 'Week 1, Wed: Insurance tips for homeowners', 'Week 1, Fri: Roof inspection checklist',
      'Week 2, Mon: Customer story', 'Week 2, Wed: "Signs your roof has 2-3 years left"', 'Week 2, Fri: Installation timelapse',
    ],
    'Weekly': [
      'Week 1: Major storm damage before/after', 'Week 2: Educational — roof lifespan in DFW climate',
      'Week 3: Customer testimonial', 'Week 4: Seasonal prep checklist',
    ],
    '2x per month': [
      'Post 1: Best before/after of the month', 'Post 2: Most common homeowner roofing question',
    ],
  },
};

function getCalendar(trade: string, freq: string) {
  if (CONTENT_IDEAS[trade]?.[freq]) return CONTENT_IDEAS[trade][freq];
  const base = CONTENT_IDEAS['HVAC'][freq] || CONTENT_IDEAS['HVAC']['Weekly'];
  return base.map(item => item.replace(/AC|HVAC/g, trade));
}

export default function PartnerVideoMarketingGuide() {
  const [trade, setTrade] = useState('');
  const [freq, setFreq] = useState('');
  const calendar = trade && freq ? getCalendar(trade, freq) : null;

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh', color: '#1a1a1a', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2a47 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎥</div>
        <h1 style={{ fontSize: 'clamp(22px, 5vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
          Video Marketing for ProLnk Partners
        </h1>
        <p style={{ fontSize: 18, color: '#93c5fd', maxWidth: 600, margin: '0 auto' }}>Before/After Content That Converts</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Why Video */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 32, margin: '40px 0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f', margin: '0 0 16px' }}>📈 Why Video Outperforms Photos</h2>
          <p style={{ color: '#555', lineHeight: 1.8, margin: 0 }}>
            Real estate agents report <strong>73% more buyer inquiries</strong> for video listings. The same applies to contractor work —
            video before/afters generate <strong>3–5x more DMs</strong> than static photos. Video builds trust at scale.
          </p>
        </div>

        {/* Content Types */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', margin: '40px 0 20px' }}>DFW Contractor Content That Performs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CONTENT_TYPES.map((c, i) => (
            <div key={c.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', gap: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 28, minWidth: 40, textAlign: 'center' }}>{c.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#1e3a5f', marginBottom: 6 }}>{i + 1}. {c.title}</div>
                <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Strategy */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', margin: '48px 0 20px' }}>Platform-Specific Strategy</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {PLATFORMS.map(p => (
            <div key={p.name} style={{ background: '#fff', border: `2px solid ${p.color}20`, borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ fontSize: 24 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, color: p.color }}>{p.name}</div>
              </div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{p.strategy}</div>
            </div>
          ))}
        </div>

        {/* Equipment */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: 28, margin: '40px 0′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#166534', margin: '0 0 12px' }}>📱 Equipment You Already Have</h2>
          <p style={{ color: '#374151', lineHeight: 1.8, margin: 0 }}>
            Your phone (especially iPhone 15/Samsung S24) is <strong>professional-quality</strong>. The most common mistake is not shooting <strong>horizontally for Reels</strong>.
            Good lighting matters more than the camera — work in natural light or face a window.
          </p>
        </div>

        {/* ProLnk Connection */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 16, padding: 28, margin: '0 0 40px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', margin: '0 0 12px' }}>🤝 ProLnk + Your Content</h2>
          <p style={{ color: '#374151', lineHeight: 1.8, margin: 0 }}>
            Tag ProLnk in your before/after content. We feature partner content on TrustyPro social media. Mutual promotion — your work gets seen, your profile gets leads.
          </p>
        </div>

        {/* Content Calendar */}
        <div style={{ background: '#fff', border: '2px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f', margin: '0 0 8px' }}>📅 30-Day Content Calendar</h2>
          <p style={{ color: '#666', margin: '0 0 24px', fontSize: 14 }}>Select your trade and posting frequency for a customized schedule.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#1e3a5f', fontWeight: 600, marginBottom: 6 }}>Your Trade</label>
              <select
                value={trade}
                onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 12px', fontSize: 15, color: '#1a1a1a' }}
              >
                <option value="">Select trade...</option>
                {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#1e3a5f', fontWeight: 600, marginBottom: 6 }}>Posting Frequency</label>
              <select
                value={freq}
                onChange={e => setFreq(e.target.value)}
                style={{ width: '100%', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 12px', fontSize: 15, color: '#1a1a1a' }}
              >
                <option value="">Select frequency...</option>
                {FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
          {calendar && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 700, color: '#1e3a5f', marginBottom: 12 }}>{trade} — {freq}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {calendar.map((item, i) => (
                  <div key={i} style={{ background: '#f8faff', border: '1px solid #e0e9ff', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1e3a5f', minWidth: 20 }}>{i + 1}.</div>
                    <div style={{ fontSize: 14, color: '#374151′ }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
