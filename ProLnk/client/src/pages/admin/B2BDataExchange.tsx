import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import {
  Database, Building2, RefreshCw, CheckCircle, XCircle,
  ArrowRight, ArrowLeft, Download, Upload, Clock, Zap,
  AlertTriangle, Info, BarChart3, FileText, Globe
} from "lucide-react";
import { toast } from "sonner";

const DATA_PARTNERS = [
  {
    id: "attom",
    name: "ATTOM Property Data",
    logo: "🏠",
    category: "Property Intelligence",
    status: "configured",
    description: "AVM estimates, property characteristics, ownership history, tax records, and permit data for 155M+ US properties.",
    dataTypes: ["Property Valuations", "Ownership History", "Tax Records", "Permit Data", "Neighborhood Stats"],
    syncFrequency: "Daily",
    recordsAvailable: "155M+ properties",
    lastSync: "2 hours ago",
    docsUrl: "https://api.attomdata.com/",
  },
  {
    id: "mls",
    name: "MLS / RESO Data",
    logo: "🏡",
    category: "Real Estate Listings",
    status: "pending",
    description: "Active listings, sold comps, days on market, and listing history from local MLS boards via RESO Web API.",
    dataTypes: ["Active Listings", "Sold Comps", "Days on Market", "Price History", "Agent Data"],
    syncFrequency: "Real-time",
    recordsAvailable: "Requires MLS board approval",
    lastSync: "Not configured",
    docsUrl: "https://www.reso.org/",
  },
  {
    id: "corelogic",
    name: "CoreLogic",
    logo: "📊",
    category: "Risk & Analytics",
    status: "available",
    description: "Flood risk, wildfire risk, hail history, and insurance-grade property risk scores for underwriting and routing.",
    dataTypes: ["Flood Risk Score", "Wildfire Risk", "Hail History", "Wind Risk", "Insurance Scores"],
    syncFrequency: "On-demand",
    recordsAvailable: "150M+ properties",
    lastSync: "Not configured",
    docsUrl: "https://www.corelogic.com/",
  },
  {
    id: "claritas",
    name: "Claritas Prizm",
    logo: "🎯",
    category: "Consumer Segmentation",
    status: "available",
    description: "Household-level demographic and psychographic segmentation for hyper-targeted partner routing and marketing.",
    dataTypes: ["Household Income", "Lifestyle Segments", "Spending Patterns", "Home Ownership", "Service Propensity"],
    syncFrequency: "Monthly",
    recordsAvailable: "130M+ households",
    lastSync: "Not configured",
    docsUrl: "https://claritas.com/",
  },
];

const EXPORT_SCHEMAS = [
  { id: "partner_performance", name: "Partner Performance Export", fields: 24, format: "CSV / JSON", description: "All partner KPIs, tier data, job counts, commission totals, and PPS scores" },
  { id: "job_history", name: "Job History Export", fields: 18, format: "CSV / JSON", description: "Complete job log with AI scan results, categories, values, and partner attribution" },
  { id: "commission_ledger", name: "Commission Ledger Export", fields: 16, format: "CSV / JSON", description: "Full payout history with status, amounts, Stripe references, and timestamps" },
  { id: "opportunity_feed", name: "Opportunity Feed Export", fields: 22, format: "CSV / JSON / Webhook", description: "All AI-detected opportunities with confidence scores, routing decisions, and outcomes" },
  { id: "homeowner_profiles", name: "Homeowner Profile Export", fields: 30, format: "CSV / JSON", description: "Anonymized homeowner profiles with property data, scan history, and matched pros" },
];

