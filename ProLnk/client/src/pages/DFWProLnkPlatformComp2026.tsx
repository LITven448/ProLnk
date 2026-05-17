import { useState } from 'react';

const components = [
  {
    id: "matching",
    name: "Matching Algorithm",
    emoji: "🎯",
    parts: ["Trade type scoring", "Service area proximity", "Pro performance score", "Real-time availability"],
    desc: "ProLnk's AI matching engine routes each homeowner request to the best-fit pros based on trade specialization, geographic coverage, quality score, and current capacity.",
    benefit: "DFW homeowners get matched in seconds to pros who actually serve their zip code and specialize in their specific need — no more calling 10 companies to find one who shows up.",
  },
  {
    id: "vault",
    name: "Home Health Vault",
    emoji: "🏛️",
    parts: ["50M+ home records", "System age and condition", "Permit history", "Repair timeline"],
    desc: "A permanent digital record of your home's systems, ages, maintenance history, and repair records. Accessible to you and shareable with pros and future buyers.",
    benefit: "DFW homeowners using the Vault get faster quotes — pros know your system ages and history upfront, skipping diagnostic guesswork and eliminating surprise scope changes mid-job.",
  },
  {
    id: "charter",
    name: "Charter Tier System",
    emoji: "⭐",
    parts: ["Charter tier 25 seats", "Founding tier 100 seats", "Level 3 tier 400 seats", "Level 4 tier 1600 seats"],
    desc: "ProLnk's founding pro membership structure. Charter pros lock in at 149 per month permanently. As the platform grows, monthly fees for later tiers increase — early entry is structurally advantageous.",
    benefit: "DFW pros who join Charter lock in the lowest rate permanently. As ProLnk expands from DFW to Houston, Austin, and nationwide, Charter pros earn network overrides from every pro they refer.",
  },
  {
    id: "income",
    name: "5-Stream Income Engine",
    emoji: "💰",
    parts: ["Direct match commission", "4-level pro override", "Subscription override", "Homeowner override", "Home origination override"],
    desc: "ProLnk pros earn from 5 distinct income streams simultaneously — not just from jobs they personally complete, but from every pro and homeowner in their network.",
    benefit: "A DFW Charter pro who recruits 20 pros and sources 100 homeowners could earn passive income exceeding their direct job income. The network compounds as the platform scales.",
  },
  {
    id: "scoring",
    name: "Performance Scoring",
    emoji: "📊",
    parts: ["Job completion rate", "Homeowner rating average", "Response time score", "Dispute rate"],
    desc: "Every ProLnk pro maintains a live performance score based on job outcomes, homeowner ratings, response speed, and dispute frequency. Score drives match priority.",
    benefit: "DFW homeowners can trust that high-score pros have demonstrated reliability on the platform — not just marketing claims. Pros are motivated to maintain quality since score directly affects lead volume.",
  },
  {
    id: "verification",
    name: "Background Verification",
    emoji: "✅",
    parts: ["License validation", "Insurance verification", "Criminal background check", "Business entity check"],
    desc: "All ProLnk pros pass a multi-layer verification before accessing the platform. License status is checked against state databases; insurance certificates are verified at intake and renewal.",
    benefit: "DFW homeowners never have to guess if a ProLnk pro is licensed and insured. Verification is platform-enforced, not self-reported — reducing the risk of unlicensed contractors prevalent in post-storm DFW markets.",
  },
  {
    id: "agents",
    name: "AI Agent Network",
    emoji: "🤖",
    parts: ["47 specialized AI agents", "Lead scoring", "Commission calculation", "Fraud detection", "Market analysis"],
    desc: "ProLnk operates a network of 47 specialized AI agents handling operations, finance, marketing, customer success, and engineering autonomously — enabling massive scale with minimal overhead.",
    benefit: "DFW pros and homeowners get platform-level intelligence working for them around the clock — market pricing insights, proactive fraud protection, and commission calculations that are always accurate.",
  },
];

export default function DFWProLnkPlatformComp2026() {
  const [active, setActive] = useState<string | null>(null);
  const selected = components.find((c) => c.id === active);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "2rem", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔗</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>ProLnk Platform Components</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>Complete Reference 2026 — Select a component to explore how it works</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {components.map((c) => (
            <button key={c.id} onClick={() => setActive(active === c.id ? null : c.id)}
              style={{ background: active === c.id ? "#F5E642" : "#1e2d4a", border: "2px solid " + (active === c.id ? "#F5E642" : "#2d3f5e"),
                borderRadius: 12, padding: "1.2rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, color: active === c.id ? "#0A1628" : "#F5E642", fontSize: "0.95rem" }}>{c.name}</div>
              <div style={{ color: active === c.id ? "#1e2d4a" : "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>{c.parts.length} elements</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: "#1e2d4a", border: "2px solid #F5E642", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>{selected.emoji} {selected.name}</h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {selected.parts.map((p) => (
                <span key={p} style={{ background: "#0A1628", border: "1px solid #2d3f5e", borderRadius: 20, padding: "0.2rem 0.8rem", fontSize: "0.8rem", color: "#94a3b8" }}>{p}</span>
              ))}
            </div>
            <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: "0 0 1rem" }}>{selected.desc}</p>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.3rem" }}>🌟 DFW Benefit</div>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{selected.benefit}</p>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", background: "#1e2d4a", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700 }}>🚀 Join ProLnk DFW</div>
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.3rem" }}>Charter waitlist open now — 25 founding pro spots for the entire DFW market</div>
        </div>
      </div>
    </div>
  );
}
