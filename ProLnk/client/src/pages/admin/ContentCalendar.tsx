import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DCard, DonutChart, StatusBadge, ProgressBar,
} from "@/components/DashboardShared";
import {
  Calendar, Mail, MessageSquare, FileText, CloudLightning, Plus,
  Linkedin, Instagram, Edit2, Send, ChevronLeft, ChevronRight,
} from "lucide-react";

type ContentType = "email" | "social" | "blog" | "storm";

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  time: string;
  channel: string;
  day: number;
}

const TYPE_COLOR: Record<ContentType, string> = {
  email: D.blue,
  social: D.teal,
  blog: D.amber,
  storm: D.red,
};

const TYPE_LABEL: Record<ContentType, string> = {
  email: "Email",
  social: "Social",
  blog: "Blog",
  storm: "Storm Alert",
};

const TYPE_ICON: Record<ContentType, JSX.Element> = {
  email: <Mail className="w-3 h-3" />,
  social: <MessageSquare className="w-3 h-3" />,
  blog: <FileText className="w-3 h-3" />,
  storm: <CloudLightning className="w-3 h-3" />,
};

const CONTENT_ITEMS: ContentItem[] = [
  { id: "c1", type: "email", title: "May Storm Season — Pro Tips", time: "9:00 AM", channel: "Email", day: 1 },
  { id: "c2", type: "social", title: "Before/After: Roof Repair Win", time: "11:00 AM", channel: "LinkedIn", day: 1 },
  { id: "c3", type: "blog", title: "5 Signs You Need a New HVAC Unit", time: "8:00 AM", channel: "Blog", day: 3 },
  { id: "c4", type: "storm", title: "Tornado Watch — TX/OK Pros Alert", time: "6:30 AM", channel: "Email + SMS", day: 5 },
  { id: "c5", type: "social", title: "Founding Partner Countdown (11 left)", time: "10:00 AM", channel: "Instagram", day: 6 },
  { id: "c6", type: "email", title: "Founding Partner Last Call", time: "8:00 AM", channel: "Email", day: 8 },
  { id: "c7", type: "social", title: "Homeowner Tip: Summer AC Prep", time: "12:00 PM", channel: "LinkedIn", day: 10 },
  { id: "c8", type: "blog", title: "How Network Income Works", time: "8:00 AM", channel: "Blog", day: 12 },
  { id: "c9", type: "email", title: "Homeowner Summer Prep — Week 1", time: "9:00 AM", channel: "Email", day: 14 },
  { id: "c10", type: "social", title: "Partner Spotlight: Dallas HVAC", time: "11:30 AM", channel: "Instagram", day: 15 },
  { id: "c11", type: "storm", title: "Hail Season Advisory — Midwest", time: "7:00 AM", channel: "Email + SMS", day: 17 },
  { id: "c12", type: "email", title: "New Pro: Here's Your First Lead", time: "10:00 AM", channel: "Email", day: 19 },
  { id: "c13", type: "blog", title: "Why Home Health Scores Matter", time: "8:00 AM", channel: "Blog", day: 21 },
  { id: "c14", type: "social", title: "500 Homes in the Vault 🏠", time: "9:00 AM", channel: "LinkedIn", day: 22 },
  { id: "c15", type: "email", title: "Homeowner Summer Prep — Week 2", time: "9:00 AM", channel: "Email", day: 25 },
  { id: "c16", type: "social", title: "Weekend Pro Feature", time: "10:00 AM", channel: "Instagram", day: 27 },
  { id: "c17", type: "email", title: "Monthly Performance Recap", time: "8:30 AM", channel: "Email", day: 29 },
];

const CAMPAIGNS = [
  { name: "May Storm Season Push", color: D.red, pieces: 4, done: 2, desc: "4 pieces — alerts + blog + pro tip email" },
  { name: "Founding Partner Last Call", color: D.amber, pieces: 6, done: 3, desc: "6 pieces — countdown series + social push" },
  { name: "Homeowner Summer Prep", color: D.teal, pieces: 8, done: 1, desc: "8 pieces — 4-week email sequence + blog" },
];

const DONUT_DATA = [
  { label: "Email", value: 40, color: D.blue },
  { label: "Social", value: 35, color: D.teal },
  { label: "Blog", value: 15, color: D.amber },
  { label: "Other", value: 10, color: D.purple },
];

const WEEK_ITEMS = CONTENT_ITEMS.filter(i => i.day >= 12 && i.day <= 18).slice(0, 5);

const MAY_OFFSET = 4; // May 1, 2026 is a Friday (0=Sun ... 5=Fri)
const DAYS_IN_MAY = 31;
const WEEKS = 6;

