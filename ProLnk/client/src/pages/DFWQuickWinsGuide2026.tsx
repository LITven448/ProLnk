import { useState } from 'react';

export default function DFWQuickWinsGuide2026() {
  const [budget, setBudget] = useState<string>("all");

  const wins = [
    { id: "numbers", icon: "🏠", title: "New House Numbers", cost: 25, impact: "high", detail: "Modern brass or black house numbers dramatically improve curb appeal. One of the highest ROI upgrades per dollar spent in DFW real estate." },
    { id: "caulk", icon: "🪣", title: "Fresh Caulk (Tubs & Windows)", cost: 10, impact: "high", detail: "Old cracked caulk screams neglect to buyers. Fresh caulk around tubs, showers, and windows takes 2 hours and costs almost nothing — but looks brand new." },
    { id: "switches", icon: "💡", title: "New Light Switch Covers", cost: 5, impact: "medium", detail: "Yellow or cracked switch plates are everywhere in older DFW homes. Replace every plate in the house for under $30 total — instant modern upgrade." },
    { id: "hardware", icon: "🚪", title: "Door Hardware Upgrade", cost: 150, impact: "high", detail: "Replace front door lockset, deadbolt, and handle with matching matte black or brushed nickel. Buyers notice hardware immediately — it sets the tone for the whole home." },
    { id: "powerwash", icon: "💦", title: "Power Wash Driveway & Walkways", cost: 200, impact: "high", detail: "DFW driveways get grimy fast. A professional power wash removes years of oil stains and grime. Rental units cost $40/day if you DIY, or hire a pro for $150–200." },
    { id: "plants", icon: "🌿", title: "Fresh Entry Planters", cost: 60, impact: "medium", detail: "Two large planters with seasonal color plants flank your front door for massive curb appeal. Lowes and Home Depot DFW locations carry Texas-hardy varieties year-round." },
    { id: "mirror", icon: "🪞", title: "Bathroom Mirror Swap", cost: 80, impact: "medium", detail: "Builder-grade frameless mirrors are everywhere in DFW homes. A framed mirror from IKEA or TJ Maxx transforms a bathroom in under an hour." },
    { id: "grout", icon: "🧹", title: "Regrout Tile", cost: 30, impact: "high", detail: "Dark grout lines in kitchens and baths make entire rooms look dirty. Grout pen or regrout kit takes a few hours and makes tile look brand new." },
  ];

  const budgetFilters: { label: string; value: string; max: number }[] = [
    { label: "All", value: "all", max: 9999 },
    { label: "Under $50", value: "50", max: 50 },
    { label: "Under $100", value: "100", max: 100 },
    { label: "Under $250", value: "250", max: 250 },
  ];

  const maxBudget = budgetFilters.find((b) => b.value === budget)?.max ?? 9999;
  const filtered = wins.filter((w) => w.cost <= maxBudget);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⚡</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#F5E642", margin: 0 }}>DFW Quick Home Wins 2026</h1>
          <p style={{ color: "#8B9AB5", marginTop: "0.5rem" }}>High-impact, low-cost improvements for DFW homeowners</p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {budgetFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setBudget(f.value)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 20,
                border: `1px solid ${budget === f.value ? "#F5E642" : "#1E3050"}`,
                background: budget === f.value ? "#F5E642" : "#0F1E35",
                color: budget === f.value ? "#0A1628" : "#8B9AB5",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          {filtered.map((w) => (
            <div key={w.id} style={{ background: "#0F1E35", border: "1px solid #1E3050", borderRadius: 10, padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem" }}>{w.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600 }}>{w.title}</span>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ color: "#F5E642", fontWeight: 700 }}>${w.cost}</span>
                      <span style={{ background: w.impact === "high" ? "#1A4A2A" : "#2A3A1A", color: w.impact === "high" ? "#4ADE80" : "#A3E635", padding: "0.1rem 0.5rem", borderRadius: 10, fontSize: "0.75rem" }}>
                        {w.impact} impact
                      </span>
                    </div>
                  </div>
                  <p style={{ color: "#8B9AB5", margin: "0.4rem 0 0", fontSize: "0.85rem", lineHeight: 1.5 }}>{w.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", background: "#0F1E35", borderRadius: 10, padding: "1.25rem", border: "1px solid #1E3050", textAlign: "center" }}>
          <p style={{ color: "#8B9AB5", margin: 0, fontSize: "0.9rem" }}>
            🔗 Need a contractor for bigger upgrades? <span style={{ color: "#F5E642", fontWeight: 600 }}>ProLnk</span> matches you with verified DFW pros in minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
