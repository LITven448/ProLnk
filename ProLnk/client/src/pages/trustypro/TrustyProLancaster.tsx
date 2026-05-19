import { useState } from 'react';

const stats = [
  { label: "Growth Rate", value: "Fast", sub: "Far southern Dallas County" },
  { label: "Well Water Properties", value: "Persistent", sub: "Rural pockets remain" },
  { label: "Tornado Risk", value: "Elevated", sub: "Active corridor zone" },
];

const steps = [
  { n: "01", title: "Describe Your Situation", body: "Old rural property, new suburban build, or somewhere in between — Lancaster's mix is wide. Tell us exactly what you're dealing with." },
  { n: "02", title: "Match to the Right Pro", body: "TrustyPro surfaces Lancaster pros who handle well water systems, aging rural-era infrastructure, and storm hardening — not just standard suburban repairs." },
  { n: "03", title: "Build Your Home's Record", body: "Document every repair, store inspection reports, and track maintenance history — critical for resale in a fast-growing market." },
];

const pros = [
  { name: "Travis Ewing", trade: "Well Water & Plumbing", yrs: 19, reviews: 107, tag: "Well System Expert" },
  { name: "Simone Garner", trade: "Storm Prep & Roofing", yrs: 12, reviews: 74, tag: "Tornado Corridor Veteran" },
  { name: "Luis Paredes", trade: "Electrical & Panel Upgrades", yrs: 15, reviews: 91, tag: "Rural-to-Suburban Specialist" },
];

const testimonials = [
  { quote: "Travis found bacterial contamination in our well that had been there for years. We had no idea. He installed a UV treatment system and now we have peace of mind every time we pour a glass.", name: "Claire B.", area: "West Lancaster" },
  { quote: "Simone replaced our roof after a hail storm and reinforced the decking at the same time. Living in the tornado corridor isn't optional — being prepared is.", name: "James W.", area: "Parkview Estates" },
  { quote: "Luis upgraded our panel from 100A to 200A. The old property had been running two window units on a residential circuit for years. It was a fire waiting to happen.", name: "Norma K.", area: "South Lancaster" },
];

const faqs = [
  { q: "Does Lancaster still have well water homes?", a: "Yes. Despite rapid suburban development, pockets of rural Lancaster — particularly in western and southern areas — still rely on private wells. Well water in this part of Dallas County can carry elevated iron, sulfur, and bacterial contamination depending on the aquifer depth and casing age. Annual testing is the minimum standard; filtration systems are often warranted." },
  { q: "What does tornado corridor mean for my home's maintenance?", a: "Lancaster sits in an active tornado and severe weather corridor in North Texas. Homes should have roofs rated for high-wind zones, reinforced garage doors (the first point of failure in high winds), and secure attic insulation baffles. Older homes in Lancaster were often built before current wind resistance codes and may need retrofitting." },
  { q: "I bought a newer Lancaster home. Do I still need to worry about older system issues?", a: "Newer developments are generally fine on plumbing and electrical. But Lancaster's rapid growth means some new builds were constructed adjacent to older infrastructure — drainage, sewer tie-ins, and utility easements can carry legacy issues into new subdivisions. Always pull the property history and have a drainage survey done on new-to-you properties near the city's older rural boundary." },
  { q: "What's the biggest mistake Lancaster homeowners make?", a: "Skipping the maintenance history. Homes in fast-growing suburbs often change hands quickly, and maintenance records rarely transfer. Without documentation, a new owner has no idea what systems are aging out. TrustyPro helps you build that record from day one — protecting both your home and your eventual sale price." },
];

export default function TrustyProLancaster() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5", fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Lancaster, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Lancaster TX: Southern Dallas Frontier — Real Home, Real Maintenance
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Lancaster is growing fast, but its rural roots create maintenance challenges most suburban homeowners aren't prepared for: well water quality, aging rural-era systems, and a tornado corridor that demands storm-ready homes.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Lancaster Pro →
        </a>
      </div>

      {/* City Stats */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#4F46E5" }}>{s.value}</div>
              <div style={{ fontWeight: 700, marginTop: 6, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How TrustyPro Works</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Rural knowledge meets suburban speed.</p>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Lancaster Pros</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Pros who know both rural and suburban Lancaster challenges.</p>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Lancaster Homeowners Say</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Stories from neighbors who didn't wait.</p>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Lancaster Home FAQ</h2>
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
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Lancaster Is Growing. Is Your Home Ready?</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Whether you're on well water, in an older rural property, or a new subdivision — Lancaster home maintenance requires local expertise. Find it here.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Lancaster Pro →
        </a>
      </div>

    </div>
  );
}
