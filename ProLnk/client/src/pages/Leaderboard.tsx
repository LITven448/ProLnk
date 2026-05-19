import { useState } from "react";
import {
  Trophy, Crown, Medal, Star, TrendingUp, TrendingDown,
  Minus, Share2, Zap, DollarSign, Briefcase, Users, Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Period = "week" | "month" | "alltime";
type Category = "earnings" | "jobs" | "referrals" | "rating";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function getInitials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

const AVATAR_PALETTE = [
  "#6D28D9", "#2563EB", "#059669", "#DC2626", "#D97706",
  "#0891B2", "#7C3AED", "#DB2777", "#0D9488", "#4338CA",
];

function avatarBg(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

const TRADES: Record<string, string> = {
  HVAC: "#EF4444", Electrical: "#F59E0B", Plumbing: "#3B82F6",
  Roofing: "#8B5CF6", Landscaping: "#22C55E", Painting: "#EC4899",
  Carpentry: "#F97316", Flooring: "#14B8A6", Insulation: "#6366F1",
  "General Contractor": "#0EA5E9",
};

const TIER_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  charter:  { label: "Charter",  color: "#FFD700", bg: "rgba(255,215,0,0.12)" },
  founding: { label: "Founding", color: "#C0C0C0", bg: "rgba(192,192,192,0.10)" },
  l3:       { label: "Level 3",  color: "#CD7F32", bg: "rgba(205,127,50,0.10)" },
  l4:       { label: "Level 4",  color: "#67E8F9", bg: "rgba(103,232,249,0.10)" },
};

interface Entry {
  id: string;
  name: string;
  trade: string;
  city: string;
  tier: string;
  earnings: number;
  jobs: number;
  referrals: number;
  rating: number;
  change: number;
}

const MOCK: Entry[] = [
  { id: "1",  name: "Marcus Thompson",    trade: "HVAC",          city: "Dallas",              tier: "charter",  earnings: 14820, jobs: 38, referrals: 12, rating: 4.97, change:  2 },
  { id: "2",  name: "Deja Williams",       trade: "Electrical",    city: "Fort Worth",          tier: "charter",  earnings: 12340, jobs: 31, referrals: 9,  rating: 4.95, change:  0 },
  { id: "3",  name: "Carlos Mendoza",      trade: "Plumbing",      city: "Frisco",              tier: "charter",  earnings: 11200, jobs: 29, referrals: 8,  rating: 4.92, change: -1 },
  { id: "4",  name: "Priya Sharma",        trade: "Roofing",       city: "McKinney",            tier: "founding", earnings:  9850, jobs: 26, referrals: 7,  rating: 4.90, change:  1 },
  { id: "5",  name: "Tyrone Benson",       trade: "Landscaping",   city: "Plano",               tier: "founding", earnings:  8760, jobs: 23, referrals: 6,  rating: 4.88, change:  3 },
  { id: "6",  name: "Lauren Kim",          trade: "Painting",      city: "Garland",             tier: "founding", earnings:  7940, jobs: 21, referrals: 6,  rating: 4.87, change: -2 },
  { id: "7",  name: "Andre Franklin",      trade: "Carpentry",     city: "Irving",              tier: "founding", earnings:  7120, jobs: 19, referrals: 5,  rating: 4.85, change:  1 },
  { id: "8",  name: "Sofia Reyes",         trade: "Flooring",      city: "Arlington",           tier: "founding", earnings:  6580, jobs: 17, referrals: 5,  rating: 4.84, change:  0 },
  { id: "9",  name: "Kevin Okafor",        trade: "HVAC",          city: "Denton",              tier: "l3",       earnings:  5940, jobs: 16, referrals: 4,  rating: 4.82, change:  2 },
  { id: "10", name: "Tamara Nguyen",       trade: "Electrical",    city: "Lewisville",          tier: "l3",       earnings:  5320, jobs: 14, referrals: 4,  rating: 4.80, change: -1 },
  { id: "11", name: "James Whitfield",     trade: "Plumbing",      city: "Mesquite",            tier: "l3",       earnings:  4890, jobs: 13, referrals: 3,  rating: 4.79, change:  0 },
  { id: "12", name: "Alicia Torres",       trade: "Insulation",    city: "Carrollton",          tier: "l3",       earnings:  4450, jobs: 12, referrals: 3,  rating: 4.78, change:  1 },
  { id: "13", name: "Robert Chen",         trade: "Roofing",       city: "Richardson",          tier: "l3",       earnings:  4120, jobs: 11, referrals: 3,  rating: 4.76, change: -1 },
  { id: "14", name: "You",                trade: "HVAC",          city: "Allen",               tier: "l3",       earnings:  3780, jobs: 10, referrals: 2,  rating: 4.74, change:  0 },
  { id: "15", name: "Monica Davis",        trade: "HVAC",          city: "Euless",              tier: "l4",       earnings:  3440, jobs:  9, referrals: 2,  rating: 4.72, change:  2 },
  { id: "16", name: "Derek Patel",         trade: "Electrical",    city: "Bedford",             tier: "l4",       earnings:  3100, jobs:  8, referrals: 2,  rating: 4.71, change: -1 },
  { id: "17", name: "Cassandra Lee",       trade: "Painting",      city: "Grapevine",           tier: "l4",       earnings:  2870, jobs:  8, referrals: 1,  rating: 4.70, change:  1 },
  { id: "18", name: "Omar Jackson",        trade: "Landscaping",   city: "Southlake",           tier: "l4",       earnings:  2540, jobs:  7, referrals: 1,  rating: 4.68, change:  0 },
  { id: "19", name: "Fatima Hassan",       trade: "Flooring",      city: "Colleyville",         tier: "l4",       earnings:  2210, jobs:  6, referrals: 1,  rating: 4.67, change: -2 },
  { id: "20", name: "Brandon Scott",       trade: "Carpentry",     city: "Keller",              tier: "l4",       earnings:  1980, jobs:  5, referrals: 1,  rating: 4.65, change:  1 },
  { id: "21", name: "Naomi Wright",        trade: "Roofing",       city: "Flower Mound",        tier: "l4",       earnings:  1750, jobs:  5, referrals: 0,  rating: 4.63, change:  0 },
  { id: "22", name: "Tyler Morrison",      trade: "HVAC",          city: "Hurst",               tier: "l4",       earnings:  1520, jobs:  4, referrals: 0,  rating: 4.61, change:  3 },
  { id: "23", name: "Jasmine Flores",      trade: "Electrical",    city: "North Richland Hills", tier: "l4",      earnings:  1290, jobs:  4, referrals: 0,  rating: 4.59, change: -1 },
  { id: "24", name: "Samuel Griffin",      trade: "Plumbing",      city: "Grand Prairie",       tier: "l4",       earnings:  1060, jobs:  3, referrals: 0,  rating: 4.57, change:  0 },
  { id: "25", name: "Christina Park",      trade: "Painting",      city: "Mansfield",           tier: "l4",       earnings:   830, jobs:  2, referrals: 0,  rating: 4.55, change: -1 },
];

const CURRENT_ID = "14";

function sortList(list: Entry[], cat: Category): Entry[] {
  return [...list].sort((a, b) => {
    if (cat === "earnings") return b.earnings - a.earnings;
    if (cat === "jobs") return b.jobs - a.jobs;
    if (cat === "referrals") return b.referrals - a.referrals;
    return b.rating - a.rating;
  });
}

function metricVal(e: Entry, cat: Category) {
  if (cat === "earnings") return formatCurrency(e.earnings);
  if (cat === "jobs") return `${e.jobs} jobs`;
  if (cat === "referrals") return `${e.referrals} refs`;
  return `${e.rating.toFixed(2)} ★`;
}

function ChangeChip({ change }: { change: number }) {
  if (change === 0) return (
    <span style={{ color: "#6B7280", fontSize: 11, display: "flex", alignItems: "center", gap: 2 }}>
      <Minus size={10} /> Same
    </span>
  );
  if (change > 0) return (
    <span style={{ color: "#22C55E", fontSize: 11, display: "flex", alignItems: "center", gap: 2 }}>
      <TrendingUp size={10} /> +{change}
    </span>
  );
  return (
    <span style={{ color: "#EF4444", fontSize: 11, display: "flex", alignItems: "center", gap: 2 }}>
      <TrendingDown size={10} /> {change}
    </span>
  );
}

function PodiumCard({ entry, position, isMe, cat }: { entry: Entry; position: 0 | 1 | 2; isMe: boolean; cat: Category }) {
  const medals = ["🥇", "🥈", "🥉"];
  const glows = [
    "0 0 24px 4px rgba(255,215,0,0.18)",
    "0 0 16px 2px rgba(192,192,192,0.14)",
    "0 0 14px 2px rgba(205,127,50,0.14)",
  ];
  const borders = ["rgba(255,215,0,0.40)", "rgba(192,192,192,0.25)", "rgba(205,127,50,0.25)"];
  const offsets = [0, 32, 56];
  const tierInfo = TIER_STYLES[entry.tier] ?? TIER_STYLES.l4;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1.5px solid ${borders[position]}`,
      borderRadius: 20,
      padding: "20px 16px 16px",
      marginTop: offsets[position],
      boxShadow: glows[position],
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      position: "relative",
    }}>
      {isMe && (
        <div style={{
          position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
          background: "#14B8A6", color: "#fff", fontSize: 10, fontWeight: 700,
          padding: "3px 10px", borderRadius: 99, whiteSpace: "nowrap",
        }}>YOU</div>
      )}
      <div style={{ fontSize: 32 }}>{medals[position]}</div>
      <div style={{
        width: position === 0 ? 56 : 44, height: position === 0 ? 56 : 44,
        borderRadius: "50%", background: avatarBg(entry.name),
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, color: "#fff", fontSize: position === 0 ? 20 : 15,
      }}>{getInitials(entry.name)}</div>
      <div style={{ fontWeight: 700, color: "#F0F4FF", fontSize: 13, textAlign: "center", maxWidth: 120 }}>{entry.name}</div>
      <div style={{ fontSize: 11, color: TRADES[entry.trade] ?? "#9CA3AF", fontWeight: 600 }}>{entry.trade}</div>
      <div style={{ fontSize: 11, color: "#6B7280" }}>{entry.city}</div>
      <div style={{
        marginTop: 4, padding: "2px 10px", borderRadius: 99,
        background: tierInfo.bg, color: tierInfo.color, fontSize: 10, fontWeight: 700,
      }}>{tierInfo.label}</div>
      <div style={{ marginTop: 4, fontWeight: 800, color: "#67E8F9", fontSize: 15 }}>{metricVal(entry, cat)}</div>
    </div>
  );
}

export default function Leaderboard() {
  const [period, setPeriod] = useState<Period>("month");
  const [cat, setCat] = useState<Category>("earnings");

  const sorted = sortList(MOCK, cat);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const myIdx = sorted.findIndex((e) => e.id === CURRENT_ID);
  const myEntry = myIdx >= 0 ? sorted[myIdx] : null;

  const podiumOrder: Array<{ e: Entry; pos: 0 | 1 | 2 }> = top3.length === 3
    ? [{ e: top3[1], pos: 1 }, { e: top3[0], pos: 0 }, { e: top3[2], pos: 2 }]
    : [];

  const PERIODS: { key: Period; label: string }[] = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "alltime", label: "All Time" },
  ];

  const CATS: { key: Category; label: string; icon: typeof DollarSign }[] = [
    { key: "earnings",  label: "Earnings",  icon: DollarSign },
    { key: "jobs",      label: "Jobs",      icon: Briefcase  },
    { key: "referrals", label: "Referrals", icon: Users      },
    { key: "rating",    label: "Rating",    icon: Star       },
  ];

  const rankBadgeStyle = (i: number) => {
    if (i === 0) return { background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.4)" };
    if (i === 1) return { background: "rgba(192,192,192,0.10)", color: "#C0C0C0", border: "1px solid rgba(192,192,192,0.3)" };
    if (i === 2) return { background: "rgba(205,127,50,0.10)", color: "#CD7F32", border: "1px solid rgba(205,127,50,0.3)" };
    return { background: "rgba(255,255,255,0.06)", color: "#9CA3AF", border: "1px solid rgba(255,255,255,0.08)" };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: 120 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px 0" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(103,232,249,0.08)", border: "1px solid rgba(103,232,249,0.2)",
            borderRadius: 99, padding: "6px 16px", marginBottom: 14,
          }}>
            <Trophy size={15} color="#67E8F9" />
            <span style={{ color: "#67E8F9", fontSize: 13, fontWeight: 600 }}>ProLnk Leaderboard</span>
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#F0F4FF", margin: 0, lineHeight: 1.2 }}>
            Top Performers <span style={{ color: "#67E8F9" }}>This Month</span>
          </h1>
          <p style={{ color: "#6B7280", fontSize: 14, marginTop: 8 }}>Compete, rise, and earn your place among ProLnk's elite pros.</p>
        </div>

        {/* Period Tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
          {PERIODS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              style={{
                padding: "7px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: period === key ? "#67E8F9" : "rgba(255,255,255,0.05)",
                color: period === key ? "#0A1628" : "#9CA3AF",
                border: period === key ? "none" : "1px solid rgba(255,255,255,0.09)",
                transition: "all 0.15s",
              }}
            >{label}</button>
          ))}
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
          {CATS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCat(key)}
              style={{
                padding: "7px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                background: cat === key ? "rgba(103,232,249,0.12)" : "rgba(255,255,255,0.04)",
                color: cat === key ? "#67E8F9" : "#6B7280",
                border: cat === key ? "1px solid rgba(103,232,249,0.35)" : "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.15s",
              }}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Podium */}
        {podiumOrder.length === 3 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 36, alignItems: "end" }}>
            {podiumOrder.map(({ e, pos }) => (
              <PodiumCard key={e.id} entry={e} position={pos} isMe={e.id === CURRENT_ID} cat={cat} />
            ))}
          </div>
        )}

        {/* Full rankings table */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 20,
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "40px 1fr 90px 80px 90px 70px",
            gap: "0 12px", padding: "10px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            {["#", "Partner", "Trade", "Metric", "Tier", "Chg"].map((h) => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: h === "#" ? "center" : "left" }}>{h}</div>
            ))}
          </div>
          {sorted.map((entry, i) => {
            const isMe = entry.id === CURRENT_ID;
            const tierInfo = TIER_STYLES[entry.tier] ?? TIER_STYLES.l4;
            return (
              <div
                key={entry.id}
                style={{
                  display: "grid", gridTemplateColumns: "40px 1fr 90px 80px 90px 70px",
                  gap: "0 12px", alignItems: "center",
                  padding: "10px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: isMe ? "rgba(20,184,166,0.07)" : "transparent",
                  borderLeft: isMe ? "2px solid #14B8A6" : "2px solid transparent",
                  transition: "background 0.12s",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 24, height: 24, borderRadius: 6, fontSize: 12, fontWeight: 700,
                    ...rankBadgeStyle(i),
                  }}>{i + 1}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: avatarBg(entry.name),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, color: "#fff", fontSize: 12, flexShrink: 0,
                  }}>{getInitials(entry.name)}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: isMe ? "#5EEAD4" : "#E5E7EB", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {entry.name}{isMe && <span style={{ color: "#14B8A6", fontSize: 11, marginLeft: 4 }}>(you)</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{entry.city}</div>
                  </div>
                </div>

                <div>
                  <span style={{
                    display: "inline-block", padding: "2px 7px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                    background: `${TRADES[entry.trade] ?? "#6B7280"}18`,
                    color: TRADES[entry.trade] ?? "#9CA3AF",
                    border: `1px solid ${TRADES[entry.trade] ?? "#6B7280"}33`,
                  }}>{entry.trade}</span>
                </div>

                <div style={{ fontWeight: 700, color: "#67E8F9", fontSize: 13 }}>{metricVal(entry, cat)}</div>

                <div>
                  <span style={{
                    display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700,
                    background: tierInfo.bg, color: tierInfo.color,
                  }}>{tierInfo.label}</span>
                </div>

                <ChangeChip change={entry.change} />
              </div>
            );
          })}
        </div>

        {/* My Rank sticky footer */}
        {myEntry && (
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "rgba(10,22,40,0.95)",
            borderTop: "1px solid rgba(20,184,166,0.25)",
            padding: "14px 20px",
            display: "flex", alignItems: "center", gap: 16,
            backdropFilter: "blur(12px)",
            zIndex: 50,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: avatarBg(myEntry.name),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, color: "#fff", fontSize: 15, flexShrink: 0,
              }}>{getInitials(myEntry.name)}</div>
              <div>
                <div style={{ color: "#14B8A6", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Rank</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 1 }}>
                  <span style={{ color: "#F0F4FF", fontWeight: 800, fontSize: 18 }}>#{myIdx + 1} overall</span>
                  <span style={{ color: "#6B7280", fontSize: 12 }}>•</span>
                  <span style={{ color: "#9CA3AF", fontSize: 12 }}>#12 among HVAC pros in DFW</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <div style={{ color: "#9CA3AF", fontSize: 11 }}>
                <Zap size={11} color="#F59E0B" style={{ display: "inline", marginRight: 4 }} />
                3 more jobs to reach top 40
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: `I'm ranked #${myIdx + 1} on ProLnk!`, text: `Check out my ProLnk ranking — I'm in the top performers!`, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(`I'm ranked #${myIdx + 1} on ProLnk! ${window.location.href}`);
                  }
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "#14B8A6", color: "#0A1628",
                  border: "none", borderRadius: 8, padding: "6px 14px",
                  fontWeight: 700, fontSize: 12, cursor: "pointer",
                }}
              >
                <Share2 size={12} /> Share My Rank
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
