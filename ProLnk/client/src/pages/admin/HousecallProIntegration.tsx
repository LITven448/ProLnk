import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink, Zap, ArrowRight, Users, TrendingUp,
  Clock, Home, CheckCircle2, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const HCP_STATS = [
  { label: "Contractors on HCP", value: "40,000+", icon: Users },
  { label: "Primary Segments", value: "Cleaning, HVAC, Lawn", icon: Home },
  { label: "Avg Job Value", value: "$200-$600", icon: TrendingUp },
  { label: "API Type", value: "REST + Webhooks", icon: Zap },
];

const API_ENDPOINTS = [
  { method: "GET", path: "/v1/jobs/{id}/attachments", desc: "Fetch all photos attached to a job", critical: true },
  { method: "GET", path: "/v1/jobs?status=completed", desc: "Poll for recently completed jobs", critical: true },
  { method: "GET", path: "/v1/customers/{id}", desc: "Get customer address for geo-routing", critical: false },
  { method: "GET", path: "/v1/invoices/{id}", desc: "Confirm job completion and invoice amount", critical: false },
];

const SEGMENTS = [
  { name: "House Cleaning", icon: "", avgJob: "$150-$300", frequency: "Weekly" },
  { name: "HVAC", icon: "", avgJob: "$300-$800", frequency: "Seasonal" },
  { name: "Lawn & Landscaping", icon: "", avgJob: "$100-$400", frequency: "Weekly" },
  { name: "Pest Control", icon: "", avgJob: "$150-$350", frequency: "Monthly" },
  { name: "Window Cleaning", icon: "", avgJob: "$200-$500", frequency: "Quarterly" },
  { name: "Pressure Washing", icon: "", avgJob: "$200-$600", frequency: "Seasonal" },
];

const LIMITATIONS = [
  { issue: "No real-time webhooks for photo uploads", workaround: "Poll /v1/jobs?status=completed every 15 minutes -- acceptable latency for lead routing", severity: "low" },
  { issue: "OAuth requires HCP Pro plan ($129/mo)", workaround: "Only affects partners on the free HCP tier -- ~20% of HCP users. Offer to cover the upgrade cost for Founding Partners.", severity: "medium" },
  { issue: "Photo URLs expire after 24 hours", workaround: "Download and store photos in ProLnk S3 immediately upon receipt -- already handled in Intake Router", severity: "low" },
];

export default function HousecallProIntegration() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Housecall Pro Integration</h1>
              <p className="text-gray-500 text-sm">REST API + polling integration for residential service partners</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-700 text-sm px-3 py-1">Tier 1 Priority  5 Day Build</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HCP_STATS.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className="h-8 w-8 text-blue-500 shrink-0" />
                <div>
                  <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partner Segments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Partner Segments on Housecall Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SEGMENTS.map((seg) => (
                <div key={seg.name} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                  <span className="text-2xl">{seg.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{seg.name}</p>
                    <p className="text-xs text-gray-500">{seg.avgJob}  {seg.frequency}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              API Endpoints Used
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {API_ENDPOINTS.map((ep) => (
              <div key={ep.path} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Badge className={`text-xs shrink-0 ${ep.method === "GET" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{ep.method}</Badge>
                <code className="text-xs font-mono text-gray-700 flex-1">{ep.path}</code>
                <p className="text-xs text-gray-500 hidden md:block">{ep.desc}</p>
                {ep.critical && <Badge className="bg-red-100 text-red-700 text-xs shrink-0">Critical</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Flow */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Data Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium">Partner completes job in HCP</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">ProLnk polls /v1/jobs every 15 min</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-medium">Fetch attachments for new jobs</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded-lg font-medium">AI scans  leads routed</div>
            </div>
            <p className="text-xs text-gray-500 mt-3">15-minute polling latency is acceptable for lead routing -- partners won't notice the difference.</p>
          </CardContent>
        </Card>

        {/* Known Limitations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              Known Limitations & Workarounds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {LIMITATIONS.map((lim, idx) => (
              <div key={idx}>
                <div className="flex items-start gap-3">
                  <Badge className={`text-xs shrink-0 mt-0.5 ${lim.severity === "medium" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"}`}>
                    {lim.severity === "medium" ? "Medium" : "Low"}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{lim.issue}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-start gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                      {lim.workaround}
                    </p>
                  </div>
                </div>
                {idx < LIMITATIONS.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Setup Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Register ProLnk at developer.housecallpro.com  Create OAuth App",
              "Set redirect URI: https://prolnk.io/api/oauth/housecallpro/callback",
              "Add HOUSECALLPRO_CLIENT_ID and HOUSECALLPRO_CLIENT_SECRET to ProLnk secrets",
              "Enable the polling job in server/intake-router.ts (already scaffolded)",
              "Partners connect via 'Connect Housecall Pro' in their Integration Settings",
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex gap-3">
          <a href="https://developer.housecallpro.com" target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
              Open Housecall Pro Developer Portal <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
          <Button variant="outline" className="flex-1" onClick={() => toast.success("Added to build queue")}>
            Add to Build Queue
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
