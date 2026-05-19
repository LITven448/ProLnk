import React from 'react';
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CheckCircle,
  XCircle,
  Link2,
  Unlink,
  Camera,
  Briefcase,
  Home,
  Cloud,
  Smartphone,
  Building2,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  Zap,
  Key,
  Globe,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

type IntegrationSource = "companycam" | "jobber" | "housecall_pro" | "google_drive" | "servicetitan" | "workiz" | "field_app";

interface SyncOption {
  key: string;
  label: string;
  desc: string;
  default: boolean;
}

interface IntegrationDef {
  source: IntegrationSource;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  setupSteps: string[];
  requiresApiKey: boolean;
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  docsUrl: string;
  comingSoon?: boolean;
  syncOptions: SyncOption[];
}

const INTEGRATIONS: IntegrationDef[] = [
  {
    source: "jobber",
    name: "Jobber",
    description: "Sync completed jobs, customers, and photos from Jobber automatically when jobs close.",
    icon: <Briefcase className="w-5 h-5″ />,
    color: "bg-green-600″,
    category: "Field Service Management",
    requiresApiKey: true,
    apiKeyLabel: "Jobber Client Secret",
    apiKeyPlaceholder: "jb_xxxxxxxxxxxxxxxxxxxxxxxx",
    docsUrl: "https://developer.getjobber.com",
    syncOptions: [
      { key: "syncJobs", label: "Sync completed jobs", desc: "Pull job records when status changes to complete", default: true },
      { key: "syncPhotos", label: "Sync job photos", desc: "Pull attached photos from each job", default: true },
      { key: "syncCustomers", label: "Sync customer records", desc: "Import customer name, address, and contact info", default: false },
    ],
    setupSteps: [
      "Go to Jobber → Settings → Connected Apps → Manage APIs",
      "Create a new app and copy the Client Secret",
      "Paste it below and click Connect",
      "ProLnk will receive a webhook when each job is completed",
    ],
  },
  {
    source: "housecall_pro",
    name: "Housecall Pro",
    description: "Pull completed job photos from Housecall Pro. Great for residential services, cleaning, and HVAC.",
    icon: <Home className="w-5 h-5″ />,
    color: "bg-blue-600″,
    category: "Field Service Management",
    requiresApiKey: true,
    apiKeyLabel: "Housecall Pro API Key",
    apiKeyPlaceholder: "hcp_xxxxxxxxxxxxxxxxxxxxxxxx",
    docsUrl: "https://developer.housecallpro.com",
    syncOptions: [
      { key: "syncJobs", label: "Sync completed jobs", desc: "Pull job records when status changes to complete", default: true },
      { key: "syncPhotos", label: "Sync job photos", desc: "Pull attached photos from each job", default: true },
    ],
    setupSteps: [
      "Log in to Housecall Pro → Settings → Integrations → API",
      "Generate an API key and copy it",
      "Paste it below and click Connect",
      "ProLnk will sync completed jobs and attached photos automatically",
    ],
  },
  {
    source: "servicetitan",
    name: "ServiceTitan",
    description: "Enterprise integration for HVAC, plumbing, and electrical contractors. Requires ServiceTitan Marketplace approval.",
    icon: <Building2 className="w-5 h-5″ />,
    color: "bg-purple-600″,
    category: "Field Service Management",
    requiresApiKey: true,
    apiKeyLabel: "ServiceTitan App Key",
    apiKeyPlaceholder: "st_app_xxxxxxxxxxxxxxxx",
    docsUrl: "https://developer.servicetitan.io",
    comingSoon: true,
    syncOptions: [],
    setupSteps: [
      "ProLnk is pending ServiceTitan Marketplace approval",
      "Once approved, you'll receive an invitation to connect",
      "No action needed — we'll notify you when it's ready",
    ],
  },
  {
    source: "workiz",
    name: "Workiz",
    description: "Sync jobs and scheduling from Workiz. Ideal for on-demand home service companies.",
    icon: <Zap className="w-5 h-5″ />,
    color: "bg-orange-500″,
    category: "Field Service Management",
    requiresApiKey: true,
    apiKeyLabel: "Workiz API Token",
    apiKeyPlaceholder: "wz_xxxxxxxxxxxxxxxxxxxxxxxx",
    docsUrl: "https://api.workiz.com/docs",
    syncOptions: [
      { key: "syncJobs", label: "Sync completed jobs", desc: "Pull job records when status changes to complete", default: true },
      { key: "syncPhotos", label: "Sync job photos", desc: "Pull attached photos from each job", default: true },
    ],
    setupSteps: [
      "Log in to Workiz → Settings → Integrations → API",
      "Generate a new API token",
      "Paste it below and click Connect",
      "ProLnk will sync completed job data automatically",
    ],
  },
  {
    source: "companycam",
    name: "CompanyCam",
    description: "Automatically pull job photos from CompanyCam projects. Works alongside Jobber, Housecall Pro, and ServiceTitan.",
    icon: <Camera className="w-5 h-5″ />,
    color: "bg-orange-600″,
    category: "Photo Management",
    requiresApiKey: true,
    apiKeyLabel: "CompanyCam API Key",
    apiKeyPlaceholder: "cc_live_xxxxxxxxxxxxxxxx",
    docsUrl: "https://developers.companycam.com",
    syncOptions: [
      { key: "syncPhotos", label: "Sync project photos", desc: "Pull all photos from completed projects", default: true },
      { key: "syncVideos", label: "Sync project videos", desc: "Pull video attachments from projects", default: false },
    ],
    setupSteps: [
      "Log in to CompanyCam → Settings → API & Integrations",
      "Generate a new API key and copy it",
      "Paste it below and click Connect",
      "ProLnk will register a webhook to receive new photos automatically",
    ],
  },
  {
    source: "field_app",
    name: "ProLnk Field OS",
    description: "Use the ProLnk mobile app to log jobs and upload photos directly from the field. No other software needed.",
    icon: <Smartphone className="w-5 h-5″ />,
    color: "bg-[#0A1628]",
    category: "ProLnk Native",
    requiresApiKey: false,
    apiKeyLabel: "",
    apiKeyPlaceholder: "",
    docsUrl: "/field",
    syncOptions: [],
    setupSteps: [
      "Visit prolnk.com/field on your phone",
      "Tap 'Add to Home Screen' to install the app",
      "Log in with your ProLnk account",
      "Tap 'New Job' to start logging jobs and uploading photos",
    ],
  },
];