function getDayItems(day: number) {
  return CONTENT_ITEMS.filter(i => i.day === day);
}

function ChannelIcon({ channel }: { channel: string }) {
  if (channel.includes("LinkedIn")) return <Linkedin className="w-3 h-3" style={{ color: "#0A66C2" }} />;
  if (channel.includes("Instagram")) return <Instagram className="w-3 h-3" style={{ color: "#E1306C" }} />;
  return <Mail className="w-3 h-3" style={{ color: D.muted }} />;
}

export default function ContentCalendar() {
  const [view, setView] = useState<"month" | "week">("month");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<ContentType>("email");
  const [weekStart, setWeekStart] = useState(12);

  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart + i);

  return (
    <AdminLayout>
      <div style={{ minHeight: "100vh", backgroundColor: D.bg, padding: "32px 24px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${D.purple}20` }}>
                <Calendar className="w-5 h-5" style={{ color: D.purple }} />
              </div>
              <h1 className="text-2xl font-black" style={{ color: D.text }}>Content Calendar</h1>
            </div>
            <p className="text-sm ml-14" style={{ color: D.muted }}>Every post, email, and announcement planned</p>
          </div>
          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${D.border}` }}>
              {(["month", "week"] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="px-4 py-2 text-xs font-bold capitalize transition-all"
                  style={{
                    background: view === v ? D.purple : D.surface,
                    color: view === v ? "#fff" : D.muted,
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowNewForm(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: D.purple, color: "#fff" }}
            >
              <Plus className="w-4 h-4" />
              New Content
            </button>
          </div>
        </div>

        {/* New Content Inline Form */}
        {showNewForm && (
          <div className="mb-6 rounded-2xl p-5" style={{ background: D.card, border: `1px solid ${D.purple}40` }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: D.text }}>Schedule New Content</h3>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-48">
                <label className="text-xs font-semibold block mb-1" style={{ color: D.muted }}>Title</label>
                <input
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Content title..."
                  className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: D.muted }}>Type</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as ContentType)}
                  className="rounded-xl px-3 py-2 text-sm outline-none"
                  style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
                >
                  <option value="email">Email</option>
                  <option value="social">Social Post</option>
                  <option value="blog">Blog Post</option>
                  <option value="storm">Storm Alert</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: D.muted }}>Day (May)</label>
                <input
                  type="number"
                  min={1}
                  max={31}
                  defaultValue={15}
                  className="w-20 rounded-xl px-3 py-2 text-sm outline-none"
                  style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.text }}
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  className="px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: D.purple, color: "#fff" }}
                  onClick={() => setShowNewForm(false)}
                >
                  Add
                </button>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-bold"
                  style={{ background: D.surface, color: D.muted, border: `1px solid ${D.border}` }}
                  onClick={() => setShowNewForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main calendar area */}
          <div className="xl:col-span-3 space-y-6">

            {/* Month View */}
            {view === "month" && (
              <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${D.border}` }}>
                  <h2 className="text-sm font-bold" style={{ color: D.text }}>May 2026</h2>
                  <div className="flex items-center gap-3">
                    {(["email", "social", "blog", "storm"] as ContentType[]).map(t => (
                      <div key={t} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLOR[t] }} />
                        <span className="text-xs" style={{ color: D.muted }}>{TYPE_LABEL[t]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day-of-week headers */}
                <div className="grid grid-cols-7" style={{ borderBottom: `1px solid ${D.border}` }}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                    <div key={d} className="py-2 text-center text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                {Array.from({ length: WEEKS }, (_, week) => (
                  <div key={week} className="grid grid-cols-7" style={{ borderBottom: week < WEEKS - 1 ? `1px solid ${D.border}` : "none" }}>
                    {Array.from({ length: 7 }, (_, dow) => {
                      const day = week * 7 + dow - MAY_OFFSET + 1;
                      const isCurrentMonth = day >= 1 && day <= DAYS_IN_MAY;
                      const items = isCurrentMonth ? getDayItems(day) : [];
                      const isToday = day === 15;
                      return (
                        <div
                          key={dow}
                          className="min-h-16 p-1.5"
                          style={{
                            borderRight: dow < 6 ? `1px solid ${D.border}` : "none",
                            backgroundColor: isToday ? `${D.purple}10` : "transparent",
                          }}
                        >
                          {isCurrentMonth && (
                            <>
                              <div
                                className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-1"
                                style={{
                                  color: isToday ? "#fff" : D.muted,
                                  background: isToday ? D.purple : "transparent",
                                }}
                              >
                                {day}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                {items.slice(0, 2).map(item => (
                                  <div
                                    key={item.id}
                                    className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold truncate"
                                    style={{
                                      background: `${TYPE_COLOR[item.type]}25`,
                                      color: TYPE_COLOR[item.type],
                                      fontSize: "10px",
                                    }}
                                  >
                                    {TYPE_ICON[item.type]}
                                    <span className="truncate">{item.title}</span>
                                  </div>
                                ))}
                                {items.length > 2 && (
                                  <span className="text-xs" style={{ color: D.dim, fontSize: "10px" }}>+{items.length - 2} more</span>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {/* Week View */}
            {view === "week" && (
              <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${D.border}` }}>
                  <button onClick={() => setWeekStart(w => Math.max(1, w - 7))} className="p-1 rounded-lg hover:bg-white/5">
                    <ChevronLeft className="w-4 h-4" style={{ color: D.muted }} />
                  </button>
                  <h2 className="text-sm font-bold" style={{ color: D.text }}>
                    May {weekStart}–{Math.min(weekStart + 6, 31)}, 2026
                  </h2>
                  <button onClick={() => setWeekStart(w => Math.min(25, w + 7))} className="p-1 rounded-lg hover:bg-white/5">
                    <ChevronRight className="w-4 h-4" style={{ color: D.muted }} />
                  </button>
                </div>
                <div className="grid grid-cols-7" style={{ borderBottom: `1px solid ${D.border}` }}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                    <div key={d} className="py-2 text-center text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {weekDays.map((day, dow) => {
                    const items = day >= 1 && day <= 31 ? getDayItems(day) : [];
                    const isToday = day === 15;
                    return (
                      <div
                        key={dow}
                        className="min-h-36 p-2"
                        style={{
                          borderRight: dow < 6 ? `1px solid ${D.border}` : "none",
                          backgroundColor: isToday ? `${D.purple}10` : "transparent",
                        }}
                      >
                        <div
                          className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-2"
                          style={{ color: isToday ? "#fff" : D.muted, background: isToday ? D.purple : "transparent" }}
                        >
                          {day >= 1 && day <= 31 ? day : ""}
                        </div>
                        <div className="flex flex-col gap-1">
                          {items.map(item => (
                            <div
                              key={item.id}
                              className="flex flex-col gap-0.5 px-2 py-1.5 rounded-lg"
                              style={{ background: `${TYPE_COLOR[item.type]}20`, border: `1px solid ${TYPE_COLOR[item.type]}30` }}
                            >
                              <div className="flex items-center gap-1">
                                {TYPE_ICON[item.type]}
                                <span className="text-xs font-bold truncate" style={{ color: TYPE_COLOR[item.type] }}>{TYPE_LABEL[item.type]}</span>
                              </div>
                              <span className="text-xs truncate" style={{ color: D.text, fontSize: "11px" }}>{item.title}</span>
                              <span className="text-xs" style={{ color: D.dim, fontSize: "10px" }}>{item.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Campaigns */}
            <div>
              <SectionHeader title="Active Campaigns" subtitle="Coordinated multi-piece pushes" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CAMPAIGNS.map(c => (
                  <div key={c.name} className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-sm font-bold" style={{ color: D.text }}>{c.name}</span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: D.muted }}>{c.desc}</p>
                    <ProgressBar value={c.done / c.pieces * 100} color={c.color} />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs" style={{ color: D.muted }}>{c.done} published</span>
                      <span className="text-xs" style={{ color: D.muted }}>{c.pieces} total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* This Week */}
            <div className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <SectionHeader title="This Week" subtitle="May 12–18" />
              <div className="space-y-3">
                {WEEK_ITEMS.map(item => (
                  <div key={item.id} className="p-3 rounded-xl" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold"
                        style={{ background: `${TYPE_COLOR[item.type]}20`, color: TYPE_COLOR[item.type] }}
                      >
                        {TYPE_ICON[item.type]}
                        <span>{TYPE_LABEL[item.type]}</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold mb-1" style={{ color: D.text }}>{item.title}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <ChannelIcon channel={item.channel} />
                      <span className="text-xs" style={{ color: D.muted }}>{item.channel} · May {item.day}, {item.time}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
                        style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.muted }}
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
                        style={{ background: `${TYPE_COLOR[item.type]}20`, color: TYPE_COLOR[item.type] }}
                      >
                        <Send className="w-3 h-3" />
                        Publish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Mix Donut */}
            <div className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <SectionHeader title="Content Mix" />
              <DonutChart data={DONUT_DATA} size={140} />
              <div className="space-y-2 mt-3">
                {DONUT_DATA.map(d => (
                  <div key={d.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-xs" style={{ color: D.muted }}>{d.label}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: D.text }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <MetricCard
              label="Scheduled This Month"
              value={String(CONTENT_ITEMS.length)}
              sub="17 pieces across 4 types"
              color={D.purple}
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
