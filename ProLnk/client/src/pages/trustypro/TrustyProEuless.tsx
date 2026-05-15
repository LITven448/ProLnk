import { useState } from 'react';

const stats = [
  { label: 'Avg Home Age', value: '38 yrs' },
  { label: 'Hard Water', value: '290 PPM' },
  { label: 'Airport Adjacent', value: 'DFW 3 mi' },
  { label: 'HEB Area Homes', value: '42,000+' },
];

const steps = [
  { n: '01', title: 'Tell Us About Your Home', desc: 'Share your address, home age, and top concerns — takes under 2 minutes.' },
  { n: '02', title: 'We Match Vetted Pros', desc: 'TrustyPro screens every contractor for license, insurance, and DFW experience.' },
  { n: '03', title: 'Get Work Done Right', desc: 'Compare quotes, book with confidence, and keep a permanent record of every job.' },
];

const pros = [
  { name: 'Marcus R.', trade: 'Foundation Specialist', years: 14, jobs: 312, badge: 'DFW Certified' },
  { name: 'Linda K.', trade: 'Plumbing & Repiping', years: 11, jobs: 278, badge: 'Hard Water Expert' },
  { name: 'Derek S.', trade: 'HVAC & Air Quality', years: 9, jobs: 194, badge: 'Airport Zone Pro' },
];

const testimonials = [
  { name: 'Pam T.', neighborhood: 'Euless, TX', quote: 'Our 1975 home had original galvanized pipes. TrustyPro matched us with Linda and she repiped the whole house in two days. No surprises.' },
  { name: 'James L.', neighborhood: 'HEB Area', quote: 'The foundation cracks near DFW were making me nervous. Marcus explained exactly what vibration settlement looks like. Repaired and documented.' },
  { name: 'Sandra M.', neighborhood: 'Euless, TX', quote: 'Hard water had destroyed our water heater and appliances. Finally found a plumber who actually understood the Fort Worth water system.' },
];

const faqs = [
  {
    q: 'Why are Euless homes more prone to foundation issues?',
    a: 'Homes near DFW Airport experience low-frequency vibration from aircraft and heavy traffic over decades. Combined with North Texas clay soil expansion and older slab designs from the 1970s–1980s, this accelerates settling and cracking in foundations.',
  },
  {
    q: 'Is 290 PPM hard water really a problem for my plumbing?',
    a: 'Yes. Fort Worth system water at 290 PPM deposits scale inside pipes, water heaters, and appliances. Over 20–30 years this narrows pipes and reduces appliance lifespan significantly. A water softener and periodic descaling can prevent thousands in repairs.',
  },
  {
    q: 'My home is from the 1970s — what systems are most at risk?',
    a: 'Galvanized steel supply lines, original cast-iron drain stacks, single-pane aluminum windows, and knob-and-tube or early romex electrical panels are the most common issues in 1970s HEB-area homes. All are serviceable with the right contractor.',
  },
  {
    q: 'How does TrustyPro vet contractors in the Euless area?',
    a: 'Every pro is verified for active Texas license, general liability and workers comp insurance, and at least 3 years of DFW residential experience. We also check reviews from real homeowners in Tarrant County before anyone joins the network.',
  },
];

export default function TrustyProEuless() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111827', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#4F46E5' }}>TrustyPro</span>
        <a href="/waitlist/homeowner" style={{ background: '#F59E0B', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Join Waitlist</a>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)', color: '#fff', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Euless, TX · Tarrant County</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, lineHeight: 1.15, margin: '0 auto 20px', maxWidth: 800 }}>
          Euless TX: DFW Midpoint — Central Location, Real Home Challenges
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
          HEB-area homes face aging mid-cities infrastructure, airport-proximity vibration, and hard water from the Fort Worth system. TrustyPro connects you with pros who know exactly what that means.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#fff', padding: '14px 36px', borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: 'none' }}>
          Find a Vetted Pro Near Me →
        </a>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '20px 36px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#4F46E5' }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 900, margin: '60px auto', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>How TrustyPro Works</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 16 }}>Three steps from home problem to trusted professional.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#4F46E5', marginBottom: 10 }}>STEP {s.n}</div>
              <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: '#6b7280', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Cards */}
      <div style={{ background: '#fff', padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Featured Euless-Area Pros</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 16 }}>Licensed, insured, and experienced in mid-cities home challenges.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {pros.map((p) => (
              <div key={p.name} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, color: '#4F46E5', marginBottom: 16 }}>
                  {p.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 12 }}>{p.trade}</div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 14, fontSize: 13, color: '#374151' }}>
                  <span>{p.years} yrs exp</span>
                  <span>{p.jobs} jobs</span>
                </div>
                <span style={{ background: '#EEF2FF', color: '#4F46E5', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{p.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 900, margin: '60px auto', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>What Euless Homeowners Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 28, color: '#4F46E5', marginBottom: 12 }}>"</div>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>{t.quote}</p>
              <div style={{ fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>{t.neighborhood}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: '#fff', padding: '60px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>Euless Homeowner FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 20, marginBottom: 20 }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}
              >
                <span style={{ fontWeight: 700, fontSize: 16 }}>{f.q}</span>
                <span style={{ fontSize: 22, color: '#4F46E5', flexShrink: 0, marginLeft: 16 }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p style={{ marginTop: 12, color: '#6b7280', lineHeight: 1.7 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', color: '#fff', textAlign: 'center', padding: '72px 24px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Ready to Protect Your Euless Home?</h2>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>Join the TrustyPro homeowner waitlist and get matched with vetted DFW professionals.</p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Join the Homeowner Waitlist →
        </a>
      </div>

      {/* Footer */}
      <div style={{ background: '#111827', color: '#9ca3af', textAlign: 'center', padding: '24px', fontSize: 13 }}>
        © 2026 TrustyPro · Euless, TX · <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> · <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
      </div>
    </div>
  );
}
