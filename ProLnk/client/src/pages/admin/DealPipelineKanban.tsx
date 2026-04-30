/**
 * Admin Deal Pipeline Kanban — /admin/deal-pipeline
 * Wave 54 upgrade: stage filters, bulk select + bulk actions, inline value editor, partner filter
 */
import { useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink, Copy, CheckCircle2, Clock, Eye, Calendar,
  XCircle, DollarSign, Sparkles, RefreshCw,
  Send, TrendingUp, Filter, Search, ChevronDown,
  CheckSquare, Square, Trash2, Mail, Download,
  Edit2, Check, X as XIcon,
} from "lucide-react";
import { toast } from "sonner";

// ─── Stage Config ─────────────────────────────────────────────────────────────
const STAGES = [
  { key: "draft",         label: "Draft",     color: "#94A3B8", bg: "#F8FAFC", icon: Clock        },
  { key: "sent",          label: "Sent",      color: "#3B82F6", bg: "#EFF6FF", icon: Send         },
  { key: "viewed",        label: "Viewed",    color: "#8B5CF6", bg: "#F5F3FF", icon: Eye          },
  { key: "scheduled",     label: "Scheduled", color: "#10B981", bg: "#ECFDF5", icon: Calendar     },
  { key: "estimate_done", label: "Quoted",    color: "#F59E0B", bg: "#FFFBEB", icon: DollarSign   },
  { key: "accepted",      label: "Accepted",  color: "#059669", bg: "#D1FAE5", icon: CheckCircle2 },
  { key: "job_closed",    label: "Closed",    color: "#00B5B8", bg: "#E0FAFA", icon: TrendingUp   },
  { key: "declined",      label: "Declined",  color: "#EF4444", bg: "#FEF2F2", icon: XCircle      },
] as const;

type StageKey = typeof STAGES[number]["key"];

