import { useState } from 'react';

const situations = [
  {
    id: "outdoor-only",
    label: "Replacing outdoor condenser only",
    risk: "High",
    detail: "Mismatched efficiency: your new 16 SEER2 condenser is throttled by an old air handler to 12 SEER2 effective output. You pay for high efficiency but get mid-grade performance. Estimated waste: 15-25% on every cooling cycle.",
    rec: "Replace both units. If budget is tight, choose a matched 14 SEER2 system rather than mismatching a high-efficiency condenser."
  },
  {
    id: "indoor-only",
    label: "Replacing indoor air handler only",
    risk: "Medium",
    detail: "Air handler age, blower motor speed, and coil sizing must align with the condenser. Mismatched coil sizes cause refrigerant flooding or starving. In DFW summer temps, this causes compressor failure within 2-5 years.",
    rec: "Confirm AHRI certification match with existing condenser. If condenser is 8+ years old, full system replacement is more cost-effective."
  },
  {
    id: "full-system",
    label: "Full system replacement",
    risk: "Low",
    detail: "Matched systems qualify for AHRI certification, unlocking manufacturer rebates ($150-500 in DFW), Oncor rebates ($200-350), and maximum manufacturer warranty (10 years vs 5 for mismatched).",
    rec: "Best long-term value. Request AHRI certificate from contractor as proof of matched installation."
  },
  {
    id: "different-brands",
    label: "Mixing brands (e.g., Carrier + Lennox)",
    risk: "Very High",
    detail: "Proprietary communicating controls (Carrier Infinity, Lennox iComfort, Trane ComfortLink) will NOT communicate across brands. DFW contractors may wire them as non-communicating, losing variable speed efficiency — often a 30% efficiency loss.",
    rec: "Stay same-brand for communicating systems. Standard single-stage systems can mix brands but lose all smart features and warranty protections."
  },
];

export default function DFWHVACIndoorOutdoorMatch2026() {
  const [selected, setSelected] = useState("");
  const [detail, setDetail] = useState<{risk:string;detail:string;rec:string}|null>(null);

  function showGuide() {
    const s = situations.find(x=>x.id===selected);
    if (s) setDetail(s); else setDetail(null);
  }

  const riskColor = (r: string) => r==="Low"?"#4ade80″:r==="Medium"?"#fbbf24":r==="High"?"#f97316":"#ef4444";

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>❄️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0" }}>DFW Matched HVAC System Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>Why mismatched systems are DFW's #1 HVAC mistake — and how to avoid it</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "0.75rem" }}>🔗 What AHRI Matching Means</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7 }}>AHRI (Air-Conditioning, Heating, and Refrigeration Institute) certifies specific indoor/outdoor unit combinations as matched systems. Only certified matched pairs achieve the rated SEER2 efficiency. In DFW where A/C runs 6-8 months per year, a 15-30% efficiency gap costs $300-800/year in wasted electricity.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "📊", label: "Efficiency loss from mismatch", value: "15-30%" },
            { icon: "💰", label: "Annual waste on DFW bill", value: "$300-800″ },
            { icon: "🔧", label: "Avg early compressor failure", value: "2-5 yrs" },
            { icon: "📋", label: "Warranty reduction (mismatched)", value: "5 yrs vs 10″ },
          ].map((stat, i) => (
            <div key={i} style={{ background: "#0F2040″, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem" }}>{stat.icon}</div>
              <div style={{ color: "#F5E642″, fontSize: "1.4rem", fontWeight: 800 }}>{stat.value}</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🏢 DFW Brand Matching Quick Reference</h2>
          {[
            { brand: "Carrier/Bryant", system: "Infinity Series", note: "Fully communicating — must match Carrier air handler" },
            { brand: "Lennox", system: "iComfort S30″, note: "Proprietary protocol — Lennox-to-Lennox only for smart features" },
            { brand: "Trane/American Standard", system: "ComfortLink II", note: "Trane communicating coils required for variable speed" },
            { brand: "Rheem/Ruud", system: "EcoNet", note: "More flexible — some cross-compatibility with Ruud line" },
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0″, borderBottom: i<3?"1px solid #1e3a5f":"none", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <div style={{ color: "#e2e8f0″, fontWeight: 600 }}>{b.brand}</div>
                <div style={{ color: "#64748b", fontSize: "0.82rem" }}>{b.note}</div>
              </div>
              <div style={{ background: "#1e3a5f", color: "#F5E642″, padding: "0.25rem 0.6rem", borderRadius: 6, fontSize: "0.8rem" }}>{b.system}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🧮 My Replacement Situation Guide</h2>
          <select value={selected} onChange={e=>setSelected(e.target.value)} style={{ background: "#0A1628″, color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", width: "100%", marginBottom: "0.75rem" }}>
            <option value="">Select your replacement situation</option>
            {situations.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <button onClick={showGuide} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.7rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>Show Matched System Guide →</button>
          {detail && (
            <div style={{ marginTop: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ color: riskColor(detail.risk), fontWeight: 700 }}>● Risk: {detail.risk}</span>
              </div>
              <p style={{ color: "#cbd5e1″, lineHeight: 1.6, marginBottom: "0.75rem" }}>{detail.detail}</p>
              <p style={{ color: "#4ade80″, lineHeight: 1.6 }}>✅ Recommendation: {detail.rec}</p>
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem" }}>🔗</div>
          <p style={{ color: "#0A1628″, fontWeight: 600, margin: "0.5rem 0" }}>Connect with DFW HVAC pros who install certified matched systems</p>
          <div style={{ color: "#0A1628″, fontWeight: 800 }}>prolnk.io — DFW Verified HVAC Contractors</div>
        </div>
      </div>
    </div>
  );
}
