import { useState } from 'react';

export default function DFWRenovationMistakesGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const mistakes = [
    {
      id: "permits",
      icon: "📋",
      title: "Skipping Permits",
      cost: "$$$$",
      detail: "Unpermitted work must be disclosed at sale and often requires demolition + redo. DFW inspectors check everything. Always pull permits — they protect you legally and financially.",
    },
    {
      id: "quotes",
      icon: "💸",
      title: "Not Getting 3 Quotes",
      cost: "$$$",
      detail: "DFW contractor prices vary 30–50% for identical work. A bathroom remodel might be $8K from one pro and $14K from another. Always get 3 bids before signing anything.",
    },
    {
      id: "design",
      icon: "📐",
      title: "Starting Before Design Is Final",
      cost: "$$$",
      detail: "Change orders in DFW average $2,400 per scope change. Finalize every detail — tile, fixtures, layout — before the first nail. Mid-project changes cost 3x more than planning upfront.",
    },
    {
      id: "hoa",
      icon: "🏘️",
      title: "Not Checking HOA Rules First",
      cost: "$$",
      detail: "DFW has 1,200+ active HOAs. Adding a fence, painting your front door, or changing roofing material without approval can mean fines + forced reversal. Always submit for HOA approval first.",
    },
    {
      id: "unlicensed",
      icon: "⚠️",
      title: "Hiring Unlicensed Contractors",
      cost: "$$$$",
      detail: "Texas requires licensing for HVAC, electrical, plumbing, and more. Unlicensed work is uninsured — if something goes wrong, you pay out of pocket. Verify every contractor at license.tdlr.texas.gov.",
    },
    {
      id: "budget",
      icon: "📊",
      title: "Underestimating Budget",
      cost: "$$$",
      detail: "DFW renos run 15–25% over budget on average. Always add a 20% contingency. Hidden issues like outdated wiring, mold, or plumbing surprises are common in homes built before 2000.",
    },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🚫</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#F5E642″, margin: 0 }}>
            Top DFW Renovation Mistakes 2026
          </h1>
          <p style={{ color: "#8B9AB5″, marginTop: "0.5rem" }}>
            Click a mistake to see how to avoid it — and how much it could cost you
          </p>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {mistakes.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{
                background: selected === m.id ? "#1A2E4A" : "#0F1E35″,
                border: `1px solid ${selected === m.id ? "#F5E642" : "#1E3050"}`,
                borderRadius: 10,
                padding: "1rem 1.25rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{m.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: "1rem" }}>{m.title}</span>
                </div>
                <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.9rem" }}>{m.cost}</span>
              </div>
              {selected === m.id && (
                <p style={{ marginTop: "0.75rem", color: "#B0C0D8″, lineHeight: 1.6, fontSize: "0.95rem" }}>
                  {m.detail}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem", background: "#0F1E35″, borderRadius: 10, padding: "1.25rem", border: "1px solid #1E3050", textAlign: "center" }}>
          <p style={{ color: "#8B9AB5″, margin: 0, fontSize: "0.9rem" }}>
            🔗 <span style={{ color: "#F5E642″, fontWeight: 600 }}>ProLnk</span> connects you to licensed, verified DFW contractors — with real reviews and competitive quotes.
          </p>
        </div>
      </div>
    </div>
  );
}
