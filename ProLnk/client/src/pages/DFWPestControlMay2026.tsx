import { useState } from 'react';

const pestConcerns = [
  {
    label: "🐜 Termites (swarming season)",
    priority: "🔴 URGENT — May is peak swarm month in DFW",
    treatment: [
      "Termite swarms (alates) appear in DFW April-June, usually after rain + warm evenings",
      "Swarmers look like flying ants — wings equal length = termite; unequal = ant",
      "Inspect mud tubes along foundation, garage slab edges, and wood framing in attic",
      "Subterranean termites cause $3,000-$30,000+ in damage before detection — annual inspection critical",
      "Bait station systems (Sentricon) vs liquid barrier (Termidor) — professional assessment needed",
      "DFW termite pressure is among highest in Texas — do not wait if you see swarmers",
    ],
  },
  {
    label: "🦟 Mosquitoes",
    priority: "🔴 High — Standing water from spring rain = breeding surge",
    treatment: [
      "Empty ALL standing water weekly: flower pots, bird baths, gutters, tarps, pet dishes",
      "DFW mosquito season runs May-October; peak pressure follows spring rain events",
      "Bacillus thuringiensis (Bt) dunks in rain barrels and ponds — safe, effective larvicide",
      "Professional barrier spray (permethrin-based): effective 3-4 weeks; cost $75-150/treatment",
      "Aedes aegypti mosquitoes in DFW can carry dengue — take breeding control seriously",
      "Mosquito misting systems: permanent solution, popular in DFW suburbs, $1,500-$3,000 installed",
    ],
  },
  {
    label: "🐜 Fire Ants",
    priority: "🟡 Medium — Treat mounds before summer peak",
    treatment: [
      "May mounds are smaller and easier to treat — summer heat hardens colonies deeper underground",
      "Two-step method: broadcast bait (Amdro) over yard, then drench active mounds",
      "Do NOT disturb mound before treating — fire ants mobilize and scatter in seconds",
      "DFW red imported fire ants are aggressive; medical attention if multiple stings occur",
      "Treat in early morning or evening when ants are foraging at surface",
      "Professional quarterly treatment plans available and recommended for large DFW lots",
    ],
  },
  {
    label: "🦂 Scorpions",
    priority: "🟡 Medium — Striped bark scorpion common in North Texas",
    treatment: [
      "Striped bark scorpion is DFW's primary species — painful sting but rarely dangerous for adults",
      "Seal all entry points: gaps around pipes, weatherstripping, window weeps — they enter through 1/16 inch",
      "Remove debris, firewood piles, and rock from home perimeter — prime hiding habitat",
      "UV flashlight inspection at night reveals scorpions glowing blue-green",
      "Residual pesticide treatment around foundation perimeter by licensed exterminator",
      "Sticky glue traps inside garage and along walls — excellent monitoring tool",
    ],
  },
];

export default function DFWPestControlMay2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.5rem" }}>
          PROLNK SEASONAL GUIDE · DFW · MAY 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🦟 DFW Pest Control — May 2026 Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          May is peak pest season across the DFW Metroplex. Spring rain creates mosquito breeding habitat,
          termite swarmers emerge after warm evenings, fire ant colonies are at the surface,
          and scorpion activity increases as temperatures climb. Treat now before summer makes
          outdoor work miserable and pest pressure compounds.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🐜", stat: "Top 5″, label: "DFW termite pressure nationally" },
            { icon: "🦟", stat: "May-Oct", label: "Active mosquito season in DFW" },
            { icon: "💰", stat: "$150-500″, label: "Annual pest protection cost" },
            { icon: "🏠", stat: "1-in-3″, label: "DFW homes with termite activity" },
          ].map((s) => (
            <div key={s.stat} style={{ background: "#0F2444″, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642″, fontSize: "1.1rem", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.78rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>Select Your Pest Concern</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {pestConcerns.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#1a3a6b" : "#0F2444″,
                border: selected === i ? "2px solid #F5E642″ : "2px solid transparent",
                borderRadius: 8, padding: "0.8rem 1rem", color: "#fff",
                textAlign: "left", cursor: "pointer", fontSize: "0.95rem",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0F2444″, borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642" }}>
            <div style={{ fontWeight: 700, marginBottom: "1rem" }}>{pestConcerns[selected].priority}</div>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              {pestConcerns[selected].treatment.map((item, i) => (
                <li key={i} style={{ color: "#cbd5e1″, marginBottom: "0.6rem", lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2.5rem", background: "#F5E642″, borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ color: "#0A1628″, fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            🦟 Connect with a Licensed DFW Exterminator via ProLnk
          </div>
          <div style={{ color: "#1a3a6b", fontSize: "0.9rem" }}>TPCL-licensed · Background-checked · Free quotes · Termite warranties available</div>
        </div>
      </div>
    </div>
  );
}