import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import ProLnkLogo from "@/components/ProLnkLogo";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard, Inbox, DollarSign, Users, Settings,
  LogOut, Menu, X, ArrowRight, ChevronLeft, ChevronRight,
  Sparkles, Search, Bell, Camera, Send, Link2,
  Activity, TrendingUp, Star, Trophy, UserPlus, Bot,
  User, Smartphone, ClipboardList, Rss, Zap
} from "lucide-react";
import { useState } from "react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { NotificationBell } from "@/components/NotificationBell";
import ErrorBoundary from "@/components/ErrorBoundary";

// --- Condensed 5-Item Navigation ---------------------------------------------
// Each top-level item has sub-items accessible via the page itself
const NAV_ITEMS = [
  {
    icon: Zap,
    label: "Field OS",
    href: "/field-os",
    exact: false,
    sub: [
      { label: "Today's Jobs",   href: "/field-os" },
      { label: "Photo Scan",     href: "/field-os" },
      { label: "AI Leads",       href: "/field-os" },
      { label: "Earnings",       href: "/field-os" },
    ],
  },
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/dashboard",
    exact: true,
    sub: [
      { label: "Overview",      href: "/dashboard" },
      { label: "Alerts",        href: "/dashboard/alerts" },
      { label: "Network Feed",  href: "/dashboard/feed" },
      { label: "What's New",    href: "/dashboard/whats-new" },
    ],
  },
  {
    icon: Inbox,
    label: "Leads & Jobs",
    href: "/dashboard/leads",
    sub: [
      { label: "Inbox",         href: "/dashboard/inbox" },
      { label: "Quote Requests", href: "/dashboard/quote-inbox" },
      { label: "Schedule",      href: "/dashboard/schedule" },
      { label: "Inbound Leads", href: "/dashboard/leads" },
      { label: "My Referrals",  href: "/dashboard/referrals" },
      { label: "Quote Builder", href: "/dashboard/quote-builder" },
      { label: "Performance",   href: "/dashboard/performance" },
      { label: "Upsell Playbook", href: "/dashboard/upsell" },
      { label: "Bid Board",     href: "/dashboard/bid-board" },
      { label: "Log a Job",     href: "/job/new" },
      { label: "Job History",   href: "/jobs" },
    ],
  },
  {
    icon: DollarSign,
    label: "Earnings",
    href: "/dashboard/earnings",
    sub: [
      { label: "Earnings",      href: "/dashboard/earnings" },
      { label: "Commissions",   href: "/dashboard/commissions" },
      { label: "Commission Rates", href: "/dashboard/commission-rates" },
      { label: "Dispute Center", href: "/dashboard/disputes" },
      { label: "Payout Setup", href: "/dashboard/payout-setup" },
      { label: "Payout History", href: "/dashboard/payout-history" },
      { label: "Tax Estimator", href: "/dashboard/tax-estimator" },
      { label: "Growth Calculator", href: "/dashboard/growth-calculator" },
      { label: "Training Hub", href: "/dashboard/training" },
      { label: "Earnings Calculator", href: "/dashboard/calculator" },
      { label: "Compliance & Docs", href: "/dashboard/compliance" },
      { label: "Referral Hub",  href: "/dashboard/referral" },
      { label: "Referral Funnel", href: "/dashboard/referral-funnel" },
      { label: "Tier Progress", href: "/dashboard/tier" },
      { label: "Upgrade Plan",  href: "/dashboard/upgrade" },
      { label: "Analytics",     href: "/dashboard/analytics" },
      { label: "Onboarding Checklist", href: "/dashboard/onboarding" },
    ],
  },
  {
    icon: Users,
    label: "Network",
    href: "/dashboard/network",
    sub: [
      { label: "My Network",    href: "/dashboard/network" },
      { label: "Directory",     href: "/partners" },
      { label: "Leaderboard",   href: "/leaderboard" },
      { label: "Recruit",       href: "/dashboard/referral" },
      { label: "Community",     href: "/dashboard/community" },
      { label: "Networking Events", href: "/dashboard/events" },
      { label: "Scout Assessment", href: "/dashboard/scout-assessment" },
      { label: "Marketing Kit", href: "/dashboard/marketing-kit" },
      { label: "AI Assistant",  href: "/dashboard/ai" },
    ],
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/profile",
    sub: [
      { label: "Edit Profile",  href: "/dashboard/profile" },
      { label: "Service Area",   href: "/dashboard/service-area" },
      { label: "360° Profile",    href: "/dashboard/360-profile" },
      { label: "ProPass",       href: "/dashboard/pro-pass" },
      { label: "Briefcase",     href: "/dashboard/briefcase" },
      { label: "My Reviews",    href: "/dashboard/reviews" },
      { label: "Skills & Certs", href: "/dashboard/skills" },
      { label: "Job Preferences", href: "/dashboard/job-preferences" },
      { label: "Availability",  href: "/dashboard/availability" },
      { label: "Notifications", href: "/dashboard/notifications" },
      { label: "Notif. Prefs",  href: "/dashboard/notification-preferences" },
      { label: "Photo Guidelines", href: "/dashboard/photo-guidelines" },
      { label: "Integrations",  href: "/dashboard/integrations" },
      { label: "Account Settings", href: "/dashboard/settings" },
    ],
  },
];

