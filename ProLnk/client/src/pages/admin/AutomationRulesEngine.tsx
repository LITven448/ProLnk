import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Zap, Plus, Play, Pause, Trash2, Copy, FlaskConical, BarChart3, Clock, Settings, ChevronRight, AlertTriangle, CheckCircle2, Mail, Bell, Webhook, UserPlus, Star, CloudLightning, Wrench, Camera, TrendingDown } from "lucide-react";

const TRIGGER_ICONS: Record<string, any> = {
  new_signup: UserPlus,
  referral_milestone: Star,
  photo_uploaded: Camera,
  analysis_complete: CheckCircle2,
  score_below_threshold: TrendingDown,
  storm_detected: CloudLightning,
  maintenance_due: Wrench,
  commission_earned: BarChart3,
  review_received: Star,
  partner_inactive: AlertTriangle,
  homeowner_inactive: AlertTriangle,
  property_anniversary: Clock,
  seasonal_change: Settings,
};

const TRIGGER_LABELS: Record<string, string> = {
  new_signup: "New Signup",
  referral_milestone: "Referral Milestone",
  photo_uploaded: "Photo Uploaded",
  analysis_complete: "Analysis Complete",
  score_below_threshold: "Score Below Threshold",
  storm_detected: "Storm Detected",
  maintenance_due: "Maintenance Due",
  commission_earned: "Commission Earned",
  review_received: "Review Received",
  partner_inactive: "Partner Inactive",
  homeowner_inactive: "Homeowner Inactive",
  property_anniversary: "Property Anniversary",
  seasonal_change: "Seasonal Change",
};

const ACTION_LABELS: Record<string, string> = {
  send_email: "Send Email",
  send_sms: "Send SMS",
  send_notification: "Send Notification",
  assign_task: "Assign Task",
  create_lead: "Create Lead",
  update_score: "Update Score",
  trigger_webhook: "Trigger Webhook",
  notify_admin: "Notify Admin",
  schedule_followup: "Schedule Follow-Up",
  award_points: "Award Points",
  flag_for_review: "Flag for Review",
};

const ACTION_ICONS: Record<string, any> = {
  send_email: Mail,
  send_sms: Bell,
  send_notification: Bell,
  assign_task: CheckCircle2,
  create_lead: UserPlus,
  update_score: BarChart3,
  trigger_webhook: Webhook,
  notify_admin: AlertTriangle,
  schedule_followup: Clock,
  award_points: Star,
  flag_for_review: AlertTriangle,
};

