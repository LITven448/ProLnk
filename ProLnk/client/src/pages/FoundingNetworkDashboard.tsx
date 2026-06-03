import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import {
  Users, DollarSign, TrendingUp, Copy, Check, Network,
  ArrowUpRight, Clock, Wallet, Link2,
} from "lucide-react";

const T = {
  surface: "#FFFFFF",
  bg: "#F8FAFC",
  text: "#0F172A",
  muted: "#4B5563",
  dim: "#6B7280",
  accent: "#0D9488",
  accentBg: "#F0FDFA",
  green: "#16A34A",
  amber: "#D97706",
  border: "#E5E7EB",
};

const PAYOUT_LABELS: Record<string, string> = {
  direct_commission: "Direct commission",
  network_l1: "Network — Level 1",
  network_l2: "Network — Level 2",
  network_l3: "Network — Level 3",
  network_l4: "Network — Level 4",
  subscription_l1: "Subscription override — L1",
  subscription_l2: "Subscription override — L2",
  subscription_l3: "Subscription override — L3",
  subscription_l4: "Subscription override — L4",
  home_origination: "Home origination",
};

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function labelFor(type: string) {
  return PAYOUT_LABELS[type] ?? type.replace(/_/g, " ");
}

const container: React.CSSProperties = { maxWidth: 1040, margin: "0 auto", padding: "4px 2px 48px", color: T.text };

export default function FoundingNetworkDashboard() {
  const [, navigate] = useLocation();
  const [copied, setCopied] = useState(false);

  const dash = trpc.network.getDashboard.useQuery(undefined, { retry: false });
  const payouts = trpc.network.getPayoutHistory.useQuery({ limit: 50 }, { retry: false });

  useEffect(() => {
    const code = (dash.error as any)?.data?.code;
    const status = (dash.error as any)?.data?.httpStatus;
    if (code === "UNAUTHORIZED" || status === 401) {
      navigate("/partner-login?next=/network");
    }
  }, [dash.error, navigate]);

  function copyLink(link: string) {
    navigator.clipboard?.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  if (dash.isLoading) {
    return (
      <PartnerLayout>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh", color: T.dim }}>
          Loading your network…
        </div>
      </PartnerLayout>
    );
  }

  if (dash.error) {
    return (
      <PartnerLayout>
        <div style={{ ...container, textAlign: "center", paddingTop: 60 }}>
          <p style={{ color: T.dim }}>Redirecting to sign in…</p>
        </div>
      </PartnerLayout>
    );
  }

  const d = dash.data;

  // Logged in, but not enrolled in the founding network yet.
  if (!d) {
    return (
      <PartnerLayout>
        <div style={container}>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "40px 32px", textAlign: "center", maxWidth: 560, margin: "40px auto" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: T.accentBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Network size={26} color={T.accent} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>You're not in the founding network yet</h2>
            <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.6, margin: "0 0 20px" }}>
              This area is reserved for founding-network members. Once you're enrolled, you'll track every referral,
              your downline, and all your network income right here.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}
            >
              Back to my dashboard
            </button>
          </div>
        </div>
      </PartnerLayout>
    );
  }

  const incomeEntries = Object.entries(d.incomeByType || {}).filter(([, v]) => Number(v) > 0);

  return (
    <PartnerLayout>
      <div style={container}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.3 }}>Founding Network</h1>
          <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>
            Level {d.networkLevel} · {d.subscriptionActive ? "Subscription active" : "Subscription inactive"}
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginBottom: 24 }}>
          <Stat icon={<DollarSign size={18} />} label="This month" value={money(d.monthlyTotal)} accent={T.green} />
          <Stat icon={<TrendingUp size={18} />} label="Lifetime network income" value={money(d.totalNetworkIncomeEarned)} />
          <Stat icon={<Clock size={18} />} label="Pending payout" value={money(d.pendingPayoutAmount)} accent={T.amber} />
          <Stat icon={<Users size={18} />} label="Direct / total downline" value={`${d.directReferrals} / ${d.totalDownline}`} />
        </div>

        {/* Referral link */}
        <Section title="Your referral link" icon={<Link2 size={16} color={T.accent} />}>
          <p style={{ color: T.muted, fontSize: 14, margin: "0 0 12px" }}>
            Anyone who joins through this link enters your network. Your code: <strong style={{ color: T.text }}>{d.referralCode}</strong>
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              readOnly
              value={d.referralLink}
              onFocus={(e) => e.currentTarget.select()}
              style={{ flex: 1, minWidth: 240, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: T.text, background: T.bg }}
            />
            <button
              onClick={() => copyLink(d.referralLink)}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: copied ? T.green : T.accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </Section>

        {/* Income breakdown */}
        {incomeEntries.length > 0 && (
          <Section title="This month's income by type" icon={<Wallet size={16} color={T.accent} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {incomeEntries.map(([type, amt]) => (
                <div key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 14, color: T.muted }}>{labelFor(type)}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: T.green }}>{money(Number(amt))}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Direct referrals */}
        <Section title={`Your direct referrals (${d.directReferralList.length})`} icon={<Users size={16} color={T.accent} />}>
          {d.directReferralList.length === 0 ? (
            <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>No referrals yet — share your link above to start building your network.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {d.directReferralList.map((r: any, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < d.directReferralList.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{r.businessName || "Pending business"}</div>
                    <div style={{ fontSize: 13, color: T.dim }}>{r.trade || "—"} · Level {r.level}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.accent }}>{r.jobsThisMonth} jobs</div>
                    <div style={{ fontSize: 12, color: T.dim }}>this month</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Payout history */}
        <Section title="Payout history" icon={<ArrowUpRight size={16} color={T.accent} />}>
          {(payouts.data?.length ?? 0) === 0 ? (
            <p style={{ color: T.dim, fontSize: 14, margin: 0 }}>No payouts recorded yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {(payouts.data ?? []).map((p: any) => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${T.border}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{labelFor(p.payoutType)}</div>
                    <div style={{ fontSize: 12, color: T.dim }}>{p.payoutMonth}{p.jobValue ? ` · job ${money(p.jobValue)}` : ""}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>{money(p.amount)}</div>
                    <div style={{ fontSize: 12, color: p.status === "paid" ? T.green : T.amber, textTransform: "capitalize" }}>{p.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </PartnerLayout>
  );
}

function Stat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: string }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, color: accent ?? T.accent, marginBottom: 8 }}>
        {icon}
        <span style={{ fontSize: 12, fontWeight: 600, color: T.dim, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: -0.4 }}>{value}</div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px 22px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        {icon}
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
