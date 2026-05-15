import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Megaphone, Plus, Eye, Send, Zap, Users, Home, Shield,
  Bell, Layout, MessageSquare, AlertTriangle, CheckCircle,
  BarChart2, Clock, X, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: string;
  displayType: string;
  priority: "normal" | "important" | "critical";
  startDate: string;
  endDate?: string;
  impressions: number;
  dismissalRate: number;
  active: boolean;
}

const LIVE: Announcement[] = [
  {
    id: "ann-1",
    title: "Storm Season 2026",
    body: "Roofing and exterior leads will increase this season. Ensure your profile is complete and your service areas are up to date to receive priority routing.",
    audience: "Partners",
    displayType: "Banner",
    priority: "important",
    startDate: "May 1, 2026",
    impressions: 1482,
    dismissalRate: 23,
    active: true,
  },
  {
    id: "ann-2",
    title: "New: Photo AI 2.0",
    body: "Our updated Photo AI model improves damage detection accuracy by 34%. Scan your home exterior and interior for instant health scoring.",
    audience: "All Users",
    displayType: "Notification",
    priority: "normal",
    startDate: "Apr 28, 2026",
    impressions: 3104,
    dismissalRate: 41,
    active: true,
  },
];

const HISTORY: Announcement[] = [
  { id: "h1", title: "Founding Partner Waitlist Closes May 6", audience: "All", startDate: "Apr 15, 2026", endDate: "May 6, 2026", impressions: 5812, dismissalRate: 18, priority: "critical", displayType: "Modal", body: "", active: false },
  { id: "h2", title: "DFW Launch Markets Expanded", audience: "Partners", startDate: "Apr 10, 2026", endDate: "Apr 30, 2026", impressions: 2340, dismissalRate: 31, priority: "normal", displayType: "Banner", body: "", active: false },
  { id: "h3", title: "New Commission Tiers Active", audience: "All", startDate: "Apr 1, 2026", endDate: "Apr 14, 2026", impressions: 4100, dismissalRate: 27, priority: "important", displayType: "Banner", body: "", active: false },
  { id: "h4", title: "Platform Maintenance — Apr 3 2am-4am", audience: "All", startDate: "Apr 2, 2026", endDate: "Apr 3, 2026", impressions: 920, dismissalRate: 55, priority: "critical", displayType: "Modal", body: "", active: false },
  { id: "h5", title: "Referral Contest Winners Announced", audience: "Partners", startDate: "Mar 31, 2026", endDate: "Apr 5, 2026", impressions: 1670, dismissalRate: 38, priority: "normal", displayType: "Notification", body: "", active: false },
  { id: "h6", title: "Home Health Vault Now Available", audience: "Homeowners", startDate: "Mar 20, 2026", endDate: "Apr 1, 2026", impressions: 3890, dismissalRate: 22, priority: "important", displayType: "Banner", body: "", active: false },
  { id: "h7", title: "Tier Upgrade Promo — 50% Off", audience: "Partners", startDate: "Mar 10, 2026", endDate: "Mar 20, 2026", impressions: 2210, dismissalRate: 29, priority: "normal", displayType: "Banner", body: "", active: false },
  { id: "h8", title: "Spring Lead Surge — Be Ready", audience: "Partners", startDate: "Mar 1, 2026", endDate: "Mar 15, 2026", impressions: 1980, dismissalRate: 44, priority: "normal", displayType: "Notification", body: "", active: false },
  { id: "h9", title: "New: AI Match Confidence Score", audience: "All", startDate: "Feb 20, 2026", endDate: "Mar 5, 2026", impressions: 4430, dismissalRate: 19, priority: "important", displayType: "Modal", body: "", active: false },
  { id: "h10", title: "Privacy Policy Update v2.1", audience: "All", startDate: "Feb 10, 2026", endDate: "Feb 28, 2026", impressions: 6100, dismissalRate: 61, priority: "normal", displayType: "Banner", body: "", active: false },
];

