import { Link } from "wouter";

const INDIGO = "#4F46E5";
const AMBER  = "#F59E0B";
const LIGHT  = "#F8FAFC";

const stats = [
  { label: "Homes Built 2010–2024", value: "78%" },
  { label: "Population Growth (2010–2024)", value: "340%" },
  { label: "Clay Soil Heave Risk (High)", value: "Level 4" },
  { label: "Homes on Well Water (Est.)", value: "~22%" },
];

const steps = [
  { n: "01", title: "Tell Us Your Situation", body: "New home on former farmland? Well water issues? Rural-to-suburban transition gaps? Describe it and we handle the matching." },
  { n: "02", title: "Meet Your Pro", body: "We surface Forney-area specialists who understand Trinity River delta clay soil, settlement patterns, and rural infrastructure crossovers." },
  { n: "03", title: "Fix It Right", body: "Get transparent quotes, approve the job, and track progress — no more chasing contractors who don't call back." },
];

const pros = [
  { name: "Tyler B.", trade: "Foundation & Soil Settlement", rating: "4.9", jobs: 198, note: "Expert in new-construction settlement on former farmland east of I-20." },
  { name: "Aisha W.", trade: "Well Water & Plumbing", rating: "4.8", jobs: 155, note: "Diagnoses well water quality and pressure issues common in rural Forney pockets." },
  { name: "Carlos M.", trade: "Drainage & Grading", rating: "4.9", jobs: 172, note: "Designs drainage solutions for clay-heavy Trinity delta lots." },
];

const testimonials = [
  { quote: "We moved from Dallas thinking a new build meant zero issues. Clay soil had other plans. TrustyPro matched us with someone who fixed the settling in a week.", name: "Brandon & Kim L.", area: "Forney, TX — 2021 build" },
  { quote: "Our well water smelled off. The pro TrustyPro sent tested everything, found a filtration fix, and we've had clean water since.", name: "Patricia H.", area: "Forney, TX — Rural area" },
  { quote: "Drainage from our backyard ran straight toward the foundation. Got graded properly — finally. Worth every penny.", name: "Miguel F.", area: "Forney, TX — I-20 corridor" },
];

const faqs = [
  { q: "Why is foundation settling so common in Forney new builds?", a: "Much of Forney's recent development sits on former farmland with expansive Trinity River delta clay soils. As these soils compact under a new structure, settling and differential movement are common in the first 3–7 years." },
  { q: "Is well water in Forney safe to drink?", a: "Well water quality varies by zone. Common issues include iron content, sulfur odor, and coliform presence. Our pros can test and recommend filtration or connection to municipal supply." },
  { q: "Do TrustyPro pros handle rural-to-suburban infrastructure gaps?", a: "Yes. Forney's rapid growth means some areas have mixed septic/municipal, rural electric, and older access roads. Our network includes pros experienced with these hybrid situations." },
  { q: "How long does it take to get matched with a Forney pro?", a: "Typically under 24 hours. Submit your request and you'll receive 2–3 vetted quotes matched to your specific issue." },
];

export default function TrustyProForney() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: LIGHT, color: "#1E293B", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #3730A3 100%)`, color: "#fff", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 24, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 20, letterSpacing: "0.05em" }}>
            FORNEY, TX
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px" }}>
            Forney TX: The Fastest Commute City Needs the Slowest Maintenance Approach
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 580, margin: "0 auto 36px" }}>
            Forney is booming along I-20 East — but clay soils, well water, and new-construction on former farmland create hidden home hazards that catch new residents off guard.
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
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 48 }}>How TrustyPro Works in Forney</h2>
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
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Top-Rated Forney Pros</h2>
          <p style={{ textAlign: "center", color: "#64748B", marginBottom: 40 }}>Every pro is vetted, insured, and fluent in Forney's rapid-growth home challenges.</p>
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
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>What Forney Homeowners Say</h2>
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
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 40 }}>Forney Homeowner FAQ</h2>
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
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Your Forney Home Deserves Thoughtful Care</h2>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 500, margin: "0 auto 32px" }}>Don't let fast growth outpace your home maintenance. TrustyPro matches you with pros who understand Forney's unique challenges.</p>
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
