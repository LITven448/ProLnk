import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Home, Bell, Menu, LogOut, Shield, User, FolderOpen, Sparkles,
  CheckCheck, HeartPulse, Gift, Calculator
} from "lucide-react";

// Brand tokens
const T = {
  bg:      "#F8FAFC",
  sidebar: "#FFFFFF",
  surface: "#FFFFFF",
  border:  "#E2E8F0",
  text:    "#0F172A",
  muted:   "#64748B",
  dim:     "#94A3B8",
  accent:  "#1B4FD8",
  green:   "#10B981",
};

// 7 condensed sidebar categories
const SECTIONS = [
  { id: "home",      icon: Home,       label: "My Home",   href: "/my-home" },
  { id: "vault",     icon: HeartPulse, label: "Vault",     href: "/my-home/vault" },
  { id: "ai",        icon: Sparkles,   label: "AI Tools",  href: "/trustypro/scan" },
  { id: "activity",  icon: FolderOpen, label: "Activity",  href: "/my-home/projects" },
  { id: "finances",  icon: Calculator, label: "Finances",  href: "/my-home/true-cost" },
  { id: "community", icon: Gift,       label: "Community", href: "/my-home/neighborhood-deals" },
  { id: "account",   icon: User,       label: "Account",   href: "/my-home/profile" },
];

// Sub-tabs per section
const SECTION_TABS: Record<string, { label: string; href: string }[]> = {
  home: [
    { label: "Dashboard",          href: "/my-home" },
    { label: "My Property",        href: "/my-home/property" },
    { label: "Trusted Pros",       href: "/my-home/pros" },
    { label: "Saved Pros",          href: "/my-home/favorites" },
    { label: "Offers for Me",      href: "/my-home/offers" },
    { label: "Messages",           href: "/my-home/messages" },
    { label: "Emergency Services", href: "/my-home/emergency" },
  ],
  vault: [
    { label: "Home Health Vault",  href: "/my-home/vault" },
    { label: "Maintenance Plan",   href: "/my-home/maintenance" },
    { label: "Document Vault",     href: "/my-home/document-vault" },
    { label: "Scan History",       href: "/my-home/scan-history" },
    { label: "Home Value Impact",  href: "/my-home/home-value" },
    { label: "Seasonal Prep",      href: "/my-home/seasonal-prep" },
  ],
  ai: [
    { label: "AI Home Scan",       href: "/trustypro/scan" },
    { label: "Before & After",     href: "/my-home/ai-transform" },
    { label: "Room Makeover",      href: "/my-home/room-makeover" },
    { label: "Home Assistant AI",  href: "/my-home/assistant" },
    { label: "Quick Quote",        href: "/my-home/quick-quote" },
  ],
  activity: [
    { label: "My Projects",         href: "/my-home/projects" },
    { label: "Timeline",            href: "/my-home/timeline" },
    { label: "Job Timeline",        href: "/my-home/job-timeline" },
    { label: "Invoices",            href: "/my-home/invoices" },
    { label: "My Reviews",          href: "/my-home/reviews" },
    { label: "Compare Contractors", href: "/my-home/compare-contractors" },
  ],
  finances: [
    { label: "True Cost Guide",     href: "/my-home/true-cost" },
    { label: "Savings Tracker",     href: "/my-home/savings" },
    { label: "Property Comparison", href: "/my-home/property-comparison" },
  ],
  community: [
    { label: "Neighborhood Deals",  href: "/my-home/neighborhood-deals" },
    { label: "Refer a Neighbor",    href: "/my-home/referral" },
  ],
  account: [
    { label: "My Profile",          href: "/my-home/profile" },
    { label: "360\u00b0 Profile",   href: "/my-home/360-profile" },
    { label: "Data & Privacy",      href: "/my-home/privacy" },
    { label: "Notifications",       href: "/my-home/notification-settings" },
  ],
};

