import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, Circle, ExternalLink, Settings2, Zap, Mail, MessageSquare,
  BarChart3, Brain, Users, CreditCard, Webhook, Database, Smartphone,
  Search, ChevronRight, AlertCircle, Activity, RefreshCw
} from "lucide-react";
import { trpc } from "@/lib/trpc";

// --- Integration definitions --------------------------------------------------
type IntegrationStatus = "connected" | "available" | "coming_soon";

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  status: IntegrationStatus;
  docsUrl?: string;
  features: string[];
}

const INTEGRATIONS: Integration[] = [
  // -- CRM --
  {
    id: "hubspot",
    name: "HubSpot CRM",
    description: "Sync partner contacts, track deal pipelines, and automate follow-up sequences for partner applications and commission conversations.",
    logo: "",
    category: "CRM",
    status: "available",
    docsUrl: "https://developers.hubspot.com",
    features: ["Contact sync", "Deal pipeline", "Email sequences", "Activity logging"],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Enterprise CRM integration for managing partner relationships, opportunity tracking, and revenue reporting at scale.",
    logo: "",
    category: "CRM",
    status: "coming_soon",
    features: ["Partner accounts", "Opportunity tracking", "Custom reports", "Workflow automation"],
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    description: "All-in-one CRM and marketing automation built for agencies. Sync partner leads, automate onboarding sequences, and manage pipelines.",
    logo: "[FIRE]",
    category: "CRM",
    status: "available",
    docsUrl: "https://highlevel.com",
    features: ["Lead sync", "Pipeline management", "SMS/email automation", "Funnel tracking"],
  },
  // -- Marketing --
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Send partner newsletters, onboarding drip campaigns, and commission milestone emails. Segment by tier and engagement.",
    logo: "",
    category: "Marketing",
    status: "available",
    docsUrl: "https://mailchimp.com/developer",
    features: ["Partner newsletters", "Drip campaigns", "Tier-based segments", "Open/click tracking"],
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    description: "Behavior-triggered email and SMS flows for partner lifecycle events -- new approval, first commission, tier upgrade, and churn risk.",
    logo: "[EMAIL]",
    category: "Marketing",
    status: "available",
    docsUrl: "https://developers.klaviyo.com",
    features: ["Lifecycle flows", "SMS campaigns", "Revenue attribution", "Predictive analytics"],
  },
  {
    id: "activecampaign",
    name: "ActiveCampaign",
    description: "Marketing automation with deep CRM integration. Automate partner nurture sequences and track engagement across channels.",
    logo: "",
    category: "Marketing",
    status: "available",
    features: ["Automation sequences", "Lead scoring", "CRM sync", "Site tracking"],
  },
  {
    id: "meta_ads",
    name: "Meta Ads",
    description: "Connect partner acquisition campaigns directly to the ProLnk application funnel. Track cost-per-application and cost-per-active-partner.",
    logo: "",
    category: "Marketing",
    status: "coming_soon",
    features: ["Conversion tracking", "Custom audiences", "Lookalike audiences", "ROAS reporting"],
  },
  {
    id: "google_ads",
    name: "Google Ads",
    description: "Track partner application conversions from search campaigns. Import offline conversion data for closed commissions.",
    logo: "",
    category: "Marketing",
    status: "coming_soon",
    features: ["Conversion import", "Smart bidding", "Keyword reporting", "Landing page tracking"],
  },
  // -- AI & Automation --
  {
    id: "openai",
    name: "OpenAI (AI Vision Module)",
    description: "Powers the ProLnk AI photo analysis pipeline. AI Vision scans job photos for 50+ opportunity types and generates structured lead data.",
    logo: "[BOT]",
    category: "AI",
    status: "connected",
    features: ["Photo analysis", "Opportunity detection", "Lead scoring", "Natural language reports"],
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect ProLnk to 6,000+ apps without code. Automate partner notifications, CRM updates, Slack alerts, and spreadsheet logging.",
    logo: "",
    category: "AI & Automation",
    status: "available",
    docsUrl: "https://zapier.com",
    features: ["6,000+ app connections", "Multi-step zaps", "Webhook triggers", "No-code automation"],
  },
  {
    id: "make",
    name: "Make (Integromat)",
    description: "Visual automation platform for complex multi-step workflows. Build partner onboarding flows, commission reconciliation, and reporting pipelines.",
    logo: "",
    category: "AI & Automation",
    status: "available",
    docsUrl: "https://make.com",
    features: ["Visual workflow builder", "Complex branching", "Data transformation", "Error handling"],
  },
  {
    id: "n8n",
    name: "n8n",
    description: "Self-hosted workflow automation for sensitive data pipelines. Ideal for commission calculation, partner data sync, and internal reporting.",
    logo: "[LINK]",
    category: "AI & Automation",
    status: "coming_soon",
    features: ["Self-hosted option", "Custom nodes", "AI agent workflows", "Code execution"],
  },
  // -- Field Service --
  {
    id: "jobber",
    name: "Jobber",
    description: "Automatically import completed jobs and photos from Jobber. Partners using Jobber can sync their job history without manual uploads.",
    logo: "[TOOL]",
    category: "Field Service",
    status: "coming_soon",
    features: ["Auto job import", "Photo sync", "Schedule visibility", "Client data sync"],
  },
  {
    id: "housecall_pro",
    name: "Housecall Pro",
    description: "Sync completed jobs and job photos directly from Housecall Pro. Eliminate manual photo uploads for partners on this platform.",
    logo: "",
    category: "Field Service",
    status: "coming_soon",
    features: ["Job auto-sync", "Photo import", "Customer data", "Invoice tracking"],
  },
  {
    id: "servicetitan",
    name: "ServiceTitan",
    description: "Enterprise field service management integration. For larger partners running ServiceTitan, sync job completions and photos automatically.",
    logo: "",
    category: "Field Service",
    status: "coming_soon",
    features: ["Enterprise sync", "Job completion hooks", "Revenue data", "Technician tracking"],
  },
  // -- Payments --
  {
    id: "stripe",
    name: "Stripe",
    description: "Process partner subscription payments and automate commission payouts via Stripe Connect. Full payment lifecycle management.",
    logo: "",
    category: "Payments",
    status: "available",
    docsUrl: "https://stripe.com/docs",
    features: ["Subscription billing", "Commission payouts", "Stripe Connect", "Dispute management"],
  },
  // -- Communications --
  {
    id: "twilio",
    name: "Twilio SMS",
    description: "Send SMS notifications to partners for new leads, commission payments, and tier upgrades. Real-time alerts that drive engagement.",
    logo: "[PHONE]",
    category: "Communications",
    status: "available",
    docsUrl: "https://twilio.com/docs",
    features: ["Lead alerts", "Commission notifications", "Tier upgrade SMS", "Two-way messaging"],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Internal team notifications for new partner applications, high-value opportunities detected, and commission milestones.",
    logo: "",
    category: "Communications",
    status: "available",
    docsUrl: "https://api.slack.com",
    features: ["Application alerts", "Opportunity notifications", "Daily digests", "Custom channels"],
  },
  // -- Analytics --
  {
    id: "google_analytics",
    name: "Google Analytics 4",
    description: "Track landing page performance, application funnel conversion, and partner acquisition source attribution.",
    logo: "[CHART]",
    category: "Analytics",
    status: "available",
    docsUrl: "https://analytics.google.com",
    features: ["Funnel tracking", "Source attribution", "Conversion goals", "Audience insights"],
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Product analytics for the partner dashboard. Track feature adoption, photo upload frequency, and commission engagement.",
    logo: "[UP]",
    category: "Analytics",
    status: "coming_soon",
    features: ["Event tracking", "Funnel analysis", "Retention reports", "A/B testing"],
  },
];

