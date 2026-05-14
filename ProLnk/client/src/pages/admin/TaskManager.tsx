import type React from "react";
import { useState, useRef } from "react";
import { Link } from "wouter";
import AdminLayout, { T, BADGE_GRADIENTS, FONT } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckSquare, Clock, AlertTriangle, Plus, Bot,
  CheckCircle2, Circle, Loader2,
} from "lucide-react";

type Priority = "High" | "Med" | "Low";
type Category = "Marketing" | "Ops" | "Tech" | "Finance";
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
}

const PRIORITY_STYLE: Record<Priority, { bg: string; color: string }> = {
  High: { bg: "#FFF0F0", color: "#EA0606" },
  Med:  { bg: "#FFF8E6", color: "#FBB140" },
  Low:  { bg: "#F0FAF0", color: "#82D616" },
};

const CAT_STYLE: Record<Category, { bg: string; color: string }> = {
  Marketing: { bg: "#F3EEFF", color: "#7928CA" },
  Ops:       { bg: "#E8F9FC", color: "#17C1E8" },
  Tech:      { bg: "#E8F0FD", color: "#1A73E8" },
  Finance:   { bg: "#FFF8E6", color: "#FBB140" },
};

const ASSIGNEE_COLORS = ["#17C1E8","#82D616","#7928CA","#FBB140","#EA0606","#1A73E8"];

const INIT_TASKS: Task[] = [
  { id: 1,  title: "Draft Q2 email campaign sequence",         priority: "High", assignee: "Mia Chen",      initials: "MC", dueDate: "May 15", category: "Marketing", status: "todo" },
  { id: 2,  title: "Review onboarding flow drop-off",          priority: "High", assignee: "Jake Torres",   initials: "JT", dueDate: "May 14", category: "Ops",       status: "todo" },
  { id: 3,  title: "Update commission rate docs",              priority: "Med",  assignee: "Sara Lee",      initials: "SL", dueDate: "May 18", category: "Finance",   status: "todo" },
  { id: 4,  title: "Deploy Referral Hub v2",                   priority: "High", assignee: "Dev Team",      initials: "DT", dueDate: "May 13", category: "Tech",      status: "todo" },
  { id: 5,  title: "A/B test landing page CTA",                priority: "Med",  assignee: "Mia Chen",      initials: "MC", dueDate: "May 20", category: "Marketing", status: "todo" },
  { id: 6,  title: "Partner activation push notification",     priority: "Low",  assignee: "Jake Torres",   initials: "JT", dueDate: "May 22", category: "Ops",       status: "todo" },
  { id: 7,  title: "Fix mobile nav overflow bug",              priority: "High", assignee: "Dev Team",      initials: "DT", dueDate: "May 13", category: "Tech",      status: "inprogress" },
  { id: 8,  title: "Reconcile April commission ledger",        priority: "Med",  assignee: "Sara Lee",      initials: "SL", dueDate: "May 15", category: "Finance",   status: "inprogress" },
  { id: 9,  title: "Build partner leaderboard widget",         priority: "Low",  assignee: "Dev Team",      initials: "DT", dueDate: "May 21", category: "Tech",      status: "inprogress" },
  { id: 10, title: "Launch founding partner promo blast",      priority: "High", assignee: "Mia Chen",      initials: "MC", dueDate: "May 10", category: "Marketing", status: "done" },
  { id: 11, title: "Migrate staging DB to TiDB",               priority: "High", assignee: "Dev Team",      initials: "DT", dueDate: "May 9",  category: "Tech",      status: "done" },
  { id: 12, title: "Create partner tier explainer PDF",        priority: "Med",  assignee: "Sara Lee",      initials: "SL", dueDate: "May 8",  category: "Marketing", status: "done" },
];

const FILTERS = ["All", "High Priority", "My Tasks", "Overdue"] as const;
type Filter = typeof FILTERS[number];

const COLUMNS: { key: Status; label: string; icon: React.ElementType; accent: string }[] = [
  { key: "todo",       label: "Todo",        icon: Circle,      accent: T.muted },
  { key: "inprogress", label: "In Progress", icon: Loader2,     accent: T.blue },
  { key: "done",       label: "Done",        icon: CheckCircle2,accent: T.green },
];

