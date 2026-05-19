import { useState } from 'react';

const matchFactors = [
  { icon: "📍", label: "Service Area", detail: "Contractor must be licensed and active within your ZIP code" },
  { icon: "⭐", label: "Rating Score", detail: "AI-weighted average of recency, volume, and specificity of reviews" },
  { icon: "🔧", label: "Trade Specialization", detail: "HVAC-only contractors score higher for HVAC jobs than generalists" },
  { icon: "⚡", label: "Response Time History", detail: "Average time to accept and contact homeowner in past 90 days" },
  { icon: "📅", label: "Availability Signal", detail: "Contractors who decline too often get lower emergency priority" },
  { icon: "💰", label: "Price Competitiveness", detail: "Quotes benchmarked against DFW market rates for your job type" },
];

const needTypes: Record<string, { priority: string; speed: string; how: string; tip: string }> = {
  "AC out in summer": {
    priority: "🔴 EMERGENCY — Priority Queue",
    speed: "Target: matched within 15 minutes",
    how: "ProLnk AI flags summer AC failures as P1 emergencies. Your request jumps to top of contractor queue. Contractors get SMS + push notification.",
    tip: "Add your home details to ProLnk Vault for faster diagnosis before contractor arrives.",
  },
  "Routine tune-up": {
    priority: "🟢 STANDARD — Competitive Bidding",
    speed: "Target: 2-4 contractors quoted within 2 hours",
    how: "ProLnk sends to 6-8 qualified HVAC contractors. First 3 to quote win the bid pool. You compare and choose.",
    tip: "Schedule tune-ups in February or October — contractors have more availability and you often get better pricing.",
  },
  "New system installation": {
    priority: "🟡 PROJECT — Multi-Contractor Review",
    speed: "Target: 3 detailed quotes within 24 hours",
    how: "ProLnk requests full system assessment quotes. AI screens bids for scope, warranty, and equipment brand. You get a side-by-side comparison.",
    tip: "Ask ProLnk to flag contractors certified on your preferred brand (Carrier, Lennox, Trane, etc.).",
  },
  "Warranty repair": {
    priority: "🟠 SPECIALIZED — Brand-Certified Match",
    speed: "Target: matched to brand-certified contractor within 1 hour",
    how: "ProLnk filters to contractors with active manufacturer certifications for your unit brand. Warranty work requires certified tech.",
    tip: "Upload your equipment details to ProLnk Vault — model number speeds the match by 40%.",
  },
  "Second opinion": {
    priority: "🔵 COMPARISON — Independent Contractor",
    speed: "Target: 1-2 independent contractors quoted same day",
    how: "ProLnk intentionally matches you with contractors who did NOT bid on the original job. Full independence guaranteed.",
    tip: "Share the original quote with ProLnk — AI will flag if it is above or below DFW market rates.",
  },
};

export default function DFWHVACProLnkMatchGuide() {
  const [need, setNeed] = useState("");
  const [result, setResult] = useState<null | { priority: string; speed: string; how: string; tip: string }>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: 14, color: "#F5E642", marginBottom: 8 }}>🤝 PROLNK HVAC MATCHING — DFW</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>How ProLnk Matches Your HVAC Job</h1>
        <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 40 }}>
          ProLnk AI scores every DFW HVAC contractor on 6 factors before making your match. Emergency jobs get different handling than routine work.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>🧠 AI Scoring Factors</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40 }}>
          {matchFactors.map((f) => (
            <div key={f.label} style={{ background: "#0F1E35", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#F5E642", marginBottom: 4 }}>{f.label}</div>
              <div style={{ color: "#94A3B8", fontSize: 13 }}>{f.detail}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>🎯 How ProLnk Handles Your Need</h2>
        <div style={{ background: "#0F1E35", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: "block", color: "#94A3B8", fontSize: 14, marginBottom: 8 }}>What do you need?</label>
          <select value={need} onChange={(e) => { setNeed(e.target.value); setResult(needTypes[e.target.value] || null); }}
            style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15 }}>
            <option value="">Select your HVAC need</option>
            {Object.keys(needTypes).map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#0F1E35", borderRadius: 10, padding: 18, borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{result.priority}</div>
              <div style={{ color: "#F5E642", fontSize: 14 }}>{result.speed}</div>
            </div>
            <div style={{ background: "#0F1E35", borderRadius: 10, padding: 18 }}>
              <div style={{ color: "#94A3B8", fontSize: 12, marginBottom: 6 }}>HOW PROLNK HANDLES THIS</div>
              <div style={{ fontSize: 15 }}>{result.how}</div>
            </div>
            <div style={{ background: "#0F2A1A", border: "1px solid #22C55E", borderRadius: 10, padding: 18 }}>
              <div style={{ color: "#22C55E", fontSize: 12, marginBottom: 6 }}>💡 PRO TIP</div>
              <div style={{ fontSize: 14 }}>{result.tip}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
