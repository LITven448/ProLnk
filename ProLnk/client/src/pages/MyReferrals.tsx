import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send, DollarSign, Clock, CheckCircle, XCircle, TrendingUp,
  RefreshCw, Users, Zap, MessageSquare, UserPlus, Copy, ChevronRight,
  ChevronDown, Network,
} from "lucide-react";

function relativeTime(d: string | Date | null) {
  if (!d) return "Unknown";
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(d).toLocaleDateString();
}

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: any }> = {
  pending:        { label: "Pending",      cls: "bg-amber-100 text-amber-700 border-amber-200″,      icon: Clock },
  pending_review: { label: "Admin Review", cls: "bg-blue-100 text-blue-700 border-blue-200″,         icon: Clock },
  dispatched:     { label: "Dispatched",   cls: "bg-purple-100 text-purple-700 border-purple-200″,   icon: Send },
  accepted:       { label: "Accepted",     cls: "bg-[#0A1628]/10 text-[#0A1628] border-[#0A1628]/20″, icon: CheckCircle },
  closed:         { label: "Closed",       cls: "bg-emerald-100 text-emerald-700 border-emerald-200″, icon: CheckCircle },
  declined:       { label: "Declined",     cls: "bg-red-100 text-red-700 border-red-200″,             icon: XCircle },
  expired:        { label: "Expired",      cls: "bg-gray-100 text-gray-600 border-gray-200″,          icon: XCircle },
};

const NETWORK_STATUS_FILTERS = ["all", "active", "pending", "inactive"] as const;
type NetworkStatusFilter = (typeof NETWORK_STATUS_FILTERS)[number];

const SUBSCRIPTION_CASCADE = [
  { level: "L1 (direct)", sub: "12%", job: "7%" },
  { level: "L2″,          sub: "6%",  job: "4%" },
  { level: "L3″,          sub: "3%",  job: "2%" },
  { level: "L4″,          sub: "1.5%", job: "1%" },
];

const RECRUIT_TIPS = [
  { icon: <MessageSquare className="w-4 h-4 text-[#0A1628]" />, tip: "Share your referral link after every job — ask 'Do you know anyone looking to grow their trades business?'" },
  { icon: <UserPlus className="w-4 h-4 text-[#0A1628]" />, tip: "Target inspectors, realtors, and property managers — they interact with pros daily and refer often." },
  { icon: <Zap className="w-4 h-4 text-[#0A1628]" />, tip: "Post in local trade Facebook groups with your link. A single post can recruit 5–10 pros." },
];

function statusBadgeForPartner(status: string): { label: string; cls: string } {
  if (status === "approved") return { label: "Active",   cls: "bg-emerald-100 text-emerald-700 border-emerald-200″ };
  if (status === "pending")  return { label: "Pending",  cls: "bg-amber-100 text-amber-700 border-amber-200″ };
  return                            { label: "Inactive", cls: "bg-gray-100 text-gray-500 border-gray-200″ };
}

function partnerNetworkStatus(partner: any): NetworkStatusFilter {
  if (partner.status === "approved") return "active";
  if (partner.status === "pending")  return "pending";
  return "inactive";
}

function ReferralTreeNode({
  partner,
  level,
  commissions,
  l2Partners,
  expanded,
  onToggle,
}: {
  partner: any;
  level: 1 | 2;
  commissions: any[];
  l2Partners?: any[];
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const badge = statusBadgeForPartner(partner.status ?? "pending");
  const earned = commissions
    .filter((c: any) => c.sourcePartnerId === partner.id || c.payingPartnerId === partner.id)
    .reduce((sum: number, c: any) => sum + Number(c.amount ?? 0), 0);

  return (
    <div className={`${level === 2 ? "ml-6 border-l-2 border-[#F5E642]/40 pl-4" : ""}`}>
      <div className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 group">
        <div className="flex items-center gap-3 min-w-0 flex-1″>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${
              level === 1 ? "bg-[#0A1628] text-white" : "bg-[#F5E642]/20 text-[#0A1628]"
            }`}
          >
            L{level}
          </div>
          <div className="min-w-0″>
            <p className="font-semibold text-gray-900 text-sm truncate">
              {partner.businessName ?? partner.contactName ?? "Unnamed Pro"}
            </p>
            <div className="flex items-center gap-2 flex-wrap mt-0.5″>
              <span className="text-xs text-gray-400″>{partner.businessType ?? "—"}</span>
              {partner.serviceArea && (
                <span className="text-xs text-gray-400″>· {partner.serviceArea}</span>
              )}
              <span className="text-xs text-gray-400″>· joined {relativeTime(partner.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0″>
          {earned > 0 && (
            <div className="text-right">
              <div className="text-sm font-bold text-emerald-600″>${earned.toFixed(0)}</div>
              <div className="text-xs text-emerald-500″>earned</div>
            </div>
          )}
          <Badge className={`${badge.cls} text-xs border`}>{badge.label}</Badge>
          {level === 1 && l2Partners && l2Partners.length > 0 && (
            <button
              onClick={onToggle}
              className="p-1 rounded hover:bg-gray-100 text-gray-400″
            >
              {expanded ? <ChevronDown className="w-4 h-4″ /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {level === 1 && expanded && l2Partners && l2Partners.length > 0 && (
        <div className="mt-1 space-y-1″>
          {l2Partners.map((l2: any) => (
            <ReferralTreeNode
              key={l2.id}
              partner={l2}
              level={2}
              commissions={commissions}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyReferrals() {
  const [statusFilter, setStatusFilter] = useState<NetworkStatusFilter>("all");
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  const { data: referrals = [], isLoading, refetch } = trpc.partners.getOutboundReferrals.useQuery(undefined, {
    refetchInterval: 60_000,
  });
  const { data: commissions = [] } = trpc.partners.getEarnedCommissions.useQuery();
  const { data: networkDashboard } = trpc.network.getDashboard.useQuery() as { data: any };
  const { data: myProfile } = trpc.partners.getMyProfile.useQuery() as { data: any };

  const l1Partners: any[] = (networkDashboard?.directReferralList ?? []).map((r: any, i: number) => ({
    id: i,
    businessName: r.businessName,
    businessType: r.trade,
    serviceArea: "",
    createdAt: r.joinedAt,
    status: "approved",
  }));
  const l2Partners: any[] = [];
  const l3Partners: any[] = [];
  const l2ByParentId: Record<number, any[]> = {};

  const inviteLink = networkDashboard?.referralLink
    ?? (myProfile?.id ? `${window.location.origin}/join?ref=partner-${myProfile.id}` : "");

  const filteredL1 = l1Partners.filter((p: any) => {
    if (statusFilter === "all") return true;
    return partnerNetworkStatus(p) === statusFilter;
  });

  const totalEarned = (commissions as any[]).reduce((sum: number, c: any) => sum + Number(c.amount ?? 0), 0);
  const pendingEarnings = (commissions as any[]).filter((c: any) => !c.paid).reduce((sum: number, c: any) => sum + Number(c.amount ?? 0), 0);
  const thisMonthEarned = (commissions as any[])
    .filter((c: any) => {
      const d = new Date(c.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum: number, c: any) => sum + Number(c.amount ?? 0), 0);

  function toggleExpanded(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function copyInviteLink() {
    const link = inviteLink || window.location.origin + "/join";
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6″>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3″>
              <Network className="w-6 h-6 text-[#0A1628]" />My Referral Network
            </h1>
            <p className="text-sm text-gray-500 mt-1″>Your downline, override earnings, and outbound leads</p>
          </div>
          <button onClick={() => refetch()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400″>
            <RefreshCw className="w-4 h-4″ />
          </button>
        </div>

        {/* Copy Invite Link CTA */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F5E642]/10 border border-[#F5E642]/30″>
          <div className="flex-1 min-w-0″>
            <p className="text-sm font-semibold text-[#0A1628]">Your invite link</p>
            <p className="text-xs text-gray-500 truncate mt-0.5″>
              {inviteLink || `${window.location.origin}/join`}
            </p>
          </div>
          <button
            onClick={copyInviteLink}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A1628] text-white text-sm font-semibold hover:bg-[#0A1628]/90 transition-colors flex-shrink-0″
          >
            <Copy className="w-4 h-4″ />
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Referral Impact */}
        <Card className="border border-[#0A1628]/10 bg-gradient-to-br from-[#0A1628] to-[#1a2f50] text-white">
          <CardContent className="p-5″>
            <div className="flex items-center gap-2 mb-3″>
              <TrendingUp className="w-5 h-5 text-[#F5E642]" />
              <span className="font-heading font-bold text-lg">Your Referral Impact</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4″>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-[#F5E642]">${thisMonthEarned.toFixed(0)}</div>
                <div className="text-xs text-white/60 mt-1″>Earned this month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-white">${totalEarned.toFixed(0)}</div>
                <div className="text-xs text-white/60 mt-1″>Total earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-amber-400″>${pendingEarnings.toFixed(0)}</div>
                <div className="text-xs text-white/60 mt-1″>Pending payout</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm text-white/80″>
              Each recruit earns you <span className="text-[#F5E642] font-bold">12% of their $149/mo subscription — forever</span>, plus overrides on every job they log.
            </div>
          </CardContent>
        </Card>

        {/* Network Summary Row */}
        <div className="grid grid-cols-4 gap-3″>
          {[
            { label: "L1 (direct)", count: l1Partners.length, color: "text-[#0A1628]", bg: "bg-[#0A1628]/5″ },
            { label: "L2″,          count: l2Partners.length, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "L3″,          count: l3Partners.length, color: "text-blue-600",   bg: "bg-blue-50" },
            { label: "Total",       count: l1Partners.length + l2Partners.length + l3Partners.length, color: "text-emerald-600″, bg: "bg-emerald-50" },
          ].map((row) => (
            <Card key={row.label} className={`border border-gray-200 ${row.bg}`}>
              <CardContent className="p-3 text-center">
                <div className={`text-2xl font-heading font-bold ${row.color}`}>{row.count}</div>
                <div className="text-xs text-gray-500 mt-0.5″>{row.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Referral Tree */}
        <Card className="border border-gray-200″>
          <CardContent className="p-5″>
            <div className="flex items-center justify-between mb-4″>
              <div className="flex items-center gap-2″>
                <Users className="w-5 h-5 text-[#0A1628]" />
                <span className="font-heading font-bold text-gray-900″>Referral Tree</span>
              </div>
              {/* Status filter */}
              <div className="flex gap-1″>
                {NETWORK_STATUS_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                      statusFilter === f
                        ? "bg-[#0A1628] text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200″
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {l1Partners.length === 0 ? (
              <div className="text-center py-10″>
                <div className="w-12 h-12 rounded-xl bg-[#F5E642]/10 flex items-center justify-center mx-auto mb-3″>
                  <UserPlus className="w-6 h-6 text-[#0A1628]/60″ />
                </div>
                <p className="text-sm text-gray-500″>No recruits yet. Share your invite link to start building your network.</p>
              </div>
            ) : (
              <div className="space-y-1″>
                {/* "You" root node */}
                <div className="flex items-center gap-3 px-3 py-2 mb-2″>
                  <div className="w-8 h-8 rounded-full bg-[#F5E642] flex items-center justify-center flex-shrink-0″>
                    <Network className="w-4 h-4 text-[#0A1628]" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm">You</span>
                  <span className="text-xs text-gray-400″>(root of your network)</span>
                </div>

                {filteredL1.length === 0 ? (
                  <p className="text-sm text-gray-400 px-3 py-4 text-center">No partners match this filter.</p>
                ) : (
                  filteredL1.map((partner: any) => (
                    <ReferralTreeNode
                      key={partner.id}
                      partner={partner}
                      level={1}
                      commissions={commissions as any[]}
                      l2Partners={l2ByParentId[partner.id]}
                      expanded={expandedIds.has(partner.id)}
                      onToggle={() => toggleExpanded(partner.id)}
                    />
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4-Level Cascade Rates */}
        <Card className="border border-gray-200″>
          <CardContent className="p-5″>
            <div className="flex items-center gap-2 mb-4″>
              <DollarSign className="w-5 h-5 text-[#0A1628]" />
              <span className="font-heading font-bold text-gray-900″>4-Level Network Override Rates</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100″>
                    <th className="text-left py-2 text-xs text-gray-500 font-medium">Network Level</th>
                    <th className="text-center py-2 text-xs text-gray-500 font-medium">Subscription Override</th>
                    <th className="text-center py-2 text-xs text-gray-500 font-medium">Job Override</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBSCRIPTION_CASCADE.map((row, i) => (
                    <tr key={row.level} className={i === 0 ? "bg-[#F5E642]/10″ : ""}>
                      <td className="py-2.5 font-medium text-gray-800″>{row.level}</td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${i === 0 ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-700"}`}>
                          {row.sub}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${i === 0 ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                          {row.job}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3″>Subscription overrides pay monthly as long as your recruit stays active. Job overrides pay when each job in their network closes.</p>
          </CardContent>
        </Card>

        {/* How to Recruit */}
        <Card className="border border-gray-200″>
          <CardContent className="p-5″>
            <div className="flex items-center gap-2 mb-4″>
              <UserPlus className="w-5 h-5 text-[#0A1628]" />
              <span className="font-heading font-bold text-gray-900″>How to Recruit</span>
            </div>
            <div className="space-y-3″>
              {RECRUIT_TIPS.map((t, i) => (
                <div key={i} className="flex items-start gap-3″>
                  <div className="w-8 h-8 rounded-lg bg-[#F5E642]/20 flex items-center justify-center flex-shrink-0 mt-0.5″>
                    {t.icon}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Outbound Leads Section */}
        <div>
          <h2 className="font-heading font-bold text-gray-900 text-lg mb-3 flex items-center gap-2″>
            <Send className="w-5 h-5 text-[#0A1628]" />Outbound Leads
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4″>
            <Card className="border border-gray-200″>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-heading font-bold text-gray-900″>{(referrals as any[]).length}</div>
                <div className="text-xs text-gray-500 mt-1″>Total Leads</div>
              </CardContent>
            </Card>
            <Card className="border border-emerald-200 bg-emerald-50″>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-heading font-bold text-emerald-700″>${totalEarned.toFixed(0)}</div>
                <div className="text-xs text-emerald-600 mt-1″>Total Earned</div>
              </CardContent>
            </Card>
            <Card className="border border-amber-200 bg-amber-50″>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-heading font-bold text-amber-700″>${pendingEarnings.toFixed(0)}</div>
                <div className="text-xs text-amber-600 mt-1″>Pending Payout</div>
              </CardContent>
            </Card>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12 text-gray-400″>
              <RefreshCw className="w-6 h-6 animate-spin mr-3″ />Loading leads...
            </div>
          )}

          {!isLoading && (referrals as any[]).length === 0 && (
            <Card className="border-dashed border-2 border-gray-200″>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="font-heading font-semibold text-gray-700 text-lg mb-2″>No Outbound Leads Yet</h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  When the AI detects an opportunity from your job photos, it appears here and you earn commission when the job closes.
                </p>
              </CardContent>
            </Card>
          )}

          {(referrals as any[]).length > 0 && (
            <div className="space-y-3″>
              {(referrals as any[]).map((ref: any) => {
                const aiResult = ref.aiAnalysisResult as any;
                const topOpp = aiResult?.opportunities?.[0];
                const statusCfg = STATUS_CONFIG[ref.status] ?? STATUS_CONFIG["pending"];
                const StatusIcon = statusCfg.icon;
                const commission = (commissions as any[]).find((c: any) => c.opportunityId === ref.id);

                return (
                  <Card key={ref.id} className="border border-gray-200 hover:border-[#0A1628]/20 transition-all">
                    <CardContent className="p-5″>
                      <div className="flex items-start justify-between gap-4″>
                        <div className="flex-1 min-w-0″>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge className={`${statusCfg.cls} flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3″ />{statusCfg.label}
                            </Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1″>
                              <Clock className="w-3 h-3″ />{relativeTime(ref.createdAt)}
                            </span>
                          </div>
                          <p className="font-bold text-gray-900 text-base mb-1″>
                            {topOpp?.type ?? ref.opportunityType ?? ref.opportunityCategory ?? "Opportunity"}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2″>
                            {topOpp?.description ?? ref.description ?? "AI analysis pending"}
                          </p>
                          {ref.serviceAddress && (
                            <p className="text-xs text-gray-400 mt-1″>{ref.serviceAddress}</p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0″>
                          {topOpp?.estimatedValue && (
                            <>
                              <div className="text-lg font-heading font-bold text-gray-900″>${topOpp.estimatedValue.toLocaleString()}</div>
                              <div className="text-xs text-gray-400″>est. value</div>
                            </>
                          )}
                          {commission && (
                            <div className="mt-2″>
                              <div className="text-base font-bold text-emerald-600″>${Number(commission.amount).toFixed(0)}</div>
                              <div className="text-xs text-emerald-500″>{commission.paid ? "paid" : "pending"}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PartnerLayout>
  );
}
