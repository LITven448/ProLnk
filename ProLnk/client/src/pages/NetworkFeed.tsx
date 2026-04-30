import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Activity, Send, CheckCircle, DollarSign, TrendingUp, Star, Zap, Clock } from "lucide-react";

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

const FEED_ICONS: Record<FeedItem["type"], { icon: React.ReactNode; bg: string; text: string }> = {
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

export default function NetworkFeed() {
  const { data: outbound, isLoading: l1 } = trpc.partners.getOutboundReferrals.useQuery();
  const { data: inbound, isLoading: l2 } = trpc.partners.getInboundOpportunities.useQuery();
  const { data: commissions, isLoading: l3 } = trpc.partners.getEarnedCommissions.useQuery();

  const isLoading = l1 || l2 || l3;

  const feed = React.useMemo(
    () => buildFeed(outbound ?? [], inbound ?? [], commissions ?? []),
    [outbound, inbound, commissions]
  );

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#0A1628]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Network Activity</h1>
            <p className="text-sm text-gray-500">Your real-time ProLnk activity -- leads sent, accepted, jobs closed, commissions earned</p>
          </div>
        </div>

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
