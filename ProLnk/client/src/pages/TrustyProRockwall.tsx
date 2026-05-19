import { useState } from "react";

const pros = [
  { name: "Kevin B.", trade: "Foundation & Drainage", rating: 4.9, jobs: 278, badge: "Lakeside Specialist" },
  { name: "Anita R.", trade: "Moisture & Waterproofing", rating: 4.8, jobs: 193, badge: "Humidity Expert" },
  { name: "Paul S.", trade: "Dock & Pier Maintenance", rating: 5.0, jobs: 87, badge: "Lake Ray Hubbard Pro" },
];

const testimonials = [
  { text: "Our lakeside lot had foundation movement we didn't even know about. TrustyPro's matched inspector caught it before it became a six-figure repair.", author: "Linda F., Rockwall TX" },
  { text: "Living 200 feet from the lake means humidity in the crawl space year-round. The moisture specialist they matched us with solved it in one visit.", author: "Tom G., Lake Ray Hubbard Shore" },
  { text: "Our boat dock needed structural certification for insurance. TrustyPro found the only certified dock inspector in Rockwall County within two hours.", author: "Sarah M., Harbor District" },
];

const faqs = [
  { q: "Why does lake proximity cause foundation problems?", a: "Lake Ray Hubbard's fluctuating water table expands and contracts Rockwall's heavy clay soil. This seasonal movement creates differential foundation settlement unique to lakeside properties." },
  { q: "What humidity levels are typical in Rockwall homes near the lake?", a: "Properties within a half mile of the lake average 15-22% higher interior humidity than inland homes — exceeding the 50% threshold that accelerates mold growth." },
  { q: "Do I need a special pro for dock and pier work?", a: "Yes. Dock and pier work requires a licensed structural engineer review plus specialty contractors experienced with treated marine lumber and galvanized hardware. TrustyPro pre-vets these specialists." },
  { q: "My home was built between 2000 and 2015 — is it still at risk?", a: "Rockwall's rapid growth era homes (2000-2015) were often built on lots with inadequate drainage engineering for lake-proximate clay soil. Post-construction foundation movement is common in this cohort." },
];

export default function TrustyProRockwall() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#fff", color: "#111″ }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#4F46E5 0%,#3730A3 100%)", color: "#fff", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>ROCKWALL, TX</span>
          <h1 style={{ fontSize: "clamp(28px,5vw,46px)", fontWeight: 800, margin: "20px 0 18px", lineHeight: 1.15 }}>
            Rockwall TX: DFW's Lakeside City Has Unique Home Health Risks
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, maxWidth: 620, margin: "0 auto 32px" }}>
            Lake Ray Hubbard's beauty comes at a cost — moisture intrusion, clay-soil foundation movement, and dock maintenance risks that inland pros simply aren’t trained to handle.
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
            { stat: "90%+", label: "Homes built 2000–2015″ },
            { stat: "+20%", label: "Higher lakeside humidity" },
            { stat: "3–5 in", label: "Avg clay soil movement/yr" },
            { stat: "$28K", label: "Avg undetected foundation repair" },
          ].map((item) => (
            <div key={item.stat} style={{ background: "#fff", borderRadius: 12, padding: "24px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#4F46E5″ }}>{item.stat}</div>
              <div style={{ fontSize: 13, color: "#6B7280″, marginTop: 6 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>Built for Rockwall's Unique Risks</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 28 }}>
          {[
            { step: "1″, title: "Flag Your Location", desc: "Tell us your proximity to Lake Ray Hubbard. Our AI adjusts matching criteria for moisture, drainage, and foundation risk automatically." },
            { step: "2″, title: "Get a Lake-Aware Pro", desc: "Only pros with verified lakeside property experience appear in your match — no inland specialists guessing at moisture mitigation." },
            { step: "3″, title: "Continuous Photo Monitoring", desc: "Seasonal inspection photos track foundation grade, crawl space moisture, and dock condition over time — before damage is visible." },
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
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Rockwall-Area TrustyPros</h2>
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
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Rockwall Homeowners Trust TrustyPro</h2>
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
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Rockwall Homeowner FAQ</h2>
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
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Protect Your Lakeside Investment</h2>
        <p style={{ fontSize: 17, opacity: 0.88, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>Join Rockwall's early homeowner waitlist — free forever.</p>
        <a href="/waitlist/homeowner" style={{ background: "#F59E0B", color: "#111″, fontWeight: 700, padding: "16px 40px", borderRadius: 8, textDecoration: "none", fontSize: 17, display: "inline-block" }}>
          Join the Waitlist
        </a>
      </section>
    </div>
  );
}
