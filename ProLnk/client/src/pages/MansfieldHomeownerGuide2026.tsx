import { useState } from 'react';

const priorities: Record<string, { icon: string; title: string; urgency: string; detail: string }[]> = {
  "Pre-1995″: [
    { icon: "🏚️", title: "Foundation Inspection", urgency: "High", detail: "Clay soil expansion in Mansfield causes significant settling on older slabs. Annual inspection recommended." },
    { icon: "❄️", title: "HVAC Replacement", urgency: "High", detail: "Units installed pre-1995 are past 30-year life. Humidity from Joe Pool Lake accelerates wear." },
    { icon: "🔌", title: "Electrical Panel Upgrade", urgency: "High", detail: "60-100A panels insufficient for modern loads. Upgrade to 200A for safety and resale value." },
    { icon: "🪟", title: "Window Resealing", urgency: "Medium", detail: "Lake proximity moisture degrades seals. Re-caulk and inspect for mold annually." },
  ],
  "1995-2005″: [
    { icon: "🏗️", title: "Foundation Monitoring", urgency: "Medium", detail: "Homes in this era show early settling signs. Install soil moisture sensors around perimeter." },
    { icon: "💧", title: "Water Heater Check", urgency: "Medium", detail: "Units hitting 20+ years. Flush annually, plan replacement within 2-3 years." },
    { icon: "🌿", title: "Drainage Grading", urgency: "Medium", detail: "Joe Pool Lake area sees heavy rain events. Ensure 6-inch slope away from foundation." },
    { icon: "🔥", title: "HVAC Service", urgency: "Low", detail: "Units aging but serviceable. Annual tune-up extends life 3-5 years in humid climate." },
  ],
  "2006-2015″: [
    { icon: "🛡️", title: "Roof Inspection", urgency: "Medium", detail: "15-20 year shingles approaching mid-life. Inspect after each hail season — Mansfield sees 4-6/year." },
    { icon: "🌳", title: "Tree Root Survey", urgency: "Low", detail: "Mature landscaping roots can infiltrate sewer lines. Camera inspection every 5 years." },
    { icon: "🎨", title: "Exterior Paint & Caulk", urgency: "Low", detail: "South-facing walls take intense UV. Repaint cycle every 7-8 years to protect wood trim." },
    { icon: "❄️", title: "HVAC Filter & Coil", urgency: "Low", detail: "Units in prime life — keep maintained monthly. Lake humidity means coils attract mold faster." },
  ],
};

export default function MansfieldHomeownerGuide2026() {
  const [selected, setSelected] = useState("Pre-1995″);
  const eras = Object.keys(priorities);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 4px" }}>Mansfield TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Fast-growing south Tarrant city · Joe Pool Lake humidity zone · Foundation settling watch</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: "20px 24px", marginBottom: 28, borderLeft: "4px solid #F5E642″ }}>
          <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1″, lineHeight: 1.6 }}>
            🌊 <strong style={{ color: "#F5E642″ }}>Lake Humidity Factor:</strong> Joe Pool Lake raises ambient moisture 8-12% vs. inland Tarrant County. This accelerates HVAC coil mold, window seal failure, and wood rot. Mansfield homes need more frequent inspections than the DFW average.
          </p>
        </div>

        <h2 style={{ fontSize: 17, color: "#F5E642″, marginBottom: 14 }}>Select Your Home Era</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {eras.map(era => (
            <button key={era} onClick={() => setSelected(era)} style={{ padding: "10px 20px", borderRadius: 8, border: "2px solid", borderColor: selected === era ? "#F5E642″ : "#1e3a5f", backgroundColor: selected === era ? "#F5E642" : "transparent", color: selected === era ? "#0A1628" : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              {era}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {priorities[selected].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#111f3a", borderRadius: 10, padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9″ }}>{item.title}</span>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, backgroundColor: item.urgency === "High" ? "#7f1d1d" : item.urgency === "Medium" ? "#78350f" : "#14532d", color: item.urgency === "High" ? "#fca5a5″ : item.urgency === "Medium" ? "#fcd34d" : "#86efac" }}>{item.urgency}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8″, lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", backgroundColor: "#111f3a", borderRadius: 12, padding: 24 }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>🔗 Ready to find a trusted Mansfield pro?</p>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>ProLnk connects you with verified local contractors in Mansfield and Tarrant County.</p>
        </div>
      </div>
    </div>
  );
}