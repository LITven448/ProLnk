import { useState } from 'react';

export default function DFWNoHOAGuide2026() {
  const [concern, setConcern] = useState<string | null>(null);

  const concerns = [
    {
      type: "Neighbor Appearance",
      icon: "🏚️",
      guidance: [
        "City code enforcement handles junk, abandoned vehicles, and unsafe structures",
        "Dallas, Fort Worth, and most DFW cities have nuisance ordinances",
        "File complaints with city code enforcement — search [city name] code enforcement",
        "Resolution timelines vary: 30-90 days is typical for non-emergency issues",
        "Grass height, trash, and junk vehicles are among the most common violations",
        "No-HOA areas rely entirely on neighbor relationships and city response",
        "Research the specific block — drive through at different times before buying"
      ]
    },
    {
      type: "Property Values",
      icon: "📈",
      guidance: [
        "No-HOA areas can still have strong property value trends — location drives values",
        "Research sales history on your specific street — look for consistency",
        "Proximity to HOA communities can anchor values in no-HOA areas",
        "Teardown/spec home activity in the area is a positive value signal",
        "No-HOA in a desirable DFW suburb (Southlake, Flower Mound) is still valuable",
        "Check city master plans for infrastructure investment in the area",
        "Commercial encroachment on residential streets can suppress values — check zoning"
      ]
    },
    {
      type: "Parking & Vehicles",
      icon: "🚗",
      guidance: [
        "City ordinances regulate street parking — typically 72-hour limit on most DFW streets",
        "Inoperative/unregistered vehicles on property are city code violations",
        "Boat trailers and RVs are allowed in driveways in most DFW no-HOA areas",
        "Commercial vehicle parking is generally permitted on private property",
        "This is the biggest lifestyle difference from HOA living — some love it",
        "Research the neighborhood for how neighbors currently use their driveways",
        "City complaint process is slower than HOA enforcement — expect 30-60 day response"
      ]
    },
    {
      type: "Home Modifications",
      icon: "🔨",
      guidance: [
        "Only city permits are required — no HOA approval needed",
        "This is a major advantage for renovators and builders",
        "Setbacks, height limits, and FAR are governed by city zoning code only",
        "No paint color restrictions — full exterior design freedom",
        "Fence height governed by city code — typically 8ft max in DFW residential zones",
        "Pool installation requires city permit only — no architectural committee",
        "ADUs and garage apartments may be permitted — check specific zoning"
      ]
    },
    {
      type: "Short-Term Rentals",
      icon: "🏠",
      guidance: [
        "No HOA prohibition — STR governed by city licensing only",
        "Dallas requires STR license and limits to owner-occupied properties in some zones",
        "Fort Worth has more permissive STR rules in residential areas",
        "Neighboring cities vary significantly — verify city ordinance before buying as STR",
        "Neighborhood character matters — some no-HOA areas resist STR activity informally",
        "No-HOA gives you maximum STR flexibility compared to HOA communities",
        "Income potential can offset higher property taxes in some DFW no-HOA areas"
      ]
    },
    {
      type: "Noise & Nuisance",
      icon: "🔊",
      guidance: [
        "City noise ordinances apply — typically quiet hours 10pm-7am",
        "No HOA enforcement means slower response to complaints",
        "Call 311 for non-emergency city services in Dallas/Fort Worth",
        "Dogs, parties, and loud equipment are handled by police non-emergency line",
        "Without HOA fines, enforcement relies on neighbor goodwill and city process",
        "Visit the block on a weekend evening before buying — assess the vibe",
        "Buffer lots, commercial zones nearby, or highways can amplify noise concerns"
      ]
    }
  ];

  const dallasAreas = [
    { area: "Lake Highlands (Dallas)", type: "Established no-HOA", note: "Strong values, mature trees" },
    { area: "East Dallas / Lakewood", type: "Mixed — check each street", note: "Highly desirable, urban feel" },
    { area: "Oak Cliff", type: "Primarily no-HOA", note: "Rapidly gentrifying" },
    { area: "North Richland Hills", type: "Many older no-HOA subdivisions", note: "Good schools, established" },
    { area: "Saginaw / Haslet", type: "New no-HOA options available", note: "More land, rural feel" },
    { area: "Grand Prairie / Irving", type: "Large no-HOA inventory", note: "Value pricing, central location" }
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW No HOA Neighborhood Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Maximum freedom — but know what governs your neighborhood when there's no HOA</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
          <div style={{ background: "#1e2d45″, borderRadius: 8, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>✅</div>
            <div style={{ color: "#4ade80″, fontWeight: 700, marginTop: 6 }}>Freedom</div>
            <div style={{ color: "#94a3b8″, fontSize: 12 }}>No approval needed for modifications</div>
          </div>
          <div style={{ background: "#1e2d45″, borderRadius: 8, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>⚖️</div>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: 6 }}>City Code</div>
            <div style={{ color: "#94a3b8″, fontSize: 12 }}>Replaces HOA rules — slower enforcement</div>
          </div>
          <div style={{ background: "#1e2d45″, borderRadius: 8, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>💸</div>
            <div style={{ color: "#4ade80″, fontWeight: 700, marginTop: 6 }}>No HOA Fees</div>
            <div style={{ color: "#94a3b8″, fontSize: 12 }}>Savings of $100–$500/month vs. HOA</div>
          </div>
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: 16 }}>Your Concern → Research Guide</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button key={c.type} onClick={() => setConcern(concern === c.type ? null : c.type)}
              style={{ background: concern === c.type ? "#F5E642″ : "#1e2d45", border: "none", borderRadius: 8, padding: 14, cursor: "pointer", color: concern === c.type ? "#0A1628" : "#fff", textAlign: "center" }}>
              <div style={{ fontSize: 26 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginTop: 6 }}>{c.type}</div>
            </button>
          ))}
        </div>

        {concern && (() => {
          const c = concerns.find(x => x.type === concern)!;
          return (
            <div style={{ background: "#1e2d45″, borderRadius: 10, padding: 24, marginBottom: 28, borderLeft: "4px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642″, margin: "0 0 12px" }}>{c.icon} {c.type} in No-HOA Areas</h3>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {c.guidance.map((g, i) => <li key={i} style={{ color: "#cbd5e1″, marginBottom: 7 }}>{g}</li>)}
              </ul>
            </div>
          );
        })()}

        <h2 style={{ color: "#F5E642″, marginBottom: 14 }}>DFW Areas with No-HOA Inventory</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {dallasAreas.map((a, i) => (
            <div key={i} style={{ background: "#1e2d45″, borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 600 }}>{a.area}</div>
                <div style={{ color: "#94a3b8″, fontSize: 12 }}>{a.type}</div>
              </div>
              <div style={{ color: "#F5E642″, fontSize: 12, textAlign: "right", maxWidth: 160 }}>{a.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
