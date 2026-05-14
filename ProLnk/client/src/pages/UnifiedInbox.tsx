import type React from "react";
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Bell, DollarSign, Zap, AlertTriangle, MessageSquare,
  CheckCircle2, Clock, Search, RefreshCw, Inbox,
  Star, Shield, X, ChevronRight, PenSquare, ArrowLeft,
  Send, Network,
} from "lucide-react";

type MessageType = "lead" | "commission" | "broadcast" | "system" | "dispute" | "achievement" | "review" | "network";

interface InboxItem {
  id: string;
  type: MessageType;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  priority: "high" | "normal" | "low";
}

// A simple thread groups notifications by title prefix / type
interface Thread {
  id: string;
  type: MessageType;
  subject: string;
  preview: string;
  timestamp: Date;
  unreadCount: number;
  messageCount: number;
  items: InboxItem[];
  priority: "high" | "normal" | "low";
}

const TYPE_META: Record<MessageType, { icon: React.ElementType; color: string; bg: string; label: string; border: string }> = {
  lead:         { icon: Zap,            color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)",  label: "Lead" },
  commission:   { icon: DollarSign,     color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.3)",   label: "Commission" },
  broadcast:    { icon: MessageSquare,  color: "#a78bfa", bg: "rgba(167,139,250,0.12)",border: "rgba(167,139,250,0.3)", label: "Broadcast" },
  system:       { icon: Bell,           color: "#9ca3af", bg: "rgba(156,163,175,0.12)",border: "rgba(156,163,175,0.3)", label: "System" },
  dispute:      { icon: AlertTriangle,  color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",   label: "Dispute" },
  achievement:  { icon: Star,           color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)",  label: "Achievement" },
  review:       { icon: Shield,         color: "#0ea5e9", bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.3)",  label: "Review" },
  network:      { icon: Network,        color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)",  label: "Network" },
};

const ALL_TYPES: (MessageType | "all")[] = ["all", "lead", "commission", "network", "broadcast", "system", "dispute", "achievement", "review"];

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function groupIntoThreads(items: InboxItem[]): Thread[] {
  const map = new Map<string, InboxItem[]>();
  for (const item of items) {
    // Group by type + first 40 chars of title as thread key
    const key = `${item.type}::${item.title.slice(0, 40)}`;
    const arr = map.get(key) ?? [];
    arr.push(item);
    map.set(key, arr);
  }
  return Array.from(map.entries()).map(([, msgs]) => {
    const sorted = [...msgs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    const unread = sorted.filter((m) => !m.read).length;
    return {
      id: sorted[0].id,
      type: sorted[0].type,
      subject: sorted[0].title,
      preview: sorted[0].body,
      timestamp: sorted[0].timestamp,
      unreadCount: unread,
      messageCount: sorted.length,
      items: sorted,
      priority: sorted[0].priority,
    } as Thread;
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// ─── Compose Modal ────────────────────────────────────────────────────────────

function ComposeModal({ onClose }: { onClose: () => void }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "#fff",
    padding: "8px 12px",
    fontSize: "13px",
    width: "100%",
    outline: "none",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#0f1e35", border: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <PenSquare size={15} style={{ color: "#F5E642" }} />
            New Message
          </span>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={17} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">To</label>
            <input
              style={inputStyle}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Partner name or email"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Subject</label>
            <input
              style={inputStyle}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message subject"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Message</label>
            <textarea
              style={{ ...inputStyle, height: 120, resize: "vertical" }}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-5 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            Discard
          </button>
          <button
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            style={{ background: "#F5E642", color: "#0A1628" }}
          >
            <Send size={12} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Thread Detail View ───────────────────────────────────────────────────────

function ThreadDetail({ thread, onBack, onMarkRead }: {
  thread: Thread;
  onBack: () => void;
  onMarkRead: (ids: number[]) => void;
}) {
  const cfg = TYPE_META[thread.type];
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="flex items-center gap-3 px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-white truncate">{thread.subject}</span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-xs text-gray-500">{thread.messageCount} message{thread.messageCount !== 1 ? "s" : ""}</p>
        </div>
        {thread.unreadCount > 0 && (
          <button
            onClick={() => onMarkRead(thread.items.filter((i) => !i.read).map((i) => Number(i.id)))}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.2)" }}
          >
            <CheckCircle2 size={12} className="inline mr-1" />
            Mark read
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {thread.items.map((msg) => {
          const isUnread = !msg.read;
          return (
            <div
              key={msg.id}
              className="rounded-xl p-4"
              style={{
                background: isUnread ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isUnread ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: cfg.bg }}
                >
                  <Icon size={14} style={{ color: cfg.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold ${isUnread ? "text-white" : "text-gray-400"}`}>
                      {cfg.label}
                      {isUnread && <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-400 align-middle" />}
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                      <Clock size={10} /> {timeAgo(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{msg.body}</p>
                  {msg.actionUrl && (
                    <Link href={msg.actionUrl}>
                      <span
                        className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                      >
                        {msg.actionLabel ?? "View"} <ChevronRight size={11} />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UnifiedInbox() {
  const [typeFilter, setTypeFilter] = useState<MessageType | "all">("all");
  const [search, setSearch] = useState("");
  const [readFilter, setReadFilter] = useState<"all" | "unread">("all");
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [showCompose, setShowCompose] = useState(false);

  const { data: rawNotifications, isLoading, refetch } = trpc.notifications.getMyNotifications.useQuery({ limit: 100 });
  const markAllReadMut = trpc.notifications.markAllRead.useMutation({ onSuccess: () => refetch() });
  const markReadMut = trpc.notifications.markRead.useMutation({ onSuccess: () => refetch() });

  const rawItems: InboxItem[] = ((rawNotifications ?? []) as any[]).map((n) => {
    let meta: Record<string, string> = {};
    try { meta = JSON.parse(n.metadata ?? "{}"); } catch { /* noop */ }

    const typeMap: Record<string, MessageType> = {
      lead: "lead", commission: "commission", broadcast: "broadcast",
      system: "system", dispute: "dispute", achievement: "achievement",
      review: "review", network: "network",
    };

    return {
      id: String(n.id),
      type: (typeMap[n.type] ?? "system") as MessageType,
      title: n.title,
      body: n.message,
      timestamp: new Date(n.createdAt),
      read: Boolean(n.isRead),
      actionUrl: meta.actionUrl,
      actionLabel: meta.actionLabel,
      priority: (meta.priority ?? "normal") as "high" | "normal" | "low",
    };
  });

  const filteredItems = rawItems.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (readFilter === "unread" && item.read) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.body.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const threads = groupIntoThreads(filteredItems);
  const totalUnread = rawItems.filter((i) => !i.read).length;

  function handleMarkRead(ids: number[]) {
    markReadMut.mutate({ ids });
    if (selectedThread) {
      const updated: Thread = {
        ...selectedThread,
        unreadCount: 0,
        items: selectedThread.items.map((i) => ids.includes(Number(i.id)) ? { ...i, read: true } : i),
      };
      setSelectedThread(updated);
    }
  }

  return (
    <PartnerLayout>
      <div className="flex flex-col h-full min-h-[calc(100vh-64px)]" style={{ background: "#0A1628" }}>
        <div className="flex flex-1 overflow-hidden max-w-5xl mx-auto w-full">

          {/* ── Left panel: thread list ────────────────────────────────── */}
          <div
            className={`flex flex-col w-full md:w-80 flex-shrink-0 ${selectedThread ? "hidden md:flex" : "flex"}`}
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Header */}
            <div className="px-4 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Inbox size={17} style={{ color: "#F5E642" }} />
                  <h1 className="text-base font-bold text-white">Inbox</h1>
                  {totalUnread > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#ef4444", color: "#fff" }}>
                      {totalUnread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {totalUnread > 0 && (
                    <button
                      onClick={() => markAllReadMut.mutate()}
                      className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                      title="Mark all read"
                    >
                      <CheckCircle2 size={15} className="text-gray-400 hover:text-white" />
                    </button>
                  )}
                  <button onClick={() => refetch()} className="p-1.5 rounded-lg transition-colors hover:bg-white/10" title="Refresh">
                    <RefreshCw size={14} className="text-gray-400 hover:text-white" />
                  </button>
                  <button
                    onClick={() => setShowCompose(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{ background: "#F5E642", color: "#0A1628" }}
                  >
                    <PenSquare size={12} /> New
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-3">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs text-white placeholder-gray-500 outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  placeholder="Search messages…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Unread toggle */}
              <button
                onClick={() => setReadFilter((p) => p === "unread" ? "all" : "unread")}
                className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
                style={
                  readFilter === "unread"
                    ? { background: "#F5E642", color: "#0A1628" }
                    : { background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {readFilter === "unread" ? "Showing unread" : "Unread only"}
              </button>
            </div>

            {/* Type filter tabs */}
            <div className="flex gap-1.5 px-3 py-2.5 overflow-x-auto flex-shrink-0 scrollbar-hide"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {ALL_TYPES.map((t) => {
                const count = t === "all"
                  ? rawItems.filter((i) => !i.read).length
                  : rawItems.filter((i) => i.type === t && !i.read).length;
                const active = typeFilter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all"
                    style={active
                      ? { background: "#F5E642", color: "#0A1628" }
                      : { background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    {t === "all" ? "All" : (TYPE_META[t as MessageType]?.label ?? t)}
                    {count > 0 && (
                      <span
                        className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                        style={active ? { background: "#0A1628", color: "#F5E642" } : { background: "#ef4444", color: "#fff" }}
                      >
                        {count > 9 ? "9+" : count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Thread list */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="space-y-1 p-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="rounded-xl p-3 animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 rounded w-3/4" style={{ background: "rgba(255,255,255,0.08)" }} />
                          <div className="h-2.5 rounded w-full" style={{ background: "rgba(255,255,255,0.05)" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : threads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <Inbox size={36} className="mb-3 opacity-20 text-white" />
                  <p className="text-sm font-medium text-gray-400">
                    {rawItems.length === 0 ? "Inbox is empty" : "No messages match your filters"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 max-w-[200px]">
                    {rawItems.length === 0
                      ? "Leads, commissions, and updates will appear here"
                      : "Try adjusting your search or filters"}
                  </p>
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {threads.map((thread) => {
                    const cfg = TYPE_META[thread.type];
                    const Icon = cfg.icon;
                    const isSelected = selectedThread?.id === thread.id;
                    const hasUnread = thread.unreadCount > 0;
                    return (
                      <button
                        key={thread.id}
                        onClick={() => setSelectedThread(thread)}
                        className="w-full text-left rounded-xl p-3 transition-all flex gap-3 group"
                        style={{
                          background: isSelected
                            ? "rgba(245,230,66,0.08)"
                            : hasUnread
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(255,255,255,0.02)",
                          border: isSelected
                            ? "1px solid rgba(245,230,66,0.25)"
                            : hasUnread
                              ? "1px solid rgba(255,255,255,0.1)"
                              : "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {/* Avatar with type icon */}
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: cfg.bg }}
                        >
                          <Icon size={16} style={{ color: cfg.color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1 mb-0.5">
                            <span className={`text-sm font-semibold truncate ${hasUnread ? "text-white" : "text-gray-400"}`}>
                              {thread.subject}
                            </span>
                            <span className="text-[10px] text-gray-500 flex-shrink-0">
                              {timeAgo(thread.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mb-1">{thread.preview}</p>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                              style={{ background: cfg.bg, color: cfg.color }}
                            >
                              {cfg.label}
                            </span>
                            {thread.messageCount > 1 && (
                              <span className="text-[10px] text-gray-600">
                                {thread.messageCount} msgs
                              </span>
                            )}
                            {thread.priority === "high" && (
                              <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-full">
                                Urgent
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Unread dot */}
                        {hasUnread && (
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span
                              className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                              style={{ background: "#ef4444", color: "#fff" }}
                            >
                              {thread.unreadCount > 9 ? "9+" : thread.unreadCount}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer stats */}
            {rawItems.length > 0 && (
              <div className="px-4 py-3 flex gap-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {[
                  { label: "Total", value: rawItems.length, color: "#9ca3af" },
                  { label: "Unread", value: totalUnread, color: "#ef4444" },
                  { label: "Leads", value: rawItems.filter((i) => i.type === "lead").length, color: "#f59e0b" },
                  { label: "Paid", value: rawItems.filter((i) => i.type === "commission").length, color: "#22c55e" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex-1 text-center">
                    <p className="text-sm font-bold" style={{ color }}>{value}</p>
                    <p className="text-[10px] text-gray-600">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right panel: thread detail ─────────────────────────────── */}
          <div className={`flex-1 flex flex-col ${!selectedThread ? "hidden md:flex" : "flex"}`}>
            {selectedThread ? (
              <ThreadDetail
                thread={selectedThread}
                onBack={() => setSelectedThread(null)}
                onMarkRead={handleMarkRead}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(245,230,66,0.08)", border: "1px solid rgba(245,230,66,0.15)" }}
                >
                  <MessageSquare size={28} style={{ color: "#F5E642" }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Select a conversation</h3>
                <p className="text-sm text-gray-400 max-w-xs">
                  Pick a thread from the list to read messages, or compose a new message.
                </p>
                <button
                  onClick={() => setShowCompose(true)}
                  className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: "#F5E642", color: "#0A1628" }}
                >
                  <PenSquare size={14} /> New Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose modal */}
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </PartnerLayout>
  );
}
