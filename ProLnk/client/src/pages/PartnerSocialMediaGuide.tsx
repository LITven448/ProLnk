import { useState } from 'react';

const tradeContent = {
  HVAC: [
    '"Why DFW HVAC works harder than anywhere else in Texas" — seasonal context post',
    'Before/after of air handler replacement with age sticker callout',
    '"What your HVAC age sticker tells us in 10 seconds" — TikTok hook',
    'Post of clogged drain line with caption: "This $150 fix prevents a $3,000 ceiling repair"',
    'Time-lapse of full unit swap in summer heat',
  ],
  Plumbing: [
    '"What 40-year-old cast iron looks like from the inside" — camera footage clip',
    'Before/after of corroded shutoff valves with cost callout',
    '"Why your water pressure matters more than you think" — educational reel',
    'Slab leak detection process walk-through (very popular in DFW)',
    '"Signs your water heater is about to fail" — list-style carousel',
  ],
  Roofing: [
    'Hail damage before/after series (huge in DFW storm season)',
    '"What your insurance adjuster looks for" — insider perspective',
    '"Not all hail damage is visible from the ground" — drone footage',
    'Age-comparison of shingles: new vs. 15yr vs. 20yr',
    '"The 5-minute roof self-inspection" — educational short',
  ],
  Foundation: [
    '"What stair-step cracks actually mean" — crack identification guide',
    'Pier installation time-lapse (high engagement, satisfying visuals)',
    '"Is this foundation crack serious?" — decision tree post',
    '"Why DFW clay soil moves your house every season" — educational context',
    'Before/after level readings with explanation',
  ],
};

const platforms = [
  {
    name: 'Instagram',
    icon: '📸',
    focus: 'Before/After Photos',
    tips: [
      'Before/after photos are the #1 performing content type',
      'DFW-specific hashtags: #DFWfoundation, #FriscoHVAC, #PlanoRoofing',
      'Post 3x/week minimum for algorithm traction',
      'Use Stories for in-progress work — builds anticipation',
    ],
  },
  {
    name: 'Facebook',
    icon: '👥',
    focus: 'Local Community',
    tips: [
      'Join neighborhood groups (Nextdoor alternative with older demographics)',
      'Share local context: "Why DFW HVAC works harder than other states"',
      'Facebook Business page collects reviews visible in Google search',
      'Facebook Marketplace for equipment resale — builds local brand',
    ],
  },
  {
    name: 'TikTok',
    icon: '🎵',
    focus: 'Educational Shorts',
    tips: [
      'Educational hooks outperform promotional content 5x',
      '"Did you know your HVAC age sticker tells us everything?" — hook formula',
      'Show the problem clearly before the solution',
      'DFW seasonal content (spring storms, summer heat) gets boosted locally',
    ],
  },
  {
    name: 'YouTube',
    icon: '▶️',
    focus: 'Long-Form Authority',
    tips: [
      '"What I find on every DFW attic inspection" — high-intent search traffic',
      'Builds authority slowly but permanently — videos rank for years',
      'Include job walkthroughs: "Full HVAC replacement, Plano TX"',
      'Searchable titles with city names get local discovery',
    ],
  },
  {
    name: 'Nextdoor',
    icon: '🏘️',
    focus: 'Hyperlocal Leads',
    tips: [
      'Most direct path to local homeowner leads in your service area',
      'Answer questions in your trade — builds credibility organically',
      'Nextdoor Business page (free) shows up when neighbors ask for referrals',
      'Reference local landmarks in responses for authenticity',
    ],
  },
];

const captions = [
  {
    type: 'Before/After',
    text: `This [job type] in [city] was [problem description]. The homeowner had been living with it for [time period]. Here's what we found — and what we did about it. 🛠️

[Benefit 1] ✅
[Benefit 2] ✅
[Benefit 3] ✅

DFW homeowner? Find us at the link in bio. We match you with verified local pros in your area.

#DFW[Trade] #[City][Trade] #HomeRepair #DFWHomeowner`,
  },
  {
    type: 'Storm Response',
    text: `If you got hit by last night's storm in [area], here's what to check first:

1️⃣ [Check 1]
2️⃣ [Check 2]
3️⃣ [Check 3]

Don't wait — [consequence of delay]. DM me with questions or use the link in my bio for a free inspection.

#DFWStorm #[City]Roofing #HailDamage #DFWHomeowner`,
  },
  {
    type: 'Maintenance Tip',
    text: `Most DFW homeowners skip this one thing — and it costs them $[amount] later.

[The tip]

Why it matters in DFW specifically: [local context]

Save this post. Your future self will thank you.

#HomeMaintenanceTip #DFW[Trade] #[City]Homeowner`,
  },
];

