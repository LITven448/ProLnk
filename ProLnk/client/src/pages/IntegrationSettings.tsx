import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CheckCircle2,
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
} from "lucide-react";

type IntegrationSource = "companycam" | "jobber" | "housecall_pro" | "google_drive" | "servicetitan" | "field_app";

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
  webhookUrl?: string;
  docsUrl: string;
  comingSoon?: boolean;
}

const INTEGRATIONS: IntegrationDef[] = [
  {
    source: "companycam",
    name: "CompanyCam",
    description: "Automatically pull job photos from CompanyCam projects. Works with ServiceTitan, Jobber, and Housecall Pro.",
    icon: <Camera className="w-6 h-6" />,
    color: "bg-orange-500",
    category: "Photo Management",
    requiresApiKey: true,
    apiKeyLabel: "CompanyCam API Key",
    apiKeyPlaceholder: "cc_live_xxxxxxxxxxxxxxxx",
    docsUrl: "https://developers.companycam.com",
    setupSteps: [
      "Log in to CompanyCam  Settings  API & Integrations",
      "Generate a new API key and copy it",
      "Paste it below and click Connect",
      "ProLnk will register a webhook to receive new photos automatically",
    ],
  },
  {
    source: "jobber",
    name: "Jobber",
    description: "Sync completed jobs and photos from Jobber. Ideal for lawn care, pest control, cleaning, and pet waste services.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-green-600",
    category: "Field Service Management",
    requiresApiKey: true,
    apiKeyLabel: "Jobber Client Secret",
    apiKeyPlaceholder: "jb_xxxxxxxxxxxxxxxxxxxxxxxx",
    docsUrl: "https://developer.getjobber.com",
    setupSteps: [
      "Go to Jobber  Settings  Connected Apps  Manage APIs",
      "Create a new app and copy the Client Secret",
      "Paste it below and click Connect",
      "ProLnk will receive a webhook when each job is completed",
    ],
  },
  {
    source: "housecall_pro",
    name: "Housecall Pro",
    description: "Pull completed job photos from Housecall Pro. Great for residential services, cleaning, and HVAC.",
    icon: <Home className="w-6 h-6" />,
    color: "bg-blue-600",
    category: "Field Service Management",
    requiresApiKey: true,
    apiKeyLabel: "Housecall Pro API Key",
    apiKeyPlaceholder: "hcp_xxxxxxxxxxxxxxxxxxxxxxxx",
    docsUrl: "https://developer.housecallpro.com",
    setupSteps: [
      "Log in to Housecall Pro  Settings  Integrations  API",
      "Generate an API key and copy it",
      "Paste it below and click Connect",
      "ProLnk will sync completed jobs and attached photos automatically",
    ],
  },
  {
    source: "google_drive",
    name: "Google Drive",
    description: "Monitor a Google Drive folder for new job photos. Perfect for operators who organize photos in Drive.",
    icon: <Cloud className="w-6 h-6" />,
    color: "bg-yellow-500",
    category: "Cloud Storage",
    requiresApiKey: true,
    apiKeyLabel: "Google Drive Folder ID",
    apiKeyPlaceholder: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
    docsUrl: "https://developers.google.com/drive",
    setupSteps: [
      "Open the Google Drive folder where you store job photos",
      "Copy the folder ID from the URL (the long string after /folders/)",
      "Paste it below and click Connect",
      "ProLnk will check for new photos every hour",
    ],
  },
  {
    source: "field_app",
    name: "ProLnk Field OS",
    description: "Use the ProLnk mobile app to log jobs and upload photos directly from the field. No other software needed.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "bg-[#0A1628]",
    category: "ProLnk Native",
    requiresApiKey: false,
    apiKeyLabel: "",
    apiKeyPlaceholder: "",
    docsUrl: "/field",
    setupSteps: [
      "Visit prolnk.com/field on your phone",
      "Tap 'Add to Home Screen' to install the app",
      "Log in with your ProLnk account",
      "Tap 'New Job' to start logging jobs and uploading photos",
    ],
  },
  {
    source: "servicetitan",
    name: "ServiceTitan",
    description: "Enterprise integration for HVAC, plumbing, and electrical contractors. Requires ServiceTitan Marketplace approval.",
    icon: <Building2 className="w-6 h-6" />,
    color: "bg-purple-600",
    category: "Enterprise FSM",
    requiresApiKey: true,
    apiKeyLabel: "ServiceTitan App Key",
    apiKeyPlaceholder: "st_app_xxxxxxxxxxxxxxxx",
    docsUrl: "https://developer.servicetitan.io",
    comingSoon: true,
    setupSteps: [
      "ProLnk is pending ServiceTitan Marketplace approval",
      "Once approved, you'll receive an invitation to connect",
      "No action needed -- we'll notify you when it's ready",
    ],
  },
];

export default function IntegrationSettings() {
  const [connectingSource, setConnectingSource] = useState<IntegrationSource | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [disconnectingId, setDisconnectingId] = useState<number | null>(null);

  const { data: myIntegrations = [], refetch } = trpc.integrations.listMine.useQuery();
  const { data: queueStats } = trpc.integrations.queueStats.useQuery();

  const triggerSyncMutation = trpc.fsmVault.triggerSync.useMutation({
    onSuccess: () => {
      toast.success(`Job history sync queued`, { description: `Past jobs will be indexed for homeowner vault matching.` });
    },
  });

  const connectMutation = trpc.integrations.connect.useMutation({
    onSuccess: (data: any) => {
      toast.success("Integration connected", { description: "Photos will now flow automatically. Syncing your job history..." });
      setConnectingSource(null);
      setApiKeyInput("");
      refetch();
      // Trigger FSM historical job sync in the background (not applicable for google_drive)
      const fsmSources = ["companycam", "jobber", "housecall_pro", "servicetitan", "field_app"] as const;
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

  const getConnectedIntegration = (source: IntegrationSource) =>
    myIntegrations.find((i) => i.source === source && i.status === "active");

  const handleConnect = (def: IntegrationDef) => {
    if (def.source === "field_app") {
      window.open("/field", "_blank");
      return;
    }
    connectMutation.mutate({
      source: def.source,
      apiKey: apiKeyInput,
      externalAccountId: apiKeyInput,
    });
  };

  const groupedIntegrations = INTEGRATIONS.reduce<Record<string, IntegrationDef[]>>((acc, int) => {
    if (!acc[int.category]) acc[int.category] = [];
    acc[int.category].push(int);
    return acc;
  }, {});

  return (
    <PartnerLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integration Settings</h1>
          <p className="text-gray-500 mt-1">
            Connect your existing software so ProLnk can automatically receive job photos and detect opportunities -- no extra steps in your workflow.
          </p>
        </div>

        {/* Queue Stats */}
        {queueStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Photos Received", value: queueStats.total, color: "text-gray-900" },
              { label: "Pending Analysis", value: queueStats.pending, color: "text-yellow-600" },
              { label: "Analyzed", value: queueStats.completed, color: "text-green-600" },
              { label: "Failed", value: queueStats.failed, color: "text-red-500" },
            ].map((stat) => (
              <Card key={stat.label} className="text-center p-4">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </Card>
            ))}
          </div>
        )}

        {/* Integration Groups */}
        {Object.entries(groupedIntegrations).map(([category, integrations]) => (
          <div key={category}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h2>
            <div className="space-y-3">
              {integrations.map((def) => {
                const connected = getConnectedIntegration(def.source);
                return (
                  <Card key={def.source} className={`border ${connected ? "border-green-200 bg-green-50/30" : "border-gray-200"}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`${def.color} text-white rounded-xl p-3 flex-shrink-0`}>
                          {def.icon}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{def.name}</h3>
                            {def.comingSoon && (
                              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                            )}
                            {connected && (
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{def.description}</p>
                        </div>

                        {/* Action */}
                        <div className="flex-shrink-0">
                          {def.comingSoon ? (
                            <Button variant="outline" size="sm" disabled>
                              Coming Soon
                            </Button>
                          ) : connected ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => setDisconnectingId(connected.id)}
                            >
                              <Unlink className="w-3 h-3 mr-1" />
                              Disconnect
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-[#0A1628] hover:bg-teal-700 text-white"
                              onClick={() => setConnectingSource(def.source)}
                            >
                              <Link2 className="w-3 h-3 mr-1" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* Connect Dialog */}
        {connectingSource && (() => {
          const def = INTEGRATIONS.find((i) => i.source === connectingSource)!;
          return (
            <Dialog open onOpenChange={() => { setConnectingSource(null); setApiKeyInput(""); }}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span className={`${def.color} text-white rounded-lg p-1.5`}>{def.icon}</span>
                    Connect {def.name}
                  </DialogTitle>
                  <DialogDescription>{def.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  {/* Setup Steps */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Setup Steps</p>
                    {def.setupSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0A1628]/10 text-[#0A1628] text-xs flex items-center justify-center font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>

                  {/* API Key Input */}
                  {def.requiresApiKey && (
                    <div className="space-y-1.5">
                      <Label htmlFor="apiKey">{def.apiKeyLabel}</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder={def.apiKeyPlaceholder}
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                      />
                      <p className="text-xs text-gray-400">
                        Stored securely and never shared. Used only to receive photos on your behalf.
                      </p>
                    </div>
                  )}

                  {/* Docs Link */}
                  <a
                    href={def.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[#0A1628] hover:underline"
                  >
                    View {def.name} documentation <ChevronRight className="w-3 h-3" />
                  </a>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => { setConnectingSource(null); setApiKeyInput(""); }}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#0A1628] hover:bg-teal-700 text-white"
                    onClick={() => handleConnect(def)}
                    disabled={connectMutation.isPending || (def.requiresApiKey && !apiKeyInput.trim())}
                  >
                    {connectMutation.isPending ? (
                      <><RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Connecting...</>
                    ) : (
                      <><Link2 className="w-3 h-3 mr-1" /> Connect {def.name}</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        })()}

        {/* Disconnect Confirm Dialog */}
        {disconnectingId && (
          <Dialog open onOpenChange={() => setDisconnectingId(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  Disconnect Integration
                </DialogTitle>
                <DialogDescription>
                  This will stop ProLnk from receiving photos from this integration. You can reconnect at any time.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDisconnectingId(null)}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={() => disconnectMutation.mutate({ integrationId: disconnectingId })}
                  disabled={disconnectMutation.isPending}
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
