import { useState } from 'react';

const faqs = [
  {
    q: 'How accurate is the AI scanning?',
    a: 'TrustyPro AI shows a confidence percentage for each detected issue. High-confidence detections (80%+) are reliable enough for immediate contractor quotes. Lower-confidence findings prompt an in-person verification before any work is recommended.',
  },
  {
    q: 'Do I need to be tech-savvy to use TrustyPro?',
    a: 'No. If you can take a selfie, you can scan your home. Point the camera, move slowly, and the AI handles the rest. Most scans take 5–10 minutes per room or system.',
  },
  {
    q: 'What happens to my home data?',
    a: 'Your data is encrypted and privately stored in your Home Health Vault. It is never sold to third parties. You control who sees it — including whether buyers can view your maintenance record during a sale.',
  },
  {
    q: 'Are the pros in the network actually vetted?',
    a: 'Yes. Every TrustyPro partner is background-checked and licensed verification is confirmed before they appear in any match. Reviews are verified by actual completed jobs, not anonymous ratings.',
  },
  {
    q: 'What is a Group Deal and do I have to participate?',
    a: 'When 5+ neighbors need the same service category in the same area, TrustyPro negotiates group pricing on your behalf. Participation is always optional — you’ll see the group rate vs. individual rate and choose.',
  },
];

const detectItems = [
  { icon: '🌡️', label: 'HVAC age & condition' },
  { icon: '🏠', label: 'Roof granule loss' },
  { icon: '🧱', label: 'Foundation cracking patterns' },
  { icon: '⚡', label: 'Electrical panel issues' },
  { icon: '💧', label: 'Moisture indicators' },
  { icon: '🔧', label: 'Plumbing age & condition' },
];

export default function HowTrustyProWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#0A1628', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#60A5FA', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>TrustyPro · How It Works</div>
        <h1 style={{ fontSize: 'clamp(26px,5vw,50px)', fontWeight: 800, color: '#FFFFFF', margin: '0 auto 20px', maxWidth: 740, lineHeight: 1.15 }}>
          How TrustyPro Works
        </h1>
        <p style={{ fontSize: 18, color: '#93C5FD', maxWidth: 580, margin: '0 auto' }}>
          Your complete guide to AI-powered home intelligence — scanning, the vault, the pro network, and group deals.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px' }}>

        {/* Section 1: The Scan */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#DBEAFE', borderRadius: 10, padding: '10px 14px', fontSize: 22 }}>📷</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: 1, textTransform: 'uppercase' }}>Step 1</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: 0 }}>The Scan</h2>
            </div>
          </div>
          <p style={{ color: '#4B5563', fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
            Open the TrustyPro app and point your camera at any part of your home. The AI analyzes what it sees in seconds — no special equipment required.
          </p>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 14 }}>What it detects:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginBottom: 24 }}>
            {detectItems.map((d, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 10, padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>{d.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{d.label}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '16px 20px' }}>
            <span style={{ fontWeight: 700, color: '#1D4ED8' }}>Result: </span>
            <span style={{ color: '#1E40AF', fontSize: 14 }}>A detailed home health report with AI confidence levels, findings, recommendations, and contractor quote options.</span>
          </div>
        </div>

        {/* Section 2: The Vault */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#D1FAE5', borderRadius: 10, padding: '10px 14px', fontSize: 22 }}>🏦</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#10B981', letterSpacing: 1, textTransform: 'uppercase' }}>Step 2</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: 0 }}>The Vault</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {[
              { icon: '📁', title: 'Permanent record', desc: 'Every scan saves to your Home Health Vault. Your home’s health history builds over time.' },
              { icon: '💰', title: 'Adds sale value', desc: 'When you sell, buyers see your maintenance record. Documented care commands higher offers.' },
              { icon: '🔒', title: 'You control access', desc: 'Your data is encrypted. You decide who sees it — no third-party sales, ever.' },
              { icon: '🤝', title: 'Origination rights', desc: 'Contractors who serve your home earn origination rights on future work at that address.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: '22px 20px' }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#111827', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: The Pro Network */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#EDE9FE', borderRadius: 10, padding: '10px 14px', fontSize: 22 }}>👷</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', letterSpacing: 1, textTransform: 'uppercase' }}>Step 3</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: 0 }}>The Pro Network</h2>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'All TrustyPro pros are background-checked and license-verified before they appear in any match.',
              'AI matches you to the best pro for each issue — based on trade specialty, proximity, current availability, and verified ratings.',
              'Direct booking: no middleman, no lead fees passed to you. The pro you see is the one who shows up.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 10, padding: '16px 20px' }}>
                <span style={{ color: '#7C3AED', fontWeight: 800, fontSize: 16, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                <span style={{ color: '#374151', fontSize: 15, lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Group Deal */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#FEF3C7', borderRadius: 10, padding: '10px 14px', fontSize: 22 }}>🤝</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#D97706', letterSpacing: 1, textTransform: 'uppercase' }}>Step 4</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: 0 }}>The Group Deal</h2>
            </div>
          </div>
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '24px 28px' }}>
            <p style={{ color: '#78350F', fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' }}>
              When 5 or more neighbors need the same service, TrustyPro negotiates group pricing automatically. You see the group rate vs. your individual rate — and you choose.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#D97706' }}>15–25%</span>
              <span style={{ color: '#92400E', fontSize: 15 }}>average group discount on qualifying services</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Quick Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={{ fontWeight: 600, color: '#111827', fontSize: 15, paddingRight: 16 }}>{faq.q}</span>
                  <span style={{ fontSize: 18, color: '#9CA3AF', flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: '#4B5563', fontSize: 14, lineHeight: 1.75 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '44px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Your home has a health score. Find out what it is.</div>
          <p style={{ color: '#93C5FD', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Join the homeowner waitlist. TrustyPro launches in DFW first — early members get priority access and founding pricing.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3B82F6', color: '#FFFFFF', fontWeight: 700, fontSize: 16, padding: '14px 40px', borderRadius: 8, textDecoration: 'none' }}>
            Join the Homeowner Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