const CATEGORIES = [
  "All",
  "CRM",
  "Marketing",
  "AI & Automation",
  "AI",
  "Field Service",
  "Payments",
  "Communications",
  "Analytics",
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "All": Zap,
  "CRM": Users,
  "Marketing": Mail,
  "AI & Automation": Brain,
  "AI": Brain,
  "Field Service": Settings2,
  "Payments": CreditCard,
  "Communications": MessageSquare,
  "Analytics": BarChart3,
};

function StatusBadge({ status }: { status: IntegrationStatus }) {
  if (status === "connected") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3" /> Connected
      </span>
    );
  }
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
        <Circle className="w-3 h-3" /> Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
      <AlertCircle className="w-3 h-3" /> Coming Soon
    </span>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-xl border ${integration.status === "connected" ? "border-emerald-200 shadow-sm" : "border-gray-200"} p-5 flex flex-col gap-3 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xl flex-shrink-0">
            {integration.logo}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{integration.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{integration.category}</div>
          </div>
        </div>
        <StatusBadge status={integration.status} />
      </div>

      <p className="text-xs text-gray-600 leading-relaxed">{integration.description}</p>

      {expanded && (
        <div className="border-t border-gray-100 pt-3">
          <div className="text-xs font-semibold text-gray-500 mb-2">FEATURES</div>
          <div className="grid grid-cols-2 gap-1.5">
            {integration.features.map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0 text-teal-500" />
                {f}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mt-auto pt-1">
        {integration.status === "connected" ? (
          <Button size="sm" variant="outline" className="text-xs h-7 flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            <Settings2 className="w-3 h-3 mr-1" /> Manage
          </Button>
        ) : integration.status === "available" ? (
          <Button size="sm" className="text-xs h-7 flex-1 text-white" style={{ backgroundColor: "var(--teal)" }}>
            <Zap className="w-3 h-3 mr-1" /> Connect
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="text-xs h-7 flex-1 text-gray-400" disabled>
            Notify Me
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="text-xs h-7 text-gray-400 hover:text-gray-700 px-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Less" : "Details"}
          <ChevronRight className={`w-3 h-3 ml-0.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </Button>
        {integration.docsUrl && (
          <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="ghost" className="text-xs h-7 text-gray-400 hover:text-gray-700 px-2">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Live data from DB
  const { data: liveIntegrations = [], refetch, isLoading } = trpc.integrations.adminListAll.useQuery();
  const { data: queueStats } = trpc.integrations.adminQueueStats.useQuery();

  // Map live connected sources to their integration IDs
  const connectedSources = useMemo(() => {
    const sources = new Set<string>();
    liveIntegrations.forEach((i: any) => {
      if (i.status === "active") sources.add(i.source);
    });
    return sources;
  }, [liveIntegrations]);

  // Merge live status into static integration list
  const integrationsWithLiveStatus = useMemo(() => {
    return INTEGRATIONS.map(i => ({
      ...i,
      status: connectedSources.has(i.id) ? "connected" as const : i.status,
      liveCount: liveIntegrations.filter((li: any) => li.source === i.id && li.status === "active").length,
    }));
  }, [connectedSources, liveIntegrations]);

  const filtered = integrationsWithLiveStatus.filter((i) => {
    const matchCat = activeCategory === "All" || i.category === activeCategory;
    const matchSearch =
      search === "" ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const connected = integrationsWithLiveStatus.filter((i) => i.status === "connected").length;
  const available = integrationsWithLiveStatus.filter((i) => i.status === "available").length;
  const comingSoon = integrationsWithLiveStatus.filter((i) => i.status === "coming_soon").length;

  // Deduplicate categories for display
  const uniqueCategories = CATEGORIES.filter((c, i, arr) => arr.indexOf(c) === i);

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--teal-light)" }}>
              <Webhook className="w-5 h-5" style={{ color: "var(--teal)" }} />
            </div>
            <div>
              <h1 className="text-2xl font-heading text-gray-900">Integrations</h1>
              <p className="text-sm text-gray-500">Connect ProLnk to your marketing, CRM, AI, and operations stack.</p>
          {queueStats && (
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <Activity className="w-3 h-3" />
              <span>Photo intake queue: <strong className="text-gray-700">{queueStats.pending ?? 0} pending</strong> · {queueStats.completed ?? 0} processed · {queueStats.failed ?? 0} failed</span>
              <button onClick={() => refetch()} className="ml-1 hover:text-teal-600 transition-colors" title="Refresh">
                <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-5">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">{connected} Connected</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
              <Circle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">{available} Available</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">
              <AlertCircle className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-500">{comingSoon} Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
              style={{ "--tw-ring-color": "var(--teal)" } as React.CSSProperties}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {uniqueCategories.filter(c => c !== "AI").map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || Database;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    activeCategory === cat
                      ? "text-white border-transparent"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                  style={activeCategory === cat ? { backgroundColor: "var(--teal)", borderColor: "var(--teal)" } : {}}
                >
                  <Icon className="w-3 h-3" />
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Database className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No integrations found for "{search}"</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        )}

        {/* Request an integration */}
        <div className="mt-10 p-6 rounded-2xl border-2 border-dashed border-gray-200 text-center">
          <Smartphone className="w-8 h-8 mx-auto mb-3 text-gray-300" />
          <h3 className="font-heading text-gray-700 mb-1">Need a different integration?</h3>
          <p className="text-sm text-gray-400 mb-4">We're adding new integrations every month. Let us know what you need.</p>
          <Button variant="outline" className="text-sm border-2" style={{ borderColor: "var(--teal)", color: "var(--teal)" }}>
            Request an Integration
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
