import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard, Users, DollarSign, Settings,
  LogOut, Search, Bell, Brain, Radar, ListChecks, Menu, X, ClipboardList,
} from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import ProLnkLogo from "@/components/ProLnkLogo";
import AdminTodoPanel from "@/components/AdminTodoPanel";

// --- Design Tokens -- Soft UI / Material Dashboard inspired -------------------
export const T = {
  bg:        "#F0F2F5",
  sidebar:   "#FFFFFF",
  surface:   "#FFFFFF",
  card:      "#FFFFFF",
  text:      "#344767",
  muted:     "#7B809A",
  dim:       "#AEAEAE",
  accent:    "#17C1E8",
  accentBg:  "#E8F9FC",
  green:     "#82D616",
  amber:     "#FBB140",
  red:       "#EA0606",
  blue:      "#1A73E8",
  purple:    "#7928CA",
  border:    "#E9ECEF",
};

export const BADGE_GRADIENTS = {
  teal:   "linear-gradient(195deg, #42424a, #191919)",
  blue:   "linear-gradient(195deg, #49a3f1, #1A73E8)",
  green:  "linear-gradient(195deg, #66BB6A, #43A047)",
  pink:   "linear-gradient(195deg, #EC407A, #D81B60)",
  cyan:   "linear-gradient(195deg, #26C6DA, #00ACC1)",
  orange: "linear-gradient(195deg, #FFA726, #FB8C00)",
  purple: "linear-gradient(195deg, #ab47bc, #8e24aa)",
};

export const FONT = "'Inter', system-ui, sans-serif";
export const MONO = "'JetBrains Mono', 'Courier New', monospace";

