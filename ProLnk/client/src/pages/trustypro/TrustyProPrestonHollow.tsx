import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$3M+", sub: "Dallas's most prestigious ZIP" },
  { label: "Avg Home Age", value: "50 yrs", sub: "1920s–2000s estate architecture" },
  { label: "Landmark Trees", value: "100s", sub: "Protected, permit-required" },
];

const steps = [
  { n: "01″, title: "Describe Your Issue", body: "Historic infrastructure, estate system failures, tree permits — give us specifics and we match accordingly." },
  { n: "02″, title: "Get Matched to Elite Pros", body: "TrustyPro surfaces Preston Hollow pros who know historic construction, landmark tree rules, and white-glove expectations." },
  { n: "03″, title: "Work Gets Done Right", body: "Full job tracking, documentation, and homeowner review — all from one platform." },
];

const pros = [
  { name: "Theodore Ashworth", trade: "Historic Estate Plumbing", yrs: 28, reviews: 162, tag: "Pre-War Pipe Expert" },
  { name: "Camille Fontenot", trade: "Luxury HVAC & Climate", yrs: 19, reviews: 103, tag: "Estate System Specialist" },
  { name: "Bernard Khalil", trade: "Tree & Structural Work", yrs: 24, reviews: 141, tag: "Landmark Tree Certified" },
];

const testimonials = [
  { quote: "Our 1938 home had original cast iron supply lines that had never been touched. Theodore understood the era, got the permits, and replaced everything in three days without damaging the original tile work.", name: "Eleanor W.", area: "Strait Lane Estate" },
  { quote: "We have five HVAC zones plus a humidity control system for our wine cellar. Camille was the only contractor who could service all of it under one contract.", name: "Harold P.", area: "River Hills" },
  { quote: "Our 80-year-old red oak needed emergency storm work after a branch failure. Bernard knew exactly which permits the city required and had crews on-site within four hours.", name: "Margot S.", area: "Armstrong Pkwy Corridor" },
];

const faqs = [
  { q: "How does historic construction affect home maintenance in Preston Hollow?", a: "Homes built between 1920 and 1960 often have original galvanized plumbing, knob-and-tube or early aluminum wiring, original boiler systems, and slate or clay tile roofing. Each of these requires specialized knowledge. Standard contractors frequently decline or misdiagnose these systems. TrustyPro verifies historic-property experience before listing a pro." },
  { q: "What are the rules around Preston Hollow's landmark trees?", a: "The City of Dallas has a tree ordinance that requires permits for removal or major pruning of heritage trees above a certain trunk diameter. In Preston Hollow, where trees often exceed 40-inch diameter at breast height, nearly all structural work requires a certified arborist assessment and city permit. Pros who skip this expose homeowners to significant fines." },
  { q: "Is privacy a concern when having contractors work on estate properties?", a: "We understand it is. TrustyPro requires background checks for all pros, and many high-value Preston Hollow homeowners request NDA-level discretion from service providers. We can note this preference in your job profile and match you to pros with a verified history of working on private estates." },
  { q: "How complex are the custom systems in estate homes?", a: "Very. Custom homes in the $3M+ range frequently have bespoke HVAC configurations, whole-home generator setups, private well or secondary water systems, home automation platforms, and custom millwork that standard contractors cannot touch without causing damage. TrustyPro's vetting process specifically evaluates luxury and custom system experience." },
];

export default function TrustyProPrestonHollow() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827″, minHeight: "100vh" }}>

      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5″, fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Preston Hollow, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Preston Hollow TX: Dallas's Most Prestigious Neighborhood — Elite Home Intelligence
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280″, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Historic estate infrastructure, landmark trees, custom home systems, and the highest maintenance standards in DFW — Preston Hollow demands more than a standard contractor list.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Preston Hollow Pro →
        </a>
      </div>

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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Preston Hollow Pros</h2>
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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Preston Hollow Homeowners Say</h2>
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

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Preston Hollow Home FAQ</h2>
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

      <div style={{ background: "#4F46E5″, marginTop: 72, padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Estate-Grade Expertise, On Demand</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Preston Hollow homes are irreplaceable. Find a pro who understands historic infrastructure, landmark trees, and the care a great home deserves.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Preston Hollow Pro →
        </a>
      </div>

    </div>
  );
}
