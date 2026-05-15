import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$750K", sub: "Established luxury" },
  { label: "Home Vintage", value: "1990–2010", sub: "Mature luxury stock" },
  { label: "Active Pros", value: "75+", sub: "Verified in Colleyville" },
  { label: "Geothermal Homes", value: "Significant", sub: "Above DFW average" },
];

const steps = [
  { n: "1", title: "Document Your Systems", body: "Log your Colleyville home's geothermal HVAC, mature tree inventory, and long driveway. Our AI builds a proactive maintenance schedule from day one." },
  { n: "2", title: "Specialized Matches", body: "Geothermal systems require certified technicians. Mature trees need ISA-certified arborists. TrustyPro routes you to credentialed pros — not general handymen." },
  { n: "3", title: "Quiet Luxury, Zero Surprises", body: "Colleyville homeowners expect seamless service. Your TrustyPro Vault keeps every record so you never scramble for paperwork when something needs attention." },
];

const pros = [
  { name: "Chris W.", trade: "Geothermal HVAC Systems", rating: 5.0, jobs: 118, badge: "Geothermal Certified" },
  { name: "Nancy P.", trade: "Tree Care & Storm Prep", rating: 4.9, jobs: 204, badge: "ISA Arborist" },
  { name: "Steve R.", trade: "Concrete & Driveway Rehab", rating: 4.8, jobs: 167, badge: "Colleyville Trusted" },
];

const testimonials = [
  { text: "My geothermal system needed a loop field inspection and I couldn't find anyone who understood it. TrustyPro had a certified tech on-site within 3 days.", author: "Grant T., Elm Tree Estates" },
  { text: "Lost a 60-year-old live oak to last summer's drought stress. TrustyPro's arborist caught the decline early in two other trees — saved both of them.", author: "Sandra K., Heritage Lakes" },
  { text: "90 feet of driveway concrete cracked after a root intrusion. TrustyPro found a specialist who handled both the tree and the concrete. One call, solved.", author: "Phil D., Colleyville Meadows" },
];

const faqs = [
  { q: "What makes geothermal HVAC maintenance different from standard systems?", a: "Geothermal systems require annual loop field pressure checks, heat pump refrigerant verification, and ground loop fluid testing. Standard HVAC techs lack the certification to service the loop side. TrustyPro screens specifically for WaterFurnace, Climatemaster, or ClimateMaster certified technicians depending on your system brand." },
  { q: "How do mature trees affect my home's risk profile?", a: "Colleyville's tree-heavy lots are beautiful but represent real risk. Root intrusion damages foundations, sewer lines, and driveways. Storm debris causes roof and gutter damage. ISA-certified arborists can assess structural integrity, recommend crown reduction, and document tree health — all trackable in your TrustyPro Vault." },
  { q: "My driveway is over 80 feet — what maintenance should I expect?", a: "Longer driveways in Colleyville's clay soil experience more expansion/contraction cycling. Expect sealing every 2-3 years for asphalt, and crack monitoring annually for concrete. Root proximity accelerates issues. TrustyPro can connect you with pros who specialize in large-lot concrete in North Tarrant County." },
  { q: "How does TrustyPro handle the privacy expectations of Colleyville homeowners?", a: "Your home data is private by default — never shared with third parties without your consent. TrustyPro's Home Health Vault stores your documentation securely, and you control exactly what's visible to buyers or agents during a sale process." },
];

export default function TrustyProColleyville() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", color: "#111827" }}>

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#4338ca" }}>TrustyPro</span>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Get Started Free</a>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #eef2ff 0%, #fff 100%)", padding: "72px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#eef2ff", color: "#4338ca", fontWeight: 700, fontSize: 13, padding: "6px 14px", borderRadius: 20, marginBottom: 20 }}>Colleyville, TX · Quiet Luxury Home Intelligence</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.15, maxWidth: 760, margin: "0 auto 20px", color: "#111827" }}>
          Colleyville TX: Quiet Luxury — Smart Home Protection
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Mature trees, geothermal HVAC, long driveways, and $750K homes that deserve precision care. TrustyPro connects you with pros who work at Colleyville's standard.
        </p>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "16px 36px", borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 14px rgba(245,158,11,0.35)" }}>
          Protect My Colleyville Home →
        </a>
      </section>

      {/* Stats */}
      <section style={{ background: "#fff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: "32px 24px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid #e5e7eb" : "none" }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#4338ca" }}>{s.value}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "72px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>How TrustyPro Works in Colleyville</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#4338ca", color: "#fff", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{s.n}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Cards */}
      <section style={{ background: "#f3f4f6", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Top-Rated Colleyville Pros</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {pros.map((p, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#4338ca", marginBottom: 14 }}>{p.name[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 10 }}>{p.trade}</div>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Colleyville Homeowners Trust TrustyPro</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 28, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 28, color: "#4338ca", lineHeight: 1, marginBottom: 12 }}>"</div>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>{t.text}</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>— {t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f9fafb", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>Colleyville Homeowner FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: 15, color: "#111827" }}>
                {f.q}
                <span style={{ color: "#4338ca", fontSize: 20, fontWeight: 700 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 24px 20px", fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4338ca", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 16 }}>Protect Your Colleyville Home Today</h2>
        <p style={{ color: "#c7d2fe", fontSize: 17, marginBottom: 36 }}>Join thousands of DFW homeowners who use TrustyPro to stay ahead of local risks.</p>
        <a href="/waitlist/homeowner" style={{ background: "#f59e0b", color: "#fff", padding: "16px 40px", borderRadius: 10, fontWeight: 800, fontSize: 17, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}>
          Join the Waitlist — It's Free →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827", padding: "28px 24px", textAlign: "center", color: "#6b7280", fontSize: 13 }}>
        <span style={{ color: "#4338ca", fontWeight: 700 }}>TrustyPro</span> · Colleyville, TX · <a href="/privacy" style={{ color: "#6b7280" }}>Privacy</a> · <a href="/terms" style={{ color: "#6b7280" }}>Terms</a>
      </footer>
    </div>
  );
}
