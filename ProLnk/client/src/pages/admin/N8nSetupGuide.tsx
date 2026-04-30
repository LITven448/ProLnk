/**
 * N8n Setup Guide — INT-08
 * Shows all 8 ProLnk workflow JSONs with copy-paste import instructions.
 * Admins can download each workflow file and import into their n8n instance.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, Download, CheckCircle2, Copy, ExternalLink,
  MessageSquare, Mail, Users, DollarSign, RotateCcw,
  Bell, Calendar, Star, ChevronRight, Info,
} from "lucide-react";
import { toast } from "sonner";

const WORKFLOWS = [
  {
    id: "01",
    file: "01-lead-dispatched-sms.json",
    name: "Lead Dispatched → Partner SMS",
    description: "Fires within 60 seconds of a new lead being dispatched. Sends the partner an SMS with the homeowner name, address, and job type via Twilio.",
    trigger: "lead.dispatched",
    icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    category: "Lead Routing",
  },
  {
    id: "02",
    file: "02-homeowner-opportunity-email.json",
    name: "Homeowner Opportunity Email",
    description: "Sends the homeowner a branded email with the AI-generated fix mockup and a direct link to their deal page. Increases open-to-schedule conversion.",
    trigger: "deal.created",
    icon: Mail,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    category: "Homeowner Outreach",
  },
  {
    id: "03",
    file: "03-partner-welcome-sequence.json",
    name: "Partner Welcome Sequence",
    description: "3-email drip sequence on Day 0, Day 3, and Day 7 after partner approval. Covers platform orientation, first job tips, and commission structure.",
    trigger: "partner.approved",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    category: "Partner Onboarding",
  },
  {
    id: "04",
    file: "04-commission-paid-notification.json",
    name: "Commission Paid → SMS + Email",
    description: "Notifies the partner via SMS and email the moment a commission transfer is processed. Includes amount, job reference, and payout history link.",
    trigger: "commission.paid",
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    category: "Payments",
  },
  {
    id: "05",
    file: "05-partner-winback-sequence.json",
    name: "Partner Win-Back (60-Day Inactive)",
    description: "Triggers when a partner has logged no jobs for 60 days. Sends a personalized re-engagement email with their last commission amount and recent opportunities they missed.",
    trigger: "partner.inactive_60d",
    icon: RotateCcw,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    category: "Retention",
  },
  {
    id: "06",
    file: "06-dispute-opened-admin-alert.json",
    name: "Dispute Opened → Admin Alert",
    description: "Sends the admin an immediate Slack or email alert when a partner opens a commission dispute. Includes dispute reason and job reference.",
    trigger: "dispute.opened",
    icon: Bell,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    category: "Disputes",
  },
  {
    id: "07",
    file: "07-homeowner-seasonal-checkin.json",
    name: "Homeowner Seasonal Check-In",
    description: "Sends homeowners a spring and fall property review prompt. Includes a link to upload new photos for AI analysis. Drives repeat engagement and cross-sell opportunities.",
    trigger: "cron: 0 9 1 3,9 *",
    icon: Calendar,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    category: "Homeowner Retention",
  },
  {
    id: "08",
    file: "08-partner-nps-survey.json",
    name: "Partner NPS Survey (Day 7)",
    description: "Sends a 1-question NPS survey to partners 7 days after their first completed job. Responses are stored in the platform and surface in the Customer Success dashboard.",
    trigger: "job.first_completed",
    icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    category: "Feedback",
  },
];

const SETUP_STEPS = [
  "Install n8n (cloud at n8n.io or self-hosted via Docker)",
  "Go to Settings → API → Create an API key",
  "In ProLnk Admin → Webhook Manager, add your n8n webhook URLs",
  "In n8n, click the + button → Import from file → upload the JSON below",
  "Activate each workflow and test with a real event",
];

export default function N8nSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyTrigger = (trigger: string) => {
    navigator.clipboard.writeText(trigger);
    setCopiedStep(trigger);
    toast.success("Copied!", { description: "Trigger event name copied to clipboard." });
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const downloadWorkflow = (file: string, name: string) => {
    // In production these files are served from /n8n-workflows/ path
    // For now, open the GitHub raw URL or show a toast
    toast.info(`Download ${name}`, { description: `File: ${file} — available in the project's n8n-workflows/ directory.` });
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">n8n Automation Setup</h1>
                <p className="text-sm text-muted-foreground">8 pre-built workflows ready to import</p>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="https://n8n.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Open n8n
            </a>
          </Button>
        </div>

        {/* Setup Steps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              Quick Setup (5 steps)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {SETUP_STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href="/admin/n8n-webhooks">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Webhook Manager
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="/admin/platform-health">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Platform Health
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Cards */}
        <div>
          <h2 className="text-lg font-semibold mb-4">8 Pre-Built Workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORKFLOWS.map((wf) => {
              const Icon = wf.icon;
              return (
                <Card key={wf.id} className={`border ${wf.border}`}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg ${wf.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${wf.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold">{wf.name}</h3>
                          <Badge variant="secondary" className="text-xs">{wf.category}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{wf.description}</p>
                      </div>
                    </div>

                    {/* Trigger */}
                    <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-muted/50">
                      <span className="text-xs text-muted-foreground font-medium">Trigger:</span>
                      <code className="text-xs font-mono text-foreground flex-1">{wf.trigger}</code>
                      <button
                        onClick={() => copyTrigger(wf.trigger)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedStep === wf.trigger
                          ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          : <Copy className="w-3.5 h-3.5" />
                        }
                      </button>
                    </div>

                    {/* File name + download */}
                    <div className="flex items-center justify-between">
                      <code className="text-xs text-muted-foreground font-mono">{wf.file}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1"
                        onClick={() => downloadWorkflow(wf.file, wf.name)}
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              All workflow files are in the <code className="font-mono text-xs">n8n-workflows/</code> directory of the project repository.
              Each JSON can be imported directly into n8n via <strong>Workflows → Import from file</strong>.
              Webhook URLs from ProLnk are configured in the <a href="/admin/n8n-webhooks" className="underline">Webhook Manager</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
