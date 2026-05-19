import { useState } from 'react';

type Section = { icon: string; title: string; body: string };
type Role = { id: string; icon: string; label: string; headline: string; sections: Section[]; cta: string; ctaUrl: string };

const roles: Role[] = [
  {
    id: "homeowner",
    icon: "🏡",
    label: "I am a Homeowner",
    headline: "The smartest way to hire home service pros in DFW",
    sections: [
      { icon: "✅", title: "Vetted Pros Only", body: "Every pro on ProLnk is verified — licensed, insured, and background-checked. You never get cold-call contractors. You get matched professionals who have been through the ProLnk review process." },
      { icon: "🏠", title: "Your Home Health Vault", body: "Every job at your home is logged automatically. Your Vault builds a permanent maintenance record that tracks warranties, supports insurance claims, and can add $5,000–$15,000 in resale value documentation." },
      { icon: "⚡", title: "Easy Matching — No Phone Tag", body: "You describe what you need. ProLnk matches you with the right pro for your trade, service area, and timing. No hunting, no bidding wars, no pressure." },
      { icon: "📊", title: "Pattern Recognition (Coming 2027)", body: "Your Vault will proactively alert you before systems fail — based on age, manufacturer data, and DFW climate cycles. Maintenance before breakdown saves thousands." }
    ],
    cta: "Get Matched with a Pro",
    ctaUrl: "https://prolnk.io"
  },
  {
    id: "pro",
    icon: "🔧",
    label: "I am a Home Service Pro",
    headline: "Five income streams. One platform. Built for DFW pros.",
    sections: [
      { icon: "💵", title: "Stream 1: Direct Commission (12–70%)", body: "Every match you complete earns you a direct commission — starting at 12% for new pros, scaling to 70% at Tier 5 (500+ matches). The more you work, the higher your keep rate." },
      { icon: "🌐", title: "Stream 2: Network Override (4-Level Cascade)", body: "Every pro you recruit earns you 1% of their job income. Their recruits earn you 0.5%. Four levels deep — your network earns while you sleep. Charter pros who build networks of 20 pros generate $3,000–$6,000/month in passive income." },
      { icon: "🔁", title: "Stream 3: Subscription Override", body: "When a pro you refer pays their $149/mo subscription, you earn 12% recurring — every month they stay on the platform. 10 referred pros = $178/mo in recurring income doing nothing." },
      { icon: "🏘️", title: "Streams 4 and 5: Homeowner and Home Origination", body: "Bring homeowners onto the platform and earn per-lead fees. Help homeowners add their homes to the Vault and earn a permanent origination share of platform fees tied to that address — forever." },
      { icon: "🔒", title: "Charter Tier — $149/mo Locked", body: "Charter is the founding tier for the first 500 pros who join. Price is locked at $149/mo permanently — no increases, ever. Waitlist closes at 500 applicants. Join now to secure your rate." }
    ],
    cta: "Apply for Charter Tier",
    ctaUrl: "https://prolnk.io"
  },
  {
    id: "dfw",
    icon: "🌆",
    label: "Why DFW Specifically",
    headline: "ProLnk is built for the DFW market — and DFW is the best market to be built for",
    sections: [
      { icon: "📈", title: "Largest Residential Market in Texas", body: "DFW adds 100,000+ new residents per year. New homes, aging inventory, and extreme weather cycles create year-round demand for every home service trade — more than any other Texas metro." },
      { icon: "🌪️", title: "Weather-Driven Demand", body: "DFW clay soil, hail seasons, extreme heat (115F+ heat index), winter freezes — every weather cycle creates service demand across roofing, HVAC, foundation, and plumbing simultaneously. ProLnk routes leads based on weather patterns." },
      { icon: "🔗", title: "Most Comprehensive Home Services Resource", body: "ProLnk publishes more DFW-specific home services content, guides, and trade resources than any other platform in the market. This is the destination for DFW homeowners doing research before hiring." },
      { icon: "🚀", title: "2026 Launch — Be Early", body: "ProLnk is launching in 2026. Charter pros who join now lock in founding economics and are first in their trade area. Homeowners on the waitlist get priority matching when the platform opens." }
    ],
    cta: "Join ProLnk Now",
    ctaUrl: "https://prolnk.io"
  }
];

export default function DFWProLnkFinalPageDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = roles.find(r => r.id === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>🔗</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#F5E642″, marginBottom: 10 }}>ProLnk — The Complete DFW Home Services Platform</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>Everything you need to know about ProLnk in one place — for homeowners, for pros, and for anyone who wants to understand why DFW is the center of it all</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 36 }}>
          {roles.map(r => (
            <button key={r.id} onClick={() => setSelected(selected === r.id ? null : r.id)}
              style={{ background: selected === r.id ? "#1a2744″ : "#0f1f3d", border: `2px solid ${selected === r.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: 24, textAlign: "center", cursor: "pointer", color: "#fff", transition: "all 0.2s" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: selected === r.id ? "#F5E642″ : "#fff" }}>{r.label}</div>
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: "#1a2744″, border: "2px solid #F5E642", borderRadius: 16, padding: 32 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 22, marginBottom: 24, lineHeight: 1.4 }}>{active.icon} {active.headline}</h2>
            <div style={{ display: "grid", gap: 20, marginBottom: 24 }}>
              {active.sections.map((s, i) => (
                <div key={i} style={{ background: "#0A1628″, borderRadius: 10, padding: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.icon} {s.title}</div>
                  <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <a href={active.ctaUrl} style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 800, padding: "14px 36px", borderRadius: 8, textDecoration: "none", fontSize: 16 }}>{active.cta} — prolnk.io</a>
            </div>
          </div>
        )}
        {!active && <div style={{ textAlign: "center", color: "#64748b", marginTop: 24, fontSize: 15 }}>Select your role above to see your complete ProLnk guide</div>}
        <div style={{ textAlign: "center", marginTop: 48, borderTop: "1px solid #1e3a5f", paddingTop: 28 }}>
          <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Ready to join the DFW home services revolution?</div>
          <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 800, padding: "14px 36px", borderRadius: 8, textDecoration: "none", fontSize: 16 }}>Visit prolnk.io</a>
          <div style={{ marginTop: 20, color: "#475569″, fontSize: 13 }}>ProLnk.io · Dallas-Fort Worth · 2026 · Homeowners + Pros + Platform</div>
        </div>
      </div>
    </div>
  );
}
