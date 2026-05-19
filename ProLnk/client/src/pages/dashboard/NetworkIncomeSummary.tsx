import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Users, DollarSign, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SUB_PRICE = 149;
const LEVEL_CONFIG = [
  { label: "Level 1″, key: "l1Count" as const, rate: 0.12, color: "#F5E642", border: "#F5E64233" },
  { label: "Level 2″, key: "l2Count" as const, rate: 0.06, color: "#3b82f6", border: "#3b82f633" },
  { label: "Level 3″, key: "l3Count" as const, rate: 0.03, color: "#22c55e", border: "#22c55e33" },
  { label: "Level 4″, key: "l4Count" as const, rate: 0.015, color: "#a855f7", border: "#a855f733" },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function NetworkIncomeSummary() {
  const { data: partner } = trpc.partners.getMyProfile.useQuery(undefined, {
    retry: false,
  });
  const referralCode = partner?.referralCode ?? "";

  const { data, isLoading } = trpc.networkOverrides.getOverrideIncome.useQuery(
    { referralCode },
    { enabled: !!referralCode }
  );

  const counts: Record<string, number> = {
    l1Count: data?.l1Count ?? 0,
    l2Count: data?.l2Count ?? 0,
    l3Count: data?.l3Count ?? 0,
    l4Count: data?.l4Count ?? 0,
  };
  const monthlyIncome = data?.monthlyIncome ?? 0;
  const annualIncome = data?.annualIncome ?? 0;
  const nextMonthGain = SUB_PRICE * LEVEL_CONFIG[0].rate;

  return (
    <div className="min-h-screen bg-[#0b0f1a] px-4 py-8″>
      <div className="max-w-2xl mx-auto space-y-6″>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Your Network Override Income</h1>
          <p className="text-sm text-gray-400 mt-1″>
            Passive subscription overrides from every active partner in your network — 4 levels deep.
          </p>
        </div>

        {/* Total income hero */}
        <Card className="border-0 bg-gradient-to-br from-[#1a1d2e] to-[#111422]">
          <CardContent className="pt-6 pb-6 flex flex-col items-center gap-2″>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400″>Monthly Passive Income</p>
            {isLoading ? (
              <div className="w-40 h-12 bg-white/5 animate-pulse rounded-xl" />
            ) : (
              <p className="text-5xl font-extrabold text-amber-400″>${fmt(monthlyIncome)}</p>
            )}
            <p className="text-sm text-gray-400″>
              <span className="text-white font-semibold">${fmt(annualIncome)}</span> projected annual
            </p>
            {monthlyIncome === 0 && !isLoading && (
              <Badge variant="outline" className="mt-2 border-amber-500/40 text-amber-400 text-xs">
                Recruit your first partner to start earning
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Level breakdown cards */}
        <div className="grid grid-cols-2 gap-3″>
          {LEVEL_CONFIG.map(({ label, key, rate, color, border }) => {
            const count = counts[key] ?? 0;
            const levelIncome = count * SUB_PRICE * rate;
            return (
              <Card
                key={key}
                className="border bg-[#13162a]"
                style={{ borderColor: border }}
              >
                <CardHeader className="pb-2 pt-4 px-4″>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold" style={{ color }}>
                      {label}
                    </CardTitle>
                    <Badge
                      className="text-xs px-1.5 py-0 font-bold"
                      style={{ background: border, color }}
                    >
                      {(rate * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-1″>
                  <div className="flex items-center gap-1.5″>
                    <Users className="w-3.5 h-3.5 text-gray-500″ />
                    <span className="text-white font-bold text-lg">{count}</span>
                    <span className="text-gray-500 text-xs">recruits</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-300″>
                    ${fmt(levelIncome)}<span className="text-gray-500 font-normal text-xs">/mo</span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Nudge */}
        <Card className="border border-teal-500/20 bg-teal-950/20″>
          <CardContent className="flex items-center gap-4 py-4 px-5″>
            <TrendingUp className="w-5 h-5 text-teal-400 shrink-0″ />
            <div className="flex-1″>
              <p className="text-sm text-white font-medium">
                Add 1 more direct recruit
              </p>
              <p className="text-xs text-gray-400″>
                Earn an extra{" "}
                <span className="text-teal-400 font-semibold">${fmt(nextMonthGain)}/mo</span>{" "}
                in subscription overrides — forever.
              </p>
            </div>
            <Link href="/dashboard/referral-hub">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white shrink-0″>
                Share link <ArrowRight className="w-3.5 h-3.5 ml-1″ />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* CTA to network directory */}
        <Link href="/dashboard/network-directory">
          <button className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3″>
              <DollarSign className="w-4 h-4 text-gray-400″ />
              <span className="text-sm text-white font-medium">View your full network directory</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500″ />
          </button>
        </Link>

      </div>
    </div>
  );
}
