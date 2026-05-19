import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$1.2M", sub: "DFW's premier suburb" },
  { label: "Build Era", value: "2000–2020″, sub: "Modern construction" },
  { label: "Active Pros", value: "80+", sub: "Verified in Southlake" },
  { label: "Pool Homes", value: "~45%", sub: "Pool maintenance common" },
];

const steps = [
  { n: "1″, title: "Premium Profile Setup", body: "Document your Southlake home's systems — 3-zone HVAC, whole-home generator, pool/spa, and irrigation. Our AI maps every asset." },
  { n: "2″, title: "Specialists, Not Generalists", body: "$1.2M homes need pros who work at that level. TrustyPro routes you to Carroll ISD area specialists with multi-zone HVAC, generator, and smart home experience." },
  { n: "3″, title: "Protect Your Investment", body: "Every maintenance event is logged permanently. In Southlake's resale market, documented systems command premium valuations." },
];

const pros = [
  { name: "Blake H.", trade: "Multi-Zone HVAC & Generators", rating: 5.0, jobs: 143, badge: "Southlake Elite" },
  { name: "Megan C.", trade: "Pool, Spa & Irrigation", rating: 4.9, jobs: 228, badge: "Carroll ISD Area" },
  { name: "Drew A.", trade: "Smart Home & Electrical", rating: 4.9, jobs: 187, badge: "Luxury Systems Pro" },
];

const testimonials = [
  { text: "Our 3-zone system needed a pro who actually understood it. TrustyPro matched us with someone who services 4 other homes in our neighborhood — perfect.", author: "Michelle B., Timarron" },
  { text: "The generator quarterly maintenance was overdue. TrustyPro found a Generac-certified tech within 24 hours who now handles all our mechanical systems.", author: "David L., Stone Lakes" },
  { text: "Pool, irrigation, and HVAC all serviced through one TrustyPro account. The documentation alone is worth it when we eventually sell.", author: "Amy T., Carillon" },
];

const faqs = [
  { q: "Why do Southlake homes need specialized maintenance pros?", a: "Most Southlake homes built 2000–2020 include systems that require trade certification: multi-zone HVAC with smart controls, whole-home standby generators, resort-style pools with automation systems, and large-lot irrigation. TrustyPro screens for the exact credentials each system requires." },
  { q: "How often should a whole-home generator be serviced?", a: "Standby generators require quarterly oil/filter changes, annual load bank testing, and battery inspection. Most homeowners run them monthly automatically. TrustyPro tracks your last service date and alerts you before the next interval — preventing the failure that always happens during the first real outage." },
  { q: "My pool has an automation system. Can TrustyPro find someone who services it?", a: "Yes. Our pro intake captures the brand of your pool automation system (Pentair, Hayward, Jandy, etc.) and routes you to certified technicians who service that specific platform. Southlake's pool density means we have strong coverage." },
  { q: "What's the ROI of maintenance documentation in Southlake's market?", a: "At $1.2M average, buyers conduct thorough inspections. Homes with comprehensive service records see fewer inspection-based price reductions and spend fewer days on market. Every TrustyPro job creates a permanent, buyer-accessible record." },
];

export default function TrustyProSouthlake() {
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
        <div style={{ display: "inline-block", background: "#eef2ff", color: "#4338ca", fontWeight: 700, fontSize: 13, padding: "6px 14px", borderRadius: 20, marginBottom: 20 }}>Southlake, TX · Premium Home Intelligence</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.15, maxWidth: 760, margin: "0 auto 20px", color: "#111827″ }}>
          Southlake TX: DFW's Premier Suburb Deserves Premium Home Intelligence
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280″, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
          $1.2M homes, 3-zone HVAC, whole-home generators, pools, and perfection-level expectations. TrustyPro is built for Southlake's standard.
        </p>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "16px 36px", borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 14px rgba(245,158,11,0.35)" }}>
          Protect My Southlake Home →
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
        <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>How TrustyPro Works in Southlake</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Top-Rated Southlake Pros</h2>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Southlake Homeowners Trust TrustyPro</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Southlake Homeowner FAQ</h2>
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
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 16 }}>Protect Your Southlake Home Today</h2>
        <p style={{ color: "#c7d2fe", fontSize: 17, marginBottom: 36 }}>Join thousands of DFW homeowners who use TrustyPro to stay ahead of local risks.</p>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "16px 40px", borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}>
          Join the Waitlist — It's Free →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827″, padding: "28px 24px", textAlign: "center", color: "#6b7280", fontSize: 13 }}>
        <span style={{ color: "#4338ca", fontWeight: 700 }}>TrustyPro</span> · Southlake, TX · <a href="/privacy" style={{ color: "#6b7280″ }}>Privacy</a> · <a href="/terms" style={{ color: "#6b7280" }}>Terms</a>
      </footer>
    </div>
  );
}
