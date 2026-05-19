import { useState } from 'react';

const stats = [
  { label: 'Avg Home Value', value: '$520K' },
  { label: 'Build Era', value: '2000–2020′ },
  { label: 'HVAC Age', value: '15–20 yrs' },
  { label: 'Lake Proximity', value: 'Eagle Mtn' },
];

const steps = [
  { n: '01', title: 'Tell Us About Your Home', desc: 'Share your address, home vintage, and priority concern. Under 2 minutes.' },
  { n: '02', title: 'Premium Pro Matched', desc: 'TrustyPro selects vetted contractors experienced with high-value North Tarrant homes.' },
  { n: '03', title: 'Work Documented', desc: 'Every repair, replacement, and inspection stored permanently in your Home Health Vault.' },
];

const pros = [
  { name: 'Steven A.', trade: 'HVAC Systems', years: 15, jobs: 512, badge: 'Premium Home Specialist' },
  { name: 'Diane O.', trade: 'Moisture & Waterproofing', years: 12, jobs: 287, badge: 'Lake Area Expert' },
  { name: 'Patrick L.', trade: 'Roofing & Gutters', years: 11, jobs: 341, badge: 'High-Value Home Pro' },
];

const testimonials = [
  { name: 'Robert H.', neighborhood: 'Keller, TX', quote: 'Our 2005 home had the original Trane system. Steven replaced it with a two-stage unit sized perfectly for the layout. First summer with real comfort control.' },
  { name: 'Amanda W.', neighborhood: 'Eagle Mountain Area', quote: 'Lake proximity meant moisture crept into our crawl space every spring. Diane found the issue and waterproofed correctly. Haven’t had moisture since.' },
  { name: 'Chris T.', neighborhood: 'Keller, TX', quote: 'Selling a $600K home means buyers scrutinize everything. Patrick replaced our gutters and documented it all. Made the inspection easy.' },
];

const faqs = [
  {
    q: 'Why are Keller HVAC systems hitting failure age now?',
    a: 'The bulk of Keller’s housing stock was built between 2000 and 2015. Standard residential HVAC systems are rated for 15–20 years under normal conditions. North Texas summers push systems hard — 95°F+ days for 3–4 months mean compressors and heat exchangers degrade faster than in milder climates. Many Keller systems are entering or past their reliable service window.',
  },
  {
    q: 'Does Eagle Mountain Lake proximity cause real moisture problems?',
    a: 'Yes. Homes within 2–3 miles of Eagle Mountain Lake experience higher ambient humidity, especially in spring and fall. This manifests as elevated crawl space moisture, condensation on unconditioned surfaces, and mold risk in attics with inadequate ventilation. Proper vapor barriers, dehumidification, and attic baffles are standard interventions for lake-adjacent Keller homes.',
  },
  {
    q: 'How do I protect a high-value home during contractor work?',
    a: 'TrustyPro requires general liability minimum $1M per occurrence and workers comp coverage for every contractor in our network. We also log every job in your Home Health Vault with contractor license, insurance verification, and work completion record — creating a documented maintenance history that transfers to buyers and reduces insurance scrutiny.',
  },
  {
    q: 'What should I inspect on a 2005–2015 Keller home?',
    a: 'At the 15–20 year mark, prioritize HVAC system condition and efficiency rating, roof and shingle granule loss, water heater age and anode rod condition, irrigation backflow preventer certification, and attic insulation R-value which may have settled below Texas energy code. Gutters and downspouts are also commonly neglected and cause foundation edge saturation.',
  },
];

export default function TrustyProKeller() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111827', minHeight: '100vh' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#4F46E5′ }}>TrustyPro</span>
        <a href="/waitlist/homeowner" style={{ background: '#F59E0B', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Join Waitlist</a>
      </nav>

      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)', color: '#fff', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Keller, TX · North Tarrant County</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, lineHeight: 1.15, margin: '0 auto 20px', maxWidth: 800 }}>
          Keller TX: Premier North Tarrant Community, Premium Home Care Standards
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Keller's $520K average home value demands contractors who match. 15–20 year HVAC systems, Eagle Mountain Lake moisture, and high-value home protection — TrustyPro finds pros who meet that standard.
        </p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#fff', padding: '14px 36px', borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: 'none' }}>
          Find a Vetted Pro Near Me →
        </a>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '20px 36px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#4F46E5′ }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: '60px auto', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>How TrustyPro Works</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 16 }}>Three steps from home concern to trusted professional.</p>
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
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Featured Keller-Area Pros</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 16 }}>Licensed, insured, and calibrated for high-value North Tarrant homes.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {pros.map((p) => (
              <div key={p.name} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, color: '#4F46E5', marginBottom: 16 }}>
                  {p.name.split(' ').map((w: string) => w[0]).join('')}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 12 }}>{p.trade}</div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 14, fontSize: 13, color: '#374151′ }}>
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
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>What Keller Homeowners Say</h2>
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
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>Keller Homeowner FAQ</h2>
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
        <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Your Keller Home Deserves the Best</h2>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>Join TrustyPro — premium-vetted contractors for Keller's premium homes.</p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Join the Homeowner Waitlist →
        </a>
      </div>

      <div style={{ background: '#111827', color: '#9ca3af', textAlign: 'center', padding: '24px', fontSize: 13 }}>
        © 2026 TrustyPro · Keller, TX · <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> · <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
      </div>
    </div>
  );
}
