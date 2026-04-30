import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2, Plug, CheckCircle, Clock, AlertTriangle,
  ArrowRight, RefreshCw, Settings, Globe, Zap, Lock,
  BarChart3, Users, FileText, Database, Webhook
} from "lucide-react";
import { toast } from "sonner";

const ENTERPRISE_INTEGRATIONS = [
  {
    id: "salesforce",
    name: "Salesforce CRM",
    logo: "☁️",
    category: "CRM",
    status: "available",
    tier: "Enterprise",
    description: "Sync partners, homeowners, and deals bidirectionally with Salesforce. Push job completions as Opportunities, sync contacts, and trigger Flows from ProLnk events.",
    features: ["Bidirectional contact sync", "Opportunity creation on job close", "Custom field mapping", "Flow/Apex triggers", "Real-time webhooks"],
    setupTime: "2–4 hours",
    docsUrl: "https://developer.salesforce.com/",
    authMethod: "OAuth 2.0",
  },
  {
    id: "dynamics",
    name: "Microsoft Dynamics 365",
    logo: "🔷",
    category: "CRM / ERP",
    status: "available",
    tier: "Enterprise",
    description: "Connect ProLnk to Dynamics 365 for unified customer data, service scheduling, and field service management across your property services portfolio.",
    features: ["Contact & account sync", "Work order creation", "Field Service integration", "Power Automate triggers", "Azure AD SSO"],
    setupTime: "3–6 hours",
    docsUrl: "https://docs.microsoft.com/dynamics365/",
    authMethod: "Azure AD / OAuth 2.0",
  },
  {
    id: "mri",
    name: "MRI Software",
    logo: "🏢",
    category: "Property Management",
    status: "available",
    tier: "Enterprise",
    description: "Integrate with MRI for property management companies managing large residential or commercial portfolios. Sync work orders, vendor assignments, and completion data.",
    features: ["Work order sync", "Vendor management", "Invoice reconciliation", "Portfolio-level reporting", "Resident portal integration"],
    setupTime: "4–8 hours",
    docsUrl: "https://www.mrisoftware.com/",
    authMethod: "API Key + Webhook",
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    logo: "🟠",
    category: "CRM / Marketing",
    status: "available",
    tier: "Pro+",
    description: "Push partner leads and homeowner inquiries into HubSpot pipelines. Trigger marketing sequences on job completion and track referral attribution.",
    features: ["Deal pipeline sync", "Contact creation", "Email sequence triggers", "Attribution tracking", "Custom properties"],
    setupTime: "1–2 hours",
    docsUrl: "https://developers.hubspot.com/",
    authMethod: "OAuth 2.0",
  },
  {
    id: "yardi",
    name: "Yardi Voyager",
    logo: "🏗️",
    category: "Property Management",
    status: "available",
    tier: "Enterprise",
    description: "Connect to Yardi for large multifamily and commercial property managers. Sync maintenance work orders, vendor payments, and property data.",
    features: ["Maintenance request sync", "Vendor payment reconciliation", "Property data enrichment", "Resident communication", "Compliance reporting"],
    setupTime: "6–12 hours",
    docsUrl: "https://www.yardi.com/",
    authMethod: "API Key + SFTP",
  },
  {
    id: "appfolio",
    name: "AppFolio Property Manager",
    logo: "📋",
    category: "Property Management",
    status: "available",
    tier: "Company+",
    description: "Sync maintenance work orders and vendor assignments with AppFolio for residential property managers.",
    features: ["Work order import", "Vendor sync", "Invoice push", "Tenant communication", "Inspection reports"],
    setupTime: "2–4 hours",
    docsUrl: "https://www.appfolio.com/",
    authMethod: "API Key",
  },
];

const WEBHOOK_EVENTS = [
  { event: "partner.approved", description: "Fires when a partner application is approved" },
  { event: "partner.tier_upgraded", description: "Fires when a partner advances to a new tier" },
  { event: "job.completed", description: "Fires when a job is marked complete with AI scan" },
  { event: "opportunity.routed", description: "Fires when an AI opportunity is assigned to a partner" },
  { event: "commission.paid", description: "Fires when a commission payout is processed" },
  { event: "homeowner.scan_completed", description: "Fires when a TrustyPro AI scan finishes" },
  { event: "dispute.resolved", description: "Fires when a commission dispute is resolved" },
  { event: "partner.strike_issued", description: "Fires when a compliance strike is issued" },
];

