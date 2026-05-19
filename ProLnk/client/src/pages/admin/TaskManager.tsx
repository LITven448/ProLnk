import React from 'react';
import { useState, useRef } from "react";
import { Link } from "wouter";
import AdminLayout, { T, BADGE_GRADIENTS, FONT } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckSquare, Clock, AlertTriangle, Plus, Bot,
  CheckCircle, Circle, Loader2, Zap, User, X,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Priority = "Critical" | "High" | "Med" | "Low";
type Category = "Marketing" | "Ops" | "Tech" | "Finance" | "Legal";
type Status = "todo" | "inprogress" | "done";

interface Task {
  id: number;
  title: string;
  priority: Priority;
  assignee: string;
  initials: string;
  dueDate: string;
  category: Category;
  status: Status;
  automated: boolean;
}

const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; border: string }> = {
  Critical: { bg: "#FFF0F0", color: "#EA0606", border: "#EA060630" },
  High:     { bg: "#FFF4ED", color: "#f97316", border: "#f9731630" },
  Med:      { bg: "#FFF8E6", color: "#FBB140", border: "#FBB14030" },
  Low:      { bg: "#F0FAF0", color: "#82D616", border: "#82D61630" },
};

const CAT_STYLE: Record<Category, { bg: string; color: string }> = {
  Marketing: { bg: "#F3EEFF", color: "#7928CA" },
  Ops:       { bg: "#E8F9FC", color: "#17C1E8" },
  Tech:      { bg: "#E8F0FD", color: "#1A73E8" },
  Finance:   { bg: "#FFF8E6", color: "#FBB140" },
  Legal:     { bg: "#FFF0F0", color: "#EA0606" },
};

const ASSIGNEE_COLORS = ["#17C1E8","#82D616","#7928CA","#FBB140","#EA0606","#1A73E8","#f97316"];

const INIT_TASKS: Task[] = [
  { id: 1,  title: "Review 3 pending insurance claims",            priority: "Critical", assignee: "Andrew F.",    initials: "AF", dueDate: "Today",   category: "Legal",     status: "todo",       automated: false },
  { id: 2,  title: "Process 2 disputed commissions",               priority: "Critical", assignee: "Sara Lee",     initials: "SL", dueDate: "Today",   category: "Finance",   status: "todo",       automated: false },
  { id: 3,  title: "Deploy Referral Hub v2 to production",         priority: "High",     assignee: "Dev Team",     initials: "DT", dueDate: "May 15",  category: "Tech",      status: "todo",       automated: false },
  { id: 4,  title: "Draft Q2 email campaign sequence",             priority: "High",     assignee: "Mia Chen",     initials: "MC", dueDate: "May 15",  category: "Marketing", status: "todo",       automated: false },
  { id: 5,  title: "Review onboarding drop-off metrics",           priority: "High",     assignee: "Jake Torres",  initials: "JT", dueDate: "May 16",  category: "Ops",       status: "todo",       automated: true  },
  { id: 6,  title: "Send NPS surveys to active partners",          priority: "High",     assignee: "NPS Agent",    initials: "NA", dueDate: "May 16",  category: "Ops",       status: "todo",       automated: true  },
  { id: 7,  title: "Update commission rate documentation",          priority: "Med",      assignee: "Sara Lee",     initials: "SL", dueDate: "May 18",  category: "Finance",   status: "todo",       automated: false },
  { id: 8,  title: "A/B test landing page CTA variant",            priority: "Med",      assignee: "Mia Chen",     initials: "MC", dueDate: "May 20",  category: "Marketing", status: "todo",       automated: true  },
  { id: 9,  title: "Reconcile April commission ledger",            priority: "Med",      assignee: "Finance Agent",initials: "FA", dueDate: "May 19",  category: "Finance",   status: "inprogress", automated: true  },
  { id: 10, title: "Fix mobile nav overflow bug on iOS",           priority: "High",     assignee: "Dev Team",     initials: "DT", dueDate: "May 15",  category: "Tech",      status: "inprogress", automated: false },
  { id: 11, title: "Build partner leaderboard widget",             priority: "Med",      assignee: "Dev Team",     initials: "DT", dueDate: "May 21",  category: "Tech",      status: "inprogress", automated: false },
  { id: 12, title: "Partner activation push notification blast",   priority: "Low",      assignee: "SMS Agent",    initials: "SA", dueDate: "May 22",  category: "Marketing", status: "todo",       automated: true  },
  { id: 13, title: "Weekly SEO audit report",                      priority: "Low",      assignee: "SEO Agent",    initials: "SE", dueDate: "May 19",  category: "Marketing", status: "inprogress", automated: true  },
  { id: 14, title: "Launch founding partner promo blast",          priority: "High",     assignee: "Mia Chen",     initials: "MC", dueDate: "May 10",  category: "Marketing", status: "done",       automated: false },
  { id: 15, title: "Migrate staging DB to TiDB Cloud",             priority: "High",     assignee: "Dev Team",     initials: "DT", dueDate: "May 9",   category: "Tech",      status: "done",       automated: false },
];

