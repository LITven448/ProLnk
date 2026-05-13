import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Target, Trophy, Star, Users, Briefcase, TrendingUp,
  Plus, CheckCircle2, Calendar, ChevronRight, Zap, Award,
  Clock, Flag, Edit2, X
} from "lucide-react";

interface Goal {
  id: string;
  label: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  color: string;
}

interface Badge_ {
  id: string;
  label: string;
  description: string;
  icon: typeof Star;
  earned: boolean;
  earnedAt?: string;
  color: string;
}

const DEFAULT_GOALS: Goal[] = [
  {
    id: "tier3",
    label: "Reach Tier 3 by December",
    target: 50,
    current: 17,
    unit: "matches",
    deadline: "2026-12-31",
    color: "#0A1628",
  },
  {
    id: "monthly-earnings",
    label: "Earn $500 this month",
    target: 500,
    current: 270,
    unit: "dollars",
    deadline: "2026-05-31",
    color: "#10B981",
  },
  {
    id: "network",
    label: "Build a team of 5 recruits",
    target: 5,
    current: 2,
    unit: "recruits",
    deadline: "2026-09-01",
    color: "#8B5CF6",
  },
];

const BADGES: Badge_[] = [
  { id: "first-job",    label: "First Job",     description: "Completed your first job",            icon: Briefcase,  earned: true,  earnedAt: "May 2, 2026",  color: "#F59E0B" },
  { id: "five-jobs",   label: "5 Jobs",         description: "Completed 5 jobs",                    icon: Star,       earned: true,  earnedAt: "May 9, 2026",  color: "#3B82F6" },
  { id: "ten-jobs",    label: "10 Jobs",         description: "Completed 10 jobs",                  icon: Trophy,     earned: false,                            color: "#8B5CF6" },
  { id: "first-recruit",label: "First Recruit",  description: "Recruited your first pro to network",icon: Users,      earned: true,  earnedAt: "May 7, 2026",  color: "#10B981" },
  { id: "first-referral",label: "First Referral","description": "Submitted your first AI referral", icon: Zap,        earned: true,  earnedAt: "May 4, 2026",  color: "#EF4444" },
  { id: "tier2",       label: "Tier 2 Pro",      description: "Reached Tier 2 — 20% commission",   icon: Award,      earned: false,                            color: "#0A1628" },
];

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
  if (unit === "dollars") return `$${value}`;
  return `${value}`;
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [weeklyJobs, setWeeklyJobs] = useState("");
  const [weeklySubmitted, setWeeklySubmitted] = useState(false);
  const [newGoal, setNewGoal] = useState({ label: "", target: "", unit: "dollars", deadline: "" });

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
      color: "#F59E0B",
    };
    setGoals(prev => [...prev, goal]);
    setNewGoal({ label: "", target: "", unit: "dollars", deadline: "" });
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
    setGoals(prev => prev.map(g => {
      if (g.id === "tier3") return { ...g, current: Math.min(g.target, g.current + n) };
      return g;
    }));
    setWeeklySubmitted(true);
    toast.success(`Logged ${n} job${n !== 1 ? "s" : ""} this week. Keep it up!`);
  };

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-[#0A1628]" />
              Goal Tracker
            </h1>
            <p className="text-sm text-gray-500 mt-1">Set targets, track progress, earn badges</p>
          </div>
          <Button
            size="sm"
            className="text-white"
            style={{ backgroundColor: "#0A1628" }}
            onClick={() => setShowNewGoal(true)}
          >
            <Plus className="w-4 h-4 mr-1.5" />New Goal
          </Button>
        </div>

        {/* Active Goals */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Active Goals</h2>
          {goals.map(goal => {
            const pct = progressPct(goal.current, goal.target);
            const isComplete = pct >= 100;
            return (
              <Card key={goal.id} className={`border ${isComplete ? "border-emerald-300" : "border-gray-200"}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900">{goal.label}</span>
                        {isComplete && <Badge className="bg-emerald-100 text-emerald-700 text-xs">Complete</Badge>}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
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
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{pct}% complete</span>
                      <span style={{ color: goal.color }} className="font-semibold">
                        {formatValue(goal.target - goal.current, goal.unit)} to go
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: isComplete ? "#10B981" : goal.color }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {goals.length === 0 && (
            <div className="text-center py-10 text-gray-400 border border-dashed border-gray-200 rounded-xl">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No active goals. Add one to get started.</p>
            </div>
          )}
        </section>

        {/* New Goal Form */}
        {showNewGoal && (
          <Card className="border-2 border-[#0A1628]/20 bg-[#F5E642]/5">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Flag className="w-4 h-4 text-[#0A1628]" />Create Custom Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              <div>
                <label className="text-xs text-gray-600 font-medium mb-1 block">Goal name</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20"
                  placeholder="e.g. Earn $1,000 this month"
                  value={newGoal.label}
                  onChange={e => setNewGoal(g => ({ ...g, label: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 font-medium mb-1 block">Target</label>
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20"
                    placeholder="100"
                    value={newGoal.target}
                    onChange={e => setNewGoal(g => ({ ...g, target: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-medium mb-1 block">Unit</label>
                  <select
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 bg-white"
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
              <div>
                <label className="text-xs text-gray-600 font-medium mb-1 block">Deadline</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20"
                  value={newGoal.deadline}
                  onChange={e => setNewGoal(g => ({ ...g, deadline: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  className="text-white flex-1"
                  style={{ backgroundColor: "#0A1628" }}
                  onClick={handleAddGoal}
                >
                  <Plus className="w-4 h-4 mr-1.5" />Add Goal
                </Button>
                <Button variant="outline" onClick={() => setShowNewGoal(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Check-In */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0A1628]" />Weekly Check-In
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            {weeklySubmitted ? (
              <div className="flex items-center gap-3 py-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Check-in complete for this week</p>
                  <p className="text-xs text-gray-500 mt-0.5">Your progress has been updated. See you next week!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">How many jobs did you complete this week?</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20"
                    placeholder="e.g. 7"
                    value={weeklyJobs}
                    onChange={e => setWeeklyJobs(e.target.value)}
                  />
                  <Button
                    className="text-white"
                    style={{ backgroundColor: "#0A1628" }}
                    onClick={handleWeeklyCheckin}
                  >
                    Submit
                  </Button>
                </div>
                <p className="text-xs text-gray-400">This updates your Tier 3 goal progress.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Milestone Badges */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Milestone Badges</h2>
            <span className="text-xs text-gray-400">{BADGES.filter(b => b.earned).length}/{BADGES.length} earned</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {BADGES.map(badge => {
              const Icon = badge.icon;
              return (
                <Card
                  key={badge.id}
                  className={`border transition-all ${badge.earned ? "border-gray-200 bg-white" : "border-dashed border-gray-200 bg-gray-50 opacity-60"}`}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${badge.earned ? "" : "grayscale"}`}
                      style={{ backgroundColor: badge.earned ? `${badge.color}18` : "#F3F4F6" }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: badge.earned ? badge.color : "#9CA3AF" }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold ${badge.earned ? "text-gray-900" : "text-gray-400"}`}>
                        {badge.label}
                      </p>
                      <p className="text-xs text-gray-500 leading-tight">{badge.description}</p>
                      {badge.earned && badge.earnedAt && (
                        <p className="text-xs mt-1 font-medium" style={{ color: badge.color }}>
                          Earned {badge.earnedAt}
                        </p>
                      )}
                      {!badge.earned && (
                        <p className="text-xs mt-1 text-gray-400">Not yet earned</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Motivation footer */}
        <Card className="border border-[#0A1628]/10 bg-[#0A1628]">
          <CardContent className="p-5 flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-[#F5E642] flex-shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">You're on track for Tier 3</p>
              <p className="text-white/60 text-xs mt-0.5">At your current pace, you'll hit 50 matches by September — 3 months ahead of your goal.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PartnerLayout>
  );
}
