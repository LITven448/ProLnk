import { DollarSign, Users, CreditCard, Target, Home, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const D = {
  bg: "#0A1628",
  surface: "#0F1D35",
  card: "#162035",
  border: "#1E2D4A",
  text: "#F0F4FF",
  muted: "#7B8BAA",
  teal: "#00C2A8",
  green: "#22C55E",
  amber: "#F59E0B",
  blue: "#3B82F6",
  purple: "#A855F7",
  orange: "#FF6B35",
};

const STREAMS = [
  {
    num: 1,
    icon: DollarSign,
    color: D.teal,
    name: "Job Commission",
    badge: "72% keep",
    description: "Earn 72% of ProLnk's commission on every job you refer to the platform.",
    example: "$8,400 job → $840 ProLnk fee →",
    result: "$605 to you",
    calc: "72% of $840",
  },
  {
    num: 2,
    icon: Users,
    color: D.purple,
    name: "Network Override",
    badge: "7/4/2/1%",
    description: "Earn overrides on your recruits' jobs — cascading 4 levels deep into your network.",
    example: "10 recruits each doing $5K/mo →",
    result: "$420/mo passive",
    calc: "7% of $6K in fees",
  },
  {
    num: 3,
    icon: CreditCard,
    color: D.blue,
    name: "Subscription Override",
    badge: "12% recurring",
    description: "Earn a recurring monthly cut whenever people in your network pay their $149/mo subscription.",
    example: "10 direct recruits × $149 × 12% =",
    result: "$178.80/mo recurring",
    calc: "Every month, forever",
  },
  {
    num: 4,
    icon: Target,
    color: D.amber,
    name: "Per-Lead Fee",
    badge: "$25–$100 per lead",
    description: "Earn a per-lead fee for each qualified homeowner you bring into the platform.",
    example: "5 homeowners/month × $50 avg =",
    result: "$250/mo",
    calc: "Negotiated with ProLnk",
  },
  {
    num: 5,
    icon: Home,
    color: D.green,
    name: "Home Origination Rights",
    badge: "Permanent revenue",
    description: "Claim permanent revenue rights on every home you add to the Home Health Vault. It pays forever.",
    example: "50 homes × 2 jobs/yr × $500 fee × 1.5% =",
    result: "$750/yr forever",
    calc: "Charter members only",
  },
];

export default function IncomeStreamsExplainer() {
  return (
    <div style={{ background: D.bg, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, #0A1628 0%, #0F1D35 50%, #0A1628 100%)`,
        borderBottom: `1px solid ${D.border}`,
        padding: "72px 24px 64px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block", background: `${D.teal}15`,
          border: `1px solid ${D.teal}40`, borderRadius: 20,
          padding: "6px 16px", marginBottom: 20,
          color: D.teal, fontSize: 13, fontWeight: 600,
        }}>
          Network Income System
        </div>
        <h1 style={{ color: D.text, fontSize: 42, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.15 }}>
          5 Ways You Earn<br />
          <span style={{ color: D.teal }}>With ProLnk</span>
        </h1>
        <p style={{ color: D.muted, fontSize: 18, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          The only platform where your network works as hard as you do.
        </p>
      </div>

      {/* Stream Cards */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {STREAMS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{
                background: D.card, border: `1px solid ${D.border}`,
                borderRadius: 16, padding: 28,
                borderLeft: `3px solid ${s.color}`,
              }}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: `${s.color}18`, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={24} color={s.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ color: D.muted, fontSize: 12, fontWeight: 600 }}>Stream {s.num}</span>
                      <span style={{
                        background: `${s.color}15`, color: s.color,
                        border: `1px solid ${s.color}30`, borderRadius: 20,
                        fontSize: 11, fontWeight: 700, padding: "2px 8px",
                      }}>{s.badge}</span>
                    </div>
                    <h3 style={{ color: D.text, fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{s.name}</h3>
                    <p style={{ color: D.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.description}</p>
                  </div>
                  <div style={{
                    background: D.surface, borderRadius: 10, padding: "16px 20px",
                    border: `1px solid ${D.border}`, minWidth: 200, flexShrink: 0,
                  }}>
                    <div style={{ color: D.muted, fontSize: 12, marginBottom: 6 }}>{s.example}</div>
                    <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.result}</div>
                    <div style={{ color: D.muted, fontSize: 11, marginTop: 4 }}>{s.calc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Potential Card */}
        <div style={{
          marginTop: 32,
          background: `linear-gradient(135deg, ${D.teal}18 0%, ${D.teal}08 100%)`,
          border: `1px solid ${D.teal}40`, borderRadius: 16, padding: 32,
          textAlign: "center",
        }}>
          <div style={{ color: D.muted, fontSize: 14, marginBottom: 8 }}>Combined earning potential</div>
          <div style={{ color: D.text, fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            Partners active in all 5 streams average
          </div>
          <div style={{ color: D.teal, fontSize: 40, fontWeight: 900, letterSpacing: -1 }}>
            $3,200/month
          </div>
          <div style={{ color: D.muted, fontSize: 15, marginTop: 8 }}>within 90 days of going active</div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "48px 0 64px" }}>
          <Link href="/apply">
            <a style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: D.teal, color: "#000",
              fontWeight: 700, fontSize: 17, padding: "16px 36px",
              borderRadius: 10, textDecoration: "none",
            }}>
              Claim Your Spot
              <ArrowRight size={18} />
            </a>
          </Link>
          <div style={{ color: D.muted, fontSize: 13, marginTop: 12 }}>
            Waitlist closes at 500 Charter applications
          </div>
        </div>
      </div>
    </div>
  );
}
