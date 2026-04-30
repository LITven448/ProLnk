/**
 * Deal Management -- /admin/deals
 *
 * Admin view for managing Customer Deal Pages.
 * Shows all deals in a pipeline view with status tracking,
 * deal creation from opportunities, and job close reporting.
 */

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink, Copy, CheckCircle2, Clock, Eye, Calendar,
  XCircle, DollarSign, Plus, RefreshCw, BarChart3,
  AlertTriangle, TrendingUp
} from "lucide-react";

// --- Status config ------------------------------------------------------------
const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  draft:         { label: "Draft",       color: "bg-gray-100 text-gray-600",     icon: Clock },
  sent:          { label: "Sent",        color: "bg-blue-100 text-blue-700",     icon: ExternalLink },
  viewed:        { label: "Viewed",      color: "bg-purple-100 text-purple-700", icon: Eye },
  scheduled:     { label: "Scheduled",   color: "bg-green-100 text-green-700",   icon: Calendar },
  estimate_done: { label: "Quoted",      color: "bg-yellow-100 text-yellow-700", icon: DollarSign },
  accepted:      { label: "Accepted",    color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  job_closed:    { label: "Closed",      color: "bg-teal-100 text-teal-700",     icon: CheckCircle2 },
  declined:      { label: "Declined",    color: "bg-red-100 text-red-700",       icon: XCircle },
  expired:       { label: "Expired",     color: "bg-gray-100 text-gray-500",     icon: Clock },
};

