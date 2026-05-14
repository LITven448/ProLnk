import type React from "react";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpCircle, Star, Trophy, Zap, Crown, CheckCircle, Send, Users,
} from "lucide-react";
import { toast } from "sonner";

type Tier = "New" | "Rising" | "Pro" | "Elite" | "Legend";

interface TierPro {
  id: number;
  name: string;
  trade: string;
  currentTier: Tier;
  jobsCompleted: number;
  jobsNeeded: number;
  rating: number;
  inviteSent: boolean;
}

const TIER_ORDER: Tier[] = ["New", "Rising", "Pro", "Elite", "Legend"];

const TIER_THRESHOLDS: Record<Tier, number> = {
  New: 10,
  Rising: 50,
  Pro: 100,
  Elite: 500,
  Legend: Infinity,
};

const TIER_COLORS: Record<Tier, string> = {
  New: "bg-slate-500/20 text-slate-400",
  Rising: "bg-blue-500/20 text-blue-400",
  Pro: "bg-teal-500/20 text-teal-400",
  Elite: "bg-purple-500/20 text-purple-400",
  Legend: "bg-yellow-500/20 text-yellow-400",
};

const TIER_ICONS: Record<Tier, React.ElementType> = {
  New: Zap,
  Rising: ArrowUpCircle,
  Pro: Star,
  Elite: Trophy,
  Legend: Crown,
};

const MOCK_PROS: TierPro[] = [
  { id: 1, name: "Maria Santos", trade: "HVAC", currentTier: "New", jobsCompleted: 10, jobsNeeded: 10, rating: 4.9, inviteSent: false },
  { id: 2, name: "Devon Clarke", trade: "Plumbing", currentTier: "New", jobsCompleted: 10, jobsNeeded: 10, rating: 4.7, inviteSent: false },
  { id: 3, name: "Aisha Patel", trade: "Electrical", currentTier: "Rising", jobsCompleted: 50, jobsNeeded: 50, rating: 4.8, inviteSent: false },
  { id: 4, name: "Roberto Vega", trade: "Roofing", currentTier: "Rising", jobsCompleted: 52, jobsNeeded: 50, rating: 4.6, inviteSent: false },
  { id: 5, name: "Christine Lee", trade: "General", currentTier: "Pro", jobsCompleted: 101, jobsNeeded: 100, rating: 4.9, inviteSent: false },
  { id: 6, name: "Frank Okafor", trade: "HVAC", currentTier: "Elite", jobsCompleted: 503, jobsNeeded: 500, rating: 5.0, inviteSent: false },
  { id: 7, name: "Wendy Park", trade: "Plumbing", currentTier: "New", jobsCompleted: 9, jobsNeeded: 10, rating: 4.5, inviteSent: false },
  { id: 8, name: "Tariq Hassan", trade: "Electrical", currentTier: "Rising", jobsCompleted: 47, jobsNeeded: 50, rating: 4.7, inviteSent: false },
  { id: 9, name: "Lisa Jordan", trade: "Roofing", currentTier: "Pro", jobsCompleted: 98, jobsNeeded: 100, rating: 4.4, inviteSent: false },
];

function nextTier(current: Tier): Tier | null {
  const idx = TIER_ORDER.indexOf(current);
  return idx < TIER_ORDER.length - 1 ? TIER_ORDER[idx + 1] : null;
}

function isEligible(pro: TierPro): boolean {
  return pro.jobsCompleted >= pro.jobsNeeded;
}

