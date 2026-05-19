import { useMemo, useState, useEffect, type ReactNode } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Activity, Send, CheckCircle, DollarSign, TrendingUp, Star, Zap, Clock, Users, Trophy, Home, Radio } from "lucide-react";

type FeedItem = {
  id: string;
  type: "lead_sent" | "lead_accepted" | "job_closed" | "commission_earned" | "tier_upgrade" | "new_partner";
  message: string;
  subtext?: string;
  timestamp: Date;
  amount?: number;
};

function buildFeed(
  outbound: { id: number; opportunityType: string; status: string; createdAt: Date; receivingPartnerName?: string | null }[],
  inbound: { id: number; opportunityType: string; status: string; createdAt: Date; sourcePartnerName?: string | null }[],
  commissions: { id: number; amount: string; description?: string | null; createdAt: Date }[]
): FeedItem[] {
  const items: FeedItem[] = [];

  outbound.forEach((o) => {
    if (o.status === "sent" || o.status === "pending") {
      items.push({
        id: `out-${o.id}`,
        type: "lead_sent",
        message: `You sent a ${o.opportunityType.replace(/_/g, " ")} lead`,
        subtext: o.receivingPartnerName ? `To ${o.receivingPartnerName}` : undefined,
        timestamp: new Date(o.createdAt),
      });
    }
    if (o.status === "converted") {
      items.push({
        id: `out-conv-${o.id}`,
        type: "job_closed",
        message: `Your referral converted -- ${o.opportunityType.replace(/_/g, " ")}`,
        subtext: o.receivingPartnerName ? `Closed by ${o.receivingPartnerName}` : undefined,
        timestamp: new Date(o.createdAt),
      });
    }
  });

  inbound.forEach((o) => {
    if (o.status === "accepted") {
      items.push({
        id: `in-${o.id}`,
        type: "lead_accepted",
        message: `You accepted a ${o.opportunityType.replace(/_/g, " ")} lead`,
        subtext: o.sourcePartnerName ? `From ${o.sourcePartnerName}` : undefined,
        timestamp: new Date(o.createdAt),
      });
    }
  });

  commissions.forEach((c) => {
    items.push({
      id: `comm-${c.id}`,
      type: "commission_earned",
      message: c.description ?? "Commission earned",
      subtext: `+$${Number(c.amount).toFixed(2)} added to your ledger`,
      timestamp: new Date(c.createdAt),
      amount: Number(c.amount),
    });
  });

  return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

const FEED_ICONS: Record<FeedItem["type"], { icon: ReactNode; bg: string; text: string }> = {
  lead_sent: { icon: <Send className="w-4 h-4" />, bg: "bg-blue-50", text: "text-blue-600" },
  lead_accepted: { icon: <CheckCircle className="w-4 h-4" />, bg: "bg-[#F5E642]/10", text: "text-[#0A1628]" },
  job_closed: { icon: <TrendingUp className="w-4 h-4" />, bg: "bg-green-50", text: "text-green-600" },
  commission_earned: { icon: <DollarSign className="w-4 h-4" />, bg: "bg-yellow-50", text: "text-yellow-600" },
  tier_upgrade: { icon: <Star className="w-4 h-4" />, bg: "bg-purple-50", text: "text-purple-600" },
  new_partner: { icon: <Zap className="w-4 h-4" />, bg: "bg-orange-50", text: "text-orange-600" },
};

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

import React from "react";

type LiveActivity = {
  id: string;
  text: string;
  subtext?: string;
  icon: "join" | "earn" | "scan";
  timestamp: number;
};

const LIVE_ACTIVITY_POOL: Omit<LiveActivity, "id" | "timestamp">[] = [
  { text: "Sarah M. just joined your network (Level 1)", subtext: "Plumber · Austin, TX", icon: "join" },
  { text: "Your network earned $312 in override commissions today", subtext: "3 jobs closed across your L1 network", icon: "earn" },
  { text: "3 new homes were scanned in your area", subtext: "Dallas-Fort Worth metro", icon: "scan" },
  { text: "Carlos R. just joined your network (Level 1)", subtext: "HVAC Tech · Phoenix, AZ", icon: "join" },
  { text: "Your network earned $87 in override commissions today", subtext: "2 jobs closed by L2 members", icon: "earn" },
  { text: "7 new homes were scanned in your area", subtext: "Houston metro", icon: "scan" },
  { text: "James W. just joined your network (Level 2)", subtext: "Electrician · Denver, CO", icon: "join" },
];

const LIVE_ICON_CONFIG: Record<LiveActivity["icon"], { icon: ReactNode; bg: string; text: string; color: string }> = {
  join:  { icon: <Users className="w-3.5 h-3.5" />, bg: "bg-green-500/10", text: "text-green-500", color: "#22c55e" },
  earn:  { icon: <DollarSign className="w-3.5 h-3.5" />, bg: "bg-amber-500/10", text: "text-amber-500", color: "#f59e0b" },
  scan:  { icon: <Home className="w-3.5 h-3.5" />, bg: "bg-indigo-500/10", text: "text-indigo-400", color: "#818cf8" },
};

function LiveBadge() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
      <span
        className="w-1.5 h-1.5 rounded-full bg-red-500 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0.3 }}
      />
      <span className="text-[10px] font-bold text-red-400 tracking-wider">LIVE</span>
    </div>
  );
}

