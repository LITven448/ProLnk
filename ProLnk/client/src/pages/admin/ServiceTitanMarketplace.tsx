import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2, Circle, Clock, ExternalLink, AlertTriangle,
  FileText, Shield, Code2, Building2, Zap, ArrowRight, Copy
} from "lucide-react";
import { toast } from "sonner";

const SUBMISSION_STEPS = [
  {
    id: 1,
    title: "Create ServiceTitan Developer Account",
    status: "pending" as const,
    est: "30 min",
    description: "Register at developer.servicetitan.io with your business email. You'll need your EIN and business address.",
    url: "https://developer.servicetitan.io",
    action: "Open Developer Portal",
  },
  {
    id: 2,
    title: "Complete Developer Agreement",
    status: "pending" as const,
    est: "1 hour",
    description: "Review and sign the ServiceTitan Developer Agreement. Pay attention to Section 7 (Data Usage) and Section 12 (Revenue Sharing). Have General Counsel review before signing.",
    url: null,
    action: null,
  },
  {
    id: 3,
    title: "Submit Privacy Policy & Terms of Service",
    status: "pending" as const,
    est: "2 hours",
    description: "ServiceTitan requires a hosted privacy policy and ToS that explicitly covers photo data usage, data retention, and user rights. ProLnk's existing docs need a ServiceTitan-specific addendum.",
    url: null,
    action: null,
  },
  {
    id: 4,
    title: "Build the Marketplace App (OAuth + Webhooks)",
    status: "in_progress" as const,
    est: "2 weeks",
    description: "The core integration: OAuth 2.0 for partner authorization, job completion webhook to pull photos, and the ProLnk intake router to process them. Backend infrastructure is already built.",
    url: null,
    action: null,
  },
  {
    id: 5,
    title: "Submit for Marketplace Review",
    status: "pending" as const,
    est: "4-6 weeks",
    description: "ServiceTitan's review team evaluates security, data handling, and UX. Average approval time is 4-6 weeks. Rejections are common -- plan for one revision cycle.",
    url: null,
    action: null,
  },
  {
    id: 6,
    title: "Go Live in ServiceTitan Marketplace",
    status: "pending" as const,
    est: "Day 1",
    description: "Once approved, ProLnk appears in the ServiceTitan Marketplace. Partners can connect with one click from inside their ServiceTitan account.",
    url: null,
    action: null,
  },
];

const WEBHOOK_EVENTS = [
  { event: "job.completed", description: "Fires when a job is marked complete -- triggers photo pull", priority: "Critical" },
  { event: "job.photos.uploaded", description: "Fires when photos are added to a job -- real-time intake", priority: "Critical" },
  { event: "customer.created", description: "New customer added -- used for service area mapping", priority: "High" },
  { event: "invoice.paid", description: "Invoice marked paid -- confirms job completion for commission", priority: "High" },
  { event: "appointment.scheduled", description: "New appointment -- used for lead routing optimization", priority: "Medium" },
];

const OAUTH_SCOPES = [
  "jobs:read", "jobs:write", "photos:read", "customers:read",
  "invoices:read", "appointments:read", "technicians:read"
];

