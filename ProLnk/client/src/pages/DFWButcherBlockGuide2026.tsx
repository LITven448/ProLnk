import { useState } from 'react';

const oilSchedule = [
  { frequency: "Monthly (first 3 months)", reason: "New wood needs to be conditioned before it can resist DFW humidity swings" },
  { frequency: "Every 3 months (year 1)", reason: "DFW seasonal humidity changes (30% winter → 70%+ summer) stress untreated wood" },
  { frequency: "Every 6 months (ongoing)", reason: "Maintained butcher block is stable once fully seasoned in DFW environment" },
];

const situationGuide: Record<string, { verdict: string; advice: string }> = {
  "Island or peninsula, away from sink": { verdict: "✅ Great Fit for DFW", advice: "DFW butcher block thrives away from water. Oil every 3–6 months, and your island will be a warm, functional centerpiece for decades." },
  "Primary countertop surface adjacent to sink": { verdict: "⚠️ Proceed with Caution", advice: "Install butcher block away from the sink and use a different material (quartz or granite) for the sink surround. Constant moisture in DFW humidity causes warping and black mold at joints." },
  "Small kitchen, limited ventilation": { verdict: "⚠️ Monitor Closely", advice: "DFW summers drive indoor humidity high. Ensure kitchen ventilation is strong. A dehumidifier under 60% RH prevents cupping and joint separation in butcher block." },
  "High-end renovation, resale focus": { verdict: "✅ Strong DFW Resale Appeal", advice: "Butcher block adds warmth and organic contrast in DFW luxury kitchens. Pair with stone or quartz perimeter and use butcher block for the island only." },
};

export default function DFWButcherBlockGuide2026() {
  const [situation, setSituation] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏡 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>DFW Butcher Block Countertop Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>Butcher block brings warmth to DFW kitchens — but DFW humidity swings demand consistent oiling and smart placement. Here is what works.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌫️", title: "DFW Humidity Is the Enemy", body: "DFW swings from 30% winter humidity to 70%+ in summer. Untreated or improperly sealed butcher block will cup, warp, and develop joint separation within one DFW summer." },
            { icon: "🫙", title: "Oil Every 3–6 Months", body: "Use food-safe mineral oil or tung oil. Wipe on generously, let sit 20 minutes, wipe off excess. Never use olive oil — it turns rancid inside the wood in DFW heat." },
            { icon: "🚿", title: "Keep It Dry Near Sinks", body: "Constant moisture exposure near sinks causes black mold in wood joints — a DFW humidity nightmare. Use a secondary countertop material within 12 inches of any sink." },
            { icon: "🪵", title: "Renewable Surface", body: "Unlike stone, butcher block can be sanded and refinished when scratched or stained. This is a major long-term advantage in busy DFW households." },
          ].map((c) => (
            <div key={c.title} style={{ background: "#1a2744″, borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 600, marginBottom: "0.4rem" }}>{c.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{c.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.25rem", marginBottom: "1rem" }}>DFW Oiling Schedule</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {oilSchedule.map((s, i) => (
            <div key={i} style={{ background: "#1a2744″, borderRadius: 10, padding: "1rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ color: "#F5E642″, fontSize: "1.5rem", minWidth: 36 }}>🫙</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{s.frequency}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{s.reason}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.25rem", marginBottom: "1rem" }}>🎯 Is Butcher Block Right for Your DFW Home?</h2>
        <div style={{ background: "#1a2744″, borderRadius: 12, padding: "1.5rem" }}>
          <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>DESCRIBE YOUR DFW HOME SITUATION</label>
          <select
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            style={{ display: "block", width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: 8, background: "#0A1628″, color: "#fff", border: "1px solid #2d3f6b", fontSize: "1rem", marginBottom: "1rem" }}
          >
            <option value="">— Select your situation —</option>
            {Object.keys(situationGuide).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          {situation && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.4rem" }}>{situationGuide[situation].verdict}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{situationGuide[situation].advice}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", background: "#1a2744″, borderRadius: 10, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>🔑 DFW Pro Tip</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>End-grain butcher block is denser and more moisture-resistant than edge-grain — worth the 20% price premium in DFW humid conditions. Ask your DFW fabricator for end-grain if near a sink area is unavoidable.</div>
        </div>
      </div>
    </div>
  );
}