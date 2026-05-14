import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Bell, X, CheckCheck, Megaphone, DollarSign, UserCheck,
  AlertCircle, Zap, Network, Info, Lightbulb, Check,
  Clock, ArrowRight,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

type NotifRecord = {
  id: number;
  type: string;
  title: string;
  message: string;
  createdAt: string | Date | null;
  isRead: boolean;
  actionUrl?: string | null;
};

const TYPE_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  new_lead:         { icon: <Zap className="h-4 w-4" />,         color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  lead_expired:     { icon: <AlertCircle className="h-4 w-4" />, color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  commission_paid:  { icon: <DollarSign className="h-4 w-4" />,  color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  commission:       { icon: <DollarSign className="h-4 w-4" />,  color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  approval:         { icon: <UserCheck className="h-4 w-4" />,   color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  broadcast:        { icon: <Megaphone className="h-4 w-4" />,   color: "#a78bfa", bg: "rgba(167,139,250,0.15)" },
  network:          { icon: <Network className="h-4 w-4" />,     color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  tips:             { icon: <Lightbulb className="h-4 w-4" />,   color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  system:           { icon: <Info className="h-4 w-4" />,        color: "#9ca3af", bg: "rgba(156,163,175,0.15)" },
};

function getTypeMeta(type: string) {
  return TYPE_META[type] ?? TYPE_META.system;
}

function timeAgo(date: Date | string | null) {
  if (!date) return "";
  const d = new Date(date);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  const { data: unreadData } = trpc.notifications.getUnreadCount.useQuery(undefined, {
    refetchInterval: 30_000,
  });
  const { data: rawNotifications = [] } = trpc.notifications.getMyNotifications.useQuery(
    { limit: 5 },
    { enabled: open }
  );
  const notifications = rawNotifications as NotifRecord[];

  const markAllRead = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => {
      utils.notifications.getUnreadCount.invalidate();
      utils.notifications.getMyNotifications.invalidate();
    },
  });
  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess: () => {
      utils.notifications.getUnreadCount.invalidate();
      utils.notifications.getMyNotifications.invalidate();
    },
  });

  const unreadCount = unreadData?.count ?? 0;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleMarkOne(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    markRead.mutate({ ids: [id] });
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg hover:bg-slate-700/60 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-full ml-2 top-0 w-80 rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{ background: "#0f1e35", border: "1px solid rgba(255,255,255,0.1)" }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllRead.mutate()}
                  title="Mark all read"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  All read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notification list — last 5 */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-20 text-white" />
                <p className="text-sm text-slate-500">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => {
                const meta = getTypeMeta(n.type);
                return (
                  <div
                    key={n.id}
                    className="group relative flex gap-3 px-4 py-3 transition-colors hover:bg-white/5"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: !n.isRead ? "rgba(245,158,11,0.04)" : "transparent",
                    }}
                  >
                    {/* Type icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      {meta.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <p className={`text-sm font-medium truncate ${!n.isRead ? "text-white" : "text-slate-400"}`}>
                          {n.title}
                          {!n.isRead && (
                            <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-400 align-middle" />
                          )}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{n.message}</p>
                      <div className="flex items-center justify-between mt-1.5 gap-2">
                        <span className="text-[10px] text-slate-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {timeAgo(n.createdAt)}
                        </span>
                        {n.actionUrl && (
                          <Link href={n.actionUrl}>
                            <span
                              className="text-[10px] font-semibold flex items-center gap-0.5 transition-colors hover:opacity-80"
                              style={{ color: meta.color }}
                              onClick={() => setOpen(false)}
                            >
                              View <ArrowRight className="h-2.5 w-2.5" />
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Per-item mark as read */}
                    {!n.isRead && (
                      <button
                        onClick={(e) => handleMarkOne(e, n.id)}
                        title="Mark as read"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10"
                      >
                        <Check className="h-3 w-3 text-amber-400" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <Link href="/dashboard/notifications">
              <span
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                onClick={() => setOpen(false)}
              >
                View all notifications <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
            <Link href="/dashboard/inbox">
              <span
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                onClick={() => setOpen(false)}
              >
                Inbox
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
