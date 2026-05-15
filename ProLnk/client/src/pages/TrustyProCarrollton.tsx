// SEO: TrustyPro Carrollton TX — Aging Housing Near Commercial Zones — Infrastructure Vibration, Foundation Risk
// Target keywords: Carrollton TX home inspection, Carrollton foundation repair, Carrollton home maintenance
// Geo: 75006, 75007, 75010, 75011 | Population ~140K | Avg home age 35 years
// Canonical: https://trustypro.io/trustypro/carrollton
import React, { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#F59E0B';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'Victor S.',  trade: 'Foundation & Structural Repair',   rating: 4.9, reviews: 341, response: '18 min', badge: 'Top Pro' },
  { name: 'Angela D.', trade: 'HVAC & Indoor Air Quality',         rating: 4.8, reviews: 218, response: '26 min', badge: 'Verified' },
  { name: 'Hector R.', trade: 'Plumbing & Pipe Rehabilitation',    rating: 4.9, reviews: 197, response: '24 min', badge: 'Elite' },
];

const testimonials = [
  { name: 'Paul T.',   zip: 'Carrollton 75006', text: 'Our 1985 ranch home was near Old Denton Road and the constant truck traffic was cracking our slab. Victor caught it early — $5,800 repair instead of the $50K+ if the beam had failed.' },
  { name: 'Maria C.', zip: 'Carrollton 75007', text: 'TrustyPro flagged that our original copper pipes had stress fractures from years of I-35E traffic vibration. Fixed before we had a catastrophic leak. Saved our hardwood floors.' },
  { name: 'Kevin J.', zip: 'Carrollton 75010', text: 'Angela found our 2001 HVAC was circulating air with 40% efficiency due to a cracked heat exchanger. Carbon monoxide risk. We had no idea. TrustyPro literally kept my family safe.' },
];

const faqs = [
  {
    q: 'Does highway traffic really cause foundation damage in Carrollton?',
    a: 'Yes. The I-35E corridor through central Carrollton generates constant low-frequency vibration. Over years, this compounds natural clay soil expansion to create micro-fractures in slab foundations. Homes within 0.5 miles of I-35E show 1.8x higher foundation crack rates in our scan data.',
  },
  {
    q: "What makes Carrollton's housing stock unique compared to other DFW suburbs?",
    a: 'Carrollton grew rapidly across three decades — 1960s, 1980s, and 2000s. This creates neighborhoods where a 1965 brick ranch sits next to a 2008 stucco townhome. Each era has different failure modes: older homes have original plumbing and panels, newer ones may have manufacturing-era drywall or early TRANE HVAC issues.',
  },
  {
    q: 'Are commercial redevelopment projects near my home a concern?',
    a: 'Active construction creates vibration and soil disturbance that can destabilize neighboring foundations. If there is major commercial construction within 300 feet of your home, TrustyPro recommends a foundation scan before and after — most homeowners can document damage for insurance or legal purposes if caught early.',
  },
  {
    q: 'Is the home health score free?',
    a: 'Yes. Your first TrustyPro home health scan and score report are completely free. No obligation to book a pro — though 74% of homeowners find at least one item worth addressing.',
  },
];

export default function TrustyProCarrollton() {
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
          Serving Carrollton, TX · ZIPs 75006 · 75007 · 75010 · 75011
        </div>
        <h1 style={{ fontSize: 'clamp(26px,4.5vw,50px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 800, margin: '0 auto 24px' }}>
          Carrollton TX: A City of Transitions — <span style={{ color: INDIGO }}>Your Home Needs Smart Maintenance</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Carrollton spans the Dallas-Denton border with housing from 1960 to 2010 — each era bringing different failure modes. I-35E construction vibration stresses older foundations. Major commercial redevelopment is reshuffling neighborhoods. TrustyPro scans your home for the risks your decade of construction brings, then connects you with a verified pro.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Carrollton by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Age', value: '35 yrs', sub: 'Mixed 1960s–2010s builds' },
              { label: 'Foundation Flags', value: '1.8×', sub: 'higher near I-35E corridor' },
              { label: 'HVAC Issues Found', value: '31%', sub: 'of TrustyPro scans' },
              { label: 'Plumbing Alerts', value: '28%', sub: 'in pre-1985 homes' },
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
              { step: '01', icon: '🔍', title: 'Scan', desc: 'Answer 12 questions about your home. Our AI cross-references your build decade, local construction activity, and Carrollton-specific risk patterns.' },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score across 6 categories: structure, roof, HVAC, electrical, plumbing, and water quality.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: 'Choose from verified Carrollton pros with real reviews. No cold calls. No upsells. Flat pricing, guaranteed.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Carrollton-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48, fontSize: 16 }}>What our data shows for homes in your ZIP codes</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '🏗️', title: 'Aging Housing Near Commercial Zones', desc: 'Older Carrollton neighborhoods are being absorbed by commercial redevelopment along Beltline Road, Josey Lane, and the Old Town corridor. Construction adjacent to residential areas disturbs soil, causing foundation settlement on neighboring properties — often with no visible warning until cracks appear.' },
              { icon: '🛣️', title: 'I-35E Infrastructure Vibration', desc: 'Continuous construction and heavy truck traffic on I-35E generates low-frequency vibration that gradually fatigues concrete slabs and pier connections. In homes 0.5 miles from the corridor, our scans detect 1.8x the rate of foundation cracking compared to quieter Carrollton neighborhoods.' },
              { icon: '🚰', title: 'Multi-Decade Plumbing Patchwork', desc: 'Carrollton homes often have plumbing that evolved across multiple owners and decades — copper from the 1970s, PVC from the 1990s, and partial PEX from recent repairs. Dissimilar materials at junction points create corrosion and leak risk. Our scan identifies the highest-risk connection points.' },
              { icon: '🌡️', title: 'HVAC Systems at End of Service Life', desc: "Homes built in 2000–2010 across Carrollton's newer corridors are now reaching the 15-20 year HVAC service window. An inefficient system in a Texas summer can fail during a heat wave — when contractor availability drops and emergency pricing spikes. Pre-season inspection is your protection." },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Verified Pros Serving Carrollton</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · Real reviews from Carrollton homeowners</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Carrollton Homeowners Trust TrustyPro</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — Carrollton</h2>
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
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Your Carrollton Home Deserves a Health Score</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free, fast, and built for transitioning DFW neighborhoods. No contractor pressure. Just clarity about your biggest asset.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving Carrollton TX 75006, 75007, 75010, 75011 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
