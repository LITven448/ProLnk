import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  MessageSquare, Mail, Smartphone, Send, Clock, Users, Edit2,
  X, ChevronDown, Inbox, FileText, Zap, BarChart2, CheckCircle,
  AlertCircle, User, Reply,
} from "lucide-react";
import { toast } from "sonner";

type Channel = "email" | "sms" | "both";
type RecipientGroup = "individual" | "tier" | "trade" | "all";

interface ScheduledMessage {
  id: string;
  date: string;
  time: string;
  recipientCount: number;
  subject: string;
  channel: Channel;
  group: string;
}

interface SentMessage {
  id: string;
  date: string;
  type: Channel;
  recipients: number;
  subject: string;
  openRate?: number;
  deliveryRate: number;
}

interface InboxReply {
  id: string;
  partnerName: string;
  tier: string;
  preview: string;
  time: string;
  unread: boolean;
}

const TEMPLATES = [
  "Welcome new partner",
  "Tier upgrade congrats",
  "Inactive re-engagement",
  "Storm opportunity alert",
  "Monthly performance recap",
  "Payment confirmation",
];

const TEMPLATE_BODIES: Record<string, string> = {
  "Welcome new partner": "Welcome to ProLnk! You're officially part of the network. Your partner dashboard is ready — start exploring leads in your area today.",
  "Tier upgrade congrats": "Congratulations! You've earned a tier upgrade. Your new commission rate is now active. Keep up the great work!",
  "Inactive re-engagement": "We've noticed you haven't logged in recently. There are new leads in your service area — don't miss out!",
  "Storm opportunity alert": "Storm alert: High-demand window opens in your area. Check your lead feed now — homeowners are requesting services.",
  "Monthly performance recap": "Your monthly performance summary is ready. Review your earnings, job count, and network stats in your dashboard.",
  "Payment confirmation": "Your payment has been processed and is on its way. Check your payout history for details.",
};

const SCHEDULED: ScheduledMessage[] = [
  {
    id: "s1",
    date: "May 16",
    time: "9:00 AM",
    recipientCount: 147,
    subject: "Monthly performance recap — April",
    channel: "email",
    group: "All Active",
  },
  {
    id: "s2",
    date: "May 17",
    time: "10:30 AM",
    recipientCount: 25,
    subject: "Charter member exclusive: new lead territory opening",
    channel: "both",
    group: "Charter Members",
  },
  {
    id: "s3",
    date: "May 20",
    time: "2:00 PM",
    recipientCount: 12,
    subject: "We haven't seen you lately — come back",
    channel: "sms",
    group: "At-Risk Partners",
  },
];

const HISTORY: SentMessage[] = [
  { id: "h1", date: "May 12", type: "email", recipients: 147, subject: "Storm opportunity — DFW tornado watch", openRate: 68, deliveryRate: 99 },
  { id: "h2", date: "May 10", type: "sms", recipients: 25, subject: "Charter Q1 bonus processed", openRate: undefined, deliveryRate: 98 },
  { id: "h3", date: "May 8", type: "email", recipients: 10, subject: "Top performer spotlight — April", openRate: 82, deliveryRate: 100 },
  { id: "h4", date: "May 5", type: "both", recipients: 12, subject: "Inactive re-engagement — action needed", openRate: 41, deliveryRate: 97 },
  { id: "h5", date: "May 1", type: "email", recipients: 147, subject: "April earnings summaries ready", openRate: 74, deliveryRate: 99 },
  { id: "h6", date: "Apr 28", type: "sms", recipients: 147, subject: "ProLnk platform update — new features live", openRate: undefined, deliveryRate: 98 },
  { id: "h7", date: "Apr 25", type: "email", recipients: 3, subject: "Tier upgrade congratulations", openRate: 100, deliveryRate: 100 },
  { id: "h8", date: "Apr 22", type: "email", recipients: 25, subject: "Charter member Q1 review", openRate: 76, deliveryRate: 99 },
  { id: "h9", date: "Apr 18", type: "sms", recipients: 12, subject: "Reminder: update your service area", openRate: undefined, deliveryRate: 96 },
  { id: "h10", date: "Apr 15", type: "email", recipients: 147, subject: "March performance report", openRate: 71, deliveryRate: 99 },
];

const INBOX_REPLIES: InboxReply[] = [
  { id: "r1", partnerName: "James Whitfield", tier: "Charter", preview: "Thanks for the update! Quick question about the new territory mapping...", time: "2h ago", unread: true },
  { id: "r2", partnerName: "Maria Torres", tier: "Founding", preview: "Got it. Will the bonus show up in my dashboard right away or is there a delay?", time: "5h ago", unread: true },
  { id: "r3", partnerName: "Derek Chen", tier: "Charter", preview: "Love the new storm alert feature. Already picked up 3 jobs from it.", time: "1d ago", unread: false },
  { id: "r4", partnerName: "Sandra Phillips", tier: "L3", preview: "Can I change my notification preferences from the app or only the dashboard?", time: "2d ago", unread: false },
  { id: "r5", partnerName: "Tom Hargrove", tier: "Founding", preview: "Appreciated the recap. Hit $25K total earnings last month!", time: "2d ago", unread: false },
];

const BROADCAST_GROUPS = [
  { label: "Message all Charter members", count: 25, color: "from-amber-600 to-orange-600" },
  { label: "Message at-risk partners", count: 12, color: "from-red-700 to-rose-700" },
  { label: "Message top performers", count: 10, color: "from-teal-700 to-green-700" },
  { label: "Message all", count: 147, color: "from-blue-700 to-indigo-700" },
];

