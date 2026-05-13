import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { motion } from "framer-motion";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  Calendar,
  Star,
  Home,
} from "lucide-react";
import { toast } from "sonner";

const TEAL = "#0d9488";
const TEAL_LIGHT = "rgba(13,148,136,0.15)";
const TEAL_BORDER = "rgba(13,148,136,0.35)";
const NAVY = "#0a0f1e";
const CARD_BG = "#0e1628";
const CARD_BORDER = "rgba(255,255,255,0.07)";

type Lead = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  photoUrls: string | null;
  aiAnalysis: string | null;
  status: string;
  notes: string | null;
  createdAt: Date;
};

const URGENCY_MAP: Record<string, { label: string; color: string; bg: string }> = {
  urgent:  { label: "Urgent",  color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  high:    { label: "High",    color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  medium:  { label: "Medium",  color: "#eab308", bg: "rgba(234,179,8,0.12)" },
  low:     { label: "Low",     color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  new:       { label: "New",       color: TEAL },
  contacted: { label: "Accepted",  color: "#22c55e" },
  matched:   { label: "Matched",   color: "#3b82f6" },
  closed:    { label: "Closed",    color: "#6b7280" },
  lost:      { label: "Declined",  color: "#6b7280" },
};

function parseAiAnalysis(raw: string | null): { issues: number; upgrades: number; healthScore: number; urgency: string; topIssue: string } {
  if (!raw) return { issues: 0, upgrades: 0, healthScore: 70, urgency: "medium", topIssue: "General inspection" };
  try {
    const parsed = JSON.parse(raw);
    const issues = Array.isArray(parsed.opportunities) ? parsed.opportunities : [];
    const urgentCount = issues.filter((i: { severity?: string }) => i.severity === "urgent" || i.severity === "high").length;
    const urgency = urgentCount > 2 ? "urgent" : urgentCount > 0 ? "high" : issues.length > 3 ? "medium" : "low";
    const healthScore = Math.max(30, 100 - issues.length * 8);
    const topIssue = issues[0]?.name ?? "General inspection";
    return { issues: issues.filter((i: { offerTrack?: string }) => i.offerTrack !== "transformation").length, upgrades: issues.filter((i: { offerTrack?: string }) => i.offerTrack === "transformation").length, healthScore, urgency, topIssue };
  } catch {
    return { issues: 0, upgrades: 0, healthScore: 70, urgency: "medium", topIssue: "General inspection" };
  }
}

function maskAddress(addr: string | null): string {
  if (!addr) return "Address on file";
  const parts = addr.split(",");
  if (parts.length >= 2) return `${parts[0].replace(/\d+/, "***")},${parts.slice(1).join(",")}`;
  return addr.replace(/\d+/g, "***");
}

function formatDate(d: Date | string): string {
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function LeadCard({ lead, onAccept, onDecline, isResponding }: {
  lead: Lead;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
  isResponding: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const analysis = parseAiAnalysis(lead.aiAnalysis);
  const urgency = URGENCY_MAP[analysis.urgency] ?? URGENCY_MAP.medium;
  const statusInfo = STATUS_MAP[lead.status] ?? { label: lead.status, color: "#6b7280" };
  const isPending = lead.status === "new" || lead.status === "matched";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: urgency.bg, color: urgency.color }}>
                {urgency.label}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: statusInfo.color }}>
                {statusInfo.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
              <span className="text-sm text-white font-medium truncate">{maskAddress(lead.address)}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Calendar size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Scan: {formatDate(lead.createdAt)}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-black" style={{ color: analysis.healthScore >= 70 ? "#22c55e" : analysis.healthScore >= 50 ? "#eab308" : "#ef4444" }}>
              {analysis.healthScore}
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Health Score</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="rounded-lg p-2 text-center" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
            <div className="text-base font-bold text-red-400">{analysis.issues}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Issues</div>
          </div>
          <div className="rounded-lg p-2 text-center" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
            <div className="text-base font-bold text-blue-400">{analysis.upgrades}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Upgrades</div>
          </div>
          <div className="rounded-lg p-2 text-center" style={{ background: TEAL_LIGHT, border: `1px solid ${TEAL_BORDER}` }}>
            <div className="text-base font-bold" style={{ color: TEAL }}>{analysis.issues + analysis.upgrades}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Total</div>
          </div>
        </div>

        {analysis.topIssue && (
          <div className="mt-3 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Top finding: </span>
            <span className="text-xs text-white font-medium">{analysis.topIssue}</span>
          </div>
        )}

        <button
          className="mt-3 flex items-center gap-1 text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Hide details" : "Show details"}
          <ChevronRight size={12} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
        </button>

        {expanded && lead.phone && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <Phone size={12} style={{ color: TEAL }} />
            <span className="text-xs text-white">{lead.phone}</span>
          </div>
        )}

        {isPending && (
          <div className="flex gap-2 mt-4">
            <button
              disabled={isResponding}
              onClick={() => onAccept(lead.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: TEAL }}
            >
              Accept Lead
            </button>
            <button
              disabled={isResponding}
              onClick={() => onDecline(lead.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-50"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
            >
              Decline
            </button>
          </div>
        )}

        {!isPending && lead.status === "contacted" && (
          <a
            href={`tel:${lead.phone}`}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: TEAL_LIGHT, border: `1px solid ${TEAL_BORDER}`, color: "#5eead4" }}
          >
            <Phone size={14} />
            Contact Homeowner
          </a>
        )}
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: TEAL_LIGHT, border: `1px solid ${TEAL_BORDER}` }}>
          <Icon size={14} style={{ color: TEAL }} />
        </div>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{sub}</div>}
    </div>
  );
}

