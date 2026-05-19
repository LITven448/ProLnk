import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Activity, CheckCircle, AlertTriangle, XCircle, RefreshCw,
  Search, Trash2, Zap, Clock, Filter,
} from "lucide-react";

const D = {
  bg: "#0D0F14″,
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8″,
  dim: "#555B72″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  blue: "#3B82F6″,
  purple: "#A855F7″,
  teal: "#14B8A6″,
};

type EventStatus = "processed" | "retrying" | "failed";

interface WebhookEvent {
  id: number;
  ts: string;
  source: "Stripe" | "Twilio" | "Checkr" | "CompanyCam" | "Inngest";
  type: string;
  status: EventStatus;
  bytes: number;
  ms: number;
}

const SOURCE_COLORS: Record<string, string> = {
  Stripe:     D.purple,
  Twilio:     D.cyan,
  Checkr:     D.amber,
  CompanyCam: D.blue,
  Inngest:    D.teal,
};

const EVENT_TYPES: Record<string, string[]> = {
  Stripe:     ["payment.succeeded", "payment.failed", "subscription.created", "invoice.paid", "charge.refunded"],
  Twilio:     ["sms.delivered", "sms.failed", "call.completed", "message.queued"],
  Checkr:     ["check.completed", "check.pending", "report.created"],
  CompanyCam: ["photo.uploaded", "project.created", "comment.added"],
  Inngest:    ["job.scheduled", "job.completed", "job.failed", "event.triggered"],
};

const SOURCES: Array<"Stripe" | "Twilio" | "Checkr" | "CompanyCam" | "Inngest"> =
  ["Stripe", "Twilio", "Checkr", "CompanyCam", "Inngest"];

function makeEvent(id: number): WebhookEvent {
  const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
  const types = EVENT_TYPES[source];
  const type = types[Math.floor(Math.random() * types.length)];
  const roll = Math.random();
  const status: EventStatus = roll < 0.89 ? "processed" : roll < 0.96 ? "retrying" : "failed";
  const now = new Date();
  const ts = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  return { id, ts, source, type, status, bytes: Math.floor(Math.random() * 2400 + 80), ms: Math.floor(Math.random() * 120 + 8) };
}

const INITIAL_EVENTS: WebhookEvent[] = Array.from({ length: 18 }, (_, i) =>
  makeEvent(1000 - i)
).map((e, i) => {
  const secsAgo = i * 4;
  const d = new Date(Date.now() - secsAgo * 1000);
  return { ...e, ts: `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}` };
});

const INTEGRATIONS = [
  { name: "Stripe",      last: "2s ago",  today: 312, ok: true },
  { name: "Twilio",      last: "8s ago",  today: 198, ok: true },
  { name: "Checkr",      last: "4m ago",  today: 44,  ok: true },
  { name: "CompanyCam",  last: "12m ago", today: 183, ok: true },
  { name: "Inngest",     last: "1s ago",  today: 110, ok: false },
];

interface FailedEvent {
  id: number;
  source: string;
  type: string;
  error: string;
  retries: number;
  ts: string;
}