const COLUMNS: { key: Status; label: string; icon: React.ElementType; accent: string }[] = [
  { key: "todo",       label: "Todo",        icon: Circle,       accent: T.muted  },
  { key: "inprogress", label: "In Progress", icon: Loader2,      accent: T.blue   },
  { key: "done",       label: "Done",        icon: CheckCircle, accent: T.green  },
];

const FILTERS = ["All", "Critical", "High Priority", "Automated", "Overdue"] as const;
type Filter = typeof FILTERS[number];

const CARD: React.CSSProperties = {
  background: T.surface,
  borderRadius: 16,
  border: `1px solid ${T.border}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  fontFamily: FONT,
};

const completedThisWeek = INIT_TASKS.filter(t => t.status === "done").length;
const totalTasks = INIT_TASKS.length;
const completionRate = Math.round((completedThisWeek / totalTasks) * 100);

const automatedCount = INIT_TASKS.filter(t => t.automated).length;
const manualCount = INIT_TASKS.length - automatedCount;

const DONUT_DATA = [
  { name: "Automated", value: automatedCount, color: T.blue  },
  { name: "Manual",    value: manualCount,    color: T.amber },
];

let nextId = 16;

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(INIT_TASKS);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [newTitle, setNewTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    const t = newTitle.trim();
    if (!t) return;
    setTasks(prev => [...prev, {
      id: nextId++, title: t, priority: "Med", assignee: "Unassigned",
      initials: "?", dueDate: "TBD", category: "Ops", status: "todo", automated: false,
    }]);
    setNewTitle("");
    setShowForm(false);
    inputRef.current?.focus();
  };

  const completeTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "done" as Status } : t));
  };

  const filtered = tasks.filter(task => {
    if (activeFilter === "Critical")      return task.priority === "Critical";
    if (activeFilter === "High Priority") return task.priority === "High" || task.priority === "Critical";
    if (activeFilter === "Automated")     return task.automated;
    if (activeFilter === "Overdue")       return task.dueDate === "Today" && task.status !== "done";
    return true;
  });

  const counts = {
    critical:   tasks.filter(t => t.priority === "Critical" && t.status !== "done").length,
    high:       tasks.filter(t => t.priority === "High"     && t.status !== "done").length,
    medium:     tasks.filter(t => t.priority === "Med"      && t.status !== "done").length,
    low:        tasks.filter(t => t.priority === "Low"      && t.status !== "done").length,
  };

  return (
    <AdminLayout>
      <div style={{ background: T.bg, minHeight: "100vh", padding: "24px 32px", fontFamily: FONT }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: BADGE_GRADIENTS.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckSquare style={{ color: "#fff", width: 20, height: 20 }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Task Manager</h1>
              <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>Platform operations board · {completionRate}% completion rate this week</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{ background: BADGE_GRADIENTS.blue, color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontFamily: FONT, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            <Plus style={{ width: 16, height: 16 }} /> Create Task
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Critical", value: counts.critical, color: "#EA0606", gradient: BADGE_GRADIENTS.red,    icon: AlertTriangle },
            { label: "High",     value: counts.high,     color: T.orange,  gradient: BADGE_GRADIENTS.orange, icon: AlertTriangle },
            { label: "Medium",   value: counts.medium,   color: T.amber,   gradient: BADGE_GRADIENTS.cyan,   icon: Clock },
            { label: "Low",      value: counts.low,      color: T.green,   gradient: BADGE_GRADIENTS.green,  icon: CheckSquare },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ ...CARD, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, border: s.label === "Critical" && counts.critical > 0 ? `1.5px solid #EA060630` : `1px solid ${T.border}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon style={{ width: 22, height: 22, color: s.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{s.label} Priority</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 20, marginBottom: 20 }}>
          <div style={{ ...CARD, padding: "16px 20px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Completion Rate This Week</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, height: 12, borderRadius: 6, background: T.border, overflow: "hidden" }}>
                <div style={{ width: `${completionRate}%`, height: "100%", borderRadius: 6, background: `linear-gradient(90deg, ${T.green}, ${T.blue})`, transition: "width 0.5s" }} />
              </div>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 18, color: T.green }}>{completionRate}%</span>
            </div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 6 }}>{completedThisWeek} of {totalTasks} tasks completed</div>
          </div>

          <div style={{ ...CARD, padding: "12px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Auto vs Manual</div>
            <ResponsiveContainer width="100%" height={90}>
              <PieChart>
                <Pie data={DONUT_DATA} cx="50%" cy="50%" innerRadius={22} outerRadius={38} dataKey="value" paddingAngle={3}>
                  {DONUT_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: T.card, border: "none", borderRadius: 8, fontSize: 11 }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10, color: T.muted }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {counts.critical > 0 && (
          <div style={{ ...CARD, padding: "14px 20px", border: "1.5px solid #EA060640", background: "#FFF5F5", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <AlertTriangle style={{ width: 16, height: 16, color: "#EA0606" }} />
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: "#EA0606" }}>Critical Tasks — Action Required</span>
            </div>
            {tasks.filter(t => t.priority === "Critical" && t.status !== "done").map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: "#FFF0F0", border: "1px solid #EA060620", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AlertTriangle style={{ width: 14, height: 14, color: "#EA0606" }} />
                  <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: "#EA0606" }}>{t.title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: T.muted }}>{t.dueDate}</span>
                  <button
                    onClick={() => completeTask(t.id)}
                    style={{ background: BADGE_GRADIENTS.green, color: "#fff", border: "none", borderRadius: 7, padding: "4px 12px", fontFamily: FONT, fontWeight: 700, fontSize: 11, cursor: "pointer" }}
                  >Complete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "6px 16px", borderRadius: 20,
                border: `1.5px solid ${activeFilter === f ? T.accent : T.border}`,
                background: activeFilter === f ? T.accentBg : T.surface,
                color: activeFilter === f ? T.accent : T.muted,
                fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: FONT,
              }}
            >{f}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {COLUMNS.map(col => {
            const Icon = col.icon;
            const colTasks = filtered.filter(t => t.status === col.key);
            return (
              <div key={col.key} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}>
                  <Icon style={{ width: 16, height: 16, color: col.accent }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{col.label}</span>
                  <span style={{ marginLeft: "auto", background: `${col.accent}18`, color: col.accent, fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{colTasks.length}</span>
                </div>
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    style={{
                      ...CARD,
                      padding: 16,
                      opacity: col.key === "done" ? 0.75 : 1,
                      border: task.priority === "Critical" && col.key !== "done" ? "1.5px solid #EA060630" : CARD.border,
                      background: task.priority === "Critical" && col.key !== "done" ? "#FFF8F8" : T.surface,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: task.priority === "Critical" && col.key !== "done" ? "#EA0606" : T.text, lineHeight: 1.4, flex: 1, textDecoration: col.key === "done" ? "line-through" : "none" }}>
                        {task.title}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, flexShrink: 0,
                        background: PRIORITY_STYLE[task.priority].bg,
                        color: PRIORITY_STYLE[task.priority].color,
                      }}>{task.priority}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: CAT_STYLE[task.category].bg, color: CAT_STYLE[task.category].color }}>{task.category}</span>
                      {task.automated && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 6, background: `${T.blue}18`, color: T.blue, display: "flex", alignItems: "center", gap: 3 }}>
                          <Zap style={{ width: 9, height: 9 }} /> Auto
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: ASSIGNEE_COLORS[task.id % ASSIGNEE_COLORS.length], fontSize: 9, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                        {task.initials}
                      </div>
                      <span style={{ fontSize: 11, color: T.muted, flex: 1 }}>{task.assignee}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Clock style={{ width: 10, height: 10, color: (task.priority === "Critical" || task.dueDate === "Today") && col.key !== "done" ? T.red : T.dim }} />
                        <span style={{ fontSize: 10, color: (task.priority === "Critical" || task.dueDate === "Today") && col.key !== "done" ? T.red : T.dim, fontWeight: 600 }}>{task.dueDate}</span>
                      </div>
                    </div>
                    {col.key !== "done" && (
                      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                        <button
                          onClick={() => completeTask(task.id)}
                          style={{ flex: 1, padding: "5px 0", borderRadius: 8, border: `1px solid ${T.green}40`, background: `${T.green}10`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 11, fontWeight: 600, color: T.green, fontFamily: FONT }}
                        >
                          <CheckCircle style={{ width: 12, height: 12 }} /> Complete
                        </button>
                        <Link href="/admin/agents">
                          <button style={{ flex: 1, padding: "5px 0", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 11, fontWeight: 600, color: T.muted, fontFamily: FONT }}>
                            <Bot style={{ width: 12, height: 12 }} /> Assign Agent
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div style={{ ...CARD, padding: 24, textAlign: "center", color: T.dim, fontSize: 13, border: `1.5px dashed ${T.border}` }}>No tasks</div>
                )}
              </div>
            );
          })}
        </div>

        {showForm && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
            <div style={{ background: T.card, borderRadius: 16, padding: 28, width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: T.text }}>Create Task</div>
                <button onClick={() => setShowForm(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: T.muted }}>
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>
              <Input
                ref={inputRef}
                placeholder="Task title..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTask()}
                style={{ width: "100%", marginBottom: 16, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.text }}
              />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: T.muted, fontFamily: FONT, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <Button onClick={addTask} style={{ flex: 1, background: BADGE_GRADIENTS.blue, color: "#fff", border: "none", borderRadius: 10, fontFamily: FONT, fontWeight: 700 }}>Add Task</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
