import { useState } from 'react';

export default function DFWFoundationDrainageSpec2026() {
  const [problem, setProblem] = useState("");

  const specs = [
    { label: "Pipe Size", value: "4-inch minimum perforated pipe", note: "Use 6-inch for large collection areas" },
    { label: "Gravel Type", value: "Clean washed, 3/4-inch angular", note: "No pea gravel — interlocks and clogs" },
    { label: "Fabric Sock", value: "Required for DFW clay soils", note: "Clay fines clog gravel without sock" },
    { label: "Minimum Slope", value: "1/8 inch per foot (1%)", note: "1/4 inch per foot preferred for DFW clay" },
    { label: "Depth", value: "Below top of grade beam", note: "Typically 18-24 inches for DFW foundations" },
    { label: "Outlet Location", value: "Daylight to street or retention", note: "Never outlet near neighbor property" },
    { label: "Gravel Depth", value: "6 inches below, 2 inches above pipe", note: "Wrap gravel completely in filter fabric" },
    { label: "Cleanout Access", value: "Every 50 feet or at each bend", note: "PVC cleanout with removable cap" },
  ];

  const problems = [
    { id: "pooling", label: "Water pools near foundation", spec: "4-inch perforated pipe at foundation perimeter, sloped 1/8 in/ft minimum, outlet to street. Fabric sock mandatory in DFW clay." },
    { id: "downspout", label: "Downspout drainage issues", spec: "Solid 4-inch pipe from downspout, transition to perforated at collection point, route to street or yard drain." },
    { id: "slope", label: "Yard slopes toward house", spec: "Interceptor trench drain perpendicular to slope, 50 feet minimum from foundation, connects to main French drain system." },
    { id: "garage", label: "Garage or slab flooding", spec: "Interior drain channel at low point, connects to sump pit or exterior daylighting drain with check valve." },
  ];

  const selected = problems.find(p => p.id === problem);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💧</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Foundation French Drain Specification Guide 2026
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>
            Proper French drain specs for Dallas-Fort Worth expansive clay soils
          </p>
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>Drainage Problem - Specification Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {problems.map(p => (
              <button key={p.id} onClick={() => setProblem(p.id)}
                style={{ background: problem === p.id ? "#F5E642" : "#0A1628", color: problem === p.id ? "#0A1628" : "#fff",
                  border: "1px solid #F5E642", borderRadius: 8, padding: "10px 12px", cursor: "pointer", fontSize: 13, textAlign: "left" }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, border: "1px solid #4ADE80" }}>
              <div style={{ color: "#4ADE80", fontWeight: 700, marginBottom: 8 }}>Recommended Specification:</div>
              <div style={{ color: "#CBD5E1", fontSize: 14 }}>{selected.spec}</div>
            </div>
          )}
          {!selected && <div style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>Select a problem above to see spec guidance</div>}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 12 }}>DFW French Drain Specifications</h2>
          {specs.map((s, i) => (
            <div key={i} style={{ background: "#1E293B", borderRadius: 8, padding: 14, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600 }}>{s.label}</span>
                <span style={{ color: "#F5E642", fontSize: 13, fontWeight: 700 }}>{s.value}</span>
              </div>
              <div style={{ color: "#64748B", fontSize: 12 }}>Note: {s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 20, border: "1px solid #EF4444" }}>
          <h2 style={{ color: "#EF4444", fontSize: 15, marginBottom: 12 }}>DFW Common Mistakes to Avoid</h2>
          {[
            "Using pea gravel — smooth stones interlock and trap fines, reducing flow",
            "Skipping fabric sock in clay soil — pipe clogs within 2-3 years",
            "Insufficient slope — water backs up in DFW flat terrain",
            "Outlet too close to foundation — recirculates water back to problem area",
            "Using flexible corrugated pipe — corrugations trap sediment, reduces lifespan"
          ].map((m, i) => (
            <div key={i} style={{ color: "#CBD5E1", fontSize: 13, marginBottom: 6, display: "flex", gap: 8 }}>
              <span style={{ color: "#EF4444" }}>X</span>{m}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, color: "#475569", fontSize: 12 }}>
          ProLnk Foundation Drainage Guide 2026 | Specifications for DFW expansive clay soils
        </div>
      </div>
    </div>
  );
}
