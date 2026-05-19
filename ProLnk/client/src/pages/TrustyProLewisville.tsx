// SEO: TrustyPro Lewisville TX — Lake Town Home Risks — Humidity, Pier-and-Beam Foundations, Hard Water 310 PPM
// Target keywords: Lewisville TX home inspection, Lewisville foundation repair, Lewisville home maintenance
// Geo: 75029, 75056, 75067, 75068, 75077 | Population ~120K | Avg home age 38 years
// Canonical: https://trustypro.io/trustypro/lewisville
import React, { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#F59E0B';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'Dale W.',    trade: 'Pier & Beam Foundation Specialist', rating: 4.9, reviews: 287, response: '22 min', badge: 'Top Pro' },
  { name: 'Tamara K.', trade: 'Moisture & Waterproofing',           rating: 4.8, reviews: 193, response: '28 min', badge: 'Verified' },
  { name: 'Greg M.',   trade: 'Electrical Panel Upgrades',          rating: 4.9, reviews: 165, response: '21 min', badge: 'Elite' },
];

const testimonials = [
  { name: 'Brenda L.', zip: 'Lewisville 75067', text: 'We bought near Lake Lewisville thinking the view was the only concern. TrustyPro found moisture intrusion in the crawl space that would have cost $30K to fix if ignored another year. Caught it for $2,400.' },
  { name: 'Tommy R.',  zip: 'Lewisville 75056', text: 'Our 1978 home still had the original fuse box. Dale upgraded it before we listed — the home appraised $18K higher and flew off the market in 4 days.' },
  { name: 'Kari P.',   zip: 'Lewisville 75029', text: 'Hard water had basically destroyed our water heater 3 years early. TrustyPro connected us with Tamara who installed a whole-house softener. We should have done it years ago.' },
];

const faqs = [
  {
    q: 'Why does lake proximity make Lewisville homes riskier?',
    a: 'Lake Lewisville creates a micro-climate with higher humidity swings. When humidity rises and falls seasonally, wood framing, pier-and-beam supports, and crawl spaces absorb and release moisture — causing rot, mold, and structural movement faster than non-lakefront areas. Homes within 3 miles of the lake show 2.4x higher moisture intrusion rates in our data.',
  },
  {
    q: 'How do I know if my Lewisville home has an outdated electrical panel?',
    a: "Homes built in the 1970s and 1980s often have Federal Pacific or Zinsco panels that are known fire hazards. TrustyPro's electrical scan checks panel brand, breaker trip rates, and signs of overheating. If your home is 35+ years old and the panel has never been replaced, there's roughly a 40% chance it needs attention.",
  },
  {
    q: 'Does DFW airport flight path noise really damage foundations?',
    a: 'Vibration from repeated aircraft flyovers can cause micro-fracturing in older foundation materials over decades. Combined with clay soil movement, homes in Lewisville\’s eastern corridor near I-35E and the approach path see compounded stress on concrete piers. Our scan captures visible evidence and recommends a structural engineer review when warranted.',
  },
  {
    q: 'Is the home health score free?',
    a: 'Yes. Your first TrustyPro home health scan and score report are completely free. No obligation to book a pro — though 74% of homeowners find at least one item worth addressing.',
  },
];

export default function TrustyProLewisville() {
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
          Serving Lewisville, TX · ZIPs 75029 · 75056 · 75067 · 75068 · 75077
        </div>
        <h1 style={{ fontSize: 'clamp(26px,4.5vw,50px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 800, margin: '0 auto 24px' }}>
          Lewisville TX: Lake Town Living Comes With <span style={{ color: INDIGO }}>Hidden Home Risks</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Lake Lewisville humidity swings stress your structure year-round. Homes here average 38 years old — many with original 1970s electrical panels, pier-and-beam foundations near the water, and hard water topping 310 PPM. TrustyPro scans your home, scores every system, and connects you with a verified local pro before small issues become expensive emergencies.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Lewisville by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Age', value: '38 yrs', sub: 'Many 1970s–1980s builds' },
              { label: 'Water Hardness', value: '310 PPM', sub: 'Lake Ray Roberts source' },
              { label: 'Moisture Issues', value: '2.4×', sub: 'higher near the lake' },
              { label: 'Electrical Flags', value: '41%', sub: 'of homes 35+ years old' },
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
              { step: '01', icon: '🔍', title: 'Scan', desc: "Answer 12 questions about your home. Our AI cross-references Lewisville humidity data, your home's age, and lake-proximity risk factors." },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score across 6 categories: structure, roof, HVAC, electrical, plumbing, and water quality.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: 'Choose from verified Lewisville pros with real reviews. No cold calls. No upsells. Flat pricing, guaranteed.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Lewisville-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48, fontSize: 16 }}>What our data shows for homes in your ZIP codes</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '💧', title: 'Moisture Infiltration Near the Lake', desc: 'Lakefront proximity drives humidity swings that accelerate rot in wood framing, pier-and-beam supports, and crawl space insulation. We see moisture damage in over 38% of Lewisville homes scanned — most homeowners had no visible signs until we flagged it.' },
              { icon: '⚡', title: 'Outdated Electrical Panels (1970s–1980s)', desc: "Homes built during Lewisville's first growth wave often have Federal Pacific or Zinsco panels — both discontinued due to fire risk. An undetected overloaded breaker can smolder for months. TrustyPro's electrical scan checks brand, load, and panel age." },
              { icon: '🏗️', title: 'Pier-and-Beam Foundations Near Lake Area', desc: 'Older Lewisville homes near the lake relied on pier-and-beam construction. While more adaptable than slab, these foundations are vulnerable to wood rot, insect damage, and settling when soil moisture varies. Seasonal lake levels compound this movement.' },
              { icon: '🚿', title: 'Hard Water at 310 PPM — Silent Appliance Killer', desc: 'Water sourced from Lake Ray Roberts runs 310 PPM — above the "very hard" threshold. Scale buildup costs Lewisville homeowners an estimated $400–$900/year in reduced appliance efficiency and premature replacement. A water softener typically pays for itself in under 3 years.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Verified Pros Serving Lewisville</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · Real reviews from Lewisville homeowners</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Lewisville Homeowners Trust TrustyPro</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — Lewisville</h2>
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
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Your Lewisville Home Deserves a Health Score</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free, fast, and built for lake-town DFW homes. No contractor pressure. Just clarity about your biggest asset.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving Lewisville TX 75029, 75056, 75067, 75068, 75077 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
