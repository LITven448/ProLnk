import { trpc } from "@/lib/trpc";
import ProLnkLogo from "@/components/ProLnkLogo";
import { Link } from "wouter";
import { Trophy, Star, TrendingUp, Users, Crown, Medal, Award, DollarSign } from "lucide-react";

const TOTAL_SLOTS = 2125;

const TIER_META: Record<string, { color: string; label: string; bg: string; border: string; subCaption: string }> = {
  charter:  { color: "#F59E0B", label: "Charter",  bg: "#F59E0B20", border: "#F59E0B40", subCaption: "Slot 1–25"      },
  founding: { color: "#8B5CF6", label: "Founding", bg: "#8B5CF620", border: "#8B5CF640", subCaption: "Slot 26–125"    },
  l3:       { color: "#17C1E8", label: "L3",       bg: "#17C1E820", border: "#17C1E840", subCaption: "Slot 126–525"   },
  l4:       { color: "#22C55E", label: "L4",       bg: "#22C55E20", border: "#22C55E40", subCaption: "Slot 526–2125"  },
};

const RANK_BADGE_STYLES = [
  { bg: "linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)", icon: Trophy, shadow: "0 0 24px #D4AF3750", border: "#D4AF37" },
  { bg: "linear-gradient(135deg, #8A8B8F 0%, #C0C1C5 100%)", icon: Medal,  shadow: "0 0 16px #A8A9AD40", border: "#A8A9AD" },
  { bg: "linear-gradient(135deg, #8B4513 0%, #CD7F32 100%)", icon: Award,  shadow: "0 0 16px #CD7F3240", border: "#CD7F32" },
];

const PODIUM_ORDER = [1, 0, 2]; // silver left, gold center, bronze right

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
  const meta = TIER_META[key];
  if (!meta) return null;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
      letterSpacing: "0.04em",
    }}>
      {meta.label}
    </span>
  );
}

