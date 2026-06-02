import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Zap, Plus, Trash2, Mail, Bell, Webhook, UserPlus, Star, CloudLightning,
  Wrench, Camera, TrendingDown, BarChart3, AlertTriangle, Clock, CheckCircle,
  ChevronRight, Play, History, Settings2, Filter, X, ArrowRight
} from "lucide-react";

const TRIGGER_ICONS: Record<string, any> = {
  new_signup: UserPlus, referral_milestone: Star, photo_uploaded: Camera,
  analysis_complete: CheckCircle, score_below_threshold: TrendingDown,
  storm_detected: CloudLightning, maintenance_due: Wrench,
  commission_earned: BarChart3, review_received: Star,
  partner_inactive: AlertTriangle, homeowner_inactive: AlertTriangle,
  property_anniversary: Clock, seasonal_change: Settings2,
  new_lead: Zap, payment_failed: AlertTriangle,
};

const TRIGGER_LABELS: Record<string, string> = {
  new_signup: "New Signup", referral_milestone: "Referral Milestone",
  photo_uploaded: "Photo Uploaded", analysis_complete: "Analysis Complete",
  score_below_threshold: "Score Below Threshold", storm_detected: "Storm Detected",
  maintenance_due: "Maintenance Due", commission_earned: "Commission Earned",
  review_received: "Review Received", partner_inactive: "Partner Inactive",
  homeowner_inactive: "Homeowner Inactive", property_anniversary: "Property Anniversary",
  seasonal_change: "Seasonal Change", new_lead: "New Lead", payment_failed: "Payment Failed",
};

const ACTION_LABELS: Record<string, string> = {
  send_email: "Send Email", send_sms: "Send SMS", send_notification: "Send Notification",
  assign_task: "Assign Task", create_lead: "Create Lead", update_score: "Update Score",
  trigger_webhook: "Trigger Webhook", notify_admin: "Notify Admin",
  schedule_followup: "Schedule Follow-Up", award_points: "Award Points", flag_for_review: "Flag for Review",
};

const ACTION_ICONS: Record<string, any> = {
  send_email: Mail, send_sms: Bell, send_notification: Bell, assign_task: CheckCircle,
  create_lead: UserPlus, update_score: BarChart3, trigger_webhook: Webhook,
  notify_admin: AlertTriangle, schedule_followup: Clock, award_points: Star, flag_for_review: AlertTriangle,
};

const CONDITION_FIELDS: Record<string, string[]> = {
  new_signup: ["trade_type", "service_area", "tier", "referral_code"],
  new_lead: ["lead_score", "service_type", "radius_mi", "job_value"],
  score_below_threshold: ["score", "score_type", "days_since_update"],
  storm_detected: ["wind_speed_mph", "hail_size_in", "zip_code"],
  payment_failed: ["amount", "attempt_count", "failure_reason"],
  partner_inactive: ["days_inactive", "tier", "last_login_days"],
};

const OPERATORS = ["equals", "not equals", "greater than", "less than", "contains", "is empty", "is not empty"];

const EXECUTION_HISTORY = [
  { id: "exec_001", ruleName: "Auto-Route High-Score Leads", trigger: "new_lead", action: "send_notification", status: "success", ranAt: "May 14, 9:42am", target: "Rivera HVAC" },
  { id: "exec_002", ruleName: "Storm Alert Blast", trigger: "storm_detected", action: "send_email", status: "success", ranAt: "May 13, 11:20pm", target: "847 partners" },
  { id: "exec_003", ruleName: "Inactive Partner Nudge", trigger: "partner_inactive", action: "send_email", status: "success", ranAt: "May 13, 8:00am", target: "12 partners" },
  { id: "exec_004", ruleName: "Commission Milestone Reward", trigger: "commission_earned", action: "award_points", status: "failed", ranAt: "May 12, 3:15pm", target: "Chen Plumbing" },
  { id: "exec_005", ruleName: "Maintenance Due Reminder", trigger: "maintenance_due", action: "send_sms", status: "success", ranAt: "May 12, 9:00am", target: "234 homeowners" },
  { id: "exec_006", ruleName: "Payment Retry Notification", trigger: "payment_failed", action: "notify_admin", status: "success", ranAt: "May 12, 7:44am", target: "Admin" },
];

