import { useState } from 'react';

export default function DFWHomeownerConfidence2026() {
  const [level, setLevel] = useState<string>("");

  const guide: Record<string, { title: string; steps: string[] }> = {
    beginner: {
      title: "🏁 Start Here: Know Your Home",
      steps: [
        "📋 Locate your main water shutoff, electrical panel, and HVAC filter",
        "📸 Photograph every system and store in ProLnk Health Vault",
        "📅 Schedule annual HVAC service — DFW heat demands it",
        "🔍 Learn to spot foundation warning signs: diagonal cracks, sticking doors",
        "📞 Identify one trusted contractor per trade before you need them",
      ],
    },
    intermediate: {
      title: "⚙️ Level Up: Build Your System",
      steps: [
        "🗂️ Create a maintenance calendar: HVAC filters monthly, roof inspect annually",
        "💰 Budget 1–2% of home value per year for maintenance ($3K–$6K on $300K home)",
        "📝 Document every repair with contractor, date, and cost in Health Vault",
        "🌡️ Install a smart thermostat — DFW summers stress HVAC hard",
        "🔌 Have electrician audit your panel if home is 20+ years old",
      ],
    },
    advanced: {
      title: "🏆 Full Confidence: Proactive Ownership",
      steps: [
        "🧱 Get a foundation inspection every 3–5 years — DFW clay soil moves",
        "🪵 Know your roof age and material; plan replacement at 15–20 years",
        "💧 Inspect plumbing annually for corrosion, especially in older DFW builds",
        "📊 Track home health score in ProLnk Vault for resale documentation",
        "🤝 Refer neighbors to ProLnk — earn origination income on their homes",
      ],
    },
  };

  const systems = [
    { icon: "❄️", name: "HVAC", tip: "Replace filters monthly in DFW summers. Service annually." },
    { icon: "💧", name: "Plumbing", tip: "Know shutoff location. Watch for slow drains and water pressure drops." },
    { icon: "⚡", name: "Electrical", tip: "Test GFCI outlets monthly. Upgrade panels over 150A if pre-2000." },
    { icon: "🧱", name: "Foundation", tip: "DFW clay soil shifts seasonally. Water perimeter in drought." },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Homeowner Confidence Guide 2026
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Know your systems. Build your team. Own with confidence.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {systems.map((s) => (
            <div key={s.name} style={{ background: "#1E2D45", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 4 }}>{s.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12 }}>📍 What is your current confidence level?</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["beginner", "intermediate", "advanced"].map((l) => (
              <button key={l} onClick={() => setLevel(l)} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: level === l ? "#F5E642" : "#0A1628",
                color: level === l ? "#0A1628" : "#94A3B8",
                fontWeight: 700, fontSize: 13, textTransform: "capitalize",
              }}>{l}</button>
            ))}
          </div>
        </div>

        {level && guide[level] && (
          <div style={{ background: "#132137", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #F5E642" }}>
            <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>{guide[level].title}</div>
            {guide[level].steps.map((step, i) => (
              <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 10, paddingLeft: 8, borderLeft: "2px solid #F5E642" }}>
                {step}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>🔐</div>
          <div style={{ color: "#0A1628", fontWeight: 800, fontSize: 16, marginTop: 8 }}>ProLnk Health Vault</div>
          <div style={{ color: "#1E2D45", fontSize: 13, marginTop: 6 }}>Document every system. Build verifiable home history. Protect your largest asset.</div>
        </div>
      </div>
    </div>
  );
}
