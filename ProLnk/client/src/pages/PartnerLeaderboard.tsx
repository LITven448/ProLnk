import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, TrendingUp, DollarSign } from "lucide-react";

type FilterPeriod = "alltime" | "month" | "week";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function getInitials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

const AVATAR_PALETTE = [
  "bg-violet-600", "bg-blue-600", "bg-emerald-600",
  "bg-rose-600", "bg-amber-600", "bg-cyan-600",
  "bg-indigo-600", "bg-pink-600", "bg-teal-600",
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

interface LeaderEntry {
  id: string;
  name: string;
  trade: string;
  city: string;
  recruitsMonth: number;
  recruitsTotal: number;
  estMonthlyOverride: number;
}

const MOCK_LEADERBOARD: LeaderEntry[] = [
  { id: "1",  name: "Marcus Thompson",   trade: "HVAC",          city: "Dallas",      recruitsMonth: 12, recruitsTotal: 47, estMonthlyOverride: 1128 },
  { id: "2",  name: "Deja Williams",      trade: "Electrical",    city: "Fort Worth",  recruitsMonth: 9,  recruitsTotal: 38, estMonthlyOverride: 902  },
  { id: "3",  name: "Carlos Mendoza",     trade: "Plumbing",      city: "Frisco",      recruitsMonth: 8,  recruitsTotal: 33, estMonthlyOverride: 784  },
  { id: "4",  name: "Priya Sharma",       trade: "Roofing",       city: "McKinney",    recruitsMonth: 7,  recruitsTotal: 29, estMonthlyOverride: 688  },
  { id: "5",  name: "Tyrone Benson",      trade: "Landscaping",   city: "Plano",       recruitsMonth: 6,  recruitsTotal: 25, estMonthlyOverride: 594  },
  { id: "6",  name: "Lauren Kim",         trade: "Painting",      city: "Garland",     recruitsMonth: 6,  recruitsTotal: 22, estMonthlyOverride: 522  },
  { id: "7",  name: "Andre Franklin",     trade: "Carpentry",     city: "Irving",      recruitsMonth: 5,  recruitsTotal: 21, estMonthlyOverride: 499  },
  { id: "8",  name: "Sofia Reyes",        trade: "Flooring",      city: "Arlington",   recruitsMonth: 5,  recruitsTotal: 19, estMonthlyOverride: 451  },
  { id: "9",  name: "Kevin Okafor",       trade: "HVAC",          city: "Denton",      recruitsMonth: 4,  recruitsTotal: 17, estMonthlyOverride: 404  },
  { id: "10", name: "Tamara Nguyen",      trade: "Electrical",    city: "Lewisville",  recruitsMonth: 4,  recruitsTotal: 16, estMonthlyOverride: 380  },
  { id: "11", name: "James Whitfield",    trade: "Plumbing",      city: "Mesquite",    recruitsMonth: 3,  recruitsTotal: 14, estMonthlyOverride: 332  },
  { id: "12", name: "Alicia Torres",      trade: "Insulation",    city: "Carrollton",  recruitsMonth: 3,  recruitsTotal: 13, estMonthlyOverride: 309  },
  { id: "13", name: "Robert Chen",        trade: "Roofing",       city: "Richardson",  recruitsMonth: 3,  recruitsTotal: 12, estMonthlyOverride: 285  },
  { id: "14", name: "You",               trade: "Plumbing",      city: "Allen",       recruitsMonth: 2,  recruitsTotal: 9,  estMonthlyOverride: 214  },
  { id: "15", name: "Monica Davis",       trade: "HVAC",          city: "Euless",      recruitsMonth: 2,  recruitsTotal: 8,  estMonthlyOverride: 190  },
  { id: "16", name: "Derek Patel",        trade: "Electrical",    city: "Bedford",     recruitsMonth: 2,  recruitsTotal: 8,  estMonthlyOverride: 190  },
  { id: "17", name: "Cassandra Lee",      trade: "Painting",      city: "Grapevine",   recruitsMonth: 1,  recruitsTotal: 7,  estMonthlyOverride: 166  },
  { id: "18", name: "Omar Jackson",       trade: "Landscaping",   city: "Southlake",   recruitsMonth: 1,  recruitsTotal: 6,  estMonthlyOverride: 143  },
  { id: "19", name: "Fatima Hassan",      trade: "Flooring",      city: "Colleyville",  recruitsMonth: 1, recruitsTotal: 5,  estMonthlyOverride: 119  },
  { id: "20", name: "Brandon Scott",      trade: "Carpentry",     city: "Keller",      recruitsMonth: 1,  recruitsTotal: 5,  estMonthlyOverride: 119  },
  { id: "21", name: "Naomi Wright",       trade: "Roofing",       city: "Flower Mound", recruitsMonth: 1, recruitsTotal: 4,  estMonthlyOverride: 95   },
  { id: "22", name: "Tyler Morrison",     trade: "HVAC",          city: "Hurst",       recruitsMonth: 0,  recruitsTotal: 3,  estMonthlyOverride: 71   },
  { id: "23", name: "Jasmine Flores",     trade: "Electrical",    city: "North Richland Hills", recruitsMonth: 0, recruitsTotal: 3, estMonthlyOverride: 71 },
  { id: "24", name: "Samuel Griffin",     trade: "Plumbing",      city: "Grand Prairie", recruitsMonth: 0, recruitsTotal: 2,  estMonthlyOverride: 48  },
  { id: "25", name: "Christina Park",     trade: "Painting",      city: "Mansfield",   recruitsMonth: 0,  recruitsTotal: 1,  estMonthlyOverride: 24  },
];

const CURRENT_USER_ID = "14";

function sortedList(period: FilterPeriod): LeaderEntry[] {
  return [...MOCK_LEADERBOARD].sort((a, b) => {
    if (period === "month") return b.recruitsMonth - a.recruitsMonth;
    if (period === "week") return (b.recruitsMonth * 0.3) - (a.recruitsMonth * 0.3) || b.recruitsTotal - a.recruitsTotal;
    return b.recruitsTotal - a.recruitsTotal;
  });
}

const MEDAL: Record<number, string> = { 0: "🥇", 1: "🥈", 2: "🥉" };

function PodiumCard({ entry, position, isMe }: { entry: LeaderEntry; position: 0 | 1 | 2; isMe: boolean }) {
  const offsetClass = position === 0 ? "pt-4" : position === 1 ? "pt-10" : "pt-16";
  const glowClass =
    position === 0
      ? "border-amber-500/50 shadow-lg shadow-amber-500/10"
      : position === 1
      ? "border-slate-500/40"
      : "border-amber-700/40";

  return (
    <div className={`relative bg-slate-800/60 border ${glowClass} rounded-2xl p-4 ${offsetClass} text-center flex flex-col items-center gap-1.5`}>
      {isMe && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
          YOU
        </div>
      )}
      <div className="text-3xl mb-0.5">{MEDAL[position]}</div>
      <Avatar name={entry.name} size={position === 0 ? "lg" : "md"} />
      <div className="font-bold text-white text-sm truncate max-w-full px-1 mt-0.5">{entry.name}</div>
      <div className="text-xs text-slate-400">{entry.trade}</div>
      <div className="text-xs text-slate-500">{entry.city}</div>
      <div className="mt-2 flex gap-3 text-xs text-slate-400">
        <span><span className="text-white font-bold">{entry.recruitsMonth}</span> mo</span>
        <span><span className="text-white font-bold">{entry.recruitsTotal}</span> total</span>
      </div>
      <div className="text-emerald-400 font-bold text-sm mt-1">{formatCurrency(entry.estMonthlyOverride)}<span className="text-slate-500 font-normal text-xs">/mo</span></div>
    </div>
  );
}

