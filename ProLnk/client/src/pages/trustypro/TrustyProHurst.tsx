import { useState } from 'react';

const stats = [
  { label: 'Avg Home Age', value: '50+ yrs' },
  { label: 'Hard Water', value: '290 PPM' },
  { label: 'NE Mall Area', value: 'Commercial Adjacent' },
  { label: 'Hurst Homes', value: '15,000+' },
];

const steps = [
  { n: '01', title: 'Share Your Home Info', desc: 'Your address, home age, and top concern. We handle the rest in under 2 minutes.' },
  { n: '02', title: 'Matched to Experts', desc: 'TrustyPro finds pros with hands-on experience in 50+ year Tarrant County homes.' },
  { n: '03', title: 'Job Done Right', desc: 'Licensed work with a permanent digital record kept in your Home Health Vault.' },
];

const pros = [
  { name: 'Al T.', trade: 'Electrical Upgrades', years: 18, jobs: 441, badge: '50-yr Home Expert' },
  { name: 'Nina P.', trade: 'Plumbing & Drain', years: 13, jobs: 307, badge: 'Hard Water Specialist' },
  { name: 'Carlos M.', trade: 'HVAC & Ventilation', years: 10, jobs: 229, badge: 'Commercial-Adjacent Pro' },
];

const testimonials = [
  { name: 'Betty R.', neighborhood: 'Hurst, TX', quote: 'Our 1968 home had knob-and-tube in one wing. Al handled it safely and pulled permits. The peace of mind was worth every dollar.' },
  { name: 'Darren K.', neighborhood: 'NE Mall Area', quote: 'The drains were backing up constantly — 50-year-old cast iron. Nina replaced the entire drain stack and we haven’t had an issue since.' },
  { name: 'Lisa F.', neighborhood: 'Hurst, TX', quote: 'Hard water destroyed two water heaters in 8 years. Nina finally explained the root cause and installed a softener. Game changer.' },
];

const faqs = [
  {
    q: 'What electrical hazards are common in 50+ year Hurst homes?',
    a: 'Homes built before 1975 may contain knob-and-tube wiring, undersized federal Pacific or Zinsco panels that are prone to failure, aluminum branch wiring in some 1960s builds, and two-prong ungrounded outlets throughout. All of these can be addressed by a licensed Texas electrician — but require proper diagnosis first.',
  },
  {
    q: 'Does commercial proximity affect my home systems?',
    a: 'Yes. Homes adjacent to the NE Mall corridor experience higher ambient vibration from delivery traffic, HVAC units on commercial rooftops, and varying ground load. Over decades this accelerates wear on older slab foundations and can loosen plumbing connections that were already aged.',
  },
  {
    q: 'My home is from the 1960s — should I repipe everything?',
    a: 'Not necessarily all at once. A licensed plumber can inspect and pressure-test your system to identify the highest-risk sections. Galvanized supply lines are the most common failure point in 1960s homes. Cast-iron drains are durable but crack with age and root intrusion. A phased approach often makes financial sense.',
  },
  {
    q: 'How does Fort Worth water quality affect my plumbing?',
    a: 'At 290 PPM hardness, Fort Worth system water is classified as "very hard." Over 20–30 years, scale deposits build inside pipes and reduce diameter, accumulate in water heaters cutting efficiency and lifespan in half, and damage appliance seals and fixtures. A whole-home softener is the most cost-effective long-term solution.',
  },
];

export default function TrustyProHurst() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111827', minHeight: '100vh' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#4F46E5' }}>TrustyPro</span>
        <a href="/waitlist/homeowner" style={{ background: '#F59E0B', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Join Waitlist</a>
      </nav>

      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)', color: '#fff', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Hurst, TX · Tarrant County</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, lineHeight: 1.15, margin: '0 auto 20px', maxWidth: 800 }}>
          Hurst TX: Your North East Mall Neighbor Has Old Home Problems
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
          50+ year homes need electrical and plumbing updates, commercial-adjacent vibration accelerates wear, and Fort Worth hard water degrades everything it touches. TrustyPro connects you to pros who understand all of it.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#fff', padding: '14px 36px', borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: 'none' }}>
          Find a Vetted Pro Near Me →
        </a>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '20px 36px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#4F46E5' }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

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

      <div style={{ background: '#fff', padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Featured Hurst-Area Pros</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 16 }}>Specialists in mid-century Tarrant County home systems.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {pros.map((p) => (
              <div key={p.name} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, color: '#4F46E5', marginBottom: 16 }}>
                  {p.name.split(' ').map((w: string) => w[0]).join('')}
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

      <div style={{ maxWidth: 900, margin: '60px auto', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>What Hurst Homeowners Say</h2>
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

      <div style={{ background: '#fff', padding: '60px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>Hurst Homeowner FAQ</h2>
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

      <div style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', color: '#fff', textAlign: 'center', padding: '72px 24px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Your Hurst Home Deserves Modern Care</h2>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>Join TrustyPro and get matched with vetted pros who specialize in older Tarrant County homes.</p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Join the Homeowner Waitlist →
        </a>
      </div>

      <div style={{ background: '#111827', color: '#9ca3af', textAlign: 'center', padding: '24px', fontSize: 13 }}>
        © 2026 TrustyPro · Hurst, TX · <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> · <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
      </div>
    </div>
  );
}
