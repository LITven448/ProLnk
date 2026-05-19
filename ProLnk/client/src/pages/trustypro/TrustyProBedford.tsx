import { useState } from 'react';

const stats = [
  { label: 'Avg Home Age', value: '40 yrs' },
  { label: 'Owner-Occupied', value: '72%' },
  { label: 'Clay Soil Index', value: 'High' },
  { label: 'Homes in Bedford', value: '19,000+' },
];

const steps = [
  { n: '01', title: 'Describe Your Home', desc: 'Tell us your home age, primary concern, and neighborhood — 2 minutes max.' },
  { n: '02', title: 'Get Matched Fast', desc: 'We surface vetted pros with real Central Tarrant County experience for your exact issue.' },
  { n: '03', title: 'Work Done, Documented', desc: 'Every job gets logged in your Home Health Vault — permanent record, no lost receipts.' },
];

const pros = [
  { name: 'Tony V.', trade: 'Foundation Repair', years: 16, jobs: 398, badge: 'Clay Soil Expert' },
  { name: 'Rachel H.', trade: 'HVAC Replacement', years: 12, jobs: 241, badge: '40-yr System Specialist' },
  { name: 'Brian C.', trade: 'Plumbing & Repiping', years: 10, jobs: 183, badge: '1980s Build Expert' },
];

const testimonials = [
  { name: 'Greg W.', neighborhood: 'Bedford, TX', quote: 'Our HVAC was the original 1984 unit. TrustyPro matched us with Rachel who replaced it cleanly — she knew exactly what older Bedford homes need.' },
  { name: 'Carla N.', neighborhood: 'Central Tarrant', quote: 'Foundation cracks appeared after we changed our irrigation schedule. Tony explained the clay soil connection and the repair has held for two years.' },
  { name: 'Mike D.', neighborhood: 'Bedford, TX', quote: 'The 1982 galvanized pipes finally gave out. Brian repiped everything in three days. Now I have a permanent record of every pipe replaced.' },
];

const faqs = [
  {
    q: 'Why do Bedford homes experience more foundation movement?',
    a: 'Central Tarrant County sits on expansive clay soil that shrinks dramatically during drought and swells with heavy rain. After 40 years, original concrete slabs that weren’t engineered for deep Texas clay movement develop consistent settling patterns — especially near irrigation zones and tree roots.',
  },
  {
    q: 'My HVAC is original to the house. When should I replace it?',
    a: 'Most Bedford-area original HVAC systems from the 1980s were designed for 15–20-year lifespans. If yours has passed that mark, efficiency is typically 30–40% below modern units, and the refrigerant it uses (R-22) is now phased out and expensive to source. Replacement almost always pays back within 5–7 years on energy savings alone.',
  },
  {
    q: 'What plumbing issues are common in 1980s Bedford homes?',
    a: 'Galvanized supply lines corrode from inside out and cause low pressure and rust-colored water. Original cast-iron drain stacks develop cracks and root intrusion. Polybutylene supply lines (common in late 1980s builds) are prone to failure and many insurance companies now require replacement before coverage renewal.',
  },
  {
    q: 'How does TrustyPro select pros for the Bedford area?',
    a: 'Every contractor is verified for active TDLR or applicable Texas state license, current general liability and workers comp certificates, and documented experience with Tarrant County residential projects. We prioritize pros with specific knowledge of older Tarrant County home construction standards.',
  },
];

export default function TrustyProBedford() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111827', minHeight: '100vh' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#4F46E5′ }}>TrustyPro</span>
        <a href="/waitlist/homeowner" style={{ background: '#F59E0B', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Join Waitlist</a>
      </nav>

      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)', color: '#fff', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Bedford, TX · Tarrant County</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, lineHeight: 1.15, margin: '0 auto 20px', maxWidth: 800 }}>
          Bedford TX: Established Mid-Cities Living With Aging Home Systems
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Bedford's stable, owner-occupied neighborhoods hide 40-year-old HVAC systems, original 1980s plumbing, and clay-soil foundation challenges. TrustyPro finds you the pro who knows the difference.
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
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Featured Bedford-Area Pros</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 16 }}>Licensed, insured, and experienced with mid-cities aging homes.</p>
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
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>What Bedford Homeowners Say</h2>
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
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 48 }}>Bedford Homeowner FAQ</h2>
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
        <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Protect Your Bedford Home Today</h2>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>Join the TrustyPro homeowner waitlist — vetted pros for every Bedford home challenge.</p>
        <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F59E0B', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
          Join the Homeowner Waitlist →
        </a>
      </div>

      <div style={{ background: '#111827', color: '#9ca3af', textAlign: 'center', padding: '24px', fontSize: 13 }}>
        © 2026 TrustyPro · Bedford, TX · <a href="/privacy" style={{ color: '#9ca3af' }}>Privacy</a> · <a href="/terms" style={{ color: '#9ca3af' }}>Terms</a>
      </div>
    </div>
  );
}
