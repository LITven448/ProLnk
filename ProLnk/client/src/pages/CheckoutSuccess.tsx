import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { CheckCircle, Users, Camera, Network, CreditCard, Star, Shield, TrendingUp, Zap, Copy, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";

const TIER_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; spotsTotal: number }> = {
  charter:  { label: "Charter",  color: "#E8A020", bg: "rgba(232,160,32,0.1)",  border: "rgba(232,160,32,0.3)",  spotsTotal: 25   },
  founding: { label: "Founding", color: "#10B981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)",  spotsTotal: 100  },
  l3:       { label: "Level 3",  color: "#818CF8", bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.3)", spotsTotal: 400  },
  l4:       { label: "Level 4",  color: "#94A3B8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.3)", spotsTotal: 1600 },
};

const NEXT_STEPS = [
  { icon: Users, step: "1", title: "Complete your profile", desc: "Add your trade, service area, and contact info so homeowners can find you.", href: "/dashboard/profile" },
  { icon: Copy, step: "2", title: "Copy your referral link", desc: "Share with other pros to start building your 4-level override network.", href: "/dashboard/referral" },
  { icon: Camera, step: "3", title: "Upload your first job photos", desc: "Each tagged photo unlocks AI analysis — turning past work into new leads.", href: "/photo-upload" },
  { icon: Network, step: "4", title: "Recruit your first pro", desc: "Every pro you bring in earns you overrides at 4 levels deep — forever.", href: "/dashboard/referral-hub" },
];

function TrialCountdown({ trialStart }: { trialStart: Date }) {
  const trialEnd = new Date(trialStart);
  trialEnd.setDate(trialEnd.getDate() + 90);

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    function update() {
      const now = Date.now();
      const ms = trialEnd.getTime() - now;
      setDaysLeft(Math.max(0, Math.ceil(ms / 86_400_000)));
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [trialEnd]);

  return (
    <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 16, padding: "24px 28px", textAlign: "center", marginBottom: 32 }}>
      <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#10B981", marginBottom: 8 }}>Your Free Trial</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#F5F0E8", lineHeight: 1 }}>{daysLeft}</div>
          <div style={{ fontSize: 11, color: "rgba(245,240,232,0.45)", marginTop: 4 }}>days remaining</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "rgba(245,240,232,0.55)" }}>
        Trial started <strong style={{ color: "#F5F0E8" }}>{fmt(trialStart)}</strong>
        {" "}—{" "}
        first charge on <strong style={{ color: "#F5F0E8" }}>{fmt(trialEnd)}</strong>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: "rgba(245,240,232,0.35)" }}>
        Cancel any time before {fmt(trialEnd)} and you owe nothing.
      </div>
    </div>
  );
}

