import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Users, Zap, Loader2, Flame, Briefcase } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const TIER_COLORS: Record<string, string> = {
  starter:    "bg-gray-100 text-gray-600",
  silver:     "bg-slate-100 text-slate-600",
  gold:       "bg-amber-100 text-amber-700",
  platinum:   "bg-violet-100 text-violet-700",
  enterprise: "bg-blue-100 text-blue-700",
};

type FilterPeriod = "month" | "alltime" | "network";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_PALETTE = [
  "bg-violet-600", "bg-blue-600", "bg-emerald-600",
  "bg-rose-600",   "bg-amber-600", "bg-cyan-600",
  "bg-indigo-600", "bg-pink-600",  "bg-teal-600",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  return (
    <div className={`${sizeClasses[size]} rounded-full ${avatarColor(name)} flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {getInitials(name)}
    </div>
  );
}

function StreakBadge({ streak }: { streak: number }) {
  if (streak < 3) return null;
  return (
    <span className="inline-flex items-center gap-1 bg-orange-500/10 border border-orange-400/30 text-orange-400 text-xs px-2 py-0.5 rounded-full font-semibold">
      <Flame className="w-3 h-3" />
      {streak}-day streak
    </span>
  );
}

function PodiumCard({
  partner,
  position,
  isCurrent,
}: {
  partner: any;
  position: 1 | 2 | 3;
  isCurrent: boolean;
}) {
  const medals: Record<number, string> = { 1: "🏆", 2: "🥈", 3: "🥉" };
  const heightClass = position === 1 ? "pt-6" : position === 2 ? "pt-10" : "pt-14";
  const glowClass = position === 1
    ? "border-amber-500/60 shadow-lg shadow-amber-500/15"
    : isCurrent
    ? "border-violet-500/50"
    : "border-slate-700";

  return (
    <Card className={`bg-slate-800/60 border ${glowClass} ${heightClass} relative`}>
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
          YOU
        </div>
      )}
      <CardContent className="pt-4 pb-4 text-center flex flex-col items-center gap-1">
        <div className="text-3xl mb-1">{medals[position]}</div>
        <Avatar name={partner.businessName} size={position === 1 ? "lg" : "md"} />
        <div className="font-bold text-white text-sm mt-1 truncate max-w-full px-1">{partner.businessName}</div>
        <div className="text-xs text-slate-400 truncate max-w-full px-1">{partner.businessType}</div>
        <Badge className={`text-xs ${TIER_COLORS[partner.tier?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>{partner.tier}</Badge>
        {(partner.streakDays ?? 0) >= 3 && <StreakBadge streak={partner.streakDays} />}
        <div className="mt-2 text-green-400 font-bold text-lg">{formatCurrency(Number(partner.totalCommissionsEarned ?? 0))}</div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{partner.jobsCompleted ?? 0} jobs</span>
          <span>{partner.referralCount ?? 0} refs</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PartnerLeaderboard() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<FilterPeriod>("month");

  const { data: rows = [], isLoading } = trpc.directory.getLeaderboard.useQuery();

  const rawList = (Array.isArray(rows[0]) ? rows[0] : rows) as any[];

  const currentUserId = (user as any)?.id ?? null;

  const leaderboard = period === "network"
    ? rawList.filter((p: any) => p.recruitedByUserId === currentUserId || p.id === currentUserId)
    : rawList;

  const myRankIndex = leaderboard.findIndex((p: any) => p.id === currentUserId);
  const myEntry = myRankIndex >= 0 ? leaderboard[myRankIndex] : null;

  const filterLabel: Record<FilterPeriod, string> = {
    month: "This Month's Top Earners",
    alltime: "All-Time Top Earners",
    network: "Your Network Only",
  };

  const top3 = leaderboard.slice(0, 3);
  const podiumOrder = top3.length === 3
    ? [{ partner: top3[1], position: 2 }, { partner: top3[0], position: 1 }, { partner: top3[2], position: 3 }]
    : [];

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">ProLnk Partner Network</span>
            </div>
            <h1 className="text-4xl font-bold text-white">{filterLabel[period]}</h1>
            <p className="text-slate-400 mt-2">Partners earning the most by building the network</p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 justify-center flex-wrap">
            {(["month", "alltime", "network"] as FilterPeriod[]).map((f) => (
              <button
                key={f}
                onClick={() => setPeriod(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  period === f
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-500/40 hover:text-white"
                }`}
              >
                {f === "month" ? "Monthly" : f === "alltime" ? "All-Time" : "Network Only"}
              </button>
            ))}
          </div>

          {/* My position callout */}
          {myEntry && myRankIndex >= 0 && (
            <div className="mb-6 flex items-center gap-4 bg-violet-600/10 border border-violet-500/30 rounded-2xl px-5 py-4">
              <Avatar name={myEntry.businessName} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-violet-300 font-semibold">Your Position</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-bold">#{myRankIndex + 1}</span>
                  <span className="text-slate-300 text-sm">{myEntry.businessName}</span>
                  <Badge className={`text-xs ${TIER_COLORS[myEntry.tier?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>{myEntry.tier}</Badge>
                  {(myEntry.streakDays ?? 0) >= 3 && <StreakBadge streak={myEntry.streakDays} />}
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-lg">{formatCurrency(Number(myEntry.totalCommissionsEarned ?? 0))}</div>
                <div className="text-xs text-slate-500">{myEntry.jobsCompleted ?? 0} jobs · {myEntry.referralCount ?? 0} refs</div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            </div>
          ) : leaderboard.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-16 text-center">
                <Trophy className="w-12 h-12 text-amber-400/40 mx-auto mb-4" />
                <p className="text-slate-400 text-lg font-medium">No partners on the board yet</p>
                <p className="text-slate-500 text-sm mt-1">Be the first to earn your spot by logging referrals</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Podium */}
              {podiumOrder.length === 3 && (
                <div className="grid grid-cols-3 gap-4 mb-8 items-end">
                  {podiumOrder.map(({ partner, position }) => (
                    <PodiumCard
                      key={partner.id}
                      partner={partner}
                      position={position as 1 | 2 | 3}
                      isCurrent={partner.id === currentUserId}
                    />
                  ))}
                </div>
              )}

              {/* Full rankings table */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-base flex items-center gap-2">
                    <Users className="w-4 h-4" /> Full Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {leaderboard.map((partner: any, i: number) => {
                      const isMe = partner.id === currentUserId;
                      return (
                        <div
                          key={partner.id}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                            isMe
                              ? "bg-violet-600/15 border border-violet-500/30"
                              : i < 3
                              ? "bg-slate-700/50"
                              : "hover:bg-slate-700/30"
                          }`}
                        >
                          {/* Rank */}
                          <div className="w-8 text-center flex-shrink-0">
                            {i === 0 ? <span className="text-xl">🏆</span>
                              : i === 1 ? <span className="text-xl">🥈</span>
                              : i === 2 ? <span className="text-xl">🥉</span>
                              : <span className="text-slate-500 font-bold text-sm">#{i + 1}</span>}
                          </div>

                          {/* Avatar */}
                          <Avatar name={partner.businessName} size="sm" />

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-semibold text-sm ${isMe ? "text-violet-200" : "text-white"}`}>
                                {partner.businessName}
                                {isMe && <span className="ml-1 text-violet-400 text-xs">(you)</span>}
                              </span>
                              <Badge className={`text-xs ${TIER_COLORS[partner.tier?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>
                                {partner.tier}
                              </Badge>
                              {(partner.streakDays ?? 0) >= 3 && <StreakBadge streak={partner.streakDays} />}
                            </div>
                            <div className="text-xs text-slate-400">
                              {partner.businessType}
                              {partner.serviceArea ? ` · ${partner.serviceArea}` : ""}
                            </div>
                          </div>

                          {/* Jobs completed */}
                          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 w-16 justify-end flex-shrink-0">
                            <Briefcase className="w-3 h-3" />
                            <span>{partner.jobsCompleted ?? 0}</span>
                          </div>

                          {/* Earnings */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-green-400 font-bold text-sm">{formatCurrency(Number(partner.totalCommissionsEarned ?? 0))}</div>
                            <div className="text-xs text-slate-500">{partner.referralCount ?? 0} refs</div>
                          </div>

                          {/* Rating */}
                          {Number(partner.avgRating) > 0 && (
                            <div className="flex items-center gap-1 text-xs text-amber-400 flex-shrink-0">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {Number(partner.avgRating).toFixed(1)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* CTA for non-partners */}
          {!user && (
            <div className="mt-6 p-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl text-center">
              <h3 className="text-white font-bold text-xl mb-2">Want to be on this list?</h3>
              <p className="text-indigo-200 text-sm mb-4">Join the ProLnk partner network and start earning commissions on every referral</p>
              <a href="/partner-apply" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
                <Zap className="w-4 h-4" /> Apply to Join
              </a>
            </div>
          )}

        </div>
      </div>
    </PartnerLayout>
  );
}