const MOCK_RULES = [
  { id: 1, name: "Auto-Route High-Score Leads", description: "When lead score > 80, auto-send to HVAC pros within 15mi", triggerType: "new_lead", conditionField: "lead_score", conditionOp: "greater than", conditionValue: "80", actionType: "send_notification", isActive: true, executionCount: 142, lastRun: "9 min ago" },
  { id: 2, name: "Storm Alert Blast", description: "When storm detected with wind > 50mph, email all roofing partners in affected zip", triggerType: "storm_detected", conditionField: "wind_speed_mph", conditionOp: "greater than", conditionValue: "50", actionType: "send_email", isActive: true, executionCount: 8, lastRun: "Yesterday" },
  { id: 3, name: "Inactive Partner Nudge", description: "Partners with no activity in 7+ days get a re-engagement email", triggerType: "partner_inactive", conditionField: "days_inactive", conditionOp: "greater than", conditionValue: "7", actionType: "send_email", isActive: true, executionCount: 67, lastRun: "Today 8am" },
  { id: 4, name: "Commission Milestone Award", description: "Award bonus points when partner earns first $1,000 commission", triggerType: "commission_earned", conditionField: "amount", conditionOp: "greater than", conditionValue: "1000", actionType: "award_points", isActive: false, executionCount: 23, lastRun: "3 days ago" },
  { id: 5, name: "Payment Failure Alert", description: "Notify admin immediately when any payment fails more than 2 times", triggerType: "payment_failed", conditionField: "attempt_count", conditionOp: "greater than", conditionValue: "2", actionType: "notify_admin", isActive: true, executionCount: 4, lastRun: "2 days ago" },
];

type Tab = "rules" | "history" | "templates";

const EMPTY_RULE = {
  name: "", description: "", triggerType: "new_lead",
  conditionField: "lead_score", conditionOp: "greater than", conditionValue: "",
  actionType: "send_notification", actionConfigJson: "", isActive: true,
};