function getActiveSection(path: string): string {
  if (path === "/my-home") return "home";
  const homeRoutes = ["/my-home/property","/my-home/pros","/my-home/favorites","/my-home/offers","/my-home/messages","/my-home/emergency"];
  if (homeRoutes.some(p => path.startsWith(p))) return "home";
  const vaultRoutes = ["/my-home/vault","/my-home/maintenance","/my-home/document","/my-home/scan-history","/my-home/home-value","/my-home/seasonal"];
  if (vaultRoutes.some(p => path.startsWith(p))) return "vault";
  const aiRoutes = ["/trustypro/scan","/my-home/ai-transform","/my-home/room-makeover","/my-home/assistant","/my-home/quick-quote"];
  if (aiRoutes.some(p => path.startsWith(p))) return "ai";
  const activityRoutes = ["/my-home/projects","/my-home/timeline","/my-home/job-timeline","/my-home/invoices","/my-home/reviews","/my-home/compare"];
  if (activityRoutes.some(p => path.startsWith(p))) return "activity";
  const financeRoutes = ["/my-home/true-cost","/my-home/savings","/my-home/property-comparison"];
  if (financeRoutes.some(p => path.startsWith(p))) return "finances";
  const communityRoutes = ["/my-home/neighborhood","/my-home/referral","/my-home/homeowner-referral"];
  if (communityRoutes.some(p => path.startsWith(p))) return "community";
  const accountRoutes = ["/my-home/profile","/my-home/360","/my-home/privacy","/my-home/notification"];
  if (accountRoutes.some(p => path.startsWith(p))) return "account";
  return "home";
}

