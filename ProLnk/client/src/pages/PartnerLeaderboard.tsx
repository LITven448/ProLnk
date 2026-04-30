import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Star, Users, Zap, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const TIER_COLORS: Record<string, string> = {
  starter:    "bg-gray-100 text-gray-600",
  silver:     "bg-slate-100 text-slate-600",
  gold:       "bg-amber-100 text-amber-700",
  platinum:   "bg-violet-100 text-violet-700",
  enterprise: "bg-blue-100 text-blue-700",
};

const RANK_BADGE = ["🏆", "🥈", "🥉"];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function PartnerLeaderboard() {
  const { user } = useAuth();
  const [period, setPeriod] = useState("month");

  const { data: rows = [], isLoading } = trpc.directory.getLeaderboard.useQuery();  // directory router

  // Normalise rows — server returns raw SQL result which may be an array-of-arrays
  const leaderboard = (Array.isArray(rows[0]) ? rows[0] : rows) as any[];

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
          <h1 className="text-4xl font-bold text-white">Top Referring Pros</h1>
          <p className="text-slate-400 mt-2">The partners earning the most by building the network</p>
        </div>

        {/* Period filter */}
        <div className="flex gap-3 mb-6 justify-center flex-wrap">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[leaderboard[1], leaderboard[0], leaderboard[2]].map((partner, idx) => {
                  if (!partner) return <div key={idx} />;
                  const positions = [2, 1, 3];
                  return (
                    <Card key={partner.id} className={`bg-slate-800/50 border-slate-700 ${idx === 1 ? "border-amber-500/50 shadow-lg shadow-amber-500/10" : ""}`}>
                      <CardContent className="pt-4 pb-4 text-center">
                        <div className="text-3xl mb-2">{RANK_BADGE[positions[idx] - 1] || `#${positions[idx]}`}</div>
                        <div className="font-bold text-white text-sm">{partner.businessName}</div>
                        <div className="text-xs text-slate-400 mb-2">{partner.businessType}</div>
                        <Badge className={`text-xs ${TIER_COLORS[partner.tier?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>{partner.tier}</Badge>
                        <div className="mt-3 text-green-400 font-bold text-lg">{formatCurrency(Number(partner.totalCommissionsEarned ?? 0))}</div>
                        <div className="text-xs text-slate-500">{partner.referralCount ?? 0} referrals</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Full Table */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Users className="w-4 h-4" /> Full Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((partner: any, i: number) => (
                    <div
                      key={partner.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        i < 3 ? "bg-slate-700/50" : "hover:bg-slate-700/30"
                      }`}
                    >
                      <div className="w-8 text-center">
                        {i < 3 ? (
                          <span className="text-xl">{RANK_BADGE[i]}</span>
                        ) : (
                          <span className="text-slate-500 font-bold">#{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">{partner.businessName}</span>
                          <Badge className={`text-xs ${TIER_COLORS[partner.tier?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>{partner.tier}</Badge>
                        </div>
                        <div className="text-xs text-slate-400">{partner.businessType}{partner.serviceArea ? ` · ${partner.serviceArea}` : ""}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-sm">{formatCurrency(Number(partner.totalCommissionsEarned ?? 0))}</div>
                        <div className="text-xs text-slate-500">{partner.referralCount ?? 0} refs</div>
                      </div>
                      {Number(partner.avgRating) > 0 && (
                        <div className="flex items-center gap-1 text-xs text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {Number(partner.avgRating).toFixed(1)}
                        </div>
                      )}
                    </div>
                  ))}
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