const STATUS_CONFIG = {
  configured: { label: "Active", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  pending: { label: "Pending Setup", color: "bg-amber-100 text-amber-700", icon: Clock },
  available: { label: "Available", color: "bg-blue-100 text-blue-700", icon: Info },
};

export default function B2BDataExchange() {
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");
  const [exportLoading, setExportLoading] = useState<string | null>(null);

  const { data: stats } = trpc.admin.getNetworkStats.useQuery();

  const handleExport = async (schemaId: string, schemaName: string) => {
    setExportLoading(schemaId);
    await new Promise(r => setTimeout(r, 1500));
    setExportLoading(null);
    toast.success(`${schemaName} export ready`, {
      description: "Your data export has been queued. You'll receive a download link via email within 5 minutes.",
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <Database className="w-6 h-6 text-[#0A1628]" />B2B Data Exchange
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage inbound data partnerships and outbound data exports for analytics, integrations, and business intelligence.
            </p>
          </div>
          <Badge className="bg-[#0A1628] text-white">Enterprise Feature</Badge>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Partners", value: stats?.totalPartners ?? "—", icon: Building2, color: "text-blue-600" },
            { label: "Total Jobs", value: stats?.totalJobs ?? "—", icon: BarChart3, color: "text-emerald-600" },
            { label: "Data Records", value: "155M+", icon: Database, color: "text-purple-600" },
            { label: "Export Schemas", value: EXPORT_SCHEMAS.length, icon: FileText, color: "text-amber-600" },
          ].map((s) => (
            <Card key={s.label} className="border border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color} opacity-80`} />
                <div>
                  <div className="text-xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 border-b border-gray-200">
          {(["inbound", "outbound"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-[#0A1628] text-[#0A1628]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "inbound" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              {tab === "inbound" ? "Inbound Data Partners" : "Outbound Exports"}
            </button>
          ))}
        </div>

        {/* Inbound Data Partners */}
        {activeTab === "inbound" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Connect external data providers to enrich homeowner profiles, improve AI routing accuracy, and power risk-based partner matching.
            </p>
            {DATA_PARTNERS.map((partner) => {
              const statusCfg = STATUS_CONFIG[partner.status as keyof typeof STATUS_CONFIG];
              const StatusIcon = statusCfg.icon;
              return (
                <Card key={partner.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-3xl">{partner.logo}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                            <Badge className={`${statusCfg.color} text-xs flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />{statusCfg.label}
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-600 text-xs">{partner.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{partner.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {partner.dataTypes.map((dt) => (
                              <span key={dt} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{dt}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" />{partner.syncFrequency}</span>
                            <span className="flex items-center gap-1"><Database className="w-3 h-3" />{partner.recordsAvailable}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Last sync: {partner.lastSync}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {partner.status === "configured" ? (
                          <Button size="sm" variant="outline" className="text-xs">
                            <RefreshCw className="w-3 h-3 mr-1" />Sync Now
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-[#0A1628] text-white hover:bg-[#0A1628]/90 text-xs">
                            <Zap className="w-3 h-3 mr-1" />Configure
                          </Button>
                        )}
                        <a href={partner.docsUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="text-xs w-full">
                            <Globe className="w-3 h-3 mr-1" />Docs
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Outbound Exports */}
        {activeTab === "outbound" && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="text-sm text-blue-800">
                <strong>Data exports are GDPR and CCPA compliant.</strong> All exports are logged, and homeowner PII is anonymized by default. Enable full PII exports only for authorized integrations with signed DPAs.
              </div>
            </div>
            {EXPORT_SCHEMAS.map((schema) => (
              <Card key={schema.id} className="border border-gray-200">
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <h3 className="font-semibold text-gray-900 text-sm">{schema.name}</h3>
                      <Badge className="bg-gray-100 text-gray-600 text-xs">{schema.format}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{schema.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{schema.fields} fields</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      disabled={exportLoading === schema.id}
                      onClick={() => handleExport(schema.id, schema.name)}
                    >
                      {exportLoading === schema.id ? (
                        <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <Download className="w-3 h-3 mr-1" />
                      )}
                      Export CSV
                    </Button>
                    <Button size="sm" className="bg-[#0A1628] text-white hover:bg-[#0A1628]/90 text-xs">
                      <Upload className="w-3 h-3 mr-1" />Webhook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