// --- Sub-tab definitions per section -----------------------------------------
export const SECTION_TABS: Record<string, { label: string; href: string }[]> = {
  overview: [
    { label: "Command Center",  href: "/admin" },
    { label: "Platform Health", href: "/admin/health" },
    { label: "Activity Log",    href: "/admin/activity" },
    { label: "Action Items",    href: "/admin/tasks" },
  ],
  partners: [
    { label: "All Partners",  href: "/admin/partners" },
    { label: "Network Income",href: "/admin/network" },
    { label: "Applications",  href: "/admin/pipeline" },
    { label: "Waitlist",      href: "/admin/waitlist" },
    { label: "Verification",  href: "/admin/verification" },
    { label: "Auto-Approval", href: "/admin/auto-approval" },
    { label: "Leaderboard",   href: "/admin/leaderboard" },
    { label: "Network Map",   href: "/admin/map" },
    { label: "Territory Map", href: "/admin/territory" },
    { label: "Market Expansion", href: "/admin/market" },
    { label: "Mass Adoption",    href: "/admin/mass-adoption" },
    { label: "Partner Health",    href: "/admin/partner-health" },
    { label: "Geo Expansion Map", href: "/admin/geo-expansion" },
    { label: "360° Members",       href: "/admin/360-members" },
    { label: "Churn Prediction",  href: "/admin/churn-prediction" },
    { label: "Tier Upgrades",     href: "/admin/tier-upgrades" },
    { label: "Onboarding Funnel", href: "/admin/onboarding-funnel" },
    { label: "Franchise Territories", href: "/admin/franchise-territories" },
  ],
  leads: [
    { label: "Home Profiles",     href: "/admin/home-intelligence" },
    { label: "AI Scan Engine",    href: "/admin/ai" },
    { label: "Opportunity Detector", href: "/admin/detector" },
    { label: "Photo Pipeline",    href: "/admin/photo-pipeline" },
    { label: "Photo Queue",       href: "/admin/photo-queue" },
    { label: "Job Bundler",        href: "/admin/bundle-offers" },
    { label: "TrustyPro Leads",   href: "/admin/trustypro-leads" },
    { label: "Deal Pipeline",     href: "/admin/deal-pipeline" },
    { label: "Deal Composer",     href: "/admin/deal-composer" },
    { label: "All Deals",         href: "/admin/deals" },
    { label: "All Opportunities", href: "/admin/opportunities" },
    { label: "Referral Pipeline", href: "/admin/referral-pipeline" },
    { label: "Lead Scoring",      href: "/admin/lead-scoring" },
    { label: "Coverage Map",      href: "/admin/heatmap" },
    { label: "Zip Coverage Map",   href: "/admin/coverage-map" },
    { label: "Property Timeline", href: "/admin/properties" },
    { label: "Homeowner CRM",     href: "/admin/homeowners" },
    { label: "Data Intelligence", href: "/admin/data-intelligence" },
  ],
  predict: [
    { label: "AGaaS Agents",     href: "/admin/agents" },
    { label: "Event Dashboard",  href: "/admin/predict" },
    { label: "AI Pipeline",      href: "/admin/ai-pipeline" },
    { label: "Storm Dashboard",  href: "/admin/storm" },
    { label: "Storm Watch",      href: "/admin/storm-watch" },
    { label: "Asset Aging",      href: "/admin/asset-aging" },
    { label: "Safety Recalls",   href: "/admin/recalls" },
    { label: "Data Marketplace", href: "/admin/data-marketplace" },
  ],
  revenue: [
    { label: "Financial Center",  href: "/admin/finance" },
    { label: "Payout Center",     href: "/admin/payouts" },
    { label: "Payment Architecture V12", href: "/admin/payment-architecture" },
    { label: "Revenue Forecast", href: "/admin/revenue-forecast" },
    { label: "Lead Quality Center", href: "/admin/lead-quality" },
    { label: "Payment Monitor",   href: "/admin/payment-monitor" },
    { label: "Payout History",    href: "/admin/payout-history" },
    { label: "Seasonal Campaigns", href: "/admin/seasonal-campaigns" },
    { label: "A/B Test Manager",  href: "/admin/ab-tests" },
    { label: "NPS Surveys",       href: "/admin/nps" },
    { label: "Content Manager",   href: "/admin/content" },
    { label: "Commission Disputes", href: "/admin/disputes" },
    { label: "Tax Reports",       href: "/admin/tax-reports" },
    { label: "Commission Rates",  href: "/admin/rates" },
    { label: "Analytics",         href: "/admin/analytics" },
    { label: "Analytics Deep Dive", href: "/admin/analytics-deep-dive" },
    { label: "Analytics Export",  href: "/admin/analytics-export" },
    { label: "Growth Engine",     href: "/admin/growth" },
    { label: "Customer Success",  href: "/admin/customer-success" },
    { label: "Platform Intelligence", href: "/admin/platform-intelligence" },
    { label: "Competitor Intel",  href: "/admin/competitor-intelligence" },
    { label: "Task Manager",      href: "/admin/task-manager" },
  ],
  waitlist: [
    { label: "All Signups", href: "/admin/waitlist" },
  ],
  settings: [
    { label: "Integration Hub",    href: "/admin/integration-hub" },
    { label: "Comms & Data Setup",  href: "/admin/comms-integrations" },
    { label: "Integration Health", href: "/admin/integration-health" },
    { label: "Partner Int. Health", href: "/admin/partner-integration-health" },
    { label: "Integrations",       href: "/admin/integrations" },
    { label: "Buildium",           href: "/admin/buildium" },
    { label: "CompanyCam",         href: "/admin/companycam" },
    { label: "CompanyCam Guide",   href: "/admin/companycam-guide" },
    { label: "Jobber",             href: "/admin/jobber" },
    { label: "Housecall Pro",      href: "/admin/housecallpro" },
    { label: "ServiceTitan",       href: "/admin/servicetitan" },
    { label: "n8n Setup",          href: "/admin/n8n-setup" },
    { label: "FSM Webhooks",       href: "/admin/fsm-webhooks" },
    { label: "Webhook Manager",    href: "/admin/n8n-webhooks" },
    { label: "Comm Sequences",     href: "/admin/comm-sequence" },
    { label: "Google Reviews",     href: "/admin/google-reviews" },
    { label: "Comms Timeline",     href: "/admin/comms" },
    { label: "Broadcast",          href: "/admin/broadcast" },
    { label: "Agreements",         href: "/admin/agreements" },
    { label: "Platform Settings",   href: "/admin/platform-settings" },
    { label: "Admin Setup",        href: "/admin/setup" },
    { label: "Service Categories",  href: "/admin/categories" },
    { label: "Smart Notifications",  href: "/admin/smart-notifications" },
    { label: "Compliance / Strikes",  href: "/admin/compliance" },
    { label: "Business Plan",          href: "/admin/business-plan" },
    { label: "Campaign Center",         href: "/admin/campaigns" },
    { label: "Marketing Automation",     href: "/admin/marketing-automation" },
    { label: "Investor Metrics",        href: "/admin/investor" },
    { label: "Patent & IP Disclosure",   href: "/admin/patent" },
    { label: "Enterprise Integrations",    href: "/admin/enterprise-integrations" },
    { label: "B2B Data Exchange",          href: "/admin/b2b-data" },
    { label: "Property Condition Reports", href: "/admin/property-reports" },
    { label: "AI Model Retraining",        href: "/admin/ai-retraining" },
    { label: "Real Estate Agents",           href: "/admin/real-estate-agents" },
    { label: "Insurance Claims",             href: "/admin/insurance-claims" },
    { label: "Featured Advertisers",          href: "/admin/featured-advertisers" },
    { label: "Advertising Preview",              href: "/admin/advertising-preview" },
    { label: "Commission Strategy",            href: "/admin/commission-strategy" },
    { label: "Trusted Pro Algorithm",           href: "/admin/trusted-pro-algorithm" },
    { label: "API Credits Guide",               href: "/admin/api-credits" },
    { label: "Payment Flow Diagrams",            href: "/admin/payment-flows" },
  ],
};

