import { useState } from "react";
import {
  Plus, ArrowRight, Bell, TrendingUp, User,
  DollarSign, Clock, MessageSquare, BarChart2, ChevronRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const D = {
  bg: "#0A1628″,
  surface: "#0F1E35″,
  card: "#132236″,
  border: "#1E3352″,
  text: "#F0F4FF",
  muted: "#7A93B5″,
  dim: "#3D5578″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  purple: "#A855F7″,
  teal: "#14B8A6″,
  orange: "#F97316″,
};

type Stage = "Contacted" | "Quoted" | "Follow-up" | "Won";

interface Prospect {
  id: string;
  name: string;
  city: string;
  service: string;
  value: number;
  daysInStage: number;
  lastContact: string;
  nextStep: string;
  stage: Stage;
}

const INIT_PROSPECTS: Prospect[] = [
  { id: "p1″,  name: "James Okafor",    city: "Plano",        service: "HVAC Install",      value: 4200, daysInStage: 1, lastContact: "Today",      nextStep: "Schedule site visit",   stage: "Contacted" },
  { id: "p2″,  name: "Linda Park",      city: "McKinney",     service: "Roof Repair",        value: 1800, daysInStage: 2, lastContact: "Yesterday",  nextStep: "Send estimate",          stage: "Contacted" },
  { id: "p3″,  name: "David Brown",     city: "Frisco",       service: "Electrical Panel",   value: 3500, daysInStage: 3, lastContact: "2 days ago", nextStep: "Call back",              stage: "Contacted" },
  { id: "p4″,  name: "Maria Torres",    city: "Allen",        service: "Plumbing Reroute",   value: 2700, daysInStage: 1, lastContact: "Today",      nextStep: "Awaiting signature",     stage: "Contacted" },
  { id: "p5″,  name: "Kevin Nash",      city: "Garland",      service: "Foundation Repair",  value: 8000, daysInStage: 5, lastContact: "3 days ago", nextStep: "Follow up quote",        stage: "Contacted" },
  { id: "p6″,  name: "Sarah Mitchell",  city: "Richardson",   service: "HVAC Replacement",   value: 5500, daysInStage: 2, lastContact: "Yesterday",  nextStep: "Client reviewing",       stage: "Quoted" },
  { id: "p7″,  name: "Carlos Reyes",    city: "Irving",       service: "Electrical Rewire",  value: 4100, daysInStage: 4, lastContact: "4 days ago", nextStep: "Price negotiation",      stage: "Quoted" },
  { id: "p8″,  name: "Amy Johnson",     city: "Mesquite",     service: "Roof Replacement",   value: 9200, daysInStage: 1, lastContact: "Today",      nextStep: "Pending HOA approval",   stage: "Quoted" },
  { id: "p9″,  name: "Marcus Rivera",   city: "Carrollton",   service: "Plumbing Install",   value: 2200, daysInStage: 3, lastContact: "3 days ago", nextStep: "Send follow-up email",   stage: "Follow-up" },
  { id: "p10″, name: "Diana Chen",      city: "Lewisville",   service: "HVAC Tune-Up",       value: 800,  daysInStage: 5, lastContact: "5 days ago", nextStep: "Call to check status",   stage: "Follow-up" },
  { id: "p11″, name: "Robert Hayes",    city: "Denton",       service: "Foundation Check",   value: 1200, daysInStage: 2, lastContact: "2 days ago", nextStep: "Resend quote with video", stage: "Follow-up" },
  { id: "p12″, name: "Patricia Gomez",  city: "Euless",       service: "Electrical Inspect", value: 600,  daysInStage: 7, lastContact: "Week ago",   nextStep: "Final check-in",         stage: "Follow-up" },
];

const WIN_SOURCE_DATA = [
  { source: "ProLnk Leads",     rate: 78 },
  { source: "Referral",         rate: 82 },
  { source: "Organic Inquiry",  rate: 61 },
];

const SOURCE_COLORS = [D.cyan, D.purple, D.amber];

const STAGE_META: Record<Stage, { color: string; borderColor: string }> = {
  "Contacted":  { color: D.cyan,   borderColor: `${D.cyan}33` },
  "Quoted":     { color: D.amber,  borderColor: `${D.amber}33` },
  "Follow-up":  { color: D.orange, borderColor: `${D.orange}33` },
  "Won":        { color: D.green,  borderColor: `${D.green}33` },
};

const STAGES: Stage[] = ["Contacted", "Quoted", "Follow-up", "Won"];

const FOLLOWUP_ALERTS = [
  { name: "Marcus Rivera",  city: "Carrollton", service: "Plumbing Install", days: 3 },
  { name: "Diana Chen",     city: "Lewisville", service: "HVAC Tune-Up",    days: 5 },
  { name: "Patricia Gomez", city: "Euless",     service: "Electrical",      days: 7 },
];

type Source = "ProLnk Lead" | "Referral" | "Organic";

interface NewProspect {
  name: string;
  service: string;
  value: string;
  source: Source;
}

const EMPTY_FORM: NewProspect = { name: "", service: "", value: "", source: "ProLnk Lead" };

export default function ProspectTracker() {
  const [prospects, setProspects] = useState<Prospect[]>(INIT_PROSPECTS);
  const [form, setForm] = useState<NewProspect>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  const won = Array.from({ length: 8 }, (_, i) => ({
    id: `w${i}`,
    name: ["Tom Baker", "Elena Ross", "Sam Kim", "Jade Li", "Felix Brown", "Nora Davis", "Ali Hassan", "Meg White"][i],
    city: ["Plano", "Frisco", "McKinney", "Allen", "Dallas", "Irving", "Garland", "Denton"][i],
    service: ["HVAC", "Roofing", "Plumbing", "Electrical", "HVAC", "Foundation", "Electrical", "Roofing"][i],
    value: [3200, 7800, 2100, 4500, 5100, 9200, 1800, 6600][i],
    daysInStage: [1, 2, 3, 4, 5, 6, 7, 8][i],
    lastContact: "This month",
    nextStep: "Collect final payment",
    stage: "Won" as Stage,
  }));

  const stageMap: Record<Stage, Prospect[]> = {
    "Contacted": prospects.filter(p => p.stage === "Contacted"),
    "Quoted":    prospects.filter(p => p.stage === "Quoted"),
    "Follow-up": prospects.filter(p => p.stage === "Follow-up"),
    "Won":       won,
  };

  function advanceStage(id: string) {
    setProspects(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const idx = STAGES.indexOf(p.stage);
        const next = STAGES[Math.min(idx + 1, STAGES.length - 2)] as Stage;
        return { ...p, stage: next, daysInStage: 0 };
      })
    );
  }

  function addProspect() {
    if (!form.name || !form.service) return;
    const newP: Prospect = {
      id: `new-${Date.now()}`,
      name: form.name,
      city: "DFW",
      service: form.service,
      value: Number(form.value) || 0,
      daysInStage: 0,
      lastContact: "Just now",
      nextStep: "Make first contact",
      stage: "Contacted",
    };
    setProspects(prev => [newP, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  return (
    <div style={{ background: D.bg, minHeight: "100vh", color: D.text }} className="p-4 md:p-8 space-y-8″>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4″>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: D.text }}>Prospect Tracker</h1>
          <p className="text-sm mt-1″ style={{ color: D.muted }}>Turn conversations into customers</p>
        </div>
        <button
          onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90″
          style={{ background: D.cyan, color: "#000″ }}
        >
          <Plus size={16} />
          Add Prospect
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-5 space-y-3″>
          <h3 className="text-sm font-bold" style={{ color: D.text }}>New Prospect</h3>
          <div className="grid md:grid-cols-4 gap-3″>
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
            />
            <input
              placeholder="Service"
              value={form.service}
              onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
              className="rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
            />
            <input
              placeholder="Est. value $"
              type="number"
              value={form.value}
              onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
              className="rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
            />
            <select
              value={form.source}
              onChange={e => setForm(f => ({ ...f, source: e.target.value as Source }))}
              className="rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
            >
              <option>ProLnk Lead</option>
              <option>Referral</option>
              <option>Organic</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm" style={{ color: D.muted, border: `1px solid ${D.border}` }}>
              Cancel
            </button>
            <button onClick={addProspect} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: D.cyan, color: "#000″ }}>
              Add
            </button>
          </div>
        </div>
      )}

      {/* Conversion Stats Banner */}
      <div style={{ background: `${D.green}10`, border: `1px solid ${D.green}33` }} className="rounded-2xl px-5 py-3 flex items-center gap-3″>
        <TrendingUp size={18} style={{ color: D.green }} />
        <p className="text-sm" style={{ color: D.muted }}>
          You convert <span style={{ color: D.green }} className="font-bold">68%</span> of prospects who receive a quote.{" "}
          Industry avg: <span style={{ color: D.dim }} className="font-semibold">54%</span>.
        </p>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4″>
        {STAGES.map(stage => {
          const cards = stageMap[stage];
          const { color, borderColor } = STAGE_META[stage];
          const label = stage === "Won" ? "Won (this month)" : `${stage} (${cards.length})`;
          return (
            <div key={stage} className="flex flex-col gap-3″>
              <div className="flex items-center justify-between px-1″>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${color}18`, color }}>
                  {cards.length}
                </span>
              </div>
              <div className="space-y-3″>
                {cards.map(p => (
                  <div
                    key={p.id}
                    style={{ background: D.card, border: `1px solid ${borderColor}` }}
                    className="rounded-2xl p-4 space-y-3″
                  >
                    <div className="flex items-start justify-between gap-2″>
                      <div>
                        <p className="text-sm font-bold" style={{ color: D.text }}>{p.name}</p>
                        <p className="text-xs" style={{ color: D.muted }}>{p.city} · {p.service}</p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: D.green }}>${p.value.toLocaleString()}</span>
                    </div>
                    <div className="space-y-1″>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: D.dim }}>
                        <Clock size={11} />
                        <span>{p.daysInStage}d in stage · Last: {p.lastContact}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: D.muted }}>
                        <MessageSquare size={11} />
                        <span>{p.nextStep}</span>
                      </div>
                    </div>
                    {stage !== "Won" && (
                      <button
                        onClick={() => advanceStage(p.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-80″
                        style={{ background: `${color}15`, color, border: `1px solid ${color}33` }}
                      >
                        Move forward <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Follow-up Reminders */}
      <section>
        <div className="flex items-center gap-2 mb-4″>
          <Bell size={16} style={{ color: D.amber }} />
          <h2 className="text-base font-bold" style={{ color: D.text }}>Follow-Up Reminders</h2>
        </div>
        <div className="space-y-3″>
          {FOLLOWUP_ALERTS.map(a => (
            <div
              key={a.name}
              style={{ background: `${D.amber}0D`, border: `1px solid ${D.amber}44` }}
              className="rounded-2xl px-4 py-3 flex items-center justify-between gap-4″
            >
              <div className="flex items-center gap-3″>
                <Bell size={15} style={{ color: D.amber }} className="shrink-0″ />
                <p className="text-sm" style={{ color: D.muted }}>
                  <span style={{ color: D.text }} className="font-semibold">{a.name}</span>{" "}
                  hasn't responded to your quote in{" "}
                  <span style={{ color: D.amber }} className="font-bold">{a.days} days</span>.
                  Send a follow-up?
                </p>
              </div>
              <button
                className="flex items-center gap-1 text-xs font-semibold shrink-0 hover:opacity-80 transition-opacity"
                style={{ color: D.cyan }}
              >
                Send <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Win Rate by Source */}
      <section>
        <div className="flex items-center gap-2 mb-4″>
          <BarChart2 size={16} style={{ color: D.purple }} />
          <h2 className="text-base font-bold" style={{ color: D.text }}>Win Rate by Source</h2>
        </div>
        <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-5″>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={WIN_SOURCE_DATA} layout="vertical" barSize={20}>
              <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fill: D.dim, fontSize: 11 }} />
              <YAxis type="category" dataKey="source" width={110} tick={{ fill: D.muted, fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text }}
                formatter={(v: number) => [`${v}%`, "Win Rate"]}
              />
              <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
                {WIN_SOURCE_DATA.map((_, i) => (
                  <Cell key={i} fill={SOURCE_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 flex-wrap">
            {WIN_SOURCE_DATA.map((d, i) => (
              <div key={d.source} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: SOURCE_COLORS[i] }} />
                <span style={{ color: D.muted }}>{d.source}</span>
                <span className="font-bold" style={{ color: SOURCE_COLORS[i] }}>{d.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
