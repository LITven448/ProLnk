import { trpc } from "@/lib/trpc";
import ProLnkLogo from "@/components/ProLnkLogo";
import { Link } from "wouter";
import { Trophy, Star, TrendingUp, Award, Users, DollarSign, Briefcase, Flame, Zap, Shield, Crown, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useState, useEffect } from "react";

const TIER_COLORS: Record<string, string> = {
  scout:      "#64748b",
  pro:        "#0A1628",
  crew:       "#6366f1",
  company:    "#d4af37",
  enterprise: "#94a3b8",
};

const BADGE_LABEL: Record<string, string> = {
  scout:      "Scout",
  pro:        "Pro",
  crew:       "Crew",
  company:    "Company",
  enterprise: "Enterprise",
};

const TIER_ICONS: Record<string, React.ReactNode> = {
  scout:      <Shield className="w-3 h-3" />,
  pro:        <Zap className="w-3 h-3" />,
  crew:       <Users className="w-3 h-3" />,
  company:    <Crown className="w-3 h-3" />,
  enterprise: <Trophy className="w-3 h-3" />,
};

const RANK_STYLES = [
  {
    bg: "linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)",
    text: "#fff",
    shadow: "0 0 30px #D4AF3740",
    cardBg: "linear-gradient(135deg, #1a1400 0%, #2a2000 100%)",
    cardBorder: "#D4AF37",
    glow: "#D4AF3730",
    medal: "",
  },
  {
    bg: "linear-gradient(135deg, #8A8B8F 0%, #C0C1C5 100%)",
    text: "#fff",
    shadow: "0 0 20px #A8A9AD30",
    cardBg: "linear-gradient(135deg, #111418 0%, #1a1e24 100%)",
    cardBorder: "#A8A9AD",
    glow: "#A8A9AD20",
    medal: "",
  },
  {
    bg: "linear-gradient(135deg, #8B4513 0%, #CD7F32 100%)",
    text: "#fff",
    shadow: "0 0 20px #CD7F3230",
    cardBg: "linear-gradient(135deg, #130800 0%, #1e1000 100%)",
    cardBorder: "#CD7F32",
    glow: "#CD7F3220",
    medal: "",
  },
];

// Simulated live activity feed items
const ACTIVITY_ITEMS = [
  { text: "Apex Lawn Care just closed a $1,200 referral in Frisco", time: "2m ago" },
  { text: "DFW Pest Solutions earned $340 commission from a new lead", time: "5m ago" },
  { text: "Premier Roofing moved up 2 spots on the leaderboard", time: "12m ago" },
  { text: "Green Edge Landscaping logged 3 new jobs this morning", time: "18m ago" },
  { text: "Lone Star HVAC just hit 50 referrals -- unlocking Crew tier", time: "24m ago" },
  { text: "TruClean Services received 4 new inbound leads today", time: "31m ago" },
  { text: "Precision Plumbing earned $890 in commissions this week", time: "45m ago" },
  { text: "DFW Electrical Solutions joined the ProLnk network", time: "1h ago" },
];

function ActivityTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ACTIVITY_ITEMS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const item = ACTIVITY_ITEMS[idx];
  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <span className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#0A1628" }} />
      <span
        className="text-xs transition-opacity duration-400"
        style={{ color: "#94A3B8", opacity: visible ? 1 : 0 }}
      >
        {item.text}
        <span className="ml-2" style={{ color: "#4A6FA5" }}>{item.time}</span>
      </span>
    </div>
  );
}

function RankChange({ change }: { change: number }) {
  if (change > 0) return (
    <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "#10B981" }}>
      <ArrowUp className="w-3 h-3" />+{change}
    </span>
  );
  if (change < 0) return (
    <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "#EF4444" }}>
      <ArrowDown className="w-3 h-3" />{change}
    </span>
  );
  return <Minus className="w-3 h-3" style={{ color: "#4A6FA5" }} />;
}

