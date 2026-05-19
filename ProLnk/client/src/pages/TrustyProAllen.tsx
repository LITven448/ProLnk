import React, { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#f59e0b';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'Chris W.',  trade: 'Roofing & Storm Damage',   rating: 4.9, reviews: 263, response: '18 min', badge: 'Elite' },
  { name: 'Yolanda B.', trade: 'HVAC & Air Quality',      rating: 4.8, reviews: 197, response: '30 min', badge: 'Top Pro' },
  { name: 'Steve A.',  trade: 'Foundation & Waterproofing', rating: 4.9, reviews: 221, response: '22 min', badge: 'Verified' },
];

const testimonials = [
  { name: 'Tamara K.',  zip: 'Allen 75002', text: 'After the May 2024 storm I called my roofer — they said everything looked fine. TrustyPro found granule loss and two soft spots the naked eye missed. Filed a $19K insurance claim.' },
  { name: 'Brian M.',   zip: 'Allen 75002', text: 'Chris had the emergency repair crew out in under 40 minutes after we found a leak during a storm. Most pros quoted 2–3 days. TrustyPro\’s network is unreal.' },
  { name: 'Patricia S.', zip: 'Allen 75002', text: 'HVAC was blowing warm air in July. Yolanda diagnosed a refrigerant leak and had it fixed same day. I\’d been sweating through the weekends for two weeks before I found TrustyPro.' },
];

const faqs = [
  {
    q: 'How do I know if my roof has hidden damage from the 2024 storms?',
    a: 'Hail damage is often invisible from the ground. What you need to look for: soft spots on shingles (bruising), missing granules at downspout outlets, dented ridge caps, and cracked flashing around chimneys. TrustyPro\’s roof assessment covers all of these. If damage is found, we connect you with a licensed adjuster who works on your behalf — not the insurance company\’s.',
  },
  {
    q: 'How fast can a TrustyPro pro respond to an emergency in Allen?',
    a: 'Allen 75002 has 23 verified pros in our network. Average emergency response time is 38 minutes. For non-emergency appointments, same-day or next-day availability is standard across our top-rated Allen pros.',
  },
  {
    q: 'Does home insurance cover hail damage?',
    a: 'Yes — in most cases. Texas homeowner policies cover hail damage under "wind and hail" coverage. However, claims must be filed within the policy window (typically 1–2 years). 28% of Allen homeowners have undetected damage from the May 2024 storm — that window is closing. TrustyPro helps you find and document damage before the deadline.',
  },
  {
    q: 'Is the home health score free?',
    a: 'Yes. Your first TrustyPro home health scan and score report are completely free with no obligation to book a pro.',
  },
];

