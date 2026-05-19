import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { T } from "@/components/AdminLayout";
import {
  Home, Users, Camera, Shield, TrendingUp, Star,
  CheckCircle, Clock, AlertTriangle, ArrowRight, BadgeCheck
} from "lucide-react";
import { Link } from "wouter";

export default function TrustyProOverview() {
  const { data: homeownerStats } = trpc.admin.getNetworkStats.useQuery();

  const stats = [
    {
      label: "Registered Homeowners",
      value: homeownerStats?.totalHomeowners ?? 0,
      icon: Users,
      color: "#82D616",
      bg: "linear-gradient(195deg, #66BB6A, #43A047)",
      sub: "Total accounts created",
    },
    {
      label: "Photo Scans Submitted",
      value: "—",
      icon: Camera,
      color: "#17C1E8",
      bg: "linear-gradient(195deg, #49a3f1, #1A73E8)",
      sub: "AI-analyzed home photos",
    },
    {
      label: "Pro Matches Made",
      value: "—",
      icon: Shield,
      color: "#FBB140",
      bg: "linear-gradient(195deg, #FFA726, #FB8C00)",
      sub: "Homeowner → Partner connections",
    },
    {
      label: "Avg. Home Health Score",
      value: "—",
      icon: TrendingUp,
      color: "#7928CA",
      bg: "linear-gradient(195deg, #ab47bc, #8e24aa)",
      sub: "Across all scanned homes",
    },
  ];

  // Activity will be populated from real homeowner events once platform launches
  const recentActivity: { action: string; user: string; time: string; icon: typeof Users; color: string }[] = [];

  const trustyProFeatures = [
    {
      title: "Photo Upload & AI Analysis",
      description: "Homeowners upload photos of their home. AI scans for maintenance needs, aging systems, and improvement opportunities.",
      status: "Live",
      statusColor: "#82D616",
      href: "/admin/trustypro-scans",
    },
    {
      title: "Home Health Score",
      description: "A 0-100 score across roof, HVAC, plumbing, exterior, and landscaping — updated after every scan.",
      status: "Live",
      statusColor: "#82D616",
      href: "/admin/home-health",
    },
    {
      title: "Automated Pro Matching",
      description: "When a homeowner needs work, TrustyPro automatically matches them with the highest-rated available ProLnk partner.",
      status: "Live",
      statusColor: "#82D616",
      href: "/admin/trustypro-leads",
    },
    {
      title: "Homeowner CRM",
      description: "Full homeowner profile management — contact info, property details, scan history, and matched pro records.",
      status: "Live",
      statusColor: "#82D616",
      href: "/admin/homeowners",
    },
    {
      title: "Document Vault",
      description: "Homeowners store warranties, permits, inspection reports, and service records in a secure digital vault.",
      status: "Beta",
      statusColor: "#FBB140",
      href: "/admin/homeowners",
    },
    {
      title: "TrustyPro Commercial",
      description: "Property managers and HOAs manage multiple units, track service history, and dispatch vetted pros at scale.",
      status: "Coming Soon",
      statusColor: "#7B809A",
      href: "/admin/commercial",
    },
  ];

  return (
    <AdminLayout title="TrustyPro Overview" subtitle="Homeowner platform — photo scanning, health tracking, and pro matching">
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(195deg, #66BB6A, #43A047)" }}>
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: T.text }}>TrustyPro Overview</h1>
                <p className="text-sm" style={{ color: T.muted }}>Homeowner platform — photo scanning, health tracking, and pro matching</p>
              </div>
            </div>
          </div>
          <Link href="/trustypro">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(195deg, #66BB6A, #43A047)", color: "white" }}
            >
              View Homeowner Portal <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: T.text }}>{stat.value}</div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: T.text }}>{stat.label}</div>
                <div className="text-xs" style={{ color: T.muted }}>{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Feature Status */}
          <div className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2 mb-5">
              <BadgeCheck className="w-5 h-5" style={{ color: "#82D616" }} />
              <h3 className="font-bold text-base" style={{ color: T.text }}>Platform Features</h3>
            </div>
            <div className="space-y-3">
              {trustyProFeatures.map((feature) => (
                <Link key={feature.title} href={feature.href}>
                  <div
                    className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all hover:opacity-80"
                    style={{ backgroundColor: T.bg }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold" style={{ color: T.text }}>{feature.title}</span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${feature.statusColor}20`, color: feature.statusColor }}
                        >
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{feature.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1" style={{ color: T.dim }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-5 h-5" style={{ color: T.accent }} />
              <h3 className="font-bold text-base" style={{ color: T.text }}>Recent Activity</h3>
              <span className="text-xs ml-auto" style={{ color: T.muted }}>Live feed</span>
            </div>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="w-8 h-8 mb-2" style={{ color: T.dim }} />
                  <p className="text-sm font-medium" style={{ color: T.muted }}>No activity yet</p>
                  <p className="text-xs mt-1" style={{ color: T.dim }}>Live homeowner events will appear here once the platform launches.</p>
                </div>
              ) : recentActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: T.text }}>{item.action}</div>
                      <div className="text-xs" style={{ color: T.muted }}>{item.user}</div>
                    </div>
                    <span className="text-xs shrink-0" style={{ color: T.dim }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: T.border }}>
              <Link href="/admin/homeowners">
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80" style={{ backgroundColor: T.bg, color: T.text }}>
                  View All Homeowners <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
          <h3 className="font-bold text-base mb-4" style={{ color: T.text }}>Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Homeowner CRM", href: "/admin/homeowners", icon: Users, color: "#82D616" },
              { label: "TrustyPro Leads", href: "/admin/trustypro-leads", icon: Shield, color: "#17C1E8" },
              { label: "Photo Scans", href: "/admin/trustypro-scans", icon: Camera, color: "#FBB140" },
              { label: "Home Health Data", href: "/admin/home-health", icon: TrendingUp, color: "#7928CA" },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.label} href={link.href}>
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:opacity-80"
                    style={{ backgroundColor: T.bg }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${link.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: link.color }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: T.text }}>{link.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