export default function Leaderboard() {
  const { data: leaders, isLoading } = trpc.directory.getLeaderboard.useQuery();
  const { data: stats } = trpc.directory.getPublicStats.useQuery();

  // Assign simulated rank changes for visual interest
  const rankChanges = [0, 2, -1, 1, 0, 3, -2, 0, 1, -1];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #050d1a 0%, #0a1628 55%, #0d1f3c 100%)" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "#1E3A5F" }}>
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <ProLnkLogo height={32} variant="dark" className="shrink-0 cursor-pointer" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/partners">
              <span className="text-sm font-medium hover:underline hidden sm:block" style={{ color: "#0A1628" }}>
                Browse Directory 
              </span>
            </Link>
            <Link href="/apply">
              <button
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0A1628" }}
              >
                Join Network
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Live activity ticker */}
      <div className="border-b py-2" style={{ borderColor: "#1E3A5F", backgroundColor: "#060e1e" }}>
        <div className="container">
          <ActivityTicker />
        </div>
      </div>

      <div className="container py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: "#D4AF3720", color: "#D4AF37", border: "1px solid #D4AF3740" }}>
            <Trophy className="w-3.5 h-3.5" /> PARTNER LEADERBOARD -- DFW
          </div>
          <h1 className="text-4xl md:text-5xl font-heading text-white mb-3">Top Earning Partners</h1>
          <p className="text-base max-w-lg mx-auto mb-6" style={{ color: "#4A6FA5" }}>
            Ranked by referrals generated, jobs completed, and commissions earned. Updated in real time.
          </p>

          {/* Network stats bar */}
          {stats && (
            <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl border" style={{ backgroundColor: "#0F1F35", borderColor: "#1E3A5F" }}>
              {[
                { label: "Active Partners", value: stats.totalPartners.toLocaleString(), icon: Users },
                { label: "Jobs Logged", value: stats.totalJobs.toLocaleString(), icon: Briefcase },
                { label: "Leads Closed", value: stats.totalLeads.toLocaleString(), icon: TrendingUp },
                { label: "Commissions Paid", value: `$${(stats.totalCommissionsPaid / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign },
              ].map(s => (
                <div key={s.label} className="text-center hidden sm:block">
                  <div className="font-heading text-white text-lg">{s.value}</div>
                  <div className="text-xs" style={{ color: "#4A6FA5" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#0A1628", borderTopColor: "transparent" }} />
          </div>
        ) : !leaders || leaders.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#4A6FA5" }}>No leaderboard data yet.</div>
        ) : (
          <>
            {/* Top 3 podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {(leaders as any[]).slice(0, 3).map((p: any, i: number) => {
                const style = RANK_STYLES[i];
                const tier = (p.tier ?? "scout").toLowerCase();
                return (
                  <Link key={p.id} href={`/partner/${p.id}`}>
                    <div
                      className="relative rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-all duration-200"
                      style={{
                        background: style.cardBg,
                        border: `1.5px solid ${style.cardBorder}`,
                        boxShadow: style.shadow,
                      }}
                    >
                      {/* Glow overlay */}
                      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse at top, ${style.glow} 0%, transparent 70%)` }} />

                      {/* Medal */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">{style.medal}</div>

                      <div className="text-center mt-2 relative">
                        {/* Avatar */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 relative"
                          style={{ background: `linear-gradient(135deg, ${TIER_COLORS[tier] ?? "#0A1628"} 0%, ${style.cardBorder} 100%)` }}
                        >
                          {String(p.businessName).charAt(0).toUpperCase()}
                          {/* Hot streak indicator */}
                          {p.referralCount > 20 && (
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EF4444" }}>
                              <Flame className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <h3 className="font-heading text-white text-sm tracking-wide mb-1 truncate px-2">
                          {String(p.businessName).toUpperCase()}
                        </h3>
                        <p className="text-xs mb-3 truncate" style={{ color: "#94A3B8" }}>{p.businessType}  {p.serviceArea}</p>

                        {/* Tier badge */}
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `${TIER_COLORS[tier] ?? "#0A1628"}20`, color: TIER_COLORS[tier] ?? "#0A1628", border: `1px solid ${TIER_COLORS[tier] ?? "#0A1628"}40` }}>
                          {TIER_ICONS[tier]}
                          {BADGE_LABEL[tier] ?? "Scout"}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mt-4 relative">
                        {[
                          { label: "Referrals", value: p.referralCount ?? 0, icon: TrendingUp, color: "#0A1628" },
                          { label: "Jobs", value: p.jobCount ?? 0, icon: Briefcase, color: "#6366f1" },
                          { label: "Earned", value: `$${Math.round((p.totalCommissionsEarned ?? 0) / 100).toLocaleString()}`, icon: DollarSign, color: "#10B981" },
                        ].map(stat => (
                          <div key={stat.label} className="text-center rounded-xl p-2" style={{ backgroundColor: "#0A1628" }}>
                            <stat.icon className="w-3 h-3 mx-auto mb-1" style={{ color: stat.color }} />
                            <div className="font-heading text-white text-sm">{stat.value}</div>
                            <div className="text-xs" style={{ color: "#4A6FA5" }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Rating */}
                      {parseFloat(p.avgRating ?? 0) > 0 && (
                        <div className="flex items-center justify-center gap-1 mt-3">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className="w-3 h-3" style={{ color: s <= Math.round(parseFloat(p.avgRating)) ? "#D4AF37" : "#1E3A5F", fill: s <= Math.round(parseFloat(p.avgRating)) ? "#D4AF37" : "none" }} />
                          ))}
                          <span className="text-xs ml-1" style={{ color: "#94A3B8" }}>{parseFloat(p.avgRating).toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Ranks 4-10 table */}
            <div className="rounded-2xl border overflow-hidden mb-8" style={{ backgroundColor: "#0F1F35", borderColor: "#1E3A5F" }}>
              <div className="px-5 py-3 border-b" style={{ borderColor: "#1E3A5F", backgroundColor: "#0A1628" }}>
                <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#4A6FA5" }}>Rankings 4-{Math.min(10, (leaders as any[]).length)}</h2>
              </div>
              <div className="px-5 py-2 border-b grid grid-cols-12 text-xs font-medium" style={{ borderColor: "#1E3A5F", color: "#4A6FA5" }}>
                <span className="col-span-1">#</span>
                <span className="col-span-4">Partner</span>
                <span className="col-span-2 text-center">Referrals</span>
                <span className="col-span-2 text-center">Jobs</span>
                <span className="col-span-2 text-center">Earned</span>
                <span className="col-span-1 text-right">Chg</span>
              </div>
              {(leaders as any[]).slice(3).map((p: any, i: number) => {
                const tier = (p.tier ?? "scout").toLowerCase();
                return (
                  <Link key={p.id} href={`/partner/${p.id}`}>
                    <div
                      className="px-5 py-3.5 border-b grid grid-cols-12 items-center hover:bg-white/5 transition-colors cursor-pointer"
                      style={{ borderColor: "#1E3A5F" }}
                    >
                      <span className="col-span-1 font-heading text-white text-sm">#{i + 4}</span>
                      <div className="col-span-4 flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${TIER_COLORS[tier] ?? "#1E3A5F"} 0%, #1E3A5F 100%)` }}
                        >
                          {String(p.businessName).charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-white text-sm font-medium truncate">{p.businessName}</div>
                          <div className="text-xs truncate flex items-center gap-1" style={{ color: TIER_COLORS[tier] ?? "#4A6FA5" }}>
                            {TIER_ICONS[tier]}
                            {BADGE_LABEL[tier] ?? "Scout"}
                          </div>
                        </div>
                      </div>
                      <span className="col-span-2 text-center font-heading text-white text-sm">{p.referralCount ?? 0}</span>
                      <span className="col-span-2 text-center font-heading text-white text-sm">{p.jobCount ?? 0}</span>
                      <span className="col-span-2 text-center font-heading text-sm" style={{ color: "#10B981" }}>
                        ${Math.round((p.totalCommissionsEarned ?? 0) / 100).toLocaleString()}
                      </span>
                      <div className="col-span-1 flex items-center justify-end">
                        <RankChange change={rankChanges[i + 3] ?? 0} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Achievement badges section */}
            <div className="rounded-2xl border p-6 mb-8" style={{ backgroundColor: "#0F1F35", borderColor: "#1E3A5F" }}>
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: "#D4AF37" }} />
                Network Achievements This Month
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: "[FIRE]", title: "Hot Streak", desc: "5+ referrals in 7 days", count: 12, color: "#EF4444" },
                  { icon: "", title: "Speed Closer", desc: "Lead accepted < 2 hours", count: 34, color: "#F59E0B" },
                  { icon: "[TARGET]", title: "High Value", desc: "Closed a $10k+ job", count: 8, color: "#6366f1" },
                  { icon: "", title: "Network Builder", desc: "Referred 3+ trade types", count: 21, color: "#0A1628" },
                ].map(badge => (
                  <div key={badge.title} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#0A1628", border: `1px solid ${badge.color}30` }}>
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="text-white text-xs font-semibold mb-0.5">{badge.title}</div>
                    <div className="text-xs mb-2" style={{ color: "#4A6FA5" }}>{badge.desc}</div>
                    <div className="text-xs font-bold" style={{ color: badge.color }}>{badge.count} partners</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm mb-4" style={{ color: "#4A6FA5" }}>Want to be on this list? Join the network and start earning.</p>
              <Link href="/apply">
                <button
                  className="px-8 py-3 rounded-xl font-heading text-white text-sm transition-all hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: "#0A1628", boxShadow: "0 0 20px #0A162840" }}
                >
                  Apply to Join ProLnk 
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