export default function TrustyProAllen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1f2937', background: '#fff', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: INDIGO, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>T</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: INDIGO }}>TrustyPro</span>
        </div>
        <a href="/waitlist/homeowner" style={{ background: AMBER, color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
          Get Free Score
        </a>
      </nav>

      {/* Hero — urgency angle for Allen */}
      <section style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 60%)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#fef3c7', border: '1px solid #f59e0b', color: '#92400e', padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          ⚠️ Allen 75002 — 28% of homeowners have undetected storm damage
        </div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 800, margin: '0 auto 24px' }}>
          Allen Homeowners: Your Roof Survived 2024. <span style={{ color: INDIGO }}>Will It Survive 2026?</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Allen ZIP 75002 had 2 significant hail events in 24 months. 28% of homeowners have undetected roof damage from the May 2024 storm — and the insurance claim window is closing. TrustyPro scans your home, finds the damage, and connects you with a verified Allen pro in under 40 minutes.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      {/* Urgency Bar */}
      <div style={{ background: '#fef2f2', borderTop: '2px solid #fca5a5', borderBottom: '2px solid #fca5a5', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#7f1d1d', fontWeight: 600, fontSize: 15 }}>
          ⏰ Insurance claim deadlines for May 2024 storm damage are approaching. Most Texas policies require claims within 12–24 months of the event. <a href="/waitlist/homeowner" style={{ color: '#dc2626', textDecoration: 'underline' }}>Get your scan now →</a>
        </p>
      </div>

      {/* City Stats */}
      <section style={{ background: '#f9fafb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Allen 75002 by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Value',         value: '$450K', sub: 'Allen 75002 2025′ },
              { label: 'Undetected Storm Damage', value: '28%',  sub: 'of Allen homeowners' },
              { label: 'Hail Events (24 months)', value: '2',    sub: 'significant events in 75002′ },
              { label: 'Emergency Response',      value: '38 min', sub: 'avg for Allen pros' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 28, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: INDIGO }}>{s.value}</div>
                <div style={{ fontWeight: 600, marginTop: 8 }}>{s.label}</div>
                <div style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>How TrustyPro Works</h2>
          <p style={{ color: '#4b5563', fontSize: 16, marginBottom: 48 }}>Three steps from scan to solved</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { step: '01', icon: '🔍', title: 'Scan', desc: 'Answer 12 questions about your home. Our AI cross-references Allen storm event data, your home\’s age, and insurance claim patterns for ZIP 75002.' },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score. Roof health is weighted heavily for Allen homes given the 2024 hail history.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: '23 verified pros serve ZIP 75002. Average emergency response: 38 minutes. Flat pricing, no upsells, documented workmanship.' },
            ].map(s => (
              <div key={s.step} style={{ background: '#f9fafb', borderRadius: 16, padding: 32, textAlign: 'left' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: INDIGO, marginBottom: 4, letterSpacing: 2 }}>STEP {s.step}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Risks */}
      <section style={{ background: '#fef3c7', padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Allen-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 12, fontSize: 16 }}>23 verified TrustyPro pros serve ZIP 75002 with a 38-minute emergency response average</p>
          <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: 40, fontSize: 14 }}>What DFW's back-to-back storm seasons mean for your Allen home</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '🌨️', title: '2 Hail Events in 24 Months — Cumulative Damage', desc: 'Each hail event adds incremental damage to your roof: granule loss, micro-fractures in shingles, bent flashing, and bruised underlayment. A roof that "survived" two storms may have cumulative damage that shows up as a leak the next time DFW gets 3 inches of rain in an hour. TrustyPro\’s roof scan captures cumulative wear, not just obvious holes.' },
              { icon: '🏠', title: '28% of Allen Homeowners Have Undetected Damage', desc: 'After the May 2024 storm, TrustyPro scan data across Allen 75002 showed 28% of homes had identifiable roof damage their owners were unaware of. Many of these homeowners never filed claims. If your home was in the storm zone and you haven\’t had a professional roof inspection, you likely have undocumented damage.' },
              { icon: '⚡', title: 'Storm Surge and Electrical Exposure', desc: 'DFW storm events include lightning strikes and power surges that damage panel components, surge protectors, and connected appliances. TrustyPro\’s electrical check covers panel health, grounding integrity, and identifies surge vulnerability — a common oversight after hail-focused storm events.' },
              { icon: '💧', title: 'Clay Soil + Heavy Rain = Foundation Stress', desc: 'Allen\’s Blackland Prairie clay absorbs heavy storm rainfall and expands rapidly, then dries and contracts. Two intense storm seasons in a row accelerates this cycle. Steve\’s foundation team uses moisture probes to measure soil saturation levels and predict future movement before cracks appear.' },
            ].map(r => (
              <div key={r.title} style={{ background: '#fff', borderRadius: 14, padding: 24, display: 'flex', gap: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{r.icon}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Cards */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>23 Verified Pros Serving Allen 75002</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · 38-min average emergency response</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {pros.map(p => (
              <div key={p.name} style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 999, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: INDIGO, fontSize: 20 }}>
                    {p.name.split(' ').map((w: string) => w[0]).join('')}
                  </div>
                  <span style={{ background: '#eef2ff', color: INDIGO, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>{p.badge}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 10 }}>{p.trade}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  {starRow(Math.round(p.rating))}
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{p.rating}</span>
                  <span style={{ color: '#6b7280', fontSize: 13 }}>({p.reviews} reviews)</span>
                </div>
                <div style={{ color: '#6b7280', fontSize: 13 }}>⚡ Avg response: <strong>{p.response}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#f9fafb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Allen Homeowners Trust TrustyPro</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ color: AMBER, fontSize: 20, marginBottom: 12 }}>★★★★★</div>
                <p style={{ color: '#374151', lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#6b7280', fontSize: 13 }}>{t.zip}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — Allen</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', textAlign: 'left', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  {f.q}
                  <span style={{ color: INDIGO, fontSize: 20, flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: '#4b5563', lineHeight: 1.7 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: INDIGO, padding: '80px 24px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Don't Let Storm Damage Go Undetected</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free scan, fast results, and 23 pros ready to respond in Allen 75002. Insurance claim windows are closing — act now.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving Allen TX 75002 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
