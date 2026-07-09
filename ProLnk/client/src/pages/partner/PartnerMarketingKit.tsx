import { useState } from 'react';

const socialPosts = [
  {
    platform: 'Facebook',
    icon: '📘',
    posts: [
      {
        label: 'Story Post',
        copy: `I just joined something that could change how I think about income.\n\nProLnk is a platform that connects homeowners with trusted service pros — plumbers, HVAC, electricians — and I'm earning a commission every time a match happens.\n\nNo selling. No cold calls. No stock to manage.\n\nIf you own a home or know someone who does, let's talk. I'd love to show you how this works.\n\n👇 Drop "INFO" in the comments or DM me directly.`,
      },
      {
        label: 'Curiosity Post',
        copy: `What if you could earn a percentage of every home service job completed in your city — without doing any of the work yourself?\n\nThat's the model I'm building with ProLnk.\n\nI'm looking for 5 people who want to learn more this week. Who's curious?`,
      },
    ],
  },
  {
    platform: 'Instagram',
    icon: '📸',
    posts: [
      {
        label: 'Value Post (Caption)',
        copy: `Most people wait for one paycheck. I'm building five streams.\n\n✅ Direct job commissions\n✅ Network overrides (4 levels deep)\n✅ Subscription income\n✅ Homeowner lead fees\n✅ Permanent origination rights\n\nProLnk makes it possible. DM me "PARTNER" to see how. 🔑`,
      },
      {
        label: 'Story CTA',
        copy: `Swipe up to learn how I earn passive income on home service jobs — even while I sleep. 💰🏠`,
      },
    ],
  },
  {
    platform: 'LinkedIn',
    icon: '💼',
    posts: [
      {
        label: 'Professional Announcement',
        copy: `Excited to share that I've joined ProLnk as a Charter/Founding Partner.\n\nProLnk is building a data-driven marketplace that matches homeowners with vetted service professionals — and the partner model is unlike anything I've seen.\n\nI earn commissions on direct matches, network overrides up to 4 levels deep, and permanent origination rights on every home I bring into the platform.\n\nIf you're a licensed trade professional looking for better leads, or a homeowner interested in protecting your home's service history, let's connect.\n\nI'm happy to answer questions or make an introduction. Drop a comment or DM me directly.`,
      },
    ],
  },
];

const textScripts = [
  {
    type: 'Homeowner Prospect',
    icon: '🏠',
    script: `Hey [Name], quick question — do you own your home? I just joined a platform called ProLnk that helps homeowners connect with vetted contractors and track their home's service history. It's free for homeowners to register. Would love to show you how it works if you have 10 minutes this week?`,
  },
  {
    type: 'Trades Professional',
    icon: '🔧',
    script: `Hey [Name], I know you do [trade]. I'm partnered with ProLnk — they match homeowners directly with licensed pros and handle the lead qualification. No bidding wars. Flat matching fee only when a job closes. Worth a 15-minute call to see if it fits your business?`,
  },
  {
    type: 'Partner Recruit',
    icon: '🤝',
    script: `Hey [Name], I'm building a referral network through ProLnk and thought of you. It's a home services platform — I earn commissions when matches happen, and if I recruit other partners, I get overrides on their earnings too. 4 levels deep. Wanted to see if you'd want to hear more before the waitlist closes?`,
  },
];

const emailTemplates = [
  {
    type: 'Cold Outreach',
    icon: '❄️',
    subject: 'Quick question about home services in [City]',
    body: `Hi [Name],\n\nI came across your name through [connection/context] and wanted to reach out.\n\nI'm partnered with ProLnk, a platform that's building a smarter way to connect homeowners with trusted service pros. We're expanding in [City] and I'm looking for [homeowners / licensed pros / network builders] who want early access.\n\nWould you be open to a 10-minute call this week to see if there's a fit?\n\nBest,\n[Your Name]`,
  },
  {
    type: 'Warm Follow-Up',
    icon: '☀️',
    subject: 'Following up — ProLnk partner opportunity',
    body: `Hey [Name],\n\nFollowing up on my last message about ProLnk. I know things get busy.\n\nQuick summary of what I'm building:\n\n• Earn commissions on every home service match in your network\n• 4 levels of income with network override\n• Permanent origination rights on homes you bring in\n• Waitlist closes soon — only [X] spots left\n\nHappy to jump on a call anytime this week or send you a short overview video. What works better for you?\n\n[Your Name]`,
  },
  {
    type: 'Post-Call Follow-Up',
    icon: '✅',
    subject: 'Great talking — here\’s the ProLnk overview',
    body: `Hi [Name],\n\nGreat connecting with you today! As promised, here are the links:\n\n🔗 Partner Overview: prolnk.xyz/partner\n🔗 Sign Up / Waitlist: prolnk.xyz/join\n🔗 Income Forecaster: prolnk.xyz/forecaster\n\nReminder of what we covered:\n• $149/month, locked for life during the waitlist\n• Charter tier: 1.5% origination rights\n• Founding tier: 1.0% origination rights\n• Network income compounds across 4 levels\n\nLet me know if you have any questions and I'll follow up in a few days.\n\nExcited to potentially work together,\n[Your Name]`,
  },
];

