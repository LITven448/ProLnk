import { useState } from 'react';

const stats = [
  { label: "Avg Home Age", value: "25 yrs", sub: "1980s–2010s stock" },
  { label: "Joe Pool Lake Homes", value: "3,200+", sub: "High humidity exposure" },
  { label: "Escarpment Properties", value: "40%", sub: "Drainage risk zone" },
];

const steps = [
  { n: "01″, title: "Describe Your Issue", body: "Tell us what's going on — drainage, foundation shift, moisture intrusion. Specific beats vague." },
  { n: "02″, title: "Get Matched to Vetted Pros", body: "TrustyPro surfaces Cedar Hill pros who know escarpment soil, lake humidity, and local code." },
  { n: "03″, title: "Work Gets Done Right", body: "Book, communicate, and track your job from one dashboard. Review when done." },
];

const pros = [
  { name: "Marcus Tillman", trade: "Foundation & Drainage", yrs: 14, reviews: 87, tag: "Escarpment Specialist" },
  { name: "Delia Okonkwo", trade: "Roofing & Moisture Control", yrs: 9, reviews: 63, tag: "Lake-Adjacent Expert" },
  { name: "Ray Hollingsworth", trade: "Plumbing & Waterproofing", yrs: 18, reviews: 112, tag: "Cedar Hill Native" },
];

const testimonials = [
  { quote: "My backyard was draining toward the house after every rain. Marcus diagnosed the issue in 20 minutes — grading problem plus a failed French drain.", name: "Sandra K.", area: "Lakeridge Estates" },
  { quote: "Delia caught moisture intrusion behind our siding that three other contractors missed. Living near the lake causes problems most pros aren't prepared for.", name: "Todd F.", area: "Joe Pool Lakeside" },
  { quote: "Ray repiped our entire crawl space in two days. Humid summers had been rotting our subfloor supports for years. Wish we'd called sooner.", name: "Angela M.", area: "Cedar Hill State Park Edge" },
];

const faqs = [
  { q: "Why is drainage such a big issue in Cedar Hill?", a: "The cedar hill escarpment creates significant elevation changes. When soil is clay-heavy and compacted by slope, water follows the path of least resistance — often toward foundations. Proper grading and French drain systems are the standard fix." },
  { q: "Does lake proximity really affect my home?", a: "Yes. Homes within two miles of Joe Pool Lake experience elevated ambient humidity year-round, accelerating wood rot, mold growth, siding deterioration, and HVAC strain. Moisture-resistant materials and regular inspections matter more here than in drier suburbs." },
  { q: "How do I know if my foundation is moving?", a: "Sticking doors, diagonal cracks at window corners, sloping floors, and gaps between walls and ceilings are the primary signals. Cedar Hill's expansive clay soil shrinks and swells with seasonal moisture, making foundation movement more common than in sandy-soil suburbs." },
  { q: "How does TrustyPro verify pros in Cedar Hill?", a: "Every pro is license-checked, insurance-verified, and reviewed by homeowners in the same geography. We don't list pros who don't operate locally — Cedar Hill has its own soil, drainage, and code landscape." },
];

export default function TrustyProCedarHill() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827″, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5″, fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Cedar Hill, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Cedar Hill TX: Joe Pool Lake Meets Texas Hill Country Home Challenges
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280″, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Escarpment soil instability, lake-driven humidity, and 1980s–2010s housing stock make Cedar Hill one of the most technically demanding suburbs in DFW for home maintenance. Find pros who know the terrain.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Cedar Hill Pro →
        </a>
      </div>

      {/* City Stats */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 0″ }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#4F46E5″ }}>{s.value}</div>
              <div style={{ fontWeight: 700, marginTop: 6, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#6b7280″ }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How TrustyPro Works</h2>
        <p style={{ color: "#6b7280″, marginBottom: 36 }}>Three steps, zero hassle, one platform.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4F46E5″, marginBottom: 10 }}>Step {s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: "#6b7280″, fontSize: 14, lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Cards */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Cedar Hill Pros</h2>
        <p style={{ color: "#6b7280″, marginBottom: 36 }}>Vetted, licensed, and reviewed by local homeowners.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {pros.map((p) => (
            <div key={p.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#4F46E5″, marginBottom: 16 }}>
                {p.name[0]}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
              <div style={{ color: "#6b7280″, fontSize: 13, marginBottom: 8 }}>{p.trade}</div>
              <div style={{ display: "inline-block", background: "#FEF3C7″, color: "#92400E", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, marginBottom: 12 }}>{p.tag}</div>
              <div style={{ fontSize: 13, color: "#6b7280″ }}>{p.yrs} yrs experience · {p.reviews} reviews</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Cedar Hill Homeowners Say</h2>
        <p style={{ color: "#6b7280″, marginBottom: 36 }}>Real results from real neighbors.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 28, color: "#4F46E5″, marginBottom: 12 }}>"</div>
              <p style={{ color: "#374151″, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{t.quote}</p>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
              <div style={{ color: "#9ca3af", fontSize: 12 }}>{t.area}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Cedar Hill Home FAQ</h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 20, marginBottom: 20 }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, color: "#111827″ }}>{f.q}</span>
              <span style={{ color: "#4F46E5″, fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p style={{ marginTop: 12, color: "#6b7280″, fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "#4F46E5″, marginTop: 72, padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Ready to Fix It Right?</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Cedar Hill homes have specific challenges. Find a pro who actually understands your soil, your slope, and your home.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Cedar Hill Pro →
        </a>
      </div>

    </div>
  );
}
