import { useState } from 'react';

const products = [
  {
    icon: "🟥",
    name: "WeatherWatch",
    brand: "GAF",
    type: "Self-adhered modified bitumen",
    use: "Ice & water shield — eaves, valleys, penetrations",
    dfwNote: "DFW rarely gets ice dams, but WeatherWatch is required by DFW code at eaves (2 feet min). Often extended to valleys and around skylights for hail insurance claims.",
    coverage: "Eaves, valleys, penetrations"
  },
  {
    icon: "🔵",
    name: "StormGuard",
    brand: "GAF",
    type: "Self-adhered modified bitumen",
    use: "Full roof application for maximum protection",
    dfwNote: "StormGuard is designed for whole-roof coverage — used in DFW storm replacement upgrades. More flexible than WeatherWatch, adheres better in DFW summer heat during install.",
    coverage: "Full roof or high-exposure zones"
  },
  {
    icon: "🟧",
    name: "Titanium UDL",
    brand: "Owens Corning",
    type: "Synthetic underlayment",
    use: "Synthetic felt replacement — slip-resistant, UV stable",
    dfwNote: "Synthetic underlayment like Titanium has replaced 15/30-lb felt in most DFW installs. Lighter, stronger, UV-stable for the weeks between tear-off and shingle install in DFW weather.",
    coverage: "Full deck — replaces traditional felt"
  },
  {
    icon: "🟩",
    name: "DiamondDeck",
    brand: "Atlas",
    type: "Synthetic underlayment",
    use: "High-traction synthetic, DFW code compliant",
    dfwNote: "Popular DFW choice for its slip resistance in summer heat. Crew safety matters when DFW July roof surface temps exceed 150°F. Also provides secondary water barrier.",
    coverage: "Full deck synthetic application"
  },
];

const dfwScenarios = [
  { label: "Standard DFW re-roof, no special concerns", recommendation: "Synthetic Underlayment (Full Deck) + Ice & Water at Eaves", detail: "DFW code requires ice & water at eaves (2 feet). Synthetic felt full-deck meets code and outperforms organic felt in DFW heat and humidity." },
  { label: "DFW hail zone — insurance upgrade", recommendation: "Self-Adhered (Full Roof Coverage)", detail: "Full StormGuard or equivalent across entire deck. Many DFW insurers offer premium reduction. Eliminates the risk of wind-driven rain infiltration through nail holes." },
  { label: "Low-slope DFW roof section (2:12 to 4:12 pitch)", recommendation: "Self-Adhered Full Coverage Required", detail: "Low slope roofs in DFW need self-adhered underlayment — DFW code requires it below 4:12. Water moves slowly and can back up under shingles without full adhesion." },
  { label: "DFW valley replacement only", recommendation: "WeatherWatch or StormGuard in Valley", detail: "Valleys concentrate water flow. DFW summer storms produce high-intensity rainfall. Self-adhered in valleys prevents infiltration at the highest risk area." },
  { label: "New DFW construction, want best protection", recommendation: "Self-Adhered Full Roof + Ice & Water at Penetrations", detail: "Whole-roof self-adhered is the premium DFW option. Justified by DFW hail frequency (top 5 nationally) and wind speed potential in tornado corridor." },
  { label: "Budget re-roof, functional minimum", recommendation: "Synthetic Felt Full Deck + Code-Minimum Ice & Water", detail: "Synthetic underlayment at minimum DFW code. Cheaper than self-adhered but still dramatically better than 30-lb organic felt, which degrades in DFW UV within 30 days." },
];

export default function DFWRoofingWeatherGuard2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>
            DFW Premium Underlayment Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>
            WeatherWatch, StormGuard, synthetic felt — what DFW hail and wind demand from underlayment
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {products.map((p, i) => (
            <div key={i} onClick={() => setExpanded(expanded === i ? null : i)}
              style={{ backgroundColor: "#112240", borderRadius: 12, padding: 18, border: "1px solid #1e3a5f", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <div>
                    <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>{p.name} <span style={{ color: "#475569", fontSize: 12, fontWeight: 400 }}>by {p.brand}</span></div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>{p.type}</div>
                  </div>
                </div>
                <span style={{ color: "#94a3b8" }}>{expanded === i ? "▲" : "▼"}</span>
              </div>
              {expanded === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1e3a5f" }}>
                  <div style={{ color: "#e2e8f0", fontSize: 13, marginBottom: 10 }}>{p.dfwNote}</div>
                  <div style={{ backgroundColor: "#0A1628", borderRadius: 8, padding: "8px 12px" }}>
                    <span style={{ color: "#F5E642", fontSize: 11, fontWeight: 700 }}>TYPICAL DFW USE: </span>
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>{p.coverage}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#112240", borderRadius: 12, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, fontWeight: 700, marginBottom: 16 }}>🌪️ Your DFW Roof Concern</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {dfwScenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? "#F5E642" : "#0A1628",
                  color: selected === i ? "#0A1628" : "#e2e8f0",
                  border: "1px solid " + (selected === i ? "#F5E642" : "#1e3a5f"),
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                  textAlign: "left", fontSize: 14, fontWeight: selected === i ? 700 : 400,
                }}>{s.label}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 20, backgroundColor: "#0A1628", borderRadius: 10, padding: 18, border: "1px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 15, marginBottom: 6 }}>✅ {dfwScenarios[selected].recommendation}</div>
              <div style={{ color: "#94a3b8", fontSize: 14 }}>{dfwScenarios[selected].detail}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 28, color: "#475569", fontSize: 12 }}>
          ProLnk DFW Roofing Guide 2026 — Free Resource for Homeowners
        </div>
      </div>
    </div>
  );
}