const flyerCopy = `ATTN: LICENSED TRADES PROFESSIONALS

Tired of chasing leads that go nowhere?

ProLnk matches you directly with homeowners who NEED your service — vetted, local, and ready to hire.

✅ No bidding wars
✅ Flat matching fee only when the job closes
✅ Keep 100% of the job revenue
✅ Real homeowners, real addresses, real jobs

PLUS: Refer other pros and earn override income on their matches — even while you're on the job site.

Waitlist is open NOW. Spots are limited.

📲 Text JOIN to [Number]
🌐 prolnk.xyz/pros

Don't let your competitors get there first.`;

const dos = [
  'Be honest about what the platform is — a lead marketplace, not a job guarantee',
  'Share real numbers only from your own experience',
  'Use the official ProLnk branding and visual assets',
  'Get explicit consent before texting prospects (TCPA compliance)',
  'Disclose you are a compensated partner when posting online',
  'Focus on value to the homeowner or pro — not just your commission',
];

const donts = [
  'Never guarantee specific income amounts to prospects',
  'Never claim ProLnk is "get rich quick" or effortless passive income',
  'Never sign up family members with fake information to earn overrides',
  'Never use aggressive or deceptive sales tactics',
  'Never post fake testimonials or manufactured results',
  'Never use ProLnk logos or trademarks without written approval',
];

export default function PartnerMarketingKit() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>📣</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Partner Marketing Kit</h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>
            Copy-paste ready scripts, posts, and templates. Click any block to copy it instantly.
          </p>
        </div>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 18, marginBottom: 16 }}>📱 Social Media Post Templates</h2>
          {socialPosts.map(({ platform, icon, posts }) => (
            <div key={platform} style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 15, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{icon}</span> {platform}
              </div>
              {posts.map(({ label, copy: text }) => {
                const key = `${platform}-${label}`;
                return (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div
                      onClick={() => copy(text, key)}
                      style={{ backgroundColor: '#fff', border: copiedKey === key ? '1.5px solid #10B981' : '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontSize: 14, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap', position: 'relative' }}
                    >
                      {text}
                      <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 12, color: copiedKey === key ? '#10B981' : '#94A3B8', fontWeight: 600 }}>
                        {copiedKey === key ? '✅ Copied!' : '📋 Click to copy'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 18, marginBottom: 16 }}>💬 Text Message Scripts</h2>
          {textScripts.map(({ type, icon, script }) => {
            const key = `text-${type}`;
            return (
              <div key={type} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14, marginBottom: 6 }}>{icon} For: {type}</div>
                <div
                  onClick={() => copy(script, key)}
                  style={{ backgroundColor: '#fff', border: copiedKey === key ? '1.5px solid #10B981' : '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontSize: 14, color: '#374151', lineHeight: 1.7, position: 'relative' }}
                >
                  {script}
                  <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 12, color: copiedKey === key ? '#10B981' : '#94A3B8', fontWeight: 600 }}>
                    {copiedKey === key ? '✅ Copied!' : '📋 Click to copy'}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 18, marginBottom: 16 }}>📧 Email Templates</h2>
          {emailTemplates.map(({ type, icon, subject, body }) => {
            const key = `email-${type}`;
            const fullText = `Subject: ${subject}\n\n${body}`;
            return (
              <div key={type} style={{ marginBottom: 16, backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#0A1628', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{icon} {type}</span>
                  <button
                    onClick={() => copy(fullText, key)}
                    style={{ backgroundColor: copiedKey === key ? '#10B981' : '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                  >
                    {copiedKey === key ? '✅ Copied!' : '📋 Copy All'}
                  </button>
                </div>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>
                  <span style={{ fontWeight: 600, color: '#64748B', fontSize: 12 }}>SUBJECT: </span>
                  <span style={{ color: '#0A1628', fontSize: 13, fontWeight: 600 }}>{subject}</span>
                </div>
                <div style={{ padding: '14px 16px', fontSize: 14, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{body}</div>
              </div>
            );
          })}
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 18, marginBottom: 16 }}>📄 Flyer Copy (For Trades)</h2>
          <div
            onClick={() => copy(flyerCopy, 'flyer')}
            style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, cursor: 'pointer', position: 'relative' }}
          >
            <div style={{ color: '#F5E642', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{flyerCopy}</div>
            <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 12, color: copiedKey === 'flyer' ? '#10B981' : '#94A3B8', fontWeight: 600 }}>
              {copiedKey === 'flyer' ? '✅ Copied!' : '📋 Click to copy'}
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 18, marginBottom: 16 }}>✅ DOs and ❌ DON'Ts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 12, padding: 20, border: '1px solid #86EFAC' }}>
              <div style={{ fontWeight: 700, color: '#166534', fontSize: 15, marginBottom: 12 }}>✅ DOs</div>
              {dos.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: '#16A34A', flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 13, color: '#166534', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#FFF1F2', borderRadius: 12, padding: 20, border: '1px solid #FECDD3' }}>
              <div style={{ fontWeight: 700, color: '#991B1B', fontSize: 15, marginBottom: 12 }}>❌ DON'Ts</div>
              {donts.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: '#DC2626', flexShrink: 0, marginTop: 2 }}>✗</span>
                  <span style={{ fontSize: 13, color: '#991B1B', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
