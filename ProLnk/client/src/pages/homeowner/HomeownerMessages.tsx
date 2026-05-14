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
} from "lucide-react";
import { Link } from "wouter";

const TRADE_ICONS: Record<string, React.ReactNode> = {
  Plumbing: <Droplets className="h-4 w-4 text-blue-400" />,
  Electrical: <Zap className="h-4 w-4 text-yellow-400" />,
  HVAC: <Wind className="h-4 w-4 text-cyan-400" />,
  Landscaping: <Trees className="h-4 w-4 text-green-400" />,
  Painting: <Brush className="h-4 w-4 text-purple-400" />,
};

type MessageType = "quote" | "confirmation" | "checkin" | "message";

interface Message {
  id: string;
  from: "pro" | "me";
  type: MessageType;
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
}

const MOCK_THREADS: Thread[] = [
  {
    id: "t1",
    proName: "Marcus Webb",
    trade: "Plumbing",
    status: "active",
    lastMessage: "I can be there Thursday at 9am. Does that work?",
    lastTime: "2m ago",
    unreadCount: 2,
    phone: "(817) 555-0182",
    messages: [
      { id: "m1", from: "me", type: "quote", text: "Hi Marcus — can you fix the leak under our kitchen sink? It's been dripping for 2 days.", time: "Yesterday 3:12 PM", read: true },
      { id: "m2", from: "pro", type: "message", text: "Absolutely! I've handled hundreds of those. I'll need about 45 minutes. My rate is $120 flat for that job.", time: "Yesterday 4:01 PM", read: true },
      { id: "m3", from: "me", type: "message", text: "That sounds great. What's your earliest availability?", time: "Yesterday 4:05 PM", read: true },
      { id: "m4", from: "pro", type: "message", text: "I can be there Thursday at 9am. Does that work?", time: "2m ago", read: false },
    ],
  },
  {
    id: "t2",
    proName: "Sarah Kim",
    trade: "Electrical",
    status: "pending",
    lastMessage: "Quote sent: $340 for panel inspection + 2 outlet replacements.",
    lastTime: "1h ago",
    unreadCount: 1,
    phone: "(817) 555-0294",
    messages: [
      { id: "m1", from: "me", type: "quote", text: "I need an outlet replaced in the garage and a full panel inspection.", time: "Today 9:00 AM", read: true },
      { id: "m2", from: "pro", type: "quote", text: "Quote sent: $340 for panel inspection + 2 outlet replacements.", time: "1h ago", read: false },
    ],
  },
  {
    id: "t3",
    proName: "DFW Climate Co.",
    trade: "HVAC",
    status: "completed",
    lastMessage: "Job complete! Your system is running great. Let me know if anything comes up.",
    lastTime: "3d ago",
    unreadCount: 0,
    messages: [
      { id: "m1", from: "pro", type: "confirmation", text: "Confirmed for Tuesday May 12 at 11am. Please make sure the filter compartment is accessible.", time: "May 9, 10:15 AM", read: true },
      { id: "m2", from: "pro", type: "checkin", text: "On my way! ETA 15 minutes.", time: "May 12, 10:47 AM", read: true },
      { id: "m3", from: "pro", type: "message", text: "Job complete! Your system is running great. Let me know if anything comes up.", time: "3d ago", read: true },
    ],
  },
];

function MessageBubble({ msg }: { msg: Message }) {
  const isMe = msg.from === "me";

  function typeLabel() {
    if (msg.type === "quote") return { label: "Quote Request", color: "bg-blue-500/20 text-blue-300" };
    if (msg.type === "confirmation") return { label: "Confirmed", color: "bg-emerald-500/20 text-emerald-300" };
    if (msg.type === "checkin") return { label: "Check-in", color: "bg-yellow-500/20 text-yellow-300" };
    return null;
  }

  const tag = typeLabel();

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
          {isMe && <CheckCheck className={`h-3 w-3 ${msg.read ? "text-teal-400" : "text-gray-600"}`} />}
        </div>
      </div>
    </div>
  );
}

