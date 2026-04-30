import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity, RefreshCw, Search, Filter, User, Shield, Home, Cpu,
  CheckCircle2, DollarSign, Star, Bell, LogIn, Settings, Zap,
} from "lucide-react";

// --- Event type config --------------------------------------------------------
const EVENT_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  partner_approved:   { label: "Partner Approved",   icon: <CheckCircle2 size={14} />, color: "text-emerald-700", bg: "bg-emerald-50" },
  partner_rejected:   { label: "Partner Rejected",   icon: <Shield size={14} />,       color: "text-red-700",     bg: "bg-red-50" },
  deal_created:       { label: "Deal Created",        icon: <Zap size={14} />,          color: "text-blue-700",    bg: "bg-blue-50" },
  deal_accepted:      { label: "Deal Accepted",       icon: <CheckCircle2 size={14} />, color: "text-teal-700",    bg: "bg-teal-50" },
  deal_declined:      { label: "Deal Declined",       icon: <Shield size={14} />,       color: "text-orange-700",  bg: "bg-orange-50" },
  payout_processed:   { label: "Payout Processed",   icon: <DollarSign size={14} />,   color: "text-purple-700",  bg: "bg-purple-50" },
  review_submitted:   { label: "Review Submitted",   icon: <Star size={14} />,          color: "text-yellow-700",  bg: "bg-yellow-50" },
  broadcast_sent:     { label: "Broadcast Sent",     icon: <Bell size={14} />,          color: "text-indigo-700",  bg: "bg-indigo-50" },
  user_login:         { label: "User Login",          icon: <LogIn size={14} />,         color: "text-gray-700",    bg: "bg-gray-50" },
  verification_updated: { label: "Verification Updated", icon: <Shield size={14} />,   color: "text-cyan-700",    bg: "bg-cyan-50" },
  settings_changed:   { label: "Settings Changed",   icon: <Settings size={14} />,      color: "text-gray-700",    bg: "bg-gray-50" },
  ai_analysis:        { label: "AI Analysis",         icon: <Cpu size={14} />,           color: "text-violet-700",  bg: "bg-violet-50" },
};

const ROLE_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  admin:     { label: "Admin",     icon: <Shield size={12} />,  color: "text-red-600 bg-red-50" },
  partner:   { label: "Partner",   icon: <User size={12} />,    color: "text-blue-600 bg-blue-50" },
  homeowner: { label: "Homeowner", icon: <Home size={12} />,    color: "text-green-600 bg-green-50" },
  system:    { label: "System",    icon: <Cpu size={12} />,     color: "text-gray-600 bg-gray-100" },
};

function timeAgo(date: Date | string | null): string {
  if (!date) return "--";
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return d.toLocaleDateString();
}

// --- Demo seed data for when table is empty -----------------------------------
const DEMO_EVENTS = [
  { id: 1, eventType: "partner_approved", actorName: "Admin", actorRole: "admin", entityName: "Dallas Lawn Pros", description: "Partner application approved and activated", createdAt: new Date(Date.now() - 5 * 60_000) },
  { id: 2, eventType: "deal_created", actorName: "System", actorRole: "system", entityName: "Roof Inspection -- 4521 Oak St", description: "AI detected roofing opportunity from job photos", createdAt: new Date(Date.now() - 12 * 60_000) },
  { id: 3, eventType: "deal_accepted", actorName: "Sarah Johnson", actorRole: "homeowner", entityName: "Window Cleaning Deal", description: "Homeowner accepted deal and signed estimate request", createdAt: new Date(Date.now() - 28 * 60_000) },
  { id: 4, eventType: "payout_processed", actorName: "Admin", actorRole: "admin", entityName: "Texas Pest Control", description: "Commission payout of $142.50 processed via Stripe", createdAt: new Date(Date.now() - 45 * 60_000) },
  { id: 5, eventType: "review_submitted", actorName: "Mike Torres", actorRole: "homeowner", entityName: "DFW Pressure Washing", description: "5-star review submitted -- Google Review request triggered", createdAt: new Date(Date.now() - 1.2 * 3_600_000) },
  { id: 6, eventType: "broadcast_sent", actorName: "Admin", actorRole: "admin", entityName: null, description: "Broadcast sent to 795 approved partners: 'New Feature: Public Profile Pages'", createdAt: new Date(Date.now() - 2 * 3_600_000) },
  { id: 7, eventType: "verification_updated", actorName: "Admin", actorRole: "admin", entityName: "Metroplex HVAC", description: "License verification checkpoint marked as verified", createdAt: new Date(Date.now() - 3.5 * 3_600_000) },
  { id: 8, eventType: "ai_analysis", actorName: "System", actorRole: "system", entityName: "Job #1042", description: "AI Vision Module detected 3 opportunities (confidence: 0.87, 0.74, 0.61)", createdAt: new Date(Date.now() - 5 * 3_600_000) },
  { id: 9, eventType: "partner_approved", actorName: "Admin", actorRole: "admin", entityName: "Plano Pool Service", description: "Partner application approved and activated", createdAt: new Date(Date.now() - 8 * 3_600_000) },
  { id: 10, eventType: "user_login", actorName: "James Williams", actorRole: "partner", entityName: null, description: "Partner logged in from Dallas, TX", createdAt: new Date(Date.now() - 10 * 3_600_000) },
];