interface PartnerLayoutProps {
  children: React.ReactNode;
}

export default function PartnerLayout({ children }: PartnerLayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user: authUser, loading, isAuthenticated, logout } = useAuth();
  const { data: partnerProfile } = trpc.partners.getMyProfile.useQuery(undefined, { enabled: isAuthenticated });
  const strikeCount = partnerProfile?.partner?.strikeCount ?? 0;
  const standingLabel = strikeCount === 0 ? "Good Standing" : strikeCount === 1 ? "Warning" : strikeCount === 2 ? "Final Warning" : "Suspended";
  const standingColor = strikeCount === 0 ? "#059669" : strikeCount === 1 ? "#D97706" : strikeCount === 2 ? "#EF4444" : "#7C3AED";
  const standingBg = strikeCount === 0 ? "#D1FAE5" : strikeCount === 1 ? "#FEF3C7" : strikeCount === 2 ? "#FEE2E2" : "#EDE9FE";

  const demoUser = { name: "Demo Partner", email: "demo@prolnk.com", openId: "demo_preview" };
  const user = isAuthenticated ? authUser : demoUser;

  const isActive = (href: string, exact?: boolean) => {
    if (exact || href === "/dashboard") return location === href;
    return location === href || location.startsWith(href + "/");
  };

  const getActiveParent = () => {
    return NAV_ITEMS.find(item =>
      item.sub?.some(s => isActive(s.href, s.href === "/dashboard"))
    ) ?? NAV_ITEMS.find(item => isActive(item.href, item.exact));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#0A1628] border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400">Loading Partner Portal...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && partnerProfile?.partner?.suspendedAt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Account Suspended</h2>
          <p className="text-sm text-gray-500 mb-4">
            {partnerProfile.partner.suspensionReason || "Your account has been suspended. Please contact support to resolve this."}
          </p>
          <a href="mailto:support@prolnk.io" className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#0A1628" }}>
            Contact Support
          </a>
          <button onClick={logout} className="block mx-auto mt-3 text-xs text-gray-400 hover:text-gray-600 underline">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const isDemoUser = !isAuthenticated || (user?.openId?.startsWith("demo_") ?? false);
  const activeParent = getActiveParent();

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      {/* Demo Banner */}
      {isDemoUser && (
        <div className="w-full py-2.5 px-4 flex items-center justify-center gap-3 text-sm font-medium flex-shrink-0 z-50"
          style={{ background: "linear-gradient(90deg, #0A1628, #0A1628)", color: "#fff" }}>
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          <span>You're viewing a <strong>live demo</strong> -- this is exactly what your Partner Portal looks like after joining.</span>
          <a href="/apply"
            className="hidden sm:flex items-center gap-1 bg-white rounded-full px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ color: "#0A1628" }}>
            Apply to Join <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* -- Desktop Sidebar ----------------------------------------------- */}
        <aside className={`hidden md:flex flex-col ${collapsed ? "w-16" : "w-56"} bg-white border-r border-gray-100 flex-shrink-0 transition-all duration-200 sticky top-0 h-screen overflow-hidden shadow-sm`}>
          {/* Logo */}
          <div className={`flex items-center h-16 border-b border-gray-100 px-4 ${collapsed ? "justify-center" : "justify-between"} flex-shrink-0`}>
            {!collapsed && (
              <Link href="/dashboard">
                <ProLnkLogo height={24} variant="light" className="cursor-pointer" />
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Primary Nav -- 5 items */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <div className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const active = item.sub
                  ? item.sub.some(s => isActive(s.href, s.href === "/dashboard"))
                  : isActive(item.href, item.exact);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all group relative ${
                        active
                          ? "bg-[#0A1628] text-white font-semibold shadow-sm"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[#F5E642]" />
                      )}
                      <item.icon className={`w-4.5 h-4.5 flex-shrink-0 ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} style={{ width: "1.125rem", height: "1.125rem" }} />
                      {!collapsed && (
                        <span className="text-sm font-medium truncate">{item.label}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Sub-nav removed from sidebar — now shown as horizontal tabs above content */}
          </nav>

          {/* User profile at bottom */}
          <div className={`border-t border-gray-100 p-3 flex-shrink-0 ${collapsed ? "flex justify-center" : ""}`}>
            {collapsed ? (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ backgroundColor: "#0A1628" }} title={user?.name ?? "Partner"}>
                {user?.name?.[0]?.toUpperCase() ?? "P"}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "#0A1628" }}>
                  {user?.name?.[0]?.toUpperCase() ?? "P"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate leading-tight">{user?.name ?? "Partner"}</p>
                  <p className="text-xs text-gray-400 truncate leading-tight">{user?.email ?? ""}</p>
                  {isAuthenticated && (
                    <span className="inline-block mt-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-none" style={{ color: standingColor, backgroundColor: standingBg }}>
                      {standingLabel}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <NotificationBell />
                  <button onClick={logout}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                    title="Sign Out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* -- Mobile Top Bar + Drawer ---------------------------------------- */}
        <div className="flex flex-col flex-1 min-w-0">
          <header className="md:hidden bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4 sticky top-0 z-40 flex-shrink-0 shadow-sm">
            <Link href="/dashboard">
              <ProLnkLogo height={24} variant="light" />
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <Search className="w-5 h-5" />
              </button>
              <NotificationBell />
              <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Mobile Drawer */}
          {mobileOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
                  <ProLnkLogo height={24} variant="light" />
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                  <div className="space-y-0.5">
                    {NAV_ITEMS.map((item) => {
                      const active = item.sub
                        ? item.sub.some(s => isActive(s.href, s.href === "/dashboard"))
                        : isActive(item.href, item.exact);
                      return (
                        <div key={item.href}>
                          <Link href={item.href}>
                            <div onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                                active ? "bg-[#F5E642]/10 text-[#0A1628]" : "text-gray-600 hover:bg-gray-50"
                              }`}>
                              <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#0A1628]" : "text-gray-400"}`} />
                              <span className="text-sm font-medium">{item.label}</span>
                            </div>
                          </Link>
                          {active && item.sub && item.sub.length > 1 && (
                            <div className="ml-10 mt-0.5 space-y-0.5">
                              {item.sub.map((sub) => (
                                <Link key={sub.href} href={sub.href}>
                                  <div onClick={() => setMobileOpen(false)}
                                    className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all ${
                                      isActive(sub.href, sub.href === "/dashboard")
                                        ? "text-[#0A1628] font-semibold"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}>
                                    {sub.label}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </nav>
                <div className="border-t border-gray-100 p-4">
                  {/* Field OS Quick Launch */}
                  <Link href="/field-os">
                    <div onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl mb-3 text-sm font-semibold text-white cursor-pointer"
                      style={{ background: "linear-gradient(135deg, #0A1628, #1a3a5c)" }}>
                      <Zap className="w-4 h-4" />
                      Open Field OS
                    </div>
                  </Link>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: "#0A1628" }}>
                      {user?.name?.[0]?.toUpperCase() ?? "P"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name ?? "Partner"}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email ?? ""}</p>
                    </div>
                  </div>
                  <button onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Page Content */}
          <main className="flex-1 overflow-auto flex flex-col">
            <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            {/* Horizontal sub-tab bar — matches admin panel pattern */}
            {activeParent?.sub && activeParent.sub.length > 1 && (
              <div
                className="flex items-center gap-0 px-4 flex-shrink-0 bg-white border-b border-gray-100"
                style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" } as React.CSSProperties}
              >
                {activeParent.sub.map(tab => {
                  const tabActive = isActive(tab.href, tab.href === "/dashboard");
                  return (
                    <Link key={tab.href} href={tab.href}>
                      <button
                        className="flex-shrink-0 px-3 py-3 text-sm font-medium transition-all whitespace-nowrap"
                        style={{
                          color: tabActive ? "#0A1628" : "#9CA3AF",
                          backgroundColor: "transparent",
                          borderBottom: tabActive ? "2px solid #0A1628" : "2px solid transparent",
                          marginBottom: "-1px",
                        }}
                      >
                        {tab.label}
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
            <div className="flex-1"><ErrorBoundary>{children}</ErrorBoundary></div>
          </main>
        </div>
      </div>
    </div>
  );
}
