/**
 * Wave 49 — Admin Smart Notifications
 * Send targeted or broadcast notifications to partners:
 * deal expiring, commission milestone, tier upgrade, new lead, custom
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell, Send, Users, Zap, TrendingUp, Award, Star,
  ChevronDown, Loader2, CheckCircle2, AlertCircle, Megaphone,
} from "lucide-react";

const NOTIFICATION_TYPES = [
  { value: "new_lead",         label: "New Lead",           icon: Zap,         color: "text-blue-500",   bg: "bg-blue-50",   border: "border-blue-200" },
  { value: "commission_paid",  label: "Commission Paid",    icon: TrendingUp,  color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
  { value: "approval",         label: "Tier / Approval",   icon: Award,       color: "text-purple-500", bg: "bg-purple-50",  border: "border-purple-200" },
  { value: "broadcast",        label: "Broadcast",          icon: Megaphone,   color: "text-amber-500",  bg: "bg-amber-50",   border: "border-amber-200" },
  { value: "system",           label: "System Alert",       icon: AlertCircle, color: "text-red-500",    bg: "bg-red-50",     border: "border-red-200" },
  { value: "lead_expired",     label: "Lead Expired",       icon: Bell,        color: "text-slate-500",  bg: "bg-slate-50",   border: "border-slate-200" },
] as const;

type NotifType = typeof NOTIFICATION_TYPES[number]["value"];

const SMART_TEMPLATES: { label: string; type: NotifType; title: string; message: string }[] = [
  {
    label: "Deal Expiring in 24h",
    type: "new_lead",
    title: "⏰ Your lead expires in 24 hours",
    message: "You have an active lead that expires soon. Log in to your dashboard to accept or decline before it auto-routes to another partner.",
  },
  {
    label: "Commission Milestone: $500",
    type: "commission_paid",
    title: "🎉 You've earned $500 in commissions!",
    message: "Congratulations — you've crossed the $500 commission milestone. Keep referring quality leads to keep climbing the leaderboard.",
  },
  {
    label: "Tier Upgrade Available",
    type: "approval",
    title: "⭐ You're eligible for a tier upgrade!",
    message: "Based on your recent performance, you qualify for a tier upgrade. Log in to your Partner Portal to review your progress and unlock higher commission rates.",
  },
  {
    label: "New Opportunity in Your Area",
    type: "new_lead",
    title: "🔔 New opportunity near you",
    message: "A new cross-sell opportunity has been detected in your service area. Log in to your dashboard to view the details and accept the lead.",
  },
  {
    label: "Weekly Digest Reminder",
    type: "broadcast",
    title: "📊 Your weekly ProLnk summary is ready",
    message: "Check your Partner Portal for your weekly performance summary — leads received, commissions earned, and your current tier standing.",
  },
  {
    label: "Photo Quality Reminder",
    type: "system",
    title: "📸 Improve your photo quality for more leads",
    message: "Partners with high-quality job photos receive 3x more AI-detected opportunities. Review our photo guidelines in the Field OS app.",
  },
];

export default function SmartNotifications() {
  const [mode, setMode] = useState<"single" | "broadcast">("broadcast");
  const [partnerId, setPartnerId] = useState<string>("");
  const [type, setType] = useState<NotifType>("broadcast");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [tierFilter, setTierFilter] = useState<"all" | "scout" | "pro" | "crew" | "company" | "enterprise">("all");
  const [showTemplates, setShowTemplates] = useState(false);

  const { data: partners } = trpc.admin.getAllPartners.useQuery();
  const approvedPartners = (partners ?? []).filter((p: { status: string }) => p.status === "approved");

  const sendSingle = trpc.notifications.adminSendSmartNotification.useMutation({
    onSuccess: () => {
      toast.success("Notification sent successfully.");
      setTitle(""); setMessage(""); setActionUrl(""); setPartnerId("");
    },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });

  const sendBroadcast = trpc.notifications.adminBroadcastSmartNotification.useMutation({
    onSuccess: (res) => {
      toast.success(`Broadcast sent to ${res.sent} partner${res.sent !== 1 ? "s" : ""}.`);
      setTitle(""); setMessage(""); setActionUrl("");
    },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });

  const handleSend = () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required.");
      return;
    }
    if (mode === "single") {
      const pid = parseInt(partnerId);
      if (!pid) { toast.error("Select a partner."); return; }
      sendSingle.mutate({ partnerId: pid, type, title, message, actionUrl: actionUrl || undefined });
    } else {
      sendBroadcast.mutate({ type, title, message, actionUrl: actionUrl || undefined, tierFilter });
    }
  };

  const applyTemplate = (t: typeof SMART_TEMPLATES[number]) => {
    setType(t.type);
    setTitle(t.title);
    setMessage(t.message);
    setShowTemplates(false);
  };

  const selectedType = NOTIFICATION_TYPES.find(n => n.value === type)!;
  const isBusy = sendSingle.isPending || sendBroadcast.isPending;

  const targetCount = mode === "broadcast"
    ? (tierFilter === "all" ? approvedPartners.length : approvedPartners.filter((p: { tier: string | null }) => p.tier === tierFilter).length)
    : 1;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-500" /> Smart Notifications
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Send targeted or broadcast in-app notifications to partners
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-xl border border-gray-200 overflow-hidden">
          {(["broadcast", "single"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                mode === m ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-gray-50"
              }`}
            >
              {m === "broadcast" ? <><Megaphone className="w-4 h-4" /> Broadcast to All</> : <><Users className="w-4 h-4" /> Single Partner</>}
            </button>
          ))}
        </div>

        {/* Composer card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-5">
          {/* Target selector */}
          {mode === "single" ? (
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Target Partner</label>
              <select
                value={partnerId}
                onChange={e => setPartnerId(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a partner...</option>
                {approvedPartners.map((p: { id: number; businessName: string; tier: string | null }) => (
                  <option key={p.id} value={p.id}>
                    {p.businessName} ({p.tier ?? "scout"})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Target Tier
                <span className="ml-2 text-blue-600 font-bold">{targetCount} partner{targetCount !== 1 ? "s" : ""}</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {(["all", "scout", "pro", "crew", "company", "enterprise"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTierFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-colors ${
                      tierFilter === t
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 text-slate-600 hover:bg-gray-50"
                    }`}
                  >
                    {t === "all" ? "All Tiers" : t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notification type */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Notification Type</label>
            <div className="grid grid-cols-3 gap-2">
              {NOTIFICATION_TYPES.map(n => (
                <button
                  key={n.value}
                  onClick={() => setType(n.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                    type === n.value
                      ? `${n.bg} ${n.border} ${n.color}`
                      : "border-gray-200 text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  <n.icon className={`w-3.5 h-3.5 ${type === n.value ? n.color : "text-slate-400"}`} />
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates */}
          <div>
            <button
              onClick={() => setShowTemplates(v => !v)}
              className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
            >
              <Star className="w-3.5 h-3.5" />
              Smart Templates
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTemplates ? "rotate-180" : ""}`} />
            </button>
            {showTemplates && (
              <div className="mt-2 grid grid-cols-1 gap-2">
                {SMART_TEMPLATES.map(t => (
                  <button
                    key={t.label}
                    onClick={() => applyTemplate(t)}
                    className="text-left px-3 py-2.5 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <p className="text-xs font-semibold text-gray-800">{t.label}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{t.title}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
            <Input
              placeholder="e.g. ⏰ Your lead expires in 24 hours"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border-gray-200 text-gray-800 placeholder:text-slate-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Message</label>
            <Textarea
              placeholder="Write the notification body..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              className="border-gray-200 text-gray-800 placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Action URL */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Action URL <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <Input
              placeholder="e.g. /dashboard/leads"
              value={actionUrl}
              onChange={e => setActionUrl(e.target.value)}
              className="border-gray-200 text-gray-800 placeholder:text-slate-400"
            />
          </div>

          {/* Preview */}
          {(title || message) && (
            <div className={`rounded-xl border p-4 ${selectedType.bg} ${selectedType.border}`}>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Preview</p>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selectedType.bg}`}>
                  <selectedType.icon className={`w-4 h-4 ${selectedType.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{title || "Notification title"}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{message || "Notification message"}</p>
                  {actionUrl && <p className="text-xs text-blue-600 mt-1">{actionUrl}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={isBusy || !title.trim() || !message.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2"
          >
            {isBusy ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
            ) : (
              <><Send className="w-4 h-4" /> Send to {mode === "broadcast" ? `${targetCount} Partner${targetCount !== 1 ? "s" : ""}` : "Partner"}</>
            )}
          </Button>
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
          <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            Notifications appear in the partner's in-app notification bell. Partners with email notifications enabled will also receive an email.
            Use the <strong>Smart Templates</strong> above for pre-written, high-converting messages.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
