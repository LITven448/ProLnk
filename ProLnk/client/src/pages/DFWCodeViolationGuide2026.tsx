import { useState } from 'react';

type ViolationInfo = { timeline: string; process: string[]; fines: string };
type ViolationData = Record<string, ViolationInfo>;

const violationData: ViolationData = {
  "Unpermitted Addition": {
    timeline: "30-90 days to cure",
    fines: "$200-$1,000/day after notice period",
    process: [
      "Receive notice of violation from city code enforcement",
      "Hire licensed contractor to evaluate the work",
      "Pull retroactive permit (if city allows) — not all cities do",
      "Schedule all required inspections (structural, electrical, plumbing)",
      "Pass all inspections and pay permit fees + penalties",
      "If work can't be permitted, demolition may be required",
    ],
  },
  "Tall Grass / Weeds": {
    timeline: "7-14 days to cure",
    fines: "$100-$500 + city-hired mow (billed to property)",
    process: [
      "Receive written notice from code enforcement",
      "Mow grass to less than 8 inches (Dallas/FW standard)",
      "Trim weeds along fences, structures, and property lines",
      "Request reinspection or city will re-check automatically",
      "Repeat violations escalate — city can place lien for mowing costs",
    ],
  },
  "Vehicle Storage Violation": {
    timeline: "7-30 days to cure",
    fines: "$200-$500/day after cure period",
    process: [
      "Notice cites specific vehicle (inoperable, unlicensed, or stored outside)",
      "Move vehicle to enclosed garage or off the property",
      "No storage of vehicles on unpaved surfaces in most DFW cities",
      "RVs and boats must comply with setback/screening rules",
      "Confirm removal with code officer or request reinspection",
    ],
  },
  "Fence Violation": {
    timeline: "14-30 days to cure",
    fines: "$100-$300/day after notice period",
    process: [
      "Review violation notice — height, material, or setback issue",
      "Pull fence permit if required (most DFW cities require permits >6ft)",
      "Correct height or setback to city standard (6ft rear/side typical)",
      "Corner lot fences have sight triangle restrictions — check city map",
      "Pass reinspection to close violation",
    ],
  },
  "Derelict Structure": {
    timeline: "30-180 days depending on severity",
    fines: "$500-$2,000/day + demolition cost recovery",
    process: [
      "City issues notice after inspection — structure deemed unsafe",
      "Hire structural engineer to assess feasibility of repair",
      "Submit repair plan to building department within 30 days",
      "Complete all required repairs with permits and inspections",
      "If not repaired, city can demolish and bill property owner",
      "Failure to pay demolition cost = lien on property",
    ],
  },
};

export default function DFWCodeViolationGuide2026() {
  const [violationType, setViolationType] = useState("Unpermitted Addition");

  const info = violationData[violationType];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <span style={{ fontSize: "32px" }}>🚨</span>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#F5E642", marginTop: "8px" }}>DFW Code Violation Guide 2026</h1>
          <p style={{ color: "#94a3b8", marginTop: "8px" }}>DFW cities actively enforce code violations. Unpermitted work, overgrown lots, and derelict structures can result in daily fines and liens. Here is how to cure violations before they escalate.</p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>Violation Type</label>
          <select value={violationType} onChange={e => setViolationType(e.target.value)} style={{ padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff", fontSize: "14px", minWidth: "280px" }}>
            {Object.keys(violationData).map(k => <option key={k}>{k}</option>)}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px", borderLeft: "4px solid #F5E642" }}>
            <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>CURE TIMELINE</p>
            <p style={{ color: "#F5E642", fontWeight: "700", fontSize: "18px" }}>{info.timeline}</p>
          </div>
          <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px", borderLeft: "4px solid #ef4444" }}>
            <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>POTENTIAL FINES</p>
            <p style={{ color: "#ef4444", fontWeight: "700", fontSize: "18px" }}>{info.fines}</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ color: "#F5E642", fontWeight: "700", marginBottom: "16px" }}>Cure Process — {violationType}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {info.process.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#F5E642", color: "#0A1628", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", flexShrink: 0, marginTop: "1px" }}>{i + 1}</div>
                <p style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: "1.6" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { icon: "📋", title: "Most Common in DFW", body: "Unpermitted additions are #1 — sheds, garage conversions, and room additions built without permits." },
            { icon: "🏠", title: "HOA vs City Code", body: "HOA violations and city code violations are separate. You can violate city code even without an HOA." },
            { icon: "⚖️", title: "Appeal Your Violation", body: "Most DFW cities allow violation appeals within 10-15 days. Request a hearing if you believe the notice is in error." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
              <h3 style={{ color: "#F5E642", fontWeight: "700", marginBottom: "6px", fontSize: "14px" }}>{title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.5" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
