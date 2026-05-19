import React, { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#f59e0b';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'Marcus H.', trade: 'Foundation & Structural', rating: 4.9, reviews: 312, response: '25 min', badge: 'Top Pro' },
  { name: 'Rhonda C.', trade: 'HVAC & Air Quality',      rating: 4.8, reviews: 204, response: '31 min', badge: 'Verified' },
  { name: 'Derek L.',  trade: 'Roofing & Hail Damage',   rating: 4.9, reviews: 178, response: '19 min', badge: 'Elite' },
];

const testimonials = [
  { name: 'Jennifer T.', zip: 'Frisco 75034', text: 'After the 2022 hailstorm I assumed my roof was fine. TrustyPro flagged micro-fractures my insurance adjuster missed — I got a $14K claim approved.' },
  { name: 'Carlos M.',   zip: 'Frisco 75033', text: 'Our foundation was shifting almost an inch per year. Marcus caught it early; repair cost $4,200 instead of the $40K+ it would have been unchecked.' },
  { name: 'Sarah W.',    zip: 'Frisco 75035', text: 'HVAC was 11 years old and running 30% over capacity. Rhonda replaced it before peak summer — electric bill dropped $180/month.' },
];

const faqs = [
  {
    q: 'Does Frisco clay soil really cause foundation problems?',
    a: 'Yes. Blackland Prairie clay expands up to 30% when wet and shrinks when dry, creating cyclic stress that causes pier settlement, beam cracks, and door-frame misalignment. TrustyPro scans track movement trends over time so you know exactly when to act.',
  },
  {
    q: 'How old is the typical HVAC system in a Frisco home?',
    a: "Most Frisco homes were built between 2000–2018. HVAC systems have a 10–15 year lifespan, meaning a large portion of Frisco's housing stock is entering or past its service window. Our scan checks refrigerant levels, coil condition, and airflow efficiency.",
  },
  {
    q: 'Do Frisco school-district boundaries affect home values?',
    a: "Significantly. Homes in Frisco ISD's top-rated feeder patterns carry a 12–18% premium. Maintaining your home's health score protects that premium when you sell — buyers and appraisers increasingly factor deferred maintenance into offers.",
  },
  {
    q: 'Is the home health score free?',
    a: "Yes. Your first TrustyPro home health scan and score report are completely free. There's no obligation to book a pro — though 74% of homeowners find at least one item worth addressing.",
  },
];

export default function TrustyProFrisco() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1f2937', background: '#fff', minHeight: '100vh' }}>

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

      <section style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff 60%)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#eef2ff', border: `1px solid ${INDIGO}`, color: INDIGO, padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Serving Frisco, TX · ZIPs 75033 · 75034 · 75035
        </div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 780, margin: '0 auto 24px' }}>
          Frisco Homeowners: AI-Powered Home Intelligence for <span style={{ color: INDIGO }}>75034</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.7 }}>
          In 2022, 18,000 Frisco homes filed hail claims in a single week. Clay soil moves your foundation every year. TrustyPro scans your home, scores every system, and connects you with a verified pro — before small issues become expensive emergencies.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      <section style={{ background: '#f9fafb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Frisco by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Value', value: '$485K', sub: 'Frisco metro 2025′ },
              { label: 'Foundation Risk', value: '67%', sub: 'of homes on clay soil' },
              { label: 'Hail Events / Year', value: '4.2 avg', sub: 'DFW north corridor' },
              { label: 'HVAC Issues Found', value: '34%', sub: 'of TrustyPro scans' },
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

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>How TrustyPro Works</h2>
          <p style={{ color: '#4b5563', fontSize: 16, marginBottom: 48 }}>Three steps from scan to solved</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { step: '01', icon: '🔍', title: 'Scan', desc: "Answer 12 questions about your home. Our AI cross-references local weather data, your home's age, and DFW-specific risk factors." },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score across 6 categories: structure, roof, HVAC, electrical, plumbing, and water quality.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: 'Choose from verified Frisco pros with real reviews. No cold calls. No upsells. Flat pricing, guaranteed.' },
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

      <section style={{ background: '#fef3c7', padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Frisco-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48, fontSize: 16 }}>What our data shows for homes in your ZIP codes</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '🌧️', title: 'Hail Impact — 18,000 Claims in One Week', desc: "The April 2022 hailstorm produced 2-inch hailstones across Frisco. Many homeowners didn't file claims — and now have latent roof damage that leaks during heavy rains. TrustyPro's roof scan checks for bruised shingles, granule loss, and flashing gaps." },
              { icon: '⬜', title: 'Blackland Prairie Clay Soil', desc: "Frisco sits on expansive clay that moves 2–4 inches seasonally. This cyclic heaving is the #1 cause of foundation damage in Collin County. One in three Frisco homes scanned by TrustyPro shows measurable foundation movement — most homeowners had no idea." },
              { icon: '🌡️', title: 'HVAC Stress from Texas Summers', desc: 'Systems running during 110°F heat index days experience accelerated wear. Frisco homes built in 2005–2015 are now entering the HVAC replacement window. A failing system can spike your electric bill by $150–$300/month before it fails entirely.' },
              { icon: '💧', title: 'Hard Water Damage (340+ PPM)', desc: "Frisco water hardness averages 340+ PPM, causing scale buildup inside water heaters, dishwashers, and pipes. Without a softener, water heater efficiency drops 29% over 5 years. TrustyPro checks water quality and recommends mitigation options." },
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

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Verified Pros Serving Frisco</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · Real reviews from Frisco homeowners</p>
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

      <section style={{ background: '#f9fafb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frisco Homeowners Trust TrustyPro</h2>
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

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — Frisco</h2>
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

      <section style={{ background: INDIGO, padding: '80px 24px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Your Frisco Home Deserves a Health Score</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free, fast, and built for DFW homes. No contractor pressure. Just clarity about your biggest asset.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving Frisco TX 75033, 75034, 75035 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
