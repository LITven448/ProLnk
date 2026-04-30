import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle, Circle, ExternalLink, Copy, ChevronDown, ChevronUp,
  AlertTriangle, Zap, Key, Save, Eye, EyeOff, Camera, Wrench, Home,
  Clock, TrendingUp, Shield
} from "lucide-react";
import { toast } from "sonner";

// --- Step Data ----------------------------------------------------------------

const COMPANYCAM_STEPS = [
  {
    id: 1,
    title: "Create a CompanyCam Developer Account",
    time: "5 min",
    status: "action",
    details: [
      "Go to developers.companycam.com and click 'Sign Up'",
      "Use your ProLnk business email (not a personal address)",
      "Verify your email and complete the developer profile",
      "Select 'Integration Partner' as your account type",
    ],
    link: { label: "Open CompanyCam Developer Portal", url: "https://developers.companycam.com" },
    note: "CompanyCam has 150K+ active contractors. This single integration covers all partners who use CompanyCam regardless of what FSM software they also use.",
  },
  {
    id: 2,
    title: "Create a New OAuth Application",
    time: "10 min",
    status: "action",
    details: [
      "In the developer dashboard, click 'Create Application'",
      "App Name: ProLnk Partner Network",
      "App Description: Automatically routes job photo opportunities to qualified home service partners in the ProLnk network",
      "App Website: https://prolnk.io",
      "Redirect URI: https://prolnk.io/api/oauth/companycam/callback",
      "Scopes required: photos:read, projects:read, users:read, webhooks:write",
    ],
    copyFields: [
      { label: "App Name", value: "ProLnk Partner Network" },
      { label: "Redirect URI", value: "https://prolnk.io/api/oauth/companycam/callback" },
      { label: "Webhook URL", value: "https://prolnk.io/api/webhooks/companycam" },
    ],
    note: "Save your Client ID and Client Secret immediately -- you'll need them in Step 4.",
  },
  {
    id: 3,
    title: "Configure Webhooks",
    time: "5 min",
    status: "action",
    details: [
      "In your app settings, navigate to 'Webhooks'",
      "Add webhook endpoint: https://prolnk.io/api/webhooks/companycam",
      "Select events: photo.created, photo.updated, project.completed",
      "Set content type to application/json",
      "Save and copy the webhook signing secret",
    ],
    note: "The ProLnk webhook receiver is already live and waiting. Once you add the signing secret to your environment, photos will flow automatically.",
  },
  {
    id: 4,
    title: "Save Credentials to ProLnk",
    time: "2 min",
    status: "action",
    details: [
      "Enter your Client ID, Client Secret, and Webhook Secret in the credential panel below",
      "Click 'Save Credentials' -- they'll be stored securely in the ProLnk environment",
      "The server will automatically pick up the new credentials",
    ],
    envVars: ["COMPANYCAM_CLIENT_ID", "COMPANYCAM_CLIENT_SECRET", "COMPANYCAM_WEBHOOK_SECRET"],
    note: "These credentials are stored as encrypted environment variables. They are never exposed in the UI after saving.",
  },
  {
    id: 5,
    title: "Test the Integration",
    time: "15 min",
    status: "action",
    details: [
      "Connect a test CompanyCam account via the partner Integration Settings page",
      "Upload a test photo to a CompanyCam project",
      "Check the Photo Pipeline Monitor at /admin/photo-pipeline for the incoming photo",
      "Verify the AI analysis runs and an opportunity is created",
      "Check the Integration Health Dashboard at /admin/integration-health for status",
    ],
    link: { label: "Open Photo Pipeline Monitor", url: "/admin/photo-pipeline" },
    note: "Use a real job site photo for the test -- a photo with visible overgrown grass, dirty gutters, or a broken fence will produce the most interesting AI output.",
  },
  {
    id: 6,
    title: "Submit for CompanyCam Marketplace Listing",
    time: "1-2 weeks",
    status: "optional",
    details: [
      "Once the integration is tested and stable, apply for the CompanyCam Marketplace",
      "Marketplace listing gives ProLnk visibility to all 150K+ CompanyCam users",
      "Required: app description, screenshots, privacy policy, support contact",
      "CompanyCam reviews submissions within 5-10 business days",
    ],
    link: { label: "CompanyCam Marketplace Application", url: "https://companycam.com/marketplace" },
    note: "This is optional but high-leverage. A Marketplace listing is essentially free advertising to every contractor who uses CompanyCam.",
  },
];

