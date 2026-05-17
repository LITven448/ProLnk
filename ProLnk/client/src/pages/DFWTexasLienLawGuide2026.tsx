import { useState } from 'react';

const lienStages = [
  { stage: "Contractor Hired", emoji: "🤝", risk: "Low", action: "Get a written contract with payment schedule. Never pay 100% upfront.", tip: "Include a lien waiver requirement at each payment milestone in the contract." },
  { stage: "Work Begins", emoji: "🔨", risk: "Low", action: "Document start date. Contractor has lien rights from first day of work.", tip: "Texas lien law attaches from the first day labor or materials are furnished." },
  { stage: "Midpoint Payment", emoji: "💳", risk: "Medium", action: "ALWAYS get a partial lien waiver before releasing each progress payment.", tip: "Use Texas-specific lien waiver forms (conditional vs. unconditional). Conditional = waiver upon check clearing." },
  { stage: "Subcontractors Active", emoji: "⚠️", risk: "High", action: "Subcontractors have independent lien rights — even if you paid your GC in full.", tip: "Texas law: if GC doesn't pay subs, subs can lien YOUR property. Get a list of all subs and verify payments." },
  { stage: "Work Complete", emoji: "✅", risk: "High", action: "Do NOT release final payment without final unconditional lien waivers from GC AND all major subs.", tip: "Get waivers from: GC, framing sub, electrical, plumbing, HVAC, roofing — any trade over $2,000." },
  { stage: "Lien Filed", emoji: "🚨", risk: "Critical", action: "You have 30 days after lien is filed to pay, bond around it, or dispute. Consult a Texas construction attorney immediately.", tip: "A filed lien affects your ability to sell or refinance. Act quickly — deadline to file suit on lien is 1 year." },
];

const protections = [
  { title: "10-Day Notice Requirement", description: "Contractors MUST send a written notice before filing a lien. This gives you 10 days to cure any payment dispute before a lien is recorded.", icon: "📬" },
  { title: "Lien Waivers at Each Payment", description: "Require conditional lien waivers before each payment, unconditional at final payment. This is your strongest protection against double-payment risk.", icon: "📝" },
  { title: "Joint Check Agreement", description: "For large projects, pay GC and major subs with a joint check — both must endorse, ensuring subs get paid directly.", icon: "🏦" },
  { title: "Retainage (10%)", description: "Withhold 10% of each payment as retainage until 30 days after completion. Texas Property Code §53.101 governs retainage requirements.", icon: "💰" },
  { title: "Bond Around the Lien", description: "If a lien is filed, you can post a bond (typically 1.5x the lien amount) to clear your title while disputing the lien claim.", icon: "🛡️" },
  { title: "Demand Proof of Sub Payments", description: "Before final payment, request sworn statements from your GC listing all subs and confirming they've been paid.", icon: "📋" },
];

const situations = [
  { situation: "I paid my contractor in full but a subcontractor filed a lien", guide: "This is double-payment risk — the most common Texas homeowner trap. You may need to pay the sub AND sue the GC. Get a Texas construction attorney immediately. Next time: require lien waivers from all subs before final payment." },
  { situation: "A contractor is threatening to file a lien over a disputed bill", guide: "Do not ignore. Texas lien law heavily favors contractors. Respond in writing disputing the amount, document all defects or incomplete work with photos. Consider paying the undisputed portion while formally disputing the rest." },
  { situation: "A lien was filed on my property without prior notice", guide: "If no 10-day notice was sent, the lien may be defective. Texas requires the pre-lien notice. Consult an attorney — a defective lien can be removed by court order relatively quickly." },
  { situation: "I'm selling my house and there's an old contractor lien", guide: "You must clear all liens before closing. Options: pay off the lien, negotiate a release at a discount, or bond around it. Title company will catch it — plan ahead." },
];

export default function DFWTexasLienLawGuide2026() {
  const [activeTab, setActiveTab] = useState("stages");
  const [selectedSituation, setSelectedSituation] = useState("");

  const matched = situations.find(s => s.situation === selectedSituation);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔒</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Texas Mechanic's Lien Law Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Protecting yourself from contractor liens in DFW — Texas lien law is pro-contractor, be prepared</p>
        </div>

        <div style={{ backgroundColor: "#7f1d1d", borderRadius: 10, padding: 14, marginBottom: 24, borderLeft: "4px solid #f87171" }}>
          <div style={{ color: "#fca5a5", fontWeight: 700, fontSize: 13 }}>⚠️ Critical Warning</div>
          <p style={{ color: "#fca5a5", fontSize: 13, margin: "4px 0 0" }}>Texas mechanic's lien law is among the most contractor-friendly in the US. Even if you pay your general contractor in full, subcontractors can file liens against YOUR property if the GC fails to pay them.</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
          {["stages", "protections", "lookup"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, backgroundColor: activeTab === tab ? "#F5E642" : "#1e2d45", color: activeTab === tab ? "#0A1628" : "#94a3b8" }}>
              {tab === "stages" ? "📅 Project Stages" : tab === "protections" ? "🛡️ Protections" : "🔍 Situation Lookup"}
            </button>
          ))}
        </div>

        {activeTab === "stages" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lienStages.map((s, i) => (
              <div key={i} style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 16, borderLeft: `4px solid ${s.risk === "Critical" ? "#f87171" : s.risk === "High" ? "#fb923c" : s.risk === "Medium" ? "#fbbf24" : "#4ade80"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 20 }}>{s.emoji}</span><span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{s.stage}</span></div>
                  <span style={{ padding: "2px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, backgroundColor: s.risk === "Critical" ? "#7f1d1d" : s.risk === "High" ? "#7c2d12" : s.risk === "Medium" ? "#78350f" : "#14532d", color: s.risk === "Critical" ? "#fca5a5" : s.risk === "High" ? "#fdba74" : s.risk === "Medium" ? "#fde68a" : "#86efac" }}>{s.risk} Risk</span>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: 13, margin: "0 0 8px" }}>{s.action}</p>
                <div style={{ backgroundColor: "#0A1628", borderRadius: 6, padding: 8 }}><span style={{ color: "#F5E642", fontSize: 12 }}>💡 {s.tip}</span></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "protections" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {protections.map((p, i) => (
              <div key={i} style={{ backgroundColor: "#1e2d45", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{p.title}</div>
                <p style={{ color: "#cbd5e1", fontSize: 13, margin: 0 }}>{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "lookup" && (
          <div style={{ backgroundColor: "#1e2d45", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#F5E642", marginTop: 0, fontSize: 15 }}>🔍 Find Your Lien Situation</h3>
            <select value={selectedSituation} onChange={e => setSelectedSituation(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #334155", backgroundColor: "#0A1628", color: "#fff", fontSize: 13, marginBottom: 16 }}>
              <option value="">Select your situation...</option>
              {situations.map(s => <option key={s.situation} value={s.situation}>{s.situation}</option>)}
            </select>
            {matched && (
              <div style={{ backgroundColor: "#0A1628", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📋 Guidance</div>
                <p style={{ color: "#cbd5e1", fontSize: 13, margin: 0 }}>{matched.guide}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, color: "#475569", fontSize: 11 }}>ProLnk DFW · Mechanic's Lien Law Guide · 2026</div>
      </div>
    </div>
  );
}