export default function AutomationRulesEngine() {

  const [showCreate, setShowCreate] = useState(false);
  const [filterTrigger, setFilterTrigger] = useState<string>("all");
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    triggerType: "new_signup" as any,
    conditionJson: "",
    actionType: "send_email" as any,
    actionConfigJson: "",
    isActive: true,
  });

  const rulesQuery = trpc.automationRules.list.useQuery({
    activeOnly: false,
    triggerType: filterTrigger !== "all" ? filterTrigger as any : undefined,
  });
  const statsQuery = trpc.automationRules.getStats.useQuery();
  const templatesQuery = trpc.automationRules.getTemplates.useQuery();
  const createMutation = trpc.automationRules.create.useMutation({
    onSuccess: () => {
      toast.success("Automation rule created successfully");
      rulesQuery.refetch();
      statsQuery.refetch();
      setShowCreate(false);
      setNewRule({ name: "", description: "", triggerType: "new_signup", conditionJson: "", actionType: "send_email", actionConfigJson: "", isActive: true });
    },
  });
  const toggleMutation = trpc.automationRules.toggle.useMutation({
    onSuccess: () => {
      rulesQuery.refetch();
      statsQuery.refetch();
    },
  });
  const deleteMutation = trpc.automationRules.delete.useMutation({
    onSuccess: () => {
      toast.success("Rule deleted");
      rulesQuery.refetch();
      statsQuery.refetch();
    },
  });

  const rules = rulesQuery.data || [];
  const stats = statsQuery.data;
  const templates = templatesQuery.data || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="h-6 w-6 text-amber-400" />
              Automation Rules Engine
            </h1>
            <p className="text-slate-400 mt-1">Configure event-driven automation rules for the platform</p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" /> New Rule
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Total Rules</div>
              <div className="text-2xl font-bold text-white">{stats?.total || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Active</div>
              <div className="text-2xl font-bold text-teal-400">{stats?.active || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Total Executions</div>
              <div className="text-2xl font-bold text-amber-400">{stats?.totalExecutions || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Last Execution</div>
              <div className="text-sm font-medium text-white">
                {stats?.lastExecution ? new Date(stats.lastExecution).toLocaleString() : "Never"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="rules" className="space-y-4">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="rules">Active Rules</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="space-y-4">
            {/* Filter */}
            <div className="flex items-center gap-3">
              <Select value={filterTrigger} onValueChange={setFilterTrigger}>
                <SelectTrigger className="w-[200px] bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Filter by trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Triggers</SelectItem>
                  {Object.entries(TRIGGER_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rules List */}
            {rules.length === 0 ? (
              <Card className="bg-slate-800/60 border-slate-700">
                <CardContent className="p-12 text-center">
                  <Zap className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No automation rules yet</h3>
                  <p className="text-slate-400 mb-4">Create your first rule or start from a template</p>
                  <Button onClick={() => setShowCreate(true)} className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="h-4 w-4 mr-2" /> Create Rule
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {rules.map((rule) => {
                  const TriggerIcon = TRIGGER_ICONS[rule.triggerType] || Zap;
                  const ActionIcon = ACTION_ICONS[rule.actionType] || Zap;
                  return (
                    <Card key={rule.id} className={`bg-slate-800/60 border-slate-700 ${!rule.isActive ? 'opacity-60' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`p-2 rounded-lg ${rule.isActive ? 'bg-teal-500/20' : 'bg-slate-700'}`}>
                              <TriggerIcon className={`h-5 w-5 ${rule.isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-white">{rule.name}</h3>
                                <Badge variant={rule.isActive ? "default" : "secondary"} className={rule.isActive ? "bg-teal-500/20 text-teal-400" : ""}>
                                  {rule.isActive ? "Active" : "Paused"}
                                </Badge>
                              </div>
                              {rule.description && <p className="text-sm text-slate-400 mt-1">{rule.description}</p>}
                              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <TriggerIcon className="h-3 w-3" />
                                  {TRIGGER_LABELS[rule.triggerType]}
                                </span>
                                <ChevronRight className="h-3 w-3" />
                                <span className="flex items-center gap-1">
                                  <ActionIcon className="h-3 w-3" />
                                  {ACTION_LABELS[rule.actionType]}
                                </span>
                                <span>|</span>
                                <span>{rule.executionCount || 0} executions</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={rule.isActive || false}
                              onCheckedChange={() => toggleMutation.mutate({ id: rule.id })}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => deleteMutation.mutate({ id: rule.id })}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <p className="text-slate-400">Pre-built automation templates. Click to create a rule from any template.</p>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template, i) => {
                const TriggerIcon = TRIGGER_ICONS[template.triggerType] || Zap;
                return (
                  <Card key={i} className="bg-slate-800/60 border-slate-700 hover:border-teal-500/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setNewRule({
                        name: template.name,
                        description: template.description,
                        triggerType: template.triggerType,
                        conditionJson: template.conditionJson,
                        actionType: template.actionType,
                        actionConfigJson: template.actionConfigJson,
                        isActive: true,
                      });
                      setShowCreate(true);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/20">
                          <TriggerIcon className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white text-sm">{template.name}</h3>
                          <p className="text-xs text-slate-400 mt-1">{template.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {TRIGGER_LABELS[template.triggerType]}
                            </Badge>
                            <ChevronRight className="h-3 w-3 text-slate-600" />
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {ACTION_LABELS[template.actionType]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Rule Dialog */}
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                Create Automation Rule
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Rule Name</label>
                <Input
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder="e.g., Auto-Approve High-Quality Partners"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Description</label>
                <Textarea
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder="What does this rule do?"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">Trigger</label>
                  <Select value={newRule.triggerType} onValueChange={(v) => setNewRule({ ...newRule, triggerType: v as any })}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TRIGGER_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Action</label>
                  <Select value={newRule.actionType} onValueChange={(v) => setNewRule({ ...newRule, actionType: v as any })}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ACTION_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400">Condition (JSON)</label>
                <Textarea
                  value={newRule.conditionJson}
                  onChange={(e) => setNewRule({ ...newRule, conditionJson: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white mt-1 font-mono text-xs"
                  placeholder='{"minScore": 80, "region": "DFW"}'
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Action Config (JSON)</label>
                <Textarea
                  value={newRule.actionConfigJson}
                  onChange={(e) => setNewRule({ ...newRule, actionConfigJson: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white mt-1 font-mono text-xs"
                  placeholder='{"template": "welcome_email", "channel": "email"}'
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreate(false)} className="border-slate-700 text-slate-300">
                Cancel
              </Button>
              <Button
                onClick={() => createMutation.mutate(newRule)}
                disabled={!newRule.name || createMutation.isPending}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {createMutation.isPending ? "Creating..." : "Create Rule"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
