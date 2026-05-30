import { useState } from "react";

const incomeRows = [
  { scenario: "Single window replacement", jobValue: "$800", fee: "$80", commission: "$57.60", adjacent: "2.1 avg", totalPotential: "$120+" },
  { scenario: "Full window replacement (10 windows)", jobValue: "$4,500", fee: "$450", commission: "$324", adjacent: "2.8 avg", totalPotential: "$440+" },
  { scenario: "Summer EV window film install", jobValue: "$1,200", fee: "$120", commission: "$86.40", adjacent: "HVAC lead near-certain", totalPotential: "$200+" },
];

const findings = [
  { icon: "💧", what: "Broken window seal (fogging)", leads: "Water damage inspection behind wall" },
  { icon: "🏗️", what: "Framing rot at window rough opening", leads: "Structural carpenter lead" },
  { icon: "🌡️", what: "No low-E coating on south-facing glass", leads: "HVAC efficiency upgrade lead" },
  { icon: "🔧", what: "Missing or cracked flashing", leads: "Roofing/waterproofing lead" },
  { icon: "🪲", what: "Insect damage in window sill", leads: "Pest control + wood repair lead" },
  { icon: "❄️", what: "Air gaps around new installation", leads: "Insulation and weatherization lead" },
];

const faqs = [
  { q: "Why do DFW windows fail faster than national averages?", a: "DFW summers average UV index 11+ for 90+ days — the same UV load that California sees in 12–14 years hits DFW in 5–7. Most manufacturer seal warranties don't account for Texas UV exposure rates, voiding coverage." },
  { q: "What commission rate do window pros earn?", a: "Window pros earn 60% of their own job revenue and 7.2% commission on every adjacent trade lead that converts to a completed job. On a $4,500 window job with 2.8 average adjacent leads, total commission opportunity exceeds $440." },
  { q: "Do I need to be a licensed window contractor?", a: "Window replacement in Texas requires a general contractor license or specialty contractor registration depending on job scope. We verify licensing before activation. Window film installation has separate registration requirements." },
  { q: "How does the HVAC lead from window film installs work?", a: "When you install solar or EV film, you're implicitly confirming the homeowner cares about energy efficiency. Our AI flags these installs and automatically generates a warm HVAC efficiency lead for the homeowner within 24 hours of your job close." },
];

export default function DFWWindowNetwork() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FAFAF9", color: "#111" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#1E3A5F 0%,#0F2340 100%)", color: "#fff", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <span style={{ background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>PROLNK PARTNER NETWORK · DFW</span>
          <h1 style={{ fontSize: "clamp(24px,4.5vw,44px)", fontWeight: 800, margin: "20px 0 18px", lineHeight: 1.15 }}>
            DFW Window Pros: Texas UV Is Destroying Windows — And Generating Your Next Lead
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, maxWidth: 640, margin: "0 auto 32px" }}>
            DFW's UV index 11+ summers degrade window seals in 5–7 years — and every replacement exposes what's hiding behind the glass. Each window job photos average 2.4 adjacent opportunities worth real commission.
          </p>
          <a href="/pro/apply" style={{ background: "#F59E0B", color: "#111", fontWeight: 700, padding: "16px 36px", borderRadius: 8, textDecoration: "none", fontSize: 16, display: "inline-block" }}>
            Apply as a ProLnk Partner
          </a>
        </div>
      </section>

      {/* UV Context Banner */}
      <section style={{ background: "#FEF3C7", borderTop: "3px solid #F59E0B", padding: "28px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", textAlign: "center" }}>
          {[
            { stat: "UV 11+", label: "DFW summer UV index (90+ days/yr)" },
            { stat: "5–7 yrs", label: "DFW window seal lifespan vs 12–14 national" },
            { stat: "2.4 avg", label: "Adjacent leads detected per window job" },
            { stat: "$324", label: "Commission on full window replacement" },
          ].map((item) => (
            <div key={item.stat}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#92400E" }}>{item.stat}</div>
              <div style={{ fontSize: 12, color: "#78350F", marginTop: 4, maxWidth: 160 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Income Table */}
      <section style={{ padding: "64px 24px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 10 }}>Your Real Earning Potential</h2>
        <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 36 }}>Window pros consistently rank in the <strong>top 3 trades</strong> for cross-job commission on ProLnk.</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#1E3A5F", color: "#fff" }}>
                {["Scenario", "Job Value", "ProLnk Fee", "Your Commission", "Adjacent Leads", "Total Potential"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incomeRows.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F5F5F4" }}>
                  <td style={{ padding: "12px 16px" }}>{r.scenario}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>{r.jobValue}</td>
                  <td style={{ padding: "12px 16px", color: "#6B7280" }}>{r.fee}</td>
                  <td style={{ padding: "12px 16px", color: "#15803D", fontWeight: 700 }}>{r.commission}</td>
                  <td style={{ padding: "12px 16px" }}>{r.adjacent}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1E3A5F" }}>{r.totalPotential}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 10, textAlign: "center" }}>Commission = 7.2% of adjacent job value. Adjacent potential based on avg 2.4 leads × $25–$50 commission per converted lead.</p>
      </section>

      {/* What You Find */}
      <section style={{ background: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 10 }}>What Every Window Removal Reveals</h2>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 36 }}>The moment you pull a window, you see what's been hidden for years. ProLnk pays you to document it.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {findings.map((d) => (
              <div key={d.what} style={{ background: "#F5F5F4", borderRadius: 12, padding: "22px 20px", borderLeft: "4px solid #F59E0B" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{d.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{d.what}</div>
                <div style={{ color: "#15803D", fontSize: 13, fontWeight: 600 }}>→ {d.leads}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>The ProLnk Window Partner Workflow</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          {[
            { step: "1", title: "Apply & License Verify", desc: "Submit your contractor license. We verify and activate your ProLnk partner account within 24 hours." },
            { step: "2", title: "Complete the Window Job", desc: "Do your work exactly as you normally would. Nothing changes about your process or timeline." },
            { step: "3", title: "Photo What You Find", desc: "Before you close up the wall, snap photos of any adjacent issues with the ProLnk app. 60 seconds per lead." },
            { step: "4", title: "Commission on Completion", desc: "When the referred pro completes their job, your commission is calculated and paid bi-monthly via ACH." },
          ].map((s) => (
            <div key={s.step} style={{ background: "#F5F5F4", borderRadius: 14, padding: "24px 20px", borderTop: "3px solid #1E3A5F" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1E3A5F", color: "#fff", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>{s.step}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.title}</h3>
              <p style={{ color: "#4B5563", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Window Pro Partner FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "#F5F5F4", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "18px 20px", background: "none", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q}<span style={{ color: "#1E3A5F" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 20px 18px", color: "#4B5563", fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1E3A5F", color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Texas UV Is Your Business — Make It Pay Twice</h2>
        <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 32, maxWidth: 540, margin: "0 auto 32px" }}>Apply now. Early DFW window partners get priority homeowner lead access and locked-in top commission tiers.</p>
        <a href="/pro/apply" style={{ background: "#F59E0B", color: "#111", fontWeight: 700, padding: "16px 40px", borderRadius: 8, textDecoration: "none", fontSize: 17, display: "inline-block" }}>
          Apply as a ProLnk Partner
        </a>
      </section>
    </div>
  );
}
