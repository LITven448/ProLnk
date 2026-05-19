import React from 'react';
import { useState, useRef, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Bell, DollarSign, Zap, AlertTriangle, MessageSquare,
  CheckCircle, Clock, Search, RefreshCw, Inbox,
  Star, Shield, X, ChevronRight, PenSquare, ArrowLeft,
  Send, Network, Briefcase, CreditCard, Filter,
} from "lucide-react";

type MessageType = "lead" | "commission" | "broadcast" | "system" | "dispute" | "achievement" | "review" | "network" | "job" | "payment";
type FilterTab = "all" | "leads" | "support" | "system";

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
  sender?: string;
  isMine?: boolean;
}

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
  lead:        { icon: Zap,            color: "#f59e0b", bg: "rgba(245,158,11,0.12)",   border: "rgba(245,158,11,0.3)",   label: "Lead" },
  commission:  { icon: DollarSign,     color: "#22c55e", bg: "rgba(34,197,94,0.12)",    border: "rgba(34,197,94,0.3)",    label: "Commission" },
  broadcast:   { icon: MessageSquare,  color: "#a78bfa", bg: "rgba(167,139,250,0.12)",  border: "rgba(167,139,250,0.3)",  label: "Broadcast" },
  system:      { icon: Bell,           color: "#9ca3af", bg: "rgba(156,163,175,0.12)",  border: "rgba(156,163,175,0.3)",  label: "System" },
  dispute:     { icon: AlertTriangle,  color: "#ef4444", bg: "rgba(239,68,68,0.12)",    border: "rgba(239,68,68,0.3)",    label: "Dispute" },
  achievement: { icon: Star,           color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",   border: "rgba(139,92,246,0.3)",   label: "Achievement" },
  review:      { icon: Shield,         color: "#0ea5e9", bg: "rgba(14,165,233,0.12)",   border: "rgba(14,165,233,0.3)",   label: "Review" },
  network:     { icon: Network,        color: "#3b82f6", bg: "rgba(59,130,246,0.12)",   border: "rgba(59,130,246,0.3)",   label: "Network" },
  job:         { icon: Briefcase,      color: "#10b981", bg: "rgba(16,185,129,0.12)",   border: "rgba(16,185,129,0.3)",   label: "Job" },
  payment:     { icon: CreditCard,     color: "#f472b6", bg: "rgba(244,114,182,0.12)",  border: "rgba(244,114,182,0.3)",  label: "Payment" },
};

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all",     label: "All" },
  { key: "leads",   label: "Leads" },
  { key: "support", label: "Support" },
  { key: "system",  label: "System" },
];

const FILTER_TYPE_MAP: Record<FilterTab, MessageType[]> = {
  all:     [],
  leads:   ["lead"],
  support: ["dispute", "broadcast", "review"],
  system:  ["system", "achievement", "commission", "network", "job", "payment"],
};

