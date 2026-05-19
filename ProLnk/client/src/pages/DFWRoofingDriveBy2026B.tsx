import { useState } from 'react';

const findings = [
  { id: "layers", label: "Shingle Layers at Rake Edge", emoji: "📐", desc: "Looking at the rake edge (slanted side edge of roof), you can often count visible shingle layers. Two layers = when this roof is replaced, a full tear-off is required, adding $1,500-$3,000 to replacement cost.", assessment: "Stand at the end of the house and look at the rake edge profile. One layer = standard. Two visible layers = higher replacement cost. Three layers = code violation in most DFW cities, requires full tear-off before any re-roofing.", severity: "High" },
  { id: "flashing", label: "Chimney Flashing Visibility", emoji: "🏚️", desc: "Improperly flashed chimneys are the most common source of roof leaks in DFW. From the street, you can assess whether step flashing and counter-flashing are visible at chimney base.", assessment: "Look for the metal flashing line at chimney-to-roof junction. Missing or severely rusted flashing visible from street = active or imminent leak risk. Flag for inspection with thermal imaging to detect existing moisture damage.", severity: "High" },
  { id: "boots", label: "Missing or Cracked Pipe Boots", emoji: "🔧", desc: "Rubber pipe boots seal plumbing vent penetrations through the roof. In DFW heat, rubber boots crack and fail in 7-10 years. Missing or visibly cracked boots = active leak source.", assessment: "Look at roof field for black rubber boot fittings around pipe penetrations (typically 1-3 visible from street). Degraded rubber = immediate repair item. Missing boots = water is entering at that penetration.", severity: "High" },
  { id: "patchwork", label: "Patchwork Color Inconsistency", emoji: "🎨", desc: "Visible color mismatches across the roof plane indicate partial shingle repairs. In DFW's hail environment, this often means a prior insurance claim was under-settled and only partial repair was completed.", assessment: "Step back and assess overall roof color uniformity. Distinct color bands or rectangular patches = prior repair. Combined with age 10+ years = likely more hail damage exists. Get a HAAG-certified inspection before offer.", severity: "Medium" },
];

export default function DFWRoofingDriveBy2026B() {
  const [selected, setSelected] = useState<string | null>(null);

  const severityColor = (s: string) => s === "High" ? "#ef4444" : s === "Medium" ? "#f59e0b" : "#22c55e";

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏚️ DFW Roofing Drive-By Assessment Guide 2026 (Part 2)</h1>
        <p style={{ color: "#94a3b8", marginBottom: 10, fontSize: 15 }}>Advanced drive-by roofing assessment for DFW pre-purchase evaluation — what experienced buyers identify before scheduling a full HAAG inspection.</p>
        <div style={{ background: "#1e2d45", borderRadius: 8, padding: "10px 14px", marginBottom: 28 }}>
          <span style={{ color: "#F5E642", fontWeight: 700, fontSize: 12 }}>Part 2 of 2</span>
          <span style={{ color: "#94a3b8", fontSize: 12, marginLeft: 8 }}>See Part 1 for basic drive-by roofing signs. This guide covers advanced indicators specific to DFW hail markets.</span>
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
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔒 Get a ProLnk HAAG-Certified Roofer</div>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>Drive-by flags are pre-offer screening only. Charter roofers on ProLnk are HAAG-certified, provide written hail damage assessments, photograph all findings, and document insurance-grade evidence for pre-purchase decisions.</p>
        </div>
      </div>
    </div>
  );
}
