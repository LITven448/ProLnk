import { useState } from 'react';

const caMap = [
  { ca: "Los Angeles", dfw: "Uptown Dallas / Plano", savings: "$42,000/yr", note: "Similar urban density, but half the rent. Plano for quieter vibe." },
  { ca: "San Francisco", dfw: "Frisco / Allen", savings: "$68,000/yr", note: "Tech transplants love North Dallas suburbs — great schools, no income tax." },
  { ca: "San Diego", dfw: "Southlake / Colleyville", savings: "$38,000/yr", note: "Outdoor lifestyle translates well. Trade ocean for lakes and golf." },
  { ca: "Sacramento", dfw: "McKinney / Prosper", savings: "$29,000/yr", note: "Similar suburban feel, much faster growth, better home values." },
];

export default function MovingFromCaliforniaToDFW2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#F5E642", margin: "12px 0 8px" }}>Moving from California to DFW 2026</h1>
          <p style={{ color: "#9CA3AF", fontSize: 17 }}>Over 100,000 Californians moved to Texas last year. Here is what you need to know.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 36 }}>
          {[["💰","No State Income Tax","Save 9.3–13.3% on your income vs CA"],["🏠","Property Tax Shock","TX rate is 2.1% vs CA 1.1% — budget for this"],["🏡","HOA Culture","Most DFW suburbs are HOA-governed — review CC&Rs"],["🌡️","Summer vs CA","DFW summer = 100°F+ heat. No ocean breeze. Budget for AC."]].map(([icon,title,desc]) => (
            <div key={title as string} style={{ background: "#1a2a44", borderRadius: 12, padding: 18, borderLeft: "3px solid #F5E642" }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginTop: 8 }}>{title as string}</div>
              <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 6 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a44", borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 12 }}>📊 Cost of Living Comparison</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {[["Median Home Price","$1.1M LA / $680K SF","$385K DFW avg"],["Monthly Rent (2BR)","$3,200–$4,800","$1,600–$2,200"],["Gas","$4.80/gal avg","$3.10/gal avg"],["State Income Tax","9.3–13.3%","0%"],["Average Savings","—","$25,000–$65,000/yr"]].map(([item,ca,tx]) => (
              <div key={item} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, background: "#0A1628", borderRadius: 8, padding: "10px 14px", fontSize: 14 }}>
                <span style={{ color: "#9CA3AF" }}>{item}</span>
                <span style={{ color: "#ef4444" }}>{ca}</span>
                <span style={{ color: "#22c55e" }}>{tx}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a2a44", borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 16 }}>🗺️ Where Should You Land?</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>Pick your California city to see your DFW equivalent:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            {caMap.map((m, i) => (
              <button key={m.ca} onClick={() => setSelected(i === selected ? null : i)} style={{ background: selected === i ? "#F5E642" : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "2px solid #F5E642", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {m.ca}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628", borderRadius: 12, padding: 20 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>DFW Match: {caMap[selected].dfw}</div>
              <div style={{ color: "#22c55e", fontWeight: 700, marginBottom: 8 }}>Estimated savings: {caMap[selected].savings}</div>
              <div style={{ color: "#9CA3AF" }}>{caMap[selected].note}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1a2a44", borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 10 }}>🔧 Get Home Services Lined Up</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 14 }}>DFW home maintenance is different — foundation care, hail damage, hard water. ProLnk connects you with vetted local contractors who know DFW homes.</p>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 14, color: "#F5E642", fontWeight: 700, textAlign: "center" }}>
            🏡 prolnk.io — DFW Contractors, Ready When You Are
          </div>
        </div>
      </div>
    </div>
  );
}

