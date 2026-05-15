/**
 * Admin Notification Center — The OS Dashboard
 * Route: /admin/notifications
 *
 * Andrew checks this daily. Shows all Tier 2 (dashboard) notifications.
 * Tier 1 (AI handled) are logged but shown as collapsed history.
 * Tier 3 (email escalations) are shown with email badge.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell, Zap, Mail, Eye, CheckCircle, ChevronDown, ChevronUp,
  Shield, DollarSign, UserCheck, AlertTriangle, BarChart3, Clock,
} from "lucide-react";
import { sql } from "drizzle-orm";

const TIER_CONFIG = {
  ai_handled: { label: "AI Handled", color: "bg-teal-500/10 text-teal-400 border-teal-500/20", icon: <Zap className="w-3 h-3" /> },
  dashboard: { label: "Dashboard", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <Eye className="w-3 h-3" /> },
  email: { label: "Email Sent", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: <Mail className="w-3 h-3" /> },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  storm: <Zap className="w-4 h-4 text-yellow-400" />,
  compliance: <Shield className="w-4 h-4 text-orange-400" />,
  payout: <DollarSign className="w-4 h-4 text-green-400" />,
  partner: <UserCheck className="w-4 h-4 text-blue-400" />,
  error: <AlertTriangle className="w-4 h-4 text-red-400" />,
  analytics: <BarChart3 className="w-4 h-4 text-indigo-400" />,
};

export default function NotificationCenter() {
  const [showAiHandled, setShowAiHandled] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "email">("unread");

  // Fetch notifications from notificationLog table
  const notifications = trpc.admin.getNotifications.useQuery({ filter, limit: 100 });
  const markRead = trpc.admin.markNotificationsRead.useMutation({
    onSuccess: () => notifications.refetch(),
  });

  const dashboardNotifs = (notifications.data ?? []).filter((n: any) => n.tier === "dashboard");
  const emailNotifs = (notifications.data ?? []).filter((n: any) => n.tier === "email");
  const aiNotifs = (notifications.data ?? []).filter((n: any) => n.tier === "ai_handled");
  const unreadCount = (notifications.data ?? []).filter((n: any) => !n.isRead).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-3">
              <Bell className="w-6 h-6 text-teal-400" />
              Notification Center
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </h1>
            <p className="text-gray-400 text-sm mt-1">Your daily admin OS — check this instead of email</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-800 rounded-lg border border-gray-700 p-1">
              {(["unread", "all", "email"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filter === f ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>
                  {f === "unread" ? "Unread" : f === "all" ? "All" : "Escalations"}
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 text-xs" onClick={() => markRead.mutate({ all: true })}>
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Needs Review", value: dashboardNotifs.filter((n: any) => !n.isRead).length, color: "text-blue-400", icon: <Eye className="w-5 h-5" /> },
            { label: "Escalations", value: emailNotifs.length, color: "text-red-400", icon: <Mail className="w-5 h-5" /> },
            { label: "AI Handled Today", value: aiNotifs.filter((n: any) => new Date(n.createdAt) > new Date(Date.now() - 24*60*60*1000)).length, color: "text-teal-400", icon: <Zap className="w-5 h-5" /> },
          ].map((stat, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={stat.color}>{stat.icon}</div>
                <div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-500 text-xs">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Escalations (email tier) */}
        {emailNotifs.length > 0 && (
          <Card className="bg-gray-800 border-red-500/30">
            <CardHeader className="border-b border-gray-700 pb-3">
              <CardTitle className="text-red-400 text-sm font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Escalations — These Emailed You
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {emailNotifs.map((n: any) => (
                <NotifRow key={n.id} notification={n} onRead={() => markRead.mutate({ ids: [n.id] })} />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Dashboard notifications */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700 pb-3">
            <CardTitle className="text-white text-sm font-bold flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              Action Items — Check Daily
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : dashboardNotifs.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">All caught up!</p>
              </div>
            ) : (
              dashboardNotifs.map((n: any) => (
                <NotifRow key={n.id} notification={n} onRead={() => markRead.mutate({ ids: [n.id] })} />
              ))
            )}
          </CardContent>
        </Card>

        {/* AI-handled log (collapsed) */}
        <button
          onClick={() => setShowAiHandled(p => !p)}
          className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
        >
          {showAiHandled ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          AI-Handled Activity Log ({aiNotifs.length} items — no action needed)
        </button>

        {showAiHandled && (
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-0">
              {aiNotifs.slice(0, 20).map((n: any) => (
                <div key={n.id} className="px-4 py-2 flex items-center gap-3 border-b border-gray-700/30 last:border-0">
                  <Zap className="w-3.5 h-3.5 text-teal-500/60 shrink-0" />
                  <span className="text-gray-500 text-xs flex-1 truncate">{n.title}</span>
                  <span className="text-gray-600 text-xs">{new Date(n.createdAt).toLocaleTimeString()}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

function NotifRow({ notification: n, onRead }: { notification: any; onRead: () => void }) {
  const tierConf = TIER_CONFIG[n.tier as keyof typeof TIER_CONFIG] ?? TIER_CONFIG.dashboard;
  return (
    <div className={`px-4 py-3 flex items-start gap-3 border-b border-gray-700 last:border-0 hover:bg-gray-750 transition-all ${!n.isRead ? "bg-gray-700/20" : ""}`}>
      <div className="mt-0.5">
        {CATEGORY_ICONS[n.category] ?? <Bell className="w-4 h-4 text-gray-500" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {!n.isRead && <div className="w-2 h-2 bg-teal-400 rounded-full shrink-0" />}
          <span className="font-semibold text-white text-sm">{n.title}</span>
          <Badge className={`text-xs border ${tierConf.color} ml-auto`}>{tierConf.icon}{tierConf.label}</Badge>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{n.content}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-gray-600 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(n.createdAt).toLocaleString()}
          </span>
          {!n.isRead && (
            <button onClick={onRead} className="text-gray-500 text-xs hover:text-gray-300">Mark read</button>
          )}
        </div>
      </div>
    </div>
  );
}
