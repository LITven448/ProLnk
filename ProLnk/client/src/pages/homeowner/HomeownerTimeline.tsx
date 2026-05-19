import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import {
  Clock, Wrench, Camera, Zap, Star, CheckCircle, AlertTriangle,
  ChevronDown, ChevronUp, Home, Calendar, DollarSign, FileText,
  Sparkles, Shield, Activity, Filter, Plus, X, Download, Pencil,
  Bell, BookOpen, User, Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type FilterType = "all" | "job" | "scan" | "review" | "maintenance" | "document";

const EVENT_CONFIG: Record<FilterType, { label: string; icon: React.ElementType; color: string }> = {
  all:         { label: "All Events",   icon: Activity,  color: "#6B7280″ },
  job:         { label: "Jobs",         icon: Wrench,    color: "#38BDF8″ },
  scan:        { label: "AI Scans",     icon: Sparkles,  color: "#A78BFA" },
  review:      { label: "Reviews",      icon: Star,      color: "#FBBF24″ },
  maintenance: { label: "Maintenance",  icon: Shield,    color: "#34D399″ },
  document:    { label: "Documents",    icon: FileText,  color: "#FB923C" },
};

const FILTER_OPTIONS = (Object.keys(EVENT_CONFIG) as FilterType[]);

function formatDate(d: Date | string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateInput(d: Date) {
  return d.toISOString().split("T")[0];
}

interface ManualEntry {
  id: string;
  type: FilterType;
  date: string;
  title: string;
  detail: string;
  isManual: true;
}

interface TimelineEvent {
  id: string;
  type: FilterType;
  date: Date;
  title: string;
  subtitle?: string;
  detail?: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
  photos?: string[];
  isManual?: boolean;
}

function TimelineEntry({
  event,
  expanded,
  onToggle,
}: {
  event: TimelineEvent;
  expanded: boolean;
  onToggle: () => void;
}) {
  const cfg = EVENT_CONFIG[event.type] ?? EVENT_CONFIG.job;
  return (
    <div className="flex gap-3 md:gap-4″>
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0″>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
          style={{ background: `${event.color}18`, border: `2px solid ${event.color}50` }}
        >
          <event.icon className="w-4 h-4″ style={{ color: event.color }} />
        </div>
        <div className="w-0.5 flex-1 mt-1″ style={{ background: "#ffffff10", minHeight: 24 }} />
      </div>

      {/* Card */}
      <div className="flex-1 pb-5 min-w-0″>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <button
            className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-white/5 transition-colors"
            onClick={onToggle}
          >
            <div className="flex-1 min-w-0″>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: event.color }}>
                  {cfg.label}
                </span>
                <span className="text-xs text-gray-500″>{formatDate(event.date)}</span>
                {event.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-medium border"
                    style={{ background: `${event.color}18`, color: event.color, borderColor: `${event.color}30` }}
                  >
                    {event.badge}
                  </span>
                )}
                {event.isManual && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-white/10 text-gray-400 border border-white/10″>
                    Manual
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-white mt-0.5 leading-tight">{event.title}</p>
              {event.subtitle && <p className="text-xs text-gray-400 mt-0.5″>{event.subtitle}</p>}
            </div>
            <div className="flex-shrink-0 mt-0.5″>
              {expanded ? <ChevronUp className="w-4 h-4 text-gray-500″ /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
            </div>
          </button>
          {expanded && (event.detail || (event.photos && event.photos.length > 0)) && (
            <div className="px-4 pb-4 border-t border-white/5 pt-3″>
              {event.detail && <p className="text-sm text-gray-400 leading-relaxed">{event.detail}</p>}
              {event.photos && event.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3″>
                  {event.photos.slice(0, 6).map((url, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white/10″>
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ENTRY_TYPES: { key: FilterType; label: string }[] = [
  { key: "job",         label: "Job / Service" },
  { key: "maintenance", label: "Maintenance" },
  { key: "scan",        label: "AI Scan" },
  { key: "document",    label: "Document" },
  { key: "review",      label: "Review" },
];

export default function HomeownerTimeline() {
  const [filter, setFilter]           = useState<FilterType>("all");
  const [expandedId, setExpandedId]   = useState<string | null>(null);
  const [startDate, setStartDate]     = useState("");
  const [endDate, setEndDate]         = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([]);

  const [manualForm, setManualForm] = useState<{ type: FilterType; date: string; title: string; detail: string }>({
    type: "maintenance",
    date: formatDateInput(new Date()),
    title: "",
    detail: "",
  });

  const { data: deals = [] }      = trpc.homeowner.getMyDeals.useQuery();
  const { data: reviews = [] }    = trpc.homeowner.getMyReviews.useQuery();
  const { data: profile }         = trpc.homeowner.getProfile.useQuery();
  const { data: properties = [] } = trpc.homeowner.getMyProperties.useQuery();

  const allDeals = deals as any[];
  const allReviews = reviews as any[];
  const allProperties = properties as any[];

  const apiEvents: TimelineEvent[] = [
    ...allDeals.map((d: any) => ({
      id: `deal-${d.id}`,
      type: "job" as FilterType,
      date: new Date(d.createdAt),
      title: d.serviceType ?? "Service",
      subtitle: d.proName ? `by ${d.proName}` : undefined,
      detail: d.description ?? undefined,
      icon: Wrench,
      color: "#38BDF8″,
      badge: d.status === "completed" ? "Completed" : d.status === "pending" ? "Pending" : d.status,
    })),
    ...allReviews.map((r: any) => ({
      id: `review-${r.id}`,
      type: "review" as FilterType,
      date: new Date(r.createdAt),
      title: `${r.rating}/5 stars — ${r.proName ?? "Pro"}`,
      subtitle: r.proTrade ?? undefined,
      detail: r.reviewText ?? undefined,
      icon: Star,
      color: "#FBBF24″,
      badge: `${r.rating}★`,
    })),
    ...(profile ? [{
      id: "profile-created",
      type: "maintenance" as FilterType,
      date: new Date((profile as any).createdAt ?? Date.now()),
      title: "Home Profile Created",
      subtitle: (profile as any).displayName ? `Welcome, ${(profile as any).displayName}!` : "TrustyPro account activated",
      icon: Home,
      color: "#34D399″,
      badge: "Milestone",
    }] : []),
    ...allProperties.map((p: any) => ({
      id: `property-${p.id}`,
      type: "maintenance" as FilterType,
      date: new Date(p.createdAt ?? Date.now()),
      title: `Property Added: ${p.address ?? "Unknown address"}`,
      subtitle: p.propertyType ? `${p.propertyType.replace("_", " ")} · ${p.sqft ? `${p.sqft.toLocaleString()} sqft` : ""}` : undefined,
      icon: Shield,
      color: "#34D399″,
    })),
    ...manualEntries.map(e => ({
      id: e.id,
      type: e.type,
      date: new Date(e.date),
      title: e.title,
      detail: e.detail || undefined,
      icon: EVENT_CONFIG[e.type]?.icon ?? Activity,
      color: EVENT_CONFIG[e.type]?.color ?? "#6B7280″,
      isManual: true as const,
    })),
  ];

  const sorted = [...allEvents(apiEvents)].sort((a, b) => b.date.getTime() - a.date.getTime());

  function allEvents(events: TimelineEvent[]) {
    return events;
  }

  const filtered = sorted.filter(e => {
    if (filter !== "all" && e.type !== filter) return false;
    if (startDate && e.date < new Date(startDate)) return false;
    if (endDate && e.date > new Date(endDate + "T23:59:59″)) return false;
    return true;
  });

  const handleAddManual = () => {
    if (!manualForm.title.trim()) { toast.error("Please enter a title"); return; }
    const entry: ManualEntry = {
      id: `manual-${Date.now()}`,
      type: manualForm.type,
      date: manualForm.date,
      title: manualForm.title.trim(),
      detail: manualForm.detail.trim(),
      isManual: true,
    };
    setManualEntries(prev => [...prev, entry]);
    setManualForm({ type: "maintenance", date: formatDateInput(new Date()), title: "", detail: "" });
    setShowAddModal(false);
    toast.success("Entry added to your timeline");
  };

  const exportPdf = () => {
    const lines: string[] = [];
    lines.push("HOME SERVICE TIMELINE");
    lines.push("=====================");
    lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push(`Events shown: ${filtered.length}`);
    lines.push("");
    filtered.forEach(e => {
      lines.push(`[${EVENT_CONFIG[e.type]?.label ?? e.type}] ${formatDate(e.date)}`);
      lines.push(`  ${e.title}`);
      if (e.subtitle) lines.push(`  ${e.subtitle}`);
      if (e.detail) lines.push(`  ${e.detail}`);
      if (e.isManual) lines.push("  (Manual entry)");
      lines.push("");
    });
    lines.push("---------------------");
    lines.push("Powered by TrustyPro · ProLnk Partner Network");
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Home-Timeline-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Timeline exported");
  };

  const statsMap = {
    jobs:         allDeals.filter(d => d.status === "completed").length,
    reviews:      allReviews.length,
    properties:   allProperties.length,
    manualEntries: manualEntries.length,
  };

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8″>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-6″>
          <div className="flex items-start gap-3″>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Property Timeline</h1>
              <p className="text-sm text-gray-400 mt-0.5″>Your complete home service history in one place</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0″>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-gray-300 border-white/20 hover:bg-white/10 text-xs"
              onClick={exportPdf}
            >
              <Download className="w-3.5 h-3.5″ /> Export
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-purple-500 hover:bg-purple-400 text-white text-xs"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-3.5 h-3.5″ /> Add Entry
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6″>
          {[
            { label: "Jobs Done",     value: statsMap.jobs,          color: "#38BDF8″ },
            { label: "Reviews",       value: statsMap.reviews,       color: "#FBBF24″ },
            { label: "Properties",    value: statsMap.properties,    color: "#34D399″ },
            { label: "Manual",        value: statsMap.manualEntries, color: "#A78BFA" },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500″>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs + date range */}
        <div className="space-y-3 mb-6″>
          <div className="flex items-center gap-2″>
            <div className="flex gap-1.5 overflow-x-auto pb-1 flex-1 scrollbar-hide">
              {FILTER_OPTIONS.map(key => {
                const cfg = EVENT_CONFIG[key];
                const isActive = filter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all border"
                    style={{
                      background: isActive ? `${cfg.color}20` : "rgba(255,255,255,0.05)",
                      borderColor: isActive ? `${cfg.color}50` : "rgba(255,255,255,0.1)",
                      color: isActive ? cfg.color : "#9CA3AF",
                    }}
                  >
                    <cfg.icon className="w-3 h-3″ />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all flex-shrink-0 ${showFilters ? "bg-purple-500/20 border-purple-500/30 text-purple-300" : "bg-white/5 border-white/10 text-gray-400"}`}
            >
              <Filter className="w-3.5 h-3.5″ /> Dates
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1″>From</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="bg-white/10 border-white/20 text-white focus:border-purple-400 text-sm h-8″
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1″>To</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="bg-white/10 border-white/20 text-white focus:border-purple-400 text-sm h-8″
                />
              </div>
              {(startDate || endDate) && (
                <button
                  className="col-span-2 text-xs text-gray-400 hover:text-gray-300 underline text-center"
                  onClick={() => { setStartDate(""); setEndDate(""); }}
                >
                  Clear date range
                </button>
              )}
            </div>
          )}
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-xl">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4″ />
            <p className="text-gray-400 font-medium">No events found</p>
            <p className="text-sm text-gray-500 mt-1″>
              {filter === "all" && !startDate && !endDate
                ? "Start a project or add a manual entry to build your timeline."
                : "Try adjusting your filters."}
            </p>
            <Button
              className="mt-4 bg-purple-500 hover:bg-purple-400 text-white gap-1.5″
              size="sm"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4″ /> Add Manual Entry
            </Button>
          </div>
        ) : (
          <div>
            {filtered.map(event => (
              <TimelineEntry
                key={event.id}
                event={event}
                expanded={expandedId === event.id}
                onToggle={() => setExpandedId(prev => prev === event.id ? null : event.id)}
              />
            ))}
            {/* End of timeline marker */}
            <div className="flex gap-3 md:gap-4 opacity-40″>
              <div className="flex flex-col items-center flex-shrink-0″>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10″>
                  <Home className="w-4 h-4 text-gray-500″ />
                </div>
              </div>
              <div className="flex-1 pb-4 flex items-center">
                <p className="text-xs text-gray-600 italic">Beginning of your home timeline</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Manual Entry modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4″>
          <div className="bg-[#0D1E38] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10″>
              <h3 className="text-base font-bold text-white flex items-center gap-2″>
                <Pencil className="w-4 h-4 text-purple-400″ /> Add Manual Entry
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-white/10 transition-colors">
                <X className="w-4 h-4″ />
              </button>
            </div>
            <div className="p-5 space-y-4″>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5″>Event Type</label>
                <div className="grid grid-cols-3 gap-2″>
                  {ENTRY_TYPES.map(t => {
                    const cfg = EVENT_CONFIG[t.key];
                    const isActive = manualForm.type === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setManualForm(f => ({ ...f, type: t.key }))}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-medium transition-all"
                        style={{
                          background: isActive ? `${cfg.color}20` : "rgba(255,255,255,0.05)",
                          borderColor: isActive ? `${cfg.color}50` : "rgba(255,255,255,0.1)",
                          color: isActive ? cfg.color : "#9CA3AF",
                        }}
                      >
                        <cfg.icon className="w-4 h-4″ />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1″>Date</label>
                <Input
                  type="date"
                  value={manualForm.date}
                  onChange={e => setManualForm(f => ({ ...f, date: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white focus:border-purple-400″
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1″>Title</label>
                <Input
                  placeholder="e.g., Installed new water heater myself"
                  value={manualForm.title}
                  onChange={e => setManualForm(f => ({ ...f, title: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-600 focus:border-purple-400″
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1″>Notes (optional)</label>
                <Textarea
                  rows={2}
                  placeholder="Any additional details, cost, or notes..."
                  value={manualForm.detail}
                  onChange={e => setManualForm(f => ({ ...f, detail: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-600 focus:border-purple-400 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-1″>
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-gray-300 hover:bg-white/10″
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-400 text-white"
                  onClick={handleAddManual}
                >
                  Add to Timeline
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </HomeownerLayout>
  );
}
