// SEO: TrustyPro Richardson TX — Telecom Corridor — Aging 1970s Homes, Foundation Issues, Historic Flooding
// Target keywords: Richardson TX home inspection, Richardson foundation repair, Richardson home maintenance
// Geo: 75080, 75081, 75082, 75083 | Population ~120K | Avg home age 42 years
// Canonical: https://trustypro.io/trustypro/richardson
import React, { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#F59E0B';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'James O.',   trade: 'Foundation Diagnostics & Repair',    rating: 4.9, reviews: 402, response: '20 min', badge: 'Top Pro' },
  { name: 'Sandra B.', trade: 'Electrical Systems Modernization',    rating: 4.8, reviews: 267, response: '29 min', badge: 'Verified' },
  { name: 'Luis F.',   trade: 'Plumbing Repiping & Rehabilitation',  rating: 4.9, reviews: 231, response: '23 min', badge: 'Elite' },
];

const testimonials = [
  { name: 'Dr. Allen W.', zip: 'Richardson 75080', text: 'My 1974 AT&T-era neighborhood home had original galvanized pipes corroding from the inside. Luis caught it before we had a catastrophic failure — repipe cost $8K instead of the $80K in water damage I was heading toward.' },
  { name: 'Rachel M.',    zip: 'Richardson 75081', text: 'James found that our foundation had shifted 1.2 inches due to clay movement over 40 years. The repair was under $6K. Our neighbors in the same block waited — theirs was $35K by the time they noticed.' },
  { name: 'Stan G.',      zip: 'Richardson 75082', text: 'Sandra replaced our 1978 fuse panel that still had some original Federal Pacific breakers. Our homeowners insurance premium dropped $400/year just from that one upgrade.' },
];

const faqs = [
  {
    q: 'Why do Richardson homes have such high foundation issue rates?',
    a: 'Richardson has some of the oldest suburban housing stock in DFW — most of the Telecom Corridor neighborhoods were built in the 1970s. After 40+ years of cyclic clay soil movement, the cumulative stress on pier-and-beam and early slab foundations is substantial. Our data shows 1 in 3 Richardson homes scanned has measurable foundation displacement.',
  },
  {
    q: 'How do I know if my 1970s plumbing needs to be replaced?',
    a: "Original galvanized steel pipes installed in the 1970s have a 40-50 year service life — meaning they are at or past end-of-life for most Richardson homes. Signs include rust-colored water, low pressure, and pinhole leaks. TrustyPro's plumbing scan assesses pipe material, age, and water quality indicators to recommend whether spot repair or full repipe makes economic sense.",
  },
  {
    q: 'Which Richardson ZIP codes have historic flooding risk?',
    a: 'The 75080 and 75081 ZIP codes along Cottonwood Creek and the Spring Creek drainage corridors have documented FEMA flood event history. Homes in these areas should have sump pump systems, proper grading, and water intrusion documentation. TrustyPro checks all three and flags homes that lack adequate drainage protection.',
  },
  {
    q: 'Is the home health score free?',
    a: 'Yes. Your first TrustyPro home health scan and score report are completely free. No obligation to book a pro — though 74% of homeowners find at least one item worth addressing.',
  },
];

