import React from 'react';
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Briefcase, DollarSign, Zap, Clock, CheckCircle, Circle,
  AlertCircle, ChevronRight, PlusCircle, LayoutDashboard, MapPin, Phone,
  User, ArrowUpRight, Star, Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ─── Types ────────────────────────────────────────────────────────────────────

type Lead = {
  id: string;
  address: string;
  serviceType: string;
  status: "new" | "in_progress" | "quoted" | "won" | "lost";
  estimatedValue: number;
  assignedAt: string;
  homeownerName?: string;
  phone?: string;
};

type QuickStat = {
  label: string;
  value: string | number;
  sub?: string;
  trend?: number;
  icon: React.ReactNode;
  bg: string;
};

// ─── Demo Data ────────────────────────────────────────────────────────────────

const DEMO_LEADS: Lead[] = [
  {
    id: "L001″,
    address: "412 Maple St, Austin TX 78701″,
    serviceType: "HVAC Replacement",
    status: "new",
    estimatedValue: 4800,
    assignedAt: "2 hours ago",
    homeownerName: "Sarah M.",
    phone: "(512) 555-0142″,
  },
  {
    id: "L002″,
    address: "809 Oak Ave, Austin TX 78704″,
    serviceType: "Roof Inspection",
    status: "in_progress",
    estimatedValue: 1200,
    assignedAt: "Yesterday",
    homeownerName: "James T.",
    phone: "(512) 555-0198″,
  },
  {
    id: "L003″,
    address: "203 Pine Rd, Austin TX 78745″,
    serviceType: "Plumbing Repair",
    status: "quoted",
    estimatedValue: 650,
    assignedAt: "2 days ago",
    homeownerName: "Linda K.",
    phone: "(512) 555-0277″,
  },
  {
    id: "L004″,
    address: "1105 Cedar Blvd, Austin TX 78702″,
    serviceType: "Electrical Panel",
    status: "won",
    estimatedValue: 2200,
    assignedAt: "1 week ago",
    homeownerName: "Marcus D.",
    phone: "(512) 555-0355″,
  },
];

