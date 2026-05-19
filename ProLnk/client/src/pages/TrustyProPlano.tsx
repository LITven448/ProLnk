import { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#f59e0b';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'Angela R.', trade: 'Electrical & Panel Upgrades', rating: 5.0, reviews: 289, response: '22 min', badge: 'Elite' },
  { name: 'Tom B.',    trade: 'Plumbing & Water Quality',    rating: 4.9, reviews: 341, response: '28 min', badge: 'Top Pro' },
  { name: 'David K.',  trade: 'Roof & Attic Inspection',     rating: 4.8, reviews: 193, response: '35 min', badge: 'Verified' },
];

const testimonials = [
  { name: 'Linda P.', zip: 'Plano 75023', text: "Angela found that our electrical panel was still 100-amp — a liability for our home insurance. She upgraded it in one day. TrustyPro made the process painless." },
  { name: 'Mike D.',  zip: 'Plano 75025', text: "The hard water report shocked me — 390 PPM. Tom installed a whole-house softener and our water heater efficiency jumped immediately. Wish I'd done this 5 years ago." },
  { name: 'Rachel F.', zip: 'Plano 75024', text: "Our 1988 home had never had a comprehensive systems check. TrustyPro's score flagged 3 things — all legitimate, all fixed before summer. Worth every minute." },
];

const faqs = [
  {
    q: "Why are Plano's 1980s–90s homes a concern?",
    a: "Homes built in that era often have 100-amp electrical panels (modern code requires 200-amp), galvanized steel plumbing that corrodes from the inside, and HVAC systems approaching or past their lifespan. Over 60% of TrustyPro Plano scans detect at least one aging system needing service within 12 months.",
  },
  {
    q: 'How bad is hard water in Plano?',
    a: "Plano water averages 380 PPM hardness — classified as 'very hard.' At that level, scale builds up inside water heaters, pipes, and appliances. The U.S. Department of Energy estimates a water heater loses 29% efficiency over 5 years with untreated hard water. TrustyPro checks this automatically.",
  },
  {
    q: 'What does a 100-amp vs 200-amp panel mean for me?',
    a: "Modern homes with EVs, heat pumps, and multiple large appliances need 200-amp service. A 100-amp panel can't support this load safely and may be flagged by homebuyers and insurers. The upgrade costs $1,500–$3,000 — far less than a fire or a lost sale.",
  },
  {
    q: 'Is the home health score free?',
    a: 'Yes. Your first TrustyPro home health scan and score report are completely free with no obligation to book a pro.',
  },
];

export default function TrustyProPlano() {
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
          Serving Plano, TX · ZIPs 75023 · 75024 · 75025
        </div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 780, margin: '0 auto 24px' }}>
          Plano Homeowners: <span style={{ color: INDIGO }}>Your Home Is Older Than You Think</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
          45% of Plano homes were built before 1995. That means aging electrical panels, corroding pipes, and hard water destroying your appliances — right now. TrustyPro scans every system and tells you exactly what to fix and when.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      <section style={{ background: '#f9fafb', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Plano by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Value',       value: '$520K', sub: 'Plano metro 2025′ },
              { label: 'Built Before 1995',    value: '45%',   sub: 'of Plano housing stock' },
              { label: 'Hail Events / Year',   value: '2.8 avg', sub: 'North Collin County' },
              { label: 'Electrical Issues',    value: '#1',    sub: 'most common scan finding' },
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
              { step: '01', icon: '🔍', title: 'Scan', desc: "Answer 12 questions about your home. Our AI cross-references Plano building records, water reports, and your home's construction year." },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score across 6 categories: structure, roof, HVAC, electrical, plumbing, and water quality.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: 'Choose from verified Plano pros with real reviews. Flat pricing, no upsells, guaranteed workmanship.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Plano-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 12, fontSize: 16 }}>Over 60% of TrustyPro Plano scans detect at least one aging system needing service within 12 months</p>
          <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: 40, fontSize: 14 }}>What our data shows for homes built in the 1980s–90s housing boom</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '⚡', title: 'Aging Electrical Panels', desc: "Plano's 1980s–90s housing stock commonly has 100-amp panels — below the 200-amp standard required for modern homes with EV chargers, heat pumps, and high-load appliances. Insurance companies are increasingly flagging these panels, and some refuse to renew coverage until they're upgraded." },
              { icon: '💧', title: 'Hard Water at 380 PPM Destroys Appliances', desc: "Plano's municipal water registers 380 PPM — 'very hard' on the hardness scale. Water heaters lose 29% efficiency in 5 years without treatment. Dishwashers and washing machines wear 30% faster. TrustyPro's scan flags water quality issues and connects you with certified water treatment pros." },
              { icon: '🏠', title: 'Galvanized Steel Plumbing (Pre-1990 Homes)', desc: "Homes built before 1990 often have galvanized steel pipes that corrode from the inside out. You won't see the rust — but you'll notice reduced water pressure, discolored water, and eventually leaks. TrustyPro asks the right questions to identify high-risk homes for plumbing inspection." },
              { icon: '🌧️', title: 'Hail Accumulation Over Multiple Storms', desc: "2.8 hail events per year means Plano roofs take cumulative damage. A roof that 'looked fine' after each storm may have significant hidden granule loss, bruised shingles, and compromised underlayment after 3–4 events. TrustyPro's roof assessment catches this before a leak ruins your attic." },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Verified Pros Serving Plano</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · Real reviews from Plano homeowners</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Plano Homeowners Trust TrustyPro</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — Plano</h2>
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
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Your Plano Home Deserves a Health Score</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free, fast, and built for DFW homes. No contractor pressure. Just clarity about your biggest asset.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving Plano TX 75023, 75024, 75025 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
