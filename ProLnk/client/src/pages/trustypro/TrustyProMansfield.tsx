import { Link } from "wouter";

const INDIGO = "#4F46E5";
const AMBER  = "#F59E0B";
const LIGHT  = "#F8FAFC";

const stats = [
  { label: "Average Home Age", value: "22 yrs" },
  { label: "Water Hardness (PPM)", value: "290 PPM" },
  { label: "Tree-Canopy Coverage", value: "High" },
  { label: "HVAC Systems 20–30 yrs old", value: "~38%" },
];

const steps = [
  { n: "01", title: "Describe Your Need", body: "Storm damage from your mature trees? HVAC on its last legs? Hard-water scale destroying your fixtures? Tell us and we'll find your match." },
  { n: "02", title: "Get Matched to a Mansfield Pro", body: "Our AI connects you with Tarrant County specialists who know Trinity River water chemistry, aging HVAC, and Mansfield's dense tree canopy risks." },
  { n: "03", title: "Book & Track", body: "Review your quotes side-by-side, pick the right pro, and track the job from scheduling to sign-off." },
];

const pros = [
  { name: "Kevin O.", trade: "Tree & Storm Damage", rating: "4.9", jobs: 231, note: "Expert in post-storm assessment and limb removal in Mansfield's mature neighborhoods." },
  { name: "Priya D.", trade: "HVAC Replacement", rating: "4.9", jobs: 189, note: "Specializes in aging R-22 and early R-410A system replacements across mid-cities homes." },
  { name: "Jason R.", trade: "Irrigation & Water Treatment", rating: "4.8", jobs: 164, note: "Handles 290 PPM hard-water scale, RO systems, and Mansfield irrigation failure diagnosis." },
];

const testimonials = [
  { quote: "A storm snapped a 40-year oak onto my fence line. TrustyPro had a crew assessing within hours and the cleanup done by Friday.", name: "Greg W.", area: "Mansfield, TX — Established neighborhood" },
  { quote: "Our 2001 HVAC finally gave up in August. TrustyPro got us three quotes same day and we had a new unit installed within the week.", name: "Sandra K.", area: "Mansfield, TX — Mid-cities home" },
  { quote: "Hard water was destroying our water heater and dishwasher. The pro TrustyPro sent installed a whole-home softener and explained everything.", name: "Theo M.", area: "Mansfield, TX" },
];

const faqs = [
  { q: "How does Mansfield's hard water affect my home?", a: "At 290 PPM, Mansfield's Trinity River-sourced water leaves heavy scale buildup on water heaters, dishwashers, faucets, and irrigation heads — reducing efficiency and lifespan by 30–40%." },
  { q: "My neighborhood has a lot of mature trees. What storm risks should I watch for?", a: "Mature canopy neighborhoods face elevated risk from limb failure, root heave cracking driveways and foundations, and gutter blockage leading to fascia rot and water intrusion." },
  { q: "My HVAC is from 2002. Should I replace or repair?", a: "Systems 20+ years old operating on R-22 refrigerant (no longer manufactured) typically warrant full replacement. Our HVAC pros can assess and give you an honest cost-benefit analysis." },
  { q: "How does TrustyPro verify its Mansfield-area pros?", a: "Every pro in our network carries valid Texas trade licenses, general liability insurance, and passes our background check before being matched with homeowners." },
];

export default function TrustyProMansfield() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: LIGHT, color: "#1E293B", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #3730A3 100%)`, color: "#fff", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 24, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 20, letterSpacing: "0.05em" }}>
            MANSFIELD, TX
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px" }}>
            Mansfield TX: Mid-Cities Location, Maximum Home Maintenance Needs
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 580, margin: "0 auto 36px" }}>
            Between Fort Worth and Arlington, Mansfield homes face 290 PPM hard water, aging HVAC systems, and tornado-season tree canopy risk — all at once.
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
      <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", padding: "0 24px" }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center", padding: "28px 16px", borderRight: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: INDIGO }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: "72px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 48 }}>How TrustyPro Works in Mansfield</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
          {steps.map(s => (
            <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: INDIGO, opacity: 0.15, lineHeight: 1 }}>{s.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "8px 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Cards */}
      <section style={{ background: "#EEF2FF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Top-Rated Mansfield Pros</h2>
          <p style={{ textAlign: "center", color: "#64748B", marginBottom: 40 }}>Vetted, insured, and experienced with Tarrant County's specific home challenges.</p>
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
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>What Mansfield Homeowners Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderTop: `4px solid ${INDIGO}` }}>
                <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.7, marginBottom: 16, color: "#334155" }}>"{t.quote}"</p>
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
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>Mansfield Homeowner FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {faqs.map(f => (
              <div key={f.q} style={{ borderLeft: `4px solid ${INDIGO}`, paddingLeft: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{f.q}</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #3730A3 100%)`, padding: "72px 24px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Protect Your Mansfield Home Before the Next Storm</h2>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 500, margin: "0 auto 32px" }}>Hard water, aging systems, and tree canopy risk are manageable — with the right pros by your side.</p>
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