// --- Navigation ---------------------------------------------------------------
const NAV = [
  { icon: LayoutDashboard, label: "Overview",  href: "/admin",                   section: "overview" },
  { icon: Users,           label: "Partners",  href: "/admin/partners",          section: "partners" },
  { icon: Brain,           label: "Leads",     href: "/admin/home-intelligence", section: "leads" },
  { icon: Radar,           label: "Predict",   href: "/admin/predict",           section: "predict" },
  { icon: DollarSign,      label: "Revenue",   href: "/admin/finance",           section: "revenue" },
  { icon: ClipboardList,   label: "Waitlist",  href: "/admin/waitlist",          section: "waitlist" },
  { icon: Settings,        label: "Settings",  href: "/admin/integrations",      section: "settings" },
];

// --- Helper: which section is active -----------------------------------------
function getActiveSection(path: string): string {
  if (path === "/admin" || path.startsWith("/admin/health") || path.startsWith("/admin/activity")) return "overview";
  if (path.startsWith("/admin/waitlist") || path.startsWith("/waitlist/")) return "waitlist";
  if (path.startsWith("/admin/partner") || path.startsWith("/admin/network") || path.startsWith("/admin/pipeline") || path.startsWith("/admin/verification") || path.startsWith("/admin/leaderboard") || path.startsWith("/admin/map") || path.startsWith("/admin/territory")) return "partners";
  if (path.startsWith("/admin/home-intelligence") || path.startsWith("/admin/ai") || path.startsWith("/admin/trustypro") || path.startsWith("/admin/lead-scoring") || path.startsWith("/admin/heatmap") || path.startsWith("/admin/coverage-map") || path.startsWith("/admin/deal-pipeline") || path.startsWith("/admin/deals") || path.startsWith("/admin/deal-composer") || path.startsWith("/admin/properties") || path.startsWith("/admin/homeowners") || path.startsWith("/admin/photo-queue") || path.startsWith("/admin/bundle-offers") || path.startsWith("/admin/photo-pipeline") || path.startsWith("/admin/detector") || path.startsWith("/admin/referral-pipeline") || path.startsWith("/admin/data-intelligence")) return "leads";
  if (path.startsWith("/admin/predict") || path.startsWith("/admin/ai-pipeline") || path.startsWith("/admin/storm") || path.startsWith("/admin/agents") || path.startsWith("/admin/asset-aging") || path.startsWith("/admin/recalls")) return "predict";
  if (path.startsWith("/admin/finance") || path.startsWith("/admin/payouts") || path.startsWith("/admin/payment-architecture") || path.startsWith("/admin/rates") || path.startsWith("/admin/analytics") || path.startsWith("/admin/growth") || path.startsWith("/admin/tax-reports") || path.startsWith("/admin/customer-success")) return "revenue";
  if (path.startsWith("/admin/integrations") || path.startsWith("/admin/agreements") || path.startsWith("/admin/fsm") || path.startsWith("/admin/setup") || path.startsWith("/admin/broadcast") || path.startsWith("/admin/comms") || path.startsWith("/admin/categories") || path.startsWith("/admin/compliance") || path.startsWith("/admin/smart-notifications") || path.startsWith('/admin/business-plan') || path.startsWith('/admin/campaigns') || path.startsWith('/admin/marketing-automation') || path.startsWith('/admin/investor') || path.startsWith('/admin/patent') || path.startsWith('/admin/real-estate-agents') || path.startsWith('/admin/insurance-claims') || path.startsWith('/admin/featured-advertisers') || path.startsWith('/admin/advertising-preview') || path.startsWith('/admin/commission-strategy') || path.startsWith('/admin/trusted-pro-algorithm')) return "settings";
  return "overview";
}

