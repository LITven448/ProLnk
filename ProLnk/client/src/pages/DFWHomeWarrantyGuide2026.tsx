import { useState } from 'react';

type CompareItem = { item: string; warranty: string; prolnk: string; verdict: string };

const comparisons: Record<string, CompareItem[]> = {
  HVAC: [
    { item: "New unit install repair", warranty: "Builder: covered Y1. Home warranty: covered (usually)", prolnk: "ProLnk: faster, often cheaper", verdict: "Use warranty first" },
    { item: "Refrigerant leak", warranty: "Home warranty: often excluded — check fine print", prolnk: "ProLnk: $150–$350 + recharge", verdict: "Call ProLnk" },
    { item: "Freon recharge only", warranty: "Home warranty: typically excluded", prolnk: "ProLnk: $200–$400″, verdict: "Call ProLnk" },
  ],
  Plumbing: [
    { item: "Water heater replacement", warranty: "Builder Y1: covered. Home warranty: covered (usually)", prolnk: "ProLnk: $800–$1,400 installed", verdict: "Use warranty first" },
    { item: "Slab leak repair", warranty: "Builder: structural coverage Y10. Home warranty: often excluded", prolnk: "ProLnk: $1,500–$4,000″, verdict: "Check builder warranty, else ProLnk" },
    { item: "Drain clearing", warranty: "Home warranty: usually excluded", prolnk: "ProLnk: $120–$250″, verdict: "Call ProLnk" },
  ],
  Appliances: [
    { item: "Dishwasher repair", warranty: "Manufacturer: Y1. Home warranty: usually covered", prolnk: "ProLnk: $120–$300″, verdict: "Use warranty first" },
    { item: "Refrigerator repair", warranty: "Manufacturer: Y1. Home warranty: often covered", prolnk: "ProLnk: $150–$400″, verdict: "Use warranty first" },
    { item: "Garbage disposal", warranty: "Home warranty: usually excluded or low-cap", prolnk: "ProLnk: $150–$300 installed", verdict: "Call ProLnk" },
  ],
};

const warrantyFacts = [
  { icon: "🏗️", label: "Builder 1/2/10 Coverage", detail: "Year 1: workmanship and materials. Year 2: mechanical systems. Years 3-10: structural defects only." },
  { icon: "📋", label: "Home Warranty Plans", detail: "$500–$700/year. Covers repairs/replacement of covered systems and appliances — but exclusions are long." },
  { icon: "⚠️", label: "What Home Warranties Don't Cover", detail: "Pre-existing conditions, improper installation, cosmetic issues, code upgrades, and most slab leaks." },
  { icon: "📞", label: "Filing a Claim", detail: "Call warranty company → wait 24–72 hrs for contractor assignment → contractor assesses → approval (3–10 days) → repair scheduled." },
  { icon: "💰", label: "Service Call Fees", detail: "Most home warranties charge $75–$125 per service call, even if the repair is covered." },
];

export default function DFWHomeWarrantyGuide2026() {
  const [category, setCategory] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🛡️ PROLNK GUIDE — DFW HOME WARRANTIES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Home Warranty Guide 2026</h1>
        <p style={{ color: "#aab", marginBottom: 32 }}>Builder warranties vs home warranty plans — what is actually covered, how to file a claim, and when to skip it and call ProLnk.</p>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>📋 Warranty Basics</h2>
        <div style={{ marginBottom: 40 }}>
          {warrantyFacts.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0″, borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 22, minWidth: 36 }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
                <div style={{ color: "#aab", fontSize: 13 }}>{f.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>🔍 Appliance / System — Warranty vs ProLnk Cost Comparison</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          {Object.keys(comparisons).map(cat => (
            <button key={cat} onClick={() => setCategory(category === cat ? "" : cat)}
              style={{ background: category === cat ? "#F5E642″ : "#1a2e50", color: category === cat ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{cat}</button>
          ))}
        </div>
        {category && (
          <div style={{ marginBottom: 32 }}>
            {comparisons[category].map((row, i) => (
              <div key={i} style={{ background: "#111d35″, border: "1px solid #1e3a5f", borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>🔧 {row.item}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13, marginBottom: 10 }}>
                  <div style={{ background: "#0d1f3c", borderRadius: 8, padding: 10 }}><div style={{ color: "#aab", marginBottom: 4 }}>🛡️ Warranty Says:</div>{row.warranty}</div>
                  <div style={{ background: "#0d1f3c", borderRadius: 8, padding: 10 }}><div style={{ color: "#aab", marginBottom: 4 }}>🔨 ProLnk Cost:</div>{row.prolnk}</div>
                </div>
                <div style={{ background: row.verdict.includes("ProLnk") ? "#0d2a1a" : "#1a2e10″, border: `1px solid ${row.verdict.includes("ProLnk") ? "#7ef5a8" : "#F5E642"}`, borderRadius: 8, padding: 10, fontSize: 13, color: row.verdict.includes("ProLnk") ? "#7ef5a8" : "#F5E642" }}>
                  ✅ Verdict: {row.verdict}
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>⚡ When to Skip Warranty and Call ProLnk Directly</h2>
        <div style={{ background: "#111d35″, borderRadius: 10, padding: 20, marginBottom: 32 }}>
          {["Repair is urgent and you cannot wait 3–10 days for warranty approval",
            "Service call fee plus deductible exceeds the repair cost",
            "Issue is specifically excluded from your warranty",
            "Warranty company's assigned contractor has bad reviews",
            "You want to choose your own vetted pro, not a random dispatch",
            "Repair cost is under $300 — warranty overhead not worth it"
          ].map((item, i) => (
            <div key={i} style={{ color: "#dde", fontSize: 14, padding: "7px 0″, borderBottom: "1px solid #1e3a5f" }}>⚡ {item}</div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", border: "1px solid #F5E642″, borderRadius: 10, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔨 Skip the Wait — Get a ProLnk Pro Today</div>
          <div style={{ color: "#aab", marginBottom: 16 }}>When warranty is slow, excluded, or not worth it — ProLnk connects you with verified DFW pros, fast.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Connect with a Pro →</button>
        </div>
      </div>
    </div>
  );
}