export default function PartnerSocialMediaGuide() {
  const [activeTrade, setActiveTrade] = useState<keyof typeof tradeContent>('HVAC');
  const [activePlatform, setActivePlatform] = useState(0);
  const [activeCaption, setActiveCaption] = useState(0);
  const [copied, setCopied] = useState(false);

  function copyCaption() {
    navigator.clipboard.writeText(captions[activeCaption].text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', color: '#111827', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>📱</span>
          <span style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 2 }}>Partner Resource</span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>
          Social Media Guide for ProLnk Partners
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 48 }}>Build Your Lead Pipeline</p>

        <div style={{ background: '#eff6ff', borderRadius: 12, padding: 24, marginBottom: 48, border: '1px solid #bfdbfe' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e40af', marginBottom: 10 }}>💡 The Opportunity</h2>
          <p style={{ color: '#1e3a8a', lineHeight: 1.7 }}>
            Partners who document their work on social media generate <strong>2-3x more job inquiries</strong> than those who don`t. Your photos are already being used by ProLnk AI — repurpose them for social proof. Every job you complete is content that sells future jobs.
          </p>
        </div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#111827`, marginBottom: 20 }}>Platform Strategy</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {platforms.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActivePlatform(i)}
                style={{
                  background: activePlatform === i ? '#2563eb' : '#ffffff',
                  color: activePlatform === i ? '#ffffff' : '#374151',
                  border: '1px solid',
                  borderColor: activePlatform === i ? '#2563eb' : '#d1d5db',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {p.icon} {p.name}
              </button>
            ))}
          </div>
          <div style={{ background: '#ffffff', borderRadius: 12, padding: 28, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{platforms[activePlatform].icon}</span>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{platforms[activePlatform].name}</h3>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Best for: {platforms[activePlatform].focus}</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {platforms[activePlatform].tips.map(tip => (
                <li key={tip} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #f3f4f6', color: '#374151', lineHeight: 1.6 }}>
                  <span style={{ color: '#2563eb', flexShrink: 0 }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#111827', marginBottom: 20 }}>Content Ideas by Trade</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {(Object.keys(tradeContent) as Array<keyof typeof tradeContent>).map(trade => (
              <button
                key={trade}
                onClick={() => setActiveTrade(trade)}
                style={{
                  background: activeTrade === trade ? '#111827' : '#ffffff',
                  color: activeTrade === trade ? '#ffffff' : '#374151',
                  border: '1px solid',
                  borderColor: activeTrade === trade ? '#111827' : '#d1d5db',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {trade}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {tradeContent[activeTrade].map((idea, i) => (
              <div key={i} style={{ background: '#ffffff', borderRadius: 10, padding: '16px 20px', border: '1px solid #e5e7eb', display: 'flex', gap: 14 }}>
                <span style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: '#374151', lineHeight: 1.6 }}>{idea}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#111827', marginBottom: 20 }}>📋 Copy-Paste Caption Templates</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {captions.map((c, i) => (
              <button
                key={c.type}
                onClick={() => setActiveCaption(i)}
                style={{
                  background: activeCaption === i ? '#059669' : '#ffffff',
                  color: activeCaption === i ? '#ffffff' : '#374151',
                  border: '1px solid',
                  borderColor: activeCaption === i ? '#059669' : '#d1d5db',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {c.type}
              </button>
            ))}
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 10, padding: 24, border: '1px solid #e5e7eb', position: 'relative' }}>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#374151', fontSize: 14, lineHeight: 1.8, fontFamily: 'inherit', margin: 0 }}>
              {captions[activeCaption].text}
            </pre>
            <button
              onClick={copyCaption}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: copied ? '#059669' : '#ffffff',
                color: copied ? '#ffffff' : '#374151',
                border: '1px solid',
                borderColor: copied ? '#059669' : '#d1d5db',
                borderRadius: 6,
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <div style={{ background: '#fef3c7', borderRadius: 12, padding: 24, border: '1px solid #fde68a' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#92400e', marginBottom: 8 }}>🔗 ProLnk Integration</h3>
            <p style={{ color: '#78350f', lineHeight: 1.7 }}>
              Include your ProLnk partner referral link in every social profile bio. When homeowners click through and sign up, you earn referral credit automatically - no manual tracking required.
            </p>
          </div>
        </section>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/apply"
            style={{ display: 'inline-block', background: '#2563eb', color: '#ffffff', padding: '16px 40px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 17 }}
          >
            Become a ProLnk Partner →
          </a>
        </div>

      </div>
    </div>
  );
}
