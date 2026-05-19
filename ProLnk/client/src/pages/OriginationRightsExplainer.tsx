import { Link } from "wouter";

const steps = [
  { icon: "📸", label: "Upload job photos", detail: "Take photos at the property during any service visit." },
  { icon: "🤖", label: "AI confirms property", detail: "ProLnk AI verifies the address and home identity." },
  { icon: "🏠", label: "Home added to vault", detail: "The home is logged in the TrustyPro Home Health Vault." },
  { icon: "🔒", label: "Origination rights locked in", detail: "Your 1.5% origination right is permanently recorded." },
];

export default function OriginationRightsExplainer() {
  return (
    <div style={{ background: "#FAFAF9″, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "#0F2D52″, padding: "64px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#F5C842″, color: "#0F2D52", fontWeight: 700, fontSize: 12, letterSpacing: 2, padding: "4px 14px", borderRadius: 20, marginBottom: 20, textTransform: "uppercase" }}>
          Charter & Founding Members Only
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: "0 auto 20px", maxWidth: 760, lineHeight: 1.2 }}>
          Home Origination Rights — The Income Stream That Pays You Forever
        </h1>
        <p style={{ color: "#CBD5E1″, fontSize: 18, maxWidth: 620, margin: "0 auto" }}>
          Add a home to the vault once. Earn every time a job is completed there —{" "}
          <strong style={{ color: "#F5C842″ }}>now, next year, or 10 years from now.</strong>
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px" }}>

        {/* Who Gets It */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 48 }}>
          {[
            { tier: "Charter", spots: "25 spots", rate: "1.5%", highlight: true },
            { tier: "Founding", spots: "100 spots", rate: "1.0%", highlight: false },
          ].map((t) => (
            <div key={t.tier} style={{
              border: t.highlight ? "2.5px solid #F5C842″ : "2px solid #E2E8F0",
              borderRadius: 14, padding: "28px 24px", background: "#fff", textAlign: "center",
            }}>
              {t.highlight && (
                <div style={{ background: "#F5C842″, color: "#0F2D52", fontWeight: 700, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", padding: "3px 12px", borderRadius: 12, display: "inline-block", marginBottom: 12 }}>
                  Highest Rate
                </div>
              )}
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0F2D52″ }}>{t.tier} Tier</div>
              <div style={{ color: "#64748B", fontSize: 14, marginTop: 4, marginBottom: 16 }}>{t.spots}</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: t.highlight ? "#F5C842″ : "#0F2D52", lineHeight: 1 }}>{t.rate}</div>
              <div style={{ color: "#64748B", fontSize: 14, marginTop: 6 }}>origination rate</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ color: "#0F2D52″, fontSize: 26, fontWeight: 700, marginBottom: 8 }}>How It Works</h2>
          <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
            When you add a home to the TrustyPro Home Health Vault, you claim origination rights. Every time a job is
            completed at that home — now, next year, or 10 years from now — you earn 1.5% of ProLnk's fee.{" "}
            <strong>Forever.</strong>
          </p>
          <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Think of it like owning royalty rights to a property. You add it once, it pays you indefinitely.
          </p>
        </div>

        {/* Math Example */}
        <div style={{ background: "#0F2D52″, borderRadius: 16, padding: "36px", marginBottom: 48, color: "#fff" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#F5C842″, textTransform: "uppercase", marginBottom: 12 }}>
            Permanent Income Math
          </div>
          <div style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: 28 }}>
            100 homes originated = $2,400/year. Every year. Forever.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
            {[
              ["100″, "Homes you originate"],
              ["×2″, "Jobs per home per year"],
              ["×$800″, "ProLnk fee per job (10%)"],
              ["×1.5%", "Your origination rate"],
              ["= $2,400″, "Annual origination income"],
              ["= $24,000″, "Over 10 years (cumulative)"],
            ].map(([val, label], i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.09)", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: i >= 4 ? "#F5C842″ : "#fff" }}>{val}</div>
                <div style={{ fontSize: 12, color: "#94A3B8″, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#94A3B8″, fontSize: 13, margin: 0 }}>
            Assumes average job value of $8,000, ProLnk 10% platform fee ($800), Charter member 1.5% origination rate.
          </p>
        </div>

        {/* How to Originate */}
        <h2 style={{ color: "#0F2D52″, fontSize: 26, fontWeight: 700, marginBottom: 24 }}>How to Originate a Home</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 48 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #E2E8F0″, borderRadius: 12, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{step.icon}</div>
              <div style={{ fontWeight: 700, color: "#0F2D52″, fontSize: 15, marginBottom: 8 }}>{step.label}</div>
              <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.5 }}>{step.detail}</div>
            </div>
          ))}
        </div>

        {/* Scarcity */}
        <div style={{ background: "#FFF7ED", border: "2px solid #FED7AA", borderRadius: 14, padding: "28px 28px", marginBottom: 48 }}>
          <div style={{ fontWeight: 700, color: "#C2410C", fontSize: 14, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            ⚠ Limited Availability
          </div>
          <p style={{ color: "#7C2D12″, fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Only Charter and Founding members get origination rights. Once the founding network closes at{" "}
            <strong>500 applications</strong>, origination rights are no longer available to new members. No exceptions.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#0F2D52″, fontSize: 28, fontWeight: 800, marginBottom: 16 }}>
            Claim Your Origination Rights
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, maxWidth: 480, margin: "0 auto 28px" }}>
            Apply now before the founding network closes. Origination rights are permanent — and only available to early members.
          </p>
          <Link
            to="/apply"
            style={{
              display: "inline-block", background: "#F5C842″, color: "#0F2D52",
              fontWeight: 800, fontSize: 17, padding: "16px 40px", borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Claim Origination Rights →
          </Link>
        </div>

      </div>
    </div>
  );
}