const MOCK_THREADS: Thread[] = [
  {
    id: "t1", type: "lead", subject: "New HVAC lead — Austin 78701", priority: "high",
    preview: "Homeowner needs full AC replacement. Est. $2,400–$3,200. 4 pros notified.",
    timestamp: new Date(Date.now() - 8 * 60000), unreadCount: 2, messageCount: 2,
    items: [
      {
        id: "t1m1", type: "lead", title: "New HVAC lead — Austin 78701", sender: "ProLnk AI",
        body: "Homeowner needs full AC replacement. Est. $2,400–$3,200. 4 pros notified. Job window: next 48 hours.",
        timestamp: new Date(Date.now() - 8 * 60000), read: false, priority: "high",
        actionUrl: "/leads", actionLabel: "View Lead",
      },
      {
        id: "t1m2", type: "lead", title: "Lead expiration warning", sender: "ProLnk AI",
        body: "This lead expires in 6 hours. Accept it now to lock in the job and prevent redistribution.",
        timestamp: new Date(Date.now() - 3 * 60000), read: false, priority: "high",
        actionUrl: "/leads", actionLabel: "Accept Lead",
      },
    ],
  },
  {
    id: "t2", type: "job", subject: "Job confirmed — Plumbing repair #1042", priority: "normal",
    preview: "Your job with Maria S. has been confirmed for Thursday, May 15 at 10am.",
    timestamp: new Date(Date.now() - 2 * 3600000), unreadCount: 1, messageCount: 3,
    items: [
      {
        id: "t2m1", type: "job", title: "Job confirmed", sender: "ProLnk",
        body: "Your job with Maria S. has been confirmed for Thursday, May 15 at 10am. Address: 512 Oak St, Austin TX 78702.",
        timestamp: new Date(Date.now() - 2 * 3600000), read: false, priority: "normal",
        actionUrl: "/jobs", actionLabel: "View Job",
      },
      {
        id: "t2m2", type: "job", title: "Pre-job checklist ready", sender: "ProLnk AI",
        body: "We've prepared a pre-job checklist for your appointment. Complete it before arriving to ensure a smooth visit.",
        timestamp: new Date(Date.now() - 1.8 * 3600000), read: true, priority: "normal",
      },
      {
        id: "t2m3", type: "job", title: "Homeowner message", sender: "Maria S.",
        body: "Hi! Looking forward to Thursday. I'll leave the side gate open. Main leak is in the kitchen under the sink.",
        timestamp: new Date(Date.now() - 1 * 3600000), read: true, priority: "normal",
      },
    ],
  },
  {
    id: "t3", type: "payment", subject: "Commission receipt — $147.00", priority: "normal",
    preview: "Your L1 override from Jason K.'s roofing job has been credited.",
    timestamp: new Date(Date.now() - 5 * 3600000), unreadCount: 0, messageCount: 1,
    items: [
      {
        id: "t3m1", type: "payment", title: "Commission receipt — $147.00", sender: "ProLnk Finance",
        body: "Your L1 override from Jason K.'s completed roofing job has been credited. $147.00 added to your pending payout. Next payout: June 1.",
        timestamp: new Date(Date.now() - 5 * 3600000), read: true, priority: "normal",
        actionUrl: "/earnings", actionLabel: "View Earnings",
      },
    ],
  },
  {
    id: "t4", type: "commission", subject: "Tier upgrade earned — Founding Partner", priority: "normal",
    preview: "You've reached Founding Partner tier. Your commission rate is now 25%.",
    timestamp: new Date(Date.now() - 24 * 3600000), unreadCount: 0, messageCount: 1,
    items: [
      {
        id: "t4m1", type: "commission", title: "Tier upgrade — Founding Partner", sender: "ProLnk",
        body: "Congratulations! You've reached Founding Partner tier. Your commission rate is now 25% on direct matches, plus your network override rates increased.",
        timestamp: new Date(Date.now() - 24 * 3600000), read: true, priority: "normal",
        actionUrl: "/dashboard", actionLabel: "View Dashboard",
      },
    ],
  },
  {
    id: "t5", type: "review", subject: "New 5-star review from David H.", priority: "normal",
    preview: "David left you a glowing review for the electrical panel replacement.",
    timestamp: new Date(Date.now() - 2 * 86400000), unreadCount: 0, messageCount: 1,
    items: [
      {
        id: "t5m1", type: "review", title: "New 5-star review from David H.", sender: "ProLnk",
        body: "David left you a 5-star review: \"Marcus was punctual, professional, and explained every step of the panel replacement. Highly recommend!\"",
        timestamp: new Date(Date.now() - 2 * 86400000), read: true, priority: "normal",
        actionUrl: "/profile", actionLabel: "View Profile",
      },
    ],
  },
  {
    id: "t6", type: "broadcast", subject: "ProLnk platform update — May 2026", priority: "low",
    preview: "New features: storm lead queue, referral dashboard 2.0, and commission ledger.",
    timestamp: new Date(Date.now() - 3 * 86400000), unreadCount: 0, messageCount: 1,
    items: [
      {
        id: "t6m1", type: "broadcast", title: "ProLnk platform update — May 2026", sender: "ProLnk Team",
        body: "We've shipped storm lead queue (auto-routes weather-event leads to you in real time), referral dashboard 2.0, and an improved commission ledger. More on the way.",
        timestamp: new Date(Date.now() - 3 * 86400000), read: true, priority: "low",
      },
    ],
  },
];

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

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
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <PenSquare size={15} style={{ color: "#2dd4bf" }} />
            New Message
          </span>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={17} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">To</label>
            <input style={inputStyle} value={to} onChange={(e) => setTo(e.target.value)} placeholder="Partner name or email" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Subject</label>
            <input style={inputStyle} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Message subject" />
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
            style={{ background: "#2dd4bf", color: "#0A1628" }}
          >
            <Send size={12} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ msg, cfg }: { msg: InboxItem; cfg: typeof TYPE_META[MessageType] }) {
  const Icon = cfg.icon;
  const isMine = msg.isMine ?? false;

  return (
    <div className={`flex gap-3 ${isMine ? "flex-row-reverse" : "flex-row"} items-end`}>
      {!isMine && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
          style={{ background: cfg.bg }}>
          <Icon size={12} style={{ color: cfg.color }} />
        </div>
      )}
      <div className={`max-w-[75%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
        {!isMine && msg.sender && (
          <span className="text-[10px] text-gray-500 px-1">{msg.sender}</span>
        )}
        <div
          className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
          style={isMine
            ? { background: "#2dd4bf", color: "#0A1628", borderBottomRightRadius: "4px" }
            : {
                background: msg.read ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.09)",
                color: msg.read ? "#d1d5db" : "#fff",
                border: `1px solid ${msg.read ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.12)"}`,
                borderBottomLeftRadius: "4px",
              }
          }
        >
          {msg.body}
          {msg.actionUrl && !isMine && (
            <Link href={msg.actionUrl}>
              <span
                className="flex items-center gap-1 mt-2 text-xs font-semibold w-fit px-3 py-1.5 rounded-lg"
                style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
              >
                {msg.actionLabel ?? "View"} <ChevronRight size={10} />
              </span>
            </Link>
          )}
        </div>
        <span className="text-[10px] text-gray-600 px-1 flex items-center gap-1">
          {!msg.read && !isMine && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />}
          {formatTime(msg.timestamp)}
        </span>
      </div>
    </div>
  );
}