// --- Notification Bell --------------------------------------------------------
function AdminNotificationsBell() {
  const { data: pending } = trpc.admin.getPendingApplications.useQuery();
  const { data: unpaid }  = trpc.admin.getUnpaidCommissions.useQuery();
  const count = (pending?.length ?? 0) + (unpaid?.length ?? 0);
  return (
    <Link href="/admin/pipeline">
      <button
        className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
        style={{ color: T.muted, backgroundColor: T.bg }}
      >
        <Bell className="w-4 h-4" />
        {count > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: T.red }}
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
    </Link>
  );
}

// --- Horizontal Sub-Tab Bar ---------------------------------------------------
function SubTabBar({ section }: { section: string }) {
  const [location] = useLocation();
  const tabs = SECTION_TABS[section] ?? [];
  if (tabs.length === 0) return null;
  return (
    <div
      className="flex items-center gap-0 px-4 flex-shrink-0"
      style={{
        backgroundColor: T.surface,
        borderBottom: `1px solid ${T.border}`,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}
    >
      {tabs.map(tab => {
        const isActive = location === tab.href || (tab.href !== "/admin" && location.startsWith(tab.href));
        return (
          <Link key={tab.href} href={tab.href}>
            <button
              className="flex-shrink-0 px-3 py-3 text-sm font-medium transition-all whitespace-nowrap"
              style={{
                color: isActive ? T.accent : T.muted,
                backgroundColor: "transparent",
                borderBottom: isActive ? `2px solid ${T.accent}` : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {tab.label}
            </button>
          </Link>
        );
      })}
    </div>
  );
}

// --- Sidebar Content (shared between mobile overlay and desktop) --------------
function SidebarContent({
  activeSection,
  user,
  logout,
  todoOpen,
  setTodoOpen,
  onNavClick,
}: {
  activeSection: string;
  user: { name?: string | null } | null;
  logout: () => void;
  todoOpen: boolean;
  setTodoOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  onNavClick?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center px-5 py-5 flex-shrink-0" style={{ borderBottom: `1px solid ${T.border}` }}>
        <ProLnkLogo variant="light" height={30} />
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-xs font-semibold uppercase px-3 mb-3" style={{ color: T.dim, letterSpacing: "0.1em" }}>
          Admin Portal
        </p>
        <div className="flex flex-col gap-1">
          {NAV.map(item => {
            const isActive = item.section === activeSection;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    backgroundColor: isActive ? T.accent : "transparent",
                    color: isActive ? "#FFFFFF" : T.muted,
                    boxShadow: isActive ? `0 4px 14px ${T.accent}55` : "none",
                  }}
                  onClick={onNavClick}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Agent Workboard button */}
      <div className="px-3 pb-2 flex-shrink-0">
        <button
          onClick={() => setTodoOpen(v => !v)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
          style={{
            backgroundColor: todoOpen ? T.accent : T.bg,
            color: todoOpen ? "#FFFFFF" : T.muted,
          }}
        >
          <ListChecks className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Agent Workboard</span>
        </button>
      </div>

      {/* Bottom: user + logout */}
      <div className="flex-shrink-0 p-3" style={{ borderTop: `1px solid ${T.border}` }}>
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl" style={{ backgroundColor: T.bg }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
              style={{ background: BADGE_GRADIENTS.blue }}
            >
              {user.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: T.text }}>{user.name ?? "Admin"}</p>
              <p className="text-xs truncate" style={{ color: T.muted }}>Administrator</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all"
          style={{ color: T.muted }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFF5F5";
            (e.currentTarget as HTMLButtonElement).style.color = T.red;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = T.muted;
          }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );
}

// --- Main Layout --------------------------------------------------------------
interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const [location]                    = useLocation();
  const { user, logout }              = useAuth();
  const [searchOpen, setSearchOpen]   = useState(false);
  const [todoOpen, setTodoOpen]       = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const activeSection                 = getActiveSection(location);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: T.bg, fontFamily: FONT }}>

      {/* -- Mobile Sidebar Overlay ----------------------------------------- */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileSidebarOpen(false)}
        >
          {/* Sidebar panel -- stop propagation so clicks inside don't close */}
          <aside
            className="flex flex-col h-full"
            style={{
              width: 260,
              backgroundColor: T.sidebar,
              boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
              zIndex: 51,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button row */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <ProLnkLogo variant="light" height={26} />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: T.bg, color: T.muted }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              <SidebarContent
                activeSection={activeSection}
                user={user}
                logout={logout}
                todoOpen={todoOpen}
                setTodoOpen={setTodoOpen}
                onNavClick={() => setMobileSidebarOpen(false)}
              />
            </div>
          </aside>
        </div>
      )}

      {/* -- Desktop Sidebar (hidden on mobile) ---------------------------- */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0"
        style={{
          width: 250,
          backgroundColor: T.sidebar,
          boxShadow: "2px 0 20px rgba(0,0,0,0.05)",
          zIndex: 10,
        }}
      >
        <SidebarContent
          activeSection={activeSection}
          user={user}
          logout={logout}
          todoOpen={todoOpen}
          setTodoOpen={setTodoOpen}
        />
      </aside>

      {/* -- Agent Workboard Slide-out Panel (desktop only) ---------------- */}
      {todoOpen && (
        <div
          className="hidden md:flex flex-shrink-0 flex-col overflow-hidden"
          style={{
            width: 300,
            backgroundColor: T.sidebar,
            borderLeft: `1px solid ${T.border}`,
            boxShadow: "-2px 0 20px rgba(0,0,0,0.06)",
            zIndex: 9,
            order: 3,
          }}
        >
          <AdminTodoPanel onClose={() => setTodoOpen(false)} />
        </div>
      )}

      {/* -- Main Content --------------------------------------------------- */}
      <main className="flex-1 overflow-auto flex flex-col min-w-0" style={{ backgroundColor: T.bg }}>

        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ backgroundColor: T.surface, borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: T.bg, color: T.text }}
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              {title && (
                <h1 className="text-base md:text-xl font-bold truncate" style={{ color: T.text }}>{title}</h1>
              )}
              {subtitle && (
                <p className="text-xs md:text-sm mt-0.5 truncate" style={{ color: T.muted }}>{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-sm rounded-xl px-3 py-2 transition-all"
              style={{
                backgroundColor: T.bg,
                color: T.muted,
                border: `1px solid ${T.border}`,
              }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline text-xs rounded-md px-1.5 py-0.5 ml-1" style={{ backgroundColor: T.border, fontFamily: MONO, color: T.muted }}>K</kbd>
            </button>
            {/* Mobile search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: T.bg, color: T.muted }}
            >
              <Search className="w-4 h-4" />
            </button>
            <AdminNotificationsBell />
          </div>
        </div>

        {/* Horizontal sub-tabs -- scrollable on mobile */}
        <SubTabBar section={activeSection} />

        <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        <div className="flex-1 overflow-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
