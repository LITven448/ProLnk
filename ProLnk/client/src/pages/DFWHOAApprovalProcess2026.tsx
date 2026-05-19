import { useState } from 'react';

export default function DFWHOAApprovalProcess2026() {
  const [project, setProject] = useState<string | null>(null);

  const projects = [
    {
      type: "Paint Color",
      icon: "🎨",
      approval: "Required",
      timeline: "7–21 days",
      checklist: [
        "Download approved color palette from HOA website or office",
        "Select colors from approved list only (typically 20-50 options)",
        "Submit Application for Architectural Change (ARC form)",
        "Include paint chip samples or manufacturer codes",
        "Wait for written approval before purchasing paint",
        "If denied, ask for the specific rule that was violated",
        "Resubmit with an approved color — approval is not discretionary"
      ]
    },
    {
      type: "Room Addition",
      icon: "🏗️",
      approval: "Required",
      timeline: "30–60 days",
      checklist: [
        "Submit architectural drawings — full plans typically required",
        "Include materials list matching HOA-approved materials",
        "Get HOA approval BEFORE applying for city permit",
        "Ensure addition matches existing roofline and materials",
        "HOA approval and city permit are both required — separate processes",
        "Expect design review committee inspection after completion",
        "Document everything — HOA approval in writing before breaking ground"
      ]
    },
    {
      type: "Pool Installation",
      icon: "🏊",
      approval: "Required",
      timeline: "30–60 days",
      checklist: [
        "Check CC&Rs for pool size, setback, and fence requirements",
        "Submit pool design with dimensions and equipment placement",
        "Fencing specs required — most DFW HOAs require 4ft min",
        "Equipment screening — pumps must be screened from view",
        "Landscaping plan may be required around pool area",
        "Get HOA approval, then City of [your city] permit",
        "Pool contractor must be licensed — HOA may require proof"
      ]
    },
    {
      type: "Solar Panels",
      icon: "☀️",
      approval: "Limited — TX Law Protects You",
      timeline: "10–45 days",
      checklist: [
        "Texas Property Code 202.010 limits HOA solar restrictions",
        "HOA cannot prohibit solar panels — can only regulate placement",
        "Submit panel layout showing roof placement",
        "HOA may require panels not visible from street (rear placement)",
        "HOA cannot add requirements that increase cost over 10%",
        "If HOA denies improperly, cite TX Property Code 202.010″,
        "Consult a TX HOA attorney if denial seems improper"
      ]
    },
    {
      type: "Fence",
      icon: "🔒",
      approval: "Required",
      timeline: "14–30 days",
      checklist: [
        "Review CC&Rs for approved fence materials (wood, iron, vinyl)",
        "Check height restrictions — typically 6ft max in DFW HOAs",
        "Submit fence survey showing placement and setbacks",
        "Front yard fences often prohibited — check your CC&Rs",
        "Gate requirements — some HOAs require specific hardware",
        "City permit required after HOA approval in most DFW cities",
        "Stain/paint color may also require separate approval"
      ]
    },
    {
      type: "Basketball Goal",
      icon: "🏀",
      approval: "Often Restricted",
      timeline: "7–14 days",
      checklist: [
        "Front yard placement often prohibited in DFW HOAs",
        "In-ground vs. portable — policies differ significantly",
        "Some HOAs prohibit all basketball goals permanently",
        "If allowed, may require approval for permanent installation",
        "Check for hours of use restrictions (noise ordinance overlap)",
        "Backyard or driveway placement varies by community",
        "If prohibited, check if you can request a variance in writing"
      ]
    }
  ];

  const appealSteps = [
    { step: "1″, text: "Request the specific CC&R or rule section that justifies the denial" },
    { step: "2″, text: "Submit a written appeal to the full HOA board within 30 days" },
    { step: "3″, text: "Request to speak at the next board meeting — Texas Open Meetings Act applies" },
    { step: "4″, text: "Bring photos of similar approved projects in your community" },
    { step: "5″, text: "If still denied, consult a Texas HOA attorney — review may be warranted" }
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>✅</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW HOA Architectural Approval Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Get it approved before you build — avoid costly fines and forced removal</p>
        </div>

        <div style={{ background: "#1e2d45″, borderRadius: 8, padding: 16, marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center" }}>
          <div><div style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700 }}>30–60 days</div><div style={{ color: "#94a3b8", fontSize: 12 }}>Typical review timeline</div></div>
          <div><div style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700 }}>Written only</div><div style={{ color: "#94a3b8", fontSize: 12 }}>Always get approval in writing</div></div>
          <div><div style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700 }}>Before permit</div><div style={{ color: "#94a3b8", fontSize: 12 }}>HOA approval first, then city</div></div>
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: 16 }}>Project Type → Approval Checklist</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
          {projects.map(p => (
            <button key={p.type} onClick={() => setProject(project === p.type ? null : p.type)}
              style={{ background: project === p.type ? "#F5E642″ : "#1e2d45", border: "none", borderRadius: 8, padding: 14, cursor: "pointer", color: project === p.type ? "#0A1628" : "#fff", textAlign: "center" }}>
              <div style={{ fontSize: 26 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{p.type}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{p.timeline}</div>
            </button>
          ))}
        </div>

        {project && (() => {
          const p = projects.find(x => x.type === project)!;
          return (
            <div style={{ background: "#1e2d45″, borderRadius: 10, padding: 24, marginBottom: 28, borderLeft: "4px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642″, margin: "0 0 4px" }}>{p.icon} {p.type} — Approval Checklist</h3>
              <p style={{ color: "#94a3b8″, marginBottom: 16, fontSize: 13 }}>Status: {p.approval} • Timeline: {p.timeline}</p>
              <ol style={{ paddingLeft: 20, margin: 0 }}>
                {p.checklist.map((item, i) => <li key={i} style={{ color: "#cbd5e1″, marginBottom: 7 }}>{item}</li>)}
              </ol>
            </div>
          );
        })()}

        <h2 style={{ color: "#F5E642″, marginBottom: 16 }}>Appeal Process If Denied</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {appealSteps.map((s, i) => (
            <div key={i} style={{ background: "#1e2d45″, borderRadius: 8, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ background: "#F5E642″, color: "#0A1628", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0, fontSize: 13 }}>{s.step}</span>
              <span style={{ color: "#cbd5e1″, fontSize: 14 }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
