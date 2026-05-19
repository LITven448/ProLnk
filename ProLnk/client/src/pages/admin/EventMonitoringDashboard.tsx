import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Activity, Users, Zap, DollarSign, AlertTriangle,
  Play, Pause, RefreshCw, ChevronRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const D = {
  bg: "#0D1117″,
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
  purple: "#A855F7″,
  teal: "#14B8A6″,
  orange: "#F97316″,
};

const EVENT_TYPES = [
  "lead.created",
  "job.completed",
  "payment.succeeded",
  "partner.enrolled",
  "photo.uploaded",
  "storm.detected",
] as const;

type EventType = typeof EVENT_TYPES[number];

const EVENT_COLORS: Record<EventType, string> = {
  "lead.created":      D.cyan,
  "job.completed":     D.green,
  "payment.succeeded": D.teal,
  "partner.enrolled":  D.purple,
  "photo.uploaded":    D.amber,
  "storm.detected":    D.orange,
};

const PARTNER_NAMES = [
  "James Okafor", "Maria Torres", "System", "DeShawn Williams",
  "Linda Park", "System", "Carlos Reyes", "Sarah Mitchell",
];

const AMOUNTS: Partial<Record<EventType, string[]>> = {
  "payment.succeeded": ["$149.00″, "$299.00", "$74.50", "$199.00"],
  "lead.created":      ["$45.00″, "$80.00", "$120.00"],
  "job.completed":     ["$320.00″, "$580.00", "$250.00"],
};

interface LiveEvent {
  id: string;
  ts: string;
  type: EventType;
  entity: string;
  amount?: string;
}

function randomEvent(id: number): LiveEvent {
  const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
  const entity = PARTNER_NAMES[Math.floor(Math.random() * PARTNER_NAMES.length)];
  const amtList = AMOUNTS[type];
  const amount = amtList ? amtList[Math.floor(Math.random() * amtList.length)] : undefined;
  const now = new Date();
  const ts = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  return { id: String(id), ts, type, entity, amount };
}

function seedEvents(): LiveEvent[] {
  return Array.from({ length: 18 }, (_, i) => randomEvent(1000 - i));
}

function seedHourly() {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const h = (now.getHours() - 23 + i + 24) % 24;
    const label = `${h.toString().padStart(2, "0")}:00`;
    return { time: label, events: 20 + Math.floor(Math.random() * 180) };
  });
}

const DONUT_DATA = [
  { name: "Lead events",    value: 34, color: D.cyan },
  { name: "Job events",     value: 28, color: D.green },
  { name: "Payment",        value: 18, color: D.teal },
  { name: "Auth",           value: 12, color: D.purple },
  { name: "Other",          value: 8,  color: D.dim },
];

interface CounterProps {
  label: string;
  value: number;
  color: string;
  icon: typeof Activity;
}

function LiveCounter({ label, value, color, icon: Icon }: CounterProps) {
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayed(v => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(0, v + delta);
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-5 flex flex-col gap-2″>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: D.dim }}>{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <p className="text-4xl font-black" style={{ color }}>{displayed}</p>
      <div className="flex items-center gap-1″>
        <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
        <span className="text-xs" style={{ color: D.dim }}>live</span>
      </div>
    </div>
  );
}