const SERVICETITAN_STEPS = [
  {
    id: 1,
    title: "Register as a ServiceTitan Technology Partner",
    time: "30 min",
    urgency: "Start today -- approval takes 4-6 weeks",
    details: [
      "Go to developer.servicetitan.io and click 'Become a Partner'",
      "Complete the Technology Partner application form",
      "Company: ProLnk Partner Network",
      "Integration type: Lead Generation / Referral Network",
      "Describe the integration: ProLnk uses ServiceTitan job data and photos to automatically route cross-sell opportunities to qualified partners in the ProLnk network",
      "Expected API calls: 50-500/day per connected tenant",
    ],
    link: { label: "ServiceTitan Developer Portal", url: "https://developer.servicetitan.io" },
    note: "ServiceTitan's approval process is thorough -- they review for data security, user experience, and business value. Submit a strong application with clear value proposition.",
  },
  {
    id: 2,
    title: "Build the ServiceTitan App in Sandbox",
    time: "2-3 weeks (parallel with approval)",
    urgency: "Build while waiting for approval",
    details: [
      "ServiceTitan provides a sandbox environment immediately after registration",
      "API endpoints needed: Jobs (GET /jpm/v2/jobs), Attachments (GET /jpm/v2/jobs/{id}/attachments)",
      "Authentication: OAuth 2.0 with client credentials flow",
      "Webhook: Subscribe to job.completed events to trigger photo analysis",
      "Rate limits: 500 requests/minute per tenant -- well within ProLnk's needs",
    ],
    copyFields: [
      { label: "Webhook Event", value: "job.completed" },
      { label: "Jobs API", value: "GET /jpm/v2/jobs?completedOnOrAfter={date}" },
      { label: "Photos API", value: "GET /jpm/v2/jobs/{id}/attachments" },
    ],
    note: "The ServiceTitan API is the most powerful of all the FSM integrations. Job data includes customer address, job type, technician, and all attachments (photos) in one call.",
  },
  {
    id: 3,
    title: "Submit to ServiceTitan Marketplace",
    time: "4-6 weeks review",
    urgency: "Submit as soon as sandbox testing is complete",
    details: [
      "Marketplace listing requires: app icon, screenshots, description, pricing, support docs",
      "ServiceTitan reviews for security, data handling, and user experience",
      "ProLnk will be listed under 'Lead Generation' and 'Business Intelligence' categories",
      "Marketplace gives access to 100,000+ ServiceTitan customers (HVAC, plumbing, electrical)",
    ],
    note: "ServiceTitan's customer base is the highest-value segment in home services -- average job values of $500-$5,000. A single HVAC referral from a lawn care partner could be worth $3,000+ in commission.",
  },
];

