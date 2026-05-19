import React from "react";

export default function DFWPestControlNetwork() {
  return (
    <div style={{ backgroundColor: "#FAFAF9″, minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#0A1628" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)", color: "#FAFAF9″, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", backgroundColor: "#F5E642″, color: "#0A1628", padding: "6px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 24 }}>
            DFW PEST CONTROL PROFESSIONALS
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 24, color: "#FAFAF9″ }}>
            DFW Pest Control Pros: Every Quarterly Visit Is a Lead Generation Opportunity
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "#a8bdd4″, marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
            Texas's warm climate means year-round pest pressure — and year-round property access. Your quarterly visits put you inside and around every home you service. ProLnk turns that access into a second income stream automatically.
          </p>
          <a href="/apply" style={{ display: "inline-block", backgroundColor: "#F5E642″, color: "#0A1628", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 18, textDecoration: "none" }}>
            Claim Your Territory — Apply Now
          </a>
        </div>
      </section>

      {/* DFW Stats */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAFAF9″ }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#0A1628″ }}>
            The DFW Pest Landscape — Your Unfair Advantage
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { stat: "4×", label: "More property visits than any other trade" },
              { stat: "95%", label: "DFW homes need pest treatment year-round" },
              { stat: "2.3″, label: "Avg additional trade leads detected per visit" },
              { stat: "$89″, label: "Avg cross-trade commission per visit" },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: "#fff", border: "2px solid #e8e4dc", borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: "#F5E642″, WebkitTextStroke: "2px #0A1628", marginBottom: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 15, color: "#4a5568″, lineHeight: 1.4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Income Math */}
      <section style={{ padding: "64px 24px", backgroundColor: "#0A1628″, color: "#FAFAF9" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#FAFAF9″ }}>
            Two Ways You Earn. Every Visit.
          </h2>
          <p style={{ textAlign: "center", color: "#a8bdd4″, fontSize: 18, marginBottom: 40 }}>
            The math on a single quarterly customer — and why the real play is cross-trade commissions:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <div style={{ backgroundColor: "#1a2d4a", borderRadius: 16, padding: 32, border: "1px solid #2a4a6a" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#a8bdd4″, marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>Direct Commission</h3>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0″, borderBottom: "1px solid #2a4a6a" }}>
                <span style={{ color: "#a8bdd4″, fontSize: 14 }}>Quarterly treatment</span>
                <span style={{ fontWeight: 700 }}>$150</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0″, borderBottom: "1px solid #2a4a6a" }}>
                <span style={{ color: "#a8bdd4″, fontSize: 14 }}>ProLnk fee (10%)</span>
                <span style={{ fontWeight: 700 }}>$15</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0″ }}>
                <span style={{ color: "#a8bdd4″, fontSize: 14 }}>Your commission (72%)</span>
                <span style={{ fontWeight: 700, color: "#F5E642″, fontSize: 20 }}>$10.80</span>
              </div>
              <p style={{ color: "#718096″, fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>Per visit. 4 visits/year = $43.20 direct per customer annually.</p>
            </div>
            <div style={{ backgroundColor: "#1a2d4a", borderRadius: 16, padding: 32, border: "2px solid #F5E642″ }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 }}>Cross-Trade Commission ★</h3>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0″, borderBottom: "1px solid #2a4a6a" }}>
                <span style={{ color: "#a8bdd4″, fontSize: 14 }}>Avg leads detected</span>
                <span style={{ fontWeight: 700 }}>2.3 / visit</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0″, borderBottom: "1px solid #2a4a6a" }}>
                <span style={{ color: "#a8bdd4″, fontSize: 14 }}>Avg commission/lead</span>
                <span style={{ fontWeight: 700 }}>$38.70</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0″ }}>
                <span style={{ color: "#a8bdd4″, fontSize: 14 }}>Est. per visit</span>
                <span style={{ fontWeight: 700, color: "#F5E642″, fontSize: 20 }}>$89</span>
              </div>
              <p style={{ color: "#718096″, fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>4 visits/year = $356 in cross-trade per customer annually.</p>
            </div>
          </div>
          <div style={{ backgroundColor: "#1a2d4a", borderRadius: 12, padding: 24, border: "1px solid #2a4a6a", textAlign: "center" }}>
            <p style={{ color: "#a8bdd4″, fontSize: 15, marginBottom: 8 }}>With 50 quarterly customers, your annual ProLnk income:</p>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#F5E642″ }}>$19,960 / year</div>
            <p style={{ color: "#718096″, fontSize: 14, marginTop: 8 }}>From photos you're already taking during normal treatments</p>
          </div>
        </div>
      </section>

      {/* What Pest Pros Detect */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAFAF9″ }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#0A1628″ }}>
            Three Benefits That Change Your Business
          </h2>
          <p style={{ textAlign: "center", color: "#718096″, fontSize: 18, marginBottom: 48 }}>ProLnk turns your existing customer relationships into a permanent passive income asset.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              {
                icon: "🔁",
                title: "Frequency Is Your Superpower",
                desc: "No other trade visits properties 4× a year. That frequency means you see seasonal changes — summer moisture, fall pest entry points, winter pipe stress. The AI turns seasonal observation into year-round lead flow.",
              },
              {
                icon: "👁️",
                title: "You See What Others Miss",
                desc: "Pest pros photograph entry points, wood rot, moisture damage, crawl space conditions, and exterior gaps. These same photos generate leads for plumbers, foundation contractors, and landscapers — automatically.",
              },
              {
                icon: "🏠",
                title: "Origination Rights — Own the Property Forever",
                desc: "The first time you photograph a property and it enters ProLnk's Home Health Vault, you own origination rights. Every lead generated from that address — ever — earns you a residual cut. No expiration.",
              },
            ].map((b, i) => (
              <div key={i} style={{ backgroundColor: "#fff", border: "2px solid #e8e4dc", borderRadius: 12, padding: 32 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#0A1628″ }}>{b.title}</h3>
                <p style={{ color: "#4a5568″, lineHeight: 1.6, fontSize: 15 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 24px", backgroundColor: "#f0ede8″ }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#0A1628″ }}>
            How It Works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { step: "1″, title: "Apply & Get Verified", desc: "Submit your pest license and service area. Approval typically within 24 hours." },
              { step: "2″, title: "Photo During Normal Service", desc: "Snap entry points, moisture zones, and exterior conditions as you always would. The app guides what to photograph." },
              { step: "3″, title: "AI Flags Opportunities", desc: "ProLnk AI identifies issues visible in your photos that match other trades — plumbing, foundation, landscaping, roofing." },
              { step: "4″, title: "Earn Residual Income", desc: "When a referred pro closes a job from your property photo, you get paid. Recurring. Compounding. No extra work." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "28px 0″, borderBottom: i < 3 ? "1px solid #d4cfc7" : "none" }}>
                <div style={{ minWidth: 48, height: 48, borderRadius: "50%", backgroundColor: "#F5E642″, border: "2px solid #0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: "#0A1628", flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: "#0A1628″ }}>{s.title}</h3>
                  <p style={{ color: "#4a5568″, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAFAF9″ }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ backgroundColor: "#fff", border: "2px solid #e8e4dc", borderRadius: 16, padding: 48 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>"</div>
            <p style={{ fontSize: 20, lineHeight: 1.7, color: "#0A1628″, fontStyle: "italic", marginBottom: 24 }}>
              I have 180 quarterly accounts. I was already photographing entry points for my own records. Now those same photos are generating leads for plumbers and foundation guys. I made more from ProLnk last quarter than I spent on supplies.
            </p>
            <div style={{ borderTop: "1px solid #e8e4dc", paddingTop: 24 }}>
              <div style={{ fontWeight: 700, color: "#0A1628″, fontSize: 16 }}>Dena R.</div>
              <div style={{ color: "#718096″, fontSize: 14 }}>Pest Control Owner — Frisco, TX</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", backgroundColor: "#0A1628″, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#FAFAF9″, marginBottom: 16 }}>
            Quarterly Accounts Are Your Goldmine
          </h2>
          <p style={{ color: "#a8bdd4″, fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            Every customer you already have is a recurring income opportunity on ProLnk. Apply now and lock in your territory before another pest pro claims it.
          </p>
          <a href="/apply" style={{ display: "inline-block", backgroundColor: "#F5E642″, color: "#0A1628", padding: "18px 48px", borderRadius: 8, fontWeight: 800, fontSize: 20, textDecoration: "none" }}>
            Apply for Your Territory →
          </a>
          <p style={{ color: "#718096″, fontSize: 14, marginTop: 16 }}>Free to apply. No monthly fee during founding period.</p>
        </div>
      </section>
    </div>
  );
}
