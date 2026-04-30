import { useState, useRef, useEffect } from "react";
import { Bell, X, CheckCheck, Megaphone, DollarSign, UserCheck, AlertCircle, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  new_lead: <Zap className="h-4 w-4 text-amber-400" />,
  lead_expired: <AlertCircle className="h-4 w-4 text-red-400" />,
  commission_paid: <DollarSign className="h-4 w-4 text-green-400" />,
  approval: <UserCheck className="h-4 w-4 text-blue-400" />,
  broadcast: <Megaphone className="h-4 w-4 text-purple-400" />,
  system: <Bell className="h-4 w-4 text-slate-400" />,
};

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
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const { data: unreadData } = trpc.notifications.getUnreadCount.useQuery(undefined, {
    refetchInterval: 30_000,
  });
  const { data: notifications = [] } = trpc.notifications.getMyNotifications.useQuery(
    { limit: 15 },
    { enabled: open }
  );
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

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleNotificationClick(n: { id: number; actionUrl?: string | null; isRead: boolean }) {
    if (!n.isRead) {
      markRead.mutate({ ids: [n.id] });
    }
    if (n.actionUrl) {
      navigate(n.actionUrl);
    }
    setOpen(false);
  }

  return (
    <div className="relative" ref={panelRef}>
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
        <div className="absolute left-full ml-2 top-0 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <span className="text-sm font-semibold text-white">Notifications</span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllRead.mutate()}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`w-full text-left px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700/40 transition-colors flex gap-3 ${
                    !n.isRead ? "bg-slate-700/20" : ""
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {TYPE_ICONS[n.type] ?? TYPE_ICONS.system}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium truncate ${!n.isRead ? "text-white" : "text-slate-300"}`}>
                        {n.title}
                      </p>
                      {!n.isRead && (
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{timeAgo(n.createdAt)}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-700 text-center">
              <button
                onClick={() => { navigate("/partner/leads"); setOpen(false); }}
                className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                View all leads 
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