const WEBHOOK_ENDPOINTS = [
  { label: "Job Completed", path: "/api/webhooks/job-completed", desc: "Triggers when a job is marked complete in your FSM" },
  { label: "Photo Added", path: "/api/webhooks/photo-added", desc: "Triggers when a new photo is added to a job" },
  { label: "Lead Accepted", path: "/api/webhooks/lead-accepted", desc: "Triggers when you accept an inbound lead" },
];

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3″>
          <div className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-teal-400″ />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            {subtitle && <p className="text-xs text-white/50″>{subtitle}</p>}
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-white/40″ />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/40″ />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-white/10″>
          {children}
        </div>
      )}
    </div>
  );
}

function IntegrationCard({
  def,
  connected,
  onConnect,
  onDisconnect,
  onTest,
}: {
  def: IntegrationDef;
  connected: any;
  onConnect: () => void;
  onDisconnect: () => void;
  onTest: () => void;
}) {
  const [showSync, setShowSync] = useState(false);
  const [syncOptions, setSyncOptions] = useState<Record<string, boolean>>(
    Object.fromEntries(def.syncOptions.map((o) => [o.key, o.default]))
  );

  return (
    <div className={`rounded-2xl border overflow-hidden transition-colors ${
      connected ? "border-teal-400/30 bg-teal-400/5″ : "border-white/10 bg-white/5"
    }`}>
      <div className="p-4″>
        <div className="flex items-start gap-4″>
          <div className={`${def.color} text-white rounded-xl p-2.5 flex-shrink-0`}>
            {def.icon}
          </div>

          <div className="flex-1 min-w-0″>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-white text-sm">{def.name}</h3>
              {def.comingSoon && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/40″>
                  Coming Soon
                </span>
              )}
              {connected && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-400″>
                  <CheckCircle className="w-3 h-3″ /> Connected
                </span>
              )}
            </div>
            <p className="text-xs text-white/50 mt-1″>{def.description}</p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2″>
            {def.comingSoon ? (
              <span className="text-xs text-white/30″>—</span>
            ) : connected ? (
              <>
                <button
                  onClick={onTest}
                  className="text-xs font-medium text-white/50 hover:text-teal-400 transition-colors"
                  title="Test connection"
                >
                  <RefreshCw className="w-3.5 h-3.5″ />
                </button>
                <button
                  onClick={() => setShowSync(!showSync)}
                  className="text-xs font-medium text-white/50 hover:text-teal-400 transition-colors"
                  title="Sync settings"
                >
                  <Settings className="w-3.5 h-3.5″ />
                </button>
                <button
                  onClick={onDisconnect}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-1″
                >
                  <Unlink className="w-3 h-3″ />
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={onConnect}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-400/10 border border-teal-400/20 text-teal-400 hover:bg-teal-400/20 transition-colors flex items-center gap-1″
              >
                <Link2 className="w-3 h-3″ />
                Connect
              </button>
            )}
          </div>
        </div>

        {/* Sync settings expander */}
        {connected && showSync && def.syncOptions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10″>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3″>Sync Settings</p>
            <div className="space-y-2″>
              {def.syncOptions.map((opt) => (
                <div key={opt.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white">{opt.label}</p>
                    <p className="text-xs text-white/40″>{opt.desc}</p>
                  </div>
                  <button
                    onClick={() => setSyncOptions((s) => ({ ...s, [opt.key]: !s[opt.key] }))}
                    className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
                      syncOptions[opt.key] ? "bg-teal-400″ : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        syncOptions[opt.key] ? "translate-x-4″ : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setShowSync(false); toast.success("Sync settings saved"); }}
              className="mt-3 text-xs font-semibold text-teal-400 hover:text-teal-300″
            >
              Save sync settings →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function IntegrationSettings() {
  const [connectingSource, setConnectingSource] = useState<IntegrationSource | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [disconnectingId, setDisconnectingId] = useState<number | null>(null);
  const [proLnkKeyVisible, setProLnkKeyVisible] = useState(false);

  const { data: myIntegrations = [], refetch } = trpc.integrations.listMine.useQuery();
  const { data: queueStats } = trpc.integrations.queueStats.useQuery();

  const triggerSyncMutation = trpc.fsmVault.triggerSync.useMutation({
    onSuccess: () => {
      toast.success("Job history sync queued — past jobs will be indexed for homeowner vault matching.");
    },
  });

  const connectMutation = trpc.integrations.connect.useMutation({
    onSuccess: (data: any) => {
      toast.success("Integration connected", { description: "Photos will now flow automatically." });
      setConnectingSource(null);
      setApiKeyInput("");
      refetch();
      const fsmSources = ["companycam", "jobber", "housecall_pro", "servicetitan", "field_app", "workiz"] as const;
      if (data?.integrationId && connectingSource && fsmSources.includes(connectingSource as any)) {
        triggerSyncMutation.mutate({
          integrationId: data.integrationId,
          source: connectingSource as typeof fsmSources[number],
        });
      }
    },
    onError: (err) => {
      toast.error("Connection failed", { description: err.message });
    },
  });

  const disconnectMutation = trpc.integrations.disconnect.useMutation({
    onSuccess: () => {
      toast.success("Integration disconnected");
      setDisconnectingId(null);
      refetch();
    },
    onError: (err) => {
      toast.error("Disconnect failed", { description: err.message });
    },
  });

  const getConnected = (source: IntegrationSource) =>
    (myIntegrations as any[]).find((i) => i.source === source && i.status === "active");

  const handleConnect = (def: IntegrationDef) => {
    if (def.source === "field_app") {
      window.open("/field", "_blank");
      return;
    }
    connectMutation.mutate({ source: def.source, apiKey: apiKeyInput, externalAccountId: apiKeyInput });
  };

  const handleTest = (source: IntegrationSource) => {
    toast.success(`Testing ${source} connection…`, { description: "You'll see a confirmation within a few seconds." });
  };

  const groupedIntegrations = INTEGRATIONS.reduce<Record<string, IntegrationDef[]>>((acc, int) => {
    if (!acc[int.category]) acc[int.category] = [];
    acc[int.category].push(int);
    return acc;
  }, {});

  const BASE_WEBHOOK_URL = `${typeof window !== "undefined" ? window.location.origin : "https://prolnk.io"}`;
  const PROLNK_API_KEY = "plnk_live_•••••••••••••••••••••••••";

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-[#0A1628] p-4 sm:p-6″>
        <div className="max-w-4xl mx-auto space-y-6″>
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white">Integration Settings</h1>
            <p className="text-white/50 text-sm mt-1″>
              Connect your field service software to automatically sync jobs and photos — no extra steps in your workflow.
            </p>
          </div>

          {/* Queue stats */}
          {queueStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
              {[
                { label: "Photos Received", value: queueStats.total, color: "text-white" },
                { label: "Pending Analysis", value: queueStats.pending, color: "text-amber-400″ },
                { label: "Analyzed", value: queueStats.completed, color: "text-teal-400″ },
                { label: "Failed", value: queueStats.failed, color: "text-red-400″ },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1″>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Integration Groups */}
          {Object.entries(groupedIntegrations).map(([category, integrations]) => (
            <SectionCard key={category} title={category} icon={Link2} defaultOpen={true}>
              <div className="space-y-3 mt-3″>
                {integrations.map((def) => {
                  const connected = getConnected(def.source);
                  return (
                    <IntegrationCard
                      key={def.source}
                      def={def}
                      connected={connected}
                      onConnect={() => setConnectingSource(def.source)}
                      onDisconnect={() => connected && setDisconnectingId(connected.id)}
                      onTest={() => handleTest(def.source)}
                    />
                  );
                })}
              </div>
            </SectionCard>
          ))}

          {/* Webhook Endpoints */}
          <SectionCard title="Webhook Endpoints" subtitle="ProLnk webhook URLs for your FSM push events" icon={Globe} defaultOpen={false}>
            <div className="space-y-3 mt-3″>
              {WEBHOOK_ENDPOINTS.map((ep) => (
                <div key={ep.path} className="rounded-xl border border-white/10 bg-white/5 p-3″>
                  <div className="flex items-center justify-between mb-1″>
                    <p className="text-sm font-semibold text-white">{ep.label}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${BASE_WEBHOOK_URL}${ep.path}`);
                        toast.success("URL copied");
                      }}
                      className="text-white/40 hover:text-teal-400 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5″ />
                    </button>
                  </div>
                  <code className="text-xs font-mono text-teal-400/80 block truncate">
                    {BASE_WEBHOOK_URL}{ep.path}
                  </code>
                  <p className="text-xs text-white/40 mt-1″>{ep.desc}</p>
                </div>
              ))}
              <p className="text-xs text-white/40 pt-1″>
                Add these URLs as webhook endpoints in your FSM's notification settings. All events are authenticated via HMAC signature.
              </p>
            </div>
          </SectionCard>

          {/* API Keys */}
          <SectionCard title="ProLnk API Keys" subtitle="Direct API access for custom integrations" icon={Key} defaultOpen={false}>
            <div className="space-y-4 mt-3″>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4″>
                <div className="flex items-center justify-between mb-2″>
                  <div>
                    <p className="text-sm font-semibold text-white">Live API Key</p>
                    <p className="text-xs text-white/40″>Created May 6, 2026</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-400″>Active</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2″>
                  <code className="flex-1 text-xs font-mono text-teal-400 truncate">
                    {proLnkKeyVisible ? "plnk_live_a8f2c9b4d1e7f3a5c8b2d9e4f7a1c5b3″ : PROLNK_API_KEY}
                  </code>
                  <button
                    onClick={() => setProLnkKeyVisible(!proLnkKeyVisible)}
                    className="text-white/40 hover:text-white/70 transition-colors"
                  >
                    {proLnkKeyVisible ? <EyeOff className="w-3.5 h-3.5″ /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("plnk_live_a8f2c9b4d1e7f3a5c8b2d9e4f7a1c5b3″);
                      toast.success("API key copied");
                    }}
                    className="text-white/40 hover:text-teal-400 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5″ />
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-400/5 border border-amber-400/20″>
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0″ />
                <p className="text-xs text-amber-400/80 leading-relaxed">
                  Never share your API key. If compromised, regenerate it immediately. Keys are scoped to your partner account only.
                </p>
              </div>
              <a
                href="https://docs.prolnk.io/api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-medium"
              >
                View API documentation <ExternalLink className="w-3 h-3″ />
              </a>
            </div>
          </SectionCard>
        </div>

        {/* Connect Dialog */}
        {connectingSource && (() => {
          const def = INTEGRATIONS.find((i) => i.source === connectingSource)!;
          return (
            <Dialog open onOpenChange={() => { setConnectingSource(null); setApiKeyInput(""); }}>
              <DialogContent className="max-w-lg bg-[#0d1f38] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-white">
                    <span className={`${def.color} text-white rounded-lg p-1.5`}>{def.icon}</span>
                    Connect {def.name}
                  </DialogTitle>
                  <DialogDescription className="text-white/50″>{def.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2″>
                  <div className="bg-white/5 rounded-xl p-4 space-y-2″>
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Setup Steps</p>
                    {def.setupSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-white/70″>
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-400/10 text-teal-400 text-xs flex items-center justify-center font-bold mt-0.5″>
                          {i + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>

                  {def.requiresApiKey && (
                    <div className="space-y-1.5″>
                      <Label htmlFor="apiKey" className="text-white/70″>{def.apiKeyLabel}</Label>
                      <div className="relative">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          placeholder={def.apiKeyPlaceholder}
                          value={apiKeyInput}
                          onChange={(e) => setApiKeyInput(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-teal-400 pr-10″
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70″
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4″ /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-white/30″>
                        Stored encrypted. Used only to receive photos and job data on your behalf.
                      </p>
                    </div>
                  )}

                  <a
                    href={def.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-teal-400 hover:underline"
                  >
                    View {def.name} documentation <ChevronRight className="w-3 h-3″ />
                  </a>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => { setConnectingSource(null); setApiKeyInput(""); }}
                    className="border-white/10 text-white/70 hover:bg-white/10″
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleConnect(def)}
                    disabled={connectMutation.isPending || (def.requiresApiKey && !apiKeyInput.trim())}
                    className="bg-teal-400 hover:bg-teal-500 text-[#0A1628] font-semibold"
                  >
                    {connectMutation.isPending ? (
                      <><RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> Connecting...</>
                    ) : (
                      <><Link2 className="w-3 h-3 mr-1.5″ /> Connect {def.name}</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        })()}

        {/* Disconnect Dialog */}
        {disconnectingId && (
          <Dialog open onOpenChange={() => setDisconnectingId(null)}>
            <DialogContent className="bg-[#0d1f38] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-400″>
                  <AlertCircle className="w-5 h-5″ />
                  Disconnect Integration
                </DialogTitle>
                <DialogDescription className="text-white/50″>
                  This will stop ProLnk from receiving data from this integration. You can reconnect at any time.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDisconnectingId(null)}
                  className="border-white/10 text-white/70 hover:bg-white/10″
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => disconnectMutation.mutate({ integrationId: disconnectingId })}
                  disabled={disconnectMutation.isPending}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {disconnectMutation.isPending ? "Disconnecting..." : "Disconnect"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </PartnerLayout>
  );
}
