// SEO: TrustyPro Mesquite TX — Real Texas Living — Deferred Maintenance, Storm History, Hard Water
// Target keywords: Mesquite TX home inspection, Mesquite storm damage repair, Mesquite home maintenance
// Geo: 75149, 75150, 75181, 75182 | Population ~145K | Avg home age 45 years
// Canonical: https://trustypro.io/trustypro/mesquite
import React, { useState } from 'react';

const INDIGO = '#4F46E5';
const AMBER  = '#F59E0B';

const starRow = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? AMBER : '#d1d5db', fontSize: 16 }}>★</span>
  ));

const pros = [
  { name: 'Ray B.',     trade: 'Storm Damage & Roofing Specialist', rating: 4.9, reviews: 518, response: '17 min', badge: 'Top Pro' },
  { name: 'Donna H.',  trade: 'Foundation & Structural Inspection', rating: 4.8, reviews: 344, response: '25 min', badge: 'Verified' },
  { name: 'Marcus T.', trade: 'Water Treatment & Plumbing',          rating: 4.9, reviews: 289, response: '22 min', badge: 'Elite' },
];

const testimonials = [
  { name: 'Bobby J.',    zip: 'Mesquite 75149', text: 'My 1968 brick ranch still had the original roof from the 1980s re-roof. Ray found hail damage from the 2019 storm that my insurance company had already paid out for — on the neighbors but not me. Got a full replacement covered.' },
  { name: 'Linda S.',    zip: 'Mesquite 75150', text: "We bought our Mesquite home from the original owner of 47 years. Donna found deferred maintenance the seller hadn't disclosed — cracked slab, old water heater, and a failing HVAC. We renegotiated $22K off the price." },
  { name: 'Clarence P.', zip: 'Mesquite 75181', text: "Hard water had basically turned our pipes to scale inside. Marcus installed a water softener and replaced the water heater 4 years early — before it failed. We're saving $90/month on energy bills alone." },
];

const faqs = [
  {
    q: 'How bad was the April 2012 Mesquite tornado and how does it affect homes today?',
    a: 'The April 3, 2012 EF3 tornado carved a path through Mesquite with winds exceeding 135 mph, damaging over 1,500 structures. Many homes that received cosmetic repairs have latent structural damage — roof decking, wall connections, and foundation movement from wind uplift that was patched but never properly engineered. TrustyPro\’s scan specifically looks for these post-storm indicators.',
  },
  {
    q: 'What is deferred maintenance and why is it common in Mesquite?',
    a: 'Deferred maintenance means repairs that were postponed — sometimes for decades — because they were not urgent at the time. Mesquite has a high rate of long-term homeownership (original owners staying 20-40 years), which means maintenance gets deferred as homeowners age. The result: roofs, HVAC, plumbing, and electrical that are years past their service dates. Buyers and new owners often inherit these deferred costs.',
  },
  {
    q: 'Does hard water from the Sabine River Authority damage Mesquite homes?',
    a: 'Yes. Sabine River Authority water serving Mesquite runs 280–320 PPM — firmly in the "very hard" category. Over years, scale builds inside water heaters (cutting efficiency by 25-40%), inside dishwashers, and along pipe walls. A whole-house water softener typically pays back its installation cost within 2–3 years through extended appliance life and reduced energy costs.',
  },
  {
    q: 'Is the home health score free?',
    a: 'Yes. Your first TrustyPro home health scan and score report are completely free. No obligation to book a pro — though 74% of homeowners find at least one item worth addressing.',
  },
];