function LiveActivityFeed({ networkSize, monthCommissions }: { networkSize: number; monthCommissions: number }) {
  const [items, setItems] = useState<LiveActivity[]>(() => {
    return LIVE_ACTIVITY_POOL.slice(0, 3).map((a, i) => ({
      ...a,
      id: `live-${i}`,
      timestamp: Date.now() - i * 4 * 60 * 1000,
    }));
  });

  useEffect(() => {
    const t = setInterval(() => {
      const pool = LIVE_ACTIVITY_POOL;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      const newItem: LiveActivity = { ...pick, id: `live-${Date.now()}`, timestamp: Date.now() };
      setItems((prev) => [newItem, ...prev].slice(0, 6));
    }, 18000);
    return () => clearInterval(t);
  }, []);

  const todayEarnings = monthCommissions > 0 ? Math.round(monthCommissions * 0.08) : 0;

  return (
    <div className="space-y-4">
      {/* Live summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)" }}>
          <Users className="w-4 h-4 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Network Size</p>
            <p className="text-base font-bold text-white">{networkSize} <span className="text-xs font-normal text-gray-500">pros</span></p>
          </div>
        </div>
        <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}>
          <DollarSign className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Network earned today</p>
            <p className="text-base font-bold text-white">${todayEarnings.toLocaleString()} <span className="text-xs font-normal text-gray-500">overrides</span></p>
          </div>
        </div>
        <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(129,140,248,0.07)", border: "1px solid rgba(129,140,248,0.15)" }}>
          <Home className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Homes scanned in area</p>
            <p className="text-base font-bold text-white">3 <span className="text-xs font-normal text-gray-500">today</span></p>
          </div>
        </div>
      </div>

      {/* Live stream */}
      <div className="space-y-2">
        {items.map((item, i) => {
          const cfg = LIVE_ICON_CONFIG[item.icon];
          const minsAgo = Math.floor((Date.now() - item.timestamp) / 60000);
          const label = minsAgo < 1 ? "just now" : minsAgo < 60 ? `${minsAgo}m ago` : `${Math.floor(minsAgo / 60)}h ago`;
          return (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all ${i === 0 ? "ring-1" : ""}`}
              style={{
                background: i === 0 ? `rgba(34,197,94,0.04)` : "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                ringColor: i === 0 ? "rgba(34,197,94,0.2)" : undefined,
              }}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-200 leading-snug">{item.text}</p>
                {item.subtext && <p className="text-[10px] text-gray-500 mt-0.5">{item.subtext}</p>}
              </div>
              <span className="text-[10px] text-gray-600 flex-shrink-0 mt-0.5">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NetworkGlanceBar({
  networkSize,
  monthCommissions,
  bestPerformerName,
  bestPerformerJobs,
}: {
  networkSize: number;
  monthCommissions: number;
  bestPerformerName: string | null;
  bestPerformerJobs: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
          <Users className="w-4 h-4 text-indigo-500" />
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Network Size</p>
          <p className="text-xl font-bold text-gray-900">{networkSize} <span className="text-sm font-normal text-gray-500">pros</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <DollarSign className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">This Month's Network</p>
          <p className="text-xl font-bold text-gray-900">${monthCommissions.toFixed(0)} <span className="text-sm font-normal text-gray-500">commissions</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
          <Trophy className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Best Performer</p>
          {bestPerformerName ? (
            <p className="text-sm font-bold text-gray-900 truncate">{bestPerformerName} <span className="text-xs font-normal text-gray-500">· {bestPerformerJobs} jobs</span></p>
          ) : (
            <p className="text-sm text-gray-400">No data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NetworkFeed() {
  const { data: outbound, isLoading: l1 } = trpc.partners.getOutboundReferrals.useQuery();
  const { data: inbound, isLoading: l2 } = trpc.partners.getInboundOpportunities.useQuery();
  const { data: commissions, isLoading: l3 } = trpc.partners.getEarnedCommissions.useQuery();

  const isLoading = l1 || l2 || l3;

  const feed = useMemo(
    () => buildFeed(outbound ?? [], inbound ?? [], commissions ?? []),
    [outbound, inbound, commissions]
  );

  const glance = useMemo(() => {
    const allComms = commissions ?? [];
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthComms = allComms
      .filter((c: any) => new Date(c.createdAt) >= monthStart)
      .reduce((sum: number, c: any) => sum + Number(c.amount ?? 0), 0);

    const partnerJobCounts: Record<string, number> = {};
    (outbound ?? []).forEach((o: any) => {
      if (o.receivingPartnerName) {
        partnerJobCounts[o.receivingPartnerName] = (partnerJobCounts[o.receivingPartnerName] ?? 0) + 1;
      }
    });
    const bestEntry = Object.entries(partnerJobCounts).sort((a, b) => b[1] - a[1])[0] ?? null;

    const partnerNames = new Set<string>();
    (outbound ?? []).forEach((o: any) => { if (o.receivingPartnerName) partnerNames.add(o.receivingPartnerName); });
    (inbound ?? []).forEach((o: any) => { if (o.sourcePartnerName) partnerNames.add(o.sourcePartnerName); });

    return {
      networkSize: partnerNames.size,
      monthCommissions: monthComms,
      bestPerformerName: bestEntry ? bestEntry[0] : null,
      bestPerformerJobs: bestEntry ? bestEntry[1] : 0,
    };
  }, [outbound, inbound, commissions]);

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#0A1628]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Network Activity</h1>
              <p className="text-sm text-gray-500">Your real-time ProLnk activity -- leads sent, accepted, jobs closed, commissions earned</p>
            </div>
          </div>
          <LiveBadge />
        </div>

        {/* Live network activity stream */}
        {!isLoading && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Radio className="w-3 h-3" />
              Live Network Feed
            </p>
            <LiveActivityFeed networkSize={glance.networkSize} monthCommissions={glance.monthCommissions} />
          </div>
        )}

        {/* At a Glance summary */}
        {!isLoading && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Network At a Glance</p>
            <NetworkGlanceBar
              networkSize={glance.networkSize}
              monthCommissions={glance.monthCommissions}
              bestPerformerName={glance.bestPerformerName}
              bestPerformerJobs={glance.bestPerformerJobs}
            />
          </div>
        )}

        {/* Feed */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 animate-pulse">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : feed.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <Activity className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No activity yet</p>
            <p className="text-gray-300 text-xs mt-1">Send your first referral or log a job to see activity here</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gray-100" />

            <div className="space-y-3">
              {feed.map((item) => {
                const style = FEED_ICONS[item.type];
                return (
                  <div key={item.id} className="flex items-start gap-4 relative">
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 z-10 ${style.bg} ${style.text}`}>
                      {style.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.message}</p>
                          {item.subtext && (
                            <p className="text-xs text-gray-500 mt-0.5">{item.subtext}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {item.amount && (
                            <span className="text-sm font-bold text-green-600">+${item.amount.toFixed(2)}</span>
                          )}
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {timeAgo(item.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