export default function ServiceTitanMarketplace() {
  const [copiedScope, setCopiedScope] = useState<string | null>(null);

  const completedSteps = SUBMISSION_STEPS.filter(s => (s.status as string) === "completed").length;
  const inProgressSteps = SUBMISSION_STEPS.filter(s => (s.status as string) === "in_progress").length;
  const progress = Math.round(((completedSteps + inProgressSteps * 0.5) / SUBMISSION_STEPS.length) * 100);

  const copyScope = (scope: string) => {
    navigator.clipboard.writeText(scope);
    setCopiedScope(scope);
    setTimeout(() => setCopiedScope(null), 1500);
    toast.success("Copied to clipboard");
  };

  const statusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === "in_progress") return <Clock className="h-5 w-5 text-yellow-500" />;
    return <Circle className="h-5 w-5 text-gray-300" />;
  };

  const statusBadge = (status: string) => {
    if (status === "completed") return <Badge className="bg-green-100 text-green-700">Complete</Badge>;
    if (status === "in_progress") return <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>;
    return <Badge variant="outline" className="text-gray-400">Pending</Badge>;
  };

  // Ensure steps are typed as string for comparison
  const steps = SUBMISSION_STEPS.map(s => ({ ...s, status: s.status as string }));

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ServiceTitan Marketplace</h1>
                <p className="text-gray-500 text-sm">Developer submission tracker & integration docs</p>
              </div>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-700 text-sm px-3 py-1">Approval Required  4-6 Weeks</Badge>
        </div>

        {/* Why ServiceTitan matters */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-5">
            <div className="flex gap-4">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-orange-800 mb-1">Highest-Value Segment -- Start Submission This Week</p>
                <p className="text-sm text-orange-700">
                  ServiceTitan serves HVAC, plumbing, and electrical contractors -- the highest average job values in home services ($1,500-$8,000/job). 
                  A single HVAC job referral earns more commission than 10 lawn care referrals. The Marketplace approval process takes 4-6 weeks minimum. 
                  Every week you delay is a week of high-value leads you're not capturing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Submission Progress</span>
              <span className="text-sm font-normal text-gray-500">{completedSteps}/{SUBMISSION_STEPS.length} steps complete</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3 mb-2" />
            <p className="text-xs text-gray-500">{progress}% complete -- estimated {6 - Math.floor(progress / 20)} weeks to Marketplace listing</p>
          </CardContent>
        </Card>

        {/* Submission Steps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              Submission Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, idx) => (
              <div key={step.id}>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">{statusIcon(step.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-sm">Step {step.id}: {step.title}</span>
                        {statusBadge(step.status)}
                      </div>
                      <span className="text-xs text-gray-400">{step.est}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{step.description}</p>
                    {step.url && (
                      <a href={step.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                          {step.action} <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
                {idx < SUBMISSION_STEPS.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Two column: Webhooks + OAuth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Webhook Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Webhook Events to Subscribe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {WEBHOOK_EVENTS.map((w) => (
                <div key={w.event} className="flex items-start gap-3">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 shrink-0">{w.event}</code>
                  <div>
                    <p className="text-xs text-gray-600">{w.description}</p>
                    <Badge
                      className={`text-xs mt-1 ${w.priority === "Critical" ? "bg-red-100 text-red-700" : w.priority === "High" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"}`}
                    >
                      {w.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* OAuth Scopes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                Required OAuth Scopes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-3">Request only these scopes -- ServiceTitan reviewers flag over-permissioned apps.</p>
              <div className="space-y-2">
                {OAUTH_SCOPES.map((scope) => (
                  <div key={scope} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <code className="text-xs font-mono text-gray-700">{scope}</code>
                    <button onClick={() => copyScope(scope)} className="text-gray-400 hover:text-gray-600">
                      {copiedScope === scope ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Architecture */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Code2 className="h-4 w-4 text-purple-500" />
              Integration Architecture (Once Approved)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <div className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg font-medium">Partner completes job in ServiceTitan</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium">job.completed webhook fires</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-medium">ProLnk pulls job photos via API</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded-lg font-medium">AI analyzes for opportunities</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">Lead routed to matching partner</div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Zero behavior change for the partner. They complete their job as normal. ProLnk runs silently in the background.</p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex gap-3">
          <a href="https://developer.servicetitan.io" target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full gap-2" style={{ backgroundColor: "#ff6b35" }}>
              Open ServiceTitan Developer Portal <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
          <Button variant="outline" className="flex-1 gap-2" onClick={() => toast.info("Reminder set -- you'll be notified in 7 days to check submission status")}>
            Set 7-Day Reminder
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