export default function PartnerLeaderboard() {
  const [period, setPeriod] = useState<FilterPeriod>("month");
  const list = sortedList(period);
  const top3 = list.slice(0, 3);
  const rest = list.slice(3);
  const myRank = list.findIndex((e) => e.id === CURRENT_USER_ID);
  const myEntry = myRank >= 0 ? list[myRank] : null;

  const podiumOrder: Array<{ entry: LeaderEntry; position: 0 | 1 | 2 }> = top3.length === 3
    ? [{ entry: top3[1], position: 1 }, { entry: top3[0], position: 0 }, { entry: top3[2], position: 2 }]
    : [];

  const filterLabels: Record<FilterPeriod, string> = {
    alltime: "All Time",
    month: "This Month",
    week: "This Week",
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Top Recruiters</span>
            </div>
            <h1 className="text-4xl font-bold text-white">Founding Network Leaderboard</h1>
            <p className="text-slate-400 mt-2 text-sm">Partners who have brought in the most founding network members</p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 justify-center flex-wrap">
            {(["alltime", "month", "week"] as FilterPeriod[]).map((f) => (
              <button
                key={f}
                onClick={() => setPeriod(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  period === f
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-amber-500/40 hover:text-white"
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>

          {/* Podium */}
          {podiumOrder.length === 3 && (
            <div className="grid grid-cols-3 gap-4 mb-8 items-end">
              {podiumOrder.map(({ entry, position }) => (
                <PodiumCard
                  key={entry.id}
                  entry={entry}
                  position={position}
                  isMe={entry.id === CURRENT_USER_ID}
                />
              ))}
            </div>
          )}

          {/* Table */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                Top 25 Recruiters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Column headers */}
              <div className="grid grid-cols-[2rem_1fr_5rem_5rem_6rem] gap-x-3 px-4 py-2 border-b border-slate-700 text-xs text-slate-500 font-semibold uppercase tracking-wide">
                <div>#</div>
                <div>Partner</div>
                <div className="text-right">Mo Recruits</div>
                <div className="text-right">Total</div>
                <div className="text-right">Est. Override</div>
              </div>
              <div className="divide-y divide-slate-700/40">
                {rest.map((entry, i) => {
                  const rank = i + 4;
                  const isMe = entry.id === CURRENT_USER_ID;
                  return (
                    <div
                      key={entry.id}
                      className={`grid grid-cols-[2rem_1fr_5rem_5rem_6rem] gap-x-3 items-center px-4 py-3 transition-colors ${
                        isMe ? "bg-violet-600/10 border-l-2 border-violet-500" : "hover:bg-slate-700/20"
                      }`}
                    >
                      <div className="text-slate-500 font-bold text-sm text-center">{rank}</div>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar name={entry.name} size="sm" />
                        <div className="min-w-0">
                          <div className={`font-semibold text-sm truncate ${isMe ? "text-violet-200" : "text-white"}`}>
                            {entry.name}{isMe && <span className="ml-1 text-violet-400 text-xs font-normal">(you)</span>}
                          </div>
                          <div className="text-xs text-slate-400 truncate">{entry.trade} · {entry.city}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold text-sm">{entry.recruitsMonth}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-300 text-sm">{entry.recruitsTotal}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-semibold text-sm">{formatCurrency(entry.estMonthlyOverride)}</span>
                        <span className="text-slate-500 text-xs">/mo</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current user footer */}
          {myEntry && (
            <div className="flex items-center gap-4 bg-violet-600/10 border border-violet-500/30 rounded-2xl px-5 py-4">
              <Avatar name={myEntry.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-violet-300 text-xs font-semibold uppercase tracking-wide mb-0.5">Your Ranking</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-bold text-lg">#{myRank + 1}</span>
                  <span className="text-slate-300 text-sm">of 25</span>
                  <Badge className="bg-violet-600/20 text-violet-300 border-violet-500/30 text-xs">{myEntry.trade}</Badge>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-slate-400 mb-0.5">Est. monthly override</div>
                <div className="text-emerald-400 font-bold text-lg">{formatCurrency(myEntry.estMonthlyOverride)}</div>
                <div className="text-xs text-slate-500">{myEntry.recruitsMonth} recruits this month · {myEntry.recruitsTotal} total</div>
              </div>
            </div>
          )}

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { icon: Users, label: "Total Recruiters", value: "25" },
              { icon: TrendingUp, label: "Total Recruits This Month", value: list.reduce((a, e) => a + e.recruitsMonth, 0).toString() },
              { icon: DollarSign, label: "Total Override Pool / Mo", value: formatCurrency(list.reduce((a, e) => a + e.estMonthlyOverride, 0)) },
            ].map(({ icon: Icon, label, value }) => (
              <Card key={label} className="bg-slate-800/40 border-slate-700">
                <CardContent className="pt-4 pb-4 text-center">
                  <Icon className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                  <div className="text-white font-bold text-xl">{value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </PartnerLayout>
  );
}
