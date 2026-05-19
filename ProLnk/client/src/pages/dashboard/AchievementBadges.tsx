import { useState } from "react";
import { Trophy, Star, Zap, Flame, Cloud, Camera, Users, DollarSign, Crown, Medal, Award, Gem, ChevronUp } from "lucide-react";

interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  progressLabel?: string;
  xp: number;
}

const BADGES: Badge[] = [
  {
    id: "founding",
    emoji: "🏆",
    title: "Founding Member",
    description: "Charter tier partner",
    earned: true,
    earnedDate: "Jan 2025″,
    xp: 500,
  },
  {
    id: "speed",
    emoji: "⚡",
    title: "Speed Demon",
    description: "Responded to lead in under 5 min",
    earned: true,
    earnedDate: "Feb 2025″,
    xp: 200,
  },
  {
    id: "fivestar",
    emoji: "⭐",
    title: "5-Star Pro",
    description: "5.0 average after 10+ reviews",
    earned: true,
    earnedDate: "Mar 2025″,
    xp: 300,
  },
  {
    id: "streak",
    emoji: "🔥",
    title: "7-Day Streak",
    description: "7 consecutive days with job activity",
    earned: true,
    earnedDate: "Apr 2025″,
    xp: 175,
  },
  {
    id: "storm",
    emoji: "🌩️",
    title: "Storm Chaser",
    description: "Accepted storm lead within 1 hour",
    earned: true,
    earnedDate: "Apr 2025″,
    xp: 250,
  },
  {
    id: "photo",
    emoji: "📸",
    title: "Photo Pro",
    description: "Uploaded 100+ job photos",
    earned: true,
    earnedDate: "May 2025″,
    xp: 150,
  },
  {
    id: "networker",
    emoji: "🤝",
    title: "Networker",
    description: "Recruited 3 partners",
    earned: true,
    earnedDate: "May 2025″,
    xp: 225,
  },
  {
    id: "commking",
    emoji: "💰",
    title: "Commission King",
    description: "Earned $1,000 in a single day",
    earned: true,
    earnedDate: "May 2025″,
    xp: 400,
  },
  {
    id: "elite",
    emoji: "👑",
    title: "Elite Status",
    description: "Reach Elite tier",
    earned: false,
    progress: 62,
    progressLabel: "62% to Elite",
    xp: 1000,
  },
  {
    id: "century",
    emoji: "🏅",
    title: "Century Club",
    description: "100 completed jobs",
    earned: false,
    progress: 84,
    progressLabel: "84/100 jobs",
    xp: 750,
  },
  {
    id: "recruiter",
    emoji: "🌟",
    title: "Super Recruiter",
    description: "Recruit 10 partners",
    earned: false,
    progress: 30,
    progressLabel: "3/10 partners",
    xp: 600,
  },
  {
    id: "diamond",
    emoji: "💎",
    title: "Diamond Earner",
    description: "$10,000 in a single month",
    earned: false,
    progress: 31,
    progressLabel: "31% — $3,100/$10,000″,
    xp: 1500,
  },
];