function ReferralCopy({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const link = `https://prolnk.io/join?ref=${encodeURIComponent(email)}`;

  function copy() {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 18px", marginTop: 24 }}>
      <div style={{ fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Your referral link</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, fontSize: 13, color: "rgba(245,240,232,0.7)", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "8px 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link}</div>
        <button onClick={copy} style={{ background: copied ? "#10B981" : "#E8A020", border: "none", borderRadius: 8, padding: "8px 14px", color: "#0A1628", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    rewardful?: (event: string, callback: (referral: { id: string } | null) => void) => void;
    Rewardful?: { referral: string | null };
  }
}

export default function CheckoutSuccess() {
  const [location] = useLocation();

  const params = new URLSearchParams(window.location.search);
  const rawTier = params.get("tier") || "charter";
  const email = params.get("email") || "";
  const stripeCustomerId = params.get("customer") || "";
  const tier = TIER_CONFIG[rawTier] ? rawTier : "charter";
  const cfg = TIER_CONFIG[tier];

  const trackReferral = trpc.rewardful.trackReferral.useMutation();

  const trialStart = new Date();

  useEffect(() => {
    const campaignId = import.meta.env.VITE_REWARDFUL_CAMPAIGN_ID as string | undefined;
    if (!campaignId) return;

    const script = document.createElement("script");
    script.src = "https://r.wdfl.co/rw.js";
    script.setAttribute("data-rewardful", campaignId);
    script.async = true;
    script.onload = () => {
      if (typeof window.rewardful === "function") {
        window.rewardful("ready", (referral) => {
          if (referral?.id && email && stripeCustomerId) {
            trackReferral.mutate({
              referralId: referral.id,
              stripeCustomerId,
              email,
            });
          }
        });
      }
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "'Inter', system-ui", color: "#F5F0E8" }}>
      {/* Nav */}
      <div style={{ padding: "16px 32px", borderBottom: "1px solid rgba(245,240,232,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>ProLnk</span>
        <Link href="/dashboard" style={{ color: "rgba(245,240,232,0.5)", fontSize: 14, textDecoration: "none" }}>Go to dashboard →</Link>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,0.12)", border: "2px solid rgba(16,185,129,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle style={{ width: 36, height: 36, color: "#10B981" }} />
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
            <Star style={{ width: 14, height: 14, color: cfg.color }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>{cfg.label} Member</span>
          </div>

          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 16 }}>
            Welcome to the<br />
            <span style={{ color: "#E8A020" }}>Founding Network.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(245,240,232,0.6)", lineHeight: 1.6, maxWidth: 540, margin: "0 auto 8px" }}>
            Your {cfg.label} spot is permanently reserved. The $149/mo rate is locked for life — no matter what future partners pay.
          </p>

          {/* Charter spot reserved badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,160,32,0.08)", border: "1px solid rgba(232,160,32,0.2)", borderRadius: 100, padding: "6px 16px", marginTop: 12 }}>
            <Shield style={{ width: 13, height: 13, color: "#E8A020" }} />
            <span style={{ fontSize: 12, color: "rgba(232,160,32,0.9)" }}>Your charter spot is permanently reserved — it cannot be revoked</span>
          </div>
        </div>

        {/* Trial countdown */}
        <TrialCountdown trialStart={trialStart} />

        {/* Benefits recap */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
          {[
            { icon: TrendingUp, label: "60% commission keep rate — locked forever" },
            { icon: Zap, label: "4-level network override cascade active" },
            { icon: Shield, label: "1.5% origination rights on every home" },
            { icon: Network, label: "Referral link ready to share now" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}>
              <Icon style={{ width: 18, height: 18, color: "#E8A020", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "rgba(245,240,232,0.75)", lineHeight: 1.4 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Next steps checklist */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Your next 4 steps</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {NEXT_STEPS.map(({ icon: Icon, step, title, desc, href }, idx) => (
              <div key={step} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: idx < NEXT_STEPS.length - 1 ? 28 : 0 }}>
                {idx < NEXT_STEPS.length - 1 && (
                  <div style={{ position: "absolute", left: 18, top: 38, width: 2, bottom: 0, background: "rgba(255,255,255,0.07)" }} />
                )}
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon style={{ width: 16, height: 16, color: "#E8A020" }} />
                </div>
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8A020" }}>Step {step}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "rgba(245,240,232,0.5)", lineHeight: 1.5, marginBottom: 8 }}>{desc}</div>
                  <Link href={href} style={{ fontSize: 13, color: "#E8A020", textDecoration: "none", fontWeight: 600 }}>
                    Get started →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral link copy widget */}
        {email && <ReferralCopy email={email} />}

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="/dashboard">
            <button style={{ background: "#E8A020", color: "#0A1628", border: "none", borderRadius: 100, padding: "16px 48px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Open Your Dashboard →
            </button>
          </Link>
          <div style={{ marginTop: 14, fontSize: 12, color: "rgba(245,240,232,0.3)" }}>
            Questions? Email <a href="mailto:support@prolnk.io" style={{ color: "rgba(245,240,232,0.45)", textDecoration: "none" }}>support@prolnk.io</a>
          </div>
        </div>
      </div>
    </div>
  );
}