function ChannelBadge({ type }: { type: Channel }) {
  if (type === "email") return (
    <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded-full">
      <Mail className="w-3 h-3" /> Email
    </span>
  );
  if (type === "sms") return (
    <span className="flex items-center gap-1 text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
      <Smartphone className="w-3 h-3" /> SMS
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded-full">
      <Zap className="w-3 h-3" /> Both
    </span>
  );
}

export default function PartnerCommunicationHub() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipientGroup, setRecipientGroup] = useState<RecipientGroup>("all");
  const [channel, setChannel] = useState<Channel>("email");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const loadTemplate = (name: string) => {
    setSubject(name);
    setBody(TEMPLATE_BODIES[name] ?? "");
    toast.success(`Template loaded: ${name}`);
  };

  const handleSend = () => {
    if (!subject.trim() || !body.trim()) {
      toast.error("Subject and message body are required");
      return;
    }
    toast.success("Message sent successfully");
    setSubject("");
    setBody("");
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/30 border border-blue-700/40 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Communication Hub</h1>
              <p className="text-blue-300 text-sm">Every conversation with every partner</p>
            </div>
          </div>
        </div>

        {/* Broadcast Quick Buttons */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Broadcast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BROADCAST_GROUPS.map((g) => (
              <button
                key={g.label}
                onClick={() => { setRecipientGroup("all"); toast.success(`Loading ${g.count} recipients`); }}
                className={`bg-gradient-to-br ${g.color} rounded-xl p-4 text-left hover:opacity-90 transition-opacity`}
              >
                <div className="text-2xl font-bold text-white mb-1">{g.count}</div>
                <div className="text-xs text-white/80 leading-snug">{g.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-400" />
            Message Composer
          </h2>

          {/* Templates */}
          <div className="mb-5">
            <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
              <FileText className="w-3 h-3" />
              Load a Template
            </div>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  onClick={() => loadTemplate(t)}
                  className="text-xs px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-600/50"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Recipient + Channel Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Recipients</label>
                <div className="relative">
                  <select
                    value={recipientGroup}
                    onChange={(e) => setRecipientGroup(e.target.value as RecipientGroup)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm appearance-none"
                  >
                    <option value="all">All Active Partners (147)</option>
                    <option value="tier">By Tier</option>
                    <option value="trade">By Trade</option>
                    <option value="individual">Individual Partner</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Channel</label>
                <div className="flex gap-2">
                  {(["email", "sms", "both"] as Channel[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setChannel(c)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        channel === c
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                      }`}
                    >
                      {c === "email" ? "Email" : c === "sms" ? "SMS" : "Both"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject..."
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-500"
              />
            </div>

            {/* Body */}
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Message</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your message here..."
                rows={5}
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-xl transition-colors">
                Schedule
              </button>
              <button
                onClick={handleSend}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Now
              </button>
            </div>
          </div>
        </div>

        {/* Two-column: Scheduled + Inbox */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Scheduled Messages */}
          <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Scheduled Messages
            </h2>
            <div className="space-y-3">
              {SCHEDULED.map((m) => (
                <div key={m.id} className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-white">{m.subject}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{m.group} · {m.recipientCount} recipients</div>
                    </div>
                    <ChannelBadge type={m.channel} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {m.date} at {m.time}
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                        <X className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-way Inbox */}
          <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Inbox className="w-4 h-4 text-green-400" />
              Partner Replies
            </h2>
            <div className="space-y-3">
              {INBOX_REPLIES.map((r) => (
                <div key={r.id} className={`rounded-xl p-4 transition-colors ${
                  r.unread ? "bg-blue-950/40 border border-blue-700/30" : "bg-slate-800/40"
                }`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">{r.partnerName}</span>
                        <span className="text-xs text-slate-500 ml-2">{r.tier}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {r.unread && <div className="w-2 h-2 bg-blue-400 rounded-full" />}
                      <span className="text-xs text-slate-500">{r.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pl-9 mb-2 leading-relaxed">{r.preview}</p>
                  {replyingTo === r.id ? (
                    <div className="pl-9 space-y-2">
                      <textarea
                        placeholder="Type your reply..."
                        rows={2}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setReplyingTo(null); toast.success("Reply sent"); }}
                          className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg"
                        >
                          Send
                        </button>
                        <button onClick={() => setReplyingTo(null)} className="text-xs text-slate-400 hover:text-slate-300 px-3 py-1.5">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingTo(r.id)}
                      className="pl-9 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <Reply className="w-3 h-3" /> Reply
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message History */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-purple-400" />
            Message History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-700/50">
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-left pb-3 font-medium">Subject</th>
                  <th className="text-left pb-3 font-medium">Channel</th>
                  <th className="text-right pb-3 font-medium">Recipients</th>
                  <th className="text-right pb-3 font-medium">Open Rate</th>
                  <th className="text-right pb-3 font-medium">Delivery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {HISTORY.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 text-slate-400 whitespace-nowrap">{h.date}</td>
                    <td className="py-3 text-slate-200 max-w-[200px] truncate">{h.subject}</td>
                    <td className="py-3"><ChannelBadge type={h.type} /></td>
                    <td className="py-3 text-right text-slate-300">{h.recipients}</td>
                    <td className="py-3 text-right">
                      {h.openRate !== undefined ? (
                        <span className={`${h.openRate >= 70 ? "text-green-400" : h.openRate >= 50 ? "text-amber-400" : "text-red-400"}`}>
                          {h.openRate}%
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <span className={h.deliveryRate >= 98 ? "text-green-400" : "text-amber-400"}>
                        {h.deliveryRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
