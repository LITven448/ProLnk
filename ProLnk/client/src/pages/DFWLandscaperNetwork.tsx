import React from "react";

export default function DFWLandscaperNetwork() {
  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#0A1628" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)", color: "#FAFAF9", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", backgroundColor: "#F5E642", color: "#0A1628", padding: "6px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 24 }}>
            DFW LANDSCAPERS
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 24, color: "#FAFAF9" }}>
            DFW Landscapers: Your Crew Sees Things Homeowners Ignore — and We Pay You For It
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "#a8bdd4", marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
            Landscapers visit properties more frequently than any other trade. Every time your crew is on-site, they see foundation drainage, roof condition, outdoor HVAC units, and irrigation problems — all from the yard. ProLnk pays you for every opportunity those eyes and cameras detect.
          </p>
          <a href="/apply" style={{ display: "inline-block", backgroundColor: "#F5E642", color: "#0A1628", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 18, textDecoration: "none" }}>
            Claim Your Territory — Apply Now
          </a>
        </div>
      </section>

      {/* DFW Stats */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAFAF9" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#0A1628" }}>
            The Landscaper Advantage in DFW
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { stat: "#1", label: "Most property visits per year of any trade" },
              { stat: "52×", label: "Weekly service = 52 photo opportunities per year" },
              { stat: "1.8", label: "Avg additional leads detected per yard visit" },
              { stat: "$72", label: "Avg cross-trade commission per property per month" },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: "#fff", border: "2px solid #e8e4dc", borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: "#F5E642", WebkitTextStroke: "2px #0A1628", marginBottom: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 15, color: "#4a5568", lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Income Math */}
      <section style={{ padding: "64px 24px", backgroundColor: "#0A1628", color: "#FAFAF9" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#FAFAF9" }}>
            The Math on Your Existing Lawn Accounts
          </h2>
          <p style={{ textAlign: "center", color: "#a8bdd4", fontSize: 18, marginBottom: 40 }}>
            One monthly lawn maintenance customer. Here's what ProLnk adds on top:
          </p>
          <div style={{ backgroundColor: "#1a2d4a", borderRadius: 16, padding: 40, border: "1px solid #2a4a6a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #2a4a6a" }}>
              <span style={{ color: "#a8bdd4", fontSize: 16 }}>Monthly lawn maintenance value</span>
              <span style={{ fontWeight: 700, fontSize: 20 }}>$300</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #2a4a6a" }}>
              <span style={{ color: "#a8bdd4", fontSize: 16 }}>ProLnk platform fee (10%)</span>
              <span style={{ fontWeight: 700, fontSize: 20 }}>$30</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #2a4a6a" }}>
              <span style={{ color: "#a8bdd4", fontSize: 16 }}>Your direct commission (60%)</span>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#F5E642" }}>$21.60</span>
            </div>
            <div style={{ backgroundColor: "#0A1628", borderRadius: 12, padding: 24, marginTop: 24 }}>
              <p style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
                Cross-trade opportunities detected from the yard — every month:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Foundation drainage grading issues → Foundation/drainage lead",
                  "Outdoor HVAC unit obstructions → HVAC lead",
                  "Irrigation leak or broken heads → Plumbing/irrigation lead",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#FAFAF9", fontSize: 15, lineHeight: 1.5 }}>
                    <span style={{ color: "#F5E642", fontWeight: 700, flexShrink: 0 }}>+</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "16px 0", borderTop: "1px solid #2a4a6a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#a8bdd4", fontSize: 16 }}>Avg monthly cross-trade commission</span>
                <span style={{ fontWeight: 800, fontSize: 24, color: "#F5E642" }}>+$72</span>
              </div>
            </div>
            <div style={{ marginTop: 24, padding: "20px 0", borderTop: "1px solid #2a4a6a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 16, color: "#a8bdd4" }}>Total ProLnk income per property/month</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#F5E642" }}>$93.60</span>
              </div>
              <div style={{ backgroundColor: "#1a2d4a", borderRadius: 8, padding: 20, border: "1px solid #F5E642" }}>
                <p style={{ color: "#a8bdd4", fontSize: 14, marginBottom: 6 }}>With 40 monthly maintenance accounts:</p>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#F5E642" }}>$3,744 / month</div>
                <p style={{ color: "#718096", fontSize: 13, marginTop: 6 }}>In ProLnk income — on top of your normal lawn revenue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAFAF9" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#0A1628" }}>
            Why Landscapers Are Built for ProLnk
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              {
                icon: "🌿",
                title: "Frequency Compounds Into Income",
                desc: "Weekly or bi-weekly visits mean 52+ photo opportunities per property per year. No other trade has this frequency. More photos = more AI detections = more commission. It's compounding by design.",
              },
              {
                icon: "🎯",
                title: "See What Homeowners Walk Past Daily",
                desc: "Homeowners are blind to their own properties. Your crew notices the cracked AC pad, the downspout eroding the foundation, the irrigation leak that's been running for a month. ProLnk turns that awareness into income.",
              },
              {
                icon: "🔒",
                title: "Lock In Properties Permanently",
                desc: "Every home your crew photographs enters ProLnk's Home Health Vault under your origination rights. Every future service lead from that address generates residual income for you — whether or not you still maintain it.",
              },
            ].map((b, i) => (
              <div key={i} style={{ backgroundColor: "#fff", border: "2px solid #e8e4dc", borderRadius: 12, padding: 32 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#0A1628" }}>{b.title}</h3>
                <p style={{ color: "#4a5568", lineHeight: 1.6, fontSize: 15 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 24px", backgroundColor: "#f0ede8" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#0A1628" }}>
            How It Works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { step: "1", title: "Apply & Get Approved", desc: "Submit your business info and DFW service area. Approval within 24 hours." },
              { step: "2", title: "Photograph During Normal Service", desc: "Your crew uses the ProLnk app to snap 3-5 photos of the property exterior per visit. Takes under 2 minutes." },
              { step: "3", title: "AI Detects Hidden Opportunities", desc: "ProLnk AI scans for drainage issues, HVAC problems, foundation stress, irrigation leaks, and pest entry points." },
              { step: "4", title: "Get Paid Every Month", desc: "When a matched pro closes a job you originated, your commission hits your account. Stackable across all your properties." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "28px 0", borderBottom: i < 3 ? "1px solid #d4cfc7" : "none" }}>
                <div style={{ minWidth: 48, height: 48, borderRadius: "50%", backgroundColor: "#F5E642", border: "2px solid #0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: "#0A1628", flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: "#0A1628" }}>{s.title}</h3>
                  <p style={{ color: "#4a5568", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAFAF9" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ backgroundColor: "#fff", border: "2px solid #e8e4dc", borderRadius: 16, padding: 48 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>"</div>
            <p style={{ fontSize: 20, lineHeight: 1.7, color: "#0A1628", fontStyle: "italic", marginBottom: 24 }}>
              My crew already notices everything. Now we actually get paid for it. Last month I earned more from ProLnk cross-trade commissions than I did from one of my full maintenance routes. The homeowners trust us — they act on what we find.
            </p>
            <div style={{ borderTop: "1px solid #e8e4dc", paddingTop: 24 }}>
              <div style={{ fontWeight: 700, color: "#0A1628", fontSize: 16 }}>Jerome K.</div>
              <div style={{ color: "#718096", fontSize: 14 }}>Landscaping Owner — Allen, TX</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", backgroundColor: "#0A1628", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#FAFAF9", marginBottom: 16 }}>
            Your Accounts Are Your Inventory
          </h2>
          <p style={{ color: "#a8bdd4", fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            Every yard you maintain is a recurring income opportunity waiting to be unlocked. Apply now and start turning existing service into passive commission — before a competitor claims your ZIP code.
          </p>
          <a href="/apply" style={{ display: "inline-block", backgroundColor: "#F5E642", color: "#0A1628", padding: "18px 48px", borderRadius: 8, fontWeight: 800, fontSize: 20, textDecoration: "none" }}>
            Apply for Your Territory →
          </a>
          <p style={{ color: "#718096", fontSize: 14, marginTop: 16 }}>Free to apply. No monthly fee during founding period.</p>
        </div>
      </section>
    </div>
  );
}
