import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  FolderOpen, Plus, CheckCircle, Clock, Wrench, Droplets, Wind, Zap,
  Paintbrush, Leaf, Home, Star, DollarSign, Camera, Filter, Search,
  ArrowRight, Calendar, User, ChevronDown, ChevronUp, AlertTriangle,
  Hammer, Loader2, TrendingUp,
} from "lucide-react";
import { Link } from "wouter";

const TRADE_ICONS: Record<string, React.ElementType> = {
  plumbing:    Droplets,
  electrical:  Zap,
  hvac:        Wind,
  painting:    Paintbrush,
  landscaping: Leaf,
  roofing:     Home,
  general:     Wrench,
  flooring:    Hammer,
  repair:      Wrench,
  inspection:  Search,
  improvement: Hammer,
  emergency:   AlertTriangle,
};

const TRADE_COLORS: Record<string, string> = {
  plumbing:    "#3B82F6″,
  electrical:  "#F59E0B",
  hvac:        "#06B6D4″,
  painting:    "#8B5CF6″,
  landscaping: "#10B981″,
  roofing:     "#EF4444″,
  general:     "#D97706″,
  flooring:    "#92400E",
  repair:      "#EF4444″,
  inspection:  "#0284C7″,
  improvement: "#8B5CF6″,
  emergency:   "#DC2626″,
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dotColor: string }> = {
  pending:    { label: "Pending",     color: "#D97706″, bg: "#FEF3C7", dotColor: "#F59E0B" },
  accepted:   { label: "Accepted",    color: "#0284C7″, bg: "#E0F2FE", dotColor: "#38BDF8" },
  in_progress:{ label: "In Progress", color: "#7C3AED", bg: "#EDE9FE", dotColor: "#A78BFA" },
  completed:  { label: "Completed",   color: "#059669″, bg: "#D1FAE5", dotColor: "#34D399" },
  cancelled:  { label: "Cancelled",   color: "#6B7280″, bg: "#F3F4F6", dotColor: "#9CA3AF" },
};

const YEAR_OPTIONS = ["All Years", "2026″, "2025", "2024", "2023"];
const TRADE_FILTER_OPTIONS = [
  { key: "all",         label: "All Trades" },
  { key: "plumbing",    label: "Plumbing" },
  { key: "electrical",  label: "Electrical" },
  { key: "hvac",        label: "HVAC" },
  { key: "painting",    label: "Painting" },
  { key: "landscaping", label: "Landscaping" },
  { key: "roofing",     label: "Roofing" },
  { key: "general",     label: "General" },
];

const STATUS_STEPS = ["Pending", "Accepted", "In Progress", "Completed"];

function StatusTimeline({ status }: { status: string }) {
  const stepIdx = status === "pending" ? 0 : status === "accepted" ? 1 : status === "in_progress" ? 2 : status === "completed" ? 3 : 0;
  return (
    <div className="flex items-center gap-1 mt-3″>
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-1″>
          <div className="flex flex-col items-center flex-1″>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${i <= stepIdx ? "border-teal-400 bg-teal-400" : "border-white/20 bg-transparent"}`}>
              {i <= stepIdx && <CheckCircle className="w-2.5 h-2.5 text-white" />}
            </div>
            <p className={`text-[10px] mt-1 ${i <= stepIdx ? "text-teal-400" : "text-gray-600"}`}>{step}</p>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`h-0.5 flex-1 mb-3 ${i < stepIdx ? "bg-teal-400" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5″>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-3 h-3 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
      ))}
    </div>
  );
}

export default function HomeownerProjects() {
  const { data: deals = [], isLoading } = trpc.homeowner.getMyDeals.useQuery();

  const [yearFilter, setYearFilter] = useState("All Years");
  const [tradeFilter, setTradeFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const allDeals = deals as any[];

  const activeDeals = allDeals.filter(d => d.status !== "completed" && d.status !== "cancelled");
  const completedDeals = allDeals.filter(d => d.status === "completed" || d.status === "cancelled");

  const filterDeal = (d: any) => {
    if (yearFilter !== "All Years") {
      const yr = new Date(d.createdAt).getFullYear().toString();
      if (yr !== yearFilter) return false;
    }
    if (tradeFilter !== "all") {
      const trade = (d.serviceType ?? "").toLowerCase();
      if (!trade.includes(tradeFilter)) return false;
    }
    return true;
  };

  const filteredCompleted = completedDeals.filter(filterDeal);

  const totalSpentThisYear = completedDeals
    .filter(d => new Date(d.createdAt).getFullYear() === new Date().getFullYear())
    .reduce((sum, d) => sum + (parseFloat(d.amount ?? "0″) || 0), 0);

  const avgRating = completedDeals.filter(d => d.rating).length > 0
    ? completedDeals.filter(d => d.rating).reduce((s, d) => s + d.rating, 0) / completedDeals.filter(d => d.rating).length
    : null;

  const tradeIcon = (type: string) => {
    const key = (type ?? "").toLowerCase();
    const found = Object.keys(TRADE_ICONS).find(k => key.includes(k));
    return found ?? "general";
  };

  const requestPhoto = (dealId: string, proName: string) => {
    toast.success(`Photo request sent to ${proName || "the pro"}`);
  };

  if (isLoading) {
    return (
      <HomeownerLayout>
        <div className="flex items-center justify-center h-64″>
          <Loader2 className="w-6 h-6 animate-spin text-teal-400″ />
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6″>

        {/* Header */}
        <div className="flex items-start justify-between gap-3″>
          <div className="flex items-start gap-3″>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center flex-shrink-0 shadow-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">My Projects</h1>
              <p className="text-sm text-gray-400 mt-0.5″>Track active and completed home service jobs</p>
            </div>
          </div>
          <Link href="/trustypro/book">
            <Button className="bg-teal-500 hover:bg-teal-400 text-white gap-1.5 flex-shrink-0″>
              <Plus className="w-4 h-4″ /> New Project
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3″>
          {[
            { label: "Active Jobs",    value: activeDeals.length,      icon: Clock,      color: "#A78BFA" },
            { label: "Completed",      value: completedDeals.length,   icon: CheckCircle,color: "#34D399″ },
            { label: "Spent in 2026″,  value: `$${totalSpentThisYear.toLocaleString()}`, icon: TrendingUp, color: "#38BDF8" },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2″ style={{ background: `${s.color}20` }}>
                <s.icon className="w-4 h-4″ style={{ color: s.color }} />
              </div>
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-400″>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Active projects */}
        {activeDeals.length > 0 && (
          <div className="space-y-3″>
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Active Projects</h2>
            {activeDeals.map(deal => {
              const iconKey = tradeIcon(deal.serviceType ?? "");
              const Icon = TRADE_ICONS[iconKey] ?? Wrench;
              const iconColor = TRADE_COLORS[iconKey] ?? "#6B7280″;
              const statusCfg = STATUS_CONFIG[deal.status] ?? STATUS_CONFIG.pending;
              const isExpanded = expandedId === `active-${deal.id}`;

              return (
                <div key={deal.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <button
                    className="w-full text-left p-4 flex items-start gap-3 hover:bg-white/5 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : `active-${deal.id}`)}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0″ style={{ background: `${iconColor}20`, border: `1px solid ${iconColor}30` }}>
                      <Icon className="w-5 h-5″ style={{ color: iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0″>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-white">{deal.serviceType ?? "Home Service"}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${statusCfg.color}20`, color: statusCfg.color, border: `1px solid ${statusCfg.color}30` }}>
                          {statusCfg.label}
                        </span>
                      </div>
                      {deal.proName && (
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1″>
                          <User className="w-3 h-3″ /> {deal.proName}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1″>
                        <Calendar className="w-3 h-3″ /> {new Date(deal.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500 mt-1″ /> : <ChevronDown className="w-4 h-4 text-gray-500 mt-1" />}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3″>
                      <StatusTimeline status={deal.status} />
                      {deal.description && (
                        <p className="text-sm text-gray-400 leading-relaxed">{deal.description}</p>
                      )}
                      <div className="flex gap-2″>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs gap-1.5 border-white/20 text-gray-300 hover:bg-white/10″
                          onClick={() => requestPhoto(deal.id, deal.proName)}
                        >
                          <Camera className="w-3.5 h-3.5″ /> Request Photo
                        </Button>
                        <Link href={`/my-home/projects/${deal.id}`}>
                          <Button size="sm" className="text-xs gap-1.5 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/30″>
                            View Details <ArrowRight className="w-3.5 h-3.5″ />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Completed projects — filter controls */}
        <div className="space-y-4″>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Completed Projects</h2>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${showFilters ? "bg-purple-500/20 border-purple-500/30 text-purple-300" : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"}`}
            >
              <Filter className="w-3.5 h-3.5″ /> Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5″>Year</label>
                <div className="flex flex-wrap gap-1.5″>
                  {YEAR_OPTIONS.map(y => (
                    <button
                      key={y}
                      onClick={() => setYearFilter(y)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${yearFilter === y ? "bg-teal-500/20 border-teal-500/40 text-teal-300" : "bg-white/5 border-white/10 text-gray-400"}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5″>Trade Type</label>
                <div className="flex flex-wrap gap-1.5″>
                  {TRADE_FILTER_OPTIONS.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setTradeFilter(t.key)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${tradeFilter === t.key ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "bg-white/5 border-white/10 text-gray-400"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filteredCompleted.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <FolderOpen className="w-10 h-10 text-gray-600 mx-auto mb-3″ />
              <p className="text-gray-400 font-medium">No completed projects yet</p>
              <p className="text-sm text-gray-500 mt-1″>Start a project to build your home service history</p>
              <Link href="/trustypro/book">
                <Button className="mt-4 bg-teal-500 hover:bg-teal-400 text-white gap-1.5″ size="sm">
                  <Plus className="w-4 h-4″ /> Start a Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3″>
              {filteredCompleted.map(deal => {
                const iconKey = tradeIcon(deal.serviceType ?? "");
                const Icon = TRADE_ICONS[iconKey] ?? Wrench;
                const iconColor = TRADE_COLORS[iconKey] ?? "#6B7280″;
                const isExpanded = expandedId === `done-${deal.id}`;

                return (
                  <div key={deal.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button
                      className="w-full text-left p-4 flex items-start gap-3 hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : `done-${deal.id}`)}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0″ style={{ background: `${iconColor}20`, border: `1px solid ${iconColor}30` }}>
                        <Icon className="w-5 h-5″ style={{ color: iconColor }} />
                      </div>
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-white">{deal.serviceType ?? "Home Service"}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30″>
                            Completed
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          {deal.proName && (
                            <span className="text-xs text-gray-400 flex items-center gap-1″>
                              <User className="w-3 h-3″ /> {deal.proName}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 flex items-center gap-1″>
                            <Calendar className="w-3 h-3″ /> {new Date(deal.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          {deal.amount && (
                            <span className="text-xs text-gray-400 flex items-center gap-1″>
                              <DollarSign className="w-3 h-3″ /> ${parseFloat(deal.amount).toLocaleString()}
                            </span>
                          )}
                        </div>
                        {deal.rating && <div className="mt-1″><StarRating rating={deal.rating} /></div>}
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500 mt-1″ /> : <ChevronDown className="w-4 h-4 text-gray-500 mt-1" />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3″>
                        {deal.description && (
                          <p className="text-sm text-gray-400 leading-relaxed">{deal.description}</p>
                        )}
                        {deal.reviewText && (
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3″>
                            <p className="text-xs font-semibold text-amber-400 mb-1″>Your Review</p>
                            <p className="text-sm text-gray-300 italic">"{deal.reviewText}"</p>
                          </div>
                        )}
                        <div className="flex gap-2″>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs gap-1.5 border-white/20 text-gray-300 hover:bg-white/10″
                            onClick={() => requestPhoto(deal.id, deal.proName)}
                          >
                            <Camera className="w-3.5 h-3.5″ /> Request Photo
                          </Button>
                          {deal.proId && (
                            <Link href={`/partner/${deal.proId}`}>
                              <Button size="sm" className="text-xs gap-1.5 bg-white/10 text-gray-300 hover:bg-white/20″>
                                <User className="w-3.5 h-3.5″ /> View Pro
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Start new project CTA */}
        <div className="border border-teal-500/20 rounded-xl p-5 bg-teal-500/5 flex items-center justify-between gap-4″>
          <div>
            <p className="text-sm font-semibold text-white">Ready to start a new project?</p>
            <p className="text-xs text-gray-400 mt-0.5″>Book a vetted pro for any home service — fast, simple, guaranteed.</p>
          </div>
          <Link href="/trustypro/book">
            <Button className="bg-teal-500 hover:bg-teal-400 text-white gap-1.5 flex-shrink-0″>
              Book a Pro <ArrowRight className="w-4 h-4″ />
            </Button>
          </Link>
        </div>

      </div>
    </HomeownerLayout>
  );
}
