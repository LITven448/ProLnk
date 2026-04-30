import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2, ExternalLink, Zap, Shield, ArrowRight,
  Users, TrendingUp, Clock, Code2, Copy, CheckCheck
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const JOBBER_STATS = [
  { label: "Contractors on Jobber", value: "200,000+", icon: Users },
  { label: "Avg Job Value (Lawn/Pest)", value: "$150-$400", icon: TrendingUp },
  { label: "OAuth Setup Time", value: "~5 min", icon: Clock },
  { label: "Webhook Latency", value: "< 2 sec", icon: Zap },
];

const WEBHOOK_EVENTS = [
  { event: "JOB_COMPLETED", trigger: "Job marked complete", action: "Pull all job photos  Intake Router", critical: true },
  { event: "VISIT_COMPLETED", trigger: "Visit/appointment completed", action: "Pull visit photos  Intake Router", critical: true },
  { event: "INVOICE_SENT", trigger: "Invoice sent to client", action: "Confirm job completion for commission tracking", critical: false },
  { event: "CLIENT_CREATED", trigger: "New client added", action: "Update service area map", critical: false },
  { event: "QUOTE_APPROVED", trigger: "Quote approved by client", action: "Flag upcoming job for photo monitoring", critical: false },
];

const SETUP_STEPS = [
  { step: 1, title: "Register ProLnk as a Jobber Developer App", desc: "Go to developer.getjobber.com  Create App  Set redirect URI to https://prolnk.io/api/oauth/jobber/callback", done: false },
  { step: 2, title: "Copy Client ID & Secret", desc: "Add JOBBER_CLIENT_ID and JOBBER_CLIENT_SECRET to ProLnk secrets. These are already wired into the integration settings page.", done: false },
  { step: 3, title: "Configure Webhooks in Jobber Dashboard", desc: "Subscribe to JOB_COMPLETED and VISIT_COMPLETED. Set endpoint to https://prolnk.io/api/webhooks/jobber", done: false },
  { step: 4, title: "Partners Connect via OAuth", desc: "Partners click 'Connect Jobber' in their ProLnk Integration Settings. They approve access in Jobber. ProLnk stores their OAuth token. Done.", done: false },
];

const CODE_SNIPPET = `// Jobber webhook handler (already built in server/webhooks.ts)
app.post('/api/webhooks/jobber', async (req, res) => {
  const { webHookEvent, data } = req.body;
  
  if (webHookEvent === 'JOB_COMPLETED') {
    const { jobId, clientId } = data;
    // Pull photos from Jobber API using partner's OAuth token
    const photos = await fetchJobberJobPhotos(jobId, partnerToken);
    // Route through ProLnk Intake Router
    await intakeRouter.processPhotos(photos, { source: 'jobber', partnerId });
  }
  res.json({ received: true });
});`;

export default function JobberIntegration() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Code copied");
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jobber Integration</h1>
              <p className="text-gray-500 text-sm">Deep OAuth + webhook integration for the largest DFW partner segment</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 text-sm px-3 py-1">Tier 1 Priority  5 Day Build</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {JOBBER_STATS.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className="h-8 w-8 text-green-500 shrink-0" />
                <div>
                  <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Jobber First */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-5">
            <p className="font-semibold text-green-800 mb-1">Why Jobber is the #1 DFW Integration</p>
            <p className="text-sm text-green-700">
              Jobber dominates the lawn care, pest control, cleaning, and pet waste segments -- exactly the partner categories ProLnk is launching with in DFW. 
              200,000+ contractors use Jobber. Every Jobber partner who connects ProLnk becomes a zero-friction photo source. 
              The OAuth flow takes 30 seconds for the partner. The webhook fires automatically on every completed job. 
              Partners never have to think about ProLnk -- it just works.
            </p>
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Setup Checklist (Admin Actions Required)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {SETUP_STEPS.map((s, idx) => (
              <div key={s.step}>
                <div className="flex items-start gap-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${s.done ? "bg-green-500" : "bg-gray-200"}`}>
                    {s.done ? <CheckCircle2 className="h-4 w-4 text-white" /> : <span className="text-xs font-bold text-gray-600">{s.step}</span>}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm mb-1">{s.title}</p>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </div>
                {idx < SETUP_STEPS.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Webhook Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Webhook Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {WEBHOOK_EVENTS.map((w) => (
              <div key={w.event} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <code className="text-xs bg-white border px-2 py-1 rounded font-mono text-gray-700 shrink-0">{w.event}</code>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700">{w.trigger}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{w.action}</p>
                </div>
                {w.critical && <Badge className="bg-red-100 text-red-700 text-xs shrink-0">Critical</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Integration Flow */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-500" />
              Data Flow (Zero Partner Behavior Change)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 flex-wrap text-sm mb-4">
              <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">Partner completes job in Jobber</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium">JOB_COMPLETED fires</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-medium">ProLnk pulls photos via API</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded-lg font-medium">AI scans for opportunities</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg font-medium">Lead routed + commission tracked</div>
            </div>
          </CardContent>
        </Card>

        {/* Code Preview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Code2 className="h-4 w-4 text-purple-500" />
                Webhook Handler (Already Built)
              </CardTitle>
              <Button size="sm" variant="outline" onClick={copyCode} className="gap-1.5 text-xs">
                {copied ? <><CheckCheck className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-white text-green-400 text-xs rounded-lg p-4 overflow-x-auto font-mono leading-relaxed">
              {CODE_SNIPPET}
            </pre>
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
            <div className="flex flex-wrap gap-2">
              {["read:jobs", "read:visits", "read:clients", "read:invoices", "read:quotes", "read:attachments"].map(scope => (
                <code key={scope} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono border border-blue-100">{scope}</code>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex gap-3">
          <a href="https://developer.getjobber.com" target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
              Open Jobber Developer Portal <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
          <Button variant="outline" className="flex-1" onClick={() => toast.success("Jobber integration marked as priority -- added to build queue")}>
            Add to Build Queue
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
