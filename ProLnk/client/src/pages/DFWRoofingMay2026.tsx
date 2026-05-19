import { useState } from 'react';

const roofAges = [
  {
    label: "Under 5 years",
    priority: "🟢 Low Risk — Post-hail inspection only",
    actions: [
      "After any hail event: walk yard and check for granules in gutters (colored grit = shingle damage)",
      "Take photos of dents on AC unit fins, gutters, and downspouts — insurers use these as proof",
      "File insurance claim within 12 months of hail event — don't wait",
      "Even new roofs can have installation defects — one free inspection is worth it",
    ],
  },
  {
    label: "5-15 years",
    priority: "🟡 Moderate Risk — Annual inspection + hail protocols",
    actions: [
      "Schedule professional inspection in May before peak hurricane season risk arrives",
      "Check flashings around chimneys, skylights, and vents — most leaks originate there",
      "After hail: have adjuster inspect before repairs; document everything photographically",
      "30-year architectural shingles in DFW often show wear at year 12-15 due to UV intensity",
      "Consider impact-resistant shingles (Class 4) on next replacement — up to 30% insurance discount",
    ],
  },
  {
    label: "15-25 years",
    priority: "🔴 High Risk — Plan replacement, file hail claim if applicable",
    actions: [
      "Roof is approaching or past expected life in DFW climate — budget for replacement",
      "Any hail event at this age likely justifies full insurance claim for replacement",
      "Metal roofing now competitive in DFW: 40-70 yr lifespan, energy efficient, Class 4 rated",
      "Get 3 bids minimum; verify contractor is licensed with TDLR and carries liability",
      "Replacement window: May-June is ideal before monsoon season returns in September",
    ],
  },
  {
    label: "25+ years",
    priority: "🚨 Critical — Replace this summer",
    actions: [
      "Roof has exceeded expected lifespan — replacement is not optional in DFW heat",
      "UV radiation in DFW accelerates shingle deterioration faster than national averages",
      "Standing seam metal roof: best long-term value for DFW; reflects heat, lasts 50+ yrs",
      "File hail claim if any event occurred in past 12 months — may cover full replacement",
      "Delay increases risk of interior water damage which voids many homeowner policies",
    ],
  },
];

export default function DFWRoofingMay2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.5rem" }}>
          PROLNK SEASONAL GUIDE · DFW · MAY 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🏠 DFW Roofing Guide — May 2026
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.7 }}>
          DFW hail season peaks April through June. If your roof took hail this spring, the clock
          is running — most insurance policies require claims within 12 months of the storm date.
          May is also the best month to schedule inspections before summer heat makes rooftop work
          dangerous and contractor schedules fill up completely.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "⛈️", stat: "Apr-Jun", label: "DFW peak hail season" },
            { icon: "🌡️", stat: "110°F+", label: "Attic temps in July without ventilation" },
            { icon: "💰", stat: "$12K-$22K", label: "Avg DFW roof replacement (2,500 sqft)" },
          ].map((s) => (
            <div key={s.stat} style={{ background: "#0F2444", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontSize: "1.1rem", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a2e", border: "1px solid #F5E642", borderRadius: 10, padding: "1.2rem", marginBottom: "2rem" }}>
          <strong style={{ color: "#F5E642" }}>⚡ Hail Event Protocol:</strong>
          <span style={{ color: "#cbd5e1" }}> After hail, photograph dents on AC fins, gutters, wood fence — these prove storm severity to your insurer. Do NOT let contractors start work before your insurance adjuster visits.</span>
        </div>

        <h2 style={{ color: "#F5E642", marginBottom: "1rem" }}>Select Your Roof Age</h2>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {roofAges.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#1a3a6b" : "#0F2444",
                border: selected === i ? "2px solid #F5E642" : "2px solid transparent",
                borderRadius: 8, padding: "0.7rem 1.2rem", color: "#fff",
                cursor: "pointer", fontSize: "0.9rem",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0F2444", borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642" }}>
            <div style={{ fontWeight: 700, marginBottom: "1rem" }}>{roofAges[selected].priority}</div>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              {roofAges[selected].actions.map((a, i) => (
                <li key={i} style={{ color: "#cbd5e1", marginBottom: "0.6rem", lineHeight: 1.6 }}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2.5rem", background: "#F5E642", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ color: "#0A1628", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            🏠 Get a Free Roofing Inspection via ProLnk
          </div>
          <div style={{ color: "#1a3a6b", fontSize: "0.9rem" }}>TDLR-licensed DFW roofers · Insurance claim experience · No pressure quotes</div>
        </div>
      </div>
    </div>
  );
}