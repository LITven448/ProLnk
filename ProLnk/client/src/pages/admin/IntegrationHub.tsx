import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Zap, CheckCircle2, AlertCircle, Clock, RefreshCw, ExternalLink,
  Activity, Database, Users, Camera, Wrench, MessageSquare, Mail,
  CreditCard, BarChart3, Webhook, ChevronRight, Plus, Shield,
  TrendingUp, Globe, FileText, ArrowRight, Settings2, Eye,
  Circle, AlertTriangle, XCircle
} from "lucide-react";

// ─── Integration Catalog ──────────────────────────────────────────────────────
type IntegStatus = "live" | "configured" | "available" | "co_marketing" | "coming_soon";

interface IntegDef {
  id: string;
  name: string;
  category: string;
  description: string;
  status: IntegStatus;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  features: string[];
  setupUrl?: string;
  docsUrl?: string;
  coMarketingStatus?: "signed" | "in_negotiation" | "not_started";
  partnersConnected?: number;
  lastSync?: string;
  agentRole?: string; // which AGaaS agent uses this
}

const INTEGRATIONS: IntegDef[] = [
  // ── Photo / Field Service ──────────────────────────────────────────────────
  {
    id: "companycam",
    name: "CompanyCam",
    category: "Photo & Field",
    description: "Auto-import partner job photos. AI analyzes every image for property conditions, damage detection, and opportunity scoring. The core of the Photo Analysis Agent.",
    status: "live",
    icon: Camera,
    iconColor: "#1B4FD8",
    iconBg: "#EFF6FF",
    features: ["OAuth photo import", "Webhook on new photo", "AI analysis pipeline", "Before/after pairing", "Property tagging"],
    docsUrl: "https://developers.companycam.com",
    coMarketingStatus: "in_negotiation",
    agentRole: "Photo Analysis Agent",
  },
  {
    id: "jobber",
    name: "Jobber",
    category: "Photo & Field",
    description: "Sync job completions, client records, and invoices. Trigger photo intake on job close. Powers the Job Completion Agent.",
    status: "configured",
    icon: Wrench,
    iconColor: "#059669",
    iconBg: "#ECFDF5",
    features: ["Job sync on close", "Client address mapping", "Invoice data", "Webhook events", "Crew scheduling"],
    docsUrl: "https://developer.getjobber.com",
    coMarketingStatus: "not_started",
    agentRole: "Job Completion Agent",
  },
  {
    id: "housecall_pro",
    name: "Housecall Pro",
    category: "Photo & Field",
    description: "Field service management sync for HVAC, plumbing, and electrical partners. Auto-import completed jobs and customer data.",
    status: "configured",
    icon: Wrench,
    iconColor: "#7C3AED",
    iconBg: "#F5F3FF",
    features: ["Job completion webhooks", "Customer sync", "Invoice import", "Technician data", "Service history"],
    docsUrl: "https://developer.housecallpro.com",
    coMarketingStatus: "not_started",
    agentRole: "Job Completion Agent",
  },
  {
    id: "servicetitan",
    name: "ServiceTitan",
    category: "Photo & Field",
    description: "Enterprise field service platform for large HVAC, plumbing, and electrical contractors. High-value partner segment.",
    status: "available",
    icon: Wrench,
    iconColor: "#DC2626",
    iconBg: "#FEF2F2",
    features: ["Job sync", "Customer records", "Revenue data", "Technician profiles", "Dispatch integration"],
    docsUrl: "https://developer.servicetitan.io",
    coMarketingStatus: "not_started",
    agentRole: "Job Completion Agent",
  },
  // ── Property Data ──────────────────────────────────────────────────────────
  {
    id: "attom",
    name: "ATTOM Data",
    category: "Property Intelligence",
    description: "Property AVM, ownership history, permit records, and neighborhood data. Feeds the Property Intelligence Agent for every address in the network.",
    status: "configured",
    icon: Database,
    iconColor: "#0891B2",
    iconBg: "#ECFEFF",
    features: ["AVM / property value", "Ownership history", "Permit records", "Neighborhood data", "Foreclosure data"],
    docsUrl: "https://api.attomdata.com",
    agentRole: "Property Intelligence Agent",
  },
  {
    id: "google_maps",
    name: "Google Maps / Places",
    category: "Property Intelligence",
    description: "Address validation, geocoding, neighborhood scoring, and Street View integration for property profiles.",
    status: "live",
    icon: Globe,
    iconColor: "#16A34A",
    iconBg: "#F0FDF4",
    features: ["Address geocoding", "Street View", "Places API", "Distance matrix", "Neighborhood data"],
    agentRole: "Property Intelligence Agent",
  },
  // ── Communications ─────────────────────────────────────────────────────────
  {
    id: "twilio",
    name: "Twilio SMS",
    category: "Communications",
    description: "SMS notifications for partner alerts, homeowner deal updates, and two-way messaging. Powers the Communication Agent.",
    status: "configured",
    icon: MessageSquare,
    iconColor: "#DC2626",
    iconBg: "#FEF2F2",
    features: ["Partner SMS alerts", "Homeowner deal notifications", "Two-way messaging", "Delivery receipts", "Phone verification"],
    docsUrl: "https://www.twilio.com/docs",
    agentRole: "Communication Agent",
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    category: "Communications",
    description: "Transactional email for partner approvals, commission statements, homeowner deal alerts, and system notifications.",
    status: "configured",
    icon: Mail,
    iconColor: "#0284C7",
    iconBg: "#F0F9FF",
    features: ["Transactional email", "Partner approval emails", "Commission statements", "Homeowner alerts", "Email analytics"],
    docsUrl: "https://docs.sendgrid.com",
    agentRole: "Communication Agent",
  },
  {
    id: "onesignal",
    name: "OneSignal Push",
    category: "Communications",
    description: "Push notifications for the TrustyPro PWA and partner mobile app. Real-time alerts for new deals and job assignments.",
    status: "available",
    icon: Zap,
    iconColor: "#D97706",
    iconBg: "#FFFBEB",
    features: ["PWA push notifications", "Partner deal alerts", "Homeowner updates", "Segmentation", "A/B testing"],
    docsUrl: "https://documentation.onesignal.com",
    agentRole: "Communication Agent",
  },
  // ── Payments ──────────────────────────────────────────────────────────────
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    description: "Subscription billing, Stripe Connect for partner payouts, and payment processing. Powers the Financial Agent.",
    status: "live",
    icon: CreditCard,
    iconColor: "#6366F1",
    iconBg: "#EEF2FF",
    features: ["Subscription billing", "Stripe Connect payouts", "Payment processing", "Webhook events", "Dispute management"],
    docsUrl: "https://stripe.com/docs",
    agentRole: "Financial Agent",
  },
  // ── Automation ────────────────────────────────────────────────────────────
  {
    id: "n8n",
    name: "n8n Automation",
    category: "Automation",
    description: "Self-hosted workflow automation engine. Orchestrates all AGaaS agent workflows — photo processing, lead routing, partner onboarding, and more.",
    status: "live",
    icon: Zap,
    iconColor: "#EA580C",
    iconBg: "#FFF7ED",
    features: ["Photo intake pipeline", "Partner onboarding flows", "Lead routing automation", "Scheduled AI jobs", "Webhook orchestration"],
    agentRole: "All Agents (Orchestrator)",
  },
  // ── Analytics ─────────────────────────────────────────────────────────────
  {
    id: "mixpanel",
    name: "Mixpanel",
    category: "Analytics",
    description: "Product analytics for tracking partner activation, homeowner engagement, and funnel conversion across both platforms.",
    status: "available",
    icon: BarChart3,
    iconColor: "#7C3AED",
    iconBg: "#F5F3FF",
    features: ["Partner funnel tracking", "Homeowner engagement", "Cohort analysis", "Retention metrics", "A/B testing"],
    docsUrl: "https://developer.mixpanel.com",
    agentRole: "Analytics Agent",
  },
  // ── Insurance / Data ──────────────────────────────────────────────────────
  {
    id: "verisk",
    name: "Verisk / ISO",
    category: "Insurance & Risk",
    description: "Property risk scoring and underwriting data for insurance carrier partnerships. Enables the Insurance Intelligence Agent.",
    status: "coming_soon",
    icon: Shield,
    iconColor: "#0891B2",
    iconBg: "#ECFEFF",
    features: ["Property risk scores", "Claims history", "Underwriting data", "Carrier API", "Policy data"],
    agentRole: "Insurance Intelligence Agent",
  },
  {
    id: "corelogic",
    name: "CoreLogic",
    category: "Insurance & Risk",
    description: "Property data, natural hazard risk, and insurance-grade analytics for carrier partnerships and warranty product design.",
    status: "coming_soon",
    icon: Database,
    iconColor: "#DC2626",
    iconBg: "#FEF2F2",
    features: ["Hazard risk data", "Property analytics", "Flood/fire/wind risk", "Insurance scoring", "Carrier data feeds"],
    agentRole: "Insurance Intelligence Agent",
  },
  // ── Real Estate ───────────────────────────────────────────────────────────
  {
    id: "realpage",
    name: "RealPage",
    category: "Real Estate",
    description: "Property management platform integration for multi-family and commercial property managers. Enterprise B2B channel.",
    status: "coming_soon",
    icon: Globe,
    iconColor: "#0284C7",
    iconBg: "#F0F9FF",
    features: ["Property manager sync", "Tenant service requests", "Portfolio analytics", "Vendor management", "Work orders"],
    coMarketingStatus: "in_negotiation",
    agentRole: "Property Intelligence Agent",
  },
];

