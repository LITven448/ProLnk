import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Loader2, Zap, Search, CheckCircle, Clock, XCircle,
  TrendingUp, DollarSign, Eye, Filter
} from "lucide-react";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, bg: "bg-yellow-50", color: "text-yellow-700", border: "border-yellow-200" },
  sent: { label: "Sent", icon: Zap, bg: "bg-blue-50", color: "text-blue-700", border: "border-blue-200" },
  accepted: { label: "Accepted", icon: CheckCircle, bg: "bg-[#F5E642]/10", color: "text-[#0A1628]", border: "border-[#0A1628]/20" },
  declined: { label: "Declined", icon: XCircle, bg: "bg-red-50", color: "text-red-700", border: "border-red-200" },
  converted: { label: "Converted", icon: DollarSign, bg: "bg-green-50", color: "text-green-700", border: "border-green-200" },
  expired: { label: "Expired", icon: XCircle, bg: "bg-gray-50", color: "text-gray-500", border: "border-gray-200" },
};

const CONFIDENCE_COLOR = (c: number) => {
  if (c >= 0.85) return "text-green-600";
  if (c >= 0.70) return "text-[#0A1628]";
  if (c >= 0.60) return "text-yellow-600";
  return "text-gray-400";
};

type Opportunity = {
  id: number;
  opportunityType: string;
  opportunityCategory: string;
  description: string;
  aiConfidence: string | null;
  status: string;
  estimatedJobValue: string | null;
  actualJobValue: string | null;
  platformFeeAmount: string | null;
  referralCommissionAmount: string | null;
  proLinkNetAmount: string | null;
  createdAt: Date;
  sourcePartnerName: string | null;
  receivingPartnerName: string | null;
  serviceAddress: string | null;
  photoUrl: string | null;
  jobId: number | null;
};