// --- Stat card ----------------------------------------------------------------
function StatCard({ label, value, sub, color }: {
  label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// --- Deal row -----------------------------------------------------------------
function DealRow({ deal, onCopyLink, onCloseJob }: {
  deal: any;
  onCopyLink: (token: string) => void;
  onCloseJob: (deal: any) => void;
}) {
  const cfg = STATUS_CONFIG[deal.status] || STATUS_CONFIG.draft;
  const Icon = cfg.icon;
  const dealUrl = `${window.location.origin}/deal/${deal.token}`;

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="py-3 px-4">
        <div>
          <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
            {deal.issueDescriptionShort || deal.issueType || "Untitled Issue"}
          </p>
          <p className="text-xs text-gray-500">{deal.issueCategory}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-sm text-gray-700">
          {deal.receivingPartnerName || <span className="text-gray-400 italic">Unassigned</span>}
        </div>
        <div className="text-xs text-gray-400">{deal.referringPartnerName}</div>
      </td>
      <td className="py-3 px-4">
        <div className="text-sm text-gray-600">
          {deal.homeownerCity || "--"}
          {deal.homeownerZip && <span className="text-gray-400"> {deal.homeownerZip}</span>}
        </div>
        {deal.homeownerName && (
          <div className="text-xs text-gray-400">{deal.homeownerName}</div>
        )}
      </td>
      <td className="py-3 px-4">
        <Badge className={`text-xs ${cfg.color} flex items-center gap-1 w-fit`}>
          <Icon size={10} />
          {cfg.label}
        </Badge>
        {deal.viewCount > 0 && (
          <p className="text-xs text-gray-400 mt-0.5">{deal.viewCount} view{deal.viewCount !== 1 ? "s" : ""}</p>
        )}
      </td>
      <td className="py-3 px-4">
        {deal.estimatedValueLow || deal.estimatedValueHigh ? (
          <div className="text-sm font-medium text-gray-900">
            ${Number(deal.estimatedValueLow || 0).toLocaleString()}
            {deal.estimatedValueHigh && ` - $${Number(deal.estimatedValueHigh).toLocaleString()}`}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">--</span>
        )}
        {deal.actualJobValue && (
          <div className="text-xs text-teal-600 font-semibold">
            Closed: ${Number(deal.actualJobValue).toLocaleString()}
          </div>
        )}
      </td>
      <td className="py-3 px-4">
        {deal.expiresAt && deal.status === "sent" ? (
          <div className="text-xs text-amber-600">
            Expires {new Date(deal.expiresAt).toLocaleDateString()}
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            {new Date(deal.createdAt).toLocaleDateString()}
          </div>
        )}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onCopyLink(deal.token)}
            title="Copy deal link"
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
          >
            <Copy size={14} />
          </button>
          <a
            href={dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Preview deal page"
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
          >
            <ExternalLink size={14} />
          </a>
          {["scheduled", "estimate_done", "accepted"].includes(deal.status) && (
            <button
              onClick={() => onCloseJob(deal)}
              title="Mark job closed"
              className="p-1.5 hover:bg-teal-50 rounded-lg transition-colors text-teal-600 hover:text-teal-700"
            >
              <CheckCircle2 size={14} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// --- Close Job Modal ----------------------------------------------------------
function CloseJobModal({
  deal,
  onClose,
  onSuccess,
}: {
  deal: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [jobValue, setJobValue] = useState("");

  const closeJob = trpc.deals.closeJob.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        onSuccess();
        onClose();
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
        <h3 className="font-bold text-gray-900 mb-1">Close Job</h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the actual job value to close this deal and trigger commission calculations.
        </p>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">Actual Job Value ($)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              value={jobValue}
              onChange={e => setJobValue(e.target.value)}
              placeholder="2500"
              className="pl-7"
              min="0"
            />
          </div>
          {deal.estimatedValueLow && (
            <p className="text-xs text-gray-400 mt-1">
              Estimated: ${Number(deal.estimatedValueLow).toLocaleString()}
              {deal.estimatedValueHigh && ` - $${Number(deal.estimatedValueHigh).toLocaleString()}`}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button
            onClick={() => closeJob.mutate({ token: deal.token, actualJobValue: Number(jobValue) })}
            disabled={!jobValue || closeJob.isPending}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
          >
            {closeJob.isPending ? "Closing..." : "Close Job"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Main page ----------------------------------------------------------------
export default function DealManagement() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [closingDeal, setClosingDeal] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, refetch } = trpc.deals.listDeals.useQuery({ limit: 100, offset: 0 });
  const { data: stats } = trpc.deals.getStats.useQuery();

  const deals = data?.deals || [];
  const filtered = statusFilter === "all"
    ? deals
    : deals.filter((d: any) => d.status === statusFilter);

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/deal/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const conversionRate = stats && Number(stats.total) > 0
    ? Math.round((Number(stats.scheduled || 0) + Number(stats.closed || 0)) / Number(stats.total) * 100)
    : 0;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Deal Pages</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage homeowner deal pages -- track views, schedules, and closed jobs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="gap-1.5"
            >
              <RefreshCw size={14} />
              Refresh
            </Button>
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5"
              onClick={() => window.location.href = "/admin/photo-queue"}
            >
              <Plus size={14} />
              Create from Photo Queue
            </Button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <StatCard label="Total Deals" value={stats.total || 0} color="text-gray-900" />
            <StatCard label="Sent" value={stats.sent || 0} color="text-blue-600" />
            <StatCard label="Viewed" value={stats.viewed || 0} color="text-purple-600" />
            <StatCard label="Scheduled" value={stats.scheduled || 0} color="text-green-600" />
            <StatCard label="Closed" value={stats.closed || 0} color="text-teal-600" />
            <StatCard
              label="Conversion"
              value={`${conversionRate}%`}
              sub="sent  scheduled"
              color="text-emerald-600"
            />
            <StatCard
              label="Revenue"
              value={`$${Number(stats.totalRevenue || 0).toLocaleString()}`}
              sub="closed job value"
              color="text-teal-700"
            />
          </div>
        )}

        {/* Pipeline value banner */}
        {deals.length > 0 && (
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp size={20} className="text-teal-200" />
              <div>
                <p className="text-sm text-teal-100">Active Pipeline Value</p>
                <p className="text-xl font-bold text-white">
                  ${deals
                    .filter((d: any) => ["sent","viewed","scheduled","estimate_done","accepted"].includes(d.status))
                    .reduce((sum: number, d: any) => sum + Number(d.estimatedValueLow || 0), 0)
                    .toLocaleString()}
                  <span className="text-sm text-teal-200 font-normal ml-1">estimated low</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-teal-100">ProLnk 5% Fee</p>
              <p className="text-lg font-bold text-white">
                ${Math.round(deals
                  .filter((d: any) => ["sent","viewed","scheduled","estimate_done","accepted"].includes(d.status))
                  .reduce((sum: number, d: any) => sum + Number(d.estimatedValueLow || 0), 0) * 0.05
                ).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {["all", "draft", "sent", "viewed", "scheduled", "job_closed", "declined", "expired"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                statusFilter === s
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s === "all" ? `All (${deals.length})` : s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="py-16 text-center">
              <RefreshCw size={24} className="animate-spin text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Loading deals...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <BarChart3 size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-500">No deals found</p>
              <p className="text-xs text-gray-400 mt-1">
                Create deals from approved photos in the Photo Queue
              </p>
              <Button
                size="sm"
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => window.location.href = "/admin/photo-queue"}
              >
                Go to Photo Queue
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 py-3 px-4">Issue</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3 px-4">Partners</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3 px-4">Location</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3 px-4">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3 px-4">Value</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3 px-4">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-500 py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((deal: any) => (
                    <DealRow
                      key={deal.id}
                      deal={deal}
                      onCopyLink={handleCopyLink}
                      onCloseJob={setClosingDeal}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Copy success toast */}
        {copiedToken && (
          <div className="fixed bottom-6 right-6 bg-white text-white text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 z-50">
            <CheckCircle2 size={14} className="text-teal-400" />
            Deal link copied to clipboard
          </div>
        )}

        {/* Info box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <AlertTriangle size={16} className="text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-900">How Customer Deal Pages Work</p>
            <p className="text-sm text-blue-700 mt-1">
              Each deal gets a unique link (e.g. <code className="bg-blue-100 px-1 rounded text-xs">/deal/abc123</code>) that you send to the homeowner via email or SMS.
              The homeowner sees the AI-detected issue, the receiving partner's profile and reviews, and a CTA to request a free estimate.
              No login required. The 48-hour countdown creates urgency. Once they submit contact info, the partner reaches out to schedule.
            </p>
          </div>
        </div>
      </div>

      {/* Close job modal */}
      {closingDeal && (
        <CloseJobModal
          deal={closingDeal}
          onClose={() => setClosingDeal(null)}
          onSuccess={() => refetch()}
        />
      )}
    </AdminLayout>
  );
}