const TIER_MAP: Record<string, { label: string; color: string; bg: string }> = {
  charter: { label: "Charter", color: "#F5E642″, bg: "#F5E64222" },
  founding: { label: "Founding", color: "#C0C0C0″, bg: "#C0C0C022" },
  l3: { label: "Level 3″, color: "#CD7F32", bg: "#CD7F3222" },
  l4: { label: "Level 4″, color: "#00B5B8", bg: "#00B5B822" },
};

const STATUS_CONFIG: Record<Lead["status"], { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "New", color: "#3b82f6″, icon: <Zap size={12} /> },
  in_progress: { label: "In Progress", color: "#f59e0b", icon: <Clock size={12} /> },
  quoted: { label: "Quoted", color: "#8b5cf6″, icon: <Layers size={12} /> },
  won: { label: "Won", color: "#10b981″, icon: <CheckCircle size={12} /> },
  lost: { label: "Lost", color: "#ef4444″, icon: <AlertCircle size={12} /> },
};

// ─── Log a Job Modal ──────────────────────────────────────────────────────────

function LogJobModal({ onClose }: { onClose: () => void }) {
  const [serviceType, setServiceType] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4″>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6″>
        {submitted ? (
          <div className="text-center py-8″>
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3″>
              <CheckCircle size={28} className="text-green-600″ />
            </div>
            <p className="text-lg font-bold text-gray-900″>Job Logged!</p>
            <p className="text-sm text-gray-500 mt-1″>Your earnings will update shortly.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5″>
              <h2 className="text-lg font-bold text-gray-900″>Log a Job</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4″>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1″>Service Type</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20″
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                  required
                >
                  <option value="">Select a trade...</option>
                  <option>HVAC</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Roofing</option>
                  <option>Landscaping</option>
                  <option>Painting</option>
                  <option>Flooring</option>
                  <option>General Contractor</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1″>Property Address</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20″
                  placeholder="123 Main St, City, State ZIP"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1″>Job Value ($)</label>
                <input
                  type="number"
                  min="0″
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20″
                  placeholder="e.g. 2500″
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0A1628] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#1a2e4a] transition-colors"
              >
                Submit Job
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Lead Card ────────────────────────────────────────────────────────────────

function LeadCard({ lead }: { lead: Lead }) {
  const status = STATUS_CONFIG[lead.status];
  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2″>
        <div className="flex-1 min-w-0″>
          <p className="text-white text-sm font-semibold truncate">{lead.serviceType}</p>
          <div className="flex items-center gap-1 mt-0.5″>
            <MapPin size={10} className="text-slate-500 flex-shrink-0″ />
            <p className="text-xs text-slate-400 truncate">{lead.address}</p>
          </div>
        </div>
        <span
          className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0″
          style={{ color: status.color, background: status.color + "18″ }}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/50″>
        <div className="flex items-center gap-3″>
          {lead.homeownerName && (
            <div className="flex items-center gap-1″>
              <User size={11} className="text-slate-500″ />
              <span className="text-xs text-slate-400″>{lead.homeownerName}</span>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-1″>
              <Phone size={11} className="text-slate-500″ />
              <span className="text-xs text-slate-400″>{lead.phone}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2″>
          <span className="text-xs font-bold text-green-400″>${lead.estimatedValue.toLocaleString()}</span>
          <span className="text-[10px] text-slate-600″>{lead.assignedAt}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AgentDashboard() {
  const { isAuthenticated } = useAuth();
  const [showLogJob, setShowLogJob] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "new" | "active" | "closed">("all");

  const { data: analyticsData, isLoading } = trpc.partnerAnalytics.getAdvanced.useQuery(
    undefined,
    { enabled: isAuthenticated },
  );

  const { data: commissionData } = trpc.partners.getEarnedCommissions.useQuery(
    undefined,
    { enabled: isAuthenticated },
  );

  const isLive = analyticsData && analyticsData.totals.jobs > 0;
  const totals = isLive
    ? analyticsData!.totals
    : { jobs: 34, earned: 936.5, pending: 215, avgJobValue: 1850 };
  const partner = analyticsData?.partner;
  const tier = partner?.tier ?? "charter";
  const tierInfo = TIER_MAP[tier] ?? TIER_MAP.charter;

  const jobsThisWeek = isLive
    ? (analyticsData!.monthlyJobs[analyticsData!.monthlyJobs.length - 1]?.count ?? 0)
    : 7;

  const totalEarned = isLive ? totals.earned : 936.5;
  const pendingPayout = isLive ? totals.pending : 215;

  const quickStats: QuickStat[] = [
    {
      label: "Jobs This Week",
      value: jobsThisWeek,
      sub: "active period",
      icon: <Briefcase size={16} className="text-blue-400″ />,
      bg: "rgba(59,130,246,0.08)",
      trend: 17,
    },
    {
      label: "Total Earned",
      value: `$${totalEarned.toFixed(0)}`,
      sub: "all time",
      icon: <DollarSign size={16} className="text-green-400″ />,
      bg: "rgba(16,185,129,0.08)",
      trend: 28,
    },
    {
      label: "Pending Payout",
      value: `$${pendingPayout.toFixed(0)}`,
      sub: "next cycle",
      icon: <Clock size={16} className="text-amber-400″ />,
      bg: "rgba(245,158,11,0.08)",
    },
    {
      label: "Tier",
      value: tierInfo.label,
      sub: "current standing",
      icon: <Star size={16} style={{ color: tierInfo.color }} />,
      bg: tierInfo.bg,
    },
  ];

  const filteredLeads = DEMO_LEADS.filter(l => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return l.status === "new";
    if (activeTab === "active") return l.status === "in_progress" || l.status === "quoted";
    if (activeTab === "closed") return l.status === "won" || l.status === "lost";
    return true;
  });

  const newLeadCount = DEMO_LEADS.filter(l => l.status === "new").length;

  return (
    <>
      {showLogJob && <LogJobModal onClose={() => setShowLogJob(false)} />}

      <div className="min-h-screen" style={{ background: "#0A1628″ }}>
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6″>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1″>
                <LayoutDashboard size={20} className="text-teal-400″ />
                <h1 className="text-2xl font-bold text-white">Agent Dashboard</h1>
              </div>
              <p className="text-slate-400 text-sm">
                {partner?.name ? `Welcome back, ${partner.name}` : "Your pipeline, earnings, and active leads"}
              </p>
            </div>
            <button
              onClick={() => setShowLogJob(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#F5E642″, color: "#0A1628" }}
            >
              <PlusCircle size={15} />
              Log a Job
            </button>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(0,181,184,0.08)", border: "1px solid rgba(0,181,184,0.2)" }}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-teal-300 font-medium">Active</span>
            <span className="text-slate-600″>·</span>
            <span className="text-sm text-slate-400″>
              {newLeadCount} new lead{newLeadCount !== 1 ? "s" : ""} awaiting response
            </span>
            {!isLive && (
              <>
                <span className="text-slate-600″>·</span>
                <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">Demo Data</Badge>
              </>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
            {quickStats.map(stat => (
              <div
                key={stat.label}
                className="rounded-xl p-4″
                style={{ background: stat.bg, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between mb-2″>
                  {stat.icon}
                  {stat.trend !== undefined && (
                    <span className="text-xs font-semibold text-green-400 flex items-center gap-0.5″>
                      <ArrowUpRight size={11} />
                      {stat.trend}%
                    </span>
                  )}
                </div>
                <p className="text-xl font-bold text-white">
                  {isLoading ? (
                    <span className="inline-block w-16 h-5 rounded bg-white/5 animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-xs text-slate-500 mt-0.5″>{stat.label}</p>
                {stat.sub && <p className="text-[10px] text-slate-600″>{stat.sub}</p>}
              </div>
            ))}
          </div>

          {/* Active leads section */}
          <div>
            <div className="flex items-center justify-between mb-3″>
              <p className="text-sm font-bold text-white">Active Leads</p>
              <div className="flex gap-1″>
                {(["all", "new", "active", "closed"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all"
                    style={{
                      background: activeTab === tab ? "rgba(0,181,184,0.15)" : "rgba(255,255,255,0.04)",
                      border: activeTab === tab ? "1px solid rgba(0,181,184,0.4)" : "1px solid rgba(255,255,255,0.06)",
                      color: activeTab === tab ? "#00B5B8″ : "#6b7280",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3″>
              {filteredLeads.length > 0 ? (
                filteredLeads.map(lead => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <div
                  className="rounded-xl p-8 text-center"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <Circle size={32} className="text-slate-700 mx-auto mb-2″ />
                  <p className="text-sm text-slate-500″>No leads in this category</p>
                </div>
              )}
            </div>
          </div>

          {/* Pipeline summary */}
          <div
            className="rounded-2xl p-5″
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-sm font-bold text-white mb-4″>Pipeline Summary</p>
            <div className="space-y-2″>
              {(["new", "in_progress", "quoted", "won", "lost"] as Lead["status"][]).map(status => {
                const conf = STATUS_CONFIG[status];
                const count = DEMO_LEADS.filter(l => l.status === status).length;
                const value = DEMO_LEADS.filter(l => l.status === status).reduce((s, l) => s + l.estimatedValue, 0);
                const total = DEMO_LEADS.length;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={status} className="flex items-center gap-3″>
                    <div className="flex items-center gap-1.5 w-24 flex-shrink-0″ style={{ color: conf.color }}>
                      {conf.icon}
                      <span className="text-xs font-medium">{conf.label}</span>
                    </div>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: conf.color }}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-24 justify-end flex-shrink-0″>
                      <span className="text-xs text-slate-500″>{count}</span>
                      <span className="text-xs font-semibold text-slate-300″>${value.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3″>
            {[
              { label: "View Earnings Calendar", sub: "Daily & weekly breakdown", href: "/dashboard/earnings-calendar" },
              { label: "Analytics Overview", sub: "Performance metrics", href: "/analytics" },
            ].map(action => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-4 rounded-xl transition-all hover:border-slate-600″
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div>
                  <p className="text-sm font-semibold text-white">{action.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5″>{action.sub}</p>
                </div>
                <ChevronRight size={16} className="text-slate-600″ />
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
