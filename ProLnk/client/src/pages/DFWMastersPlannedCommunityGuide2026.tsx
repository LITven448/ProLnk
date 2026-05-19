import { useState } from 'react';

const priorities = [
  { label: "School District Quality", icon: "🏫",
    communities: ["Southlake (Carroll ISD)","Flower Mound (Lewisville ISD)","Frisco (Frisco ISD)","Coppell (Coppell ISD)"],
    hoa: "$220-380/mo", resale: "+10-15%", 
    desc: "These MPCs anchor themselves to top-rated school districts. HOA fees fund amenity maintenance but the real value driver is school performance. Homes in Carroll ISD communities command 15% premiums over comparable homes in adjacent districts.",
    prolnk: "HOA exterior standards mean ProLnk pros must match approved materials and colors. We maintain a DFW HOA-compliant vendor database for each community." },
  { label: "Outdoor Amenities & Trails", icon: "🚴",
    communities: ["Viridian (Arlington)","Pecan Square (Northlake)","Star Trail (Prosper)","Walsh Ranch (Fort Worth)"],
    hoa: "$180-280/mo", resale: "+7-12%",
    desc: "MPCs with extensive trail systems, lakes, and parks generate strong resale premiums and attract younger families. These communities often have 10+ miles of trails, multiple pools, and dedicated event staff — all funded by HOA fees.",
    prolnk: "Landscaping and outdoor maintenance are tightly controlled. ProLnk pros servicing trail-adjacent homes need HOA registration and must follow community appearance standards." },
  { label: "Low HOA Cost Priority", icon: "💰",
    communities: ["Prairie Oaks (Midlothian)","Mustang Lakes (Celina)","Ventana (Weatherford)","Union Park (Little Elm)"],
    hoa: "$85-175/mo", resale: "+3-7%",
    desc: "Not all MPCs are high-fee. These communities offer planned amenities at lower cost — often newer builds where infrastructure bonds are separate from HOA. Less staff, fewer amenities, but still strong community standards and resale protection.",
    prolnk: "Lower-fee communities still enforce exterior standards strictly. ProLnks HOA compliance tool flags approved colors, roofing materials, and fence styles before a pro bids." },
  { label: "Resort-Style Living", icon: "🏊",
    communities: ["The Lakes at Castle Hills (Lewisville)","Stonebridge Ranch (McKinney)","The Colony CC Area","Lantana (Copper Canyon)"],
    hoa: "$280-500/mo", resale: "+12-18%",
    desc: "Premium MPCs with country club amenities, beach clubs, tennis complexes, and staffed entry gates. HOA fees at this tier cover 24/7 security, concierge services, and premium landscaping. Resale premiums are highest but carry-cost is significant.",
    prolnk: "Gated entry requires pro pre-registration. ProLnk handles HOA vendor approval packets for pros serving these communities — background check, insurance verification, and community orientation." },
];

export default function DFWMastersPlannedCommunityGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🏘️</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#F5E642", marginBottom: "0.5rem" }}>DFW Master-Planned Community Living Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>HOA costs, resale premiums, and life inside DFWs top MPCs</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[["🏘️","MPCs in DFW","200+"],["💵","Avg HOA","$200-400/mo"],["📈","Resale Premium","5-15%"]].map(([icon,label,val],i)=>(
            <div key={i} style={{ background: "#0f2040", borderRadius: 10, padding: "1.2rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: "0.3rem" }}>{label}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.1rem" }}>{val}</div>
            </div>
          ))}
        </div>

        <p style={{ color: "#94a3b8", marginBottom: "0.75rem", fontSize: "0.9rem" }}>What matters most to you in an MPC?</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {priorities.map((p, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: "0.75rem 1rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642" : "1px solid #1e3a5f",
                background: selected === i ? "#1a2f50" : "#0f2040", color: selected === i ? "#F5E642" : "#94a3b8",
                cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, textAlign: "left", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ fontSize: "1.3rem" }}>{p.icon}</span><span>{p.label}</span>
            </button>
          ))}
        </div>

        {(() => { const p = priorities[selected]; return (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", border: "2px solid #F5E642", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5E642", marginBottom: "1rem" }}>{p.icon} {p.label}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "#0A1628", borderRadius: 8, padding: "0.75rem", border: "1px solid #1e3a5f" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Typical HOA</div>
                <div style={{ color: "#F5E642", fontWeight: 700 }}>{p.hoa}</div>
              </div>
              <div style={{ background: "#0A1628", borderRadius: 8, padding: "0.75rem", border: "1px solid #1e3a5f" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Resale Premium</div>
                <div style={{ color: "#F5E642", fontWeight: 700 }}>{p.resale}</div>
              </div>
            </div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</p>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.4rem" }}>Example DFW Communities</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {p.communities.map((c,i)=><span key={i} style={{ background: "#1a2f50", border: "1px solid #F5E642", borderRadius: 6, padding: "0.2rem 0.7rem", color: "#F5E642", fontSize: "0.8rem" }}>{c}</span>)}
              </div>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", border: "1px solid #22c55e" }}>
              <div style={{ color: "#22c55e", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.9rem" }}>🔗 How ProLnk Works Here</div>
              <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.6, fontSize: "0.9rem" }}>{p.prolnk}</p>
            </div>
          </div>
        ); })()}

        <div style={{ textAlign: "center", padding: "1rem", background: "#0f2040", borderRadius: 10, border: "1px solid #1e3a5f" }}>
          <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Need HOA-approved contractors in your MPC? </span>
          <span style={{ color: "#F5E642", fontWeight: 700 }}>ProLnk maintains DFW community compliance profiles for every major MPC. 🔗</span>
        </div>
      </div>
    </div>
  );
}
