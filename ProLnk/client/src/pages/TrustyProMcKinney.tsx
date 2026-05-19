import React, { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#f59e0b';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'James O.',  trade: 'HVAC & New Construction',     rating: 4.9, reviews: 217, response: '27 min', badge: 'Top Pro' },
  { name: 'Maria S.', trade: 'Irrigation & Drainage',        rating: 4.8, reviews: 154, response: '33 min', badge: 'Verified' },
  { name: 'Kevin T.', trade: 'Foundation & Soil Settlement', rating: 4.9, reviews: 188, response: '21 min', badge: 'Elite' },
];

const testimonials = [
  { name: 'Brittany H.', zip: 'McKinney 75070', text: 'Our 2019 build felt brand-new. TrustyPro found the builder-grade HVAC was running at 78% efficiency — James replaced the air handler and we\’re saving $140/month in cooling costs.' },
  { name: 'Ryan P.',     zip: 'McKinney 75071', text: 'Irrigation system had 4 broken heads and a leaking zone valve. We had no idea — just thought the grass was patchy. Maria fixed it in 2 hours. Now our lawn is actually green.' },
  { name: 'Ashley N.',   zip: 'McKinney 75069', text: 'Saw a diagonal crack in the drywall by our garage door. Kevin confirmed it was soil settlement, not structural failure. $2,800 repair vs. potentially $25K+ if we\’d waited.' },
];

const faqs = [
  {
    q: 'Is new construction really at risk of home issues?',
    a: 'Yes. Builder-grade systems are designed to meet code at the lowest viable cost — not for 20-year durability. McKinney homes built 2015–2019 are entering the 7–10 year window when HVAC coils, irrigation controllers, and soil settlement cracks typically surface. TrustyPro\’s scan is specifically calibrated for this age range.',
  },
  {
    q: 'What\’s the deal with soil settlement in McKinney?',
    a: 'McKinney\’s rapid development graded and backfilled thousands of lots quickly. Fill soil takes 5–10 years to fully compact. This causes gradual foundation settlement — diagonal cracks at door corners, sticking doors, and sloping floors. Kevin catches this early when repair costs are measured in thousands, not tens of thousands.',
  },
  {
    q: 'How do I know if my builder warranty is still valid?',
    a: 'Most new construction comes with a 1-year workmanship warranty and 10-year structural warranty. However, you must document and report issues before the deadline. TrustyPro\’s scan helps you identify issues you can submit to your builder while you\’re still covered — this alone is worth the free scan.',
  },
  {
    q: 'Is the home health score free?',
    a: 'Yes. Your first TrustyPro home health scan and score report are completely free with no obligation to book a pro.',
  },
];

export default function TrustyProMcKinney() {
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

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 60%)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#eef2ff', border: `1px solid ${INDIGO}`, color: INDIGO, padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Serving McKinney, TX · ZIPs 75069 · 75070 · 75071
        </div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 800, margin: '0 auto 24px' }}>
          McKinney's Fastest-Growing Zip Codes <span style={{ color: INDIGO }}>Need the Most Home Attention</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
          McKinney added 23,000 new homes since 2018. Builder-grade systems are designed to last 10 years — and that window is closing. TrustyPro catches issues before warranties expire and before small problems become expensive ones.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      {/* City Stats */}
      <section style={{ background: '#f9fafb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>McKinney by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Value',        value: '$465K', sub: 'McKinney metro 2025' },
              { label: 'New Homes Since 2018',  value: '23,000', sub: 'across McKinney ZIPs' },
              { label: 'Avg New Build Age',     value: '6 yrs', sub: 'entering warranty window' },
              { label: 'Irrigation Failures',   value: '#2',   sub: 'most common scan finding' },
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
              { step: '01', icon: '🔍', title: 'Scan', desc: 'Answer 12 questions about your home. Our AI cross-references McKinney building permits, subdivision data, and your home\’s build year to identify age-specific risks.' },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score across 6 categories: structure, roof, HVAC, electrical, plumbing, and irrigation.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: 'Choose from verified McKinney pros experienced in new construction and builder-grade system replacement. Flat pricing, no upsells.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>McKinney-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 12, fontSize: 16 }}>Builder-grade systems are designed to last 10 years — McKinney homeowners are hitting that window now</p>
          <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: 40, fontSize: 14 }}>TrustyPro catches issues before warranties expire</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '🌡️', title: 'Builder-Grade HVAC Systems at Year 7–10', desc: 'Builder-grade HVAC systems use lower-efficiency components to hit price targets. By year 7, refrigerant tends to leak, coils corrode, and airflow drops. A failing HVAC in a McKinney summer isn\’t just uncomfortable — it\’s dangerous. TrustyPro measures your system\’s efficiency output, not just its age.' },
              { icon: '💦', title: 'Irrigation System Failures', desc: 'Irrigation systems in McKinney\’s newer subdivisions are often installed at builder cost, not homeowner quality. Zone valves fail, solenoids stick, and heads break under soil movement. Undetected leaks add $40–$120 to your water bill monthly. Maria\’s team finds and fixes them in a single visit.' },
              { icon: '⬜', title: 'Soil Settlement Cracks in Fill Lots', desc: 'Rapidly developed areas backfill lots with imported soil that takes 5–10 years to stabilize. As it compresses, foundations shift slightly — causing diagonal drywall cracks, sticking doors, and subtle floor slopes. Catching this at year 6–8 means a $2,000–$5,000 fix, not a $30,000 structural repair.' },
              { icon: '🏠', title: 'Warranty Window Closing Fast', desc: 'Most builder structural warranties expire at 10 years. If you\’re in a home built 2015–2018, your window is closing. TrustyPro\’s scan identifies defects you can submit for warranty coverage before the deadline — this single benefit alone pays for years of proactive maintenance.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Verified Pros Serving McKinney</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · Experienced with McKinney new construction</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>McKinney Homeowners Trust TrustyPro</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — McKinney</h2>
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
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Your McKinney Home Deserves a Health Score</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free, fast, and built for DFW new construction. Don't let your builder warranty expire without a full systems check.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving McKinney TX 75069, 75070, 75071 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
