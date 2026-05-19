import { useState } from 'react';

const planMap: Record<string, Record<string, { plan: string; steps: string[]; timeline: string; cost: string }>> = {
  low: {
    yard: { plan: "Broadcast Bait Treatment", steps: ["Apply Amdro or Spectracide bait in early morning or evening", "Keep pets and children off treated area for 24 hrs", "Retreat in 3–4 weeks if mounds reappear"], timeline: "Mounds gone in 1–2 weeks", cost: "$15–$40 DIY" },
    garden: { plan: "Spinosad Organic Bait", steps: ["Use Ferti-lome Come and Get It (spinosad-based)", "Safe around edibles and pollinators", "Apply around garden perimeter and active mounds"], timeline: "2–3 weeks", cost: "$20–$35 DIY" },
    hoa: { plan: "Community Broadcast + Mound Drench", steps: ["Broadcast bait entire yard first", "Follow up with individual mound treatments", "Document treatment for HOA compliance records"], timeline: "1 week for visible reduction", cost: "$30–$60" },
  },
  moderate: {
    yard: { plan: "Two-Step Method", steps: ["Broadcast bait entire yard (Amdro Pro)", "Wait 3–5 days then treat individual mounds with drench", "Repeat bait broadcast quarterly in spring and fall"], timeline: "10–14 days", cost: "$40–$80 DIY or $120–$200 professional" },
    garden: { plan: "Professional Organic Treatment", steps: ["Hire professional for spinosad broadcast + mound injection", "Install bait stations at garden perimeter", "Follow up in 30 days"], timeline: "2–3 weeks", cost: "$100–$180 professional" },
    hoa: { plan: "Professional Two-Step Program", steps: ["Hire licensed pest control for community-scale bait broadcast", "Document all treatments for HOA records", "Schedule quarterly treatments April, July, October"], timeline: "1–2 weeks", cost: "$150–$300 professional" },
  },
  severe: {
    yard: { plan: "Professional Full-Yard Program", steps: ["Call licensed pest control immediately", "Granular bait broadcast + liquid mound drench", "Monthly monitoring for 6 months", "Consider fire ant warranty program"], timeline: "2–3 weeks for significant reduction", cost: "$200–$400 + warranty program" },
    garden: { plan: "Professional Targeted Treatment + Barrier", steps: ["Organic professional treatment around edibles", "Install perimeter bait stations", "Monthly follow-up visits", "Spinosad injections for persistent mounds"], timeline: "3–4 weeks", cost: "$150–$300 professional" },
    hoa: { plan: "HOA Fire Ant Management Contract", steps: ["Contract licensed company for community-wide program", "Quarterly broadcast + spot treatments included", "Compliance documentation provided", "Emergency response within 48 hrs"], timeline: "Ongoing management", cost: "$300–$600/quarter for neighborhood" },
  },
};

export default function DFWFireAntGuide2026() {
  const [level, setLevel] = useState("moderate");
  const [location, setLocation] = useState("yard");
  const result = planMap[level]?.[location];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏠 ProLnk DFW Pest Guide</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>🐜 DFW Fire Ant Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Red imported fire ants (RIFA) are endemic throughout North Texas. Aggressive mound defenders — multiple stings cause anaphylaxis in sensitive individuals.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🗺️", label: "Endemic To", val: "All of North Texas" },
            { icon: "🌡️", label: "Peak Activity", val: "Spring & Fall" },
            { icon: "⚠️", label: "Health Risk", val: "Anaphylaxis possible" },
            { icon: "✅", label: "Best Method", val: "Two-Step Broadcast" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: "#111d35", borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "#F5E642" }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", marginBottom: "1rem" }}>🔬 Treatment Methods</h2>
          {[
            { name: "Broadcast Bait", desc: "Granular bait spread over entire yard — worker ants carry it to queen", timing: "Apply when ants are foraging (above 60°F, not before rain)" },
            { name: "Mound Drench", desc: "Liquid insecticide poured directly into mound for immediate kill", timing: "Best for isolated mounds or immediate hazard areas" },
            { name: "Spinosad (Organic)", desc: "Naturally derived, pet/child safe, approved for edible gardens", timing: "Slower acting but safe around pollinators" },
          ].map((t) => (
            <div key={t.name} style={{ marginBottom: "0.75rem", padding: "0.85rem", background: "#0A1628", borderRadius: 8, border: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.2rem" }}>{t.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "0.2rem" }}>{t.desc}</div>
              <div style={{ color: "#F5E642", fontSize: "0.8rem" }}>⏱️ {t.timing}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35", borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642", marginBottom: "1rem" }}>🧮 My Treatment Plan</h2>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <div>
              <label style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Infestation Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="low">Low (1–3 mounds)</option>
                <option value="moderate">Moderate (4–10 mounds)</option>
                <option value="severe">Severe (10+ mounds / all over)</option>
              </select>
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Primary Concern Area</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
                <option value="yard">General Yard</option>
                <option value="garden">Vegetable Garden</option>
                <option value="hoa">HOA / Neighborhood</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: "0.5rem" }}>{result.plan}</div>
              {result.steps.map((s, i) => <div key={i} style={{ color: "#cbd5e1", fontSize: "0.85rem", paddingLeft: "1rem", marginBottom: "0.2rem" }}>• {s}</div>)}
              <div style={{ color: "#22c55e", fontSize: "0.85rem", marginTop: "0.5rem" }}>Timeline: {result.timeline}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Cost: {result.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}