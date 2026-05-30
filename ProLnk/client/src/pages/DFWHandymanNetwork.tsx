import { useState } from "react";

const incomeRows = [
  { scenario: "Standard handyman job", jobValue: "$200", fee: "$20", commission: "$14.40", crossLeads: "3.1 avg", totalPotential: "$90+" },
  { scenario: "Bathroom refresh + fixture replace", jobValue: "$650", fee: "$65", commission: "$46.80", crossLeads: "4.2 avg", totalPotential: "$180+" },
  { scenario: "Honey-do list (full day)", jobValue: "$1,200", fee: "$120", commission: "$86.40", crossLeads: "5.8 avg", totalPotential: "$340+" },
];

const detections = [
  { icon: "🪟", what: "Aging caulk around windows", leads: "Window replacement lead" },
  { icon: "💧", what: "Dripping faucet or corroded shutoff", leads: "Plumbing inspection lead" },
  { icon: "🏠", what: "Attic access during repair", leads: "Insulation or HVAC lead" },
  { icon: "⚡", what: "Tripped breaker or old panel", leads: "Electrical upgrade lead" },
  { icon: "🌿", what: "Efflorescence on foundation wall", leads: "Waterproofing lead" },
  { icon: "🔥", what: "HVAC filter clogged or old", leads: "HVAC service or replace lead" },
];

const faqs = [
  { q: "Do I need to be a licensed contractor to join?", a: "Handymen who hold a Texas handyman registration (jobs under $10K) qualify. For jobs above that threshold, a GC or trade license is required. We verify your registration before you go live." },
  { q: "How do I submit a photo lead?", a: "After each job, open the ProLnk app, tap 'Add Lead Photo', snap the issue, and tag the trade category. Our AI analyzes the photo and routes the lead to the appropriate licensed pro within minutes." },
  { q: "When do I get paid my commission?", a: "Commissions are calculated on the 1st and 15th of each month and paid via ACH within 3 business days. You can track every pending commission in your earnings dashboard." },
  { q: "What if the homeowner doesn't book the referred pro?", a: "You earn your commission only when the referred job is completed and payment collected. No completed job, no commission — but there's no cap on how many leads you can submit per visit." },
];

export default function DFWHandymanNetwork() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FAFAF9", color: "#111" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#1E3A5F 0%,#0F2340 100%)", color: "#fff", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={{ background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>PROLNK PARTNER NETWORK · DFW</span>
          <h1 style={{ fontSize: "clamp(26px,4.5vw,46px)", fontWeight: 800, margin: "20px 0 18px", lineHeight: 1.15 }}>
            DFW Handymen: You See Everything — Now Get Paid For It
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, maxWidth: 640, margin: "0 auto 32px" }}>
            Every handyman visit is a whole-home tour. Aging caulk, dripping faucets, dark attic corners — you see issues other trades never reach. ProLnk pays you to report them.
          </p>
          <a href="/pro/apply" style={{ background: "#F59E0B", color: "#111", fontWeight: 700, padding: "16px 36px", borderRadius: 8, textDecoration: "none", fontSize: 16, display: "inline-block" }}>
            Apply as a ProLnk Partner
          </a>
        </div>
      </section>

      {/* The Math */}
      <section style={{ padding: "64px 24px", maxWidth: 920, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>Your Income, Multiplied</h2>
        <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 36 }}>Handymen have the <strong>best lead-per-visit ratio</strong> of any trade on ProLnk — averaging 3.1 additional leads detected per job.</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#1E3A5F", color: "#fff" }}>
                {["Scenario", "Job Value", "ProLnk Fee", "Your Commission", "Cross-Trade Leads", "Total Potential"].map(h => (
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
                  <td style={{ padding: "12px 16px" }}>{r.crossLeads}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1E3A5F" }}>{r.totalPotential}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 10, textAlign: "center" }}>Commission based on 60% Pro keep rate. Cross-trade potential assumes avg 3.1 leads at $20–$40 commission each.</p>
      </section>

      {/* What You Can Detect */}
      <section style={{ background: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 10 }}>What You Already See On Every Visit</h2>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 36 }}>Snap a photo. Tag the trade. Collect the commission when the pro closes the job.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {detections.map((d) => (
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
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>How the Partner Program Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          {[
            { step: "1", title: "Apply & Get Verified", desc: "Submit your Texas handyman registration. We verify and activate your account within 24 hours." },
            { step: "2", title: "Do Your Job", desc: "Complete the handyman work you were hired for. Nothing changes about how you work." },
            { step: "3", title: "Snap & Tag", desc: "Use the ProLnk app to photo-report adjacent issues. Takes under 60 seconds per lead." },
            { step: "4", title: "Get Paid", desc: "When the referred pro completes the job, your commission hits your dashboard. Paid bi-monthly via ACH." },
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
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Handyman Partner FAQ</h2>
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
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>DFW Handymen: Your Eyes Are Your Income</h2>
        <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>Apply now — early partners lock in the highest commission tiers and first access to DFW homeowner leads.</p>
        <a href="/pro/apply" style={{ background: "#F59E0B", color: "#111", fontWeight: 700, padding: "16px 40px", borderRadius: 8, textDecoration: "none", fontSize: 17, display: "inline-block" }}>
          Apply as a ProLnk Partner
        </a>
      </section>
    </div>
  );
}