export default function TierUpgradeCenter() {
  const [pros, setPros] = useState<TierPro[]>(MOCK_PROS);
  const [sending, setSending] = useState<number | null>(null);

  const eligible = pros.filter(isEligible);
  const inProgress = pros.filter((p) => !isEligible(p));

  const tierCounts = TIER_ORDER.reduce<Record<Tier, number>>((acc, t) => {
    acc[t] = pros.filter((p) => p.currentTier === t).length;
    return acc;
  }, {} as Record<Tier, number>);

  function sendInvite(id: number) {
    setSending(id);
    setTimeout(() => {
      setPros((prev) => prev.map((p) => p.id === id ? { ...p, inviteSent: true } : p));
      setSending(null);
      toast.success("Upgrade invite sent!");
    }, 700);
  }

  function sendAllInvites() {
    const pending = eligible.filter((p) => !p.inviteSent);
    if (pending.length === 0) { toast.info("All invites already sent"); return; }
    setPros((prev) => prev.map((p) => isEligible(p) ? { ...p, inviteSent: true } : p));
    toast.success(`${pending.length} upgrade invites sent`);
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-[#0A1628] min-h-screen">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="h-6 w-6 text-teal-400" />
              Tier Upgrade Center
            </h1>
            <p className="text-slate-400 mt-1">Pros who have hit job count thresholds for their next tier</p>
          </div>
          <Button
            onClick={sendAllInvites}
            className="bg-teal-600 hover:bg-teal-500 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            Send All Upgrade Invites ({eligible.filter((p) => !p.inviteSent).length})
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {TIER_ORDER.map((tier) => {
            const Icon = TIER_ICONS[tier];
            return (
              <Card key={tier} className="bg-slate-800/60 border-slate-700">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">{tier}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{tierCounts[tier]}</div>
                  <Badge className={`mt-1 text-[10px] border-0 ${TIER_COLORS[tier]}`}>{tier}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {eligible.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-teal-400" />
              <h2 className="text-white font-semibold">Ready to Upgrade ({eligible.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eligible.map((pro) => {
                const next = nextTier(pro.currentTier);
                const NextIcon = next ? TIER_ICONS[next] : Crown;
                return (
                  <Card key={pro.id} className="bg-slate-800/60 border-teal-700/40 border">
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-white">{pro.name}</p>
                          <p className="text-xs text-slate-400">{pro.trade} · ⭐ {pro.rating}</p>
                        </div>
                        {pro.inviteSent
                          ? <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">Sent</Badge>
                          : <Badge className="bg-teal-500/20 text-teal-400 border-0 text-xs">Ready</Badge>
                        }
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`text-xs border-0 ${TIER_COLORS[pro.currentTier]}`}>{pro.currentTier}</Badge>
                        <ArrowUpCircle className="h-3.5 w-3.5 text-teal-400" />
                        {next && <Badge className={`text-xs border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                      </div>
                      <div className="mb-1 flex justify-between text-xs text-slate-400">
                        <span>{pro.jobsCompleted} jobs completed</span>
                        <span>Target: {pro.jobsNeeded}</span>
                      </div>
                      <Progress value={100} className="h-1.5 mb-4 bg-slate-700 [&>div]:bg-teal-400" />
                      <Button
                        size="sm"
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white h-8"
                        disabled={pro.inviteSent || sending === pro.id}
                        onClick={() => sendInvite(pro.id)}
                      >
                        {sending === pro.id ? (
                          <span className="flex items-center gap-1.5"><span className="animate-spin">⟳</span> Sending…</span>
                        ) : pro.inviteSent ? (
                          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Invite Sent</span>
                        ) : (
                          <span className="flex items-center gap-1.5"><NextIcon className="h-3.5 w-3.5" /> Send Upgrade Invite</span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {inProgress.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-slate-400" />
              <h2 className="text-white font-semibold">In Progress ({inProgress.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgress.map((pro) => {
                const next = nextTier(pro.currentTier);
                const pct = Math.min(100, Math.round((pro.jobsCompleted / pro.jobsNeeded) * 100));
                return (
                  <Card key={pro.id} className="bg-slate-800/40 border-slate-700">
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-white">{pro.name}</p>
                          <p className="text-xs text-slate-400">{pro.trade} · ⭐ {pro.rating}</p>
                        </div>
                        <Badge className="bg-slate-700 text-slate-300 border-0 text-xs">{pct}%</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`text-xs border-0 ${TIER_COLORS[pro.currentTier]}`}>{pro.currentTier}</Badge>
                        <ArrowUpCircle className="h-3.5 w-3.5 text-slate-500" />
                        {next && <Badge className={`text-xs border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                      </div>
                      <div className="mb-1 flex justify-between text-xs text-slate-400">
                        <span>{pro.jobsCompleted} / {pro.jobsNeeded} jobs</span>
                        <span>{pro.jobsNeeded - pro.jobsCompleted} remaining</span>
                      </div>
                      <Progress value={pct} className="h-1.5 bg-slate-700 [&>div]:bg-slate-500" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