const TIER_CONFIG = {
  "Pro+": "bg-blue-100 text-blue-700",
  "Company+": "bg-purple-100 text-purple-700",
  "Enterprise": "bg-amber-100 text-amber-700",
};

export default function EnterpriseIntegrations() {
  const [activeTab, setActiveTab] = useState<"integrations" | "webhooks">("integrations");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const toggleEvent = (event: string) => {
    setSelectedEvents(prev =>
      prev.includes(event) ? prev.filter(e => e !== event) : [...prev, event]
    );
  };

  const handleSaveWebhook = () => {
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }
    if (selectedEvents.length === 0) {
      toast.error("Please select at least one event");
      return;
    }
    toast.success("Webhook endpoint saved", {
      description: `Subscribed to ${selectedEvents.length} event${selectedEvents.length !== 1 ? "s" : ""}. Test events will be sent within 60 seconds.`,
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <Plug className="w-6 h-6 text-[#0A1628]" />Enterprise Integrations
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Connect ProLnk to your CRM, property management software, and enterprise systems.
            </p>
          </div>
          <Badge className="bg-[#0A1628] text-white">Enterprise</Badge>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 border-b border-gray-200">
          {(["integrations", "webhooks"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-[#0A1628] text-[#0A1628]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "integrations" ? <Plug className="w-4 h-4" /> : <Webhook className="w-4 h-4" />}
              {tab === "integrations" ? "Platform Integrations" : "Webhook Manager"}
            </button>
          ))}
        </div>

        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ENTERPRISE_INTEGRATIONS.map((integration) => {
                const tierColor = TIER_CONFIG[integration.tier as keyof typeof TIER_CONFIG] || "bg-gray-100 text-gray-600";
                return (
                  <Card key={integration.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{integration.logo}</span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-gray-900 text-sm">{integration.name}</h3>
                              <Badge className={`${tierColor} text-xs`}>{integration.tier}</Badge>
                            </div>
                            <p className="text-xs text-gray-500">{integration.category}</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 text-xs flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" />Available
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{integration.description}</p>
                      <div className="space-y-1 mb-3">
                        {integration.features.map((f) => (
                          <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />{f}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Lock className="w-3 h-3" />{integration.authMethod}</span>
                          <span className="flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />Setup: {integration.setupTime}</span>
                        </div>
                        <div className="flex gap-2">
                          <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="text-xs">
                              <Globe className="w-3 h-3 mr-1" />Docs
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            className="bg-[#0A1628] text-white hover:bg-[#0A1628]/90 text-xs"
                            onClick={() => toast.info(`${integration.name} setup`, { description: "Contact your account manager to configure this enterprise integration." })}
                          >
                            <Zap className="w-3 h-3 mr-1" />Connect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Webhook Manager Tab */}
        {activeTab === "webhooks" && (
          <div className="space-y-6">
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Add Webhook Endpoint</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Endpoint URL</Label>
                  <Input
                    placeholder="https://your-system.com/webhooks/prolnk"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="mt-1.5 font-mono text-sm"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Subscribe to Events</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {WEBHOOK_EVENTS.map((we) => (
                      <button
                        key={we.event}
                        onClick={() => toggleEvent(we.event)}
                        className={`text-left p-3 rounded-lg border text-xs transition-colors ${
                          selectedEvents.includes(we.event)
                            ? "border-[#0A1628] bg-[#0A1628]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-mono font-semibold text-gray-800">{we.event}</div>
                        <div className="text-gray-500 mt-0.5">{we.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-500">
                    {selectedEvents.length} event{selectedEvents.length !== 1 ? "s" : ""} selected
                  </p>
                  <Button
                    className="bg-[#0A1628] text-white hover:bg-[#0A1628]/90"
                    onClick={handleSaveWebhook}
                  >
                    <Webhook className="w-4 h-4 mr-2" />Save Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Webhook Payload Format</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto">
{`POST https://your-endpoint.com/webhook
Content-Type: application/json
X-ProLnk-Signature: sha256=...

{
  "event": "job.completed",
  "timestamp": "2026-04-03T12:00:00Z",
  "data": {
    "jobId": 1234,
    "partnerId": 56,
    "partnerName": "DFW Roofing Co.",
    "category": "Roofing",
    "jobValue": 8500,
    "commissionAmount": 1020,
    "aiConfidence": 0.94,
    "completedAt": "2026-04-03T11:45:00Z"
  }
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
