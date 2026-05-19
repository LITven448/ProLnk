import { useState } from 'react';

export default function DFWHomeAppreciationGuide2026() {
  const [homeAge, setHomeAge] = useState<string>("");
  const [condition, setCondition] = useState<string>("");

  const strategies: Record<string, Record<string, { title: string; steps: string[] }>> = {
    new: {
      great: {
        title: "✨ New + Great Condition: Build the Foundation",
        steps: [
          "📸 Document everything now in Health Vault — create baseline records",
          "🌿 Invest in landscaping: DFW curb appeal drives 5–10% premium",
          "🍳 Kitchen updates deliver 70–80% ROI in DFW market",
          "📋 Keep all warranties organized — HVAC, appliances, roof",
          "🤝 Join ProLnk now to originate neighbors and earn passive income",
        ],
      },
      fair: {
        title: "🛠️ New + Fair Condition: Stop the Slide Early",
        steps: [
          "❄️ Prioritize HVAC service immediately — DFW heat is unforgiving",
          "🧱 Check foundation for early signs — fix minor issues before major ones",
          "💧 Address any plumbing slow-drains now to avoid future damage",
          "📊 Get Health Vault current — document everything before selling",
          "💰 Budget 2% home value for catch-up maintenance this year",
        ],
      },
    },
    older: {
      great: {
        title: "🏆 Older + Great Condition: Market It Right",
        steps: [
          "📝 Health Vault documentation is your competitive advantage at resale",
          "🔌 Electrical panel upgrade if pre-2000 — buyers flag old panels",
          "💧 Re-pipe if original copper or galvanized — DFW water is hard",
          "🪵 Proactive roof replacement communicates pride of ownership",
          "🎯 ProLnk Health Score above 80 adds verifiable value at closing",
        ],
      },
      fair: {
        title: "⚠️ Older + Fair Condition: Strategic Triage",
        steps: [
          "🧱 Foundation inspection first — DFW clay moves most in older homes",
          "❄️ HVAC replacement ROI is highest if system is 12+ years old",
          "🪵 Roof age above 15 years will kill deals — address proactively",
          "⚡ Electrical and plumbing updates protect insurability",
          "📋 Document all updates in Health Vault to justify list price",
        ],
      },
    },
  };

  const improvements = [
    { icon: "🍳", name: "Kitchen Update", roi: "70–80% ROI" },
    { icon: "❄️", name: "HVAC Replacement", roi: "85–100% ROI" },
    { icon: "🌿", name: "Curb Appeal", roi: "5–10% premium" },
    { icon: "🪵", name: "Roof Replacement", roi: "60–70% ROI" },
  ];

  const result = homeAge && condition ? strategies[homeAge]?.[condition] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📈</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Home Appreciation Strategy Guide 2026
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Deferred maintenance = 10–25% discount at closing. Protect your asset.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {improvements.map((imp) => (
            <div key={imp.name} style={{ background: "#1E2D45", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 24 }}>{imp.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginTop: 4 }}>{imp.name}</div>
              <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 4 }}>{imp.roi}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 10 }}>🏠 Home age?</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[["new", "Under 15 yrs"], ["older", "15+ years"]].map(([val, label]) => (
              <button key={val} onClick={() => setHomeAge(val)} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: homeAge === val ? "#F5E642" : "#0A1628",
                color: homeAge === val ? "#0A1628" : "#94A3B8",
                fontWeight: 700, fontSize: 13,
              }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 10 }}>🔍 Overall condition?</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[["great", "Well Maintained"], ["fair", "Needs Attention"]].map(([val, label]) => (
              <button key={val} onClick={() => setCondition(val)} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: condition === val ? "#F5E642" : "#0A1628",
                color: condition === val ? "#0A1628" : "#94A3B8",
                fontWeight: 700, fontSize: 13,
              }}>{label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: "#132137", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #F5E642" }}>
            <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>{result.title}</div>
            {result.steps.map((step, i) => (
              <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 10, paddingLeft: 8, borderLeft: "2px solid #F5E642" }}>
                {step}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>📋</div>
          <div style={{ color: "#0A1628", fontWeight: 800, fontSize: 16, marginTop: 8 }}>Health Vault = Verified Value</div>
          <div style={{ color: "#1E2D45", fontSize: 13, marginTop: 6 }}>Documented maintenance history commands premium pricing and faster closings in DFW.</div>
        </div>
      </div>
    </div>
  );
}
