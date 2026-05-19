import { useState } from "react";

const pros = [
  { name: "Victor H.", trade: "HVAC & Air Quality", rating: 4.9, jobs: 398, badge: "Industrial Proximity Expert" },
  { name: "Diane C.", trade: "Roofing & Structural", rating: 4.8, jobs: 312, badge: "Multi-Era Home Specialist" },
  { name: "Elias T.", trade: "Electrical & Panel Upgrades", rating: 4.9, jobs: 277, badge: "1950s–2010s All Eras" },
];

const testimonials = [
  { text: "My 1968 home needed an electrical panel upgrade but also had asbestos-era insulation. TrustyPro found someone who handled both — couldn't find that anywhere else.", author: "Ron M., Grand Prairie TX" },
  { text: "We're right next to an industrial corridor. The air quality assessment they matched me with explained exactly why our HVAC filters were black every 3 weeks.", author: "Carmen V., Central Grand Prairie" },
  { text: "My house sits right between Dallas and Tarrant County. Previous companies couldn't even decide which crew to send. TrustyPro had someone here in two hours.", author: "Antoine B., South Grand Prairie" },
];

const faqs = [
  { q: "How does proximity to industrial areas affect my home?", a: "Industrial and commercial zones near Grand Prairie release particulates that accelerate HVAC filter degradation, stain exterior surfaces, and in some cases affect indoor air quality. Homes within 1 mile of industrial corridors should test air quality annually." },
  { q: "My home was built in the 1960s — what should I prioritize?", a: "Grand Prairie's 1950s–1970s housing stock commonly has original galvanized plumbing (corrodes by year 50), aluminum wiring (fire risk), single-pane windows, and inadequate attic insulation by modern standards." },
  { q: "Does DFW airport proximity affect my home?", a: "Homes in Grand Prairie's northern zones experience higher vibration frequencies from flight paths, which over time can loosen mortar joints, crack tile grout, and stress roof decking fasteners." },
  { q: "Why does being centrally located in DFW help me as a homeowner?", a: "Grand Prairie's position means pros from Dallas, Tarrant, Ellis, and Johnson counties all consider it their service area — giving you the widest available pool of specialty contractors in the metroplex." },
];

export default function TrustyProGrandPrairie() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#fff", color: "#111″ }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#4F46E5 0%,#3730A3 100%)", color: "#fff", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>GRAND PRAIRIE, TX</span>
          <h1 style={{ fontSize: "clamp(28px,5vw,46px)", fontWeight: 800, margin: "20px 0 18px", lineHeight: 1.15 }}>
            Grand Prairie TX: Centrally Located, Centrally Maintained
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, maxWidth: 620, margin: "0 auto 32px" }}>
            Sitting at the crossroads of Dallas and Tarrant County, Grand Prairie's diverse housing stock — from 1950s post-war builds to 2010s developments — deserves pros who know every era and every risk.
          </p>
          <a href="/waitlist/homeowner" style={{ background: "#F59E0B", color: "#111″, fontWeight: 700, padding: "16px 36px", borderRadius: 8, textDecoration: "none", fontSize: 16, display: "inline-block" }}>
            Join Waitlist — Free
          </a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#F5F3FF", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 24, textAlign: "center" }}>
          {[
            { stat: "60 yrs", label: "Housing stock spans 6 decades" },
            { stat: "2 Counties", label: "Dallas + Tarrant jurisdiction" },
            { stat: "DFW Border", label: "Airport vibration zone (north GP)" },
            { stat: "4× more", label: "Available specialty pros vs avg suburb" },
          ].map((item) => (
            <div key={item.stat} style={{ background: "#fff", borderRadius: 12, padding: "24px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#4F46E5″ }}>{item.stat}</div>
              <div style={{ fontSize: 13, color: "#6B7280″, marginTop: 6 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>How TrustyPro Serves Grand Prairie</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 28 }}>
          {[
            { step: "1″, title: "Enter Your Home's Era", desc: "1950s? 1980s? 2005? Each decade of Grand Prairie housing has distinct systems, materials, and failure points our AI knows by heart." },
            { step: "2″, title: "AI Screens for County & Air Quality", desc: "Your Dallas or Tarrant County address determines permit jurisdiction. Your industrial proximity determines which air quality and HVAC specialists we prioritize." },
            { step: "3″, title: "Get the Whole-DFW Pro Pool", desc: "Central location means you access pros from every direction — the largest available contractor network in the metroplex." },
          ].map((s) => (
            <div key={s.step} style={{ background: "#F5F3FF", borderRadius: 14, padding: "28px 24px" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#4F46E5″, color: "#fff", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{s.step}</div>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: "#4B5563″, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pros */}
      <section style={{ background: "#FAFAF9″, padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Grand Prairie TrustyPros</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            {pros.map((p) => (
              <div key={p.name} style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#4F46E5″, color: "#fff", fontWeight: 800, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{p.name[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                <div style={{ color: "#6B7280″, fontSize: 13, margin: "4px 0 10px" }}>{p.trade}</div>
                <span style={{ background: "#EEF2FF", color: "#4F46E5″, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{p.badge}</span>
                <div style={{ marginTop: 12, fontSize: 13, color: "#374151″ }}>⭐ {p.rating} · {p.jobs} jobs completed</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Grand Prairie Homeowners Speak</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {testimonials.map((t) => (
            <div key={t.author} style={{ background: "#F5F3FF", borderRadius: 14, padding: "28px 24px" }}>
              <p style={{ fontStyle: "italic", color: "#374151″, lineHeight: 1.6, marginBottom: 16 }}>"{t.text}"</p>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#4F46E5″ }}>— {t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F5F3FF", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Grand Prairie Homeowner FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "18px 20px", background: "none", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q}<span style={{ color: "#4F46E5″ }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 20px 18px", color: "#4B5563″, fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4F46E5″, color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Grand Prairie Homes Deserve Grand Protection</h2>
        <p style={{ fontSize: 17, opacity: 0.88, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>Join the waitlist — free for early Grand Prairie homeowners.</p>
        <a href="/waitlist/homeowner" style={{ background: "#F59E0B", color: "#111″, fontWeight: 700, padding: "16px 40px", borderRadius: 8, textDecoration: "none", fontSize: 17, display: "inline-block" }}>
          Join the Waitlist
        </a>
      </section>
    </div>
  );
}
