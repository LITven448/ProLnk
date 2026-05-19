/**
 * Integration Settings — Connect FSM Tools
 * Route: /dashboard/integrations
 * Partners connect CompanyCam, Jobber, Housecall Pro, etc.
 */

import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap, CheckCircle, ExternalLink, Camera, Briefcase, Settings,
  AlertCircle, Clock,
} from "lucide-react";

const INTEGRATIONS = [
  {
    id: "companycam",
    name: "CompanyCam",
    description: "Sync job photos automatically. Every photo you take in CompanyCam enters the AI pipeline — no extra steps.",
    logo: "📸",
    category: "Photo Sync",
    priority: "HIGH VALUE",
    connectPath: "/api/integrations/companycam/connect",
    docsUrl: "https://developers.companycam.com",
  },
  {
    id: "jobber",
    name: "Jobber",
    description: "Pull completed jobs and photos from Jobber. Automatically backfills your last 90 days of jobs on connect.",
    logo: "📋",
    category: "Job Management",
    priority: "HIGH VALUE",
    connectPath: "/api/integrations/jobber/connect",
    docsUrl: "https://developer.getjobber.com",
  },
  {
    id: "housecall_pro",
    name: "Housecall Pro",
    description: "Receives job completion webhooks from Housecall Pro with ProLnk lead source tags.",
    logo: "🏠",
    category: "Job Management",
    priority: "ACTIVE",
    connectPath: null, // Webhook-based, no OAuth needed
    webhookUrl: "/api/webhooks/housecall-pro",
    docsUrl: "https://developer.housecallpro.com",
  },
  {
    id: "workiz",
    name: "Workiz",
    description: "Receives job completion webhooks from Workiz.",
    logo: "⚡",
    category: "Job Management",
    priority: "ACTIVE",
    connectPath: null,
    webhookUrl: "/api/webhooks/workiz",
  },
  {
    id: "servicetitan",
    name: "ServiceTitan",
    description: "Enterprise FSM integration — coming soon. Currently in approval process with Titan Exchange.",
    logo: "🏗️",
    category: "Enterprise",
    priority: "COMING SOON",
    connectPath: null,
    disabled: true,
  },
];

export default function IntegrationSettingsPage() {
  const integrations = trpc.integrations?.getMyIntegrations?.useQuery?.() ?? { data: [], isLoading: false };

  const connectedIds = new Set((integrations.data ?? []).map((i: any) => i.source));

  const handleConnect = (path: string) => {
    window.location.href = path;
  };

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Integrations</h1>
          <p className="text-gray-400 text-sm mt-1">Connect your existing tools to automate photo syncing and job tracking</p>
        </div>

        {/* Why connect section */}
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
          <h3 className="font-bold text-teal-400 text-sm flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4" />
            Why connect your tools?
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Photos sync automatically — no manual uploads needed</li>
            <li>• Historical job photos analyzed for past opportunities</li>
            <li>• FSM job completions automatically trigger commission tracking</li>
            <li>• Zero extra work — keep using your existing workflow</li>
          </ul>
        </div>

        {/* Integration list */}
        <div className="space-y-3">
          {INTEGRATIONS.map((integration) => {
            const isConnected = connectedIds.has(integration.id);
            return (
              <div
                key={integration.id}
                className={`bg-gray-800 rounded-xl p-5 border transition-all ${
                  isConnected ? "border-teal-500/30" : integration.disabled ? "border-gray-700 opacity-60" : "border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{integration.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{integration.name}</span>
                      <Badge className={`text-xs ${
                        integration.priority === "HIGH VALUE" ? "bg-teal-500/10 text-teal-400 border-teal-500/20" :
                        integration.priority === "ACTIVE" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        integration.priority === "COMING SOON" ? "bg-gray-700 text-gray-400" :
                        "bg-gray-700 text-gray-400"
                      }`}>
                        {integration.priority}
                      </Badge>
                      {isConnected && <CheckCircle className="w-4 h-4 text-teal-400" />}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{integration.description}</p>
                    <div className="text-gray-600 text-xs mt-1">{integration.category}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isConnected ? (
                      <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20">Connected</Badge>
                    ) : integration.disabled ? (
                      <Badge className="bg-gray-700 text-gray-500">Coming Soon</Badge>
                    ) : integration.connectPath ? (
                      <Button
                        size="sm"
                        className="bg-teal-500 hover:bg-teal-400 text-white gap-1"
                        onClick={() => handleConnect(integration.connectPath!)}
                      >
                        Connect <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    ) : (
                      <div className="text-center">
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs mb-1">Auto-configured</Badge>
                        <div className="text-gray-600 text-xs">Webhook-based</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Webhook info for webhook-based integrations */}
                {integration.webhookUrl && !isConnected && (
                  <div className="mt-3 bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Configure your {integration.name} account to send webhooks to:</p>
                    <code className="text-teal-400 text-xs">{window.location.origin}{integration.webhookUrl}</code>
                    <p className="text-gray-600 text-xs mt-1">Add your ProLnk partner ID as the lead source: <code className="text-gray-400">ProLnk-{"{your-id}"}</code></p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-xs">
          More integrations coming soon. Request one at support@prolnk.io
        </p>
      </div>
    </PartnerLayout>
  );
}
