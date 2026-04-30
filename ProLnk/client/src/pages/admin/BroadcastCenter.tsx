import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  Radio, Send, Users, Trophy, Zap, CheckCircle, Eye, Mail, MessageSquare,
  Bell, BarChart2, Clock, ChevronRight, Bold, Italic, List, Link, Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AUDIENCE_OPTIONS = [
  { key: "all",        label: "All Active Partners", icon: Users,   color: "#00B5B8", description: "Every approved partner in the network" },
  { key: "scout",     label: "Scout Tier",          icon: Hash,    color: "#6B7280", description: "Free tier -- 40% commission keep rate" },
  { key: "pro",       label: "Pro Tier",            icon: Trophy,  color: "#3B82F6", description: "$29/mo -- 55% commission keep rate" },
  { key: "crew",      label: "Crew Tier",           icon: Trophy,  color: "#8B5CF6", description: "$79/mo -- 65% commission keep rate" },
  { key: "company",   label: "Company Tier",        icon: Trophy,  color: "#F59E0B", description: "$149/mo -- 72% commission keep rate" },
  { key: "enterprise",label: "Enterprise Tier",     icon: Trophy,  color: "#14B8A6", description: "$299/mo -- 78% commission keep rate" },
  { key: "pending",   label: "Pending Approval",    icon: Zap,     color: "#F59E0B", description: "Applicants awaiting review" },
];

const CHANNELS = [
  { key: "in_app", label: "In-App", icon: Bell, color: "#00B5B8" },
  { key: "email", label: "Email", icon: Mail, color: "#6366F1" },
  { key: "sms", label: "SMS", icon: MessageSquare, color: "#10B981" },
];

const MESSAGE_TEMPLATES = [
  { label: "Welcome", subject: "Welcome to the ProLnk Network!", body: "We're thrilled to have you as a partner in the ProLnk ecosystem. Your account is now active and you can start logging jobs and receiving referrals. Log in to your dashboard to get started." },
  { label: "Tier Upgrade", subject: "Congratulations -- You've Reached a New Tier!", body: "Your hard work is paying off. You've earned a tier upgrade in the ProLnk network, which means higher commission rates and priority referral routing. Keep it up!" },
  { label: "New Opportunity", subject: "New Referral Opportunity Available", body: "A new referral opportunity has been identified in your service area. Log in to your dashboard to review the details and accept the lead before it's routed to another partner." },
  { label: "Monthly Update", subject: "ProLnk Network Monthly Update", body: "Here's a quick update on the network's performance this month. We've generated new opportunities across the DFW area. Thank you for being part of the ecosystem." },
  { label: "Promo", subject: "Limited Time: Upgrade Your Tier at 50% Off", body: "For the next 7 days, you can upgrade your ProLnk tier at half price. Higher tiers mean better commission rates, priority routing, and more leads. Log in to upgrade now." },
];

