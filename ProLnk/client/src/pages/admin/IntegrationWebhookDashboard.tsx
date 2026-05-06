import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Webhook, CheckCircle2, XCircle, Clock, Camera, Wrench, Building2, Zap, FileText, ArrowRight, ExternalLink, Shield, RefreshCw } from "lucide-react";

const INTEGRATION_ICONS: Record<string, any> = {
  companyCam: Camera,
  serviceTitan: Building2,
  jobber: Wrench,
  housecallPro: Wrench,
  zapier: Zap,
  n8n: RefreshCw,
};

const STATUS_STYLES: Record<string, { badge: string; text: string }> = {
  configured: { badge: "bg-green-500/20 text-green-400", text: "Connected" },
  not_configured: { badge: "bg-slate-500/20 text-slate-400", text: "Not Configured" },
  error: { badge: "bg-red-500/20 text-red-400", text: "Error" },
};

export default function IntegrationWebhookDashboard() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const statusQuery = trpc.integrationWebhooks.getStatus.useQuery();
  const testMutation = trpc.integrationWebhooks.testWebhook.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Webhook test failed");
    },
  });

  const integrations = statusQuery.data || {};
  const selectedDocs = selectedIntegration
    ? trpc.integrationWebhooks.getApiDocs.useQuery(
        { integration: selectedIntegration as any },
        { enabled: !!selectedIntegration }
      )
    : null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Webhook className="h-6 w-6 text-blue-400" />
            Integration Webhooks
          </h1>
          <p className="text-slate-400 mt-1">Manage webhook connections with field service management platforms</p>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(integrations).map(([key, integration]: [string, any]) => {
            const Icon = INTEGRATION_ICONS[key] || Webhook;
            const status = STATUS_STYLES[integration.status] || STATUS_STYLES.not_configured;
            return (
              <Card key={key} className="bg-slate-800/60 border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{integration.name}</h3>
                        <Badge className={status.badge + " text-xs mt-1"}>
                          {integration.status === "configured" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {status.text}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{integration.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {integration.features?.map((feature: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs border-slate-600 text-slate-400">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 flex-1"
                      onClick={() => {
                        if (["companycam", "servicetitan", "jobber", "housecallpro"].includes(key.toLowerCase().replace(/([A-Z])/g, (m) => m.toLowerCase()))) {
                          setSelectedIntegration(key === "companyCam" ? "companycam" : key === "serviceTitan" ? "servicetitan" : key === "housecallPro" ? "housecallpro" : key);
                        } else {
                          toast.info("Documentation coming soon");
                        }
                      }}
                    >
                      <FileText className="h-3 w-3 mr-1" /> Docs
                    </Button>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 flex-1"
                      onClick={() => {
                        const integrationKey = key === "companyCam" ? "companycam" : key === "serviceTitan" ? "servicetitan" : key === "housecallPro" ? "housecallpro" : key;
                        testMutation.mutate({ integration: integrationKey as any });
                      }}
                      disabled={testMutation.isPending}
                    >
                      <Shield className="h-3 w-3 mr-1" /> Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Webhook Configuration Guide */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-400" />
              Integration Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                { step: "1", title: "Get API Keys", desc: "Sign up for the integration platform and generate API credentials", icon: Shield },
                { step: "2", title: "Configure Webhook", desc: "Add the webhook URL to the platform's webhook settings", icon: Webhook },
                { step: "3", title: "Test Connection", desc: "Send a test event to verify the webhook is working", icon: RefreshCw },
                { step: "4", title: "Go Live", desc: "Enable the integration and start syncing data automatically", icon: CheckCircle2 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h4 className="text-sm font-medium text-white">Step {item.step}: {item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* API Docs Dialog */}
        <Dialog open={!!selectedIntegration} onOpenChange={() => setSelectedIntegration(null)}>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                API Documentation
              </DialogTitle>
            </DialogHeader>
            {selectedDocs?.data && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedDocs.data.name}</h3>
                  <p className="text-sm text-slate-400">Base URL: <code className="text-teal-400">{selectedDocs.data.baseUrl}</code></p>
                  <p className="text-sm text-slate-400">Auth: <Badge variant="outline" className="border-slate-600 text-slate-300 ml-1">{selectedDocs.data.authType}</Badge></p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Webhook Events</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedDocs.data.webhookEvents?.map((event: string, i: number) => (
                      <Badge key={i} className="bg-blue-500/20 text-blue-400 text-xs">{event}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Endpoints</h4>
                  <div className="space-y-2">
                    {selectedDocs.data.endpoints?.map((endpoint: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-slate-800 rounded">
                        <Badge className={endpoint.method === "GET" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm text-teal-400 flex-1">{endpoint.path}</code>
                        <span className="text-xs text-slate-500">{endpoint.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Data Mapping</h4>
                  <div className="space-y-1">
                    {Object.entries(selectedDocs.data.dataMapping || {}).map(([from, to]: [string, any]) => (
                      <div key={from} className="flex items-center gap-2 text-xs">
                        <code className="text-slate-400">{from}</code>
                        <ArrowRight className="h-3 w-3 text-slate-600" />
                        <code className="text-teal-400">{to}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedIntegration(null)} className="border-slate-700 text-slate-300">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
