import { useState } from 'react';

const cities: Record<string, { office: string; phone: string; website: string; online: boolean; timeline: string; notes: string }> = {
  Dallas: { office: "Dallas Building Inspection Department", phone: "214-671-3780″, website: "dallascityhall.com", online: true, timeline: "7–21 business days", notes: "Online permits available for residential. Walk-ins at 320 E. Jefferson Blvd." },
  "Fort Worth": { office: "Fort Worth Development Services", phone: "817-392-2222″, website: "fortworthtexas.gov", online: true, timeline: "5–15 business days", notes: "ProjectDox system for online submissions. Inspections scheduled via portal." },
  Plano: { office: "Plano Building Inspections", phone: "972-941-7151″, website: "plano.gov", online: true, timeline: "5–10 business days", notes: "Most residential permits issued over-the-counter same day for simple projects." },
  Frisco: { office: "Frisco Development Services", phone: "972-292-5000″, website: "friscotexas.gov", online: true, timeline: "7–14 business days", notes: "Avolve ProjectDox portal. Separate fees for plan review vs. permit issuance." },
  McKinney: { office: "McKinney Building Inspections", phone: "972-547-7400″, website: "mckinneytexas.org", online: true, timeline: "7–14 business days", notes: "Online portal for new construction. Simple permits same-day in person." },
  Arlington: { office: "Arlington Development Services", phone: "817-459-6502″, website: "arlingtontx.gov", online: false, timeline: "10–20 business days", notes: "In-person submission required for most residential permits at City Hall." },
  Irving: { office: "Irving Building Services", phone: "972-721-2424″, website: "cityofirving.org", online: true, timeline: "7–14 business days", notes: "ePermit system available. HVAC and plumbing permits processed quickly." },
  Garland: { office: "Garland Inspection Services", phone: "972-205-2300″, website: "garlandtx.gov", online: true, timeline: "7–14 business days", notes: "Online and walk-in available. Pre-application meetings recommended for large projects." },
};

export default function DFWPermitOfficeGuide2026() {
  const [selected, setSelected] = useState("Dallas");
  const info = cities[selected];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>📋</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", marginBottom: ".5rem" }}>DFW Building Permit Offices 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Where to get permits in DFW — each city is independent, timelines vary widely</p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🏙️ Select Your DFW City</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "#1a3a5c", color: "#fff", border: "1px solid #F5E642″, fontSize: "1rem" }}
          >
            {Object.keys(cities).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {info && (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″, marginBottom: ".75rem" }}>🏛️ {info.office}</div>
              <div style={{ display: "grid", gap: ".5rem" }}>
                <div style={{ color: "#94a3b8″ }}>📞 <span style={{ color: "#fff" }}>{info.phone}</span></div>
                <div style={{ color: "#94a3b8″ }}>🌐 <span style={{ color: "#fff" }}>{info.website}</span></div>
                <div style={{ color: "#94a3b8″ }}>💻 Online Permits: <span style={{ color: info.online ? "#22c55e" : "#ef4444" }}>{info.online ? "✅ Available" : "❌ In-person only"}</span></div>
                <div style={{ color: "#94a3b8″ }}>⏱️ Typical Timeline: <span style={{ color: "#F5E642" }}>{info.timeline}</span></div>
              </div>
              <div style={{ marginTop: "1rem", padding: ".75rem", background: "#0A1628″, borderRadius: 8, color: "#94a3b8", fontSize: ".9rem" }}>
                💡 {info.notes}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", marginTop: "1.5rem" }}>
          <h3 style={{ color: "#F5E642″, marginBottom: "1rem" }}>📝 What Typically Requires a Permit in DFW</h3>
          {[
            "Roofing replacement (most DFW cities require permit)",
            "HVAC replacement or new installation",
            "Electrical panel upgrades or new circuits",
            "Plumbing work beyond fixture replacement",
            "Room additions, garages, or structural changes",
            "Fence over 6 feet or new pool installation",
          ].map(s => (
            <div key={s} style={{ display: "flex", gap: ".75rem", marginTop: ".75rem", color: "#94a3b8″ }}>
              <span style={{ color: "#F5E642″ }}>→</span> {s}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#64748b", fontSize: ".85rem" }}>
          ProLnk contractors handle permit applications as part of every project. Data current as of 2026.
        </div>
      </div>
    </div>
  );
}