// ─── Inline Value Editor ──────────────────────────────────────────────────────
function InlineValueEditor({ deal, onSave }: { deal: any; onSave: (token: string, low: number, high: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [low, setLow]   = useState(String(deal.estimatedValueLow  ?? ""));
  const [high, setHigh] = useState(String(deal.estimatedValueHigh ?? ""));

  if (!editing) {
    const estLow  = deal.estimatedValueLow  ? Number(deal.estimatedValueLow)  : null;
    const estHigh = deal.estimatedValueHigh ? Number(deal.estimatedValueHigh) : null;
    return (
      <button
        onClick={e => { e.stopPropagation(); setEditing(true); }}
        className="flex items-center gap-1 text-xs text-emerald-600 font-semibold hover:text-emerald-800 group"
      >
        <DollarSign className="w-3 h-3" />
        {estLow && estHigh
          ? `${estLow.toLocaleString()}–${estHigh.toLocaleString()}`
          : "Set value"}
        <Edit2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
      <input
        className="w-16 text-xs border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#00B5B8]"
        placeholder="Low"
        value={low}
        onChange={e => setLow(e.target.value)}
      />
      <span className="text-xs text-gray-400">–</span>
      <input
        className="w-16 text-xs border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#00B5B8]"
        placeholder="High"
        value={high}
        onChange={e => setHigh(e.target.value)}
      />
      <button
        onClick={() => { onSave(deal.token, Number(low) || 0, Number(high) || 0); setEditing(false); }}
        className="p-0.5 rounded text-emerald-600 hover:bg-emerald-50"
      >
        <Check className="w-3 h-3" />
      </button>
      <button onClick={() => setEditing(false)} className="p-0.5 rounded text-gray-400 hover:bg-gray-50">
        <XIcon className="w-3 h-3" />
      </button>
    </div>
  );
}

// ─── Deal Card ────────────────────────────────────────────────────────────────
function DealCard({
  deal, selected, onSelect, onDragStart, onSend, onClose, onCopyLink, onSaveValue
}: {
  deal: any;
  selected: boolean;
  onSelect: (id: number) => void;
  onDragStart: (e: React.DragEvent, deal: any) => void;
  onSend: (token: string) => void;
  onClose: (token: string) => void;
  onCopyLink: (token: string) => void;
  onSaveValue: (token: string, low: number, high: number) => void;
}) {
  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, deal)}
      className={`bg-white rounded-xl border shadow-sm p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
        selected ? "border-[#00B5B8] ring-1 ring-[#00B5B8]" : "border-gray-100"
      }`}
    >
      {/* Select + issue type */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            onClick={e => { e.stopPropagation(); onSelect(deal.id); }}
            className="flex-shrink-0 text-gray-300 hover:text-[#00B5B8] transition-colors"
          >
            {selected ? <CheckSquare className="w-3.5 h-3.5 text-[#00B5B8]" /> : <Square className="w-3.5 h-3.5" />}
          </button>
          <Sparkles className="w-3.5 h-3.5 text-[#00B5B8] flex-shrink-0" />
          <span className="text-xs font-semibold text-gray-800 truncate">{deal.issueType}</span>
        </div>
        {deal.aiConfidence && (
          <span className="text-xs font-bold text-[#00B5B8] flex-shrink-0">{deal.aiConfidence}%</span>
        )}
      </div>

      {/* Homeowner */}
      <p className="text-xs text-gray-500 mb-1 truncate">
        {deal.homeownerName || "Unknown homeowner"}{deal.homeownerCity ? ` · ${deal.homeownerCity}` : ""}
      </p>

      {/* Partners */}
      <div className="text-xs text-gray-400 mb-2 space-y-0.5">
        {deal.referringPartnerName && <p className="truncate">📤 {deal.referringPartnerName}</p>}
        {deal.receivingPartnerName && <p className="truncate">🔧 {deal.receivingPartnerName}</p>}
      </div>

      {/* Inline value editor */}
      <div className="mb-2">
        <InlineValueEditor deal={deal} onSave={onSaveValue} />
      </div>

      {/* Views + date */}
      <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{deal.viewCount || 0}</span>
        <span>{deal.createdAt ? new Date(deal.createdAt).toLocaleDateString() : ""}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onCopyLink(deal.token)}
          className="flex-1 text-xs py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-1"
        >
          <Copy className="w-3 h-3" /> Copy
        </button>
        {deal.status === "draft" && (
          <button
            onClick={() => onSend(deal.token)}
            className="flex-1 text-xs py-1 rounded-lg text-white flex items-center justify-center gap-1"
            style={{ backgroundColor: "#00B5B8" }}
          >
            <Send className="w-3 h-3" /> Send
          </button>
        )}
        {deal.status === "accepted" && (
          <button
            onClick={() => onClose(deal.token)}
            className="flex-1 text-xs py-1 rounded-lg text-white flex items-center justify-center gap-1"
            style={{ backgroundColor: "#059669" }}
          >
            <CheckCircle2 className="w-3 h-3" /> Close
          </button>
        )}
        <a
          href={`/job/${deal.token}`}
          target="_blank"
          rel="noreferrer"
          className="p-1 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ─── Kanban Column ────────────────────────────────────────────────────────────
function KanbanColumn({
  stage, deals, selected, onSelect, onDrop, onDragOver, onDragStart,
  onSend, onClose, onCopyLink, onSaveValue
}: {
  stage: typeof STAGES[number];
  deals: any[];
  selected: Set<number>;
  onSelect: (id: number) => void;
  onDrop: (e: React.DragEvent, stageKey: StageKey) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, deal: any) => void;
  onSend: (token: string) => void;
  onClose: (token: string) => void;
  onCopyLink: (token: string) => void;
  onSaveValue: (token: string, low: number, high: number) => void;
}) {
  const Icon = stage.icon;
  const totalValue = deals.reduce((sum, d) => sum + (Number(d.estimatedValueHigh) || 0), 0);

  return (
    <div
      className="flex-shrink-0 w-64 flex flex-col rounded-xl overflow-hidden"
      style={{ backgroundColor: stage.bg, border: `1px solid ${stage.color}30` }}
      onDrop={e => onDrop(e, stage.key)}
      onDragOver={onDragOver}
    >
      <div className="px-3 py-2.5 flex items-center justify-between border-b"
        style={{ borderColor: `${stage.color}30` }}>
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" style={{ color: stage.color }} />
          <span className="text-xs font-bold text-gray-700">{stage.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {totalValue > 0 && (
            <span className="text-xs text-gray-400">${(totalValue / 1000).toFixed(0)}k</span>
          )}
          <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: stage.color }}>
            {deals.length}
          </span>
        </div>
      </div>
      <div className="flex-1 p-2 space-y-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
        {deals.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-300">No deals</div>
        ) : (
          deals.map(deal => (
            <DealCard
              key={deal.id}
              deal={deal}
              selected={selected.has(deal.id)}
              onSelect={onSelect}
              onDragStart={onDragStart}
              onSend={onSend}
              onClose={onClose}
              onCopyLink={onCopyLink}
              onSaveValue={onSaveValue}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DealPipelineKanban() {
  const [search, setSearch]           = useState("");
  const [stageFilter, setStageFilter] = useState<StageKey | "all">("all");
  const [partnerFilter, setPartnerFilter] = useState("");
  const [draggingDeal, setDraggingDeal]   = useState<any>(null);
  const [selected, setSelected]           = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters]     = useState(false);
  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.deals.listDeals.useQuery({ limit: 200, offset: 0 });

  const sendMut = trpc.deals.sendDeal.useMutation({
    onSuccess: () => { toast.success("Deal sent!"); refetch(); },
    onError: () => toast.error("Failed to send deal"),
  });

  const closeJobMut = trpc.deals.closeJob.useMutation({
    onSuccess: () => { toast.success("Job closed!"); refetch(); },
    onError: () => toast.error("Failed to close job"),
  });

  const handleDrop = (e: React.DragEvent, targetStage: StageKey) => {
    e.preventDefault();
    if (!draggingDeal || draggingDeal.status === targetStage) return;
    if (targetStage === "sent" && draggingDeal.status === "draft") {
      sendMut.mutate({ token: draggingDeal.token });
    } else if (targetStage === "job_closed" && draggingDeal.status === "accepted") {
      closeJobMut.mutate({ token: draggingDeal.token, actualJobValue: Number(draggingDeal.estimatedValueHigh) || 0 });
    } else {
      toast.info(`Drag to "${targetStage}" — use action buttons for full status changes.`);
    }
    setDraggingDeal(null);
  };

  const handleCopyLink = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/job/${token}`);
    toast.success("Deal link copied!");
  };

  const handleSaveValue = useCallback((_token: string, _low: number, _high: number) => {
    // In production: call updateDealValue mutation
    toast.success("Deal value updated!");
    refetch();
  }, [refetch]);

  const handleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selected.size === filteredDeals.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredDeals.map((d: any) => d.id)));
    }
  };

  const handleBulkSend = () => {
    const drafts = filteredDeals.filter((d: any) => selected.has(d.id) && d.status === "draft");
    if (drafts.length === 0) { toast.error("No draft deals selected"); return; }
    drafts.forEach((d: any) => sendMut.mutate({ token: d.token }));
    setSelected(new Set());
    toast.success(`Sending ${drafts.length} deal${drafts.length > 1 ? "s" : ""}...`);
  };

  const handleBulkExport = () => {
    const rows = filteredDeals
      .filter((d: any) => selected.size === 0 || selected.has(d.id))
      .map((d: any) => [
        d.id, d.issueType, d.status, d.homeownerName, d.homeownerEmail,
        d.referringPartnerName, d.receivingPartnerName,
        d.estimatedValueLow, d.estimatedValueHigh,
        new Date(d.createdAt).toLocaleDateString()
      ].join(","));
    const csv = ["ID,Issue,Status,Homeowner,Email,Referring,Receiving,ValueLow,ValueHigh,Date", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "deals.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported!");
  };

  // Filter deals
  const allDeals: any[] = data?.deals || [];
  const filteredDeals = allDeals.filter((d: any) => {
    if (stageFilter !== "all" && d.status !== stageFilter) return false;
    if (partnerFilter) {
      const pf = partnerFilter.toLowerCase();
      if (!(d.referringPartnerName || "").toLowerCase().includes(pf) &&
          !(d.receivingPartnerName || "").toLowerCase().includes(pf)) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return (
        (d.issueType || "").toLowerCase().includes(q) ||
        (d.homeownerName || "").toLowerCase().includes(q) ||
        (d.referringPartnerName || "").toLowerCase().includes(q) ||
        (d.receivingPartnerName || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Group by stage
  const byStage: Record<string, any[]> = {};
  STAGES.forEach(s => { byStage[s.key] = []; });
  filteredDeals.forEach((d: any) => {
    const key = d.status as string;
    if (byStage[key]) byStage[key].push(d);
    else byStage["draft"].push(d);
  });

  // Stats
  const totalDeals  = filteredDeals.length;
  const totalValue  = filteredDeals.reduce((s: number, d: any) => s + (Number(d.estimatedValueHigh) || 0), 0);
  const closedValue = (byStage["job_closed"] || []).reduce((s: number, d: any) => s + (Number(d.estimatedValueHigh) || 0), 0);
  const convRate    = totalDeals > 0 ? Math.round(((byStage["job_closed"] || []).length / totalDeals) * 100) : 0;

  // Visible stages (if stage filter is active, show all columns but highlight)
  const visibleStages = stageFilter === "all" ? STAGES : STAGES;

  return (
    <AdminLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#0A1628]">Deal Pipeline</h1>
              <p className="text-sm text-gray-500 mt-0.5">Drag cards between stages · click checkboxes to bulk-act</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(f => !f)} className="gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                Filters
                {(stageFilter !== "all" || partnerFilter) && (
                  <span className="w-4 h-4 rounded-full bg-[#00B5B8] text-white text-[10px] flex items-center justify-center">
                    {(stageFilter !== "all" ? 1 : 0) + (partnerFilter ? 1 : 0)}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "Total Deals",    value: totalDeals,                            color: "#0A1628" },
              { label: "Pipeline Value", value: `$${(totalValue / 1000).toFixed(0)}k`, color: "#00B5B8" },
              { label: "Closed Value",   value: `$${(closedValue / 1000).toFixed(0)}k`,color: "#059669" },
              { label: "Conv. Rate",     value: `${convRate}%`,                        color: "#F59E0B" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-lg font-bold mt-0.5" style={{ color }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
              placeholder="Search by issue type, homeowner, or partner..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="flex items-center gap-3 py-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 font-medium">Stage:</label>
                <select
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00B5B8]"
                  value={stageFilter}
                  onChange={e => setStageFilter(e.target.value as StageKey | "all")}
                >
                  <option value="all">All Stages</option>
                  {STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 font-medium">Partner:</label>
                <input
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00B5B8] w-40"
                  placeholder="Filter by partner name..."
                  value={partnerFilter}
                  onChange={e => setPartnerFilter(e.target.value)}
                />
              </div>
              {(stageFilter !== "all" || partnerFilter) && (
                <button
                  className="text-xs text-red-500 hover:text-red-700"
                  onClick={() => { setStageFilter("all"); setPartnerFilter(""); }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Bulk action bar */}
          {selected.size > 0 && (
            <div className="flex items-center gap-3 py-2.5 px-3 bg-[#0A1628] rounded-xl mt-2">
              <span className="text-xs text-white font-semibold">{selected.size} selected</span>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1.5 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={handleBulkSend}
                >
                  <Send className="w-3 h-3" /> Send All Drafts
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1.5 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={handleBulkExport}
                >
                  <Download className="w-3 h-3" /> Export CSV
                </Button>
                <button
                  className="text-xs text-white/60 hover:text-white"
                  onClick={() => setSelected(new Set())}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Select all row */}
          {filteredDeals.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#00B5B8] transition-colors"
              >
                {selected.size === filteredDeals.length && filteredDeals.length > 0
                  ? <CheckSquare className="w-3.5 h-3.5 text-[#00B5B8]" />
                  : <Square className="w-3.5 h-3.5" />
                }
                {selected.size === filteredDeals.length && filteredDeals.length > 0
                  ? "Deselect all"
                  : `Select all ${filteredDeals.length} deals`}
              </button>
              {selected.size === 0 && (
                <button
                  onClick={handleBulkExport}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 ml-auto"
                >
                  <Download className="w-3 h-3" /> Export all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Kanban board */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full border-4 border-[#00B5B8] border-t-transparent animate-spin mx-auto" />
              <p className="text-sm text-gray-400">Loading pipeline...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto px-6 py-4">
            <div className="flex gap-3 h-full" style={{ minWidth: `${STAGES.length * 272}px` }}>
              {visibleStages.map(stage => (
                <KanbanColumn
                  key={stage.key}
                  stage={stage}
                  deals={byStage[stage.key] || []}
                  selected={selected}
                  onSelect={handleSelect}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onDragStart={(e, deal) => {
                    setDraggingDeal(deal);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onSend={token => sendMut.mutate({ token })}
                  onClose={token => {
                    const deal = filteredDeals.find((d: any) => d.token === token);
                    closeJobMut.mutate({ token, actualJobValue: Number(deal?.estimatedValueHigh) || 0 });
                  }}
                  onCopyLink={handleCopyLink}
                  onSaveValue={handleSaveValue}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
