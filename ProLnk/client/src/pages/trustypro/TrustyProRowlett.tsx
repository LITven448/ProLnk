import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$340K", sub: "1990s–2015 housing stock" },
  { label: "2015 EF4 Tornado", value: "Historic", sub: "Many rebuilt homes on site" },
  { label: "Hard Water Risk", value: "High", sub: "Lake Ray Hubbard source" },
];

const steps = [
  { n: "01", title: "Describe Your Issue", body: "Foundation concern, hard water damage, roof issue — give us the details so we match you to the right specialist." },
  { n: "02", title: "Get Matched to Vetted Pros", body: "TrustyPro surfaces Rowlett-area pros who know the 2015 rebuild landscape, lake-sourced water chemistry, and local foundation conditions." },
  { n: "03", title: "Work Gets Done Right", body: "Book, communicate, and track your job from one dashboard. Review when done." },
];

const pros = [
  { name: "Terrence Obi", trade: "Foundation & Structural", yrs: 17, reviews: 118, tag: "Post-Tornado Rebuild Expert" },
  { name: "Sandra Lim", trade: "Plumbing & Water Treatment", yrs: 12, reviews: 82, tag: "Hard Water Specialist" },
  { name: "Calvin Marsh", trade: "Roofing & Storm Damage", yrs: 9, reviews: 65, tag: "Rowlett Veteran" },
];

const testimonials = [
  { quote: "Our home was rebuilt after 2015. Terrence found that the post-storm foundation was poured without proper pier spacing. He remediated it before we had real problems.", name: "Denise W.", area: "Bayside Estates" },
  { quote: "Hard water from the lake had calcified our water heater and pressure regulator in six years. Sandra replaced both and installed a whole-house softener. Night and day.", name: "Marcus P.", area: "Lakewood Meadows" },
  { quote: "Calvin found two sections of underlayment that were improperly installed in the 2016 re-roof. Caught it before the next rain season.", name: "Alicia F.", area: "Heritage Oaks" },
];

const faqs = [
  { q: "Why does the 2015 EF4 tornado still matter for Rowlett homeowners today?", a: "The December 2015 EF4 tornado carved a path through eastern Rowlett and devastated hundreds of homes. Many were rebuilt quickly in 2016–2017 under pressure to restore neighborhoods fast. Some of those rebuilds — particularly foundations, framing, and roofing — may have had shortcuts or code compliance issues that weren't caught during rushed inspections. If your home was rebuilt after 2015 and you haven't had a structural review since, you should." },
  { q: "What does 'hard water' actually do to a home?", a: "Lake Ray Hubbard water is high in dissolved calcium and magnesium. Over time this leaves mineral deposits inside pipes, water heaters, dishwashers, and washing machines. Calcium scale reduces pipe diameter, shortens appliance life by 30–40%, and leaves white residue on fixtures. Whole-house softeners and annual descaling are standard maintenance in Rowlett." },
  { q: "How do I know if my 1990s Rowlett home has foundation issues?", a: "Sticking doors and windows, diagonal cracks at corners, sloping floors, and gaps where walls meet ceilings are the primary signals. Northern Lake Ray Hubbard shoreline soil has heavy clay content that swells with moisture and contracts in drought — classic conditions for foundation movement in that era of slab construction." },
  { q: "How does TrustyPro verify pros in Rowlett?", a: "Every pro is license-checked, insurance-verified, and reviewed by homeowners in the same geography. We specifically look for Rowlett-area experience, not generic DFW contractors who've never worked near the lake." },
];

export default function TrustyProRowlett() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5", fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Rowlett, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Rowlett TX: Lake Rayburn Living With Real Foundation Risk
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Northern Lake Ray Hubbard shoreline, a 2015 EF4 tornado that reshaped the housing stock, and hard water from the lake — Rowlett homeowners face compounding challenges most contractors aren't briefed on.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Rowlett Pro →
        </a>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#4F46E5" }}>{s.value}</div>
              <div style={{ fontWeight: 700, marginTop: 6, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How TrustyPro Works</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Three steps, zero hassle, one platform.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4F46E5", marginBottom: 10 }}>Step {s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Cards */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Rowlett Pros</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Vetted, licensed, and reviewed by local homeowners.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {pros.map((p) => (
            <div key={p.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#4F46E5", marginBottom: 16 }}>
                {p.name[0]}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
              <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 8 }}>{p.trade}</div>
              <div style={{ display: "inline-block", background: "#FEF3C7", color: "#92400E", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, marginBottom: 12 }}>{p.tag}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{p.yrs} yrs experience · {p.reviews} reviews</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Rowlett Homeowners Say</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Real results from real neighbors.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 28, color: "#4F46E5", marginBottom: 12 }}>"</div>
              <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{t.quote}</p>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
              <div style={{ color: "#9ca3af", fontSize: 12 }}>{t.area}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Rowlett Home FAQ</h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 20, marginBottom: 20 }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{f.q}</span>
              <span style={{ color: "#4F46E5", fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p style={{ marginTop: 12, color: "#6b7280", fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "#4F46E5", marginTop: 72, padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Ready to Fix It Right?</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Rowlett homes have a unique history. Find a pro who knows what's under your home — and what to do about it.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Rowlett Pro →
        </a>
      </div>

    </div>
  );
}