const PRIORITY_STYLES = {
  normal: { label: "Normal", color: "#6B7280", bg: "rgba(107,114,128,0.15)" },
  important: { label: "Important", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  critical: { label: "Critical", color: "#EF4444", bg: "rgba(239,68,68,0.15)" },
};

const AUDIENCES = ["All Users", "Partners Only", "Homeowners Only", "Charter Tier", "Founding Tier"];
const DISPLAY_TYPES = [
  { key: "banner", label: "Banner", icon: Layout, desc: "Top of dashboard, dismissible" },
  { key: "modal", label: "Modal Popup", icon: MessageSquare, desc: "Shown on next login" },
  { key: "notification", label: "Notification Bell", icon: Bell, desc: "Appears in notification feed" },
];

function PriorityBadge({ p }: { p: "normal" | "important" | "critical" }) {
  const s = PRIORITY_STYLES[p];
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

function PreviewBanner({ title, body, priority }: { title: string; body: string; priority: string }) {
  const s = PRIORITY_STYLES[priority as keyof typeof PRIORITY_STYLES] ?? PRIORITY_STYLES.normal;
  return (
    <div className="rounded-xl border p-4 flex gap-3 items-start" style={{ borderColor: s.color + "60", background: s.bg }}>
      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: s.color }} />
      <div className="flex-1">
        <p className="font-semibold text-sm" style={{ color: s.color }}>{title || "Announcement title"}</p>
        <p className="text-xs text-[#94A3B8] mt-0.5">{body || "Announcement body text will appear here..."}</p>
      </div>
      <button className="flex-shrink-0 text-[#4B5563] hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

export default function AnnouncementCenter() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("All Users");
  const [displayType, setDisplayType] = useState("banner");
  const [priority, setPriority] = useState<"normal" | "important" | "critical">("normal");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [previewing, setPreviewing] = useState(false);

  function handlePublish() {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required");
      return;
    }
    toast.success("Announcement published successfully");
    setTitle(""); setBody(""); setPreviewing(false);
  }

  function handleEmergency() {
    toast.error("Emergency broadcast sent — all active users notified via push + email", { duration: 5000 });
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-[#00B5B8]/20 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-[#00B5B8]" />
              </div>
              <h1 className="text-2xl font-bold">Announcement Center</h1>
            </div>
            <p className="text-[#94A3B8] text-sm ml-[52px]">Communicate with your platform</p>
          </div>
          <button
            onClick={handleEmergency}
            className="flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors flex-shrink-0"
          >
            <Zap className="w-4 h-4" />
            Emergency Broadcast
          </button>
        </div>

        {/* Live announcements */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <h2 className="font-semibold text-[#94A3B8] text-sm uppercase tracking-wider">Active Announcements</h2>
          </div>
          <div className="space-y-3">
            {LIVE.map(ann => (
              <div key={ann.id} className="bg-[#0D2137] border border-[#1E3A5F] rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold">{ann.title}</p>
                      <PriorityBadge p={ann.priority} />
                    </div>
                    <p className="text-sm text-[#94A3B8]">{ann.body}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    {ann.audience === "Partners" ? <Users className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
                    {ann.audience}
                  </span>
                  <span className="flex items-center gap-1"><Layout className="w-3.5 h-3.5" />{ann.displayType}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Since {ann.startDate}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{ann.impressions.toLocaleString()} impressions</span>
                  <span className="flex items-center gap-1"><BarChart2 className="w-3.5 h-3.5" />{ann.dismissalRate}% dismissed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create form */}
        <div className="bg-[#0D2137] border border-[#1E3A5F] rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Plus className="w-5 h-5 text-[#00B5B8]" />
            <h2 className="font-semibold text-lg">Create Announcement</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Announcement title..."
                className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#4B5563] focus:outline-none focus:border-[#00B5B8]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">Body</label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={3}
                placeholder="Announcement body text..."
                className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#4B5563] focus:outline-none focus:border-[#00B5B8] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">Audience</label>
                <div className="relative">
                  <select
                    value={audience}
                    onChange={e => setAudience(e.target.value)}
                    className="w-full appearance-none bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00B5B8] pr-8"
                  >
                    {AUDIENCES.map(a => <option key={a}>{a}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#4B5563] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">Priority</label>
                <div className="flex gap-2">
                  {(["normal", "important", "critical"] as const).map(p => {
                    const s = PRIORITY_STYLES[p];
                    return (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border transition-all"
                        style={priority === p
                          ? { background: s.bg, borderColor: s.color, color: s.color }
                          : { background: "transparent", borderColor: "#1E3A5F", color: "#64748B" }
                        }
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">Display Type</label>
              <div className="grid grid-cols-3 gap-2">
                {DISPLAY_TYPES.map(dt => {
                  const Icon = dt.icon;
                  return (
                    <button
                      key={dt.key}
                      onClick={() => setDisplayType(dt.key)}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl border text-xs transition-all"
                      style={displayType === dt.key
                        ? { background: "rgba(0,181,184,0.1)", borderColor: "#00B5B8", color: "#00B5B8" }
                        : { background: "transparent", borderColor: "#1E3A5F", color: "#64748B" }
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {dt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00B5B8]" />
              </div>
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">End Date (optional)</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00B5B8]" />
              </div>
            </div>

            {previewing && (
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1.5 font-medium">Preview</label>
                <PreviewBanner title={title} body={body} priority={priority} />
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setPreviewing(p => !p)}
                className="flex items-center gap-2 border border-[#1E3A5F] hover:border-[#00B5B8] text-[#94A3B8] hover:text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                {previewing ? "Hide Preview" : "Preview"}
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 bg-[#00B5B8] hover:bg-[#009EA1] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                Publish
              </button>
            </div>
          </div>
        </div>

        {/* History table */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#00B5B8]" />
            <h2 className="font-semibold">Announcement History</h2>
            <span className="text-xs text-[#64748B]">Last 10</span>
          </div>
          <div className="bg-[#0D2137] border border-[#1E3A5F] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E3A5F]">
                  {["Title", "Audience", "Period", "Impressions", "Dismissed", "Priority"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3A5F]/40">
                {HISTORY.map(h => (
                  <tr key={h.id} className="hover:bg-[#1E3A5F]/20 transition-colors">
                    <td className="px-4 py-3 text-[#CBD5E1] font-medium max-w-[180px] truncate">{h.title}</td>
                    <td className="px-4 py-3 text-[#94A3B8]">{h.audience}</td>
                    <td className="px-4 py-3 text-[#94A3B8] text-xs whitespace-nowrap">{h.startDate}{h.endDate ? ` → ${h.endDate}` : ""}</td>
                    <td className="px-4 py-3 text-[#CBD5E1] font-semibold">{h.impressions.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${h.dismissalRate > 50 ? "text-[#EF4444]" : h.dismissalRate > 30 ? "text-[#F59E0B]" : "text-[#10B981]"}`}>
                        {h.dismissalRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3"><PriorityBadge p={h.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