const STATUS_CONFIG = {
  live:          { label: "Live",           color: "#059669", bg: "#ECFDF5", icon: CheckCircle2 },
  configured:    { label: "Configured",     color: "#0284C7", bg: "#F0F9FF", icon: Settings2 },
  available:     { label: "Available",      color: "#D97706", bg: "#FFFBEB", icon: Circle },
  co_marketing:  { label: "Co-Marketing",   color: "#7C3AED", bg: "#F5F3FF", icon: TrendingUp },
  coming_soon:   { label: "Coming Soon",    color: "#6B7280", bg: "#F9FAFB", icon: Clock },
};

const CO_MARKETING_CONFIG = {
  signed:          { label: "Agreement Signed",    color: "#059669", bg: "#ECFDF5" },
  in_negotiation:  { label: "In Negotiation",      color: "#D97706", bg: "#FFFBEB" },
  not_started:     { label: "Not Started",         color: "#6B7280", bg: "#F9FAFB" },
};

const CATEGORIES = ["All", "Photo & Field", "Property Intelligence", "Communications", "Payments", "Automation", "Analytics", "Insurance & Risk", "Real Estate"];

// ─── Integration Card ──────────────────────────────────────────────────────────
function IntegCard({ integ }: { integ: IntegDef }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[integ.status];
  const StatusIcon = statusCfg.icon;
  const Icon = integ.icon;
  const isLive = integ.status === "live" || integ.status === "configured";

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${
      integ.status === "live" ? "border-green-200" :
      integ.status === "configured" ? "border-blue-200" :
      "border-gray-100"
    }`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: integ.iconBg }}>
            <Icon className="w-6 h-6" style={{ color: integ.iconColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-gray-900">{integ.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                style={{ background: statusCfg.bg, color: statusCfg.color }}>
                <StatusIcon className="w-3 h-3" /> {statusCfg.label}
              </span>
              {integ.coMarketingStatus && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: CO_MARKETING_CONFIG[integ.coMarketingStatus].bg, color: CO_MARKETING_CONFIG[integ.coMarketingStatus].color }}>
                  {CO_MARKETING_CONFIG[integ.coMarketingStatus].label}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">{integ.category}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{integ.description}</p>
          </div>
        </div>

        {/* Agent role badge */}
        {integ.agentRole && (
          <div className="mt-3 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-amber-700 font-medium">{integ.agentRole}</span>
          </div>
        )}

        {/* Features */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {integ.features.slice(0, expanded ? undefined : 3).map(f => (
            <span key={f} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{f}</span>
          ))}
          {!expanded && integ.features.length > 3 && (
            <button onClick={() => setExpanded(true)} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
              +{integ.features.length - 3} more
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          {isLive ? (
            <span className="flex items-center gap-1.5 text-xs text-green-700 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Active
            </span>
          ) : integ.status === "available" ? (
            <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 text-white h-7 px-3">
              <Plus className="w-3 h-3 mr-1" /> Connect
            </Button>
          ) : (
            <span className="text-xs text-gray-400 italic">Coming soon</span>
          )}
          {integ.docsUrl && (
            <a href={integ.docsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 ml-auto">
              <ExternalLink className="w-3.5 h-3.5" /> Docs
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function IntegrationHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"catalog" | "connected" | "co_marketing" | "agents">("catalog");

  const { data: allIntegrations = [], isLoading: loadingAll } = trpc.integrations.adminListAll.useQuery();
  const { data: queueStats } = trpc.integrations.adminQueueStats.useQuery();

  const filtered = activeCategory === "All"
    ? INTEGRATIONS
    : INTEGRATIONS.filter(i => i.category === activeCategory);

  const liveCount = INTEGRATIONS.filter(i => i.status === "live").length;
  const configuredCount = INTEGRATIONS.filter(i => i.status === "configured").length;
  const availableCount = INTEGRATIONS.filter(i => i.status === "available").length;
  const connectedPartners = (allIntegrations as any[]).length;

  // Co-marketing summary
  const coMarketingIntegrations = INTEGRATIONS.filter(i => i.coMarketingStatus);
  const signedCount = coMarketingIntegrations.filter(i => i.coMarketingStatus === "signed").length;
  const negotiatingCount = coMarketingIntegrations.filter(i => i.coMarketingStatus === "in_negotiation").length;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Integration Hub</h1>
            </div>
            <p className="text-sm text-gray-500">AGaaS infrastructure — every integration that powers autonomous operations</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
            <Plus className="w-4 h-4 mr-2" /> Request Integration
          </Button>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Live Integrations", value: liveCount, color: "#059669", bg: "#ECFDF5", icon: CheckCircle2 },
            { label: "Configured", value: configuredCount, color: "#0284C7", bg: "#F0F9FF", icon: Settings2 },
            { label: "Available", value: availableCount, color: "#D97706", bg: "#FFFBEB", icon: Circle },
            { label: "Partners Connected", value: connectedPartners, color: "#7C3AED", bg: "#F5F3FF", icon: Users },
            { label: "Photos Processed", value: (queueStats as any)?.completed ?? 0, color: "#1B4FD8", bg: "#EFF6FF", icon: Camera },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {[
            { id: "catalog", label: "Integration Catalog" },
            { id: "connected", label: "Connected Partners" },
            { id: "co_marketing", label: "Co-Marketing" },
            { id: "agents", label: "Agent Map" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Catalog Tab ── */}
        {activeTab === "catalog" && (
          <>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(integ => <IntegCard key={integ.id} integ={integ} />)}
            </div>
          </>
        )}

        {/* ── Connected Partners Tab ── */}
        {activeTab === "connected" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Partner Integration Connections</h2>
              <span className="text-sm text-gray-500">{connectedPartners} total connections</span>
            </div>
            {loadingAll ? (
              <div className="p-8 text-center text-gray-400">Loading...</div>
            ) : (allIntegrations as any[]).length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No partner integrations connected yet.</p>
                <p className="text-gray-400 text-xs mt-1">Partners connect their tools from the Partner Dashboard → Integrations page.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {(allIntegrations as any[]).map((integ: any) => (
                  <div key={integ.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 text-sm">{integ.source}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          integ.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}>{integ.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Partner ID: {integ.partnerId} · Connected: {new Date(integ.connectedAt).toLocaleDateString()}
                        {integ.lastSyncAt && ` · Last sync: ${new Date(integ.lastSyncAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    {integ.externalAccountName && (
                      <span className="text-xs text-gray-500 hidden md:block">{integ.externalAccountName}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Co-Marketing Tab ── */}
        {activeTab === "co_marketing" && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Agreements Signed", value: signedCount, color: "#059669", bg: "#ECFDF5" },
                { label: "In Negotiation", value: negotiatingCount, color: "#D97706", bg: "#FFFBEB" },
                { label: "Not Started", value: coMarketingIntegrations.length - signedCount - negotiatingCount, color: "#6B7280", bg: "#F9FAFB" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
                  <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* What a co-marketing agreement looks like */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Co-Marketing Agreement Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                    {[
                      { section: "§1 Purpose", detail: "Joint promotion of integrated product experience" },
                      { section: "§2 Definitions", detail: "Integration, Qualified Lead, Revenue Share" },
                      { section: "§3 Marketing Commitments", detail: "Dedicated email blast, integrations page listing, in-app prompt, co-branded content" },
                      { section: "§4 Revenue Share", detail: "% of subscription revenue from referred users (typically 10-20%)" },
                      { section: "§5 Data Sharing", detail: "Mutual NDA, no PII transfer without consent" },
                      { section: "§6 Term & Termination", detail: "12-month initial term, 30-day notice" },
                      { section: "§7 IP Rights", detail: "Each party retains their IP; limited license for co-branded materials" },
                      { section: "§8 Metrics & Reporting", detail: "Monthly reporting on referred users, conversion, and revenue" },
                    ].map(s => (
                      <div key={s.section} className="flex gap-2">
                        <span className="font-semibold text-blue-700 flex-shrink-0">{s.section}:</span>
                        <span className="text-blue-700">{s.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Integration co-marketing status */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Co-Marketing Pipeline</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {coMarketingIntegrations.map(integ => {
                  const cmCfg = CO_MARKETING_CONFIG[integ.coMarketingStatus!];
                  const Icon = integ.icon;
                  return (
                    <div key={integ.id} className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: integ.iconBg }}>
                        <Icon className="w-5 h-5" style={{ color: integ.iconColor }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{integ.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cmCfg.bg, color: cmCfg.color }}>
                            {cmCfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{integ.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          {integ.coMarketingStatus === "signed" ? "Active agreement" :
                           integ.coMarketingStatus === "in_negotiation" ? "Outreach in progress" :
                           "Schedule outreach"}
                        </p>
                        {integ.coMarketingStatus !== "signed" && (
                          <Button size="sm" variant="outline" className="mt-1 h-6 text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                            <ArrowRight className="w-3 h-3 mr-1" /> Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Agent Map Tab ── */}
        {activeTab === "agents" && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">AGaaS Architecture</p>
                  <p className="text-xs text-amber-700 mt-0.5">Each agent below runs autonomously in the background. Integrations are the data inputs and action outputs for each agent. No human required once configured.</p>
                </div>
              </div>
            </div>
            {[
              {
                agent: "Photo Analysis Agent",
                description: "Ingests every job photo from CompanyCam, runs multi-model AI analysis (Gemini → GPT-4o → Claude), scores property conditions, detects opportunities, and queues leads.",
                integrations: ["companycam", "n8n"],
                status: "live" as const,
                color: "#1B4FD8",
              },
              {
                agent: "Property Intelligence Agent",
                description: "Enriches every address with ATTOM data (AVM, permits, ownership), Google Maps neighborhood scoring, and AI-generated property profiles. Runs on every new address.",
                integrations: ["attom", "google_maps", "n8n"],
                status: "configured" as const,
                color: "#0891B2",
              },
              {
                agent: "Job Completion Agent",
                description: "Listens for job close webhooks from Jobber, Housecall Pro, and ServiceTitan. Auto-imports photos, triggers AI analysis, and creates before/after pairs.",
                integrations: ["jobber", "housecall_pro", "servicetitan", "n8n"],
                status: "configured" as const,
                color: "#059669",
              },
              {
                agent: "Communication Agent",
                description: "Sends the right message at the right time via the right channel. Partner alerts via SMS (Twilio), homeowner deals via email (SendGrid), real-time via push (OneSignal).",
                integrations: ["twilio", "sendgrid", "onesignal", "n8n"],
                status: "configured" as const,
                color: "#DC2626",
              },
              {
                agent: "Financial Agent",
                description: "Calculates commissions, triggers Stripe Connect payouts, manages subscription billing, and generates 1099 data. Runs on job close and monthly cadence.",
                integrations: ["stripe", "n8n"],
                status: "live" as const,
                color: "#6366F1",
              },
              {
                agent: "Home Transfer Agent",
                description: "Detects home sale signals, packages the Home Health Vault into a transferable passport, sends secure transfer link to new owner, and re-activates the property profile.",
                integrations: ["attom", "n8n"],
                status: "available" as const,
                color: "#D97706",
              },
              {
                agent: "Insurance Intelligence Agent",
                description: "Aggregates property condition data, maintenance history, and AI risk scores into insurance-grade reports for carrier partnerships. Enables warranty product underwriting.",
                integrations: ["verisk", "corelogic", "attom"],
                status: "coming_soon" as const,
                color: "#0891B2",
              },
            ].map(agent => {
              const statusCfg = STATUS_CONFIG[agent.status];
              const StatusIcon = statusCfg.icon;
              return (
                <div key={agent.agent} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${agent.color}15` }}>
                        <Zap className="w-5 h-5" style={{ color: agent.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{agent.agent}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 w-fit mt-0.5"
                          style={{ background: statusCfg.bg, color: statusCfg.color }}>
                          <StatusIcon className="w-3 h-3" /> {statusCfg.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 font-medium">Integrations:</span>
                    {agent.integrations.map(id => {
                      const integ = INTEGRATIONS.find(i => i.id === id);
                      if (!integ) return null;
                      const iStatus = STATUS_CONFIG[integ.status];
                      return (
                        <span key={id} className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                          style={{ background: iStatus.bg, color: iStatus.color }}>
                          {integ.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
