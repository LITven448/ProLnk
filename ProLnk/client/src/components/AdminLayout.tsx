import type React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard, DollarSign, Settings,
  LogOut, Search, Bell, Brain, ListChecks, Menu, X, ClipboardList,
  Home, Megaphone, Wrench, Shield, ChevronDown, ChevronRight,
  Zap, Database, ArrowLeftRight, Building2, Network, GitBranch,
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

// --- Sub-tab definitions per section — organized by brand --------------------
export const SECTION_TABS: Record<string, { label: string; href: string }[]> = {
  // Each item below resolves to a UNIQUE page — no duplicates, no aliases.
  overview: [
    { label: "Dashboard",         href: "/admin" },
    { label: "Strategic Overview",href: "/admin/strategic-overview" },
    { label: "Platform Health",   href: "/admin/health" },
    { label: "Analytics",         href: "/admin/analytics" },
    { label: "Investor Metrics",  href: "/admin/investor" },
    { label: "Activity Log",      href: "/admin/activity" },
  ],
  prolnk: [
    { label: "Pro Waitlist",      href: "/admin/waitlist?view=pros" },
    { label: "Charter Tracking",  href: "/admin/charter-tracking" },
    { label: "All Partners",      href: "/admin/partners" },
    { label: "Applications",      href: "/admin/pipeline" },
    { label: "Leaderboard",       href: "/admin/leaderboard" },
    { label: "Referral Tree",     href: "/admin/referral-tree" },
    { label: "Network Analytics", href: "/admin/network-analytics" },
    { label: "Lead Scoring",      href: "/admin/lead-scoring" },
  ],
  trustypro: [
    { label: "Homeowner Waitlist",href: "/admin/waitlist?view=homes" },
    { label: "Homeowner CRM",     href: "/admin/homeowners" },
    { label: "Photo Queue",       href: "/admin/photo-queue" },
    { label: "Opportunities",     href: "/admin/opportunities" },
    { label: "Storm Watch",       href: "/admin/storm" },
    { label: "Trusted Pro Algo",  href: "/admin/trusted-pro-algorithm" },
  ],
  media: [
    { label: "Campaigns",         href: "/admin/campaigns" },
    { label: "Broadcast",         href: "/admin/broadcast" },
    { label: "Automation",        href: "/admin/marketing-automation" },
    { label: "Featured Ads",      href: "/admin/featured-advertisers" },
    { label: "Real Estate Agents",href: "/admin/real-estate-agents" },
    { label: "Reviews",           href: "/admin/google-reviews" },
    { label: "Competitor Intel",  href: "/admin/competitor-intelligence" },
  ],
  exchange: [
    { label: "B2B Exchange",      href: "/admin/exchange" },
    { label: "Territories",       href: "/admin/territory" },
    { label: "Data Marketplace",  href: "/admin/data-marketplace" },
    { label: "Properties",        href: "/admin/properties" },
    { label: "Data Export",       href: "/admin/analytics-export" },
  ],
  platform: [
    { label: "Settings",          href: "/admin/platform-settings" },
    { label: "Service Categories",href: "/admin/categories" },
    { label: "Strikes & Compliance",href: "/admin/compliance" },
    { label: "API Credits",       href: "/admin/api-credits" },
    { label: "Integrations",      href: "/admin/integrations" },
    { label: "Integration Health",href: "/admin/integration-health" },
    { label: "n8n Webhooks",      href: "/admin/n8n-setup" },
    { label: "FSM Webhooks",      href: "/admin/fsm-webhooks" },
  ],
};

// --- Brand nav — text sidebar items per section ──────────────────────────────
type NavItem = { label: string; href: string };
type NavGroup = { label: string; items: NavItem[]; defaultOpen?: boolean };

