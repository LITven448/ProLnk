import type React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard, Settings, LogOut, Search, Bell, ListChecks,
  Menu, X, Home, Shield, ChevronDown, ArrowLeftRight, Megaphone,
  type LucideIcon,
} from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import ProLnkLogo from "@/components/ProLnkLogo";
import AdminTodoPanel from "@/components/AdminTodoPanel";

// --- Design Tokens — editorial / professional SaaS admin ---------------------
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

// --- ONE navigation system ----------------------------------------------------
// A single left sidebar organized by business. Each top-level section is a
// collapsible group of REAL, unique, rendering pages — no header tabs, no icon
// rail, no redirect aliases. The whole tree shares one professional sky accent.
type NavLink = { label: string; href: string };
type NavSection = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;        // direct target (section with no children, e.g. Command Center)
  links?: NavLink[];    // collapsible children
};

const NAV_SECTIONS: NavSection[] = [
  {
    id: "command",
    label: "Command Center",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    id: "prolnk",
    label: "ProLnk",
    icon: Home,
    links: [
      { label: "Pro Waitlist",      href: "/admin/waitlist?view=pros" },
      { label: "Applications",      href: "/admin/pipeline" },
      { label: "All Partners",      href: "/admin/partners" },
      { label: "Matching Console",  href: "/admin/matching" },
      { label: "Leaderboard",       href: "/admin/leaderboard" },
      { label: "Referral Tree",     href: "/admin/referral-tree" },
      { label: "Network Analytics", href: "/admin/network-analytics" },
      { label: "Lead Scoring",      href: "/admin/lead-scoring" },
      { label: "Commission Rates",  href: "/admin/rates" },
      { label: "Payouts",           href: "/admin/payouts" },
    ],
  },
  {
    id: "trustypro",
    label: "TrustyPro",
    icon: Shield,
    links: [
      { label: "Homeowner Waitlist", href: "/admin/waitlist?view=homes" },
      { label: "Homeowner CRM",      href: "/admin/homeowners" },
      { label: "Photo Queue",        href: "/admin/photo-queue" },
      { label: "Opportunities",      href: "/admin/opportunities" },
      { label: "Properties",         href: "/admin/properties" },
      { label: "Storm Watch",        href: "/admin/storm" },
      { label: "Trusted Pro Algorithm", href: "/admin/trusted-pro-algorithm" },
    ],
  },
  {
    id: "exchange",
    label: "Exchange",
    icon: ArrowLeftRight,
    links: [
      { label: "B2B Exchange",     href: "/admin/exchange" },
      { label: "Deal Pipeline",    href: "/admin/deal-pipeline" },
      { label: "Deal Composer",    href: "/admin/deal-composer" },
      { label: "Territories",      href: "/admin/territory" },
      { label: "Data Marketplace", href: "/admin/data-marketplace" },
    ],
  },
  {
    id: "media",
    label: "Media",
    icon: Megaphone,
    links: [
      { label: "Campaigns",       href: "/admin/campaigns" },
      { label: "Broadcast",       href: "/admin/broadcast" },
      { label: "Automation",      href: "/admin/marketing-automation" },
      { label: "Featured Ads",    href: "/admin/featured-advertisers" },
      { label: "Google Reviews",  href: "/admin/google-reviews" },
      { label: "Competitor Intel",href: "/admin/competitor-intelligence" },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    icon: Settings,
    links: [
      { label: "Agent Activity",     href: "/admin/agents" },
      { label: "Agent Status",       href: "/admin/agent-status" },
      { label: "Org Chart",          href: "/admin/org-chart" },
      { label: "Chatbot Knowledge",  href: "/admin/chatbot-knowledge" },
      { label: "Service Categories", href: "/admin/categories" },
      { label: "Integrations",       href: "/admin/integrations" },
      { label: "Integration Health", href: "/admin/integration-health" },
      { label: "n8n / Webhooks",     href: "/admin/n8n-setup" },
      { label: "Compliance",         href: "/admin/compliance" },
      { label: "API Credits",        href: "/admin/api-credits" },
      { label: "Activity Log",       href: "/admin/activity" },
      { label: "Platform Health",    href: "/admin/health" },
      { label: "Settings",           href: "/admin/platform-settings" },
    ],
  },
];

// --- Active-state helpers -----------------------------------------------------
function isLinkActive(href: string, location: string, currentQuery: string): boolean {
  const path = href.split("?")[0];
  const query = href.includes("?") ? href.split("?")[1] : null;
  const pathMatch = location === path || (path !== "/admin" && location.startsWith(path));
  if (!pathMatch) return false;
  if (query) return currentQuery.includes(query);
  return true;
}

function sectionContainsActive(section: NavSection, location: string, currentQuery: string): boolean {
  if (section.href) return isLinkActive(section.href, location, currentQuery);
  return (section.links ?? []).some(l => isLinkActive(l.href, location, currentQuery));
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

// --- Single sidebar section (collapsible group OR direct link) ----------------
function SidebarSection({
  section,
  location,
  currentQuery,
  onNavClick,
}: {
  section: NavSection;
  location: string;
  currentQuery: string;
  onNavClick?: () => void;
}) {
  const Icon = section.icon;
  const hasActive = sectionContainsActive(section, location, currentQuery);
  const [open, setOpen] = useState(hasActive);

  useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  // Direct-link section (no children) — e.g. Command Center
  if (section.href) {
    const active = isLinkActive(section.href, location, currentQuery);
    return (
      <Link href={section.href}>
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all"
          style={{
            backgroundColor: active ? T.accentBg : "transparent",
            color: active ? T.accent : T.text,
            fontWeight: active ? 600 : 500,
          }}
          onClick={onNavClick}
        >
          <Icon className="w-[18px] h-[18px] flex-shrink-0" />
          <span className="text-sm">{section.label}</span>
        </div>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all"
        style={{ color: hasActive ? T.text : T.muted, fontWeight: 500 }}
      >
        <Icon className="w-[18px] h-[18px] flex-shrink-0" style={{ color: hasActive ? T.accent : T.muted }} />
        <span className="text-sm flex-1 text-left">{section.label}</span>
        <ChevronDown
          className="w-3.5 h-3.5 flex-shrink-0 transition-transform"
          style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)", color: T.dim }}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 mt-0.5 mb-1" style={{ paddingLeft: 14 }}>
          {(section.links ?? []).map(link => {
            const active = isLinkActive(link.href, location, currentQuery);
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className="flex items-center px-3 py-1.5 rounded-lg cursor-pointer transition-all text-[13px]"
                  style={{
                    borderLeft: `2px solid ${active ? T.accent : "transparent"}`,
                    backgroundColor: active ? T.accentBg : "transparent",
                    color: active ? T.accent : T.muted,
                    fontWeight: active ? 600 : 400,
                  }}
                  onClick={onNavClick}
                >
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Sidebar (shared between desktop and mobile overlay) ----------------------
function Sidebar({
  location,
  currentQuery,
  todoOpen,
  setTodoOpen,
  user,
  logout,
  onNavClick,
}: {
  location: string;
  currentQuery: string;
  todoOpen: boolean;
  setTodoOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  user: { name?: string | null } | null;
  logout: () => void;
  onNavClick?: () => void;
}) {
  return (
    <div
      className="flex flex-col h-full"
      style={{ width: 248, backgroundColor: T.sidebar, borderRight: `1px solid ${T.border}` }}
    >
      {/* Brand */}
      <div
        className="flex items-center px-5 flex-shrink-0"
        style={{ height: 64, borderBottom: `1px solid ${T.border}` }}
      >
        <ProLnkLogo variant="dark" height={26} />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p
          className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: T.dim }}
        >
          Workspace
        </p>
        <div className="flex flex-col gap-0.5">
          {NAV_SECTIONS.map(section => (
            <SidebarSection
              key={section.id}
              section={section}
              location={location}
              currentQuery={currentQuery}
              onNavClick={onNavClick}
            />
          ))}
        </div>
      </nav>

      {/* Footer: workboard + user */}
      <div className="px-3 py-3 flex-shrink-0" style={{ borderTop: `1px solid ${T.border}` }}>
        <button
          onClick={() => setTodoOpen(v => !v)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all mb-2"
          style={{
            backgroundColor: todoOpen ? T.accent : T.bg,
            color: todoOpen ? "#FFFFFF" : T.muted,
            fontWeight: 500,
          }}
        >
          <ListChecks className="w-[18px] h-[18px] flex-shrink-0" />
          <span>Agent Workboard</span>
        </button>
        <div className="flex items-center gap-2.5 px-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: BADGE_GRADIENTS.blue }}
            title={user?.name ?? "Admin"}
          >
            {user?.name?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold truncate" style={{ color: T.text }}>
              {user?.name ?? "Admin"}
            </p>
            <p className="text-[10px] truncate" style={{ color: T.dim }}>Administrator</p>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
            style={{ color: T.muted, backgroundColor: T.bg }}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
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
  const [location]                                = useLocation();
  const { user, logout }                          = useAuth();
  const [searchOpen, setSearchOpen]               = useState(false);
  const [todoOpen, setTodoOpen]                   = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const currentQuery = typeof window !== "undefined" ? window.location.search.replace("?", "") : "";

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
          className="fixed inset-0 z-50 md:hidden flex"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileSidebarOpen(false)}
        >
          <aside
            className="flex flex-col h-full overflow-hidden relative"
            style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.15)", zIndex: 51 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: T.bg, color: T.muted }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <Sidebar
              location={location}
              currentQuery={currentQuery}
              todoOpen={todoOpen}
              setTodoOpen={setTodoOpen}
              user={user}
              logout={logout}
              onNavClick={() => setMobileSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* -- Desktop Sidebar (hidden on mobile) ---------------------------- */}
      <aside className="hidden md:flex flex-shrink-0" style={{ zIndex: 10 }}>
        <Sidebar
          location={location}
          currentQuery={currentQuery}
          todoOpen={todoOpen}
          setTodoOpen={setTodoOpen}
          user={user}
          logout={logout}
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

        {/* Top bar — minimal: page title + global search + notifications */}
        <div
          className="flex items-center justify-between px-4 flex-shrink-0"
          style={{ height: 64, backgroundColor: T.surface, borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-3 min-w-0">
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
              style={{ backgroundColor: T.bg, color: T.muted, border: `1px solid ${T.border}` }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline text-xs rounded-md px-1.5 py-0.5 ml-1" style={{ backgroundColor: T.border, fontFamily: MONO, color: T.muted }}>K</kbd>
            </button>
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

        <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        <div className="flex-1 overflow-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