function OpportunityCard({ opp }: { opp: Opportunity }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[opp.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending;
  const StatusIcon = status.icon;
  const confidence = opp.aiConfidence ? parseFloat(opp.aiConfidence) : 0;

  return (
    <div className={`bg-white rounded-xl border ${status.border} shadow-sm overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--teal-light)" }}>
              <Zap className="w-4 h-4" style={{ color: "var(--teal)" }} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate capitalize">
                {opp.opportunityType.replace(/_/g, " ")}
              </p>
              <p className="text-xs text-gray-400 truncate">{opp.serviceAddress ?? "Unknown address"}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${status.bg} ${status.color}`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </div>
        </div>

        {/* AI confidence bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">AI Confidence</span>
            <span className={`text-xs font-bold ${CONFIDENCE_COLOR(confidence)}`}>
              {Math.round(confidence * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${confidence * 100}%`,
                backgroundColor: confidence >= 0.85 ? "#16a34a" : confidence >= 0.70 ? "var(--teal)" : "#d97706",
              }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{opp.description}</p>

        {/* Partner flow */}
        <div className="flex items-center gap-2 text-xs mb-3">
          <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 truncate max-w-[120px]">
            {opp.sourcePartnerName ?? "Unknown"}
          </span>
          <span className="text-gray-300"></span>
          <span className="px-2 py-0.5 rounded text-white text-xs truncate max-w-[120px]"
            style={{ backgroundColor: "var(--teal)" }}>
            ProLnk
          </span>
          <span className="text-gray-300"></span>
          <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 truncate max-w-[120px]">
            {opp.receivingPartnerName ?? "Unmatched"}
          </span>
        </div>

        {/* Financial summary */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Est. Value</p>
            <p className="text-sm font-bold text-gray-700">
              {opp.estimatedJobValue ? `$${parseFloat(opp.estimatedJobValue).toLocaleString()}` : "--"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Actual Value</p>
            <p className="text-sm font-bold text-gray-700">
              {opp.actualJobValue ? `$${parseFloat(opp.actualJobValue).toLocaleString()}` : "--"}
            </p>
          </div>
          <div className="rounded-lg p-2" style={{ backgroundColor: "var(--teal-light)" }}>
            <p className="text-xs" style={{ color: "var(--teal)" }}>ProLnk Net</p>
            <p className="text-sm font-bold" style={{ color: "var(--teal)" }}>
              {opp.proLinkNetAmount ? `$${parseFloat(opp.proLinkNetAmount).toLocaleString()}` : "--"}
            </p>
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-[#0A1628] transition-colors"
        >
          <Eye className="w-3 h-3" />
          {expanded ? "Hide details" : "View details"}
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
            {opp.photoUrl && (
              <img
                src={opp.photoUrl}
                alt="Job photo"
                className="w-full h-32 object-cover rounded-lg"
              />
            )}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Category:</span>
                <span className="ml-1 text-gray-700 capitalize">{opp.opportunityCategory}</span>
              </div>
              <div>
                <span className="text-gray-400">Job ID:</span>
                <span className="ml-1 text-gray-700">#{opp.jobId}</span>
              </div>
              {opp.platformFeeAmount && (
                <div>
                  <span className="text-gray-400">Platform Fee:</span>
                  <span className="ml-1 text-gray-700">${parseFloat(opp.platformFeeAmount).toFixed(2)}</span>
                </div>
              )}
              {opp.referralCommissionAmount && (
                <div>
                  <span className="text-gray-400">Referral Payout:</span>
                  <span className="ml-1 text-gray-700">${parseFloat(opp.referralCommissionAmount).toFixed(2)}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 italic">{opp.description}</p>
          </div>
        )}
      </div>

      {/* Timestamp footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Detected {new Date(opp.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function AdminOpportunityFeed() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: opportunities, isLoading } = trpc.admin.getOpportunityFeed.useQuery(undefined, {
    refetchInterval: 30000, // auto-refresh every 30s
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-2xl font-heading text-gray-900">Admin Access Required</h2>
        <Button onClick={() => { window.location.href = getLoginUrl(); }}>Sign In</Button>
      </div>
    );
  }

  const filtered = (opportunities ?? []).filter((o: Opportunity) => {
    const matchesSearch = !search ||
      o.opportunityType.toLowerCase().includes(search.toLowerCase()) ||
      (o.sourcePartnerName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (o.receivingPartnerName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (o.serviceAddress ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalRevenue = (opportunities ?? [])
    .filter((o: Opportunity) => o.status === "converted" && o.proLinkNetAmount)
    .reduce((sum: number, o: Opportunity) => sum + parseFloat(o.proLinkNetAmount!), 0);
  const convertedCount = (opportunities ?? []).filter((o: Opportunity) => o.status === "converted").length;
  const pendingCount = (opportunities ?? []).filter((o: Opportunity) => o.status === "sent" || o.status === "accepted").length;

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                <ArrowLeft className="w-4 h-4" /> Admin
              </Button>
            </Link>
            <div className="w-px h-6 bg-gray-200" />
            <span className="font-heading text-gray-900 tracking-wide">AI OPPORTUNITY FEED</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Live" />
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Detected", value: opportunities?.length ?? 0, icon: Zap, color: "text-[#0A1628]" },
            { label: "Converted", value: convertedCount, icon: CheckCircle, color: "text-green-600" },
            { label: "In Progress", value: pendingCount, icon: Clock, color: "text-blue-600" },
            { label: "ProLnk Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-green-700" },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
                <p className="text-2xl font-heading text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by type, partner, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {["all", "sent", "accepted", "converted", "declined", "pending"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  statusFilter === s
                    ? "text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#0A1628]/30"
                }`}
                style={statusFilter === s ? { backgroundColor: "var(--teal)" } : {}}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Feed */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-2 bg-gray-100 rounded w-full mb-2" />
                <div className="h-2 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "var(--teal-light)" }}>
              <Zap className="w-8 h-8" style={{ color: "var(--teal)" }} />
            </div>
            <h3 className="text-lg font-heading text-gray-700 mb-2">No Opportunities Yet</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {search || statusFilter !== "all"
                ? "No opportunities match your filters."
                : "Opportunities will appear here as partners log jobs and the AI analyzes their photos."}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((opp: Opportunity) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}
