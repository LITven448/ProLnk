import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Target, Trophy, Star, Users, Briefcase, TrendingUp,
  Plus, CheckCircle, Calendar, Zap, Award,
  Clock, Flag, X, DollarSign, Flame,
} from "lucide-react";

interface Goal {
  id: string;
  label: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  color: string;
  category: "Revenue" | "Jobs" | "Network" | "Learning";
}

interface BadgeItem {
  id: string;
  label: string;
  description: string;
  icon: typeof Star;
  earned: boolean;
  earnedAt?: string;
  color: string;
}

interface CompletedGoal {
  id: string;
  label: string;
  completedAt: string;
  reward: string;
}

const RING_GOALS: { id: string; label: string; target: number; current: number; unit: string; color: string }[] = [
  { id: "monthly-rev", label: "Monthly Revenue Target", target: 2000, current: 847, unit: "dollars", color: "#2dd4bf" },
  { id: "jobs-completed", label: "Jobs Completed", target: 20, current: 14, unit: "jobs", color: "#a78bfa" },
  { id: "referrals-made", label: "Referrals Made", target: 5, current: 2, unit: "referrals", color: "#fb923c" },
];

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const STREAK_DAYS_ACTIVE = [true, true, true, true, true, true, false];

const COMPLETED_GOALS: CompletedGoal[] = [
  { id: "cg1", label: "Complete profile 100%", completedAt: "May 2, 2026", reward: "Priority Lead Routing" },
  { id: "cg2", label: "Earn first $500", completedAt: "May 8, 2026", reward: "Elite Tier Status" },
  { id: "cg3", label: "Recruit first team member", completedAt: "May 10, 2026", reward: "Override Income Unlocked" },
];

const DEFAULT_GOALS: Goal[] = [
  { id: "tier3", label: "Reach Tier 3 by December", target: 50, current: 17, unit: "matches", deadline: "2026-12-31", color: "#2dd4bf", category: "Jobs" },
  { id: "monthly-earnings", label: "Earn $500 this month", target: 500, current: 270, unit: "dollars", deadline: "2026-05-31", color: "#10B981", category: "Revenue" },
  { id: "network", label: "Build a team of 5 recruits", target: 5, current: 2, unit: "recruits", deadline: "2026-09-01", color: "#8B5CF6", category: "Network" },
];

const BADGES: BadgeItem[] = [
  { id: "first-job", label: "First Job", description: "Completed your first job", icon: Briefcase, earned: true, earnedAt: "May 2, 2026", color: "#F59E0B" },
  { id: "five-jobs", label: "5 Jobs", description: "Completed 5 jobs", icon: Star, earned: true, earnedAt: "May 9, 2026", color: "#3B82F6" },
  { id: "ten-jobs", label: "10 Jobs", description: "Completed 10 jobs", icon: Trophy, earned: false, color: "#8B5CF6" },
  { id: "first-recruit", label: "First Recruit", description: "Recruited your first pro to network", icon: Users, earned: true, earnedAt: "May 7, 2026", color: "#10B981" },
  { id: "first-referral", label: "First Referral", description: "Submitted your first AI referral", icon: Zap, earned: true, earnedAt: "May 4, 2026", color: "#EF4444" },
  { id: "tier2", label: "Tier 2 Pro", description: "Reached Tier 2 — 20% commission", icon: Award, earned: false, color: "#0A1628" },
];

const CATEGORIES = ["Revenue", "Jobs", "Network", "Learning"] as const;

function progressPct(current: number, target: number) {
  return Math.min(100, Math.round((current / target) * 100));
}

function daysLeft(deadline: string) {
  const ms = new Date(deadline).getTime() - Date.now();
  const d = Math.ceil(ms / 86400000);
  if (d < 0) return "Overdue";
  if (d === 0) return "Today";
  if (d === 1) return "1 day left";
  return `${d} days left`;
}

function formatValue(value: number, unit: string) {
  if (unit === "dollars") return `$${value.toLocaleString()}`;
  return `${value}`;
}

// ─── Progress Ring ─────────────────────────────────────────────────────────────

function ProgressRing({
  pct,
  color,
  label,
  current,
  target,
  unit,
}: {
  pct: number;
  color: string;
  label: string;
  current: number;
  target: number;
  unit: string;
}) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[72px] h-[72px]">
        <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-white leading-none">{pct}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[11px] font-semibold text-slate-300 leading-tight max-w-[72px]">{label}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">
          {formatValue(current, unit)} / {formatValue(target, unit)}
        </p>
      </div>
    </div>
  );
}

// ─── Category Badge ────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Revenue: "rgba(45,212,191,0.15)",
  Jobs: "rgba(167,139,250,0.15)",
  Network: "rgba(251,146,60,0.15)",
  Learning: "rgba(251,191,36,0.15)",
};
const CATEGORY_TEXT: Record<string, string> = {
  Revenue: "#2dd4bf",
  Jobs: "#a78bfa",
  Network: "#fb923c",
  Learning: "#fbbf24",
};

