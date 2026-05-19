import { useState } from 'react';

const findings = [
  { id: "mortar", label: "Fresh Mortar Repairs in Brick", emoji: "🧱", desc: "Freshly colored mortar filling cracks in brick veneer is the most common sign of recent foundation movement and attempted repair. New mortar = lighter or mismatched color vs surrounding brick.", assessment: "Look at brick mortar joints above garage doors, window corners, and along rooflines. Fresh lighter-colored mortar = prior crack. Multiple repair zones = active or recent movement. Flag for full engineering evaluation.", severity: "High" },
  { id: "garage", label: "Garage Door Frame Alignment", emoji: "🚗", desc: "A racked garage door frame — where the opening is parallelogram-shaped rather than rectangular — is one of the most reliable drive-by indicators of significant foundation movement.", assessment: "From the street, look at garage door opening edges. Tilt in the frame = foundation has moved unevenly. Combined with brick cracks = strong flag for engineer inspection before offer.", severity: "High" },
  { id: "chimney", label: "Gap Between Chimney and House", emoji: "🏚️", desc: "A visible separation between a brick chimney and the main house structure means the chimney footing has moved independently from the slab. Common in DFW expansive clay.", assessment: "Look for visible daylight gaps along chimney-to-house joint at roofline or siding edge. Any gap = foundation differential movement. Requires full structural evaluation.", severity: "High" },
  { id: "piers", label: "Visible Pier Pockets on Slab Edge", emoji: "📍", desc: "Concrete pier pocket indentations visible along the exposed slab edge indicate prior pressed or drilled pier installation. More pockets = more prior repair scope.", assessment: "Walk the perimeter if visible or view from driveway/side yard. Count pier pockets. 0-4 = minor prior work. 5-10 = moderate. 10+ = significant prior foundation repair. Ask for all engineering and warranty documents.", severity: "Medium" },
];

export default function DFWFoundationDriveBy2026B() {
  const [selected, setSelected] = useState<string | null>(null);

  const severityColor = (s: string) => s === "High" ? "#ef4444" : s === "Medium" ? "#f59e0b" : "#22c55e";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Foundation Drive-By Assessment Guide 2026 (Part 2)</h1>
        <p style={{ color: "#94a3b8", marginBottom: 10, fontSize: 15 }}>Advanced drive-by foundation assessment for DFW pre-purchase evaluation — indicators that signal prior repair, active movement, or deferred structural issues.</p>
        <div style={{ background: "#1e2d45", borderRadius: 8, padding: "10px 14px", marginBottom: 28 }}>
          <span style={{ color: "#F5E642", fontWeight: 700, fontSize: 12 }}>Part 2 of 2</span>
          <span style={{ color: "#94a3b8", fontSize: 12, marginLeft: 8 }}>See Part 1 for basic drive-by foundation signs. This guide covers advanced indicators.</span>
        </div>

        <div style={{ color: "#F5E642", fontSize: 12, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>SELECT A FINDING TYPE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
          {findings.map(f => (
            <div key={f.id} onClick={() => setSelected(selected === f.id ? null : f.id)}
              style={{ background: selected === f.id ? "#132035" : "#0d1a2b", border: "1px solid " + (selected === f.id ? "#F5E642" : "#1e2d45"), borderRadius: 12, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{f.emoji}</span>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{f.label}</div>
                </div>
                <span style={{ background: severityColor(f.severity) + "22", color: severityColor(f.severity), fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>{f.severity}</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>{f.desc}</p>
              {selected === f.id && (
                <div style={{ marginTop: 14, background: "#1e2d45", borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔍 Drive-By Assessment</div>
                  <p style={{ color: "#e2e8f0", fontSize: 13 }}>{f.assessment}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#132035", border: "1px solid #F5E642", borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔒 Get a ProLnk Foundation Engineer</div>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>Drive-by flags are pre-offer screening tools only. Charter foundation contractors on ProLnk provide engineer-supervised evaluations, written pier plans, and fully documented pre-purchase foundation reports.</p>
        </div>
      </div>
    </div>
  );
}