function ThreadDetail({
  thread, onBack, onMarkRead,
}: {
  thread: Thread;
  onBack: () => void;
  onMarkRead: (ids: number[]) => void;
}) {
  const [reply, setReply] = useState("");
  const [localItems, setLocalItems] = useState<InboxItem[]>(thread.items);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cfg = TYPE_META[thread.type];

  useEffect(() => {
    setLocalItems(thread.items);
  }, [thread.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localItems]);

  const handleSend = () => {
    if (!reply.trim()) return;
    setSending(true);
    const newMsg: InboxItem = {
      id: `reply-${Date.now()}`,
      type: thread.type,
      title: "Your reply",
      body: reply.trim(),
      timestamp: new Date(),
      read: true,
      priority: "normal",
      sender: "You",
      isMine: true,
    };
    setLocalItems((prev) => [...prev, newMsg]);
    setReply("");
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <ArrowLeft size={16} />
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: cfg.bg }}
        >
          {React.createElement(cfg.icon, { size: 14, style: { color: cfg.color } })}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-white truncate">{thread.subject}</span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
            >
              {cfg.label}
            </span>
            {thread.priority === "high" && (
              <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                Urgent
              </span>
            )}
          </div>
          <p className="text-[10px] text-gray-500">
            {localItems.length} message{localItems.length !== 1 ? "s" : ""}
          </p>
        </div>
        {thread.unreadCount > 0 && (
          <button
            onClick={() => onMarkRead(thread.items.filter((i) => !i.read).map((i) => Number(i.id)))}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex-shrink-0"
            style={{ background: "rgba(45,212,191,0.1)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.2)" }}
          >
            <CheckCircle size={12} className="inline mr-1" />
            Mark read
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {localItems.map((msg) => (
          <ChatBubble key={msg.id} msg={msg} cfg={TYPE_META[msg.type] ?? cfg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex-shrink-0 p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div
          className="flex items-end gap-2 rounded-xl px-3 py-2"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <textarea
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none resize-none"
            placeholder="Reply… (Enter to send, Shift+Enter for newline)"
            rows={1}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ maxHeight: 100 }}
          />
          <button
            onClick={handleSend}
            disabled={!reply.trim() || sending}
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              background: reply.trim() ? "#2dd4bf" : "rgba(255,255,255,0.06)",
              color: reply.trim() ? "#0A1628" : "#4b5563",
            }}
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-1.5 px-1">
          Replies are visible to ProLnk support and the relevant homeowner or partner.
        </p>
      </div>
    </div>
  );
}

