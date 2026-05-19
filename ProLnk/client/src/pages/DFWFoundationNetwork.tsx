import React from "react";

export default function DFWFoundationNetwork() {
  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#0A1628" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)", color: "#FAFAF9", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", backgroundColor: "#F5E642", color: "#0A1628", padding: "6px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 24 }}>
            DFW FOUNDATION CONTRACTORS
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 24, color: "#FAFAF9" }}>
            DFW Foundation Contractors: You're Sitting on the Most Valuable Lead Source in Texas
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "#a8bdd4", marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
            The Blackland Prairie clay soil under DFW homes causes $2.8 billion in foundation damage annually — more than any other metro in the US. You're already at the property. ProLnk pays you for every opportunity your eyes and camera detect.
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
            The DFW Foundation Crisis — And Why You Win
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { stat: "$2.8B", label: "Annual foundation damage in DFW" },
              { stat: "#1", label: "Most foundation damage of any US metro" },
              { stat: "40%", label: "DFW homes have active foundation movement" },
              { stat: "3.2×", label: "Avg additional trades detected per foundation visit" },
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
            Real Math. Real Money.
          </h2>
          <p style={{ textAlign: "center", color: "#a8bdd4", fontSize: 18, marginBottom: 40 }}>
            Here's what one typical DFW foundation job actually earns you on ProLnk:
          </p>
          <div style={{ backgroundColor: "#1a2d4a", borderRadius: 16, padding: 40, border: "1px solid #2a4a6a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #2a4a6a" }}>
              <span style={{ color: "#a8bdd4", fontSize: 16 }}>Foundation repair job value</span>
              <span style={{ fontWeight: 700, fontSize: 20 }}>$12,000</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #2a4a6a" }}>
              <span style={{ color: "#a8bdd4", fontSize: 16 }}>ProLnk platform fee (10%)</span>
              <span style={{ fontWeight: 700, fontSize: 20 }}>$1,200</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #2a4a6a" }}>
              <span style={{ color: "#a8bdd4", fontSize: 16 }}>Your direct commission (72%)</span>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#F5E642" }}>$864</span>
            </div>
            <div style={{ backgroundColor: "#0A1628", borderRadius: 12, padding: 24, marginTop: 24 }}>
              <p style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
                But here's the multiplier — same visit, AI-detected opportunities:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Drainage grading issues → Landscaping/Drainage lead",
                  "Roof overhang stress cracks → Roofing lead",
                  "Tree root proximity → Tree removal lead",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "#FAFAF9", fontSize: 15 }}>
                    <span style={{ color: "#F5E642", fontWeight: 700 }}>+</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "16px 0", borderTop: "1px solid #2a4a6a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#a8bdd4", fontSize: 16 }}>Est. cross-trade commission per visit</span>
                  <span style={{ fontWeight: 800, fontSize: 24, color: "#F5E642" }}>+$312</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, padding: "20px 0", borderTop: "1px solid #2a4a6a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}>Total from 1 foundation visit</span>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#F5E642" }}>$1,176</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAFAF9" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#0A1628" }}>
            Why Foundation Contractors Earn the Most on ProLnk
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              {
                icon: "🏗️",
                title: "Whole-Property Visibility",
                desc: "No other trade sees as much of a home's structure. Foundation inspectors assess drainage, soil, exterior walls, crawl spaces — the AI turns every observation into a potential lead for another trade.",
              },
              {
                icon: "📸",
                title: "Highest AI Lead-Gen Rate",
                desc: "Foundation contractors generate an average of 3.2 additional trade opportunities per visit — the highest detection rate of any trade on the ProLnk platform.",
              },
              {
                icon: "🔄",
                title: "Permanent Origination Rights",
                desc: "Once you photograph a property and it enters the Home Health Vault, you hold permanent origination rights. Every future lead from that property earns you a residual commission — forever.",
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
              { step: "1", title: "Apply & Get Approved", desc: "Submit your license info. We verify and assign you your DFW territory." },
              { step: "2", title: "Photograph Every Job", desc: "Use the ProLnk app to photograph the property during your normal inspection. Takes 3 minutes." },
              { step: "3", title: "AI Detects Opportunities", desc: "Our AI analyzes photos and identifies issues beyond foundation — drainage, roof, HVAC, pest damage, plumbing." },
              { step: "4", title: "Get Paid", desc: "You earn commission when matched pros close jobs from your property photos. Monthly payouts. No cap." },
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
              I thought the foundation commission was the deal. Then I got my first cross-trade payout — $2,400 from photos I already took. I now spend an extra 4 minutes per job and it's changed my income completely.
            </p>
            <div style={{ borderTop: "1px solid #e8e4dc", paddingTop: 24 }}>
              <div style={{ fontWeight: 700, color: "#0A1628", fontSize: 16 }}>Marcus T.</div>
              <div style={{ color: "#718096", fontSize: 14 }}>Foundation Contractor — Plano, TX</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", backgroundColor: "#0A1628", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#FAFAF9", marginBottom: 16 }}>
            DFW Territory Is Filling Fast
          </h2>
          <p style={{ color: "#a8bdd4", fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            We're accepting a limited number of foundation contractors per ZIP code. Once your territory is claimed, it's yours. Don't let a competitor lock up your neighborhood.
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
