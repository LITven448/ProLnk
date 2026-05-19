import { Link } from "wouter";

const INDIGO = "#4F46E5″;
const AMBER  = "#F59E0B";
const LIGHT  = "#F8FAFC";

const stats = [
  { label: "Population Growth Since 2010″, value: "108%" },
  { label: "Avg Home Age (Est. Areas)", value: "~12 yrs" },
  { label: "Lake Lavon Humidity Days/yr", value: "190+" },
  { label: "Homes Built 2015–Present", value: "62%" },
];

const steps = [
  { n: "01″, title: "Describe Your Home", body: "Tell us your home's age, construction era, and the issue you’re facing — new build warranty gap or older deferred maintenance." },
  { n: "02″, title: "Get Matched Instantly", body: "Our AI matches you with Wylie-area pros who know Lake Lavon humidity patterns, builder warranties, and clay-soil drainage." },
  { n: "03″, title: "Approve & Relax", body: "Review quotes, pick your pro, and track the job from start to finish — all inside TrustyPro." },
];

const pros = [
  { name: "Marcus T.", trade: "HVAC & Moisture Control", rating: "4.9″, jobs: 214, note: "Specializes in post-construction humidity remediation near Lavon." },
  { name: "Sierra R.", trade: "Roofing & Waterproofing", rating: "4.8″, jobs: 178, note: "Expert in Wylie's newer rooflines and builder-grade flashing issues." },
  { name: "Devon K.", trade: "Foundation & Drainage", rating: "4.9″, jobs: 143, note: "Handles clay-soil movement and drainage in established 1990s neighborhoods." },
];

const testimonials = [
  { quote: "Warranty was expiring on my 2017 build and I had NO idea what to check. TrustyPro found every issue before the window closed.", name: "Rachel M.", area: "Wylie, TX — 2017 build" },
  { quote: "The humidity from Lake Lavon wrecked my HVAC efficiency. The pro they matched me with diagnosed it in 20 minutes.", name: "James P.", area: "Wylie, TX — Lakeside community" },
  { quote: "My 1994 home had deferred maintenance I'd been ignoring for years. Got a full priority list and fixed the top three items fast.", name: "Linda S.", area: "Wylie, TX — Established district" },
];

const faqs = [
  { q: "Do you have pros who understand Wylie's new-construction warranty windows?", a: "Yes. Our Wylie network includes contractors who specialize in identifying defects before builder warranties expire — typically at the 1, 2, and 10-year marks." },
  { q: "How does Lake Lavon humidity affect my home?", a: "Proximity to Lake Lavon raises ambient moisture levels, accelerating mold growth in crawl spaces, reducing HVAC efficiency, and increasing wood rot risk in soffits and fascia." },
  { q: "My home is from the 1990s. Is TrustyPro still right for me?", a: "Absolutely. Older established Wylie neighborhoods often have deferred HVAC maintenance, aging water heaters, and original plumbing — all areas our pros know well." },
  { q: "How fast can I get a pro out?", a: "Most Wylie homeowners receive 2–3 matched quotes within 24 hours of submitting their request." },
];

export default function TrustyProWylie() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: LIGHT, color: "#1E293B", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #3730A3 100%)`, color: "#fff", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 24, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 20, letterSpacing: "0.05em" }}>
            WYLIE, TX
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px" }}>
            Wylie TX: Growing Faster Than Your Contractor Can Keep Up
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 580, margin: "0 auto 36px" }}>
            With population doubling since 2010 and Lake Lavon humidity threatening every home, Wylie homeowners need pros who actually know this market.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/waitlist/homeowner">
              <a style={{ background: AMBER, color: "#1E293B", fontWeight: 700, padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontSize: 16 }}>
                Get Matched Free →
              </a>
            </Link>
            <a href="#how-it-works" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontSize: 16 }}>
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0″ }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", padding: "0 24px" }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center", padding: "28px 16px", borderRight: "1px solid #E2E8F0″ }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: INDIGO }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: "72px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 48 }}>How TrustyPro Works in Wylie</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
          {steps.map(s => (
            <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: INDIGO, opacity: 0.15, lineHeight: 1 }}>{s.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "8px 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#475569″, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Cards */}
      <section style={{ background: "#EEF2FF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Top-Rated Wylie Pros</h2>
          <p style={{ textAlign: "center", color: "#64748B", marginBottom: 40 }}>Every pro is vetted, insured, and familiar with Wylie's unique home challenges.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {pros.map(p => (
              <div key={p.name} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: INDIGO, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>{p.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{p.trade}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: AMBER }}>★ {p.rating}</span>
                  <span style={{ fontSize: 13, color: "#64748B" }}>{p.jobs} jobs</span>
                </div>
                <p style={{ fontSize: 13, color: "#475569″, lineHeight: 1.6, margin: 0 }}>{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>What Wylie Homeowners Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderTop: `4px solid ${INDIGO}` }}>
                <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.7, marginBottom: 16, color: "#334155″ }}>"{t.quote}"</p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>{t.area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>Wylie Homeowner FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {faqs.map(f => (
              <div key={f.q} style={{ borderLeft: `4px solid ${INDIGO}`, paddingLeft: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{f.q}</div>
                <div style={{ fontSize: 14, color: "#475569″, lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #3730A3 100%)`, padding: "72px 24px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Ready to Protect Your Wylie Home?</h2>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 500, margin: "0 auto 32px" }}>Join hundreds of Wylie homeowners who trust TrustyPro to keep pace with their growing city.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/waitlist/homeowner">
            <a style={{ background: AMBER, color: "#1E293B", fontWeight: 700, padding: "16px 40px", borderRadius: 12, textDecoration: "none", fontSize: 17 }}>
              Get Matched Free →
            </a>
          </Link>
          <Link href="/waitlist/homeowner">
            <a style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, padding: "16px 32px", borderRadius: 12, textDecoration: "none", fontSize: 17 }}>
              Join the Waitlist
            </a>
          </Link>
        </div>
      </section>

    </div>
  );
}