export default function UnifiedInbox() {
  const [tabFilter, setTabFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [readFilter, setReadFilter] = useState<"all" | "unread">("all");
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [localThreads, setLocalThreads] = useState<Thread[]>(MOCK_THREADS);

  const { data: rawNotifications, isLoading, refetch } = trpc.notifications.getMyNotifications.useQuery({ limit: 100 });
  const markAllReadMut = trpc.notifications.markAllRead.useMutation({ onSuccess: () => refetch() });
  const markReadMut = trpc.notifications.markRead.useMutation({ onSuccess: () => refetch() });

  const serverThreads: Thread[] = (() => {
    const items: InboxItem[] = ((rawNotifications ?? []) as any[]).map((n) => {
      let meta: Record<string, string> = {};
      try { meta = JSON.parse(n.metadata ?? "{}"); } catch { /* noop */ }
      const typeMap: Record<string, MessageType> = {
        lead: "lead", commission: "commission", broadcast: "broadcast",
        system: "system", dispute: "dispute", achievement: "achievement",
        review: "review", network: "network",
      };
      return {
        id: String(n.id), type: (typeMap[n.type] ?? "system") as MessageType,
        title: n.title, body: n.message, timestamp: new Date(n.createdAt),
        read: Boolean(n.isRead), actionUrl: meta.actionUrl, actionLabel: meta.actionLabel,
        priority: (meta.priority ?? "normal") as "high" | "normal" | "low",
      };
    });
    const map = new Map<string, InboxItem[]>();
    for (const item of items) {
      const key = `${item.type}::${item.title.slice(0, 40)}`;
      const arr = map.get(key) ?? [];
      arr.push(item);
      map.set(key, arr);
    }
    return Array.from(map.entries()).map(([, msgs]) => {
      const sorted = [...msgs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      const unread = sorted.filter((m) => !m.read).length;
      return {
        id: sorted[0].id, type: sorted[0].type, subject: sorted[0].title,
        preview: sorted[0].body, timestamp: sorted[0].timestamp,
        unreadCount: unread, messageCount: sorted.length, items: sorted, priority: sorted[0].priority,
      } as Thread;
    });
  })();

  const allThreads = serverThreads.length > 0
    ? [...serverThreads, ...localThreads].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    : localThreads;

  const filteredThreads = allThreads.filter((t) => {
    if (tabFilter !== "all") {
      const allowed = FILTER_TYPE_MAP[tabFilter];
      if (!allowed.includes(t.type)) return false;
    }
    if (readFilter === "unread" && t.unreadCount === 0) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!t.subject.toLowerCase().includes(q) && !t.preview.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const totalUnread = allThreads.reduce((sum, t) => sum + t.unreadCount, 0);

  const tabCounts: Record<FilterTab, number> = {
    all: totalUnread,
    leads: allThreads.filter((t) => FILTER_TYPE_MAP.leads.includes(t.type) && t.unreadCount > 0).reduce((s, t) => s + t.unreadCount, 0),
    support: allThreads.filter((t) => FILTER_TYPE_MAP.support.includes(t.type) && t.unreadCount > 0).reduce((s, t) => s + t.unreadCount, 0),
    system: allThreads.filter((t) => FILTER_TYPE_MAP.system.includes(t.type) && t.unreadCount > 0).reduce((s, t) => s + t.unreadCount, 0),
  };

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
    setLocalThreads((prev) => prev.map((t) => {
      if (t.id !== selectedThread?.id) return t;
      return {
        ...t, unreadCount: 0,
        items: t.items.map((i) => ids.includes(Number(i.id)) ? { ...i, read: true } : i),
      };
    }));
  }

  function handleMarkAllRead() {
    markAllReadMut.mutate();
    setLocalThreads((prev) => prev.map((t) => ({
      ...t, unreadCount: 0, items: t.items.map((i) => ({ ...i, read: true })),
    })));
  }

  return (
    <PartnerLayout>
      <div className="flex flex-col" style={{ background: "#0A1628", minHeight: "calc(100vh - 64px)" }}>
        <div className="flex flex-1 overflow-hidden max-w-5xl mx-auto w-full" style={{ height: "calc(100vh - 64px)" }}>

          {/* Left panel */}
          <div
            className={`flex flex-col flex-shrink-0 ${selectedThread ? "hidden md:flex" : "flex"}`}
            style={{ width: "100%", maxWidth: 340, borderRight: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Inbox size={16} style={{ color: "#2dd4bf" }} />
                  <h1 className="text-sm font-bold text-white">Inbox</h1>
                  {totalUnread > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#ef4444", color: "#fff" }}>
                      {totalUnread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {totalUnread > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="p-1.5 rounded-lg transition-colors hover:bg-white/10 text-gray-400 hover:text-white"
                      title="Mark all read"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                  <button onClick={() => refetch()} className="p-1.5 rounded-lg transition-colors hover:bg-white/10 text-gray-400 hover:text-white" title="Refresh">
                    <RefreshCw size={13} />
                  </button>
                  <button
                    onClick={() => setShowCompose(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{ background: "#2dd4bf", color: "#0A1628" }}
                  >
                    <PenSquare size={11} /> New
                  </button>
                </div>
              </div>

              <div className="relative mb-2.5">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="w-full pl-7 pr-3 py-1.5 rounded-xl text-xs text-white placeholder-gray-500 outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  placeholder="Search messages…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-1.5">
                <Filter size={11} className="text-gray-600 flex-shrink-0" />
                <button
                  onClick={() => setReadFilter((p) => p === "unread" ? "all" : "unread")}
                  className="text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all"
                  style={
                    readFilter === "unread"
                      ? { background: "#2dd4bf", color: "#0A1628" }
                      : { background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {readFilter === "unread" ? "Unread only ✓" : "Unread only"}
                </button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 px-3 py-2 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {FILTER_TABS.map(({ key, label }) => {
                const count = tabCounts[key];
                const active = tabFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setTabFilter(key)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                    style={active
                      ? { background: "#2dd4bf", color: "#0A1628" }
                      : { background: "rgba(255,255,255,0.04)", color: "#9ca3af" }
                    }
                  >
                    {label}
                    {count > 0 && (
                      <span
                        className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                        style={active ? { background: "#0A1628", color: "#2dd4bf" } : { background: "#ef4444", color: "#fff" }}
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
                  {[1, 2, 3, 4].map((i) => (
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
              ) : filteredThreads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <Inbox size={32} className="mb-3 opacity-20 text-white" />
                  <p className="text-sm font-medium text-gray-400">No messages</p>
                  <p className="text-xs text-gray-600 mt-1 max-w-[180px]">
                    {search ? "Try adjusting your search" : "Activity will appear here"}
                  </p>
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {filteredThreads.map((thread) => {
                    const cfg = TYPE_META[thread.type];
                    const Icon = cfg.icon;
                    const isSelected = selectedThread?.id === thread.id;
                    const hasUnread = thread.unreadCount > 0;
                    return (
                      <button
                        key={thread.id}
                        onClick={() => setSelectedThread(thread)}
                        className="w-full text-left rounded-xl p-3 transition-all flex gap-3"
                        style={{
                          background: isSelected
                            ? "rgba(45,212,191,0.08)"
                            : hasUnread
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(255,255,255,0.02)",
                          border: isSelected
                            ? "1px solid rgba(45,212,191,0.25)"
                            : hasUnread
                              ? "1px solid rgba(255,255,255,0.1)"
                              : "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: cfg.bg }}>
                          <Icon size={15} style={{ color: cfg.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1 mb-0.5">
                            <span className={`text-xs font-semibold truncate ${hasUnread ? "text-white" : "text-gray-400"}`}>
                              {thread.subject}
                            </span>
                            <span className="text-[10px] text-gray-500 flex-shrink-0">{timeAgo(thread.timestamp)}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-1 mb-1">{thread.preview}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                              style={{ background: cfg.bg, color: cfg.color }}>
                              {cfg.label}
                            </span>
                            {thread.messageCount > 1 && (
                              <span className="text-[10px] text-gray-600">{thread.messageCount} msgs</span>
                            )}
                            {thread.priority === "high" && (
                              <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-full">Urgent</span>
                            )}
                          </div>
                        </div>
                        {hasUnread && (
                          <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                            style={{ background: "#ef4444", color: "#fff" }}>
                            {thread.unreadCount > 9 ? "9+" : thread.unreadCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {allThreads.length > 0 && (
              <div className="px-4 py-2.5 flex gap-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {[
                  { label: "Total", value: allThreads.length, color: "#9ca3af" },
                  { label: "Unread", value: totalUnread, color: "#ef4444" },
                  { label: "Leads", value: allThreads.filter((t) => t.type === "lead").length, color: "#f59e0b" },
                  { label: "Paid", value: allThreads.filter((t) => t.type === "payment" || t.type === "commission").length, color: "#22c55e" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex-1 text-center">
                    <p className="text-sm font-bold" style={{ color }}>{value}</p>
                    <p className="text-[10px] text-gray-600">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className={`flex-1 flex flex-col overflow-hidden ${!selectedThread ? "hidden md:flex" : "flex"}`}>
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
                  style={{ background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.15)" }}
                >
                  <MessageSquare size={28} style={{ color: "#2dd4bf" }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Select a conversation</h3>
                <p className="text-sm text-gray-400 max-w-xs">
                  Pick a thread from the list to read messages, or compose a new one.
                </p>
                <button
                  onClick={() => setShowCompose(true)}
                  className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: "#2dd4bf", color: "#0A1628" }}
                >
                  <PenSquare size={14} /> New Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </PartnerLayout>
  );
}
