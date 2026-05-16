import { useState } from 'react';

export default function TrustyProForHomeInspectors() {
  const [inspectionsPerMonth, setInspectionsPerMonth] = useState(15);

  const getTimeSaved = (count: number) => Math.round(count * 1.8);
  const getRevenue = (count: number) => (count * 45).toLocaleString();

  const features = [
    { icon: "⚡", title: "Faster Documentation", desc: "AI scan captures and categorizes findings as you walk — cut report writing time by up to 60%." },
    { icon: "📋", title: "Instant Report Generation", desc: "Structured condition report generated on-device. Ready to send before you leave the property." },
    { icon: "📤", title: "Digital Delivery", desc: "Send buyer and agent reports directly from TrustyPro — no printing, no email attachment hunting." },
    { icon: "🤝", title: "Supplement Traditional Inspection", desc: "TrustyPro AI augments your expertise — catches visual patterns across thousands of prior inspections." },
    { icon: "🔗", title: "ProLnk Contractor Referrals", desc: "Earn referral credits when your flagged items connect homeowners to licensed ProLnk contractors." },
    { icon: "📊", title: "Portfolio of Inspections", desc: "Every inspection stored and searchable — recall any property condition report in seconds." },
  ];

  const workflow = [
    { step: "Walk the property", detail: "Scan room by room with TrustyPro open" },
    { step: "AI tags findings", detail: "Damage, wear, and risk zones auto-categorized" },
    { step: "You review and annotate", detail: "Add your professional notes in context" },
    { step: "Report generated", detail: "Formatted, branded, ready to deliver" },
    { step: "Digital delivery", detail: "Buyer, seller, agent — all in one tap" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg,#0A1628,#112240)", padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642", margin: "12px 0 8px" }}>TrustyPro for Home Inspectors</h1>
        <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 560, margin: "0 auto" }}>
          Supplement your expertise with AI-assisted documentation. More inspections. Less paperwork.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 40 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: "#112240", borderRadius: 12, padding: "20px 18px", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 4, fontSize: 14 }}>{f.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: "32px 24px", border: "1px solid #F5E642", marginBottom: 40 }}>
          <h2 style={{ color: "#F5E642", textAlign: "center", marginTop: 0, marginBottom: 8 }}>Efficiency Gain Calculator</h2>
          <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: 24, fontSize: 14 }}>How many inspections do you complete per month?</p>
          <div style={{ textAlign: "center" }}>
            <input type="range" min={5} max={60} value={inspectionsPerMonth} onChange={e => setInspectionsPerMonth(Number(e.target.value))}
              style={{ width: "100%", maxWidth: 400, accentColor: "#F5E642" }} />
            <div style={{ color: "#F5E642", fontSize: 28, fontWeight: 800, margin: "12px 0 16px" }}>{inspectionsPerMonth} inspections / month</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 360, margin: "0 auto" }}>
              <div style={{ background: "#0A1628", borderRadius: 10, padding: "16px" }}>
                <div style={{ color: "#F5E642", fontSize: 28, fontWeight: 900 }}>{getTimeSaved(inspectionsPerMonth)}h</div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>hours saved per month</div>
              </div>
              <div style={{ background: "#0A1628", borderRadius: 10, padding: "16px" }}>
                <div style={{ color: "#F5E642", fontSize: 28, fontWeight: 900 }}>${getRevenue(inspectionsPerMonth)}</div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>est. referral credits/mo</div>
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ color: "#F5E642", textAlign: "center", marginBottom: 20 }}>Your New Workflow</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          {workflow.map((w, i) => (
            <div key={i} style={{ background: "#112240", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, border: "1px solid #1e3a5f" }}>
              <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{w.step}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{w.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 24 }}>📝</div>
          <div style={{ fontWeight: 800, color: "#0A1628", fontSize: 20, margin: "8px 0 4px" }}>Join the Inspector Early Access Program</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Free during DFW beta. Your license, your expertise — TrustyPro amplifies it.</div>
        </div>
      </div>
    </div>
  );
}
