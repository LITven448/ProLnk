import { useState } from 'react';

const insurers = [
  { name: "State Farm", discount: "20%", notes: "Class 4 required, submit form SF-1089″ },
  { name: "Allstate", discount: "25%", notes: "Must be installed by licensed DFW contractor" },
  { name: "USAA", discount: "28%", notes: "Available to military families in DFW metro" },
  { name: "Farmers", discount: "22%", notes: "Requires third-party inspection post-install" },
  { name: "Nationwide", discount: "20%", notes: "5-year seasoning period before transfer" },
];

const products = [
  { brand: "GAF Timberline HDZ CS", rating: "Class 4″, warranty: "Lifetime", price: "$140-160/sq", notes: "Most popular in DFW, widely stocked" },
  { brand: "OC Duration Storm", rating: "Class 4″, warranty: "Lifetime", price: "$145-165/sq", notes: "SureNail strip holds in DFW wind events" },
  { brand: "Malarkey Vista", rating: "Class 4″, warranty: "50-Year", price: "$155-175/sq", notes: "Polymer-modified, algae resistant" },
];

export default function DFWRoofingHailClass4Guide2026B() {
  const [insurer, setInsurer] = useState("");
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    if (!insurer || !situation) { setResult("Select both fields for your ROI guide."); return; }
    const ins = insurers.find(i => i.name === insurer);
    const discount = ins ? ins.discount : "20%";
    const pct = parseInt(discount);
    if (situation === "new") {
      setResult(`With ${insurer} (${discount} discount): On a $2,400/yr DFW premium, you save ~$${Math.round(2400*pct/100)}/yr. Average Class 4 upgrade premium: $800-1,200. Payback: 1-2 years. ${ins?.notes}`);
    } else if (situation === "replace") {
      setResult(`Replacing existing roof with Class 4 for ${insurer}: Net cost after discount recapture is typically $1,500-3,000 over standard shingles. Savings: $${Math.round(2400*pct/100)}/yr = full payback in 2-4 years. ${ins?.notes}`);
    } else {
      setResult(`Claim repair scenario with ${insurer}: If hail damaged your non-Class 4 roof, upgrading at claim time adds minimal out-of-pocket cost while locking in ${discount} discount going forward. ${ins?.notes}`);
    }
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🛡️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0" }}>DFW Class 4 Impact-Resistant Shingle Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>Part 2: Deep Dive — UL 2218 Testing, Insurer Discounts & Product Comparison</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "0.75rem" }}>⚡ What Is UL 2218 Testing?</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7 }}>UL 2218 simulates hail impact using a steel ball dropped from specific heights. Class 1 withstands a 1.25″ ball; Class 4 withstands a 2″ steel ball dropped twice from 20 feet — the toughest rating. DFW averages 6-8 hail events per year, making Class 4 the only practical choice for long-term protection.</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {["Class 1: 1.25\"","Class 2: 1.5\"","Class 3: 1.75\"","Class 4: 2.0\" ✅"].map((c,i) => (
              <div key={i} style={{ background: i===3?"#F5E642″:"#1e3a5f", color: i===3?"#0A1628":"#94a3b8", padding: "0.4rem 0.9rem", borderRadius: 8, fontSize: "0.85rem", fontWeight: 600 }}>{c}</div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🏢 DFW Insurer Discount Breakdown</h2>
          {insurers.map((ins, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0″, borderBottom: i<insurers.length-1?"1px solid #1e3a5f":"none" }}>
              <div>
                <div style={{ color: "#e2e8f0″, fontWeight: 600 }}>{ins.name}</div>
                <div style={{ color: "#64748b", fontSize: "0.82rem" }}>{ins.notes}</div>
              </div>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: "1.2rem" }}>{ins.discount}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🏗️ Top Class 4 Products for DFW</h2>
          {products.map((p, i) => (
            <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700 }}>{p.brand}</div>
              <div style={{ display: "flex", gap: "1rem", margin: "0.4rem 0″, flexWrap: "wrap" }}>
                <span style={{ color: "#4ade80″, fontSize: "0.85rem" }}>✅ {p.rating}</span>
                <span style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>📋 {p.warranty}</span>
                <span style={{ color: "#F5E642″, fontSize: "0.85rem" }}>💰 {p.price}</span>
              </div>
              <div style={{ color: "#64748b", fontSize: "0.82rem" }}>{p.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🧮 Class 4 ROI Calculator</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <select value={insurer} onChange={e=>setInsurer(e.target.value)} style={{ background: "#0A1628″, color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", flex: 1 }}>
              <option value="">Your DFW Insurer</option>
              {insurers.map(i=><option key={i.name} value={i.name}>{i.name}</option>)}
            </select>
            <select value={situation} onChange={e=>setSituation(e.target.value)} style={{ background: "#0A1628″, color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", flex: 1 }}>
              <option value="">Your Situation</option>
              <option value="new">New roof install</option>
              <option value="replace">Replacing older roof</option>
              <option value="claim">Hail claim in progress</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.7rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>Calculate My Class 4 ROI →</button>
          {result && <div style={{ marginTop: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem", color: "#4ade80", lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ textAlign: "center", background: "#0F2040″, borderRadius: 12, padding: "1.5rem" }}>
          <div style={{ fontSize: "1.5rem" }}>🔗</div>
          <p style={{ color: "#94a3b8″, margin: "0.5rem 0" }}>Connect with DFW Class 4 roofing specialists through ProLnk</p>
          <div style={{ color: "#F5E642″, fontWeight: 700 }}>prolnk.io — DFW Verified Roofing Pros</div>
        </div>
      </div>
    </div>
  );
}