export default function TrustyProRichardson() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1f2937', background: '#f8f9fa', minHeight: '100vh' }}>

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

      <section style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f8f9fa 60%)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#eef2ff', border: `1px solid ${INDIGO}`, color: INDIGO, padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Serving Richardson, TX · ZIPs 75080 · 75081 · 75082 · 75083
        </div>
        <h1 style={{ fontSize: 'clamp(26px,4.5vw,50px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 800, margin: '0 auto 24px' }}>
          Richardson TX: Telecom Corridor Headquarters, But <span style={{ color: INDIGO }}>Your Home Isn't Smart Yet</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Home to AT&T and Ericsson, Richardson's neighborhoods average 42 years old — among DFW's oldest suburban housing stock. Foundation issues from decades of clay movement, galvanized pipes past their service life, and historic flooding zones make Richardson homes complex to maintain. TrustyPro gives you the intelligence your home has been missing.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Richardson by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Age', value: '42 yrs', sub: 'Oldest suburban stock in DFW' },
              { label: 'Foundation Issues', value: '1 in 3', sub: 'homes scanned show movement' },
              { label: 'Plumbing Risk', value: '48%', sub: 'of pre-1980 homes need repipe' },
              { label: 'Flood Zone Homes', value: '~12%', sub: 'in FEMA-designated areas' },
            ].map(s => (
              <div key={s.label} style={{ background: '#f8f9fa', border: '1px solid #e5e7eb', borderRadius: 16, padding: 28, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: INDIGO }}>{s.value}</div>
                <div style={{ fontWeight: 600, marginTop: 8 }}>{s.label}</div>
                <div style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>How TrustyPro Works</h2>
          <p style={{ color: '#4b5563', fontSize: 16, marginBottom: 48 }}>Three steps from scan to solved</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { step: '01', icon: '🔍', title: 'Scan', desc: "Answer 12 questions about your home. Our AI cross-references Richardson's flooding history, soil data, and 1970s-specific failure modes." },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score across 6 categories: structure, roof, HVAC, electrical, plumbing, and water quality.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: 'Choose from verified Richardson pros with real reviews. No cold calls. No upsells. Flat pricing, guaranteed.' },
            ].map(s => (
              <div key={s.step} style={{ background: '#fff', borderRadius: 16, padding: 32, textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: INDIGO, marginBottom: 4, letterSpacing: 2 }}>STEP {s.step}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fef3c7', padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Richardson-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48, fontSize: 16 }}>What our data shows for homes in your ZIP codes</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '🏛️', title: 'Aging Housing Stock — 40+ Years of Accumulated Risk', desc: "Richardson's 1970s neighborhoods have spent four decades on Blackland Prairie clay. Each freeze-thaw and drought cycle moves foundations incrementally. By the time movement becomes visible, repair costs have often multiplied. Our scan catches the early indicators before they compound." },
              { icon: '⚡', title: 'Electrical Systems from the 1970s Era', desc: 'Homes built between 1970–1985 often have aluminum branch wiring, which expands and contracts differently than copper — creating loose connections that arc. Federal Pacific and Zinsco panels common in this era have documented failure rates. Sandra\’s team specializes in safe modernization.' },
              { icon: '🚰', title: 'Galvanized Plumbing Past Service Life', desc: 'Galvanized steel pipes installed in the 1970s corrode from the inside out, restricting flow and leaching rust. The interior scale is invisible until a pipe fails or you notice water pressure dropping. Richardson homes averaging 42 years old are statistically overdue for assessment.' },
              { icon: '🌊', title: 'Historic Flooding in Creek Corridors', desc: 'Cottonwood Creek and Spring Creek tributaries in Richardson have documented FEMA flood histories. Homes in 75080 and 75081 along these corridors need active drainage management, sump systems, and foundation waterproofing — not just flood insurance.' },
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

      <section style={{ padding: '64px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Verified Pros Serving Richardson</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · Real reviews from Richardson homeowners</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {pros.map(p => (
              <div key={p.name} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
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

      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Richardson Homeowners Trust TrustyPro</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#f8f9fa', borderRadius: 16, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ color: AMBER, fontSize: 20, marginBottom: 12 }}>★★★★★</div>
                <p style={{ color: '#374151', lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#6b7280', fontSize: 13 }}>{t.zip}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — Richardson</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
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

      <section style={{ background: INDIGO, padding: '80px 24px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Your Richardson Home Deserves a Health Score</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free, fast, and built for DFW's oldest suburban neighborhoods. No contractor pressure. Just clarity about your biggest asset.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving Richardson TX 75080, 75081, 75082, 75083 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
