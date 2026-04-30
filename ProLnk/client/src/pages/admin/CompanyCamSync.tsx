import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Camera, CheckCircle2, Settings, Zap, Link, RefreshCw,
  Building2, Users, TrendingUp, AlertTriangle, Copy
} from "lucide-react";
import { toast } from "sonner";

const CONNECTED_PARTNERS = [
  { id: 1, name: "DFW Lawn Masters", owner: "Marcus Johnson", companyCamId: "cc_8a2f1b", photosThisWeek: 34, leadsGenerated: 8, status: "active" },
  { id: 2, name: "Sparkle Clean Co.", owner: "Sarah Chen", companyCamId: "cc_3d9e4c", photosThisWeek: 21, leadsGenerated: 5, status: "active" },
  { id: 3, name: "Vega HVAC Services", owner: "Roberto Vega", companyCamId: "cc_7f2a8d", photosThisWeek: 18, leadsGenerated: 3, status: "active" },
];

const WEBHOOK_EVENTS = [
  { event: "photo.created", enabled: true, desc: "Trigger AI scan when a new photo is uploaded to any job" },
  { event: "photo.tagged", enabled: true, desc: "Re-scan when a photo is tagged with a relevant label" },
  { event: "job.completed", enabled: false, desc: "Batch scan all photos when a job is marked complete" },
  { event: "project.created", enabled: false, desc: "Notify ProLnk when a new project is started" },
];

const SETUP_STEPS = [
  { step: 1, title: "Register ProLnk on CompanyCam Marketplace", status: "complete", detail: "App ID: prolink-dfw-001" },
  { step: 2, title: "Configure webhook endpoint", status: "complete", detail: "https://your-domain.com/api/webhooks/companycam" },
  { step: 3, title: "Set webhook secret for signature verification", status: "complete", detail: "HMAC-SHA256 verified" },
  { step: 4, title: "Test webhook delivery", status: "complete", detail: "Last test: 2 hours ago -- 200 OK" },
  { step: 5, title: "Enable for all connected partners", status: "complete", detail: "3 partners active" },
];

export default function CompanyCamSync() {
  const [events, setEvents] = useState(WEBHOOK_EVENTS);
  const [autoRoute, setAutoRoute] = useState(true);
  const [confidenceFilter, setConfidenceFilter] = useState(65);

  const toggleEvent = (idx: number) => {
    setEvents(prev => prev.map((e, i) => i === idx ? { ...e, enabled: !e.enabled } : e));
    toast.success("Webhook event updated");
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText("https://your-domain.com/api/webhooks/companycam");
    toast.success("Webhook URL copied");
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Camera className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CompanyCam Deep Sync</h1>
              <p className="text-gray-500 text-sm">The master integration -- covers Jobber, HCP, ServiceTitan, and standalone users simultaneously</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 text-sm px-3 py-1 gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Live  3 Partners
          </Badge>
        </div>

        {/* Why CompanyCam First */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <Zap className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-purple-800 mb-1">Why CompanyCam is the Master Integration</p>
                <p className="text-sm text-purple-700">
                  CompanyCam integrates natively with ServiceTitan, Jobber, Housecall Pro, and 30+ other FSM platforms. 
                  A single ProLnk  CompanyCam integration silently captures photos from all of them. 
                  150,000+ contractors already use CompanyCam -- every one of them is a potential ProLnk partner 
                  who requires zero workflow change to start sending photos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Connected Partners", value: "3", icon: Users, color: "text-blue-500" },
            { label: "Photos This Week", value: "73", icon: Camera, color: "text-purple-500" },
            { label: "Leads Generated", value: "16", icon: TrendingUp, color: "text-green-500" },
            { label: "Avg Confidence", value: "84%", icon: Zap, color: "text-yellow-500" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className={`h-8 w-8 shrink-0 ${stat.color}`} />
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Integration Setup Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SETUP_STEPS.map((step, idx) => (
              <div key={step.step}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-400">{step.detail}</p>
                  </div>
                </div>
                {idx < SETUP_STEPS.length - 1 && <Separator className="mt-3 ml-9" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Webhook Config */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Link className="h-4 w-4 text-gray-500" />
              Webhook Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Webhook Endpoint</p>
                <code className="text-sm font-mono text-gray-800">https://your-domain.com/api/webhooks/companycam</code>
              </div>
              <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={copyWebhookUrl}>
                <Copy className="h-3 w-3" /> Copy
              </Button>
            </div>

            <div className="space-y-3">
              {events.map((event, idx) => (
                <div key={event.event} className="flex items-start justify-between gap-4">
                  <div>
                    <code className="text-xs font-mono text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{event.event}</code>
                    <p className="text-xs text-gray-500 mt-0.5">{event.desc}</p>
                  </div>
                  <Switch checked={event.enabled} onCheckedChange={() => toggleEvent(idx)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Routing Config */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-500" />
              AI Routing Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 text-sm">Auto-route leads to matching partners</p>
                <p className="text-xs text-gray-500">Automatically send detected opportunities to the best-matched partner in the same zip code</p>
              </div>
              <Switch checked={autoRoute} onCheckedChange={setAutoRoute} />
            </div>
            <Separator />
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Minimum AI confidence to generate lead</Label>
                <span className="text-sm font-bold text-gray-700">{confidenceFilter}%</span>
              </div>
              <input
                type="range"
                min={40}
                max={90}
                step={5}
                value={confidenceFilter}
                onChange={e => setConfidenceFilter(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>More leads (lower quality)</span>
                <span>Fewer leads (higher quality)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connected Partners */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              Connected Partners
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {CONNECTED_PARTNERS.map((partner, idx) => (
              <div key={partner.id}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Building2 className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800 text-sm">{partner.name}</p>
                      <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-gray-500">{partner.owner}  CompanyCam ID: {partner.companyCamId}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-semibold text-gray-700">{partner.photosThisWeek} photos</p>
                    <p className="text-gray-400">{partner.leadsGenerated} leads</p>
                  </div>
                </div>
                {idx < CONNECTED_PARTNERS.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2 mt-2" onClick={() => toast.info("Opening partner invite flow...")}>
              <Users className="h-4 w-4" /> Invite More Partners to Connect CompanyCam
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button className="flex-1 gap-2 bg-purple-600 hover:bg-purple-700" onClick={() => toast.success("Settings saved")}>
            <Settings className="h-4 w-4" /> Save Configuration
          </Button>
          <Button variant="outline" className="flex-1 gap-2" onClick={() => toast.success("Test webhook sent -- check pipeline monitor")}>
            <RefreshCw className="h-4 w-4" /> Send Test Webhook
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
