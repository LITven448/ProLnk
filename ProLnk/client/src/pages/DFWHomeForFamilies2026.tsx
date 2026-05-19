import { useState } from 'react';

const sizes = [
  { label: "2 kids (family of 4)", beds: "4BR min", yard: "Backyard 40x40 ft min", storage: "2-car garage + attic", district: "Frisco ISD / Plano ISD / Allen ISD" },
  { label: "3+ kids (family of 5+)", beds: "5BR or 4BR + flex", yard: "Fenced 50x50 ft min", storage: "3-car garage + walk-in attic", district: "Frisco ISD / Prosper ISD / Lewisville ISD" },
  { label: "Newborn on the way", beds: "3BR to 4BR within 5 yr", yard: "Safe fenced backyard", storage: "Nursery + stroller storage", district: "Any top-10 DFW district" },
  { label: "Blended family (6+)", beds: "5BR+ with 2 master options", yard: "Large lot 0.25 acre+", storage: "Dedicated playroom or bonus room", district: "McKinney ISD / Prosper ISD" },
];

const priorities = [
  { icon: "🏫", name: "School District", desc: "Top-rated DFW districts: Frisco, Plano, Allen, Prosper, Carroll (Southlake), Highland Park" },
  { icon: "🚶", name: "Walkability", desc: "Look for trails, parks within 0.5 mi; DFW averages low walkability -- verify per subdivision" },
  { icon: "🏊", name: "Community Amenities", desc: "HOA pool, splash pad, sports courts, playgrounds -- reduces activity spending by ~$3,000/yr" },
  { icon: "🛒", name: "Grocery + Errands", desc: "HEB, Tom Thumb, Kroger within 5 min -- critical for large family weekly haul" },
  { icon: "🚗", name: "Commute Balance", desc: "DFW traffic -- prioritize sub-30 min commute corridors (DNT, 121, 75 tollways)" },
  { icon: "📦", name: "Storage", desc: "3-car garage + walk-in attic handles gear for sports, holidays, seasonal items for big families" },
];

export default function DFWHomeForFamilies2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const profile = selected !== null ? sizes[selected] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👨‍👩‍👧‍👦</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
            DFW Homes for Growing Families 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>
            What DFW families actually need -- by family size, school district, and lifestyle.
          </p>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>👪 Select Your Family Size</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {sizes.map((s, i) => (
              <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? "#1a3a6b" : "#0A1628″, border: `2px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: 14, cursor: "pointer" }}>
                <div style={{ fontWeight: 600 }}>{s.label}</div>
                {selected === i && (
                  <div style={{ marginTop: 10, display: "grid", gap: 6, fontSize: 14 }}>
                    <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#F5E642″ }}>🛏️ Bedrooms:</span><span style={{ color: "#CBD5E1" }}>{s.beds}</span></div>
                    <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#F5E642″ }}>🌿 Yard:</span><span style={{ color: "#CBD5E1" }}>{s.yard}</span></div>
                    <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#F5E642″ }}>📦 Storage:</span><span style={{ color: "#CBD5E1" }}>{s.storage}</span></div>
                    <div style={{ display: "flex", gap: 8 }}><span style={{ color: "#F5E642″ }}>🏫 District:</span><span style={{ color: "#CBD5E1" }}>{s.district}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>🎯 Family Priority Guide</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {priorities.map((p) => (
              <div key={p.name} style={{ background: "#0A1628″, borderRadius: 8, padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ color: "#94A3B8″, fontSize: 13 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2140″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, margin: "0 0 12px" }}>🔧 ProLnk Helps Families Set Up Fast</h2>
          <div style={{ display: "grid", gap: 8 }}>
            {["Pool + fence installation before summer", "Playroom built-out with storage wall", "Whole-home HVAC service + filter upgrade", "Security system + camera install", "Garage organization + epoxy floor", "Backyard concrete pad for basketball or play"].map((item) => (
              <div key={item} style={{ background: "#0A1628″, borderRadius: 8, padding: 12, fontSize: 14, color: "#CBD5E1" }}>
                {"✅"} {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏠</div>
          <h3 style={{ color: "#0A1628″, fontWeight: 700, margin: "0 0 8px" }}>Get Your New Home Move-In Ready</h3>
          <p style={{ color: "#1a2a4a", fontSize: 14, margin: "0 0 12px" }}>ProLnk connects DFW families with trusted contractors for every home service need.</p>
          <button style={{ background: "#0A1628″, color: "#F5E642", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
