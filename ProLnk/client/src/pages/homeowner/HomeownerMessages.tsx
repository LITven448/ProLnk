import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
  MessageSquare,
  Phone,
  Send,
  Search,
  ChevronLeft,
  ChevronDown,
  MoreVertical,
  FileText,
  CheckCheck,
  Clock,
  AlertCircle,
  ShieldOff,
  Wrench,
  Zap,
  Droplets,
  Wind,
  Trees,
  Brush,
  Share2,
} from "lucide-react";
import { Link } from "wouter";

const TRADE_ICONS = {
  Plumbing: <Droplets className="h-4 w-4 text-blue-400″ />,
  Electrical: <Zap className="h-4 w-4 text-yellow-400″ />,
  HVAC: <Wind className="h-4 w-4 text-cyan-400″ />,
  Landscaping: <Trees className="h-4 w-4 text-green-400″ />,
  Painting: <Brush className="h-4 w-4 text-purple-400″ />,
};

const QUICK_REPLIES = ["Sounds good!", "What time works?", "Can you send a quote?"];

const CATEGORY_TABS = [
  { key: "all",          label: "All" },
  { key: "pros",         label: "Pros" },
  { key: "prolnk",      label: "ProLnk Team" },
  { key: "alerts",       label: "Service Alerts" },
];

const ARCHIVED_COUNT = 12;

interface Message {
  id: string;
  from: "pro" | "me" | "system";
  type: "quote" | "confirmation" | "checkin" | "message" | "alert";
  text: string;
  time: string;
  read: boolean;
}

interface Thread {
  id: string;
  proName: string;
  trade: string;
  status: "active" | "pending" | "completed";
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: Message[];
  phone?: string;
  category: "pros" | "prolnk" | "alerts";
}

const SERVICE_ALERT_THREADS: Thread[] = [
  {
    id: "alert1″,
    proName: "ProLnk Storm Alert",
    trade: "Service Alerts",
    status: "active",
    lastMessage: "Severe weather detected in your area — check your roof and gutters.",
    lastTime: "1h ago",
    unreadCount: 1,
    category: "alerts",
    messages: [
      {
        id: "sa1″,
        from: "system",
        type: "alert",
        text: "⚡ Severe storm system detected in Frisco, TX area. We recommend inspecting your roof, gutters, and downspouts for damage. Would you like us to connect you with a verified roof inspector?",
        time: "1h ago",
        read: false,
      },
    ],
  },
  {
    id: "alert2″,
    proName: "ProLnk HVAC Reminder",
    trade: "Service Alerts",
    status: "active",
    lastMessage: "Your HVAC filter is due for replacement — summer heat is coming.",
    lastTime: "2d ago",
    unreadCount: 0,
    category: "alerts",
    messages: [
      {
        id: "sa2″,
        from: "system",
        type: "alert",
        text: "🌡️ Seasonal reminder: Based on your last HVAC service on Mar 12, your air filter is likely due for replacement. Running dirty filters this summer can increase energy costs 15–20%. Tap below to book a quick filter swap.",
        time: "2d ago",
        read: true,
      },
    ],
  },
];

