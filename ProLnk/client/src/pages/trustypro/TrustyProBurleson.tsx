import { Link } from "wouter";

const INDIGO = "#4F46E5";
const AMBER  = "#F59E0B";
const LIGHT  = "#F8FAFC";

const stats = [
  { label: "Average Home Age", value: "18 yrs" },
  { label: "Annual Hail Events", value: "8–12/yr" },
  { label: "Homes in Hail Corridor", value: "~70%" },
  { label: "Homes on Well Water (Est.)", value: "~18%" },
];

const steps = [
  { n: "01", title: "Share Your Home's Story", body: "Hail damage? Drainage running toward your slab? New enough that you're starting the first maintenance cycle? Tell us — we know Burleson." },
  { n: "02", title: "Get Matched Fast", body: "Our AI surfaces South Tarrant County pros who understand Cedar Hill escarpment drainage, southwest approach hail patterns, and 2000s-era construction." },
  { n: "03", title: "Approve & Get It Done", body: "Compare vetted quotes, book your pro, and follow progress in real-time — no chasing, no surprises." },
];

const pros = [
  { name: "Dana P.", trade: "Roofing & Hail Damage", rating: "4.9", jobs: 257, note: "South Tarrant County's top hail damage inspector — knows the southwest approach patterns cold." },
  { name: "Ray S.", trade: "Drainage & Foundation", rating: "4.8", jobs: 192, note: "Designs drainage solutions for Cedar Hill escarpment runoff and clay-soil lots." },
  { name: "Mia C.", trade: "HVAC & Home Systems", rating: "4.9", jobs: 178, note: "Specializes in first-maintenance-cycle tune-ups for 2000s–2010s Burleson builds." },
];

const testimonials = [
  { quote: "Hail came from the southwest and nobody else warned me about that pattern. TrustyPro sent a roofer who spotted damage the insurance adjuster missed.", name: "Tom B.", area: "Burleson, TX — Southwest corridor" },
  { quote: "Water was pooling near our foundation after every rain. The drainage fix TrustyPro arranged was the best money we've spent on this house.", name: "Cheryl A.", area: "Burleson, TX — Cedar Hill adjacent" },
  { quote: "Our 2007 build was due for its first real maintenance sweep. TrustyPro gave us a prioritized list and matched us with pros for each item. Super efficient.", name: "Derek & Lana V.", area: "Burleson, TX" },
];

const faqs = [
  { q: "Why is Burleson in a hail corridor?", a: "Burleson sits in the path of supercell storm tracks that approach from the southwest, producing 8–12 significant hail events annually. Roof and exterior inspections after any storm are critical." },
  { q: "What are Cedar Hill escarpment drainage issues?", a: "The elevation change near Cedar Hill creates accelerated runoff that channels toward lower-elevation Burleson properties. Without proper grading and French drains, water can pool at foundations and cause structural issues over time." },
  { q: "My home was built in 2006. What maintenance should I prioritize?", a: "18-year-old homes in Burleson typically need HVAC tune-up or replacement assessment, roof inspection (especially post-hail), water heater evaluation, and irrigation system check — all common first-cycle items." },
  { q: "Do TrustyPro pros cover the rural pockets of Burleson?", a: "Yes. Our Burleson network includes pros who service rural-adjacent areas with well water, septic, and acreage properties south of the main city corridor." },
];

export default function TrustyProBurleson() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: LIGHT, color: "#1E293B", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #3730A3 100%)`, color: "#fff", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 24, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 20, letterSpacing: "0.05em" }}>
            BURLESON, TX
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px" }}>
            Burleson TX: South Tarrant County's Hidden Home Maintenance Challenges
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 580, margin: "0 auto 36px" }}>
            Hail corridors, Cedar Hill escarpment drainage, and 2000s-era homes entering their first big maintenance cycle — Burleson homeowners need pros who know the territory.
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
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 48 }}>How TrustyPro Works in Burleson</h2>
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
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Top-Rated Burleson Pros</h2>
          <p style={{ textAlign: "center", color: "#64748B", marginBottom: 40 }}>Every pro is vetted, insured, and experienced with South Tarrant County home challenges.</p>
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
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>What Burleson Homeowners Say</h2>
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
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>Burleson Homeowner FAQ</h2>
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
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Burleson's Hidden Challenges, Handled</h2>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 500, margin: "0 auto 32px" }}>Hail, drainage, and aging systems don't have to catch you off guard. TrustyPro puts the right South Tarrant County pro in your corner.</p>
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
