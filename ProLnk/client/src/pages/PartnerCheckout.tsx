import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle, Zap, Network, Shield, TrendingUp, Home, Lock } from "lucide-react";
import { useLocation } from "wouter";

const BENEFITS = [
  { icon: Lock, label: "$149/mo locked for life", sub: "Price never increases for charter members" },
  { icon: TrendingUp, label: "72% commission keep rate", sub: "Industry-leading — keep more of every job" },
  { icon: Network, label: "4-level network depth", sub: "Earn on your entire downline automatically" },
  { icon: Shield, label: "90-day free trial", sub: "No charge for the first three months" },
  { icon: Home, label: "1.5% home origination", sub: "Permanent revenue share on every home you add" },
  { icon: Zap, label: "AI-matched leads", sub: "Storm detection + NOAA data routes jobs to you" },
];

export default function PartnerCheckout() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [cancelled] = useState(() => new URLSearchParams(window.location.search).get("cancelled") === "true");

  const checkout = trpc.stripe.createFoundingNetworkCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Could not start checkout. Please try again.");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    checkout.mutate({ email });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>ProLnk</span>
            <span style={{ background: "#F5E642", color: "#0A1628", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.5px" }}>FOUNDING NETWORK</span>
          </div>
          <button
            onClick={() => setLocation("/")}
            style={{ color: "#94a3b8", fontSize: 13, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            Back to homepage
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1060, width: "100%", display: "grid", gridTemplateColumns: "1fr 420px", gap: 48, alignItems: "start" }}>

          {/* Left: Value Prop */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ background: "rgba(245,230,66,0.12)", color: "#F5E642", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "1px", textTransform: "uppercase" }}>
                Limited — 2,125 spots total
              </span>
            </div>
            <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-1px" }}>
              Join the ProLnk<br />
              <span style={{ color: "#F5E642" }}>Founding Network</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, margin: "0 0 40px", maxWidth: 520 }}>
              The only home services platform where you keep 72% of every job and earn passive income four levels deep — forever. Lock in the founding rate before it's gone.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              {BENEFITS.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <div style={{ background: "rgba(245,230,66,0.12)", borderRadius: 8, padding: 8, flexShrink: 0 }}>
                    <Icon size={16} color="#F5E642" />
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{label}</div>
                    <div style={{ color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>At 1,000 active partners, projected monthly revenue:</div>
              <div style={{ color: "#F5E642", fontSize: 32, fontWeight: 900, letterSpacing: "-0.5px" }}>$379K / mo</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>85% net margin · Patent Pending · DFW, Texas</div>
            </div>
          </div>

          {/* Right: Checkout Form */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 20, padding: "36px 32px", position: "sticky", top: 32 }}>
            {cancelled && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 24, color: "#f87171", fontSize: 13 }}>
                Checkout was cancelled. You can try again anytime.
              </div>
            )}

            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}>Founding Network — Charter Rate</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6 }}>
                <span style={{ color: "#F5E642", fontSize: 52, fontWeight: 900, lineHeight: 1 }}>$149</span>
                <span style={{ color: "#64748b", fontSize: 16 }}>/mo</span>
              </div>
              <div style={{ color: "#22c55e", fontSize: 13, fontWeight: 600, marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <CheckCircle size={14} />
                90-day free trial — no charge today
              </div>
            </div>

            <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
              <div style={{ color: "#86efac", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>What you get at launch:</div>
              {["72% commission keep rate", "4-level network income", "$149/mo locked for life", "1.5% home origination rights", "Early access to AI lead matching"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "#d1fae5", fontSize: 12, marginTop: 4 }}>
                  <CheckCircle size={12} color="#22c55e" />
                  {item}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 8, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={checkout.isPending}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: checkout.isPending ? "#6b5e00" : "#F5E642",
                  color: "#0A1628",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: checkout.isPending ? "not-allowed" : "pointer",
                  letterSpacing: "-0.2px",
                  transition: "opacity 0.15s",
                  opacity: checkout.isPending ? 0.7 : 1,
                }}
              >
                {checkout.isPending ? "Redirecting to Stripe…" : "Start Free 90-Day Trial →"}
              </button>
            </form>

            <p style={{ color: "#475569", fontSize: 11, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
              Secured by Stripe · Cancel anytime before day 90 · No charge until trial ends
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 20, paddingTop: 16, textAlign: "center" }}>
              <button
                onClick={() => setLocation("/pro-waitlist")}
                style={{ color: "#64748b", fontSize: 12, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
              >
                Just want the free waitlist spot instead?
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: "20px 32px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <p style={{ color: "#334155", fontSize: 12, margin: 0 }}>
          2026 ProLnk · DFW, Texas · Patent Pending · <a href="/privacy" style={{ color: "#475569", textDecoration: "none" }}>Privacy</a> · <a href="/terms" style={{ color: "#475569", textDecoration: "none" }}>Terms</a>
        </p>
      </footer>
    </div>
  );
}
