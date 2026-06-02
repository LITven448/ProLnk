import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Mail,
  MessageSquare,
  Bell,
  Eye,
  Edit3,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  Send,
  Variable,
  BarChart2,
  Clock,
  TrendingUp,
  X,
  Check,
} from "lucide-react";

type TemplateType = "Email" | "SMS" | "Email+SMS" | "Push";
type TemplateCategory =
  | "Welcome"
  | "Storm Alerts"
  | "Lead Notifications"
  | "Payment"
  | "Partner"
  | "Homeowner"
  | "Weekly Digest";

interface Template {
  id: string;
  name: string;
  type: TemplateType;
  category: TemplateCategory;
  lastUsed: string;
  openRate?: number;
  ctr?: number;
  subject: string;
  body: string;
  variables: string[];
  active: boolean;
}

const TEMPLATES: Template[] = [
  {
    id: "t1",
    name: "Welcome, New Partner!",
    type: "Email",
    category: "Welcome",
    lastUsed: "3 hours ago",
    openRate: 84,
    subject: "Welcome to ProLnk, {{partner_name}}! You're in.",
    body: "Hi {{partner_name}},\n\nYou're officially part of the ProLnk network. Your account is ready and your first leads are waiting.\n\nYour referral link: {{referral_link}}\n\nLog in now to complete your profile and start earning.\n\n— The ProLnk Team",
    variables: ["{{partner_name}}", "{{referral_link}}", "{{login_url}}"],
    active: true,
  },
  {
    id: "t2",
    name: "New Lead Available – Urgent!",
    type: "SMS",
    category: "Lead Notifications",
    lastUsed: "12 minutes ago",
    ctr: 94,
    subject: "",
    body: "ProLnk: New {{trade}} lead in {{city}}! Homeowner needs help ASAP. Claim it now: {{lead_url}}",
    variables: ["{{trade}}", "{{city}}", "{{lead_url}}", "{{homeowner_name}}"],
    active: true,
  },
  {
    id: "t3",
    name: "Storm Alert – Action Required",
    type: "Email+SMS",
    category: "Storm Alerts",
    lastUsed: "2 days ago",
    openRate: 91,
    subject: "⚠️ Storm Alert for {{zip_code}} – New leads incoming",
    body: "Hi {{partner_name}},\n\nA {{storm_type}} has been detected near {{city}}. Homeowners in your area need immediate help with {{affected_services}}.\n\n{{lead_count}} new leads are available. Act fast – leads in storm zones fill within hours.\n\nClaim leads: {{leads_url}}",
    variables: ["{{partner_name}}", "{{storm_type}}", "{{city}}", "{{zip_code}}", "{{lead_count}}", "{{affected_services}}", "{{leads_url}}"],
    active: true,
  },
  {
    id: "t4",
    name: "Payment Confirmed",
    type: "Email",
    category: "Payment",
    lastUsed: "1 hour ago",
    openRate: 78,
    subject: "Payment of {{amount}} sent to {{payment_method}}",
    body: "Hi {{partner_name}},\n\nYour payment of {{amount}} has been processed and sent to {{payment_method}}.\n\nTransaction ID: {{transaction_id}}\nDate: {{payment_date}}\n\nView your full earnings history in your dashboard: {{dashboard_url}}",
    variables: ["{{partner_name}}", "{{amount}}", "{{payment_method}}", "{{transaction_id}}", "{{payment_date}}", "{{dashboard_url}}"],
    active: true,
  },
  {
    id: "t5",
    name: "Your Commission is Ready",
    type: "SMS",
    category: "Payment",
    lastUsed: "6 hours ago",
    ctr: 88,
    subject: "",
    body: "ProLnk: {{amount}} commission is ready for payout. Confirm your bank details to receive funds: {{payout_url}}",
    variables: ["{{amount}}", "{{payout_url}}", "{{partner_name}}"],
    active: true,
  },
  {
    id: "t6",
    name: "Weekly Performance Digest",
    type: "Email",
    category: "Weekly Digest",
    lastUsed: "5 days ago",
    openRate: 72,
    subject: "Your ProLnk Week in Review – {{week_dates}}",
    body: "Hi {{partner_name}},\n\nHere's your performance summary for {{week_dates}}:\n\n• Leads received: {{leads_count}}\n• Jobs completed: {{jobs_count}}\n• Commission earned: {{commission_earned}}\n• Network growth: {{new_referrals}} new referrals\n\nYour overall tier: {{tier_name}}\nProgress to next tier: {{tier_progress}}%\n\nKeep it up — {{motivational_line}}",
    variables: ["{{partner_name}}", "{{week_dates}}", "{{leads_count}}", "{{jobs_count}}", "{{commission_earned}}", "{{new_referrals}}", "{{tier_name}}", "{{tier_progress}}", "{{motivational_line}}"],
    active: true,
  },
  {
    id: "t7",
    name: "Complete Your Profile",
    type: "Email",
    category: "Partner",
    lastUsed: "8 hours ago",
    openRate: 61,
    subject: "{{partner_name}}, your profile is {{completion_pct}}% complete",
    body: "Hi {{partner_name}},\n\nPartners with complete profiles receive {{multiplier}}x more leads. You're at {{completion_pct}}% — here's what's missing:\n\n{{missing_items}}\n\nComplete your profile in 2 minutes: {{profile_url}}",
    variables: ["{{partner_name}}", "{{completion_pct}}", "{{multiplier}}", "{{missing_items}}", "{{profile_url}}"],
    active: false,
  },
  {
    id: "t8",
    name: "A Homeowner Rated You ★★★★★",
    type: "Email",
    category: "Homeowner",
    lastUsed: "4 hours ago",
    openRate: 79,
    subject: "{{homeowner_name}} left you a 5-star review!",
    body: "Congratulations, {{partner_name}}!\n\n{{homeowner_name}} just left you a 5-star review for your work on {{job_type}} at {{address}}.\n\nThey said: \"{{review_text}}\"\n\nGreat reviews drive more leads your way. Share this milestone: {{share_url}}",
    variables: ["{{partner_name}}", "{{homeowner_name}}", "{{job_type}}", "{{address}}", "{{review_text}}", "{{share_url}}"],
    active: true,
  },
];

