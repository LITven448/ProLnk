import { useState } from 'react';

const plumberTypes: Record<string, { tools: { name: string; why: string }[] }> = {
  "Slab Leak Specialist": {
    tools: [
      { name: "Acoustic Leak Detector (Sewerin Aquaphon)", why: "DFW clay soil shifts constantly — pinpoint leaks under concrete without jackhammer guesswork" },
      { name: "Pipe Camera (RIDGID SeeSnake)", why: "Verify pipe condition and exact leak location before any demo" },
      { name: "Helium Leak Tracer", why: "Confirm hairline slab leaks when acoustic signal is ambiguous — DFW limestone substrate creates false readings" },
      { name: "Concrete Jackhammer (SDS Max)", why: "Access confirmed slab leak points — DFW foundations average 4-inch slab thickness" },
      { name: "Manometer / Pressure Test Kit", why: "Pre- and post-repair pressure verification — required for insurance documentation" },
    ],
  },
  "Remodel / Repipe": {
    tools: [
      { name: "PEX Expander Tool (Uponor or Viega)", why: "DFW remodels shifting to PEX-A — faster than copper, better freeze resistance" },
      { name: "Press Tool (ProPress M12 or Milwaukee)", why: "No-torch copper connections — safer in occupied DFW homes, faster than solder" },
      { name: "Pipe Bender (manual + electric for 1-inch+)", why: "Copper and rigid runs in tight DFW attic spaces" },
      { name: "Stud Finder + Inspection Camera", why: "Navigate existing walls without unnecessary demo in DFW remodels" },
      { name: "Flow Rate Gauge", why: "Verify supply pressure meets DFW code (40-80 PSI at meter)" },
    ],
  },
  "Drain / Sewer": {
    tools: [
      { name: "Sewer Camera (RIDGID SeeSnake Max)", why: "DFW root intrusion from live oak and cedar is epidemic — camera before hydrojetting" },
      { name: "Hydro Jetter (1500-4000 PSI)", why: "Grease and root clearing in DFW municipal sewer laterals" },
      { name: "Pipe Locator (Metrotech 810)", why: "Trace cast iron and clay tile lines in DFW homes pre-1980″ },
      { name: "Manometer Set", why: "Verify drain grade and slope — DFW flatlands cause chronic low-slope drain failures" },
      { name: "Drum Machine (Ridgid K-400)", why: "Mainline clearing in 3-4 inch lines for DFW residential" },
    ],
  },
};

export default function DFWPlumbingProTools2026() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔧</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.9rem", fontWeight: 800, margin: "0.5rem 0" }}>
            DFW Plumbing Pro Essential Tools Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            What DFW plumbers need — specialized for slab leaks, remodels, and drain work
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Select Your DFW Plumber Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {Object.keys(plumberTypes).map((k) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                style={{
                  background: selected === k ? "#F5E642″ : "#1e3a5f",
                  color: selected === k ? "#0A1628″ : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.6rem 1.2rem",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🧰 Priority Tools: {selected}</h3>
            {plumberTypes[selected].tools.map((t, i) => (
              <div key={i} style={{ background: "#162d4a", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.25rem" }}>{i + 1}. {t.name}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{t.why}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>🏆 ProLnk Charter Plumbers — First Match Priority in DFW</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>Locked $149/mo · 12% direct commission · Exclusive DFW slab leak lead data</div>
        </div>
      </div>
    </div>
  );
}
