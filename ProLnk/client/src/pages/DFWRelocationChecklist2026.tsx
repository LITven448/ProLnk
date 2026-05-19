import { useState } from 'react';

const profiles = [
  { label: "Single / Couple", tasks: ["Get TX driver license (90 days)","Register vehicle in TX","Update voter registration","Set up electricity (Oncor)","Choose internet provider","Open TX bank account","Find a local doctor / dentist","Get renters or home insurance","Find emergency contractor via ProLnk"] },
  { label: "Family with Kids", tasks: ["Enroll kids in school ASAP (bring records)","Get TX driver license (90 days)","Register all vehicles","Find pediatrician","Set up utilities (Oncor, gas, water)","Locate nearest urgent care","Join neighborhood Facebook / Nextdoor","Schedule home inspection with ProLnk","Set up lawn care service"] },
  { label: "Remote Worker", tasks: ["Confirm TX residency for tax purposes","Port office address if needed","Get TX driver license (90 days)","Set up high-speed fiber internet","Build your contractor list via ProLnk","Join local coworking space","Find local coffee shop network","Register vehicle","Update LLC/business address if needed"] },
];

export default function DFWRelocationChecklist2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>✅</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>DFW Relocation Checklist 2026</h1>
          <p style={{ color: "#9CA3AF", fontSize: 17 }}>Everything to set up in your first 30 days as a new Texas resident.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 36 }}>
          {[["🪪","TX Driver License","Must update within 90 days of establishing TX residency"],["🚗","Vehicle Registration","Register at county tax office — bring title, insurance, ID"],["🗳️","Voter Registration","Can register online at texas.gov — 30 days before next election"],["💡","Utilities","Oncor is your electric grid — choose your retail provider at PowertoChoose.org"]].map(([icon,title,desc]) => (
            <div key={title as string} style={{ background: "#1a2a44″, borderRadius: 12, padding: 18, borderLeft: "3px solid #F5E642" }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginTop: 8 }}>{title as string}</div>
              <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 6 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>📋 Your 30-Day Priority List</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>Select your situation for a customized checklist:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {profiles.map((p, i) => (
              <button key={p.label} onClick={() => setSelected(i === selected ? null : i)} style={{ background: selected === i ? "#F5E642″ : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "2px solid #F5E642", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628″, borderRadius: 12, padding: 20 }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12 }}>Your 30-Day DFW Checklist:</div>
              <div style={{ display: "grid", gap: 8 }}>
                {profiles[selected].tasks.map((t, idx) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, color: "#9CA3AF", fontSize: 14 }}>
                    <span style={{ color: "#F5E642″, fontWeight: 700, minWidth: 24 }}>{idx + 1}.</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 10 }}>🔧 Find Contractors Before You Need Them</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 14 }}>The worst time to find a plumber is when your pipes burst at 2am. Use ProLnk to build your go-to contractor list in week one — before any emergency hits.</p>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 14, color: "#F5E642", fontWeight: 700, textAlign: "center" }}>
            🏡 prolnk.io — Line Up Your DFW Contractors on Day One
          </div>
        </div>
      </div>
    </div>
  );
}