export default function ActivityLog() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");

  const { data: events, isLoading, refetch } = trpc.activityLog.getRecent.useQuery({ limit: 100 });
  const { data: eventTypes } = trpc.activityLog.getEventTypes.useQuery();

  const displayEvents = (events && events.length > 0 ? events : DEMO_EVENTS) as Array<{
    id: number; eventType: string; actorId?: number | null; actorName: string | null;
    actorRole: string; entityType?: string | null; entityId?: number | null;
    entityName: string | null; description: string; metadata?: unknown;
    ipAddress?: string | null; createdAt: Date | string;
  }>;

  const isLive = events && events.length > 0;

  const filtered = displayEvents.filter(e => {
    if (roleFilter !== "all" && e.actorRole !== roleFilter) return false;
    if (eventTypeFilter !== "all" && e.eventType !== eventTypeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.description.toLowerCase().includes(q) ||
        (e.actorName?.toLowerCase().includes(q) ?? false) ||
        (e.entityName?.toLowerCase().includes(q) ?? false) ||
        e.eventType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout title="Activity Log" subtitle="Real-time platform events and audit trail">
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity size={22} className="text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
            {isLive ? (
              <Badge className="bg-teal-100 text-teal-700 border-0 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                Live
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Demo Data</Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Real-time feed of every platform action</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Events", value: displayEvents.length, color: "text-gray-900" },
          { label: "Admin Actions", value: displayEvents.filter(e => e.actorRole === "admin").length, color: "text-red-600" },
          { label: "System Events", value: displayEvents.filter(e => e.actorRole === "system").length, color: "text-violet-600" },
          { label: "User Actions", value: displayEvents.filter(e => ["partner", "homeowner"].includes(e.actorRole)).length, color: "text-blue-600" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events, actors, entities..."
            className="pl-8 text-sm h-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 h-9 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="partner">Partner</option>
            <option value="homeowner">Homeowner</option>
            <option value="system">System</option>
          </select>
          <select
            value={eventTypeFilter}
            onChange={e => setEventTypeFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 h-9 bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Event Types</option>
            {(eventTypes ?? Object.keys(EVENT_CONFIG)).map(et => {
              const key = typeof et === "string" ? et : (et as { eventType: string }).eventType;
              return <option key={key} value={key}>{EVENT_CONFIG[key]?.label ?? key}</option>;
            })}
          </select>
        </div>
      </div>

      {/* Event feed */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
            <RefreshCw size={16} className="animate-spin" /> Loading events...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Activity size={32} className="mb-2 opacity-30" />
            <p className="text-sm">No events match your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((event, idx) => {
              const cfg = EVENT_CONFIG[event.eventType];
              const roleCfg = ROLE_CONFIG[event.actorRole] ?? ROLE_CONFIG.system;
              return (
                <div key={event.id ?? idx} className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                  {/* Event icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${cfg?.bg ?? "bg-gray-50"} ${cfg?.color ?? "text-gray-600"}`}>
                    {cfg?.icon ?? <Activity size={14} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{cfg?.label ?? event.eventType}</span>
                      {event.entityName && (
                        <span className="text-xs text-gray-500 truncate">-- {event.entityName}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{event.description}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${roleCfg.color}`}>
                        {roleCfg.icon}
                        {event.actorName ?? roleCfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="text-xs text-gray-400 shrink-0 mt-1">
                    {timeAgo(event.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!isLive && (
        <p className="text-center text-xs text-gray-400">
          Showing demo data. Activity events will appear here as partners, homeowners, and admins take actions on the platform.
        </p>
      )}
    </div>
    </AdminLayout>
  );
}