const INITIAL_FAILED: FailedEvent[] = [
  { id: 2091, source: "Inngest",  type: "job.failed",      error: "Timeout: handler exceeded 30s limit",     retries: 2, ts: "09:14:22″ },
  { id: 2087, source: "Twilio",   type: "sms.failed",      error: "Invalid destination number: +15551234567″, retries: 1, ts: "08:52:11" },
  { id: 2076, source: "Stripe",   type: "charge.refunded", error: "DB write conflict — row locked",           retries: 3, ts: "07:38:49″ },
];

const STATUS_CFG: Record<EventStatus, { color: string; label: string; dot: string }> = {
  processed: { color: D.green,  label: "Processed", dot: D.green },
  retrying:  { color: D.amber,  label: "Retrying",  dot: D.amber },
  failed:    { color: D.red,    label: "Failed",    dot: D.red },
};

export default function WebhookMonitor() {
  const [events, setEvents] = useState<WebhookEvent[]>(INITIAL_EVENTS);
  const [failed, setFailed] = useState<FailedEvent[]>(INITIAL_FAILED);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [nextId, setNextId] = useState(1001);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const iv = setInterval(() => {
      setNextId(n => {
        const ev = makeEvent(n);
        setEvents(prev => [ev, ...prev.slice(0, 49)]);
        return n + 1;
      });
    }, 2200);
    return () => clearInterval(iv);
  }, [live]);

  const today = events.length + 847 - INITIAL_EVENTS.length;
  const successCount = events.filter(e => e.status === "processed").length;
  const successRate = events.length ? ((successCount / events.length) * 100).toFixed(1) : "0.0″;
  const avgMs = events.length
    ? Math.round(events.reduce((s, e) => s + e.ms, 0) / events.length)
    : 0;

  const filtered = events.filter(e => {
    const matchSrc = sourceFilter === "All" || e.source === sourceFilter;
    const matchQ = search === "" || e.type.includes(search) || e.source.toLowerCase().includes(search.toLowerCase());
    return matchSrc && matchQ;
  });

  return (
    <AdminLayout>
      <div style={{ minHeight: "100vh", backgroundColor: D.bg, padding: "32px 24px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-8″>
          <div>
            <div className="flex items-center gap-3 mb-1″>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${D.cyan}20` }}>
                <Activity className="w-5 h-5″ style={{ color: D.cyan }} />
              </div>
              <h1 className="text-2xl font-black" style={{ color: D.text }}>Webhook Monitor</h1>
              <div className="flex items-center gap-1.5 ml-2″>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: live ? D.green : D.dim }} />
                <span className="text-xs font-semibold" style={{ color: live ? D.green : D.muted }}>
                  {live ? "LIVE" : "PAUSED"}
                </span>
              </div>
            </div>
            <p className="text-sm ml-14″ style={{ color: D.muted }}>Live event stream from all integrations</p>
          </div>
          <button
            onClick={() => setLive(l => !l)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80″
            style={{ background: live ? `${D.amber}20` : `${D.green}20`, color: live ? D.amber : D.green, border: `1px solid ${live ? D.amber : D.green}40` }}
          >
            {live ? <><Clock className="w-4 h-4″ /> Pause</> : <><Activity className="w-4 h-4" /> Resume</>}
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6″>
          {[
            { label: "Events Today",     value: today.toLocaleString(), color: D.cyan },
            { label: "Success Rate",     value: `${successRate}%`,      color: D.green },
            { label: "Avg Processing",   value: `${avgMs}ms`,           color: D.blue },
            { label: "Failed",           value: String(failed.length),  color: D.red },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-4″
              style={{ background: `linear-gradient(135deg, ${stat.color}08, ${stat.color}18)`, border: `1px solid ${stat.color}30` }}>
              <p className="text-xs font-semibold mb-1″ style={{ color: D.muted }}>{stat.label}</p>
              <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6″>

          {/* Live Feed */}
          <div className="xl:col-span-2 space-y-4″>

            {/* Search + Filter */}
            <div className="flex gap-3″>
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                <Search className="w-4 h-4 flex-shrink-0″ style={{ color: D.muted }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search events..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: D.text }}
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                <Filter className="w-3.5 h-3.5″ style={{ color: D.muted }} />
                <select
                  value={sourceFilter}
                  onChange={e => setSourceFilter(e.target.value)}
                  className="bg-transparent text-sm outline-none"
                  style={{ color: D.text }}
                >
                  <option value="All">All Sources</option>
                  {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Event list */}
            <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Live Event Stream</span>
                <span className="text-xs" style={{ color: D.muted }}>Showing {filtered.length} events</span>
              </div>
              <div className="max-h-[480px] overflow-y-auto">
                {filtered.map(ev => {
                  const sc = STATUS_CFG[ev.status];
                  const srcColor = SOURCE_COLORS[ev.source];
                  return (
                    <div key={ev.id} className="flex items-center gap-3 px-5 py-3 border-b last:border-b-0 hover:opacity-80 transition-opacity"
                      style={{ borderColor: D.border }}>
                      <span className="text-xs font-mono w-16 flex-shrink-0″ style={{ color: D.dim }}>{ev.ts}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0″ style={{ background: `${srcColor}20`, color: srcColor }}>
                        {ev.source}
                      </span>
                      <span className="text-xs flex-1 font-mono" style={{ color: D.text }}>{ev.type}</span>
                      <span className="text-xs flex-shrink-0″ style={{ color: D.dim }}>{ev.bytes}B</span>
                      <span className="text-xs flex-shrink-0″ style={{ color: D.dim }}>{ev.ms}ms</span>
                      <div className="flex items-center gap-1 flex-shrink-0″>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sc.dot }} />
                        <span className="text-xs font-semibold" style={{ color: sc.color }}>{sc.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Failed Events Panel */}
            {failed.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3″>
                  <h2 className="text-base font-bold" style={{ color: D.text }}>Failed Events</h2>
                  <button
                    onClick={() => setFailed([])}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ background: `${D.red}15`, color: D.red, border: `1px solid ${D.red}30` }}
                  >
                    <Trash2 className="w-3.5 h-3.5″ /> Clear all
                  </button>
                </div>
                <div className="space-y-3″>
                  {failed.map(f => (
                    <div key={f.id} className="rounded-2xl p-4″ style={{ background: `${D.red}08`, border: `1px solid ${D.red}30` }}>
                      <div className="flex items-start justify-between mb-2″>
                        <div className="flex items-center gap-2″>
                          <XCircle className="w-4 h-4 flex-shrink-0″ style={{ color: D.red }} />
                          <span className="text-sm font-bold" style={{ color: D.text }}>{f.source} — {f.type}</span>
                        </div>
                        <span className="text-xs" style={{ color: D.dim }}>{f.ts}</span>
                      </div>
                      <p className="text-xs mb-3 ml-6″ style={{ color: D.muted }}>{f.error}</p>
                      <div className="flex items-center justify-between ml-6″>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${D.amber}20`, color: D.amber }}>
                          {f.retries} retries
                        </span>
                        <button
                          onClick={() => setFailed(prev => prev.filter(x => x.id !== f.id))}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                          style={{ background: `${D.cyan}15`, color: D.cyan, border: `1px solid ${D.cyan}30` }}
                        >
                          <RefreshCw className="w-3 h-3″ /> Retry Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Integration Health */}
          <div className="space-y-5″>
            <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="px-5 py-3″ style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Integration Health</span>
              </div>
              <div className="divide-y" style={{ borderColor: D.border }}>
                {INTEGRATIONS.map(int => (
                  <div key={int.name} className="flex items-center gap-3 px-5 py-3.5″>
                    <div className="w-2 h-2 rounded-full flex-shrink-0″ style={{ backgroundColor: int.ok ? D.green : D.red }} />
                    <div className="flex-1″>
                      <p className="text-sm font-semibold" style={{ color: D.text }}>{int.name}</p>
                      <p className="text-xs" style={{ color: D.muted }}>Last event: {int.last}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: SOURCE_COLORS[int.name] }}>{int.today}</p>
                      <p className="text-xs" style={{ color: D.dim }}>today</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event type breakdown */}
            <div className="rounded-2xl p-4″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-3″ style={{ color: D.text }}>Top Event Types</h2>
              <div className="space-y-2″>
                {[
                  { type: "payment.succeeded", count: 312, color: D.purple },
                  { type: "sms.delivered",     count: 198, color: D.cyan },
                  { type: "job.scheduled",     count: 110, color: D.teal },
                  { type: "photo.uploaded",    count: 183, color: D.blue },
                  { type: "check.completed",   count: 44,  color: D.amber },
                ].map(et => (
                  <div key={et.type}>
                    <div className="flex items-center justify-between mb-1″>
                      <span className="text-xs font-mono" style={{ color: D.muted }}>{et.type}</span>
                      <span className="text-xs font-bold" style={{ color: et.color }}>{et.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${et.color}20` }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.round((et.count / 312) * 100)}%`, background: et.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status legend */}
            <div className="rounded-2xl p-4″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-3″ style={{ color: D.text }}>Status Legend</h2>
              <div className="space-y-2″>
                {[
                  { Icon: CheckCircle,   color: D.green, label: "Processed",  desc: "Handler returned 2xx" },
                  { Icon: AlertTriangle, color: D.amber, label: "Retrying",   desc: "Scheduled for retry (max 5)" },
                  { Icon: XCircle,       color: D.red,   label: "Failed",     desc: "Max retries exceeded" },
                ].map(s => (
                  <div key={s.label} className="flex items-start gap-2″>
                    <s.Icon className="w-4 h-4 mt-0.5 flex-shrink-0″ style={{ color: s.color }} />
                    <div>
                      <p className="text-xs font-bold" style={{ color: s.color }}>{s.label}</p>
                      <p className="text-xs" style={{ color: D.dim }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick tip */}
            <div className="rounded-2xl p-4″ style={{ background: `${D.blue}10`, border: `1px solid ${D.blue}30` }}>
              <div className="flex items-center gap-2 mb-2″>
                <Zap className="w-4 h-4″ style={{ color: D.blue }} />
                <span className="text-xs font-bold" style={{ color: D.blue }}>Pro Tip</span>
              </div>
              <p className="text-xs" style={{ color: D.muted }}>
                Inngest webhooks that fail more than 3 times auto-pause. Check the Inngest dashboard for the dead-letter queue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
