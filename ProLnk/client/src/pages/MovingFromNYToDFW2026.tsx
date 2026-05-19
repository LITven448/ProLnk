import { useState } from 'react';

const boroughMap = [
  { borough: "Manhattan", dfw: "Uptown Dallas", note: "Walkable, upscale, great restaurants. Rent is 35% cheaper. You will need a car for anything outside of Uptown." },
  { borough: "Brooklyn", dfw: "Deep Ellum / Bishop Arts", note: "Arts scene, local restaurants, creative culture. Very similar energy, zero subway though." },
  { borough: "Queens", dfw: "Irving / Garland", note: "Diverse, international food, working-class roots. Irving is also home to DFW Airport." },
  { borough: "The Bronx", dfw: "Grand Prairie / Mesquite", note: "Affordable, real community, blue-collar. Mesquite has that same practical no-frills energy." },
  { borough: "Staten Island", dfw: "Southlake / Grapevine", note: "Suburban, family-oriented, proud of itself. Southlake is Texas Staten Island — but fancier." },
];

export default function MovingFromNYToDFW2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🗽</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>Moving from New York to DFW 2026</h1>
          <p style={{ color: "#9CA3AF", fontSize: 17 }}>Avg 35% cheaper cost of living. No state income tax. No subway either — get ready to drive.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 36 }}>
          {[["🚗","Car is Mandatory","DFW has no real subway. Every errand requires a car. Budget $400-800/mo for car + insurance."],["💸","Cost Savings","Average New Yorker saves $25,000-$45,000/yr after moving to DFW"],["🤝","Southern Culture","People wave. Strangers say hi. Doors get held open. It is different — in a good way."],["💧","Humidity vs Cold","Swap NY winters for DFW summers. June–Sept is brutal heat, but winters are mild."]].map(([icon,title,desc]) => (
            <div key={title as string} style={{ background: "#1a2a44″, borderRadius: 12, padding: 18, borderLeft: "3px solid #F5E642" }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginTop: 8 }}>{title as string}</div>
              <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 6 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 12 }}>📊 NYC vs DFW Reality Check</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {[["1BR Rent","$3,500–$5,000/mo","$1,200–$1,700/mo"],["State Income Tax","10.9% + NYC 3.9%","0%"],["Monthly MetroCard vs Gas","$132″,"$120 gas + $400 car payment"],["Avg Home Price","$900K+","$380K"],["Restaurant meal (nice)","$80–$120 for 2","$45–$65 for 2"]].map(([item,ny,dfw]) => (
              <div key={item} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, background: "#0A1628″, borderRadius: 8, padding: "10px 14px", fontSize: 14 }}>
                <span style={{ color: "#9CA3AF" }}>{item}</span>
                <span style={{ color: "#ef4444″ }}>{ny}</span>
                <span style={{ color: "#22c55e" }}>{dfw}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>🗺️ Your Borough → DFW Neighborhood</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>Select your NY borough to find your DFW equivalent:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            {boroughMap.map((b, i) => (
              <button key={b.borough} onClick={() => setSelected(i === selected ? null : i)} style={{ background: selected === i ? "#F5E642″ : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "2px solid #F5E642", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {b.borough}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628″, borderRadius: 12, padding: 20 }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Your DFW match: {boroughMap[selected].dfw}</div>
              <div style={{ color: "#9CA3AF" }}>{boroughMap[selected].note}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 10 }}>🔧 Set Up Your New DFW Home</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 14 }}>DFW homes need regular maintenance NY apartments never required — AC service, foundation watering, hail inspections. ProLnk finds you vetted local pros fast.</p>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 14, color: "#F5E642", fontWeight: 700, textAlign: "center" }}>
            🏡 prolnk.io — DFW Home Services, No Borough Tax
          </div>
        </div>
      </div>
    </div>
  );
}

