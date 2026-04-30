/**
 * Wave 26 — Homeowner Property Timeline
 * Job history, AI scan history, before/after gallery, maintenance log entries.
 */
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import {
  Clock, Wrench, Camera, Zap, Star, CheckCircle, AlertTriangle,
  ChevronDown, ChevronUp, Home, Calendar, DollarSign, FileText,
  Sparkles, Shield, Activity, Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FilterType = "all" | "job" | "scan" | "review" | "maintenance";

const FILTER_OPTIONS: { key: FilterType; label: string; icon: React.ElementType; color: string }[] = [
  { key: "all",         label: "All Events",    icon: Activity,     color: "#6B7280" },
  { key: "job",         label: "Jobs",          icon: Wrench,       color: "#0284C7" },
  { key: "scan",        label: "AI Scans",      icon: Zap,          color: "#8B5CF6" },
  { key: "review",      label: "Reviews",       icon: Star,         color: "#F59E0B" },
  { key: "maintenance", label: "Maintenance",   icon: Shield,       color: "#10B981" },
];

function formatDate(d: Date | string | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function TimelineEntry({
  type, date, title, subtitle, detail, icon: Icon, color, badge, expanded, onToggle, photos,
}: {
  type: string; date: string; title: string; subtitle?: string; detail?: string;
  icon: React.ElementType; color: string; badge?: string; expanded?: boolean;
  onToggle?: () => void; photos?: string[];
}) {
  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: `${color}18`, border: `2px solid ${color}40` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <div className="w-0.5 flex-1 mt-1" style={{ background: "#E5E7EB", minHeight: 24 }} />
      </div>
      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div
            className={`px-4 py-3 flex items-start justify-between gap-3 ${onToggle ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""}`}
            onClick={onToggle}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>{type}</span>
                <span className="text-xs text-gray-400">{date}</span>
                {badge && (
                  <Badge className="text-xs px-1.5 py-0" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                    {badge}
                  </Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-tight">{title}</p>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
            {onToggle && (
              <div className="flex-shrink-0 mt-0.5">
                {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            )}
          </div>
          {expanded && (
            <div className="px-4 pb-4 border-t border-gray-50">
              {detail && <p className="text-sm text-gray-600 mt-3 leading-relaxed">{detail}</p>}
              {photos && photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {photos.slice(0, 6).map((url, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
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

export default function HomeownerTimeline() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: deals = [] }    = trpc.homeowner.getMyDeals.useQuery();
  const { data: reviews = [] }  = trpc.homeowner.getMyReviews.useQuery();
  const { data: profile }       = trpc.homeowner.getProfile.useQuery();
  const { data: properties = [] } = trpc.homeowner.getMyProperties.useQuery();

  // Build unified timeline events
  type TimelineEvent = {
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
  };

  const events: TimelineEvent[] = [
    // Jobs from deals
    ...(deals as any[]).map((d: any) => ({
      id: `deal-${d.id}`,
      type: "job" as FilterType,
      date: new Date(d.createdAt),
      title: d.serviceType ?? "Service",
      subtitle: d.proName ? `by ${d.proName}` : undefined,
      detail: d.description ?? undefined,
      icon: Wrench,
      color: "#0284C7",
      badge: d.status === "completed" ? "Completed" : d.status === "pending" ? "Pending" : d.status,
    })),
    // Reviews
    ...(reviews as any[]).map((r: any) => ({
      id: `review-${r.id}`,
      type: "review" as FilterType,
      date: new Date(r.createdAt),
      title: `${r.rating}/5 stars — ${r.proName ?? "Pro"}`,
      subtitle: r.proTrade ?? undefined,
      detail: r.reviewText ?? undefined,
      icon: Star,
      color: "#F59E0B",
      badge: `${r.rating}★`,
    })),
    // Profile created as first event
    ...(profile ? [{
      id: "profile-created",
      type: "maintenance" as FilterType,
      date: new Date((profile as any).createdAt ?? Date.now()),
      title: "Home Profile Created",
      subtitle: (profile as any).displayName ? `Welcome, ${(profile as any).displayName}!` : "TrustyPro account activated",
      icon: Home,
      color: "#10B981",
      badge: "Milestone",
    }] : []),
    // Properties added
    ...(properties as any[]).map((p: any) => ({
      id: `property-${p.id}`,
      type: "maintenance" as FilterType,
      date: new Date(p.createdAt ?? Date.now()),
      title: `Property Added: ${p.address ?? "Unknown address"}`,
      subtitle: p.propertyType ? `${p.propertyType.replace("_", " ")} · ${p.sqft ? `${p.sqft.toLocaleString()} sqft` : ""}` : undefined,
      icon: Shield,
      color: "#10B981",
    })),
  ];

  // Sort by date descending
  const sorted = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());
  const filtered = filter === "all" ? sorted : sorted.filter(e => e.type === filter);

  const toggleExpand = (id: string) => setExpandedId(prev => prev === id ? null : id);

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #8B5CF6, #6D28D9)" }}>
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-heading text-gray-900">Property Timeline</h1>
            <p className="text-sm text-gray-500 mt-1">Your complete job history, AI scans, and maintenance record in one place.</p>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Jobs Completed", value: (deals as any[]).filter((d: any) => d.status === "completed").length, icon: CheckCircle, color: "#10B981" },
            { label: "Reviews Given", value: (reviews as any[]).length, icon: Star, color: "#F59E0B" },
            { label: "Properties", value: (properties as any[]).length, icon: Home, color: "#0284C7" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: `${s.color}18` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all border"
              style={{
                background: filter === opt.key ? `${opt.color}18` : "#fff",
                borderColor: filter === opt.key ? `${opt.color}50` : "#E5E7EB",
                color: filter === opt.key ? opt.color : "#6B7280",
              }}
            >
              <opt.icon className="w-3.5 h-3.5" />
              {opt.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No events yet</p>
            <p className="text-sm text-gray-400 mt-1">
              {filter === "all"
                ? "Start a project or upload photos to build your timeline."
                : `No ${filter} events yet.`}
            </p>
            {filter === "job" && (
              <Button className="mt-4" size="sm" onClick={() => window.location.href = "/my-home/projects"}>
                Start a Project
              </Button>
            )}
          </div>
        ) : (
          <div>
            {filtered.map(event => (
              <TimelineEntry
                key={event.id}
                type={FILTER_OPTIONS.find(f => f.key === event.type)?.label ?? event.type}
                date={formatDate(event.date)}
                title={event.title}
                subtitle={event.subtitle}
                detail={event.detail}
                icon={event.icon}
                color={event.color}
                badge={event.badge}
                photos={event.photos}
                expanded={expandedId === event.id}
                onToggle={event.detail || event.photos ? () => toggleExpand(event.id) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
