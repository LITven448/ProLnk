import { useState } from 'react';

const RENOVATION_TYPES = [
  {
    type: "Kitchen Remodel",
    icon: "🍳",
    shots: [
      { phase: "Before", shots: ["All cabinets closed (wide angle)", "All cabinets open (show interior condition)", "Countertops close-up", "Sink and plumbing", "Appliances (all sides)", "Lighting fixtures", "Floor full coverage"] },
      { phase: "During", shots: ["Demolition with old materials visible", "Rough plumbing/electrical before drywall", "Cabinet installation progress", "Countertop template measurements"] },
      { phase: "After", shots: ["Full room panoramic", "All appliances installed", "Cabinet hardware close-ups", "Countertop seams and edges", "Sink/faucet detail", "Backsplash detail", "Under-cabinet lighting on"] },
    ],
    storage: "Kitchen_Remodel_[Year] folder — before/ during/ after subfolders",
    purpose: "Insurance replacement value, resale listing photos, warranty reference",
  },
  {
    type: "Roof Replacement",
    icon: "🏠",
    shots: [
      { phase: "Before", shots: ["Aerial/drone if possible", "All 4 sides of roof from ground", "Close-up of damaged or worn shingles", "Flashing at chimney/vents", "Attic deck condition from inside"] },
      { phase: "During", shots: ["Old shingles removed (deck exposed)", "Ice/water barrier installation", "New shingles mid-lay", "Flashing installation"] },
      { phase: "After", shots: ["All 4 sides finished", "Ridge cap detail", "Flashing at all penetrations", "Gutters reattached", "Material label/specs photo"] },
    ],
    storage: "Roof_Replacement_[Year] — include photo of material packaging label",
    purpose: "Hail/storm insurance claims, warranty proof, buyer disclosure",
  },
  {
    type: "Foundation Repair",
    icon: "🏗️",
    shots: [
      { phase: "Before", shots: ["All visible cracks with ruler for scale", "Interior floors showing slope/gaps", "Exterior foundation cracks", "Door frames that do not close flush"] },
      { phase: "During", shots: ["Pier installation process", "Exposed foundation areas", "Equipment and work crew (for warranty validation)"] },
      { phase: "After", shots: ["All previous crack areas (re-photographed)", "Pier locations marked on floor plan", "Engineer sign-off document", "Doors operating correctly"] },
    ],
    storage: "Foundation_Repair_[Year] — include engineer report PDF scan",
    purpose: "Mandatory Texas disclosure, transferable warranty, buyer confidence",
  },
  {
    type: "HVAC System",
    icon: "❄️",
    shots: [
      { phase: "Before", shots: ["Old unit (model/serial number visible)", "Old thermostat", "Air handler/furnace condition", "Ductwork condition if visible"] },
      { phase: "During", shots: ["Old unit removal", "New unit placement", "Refrigerant line connections", "Electrical connections before cover"] },
      { phase: "After", shots: ["New unit with model tag visible", "New thermostat", "AHRI certificate/energy label", "Air handler and filter access"] },
    ],
    storage: "HVAC_Replacement_[Year] — include photo of AHRI certificate and warranty card",
    purpose: "Energy tax credit (Form 5695), resale disclosure, warranty claims",
  },
  {
    type: "Bathroom Remodel",
    icon: "🛁",
    shots: [
      { phase: "Before", shots: ["Full room wide angle", "Vanity and plumbing", "Shower/tub condition", "Tile/grout condition", "Toilet and floor"] },
      { phase: "During", shots: ["Demolition debris visible", "Rough plumbing/electrical", "Tile installation in progress", "Waterproofing membrane"] },
      { phase: "After", shots: ["Full room wide angle", "Vanity close-up", "Shower tile detail", "Grout lines close-up", "Hardware/fixtures", "Lighting on"] },
    ],
    storage: "Bathroom_Remodel_[Year] — specify which bathroom in folder name",
    purpose: "Resale listing, insurance replacement, permit verification",
  },
];

export default function DFWHomeRenovationPhotoGuide() {
  const [selected, setSelected] = useState<string>("");
  const detail = RENOVATION_TYPES.find((r) => r.type === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ background: "#F5E642″, color: "#0A1628", padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>📸 Renovation Photography Guide</h1>
          <p style={{ color: "#9BAAC5″, fontSize: 16 }}>Photos are your most powerful documentation tool. The right shots before, during, and after a renovation protect you in insurance claims, maximize your sale price, and validate warranty coverage.</p>
        </div>

        <div style={{ background: "#111E35″, border: "1px solid #F5E642", borderRadius: 10, padding: "1.25rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: "0.75rem" }}>📱 Storage Best Practice</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>☁️</div>
              <div style={{ color: "#E8EDF5″, fontSize: 14, fontWeight: 600 }}>Google Photos</div>
              <div style={{ color: "#9BAAC5″, fontSize: 12 }}>Free, searchable, backed up automatically</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>📁</div>
              <div style={{ color: "#E8EDF5″, fontSize: 14, fontWeight: 600 }}>Organized Folders</div>
              <div style={{ color: "#9BAAC5″, fontSize: 12 }}>Name: Renovation_Type_Year/before-during-after</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>🔗</div>
              <div style={{ color: "#E8EDF5″, fontSize: 14, fontWeight: 600 }}>Share With Contractor</div>
              <div style={{ color: "#9BAAC5″, fontSize: 12 }}>Get their photos too — they document their own work</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#111E35″, borderRadius: 10, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ fontSize: 18, marginBottom: "1rem" }}>📋 Shot List by Renovation Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            {RENOVATION_TYPES.map((r) => (
              <button key={r.type} onClick={() => setSelected(r.type)} style={{ background: selected === r.type ? "#F5E642″ : "#0A1628", color: selected === r.type ? "#0A1628" : "#E8EDF5", border: `1px solid ${selected === r.type ? "#F5E642" : "#2A4A7F"}`, borderRadius: 6, padding: "0.5rem 1rem", fontSize: 13, cursor: "pointer", fontWeight: selected === r.type ? 700 : 400 }}>
                {r.icon} {r.type}
              </button>
            ))}
          </div>

          {detail ? (
            <div>
              {detail.shots.map((phase) => (
                <div key={phase.phase} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", marginBottom: "0.75rem", border: "1px solid #1E3A5F" }}>
                  <h3 style={{ color: phase.phase === "Before" ? "#F5A623″ : phase.phase === "During" ? "#7EC8E3" : "#2ECC71", marginBottom: "0.5rem" }}>
                    {phase.phase === "Before" ? "📷" : phase.phase === "During" ? "🔄" : "✅"} {phase.phase} Photos
                  </h3>
                  {phase.shots.map((s) => <div key={s} style={{ color: "#CBD5E8″, fontSize: 14, padding: "0.2rem 0" }}>• {s}</div>)}
                </div>
              ))}
              <div style={{ background: "#1A1A00″, border: "1px solid #F5E642", borderRadius: 6, padding: "0.75rem", marginTop: "0.5rem" }}>
                <div style={{ color: "#F5E642″, fontSize: 13, fontWeight: 700, marginBottom: "0.25rem" }}>💾 Storage: {detail.storage}</div>
                <div style={{ color: "#9BAAC5″, fontSize: 13 }}>📌 Purpose: {detail.purpose}</div>
              </div>
            </div>
          ) : (
            <div style={{ color: "#9BAAC5″, fontSize: 14, textAlign: "center", padding: "2rem" }}>Select a renovation type above to see your complete shot list</div>
          )}
        </div>
      </div>
    </div>
  );
}