const XP_LOG = [
  { action: "Completed job #4821″, xp: 150, time: "2h ago" },
  { action: "Accepted lead <5 min", xp: 50, time: "5h ago" },
  { action: "5-star review received", xp: 75, time: "Yesterday" },
  { action: "Uploaded 5 job photos", xp: 25, time: "2 days ago" },
  { action: "Recruited new partner", xp: 100, time: "3 days ago" },
];

const CURRENT_XP = 2840;
const NEXT_LEVEL_XP = 3500;
const CURRENT_LEVEL = 7;
const LEVEL_TITLE = "Rising Star";

export default function AchievementBadges() {
  const [tab, setTab] = useState<"earned" | "locked">("earned");

  const earned = BADGES.filter(b => b.earned);
  const locked = BADGES.filter(b => !b.earned);
  const xpPct = Math.round((CURRENT_XP / NEXT_LEVEL_XP) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, padding: "24px 16px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F1F5F9″, margin: 0 }}>Achievements</h1>
          <p style={{ color: "#94A3B8″, marginTop: 4, fontSize: 14 }}>Your ProLnk milestones</p>
        </div>

        {/* Current level card */}
        <div style={{
          background: "linear-gradient(135deg, #1a2f50 0%, #0F2944 100%)",
          border: "1px solid #00B5B844″,
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -20, right: -20, width: 120, height: 120,
            borderRadius: "50%", background: "#00B5B811″,
          }} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: "linear-gradient(135deg, #F59E0B, #EF4444)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, flexShrink: 0,
            }}>
              🏆
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ color: "#94A3B8″, fontSize: 12, marginBottom: 2 }}>Current Level</div>
              <div style={{ color: "#F1F5F9″, fontSize: 22, fontWeight: 800 }}>
                Level {CURRENT_LEVEL}: {LEVEL_TITLE}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                <div style={{
                  flex: 1, height: 10, background: "#1E3A5F", borderRadius: 10, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%", width: `${xpPct}%`,
                    background: "linear-gradient(90deg, #00B5B8, #8B5CF6)",
                    borderRadius: 10, transition: "width 0.6s ease",
                  }} />
                </div>
                <div style={{ color: "#94A3B8″, fontSize: 13, whiteSpace: "nowrap" }}>
                  {CURRENT_XP.toLocaleString()} / {NEXT_LEVEL_XP.toLocaleString()} XP
                </div>
              </div>
              <div style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>
                {(NEXT_LEVEL_XP - CURRENT_XP).toLocaleString()} XP to Level {CURRENT_LEVEL + 1}
              </div>
            </div>
            <div style={{
              background: "#0A1628″, borderRadius: 12, padding: "12px 20px", textAlign: "center",
            }}>
              <div style={{ color: "#00B5B8″, fontSize: 22, fontWeight: 800 }}>#{47}</div>
              <div style={{ color: "#64748B", fontSize: 11, marginTop: 2 }}>leaderboard rank</div>
              <div style={{ color: "#94A3B8″, fontSize: 11 }}>this month</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#0D1F35″, borderRadius: 10, padding: 4, width: "fit-content" }}>
          {(["earned", "locked"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                background: tab === t ? "#1E3A5F" : "transparent",
                color: tab === t ? "#F1F5F9″ : "#64748B",
                fontWeight: tab === t ? 600 : 400, fontSize: 14,
                transition: "all 0.2s",
              }}
            >
              {t === "earned" ? `Earned (${earned.length})` : `Locked (${locked.length})`}
            </button>
          ))}
        </div>

        {/* Badge grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}>
          {(tab === "earned" ? earned : locked).map(badge => (
            <div key={badge.id} style={{
              background: badge.earned ? "#0D1F35″ : "#0A1628",
              border: `1px solid ${badge.earned ? "#1E3A5F" : "#0F2030"}`,
              borderRadius: 12,
              padding: 16,
              opacity: badge.earned ? 1 : 0.75,
              position: "relative",
              overflow: "hidden",
            }}>
              {badge.earned && (
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: "#10B98122″, borderRadius: 6, padding: "2px 8px",
                  color: "#10B981″, fontSize: 11, fontWeight: 600,
                }}>
                  Earned
                </div>
              )}
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 12, flexShrink: 0,
                  background: badge.earned
                    ? "linear-gradient(135deg, #1E3A5F, #0F2944)"
                    : "#0D1F35″,
                  border: `1px solid ${badge.earned ? "#00B5B844" : "#1E3A5F33"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                  filter: badge.earned ? "none" : "grayscale(80%)",
                }}>
                  {badge.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: badge.earned ? "#F1F5F9″ : "#64748B", fontWeight: 600, fontSize: 14 }}>
                    {badge.title}
                  </div>
                  <div style={{ color: "#64748B", fontSize: 12, marginTop: 2 }}>{badge.description}</div>
                  {badge.earned && badge.earnedDate && (
                    <div style={{ color: "#00B5B8″, fontSize: 11, marginTop: 4 }}>Earned {badge.earnedDate}</div>
                  )}
                  {!badge.earned && badge.progress !== undefined && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ height: 5, background: "#1E3A5F", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${badge.progress}%`,
                          background: "#00B5B8″, borderRadius: 4,
                        }} />
                      </div>
                      <div style={{ color: "#94A3B8″, fontSize: 11, marginTop: 4 }}>{badge.progressLabel}</div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{
                marginTop: 12, paddingTop: 10, borderTop: "1px solid #1E3A5F33″,
                display: "flex", justifyContent: "flex-end",
              }}>
                <div style={{
                  color: badge.earned ? "#F59E0B" : "#475569″, fontSize: 12, fontWeight: 600,
                }}>
                  +{badge.xp} XP
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* XP log */}
        <div style={{
          background: "#0D1F35″,
          border: "1px solid #1E3A5F",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 16,
        }}>
          <div style={{ color: "#F1F5F9″, fontWeight: 600, fontSize: 15, marginBottom: 14 }}>
            Recent XP Activity
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {XP_LOG.map((entry, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px",
                background: "#0A1628″,
                borderRadius: 8,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: "#1E3A5F", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Zap size={13} color="#F59E0B" />
                  </div>
                  <div>
                    <div style={{ color: "#F1F5F9″, fontSize: 13 }}>{entry.action}</div>
                    <div style={{ color: "#64748B", fontSize: 11 }}>{entry.time}</div>
                  </div>
                </div>
                <div style={{ color: "#10B981″, fontWeight: 700, fontSize: 14 }}>
                  +{entry.xp} XP
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
