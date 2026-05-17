import { useState } from 'react';

const ageGroups = [
  { range: "Pre-1970", pipe: "Cast iron or galvanized", risk: "Very Low", detail: "Homes pre-1970 typically have no copper in-slab piping. Cast iron drain lines degrade slowly. Main risk is cast iron corrosion and tree root intrusion." },
  { range: "1970-1985", pipe: "Early copper, Type M", detail: "Type M (thin wall) copper was standard. At 40-55 years, DFW hard water has created significant pinhole leak risk. High probability of at least one prior slow leak.", risk: "High" },
  { range: "1986-2000", pipe: "Copper, Type L", detail: "Type L (medium wall) copper. Still aging — DFW water pH and chloramine content accelerate pitting. In high-sulfur soil areas (Arlington, Mesquite), exterior pipe corrosion is elevated.", risk: "Medium-High" },
  { range: "2001-2015", pipe: "Copper or PEX transition", detail: "Homes in this era vary. Some have full PEX (immune to pinhole leaks), others have copper manifolds with PEX runs. Request plumbing as-built to determine exposure.", risk: "Medium" },
  { range: "Post-2015", pipe: "PEX-A or PEX-B", detail: "Modern DFW homes use cross-linked polyethylene — essentially immune to pinhole leak failure. Primary risk is fitting failure at manifold connections.", risk: "Low" },
];

const symptoms = [
  { icon: "💰", symptom: "Water bill spike ($30+ increase)", urgency: "Investigate within 48 hours" },
  { icon: "🌡️", symptom: "Warm spot on tile or concrete floor", urgency: "Call plumber same day — hot line leak" },
  { icon: "💦", symptom: "Damp baseboards or carpet near slab edge", urgency: "Emergency call — active leak" },
  { icon: "📉", symptom: "Low water pressure without explanation", urgency: "Schedule leak detection within 1 week" },
  { icon: "🔊", symptom: "Running water sound with all faucets off", urgency: "Emergency call — active leak" },
  { icon: "🏚️", symptom: "Foundation movement after dry spell", urgency: "Check for concurrent slab leak — both often co-occur" },
];

export default function DFWSlabLeakStatistics2026() {
  const [age, setAge] = useState("");
  const [symptomCount, setSymptomCount] = useState("0");
  const [result, setResult] = useState("");

  function assess() {
    if (!age) { setResult("Select your home age to begin assessment."); return; }
    const group = ageGroups.find(g => g.range === age);
    const sCount = parseInt(symptomCount);
    if (!group) return;
    let urgency = "Schedule routine leak detection within 90 days.";
    if (group.risk === "High" || group.risk === "Very High") urgency = "Schedule electronic leak detection within 30 days.";
    if (sCount >= 2) urgency = "Call a DFW slab leak specialist within 48 hours.";
    if (sCount >= 3) urgency = "Emergency — call a DFW slab leak specialist today.";
    setResult(`${group.range} home: ${group.pipe} piping. Risk level: ${group.risk}. ${group.detail} With ${symptomCount} active symptom(s): ${urgency} DFW avg slab leak repair: $1,800-4,500. Rerouting: $3,500-8,000. Early detection saves 60-70% of repair costs.`);
  }

  const riskColor = (r: string) => r.includes("Very Low")?"#4ade80":r.includes("Low")?"#86efac":r.includes("High")?"#ef4444":"#fbbf24";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>💧</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0" }}>DFW Slab Leak Statistics Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Why DFW is the slab leak capital of Texas — and what to do about it</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "🏘️", label: "DFW homes on slab", value: "90%+" },
            { icon: "💧", label: "Wasted gallons per undetected leak", value: "5,000-8,000" },
            { icon: "🔬", label: "Avg pinhole leak age (copper)", value: "35-45 yrs" },
            { icon: "💰", label: "Avg DFW slab leak repair cost", value: "$2,400" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#0F2040", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontSize: "1.3rem", fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "1rem" }}>🏠 Risk by Home Age (DFW)</h2>
          {ageGroups.map((g, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: i<ageGroups.length-1?"1px solid #1e3a5f":"none", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{g.range}</div>
                <div style={{ color: "#64748b", fontSize: "0.82rem" }}>{g.pipe}</div>
              </div>
              <div style={{ color: riskColor(g.risk), fontWeight: 700, fontSize: "0.9rem" }}>{g.risk}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "1rem" }}>🚨 DFW Slab Leak Warning Signs</h2>
          {symptoms.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.6rem 0", borderBottom: i<symptoms.length-1?"1px solid #1e3a5f":"none" }}>
              <span style={{ fontSize: "1.3rem" }}>{s.icon}</span>
              <div>
                <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{s.symptom}</div>
                <div style={{ color: "#fbbf24", fontSize: "0.82rem" }}>{s.urgency}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.2rem", marginBottom: "1rem" }}>🧮 My Slab Leak Risk Assessment</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
            <select value={age} onChange={e=>setAge(e.target.value)} style={{ background: "#0A1628", color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", flex: 1 }}>
              <option value="">Home build year range</option>
              {ageGroups.map(g=><option key={g.range} value={g.range}>{g.range}</option>)}
            </select>
            <select value={symptomCount} onChange={e=>setSymptomCount(e.target.value)} style={{ background: "#0A1628", color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", flex: 1 }}>
              <option value="0">0 symptoms</option>
              <option value="1">1 symptom</option>
              <option value="2">2 symptoms</option>
              <option value="3">3+ symptoms</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "0.7rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>Assess My Risk →</button>
          {result && <div style={{ marginTop: "1rem", background: "#0A1628", borderRadius: 8, padding: "1rem", color: "#4ade80", lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem" }}>🔗</div>
          <p style={{ color: "#0A1628", fontWeight: 600, margin: "0.5rem 0" }}>Connect with DFW slab leak detection specialists — same-day availability</p>
          <div style={{ color: "#0A1628", fontWeight: 800 }}>prolnk.io — Verified DFW Plumbing Pros</div>
        </div>
      </div>
    </div>
  );
}
