import { useState } from 'react';

const sinkTypes = [
  { type: "Undermount", icon: "⬇️", compatible: ["Quartz", "Granite", "Marble", "Quartzite"], notCompatible: ["Tile", "Laminate", "Butcher Block (near water)"], notes: "Requires solid stone countertop — the sink mounts below the surface. Cleanest look, most popular in DFW kitchens." },
  { type: "Drop-In (Top Mount)", icon: "⬆️", compatible: ["All countertop types"], notCompatible: [], notes: "Sits on top of the counter. Works with any material — ideal for laminate or tile where undermount is not an option." },
  { type: "Farmhouse / Apron Front", icon: "🏡", compatible: ["Quartz", "Granite", "Butcher Block (island only)"], notCompatible: ["Tile", "Laminate"], notes: "Apron front sinks require structural cabinet modification. Popular in DFW farmhouse and transitional kitchens." },
];

const countertopSinkGuide: Record<string, { sinks: string[]; tip: string }> = {
  "Quartz": { sinks: ["Undermount (best match)", "Drop-In", "Farmhouse with modified cabinet"], tip: "Undermount pairs perfectly with quartz — no grout lines to trap DFW hard water deposits. Zero-radius corners are on trend in DFW in 2026." },
  "Granite": { sinks: ["Undermount (most popular)", "Drop-In", "Farmhouse"], tip: "Any sink works with granite. Undermount is the DFW standard — fabricators cut the opening on-site and polish the edges for a seamless look." },
  "Marble": { sinks: ["Undermount (recommended)", "Drop-In"], tip: "Farmhouse sinks with marble are possible but rare in DFW due to apron edge chipping risk. Undermount with a zero-radius sink minimizes exposed stone edges." },
  "Butcher Block": { sinks: ["Drop-In only (near wood)", "Undermount with secondary material at sink zone"], tip: "Never undermount directly into butcher block near a sink. Use a different material (quartz or granite) for the sink section, then butcher block for the rest." },
  "Tile": { sinks: ["Drop-In only"], tip: "Tile countertops cannot support undermount sinks — the rim hangs on tile which can crack. Drop-in is the only safe option for DFW tile counters." },
};

export default function DFWSinkCountertopIntegrationGuide2026() {
  const [countertop, setCountertop] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏡 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>DFW Sink & Countertop Integration Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>Your sink and countertop must work together structurally. Wrong combination = cracks, leaks, or costly reinstalls in DFW homes.</p>

        <h2 style={{ color: "#F5E642″, fontSize: "1.25rem", marginBottom: "1rem" }}>DFW Sink Type Overview</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {sinkTypes.map((s) => (
            <div key={s.type} style={{ background: "#1a2744″, borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{s.type}</span>
              </div>
              <p style={{ color: "#94a3b8″, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{s.notes}</p>
              <div style={{ display: "flex", gap: "2rem" }}>
                <div>
                  <div style={{ color: "#22c55e", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>WORKS WITH</div>
                  {s.compatible.map((c) => <div key={c} style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>✅ {c}</div>)}
                </div>
                {s.notCompatible.length > 0 && (
                  <div>
                    <div style={{ color: "#ef4444″, fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem" }}>AVOID WITH</div>
                    {s.notCompatible.map((c) => <div key={c} style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>❌ {c}</div>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.25rem", marginBottom: "1rem" }}>🎯 Find Compatible Sinks for Your DFW Countertop</h2>
        <div style={{ background: "#1a2744″, borderRadius: 12, padding: "1.5rem" }}>
          <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>SELECT YOUR COUNTERTOP MATERIAL</label>
          <select
            value={countertop}
            onChange={(e) => setCountertop(e.target.value)}
            style={{ display: "block", width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #2d3f6b", fontSize: "1rem", marginBottom: "1rem" }}
          >
            <option value="">— Select countertop material —</option>
            {Object.keys(countertopSinkGuide).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          {countertop && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Compatible DFW Sink Options:</div>
              {countertopSinkGuide[countertop].sinks.map((s) => <div key={s} style={{ color: "#22c55e", fontSize: "0.9rem", marginBottom: "0.25rem" }}>✅ {s}</div>)}
              <div style={{ color: "#94a3b8″, fontSize: "0.9rem", marginTop: "0.75rem" }}>{countertopSinkGuide[countertop].tip}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", background: "#1a2744″, borderRadius: 10, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>🔑 DFW Pro Tip: Zero-Radius vs Radius Corners</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>Zero-radius (square corner) sinks are trending in DFW modern kitchens but are harder to clean in the corners. Radius (rounded) corners are easier to wipe down — a practical edge in DFW kitchens where hard water leaves deposits in tight angles.</div>
        </div>
      </div>
    </div>
  );
}