const CARD: React.CSSProperties = {
  background: T.surface,
  borderRadius: 16,
  border: `1px solid ${T.border}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  fontFamily: FONT,
};

let nextId = 13;

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(INIT_TASKS);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    const t = newTitle.trim();
    if (!t) return;
    setTasks(prev => [...prev, {
      id: nextId++,
      title: t,
      priority: "Med",
      assignee: "Unassigned",
      initials: "?",
      dueDate: "TBD",
      category: "Ops",
      status: "todo",
    }]);
    setNewTitle("");
    inputRef.current?.focus();
  };

  const filtered = tasks.filter(task => {
    if (activeFilter === "High Priority") return task.priority === "High";
    if (activeFilter === "Overdue") return task.dueDate === "May 13" || task.dueDate === "May 9" || task.dueDate === "May 10";
    return true;
  });

  const counts = {
    open: tasks.filter(t => t.status === "todo").length,
    inprogress: tasks.filter(t => t.status === "inprogress").length,
    done: tasks.filter(t => t.status === "done").length,
    overdue: tasks.filter(t => t.priority === "High" && t.status !== "done").length,
  };

  return (
    <AdminLayout>
      <div style={{ background: T.bg, minHeight: "100vh", padding: "24px 32px", fontFamily: FONT }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: BADGE_GRADIENTS.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckSquare style={{ color: "#fff", width: 20, height: 20 }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Task Manager</h1>
              <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>Admin operations board</p>
            </div>
          </div>
          {/* Quick add */}
          <div style={{ display: "flex", gap: 8 }}>
            <Input
              ref={inputRef}
              placeholder="Add a task and press Enter..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTask()}
              style={{ width: 280, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13 }}
            />
            <Button onClick={addTask} style={{ background: BADGE_GRADIENTS.blue, color: "#fff", border: "none", borderRadius: 10, gap: 6 }}>
              <Plus style={{ width: 16, height: 16 }} /> Add Task
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Open",          value: counts.open,       color: T.accent, icon: Circle },
            { label: "In Progress",   value: counts.inprogress, color: T.blue,   icon: Loader2 },
            { label: "Done This Week",value: counts.done,       color: T.green,  icon: CheckCircle2 },
            { label: "Overdue",       value: counts.overdue,    color: T.red,    icon: AlertTriangle },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ ...CARD, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon style={{ width: 22, height: 22, color: s.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                border: `1.5px solid ${activeFilter === f ? T.accent : T.border}`,
                background: activeFilter === f ? T.accentBg : T.surface,
                color: activeFilter === f ? T.accent : T.muted,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                fontFamily: FONT,
              }}
            >{f}</button>
          ))}
        </div>

        {/* Kanban board */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {COLUMNS.map(col => {
            const Icon = col.icon;
            const colTasks = filtered.filter(t => t.status === col.key);
            return (
              <div key={col.key} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Column header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}>
                  <Icon style={{ width: 16, height: 16, color: col.accent }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{col.label}</span>
                  <span style={{ marginLeft: "auto", background: `${col.accent}18`, color: col.accent, fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>
                    {colTasks.length}
                  </span>
                </div>
                {/* Task cards */}
                {colTasks.map((task, idx) => (
                  <div key={task.id} style={{
                    ...CARD,
                    padding: 16,
                    opacity: col.key === "done" ? 0.75 : 1,
                    transform: `translateY(${idx === 0 ? 0 : 0}px)`,
                  }}>
                    {/* Title + priority */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: T.text, lineHeight: 1.4, flex: 1 }}>
                        {col.key === "done" && <span style={{ textDecoration: "line-through" }}>{task.title}</span>}
                        {col.key !== "done" && task.title}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, flexShrink: 0,
                        background: PRIORITY_STYLE[task.priority].bg,
                        color: PRIORITY_STYLE[task.priority].color,
                      }}>{task.priority}</span>
                    </div>
                    {/* Category tag */}
                    <div style={{ marginBottom: 12 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                        background: CAT_STYLE[task.category].bg,
                        color: CAT_STYLE[task.category].color,
                      }}>{task.category}</span>
                    </div>
                    {/* Footer: assignee + due date + agent btn */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        background: ASSIGNEE_COLORS[task.id % ASSIGNEE_COLORS.length],
                        fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0,
                      }}>{task.initials}</div>
                      <span style={{ fontSize: 11, color: T.muted, flex: 1 }}>{task.assignee}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock style={{ width: 11, height: 11, color: task.priority === "High" && col.key !== "done" ? T.red : T.dim }} />
                        <span style={{ fontSize: 11, color: task.priority === "High" && col.key !== "done" ? T.red : T.dim, fontWeight: 600 }}>{task.dueDate}</span>
                      </div>
                    </div>
                    {col.key !== "done" && (
                      <Link href="/admin/agents">
                        <button style={{
                          marginTop: 10, width: "100%", padding: "6px 0", borderRadius: 8,
                          border: `1px solid ${T.border}`, background: T.bg, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          fontSize: 11, fontWeight: 600, color: T.muted, fontFamily: FONT,
                          transition: "all 0.15s",
                        }}>
                          <Bot style={{ width: 13, height: 13 }} /> Assign to Agent
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div style={{ ...CARD, padding: 24, textAlign: "center", color: T.dim, fontSize: 13, border: `1.5px dashed ${T.border}` }}>
                    No tasks here
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
