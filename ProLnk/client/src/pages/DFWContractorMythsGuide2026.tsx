import { useState } from 'react';

const myths = [
  {
    id: 1,
    myth: "The cheapest bid is the best deal",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "💰",
    truth: "DFW contractor pricing varies widely by license tier, insurance coverage, material quality, and warranty terms. The lowest bid often reflects unlicensed workers, cheap materials, or scope gaps that surface as costly change orders. Get 3 bids and compare scope line by line, not just totals.",
    tip: "Ask every contractor: What is included in your warranty? Who does the actual work — you or subcontractors?",
  },
  {
    id: 2,
    myth: "Permits just slow everything down",
    verdict: "TRUE — BUT THEY PROTECT YOU",
    verdictColor: "#F59E0B",
    icon: "📋",
    truth: "Permits do add 1–3 weeks to most DFW projects. But they trigger municipal inspections that catch code violations before they become your liability. Unpermitted work in DFW can block home sales, void insurance claims, and require costly tear-out when discovered.",
    tip: "Always verify your contractor pulls permits in your city. In DFW, most cities have online permit lookup tools.",
  },
  {
    id: 3,
    myth: "You must pay the full amount upfront",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "🚫",
    truth: "No legitimate DFW contractor should require 100% payment before work begins. Industry standard is 10–30% down, progress payments tied to milestones, and final payment only upon completion and your satisfaction. Upfront-in-full demands are a major red flag.",
    tip: "Never pay more than 1/3 upfront for any project. Structure payments with clear milestones in the written contract.",
  },
  {
    id: 4,
    myth: "Unlicensed is fine if the work looks good",
    verdict: "FALSE",
    verdictColor: "#FF4444″,
    icon: "⚠️",
    truth: "In Texas, hiring unlicensed contractors for plumbing, electrical, HVAC, or structural work means zero recourse through TDLR if work fails. You cannot sue under contractor licensing statutes, your homeowner insurance may deny related claims, and permits are unobtainable without licensed trades.",
    tip: "Verify any contractor at license.tdlr.texas.gov before signing. Takes 30 seconds and protects thousands.",
  },
];

export default function DFWContractorMythsGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔨</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW Contractor Myths Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>Contractor myths that leave DFW homeowners unprotected — and how to hire right.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {myths.map((m) => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ backgroundColor: "#122040″, border: `2px solid ${selected === m.id ? "#F5E642" : "#1E3A5F"}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>"{m.myth}"</p>
                  <span style={{ backgroundColor: m.verdictColor, color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{m.verdict}</span>
                </div>
                <span style={{ color: "#F5E642″, fontSize: 20 }}>{selected === m.id ? "▲" : "▼"}</span>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 16, borderTop: "1px solid #1E3A5F", paddingTop: 16 }}>
                  <p style={{ color: "#CBD5E1″, lineHeight: 1.6, marginBottom: 12 }}>{m.truth}</p>
                  <div style={{ backgroundColor: "#0A1628″, borderLeft: "3px solid #F5E642", padding: "10px 14px", borderRadius: 6 }}>
                    <p style={{ color: "#F5E642″, fontSize: 13, fontWeight: 600 }}>💡 Pro Tip: {m.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, backgroundColor: "#122040″, borderRadius: 12, padding: 24, textAlign: "center" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>✅ Get Pre-Screened DFW Contractors</p>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>ProLnk verifies licenses, insurance, and reviews for every contractor in our Dallas-Fort Worth network.</p>
        </div>
      </div>
    </div>
  );
}
