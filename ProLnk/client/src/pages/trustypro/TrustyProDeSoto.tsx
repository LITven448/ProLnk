import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$280K", sub: "Price-conscious market" },
  { label: "Deferred Maintenance Rate", value: "Above Avg", sub: "Cost-sensitivity driver" },
  { label: "Soil Type", value: "Heavy Clay", sub: "Foundation + drainage risk" },
];

const steps = [
  { n: "01", title: "Share Your Home's History", body: "Deferred maintenance is common in DeSoto. Tell us what's been put off — we'll match you to a pro who understands budget-conscious sequencing." },
  { n: "02", title: "Get Matched Fast", body: "TrustyPro surfaces DeSoto pros who know clay soil, older system failures, and how to prioritize repairs without breaking the bank." },
  { n: "03", title: "Track From Start to Finish", body: "One dashboard for communication, photos, and job tracking. No lost receipts, no chasing calls." },
];

const pros = [
  { name: "Jerome Battle", trade: "Foundation & Drainage", yrs: 16, reviews: 94, tag: "Clay Soil Veteran" },
  { name: "Keisha Voss", trade: "HVAC & Electrical", yrs: 11, reviews: 78, tag: "Deferred Maintenance Pro" },
  { name: "Carlos Medina", trade: "Plumbing & Water Heater", yrs: 8, reviews: 55, tag: "DeSoto Local" },
];

const testimonials = [
  { quote: "Jerome found the foundation crack my last two contractors said was 'cosmetic.' It wasn't. His fix saved me from a major structural repair down the road.", name: "Denise W.", area: "Hampton Hills" },
  { quote: "Keisha replaced our 18-year-old HVAC in one day. She gave us a realistic price — not the lowest bid, but the right one. Hasn't skipped a beat since.", name: "Marcus B.", area: "Westridge Estates" },
  { quote: "Carlos diagnosed a slow slab leak that had been creeping for years. We'd been ignoring high water bills thinking it was just us. It wasn't.", name: "Tanya R.", area: "Parkridge" },
];

const faqs = [
  { q: "Why is deferred maintenance so common in DeSoto?", a: "DeSoto is a value suburb — homeowners are often balancing mortgages, commute costs, and family expenses. When something isn't visibly broken, it gets pushed. But in a $280K home with clay soil and 1980s–2000s systems, 'not broken' can mean 'about to break.' Catching it early is almost always cheaper." },
  { q: "How does clay soil affect DeSoto foundations?", a: "Dallas-area clay expands when wet and contracts when dry. This seasonal movement puts lateral pressure on foundations and causes cracking, settling, and unlevel floors over time. Homes in DeSoto's older neighborhoods have decades of this movement compounded — most need at least some pier or crack monitoring." },
  { q: "What systems need the most attention in DeSoto homes?", a: "Based on age and market patterns: HVAC systems (15–20+ years old in many homes), water heaters (often original to build), galvanized or polybutylene plumbing in pre-2000 homes, and electrical panels — especially Federal Pacific or Zinsco brands found in 1980s builds." },
  { q: "Can TrustyPro help with prioritizing repairs on a budget?", a: "Yes. When you describe your situation, TrustyPro pros experienced in the DeSoto market can help you sequence repairs by urgency — stopping active damage first, deferring cosmetic work — so you're spending wisely rather than reactively." },
];

export default function TrustyProDeSoto() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5", fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>DeSoto, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          DeSoto TX: Growing South Dallas Suburb With Real Infrastructure Demands
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          DeSoto's price-conscious housing market creates predictable deferred maintenance patterns. Clay soil, aging systems, and budget pressures combine in ways that reward early action over emergency repair.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a DeSoto Pro →
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
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Smart matching, not just fast matching.</p>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured DeSoto Pros</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>License-verified, insurance-confirmed, locally reviewed.</p>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What DeSoto Homeowners Say</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>From neighbors who've been there.</p>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>DeSoto Home FAQ</h2>
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
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Stop Deferring. Start Fixing.</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Deferred maintenance compounds. A $500 fix today can prevent a $5,000 emergency next year. Find a DeSoto pro who gets it.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a DeSoto Pro →
        </a>
      </div>

    </div>
  );
}