function ThreadListItem({ thread, active, onClick }: { thread: Thread; active: boolean; onClick: () => void }) {
  const icon = TRADE_ICONS[thread.trade] ?? <Wrench className="h-4 w-4 text-gray-400" />;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 ${active ? "bg-teal-900/20 border-l-2 border-l-teal-400" : ""}`}
    >
      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-base font-bold text-white">
        {thread.proName[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-semibold text-white text-sm truncate">{thread.proName}</span>
          <span className="text-xs text-gray-500 shrink-0 ml-2">{thread.lastTime}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-0.5">
          {icon}
          <span className="text-xs text-gray-400">{thread.trade}</span>
          <Badge className={`text-xs border-0 ${
            thread.status === "active" ? "bg-emerald-500/20 text-emerald-300"
              : thread.status === "pending" ? "bg-amber-500/20 text-amber-300"
              : "bg-gray-500/20 text-gray-400"
          }`}>
            {thread.status}
          </Badge>
        </div>
        <p className="text-xs text-gray-500 truncate">{thread.lastMessage}</p>
      </div>
      {thread.unreadCount > 0 && (
        <span className="h-5 w-5 rounded-full bg-teal-500 text-black text-xs font-bold flex items-center justify-center shrink-0">
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
  const [localThreads, setLocalThreads] = useState(MOCK_THREADS);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);

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
      }))
    : localThreads;

  const filtered = threads.filter(t =>
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

  const totalUnread = threads.reduce((sum, t) => sum + t.unreadCount, 0);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        {activeThread ? (
          <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0F1E35] border-b border-white/10">
              <button onClick={() => setActiveThreadId(null)} className="text-gray-400 hover:text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-white shrink-0">
                {activeThread.proName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{activeThread.proName}</p>
                <div className="flex items-center gap-1.5">
                  {TRADE_ICONS[activeThread.trade] ?? <Wrench className="h-3 w-3 text-gray-400" />}
                  <span className="text-xs text-gray-400">{activeThread.trade}</span>
                  <Badge className={`text-xs border-0 ${
                    activeThread.status === "active" ? "bg-emerald-500/20 text-emerald-300"
                      : activeThread.status === "pending" ? "bg-amber-500/20 text-amber-300"
                      : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {activeThread.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeThread.phone && (
                  <a href={`tel:${activeThread.phone}`}>
                    <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:text-teal-400 gap-1 h-8">
                      <Phone className="h-3 w-3" /> Call
                    </Button>
                  </a>
                )}
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-white p-1"
                    onClick={() => setShowBlockConfirm(v => !v)}
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {showBlockConfirm && (
                    <div className="absolute right-0 top-8 bg-[#1A2E4A] border border-white/10 rounded-lg shadow-xl z-10 w-44">
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                        onClick={() => { setShowBlockConfirm(false); setActiveThreadId(null); }}
                      >
                        <ShieldOff className="h-4 w-4" /> Block Pro
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {activeThread.messages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-10">No messages yet. Start the conversation below.</div>
              ) : (
                activeThread.messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)
              )}
            </div>

            <div className="px-4 py-3 bg-[#0F1E35] border-t border-white/10 space-y-2">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-gray-300 hover:text-teal-400 text-xs gap-1 shrink-0"
                  onClick={sendQuoteRequest}
                >
                  <FileText className="h-3 w-3" /> Request Quote
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message…"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-teal-400/50 flex-1"
                />
                <Button
                  onClick={sendReply}
                  disabled={!replyText.trim()}
                  className="bg-teal-500 hover:bg-teal-400 text-black shrink-0"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto pb-10">
            <div className="px-4 pt-4 pb-3 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Messages</h1>
                  <p className="text-gray-400 text-sm">Conversations with your service pros</p>
                </div>
                {totalUnread > 0 && (
                  <Badge className="bg-teal-500 text-black font-bold text-sm px-2.5">
                    {totalUnread} unread
                  </Badge>
                )}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by pro name or trade…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-teal-400/50"
                />
              </div>
            </div>

            {isLoading && (
              <div className="py-8 text-center text-gray-500 text-sm">Loading…</div>
            )}

            {!isLoading && filtered.length === 0 && !search && (
              <Card className="mx-4 bg-[#0F1E35] border-white/10">
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-700 mb-3" />
                  <p className="text-gray-400 font-medium">No conversations yet</p>
                  <p className="text-sm text-gray-600 mt-1">Once you hire a pro, messages will appear here.</p>
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

            {!isLoading && filtered.length > 0 && (
              <div className="border-t border-white/5">
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
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
