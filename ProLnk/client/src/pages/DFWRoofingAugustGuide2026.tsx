import { useState } from 'react';

const concerns = [
  { id: "granules", label: "Finding granules in gutters after hot weeks", result: "August UV + thermal cycling is the #1 cause of accelerated granule loss in DFW. Granules protect asphalt from UV degradation — once they're gone, shingles crack within 2–3 seasons. If gutters are full of granules after no storms, your roof is aging fast. Get a roofing assessment before winter." },
  { id: "attic", label: "Attic temp unbearable even at 8am", result: "Critical ventilation failure. In August, a properly ventilated DFW attic should be within 15–20°F of outside temp. If it's 130°F+ in the attic by 8am, you have inadequate ridge/soffit ventilation. This bakes shingles from below and adds $300+/month to cooling bills." },
  { id: "hailcheck", label: "Want to know if August hail risk is still real", result: "DFW hail season peaks March–June but August storms are not uncommon. Tropical moisture from the Gulf pushes supercells through North Texas in August. Hail events are less frequent but can be severe. Keep homeowner's insurance documentation current and inspect after any storm." },
  { id: "uv", label: "Older shingles look faded and cracked", result: "UV degradation is cumulative — August is when it becomes most visible on aging DFW roofs. Shingles older than 12–15 years showing surface cracking (called alligatoring) are past useful life. August is actually a good planning window for fall replacement when roofers are less backlogged than spring." },
  { id: "leak", label: "Small water stain appeared inside after a storm", result: "Do not wait. Small August leaks expand rapidly — September brings increased storm activity and the leak point will worsen. Have a roofer locate the entry point within 2 weeks. Common August causes: cracked pipe boots, failed step flashing, or compromised ridge cap after summer expansion/contraction cycles." },
];

export default function DFWRoofingAugustGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>☀️ DFW August Roofing Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          August is DFW's most sustained heat month — averages above 100°F, with roof surfaces hitting 170–180°F daily. Hail risk declines but UV degradation accelerates, granule loss peaks, and attic ventilation becomes critical. Here’s what to assess now.
        </p>

        <div style={{ background: "#111d35″, borderRadius: 10, padding: "1.25rem", marginBottom: "2rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>📅 August = Planning Window</div>
          <p style={{ color: "#94a3b8″, lineHeight: 1.65, margin: 0 }}>Roofers are less backlogged in August than spring hail season. If your roof needs replacement, August assessments lead to September/October installs — ideal timing before winter and next spring's hail season. Get 3 quotes now if your roof is 12+ years old.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌡️", label: "Avg High", val: "100°F+" },
            { icon: "🏠", label: "Roof Surface", val: "Up to 180°F" },
            { icon: "☀️", label: "Peak UV Risk", val: "Highest of Year" },
          ].map(card => (
            <div key={card.label} style={{ background: "#111d35″, borderRadius: 10, padding: "0.875rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{card.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.75rem", marginBottom: "0.25rem" }}>{card.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.9rem" }}>{card.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>🔍 What's Your August Roofing Concern?</h2>
        <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
              style={{ background: selected === c.id ? "#1e3a5f" : "#111d35″, border: `2px solid ${selected === c.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#fff", textAlign: "left", cursor: "pointer", fontSize: "0.95rem", transition: "all 0.15s" }}>
              {c.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: "#1e3a5f", border: "2px solid #F5E642″, borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>🔧 Guide</div>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.65, margin: 0 }}>{match.result}</p>
          </div>
        )}
      </div>
    </div>
  );
}