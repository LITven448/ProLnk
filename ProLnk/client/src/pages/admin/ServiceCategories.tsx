/**
 * Service Categories Manager — /admin/categories
 * Displays all 53+ ProLnk service categories with AI detection cues,
 * commission rates, avg job values, and cross-sell relationships.
 */
import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, DollarSign, Zap, TrendingUp, ChevronDown, ChevronUp,
  Eye, Link2, Brain, Filter,
} from "lucide-react";
import { SERVICE_CATEGORIES, SERVICE_GROUPS } from "../../../../shared/serviceCategories";

// ─── Design tokens ────────────────────────────────────────────────────────────
import { T } from "@/components/AdminLayout";

// ─── Group color map ──────────────────────────────────────────────────────────
const GROUP_COLORS: Record<string, string> = {
  "Lawn & Outdoor":           "#22C55E",
  "Roofing & Exterior":       "#F97316",
  "HVAC, Plumbing & Electrical": "#3B82F6",
  "Interior Remodeling":      "#8B5CF6",
  "Cleaning & Maintenance":   "#06B6D4",
  "Pest & Wildlife":          "#EF4444",
  "Pool & Water":             "#0EA5E9",
  "Security & Smart Home":    "#6366F1",
  "Animals & Pets":           "#F59E0B",
  "Specialty Services":       "#EC4899",
};

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, expanded, onToggle }: {
  cat: typeof SERVICE_CATEGORIES[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const groupColor = GROUP_COLORS[cat.group] ?? T.accent;
  const platformPct = Math.round(cat.platformFeeRate * 100);
  const referralPct = Math.round(cat.referralCommissionRate * 100);

  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden transition-all"
      style={{ borderColor: T.border }}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        {/* Color dot */}
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: groupColor }} />

        {/* Name + group */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: T.text }}>{cat.name}</p>
          <p className="text-xs truncate" style={{ color: T.muted }}>{cat.group}</p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: T.text }}>${cat.avgJobValue.toLocaleString()}</p>
            <p className="text-[10px]" style={{ color: T.muted }}>avg job</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: "#10B981" }}>{referralPct}%</p>
            <p className="text-[10px]" style={{ color: T.muted }}>referral</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: T.accent }}>{platformPct}%</p>
            <p className="text-[10px]" style={{ color: T.muted }}>platform</p>
          </div>
        </div>

        {/* Expand toggle */}
        <div className="flex-shrink-0 ml-2">
          {expanded
            ? <ChevronUp className="w-4 h-4" style={{ color: T.muted }} />
            : <ChevronDown className="w-4 h-4" style={{ color: T.muted }} />
          }
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 border-t" style={{ borderColor: T.border }}>
          {/* Description */}
          <p className="text-xs mt-3 mb-3 leading-relaxed" style={{ color: T.muted }}>{cat.description}</p>

          {/* Mobile stats */}
          <div className="flex items-center gap-4 mb-3 sm:hidden">
            <div>
              <p className="text-xs font-bold" style={{ color: T.text }}>${cat.avgJobValue.toLocaleString()}</p>
              <p className="text-[10px]" style={{ color: T.muted }}>avg job value</p>
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: "#10B981" }}>{referralPct}%</p>
              <p className="text-[10px]" style={{ color: T.muted }}>referral commission</p>
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: T.accent }}>{platformPct}%</p>
              <p className="text-[10px]" style={{ color: T.muted }}>platform fee</p>
            </div>
          </div>

          {/* AI Detection Cues */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Brain className="w-3.5 h-3.5" style={{ color: T.accent }} />
              <p className="text-xs font-bold" style={{ color: T.text }}>AI Detection Cues</p>
            </div>
            <ul className="space-y-1">
              {cat.aiDetectionCues.map((cue, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: groupColor }} />
                  <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{cue}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Cross-sell from */}
          {cat.crossSellFrom.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Link2 className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                <p className="text-xs font-bold" style={{ color: T.text }}>Cross-Sell From</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.crossSellFrom.map(id => {
                  const related = SERVICE_CATEGORIES.find(c => c.id === id);
                  return (
                    <span
                      key={id}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: T.accentBg, color: T.accent }}
                    >
                      {related?.name ?? id}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServiceCategories() {
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "value" | "commission">("name");

  const groups = useMemo(() => {
    const g = new Set(SERVICE_CATEGORIES.map(c => c.group));
    return ["all", ...Array.from(g).sort()];
  }, []);

  const filtered = useMemo(() => {
    let cats = [...SERVICE_CATEGORIES];
    if (groupFilter !== "all") cats = cats.filter(c => c.group === groupFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      cats = cats.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.aiDetectionCues.some(cue => cue.toLowerCase().includes(q))
      );
    }
    if (sortBy === "value") cats.sort((a, b) => b.avgJobValue - a.avgJobValue);
    else if (sortBy === "commission") cats.sort((a, b) => b.referralCommissionRate - a.referralCommissionRate);
    else cats.sort((a, b) => a.name.localeCompare(b.name));
    return cats;
  }, [search, groupFilter, sortBy]);

  // Summary stats
  const totalRevenuePotential = useMemo(
    () => SERVICE_CATEGORIES.reduce((sum, c) => sum + c.avgJobValue, 0),
    []
  );
  const avgReferralRate = useMemo(
    () => SERVICE_CATEGORIES.reduce((sum, c) => sum + c.referralCommissionRate, 0) / SERVICE_CATEGORIES.length,
    []
  );

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-black mb-1" style={{ color: T.text }}>Service Categories</h1>
          <p className="text-sm" style={{ color: T.muted }}>
            {SERVICE_CATEGORIES.length} categories across {Object.keys(GROUP_COLORS).length} groups — AI detection cues, commission rates, and cross-sell relationships
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Categories",   value: SERVICE_CATEGORIES.length.toString(), icon: Filter,    color: T.accent },
            { label: "Service Groups",      value: (groups.length - 1).toString(),       icon: TrendingUp, color: "#8B5CF6" },
            { label: "Avg Referral Rate",   value: `${(avgReferralRate * 100).toFixed(1)}%`, icon: DollarSign, color: "#10B981" },
            { label: "Avg Job Value",        value: `$${Math.round(totalRevenuePotential / SERVICE_CATEGORIES.length).toLocaleString()}`, icon: Zap, color: "#F59E0B" },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-4 border" style={{ borderColor: T.border }}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                  <p className="text-xs" style={{ color: T.muted }}>{s.label}</p>
                </div>
                <p className="text-xl font-black" style={{ color: T.text }}>{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
            <Input
              placeholder="Search categories, AI cues, descriptions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
          <Select value={groupFilter} onValueChange={setGroupFilter}>
            <SelectTrigger className="w-full sm:w-52 text-sm">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              {groups.map(g => (
                <SelectItem key={g} value={g}>{g === "all" ? "All Groups" : g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={v => setSortBy(v as "name" | "value" | "commission")}>
            <SelectTrigger className="w-full sm:w-44 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort: Name</SelectItem>
              <SelectItem value="value">Sort: Job Value</SelectItem>
              <SelectItem value="commission">Sort: Commission</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-xs mb-3" style={{ color: T.muted }}>
          Showing {filtered.length} of {SERVICE_CATEGORIES.length} categories
          {search && ` matching "${search}"`}
        </p>

        {/* Category list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Eye className="w-8 h-8 mx-auto mb-3" style={{ color: T.dim }} />
              <p className="text-sm font-medium" style={{ color: T.muted }}>No categories match your search</p>
            </div>
          ) : (
            filtered.map(cat => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                expanded={expandedId === cat.id}
                onToggle={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
              />
            ))
          )}
        </div>

        {/* Group legend */}
        <div className="mt-8 bg-white rounded-2xl p-5 border" style={{ borderColor: T.border }}>
          <p className="text-xs font-bold mb-3" style={{ color: T.text }}>Group Legend</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(GROUP_COLORS).map(([group, color]) => (
              <button
                key={group}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
                style={{
                  borderColor: groupFilter === group ? color : T.border,
                  color: groupFilter === group ? color : T.muted,
                  backgroundColor: groupFilter === group ? `${color}10` : "transparent",
                }}
                onClick={() => setGroupFilter(groupFilter === group ? "all" : group)}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