const MOCK_THREADS: Thread[] = [
  {
    id: "t1″,
    proName: "Marcus Webb",
    trade: "Plumbing",
    status: "active",
    lastMessage: "I can be there Thursday at 9am. Does that work?",
    lastTime: "2m ago",
    unreadCount: 2,
    phone: "(817) 555-0182″,
    category: "pros",
    messages: [
      { id: "m1″, from: "me", type: "quote", text: "Hi Marcus — can you fix the leak under our kitchen sink? It's been dripping for 2 days.", time: "Yesterday 3:12 PM", read: true },
      { id: "m2″, from: "pro", type: "message", text: "Absolutely! I've handled hundreds of those. I’ll need about 45 minutes. My rate is $120 flat for that job.", time: "Yesterday 4:01 PM", read: true },
      { id: "m3″, from: "me", type: "message", text: "That sounds great. What's your earliest availability?", time: "Yesterday 4:05 PM", read: true },
      { id: "m4″, from: "pro", type: "message", text: "I can be there Thursday at 9am. Does that work?", time: "2m ago", read: false },
    ],
  },
  {
    id: "t2″,
    proName: "Sarah Kim",
    trade: "Electrical",
    status: "pending",
    lastMessage: "Quote sent: $340 for panel inspection + 2 outlet replacements.",
    lastTime: "1h ago",
    unreadCount: 1,
    phone: "(817) 555-0294″,
    category: "pros",
    messages: [
      { id: "m1″, from: "me", type: "quote", text: "I need an outlet replaced in the garage and a full panel inspection.", time: "Today 9:00 AM", read: true },
      { id: "m2″, from: "pro", type: "quote", text: "Quote sent: $340 for panel inspection + 2 outlet replacements.", time: "1h ago", read: false },
    ],
  },
  {
    id: "t3″,
    proName: "DFW Climate Co.",
    trade: "HVAC",
    status: "completed",
    lastMessage: "Job complete! Your system is running great. Let me know if anything comes up.",
    lastTime: "3d ago",
    unreadCount: 0,
    category: "pros",
    messages: [
      { id: "m1″, from: "pro", type: "confirmation", text: "Confirmed for Tuesday May 12 at 11am. Please make sure the filter compartment is accessible.", time: "May 9, 10:15 AM", read: true },
      { id: "m2″, from: "pro", type: "checkin", text: "On my way! ETA 15 minutes.", time: "May 12, 10:47 AM", read: true },
      { id: "m3″, from: "pro", type: "message", text: "Job complete! Your system is running great. Let me know if anything comes up.", time: "3d ago", read: true },
    ],
  },
];

const ALL_BASE_THREADS: Thread[] = [...MOCK_THREADS, ...SERVICE_ALERT_THREADS];

function MessageBubble({ msg }: { msg: Message }) {
  const isMe = msg.from === "me";
  const isSystem = msg.from === "system";

  function typeLabel() {
    if (msg.type === "quote") return { label: "Quote Request", color: "bg-blue-500/20 text-blue-300″ };
    if (msg.type === "confirmation") return { label: "Confirmed", color: "bg-emerald-500/20 text-emerald-300″ };
    if (msg.type === "checkin") return { label: "Check-in", color: "bg-yellow-500/20 text-yellow-300″ };
    if (msg.type === "alert") return { label: "Service Alert", color: "bg-amber-500/20 text-amber-300″ };
    return null;
  }

  const tag = typeLabel();

  if (isSystem) {
    return (
      <div className="mb-3″>
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-2xl px-4 py-3″>
          {tag && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tag.color} inline-block mb-2`}>
              {tag.label}
            </span>
          )}
          <p className="text-sm text-amber-100 leading-relaxed">{msg.text}</p>
          <p className="text-xs text-amber-400/60 mt-1.5″>{msg.time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[80%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
        {tag && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tag.color} ${isMe ? "self-end" : "self-start"}`}>
            {tag.label}
          </span>
        )}
        <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
          isMe
            ? "bg-teal-500 text-black rounded-tr-sm"
            : "bg-white/10 text-gray-200 rounded-tl-sm"
        }`}>
          {msg.text}
        </div>
        <div className={`flex items-center gap-1 text-xs text-gray-600 ${isMe ? "flex-row-reverse" : ""}`}>
          <span>{msg.time}</span>
          {isMe && (
            <>
              <CheckCheck className={`h-3 w-3 ${msg.read ? "text-teal-400" : "text-gray-600"}`} />
              {msg.read && <span className="text-teal-400/70 text-[10px]">Seen</span>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ThreadListItem({ thread, active, onClick }: { thread: Thread; active: boolean; onClick: () => void }) {
  const icon = (TRADE_ICONS as any)[thread.trade] ?? <Wrench className="h-4 w-4 text-gray-400″ />;
  const isAlert = thread.category === "alerts";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 ${active ? "bg-teal-900/20 border-l-2 border-l-teal-400" : ""} ${isAlert ? "bg-amber-900/10" : ""}`}
    >
      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 text-base font-bold text-white ${isAlert ? "bg-amber-500/20" : "bg-white/10"}`}>
        {isAlert ? <AlertCircle className="h-5 w-5 text-amber-400″ /> : thread.proName[0]}
      </div>
      <div className="flex-1 min-w-0″>
        <div className="flex items-center justify-between mb-0.5″>
          <span className="font-semibold text-white text-sm truncate">{thread.proName}</span>
          <span className="text-xs text-gray-500 shrink-0 ml-2″>{thread.lastTime}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-0.5″>
          {icon}
          <span className="text-xs text-gray-400″>{thread.trade}</span>
          {!isAlert && (
            <Badge className={`text-xs border-0 ${
              thread.status === "active" ? "bg-emerald-500/20 text-emerald-300″
                : thread.status === "pending" ? "bg-amber-500/20 text-amber-300″
                : "bg-gray-500/20 text-gray-400″
            }`}>
              {thread.status}
            </Badge>
          )}
        </div>
        <p className={`text-xs truncate ${isAlert ? "text-amber-300/70" : "text-gray-500"}`}>{thread.lastMessage}</p>
      </div>
      {thread.unreadCount > 0 && (
        <span className={`h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${isAlert ? "bg-amber-400 text-black" : "bg-teal-500 text-black"}`}>
          {thread.unreadCount}
        </span>
      )}
    </button>
  );
}

export default function HomeownerMessages() {
  const { data: apiDeals, isLoading } = trpc.homeowner.getMyDeals.useQuery(undefined, {
    retry: false,
    onError: () => {},
  } as any);

  const [search, setSearch] = useState("");
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [localThreads, setLocalThreads] = useState(ALL_BASE_THREADS);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [archivedOpen, setArchivedOpen] = useState(false);

  const threads: Thread[] = (apiDeals && (apiDeals as any).length > 0)
    ? (apiDeals as any).map((d: any) => ({
        id: d.id,
        proName: d.partnerName ?? "Your Pro",
        trade: d.serviceType ?? "Service",
        status: d.status,
        lastMessage: "Tap to view conversation",
        lastTime: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "",
        unreadCount: 0,
        messages: [],
        phone: d.partnerPhone,
        category: "pros" as const,
      }))
    : localThreads;

  const totalUnread = threads.reduce((sum, t) => sum + t.unreadCount, 0);

  const categoryThreads = threads.filter(t => {
    if (activeCategory === "all") return true;
    return t.category === activeCategory;
  });

  const categoryCounts = {
    all: threads.length,
    pros: threads.filter(t => t.category === "pros").length,
    prolnk: threads.filter(t => t.category === "prolnk").length,
    alerts: threads.filter(t => t.category === "alerts").length,
  };

  const filtered = categoryThreads.filter(t =>
    !search ||
    t.proName.toLowerCase().includes(search.toLowerCase()) ||
    t.trade.toLowerCase().includes(search.toLowerCase())
  );

  const activeThread = threads.find(t => t.id === activeThreadId);

  function sendReply() {
    if (!replyText.trim() || !activeThreadId) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      from: "me",
      type: "message",
      text: replyText.trim(),
      time: "Just now",
      read: false,
    };
    setLocalThreads(prev => prev.map(t =>
      t.id === activeThreadId
        ? { ...t, messages: [...t.messages, msg], lastMessage: replyText.trim(), lastTime: "Just now" }
        : t
    ));
    setReplyText("");
  }

  function sendQuickReply(text: string) {
    if (!activeThreadId) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      from: "me",
      type: "message",
      text,
      time: "Just now",
      read: false,
    };
    setLocalThreads(prev => prev.map(t =>
      t.id === activeThreadId
        ? { ...t, messages: [...t.messages, msg], lastMessage: text, lastTime: "Just now" }
        : t
    ));
  }

  function sendQuoteRequest() {
    if (!activeThreadId) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      from: "me",
      type: "quote",
      text: "Hi! I'd like to request a quote for a new job. Can you provide pricing and availability?",
      time: "Just now",
      read: false,
    };
    setLocalThreads(prev => prev.map(t =>
      t.id === activeThreadId
        ? { ...t, messages: [...t.messages, msg], lastMessage: msg.text, lastTime: "Just now" }
        : t
    ));
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        {activeThread ? (
          <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0F1E35] border-b border-white/10″>
              <button onClick={() => setActiveThreadId(null)} className="text-gray-400 hover:text-white">
                <ChevronLeft className="h-5 w-5″ />
              </button>
              <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${activeThread.category === "alerts" ? "bg-amber-500/20" : "bg-white/10"}`}>
                {activeThread.category === "alerts"
                  ? <AlertCircle className="h-5 w-5 text-amber-400″ />
                  : activeThread.proName[0]
                }
              </div>
              <div className="flex-1 min-w-0″>
                <p className="font-semibold text-white text-sm">{activeThread.proName}</p>
                <div className="flex items-center gap-1.5″>
                  {(TRADE_ICONS as any)[activeThread.trade] ?? <Wrench className="h-3 w-3 text-gray-400″ />}
                  <span className="text-xs text-gray-400″>{activeThread.trade}</span>
                  {activeThread.category !== "alerts" && (
                    <Badge className={`text-xs border-0 ${
                      activeThread.status === "active" ? "bg-emerald-500/20 text-emerald-300″
                        : activeThread.status === "pending" ? "bg-amber-500/20 text-amber-300″
                        : "bg-gray-500/20 text-gray-400″
                    }`}>
                      {activeThread.status}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2″>
                {activeThread.phone && (
                  <a href={`tel:${activeThread.phone}`}>
                    <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:text-teal-400 gap-1 h-8″>
                      <Phone className="h-3 w-3″ /> Call
                    </Button>
                  </a>
                )}
                {activeThread.category !== "alerts" && (
                  <div className="relative">
                    <button
                      className="text-gray-400 hover:text-white p-1″
                      onClick={() => setShowBlockConfirm(v => !v)}
                    >
                      <MoreVertical className="h-5 w-5″ />
                    </button>
                    {showBlockConfirm && (
                      <div className="absolute right-0 top-8 bg-[#1A2E4A] border border-white/10 rounded-lg shadow-xl z-10 w-44″>
                        <button
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                          onClick={() => { setShowBlockConfirm(false); setActiveThreadId(null); }}
                        >
                          <ShieldOff className="h-4 w-4″ /> Block Pro
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4″>
              {activeThread.messages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-10″>No messages yet. Start the conversation below.</div>
              ) : (
                activeThread.messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)
              )}
            </div>

            <div className="px-4 py-3 bg-[#0F1E35] border-t border-white/10 space-y-2″>
              {activeThread.category !== "alerts" && (
                <>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-gray-300 hover:text-teal-400 text-xs gap-1 shrink-0″
                      onClick={sendQuoteRequest}
                    >
                      <FileText className="h-3 w-3″ /> Request Quote
                    </Button>
                    {QUICK_REPLIES.map(qr => (
                      <button
                        key={qr}
                        onClick={() => sendQuickReply(qr)}
                        className="px-3 py-1 rounded-full border border-teal-400/30 text-teal-300 text-xs hover:bg-teal-500/10 transition-colors shrink-0″
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2″>
                    <Input
                      placeholder="Type a message…"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-teal-400/50 flex-1″
                    />
                    <Button
                      onClick={sendReply}
                      disabled={!replyText.trim()}
                      className="bg-teal-500 hover:bg-teal-400 text-black shrink-0″
                      size="sm"
                    >
                      <Send className="h-4 w-4″ />
                    </Button>
                  </div>
                </>
              )}
              {activeThread.category === "alerts" && (
                <div className="flex gap-2″>
                  <Input
                    placeholder="Reply to ProLnk…"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-400/50 flex-1″
                  />
                  <Button
                    onClick={sendReply}
                    disabled={!replyText.trim()}
                    className="bg-amber-500 hover:bg-amber-400 text-black shrink-0″
                    size="sm"
                  >
                    <Send className="h-4 w-4″ />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto pb-10″>
            <div className="px-4 pt-4 pb-3 space-y-4″>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
                    Messages
                    {totalUnread > 0 && (
                      <span className="h-6 px-2 rounded-full bg-teal-500 text-black text-xs font-bold flex items-center">
                        {totalUnread} unread
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-400 text-sm">Conversations with your service pros</p>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500″ />
                <Input
                  placeholder="Search by pro name or trade…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-teal-400/50″
                />
              </div>

              {/* Category tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
                {CATEGORY_TABS.map(tab => {
                  const count = (categoryCounts as any)[tab.key] ?? 0;
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveCategory(tab.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-teal-500 text-black"
                          : "bg-white/5 text-gray-400 hover:bg-white/10″
                      }`}
                    >
                      {tab.label}
                      {count > 0 && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-black/20 text-black" : "bg-white/10 text-gray-300"}`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {isLoading && (
              <div className="py-8 text-center text-gray-500 text-sm">Loading…</div>
            )}

            {!isLoading && filtered.length === 0 && !search && activeCategory === "all" && (
              <Card className="mx-4 bg-[#0F1E35] border-white/10″>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-700 mb-3″ />
                  <p className="text-gray-400 font-medium">No conversations yet</p>
                  <p className="text-sm text-gray-600 mt-1″>Once you hire a pro, messages will appear here.</p>
                  <Link href="/my-home/request-pro">
                    <Button className="mt-4 bg-teal-500 hover:bg-teal-400 text-black">Find a Pro</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {!isLoading && filtered.length === 0 && search && (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No conversations matching "{search}"
              </div>
            )}

            {!isLoading && filtered.length === 0 && !search && activeCategory !== "all" && (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No {CATEGORY_TABS.find(t => t.key === activeCategory)?.label ?? activeCategory} messages yet.
              </div>
            )}

            {!isLoading && filtered.length > 0 && (
              <div className="border-t border-white/5″>
                {filtered.map(t => (
                  <ThreadListItem
                    key={t.id}
                    thread={t}
                    active={activeThreadId === t.id}
                    onClick={() => setActiveThreadId(t.id)}
                  />
                ))}
              </div>
            )}

            {/* Archived section */}
            {!isLoading && activeCategory === "all" && !search && (
              <div className="mx-4 mt-4″>
                <button
                  onClick={() => setArchivedOpen(v => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-gray-400 hover:bg-white/8 transition-colors text-sm font-medium"
                >
                  <span>Archived ({ARCHIVED_COUNT})</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${archivedOpen ? "rotate-180" : ""}`} />
                </button>
                {archivedOpen && (
                  <div className="mt-2 border border-white/5 rounded-xl overflow-hidden">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="px-4 py-3 border-b border-white/5 last:border-b-0 flex items-center gap-3 opacity-50″>
                        <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white shrink-0″>
                          {["J", "A", "R"][i]}
                        </div>
                        <div className="flex-1 min-w-0″>
                          <p className="text-sm font-medium text-white truncate">{["Joe's Roofing", "AllState Plumbing", "RightFit HVAC"][i]}</p>
                          <p className="text-xs text-gray-500 truncate">{["Roof repair completed.", "Pipe replacement — closed.", "Annual tune-up — done."][i]}</p>
                        </div>
                        <span className="text-xs text-gray-600″>
                          {["Feb 2025″, "Jan 2025", "Dec 2024"][i]}
                        </span>
                      </div>
                    ))}
                    <div className="px-4 py-2 text-center text-xs text-gray-600″>
                      + {ARCHIVED_COUNT - 3} more archived conversations
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