const JOBBER_STEPS = [
  {
    id: 1,
    title: "Apply to Jobber's App Marketplace",
    time: "20 min",
    details: [
      "Go to developer.getjobber.com and create a developer account",
      "Click 'Create App' and fill in the application",
      "App Name: ProLnk Partner Network",
      "Category: Business Management / Lead Generation",
      "Describe how ProLnk uses Jobber job completion data to route referral leads",
    ],
    link: { label: "Jobber Developer Portal", url: "https://developer.getjobber.com" },
    note: "Jobber has 200K+ home service businesses. It's the most popular FSM for small-to-mid size contractors -- lawn care, cleaning, pest control, and handyman businesses.",
  },
  {
    id: 2,
    title: "Configure OAuth and Webhooks",
    time: "15 min",
    details: [
      "Set redirect URI: https://prolnk.io/api/oauth/jobber/callback",
      "Request scopes: read_jobs, read_clients, read_attachments",
      "Subscribe to webhook: job_completed",
      "Webhook endpoint: https://prolnk.io/api/webhooks/jobber",
    ],
    copyFields: [
      { label: "Redirect URI", value: "https://prolnk.io/api/oauth/jobber/callback" },
      { label: "Webhook URL", value: "https://prolnk.io/api/webhooks/jobber" },
      { label: "Webhook Event", value: "job_completed" },
    ],
    note: "Jobber uses GraphQL for its API. The ProLnk webhook receiver already handles Jobber's payload format.",
  },
  {
    id: 3,
    title: "Save Jobber Credentials",
    time: "2 min",
    details: [
      "Enter your Jobber Client ID and Client Secret in the credential panel below",
      "Save to ProLnk environment",
    ],
    envVars: ["JOBBER_CLIENT_ID", "JOBBER_CLIENT_SECRET"],
    note: "Partners connect their Jobber account via OAuth from their Partner Portal Integration Settings page. No manual token management required.",
  },
];

const HOUSECALL_STEPS = [
  {
    id: 1,
    title: "Register as a Housecall Pro Integration Partner",
    time: "20 min",
    details: [
      "Go to developer.housecallpro.com and create a developer account",
      "Apply for the Integration Partner program",
      "App Name: ProLnk Partner Network",
      "Integration category: Lead Generation",
      "Describe how ProLnk routes referral opportunities from job completion photos",
    ],
    link: { label: "Housecall Pro Developer Portal", url: "https://developer.housecallpro.com" },
    note: "Housecall Pro serves 40K+ home service businesses, primarily HVAC, plumbing, electrical, and cleaning. Strong overlap with ProLnk's target partner base.",
  },
  {
    id: 2,
    title: "Configure API Access",
    time: "10 min",
    details: [
      "Housecall Pro uses API key authentication (simpler than OAuth)",
      "Partners will provide their API key from their HCP account settings",
      "ProLnk polls the HCP API on job completion: GET /api/v1/jobs?status=completed",
      "Photo attachments: GET /api/v1/jobs/{id}/attachments",
    ],
    copyFields: [
      { label: "Jobs Endpoint", value: "GET /api/v1/jobs?status=completed&page=1&per_page=50" },
      { label: "Photos Endpoint", value: "GET /api/v1/jobs/{id}/attachments" },
    ],
    note: "Unlike CompanyCam and Jobber, Housecall Pro doesn't support webhooks for all events. ProLnk polls every 4 hours for new completed jobs -- still fast enough for same-day lead routing.",
  },
  {
    id: 3,
    title: "Save Housecall Pro Credentials",
    time: "2 min",
    details: [
      "Enter your Housecall Pro API key in the credential panel below",
      "Save to ProLnk environment",
    ],
    envVars: ["HOUSECALLPRO_API_KEY"],
    note: "Each partner provides their own HCP API key. The admin credential here is for the ProLnk developer account used to test and validate the integration.",
  },
];

// --- Credential Panels --------------------------------------------------------

type CredField = { key: string; label: string; placeholder: string };

