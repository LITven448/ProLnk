import { useState } from 'react';

const stats = [
  { label: "Avg Home Age", value: "75 yrs", sub: "1910s–1950s craftsman stock" },
  { label: "Historic Districts", value: "6+", sub: "Preservation rules apply" },
  { label: "Renovation Demand", value: "Surging", sub: "Bishop Arts gentrification wave" },
];

const steps = [
  { n: "01″, title: "Describe Your Issue", body: "Old plumbing, knob-and-tube wiring, historic preservation requirements — tell us the specifics and we match accordingly." },
  { n: "02″, title: "Get Matched to Vetted Pros", body: "TrustyPro surfaces Oak Cliff pros who understand craftsman construction, cast iron pipes, and historic district compliance." },
  { n: "03″, title: "Work Gets Done Right", body: "Book, communicate, and track from one dashboard. Your bungalow gets the care it deserves." },
];

const pros = [
  { name: "Luis Venegas", trade: "Electrical — Historic Homes", yrs: 20, reviews: 127, tag: "Knob-and-Tube Expert" },
  { name: "Sharon Dupree", trade: "Plumbing — Cast Iron Specialist", yrs: 15, reviews: 96, tag: "Pre-War Pipe Pro" },
  { name: "Marcus Ellison", trade: "Historic Preservation & Carpentry", yrs: 18, reviews: 113, tag: "Craftsman Certified" },
];

const testimonials = [
  { quote: "Our 1924 craftsman still had knob-and-tube in the original bedrooms. Luis mapped every circuit before touching anything and brought the whole house up to code without destroying a single original detail.", name: "Diana M.", area: "Winnetka Heights" },
  { quote: "Cast iron drain lines in a 100-year-old home are a puzzle. Sharon snaked, camera-inspected, and spot-lined the three worst sections instead of pushing for a full repipe we didn't need.", name: "Robert A.", area: "Bishop Arts District" },
  { quote: "We wanted to restore our 1930s bungalow front porch without losing the original character. Marcus sourced period-appropriate materials and knew exactly what the historic district office would approve.", name: "Yolanda F.", area: "Kessler Park" },
];

const faqs = [
  { q: "What electrical issues should I expect in a pre-1950 Oak Cliff home?", a: "Knob-and-tube wiring (pre-1940s) is the most significant concern — it lacks a ground wire, deteriorates over decades, and most insurance carriers now require documentation or replacement. Homes from the 1940s-1950s may have early aluminum wiring in the sub-panel feed, which has its own expansion/contraction issues at connections. Both require a licensed electrician with historic-home experience." },
  { q: "How do I know if my plumbing is cast iron and what does that mean?", a: "Homes built before 1960 almost universally have cast iron drain lines. Cast iron is durable but corrodes from the inside out after 70-100 years, leading to slow drains, root intrusion through micro-cracks, and eventual collapse. A camera inspection (non-invasive, under $300) will tell you the condition. Full replacement is rarely needed immediately — targeted spot lining buys 15-20 more years at a fraction of the cost." },
  { q: "What does historic preservation compliance mean for renovations?", a: "Oak Cliff has six city-designated historic districts including Winnetka Heights, Kessler Park, and parts of the Bishop Arts corridor. Within these districts, exterior changes (windows, doors, siding, additions, demolition) require Certificate of Appropriateness approval from the Landmark Commission before permits can be pulled. Pros who don't know this submit the wrong permit applications, causing costly delays." },
  { q: "Is Oak Cliff a good market to invest in home maintenance right now?", a: "Yes. The Bishop Arts-driven appreciation has spread significantly into surrounding blocks over the past decade. Homes that received deferred maintenance are now selling well above their pre-renovation comps. The renovation demand is real, which also means the good pros are booked out — TrustyPro helps you get in front of the right contractor faster." },
];

export default function TrustyProOakCliff() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827″, minHeight: "100vh" }}>

      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5″, fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Oak Cliff, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Oak Cliff TX: Historic Dallas Neighborhood — Your Craftsman Deserves Smart Care
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280″, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Knob-and-tube wiring, cast iron plumbing, historic preservation rules, and a surge in renovation demand — Oak Cliff needs pros who understand 100-year-old homes.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to an Oak Cliff Pro →
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Oak Cliff Pros</h2>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Oak Cliff Homeowners Say</h2>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Oak Cliff Home FAQ</h2>
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
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Old House, Smart Care</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Oak Cliff's character is in its bones. Find a pro who respects the craftsmanship, understands the era, and knows the historic district rules.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With an Oak Cliff Pro →
        </a>
      </div>

    </div>
  );
}
