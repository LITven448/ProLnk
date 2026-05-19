import { useState } from 'react';

const situations = [
  { label: "Elderly parents moving in", solution: "In-law suite with separate entrance + ADA bath", cost: "$55–90K" },
  { label: "Adult children returning", solution: "Bonus room conversion with kitchenette + private bath", cost: "$40–65K" },
  { label: "Multi-family buying together", solution: "Detached ADU on rear lot + separate utilities", cost: "$80–150K" },
  { label: "Grandparents + grandkids", solution: "Main-floor bedroom suite + accessible bath + connecting door", cost: "$45–75K" },
];

const considerations = [
  { icon: "🚪", title: "Separate Entrance", desc: "Critical for privacy — exterior door from suite to yard or driveway" },
  { icon: "🔊", title: "Sound Insulation", desc: "Add R-13+ insulation in shared walls, resilient channel on ceilings" },
  { icon: "🔑", title: "Lockable Interior Door", desc: "Keyed passage between main home and suite gives optional connection" },
  { icon: "💡", title: "Separate Meter", desc: "Optional but recommended for long-term co-living; ~$2,500 to split" },
  { icon: "🏗️", title: "Permitting", desc: "DFW cities vary — Frisco and Plano require ADU permits; check local code" },
];

export default function DFWMultigenerationalHomeGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
            DFW Multigenerational Home Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>
            35% of DFW homeowners now live in multigenerational households — here is how to set yours up right.
          </p>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>📊 Key Stats</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[["35%", "DFW multigenerational rate"], ["$40–90K", "In-law suite conversion"], ["2–4 mo", "Typical project timeline"]].map(([val, lbl]) => (
              <div key={lbl} style={{ background: "#0A1628″, borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ color: "#F5E642″, fontSize: 22, fontWeight: 700 }}>{val}</div>
                <div style={{ color: "#94A3B8″, fontSize: 12, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🏡 Select Your Situation</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {situations.map((s, i) => (
              <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? "#1a3a6b" : "#0A1628″, border: `2px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: 14, cursor: "pointer" }}>
                <div style={{ fontWeight: 600, marginBottom: selected === i ? 8 : 0 }}>{s.label}</div>
                {selected === i && (
                  <div style={{ color: "#94A3B8″, fontSize: 14 }}>
                    <div>✅ {s.solution}</div>
                    <div style={{ color: "#F5E642″, marginTop: 4 }}>💰 Estimated cost: {s.cost}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🔑 Privacy Considerations</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {considerations.map((c) => (
              <div key={c.title} style={{ background: "#0A1628″, borderRadius: 8, padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ color: "#94A3B8″, fontSize: 14 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <h3 style={{ color: "#0A1628″, fontWeight: 700, margin: "0 0 8px" }}>Ready to Convert Your Space?</h3>
          <p style={{ color: "#1a2a4a", fontSize: 14, margin: "0 0 12px" }}>ProLnk connects you with DFW contractors who specialize in multigenerational conversions.</p>
          <button style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
