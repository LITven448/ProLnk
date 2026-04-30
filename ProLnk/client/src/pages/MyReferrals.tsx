import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Send, DollarSign, Clock, CheckCircle, XCircle, Camera, TrendingUp, RefreshCw, Inbox } from "lucide-react";

function relativeTime(d: string | Date | null) {
  if (!d) return "Unknown";
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(d).toLocaleDateString();
}

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: any }> = {
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  pending_review: { label: "Admin Review", cls: "bg-blue-100 text-blue-700 border-blue-200", icon: Clock },
  dispatched: { label: "Dispatched", cls: "bg-purple-100 text-purple-700 border-purple-200", icon: Send },
  accepted: { label: "Accepted", cls: "bg-[#0A1628]/10 text-[#0A1628] border-[#0A1628]/20", icon: CheckCircle },
  closed: { label: "Closed", cls: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle },
  declined: { label: "Declined", cls: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  expired: { label: "Expired", cls: "bg-gray-100 text-gray-600 border-gray-200", icon: XCircle },
};

export default function MyReferrals() {
  const { data: referrals = [], isLoading, refetch } = trpc.partners.getOutboundReferrals.useQuery(undefined, {
    refetchInterval: 60_000,
  });
  const { data: commissions = [] } = trpc.partners.getEarnedCommissions.useQuery();

  const totalEarned = (commissions as any[]).reduce((sum: number, c: any) => sum + Number(c.amount ?? 0), 0);
  const pendingEarnings = (commissions as any[]).filter((c: any) => !c.paid).reduce((sum: number, c: any) => sum + Number(c.amount ?? 0), 0);

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <Send className="w-6 h-6 text-[#0A1628]" />My Referrals
            </h1>
            <p className="text-sm text-gray-500 mt-1">Opportunities you have submitted to the ProLnk network</p>
          </div>
          <button onClick={() => refetch()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-heading font-bold text-gray-900">{(referrals as any[]).length}</div>
              <div className="text-xs text-gray-500 mt-1">Total Referrals</div>
            </CardContent>
          </Card>
          <Card className="border border-emerald-200 bg-emerald-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-heading font-bold text-emerald-700">${totalEarned.toFixed(0)}</div>
              <div className="text-xs text-emerald-600 mt-1">Total Earned</div>
            </CardContent>
          </Card>
          <Card className="border border-amber-200 bg-amber-50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-heading font-bold text-amber-700">${pendingEarnings.toFixed(0)}</div>
              <div className="text-xs text-amber-600 mt-1">Pending Payout</div>
            </CardContent>
          </Card>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <RefreshCw className="w-6 h-6 animate-spin mr-3" />Loading referrals...
          </div>
        )}

        {!isLoading && (referrals as any[]).length === 0 && (
          <Card className="border-dashed border-2 border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F5E642]/10 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-[#0A1628]/70" />
              </div>
              <h3 className="font-heading font-semibold text-gray-700 text-lg mb-2">No Referrals Yet</h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Submit photos from your job sites using the Field App. When the AI detects an opportunity for another trade, it creates a referral here and you earn commission when the job closes.
              </p>
            </CardContent>
          </Card>
        )}

        {(referrals as any[]).length > 0 && (
          <div className="space-y-3">
            {(referrals as any[]).map((ref: any) => {
              const aiResult = ref.aiAnalysisResult as any;
              const topOpp = aiResult?.opportunities?.[0];
              const statusCfg = STATUS_CONFIG[ref.status] ?? STATUS_CONFIG["pending"];
              const StatusIcon = statusCfg.icon;
              const commission = (commissions as any[]).find((c: any) => c.opportunityId === ref.id);

              return (
                <Card key={ref.id} className="border border-gray-200 hover:border-[#0A1628]/20 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge className={`${statusCfg.cls} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />{statusCfg.label}
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />{relativeTime(ref.createdAt)}
                          </span>
                        </div>
                        <p className="font-bold text-gray-900 text-base mb-1">
                          {topOpp?.type ?? ref.opportunityType ?? ref.opportunityCategory ?? "Opportunity"}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {topOpp?.description ?? ref.description ?? "AI analysis pending"}
                        </p>
                        {ref.serviceAddress && (
                          <p className="text-xs text-gray-400 mt-1">{ref.serviceAddress}</p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        {topOpp?.estimatedValue && (
                          <>
                            <div className="text-lg font-heading font-bold text-gray-900">${topOpp.estimatedValue.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">est. value</div>
                          </>
                        )}
                        {commission && (
                          <div className="mt-2">
                            <div className="text-base font-bold text-emerald-600">${Number(commission.amount).toFixed(0)}</div>
                            <div className="text-xs text-emerald-500">{commission.paid ? "paid" : "pending"}</div>
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
    </PartnerLayout>
  );
}
