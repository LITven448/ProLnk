import { trpc } from "@/lib/trpc";
import ProLnkLogo from "@/components/ProLnkLogo";
import { Link } from "wouter";
import { Trophy, Star, TrendingUp, Users, Crown, Medal, Award } from "lucide-react";

const TOTAL_SLOTS = 2125;

const TIER_COLORS: Record<string, string> = {
  charter:  "#F59E0B",
  founding: "#8B5CF6",
  l3:       "#17C1E8",
  l4:       "#22C55E",
};

const RANK_BADGE_STYLES = [
  { bg: "linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)", icon: Trophy,  shadow: "0 0 24px #D4AF3750" },
  { bg: "linear-gradient(135deg, #8A8B8F 0%, #C0C1C5 100%)", icon: Medal,   shadow: "0 0 16px #A8A9AD40" },
  { bg: "linear-gradient(135deg, #8B4513 0%, #CD7F32 100%)", icon: Award,   shadow: "0 0 16px #CD7F3240" },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank > 3) {
    return (
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, color: "#94A3B8", flexShrink: 0,
      }}>
        #{rank}
      </div>
    );
  }
  const s = RANK_BADGE_STYLES[rank - 1];
  const Icon = s.icon;
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: s.bg, boxShadow: s.shadow,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <Icon style={{ width: 16, height: 16, color: "#fff" }} />
    </div>
  );
}

function TierBadge({ tier }: { tier?: string }) {
  if (!tier) return null;
  const key = tier.toLowerCase();
  const color = TIER_COLORS[key] ?? "#64748B";
  const labels: Record<string, string> = { charter: "Charter", founding: "Founding", l3: "L3", l4: "L4" };
  const label = labels[key] ?? tier;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: `${color}20`, color, border: `1px solid ${color}40`,
      letterSpacing: "0.04em",
    }}>
      {label}
    </span>
  );
}

export default function Leaderboard() {
  const { data: result, isLoading } = trpc.proWaitlist.getLeaderboard.useQuery();

  const leaders = Array.isArray(result) ? result : [];
  const totalSignups: number = leaders.length;
  const pctFilled = Math.min(Math.round((totalSignups / TOTAL_SLOTS) * 100), 100);
  const spotsLeft = Math.max(TOTAL_SLOTS - totalSignups, 0);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #050d1a 0%, #0a1628 55%, #0d1f3c 100%)" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1E3A5F" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/">
            <ProLnkLogo height={32} variant="dark" className="shrink-0 cursor-pointer" />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/apply">
              <button style={{
                padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                background: "linear-gradient(135deg, #D4AF37, #F5D060)",
                color: "#1a1000", border: "none", cursor: "pointer",
              }}>
                Join the Network
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 60px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 999, marginBottom: 16,
            background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)",
            color: "#D4AF37", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
          }}>
            <Crown style={{ width: 13, height: 13 }} />
            FOUNDING NETWORK LEADERBOARD
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            Top Referrers
          </h1>
          <p style={{ fontSize: 15, color: "#4A6FA5", margin: 0, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
            The professionals building the ProLnk founding network. Ranked by referrals.
          </p>
        </div>

        {/* Slot counter bar */}
        <div style={{
          background: "#0F1F35", border: "1px solid #1E3A5F", borderRadius: 14,
          padding: "20px 24px", marginBottom: 32,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 8 }}>
              <Users style={{ width: 15, height: 15, color: "#D4AF37" }} />
              {totalSignups.toLocaleString()} of {TOTAL_SLOTS.toLocaleString()} founding slots filled
            </span>
            <span style={{ fontSize: 12, color: "#D4AF37", fontWeight: 700 }}>
              {spotsLeft.toLocaleString()} remaining
            </span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${pctFilled}%`,
              background: "linear-gradient(90deg, #D4AF37, #F5D060)",
              borderRadius: 6,
              transition: "width 0.8s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "#4A6FA5" }}>
            <span>Charter (25)</span>
            <span>Founding (100)</span>
            <span>L3 (400)</span>
            <span>L4 (1,600)</span>
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #1E3A5F", borderTopColor: "#D4AF37", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : leaders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#4A6FA5" }}>
            <Trophy style={{ width: 40, height: 40, margin: "0 auto 12px", opacity: 0.3 }} />
            <p style={{ margin: 0 }}>No referral data yet — be the first to climb the board.</p>
          </div>
        ) : (
          <>
            {/* Top 3 cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
              {leaders.slice(0, 3).map((p: any, i: number) => {
                const s = RANK_BADGE_STYLES[i];
                const Icon = s.icon;
                const tierColor = TIER_COLORS[(p.tier ?? "").toLowerCase()] ?? "#64748B";
                return (
                  <div key={i} style={{
                    background: "#0F1F35", border: `1.5px solid ${i === 0 ? "#D4AF37" : i === 1 ? "#A8A9AD" : "#CD7F32"}`,
                    borderRadius: 16, padding: "24px 20px", textAlign: "center",
                    boxShadow: s.shadow, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: s.bg,
                    }} />
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%", margin: "0 auto 12px",
                      background: s.bg, boxShadow: s.shadow,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon style={{ width: 22, height: 22, color: "#fff" }} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#4A6FA5", marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.trade}{p.city ? ` · ${p.city}` : ""}{p.state ? `, ${p.state}` : ""}
                    </div>
                    <TierBadge tier={p.tier} />
                    <div style={{ marginTop: 14, fontSize: 28, fontWeight: 800, color: "#D4AF37", fontVariantNumeric: "tabular-nums" }}>
                      {p.referralCount ?? 0}
                    </div>
                    <div style={{ fontSize: 10, color: "#4A6FA5", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>referrals</div>
                  </div>
                );
              })}
            </div>

            {/* Ranks 4-20 table */}
            <div style={{ background: "#0F1F35", border: "1px solid #1E3A5F", borderRadius: 14, overflow: "hidden", marginBottom: 32 }}>
              {/* Table header */}
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 120px 80px 80px",
                padding: "10px 20px", background: "#0A1628",
                fontSize: 10, fontWeight: 700, color: "#4A6FA5", textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                <span>#</span>
                <span>Name</span>
                <span>Trade</span>
                <span style={{ textAlign: "center" }}>City</span>
                <span style={{ textAlign: "right" }}>Referrals</span>
              </div>

              {leaders.slice(3, 20).map((p: any, i: number) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "48px 1fr 120px 80px 80px",
                  padding: "12px 20px", borderTop: "1px solid #1E3A5F",
                  alignItems: "center",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                >
                  <RankBadge rank={i + 4} />
                  <div style={{ minWidth: 0, paddingRight: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                    <TierBadge tier={p.tier} />
                  </div>
                  <div style={{ fontSize: 12, color: "#4A6FA5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.trade ?? "—"}</div>
                  <div style={{ fontSize: 12, color: "#4A6FA5", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.city ? `${p.city}` : "—"}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#D4AF37", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {p.referralCount ?? 0}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#4A6FA5", marginBottom: 16 }}>
                Every referral earns you commission overrides and moves you up the board.
              </div>
              <Link href="/apply">
                <button style={{
                  padding: "14px 36px", borderRadius: 12, fontSize: 15, fontWeight: 700,
                  background: "linear-gradient(135deg, #D4AF37, #F5D060)",
                  color: "#1a1000", border: "none", cursor: "pointer",
                  boxShadow: "0 0 30px rgba(212,175,55,0.3)",
                  transition: "opacity 0.2s",
                }}>
                  Join the Network — {spotsLeft.toLocaleString()} Slots Left
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