const BRAND_NAV: Record<string, { header: string; items: NavItem[]; groups: NavGroup[] }> = {
  overview: {
    header: "PORTFOLIO OVERVIEW",
    items: [
      { label: "Command Center",    href: "/admin" },
      { label: "Strategic Overview",href: "/admin/strategic-overview" },
      { label: "Investor Metrics",  href: "/admin/investor" },
      { label: "Financial Center",  href: "/admin/finance" },
      { label: "Platform Health",   href: "/admin/health" },
      { label: "All Waitlists",     href: "/admin/waitlist" },
      { label: "Activity Log",      href: "/admin/activity" },
    ],
    groups: [
      {
        label: "AI & ORG",
        defaultOpen: true,
        items: [
          { label: "All Agents",       href: "/admin/agents" },
          { label: "Agent Status",     href: "/admin/agent-status" },
          { label: "Org Chart",        href: "/admin/org-chart" },
          { label: "Accountability",   href: "/admin/accountability" },
          { label: "Knowledge Graph",  href: "/admin/knowledge-graph" },
          { label: "n8n Hub",          href: "/admin/n8n" },
        ],
      },
    ],
  },

  prolnk: {
    header: "PROLNK RESIDENTIAL",
    items: [
      { label: "Pro Waitlist",      href: "/admin/waitlist?view=pros" },
      { label: "Charter Tracking",  href: "/admin/charter-tracking" },
      { label: "All Partners",      href: "/admin/partners" },
      { label: "Applications",      href: "/admin/pipeline" },
      { label: "Leaderboard",       href: "/admin/leaderboard" },
      { label: "Referral Tree",     href: "/admin/referral-tree" },
      { label: "Network Analytics", href: "/admin/network-analytics" },
      { label: "Lead Scoring",      href: "/admin/lead-scoring" },
    ],
    groups: [
      {
        label: "FINANCIAL",
        defaultOpen: false,
        items: [
          { label: "Commission Rates",   href: "/admin/rates" },
          { label: "Commission Strategy",href: "/admin/commission-strategy" },
          { label: "Payouts",            href: "/admin/payouts" },
        ],
      },
    ],
  },

  trustypro: {
    header: "TRUSTYPRO",
    items: [
      { label: "Homeowner Waitlist",   href: "/admin/waitlist?view=homes" },
      { label: "Homeowner CRM",        href: "/admin/homeowners" },
      { label: "Photo Queue",          href: "/admin/photo-queue" },
      { label: "Opportunities",        href: "/admin/opportunities" },
      { label: "Storm Watch",          href: "/admin/storm" },
      { label: "Trusted Pro Algorithm",href: "/admin/trusted-pro-algorithm" },
    ],
    groups: [],
  },

  media: {
    header: "PROLNK MEDIA",
    items: [
      { label: "Campaigns",         href: "/admin/campaigns" },
      { label: "Broadcast",         href: "/admin/broadcast" },
      { label: "Automation",        href: "/admin/marketing-automation" },
      { label: "Featured Advertisers",href: "/admin/featured-advertisers" },
      { label: "Real Estate Agents",href: "/admin/real-estate-agents" },
      { label: "Google Reviews",    href: "/admin/google-reviews" },
      { label: "Competitor Intel",  href: "/admin/competitor-intelligence" },
    ],
    groups: [],
  },

  exchange: {
    header: "EXCHANGE & DATA",
    items: [
      { label: "B2B Exchange",      href: "/admin/exchange" },
      { label: "Territories",       href: "/admin/territory" },
      { label: "Data Marketplace",  href: "/admin/data-marketplace" },
      { label: "Properties",        href: "/admin/properties" },
      { label: "Public Job Board",  href: "/exchange" },
      { label: "Data Export",       href: "/admin/analytics-export" },
    ],
    groups: [],
  },

  platform: {
    header: "PLATFORM",
    items: [
      { label: "Platform Settings",  href: "/admin/platform-settings" },
      { label: "Service Categories", href: "/admin/categories" },
      { label: "Strikes & Compliance",href: "/admin/compliance" },
      { label: "API Credits",        href: "/admin/api-credits" },
    ],
    groups: [
      {
        label: "INTEGRATIONS",
        defaultOpen: true,
        items: [
          { label: "All Integrations",     href: "/admin/integrations" },
          { label: "Integration Health",   href: "/admin/integration-health" },
          { label: "n8n / Webhooks",       href: "/admin/n8n-setup" },
          { label: "FSM Webhooks",         href: "/admin/fsm-webhooks" },
          { label: "Jobber",               href: "/admin/jobber" },
          { label: "Housecall Pro",        href: "/admin/housecallpro" },
          { label: "ServiceTitan",         href: "/admin/servicetitan" },
        ],
      },
    ],
  },

  // Legacy "commercial" section removed (3 of its 6 links were duplicates of /admin/commercial).
  // Properties and Compliance are now under Exchange and Platform respectively.
};


