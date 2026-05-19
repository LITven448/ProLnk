import { useState } from 'react';

export default function DFWGroundFaultProtectionGuide2026() {
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const rooms: Record<string, { required: boolean; detail: string }> = {
    "Bathroom": { required: true, detail: "GFCI required since 1975 NEC — all receptacles within 6 ft of water source." },
    "Kitchen": { required: true, detail: "GFCI required at countertop receptacles within 6 ft of sink since 1978 NEC." },
    "Garage": { required: true, detail: "GFCI required for all garage receptacles since 1978 NEC." },
    "Outdoor": { required: true, detail: "GFCI required for all exterior receptacles since 1978 NEC." },
    "Basement": { required: true, detail: "GFCI required for unfinished basement receptacles since 1990 NEC." },
    "Bedroom": { required: false, detail: "GFCI not required in bedrooms — AFCI protection applies instead." },
    "Living Room": { required: false, detail: "GFCI not required — AFCI protection applies in living areas." },
  };

  const checkRoom = () => {
    if (!selectedRoom) return;
    const info = rooms[selectedRoom];
    setResult(info.required
      ? `⚡ GFCI REQUIRED: ${info.detail}`
      : `✅ NOT REQUIRED: ${info.detail}`
    );
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>⚡</span>
          <span style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 6, padding: "4px 12px", fontWeight: 700, fontSize: 12 }}>DFW ELECTRICAL GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW Ground Fault Protection Guide 2026</h1>
        <p style={{ color: "#94A3B8″, fontSize: 15, marginBottom: 28 }}>Why GFCI protection is critical in DFW — and what NEC requires in your home</p>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: "4px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>🌧️ Why DFW Climate Increases Shock Risk</h2>
          <p style={{ color: "#CBD5E1″, fontSize: 14, lineHeight: 1.7, marginBottom: 0 }}>DFW averages 37 inches of rain annually with summer humidity regularly topping 70%. Moisture infiltration into outlets — especially in older ranch-style homes with crawl spaces — dramatically increases shock and electrocution risk. GFCI outlets detect current leakage as small as 5 milliamps and cut power in 1/40th of a second, far faster than the human nervous system can react.</p>
        </div>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>📅 NEC GFCI Requirement History</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["1975″, "Bathrooms"], ["1978", "Kitchens, Garages"], ["1990", "Basements, Crawl Spaces"], ["1993", "Boat Houses, Docks"], ["2014", "Dishwashers, HVAC Receptacles"]].map(([year, loc]) => (
              <div key={year} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ background: "#1E2F4F", color: "#F5E642″, borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 700, minWidth: 50, textAlign: "center" }}>{year}</span>
                <span style={{ color: "#CBD5E1″, fontSize: 14 }}>{loc}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#94A3B8″, fontSize: 13, marginTop: 14 }}>⚠️ Older DFW homes built before these dates may legally lack GFCI in required areas — they were grandfathered under the code at time of construction but upgrades are strongly recommended.</p>
        </div>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>🔧 How to Test Your GFCI Monthly</h2>
          <ol style={{ color: "#CBD5E1″, fontSize: 14, lineHeight: 1.9, paddingLeft: 20, marginBottom: 0 }}>
            <li>Plug a lamp or phone charger into the GFCI outlet</li>
            <li>Press the <strong style={{ color: "#F5E642″ }}>TEST</strong> button — the lamp should go off immediately</li>
            <li>Press the <strong style={{ color: "#F5E642″ }}>RESET</strong> button — the lamp should come back on</li>
            <li>If the TEST button does not cut power, the outlet is faulty and needs replacement</li>
            <li>After power surges or storms, reset all GFCI outlets before assuming power is out</li>
          </ol>
        </div>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 8 }}>👷 Who Installs GFCI in DFW</h2>
          <p style={{ color: "#CBD5E1″, fontSize: 14, lineHeight: 1.7 }}>Texas requires electricians to hold a <strong style={{ color: "#F5E642" }}>TDLR license</strong> (Texas Department of Licensing and Regulation). GFCI outlet replacement typically costs $125–$250 per outlet including labor in DFW. Whole-bathroom GFCI upgrades run $300–$600 depending on panel access.</p>
        </div>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>🏠 Room GFCI Requirement Checker</h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} style={{ background: "#1E2F4F", color: "#E8EAF0″, border: "1px solid #2D4A7A", borderRadius: 8, padding: "10px 14px", fontSize: 14, flex: 1, minWidth: 200 }}>
              <option value="">Select a room...</option>
              {Object.keys(rooms).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <button onClick={checkRoom} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Check</button>
          </div>
          {result && <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14, color: "#E8EAF0″, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}