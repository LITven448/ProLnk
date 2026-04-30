/**
 * Admin Comms Timeline — /admin/comms
 * Shows every outbound message sent per deal, with live status and template editing.
 * Combines the deal notification log with an editable message template library.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail, MessageSquare, Bell, CheckCircle2, Clock, Send,
  Edit2, X, Save, Copy, Eye, Sparkles, User, Home, Briefcase,
  RefreshCw, Search, ChevronDown, ChevronUp, ExternalLink
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type Channel = "sms" | "email" | "in_app";
type Recipient = "homeowner" | "field_partner" | "receiving_partner" | "admin";

interface MessageTemplate {
  id: string;
  trigger: string;
  channel: Channel;
  recipient: Recipient;
  subject?: string;
  body: string;
  delay: string;
  variables: string[];
}

// ─── Default Template Library ─────────────────────────────────────────────────
const DEFAULT_TEMPLATES: MessageTemplate[] = [
  {
    id: "t1",
    trigger: "Deal Sent to Homeowner",
    channel: "sms",
    recipient: "homeowner",
    body: "Hi {{homeowner_name}}! {{referring_partner}} just finished your service. Our AI spotted something at your property — tap to see before/after photos and a special partner-rate offer: {{deal_url}}\n\nOffer expires in 48 hrs. Reply STOP to opt out.",
    delay: "Instant",
    variables: ["homeowner_name", "referring_partner", "deal_url"],
  },
  {
    id: "t2",
    trigger: "Deal Sent to Homeowner",
    channel: "email",
    recipient: "homeowner",
    subject: "Your {{service_type}} is Complete + A Special Offer from ProLnk",
    body: "Hi {{homeowner_name}},\n\nYour service was just completed by {{referring_partner}}.\n\nWhile reviewing the job photos, our AI noticed something that could save you money: {{issue_description}}\n\nWe've lined up {{receiving_partner}} — a vetted ProLnk partner — to give you a FREE estimate. No obligation.\n\nEstimated value: ${{est_low}}–${{est_high}}\n\n[View Photos + Claim Your Free Estimate]\n{{deal_url}}\n\nThis offer expires in 48 hours.\n\nBest,\nThe ProLnk Team",
    delay: "2 min",
    variables: ["homeowner_name", "referring_partner", "issue_description", "receiving_partner", "est_low", "est_high", "deal_url", "service_type"],
  },
  {
    id: "t3",
    trigger: "Deal Sent to Homeowner",
    channel: "in_app",
    recipient: "field_partner",
    body: "Your referral was sent! {{receiving_partner}} will contact {{homeowner_name}}. You'll earn ${{commission_amount}} when the job closes.",
    delay: "Instant",
    variables: ["receiving_partner", "homeowner_name", "commission_amount"],
  },
  {
    id: "t4",
    trigger: "Homeowner Schedules Estimate",
    channel: "sms",
    recipient: "receiving_partner",
    body: "🎉 New estimate scheduled! {{homeowner_name}} at {{homeowner_address}} wants a free estimate for {{issue_type}}. Contact them at {{homeowner_phone}}. Log your visit in the ProLnk app.",
    delay: "Instant",
    variables: ["homeowner_name", "homeowner_address", "issue_type", "homeowner_phone"],
  },
  {
    id: "t5",
    trigger: "Homeowner Schedules Estimate",
    channel: "email",
    recipient: "homeowner",
    subject: "Estimate Confirmed — {{receiving_partner}} Will Contact You",
    body: "Hi {{homeowner_name}},\n\nYour free estimate is confirmed! {{receiving_partner}} will call you within 2 hours to schedule your appointment.\n\nIssue: {{issue_type}}\nAddress: {{homeowner_address}}\n\nQuestions? Reply to this email.\n\nBest,\nThe ProLnk Team",
    delay: "Instant",
    variables: ["homeowner_name", "receiving_partner", "issue_type", "homeowner_address"],
  },
  {
    id: "t6",
    trigger: "Job Closed",
    channel: "email",
    recipient: "homeowner",
    subject: "How did it go? Leave a review for {{receiving_partner}}",
    body: "Hi {{homeowner_name}},\n\nWe hope your {{issue_type}} repair went smoothly!\n\nIf you have a moment, please leave a quick review for {{receiving_partner}}. It helps other homeowners find trusted pros.\n\n[Leave a Review]\n{{review_url}}\n\nThank you for using ProLnk!\n\nBest,\nThe ProLnk Team",
    delay: "24 hrs",
    variables: ["homeowner_name", "issue_type", "receiving_partner", "review_url"],
  },
  {
    id: "t7",
    trigger: "Job Closed",
    channel: "in_app",
    recipient: "field_partner",
    body: "💰 Commission earned! The {{issue_type}} job at {{homeowner_address}} was closed. Your commission of ${{commission_amount}} has been added to your ledger.",
    delay: "Instant",
    variables: ["issue_type", "homeowner_address", "commission_amount"],
  },
  {
    id: "t8",
    trigger: "Deal Expires (No Response)",
    channel: "sms",
    recipient: "homeowner",
    body: "Hi {{homeowner_name}}, your ProLnk offer for {{issue_type}} expires today! Tap to claim your partner-rate estimate before it's gone: {{deal_url}}",
    delay: "47 hrs",
    variables: ["homeowner_name", "issue_type", "deal_url"],
  },
];

// ─── Channel Icons ─────────────────────────────────────────────────────────────
const CHANNEL_CONFIG: Record<Channel, { icon: typeof Mail; label: string; color: string; bg: string }> = {
  sms:    { icon: MessageSquare, label: "SMS",    color: "#10B981", bg: "#ECFDF5" },
  email:  { icon: Mail,          label: "Email",  color: "#3B82F6", bg: "#EFF6FF" },
  in_app: { icon: Bell,          label: "In-App", color: "#8B5CF6", bg: "#F5F3FF" },
};

const RECIPIENT_CONFIG: Record<Recipient, { icon: typeof User; label: string; color: string }> = {
  homeowner:          { icon: Home,      label: "Homeowner",         color: "#F59E0B" },
  field_partner:      { icon: User,      label: "Field Partner",     color: "#3B82F6" },
  receiving_partner:  { icon: Briefcase, label: "Receiving Partner", color: "#8B5CF6" },
  admin:              { icon: Sparkles,  label: "Admin",             color: "#EF4444" },
};

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({
  template,
  onEdit,
}: {
  template: MessageTemplate;
  onEdit: (t: MessageTemplate) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const ch = CHANNEL_CONFIG[template.channel];
  const rec = RECIPIENT_CONFIG[template.recipient];
  const ChIcon = ch.icon;
  const RecIcon = rec.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-3 flex items-start gap-3">
        {/* Channel badge */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: ch.bg }}>
          <ChIcon className="w-4 h-4" style={{ color: ch.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-gray-700">{template.trigger}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: ch.bg, color: ch.color }}>
              {ch.label}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500 flex items-center gap-1">
              <RecIcon className="w-2.5 h-2.5" />
              {rec.label}
            </span>
            <span className="text-xs text-gray-300 ml-auto flex items-center gap-1">
              <Clock className="w-3 h-3" />{template.delay}
            </span>
          </div>
          {template.subject && (
            <p className="text-xs font-semibold text-gray-600 mb-1 truncate">📧 {template.subject}</p>
          )}
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{template.body}</p>
        </div>
      </div>

      <div className="px-3 pb-3 flex items-center gap-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? "Collapse" : "Preview"}
        </button>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => { navigator.clipboard.writeText(template.body); toast.success("Template copied!"); }}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            onClick={() => onEdit(template)}
            className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-3 pb-3 border-t border-gray-50 pt-3">
          <pre className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed bg-gray-50 rounded-lg p-3 font-mono">
            {template.body}
          </pre>
          {template.variables.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {template.variables.map(v => (
                <span key={v} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-mono">
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Template Editor Modal ────────────────────────────────────────────────────
function TemplateEditor({
  template,
  onClose,
  onSave,
}: {
  template: MessageTemplate;
  onClose: () => void;
  onSave: (t: MessageTemplate) => void;
}) {
  const [body, setBody] = useState(template.body);
  const [subject, setSubject] = useState(template.subject || "");
  const [delay, setDelay] = useState(template.delay);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-base font-bold text-gray-900">Edit Template</h3>
            <p className="text-xs text-gray-400 mt-0.5">{template.trigger} · {CHANNEL_CONFIG[template.channel].label} → {RECIPIENT_CONFIG[template.recipient].label}</p>
          </div>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {template.channel === "email" && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Subject Line</label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Message Body</label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00B5B8] font-mono"
              rows={12}
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Send Delay</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
              value={delay}
              onChange={e => setDelay(e.target.value)}
              placeholder="e.g. Instant, 2 min, 24 hrs"
            />
          </div>
          {/* Variable reference */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Available Variables</label>
            <div className="flex flex-wrap gap-1.5">
              {template.variables.map(v => (
                <button
                  key={v}
                  onClick={() => setBody(b => b + `{{${v}}}`)}
                  className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-mono hover:bg-amber-100"
                >
                  {`{{${v}}}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">Cancel</button>
          <Button
            className="text-white gap-2"
            style={{ backgroundColor: "#0A1628" }}
            onClick={() => { onSave({ ...template, body, subject: subject || undefined, delay }); toast.success("Template saved!"); onClose(); }}
          >
            <Save className="w-4 h-4" /> Save Template
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Deal Comms Log ───────────────────────────────────────────────────────────
function DealCommsLog() {
  const { data, isLoading } = trpc.deals.listDeals.useQuery({ limit: 50, offset: 0 });
  const [search, setSearch] = useState("");

  const deals = (data?.deals || []).filter((d: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (d.homeownerName || "").toLowerCase().includes(q) ||
      (d.issueType || "").toLowerCase().includes(q) ||
      (d.receivingPartnerName || "").toLowerCase().includes(q)
    );
  });

  const sentDeals = deals.filter((d: any) => d.emailSentAt || d.smsSentAt);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5B8]"
          placeholder="Search by homeowner, issue type, or partner..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 rounded-full border-4 border-[#00B5B8] border-t-transparent animate-spin mx-auto" />
        </div>
      ) : sentDeals.length === 0 ? (
        <div className="text-center py-12 text-gray-300">
          <Send className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">No messages sent yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sentDeals.map((deal: any) => (
            <div key={deal.id} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{deal.homeownerName || "Unknown"}</p>
                  <p className="text-xs text-gray-400 truncate">{deal.issueType}</p>
                </div>
                <Badge className={`text-xs flex-shrink-0 ${
                  deal.status === "job_closed" ? "bg-teal-100 text-teal-700" :
                  deal.status === "scheduled" ? "bg-green-100 text-green-700" :
                  deal.status === "viewed" ? "bg-purple-100 text-purple-700" :
                  deal.status === "sent" ? "bg-blue-100 text-blue-700" :
                  "bg-gray-100 text-gray-600"
                } border-0`}>
                  {deal.status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {deal.emailSentAt && (
                  <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    <Mail className="w-3 h-3" />
                    Email · {new Date(deal.emailSentAt).toLocaleDateString()}
                  </div>
                )}
                {deal.smsSentAt && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <MessageSquare className="w-3 h-3" />
                    SMS · {new Date(deal.smsSentAt).toLocaleDateString()}
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                  <Eye className="w-3 h-3" />{deal.viewCount || 0} views
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={`/job/${deal.token}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#00B5B8] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> View Deal Page
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CommsTimeline() {
  const [activeTab, setActiveTab] = useState<"templates" | "log">("templates");
  const [templates, setTemplates] = useState<MessageTemplate[]>(DEFAULT_TEMPLATES);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [filterChannel, setFilterChannel] = useState<Channel | "all">("all");
  const [filterRecipient, setFilterRecipient] = useState<Recipient | "all">("all");

  const filteredTemplates = templates.filter(t => {
    if (filterChannel !== "all" && t.channel !== filterChannel) return false;
    if (filterRecipient !== "all" && t.recipient !== filterRecipient) return false;
    return true;
  });

  // Group templates by trigger
  const byTrigger: Record<string, MessageTemplate[]> = {};
  filteredTemplates.forEach(t => {
    if (!byTrigger[t.trigger]) byTrigger[t.trigger] = [];
    byTrigger[t.trigger].push(t);
  });

  return (
    <AdminLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#0A1628]">Comms Timeline</h1>
              <p className="text-sm text-gray-500 mt-0.5">Every message ProLnk sends — templates, triggers, and delivery log</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Templates", value: templates.length, color: "#0A1628" },
              { label: "SMS Templates", value: templates.filter(t => t.channel === "sms").length, color: "#10B981" },
              { label: "Email Templates", value: templates.filter(t => t.channel === "email").length, color: "#3B82F6" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-lg font-bold mt-0.5" style={{ color }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {(["templates", "log"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize"
                style={{
                  backgroundColor: activeTab === tab ? "#fff" : "transparent",
                  color: activeTab === tab ? "#0A1628" : "#9CA3AF",
                  boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {tab === "templates" ? "Message Templates" : "Delivery Log"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === "templates" ? (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-xs text-gray-400">Channel:</span>
                  {(["all", "sms", "email", "in_app"] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setFilterChannel(c)}
                      className="text-xs px-2.5 py-1 rounded-full border transition-all"
                      style={{
                        backgroundColor: filterChannel === c ? "#0A1628" : "transparent",
                        color: filterChannel === c ? "#fff" : "#6B7280",
                        borderColor: filterChannel === c ? "#0A1628" : "#E5E7EB",
                      }}
                    >
                      {c === "all" ? "All" : c === "in_app" ? "In-App" : c.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-xs text-gray-400">To:</span>
                  {(["all", "homeowner", "field_partner", "receiving_partner"] as const).map(r => (
                    <button
                      key={r}
                      onClick={() => setFilterRecipient(r)}
                      className="text-xs px-2.5 py-1 rounded-full border transition-all capitalize"
                      style={{
                        backgroundColor: filterRecipient === r ? "#0A1628" : "transparent",
                        color: filterRecipient === r ? "#fff" : "#6B7280",
                        borderColor: filterRecipient === r ? "#0A1628" : "#E5E7EB",
                      }}
                    >
                      {r === "all" ? "All" : r.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grouped by trigger */}
              {Object.entries(byTrigger).map(([trigger, msgs]) => (
                <div key={trigger}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#00B5B8]" />
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{trigger}</span>
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-300">{msgs.length} message{msgs.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="space-y-2 pl-4">
                    {msgs.map(t => (
                      <TemplateCard key={t.id} template={t} onEdit={setEditingTemplate} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <DealCommsLog />
          )}
        </div>
      </div>

      {editingTemplate && (
        <TemplateEditor
          template={editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onSave={updated => {
            setTemplates(prev => prev.map(t => t.id === updated.id ? updated : t));
          }}
        />
      )}
    </AdminLayout>
  );
}
