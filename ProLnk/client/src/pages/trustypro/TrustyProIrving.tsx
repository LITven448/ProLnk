import { useState } from 'react';

const stats = [
  { label: "Avg Home Age", value: "35 yrs", sub: "Built 1970s–2000s" },
  { label: "Water Hardness", value: "310 PPM", sub: "Heavy mineral buildup" },
  { label: "Active Pros", value: "140+", sub: "Verified in Irving" },
  { label: "Avg Response", value: "< 2 hrs", sub: "Emergency requests" },
];

const steps = [
  { n: "1″, title: "Describe Your Home", body: "Share your address, home age, and the issue you're facing. Our AI maps your specific Irving micro-zone risk profile." },
  { n: "2″, title: "Match Instantly", body: "TrustyPro's algorithm connects you with pros who have experience with DFW airport-adjacent vibration issues, hard water, and 1960s–2000s housing stock." },
  { n: "3″, title: "Verified Work, Documented", body: "Every job is logged in your Home Health Vault — permanent proof of care that protects your home's value." },
];

const pros = [
  { name: "Marcus T.", trade: "Foundation & Drainage", rating: 4.9, jobs: 203, badge: "Airport Zone Specialist" },
  { name: "Diana L.", trade: "HVAC & Water Treatment", rating: 4.8, jobs: 178, badge: "Hard Water Expert" },
  { name: "Raul V.", trade: "Plumbing & Pipe Rehab", rating: 4.9, jobs: 241, badge: "Las Colinas Trusted" },
];

const testimonials = [
  { text: "My 1978 ranch had foundation cracks I attributed to settlement. TrustyPro flagged the airport vibration risk and got me a specialist within the hour.", author: "Patricia M., Valley Ranch" },
  { text: "The hard water here destroyed my water heater in 5 years. TrustyPro connected me with a pro who installed a whole-home softener and extended my warranty.", author: "Kevin S., Los Colinas" },
  { text: "Stadium events crack my driveway every other year. Finally found a concrete pro who actually understands why — through TrustyPro.", author: "Angie R., Heritage District" },
];

const faqs = [
  { q: "Why does my Irving home have more foundation issues than neighboring cities?", a: "Irving sits in Dallas County's expansive clay soil zone AND near major vibration sources — AT&T Stadium events and DFW flight paths. This 1-2 punch causes more frequent foundation movement. TrustyPro matches you with pros experienced in this specific combination." },
  { q: "How does hard water affect my home systems?", a: "At 310 PPM, Irving's water causes accelerated scale buildup in water heaters, dishwashers, and pipes. Most systems lose 30–50% of their rated lifespan without treatment. Our network includes water treatment specialists who can assess and protect your appliances." },
  { q: "I have a 1980s home in Las Colinas. What are my biggest risks?", a: "Older polybutylene or galvanized plumbing, aging HVAC systems approaching replacement age, and roof decking that may predate modern hurricane-strap standards. TrustyPro's intake captures your home age and surfaces the right specialists." },
  { q: "Is TrustyPro available for flood-plain properties?", a: "Yes. We have pros experienced with Irving's flood-zone regulations, drainage requirements, and insurance documentation. Join the waitlist and note your FEMAzone at signup." },
];

export default function TrustyProIrving() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", color: "#111827″ }}>

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#4338ca" }}>TrustyPro</span>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Get Started Free</a>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #eef2ff 0%, #fff 100%)", padding: "72px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#eef2ff", color: "#4338ca", fontWeight: 700, fontSize: 13, padding: "6px 14px", borderRadius: 20, marginBottom: 20 }}>Irving, TX · DFW Home Intelligence</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.15, maxWidth: 760, margin: "0 auto 20px", color: "#111827″ }}>
          Irving TX: From Cowboys Stadium to Your Backyard — World-Class Home Care
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280″, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
          AT&T Stadium vibrations, DFW flight paths, 310 PPM hard water, and 35-year-old homes. Irving's challenges are unique. Your home protection should be too.
        </p>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "16px 36px", borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 14px rgba(245,158,11,0.35)" }}>
          Protect My Irving Home →
        </a>
      </section>

      {/* Stats */}
      <section style={{ background: "#fff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: "32px 24px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid #e5e7eb" : "none" }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#4338ca" }}>{s.value}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111827″, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "72px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>How TrustyPro Works in Irving</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#4338ca", color: "#fff", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{s.n}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280″, lineHeight: 1.65 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Cards */}
      <section style={{ background: "#f3f4f6″, padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Top-Rated Irving Pros</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {pros.map((p, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#4338ca", marginBottom: 14 }}>{p.name[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                <div style={{ color: "#6b7280″, fontSize: 13, marginBottom: 10 }}>{p.trade}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 13, marginBottom: 12 }}>
                  <span style={{ color: "#f59e0b", fontWeight: 700 }}>★ {p.rating}</span>
                  <span style={{ color: "#9ca3af" }}>{p.jobs} jobs</span>
                </div>
                <span style={{ background: "#eef2ff", color: "#4338ca", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{p.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Irving Homeowners Trust TrustyPro</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 28, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 28, color: "#4338ca", lineHeight: 1, marginBottom: 12 }}>"</div>
              <p style={{ fontSize: 15, color: "#374151″, lineHeight: 1.7, marginBottom: 16 }}>{t.text}</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#6b7280″ }}>— {t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f9fafb", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Irving Homeowner FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: 15, color: "#111827″ }}>
                {f.q}
                <span style={{ color: "#4338ca", fontSize: 20, fontWeight: 700 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 24px 20px", fontSize: 14, color: "#6b7280″, lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4338ca", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 16 }}>Protect Your Irving Home Today</h2>
        <p style={{ color: "#c7d2fe", fontSize: 17, marginBottom: 36 }}>Join thousands of DFW homeowners who use TrustyPro to stay ahead of local risks.</p>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "16px 40px", borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}>
          Join the Waitlist — It's Free →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827″, padding: "28px 24px", textAlign: "center", color: "#6b7280", fontSize: 13 }}>
        <span style={{ color: "#4338ca", fontWeight: 700 }}>TrustyPro</span> · Irving, TX · <a href="/privacy" style={{ color: "#6b7280″ }}>Privacy</a> · <a href="/terms" style={{ color: "#6b7280" }}>Terms</a>
      </footer>
    </div>
  );
}