const CATEGORIES: TemplateCategory[] = [
  "Welcome",
  "Storm Alerts",
  "Lead Notifications",
  "Payment",
  "Partner",
  "Homeowner",
  "Weekly Digest",
];

function TypeBadge({ type }: { type: TemplateType }) {
  const styles: Record<TemplateType, string> = {
    Email: "bg-blue-900/40 text-teal-700 border-blue-700/40",
    SMS: "bg-green-900/40 text-green-300 border-green-700/40",
    "Email+SMS": "bg-purple-900/40 text-gray-600 border-purple-700/40",
    Push: "bg-orange-900/40 text-orange-300 border-orange-700/40",
  };
  const icons: Record<TemplateType, typeof Mail> = {
    Email: Mail,
    SMS: MessageSquare,
    "Email+SMS": Mail,
    Push: Bell,
  };
  const Icon = icons[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[type]}`}>
      <Icon className="w-3 h-3" />
      {type}
    </span>
  );
}

function TemplateCard({
  template,
  onEdit,
  onToggle,
  onPreview,
}: {
  template: Template;
  onEdit: (id: string) => void;
  onToggle: (id: string) => void;
  onPreview: (id: string) => void;
}) {
  return (
    <div className={`bg-white border rounded-xl p-5 transition-all ${template.active ? "border-gray-200" : "border-gray-200/30 opacity-60"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{template.name}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <TypeBadge type={template.type} />
          </div>
        </div>
        <button
          onClick={() => onToggle(template.id)}
          className="shrink-0 text-gray-500 hover:text-teal-700 transition-colors"
          title={template.active ? "Pause template" : "Activate template"}
        >
          {template.active ? (
            <ToggleRight className="w-6 h-6 text-teal-700" />
          ) : (
            <ToggleLeft className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{template.lastUsed}</span>
        </div>
        {template.openRate !== undefined && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>{template.openRate}% open rate</span>
          </div>
        )}
        {template.ctr !== undefined && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>{template.ctr}% CTR</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPreview(template.id)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </button>
        <button
          onClick={() => onEdit(template.id)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-teal-500/20 text-teal-700 hover:bg-teal-500/30 border border-teal-500/30 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit
        </button>
      </div>
    </div>
  );
}

function InlineEditor({
  template,
  onClose,
  onSave,
}: {
  template: Template;
  onClose: () => void;
  onSave: (id: string, subject: string, body: string) => void;
}) {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const [testSent, setTestSent] = useState(false);

  function handleSendTest() {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  }

  return (
    <div className="bg-white border border-teal-500/30 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-teal-700" />
          <h3 className="font-bold text-gray-900">{template.name}</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {template.type !== "SMS" && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Subject Line</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="Email subject..."
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors resize-none font-mono"
          placeholder="Template body..."
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Available Variables</label>
        <div className="flex flex-wrap gap-2">
          {template.variables.map((v) => (
            <span
              key={v}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-100 text-teal-700 font-mono border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setBody((prev) => prev + v)}
              title="Click to insert"
            >
              <Variable className="w-3 h-3" />
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleSendTest}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
        >
          {testSent ? <Check className="w-4 h-4 text-green-700" /> : <Send className="w-4 h-4" />}
          {testSent ? "Test Sent!" : "Send Test"}
        </button>
        <button
          onClick={() => onSave(template.id, subject, body)}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-teal-500 text-[#F8FAFC] hover:bg-teal-400 transition-colors"
        >
          <Check className="w-4 h-4" />
          Save Template
        </button>
        <button onClick={onClose} className="ml-auto text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

function PreviewModal({ template, onClose }: { template: Template; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="font-bold text-gray-900 text-sm">{template.name}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {template.type !== "SMS" && template.subject && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subject</p>
              <p className="text-sm font-semibold text-gray-900">{template.subject}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Body</p>
            <div className="bg-white rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-mono">
              {template.body}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <TypeBadge type={template.type} />
            {template.openRate !== undefined && (
              <span className="text-xs text-emerald-400">{template.openRate}% open rate</span>
            )}
            {template.ctr !== undefined && (
              <span className="text-xs text-emerald-400">{template.ctr}% CTR</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmailTemplateLibrary() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | "All">("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>(TEMPLATES);

  const filtered =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  function handleToggle(id: string) {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  }

  function handleSave(id: string, subject: string, body: string) {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, subject, body } : t))
    );
    setEditingId(null);
  }

  const avgOpenRate = Math.round(
    templates
      .filter((t) => t.openRate !== undefined)
      .reduce((s, t) => s + (t.openRate ?? 0), 0) /
      templates.filter((t) => t.openRate !== undefined).length
  );

  const editingTemplate = templates.find((t) => t.id === editingId) ?? null;
  const previewTemplate = templates.find((t) => t.id === previewId) ?? null;

  return (
    <AdminLayout>
      {previewTemplate && (
        <PreviewModal template={previewTemplate} onClose={() => setPreviewId(null)} />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Template Library</h1>
              <p className="text-sm text-gray-500">Every message your platform sends</p>
            </div>
          </div>

          {/* Benchmark stat */}
          <div className="hidden sm:flex items-center gap-2 bg-emerald-900/20 border border-emerald-700/30 rounded-xl px-4 py-3">
            <BarChart2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-300">
              Your emails average <strong className="text-emerald-200">{avgOpenRate}% open rate</strong>
              {" "}vs industry avg{" "}
              <strong className="text-emerald-200">28%</strong>
            </p>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {(["All", ...CATEGORIES] as (TemplateCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-teal-500 text-[#F8FAFC]"
                  : "bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inline editor (if open) */}
        {editingTemplate && (
          <InlineEditor
            template={editingTemplate}
            onClose={() => setEditingId(null)}
            onSave={handleSave}
          />
        )}

        {/* Template cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={(id) => {
                setEditingId((prev) => (prev === id ? null : id));
                setPreviewId(null);
              }}
              onToggle={handleToggle}
              onPreview={(id) => {
                setPreviewId(id);
                setEditingId(null);
              }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center">
            <Mail className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No templates in this category yet.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