export default function TrustyProPartnerDashboard() {
  const [, navigate] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [respondingId, setRespondingId] = useState<number | null>(null);

  const { data: leads = [], isLoading, refetch } = trpc.partners.getMyTrustyLeads.useQuery(undefined, {
    enabled: !!user,
    refetchInterval: 30000,
  });

  const respondMutation = trpc.partners.respondToTrustyLead.useMutation({
    onSuccess: (_data, variables) => {
      toast.success(variables.response === "accepted" ? "Lead accepted! Contact info now visible." : "Lead declined.");
      refetch();
      setRespondingId(null);
    },
    onError: (err) => {
      toast.error(err.message);
      setRespondingId(null);
    },
  });

  const handleAccept = (id: number) => {
    setRespondingId(id);
    respondMutation.mutate({ leadId: id, response: "accepted" });
  };

  const handleDecline = (id: number) => {
    setRespondingId(id);
    respondMutation.mutate({ leadId: id, response: "declined" });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: TEAL, borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: NAVY }}>
        <TrustyProLogo variant="dark" height={36} />
        <p className="mt-4 text-white text-sm">Please log in to view your partner dashboard.</p>
        <button
          onClick={() => navigate("/trustypro/login")}
          className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: TEAL }}
        >
          Log In
        </button>
      </div>
    );
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const leadsThisWeek = leads.filter((l) => new Date(l.createdAt) >= weekAgo).length;
  const leadsThisMonth = leads.filter((l) => new Date(l.createdAt) >= monthAgo).length;
  const acceptedLeads = leads.filter((l) => l.status === "contacted").length;
  const conversionRate = leads.length > 0 ? Math.round((acceptedLeads / leads.length) * 100) : 0;
  const newLeads = leads.filter((l) => l.status === "new" || l.status === "matched");
  const activeLeads = leads.filter((l) => l.status === "contacted");
  const closedLeads = leads.filter((l) => l.status === "closed" || l.status === "lost");

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(13,148,136,0.08) 0%, transparent 70%)", zIndex: 0 }}
      />

      {/* Header */}
      <div className="relative z-10 px-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrustyProLogo variant="dark" height={28} />
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }} />
            <span className="text-sm font-semibold text-white">Partner Dashboard</span>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            ProLnk Dashboard
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={Zap} label="This Week" value={leadsThisWeek} sub="new leads" />
          <StatCard icon={Calendar} label="This Month" value={leadsThisMonth} sub="new leads" />
          <StatCard icon={TrendingUp} label="Conversion" value={`${conversionRate}%`} sub="accept rate" />
          <StatCard icon={Users} label="Total Leads" value={leads.length} sub="all time" />
        </div>

        {/* New Leads */}
        {newLeads.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: TEAL }} />
              <h2 className="text-sm font-bold text-white">New Leads ({newLeads.length})</h2>
            </div>
            <div className="space-y-3">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: TEAL, borderTopColor: "transparent" }} />
                </div>
              ) : (
                newLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                    isResponding={respondingId === lead.id}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {/* Active */}
        {activeLeads.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
              <h2 className="text-sm font-bold text-white">In Progress ({activeLeads.length})</h2>
            </div>
            <div className="space-y-3">
              {activeLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  isResponding={respondingId === lead.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Closed */}
        {closedLeads.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
              <h2 className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>Closed / Declined ({closedLeads.length})</h2>
            </div>
            <div className="space-y-3">
              {closedLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  isResponding={respondingId === lead.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!isLoading && leads.length === 0 && (
          <div className="rounded-xl py-16 flex flex-col items-center" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: TEAL_LIGHT, border: `1px solid ${TEAL_BORDER}` }}>
              <Home size={20} style={{ color: TEAL }} />
            </div>
            <p className="text-white font-semibold mb-1">No leads yet</p>
            <p className="text-xs text-center max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Homeowner scan results matched to your trade and service area will appear here.
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              <Star size={12} style={{ color: TEAL }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Make sure your profile is complete to receive leads.</span>
            </div>
          </div>
        )}

        {/* Loading state for initial load */}
        {isLoading && leads.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-7 h-7 border-2 rounded-full animate-spin" style={{ borderColor: TEAL, borderTopColor: "transparent" }} />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Loading your leads...</p>
          </div>
        )}

        {/* Upgrade CTA for non-approved partners */}
        <div className="rounded-xl p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" style={{ background: TEAL_LIGHT, border: `1px solid ${TEAL_BORDER}` }}>
          <div>
            <p className="text-sm font-bold text-white">Boost your lead volume</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Upgrade to a higher tier to unlock more scan leads and priority routing.</p>
          </div>
          <button
            onClick={() => navigate("/founding-partner")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: TEAL }}
          >
            View Plans
            <AlertTriangle size={12} />
          </button>
        </div>

      </div>
    </div>
  );
}
