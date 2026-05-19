import { useState } from 'react';

type CityName = "Dallas" | "Fort Worth" | "Frisco" | "Plano" | "Arlington";

const permitByCity: Record<CityName, Record<string, string>> = {
  Dallas: { Fence: "Permit required > 6 ft or masonry", Deck: "Permit required > 30 inches or > 200 sqft", Pool: "Always required", Roof: "Permit required — no exceptions", HVAC: "Always required", Electrical: "Always required", Plumbing: "Always required" },
  "Fort Worth": { Fence: "Permit required > 6 ft", Deck: "Permit required > 30 inches off grade", Pool: "Always required", Roof: "Permit required", HVAC: "Always required", Electrical: "Always required", Plumbing: "Always required" },
  Frisco: { Fence: "Permit required — HOA may add rules", Deck: "Permit required if attached or elevated", Pool: "Always required", Roof: "Permit required", HVAC: "Always required", Electrical: "Always required", Plumbing: "Always required" },
  Plano: { Fence: "Permit required for all fences", Deck: "Permit required if attached to home", Pool: "Always required + barrier inspection", Roof: "Permit required", HVAC: "Always required", Electrical: "Always required", Plumbing: "Always required" },
  Arlington: { Fence: "Permit required > 6 ft wood or any masonry", Deck: "Permit required > 30 inches or attached", Pool: "Always required", Roof: "Permit required", HVAC: "Always required", Electrical: "Always required", Plumbing: "Always required" },
};

const alwaysPermit = ["Structural changes (walls, beams, foundation)", "Electrical panel upgrade or new circuits", "HVAC system replacement", "New plumbing lines or water heater", "Additions or room conversions", "Roofing (most DFW cities)"];
const neverPermit = ["Interior painting", "Flooring replacement", "Cabinet replacement (no plumbing move)", "Landscaping (plants, mulch, non-structural)", "Wallpaper", "Fixture swaps (same location)"];

const cities: CityName[] = ["Dallas", "Fort Worth", "Frisco", "Plano", "Arlington"];

export default function DFWPermitGuide2026() {
  const [city, setCity] = useState<CityName | "">("");
  const [project, setProject] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>📋 PROLNK GUIDE — DFW PERMITS 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Permit Guide 2026</h1>
        <p style={{ color: "#aab", marginBottom: 32 }}>When you need a permit in DFW — by project type and city. Skip it and risk failed inspection, liens, and insurance denial.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
          <div style={{ background: "#111d35″, border: "1px solid #1e3a5f", borderRadius: 10, padding: 20 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>✅ Always Needs a Permit</div>
            {alwaysPermit.map((item, i) => <div key={i} style={{ color: "#dde", fontSize: 13, padding: "5px 0″, borderBottom: "1px solid #1e3a5f" }}>• {item}</div>)}
          </div>
          <div style={{ background: "#111d35″, border: "1px solid #1e3a5f", borderRadius: 10, padding: 20 }}>
            <div style={{ color: "#7ef5a8″, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🟢 Never Needs a Permit</div>
            {neverPermit.map((item, i) => <div key={i} style={{ color: "#dde", fontSize: 13, padding: "5px 0″, borderBottom: "1px solid #1e3a5f" }}>• {item}</div>)}
          </div>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>🏙️ Permit Requirements by DFW City</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          {cities.map(c => (
            <button key={c} onClick={() => { setCity(city === c ? "" : c); setProject(""); }}
              style={{ background: city === c ? "#F5E642″ : "#1a2e50", color: city === c ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{c}</button>
          ))}
        </div>
        {city && (
          <div style={{ background: "#111d35″, borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12 }}>📍 {city} — Permit Requirements</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {Object.keys(permitByCity[city]).map(p => (
                <button key={p} onClick={() => setProject(project === p ? "" : p)}
                  style={{ background: project === p ? "#F5E642″ : "#0d1f3c", color: project === p ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 16, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>{p}</button>
              ))}
            </div>
            {project && <div style={{ background: "#0d1f3c", borderRadius: 8, padding: 14, color: "#fff", fontSize: 14 }}>📋 {permitByCity[city][project]}</div>}
          </div>
        )}

        <div style={{ background: "#111d35″, border: "1px solid #e55", borderRadius: 10, padding: 20, marginBottom: 32 }}>
          <div style={{ color: "#f87″, fontWeight: 700, marginBottom: 8 }}>⚠️ What Happens If You Skip a Permit?</div>
          {["Failed home sale inspection — buyer discovers unpermitted work", "Insurance claim denial if incident related to unpermitted work", "City stop-work order — could mean tearing out completed work", "Fines up to $2,000/day depending on city", "Title issues — unpermitted work follows the property"].map((r, i) => (
            <div key={i} style={{ color: "#dde", fontSize: 13, padding: "5px 0″, borderBottom: "1px solid #2a1a1a" }}>• {r}</div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", border: "1px solid #F5E642″, borderRadius: 10, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔨 Find Permit-Pulling Contractors via ProLnk</div>
          <div style={{ color: "#aab", marginBottom: 16 }}>ProLnk verified pros handle permit applications as part of the job — not an add-on.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Find Permitted Pros →</button>
        </div>
      </div>
    </div>
  );
}