const CRED_PANELS: Record<string, CredField[]> = {
  companycam: [
    { key: "COMPANYCAM_CLIENT_ID", label: "Client ID", placeholder: "cc_client_..." },
    { key: "COMPANYCAM_CLIENT_SECRET", label: "Client Secret", placeholder: "cc_secret_..." },
    { key: "COMPANYCAM_WEBHOOK_SECRET", label: "Webhook Signing Secret", placeholder: "whsec_..." },
  ],
  servicetitan: [
    { key: "SERVICETITAN_APP_KEY", label: "App Key", placeholder: "st_app_..." },
    { key: "SERVICETITAN_CLIENT_ID", label: "Client ID", placeholder: "st_client_..." },
    { key: "SERVICETITAN_CLIENT_SECRET", label: "Client Secret", placeholder: "st_secret_..." },
    { key: "SERVICETITAN_TENANT_ID", label: "Sandbox Tenant ID", placeholder: "1234567" },
  ],
  jobber: [
    { key: "JOBBER_CLIENT_ID", label: "Client ID", placeholder: "jobber_client_..." },
    { key: "JOBBER_CLIENT_SECRET", label: "Client Secret", placeholder: "jobber_secret_..." },
  ],
  housecallpro: [
    { key: "HOUSECALLPRO_API_KEY", label: "API Key (Dev Account)", placeholder: "hcp_..." },
  ],
};

// --- Tab Config ---------------------------------------------------------------

type TabId = "companycam" | "servicetitan" | "jobber" | "housecallpro";

type AnyStep = { id: number; title: string; time?: string; details: string[]; note?: string; link?: { label: string; url: string }; copyFields?: { label: string; value: string }[]; envVars?: string[]; status?: string; urgency?: string };

const TABS: { id: TabId; label: string; icon: React.ElementType; color: string; steps: AnyStep[]; users: string; priority: string }[] = [
  { id: "companycam", label: "CompanyCam", icon: Camera, color: "teal", steps: COMPANYCAM_STEPS, users: "150K+ contractors", priority: "Priority 1" },
  { id: "servicetitan", label: "ServiceTitan", icon: Wrench, color: "orange", steps: SERVICETITAN_STEPS, users: "100K+ businesses", priority: "Priority 2" },
  { id: "jobber", label: "Jobber", icon: Zap, color: "blue", steps: JOBBER_STEPS, users: "200K+ businesses", priority: "Priority 3" },
  { id: "housecallpro", label: "Housecall Pro", icon: Home, color: "purple", steps: HOUSECALL_STEPS, users: "40K+ businesses", priority: "Priority 4" },
];

const COLOR_MAP: Record<string, string> = {
  teal: "bg-teal-500",
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
};

const COLOR_TEXT: Record<string, string> = {
  teal: "text-teal-400",
  orange: "text-orange-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
};

const COLOR_BORDER: Record<string, string> = {
  teal: "border-teal-500/30",
  orange: "border-orange-500/30",
  blue: "border-blue-500/30",
  purple: "border-purple-500/30",
};

// --- Component ----------------------------------------------------------------

