import { Link } from "wouter";
import { Shield, TrendingUp, Zap, Network, CreditCard, Clock, ChevronRight, MessageCircle } from "lucide-react";

const OBJECTIONS = [
  {
    q: "I'm not sure I'll use it enough to justify $149/mo.",
    a: "The 90-day free trial is specifically so you can prove it to yourself first. Log your first few jobs, share your referral link, and see overrides come in — before you're charged a dollar.",
  },
  {
    q: "What if I change trades or stop doing field work?",
    a: "Your rate is locked regardless. The network override income from pros you've already recruited keeps paying even if you personally step back from field work.",
  },
  {
    q: "I need to talk to my business partner first.",
    a: "Your spot is still reserved. Come back to prolnk.io/checkout anytime — no countdown pressure. But note: the 2,125 founding spots do fill on a first-come basis.",
  },
  {
    q: "I'm worried about getting locked into something.",
    a: "There is no lock-in. Cancel any time before day 90 and you're never charged. After that, it's month-to-month — cancel at the end of any billing cycle.",
  },
];

const INCOME_STREAMS = [
  { icon: TrendingUp, title: "72% Commission Keep Rate",   desc: "Highest in the industry — locked at this tier forever." },
  { icon: Network,    title: "4-Level Override Cascade",   desc: "Earn on every job completed up to 4 levels deep in your network." },
  { icon: Shield,     title: "1.5% Origination Rights",    desc: "Perpetual 1.5% on every job at every home you ever document." },
  { icon: Zap,        title: "AI Lead Generation",         desc: "Your job photos feed our AI to generate cross-trade leads automatically." },
  { icon: CreditCard, title: "$149/mo Locked Forever",     desc: "Future partners will pay more. You won't — this rate is grandfathered." },
  { icon: Clock,      title: "90-Day Free Trial",          desc: "Full access from day one. No charge until day 90." },
];

export default function CheckoutCancel() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, fontFamily: "'Inter', system-ui", color: "#F5F0E8" }}>
      {/* Nav */}
      <div style={{ padding: "16px 32px", borderBottom: "1px solid rgba(245,240,232,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>ProLnk</span>
        <Link href="/" style={{ color: "rgba(245,240,232,0.5)", fontSize: 14, textDecoration: "none" }}>← Back to homepage</Link>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-block", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 700, color: "#10B981″, marginBottom: 20 }}>
            Your spot is still reserved
          </div>
          <h1 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            No worries — we get it.<br />
            <span style={{ color: "rgba(245,240,232,0.5)" }}>Big decisions take a minute.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(245,240,232,0.55)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
            Your founding network spot hasn't been given away. Come back when you’re ready — checkout picks up right where you left off.
          </p>
        </div>

        {/* Resume CTA — primary */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Link href="/checkout">
            <button style={{ background: "#E8A020″, color: "#0A1628", border: "none", borderRadius: 100, padding: "16px 48px", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}>
              Resume checkout — start my free trial
              <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
          </Link>
          <div style={{ marginTop: 12, fontSize: 13, color: "rgba(245,240,232,0.35)" }}>No charge today. 90 days free. Cancel anytime.</div>
        </div>

        {/* Common objections */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Common concerns — answered</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {OBJECTIONS.map(({ q, a }) => (
              <details key={q} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
                <summary style={{ padding: "18px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14, listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {q}
                  <ChevronRight style={{ width: 16, height: 16, color: "rgba(245,240,232,0.3)", flexShrink: 0 }} />
                </summary>
                <div style={{ padding: "0 20px 18px", fontSize: 14, color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* What you're missing */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>What founding members get that others won't</h2>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,0.45)", marginBottom: 24 }}>The 2,125 founding spots are the only way to lock these terms forever.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {INCOME_STREAMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 16px" }}>
                <Icon style={{ width: 18, height: 18, color: "#E8A020″, marginBottom: 10 }} />
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: "rgba(245,240,232,0.5)", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA row */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/checkout">
            <button style={{ background: "#E8A020″, color: "#0A1628", border: "none", borderRadius: 100, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Resume checkout →
            </button>
          </Link>
          <a href="mailto:support@prolnk.io?subject=Founding%20Network%20Question" style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "14px 28px", fontSize: 15, color: "#F5F0E8″, textDecoration: "none", fontWeight: 600 }}>
            <MessageCircle style={{ width: 16, height: 16 }} />
            Have questions? Email us
          </a>
        </div>
      </div>
    </div>
  );
}
