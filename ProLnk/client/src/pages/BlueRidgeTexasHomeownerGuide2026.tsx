import { useState } from 'react';

const propertyTypes = ["City Lot", "Acreage (1-5 ac)", "Small Farm (5-20 ac)", "Rural Estate (20+ ac)"];

const guides: Record<string, string[]> = {
  "City Lot": [
    "🚰 City water connection inspection — verify no corrosion at meter",
    "🏠 Septic or city sewer confirmation — Blue Ridge has mixed service areas",
    "🌿 Lawn care in Collin clay soil — aeration and overseeding schedule",
    "🔌 Electrical panel age check — older homes may need 200A upgrade",
    "🌡️ HVAC seasonal maintenance — filter and coil cleaning twice yearly",
    "🪟 Window and door weatherstripping — North Texas wind exposure",
  ],
  "Acreage (1-5 ac)": [
    "💧 Well water annual bacteria and nitrate test",
    "🚽 Septic system pumping — recommended every 3-5 years",
    "🌿 Pasture and fence line maintenance — cedar encroachment management",
    "🐄 Agricultural exemption renewal — maintain current land use records",
    "🔌 Rural electric service check — surge protection for rural supply",
    "🌡️ Propane tank level and line inspection",
    "🏗️ Outbuilding and barn structural inspection",
  ],
  "Small Farm (5-20 ac)": [
    "💧 Well pump pressure tank inspection — replace every 10-15 years",
    "🚽 Aerobic septic system maintenance contract — required in Collin County",
    "🌾 Ag exemption documentation — crop, livestock or wildlife records",
    "🏗️ Fencing perimeter audit — line post and wire tension check",
    "🚜 Equipment storage weatherproofing",
    "🌿 Invasive species removal — privet and elm management",
    "🔌 Generator hookup and fuel storage compliance",
  ],
  "Rural Estate (20+ ac)": [
    "💧 Well water comprehensive panel — metals, bacteria, pH, hardness",
    "🚽 Septic system full evaluation — load capacity vs household size",
    "🌾 Ag or wildlife exemption strategic planning — tax savings review",
    "🏗️ Pond and drainage infrastructure inspection",
    "🔒 Property boundary survey — encroachment risk on large rural parcels",
    "🌿 Timber or brush management plan",
    "🚜 Road and driveway gravel maintenance — culvert inspection",
  ],
};

export default function BlueRidgeTexasHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          COLLIN COUNTY · BLUE RIDGE, TX
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Blue Ridge TX Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          Blue Ridge sits in the rural north end of Collin County — a small community where acreage properties, well water, and septic systems are the norm. Self-reliance is the defining trait of Blue Ridge homeowners, and maintenance demands reflect that rural character.
        </p>

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏡 Select Your Property Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {propertyTypes.map((p) => (
              <button
                key={p}
                onClick={() => setSelected(p)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: selected === p ? "#F5E642″ : "#1e3a5f",
                  color: selected === p ? "#0A1628″ : "#fff",
                  fontWeight: 600,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>
              📋 Rural Collin County Guide — {selected}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {guides[selected].map((item, i) => (
                <li key={i} style={{ padding: "0.6rem 0″, borderBottom: "1px solid #1e3a5f", color: "#cbd5e1" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📍 Blue Ridge TX Fast Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["County", "Collin"], ["Population", "~1,000″], ["Water Source", "Well water — most properties"], ["Septic", "Common — aerobic and conventional"], ["Ag Exemptions", "Widely available"], ["Character", "Rural — low density"]].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.75rem" }}>{k}</div>
                <div style={{ color: "#F5E642″, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