export default function AutomationRulesEngine() {
  const [activeTab, setActiveTab] = useState<Tab>("rules");
  const [showCreate, setShowCreate] = useState(false);
  const [filterTrigger, setFilterTrigger] = useState("all");
  const [newRule, setNewRule] = useState({ ...EMPTY_RULE });
  const [rules, setRules] = useState(MOCK_RULES);
  const [testing, setTesting] = useState<number | null>(null);

  const rulesQuery = trpc.automationRules.list.useQuery({ activeOnly: false, triggerType: filterTrigger !== "all" ? filterTrigger as any : undefined });
  const statsQuery = trpc.automationRules.getStats.useQuery();
  const templatesQuery = trpc.automationRules.getTemplates.useQuery();

  const createMutation = trpc.automationRules.create.useMutation({
    onSuccess: () => {
      toast.success("Automation rule created");
      rulesQuery.refetch();
      statsQuery.refetch();
      setShowCreate(false);
      setNewRule({ ...EMPTY_RULE });
    },
  });
  const toggleMutation = trpc.automationRules.toggle.useMutation({ onSuccess: () => { rulesQuery.refetch(); statsQuery.refetch(); } });
  const deleteMutation = trpc.automationRules.delete.useMutation({
    onSuccess: () => { toast.success("Rule deleted"); rulesQuery.refetch(); statsQuery.refetch(); },
  });

  const displayRules = (rulesQuery.data?.length ? rulesQuery.data : rules).filter(
    r => filterTrigger === "all" || r.triggerType === filterTrigger
  );
  const stats = statsQuery.data ?? { total: rules.length, active: rules.filter(r => r.isActive).length, totalExecutions: rules.reduce((s, r) => s + r.executionCount, 0) };
  const templates = templatesQuery.data ?? [];

  const toggleLocalRule = (id: number) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
    if (rulesQuery.data?.length) toggleMutation.mutate({ id } as any);
    toast.success("Rule updated");
  };

  const createRule = () => {
    if (!newRule.name) { toast.error("Rule name is required"); return; }
    if (!newRule.conditionValue) { toast.error("Condition value is required"); return; }
    if (rulesQuery.data?.length) {
      createMutation.mutate({
        name: newRule.name, description: newRule.description,
        triggerType: newRule.triggerType as any, actionType: newRule.actionType as any,
        conditionJson: JSON.stringify({ field: newRule.conditionField, op: newRule.conditionOp, value: newRule.conditionValue }),
        actionConfigJson: newRule.actionConfigJson || "{}",
        isActive: newRule.isActive,
      });
    } else {
      setRules(prev => [...prev, { id: Date.now(), name: newRule.name, description: newRule.description, triggerType: newRule.triggerType, conditionField: newRule.conditionField, conditionOp: newRule.conditionOp, conditionValue: newRule.conditionValue, actionType: newRule.actionType, isActive: newRule.isActive, executionCount: 0, lastRun: "Never" }]);
      toast.success("Rule created");
      setShowCreate(false);
      setNewRule({ ...EMPTY_RULE });
    }
  };

  const conditionFields = CONDITION_FIELDS[newRule.triggerType] ?? ["value", "count", "score"];

  return (
    <AdminLayout title="Automation Rules Engine" subtitle="Event-driven rules that run automatically across the platform">

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Rules", value: stats?.total || rules.length, color: "text-gray-900" },
          { label: "Active", value: stats?.active || rules.filter(r => r.isActive).length, color: "text-teal-700" },
          { label: "Total Executions", value: (stats?.totalExecutions || rules.reduce((s, r) => s + r.executionCount, 0)).toLocaleString(), color: "text-amber-700" },
          { label: "Avg Daily Runs", value: Math.round((stats?.totalExecutions || 244) / 30), color: "text-gray-600" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-white/10 p-4 bg-[#0D1F3C]">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Create */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 bg-[#0D1F3C] rounded-xl p-1 border border-white/10">
          {(["rules", "history", "templates"] as Tab[]).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`text-xs font-medium py-2 px-4 rounded-lg capitalize transition-all ${activeTab === t ? "bg-teal-500/20 text-teal-700" : "text-gray-500 hover:text-gray-900"}`}>
              {t === "history" ? "Execution History" : t === "templates" ? "Templates" : "Active Rules"}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2 text-sm bg-teal-600 hover:bg-teal-700 text-gray-900">
          <Plus className="w-4 h-4" /> New Rule
        </Button>
      </div>

      {activeTab === "rules" && (
        <div className="space-y-3">
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterTrigger}
              onChange={e => setFilterTrigger(e.target.value)}
              className="border border-white/10 rounded-lg px-3 py-1.5 text-xs bg-[#0D1F3C] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Triggers</option>
              {Object.entries(TRIGGER_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <span className="text-xs text-gray-500">{displayRules.length} rules</span>
          </div>

          {displayRules.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#0D1F3C] p-12 text-center">
              <Zap className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No automation rules yet</h3>
              <p className="text-gray-500 mb-4">Create your first rule or start from a template</p>
              <Button onClick={() => setShowCreate(true)} className="bg-teal-600 hover:bg-teal-700 text-gray-900">
                <Plus className="w-4 h-4 mr-2" /> Create Rule
              </Button>
            </div>
          ) : (
            displayRules.map((rule: any) => {
              const TriggerIcon = TRIGGER_ICONS[rule.triggerType] || Zap;
              const ActionIcon = ACTION_ICONS[rule.actionType] || Zap;
              return (
                <div key={rule.id} className={`rounded-xl border ${rule.isActive ? "border-white/10" : "border-white/5 opacity-60"} bg-[#0D1F3C] p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${rule.isActive ? "bg-teal-500/20" : "bg-gray-100/50"}`}>
                        <TriggerIcon className={`w-5 h-5 ${rule.isActive ? "text-teal-700" : "text-gray-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-medium text-gray-900 text-sm truncate">{rule.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${rule.isActive ? "bg-teal-500/20 text-teal-700" : "bg-slate-500/20 text-gray-500"}`}>
                            {rule.isActive ? "Active" : "Paused"}
                          </span>
                        </div>
                        {rule.description && <p className="text-xs text-gray-500 truncate">{rule.description}</p>}
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <TriggerIcon className="w-3 h-3" /> {TRIGGER_LABELS[rule.triggerType] || rule.triggerType}
                          </span>
                          {(rule.conditionField || rule.conditionValue) && (
                            <>
                              <ChevronRight className="w-3 h-3" />
                              <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-gray-500">
                                {rule.conditionField} {rule.conditionOp} {rule.conditionValue}
                              </span>
                            </>
                          )}
                          <ChevronRight className="w-3 h-3" />
                          <span className="flex items-center gap-1">
                            <ActionIcon className="w-3 h-3" /> {ACTION_LABELS[rule.actionType] || rule.actionType}
                          </span>
                          <span className="text-gray-400">·</span>
                          <span>{rule.executionCount || 0} runs</span>
                          {rule.lastRun && <><span className="text-gray-400">·</span><span>Last: {rule.lastRun}</span></>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-gray-500 hover:text-gray-900 hover:bg-white/5 gap-1"
                        disabled={testing === rule.id}
                        onClick={() => {
                          setTesting(rule.id);
                          setTimeout(() => { setTesting(null); toast.success(`Test run completed for "${rule.name}"`); }, 1200);
                        }}
                      >
                        <Play className="w-3 h-3" /> {testing === rule.id ? "Running..." : "Test"}
                      </Button>
                      <Switch
                        checked={rule.isActive || false}
                        onCheckedChange={() => toggleLocalRule(rule.id)}
                        className="data-[state=checked]:bg-teal-600"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => {
                          setRules(prev => prev.filter(r => r.id !== rule.id));
                          if (rulesQuery.data?.length) deleteMutation.mutate({ id: rule.id } as any);
                          toast.success("Rule deleted");
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div className="rounded-xl border border-white/10 bg-[#0D1F3C]">
          <div className="p-4 border-b border-white/10 flex items-center gap-2">
            <History className="w-4 h-4 text-teal-700" />
            <h3 className="font-bold text-gray-900 text-sm">Execution History</h3>
            <span className="text-xs text-gray-500 ml-auto">Last 50 runs</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Rule", "Trigger", "Action", "Target", "Status", "Run At"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXECUTION_HISTORY.map(e => {
                  const TriggerIcon = TRIGGER_ICONS[e.trigger] || Zap;
                  const ActionIcon = ACTION_ICONS[e.action] || Zap;
                  return (
                    <tr key={e.id} className="border-b border-white/5 hover:bg-white/2">
                      <td className="px-4 py-3 font-medium text-gray-900 text-xs">{e.ruleName}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <TriggerIcon className="w-3 h-3" /> {TRIGGER_LABELS[e.trigger]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <ActionIcon className="w-3 h-3" /> {ACTION_LABELS[e.action]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{e.target}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${e.status === "success" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-600"}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{e.ranAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">Pre-built automation templates. Click any to create a rule from it.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "High-Score Lead Auto-Route", desc: "Auto-notify matching pros within 15mi when lead score exceeds threshold", trigger: "new_lead", action: "send_notification", condition: "lead_score > 80" },
              { name: "Storm Season Blast", desc: "Email all roofing and gutter pros when a storm is detected in their service area", trigger: "storm_detected", action: "send_email", condition: "wind_speed > 45mph" },
              { name: "7-Day Inactive Partner", desc: "Re-engagement email for partners who haven't logged in for 7 days", trigger: "partner_inactive", action: "send_email", condition: "days_inactive > 7" },
              { name: "Referral Milestone Congrats", desc: "Award bonus points and send SMS when a partner hits 10 referrals", trigger: "referral_milestone", action: "send_sms", condition: "milestone = 10" },
              { name: "Payment Failure Escalation", desc: "Alert admin and notify partner when payment fails 2+ times", trigger: "payment_failed", action: "notify_admin", condition: "attempt_count >= 2" },
              { name: "Maintenance Due Reminder", desc: "Send homeowner reminder when annual HVAC maintenance window opens", trigger: "maintenance_due", action: "send_sms", condition: "days_since > 330" },
            ].map((t, i) => {
              const TriggerIcon = TRIGGER_ICONS[t.trigger] || Zap;
              const ActionIcon = ACTION_ICONS[t.action] || Zap;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-[#0D1F3C] p-4 hover:border-teal-500/40 cursor-pointer transition-colors group"
                  onClick={() => {
                    setNewRule({ ...EMPTY_RULE, name: t.name, description: t.desc, triggerType: t.trigger, actionType: t.action });
                    setShowCreate(true);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/20 flex-shrink-0">
                      <TriggerIcon className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm group-hover:text-teal-700 transition-colors">{t.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><TriggerIcon className="w-3 h-3" /> {TRIGGER_LABELS[t.trigger]}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span className="flex items-center gap-1"><ActionIcon className="w-3 h-3" /> {ACTION_LABELS[t.action]}</span>
                      </div>
                      <div className="mt-1.5 font-mono text-xs bg-white/5 px-2 py-1 rounded text-gray-500 inline-block">{t.condition}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            {templates.map((template: any, i: number) => {
              const TriggerIcon = TRIGGER_ICONS[template.triggerType] || Zap;
              return (
                <div key={`db-${i}`} className="rounded-xl border border-white/10 bg-[#0D1F3C] p-4 hover:border-teal-500/40 cursor-pointer transition-colors group"
                  onClick={() => { setNewRule({ ...EMPTY_RULE, name: template.name, description: template.description, triggerType: template.triggerType, actionType: template.actionType }); setShowCreate(true); }}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/20"><TriggerIcon className="w-5 h-5 text-teal-700" /></div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{template.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Rule Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="rounded-2xl border border-white/10 bg-[#0D1F3C] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-700" />
                <h2 className="font-bold text-gray-900">Create Automation Rule</h2>
              </div>
              <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Rule Name *</label>
                <Input value={newRule.name} onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                  className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500" placeholder="e.g., Auto-Route High-Score Leads" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <Textarea value={newRule.description} onChange={e => setNewRule({ ...newRule, description: e.target.value })}
                  className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500" placeholder="What does this rule do?" rows={2} />
              </div>

              {/* Trigger */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Trigger Event</label>
                <select value={newRule.triggerType} onChange={e => setNewRule({ ...newRule, triggerType: e.target.value, conditionField: CONDITION_FIELDS[e.target.value]?.[0] ?? "value" })}
                  className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  {Object.entries(TRIGGER_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>

              {/* Condition Builder */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  <select value={newRule.conditionField} onChange={e => setNewRule({ ...newRule, conditionField: e.target.value })}
                    className="border border-white/10 rounded-lg px-2 py-2 text-xs bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {conditionFields.map(f => <option key={f} value={f}>{f.replace(/_/g, " ")}</option>)}
                  </select>
                  <select value={newRule.conditionOp} onChange={e => setNewRule({ ...newRule, conditionOp: e.target.value })}
                    className="border border-white/10 rounded-lg px-2 py-2 text-xs bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {OPERATORS.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                  <Input value={newRule.conditionValue} onChange={e => setNewRule({ ...newRule, conditionValue: e.target.value })}
                    className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500 text-xs" placeholder="value" />
                </div>
                <div className="mt-2 text-xs font-mono bg-white/5 rounded px-2 py-1 text-gray-500">
                  IF {newRule.conditionField.replace(/_/g, " ")} {newRule.conditionOp} {newRule.conditionValue || "..."}
                </div>
              </div>

              {/* Action */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Action</label>
                <select value={newRule.actionType} onChange={e => setNewRule({ ...newRule, actionType: e.target.value })}
                  className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  {Object.entries(ACTION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>

              {/* Action Config */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Action Config (optional JSON)</label>
                <Textarea value={newRule.actionConfigJson} onChange={e => setNewRule({ ...newRule, actionConfigJson: e.target.value })}
                  className="bg-[#F8FAFC] border-white/10 text-gray-900 font-mono text-xs focus:border-teal-500"
                  placeholder='{"template": "welcome_email", "delay_minutes": 0}' rows={3} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <div className="text-sm font-medium text-gray-900">Activate immediately</div>
                  <div className="text-xs text-gray-500">Rule will run as soon as events fire</div>
                </div>
                <Switch checked={newRule.isActive} onCheckedChange={v => setNewRule({ ...newRule, isActive: v })} className="data-[state=checked]:bg-teal-600" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-white/10">
              <Button variant="outline" onClick={() => setShowCreate(false)} className="border-white/10 text-gray-700 hover:text-gray-900">Cancel</Button>
              <Button onClick={createRule} disabled={!newRule.name || createMutation.isPending} className="bg-teal-600 hover:bg-teal-700 text-gray-900">
                {createMutation.isPending ? "Creating..." : "Create Rule"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