function OverrideEst({ referralCount }: { referralCount: number }) {
  const avgSubOverride = Math.round(referralCount * 199 * 0.12);
  return (
    <span style={{ fontSize: 11, color: "#17C1E8", fontWeight: 600 }}>
      ~${avgSubOverride.toLocaleString()}/mo override est.
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
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 24px #D4AF3730; } 50% { box-shadow: 0 0 40px #D4AF3760; } }
      `}</style>

      {/* SEO */}
      <title>Network Income Leaderboard — ProLnk Partner Network</title>
      <meta name="description" content="See who's building the ProLnk founding network fastest. Top partner recruiters earn the most in subscription override income across 4 network levels." />

      {/* Header nav */}
      <div style={{ borderBottom: "1px solid #1E3A5F" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/">
            <ProLnkLogo height={32} variant="dark" className="shrink-0 cursor-pointer" />
          </Link>
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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Hero section */}
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
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            Network Income Leaderboard
          </h1>
          <p style={{ fontSize: 15, color: "#4A6FA5", margin: "0 auto", maxWidth: 560, lineHeight: 1.6 }}>
            Partners who recruit the most pro network members earn the most in subscription overrides.
            Every partner you bring in pays 12% recurring on their $149/mo — across 4 network levels.
          </p>

          {/* Override rate pills */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            {[
              { level: "L1 Direct", rate: "12%", color: "#17C1E8" },
              { level: "L2 Network", rate: "6%",  color: "#8B5CF6" },
              { level: "L3 Network", rate: "3%",  color: "#F59E0B" },
              { level: "L4 Network", rate: "1.5%",color: "#22C55E" },
            ].map(({ level, rate, color }) => (
              <div key={level} style={{
                padding: "6px 14px", borderRadius: 999,
                background: `${color}15`, border: `1px solid ${color}30`,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ fontSize: 13, fontWeight: 800, color }}>{rate}</span>
                <span style={{ fontSize: 11, color: "#4A6FA5", fontWeight: 500 }}>{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slot fill bar */}
        <div style={{
          background: "#0F1F35", border: "1px solid #1E3A5F", borderRadius: 14,
          padding: "20px 24px", marginBottom: 40,
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
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#4A6FA5", flexWrap: "wrap", gap: 4 }}>
            {Object.entries(TIER_META).map(([, m]) => (
              <span key={m.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, display: "inline-block" }} />
                {m.label} — {m.subCaption}
              </span>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #1E3A5F", borderTopColor: "#D4AF37", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : leaders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#4A6FA5" }}>
            <Trophy style={{ width: 48, height: 48, margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>No entries yet</p>
            <p style={{ margin: 0, fontSize: 14 }}>Be the first to climb the leaderboard.</p>
          </div>
        ) : (
          <>
            {/* ── TOP 3 PODIUM ── */}
            {leaders.length >= 1 && (
              <div style={{ marginBottom: 48 }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <h2 style={{ fontSize: 13, fontWeight: 700, color: "#4A6FA5", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
                    Top Recruiters This Period
                  </h2>
                </div>

                {/* Podium layout: 2nd | 1st | 3rd */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "end", maxWidth: 720, margin: "0 auto" }}>
                  {PODIUM_ORDER.map((idx) => {
                    const p = leaders[idx];
                    if (!p) return <div key={idx} />;
                    const rank = idx + 1;
                    const s = RANK_BADGE_STYLES[idx];
                    const Icon = s.icon;
                    const isFirst = idx === 0;
                    const tierKey = (p.tier ?? "").toLowerCase();
                    const tierMeta = TIER_META[tierKey];

                    return (
                      <div key={idx} style={{
                        background: "#0F1F35",
                        border: `1.5px solid ${s.border}`,
                        borderRadius: 18,
                        padding: isFirst ? "32px 20px 24px" : "24px 20px 20px",
                        textAlign: "center",
                        boxShadow: isFirst ? `${s.shadow}, 0 20px 60px rgba(0,0,0,0.3)` : s.shadow,
                        position: "relative",
                        overflow: "hidden",
                        animation: isFirst ? "pulse-glow 3s ease-in-out infinite" : undefined,
                        transform: isFirst ? "scale(1.04)" : undefined,
                      }}>
                        {/* Top accent bar */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.bg }} />

                        {/* Rank label */}
                        <div style={{
                          position: "absolute", top: 10, right: 12,
                          fontSize: 10, fontWeight: 700, color: s.border, letterSpacing: "0.06em",
                        }}>
                          #{rank}
                        </div>

                        {/* Medal icon */}
                        <div style={{
                          width: isFirst ? 60 : 52, height: isFirst ? 60 : 52,
                          borderRadius: "50%", margin: "0 auto 14px",
                          background: s.bg, boxShadow: s.shadow,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Icon style={{ width: isFirst ? 26 : 22, height: isFirst ? 26 : 22, color: "#fff" }} />
                        </div>

                        {/* Name */}
                        <div style={{ fontSize: isFirst ? 16 : 14, fontWeight: 700, color: "#FFFFFF", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.name}
                        </div>

                        {/* Trade / location */}
                        <div style={{ fontSize: 11, color: "#4A6FA5", marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.trade}{p.city ? ` · ${p.city}` : ""}{p.state ? `, ${p.state}` : ""}
                        </div>

                        {/* Tier badge */}
                        {tierMeta && (
                          <div style={{ marginBottom: 12 }}>
                            <TierBadge tier={p.tier} />
                          </div>
                        )}

                        {/* Recruit count — primary metric */}
                        <div style={{
                          background: "rgba(255,255,255,0.04)", borderRadius: 10,
                          padding: "10px 8px", marginBottom: 8,
                        }}>
                          <div style={{ fontSize: isFirst ? 36 : 28, fontWeight: 800, color: "#D4AF37", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                            {p.referralCount ?? 0}
                          </div>
                          <div style={{ fontSize: 9, color: "#4A6FA5", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>
                            recruits
                          </div>
                        </div>

                        {/* Override estimate */}
                        <OverrideEst referralCount={p.referralCount ?? 0} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── RANKS 4–20 TABLE ── */}
            {leaders.length > 3 && (
              <div style={{ background: "#0F1F35", border: "1px solid #1E3A5F", borderRadius: 16, overflow: "hidden", marginBottom: 40 }}>
                {/* Table header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr 100px 90px 90px 110px",
                  padding: "10px 20px",
                  background: "#0A1628",
                  fontSize: 10, fontWeight: 700, color: "#4A6FA5",
                  textTransform: "uppercase", letterSpacing: "0.07em",
                  borderBottom: "1px solid #1E3A5F",
                }}>
                  <span>Rank</span>
                  <span>Partner</span>
                  <span>Tier</span>
                  <span>Trade</span>
                  <span style={{ textAlign: "center" }}>Recruits</span>
                  <span style={{ textAlign: "right" }}>Est. Override</span>
                </div>

                {leaders.slice(3, 20).map((p: any, i: number) => {
                  const rank = i + 4;
                  const tierKey = (p.tier ?? "").toLowerCase();
                  const tierMeta = TIER_META[tierKey];
                  const recruits = p.referralCount ?? 0;
                  const overrideEst = Math.round(recruits * 199 * 0.12);

                  return (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "52px 1fr 100px 90px 90px 110px",
                        padding: "13px 20px",
                        borderTop: "1px solid #1E3A5F",
                        alignItems: "center",
                        transition: "background 0.15s",
                        cursor: "default",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                    >
                      <RankBadge rank={rank} />

                      <div style={{ minWidth: 0, paddingRight: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.name}
                        </div>
                        {p.city && (
                          <div style={{ fontSize: 11, color: "#4A6FA5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {p.city}{p.state ? `, ${p.state}` : ""}
                          </div>
                        )}
                      </div>

                      <div>
                        {tierMeta ? (
                          <span style={{
                            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                            background: tierMeta.bg, color: tierMeta.color, border: `1px solid ${tierMeta.border}`,
                            letterSpacing: "0.04em", whiteSpace: "nowrap",
                          }}>
                            {tierMeta.label}
                          </span>
                        ) : (
                          <span style={{ fontSize: 11, color: "#4A6FA5" }}>—</span>
                        )}
                      </div>

                      <div style={{ fontSize: 12, color: "#4A6FA5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.trade ?? "—"}
                      </div>

                      <div style={{ textAlign: "center" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          minWidth: 32, height: 24, borderRadius: 8,
                          background: recruits > 0 ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                          fontSize: 13, fontWeight: 700,
                          color: recruits > 0 ? "#D4AF37" : "#4A6FA5",
                          fontVariantNumeric: "tabular-nums",
                        }}>
                          {recruits}
                        </span>
                      </div>

                      <div style={{ textAlign: "right", fontSize: 12, color: "#17C1E8", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                        {overrideEst > 0 ? `~$${overrideEst.toLocaleString()}/mo` : "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── CTA ── */}
            <div style={{
              background: "linear-gradient(135deg, #0F1F35 0%, #0d2040 100%)",
              border: "1px solid #1E3A5F",
              borderRadius: 18, padding: "32px 32px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 24, flexWrap: "wrap",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <DollarSign style={{ width: 18, height: 18, color: "#17C1E8" }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>
                    Every recruit compounds your income
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#4A6FA5", maxWidth: 400, lineHeight: 1.5 }}>
                  Each partner you recruit pays 12% of their $149/mo subscription to you — forever.
                  10 recruits = ~$179/mo in overrides before you close a single job.
                </p>
              </div>
              <Link href="/apply">
                <button style={{
                  padding: "14px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                  background: "linear-gradient(135deg, #D4AF37, #F5D060)",
                  color: "#1a1000", border: "none", cursor: "pointer",
                  boxShadow: "0 0 30px rgba(212,175,55,0.3)",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s",
                }}>
                  Join — {spotsLeft.toLocaleString()} Slots Left
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