function SubTabBar({ section }: { section: string }) {
  const [location] = useLocation();
  const tabs = SECTION_TABS[section] ?? [];
  if (tabs.length === 0) return null;
  return (
    <div
      className="flex items-center flex-shrink-0"
      style={{
        backgroundColor: T.surface,
        borderBottom: `1px solid ${T.border}`,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      {tabs.map(tab => {
        const isActive = tab.href === "/my-home"
          ? location === "/my-home"
          : location === tab.href || location.startsWith(tab.href + "/");
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

function SidebarContent({
  activeSection, displayName, displayAddress, onNavClick, onLogout,
}: {
  activeSection: string;
  displayName: string;
  displayAddress: string;
  onNavClick?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 flex-shrink-0 px-4" style={{ borderBottom: `1px solid ${T.border}` }}>
        <Link href="/my-home">
          <span className="cursor-pointer"><TrustyProLogo height={26} variant="light" /></span>
        </Link>
      </div>
      {/* Property card */}
      <div className="mx-3 mt-4 mb-3 p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: "#F9FAFB", border: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: T.accent }}>
            {displayName?.[0]?.toUpperCase() ?? "H"}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate leading-tight" style={{ color: T.text }}>{displayName}</p>
            <p className="text-[11px] truncate leading-tight mt-0.5" style={{ color: T.muted }}>{displayAddress}</p>
          </div>
        </div>
      </div>
      {/* Section label */}
      <p className="text-[10px] font-semibold uppercase px-5 mb-1 flex-shrink-0" style={{ color: T.dim, letterSpacing: "0.1em" }}>Navigation</p>
      {/* Nav */}
      <nav className="flex-1 px-3 pb-2 overflow-y-auto">
        <div className="flex flex-col gap-0.5">
          {SECTIONS.map(item => {
            const isActive = item.id === activeSection;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                  style={{
                    backgroundColor: isActive ? T.accent : "transparent",
                    color: isActive ? "#FFFFFF" : T.muted,
                    boxShadow: isActive ? `0 4px 14px ${T.accent}33` : "none",
                  }}
                  onClick={onNavClick}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Logout */}
      <div className="flex-shrink-0 p-3" style={{ borderTop: `1px solid ${T.border}` }}>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all"
          style={{ color: T.muted }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFF5F5"; (e.currentTarget as HTMLButtonElement).style.color = "#EF4444"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = T.muted; }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

interface HomeownerLayoutProps {
  children: React.ReactNode;
  homeownerName?: string;
  homeownerAddress?: string;
}

export default function HomeownerLayout({ children, homeownerName, homeownerAddress }: HomeownerLayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { data: profile } = trpc.homeowner.getProfile.useQuery(undefined, { enabled: isAuthenticated });
  const { data: notifications = [], refetch: refetchNotifs } = trpc.homeowner.getNotifications.useQuery(
    undefined, { enabled: isAuthenticated, refetchInterval: 60000 }
  );
  const markRead = trpc.homeowner.markNotificationRead.useMutation({ onSuccess: () => refetchNotifs() });
  const markAllRead = trpc.homeowner.markAllNotificationsRead.useMutation({ onSuccess: () => refetchNotifs() });
  const unreadCount = (notifications as any[]).filter((n: any) => !n.isRead).length;
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => { logout(); window.location.href = "/trustypro"; },
  });
  const activeSection = getActiveSection(location);

  useEffect(() => { if (!loading && !isAuthenticated) window.location.href = getLoginUrl(); }, [loading, isAuthenticated]);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    if (notifOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [notifOpen]);
  useEffect(() => { setMobileOpen(false); }, [location]);

  const displayName = homeownerName ?? user?.name ?? "Homeowner";
  const displayAddress = homeownerAddress ?? (
    profile?.address ? `${profile.address}${profile.city ? ", " + profile.city : ""}` : "Your Home"
  );
  const handleLogout = () => logoutMutation.mutate();

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: T.bg }}>
        <div className="hidden md:flex flex-col bg-white border-r flex-shrink-0 p-4 gap-4" style={{ width: 200, borderColor: T.border }}>
          <div className="h-8 w-32 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-14 w-full bg-gray-50 rounded-xl animate-pulse" />
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} className="h-9 w-full bg-gray-100 rounded-lg animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
          ))}
        </div>
        <div className="flex-1 p-6 space-y-4 max-w-2xl">
          <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: T.bg }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} onClick={() => setMobileOpen(false)}>
          <aside className="flex flex-col h-full bg-white shadow-2xl" style={{ width: 220 }} onClick={e => e.stopPropagation()}>
            <SidebarContent activeSection={activeSection} displayName={displayName} displayAddress={displayAddress} onNavClick={() => setMobileOpen(false)} onLogout={handleLogout} />
          </aside>
        </div>
      )}
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col flex-shrink-0 bg-white" style={{ width: 200, borderRight: `1px solid ${T.border}`, boxShadow: "2px 0 16px rgba(0,0,0,0.04)" }}>
        <SidebarContent activeSection={activeSection} displayName={displayName} displayAddress={displayAddress} onLogout={handleLogout} />
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-auto flex flex-col min-w-0" style={{ backgroundColor: T.bg }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ backgroundColor: T.surface, borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-3 min-w-0">
            <button className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: T.bg, color: T.text }} onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: T.muted }}>
              <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: T.green }} />
              <span>Every pro is <span className="font-semibold" style={{ color: T.green }}>TrustyPro Verified</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(v => !v)} className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all" style={{ color: T.muted, backgroundColor: T.bg }}>
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: T.accent }}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
                  <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
                    <span className="text-sm font-bold" style={{ color: T.text }}>Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={() => markAllRead.mutate()} className="text-xs font-semibold flex items-center gap-1" style={{ color: T.accent }}>
                        <CheckCheck className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y" style={{ borderColor: T.border }}>
                    {(notifications as any[]).length === 0 ? (
                      <div className="p-6 text-center">
                        <Bell className="w-8 h-8 mx-auto mb-2" style={{ color: T.dim }} />
                        <p className="text-sm" style={{ color: T.muted }}>No notifications yet</p>
                      </div>
                    ) : (
                      (notifications as any[]).map((n: any) => (
                        <div key={n.id} onClick={() => { if (!n.isRead) markRead.mutate({ id: n.id }); if (n.actionUrl) window.location.href = n.actionUrl; setNotifOpen(false); }} className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50" style={{ backgroundColor: !n.isRead ? "#EFF6FF" : undefined }}>
                          <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: !n.isRead ? T.accent : "transparent" }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold leading-tight" style={{ color: T.text }}>{n.title}</p>
                            <p className="text-xs mt-0.5 leading-relaxed line-clamp-2" style={{ color: T.muted }}>{n.message}</p>
                            <p className="text-[10px] mt-1" style={{ color: T.dim }}>
                              {new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 text-center" style={{ borderTop: `1px solid ${T.border}` }}>
                    <button onClick={() => setNotifOpen(false)} className="text-xs" style={{ color: T.dim }}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Sub-tabs */}
        <SubTabBar section={activeSection} />
        {/* Page content */}
        <div className="flex-1 overflow-auto"><ErrorBoundary>{children}</ErrorBoundary></div>
      </main>
    </div>
  );
}