export default function EventMonitoringDashboard() {
  const [events, setEvents] = useState<LiveEvent[]>(seedEvents);
  const [hourly] = useState(seedHourly);
  const [paused, setPaused] = useState(false);
  const counter = useRef(2000);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      counter.current += 1;
      const ev = randomEvent(counter.current);
      setEvents(prev => [ev, ...prev].slice(0, 60));
    }, 2000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <AdminLayout>
      <div style={{ background: D.bg, minHeight: "100vh", color: D.text }} className="p-4 md:p-8 space-y-8″>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4″>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: D.text }}>Event Monitor</h1>
            <p className="text-sm mt-1″ style={{ color: D.muted }}>Everything happening on the platform right now</p>
          </div>
          <div className="flex items-center gap-3″>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: D.card, border: `1px solid ${D.green}44` }}>
              <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: D.green }} />
              <span className="text-xs font-semibold" style={{ color: D.green }}>Live</span>
            </div>
            <button
              onClick={() => setPaused(p => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80″
              style={{ background: paused ? D.cyan : D.card, color: paused ? "#000″ : D.text, border: `1px solid ${D.border}` }}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              {paused ? "Resume feed" : "Pause feed"}
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4″>
          <LiveCounter label="Events/min"         value={24}  color={D.cyan}   icon={Zap} />
          <LiveCounter label="Active users"        value={67}  color={D.green}  icon={Users} />
          <LiveCounter label="Leads in flight"     value={8}   color={D.amber}  icon={Activity} />
          <LiveCounter label="Payments processing" value={2}   color={D.teal}   icon={DollarSign} />
        </div>

        {/* Event Stream + Donut side by side */}
        <div className="grid md:grid-cols-3 gap-6″>

          {/* Stream */}
          <div className="md:col-span-2 flex flex-col" style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <div className="rounded-t-2xl flex items-center justify-between px-5 py-4″ style={{ borderBottom: `1px solid ${D.border}` }}>
              <span className="text-sm font-bold" style={{ color: D.text }}>Live Event Stream</span>
              <RefreshCw size={14} style={{ color: paused ? D.dim : D.cyan }} className={paused ? "" : "animate-spin"} />
            </div>
            <div className="rounded-b-2xl overflow-y-auto" style={{ maxHeight: 380 }}>
              {events.map(ev => (
                <div
                  key={ev.id}
                  className="flex items-center gap-3 px-5 py-2.5″
                  style={{ borderBottom: `1px solid ${D.border}22` }}
                >
                  <span className="text-xs font-mono shrink-0″ style={{ color: D.dim, width: 60 }}>{ev.ts}</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0″
                    style={{
                      background: `${EVENT_COLORS[ev.type]}18`,
                      color: EVENT_COLORS[ev.type],
                      border: `1px solid ${EVENT_COLORS[ev.type]}33`,
                    }}
                  >
                    {ev.type}
                  </span>
                  <span className="text-xs flex-1 truncate" style={{ color: D.muted }}>{ev.entity}</span>
                  {ev.amount && <span className="text-xs font-bold shrink-0″ style={{ color: D.green }}>{ev.amount}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Donut */}
          <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-5 flex flex-col">
            <h2 className="text-sm font-bold mb-4″ style={{ color: D.text }}>Event Type Breakdown</h2>
            <div className="flex-1″ style={{ minHeight: 200 }}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={DONUT_DATA} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {DONUT_DATA.map(d => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8 }}
                    formatter={(val: number) => [`${val}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2″>
              {DONUT_DATA.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2″>
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span style={{ color: D.muted }}>{d.name}</span>
                  </div>
                  <span className="font-bold" style={{ color: d.color }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Volume Chart */}
        <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-5″>
          <h2 className="text-sm font-bold mb-4″ style={{ color: D.text }}>Events Per Hour — Last 24 Hours</h2>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={hourly}>
              <defs>
                <linearGradient id="evGrad" x1="0″ y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={D.cyan} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={D.cyan} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3″ stroke={D.border} />
              <XAxis dataKey="time" tick={{ fill: D.dim, fontSize: 10 }} interval={3} />
              <YAxis tick={{ fill: D.dim, fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text }}
              />
              <Area type="monotone" dataKey="events" stroke={D.cyan} fill="url(#evGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Error Rate Banner */}
        <div style={{ background: `${D.amber}10`, border: `1px solid ${D.amber}33` }} className="rounded-2xl p-4 flex items-center justify-between gap-4″>
          <div className="flex items-center gap-3″>
            <AlertTriangle size={18} style={{ color: D.amber }} />
            <p className="text-sm" style={{ color: D.muted }}>
              <span style={{ color: D.amber }} className="font-semibold">0.08% error rate</span>
              {" — "}7 events failed in the last hour.
            </p>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold shrink-0 hover:opacity-80 transition-opacity" style={{ color: D.cyan }}>
            View failed events <ChevronRight size={13} />
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