function CategoryPill({ cat }: { cat: string }) {
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: CATEGORY_COLORS[cat] ?? "rgba(255,255,255,0.1)", color: CATEGORY_TEXT[cat] ?? "#94a3b8" }}
    >
      {cat}
    </span>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [weeklyJobs, setWeeklyJobs] = useState("");
  const [weeklySubmitted, setWeeklySubmitted] = useState(false);
  const [newGoal, setNewGoal] = useState({
    label: "",
    target: "",
    unit: "dollars",
    deadline: "",
    category: "Revenue" as Goal["category"],
  });

  const currentStreak = 6;

  const handleAddGoal = () => {
    if (!newGoal.label.trim() || !newGoal.target || !newGoal.deadline) {
      toast.error("Fill in goal name, target, and deadline");
      return;
    }
    const goal: Goal = {
      id: `custom-${Date.now()}`,
      label: newGoal.label.trim(),
      target: Number(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      color: CATEGORY_TEXT[newGoal.category] ?? "#2dd4bf",
      category: newGoal.category,
    };
    setGoals(prev => [...prev, goal]);
    setNewGoal({ label: "", target: "", unit: "dollars", deadline: "", category: "Revenue" });
    setShowNewGoal(false);
    toast.success("Goal added!");
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    toast("Goal removed");
  };

  const handleWeeklyCheckin = () => {
    const n = parseInt(weeklyJobs, 10);
    if (isNaN(n) || n < 0) { toast.error("Enter a valid number"); return; }
    setGoals(prev => prev.map(g =>
      g.id === "tier3" ? { ...g, current: Math.min(g.target, g.current + n) } : g
    ));
    setWeeklySubmitted(true);
    toast.success(`Logged ${n} job${n !== 1 ? "s" : ""} this week. Keep it up!`);
  };

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-teal-400" />
              Goal Tracker
            </h1>
            <p className="text-sm text-slate-400 mt-1">Set targets, track progress, earn badges</p>
          </div>
          <Button
            size="sm"
            className="text-white bg-teal-600 hover:bg-teal-500"
            onClick={() => setShowNewGoal(v => !v)}
          >
            <Plus className="w-4 h-4 mr-1.5" />New Goal
          </Button>
        </div>

        {/* ── NEW: Progress Rings ── */}
        <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">Current Progress</p>
          <div className="flex items-start justify-around">
            {RING_GOALS.map(g => (
              <ProgressRing
                key={g.id}
                pct={progressPct(g.current, g.target)}
                color={g.color}
                label={g.label}
                current={g.current}
                target={g.target}
                unit={g.unit}
              />
            ))}
          </div>
        </div>

        {/* ── NEW: Streak Tracker ── */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(251,146,60,0.1), rgba(251,146,60,0.03))",
            border: "1px solid rgba(251,146,60,0.25)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-orange-400" />
              <span className="font-bold text-white">{currentStreak}-day booking streak</span>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}
            >
              🔥 On fire
            </span>
          </div>
          <div className="flex items-center gap-2">
            {WEEK_DAYS.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: STREAK_DAYS_ACTIVE[i] ? "rgba(251,146,60,0.25)" : "rgba(255,255,255,0.05)",
                    border: STREAK_DAYS_ACTIVE[i] ? "1.5px solid rgba(251,146,60,0.5)" : "1.5px solid rgba(255,255,255,0.08)",
                    color: STREAK_DAYS_ACTIVE[i] ? "#fb923c" : "#475569",
                  }}
                >
                  {STREAK_DAYS_ACTIVE[i] ? "✓" : day}
                </div>
                <span className="text-[9px] text-slate-600">{day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">Log a job today to keep your streak alive.</p>
        </div>

        {/* ── NEW: Goal History ── */}
        <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Completed Goals</p>
          <div className="space-y-3">
            {COMPLETED_GOALS.map(cg => (
              <div key={cg.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white line-through decoration-slate-600">{cg.label}</p>
                  <p className="text-xs text-slate-500">{cg.completedAt}</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80" }}
                >
                  {cg.reward}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Goals */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Active Goals</h2>
          {goals.map(goal => {
            const pct = progressPct(goal.current, goal.target);
            const isComplete = pct >= 100;
            return (
              <div
                key={goal.id}
                className="rounded-2xl p-5 bg-slate-900 border border-slate-700"
                style={isComplete ? { borderColor: "rgba(34,197,94,0.4)" } : undefined}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-white">{goal.label}</span>
                      <CategoryPill cat={goal.category} />
                      {isComplete && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Complete</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {daysLeft(goal.deadline)}
                      </span>
                      <span>
                        {formatValue(goal.current, goal.unit)} / {formatValue(goal.target, goal.unit)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{pct}% complete</span>
                    <span className="font-semibold" style={{ color: goal.color }}>
                      {formatValue(goal.target - goal.current, goal.unit)} to go
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: isComplete ? "#22c55e" : goal.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {goals.length === 0 && (
            <div className="text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-2xl">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No active goals. Add one to get started.</p>
            </div>
          )}
        </section>

        {/* ── NEW: Inline Goal Form ── */}
        {showNewGoal && (
          <div className="rounded-2xl p-5 bg-slate-900 border border-teal-600/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-bold text-white">Create Custom Goal</span>
              </div>
              <button onClick={() => setShowNewGoal(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Goal name</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="e.g. Earn $1,000 this month"
                  value={newGoal.label}
                  onChange={e => setNewGoal(g => ({ ...g, label: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium mb-1 block">Target</label>
                  <input
                    type="number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="100"
                    value={newGoal.target}
                    onChange={e => setNewGoal(g => ({ ...g, target: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium mb-1 block">Unit</label>
                  <select
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={newGoal.unit}
                    onChange={e => setNewGoal(g => ({ ...g, unit: e.target.value }))}
                  >
                    <option value="dollars">Dollars ($)</option>
                    <option value="matches">Matches</option>
                    <option value="recruits">Recruits</option>
                    <option value="referrals">Referrals</option>
                    <option value="jobs">Jobs</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium mb-1 block">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setNewGoal(g => ({ ...g, category: cat }))}
                        className="text-[10px] font-bold px-2 py-1 rounded-full transition-all"
                        style={{
                          background: newGoal.category === cat ? (CATEGORY_COLORS[cat] ?? "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.05)",
                          color: newGoal.category === cat ? (CATEGORY_TEXT[cat] ?? "#94a3b8") : "#64748b",
                          border: newGoal.category === cat ? `1px solid ${CATEGORY_TEXT[cat]}40` : "1px solid transparent",
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium mb-1 block">Deadline</label>
                  <input
                    type="date"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={newGoal.deadline}
                    onChange={e => setNewGoal(g => ({ ...g, deadline: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  className="flex-1 py-2 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors flex items-center justify-center gap-1.5"
                  onClick={handleAddGoal}
                >
                  <Plus className="w-4 h-4" />Add Goal
                </button>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700 transition-colors"
                  onClick={() => setShowNewGoal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Check-In */}
        <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-bold text-white">Weekly Check-In</span>
          </div>
          {weeklySubmitted ? (
            <div className="flex items-center gap-3 py-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Check-in complete for this week</p>
                <p className="text-xs text-slate-500 mt-0.5">Your progress has been updated. See you next week!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">How many jobs did you complete this week?</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="e.g. 7"
                  value={weeklyJobs}
                  onChange={e => setWeeklyJobs(e.target.value)}
                />
                <button
                  className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 transition-colors"
                  onClick={handleWeeklyCheckin}
                >
                  Submit
                </button>
              </div>
              <p className="text-xs text-slate-600">This updates your Tier 3 goal progress.</p>
            </div>
          )}
        </div>

        {/* Milestone Badges */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Milestone Badges</h2>
            <span className="text-xs text-slate-500">{BADGES.filter(b => b.earned).length}/{BADGES.length} earned</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map(badge => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className="rounded-2xl p-4 flex items-start gap-3 transition-all"
                  style={{
                    background: badge.earned ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                    border: badge.earned ? "1px solid rgba(255,255,255,0.1)" : "1px dashed rgba(255,255,255,0.06)",
                    opacity: badge.earned ? 1 : 0.55,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: badge.earned ? `${badge.color}20` : "rgba(255,255,255,0.04)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: badge.earned ? badge.color : "#475569" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${badge.earned ? "text-white" : "text-slate-500"}`}>
                      {badge.label}
                    </p>
                    <p className="text-xs text-slate-500 leading-tight">{badge.description}</p>
                    {badge.earned && badge.earnedAt && (
                      <p className="text-xs mt-1 font-medium" style={{ color: badge.color }}>
                        Earned {badge.earnedAt}
                      </p>
                    )}
                    {!badge.earned && (
                      <p className="text-xs mt-1 text-slate-600">Not yet earned</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Motivation footer */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.1), rgba(45,212,191,0.03))", border: "1px solid rgba(45,212,191,0.2)" }}
        >
          <TrendingUp className="w-8 h-8 text-teal-400 flex-shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">You're on track for Tier 3</p>
            <p className="text-slate-400 text-xs mt-0.5">
              At your current pace, you'll hit 50 matches by September — 3 months ahead of your goal.
            </p>
          </div>
        </div>

      </div>
    </PartnerLayout>
  );
}
