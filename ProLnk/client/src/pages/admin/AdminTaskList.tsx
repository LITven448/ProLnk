/**
 * Admin Task List / Action Items
 * Live checklist of platform action items with priority, category, and agent status.
 * Wave 22 — autonomous build
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  CheckCircle2, Circle, AlertCircle, Clock, Zap, Users, DollarSign,
  Shield, BarChart3, Settings, ChevronDown, ChevronUp, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Priority = "urgent" | "high" | "medium" | "low";
type Category = "partners" | "revenue" | "disputes" | "compliance" | "system" | "marketing";
type Status = "pending" | "in_progress" | "done" | "blocked";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  status: Status;
  agentCanDo: boolean;
  dueLabel?: string;
}

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  urgent:  { label: "Urgent",  color: "#EF4444", bg: "#FEE2E2" },
  high:    { label: "High",    color: "#F59E0B", bg: "#FEF3C7" },
  medium:  { label: "Medium",  color: "#3B82F6", bg: "#DBEAFE" },
  low:     { label: "Low",     color: "#6B7280", bg: "#F3F4F6" },
};

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  partners:   Users,
  revenue:    DollarSign,
  disputes:   Shield,
  compliance: AlertCircle,
  system:     Settings,
  marketing:  BarChart3,
};

const CATEGORY_COLORS: Record<Category, string> = {
  partners:   "#00B5B8",
  revenue:    "#10B981",
  disputes:   "#EF4444",
  compliance: "#F59E0B",
  system:     "#6366F1",
  marketing:  "#EC4899",
};

// Static task definitions — in production these would come from a DB table
const STATIC_TASKS: Task[] = [
  { id: "t1",  title: "Review pending partner applications",   description: "3 new applications awaiting approval or rejection.",           priority: "urgent",  category: "partners",   status: "pending",     agentCanDo: false, dueLabel: "Today" },
  { id: "t2",  title: "Approve pending commission payouts",    description: "7 commissions in the payout queue ready to release.",         priority: "urgent",  category: "revenue",    status: "pending",     agentCanDo: false, dueLabel: "Today" },
  { id: "t3",  title: "Resolve open disputes",                 description: "2 disputes have been open for more than 5 days.",             priority: "high",    category: "disputes",   status: "pending",     agentCanDo: false, dueLabel: "This week" },
  { id: "t4",  title: "Claim Stripe sandbox",                  description: "Stripe test sandbox expires May 19. Claim to keep test env.", priority: "high",    category: "revenue",    status: "pending",     agentCanDo: false, dueLabel: "May 19" },
  { id: "t5",  title: "Connect n8n automation workflows",      description: "8 workflow JSONs are ready. Provide n8n URL + API key.",      priority: "high",    category: "system",     status: "pending",     agentCanDo: false, dueLabel: "This week" },
  { id: "t6",  title: "Set up business bank account",          description: "Required for Stripe KYC and live payouts. Mercury recommended.", priority: "high",  category: "revenue",    status: "pending",     agentCanDo: false, dueLabel: "This week" },
  { id: "t7",  title: "Verify partner COI documents",          description: "4 partners have uploaded COI docs awaiting admin review.",    priority: "medium",  category: "compliance", status: "pending",     agentCanDo: false, dueLabel: "This week" },
  { id: "t8",  title: "Seed demo partner data",                description: "Add 150+ realistic DFW partners for investor demos.",        priority: "medium",  category: "marketing",  status: "pending",     agentCanDo: true,  dueLabel: "Anytime" },
  { id: "t9",  title: "Publish site to custom domain",         description: "Click Publish in the Management UI to go live.",             priority: "medium",  category: "system",     status: "pending",     agentCanDo: false, dueLabel: "Anytime" },
  { id: "t10", title: "Review partner tier upgrade requests",  description: "1 partner has reached the referral threshold for Silver.",   priority: "medium",  category: "partners",   status: "pending",     agentCanDo: false, dueLabel: "This week" },
  { id: "t11", title: "Send monthly partner newsletter",       description: "Last newsletter was 32 days ago. Partners expect monthly.",  priority: "medium",  category: "marketing",  status: "pending",     agentCanDo: true,  dueLabel: "This week" },
  { id: "t12", title: "Review AnalyticsDeepDive metrics",     description: "New LTV/CAC dashboard is live. Review and set targets.",     priority: "low",     category: "revenue",    status: "pending",     agentCanDo: false, dueLabel: "Anytime" },
  { id: "t13", title: "Update pricing tiers",                  description: "Review add-on pricing against market rates quarterly.",      priority: "low",     category: "revenue",    status: "pending",     agentCanDo: false, dueLabel: "Q2 2026" },
  { id: "t14", title: "Schedule partner training webinar",     description: "Training Hub is live. Invite partners to first live session.", priority: "low",   category: "partners",   status: "pending",     agentCanDo: false, dueLabel: "Q2 2026" },
];

function TaskCard({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const pCfg = PRIORITY_CONFIG[task.priority];
  const CatIcon = CATEGORY_ICONS[task.category];
  const catColor = CATEGORY_COLORS[task.category];
  const isDone = task.status === "done";

  return (
    <div className={`bg-card border rounded-xl transition-all ${isDone ? "opacity-50" : ""}`}>
      <div
        className="flex items-start gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Checkbox */}
        <button
          className="mt-0.5 flex-shrink-0"
          onClick={e => { e.stopPropagation(); onToggle(task.id); }}
        >
          {isDone
            ? <CheckCircle2 className="w-5 h-5 text-green-500" />
            : <Circle className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          }
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold text-foreground ${isDone ? "line-through" : ""}`}>
              {task.title}
            </span>
            {task.agentCanDo && (
              <Badge variant="outline" className="text-[10px] text-[#00B5B8] border-[#00B5B8]/30 bg-[#00B5B8]/5 gap-1">
                <Zap className="w-2.5 h-2.5" /> Agent can do this
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ color: pCfg.color, backgroundColor: pCfg.bg }}
            >
              {pCfg.label}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <CatIcon style={{ width: 10, height: 10, color: catColor }} />
              {task.category}
            </span>
            {task.dueLabel && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-2.5 h-2.5" /> {task.dueLabel}
              </span>
            )}
          </div>
        </div>

        {/* Expand toggle */}
        <button className="text-muted-foreground flex-shrink-0 mt-0.5">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 ml-8">
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
      )}
    </div>
  );
}

export default function AdminTaskList() {
  const [tasks, setTasks] = useState<Task[]>(STATIC_TASKS);
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [showDone, setShowDone] = useState(false);

  // Augment with live data
  const { data: partners } = trpc.admin.getAllPartners.useQuery();
  const { data: unpaid } = trpc.admin.getUnpaidCommissions.useQuery();

  const augmented = useMemo(() => {
    return tasks.map(t => {
      if (t.id === "t1") {
        const pending = (partners ?? []).filter(p => p.status === "pending").length;
        return { ...t, title: `Review ${pending} pending partner application${pending !== 1 ? "s" : ""}`, status: pending > 0 ? "pending" : "done" as Status };
      }
      if (t.id === "t2") {
        const count = (unpaid ?? []).length;
        return { ...t, title: `Approve ${count} pending commission payout${count !== 1 ? "s" : ""}`, status: count > 0 ? "pending" : "done" as Status };
      }
      return t;
    });
  }, [tasks, partners, unpaid]);

  const visible = augmented.filter(t => {
    if (!showDone && t.status === "done") return false;
    if (filter !== "all" && t.category !== filter) return false;
    return true;
  });

  const doneCount = augmented.filter(t => t.status === "done").length;
  const urgentCount = augmented.filter(t => t.priority === "urgent" && t.status !== "done").length;

  const handleToggle = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status: t.status === "done" ? "pending" : "done" } : t
    ));
    toast.success("Task updated");
  };

  const CATEGORIES: Array<{ id: "all" | Category; label: string }> = [
    { id: "all",        label: "All" },
    { id: "partners",   label: "Partners" },
    { id: "revenue",    label: "Revenue" },
    { id: "disputes",   label: "Disputes" },
    { id: "compliance", label: "Compliance" },
    { id: "system",     label: "System" },
    { id: "marketing",  label: "Marketing" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-5 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-[#00B5B8]" />
              Action Items
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {doneCount}/{augmented.length} complete
              {urgentCount > 0 && (
                <span className="ml-2 text-red-500 font-semibold">· {urgentCount} urgent</span>
              )}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setShowDone(s => !s)}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {showDone ? "Hide completed" : "Show completed"}
          </Button>
        </div>

        {/* Progress bar */}
        <div className="bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00B5B8] to-[#0A1628] transition-all duration-500"
            style={{ width: `${augmented.length > 0 ? (doneCount / augmented.length) * 100 : 0}%` }}
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === cat.id
                  ? "bg-[#0A1628] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-2">
          {visible.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No tasks in this category.
            </div>
          ) : (
            visible.map(task => (
              <TaskCard key={task.id} task={task} onToggle={handleToggle} />
            ))
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Tasks marked with <Zap className="inline w-3 h-3 text-[#00B5B8]" /> can be completed by the AI agent — just ask.
        </p>
      </div>
    </AdminLayout>
  );
}
