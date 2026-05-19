import { useState } from 'react';

type HomeTypeData = { requirements: { label: string; status: string; detail: string }[] };
type FireData = Record<string, HomeTypeData>;

const fireData: FireData = {
  "New Construction (Gas)": {
    requirements: [
      { label: "Smoke Detector — Every Bedroom", status: "Required", detail: "Must be installed in every sleeping room per 2021 IRC R314.3." },
      { label: "Smoke Detector — Outside Sleeping Areas", status: "Required", detail: "Within 21 feet of all bedroom doors in the hallway or corridor." },
      { label: "Smoke Detector — Each Floor", status: "Required", detail: "At minimum one per level including basement. Garage excluded." },
      { label: "CO Detector", status: "Required", detail: "Required in all new gas homes within 10 feet of each bedroom. IRC R315." },
      { label: "Interconnected Detectors", status: "Required", detail: "All smoke alarms must be interconnected — when one sounds, all sound." },
      { label: "10-Year Sealed Battery", status: "Required", detail: "New construction requires sealed, non-removable 10-year battery backup." },
      { label: "Fire Extinguisher", status: "Recommended", detail: "Not required by code but strongly recommended. 2.5 lb ABC minimum." },
      { label: "Escape Plan", status: "Recommended", detail: "Two exits from every room. Practice with household twice a year." },
    ],
  },
  "Existing Home (Gas)": {
    requirements: [
      { label: "Smoke Detector — Every Bedroom", status: "Required", detail: "Required in all existing homes. Retrofit with battery units if no wiring." },
      { label: "Smoke Detector — Outside Sleeping Areas", status: "Required", detail: "Hallway placement within 21 feet of bedrooms." },
      { label: "Smoke Detector — Each Floor", status: "Required", detail: "Minimum one per level. Test monthly, replace batteries annually." },
      { label: "CO Detector", status: "Required", detail: "Required in existing gas homes per Texas law. Plug-in or battery units acceptable." },
      { label: "Interconnected Detectors", status: "Recommended", detail: "Not required in existing homes but strongly recommended for safety." },
      { label: "10-Year Sealed Battery", status: "Recommended", detail: "Upgrade to 10-year sealed units when replacing detectors." },
      { label: "Fire Extinguisher", status: "Recommended", detail: "ABC type in kitchen and garage. Check pressure gauge annually." },
      { label: "Escape Plan", status: "Recommended", detail: "Identify two exits from each room. Meet at designated outside point." },
    ],
  },
  "Existing Home (Electric Only)": {
    requirements: [
      { label: "Smoke Detector — Every Bedroom", status: "Required", detail: "Required regardless of fuel type. Battery backup for existing wired units." },
      { label: "Smoke Detector — Outside Sleeping Areas", status: "Required", detail: "Hallway placement within 21 feet of bedrooms." },
      { label: "Smoke Detector — Each Floor", status: "Required", detail: "Minimum one per level." },
      { label: "CO Detector", status: "Not Required (No Gas)", detail: "CO detectors are not required in all-electric homes with no attached garage." },
      { label: "Garage CO Detector", status: "Recommended", detail: "If you have an attached garage, a CO detector near the entry door is wise." },
      { label: "Interconnected Detectors", status: "Recommended", detail: "Not required in existing homes but increases safety significantly." },
      { label: "Fire Extinguisher", status: "Recommended", detail: "Keep one in the kitchen. Electric fires require ABC-rated extinguisher." },
      { label: "Escape Plan", status: "Recommended", detail: "Two exits from every room. Practice with household twice a year." },
    ],
  },
};

export default function DFWFireCodeHomeGuide2026() {
  const [homeType, setHomeType] = useState("New Construction (Gas)");

  const { requirements } = fireData[homeType];
  const required = requirements.filter(r => r.status === "Required").length;

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <span style={{ fontSize: "32px" }}>🔥</span>
          <h1 style={{ fontSize: "28px", fontWeight: "800″, color: "#F5E642", marginTop: "8px" }}>DFW Home Fire Code Guide 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "8px" }}>Texas follows the International Residential Code for residential fire safety. DFW cities enforce smoke and CO detector requirements on all homes. Know what is required for your home type.</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#94a3b8″, fontSize: "13px", display: "block", marginBottom: "6px" }}>Home Type</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155″, borderRadius: "8px", color: "#fff", fontSize: "14px", minWidth: "280px" }}>
            {Object.keys(fireData).map(k => <option key={k}>{k}</option>)}
          </select>
        </div>

        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ color: "#F5E642″, fontWeight: "700" }}>Fire Code Compliance — {homeType}</h2>
            <span style={{ backgroundColor: "#991b1b", color: "#fff", borderRadius: "20px", padding: "4px 12px", fontSize: "13px" }}>{required} Items Required by Law</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {requirements.map(req => (
              <div key={req.label} style={{ backgroundColor: "#0f172a", border: `1px solid ${req.status === "Required" ? "#ef4444" : req.status.startsWith("Not") ? "#334155" : "#F5E642"}`, borderRadius: "8px", padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ fontWeight: "600″, color: "#e2e8f0", fontSize: "14px" }}>{req.label}</span>
                  <span style={{ backgroundColor: req.status === "Required" ? "#991b1b" : req.status.startsWith("Not") ? "#1e293b" : "#713f12″, color: req.status === "Required" ? "#fca5a5" : "#94a3b8", borderRadius: "12px", padding: "2px 8px", fontSize: "11px", whiteSpace: "nowrap", fontWeight: "700" }}>{req.status}</span>
                </div>
                <p style={{ color: "#94a3b8″, fontSize: "13px", marginTop: "6px" }}>{req.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { icon: "🔋", title: "Replace Annually", body: "Test smoke detectors monthly. Replace batteries at least once per year. Replace units every 10 years." },
            { icon: "📍", title: "Placement Matters", body: "Mount detectors on ceiling or high on wall. Avoid placement near HVAC vents, kitchens, or bathrooms — false alarms lead to disabled units." },
            { icon: "📞", title: "Call 911 First", body: "Never re-enter a burning structure. Call 911 immediately. Have your address clearly visible from the street for first responders." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
              <h3 style={{ color: "#F5E642″, fontWeight: "700", marginBottom: "6px", fontSize: "14px" }}>{title}</h3>
              <p style={{ color: "#94a3b8″, fontSize: "13px", lineHeight: "1.5" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