export default function BroadcastCenter() {
  const [audience, setAudience] = useState("all");
  const [channels, setChannels] = useState<string[]>(["in_app"]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const { data: allPartners } = trpc.admin.getAllPartners.useQuery();
  const broadcast = trpc.admin.broadcastMessage.useMutation({
    onSuccess: () => {
      toast.success("Message broadcast successfully");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setSubject("");
      setBody("");
      setShowPreview(false);
    },
    onError: () => toast.error("Failed to send broadcast"),
    onSettled: () => setSending(false),
  });

  const { data: messages, refetch: refetchMessages } = trpc.partners.getBroadcasts.useQuery();

  const audienceCount = (() => {
    if (!allPartners) return 0;
    if (audience === "all") return allPartners.filter((p: any) => p.status === "approved").length;
    if (audience === "pending") return allPartners.filter((p: any) => p.status === "pending").length;
    return allPartners.filter((p: any) => p.status === "approved" && p.tier === audience).length;
  })();

  // Rich text formatting helpers
  const applyFormat = (format: string) => {
    const textarea = document.querySelector<HTMLTextAreaElement>(".broadcast-body");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = body.slice(start, end);
    let replacement = "";
    if (format === "bold") replacement = `**${selected || "bold text"}**`;
    else if (format === "italic") replacement = `_${selected || "italic text"}_`;
    else if (format === "list") replacement = `\n- ${selected || "item"}\n`;
    else if (format === "link") replacement = `[${selected || "link text"}](https://)`;
    const newBody = body.slice(0, start) + replacement + body.slice(end);
    setBody(newBody);
    setTimeout(() => textarea.focus(), 0);
  };

  const toggleChannel = (key: string) => {
    setChannels(prev =>
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    );
  };

  const handleSend = () => {
    if (!subject.trim() || !body.trim()) { toast.error("Subject and message are required"); return; }
    if (channels.length === 0) { toast.error("Select at least one channel"); return; }
    if (scheduleEnabled && !scheduledAt) { toast.error("Select a scheduled send time"); return; }
    if (scheduleEnabled) {
      toast.success(`Broadcast scheduled for ${new Date(scheduledAt).toLocaleString()}`);
      setSubject(""); setBody(""); setScheduleEnabled(false); setScheduledAt("");
      return;
    }
    setSending(true);
    broadcast.mutate({ subject, message: body, audience: audience as 'all' | 'scout' | 'pro' | 'crew' | 'company' | 'enterprise' | 'pending', channels });
  };

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const charCount = body.length;

  return (
    <AdminLayout title="Broadcast Center" subtitle="Send targeted messages to partner segments">
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="rounded-2xl border max-w-lg w-full p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#344767] text-lg">Message Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-gray-800 text-xl"></button>
            </div>
            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#0A1628" }}>
              <div className="text-xs mb-2" style={{ color: "#7B809A" }}>TO: {AUDIENCE_OPTIONS.find(a => a.key === audience)?.label} ({audienceCount} partners)</div>
              <div className="text-xs mb-3" style={{ color: "#7B809A" }}>
                VIA: {channels.map(c => CHANNELS.find(ch => ch.key === c)?.label).join(", ")}
              </div>
              <div className="font-bold text-[#344767] text-base mb-2">{subject || "(No subject)"}</div>
              <div className="text-sm whitespace-pre-wrap" style={{ color: "#A0B4C8" }}>{body || "(No message)"}</div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPreview(false)} className="flex-1 border-slate-600 text-slate-300">
                Edit
              </Button>
              <Button
                onClick={handleSend}
                disabled={sending || sent}
                className="flex-1 font-bold text-[#344767] gap-2"
                style={{ backgroundColor: "#00B5B8" }}
              >
                {sent ? <><CheckCircle className="w-4 h-4" /> Sent!</> : sending ? "Sending..." : <><Send className="w-4 h-4" /> Confirm & Send</>}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="rounded-2xl border max-w-lg w-full p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#344767] text-base">Broadcast Details</h3>
              <button onClick={() => setSelectedMsg(null)} className="text-slate-400 hover:text-gray-800 text-xl"></button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs mb-1" style={{ color: "#7B809A" }}>Subject</div>
                <div className="text-gray-800 font-medium">{selectedMsg.subject}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "#7B809A" }}>Message</div>
                <div className="text-sm whitespace-pre-wrap" style={{ color: "#A0B4C8" }}>{selectedMsg.message}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg p-3" style={{ backgroundColor: "#0A1628" }}>
                  <div className="text-xs mb-1" style={{ color: "#7B809A" }}>Sent</div>
                  <div className="text-gray-800 text-sm">{new Date(selectedMsg.createdAt).toLocaleString()}</div>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: "#0A1628" }}>
                  <div className="text-xs mb-1" style={{ color: "#7B809A" }}>Delivered</div>
                  <div className="text-gray-800 text-sm font-heading" style={{ color: "#00B5B8" }}>
                    {selectedMsg.recipientCount ?? audienceCount} partners
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Composer -- 3 cols */}
        <div className="xl:col-span-3 space-y-4">
          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Sent", value: messages?.length ?? 0, icon: Radio, color: "#00B5B8" },
              { label: "Audience Size", value: audienceCount, icon: Users, color: "#6366F1" },
              { label: "Channels Active", value: channels.length, icon: BarChart2, color: "#10B981" },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border p-3 flex items-center gap-3" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
                <stat.icon className="w-5 h-5 flex-shrink-0" style={{ color: stat.color }} />
                <div>
                  <div className="font-bold text-[#344767] text-lg leading-none">{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#7B809A" }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Audience selector */}
          <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <h3 className="font-bold text-[#344767] text-base mb-3">Select Audience</h3>
            <div className="space-y-2">
              {AUDIENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setAudience(opt.key)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all"
                  style={{
                    backgroundColor: audience === opt.key ? `${opt.color}15` : "#0A1628",
                    border: `1px solid ${audience === opt.key ? `${opt.color}40` : "#1E3A5F"}`,
                  }}
                >
                  <opt.icon className="w-4 h-4 flex-shrink-0" style={{ color: opt.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800">{opt.label}</div>
                    <div className="text-xs" style={{ color: "#7B809A" }}>{opt.description}</div>
                  </div>
                  {audience === opt.key && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: opt.color }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Channel selector */}
          <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <h3 className="font-bold text-[#344767] text-base mb-3">Delivery Channels</h3>
            <div className="flex gap-3">
              {CHANNELS.map(ch => (
                <button
                  key={ch.key}
                  onClick={() => toggleChannel(ch.key)}
                  className="flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: channels.includes(ch.key) ? `${ch.color}15` : "#0A1628",
                    border: `1px solid ${channels.includes(ch.key) ? `${ch.color}50` : "#1E3A5F"}`,
                  }}
                >
                  <ch.icon className="w-5 h-5" style={{ color: channels.includes(ch.key) ? ch.color : "#4A6FA5" }} />
                  <span className="text-xs font-medium" style={{ color: channels.includes(ch.key) ? ch.color : "#4A6FA5" }}>{ch.label}</span>
                  {ch.key === "email" || ch.key === "sms" ? (
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "#1E3A5F", color: "#7B809A" }}>Needs creds</span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Message composer */}
          <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#344767] text-base">Compose Message</h3>
              <div className="flex items-center gap-1 flex-wrap">
                {MESSAGE_TEMPLATES.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => { setSubject(t.subject); setBody(t.body); }}
                    className="text-xs px-2 py-1 rounded transition-colors hover:bg-white/5"
                    style={{ color: "#7B809A" }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: "#7B809A" }}>Subject</label>
                <Input
                  placeholder="Message subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border-0 text-gray-800 placeholder:text-slate-600"
                  style={{ backgroundColor: "#0A1628" }}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs" style={{ color: "#7B809A" }}>Message</label>
                  <span className="text-xs" style={{ color: charCount > 500 ? "#F59E0B" : "#4A6FA5" }}>
                    {wordCount} words  {charCount} chars
                  </span>
                </div>
                {/* Formatting toolbar */}
                <div className="flex items-center gap-1 mb-1.5 p-1.5 rounded-lg" style={{ backgroundColor: "#0A1628" }}>
                  {[
                    { icon: Bold, label: "Bold", fmt: "bold" },
                    { icon: Italic, label: "Italic", fmt: "italic" },
                    { icon: List, label: "Bullet list", fmt: "list" },
                    { icon: Link, label: "Link", fmt: "link" },
                  ].map(({ icon: Icon, label, fmt }) => (
                    <button
                      key={fmt}
                      title={label}
                      onClick={() => applyFormat(fmt)}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                      style={{ color: "#7B809A" }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                  <span className="text-xs ml-2" style={{ color: "#1E3A5F" }}>Markdown supported</span>
                </div>
                <Textarea
                  placeholder="Write your message to partners... (supports **bold**, _italic_, - lists)"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                  className="broadcast-body border-0 text-gray-800 placeholder:text-slate-600 resize-none"
                  style={{ backgroundColor: "#0A1628" }}
                />
              </div>
            </div>

            {/* Scheduled send toggle */}
            <div className="mt-3 flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "#0A1628" }}>
              <button
                onClick={() => setScheduleEnabled(v => !v)}
                className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${scheduleEnabled ? "bg-teal-500" : "bg-gray-600"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${scheduleEnabled ? "translate-x-4" : ""}`} />
              </button>
              <span className="text-xs" style={{ color: "#7B809A" }}>Schedule for later</span>
              {scheduleEnabled && (
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={e => setScheduledAt(e.target.value)}
                  className="ml-auto text-xs px-2 py-1 rounded-lg border-0 outline-none"
                  style={{ backgroundColor: "#1E3A5F", color: "#A0B4C8" }}
                />
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "#E9ECEF" }}>
              <div className="text-xs" style={{ color: "#7B809A" }}>
                {scheduleEnabled ? (
                  <span style={{ color: "#F59E0B" }}> Scheduled broadcast</span>
                ) : (
                  <>Sending to <span className="font-heading" style={{ color: "#00B5B8" }}>{audienceCount}</span> partners
                  {" via "}
                  <span style={{ color: "#00B5B8" }}>{channels.length} channel{channels.length !== 1 ? "s" : ""}</span></>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                  disabled={!subject.trim() || !body.trim()}
                  className="font-heading gap-2 border-slate-600 text-slate-300 hover:bg-white/5"
                >
                  <Eye className="w-4 h-4" /> Preview
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={sending || sent || !subject.trim() || !body.trim() || channels.length === 0}
                  className="font-bold text-[#344767] gap-2"
                  style={{ backgroundColor: sent ? "#10B981" : scheduleEnabled ? "#F59E0B" : "#00B5B8" }}
                >
                  {sent ? <><CheckCircle className="w-4 h-4" /> Sent!</> : sending ? "Sending..." : scheduleEnabled ? <><Clock className="w-4 h-4" /> Schedule</> : <><Send className="w-4 h-4" /> Broadcast</>}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Message history -- 2 cols */}
        <div className="xl:col-span-2">
          <div className="rounded-xl border h-full" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#E9ECEF" }}>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4" style={{ color: "#00B5B8" }} />
                <h3 className="font-bold text-[#344767] text-sm">Broadcast History</h3>
              </div>
              <Badge className="text-xs" style={{ backgroundColor: "#00B5B815", color: "#00B5B8", border: "none" }}>
                {messages?.length ?? 0} sent
              </Badge>
            </div>
            <div className="divide-y overflow-y-auto max-h-[600px]" style={{ borderColor: "#E9ECEF" }}>
              {(!messages || messages.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <Radio className="w-8 h-8 mb-3" style={{ color: "#1E3A5F" }} />
                  <p className="text-sm font-medium text-gray-800">No broadcasts yet</p>
                  <p className="text-xs mt-1" style={{ color: "#7B809A" }}>Your sent messages will appear here</p>
                </div>
              ) : (
                messages.map((m: any) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMsg(m)}
                    className="w-full px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium text-gray-800 text-sm truncate flex-1">{m.subject}</div>
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#7B809A" }} />
                    </div>
                    <div className="text-xs mt-1 line-clamp-2 mb-2" style={{ color: "#7B809A" }}>{m.message}</div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: "#7B809A" }}>
                        <Clock className="w-3 h-3" />
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "#00B5B8" }}>
                        <Users className="w-3 h-3" />
                        {m.recipientCount ?? "--"} delivered
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
