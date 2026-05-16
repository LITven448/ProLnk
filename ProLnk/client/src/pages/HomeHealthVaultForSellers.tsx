import { useState } from 'react';

export default function HomeHealthVaultForSellers() {
  const [years, setYears] = useState(5);
  const premium = Math.round(years * 1.4 * 1000);
  const inspSavings = Math.round(years * 0.3 * 1000);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", marginBottom: 12 }}>Sell Faster. Sell Higher.</h1>
          <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
            Homes with a complete ProLnk Vault command higher offers, close faster, and face 37% fewer inspection surprises.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "📈", stat: "+4.2%", label: "Average sale price premium for documented homes" },
            { icon: "⚡", stat: "12 days", label: "Faster average closing vs. undocumented properties" },
            { icon: "🔍", stat: "37% fewer", label: "Inspection surprises that kill deals or reduce price" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#0f1f3d", borderRadius: 12, padding: 20, textAlign: "center", border: "1px solid #1e3a6e" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#F5E642", marginBottom: 6 }}>{item.stat}</div>
              <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 16, padding: 28, border: "1px solid #1e3a6e", marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginBottom: 6 }}>Why Buyers Pay More</h2>
          {[
            { icon: "✅", text: "Full service history removes guesswork — buyers know exactly what they are getting" },
            { icon: "✅", text: "Documented warranties transfer, adding tangible value buyers can calculate" },
            { icon: "✅", text: "Safety records (mold, radon, electrical) eliminate negotiation leverage for buyers" },
            { icon: "✅", text: "ProLnk-verified contractors add credibility buyers cannot dispute" },
            { icon: "✅", text: "Foundation and roof history eliminates the #1 source of post-inspection price drops" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ color: "#F5E642", fontSize: 16, marginTop: 2 }}>{item.icon}</span>
              <span style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.6 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 16, padding: 28, border: "1px solid #F5E642" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginBottom: 6 }}>Estimate Your Value Premium</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>How many years of Vault records do you have?</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ color: "#94a3b8", width: 50 }}>1 yr</span>
            <input type="range" min={1} max={15} value={years} onChange={(e) => setYears(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#F5E642" }} />
            <span style={{ color: "#94a3b8", width: 50 }}>{years} yrs</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>Estimated Price Premium</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#F5E642" }}>+${premium.toLocaleString()}</div>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>Inspection Savings</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#F5E642" }}>~${inspSavings.toLocaleString()}</div>
            </div>
          </div>
          <div style={{ color: "#64748b", fontSize: 12, textAlign: "center", marginTop: 12 }}>Based on ProLnk transaction data. Individual results vary by market and property.</div>
        </div>
      </div>
    </div>
  );
}