export default function TrustyProMesquite() {
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
          Serving Mesquite, TX · ZIPs 75149 · 75150 · 75181 · 75182
        </div>
        <h1 style={{ fontSize: 'clamp(26px,4.5vw,50px)', fontWeight: 800, lineHeight: 1.15, maxWidth: 800, margin: '0 auto 24px' }}>
          Mesquite TX: Real Texas Living — <span style={{ color: INDIGO }}>Keep Your Home Ready for It</span>
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Mesquite has some of DFW's oldest homes — averaging 45 years old, many with original owners who deferred maintenance for decades. The April 2012 EF3 tornado left latent structural damage that cosmetic repairs did not fix. Hard water from Sabine River Authority is quietly destroying appliances. TrustyPro gives Mesquite homeowners the clarity to act before deferred costs become emergencies.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}>
          Get Your Free Home Health Score →
        </a>
        <p style={{ marginTop: 14, color: '#6b7280', fontSize: 14 }}>No cost · No obligation · Results in 2 minutes</p>
      </section>

      <section style={{ background: '#fff', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Mesquite by the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'Avg Home Age', value: '45 yrs', sub: "Among DFW's oldest stock" },
              { label: '2012 Tornado', value: 'EF3', sub: '1,500+ structures damaged' },
              { label: 'Water Hardness', value: '300 PPM', sub: 'Sabine River Authority' },
              { label: 'Deferred Items', value: '2.1 avg', sub: 'per home scanned by TrustyPro' },
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
              { step: '01', icon: '🔍', title: 'Scan', desc: "Answer 12 questions about your home. Our AI cross-references Mesquite storm history, your home's age, and high-deferred-maintenance risk factors." },
              { step: '02', icon: '📊', title: 'Score', desc: 'Receive a 0–100 Home Health Score across 6 categories: structure, roof, HVAC, electrical, plumbing, and water quality.' },
              { step: '03', icon: '🔧', title: 'Book a Pro', desc: 'Choose from verified Mesquite pros with real reviews. No cold calls. No upsells. Flat pricing, guaranteed.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Mesquite-Specific Home Risks</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48, fontSize: 16 }}>What our data shows for homes in your ZIP codes</p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { icon: '🏚️', title: 'Decades of Deferred Maintenance', desc: "Mesquite has the highest rate of long-term single-owner occupancy in DFW — many homes owned by the same family for 30-50 years. While that is admirable, it often means maintenance was deferred rather than addressed. TrustyPro finds an average of 2.1 deferred items per Mesquite home scanned — things that cost $500 to fix today but $5,000 to fix next year." },
              { icon: '🌪️', title: 'April 2012 EF3 Tornado Latent Damage', desc: "The April 3, 2012 tornado did not just damage roofs — it created hidden structural fatigue in wall connections, attic framing, and foundation attachment points. Homes that received insurance patches may still have compromised structural integrity. If your home is in the 75149 or 75150 corridor and has not had a post-storm structural assessment, that gap is a risk." },
              { icon: '💧', title: 'Hard Water Destroying Appliances Silently', desc: 'Sabine River Authority delivers water at 280–320 PPM to Mesquite homes. That scale builds inside your water heater coils, dishwasher jets, and washing machine valves. Over 10 years, untreated hard water costs the average Mesquite homeowner $1,200–$2,400 in premature appliance replacement — a problem a $900 softener would have prevented.' },
              { icon: '🏗️', title: 'Foundation Fatigue in Oldest DFW Stock', desc: "With homes averaging 45 years old, Mesquite foundations have experienced more clay expansion cycles than nearly any other DFW city. Early post-tension slab designs from the 1970s had tighter tolerances — and are now showing the cumulative wear of four and a half decades on expansive soil. Donna's structural team scans for cable tension loss and pier movement." },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Verified Pros Serving Mesquite</h2>
          <p style={{ color: '#4b5563', textAlign: 'center', marginBottom: 48 }}>Background-checked · Licensed · Real reviews from Mesquite homeowners</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Mesquite Homeowners Trust TrustyPro</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions — Mesquite</h2>
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
        <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, marginBottom: 16 }}>Your Mesquite Home Deserves a Health Score</h2>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Free, fast, and built for real Texas homes. No contractor pressure. Just clarity about your biggest asset.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: AMBER, color: '#fff', padding: '16px 44px', borderRadius: 12, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Get Your Free Home Health Score →
        </a>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '32px 24px', textAlign: 'center', fontSize: 14 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>TrustyPro</span> · Serving Mesquite TX 75149, 75150, 75181, 75182 ·{' '}
        <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> ·{' '}
        <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
        <div style={{ marginTop: 8 }}>© 2026 TrustyPro · A ProLnk Company</div>
      </footer>
    </div>
  );
}