// --- Helper: which brand section is active ───────────────────────────────────
function getActiveSection(path: string, search?: string): string {
  // Overview
  if (path === "/admin" || path.startsWith("/admin/health") || path.startsWith("/admin/activity") || path.startsWith("/admin/analytics") || path.startsWith("/admin/investor") || path.startsWith("/admin/business-plan") || path.startsWith("/admin/finance") || path.startsWith("/admin/org-chart") || path.startsWith("/admin/knowledge-graph") || path.startsWith("/admin/agents")) return "overview";

  // Waitlist: route to brand based on ?view= query param
  if (path.startsWith("/admin/waitlist")) {
    return (search ?? "").includes("view=homes") ? "trustypro" : "prolnk";
  }

  // ProLnk — partner network, commissions, exchange
  if (
    path.startsWith("/admin/partner") || path.startsWith("/admin/network") ||
    path.startsWith("/admin/pipeline") || path.startsWith("/admin/verification") ||
    path.startsWith("/admin/leaderboard") || path.startsWith("/admin/map") ||
    path.startsWith("/admin/payouts") || path.startsWith("/admin/payout-history") ||
    path.startsWith("/admin/rates") || path.startsWith("/admin/disputes") ||
    path.startsWith("/admin/deal-pipeline") || path.startsWith("/admin/deals") ||
    path.startsWith("/admin/deal-composer") || path.startsWith("/admin/referral-pipeline") ||
    path.startsWith("/admin/revenue-forecast") || path.startsWith("/admin/market") ||
    path.startsWith("/admin/compliance") || path.startsWith("/admin/featured-advertisers") ||
    path.startsWith("/admin/real-estate-agents") || path.startsWith("/admin/referral-tree")
  ) return "prolnk";

  // TrustyPro — homeowner platform, scans, storm, property data
  if (
    path.startsWith("/admin/homeowners") || path.startsWith("/admin/home-intelligence") ||
    path.startsWith("/admin/trustypro") || path.startsWith("/admin/ai") ||
    path.startsWith("/admin/photo-pipeline") || path.startsWith("/admin/photo-queue") ||
    path.startsWith("/admin/opportunities") || path.startsWith("/admin/detector") ||
    path.startsWith("/admin/bundle-offers") || path.startsWith("/admin/properties") ||
    path.startsWith("/admin/data-intelligence") || path.startsWith("/admin/storm") ||
    path.startsWith("/admin/asset-aging") || path.startsWith("/admin/recalls") ||
    path.startsWith("/admin/heatmap") || path.startsWith("/admin/coverage-map") ||
    path.startsWith("/admin/ai-pipeline") || path.startsWith("/admin/insurance-claims") ||
    path.startsWith("/admin/lead-scoring") || path.startsWith("/admin/agents") ||
    path.startsWith("/admin/predict")
  ) return "trustypro";

  // Media — marketing, campaigns, content
  if (
    path.startsWith("/admin/marketing-automation") || path.startsWith("/admin/campaigns") ||
    path.startsWith("/admin/broadcast") || path.startsWith("/admin/content") ||
    path.startsWith("/admin/comm-sequence") || path.startsWith("/admin/nps") ||
    path.startsWith("/admin/ab-tests") || path.startsWith("/admin/seasonal-campaigns") ||
    path.startsWith("/admin/smart-notifications") || path.startsWith("/admin/google-reviews") ||
    path.startsWith("/admin/advertising-preview") || path.startsWith("/admin/comms")
  ) return "media";

  // Exchange
  if (path.startsWith("/admin/exchange") || path.startsWith("/admin/data-marketplace") ||
      path.startsWith("/admin/territory") || path.startsWith("/admin/franchise")) return "exchange";

  // Commercial
  if (path.startsWith("/admin/commercial") || path.startsWith("/admin/mass-adoption")) return "exchange";

  // Platform — settings, integrations
  if (
    path.startsWith("/admin/platform-settings") || path.startsWith("/admin/setup") ||
    path.startsWith("/admin/categories") || path.startsWith("/admin/integrations") ||
    path.startsWith("/admin/integration") || path.startsWith("/admin/n8n") ||
    path.startsWith("/admin/fsm") || path.startsWith("/admin/jobber") ||
    path.startsWith("/admin/housecallpro") || path.startsWith("/admin/servicetitan") ||
    path.startsWith("/admin/companycam") || path.startsWith("/admin/buildium") ||
    path.startsWith("/admin/agreements") || path.startsWith("/admin/api-credits") ||
    path.startsWith("/admin/analytics-export") || path.startsWith("/admin/payment-flows")
  ) return "platform";

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
  const accentColor = SECTION_COLORS[section] ?? T.accent;
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
        const tabPath = tab.href.split("?")[0];
        const tabQuery = tab.href.includes("?") ? tab.href.split("?")[1] : null;
        const currentQuery = typeof window !== "undefined" ? window.location.search.replace("?", "") : "";
        const pathMatch = location === tabPath || (tabPath !== "/admin" && location.startsWith(tabPath));
        const isActive = pathMatch && (!tabQuery || currentQuery.includes(tabQuery));
        return (
          <Link key={tab.href} href={tab.href}>
            <button
              className="flex-shrink-0 px-3 py-3 text-sm font-medium transition-all whitespace-nowrap"
              style={{
                color: isActive ? accentColor : T.muted,
                backgroundColor: "transparent",
                borderBottom: isActive ? `2px solid ${accentColor}` : "2px solid transparent",
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

// --- Collapsible nav group ────────────────────────────────────────────────────
function NavGroup({
  group,
  location,
}: {
  group: NavGroup;
  location: string;
}) {
  const [open, setOpen] = useState(group.defaultOpen ?? false);
  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-1.5 mt-2"
        style={{ color: T.dim }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">{group.label}</span>
        {open
          ? <ChevronDown className="w-3 h-3 flex-shrink-0" />
          : <ChevronRight className="w-3 h-3 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 mt-0.5">
          {group.items.map(item => {
            const itemPath = item.href.split("?")[0];
            const isActive = location === itemPath || (itemPath !== "/admin" && location.startsWith(itemPath));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all text-xs"
                  style={{
                    backgroundColor: isActive ? T.accentBg : "transparent",
                    color: isActive ? T.accent : T.muted,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Icon Rail ───────────────────────────────────────────────────────────────
function IconRail({
  activeSection,
  user,
  logout,
}: {
  activeSection: string;
  user: { name?: string | null } | null;
  logout: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center py-3 flex-shrink-0"
      style={{
        width: 50,
        backgroundColor: "#1A1D2E",
        height: "100%",
      }}
    >
      {/* Logo */}
      <div className="mb-4 flex items-center justify-center w-8 h-8">
        <ProLnkLogo variant="icon" height={22} />
      </div>

      {/* Section icons */}
      <div className="flex flex-col items-center gap-1 flex-1">
        {RAIL_ITEMS.map(({ icon: Icon, section, color }) => {
          const isActive = section === activeSection;
          // Each icon navigates to the first item of the corresponding BRAND_NAV
          const firstHref = BRAND_NAV[section]?.items?.[0]?.href ?? "/admin";
          return (
            <Link key={section} href={firstHref}>
              <div
                title={section.charAt(0).toUpperCase() + section.slice(1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all"
                style={{
                  backgroundColor: isActive ? color : "transparent",
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                  boxShadow: isActive ? `0 4px 12px ${color}66` : "none",
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* User avatar + sign out */}
      <div className="flex flex-col items-center gap-2 mt-2">
        {user && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: BADGE_GRADIENTS.blue }}
            title={user.name ?? "Admin"}
          >
            {user.name?.[0]?.toUpperCase() ?? "A"}
          </div>
        )}
        <button
          onClick={logout}
          title="Sign Out"
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(234,6,6,0.2)";
            (e.currentTarget as HTMLButtonElement).style.color = "#EA0606";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// --- Text Nav Sidebar ─────────────────────────────────────────────────────────
function TextNav({
  activeSection,
  todoOpen,
  setTodoOpen,
  onNavClick,
}: {
  activeSection: string;
  todoOpen: boolean;
  setTodoOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  onNavClick?: () => void;
}) {
  const [location] = useLocation();
  const nav = BRAND_NAV[activeSection];
  if (!nav) return null;

  return (
    <div
      className="flex flex-col"
      style={{
        width: 190,
        backgroundColor: T.sidebar,
        borderRight: `1px solid ${T.border}`,
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* Section header */}
      <div className="px-4 pt-4 pb-2 flex-shrink-0">
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: T.dim }}
        >
          {nav.header}
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 pb-2">
        <div className="flex flex-col gap-0.5">
          {nav.items.map(item => {
            const itemPath = item.href.split("?")[0];
            const itemQuery = item.href.includes("?") ? item.href.split("?")[1] : null;
            const currentQuery = typeof window !== "undefined" ? window.location.search.replace("?", "") : "";
            const pathMatch = location === itemPath || (itemPath !== "/admin" && location.startsWith(itemPath));
            const isActive = pathMatch && (!itemQuery || currentQuery.includes(itemQuery));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all text-sm"
                  style={{
                    backgroundColor: isActive ? T.accentBg : "transparent",
                    color: isActive ? SECTION_COLORS[activeSection] ?? T.accent : T.muted,
                    fontWeight: isActive ? 600 : 400,
                  }}
                  onClick={onNavClick}
                >
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Collapsible groups */}
        {nav.groups.map(group => (
          <NavGroup key={group.label} group={group} location={location} />
        ))}
      </nav>

      {/* Agent Workboard button */}
      <div className="px-2 pb-3 flex-shrink-0">
        <button
          onClick={() => setTodoOpen(v => !v)}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all"
          style={{
            backgroundColor: todoOpen ? T.accent : T.bg,
            color: todoOpen ? "#FFFFFF" : T.muted,
          }}
        >
          <ListChecks className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium text-xs">Agent Workboard</span>
        </button>
      </div>
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
    <div className="flex" style={{ height: "100%" }}>
      {/* Icon rail — 50px */}
      <IconRail activeSection={activeSection} user={user} logout={logout} />
      {/* Text nav — 190px */}
      <TextNav
        activeSection={activeSection}
        todoOpen={todoOpen}
        setTodoOpen={setTodoOpen}
        onNavClick={onNavClick}
      />
    </div>
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
  const activeSection                 = getActiveSection(location, typeof window !== "undefined" ? window.location.search : "");

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
          <aside
            className="flex flex-col h-full overflow-hidden"
            style={{
              width: 240,
              boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
              zIndex: 51,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button — floats over icon rail */}
            <div
              className="absolute top-3 right-0 z-10 flex items-center justify-end pr-2"
              style={{ width: 190 + 50 }}
            >
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: T.bg, color: T.muted }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <SidebarContent
              activeSection={activeSection}
              user={user}
              logout={logout}
              todoOpen={todoOpen}
              setTodoOpen={setTodoOpen}
              onNavClick={() => setMobileSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* -- Desktop Sidebar (hidden on mobile) ---------------------------- */}
      <aside
        className="hidden md:flex flex-shrink-0"
        style={{
          width: 240,
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

        {/* Horizontal sub-tabs — scrollable on mobile */}
        <SubTabBar section={activeSection} />

        <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        <div className="flex-1 overflow-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