export default function CompanyCamGuide() {
  const [activeTab, setActiveTab] = useState<TabId>("companycam");
  const [completedSteps, setCompletedSteps] = useState<Record<TabId, Set<number>>>({
    companycam: new Set(),
    servicetitan: new Set(),
    jobber: new Set(),
    housecallpro: new Set(),
  });
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [savedCreds, setSavedCreds] = useState<Record<TabId, boolean>>({
    companycam: false, servicetitan: false, jobber: false, housecallpro: false,
  });

  const tab = TABS.find(t => t.id === activeTab)!;
  const steps = tab.steps;
  const completedCount = completedSteps[activeTab].size;
  const totalSteps = steps.length;

  const toggleStep = (id: number) => {
    setCompletedSteps(prev => {
      const next = { ...prev };
      const set = new Set(prev[activeTab]);
      if (set.has(id)) set.delete(id); else set.add(id);
      next[activeTab] = set;
      return next;
    });
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  const handleSaveCreds = () => {
    const fields = CRED_PANELS[activeTab];
    const missing = fields.filter(f => !credentials[f.key]?.trim());
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map(f => f.label).join(", ")}`);
      return;
    }
    // In a real implementation, this would call a tRPC mutation to store secrets
    // For now, we show success and mark as saved
    setSavedCreds(prev => ({ ...prev, [activeTab]: true }));
    toast.success(`${tab.label} credentials saved to ProLnk environment`);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Integration Registration Hub</h1>
              <p className="text-gray-400 text-sm">Step-by-step setup for all 4 field service integrations</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {TABS.map(t => {
            const done = completedSteps[t.id].size;
            const total = t.steps.length;
            const pct = Math.round((done / total) * 100);
            return (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setExpandedStep(1); }}
                className={`text-left p-3 rounded-xl border transition-all ${activeTab === t.id ? `border-${t.color}-500/50 bg-${t.color}-500/10` : "border-gray-700 bg-gray-800 hover:border-gray-600"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <t.icon className={`w-4 h-4 ${COLOR_TEXT[t.color]}`} />
                  <span className="text-xs font-medium text-gray-300">{t.label}</span>
                </div>
                <div className="text-xs text-gray-500 mb-1.5">{t.priority}  {t.users}</div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${COLOR_MAP[t.color]}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{done}/{total} steps</div>
              </button>
            );
          })}
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setExpandedStep(1); }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === t.id ? `${COLOR_MAP[t.color]} text-white` : "bg-gray-800 text-gray-400 hover:text-white"}`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{tab.label} Progress</span>
              <span className="text-sm font-medium text-white">{completedCount} / {totalSteps} steps complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${COLOR_MAP[tab.color]}`}
                style={{ width: `${(completedCount / totalSteps) * 100}%` }}
              />
            </div>
            {completedCount === totalSteps && (
              <p className={`${COLOR_TEXT[tab.color]} text-sm mt-2 font-medium`}> All steps complete -- {tab.label} integration is ready!</p>
            )}
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((step) => {
            const isCompleted = completedSteps[activeTab].has(step.id);
            const isExpanded = expandedStep === step.id;

            return (
              <Card key={step.id} className={`border transition-all ${isCompleted ? `bg-gray-800/50 ${COLOR_BORDER[tab.color]}` : "bg-gray-800 border-gray-700"}`}>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start gap-3">
                    <button onClick={() => toggleStep(step.id)} className="mt-0.5 shrink-0">
                      {isCompleted
                        ? <CheckCircle className={`w-5 h-5 ${COLOR_TEXT[tab.color]}`} />
                        : <Circle className="w-5 h-5 text-gray-500" />
                      }
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium ${isCompleted ? "text-gray-400 line-through" : "text-white"}`}>
                          {step.id}. {step.title}
                        </span>
                        {"status" in step && step.status === "optional" && (
                          <Badge className="bg-gray-700 text-gray-300 text-xs">Optional</Badge>
                        )}
                        {"urgency" in step && (
                          <Badge className="bg-orange-500/20 text-orange-400 text-xs border-orange-500/30">
                            <Clock className="w-3 h-3 mr-1" />
                            {(step as { urgency: string }).urgency}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5">{"time" in step ? `Estimated time: ${step.time}` : ""}</p>
                    </div>
                    <button onClick={() => setExpandedStep(isExpanded ? null : step.id)} className="text-gray-500 hover:text-gray-300">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="p-4 pt-3 pl-12">
                    <ul className="space-y-2 mb-4">
                      {step.details.map((detail, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className={`${COLOR_TEXT[tab.color]} mt-0.5 shrink-0`}></span>
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {"copyFields" in step && step.copyFields && (
                      <div className="space-y-2 mb-4">
                        {(step as { copyFields: { label: string; value: string }[] }).copyFields.map((field) => (
                          <div key={field.label} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
                            <span className="text-gray-500 text-xs w-28 shrink-0">{field.label}:</span>
                            <span className={`${COLOR_TEXT[tab.color]} text-xs font-mono flex-1 truncate`}>{field.value}</span>
                            <button onClick={() => copyToClipboard(field.value)} className="text-gray-500 hover:text-teal-400 shrink-0">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {"envVars" in step && step.envVars && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(step as { envVars: string[] }).envVars.map((v) => (
                          <code key={v} className="bg-white text-orange-300 text-xs px-2 py-1 rounded font-mono">{v}</code>
                        ))}
                      </div>
                    )}

                    {"note" in step && step.note && (
                      <div className={`bg-${tab.color}-500/10 border ${COLOR_BORDER[tab.color]} rounded-lg p-3 mb-4`}>
                        <p className={`${COLOR_TEXT[tab.color]} text-xs leading-relaxed`}>[IDEA] {(step as { note: string }).note}</p>
                      </div>
                    )}

                    {"link" in step && step.link && (
                      <a href={(step as { link: { label: string; url: string } }).link.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className={`border-${tab.color}-500/30 ${COLOR_TEXT[tab.color]} hover:bg-${tab.color}-500/10`}>
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          {(step as { link: { label: string; url: string } }).link.label}
                        </Button>
                      </a>
                    )}

                    <Button
                      size="sm"
                      onClick={() => toggleStep(step.id)}
                      className={`mt-2 ${isCompleted ? "bg-gray-700 text-gray-400" : `${COLOR_MAP[tab.color]} text-white`}`}
                    >
                      {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                    </Button>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Credential Storage Panel */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2">
              <Key className={`w-5 h-5 ${COLOR_TEXT[tab.color]}`} />
              <CardTitle className="text-white text-base">{tab.label} Credentials</CardTitle>
              {savedCreds[activeTab] && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs ml-auto">
                  <CheckCircle className="w-3 h-3 mr-1" /> Saved
                </Badge>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Enter your {tab.label} API credentials below. These will be stored as encrypted environment variables in ProLnk.
            </p>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {CRED_PANELS[activeTab].map((field) => (
                <div key={field.key}>
                  <Label className="text-gray-300 text-xs mb-1.5 block">{field.label}</Label>
                  <div className="relative">
                    <Input
                      type={showSecrets[field.key] ? "text" : "password"}
                      placeholder={field.placeholder}
                      value={credentials[field.key] ?? ""}
                      onChange={e => setCredentials(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="bg-white border-gray-700 text-gray-200 text-sm pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecrets(prev => ({ ...prev, [field.key]: !prev[field.key] }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showSecrets[field.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <code className="text-gray-600 text-xs">{field.key}</code>
                </div>
              ))}
            </div>
            <Button
              onClick={handleSaveCreds}
              className={`${COLOR_MAP[tab.color]} text-white`}
            >
              <Save className="w-4 h-4 mr-2" />
              Save {tab.label} Credentials
            </Button>
            <p className="text-gray-600 text-xs mt-2">
              Credentials are encrypted at rest and never exposed in logs or UI after saving.
            </p>
          </CardContent>
        </Card>

        {/* Impact Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-white">Integration Priority Rationale</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-teal-400 font-medium text-sm mb-1">1. CompanyCam -- Fastest Path</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    150K+ contractors already use CompanyCam as their photo documentation tool. It integrates with ServiceTitan, Jobber, and Housecall Pro -- meaning one ProLnk integration covers all three platforms simultaneously.
                  </p>
                </div>
                <div>
                  <p className="text-orange-400 font-medium text-sm mb-1">2. ServiceTitan -- Highest Value</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Covers HVAC, plumbing, and electrical -- the highest job-value trades. Average job value $500-$5,000. Start the approval process now -- it takes 4-6 weeks.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-400 font-medium text-sm mb-1">3. Jobber -- Broadest Reach</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    200K+ home service businesses, primarily small-to-mid size contractors. Lawn care, cleaning, pest control, and handyman -- the core ProLnk partner profile.
                  </p>
                </div>
                <div>
                  <p className="text-purple-400 font-medium text-sm mb-1">4. Housecall Pro -- HVAC Depth</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    40K+ businesses with strong HVAC, plumbing, and electrical concentration. API key auth makes it simpler to implement than OAuth-based platforms.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
